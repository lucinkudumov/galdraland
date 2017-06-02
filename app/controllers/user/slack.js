var validator = require('validator'),
        async = require('async');
var request = require('request');
var dateFormat = require('dateformat');

// Debugging
var slackClientID = "188468856003.188694276882";
var slackClientSecret = "0ead08787cc5d8be0b53ea06a467e632";

//var slackClientID = "138423090594.145329929105";
//var slackClientSecret = "2cee7f73e16f6a949b20b81551d9cce0";

module.exports = function (opts) {
    var userModel = opts.models.User;
    var teamModel = opts.models.Team;
    var teamMemberModel = opts.models.TeamMember;
    var applyModel = opts.models.Apply;

    return {
        "get#slack/auth" : function (req, res, next) {
            if (req.param('code') != null) {
                console.log("slack_auth_code = " + req.param('code'));
                request.get({
                    url: 'https://slack.com/api/oauth.access?client_id='+slackClientID+
                        '&client_secret='+slackClientSecret+
                        '&redirect_uri=https://galdraland-1-0.herokuapp.com/api/slack/auth' +
                        '&team=T5JDSR603' +
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
                                return res.json("Slack Authorization OK! Please refresh Galdraland");
                            }
                        });
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
                    return res.json({success: false});
                } else if (user) {
                    console.log("token = " + user.slackToken);
                    var accessToken = user.slackToken;
                    if (accessToken != null && accessToken != '') {
                        request.get({
                            url: 'https://slack.com/api/groups.create?token='+accessToken+'&name='+channelName+'&validate=true'
                        }, function (err, response) {
                            if(err) {
                                console.log("error");
                                return res.json({success: false, msg:"Occurs Unknown Error"});
                            } else {
                                console.log("success");
                                var result = JSON.parse(response.body);
                                console.log("createChannel = ", result);
                                if (result.ok == true) {
                                    teamModel.findOne({_id: teamId}, function (err, team) {
                                        if(err) {
                                            console.log("error");
                                            return res.json({success: false, msg:"Error, No Team"});
                                        } else {
                                            team.slackGroupId = result.group.id;
                                            team.slackGroupName = result.group.name;
                                            team.save(function (err, team) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.json({success: false, msg:"Error, Not Updating Team"});
                                                } else {
                                                    return res.json({success: true, msg:""});
                                                }
                                            })
                                        }
                                    });
                                } else {
                                    console.log("error = " + result.detail);
                                    var msg = "Slack Error : " + result.detail;
                                    return res.json({success: false, msg: msg});
                                }
                            }
                        });
                    }
                }
            });
        },
        "post#slack/leaveChannel": function (req, res) {
            var teamId = req.body.id;
            console.log("teamId = " + teamId);
            teamModel.findOne({_id: teamId}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    var slackGroupId = team.slackGroupId;
                    if (slackGroupId != null && slackGroupId != '') {
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else if (user) {
                                var accessToken = user.slackToken;
                                var slackUser = user.slackUser;
                                if (accessToken != null && accessToken != '') {
                                    request.get({
                                        url: 'https://slack.com/api/groups.leave?token='+accessToken+'&channel='+slackGroupId
                                    }, function (err, response) {
                                        if(err) {
                                            console.log("groups.leave  error");
                                            return res.json({success: false});
                                        } else {
                                            var result = JSON.parse(response.body);
                                            console.log("groups.leave OK");
                                            console.log("groups.leave result = " + result);
                                            return res.json({success: true});
                                        }
                                    });
                                } else {
                                    return res.json({success: false});
                                }
                            }
                        });
                    } else {
                        return res.json({success: false});
                    }
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#slack/closeChannel": function (req, res) {
            var teamId = req.body.id;
            console.log("teamId = " + teamId);
            teamModel.findOne({_id: teamId}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    var slackGroupId = team.slackGroupId;
                    if (slackGroupId != null && slackGroupId != '') {
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else if (user) {
                                var accessToken = user.slackToken;
                                if (accessToken != null && accessToken != '') {
                                    request.get({
                                        url: 'https://slack.com/api/groups.leave?token='+accessToken+'&channel='+slackGroupId
                                    }, function (err, response) {
                                        if(err) {
                                            console.log("groups.leave  error");
                                            return res.json({success: false});
                                        } else {
                                            var result = JSON.parse(response.body);
                                            console.log("groups.leave OK");
                                            console.log("groups.leave result = " + result);
                                            request.get({
                                                url: 'https://slack.com/api/groups.archive?token='+accessToken+'&channel='+slackGroupId
                                            }, function (err, response) {
                                                if(err) {
                                                    console.log("groups.archive  error");
                                                    return res.json({success: false});
                                                } else {
                                                    var result = JSON.parse(response.body);
                                                    console.log("groups.archive OK");
                                                    console.log("groups.archive result = " + result);
                                                    request.get({
                                                        url: 'https://slack.com/api/groups.close?token='+accessToken+'&channel='+slackGroupId
                                                    }, function (err, response) {
                                                        if(err) {
                                                            console.log("groups.close  error");
                                                            return res.json({success: false});
                                                        } else {
                                                            var result = JSON.parse(response.body);
                                                            console.log("groups.close OK");
                                                            console.log("groups.close result = " + result);
                                                            return res.json({success: true});
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    return res.json({success: false});
                                }
                            }
                        });
                    } else {
                        return res.json({success: false});
                    }
                } else {
                    return res.json({success: false});
                }
            });

        },
        "post#slack/kickChannel": function (req, res) {
            var teamId = req.body.id;
            console.log("teamId = " + teamId);
            teamModel.findOne({_id: teamId}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    var slackGroupId = team.slackGroupId;
                    if (slackGroupId != null && slackGroupId != '') {
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else if (user) {
                                var accessToken = user.slackToken;
                                var slackUser = user.slackUser;
                                if (accessToken != null && accessToken != '' && slackUser != null && slackUser != '') {
                                    request.get({
                                        url: 'https://slack.com/api/groups.kick?token='+accessToken+'&channel='+slackGroupId+'&user='+slackUser
                                    }, function (err, response) {
                                        console.log("groups.kick = " + response);
                                        if(err) {
                                            console.log("groups.kick  error");
                                            return res.json({success: false});
                                        } else {
                                            var result = JSON.parse(response.body);
                                            console.log("groups.kick OK");
                                            console.log("groups.kick result = " + result);
                                            return res.json({success: true});
                                        }
                                    });
                                } else {
                                    return res.json({success: false});
                                }
                            }
                        });
                    } else {
                        return res.json({success: false});
                    }
                } else {
                    return res.json({success: false});
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
                                    return res.json({success: false});
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
                                                return res.json({success: true});
                                            }
                                        });
                                    } else {
                                        return res.json({success: false});
                                    }
                                }
                            });
                        });
                    } else {
                        return res.json({success: false});
                    }
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#slack/sendInviteByApply": function (req, res) {
            var id = req.body.id;
            applyModel.findOne({_id: id}, function (err, apply) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (apply) {
                    teamModel.findOne({_id: apply.team}, function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else if (team) {
                            var slackGroupId = team.slackGroupId;
                            userModel.findOne({_id: req.user._id}, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else if (user) {
                                    var accessToken = user.slackToken;
                                    if (accessToken != null && accessToken != '') {
                                        userModel.findOne({_id: apply.from}).exec(function (err, user1) {
                                            if (err) {
                                                console.log(err);
                                                return res.json({success: false});
                                            } else {
                                                var slackUser = user1.slackUser;
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
                                                            if (result.ok == true) {
                                                                console.log("sub-group invitation  OK");
                                                            } else {
                                                                console.log("sub-group invitation  Fail");
                                                            }
                                                            return res.json({success: true});
                                                        }
                                                    });
                                                } else {
                                                    return res.json({success: false});
                                                }
                                            }
                                        });
                                    } else {
                                        return res.json({success: false});
                                    }
                                } else {
                                    return res.json({success: false});
                                }
                            });
                        }
                    });
                }
            });
        },
        "post#slack/getMessages": function (req, res) {
            var teamId = req.body.teamId;
            console.log("teamId = " + teamId);
            teamModel.findOne({_id: teamId}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    var slackGroupId = team.slackGroupId;
                    if (slackGroupId != null && slackGroupId != '') {
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
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
                                            if (result.ok == true && result.messages.length > 0) {
                                                console.log("groups.history  OK");
                                                var slackUser = "";
                                                if (result.messages[0]) {
                                                slackUser = result.messages[0].user;
                                                var date = new Date(result.messages[0].ts * 1000);
                                                result.messages[0].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                    request.get({
                                                        url: 'https://slack.com/api/groups.mark?token='+accessToken+'&channel='+slackGroupId+'&ts='+result.messages[0].ts
                                                    }, function (err, response) {
                                                        if(err) {
                                                            console.log("groups.mark  error");
                                                        } else {
                                                            console.log("groups.mark  OK");
                                                        }
                                                    });
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
                                                                                        var date = new Date(result.messages[6].ts * 1000);
                                                                                        result.messages[6].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
                                                                                        if (result.messages[7]) {
                                                                                            slackUser = result.messages[7].user;
                                                                                            var date = new Date(result.messages[7].ts * 1000);
                                                                                            result.messages[7].dateTime =dateFormat(date, "yyyy-mm-dd h:MM:ss");
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
                            } else {
                                return res.json({success: false});
                            }
                        });
                    }
                }
            });
        },
        "get#slack/getFeeds": function (req, res) {
            console.log("userId = " + req.user._id);
//            var feeds = [];
            userModel.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, feeds: []});
                } else if (user) {
                    var accessToken = user.slackToken;
                    var slackUser = user.slackUser;
                    teamMemberModel.find({user: req.user._id}, function (err, members) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, feeds: []});
                        } else {
                            var member_ids = [];
                            if (!members)
                                member_ids = [];
                            else {
                                for (var i = 0; i < members.length; i++)
                                    member_ids.push(members[i]._id);
                            }
                            var feeds = [];
                            teamModel.find({$or: [{owner: req.user._id}, {teamMembers: {$in: member_ids}}]}).populate("owner teamMembers").exec(function (err, teams) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false, feeds: []});
                                } else {
                                    var items = [];
                                    if (teams.length > 0) {
                                        for (i= 0; i < teams.length; i++) {
                                            var slackGroupId = teams[i].slackGroupId;
                                            var teamId = teams[i]._id;
                                            var teamName = teams[i].name;
                                            var url = 'https://slack.com/api/groups.history?token='+accessToken+'&channel='+slackGroupId+'&inclusive=true&count=10&unreads=true'
                                            var obj = {};
                                            obj.url = url;
                                            obj.teamId = teamId;
                                            obj.teamName = teamName;
                                            items.push(obj);
                                        }

                                        function synchAPICalls(items) {
                                            var item = items.pop();
                                            setTimeout(function(){
                                                request.get({
                                                    url: item.url
                                                }, function (err, response) {
                                                    if(err) {
                                                        console.log("groups.history  error");
                                                        return res.json({success: true, feeds: []});
                                                    } else {
                                                        var result = JSON.parse(response.body);
                                                        if (result.ok == true) {
                                                            if (result.unread_count_display > 0) {
                                                                var obj = {};
                                                                obj.teamId = item.teamId;
                                                                obj.teamName = item.teamName;
                                                                obj.unread_count = result.unread_count_display;
                                                                console.log("calling final...");
                                                                feeds.push(obj);
                                                            }
                                                        }
                                                        if (items.length > 0) {
                                                            synchAPICalls(items);
                                                        } else {
                                                            console.log("all done!");
                                                            return res.json({success: true, feeds: feeds});
                                                        }
                                                    }
                                                });
                                            }, 3500);
                                        }
                                        console.log("slack items = ", items);
                                        if (items.length > 0)
                                            synchAPICalls(items);
                                        else
                                            return res.json({success: true, feeds: []});
                                        console.log("end");
                                    } else {
                                        return res.json({success: true, feeds: []});
                                    }
                                }
                            });
                        }
                    });
                } else {
                    return res.json({success: true, feeds: []});
                }
            });
        },
        "post#slack/getFeeds1": function (req, res) {
            console.log("userId = " + req.user._id);
            var teams = req.body.teams;
            console.log("slackTeam = ", teams);
//            var feeds = [];
            userModel.findOne({_id: req.user._id}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, feeds: []});
                } else if (user) {
                    var accessToken = user.slackToken;
                    var items = [];
                    var feeds = [];
                    if (teams.length > 0) {
                        for (i= 0; i < teams.length; i++) {
                            var slackGroupId = teams[i].slackGroupId;
                            var teamId = teams[i]._id;
                            var teamName = teams[i].name;
                            var url = 'https://slack.com/api/groups.history?token='+accessToken+'&channel='+slackGroupId+'&inclusive=true&count=10&unreads=true'
                            var obj = {};
                            obj.url = url;
                            obj.teamId = teamId;
                            obj.teamName = teamName;
                            items.push(obj);
                        }

                        function synchAPICalls(items) {
                            var item = items.pop();
                            console.log("slackItem = ", item.url);
                            setTimeout(function(){
                                request.get({
                                    url: item.url
                                }, function (err, response) {
                                    if(err) {
                                        console.log("groups.history  error");
                                        return res.json({success: true, feeds: []});
                                    } else {
                                        var result = JSON.parse(response.body);
                                        console.log(result);
                                        if (result.ok == true) {
                                            if (result.unread_count_display > 0) {
                                                var obj = {};
                                                obj.teamId = item.teamId;
                                                obj.teamName = item.teamName;
                                                obj.unread_count = result.unread_count_display;
                                                console.log("calling final...");
                                                feeds.push(obj);
                                            }
                                        }
                                        if (items.length > 0) {
                                            synchAPICalls(items);
                                        } else {
                                            console.log("all done!");
                                            return res.json({success: true, feeds: feeds});
                                        }
                                    }
                                });
                            }, 3500);
                        }
                        console.log("slack items = ", items);
                        if (items.length > 0)
                            synchAPICalls(items);
                        else
                            return res.json({success: true, feeds: []});
                        console.log("end");
                    } else {
                        return res.json({success: true, feeds: []});
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
                    return res.json({success: false});
                } else if (team) {
                    var slackGroupId = team.slackGroupId;
                    if (slackGroupId != null && slackGroupId != '') {
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else if (user) {
                                var accessToken = user.slackToken;
                                if (accessToken != null && accessToken != '') {
                                    request.get({
                                        url: 'https://slack.com/api/chat.postMessage?token='+accessToken+'&channel='+slackGroupId+'&text='+msg+"&as_user=false&username="+user.fullname
                                    }, function (err, response) {
                                        if(err) {
                                            console.log("chat.postMessage  error");
                                            return res.json({success: false});
                                        } else {
                                            console.log("chat.postMessage  ok");
                                            var result = JSON.parse(response.body);
                                            console.log("chat.postMessage result = ", result);
                                            return res.json({success: true});
                                        }
                                    });
                                } else {
                                    return res.json({success: false});
                                }
                            } else {
                                return res.json({success: false});
                            }
                        });
                    }
                }
            });
        }
    }
}