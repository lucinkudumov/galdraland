var async = require("async"),
    nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
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
   
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 
    
    return {
        "post#getUsers" : function (req, res) {
            var username = req.body.usernameOrEmail,
                userId = req.user._id;
            
            userModel.find({ $or : [{ username : new RegExp(username, 'i') }, { email : new RegExp(username, 'i') }], $and : [{ id : { $ne : userId }}]}, function (err, users) {
                if (err) {
                    console.log(err);
                    return res.json({ users : [] });
                } else {
                    return res.json({ users : users });
                }
            });
        },
        
        "post#sendInvite" : function (req, res) {
            var invites = req.body.invites,
                msg   = req.body.msg,
                title = req.body.title,
                roles = req.body.roles,
                team  = req.body.team;
            
            teamModel.findOne({ _id : team, owner : req.user._id }, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if (team) {
                    async.forEach(invites, function (item,  cb) {
                        userModel.findOne( { $or : [ { _id : item.memberId }, { profileId : item.fb_id } ] } ).exec(function (err, user) {
							var invite = new inviteModel;
							var toEmail = "", username = "";
							
                            if (err) {
                                cb(err);
                            } else {
								invite.to = item.user;
								invite.toId = item.memberId;
								toEmail = user.email;
								username = item.user;
								
								invite.from = req.user._id;
								invite.title = title;
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
												  "If you want to accept it, please, use next link: http://kkkalyosha.wix.com/galdraland \n" + 
												  "Thanks, Galdraland team.",
											html: "Hello, " + username + ", <br>" + 
												  "You recived invite to " + team.name + " as " + title + ".<br>" +
												  "If you want to accept it, please, use next link: http://kkkalyosha.wix.com/galdraland <br>" + 
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
                            return res.json({ success : true });
                        } else {
                            return res.json({ success : true });
                        }
                    });
                }
                else {
                    return res.json({ success : false });
                }
            }); 
        },
        
        "post#acceptInvite" : function (req, res) {
            var id = req.body.id;
		            
            inviteModel.findOneAndUpdate({ _id : id, closed : false, toId : req.user._id }, { accepted : true, declined : false }, function (err, invite) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if( invite ) {
                    teamModel.findOne({ _id : invite.team }, function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({ success : false });
                        } else if (team) {
                            userModel.findOne({ _id : invite.from }, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({ success : false });
                                } else {
									var teamMember = new teamMemberModel;
									teamMember.title = invite.title;
									teamMember.user = invite.toId;
									teamMember.roles = invite.roles;
									teamMember.save(function (err, member) {
										if(err){
											console.log(err);
											return res.json({ success : false });
										} else if( member ) {
											team.teamMembers.push(member);
											team.save(function(err, uTeam){
												if(err){
													console.log(err);
													return res.json({ success : false });
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
													return res.json({ success : true });
												}
											});
										}
									});
								}
                            });
                        } else {
                            return res.json({ success : false });
                        }
                    });
                    
                }
            });
        },
		
		
		"post#rejectInvite" : function (req, res) {
            var id = req.body.id;

            inviteModel.findOneAndUpdate({ _id : id, closed : false, toId : req.user._id }, { declined : true, approved : false }, function (err, numberAffected, invite) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if( invite ) {
                    teamModel.findOne({ _id : invite.team }, function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({ success : false });
                        } else if (team) {
                            userModel.findOne({ _id : invite.from }, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({ success : false });
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
									return res.json({ success : true });
								}
                            });
                        } else {
                            return res.json({ success : false });
                        }
                    });
                    
                }
            });
        },
        
       "post#closeInvite" : function (req, res) {
            var id = req.body.id;
            
            inviteModel.findOneAndUpdate({ _id : id, closed : false, from : req.user._id }, { closed : true }, function (err, numberAffected, invite) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else {
                    return res.json({ success : true });
                }
            });
        },
        
        "get#getInvites" : function (req, res) {
            async.parallel([
                function (cb) {
                    inviteModel.find({ from : req.user._id, accepted : true, closed : false }, function (err, invites) {
                        var inviteObjs = [];
                        async.forEach(invites, function (item, callback) {
                            teamModel.findOne({ _id : item.team }, function (err, team) {
                                if (err) {
                                    callback(err);
                                } else {
                                    userModel.findOne({ _id : item.from }, function (err, from) {
                                       if (err) {
                                           callback(err);
                                       }  else {
										   if( team == null ){
												callback();
												return;
											}
                                           item = item.toObject();
                                           item.team = team;
                                           item.teamId = team._id;
										   item.fromName = from.username;                                            
										   console.log(item);
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
                    inviteModel.find({ from : req.user._id, declined : true, closed : false }, function (err, invites) {
                        var inviteObjs = [];
                        async.forEach(invites, function (item, callback) {
                            teamModel.findOne({ _id : item.team }, function (err, team) {
                                if (err) {
                                    callback(err);
                                } else {
                                    userModel.findOne({ _id : item.from }, function (err, from) {
                                       if (err) {
                                           callback(err);
                                       }  else {
										   if( team == null ){
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
                    inviteModel.find({ toId : req.user._id, closed : false, accepted : false, declined : false }, function (err, invites) {
                        var inviteObjs = [];
                        async.forEach(invites, function (item, callback) {
                            teamModel.findOne({ _id : item.team }, function (err, team) {
                                if (err) {
                                    callback(err);
                                } else {
                                    userModel.findOne({ _id : item.from }, function (err, from) {
                                       if (err) {
                                           callback(err);
                                       }  else {
											if( team == null ){
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
                    return res.json({ success : false, invites : [] });
                } else {
                    var a = invites[0];
                    a = a.concat(invites[1]);
					a = a.concat(invites[2]);
                    return res.json({ success : true, invites : a });
                }
            })
        }
    }
}