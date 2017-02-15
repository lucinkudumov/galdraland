var validator = require('validator'),
        async = require('async');

module.exports = function (opts) {
    var adventureBlogModel = opts.models.AdventureBlog,
        adventureModel = opts.models.Adventure;

    return {
        "post#adventure/createblog": function (req, res) {
            var title = req.body.blogTitle,
                image = req.body.blogImage,
                body = req.body.blogBody,
                adventure = req.body.adventure,
                adventureblog = new adventureBlogModel();
            adventureModel.findOne({_id: adventure}, function (err, adventure) {
                console.log("search OK");
                if (err) {
                    console.log(err);
                    return res.json({success: false, error: "Internal server error"});
                } else if (adventure) {
                    adventureblog.title = title;
                    adventureblog.image = image;
                    adventureblog.body = body;
                    adventureblog.adventure = adventure;
                    adventureblog.save(function (err, adventureblog) {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({success: true, id: adventureblog._id});
                        }
                    });
                }
            });
        },
        "post#adventure/updateblog": function (req, res) {
            var id = req.body.id,
                title = req.body.blogTitle,
                body = req.body.blogBody,
                image = req.body.blogImage;

            adventureBlogModel.findOne({_id: id}, function (err, adventureblog) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (adventureblog) {
                    adventureblog.title = title;
                    adventureblog.body = body;
                    adventureblog.image = image;
                    adventureblog.save(function (err, adventureblog) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#adventure/deleteblog": function (req, res) {
            var id = req.body.id;
            adventureBlogModel.findOne({_id: id}, function (err, adventureblog) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (adventureblog) {
                    adventureblog.remove(function (err, adventureblog) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });


        },
        "post#adventure/bloglist": function (req, res) {
            var adventure = req.body.adventure;
            adventureBlogModel.find({"adventure" : adventure}, function (err, adventureblogs) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, adventureblogs: []});
                } else {
                    return res.json({success: true, adventureblogs: adventureblogs});
                }
            });
        },
        "post#adventure/blogget": function (req, res) {
            var id = req.body.id;
            adventureBlogModel.findOne({"_id" : id}, function (err, adventureblog) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, adventureblog: []});
                } else {
                    return res.json({success: true, adventureblog: adventureblog});
                }
            });
        }
    }
}