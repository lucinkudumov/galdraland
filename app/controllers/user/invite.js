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
            recommendationModel = opts.models.Recommendation;

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
                if(err)
                    return res.json({success: false});
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
                                                    "Thanks, Galdraland team.",
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
            console.log("calling..");
            var recommendation_user = req.body.recommendation_user,
                master_user = req.body.master_user,
                team = req.body.team,
                adventure = req.body.adventure,
                recommendates = req.body.recommendates,
                toMasterMsg = req.body.toMasterMsg,
                toSlaveMsg = req.body.toSlaveMsg,
                type = req.body.type;
            async.forEach(recommendates, function (item, cb) {
                if(item.fb_id != -1)
                    return true;
                var recommendation = new recommendationModel;
                recommendation.recommendationId = recommendation_user._id;
                recommendation.recommendationUserName = recommendation_user.fullname;
                recommendation.masterId = master_user._id;
                recommendation.masterUserName = master_user.fullname;
                recommendation.slaveId = item.memberId;
                recommendation.slaveUserName = item.user;
                recommendation.roleId = item.title._id;
                recommendation.roleId = item.title.title;
                recommendation.type = type;
                if (team != null)
                    recommendation.team = team._id;
                if (adventure != null)
                    recommendation.adventure = adventure._id;

                async.parallel([
                    function (cb) {
                        recommendation.kind = "master";
                        recommendation.msg = toMasterMsg;
                        recommendation.save(function (err, recommendation) {
                            if (err) {
                                cb(err);
                                console.log(err);
                                return res.json({success: false});
                            }
                        });
                    },
                    function (cb) {
                        recommendation.kind = "slave";
                        recommendation.msg = toSlaveMsg;
                        recommendation.save(function (err, recommendation) {
                            if (err) {
                                cb(err);
                                console.log(err);
                                return res.json({success: false});
                            }
                        });
                    }
                ], function (err) {
                    console.log(err);
                    return res.json({success: false});
                })
            });
            return res.json({success: true});
        },
        "get#getRecommendates": function (req, res) {
            async.parallel([
                function (cb) {
                    recommendationModel.find({masterId: req.user._id, viewed: false}, function (err, recommendates) {
                        var recommendateObjs = [];
                        async.forEach(recommendates, function (item, callback) {
                                item = item.toObject();
                                recommendateObjs.push(item);
                            });
                        }, function (err) {
                            cb(err, inviteObjs);
                        });
                },
                function (cb) {
                    recommendationModel.find({slaveId: req.user._id, accepted: false}, function (err, recommendates) {
                        var recommendateObjs = [];
                        async.forEach(recommendates, function (item, callback) {
                            item = item.toObject();
                            recommendateObjs.push(item);
                        });
                    }, function (err) {
                        cb(err, inviteObjs);
                    });
                }
            ], function (err, recommendates) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, recommendates: []});
                } else {
                    console.log("recommendateObjs = ", recommendateObjs);
                    return res.json({success: true, recommendates: recommendateObjs});
                }
            })
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
                                    // var teamMember = new teamMemberModel;
                                    // teamMember.title = invite.title;
                                    // teamMember.user = invite.toId;
                                    // teamMember.roles = invite.roles;
                                    // teamMember.save(function (err, member) {
                                    //     if (err) {
                                    //         console.log(err);
                                    //         return res.json({success: false});
                                    //     } else if (member) {
                                    //         team.teamMembers.push(member);
                                    //         team.save(function (err, uTeam) {
                                    //             if (err) {
                                    //                 console.log(err);
                                    //                 return res.json({success: false});
                                    //             } else {
                                    //                 smtpTransport.sendMail({
                                    //                     from: "noreply@holomathics.com",
                                    //                     to: user.email,
                                    //                     subject: req.user.username + " has accepted your invite to your team \"" + team.name + "\"",
                                    //                     text: req.user.username + " has accepted your invite to your team \"" + team.name + "\"" + "\n" +
                                    //                             "Thanks, Galdraland team",
                                    //                     html: req.user.username + " has accepted your invite to your team \"" + team.name + "\"" + "<br>" +
                                    //                             "Thanks, Galdraland team",
                                    //                 }, function (err) {
                                    //                     if (err) {
                                    //                         console.log(err);
                                    //                     }
                                    //                 });
                                    //                 return res.json({success: true});
                                    //             }
                                    //         });
                                    //     }
                                    // });
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
                                                            smtpTransport.sendMail({
                                                                from: "noreply@holomathics.com",
                                                                to: user.email,
                                                                subject: req.user.username + " has accepted your invite to your team \"" + team.name + "\"",
                                                                text: req.user.username + " has accepted your invite to your team \"" + team.name + "\"" + "\n" +
                                                                        "Thanks, Galdraland team",
                                                                html: req.user.username + " has accepted your invite to your team \"" + team.name + "\"" + "<br>" +
                                                                        "Thanks, Galdraland team",
                                                            }, function (err) {
                                                                if (err) {
                                                                    console.log(err);
                                                                }
                                                            });
                                                            return res.json({success: true});
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

            inviteModel.findOneAndUpdate({_id: id, closed: false, toId: req.user._id}, {declined: true, approved: false}, function (err, numberAffected, invite) {
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
                                    smtpTransport.sendMail({
                                        from: "noreply@holomathics.com",
                                        to: user.email,
                                        subject: req.user.username + " has declined your invite to your team \"" + team.name + "\"",
                                        text: req.user.username + " has declined your invite to your team \"" + team.name + "\"" + "\n" +
                                                "Thanks, Galdraland team",
                                        html: req.user.username + " has declined your invite to your team \"" + team.name + "\"" + "<br>" +
                                                "Thanks, Galdraland team",
                                    }, function (err) {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
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