var validator = require('validator'),
        async = require('async');
var request = require('request');

var WebClient = require('@slack/client').WebClient;

module.exports = function (opts) {
    var userModel = opts.models.User;
    return {
        "get#slack/auth" : function (req, res, next) {
            if (req.param('code') != null) {
                request.get({
                    url: 'https://slack.com/api/oauth.access?client_id=146827931650.146151726865' +
                        '&client_secret=80c8c252dabe4cbc46cfe0e29fb6272c' +
                        '&redirect_uri=https://galdraland-1-0.herokuapp.com/api/slack/auth' +
                        '&code=' + req.param('code')
                }, function (err, response) {
                    if(err) {
                        return res.json("Slack Authorization FAIL!");
                    }
                    else {
                        console.log("response = ", response.body);
                        var result = JSON.parse(response.body);
                        console.log("token = ", result.access_token);
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                return res.json("Slack Authorization FAIL!");
                            } else if (user) {
                                user.slackToken = result.access_token;
                                user.save(function (err) {
                                    if (err) res.json("Slack Authorization FAIL! - No User");
                                });
                            }
                        });
                        return res.json("Slack Authorization OK!");
                    }
                });
            } else {
                return res.json("Slack Authorization FAIL!");
            }
        },
        "post#slack/createChannel": function (req, res) {
            var channelName = req.body.name.replace(/ /g,'') + "channel";
            userModel.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    console.log(err);
                } else if (user) {
                    console.log("token = " + user.slackToken);
                    request.get({
                        url: 'https://slack.com/api/channels.create?token='+user.slackToken+'&name='+channelName+'&validate=true'
                    }, function (err, response) {
                        if(err) {
                            console.log("error");
                            return res.json({success: false});
                        } else {
                            console.log("success");
                            var result = JSON.parse(response.body);
                            console.log("aaaaaaaa = ", result);
                            return res.json({success: true});
                        }
                    });
                }
            });
        }
    }
}