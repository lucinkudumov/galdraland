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
            console.log("createblog..... teamid = ", team);
            teamModel.findOne({id: team}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, error: "Internal server error"});
                } else if (team) {
                    console.log("find OK!");
                    teamblog.title = title;
                    teamblog.image = image;
                    teamblog.body = body;
                    teamblog.team = team;
                    teamblog.save(function (err, teamblog) {
                        console.log("saving blog....");
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("saving blog OK");
                            return res.json({success: true, id: teamblog._id});
                        }
                    });
                }
            });
        },
        "post#team/editblog": function (req, res) {

        },
        "post#team/deleteblog": function (req, res) {

        },
        "post#team/bloglist": function (req, res) {

        },
        "post#team/blogget": function (req, res) {

        }
    }
}