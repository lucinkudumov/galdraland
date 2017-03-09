var validator = require('validator'),
        async = require('async');
var request = require('request');

var WebClient = require('@slack/client').WebClient;

var slackClientID = "146827931650.146151726865";
var slackClientSecret = "80c8c252dabe4cbc46cfe0e29fb6272c";

module.exports = function (opts) {
    var userModel = opts.models.User;
    var teamModel = opts.models.Team;
    var masterSlackModel = opts.models.MasterSlack;

    function getUserName(slackUser) {
        userModel.findOne({slackUser: slackUser}, function (err, slackuser) {
            console.log("getUsername = ", slackuser);
            if (err) {
                console.log(err);
                return "";
            } else if (slackuser) {
                return slackuser.fullname;
            } else {
                return "";
            }
        });
    }

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
                        var access_token = result.access_token;
                        console.log("token = ", access_token);
                        var slackUserId = result.user_id;
                        console.log("slackUserId = ", slackUserId);
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                return res.json("Slack Authorization FAIL!");
                            } else if (user) {
                                user.slackToken = access_token;
                                user.slackUser = slackUserId;
                                user.save(function (err) {
                                    if (err) res.json("Slack Authorization FAIL! - No User");
                                });
                            }
                        });


//                        request.get({
//                            url: 'https://slack.com/api/groups.list?token='+result.access_token+
//                                '&exclude_archived=false'
//                        }, function (err, response) {
//                            if(err) {
//                                console.log("get channel list error = ", err);
//                                return res.json("Slack Authorization FAIL!");
//                            }
//                            else {
//                                var result = JSON.parse(response.body);
//                                for (i=0; i<result.groups.length; i++) {
//                                    console.log("id = " + result.groups[i].id);
//                                    console.log("name = " + result.groups[i].name);
//                                    if (result.groups[i].members.length > 0) {
//                                        for (j=0; j < result.groups[i].members.length; j++ )
//                                            console.log("member = " + result.groups[i].members[j]);
//                                    } else {
//                                        console.log("no members");
//                                    }
//
//                                    if (result.groups[i].name == "david_galdra_test") {
//                                        console.log("find my channel");
//                                        request.get({
//                                            url: 'https://slack.com/api/users.admin.invite?token='+access_token+
//                                                '&email=davidmakow16@gmail.com&channels='+result.groups[i].id
//                                        }, function (err, response) {
//                                            if(err) {
//                                                console.log("invite admin error = ", err);
//                                            }
//                                            else {
//                                                var result = JSON.parse(response.body);
//                                                console.log("invite admin result = ", result);
//                                            }
//                                        });
//                                        request.get({
//                                            url: 'https://slack.com/api/groups.invite?token='+access_token+
//                                                '&channel='+result.groups[i].id+
//                                                '&user=U4F5CNKTN'
//                                        }, function (err, response) {
//                                            if(err) {
//                                                console.log("invited error = ", err);
//                                                return res.json("Slack Authorization FAIL!");
//                                            }
//                                            else {
//                                                console.log("invited result = ", response.body);
//                                            }
//                                        });
//                                    }
//                                }
//                            }
//                        });
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
            var teamId = req.body.teamId;
            userModel.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    console.log(err);
                } else if (user) {
                    console.log("token = " + user.slackToken);
                    var accessToken = user.slackToken;
                    if (accessToken != null && accessToken != '') {
                        request.get({
                            url: 'https://slack.com/api/groups.create?token='+accessToken+'&name='+channelName+'&validate=true'
                        }, function (err, response) {
                            if(err) {
                                console.log("error");
                                return res.json({success: false});
                            } else {
                                console.log("success");
                                var result = JSON.parse(response.body);
                                console.log("createChannel = ", result);
                                teamModel.findOne({_id: teamId}, function (err, team) {
                                    if(err) {
                                        console.log("error");
                                        return res.json({success: false});
                                    } else {
                                        team.slackGroupId = result.group.id;
                                        team.slackGroupName = result.group.name;
                                        team.save(function (err, team) {
                                            if (err) {
                                                console.log(err);
                                            }
                                        })
                                    }
                                });
                                return res.json({success: true});
                            }
                        });
                    }
                }
            });
        },
        "post#slack/sendInvite": function (req, res) {
            var invites = req.body.invites;
            var slackGroupId = req.body.slackGroupId;
            console.log("slackGroupId = " + slackGroupId);
            userModel.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    console.log(err);
                } else if (user) {
                    var accessToken = user.slackToken;
                    if (accessToken != null && accessToken != '') {
                        async.forEach(invites, function (item, cb) {
                            userModel.findOne({_id: item.memberId}).exec(function (err, user) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    var slackUser = user.slackUser;
                                    if (slackUser != null && slackUser != '') {
                                        request.get({
                                            url: 'https://slack.com/api/groups.invite?token='+accessToken+'&channel='+slackGroupId+'&user='+slackUser
                                        }, function (err, response) {
                                            if(err) {
                                                console.log("sub-group invitation  error");
                                                return res.json({success: false});
                                            } else {
                                                console.log("sub-group invitation success");
                                                var result = JSON.parse(response.body);
//                                                console.log("invite result = ", result);
                                                if (result.ok == true) {
                                                    console.log("sub-group invitation  OK");
                                                } else {
                                                    console.log("sub-group invitation  Fail");
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    }
                }
            });
        },
        "post#slack/getMessages": function (req, res) {
            var teamId = req.body.teamId;
            console.log("teamId = " + teamId);
            teamModel.findOne({_id: teamId}, function (err, team) {
                if (err) {
                    console.log(err);
                } else if (team) {
                    var slackGroupId = team.slackGroupId;
                    if (slackGroupId != null && slackGroupId != '') {
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                console.log(err);
                            } else if (user) {
                                var accessToken = user.slackToken;
                                if (accessToken != null && accessToken != '') {
                                    request.get({
                                        url: 'https://slack.com/api/groups.history?token='+accessToken+'&channel='+slackGroupId+'&inclusive=true&count=10&unreads=true'
                                    }, function (err, response) {
                                        if(err) {
                                            console.log("groups.history  error");
                                            return res.json({success: false});
                                        } else {
                                            console.log("groups.history success");
                                            var result = JSON.parse(response.body);
                                            console.log("groups.history result = ", result);
                                            if (result.ok == true) {
                                                console.log("groups.history  OK");
                                                var slackUsers = [];
                                                for (i = 0; i < result.messages.length; i++) {
                                                    result.messages[i].userName = "abc";
                                                    var slackUser = result.messages[i].user;
                                                    if (slackUser in slackUsers == false) {
                                                        console.log("slackUser = " + slackUser);
                                                        var userName = getUserName(slackUser);
                                                        console.log("userName = " + userName);
                                                        result.messages[i].userName = userName;
                                                        slackUsers.push({slackUser:userName});
                                                    }
                                                }
                                                return res.json({success: true, data: result});
                                            } else {
                                                console.log("groups.history  Fail");
                                                return res.json({success: false});
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }
}