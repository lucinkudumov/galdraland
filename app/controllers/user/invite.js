var async = require("async"),
        nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: 'Yahoo',
    auth: {
        user: "noreply@holomathics.com",
        pass: "4G92kut51ms02kf0903"
    }
});

module.exports = function (opts) {
    var userModel = opts.models.User,
            emailModel = opts.models.Email,
            teamModel = opts.models.Team,
            teamMemberModel = opts.models.TeamMember,
            inviteModel = opts.models.Invite;
    var recommendationModel = opts.models.Recommendation;
    var slacknoauthModel = opts.models.SlackNoAuth;

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    return {
        "post#getUsers": function (req, res) {
            var username = req.body.usernameOrEmail,
                    userId = req.user._id;

            userModel.find({$or: [{username: new RegExp(username, 'i')}, {email: new RegExp(username, 'i')}], $and: [{id: {$ne: userId}}]}, function (err, users) {
                if (err) {
                    console.log(err);
                    return res.json({users: []});
                } else {
                    return res.json({users: users});
                }
            });
        },
        "post#getViewUser": function (req, res) {
            var userid = req.body.userid;

            userModel.findById(userid).exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({user: []});
                } else {
                    return res.json({user: user});
                }
            });
        },
        "post#getUser": function (req, res) {
            var userid = req.body.userid;

            userModel.find({id: userid}, function (err, users) {
                if (err) {
                    console.log(err);
                    return res.json({users: []});
                } else {
                    return res.json({users: users});
                }
            });
        },
        "post#sendContact": function (req, res) {
            var toEmail = req.body.toEmail,
                fromEmail = req.body.fromEmail,
                text = req.body.text,
                subject = req.body.subject;

            var sendgrid   = require("sendgrid")('app21828601@heroku.com', 'rdesakjw4283');

            sendgrid.send({
                to: toEmail,
                from: fromEmail,
                subject: subject,
                text: text,
                replyto: fromEmail
            }, function(err, json){
                console.log("send mail result = ", json);
                if(err) {
                    console.log("send mail error = ", err);
                    return res.json({success: false});
                }
                else
                    return res.json({success: true});
            });
        },
        "post#sendInvite": function (req, res) {
            var invites = req.body.invites,
                    msg = req.body.msg,
                    roles = req.body.roles,
                    team = req.body.team;

            teamModel.findOne({_id: team, owner: req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    async.forEach(invites, function (item, cb) {
                        if(item.fb_id != -1)
                            return true;
                        userModel.findOne({$or: [{_id: item.memberId}, {profileId: item.fb_id}]}).exec(function (err, user) {
                            var invite = new inviteModel;
                            var toEmail = "", username = "";

                            if (err) {
                                cb(err);
                            } else {
                                invite.to = item.user;
                                invite.toId = item.memberId;
                                toEmail = user.email;
                                username = item.user;
                                title = item.title.title;

                                invite.from = req.user._id;
                                invite.title = title;
                                invite.title_id = item.title._id;
                                invite.roles = roles;
                                invite.message = msg;
                                invite.team = team;

                                invite.save(function (err, invite) {
                                    if (err) {
                                        cb(err);
                                    } else {
                                        smtpTransport.sendMail({
                                            from: "noreply@holomathics.com", // sender address
                                            to: toEmail, // list of receivers
                                            subject: "Invite to " + team.name, // Subject line
                                            text: "Hello, " + username + ", \n" +
                                                    "You recived invite to \"" + team.name + "\" team as " + title + ".\n" +
                                                    "If you want to accept it, please, use next link: http://galdraland.com \n" +
                                                    "Thanks, Galdraland team.",
                                            html: "Hello, " + username + ", <br>" +
                                                    "You recived invite to " + team.name + " as " + title + ".<br>" +
                                                    "If you want to accept it, please, use next link: http://galdraland.com/ <br>" +
                                                    "Thanks, Galdraland team."
                                        }, function (err) {
                                            cb(err);
                                        });
                                    }
                                });
                            }

                        });
                    }, function (err) {
                        if (err) {
                            console.log(err);
                            return res.json({success: true});
                        } else {
                            return res.json({success: true});
                        }
                    });
                }
                else {
                    return res.json({success: false});
                }
            });
        },
        "post#sendRecommendation": function (req, res) {
            var recommendation_user = req.body.recommendation_user,
                master_user = req.body.master_user,
                team = req.body.team,
                adventure = req.body.adventure,
                recommendates = req.body.recommendates,
                type = req.body.type;
            var msgs = [];
            async.forEach(recommendates, function (item, cb) {
                if(item.fb_id != -1)
                    return true;
                var recommendation = new recommendationModel;
                recommendation.recommendationId = recommendation_user._id;
                recommendation.recommendationUserName = recommendation_user.fullname;
                recommendation.recommendationUserPhoto = recommendation_user.photo;
                recommendation.masterId = master_user._id;
                recommendation.masterUserName = master_user.fullname;
                recommendation.masterUserPhoto = master_user.photo;
                recommendation.slaveId = item.memberId;
                recommendation.slaveUserName = item.user;
                recommendation.slaveUserPhoto = item.photo;
                if (type == "teams") {
                    recommendation.roleId = item.title._id;
                    recommendation.roleTitle = item.title.title;
                }
                recommendation.type = type;
                if (team != null) {
                    recommendation.teamId = team._id;
                    recommendation.teamName = team.name;
                    recommendation.teamImage = team.image;
                }
                if (adventure != null) {
                    recommendation.adventureId = adventure._id;
                    recommendation.adventureName = adventure.name;
                    recommendation.adventureImage = adventure.image;
                }
                var toMasterMsg = "";
                var toSlaveMsg = "";

                if (type == "teams") {
                    toMasterMsg = "User '"+recommendation.recommendationUserName+"' has recommended User '"+
                        recommendation.slaveUserName+"' for Role -"+recommendation.roleTitle+"- in your Team '" + recommendation.teamName + "'";
                    toSlaveMsg = "User '"+ recommendation.recommendationUserName+"' has recommended you for Role -"+recommendation.roleTitle+
                        "- in "+recommendation.masterUserName+"'s Team '" + recommendation.teamName+"'";
                } else {
                    toMasterMsg = "User '"+ recommendation.recommendationUserName+"' has recommended User '"+
                        recommendation.slaveUserName +"' in your Adventure '" + recommendation.adventureName + "'";
                    toSlaveMsg = "User '" + recommendation.recommendationUserName + "' has recommended you in "+recommendation.masterUserName+"'s Adventure '" + recommendation.adventureName+"'";
                }

                recommendation.masterMsg = toMasterMsg;
                recommendation.slaveMsg = toSlaveMsg;

                /* check already send recommendation */
                if (type == "teams") {
                    recommendationModel.find({
                        recommendationId: recommendation.recommendationId,
                        masterId: recommendation.masterId,
                        slaveId: recommendation.slaveId,
                        roleId: recommendation.roleId,
                        teamId: recommendation.teamId
                    }, function (success, recommendates) {
                        if (recommendates.length == 0) {
                            recommendation.save(function (err, recommendation) {
                                if (err) {
                                    cb(err);
                                    return res.json({success: false, msg:"Occurs Error!"});
                                }
                            });
                        } else {
                            var msg = "You have already recommendated User '"+
                            recommendation.slaveUserName+"' for role '" + recommendation.roleTitle + "' in '" +
                            recommendation.masterUserName + "'`s team '" + recommendation.teamName +"'";
                            msgs.push(msg);
                        }
                    }, function (err) {
                        console.log(err);
                        return res.json({success: false, msg:"Occurs Error!"});
                    });
                } else {
                    recommendationModel.find({
                        recommendationId: recommendation.recommendationId,
                        masterId: recommendation.masterId,
                        slaveId: recommendation.slaveId,
                        adventureId: recommendation.adventureId
                    }, function (success, recommendates) {
                        if (recommendates.length == 0) {
                            recommendation.save(function (err, recommendation) {
                                if (err) {
                                    cb(err);
                                    console.log(err);
                                    return res.json({success: false, msg:"Occurs Error!"});
                                }
                            });
                        } else {
                            var msg = "You have already recommendated User '"+
                                recommendation.slaveUserName+" in '" +
                                recommendation.masterUserName + "'`s adventure '" + recommendation.teamName +"'";
                            msgs.push(msg);
                        }
                    }, function (err) {
                        console.log(err);
                        return res.json({success: false, msg:"Occurs Error!"});
                    });
                }
            });
            return res.json({success: true, msgs: msgs});
        },
        "get#getMasterRecommendates": function (req, res) {
            recommendationModel.find({masterId: req.user._id, masterViewed: false}, function (err, recommendates) {
                return res.json({success: true, recommendates: recommendates});
            }, function (err) {
                console.log(err);
            });
        },
        "get#getSlaveRecommendates": function (req, res) {
            recommendationModel.find({slaveId: req.user._id, slaveViewed: false}, function (err, recommendates) {
                return res.json({success: true, recommendates: recommendates});
            }, function (err) {
                console.log(err);
            });
        },
        "post#applyRecommendates": function (req, res) {
            var id = req.body.id;
            var position = req.body.position;
            if (position == "master") {
                recommendationModel.findOneAndUpdate({_id: id}, {$set: {masterViewed: true}}, {new: true}, function (err, recommendate) {
                    if (err) {
                        console.log(err);
                        return res.json({success: false});
                    } else if (recommendate) {
                        return res.json({success: true});
                    }
                });
            } else if (position == "slave") {
                recommendationModel.findOneAndUpdate({_id: id}, {$set: {slaveViewed: true}}, {new: true}, function (err, recommendate) {
                    if (err) {
                        console.log(err);
                        return res.json({success: false});
                    } else if (recommendate) {
                        return res.json({success: true});
                    }
                });
            }
        },
        "post#acceptInvite": function (req, res) {
            var id = req.body.id;
            inviteModel.findOneAndUpdate({_id: id, closed: false, toId: req.user._id}, {accepted: true, declined: false}, function (err, invite) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (invite) {
                    teamModel.findOne({_id: invite.team}, function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else if (team) {
                            userModel.findOne({_id: invite.from}, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else {
                                    teamMemberModel.findOne({_id: invite.title_id}, function (err, teamMember) {
                                        if (err) {
                                            console.log(err);
                                            return res.json({success: false});
                                        } else {
                                            teamMember.title = invite.title;
                                            teamMember.user = invite.toId;
                                            teamMember.roles = invite.roles;
                                            teamMember.save(function (err, member) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.json({success: false});
                                                } else if (member) {
                                                    team.save(function (err, uTeam) {
                                                        if (err) {
                                                            console.log(err);
                                                            return res.json({success: false});
                                                        } else {
                                                            userModel.findOne({_id: req.user._id}, function (err, user) {
                                                                if (err) {
                                                                    console.log(err);
                                                                    return res.json({success: false});
                                                                } else {
                                                                    if (user.slackUser && user.slackUser != '' && user.slackToken && user.slackToken != '') {
                                                                        return res.json({success: true});
                                                                    } else {
                                                                        slacknoauthModel.findOne({user: req.user._id}, function (err, entry) {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                return res.json({success: false});
                                                                            } else if(entry) {
                                                                                return res.json({success: true});
                                                                            } else {
                                                                                var slacknoauth = new slacknoauthModel;
                                                                                slacknoauth.user = req.user._id;
                                                                                slacknoauth.save();
                                                                                return res.json({success: true});
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            return res.json({success: false});
                        }
                    });
                }
            });
      },
        "post#rejectInvite": function (req, res) {
            var id = req.body.id;

            inviteModel.findOneAndUpdate({_id: id, closed: false, toId: req.user._id}, {declined: true, accepted: false}, function (err, numberAffected, invite) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (invite) {
                    teamModel.findOne({_id: invite.team}, function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else if (team) {
                            userModel.findOne({_id: invite.from}, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else {
//                                    smtpTransport.sendMail({
//                                        from: "noreply@holomathics.com",
//                                        to: user.email,
//                                        subject: req.user.username + " has declined your invite to your team \"" + team.name + "\"",
//                                        text: req.user.username + " has declined your invite to your team \"" + team.name + "\"" + "\n" +
//                                                "Thanks, Galdraland team",
//                                        html: req.user.username + " has declined your invite to your team \"" + team.name + "\"" + "<br>" +
//                                                "Thanks, Galdraland team"
//                                    }, function (err) {
//                                        if (err) {
//                                            console.log(err);
//                                        }
//                                    });
                                    return res.json({success: true});
                                }
                            });
                        } else {
                            return res.json({success: false});
                        }
                    });

                }
            });
        },
        "post#closeInvite": function (req, res) {
            var id = req.body.id;

            inviteModel.findOneAndUpdate({_id: id, closed: false, from: req.user._id}, {closed: true}, function (err, numberAffected, invite) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    return res.json({success: true});
                }
            });
        },
        "get#getInvites": function (req, res) {
            async.parallel([
                function (cb) {
                    inviteModel.find({from: req.user._id, accepted: true, closed: false}, function (err, invites) {
                        var inviteObjs = [];
                        async.forEach(invites, function (item, callback) {
                            teamModel.findOne({_id: item.team}, function (err, team) {
                                if (err) {
                                    callback(err);
                                } else {
                                    userModel.findOne({_id: item.from}, function (err, from) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            if (team == null) {
                                                callback();
                                                return;
                                            }
                                            item = item.toObject();
                                            item.team = team;
                                            item.teamId = team._id;
                                            item.fromName = from.username;
                                            inviteObjs.push(item);
                                            callback();
                                        }
                                    });
                                }
                            });
                        }, function (err) {
                            cb(err, inviteObjs);
                        });
                    });
                },
                function (cb) {
                    inviteModel.find({from: req.user._id, declined: true, closed: false}, function (err, invites) {
                        var inviteObjs = [];
                        async.forEach(invites, function (item, callback) {
                            teamModel.findOne({_id: item.team}, function (err, team) {
                                if (err) {
                                    callback(err);
                                } else {
                                    userModel.findOne({_id: item.from}, function (err, from) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            if (team == null) {
                                                callback();
                                                return;
                                            }
                                            item = item.toObject();
                                            item.team = team;
                                            item.teamId = team._id;
                                            item.fromName = from.username;
                                            inviteObjs.push(item);
                                            callback();
                                        }
                                    });
                                }
                            });
                        }, function (err) {
                            cb(err, inviteObjs);
                        });
                    });
                },
                function (cb) {
                    inviteModel.find({toId: req.user._id, closed: false, accepted: false, declined: false}, function (err, invites) {
                        var inviteObjs = [];
                        async.forEach(invites, function (item, callback) {
                            teamModel.findOne({_id: item.team}, function (err, team) {
                                if (err) {
                                    callback(err);
                                } else {
                                    userModel.findOne({_id: item.from}, function (err, from) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            if (team == null) {
                                                callback();
                                                return;
                                            }
                                            item = item.toObject();
                                            item.team = team;
                                            item.teamId = team._id;
                                            item.fromName = from.username;

                                            inviteObjs.push(item);
                                            callback();
                                        }
                                    });
                                }
                            });
                        }, function (err) {
                            cb(err, inviteObjs);
                        });
                    });
                }
            ], function (err, invites) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, invites: []});
                } else {
                    var a = invites[0];
                    a = a.concat(invites[1]);
                    a = a.concat(invites[2]);
                    return res.json({success: true, invites: a});
                }
            })
        }
    }
}