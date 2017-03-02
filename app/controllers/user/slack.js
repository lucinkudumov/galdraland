var validator = require('validator'),
        async = require('async');
var request = require('request');

var WebClient = require('@slack/client').WebClient;

module.exports = function (opts) {
    var userModel = opts.models.User;
    return {
        "post#slack/requestAuth": function (req, res) {
            console.log("calling requestAuth..." + req.user._id);
            request.get({
                url: 'https://slack.com/oauth/authorize?client_id=146827931650.146151726865&scope=identity.basic&redirect_uri=https://galdraland-1-0.herokuapp.com/api/slack/auth'
            }, function (err, response) {
                if(err) {
                    console.log("error");
                    return res.json({success: false});
                } else {
                    console.log("success");
                    return res.json({success: true});
                }

            });
        },
        "get#slack/auth" : function (req, res, next) {
            console.log("userID = " + req.user._id);
            if (req.param('code') != null) {
                console.log("aaaaa");
                console.log("code = " + req.param('code'));
                request.get({
                    url: 'https://slack.com/api/oauth.access?client_id=146827931650.146151726865' +
                        '&client_secret=80c8c252dabe4cbc46cfe0e29fb6272c' +
                        '&redirect_uri=https://galdraland-1-0.herokuapp.com/api/slack/auth' +
                        '&code=' + req.param('code')
                }, function (err, response) {
                    console.log("bbbbb");
                    if(err) {
                        console.log("err = ", err);
                        return res.json({success: false});
                    }
                    else {
                        console.log("response = ", response.body);
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                console.log(err);
                            } else if (user) {
                                user.slackToken = response.body.access_token;
                                console.log("slackToken = " + user.slackToken);
                                user.save(function (err) {
                                    if (err) console.log(err);
                                });
                            }
                        });
                        return res.json("Slack Authorization OK!");
                    }
                });
            } else {
                console.log("bbbbb");
                return res.json({success: false});
//                console.log("code = " + req.param('code'));
            }
        }
    }
}