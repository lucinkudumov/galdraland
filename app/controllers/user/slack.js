var validator = require('validator'),
        async = require('async');
var request = require('request');
var dateFormat = require('dateformat');

var slackClientID = "146827931650.146151726865";
var slackClientSecret = "80c8c252dabe4cbc46cfe0e29fb6272c";

module.exports = function (opts) {
    var userModel = opts.models.User;
    var teamModel = opts.models.Team;
    var masterSlackModel = opts.models.MasterSlack;
    var slackUsers = [];

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
                                                var max = result.messages.length;
                                                var slackUser = "";
                                                if (result.messages[0]) {
                                                slackUser = result.messages[0].user;
                                                var date = new Date(result.messages[0].ts * 1000);
                                                result.messages[0].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                if (err) {
                                                    console.log(err);
                                                } else if (user) {
                                                result.messages[0].userName = user.fullname;
                                                if (result.messages[1]) {
                                                slackUser = result.messages[1].user;
                                                var date = new Date(result.messages[1].ts * 1000);
                                                result.messages[1].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                if (err) {
                                                console.log(err);
                                                } else if (user) {
                                                result.messages[1].userName = user.fullname;
                                                if (result.messages[2]) {
                                                slackUser = result.messages[2].user;
                                                    var date = new Date(result.messages[2].ts * 1000);
                                                    result.messages[2].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");

                                                userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                if (err) {
                                                console.log(err);
                                                } else if (user) {
                                                result.messages[2].userName = user.fullname;
                                                if (result.messages[3]) {
                                                slackUser = result.messages[3].user;
                                                    var date = new Date(result.messages[3].ts * 1000);
                                                    result.messages[3].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");

                                                userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                if (err) {
                                                console.log(err);
                                                } else if (user) {
                                                result.messages[3].userName = user.fullname;
                                                    if (result.messages[4]) {
                                                        slackUser = result.messages[4].user;
                                                        var date = new Date(result.messages[4].ts * 1000);
                                                        result.messages[4].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                        userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else if (user) {
                                                                result.messages[4].userName = user.fullname;
                                                                if (result.messages[5]) {
                                                                    slackUser = result.messages[5].user;
                                                                    var date = new Date(result.messages[5].ts * 1000);
                                                                    result.messages[5].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                                    userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        } else if (user) {
                                                                            result.messages[5].userName = user.fullname;
                                                                            if (result.messages[6]) {
                                                                                slackUser = result.messages[6].user;
                                                                                var date = new Date(result.messages[6].ts * 1000);
                                                                                result.messages[6].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                                                userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                                                    if (err) {
                                                                                        console.log(err);
                                                                                    } else if (user) {
                                                                                        result.messages[6].userName = user.fullname;
                                                                                        var date = new Date(result.messages[7].ts * 1000);
                                                                                        result.messages[7].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                                                        if (result.messages[7]) {
                                                                                            slackUser = result.messages[7].user;
                                                                                            userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                                                                if (err) {
                                                                                                    console.log(err);
                                                                                                } else if (user) {
                                                                                                    result.messages[7].userName = user.fullname;
                                                                                                    if (result.messages[8]) {
                                                                                                        slackUser = result.messages[8].user;
                                                                                                        var date = new Date(result.messages[8].ts * 1000);
                                                                                                        result.messages[8].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                                                                        userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                                                                            if (err) {
                                                                                                                console.log(err);
                                                                                                            } else if (user) {
                                                                                                                result.messages[8].userName = user.fullname;
                                                                                                                if (result.messages[9]) {
                                                                                                                    slackUser = result.messages[9].user;
                                                                                                                    var date = new Date(result.messages[9].ts * 1000);
                                                                                                                    result.messages[9].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                                                                                    userModel.findOne({slackUser: slackUser}, function (err, user) {
                                                                                                                        if (err) {
                                                                                                                            console.log(err);
                                                                                                                        } else if (user) {
                                                                                                                            result.messages[9].userName = user.fullname;
                                                                                                                            return res.json({success: true, data: result});
                                                                                                                        }
                                                                                                                    });
                                                                                                                } else return res.json({success: true, data: result});
                                                                                                            }
                                                                                                        });
                                                                                                    } else return res.json({success: true, data: result});
                                                                                                }
                                                                                            });
                                                                                        } else return res.json({success: true, data: result});
                                                                                    }
                                                                                });
                                                                            } else return res.json({success: true, data: result});
                                                                        }
                                                                    });
                                                                } else return res.json({success: true, data: result});
                                                            }
                                                        });
                                                    } else return res.json({success: true, data: result});
                                                }
                                                });
                                                } else return res.json({success: true, data: result});
                                                }
                                                });
                                                } else return res.json({success: true, data: result});
                                                }
                                                });
                                                } else return res.json({success: true, data: result});
                                                }
                                                });
                                                } else return res.json({success: true, data: result});
                                            } else {
                                                console.log("groups.history  Fail");
                                                return res.json({success: false});
                                            }
                                        }
                                    });
                                } else {
                                    return res.json({success: false});
                                }
                            }
                        });
                    }
                }
            });
        },
        "post#slack/sendMessage": function (req, res) {
            var teamId = req.body.teamId;
            console.log("teamId = " + teamId);
            var msg = req.body.msg;
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
                                        url: 'https://slack.com/api/chat.postMessage?token='+accessToken+'&channel='+slackGroupId+'&text='+msg
                                    }, function (err, response) {
                                        if(err) {
                                            console.log("chat.postMessage  error");
                                            return res.json({success: false});
                                        } else {
                                            console.log("chat.postMessage  ok");
                                            return res.json({success: true});
                                        }
                                    });
                                } else {
                                    return res.json({success: false});
                                }
                            }
                        });
                    }
                }
            });
        }
    }
}