var validator = require('validator'),
        async = require('async');
var request = require('request');

var WebClient = require('@slack/client').WebClient;

var slackClientID = "146827931650.146151726865";
var slackClientSecret = "80c8c252dabe4cbc46cfe0e29fb6272c";

module.exports = function (opts) {
    var userModel = opts.models.User;
    var inviteModel = opts.models.Invite;
    return {
        "get#slack/auth" : function (req, res, next) {
            if (req.param('code') != null) {
                console.log("slack_auth_code = " + req.param('code'));
                request.get({
                    url: 'https://slack.com/api/oauth.access?client_id='+slackClientID+
                        '&client_secret='+slackClientSecret+
                        '&redirect_uri=https://galdraland-1-0.herokuapp.com/api/slack/auth' +
                        '&code=' + req.param('code')
                }, function (err, response) {
                    if(err) {
                        return res.json("Slack Authorization FAIL!");
                    }
                    else {
                        console.log("slack_auth_response = ", response.body);
                        var result = JSON.parse(response.body);
                        console.log("token = ", result.access_token);
                        request.get({
                            url: 'https://slack.com/api/groups.list?token='+result.access_token+
                                '&exclude_archived=true'
                        }, function (err, response) {
                            if(err) {
                                console.log("get channel list error = ", err);
                                return res.json("Slack Authorization FAIL!");
                            }
                            else {
                                var result = JSON.parse(response.body);
                                for (i=0; i<result.groups.length; i++) {
                                    console.log("id = " + result.groups[i].id);
                                    console.log("name = " + result.groups[i].name);
                                    if (result.groups[i].members.length > 0) {
                                        for (j=0; j < groups[i].members.length; j++ )
                                            console.log("member = " + result.groups[i].members[j]);
                                    } else {
                                        console.log("no members");
                                    }

                                    if (result.groups[i].name == "david_galdra_test") {
                                        console.log("find my channel");
                                    }
                                }
                            }
                        });
//                        userModel.findOne({_id: req.user._id}, function (err, user) {
//                            if (err) {
//                                return res.json("Slack Authorization FAIL!");
//                            } else if (user) {
//                                user.slackToken = result.access_token;
//                                user.save(function (err) {
//                                    if (err) res.json("Slack Authorization FAIL! - No User");
//                                });
//                            }
//                        });
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
                            console.log("createChannel = ", result);
                            return res.json({success: true});
                        }
                    });
                }
            });
        },
        "post#slack/sendInvite": function (req, res) {
            userModel.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    console.log(err);
                } else if (user) {
                    console.log(user.email);
                    request.get({
                        url: 'https://slack.com/api/channels.invite?token='+user.slackToken+'&email='+user.email+'&set_active=true'
                    }, function (err, response) {
                        if(err) {
                            console.log("error");
                            return res.json({success: false});
                        } else {
                            console.log("success");
                            var result = JSON.parse(response.body);
                            console.log("sendInvite = ", result);
                            return res.json({success: true});
                        }
                    });
                }
            });
        }
    }
}