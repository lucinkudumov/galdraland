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
        applyModel = opts.models.Apply;
   
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 
    
    return {
        "post#sendApply" : function (req, res) {
            var msg   = req.body.msg,
                memberId = req.body.title,
                roles = req.body.roles,
				memberList = req.body.memberList,
                team  = req.body.team;
            
            teamModel.findOne({ _id : team }).populate("owner").exec( function (err, team) {
                if (err) {
                    console.log("team error");
                    return res.json({ success : false });
                } else if (team) {				
					var apply = new applyModel;
					var toEmail = "", username = "";

					apply.to = team.owner;
					toEmail = team.owner.email;
					username = team.owner.username;
					
					for(var i = 0; i < memberList.length; i++) {
						if (memberList[i]._id == memberId) {
							apply.title = memberList[i].title;
							break;
						}
					}
					apply.from = req.user._id;
					apply.roles = roles;
					apply.message = msg;
					apply.team = team;
					apply.memberId = memberId;
					
					console.log(apply);
						
					apply.save(function (err, apply) {
						if (err) {
							console.log(err);
							return res.json({ success : false });
						} else {
							smtpTransport.sendMail({
								from: "noreply@holomathics.com", // sender address
								to: toEmail, // list of receivers
								subject: "Team member request to " + team.name, // Subject line
								text: "Hello, " + username + ", \n" + 
									  "You have received a request from " + req.user.username + " for the member role " + roles.join(",") + " to \"" + team.name + "\" team as " + title + ".\n" +
									  "If you want to accept it, please, use next link: http://galdraland.com \n" + 
									  "Thanks, Galdraland team.",
								html: "Hello, " + username + ", <br>" + 
									  "You have received a request from " + req.user.username + " for the member role " + roles.join(",") + " to \"" + team.name + "\" team as " + title + ".<br>" +
									  "If you want to accept it, please, use next link: http://galdraland.com/ <br>" + 
									  "Thanks, Galdraland team.",
							}, function (err) {
								console.log(err);
								return res.json({ success : false });
							});
						}
					});
                }
                else {
					console.log('here');
                    return res.json({ success : false });
                }
            }); 
        },
  
        "post#approveApply" : function (req, res) {
            var id = req.body.id;
		            
            applyModel.findOneAndUpdate({ _id : id, closed : false, to : req.user._id }, { ownerApproved : true, ownerRejected : false }, function (err, apply) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if( apply ) {
                    teamModel.findOne({ _id : apply.team }, function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({ success : false });
                        } else if (team) {
                            userModel.findOne({ _id : apply.from }, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({ success : false });
                                } else {
									teamMemberModel.findOne({ _id : apply.memberId }, function (err, teamMember) {
										if (err) {
											console.log(err);
											return res.json({ success : false });
										} else {
											if (teamMember.user.profileId != '000000000000000000000000') {
												console.log(err);
												return res.json({ success : false });
											}
											
											teamMember.user = apply.from;
											teamMember.roles = apply.roles;
											teamMember.save(function (err, member) {
												if (err) {
													console.log(err);
													return res.json({ success : false });
												} else {
													smtpTransport.sendMail({
														from: "noreply@holomathics.com",
														to: user.email,
														subject: "Your request has been approved by " + req.user.username,
														text: "Your request to join " + team.name + " has been approved by " + req.user.username + "\n" +
															  ">>> " + apply.message + "\n" +
															  "Thanks, Galdraland team",
														html: "Your request to join " + team.name + " has been approved by " + req.user.username +  + "<br>" +
															  ">>> " + apply.message + "<br>" +
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
		
		
		"post#rejectApply" : function (req, res) {
            var id = req.body.id;

            applyModel.findOneAndUpdate({ _id : id, closed : false, to : req.user._id }, { ownerRejected : true, ownerApproved : false }, function (err, numberAffected, apply) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if( apply ) {
                    teamModel.findOne({ _id : apply.team }, function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({ success : false });
                        } else if (team) {
                            userModel.findOne({ _id : apply.from }, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({ success : false });
                                } else {
									smtpTransport.sendMail({
										from: "noreply@holomathics.com",
										to: user.email,
										subject: "Your request has been rejected by " + req.user.username,
										text: "Your request to join " + team.name + " has been rejected by " + req.user.username + "\n" +
											  ">>> " + apply.message + "\n" +
											  "Thanks, Galdraland team",
										html: "Your request to join " + team.name + " has been rejected by " + req.user.username +  + "<br>" +
											  ">>> " + apply.message + "<br>" +
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
		
		
		"post#closeApply" : function (req, res) {
            var id = req.body.id;
            
            applyModel.findOneAndUpdate({ _id : id, closed : false, from : req.user._id }, { closed : true }, function (err, numberAffected, apply) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else {
                    return res.json({ success : true });
                }
            });
        },
            
        "get#getApplies" : function (req, res) {
            async.parallel([
                function (cb) {
                    applyModel.find({ from : req.user._id, ownerApproved : true, closed : false }, function (err, applies) {
                        var applyObjs = [];
                        async.forEach(applies, function (item, callback) {
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
                                           applyObjs.push(item);
                                           callback();
                                       }
                                    });
                                }
                            });
                        }, function (err) {
                            cb(err, applyObjs);
                        });
                    });
                },
				function (cb) {
                    applyModel.find({ from : req.user._id, ownerRejected : true, closed : false }, function (err, applies) {
                        var applyObjs = [];
                        async.forEach(applies, function (item, callback) {
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
                                           applyObjs.push(item);
                                           callback();
                                       }
                                    });
                                }
                            });
                        }, function (err) {
                            cb(err, applyObjs);
                        });
                    });
                },
                function (cb) {
                    applyModel.find({ to : req.user._id, closed : false, ownerApproved : false, ownerRejected : false }, function (err, applies) {
                        var applyObjs = [];
                        async.forEach(applies, function (item, callback) {
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
                                            
                                           applyObjs.push(item);
                                           callback();
                                       }
                                    });
                                }
                            });
                        }, function (err) {
                            cb(err, applyObjs);
                        });
                    });
                }
            ], function (err, applies) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, applies : [] });
                } else {
                    var a = applies[0];
                    a = a.concat(applies[1]);
					a = a.concat(applies[2]);
                    return res.json({ success : true, applies : a });
                }
            })
        }
    }
}