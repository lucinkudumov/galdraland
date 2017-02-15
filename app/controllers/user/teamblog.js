var validator = require('validator'),
        async = require('async');

module.exports = function (opts) {
    var teamBlogModel = opts.models.TeamBlog,
        teamModel = opts.models.Team;

    return {
        "post#team/createblog": function (req, res) {
            var title = req.body.blogTitle,
                image = req.body.blogImage,
                body = req.body.blogBody,
                team = req.body.team,
                teamblog = new teamBlogModel();
            teamModel.findOne({_id: team}, function (err, team) {
                console.log("search OK");
                if (err) {
                    console.log(err);
                    return res.json({success: false, error: "Internal server error"});
                } else if (team) {
                    teamblog.title = title;
                    teamblog.image = image;
                    teamblog.body = body;
                    teamblog.team = team;
                    teamblog.save(function (err, teamblog) {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({success: true, id: teamblog._id});
                        }
                    });
                }
            });
        },
        "post#team/updateblog": function (req, res) {
            var id = req.body.id,
                title = req.body.blogTitle,
                body = req.body.blogBody,
                image = req.body.blogImage;

            teamBlogModel.findOne({_id: id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (teamblog) {
                    teamblog.name = title;
                    teamblog.body = body;
                    teamblog.image = image;
                    teamblog.save(function (err, team) {
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
        "post#team/deleteblog": function (req, res) {

        },
        "post#team/bloglist": function (req, res) {
            var team = req.body.team;
            teamBlogModel.find({"team" : team}, function (err, teamblogs) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, teamblogs: []});
                } else {
                    return res.json({success: true, teamblogs: teamblogs});
                }
            });
        },
        "post#team/blogget": function (req, res) {

        }
    }
}