var async = require("async");

module.exports = function (opts) {
    var userModel = opts.models.User,
        teamModel = opts.models.Team,
        teamMemberModel = opts.models.TeamMember;
		adventureModel = opts.models.Adventure;
        
    return {
        "post#createTeam" : function (req, res) {
            var name = req.body.name,
                description = req.body.description,
                image = req.body.image,
                team = new teamModel();
                
            team.owner = req.user._id;
            team.name = name;
            team.description = description;
            team.image = image;
            team.teamMembers = [];

			console.log(team);
            
            var founder = new teamMemberModel();
            founder.title = "Founder";
            founder.user = req.user._id;
            
            founder.save(function (err, founder) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else {
                    team.teamMembers.push(founder._id);
                    team.save(function (err, team) {
                        if (err) {
                            console.log(err);
                            founder.remove(function () {
                                return res.json({ success : false });
                            });
                        } else {
                            return res.json({ success : true, id : team._id });
                        }
                    });
                }
            });
        },
        
        "post#getTeam" : function (req, res) {
            var id = req.body.id;			
			teamModel.findById(id).populate("owner teamMembers").exec(function (err, team) {
				if (err) {
				   console.log(err);
				   return res.json({ success : false });
				} else if (team) {
					async.parallel([
						function(cb){
							userModel.populate(team.teamMembers, { path : "user" }, function (err, teamMembers) {
								if (err) {
									console.log(err);	
								} else {
									team.teamMembers = teamMembers;
								}
								cb(err, teamMembers);
							});
						},
						function(cb){
							adventureModel.find({ team : id }, function(err, advs){
								if(err){
									console.log(err);
									cb(err, []);
								} else {
									cb(err, advs);
								}
							});
						}],
						function (err, vals) {
							console.log(team);
							if (err) {
								return res.json({ success : false });
							} else {
								return res.json({ success : true, team : team, advs : vals[1] });
							}
						});
				} else {
					return res.json({ success : false });
				}
			});				
        },
		
		"post#searchTeam" : function (req, res) {
            var term = req.body.term;
                
            //teamModel.find({ $or : [ {name : new RegExp(term, 'i')}, {description : new RegExp(term, 'i')}, {tags : { $in : tags } } ] }, function (err, teams) {
			teamModel.find({ $or : [ {name : new RegExp(term, 'i')}, {description : new RegExp(term, 'i')} ] }).populate("owner teamMembers").exec(function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({ teams : [] });
                } else {
                    return res.json({ teams : teams });
                }
            });
        },

		"post#newTeam" : function (req, res) {
			var date = new Date();
			date.setDate(date.getDate() - 7);
			console.log(date);
			teamModel.find({"createdAt": {$gt: date}}, function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({ teams : [] });
                } else {
                    return res.json({ teams : teams });
                }
            });
		},

		"post#lastTeam" : function (req, res) {
			console.log("getting last teams");
            teamModel.find({}, function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({ teams : [] });
                } else {
					console.log(teams.length);
                    return res.json({ teams : teams });
                }
            });
		},
		
		"post#adsearchTeam" : function (req, res) {
            var name = req.body.name;
			var description = req.body.description;
                
			if (name != "undefined" && description != "undefined") {
				teamModel.find({ name : new RegExp(name, 'i'), description : new RegExp(description, 'i') }).populate("owner teamMembers").exec(function (err, teams) {
					if (err) {
						console.log(err);
						return res.json({ teams : [] });
					} else {
						return res.json({ teams : teams });
					}
				});
			} else if (name != "undefined") {
				teamModel.find({ name : new RegExp(name, 'i') }).populate("owner teamMembers").exec(function (err, teams) {
					if (err) {
						console.log(err);
						return res.json({ teams : [] });
					} else {
						return res.json({ teams : teams });
					}
				});
			} else if (description != "undefined") {
				teamModel.find({ description : new RegExp(description, 'i') }).populate("owner teamMembers").exec(function (err, teams) {
					if (err) {
						console.log(err);
						return res.json({ teams : [] });
					} else {
						return res.json({ teams : teams });
					}
				});
			}
        },
        
        "get#myTeams" : function (req, res) {
			teamMemberModel.find( { user : req.user._id }, function(err, members){
				console.log(members);
				if(err){
					console.log(err);
					return res.json({ success : false });
				} else {
					var member_ids = [];
					if( !members ) member_ids = [];
					else {
						for(var i = 0; i < members.length; i++) member_ids.push(members[i]._id);
					}
					teamModel.find({ $or : [ { owner : req.user._id }, { teamMembers : { $in : member_ids } } ] }).populate("owner teamMembers").exec(function (err, teams) {
						if (err) {
							console.log(err);
							return res.json({ success : false });
						} else {
							return res.json({ success : true, teams : teams });
						}
					});
				}
			});
        },
		
        "get#userTeams" : function (req, res) {
			teamMemberModel.find( { user : req.body.userid }, function(err, members){
				console.log(members);
				if(err){
					console.log(err);
					return res.json({ success : false });
				} else {
					var member_ids = [];
					if( !members ) member_ids = [];
					else {
						for(var i = 0; i < members.length; i++) member_ids.push(members[i]._id);
					}
					teamModel.find({ $or : [ { owner : req.user._id }, { teamMembers : { $in : member_ids } } ] }).populate("owner teamMembers").exec(function (err, teams) {
						if (err) {
							console.log(err);
							return res.json({ success : false });
						} else {
							return res.json({ success : true, teams : teams });
						}
					});
				}
			});
        },
		
		"post#leaveTeam" : function (req, res) {
			var id = req.body.id;
				
			async.parallel([
                function (cb) {
                    teamMemberModel.find( { user : req.user._id }, function(err, members){
						if(err){
							console.log(err);
							cb(err)
						} else {
							var member_ids = [];
							if( !members ) member_ids = [];
							else {
								for(var i = 0; i < members.length; i++) member_ids.push(members[i]._id);
							}
							cb(err, member_ids);
						}
					});
                },
				
				function (cb) {
                    teamModel.findOne( { _id : id }, function(err, team){
						if(err){
							console.log(err);
							cb(err)
						} else if(team) {
							cb(err, team);
						} else {
							cb();
						}
					});
                },
				
            ], function (err, vals) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else {
                    var member_ids = vals[0];
					var team = vals[1];
					var remove_id = -1;
					
					if(!team) return res.json({ success : false });
					
					for(var i = team.teamMembers.length - 1; i >= 0; i--){
						for(var j = 0; j < member_ids.length; j++){
							if(team.teamMembers[i].toString() === member_ids[j].toString()){
								remove_id = team.teamMembers[i];
								team.teamMembers.splice(i, 1);
							}
						}
					}
					
					if(remove_id != -1){
						team.save(function(err, team){
							if(err){
								return res.json({ success : false });
							} else {
								teamMemberModel.findOneAndRemove({_id : remove_id}, function(){});
							}
						});
					}
					
                    return res.json({ success : true });
                }
            })
        },

		"get#myOwnTeams" : function (req, res) {
            teamModel.find({ owner : req.user._id }).populate("owner teamMembers").exec(function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else {
                    return res.json({ success : true, teams : teams });
                }
            });
        },
        
        "post#editTeam" : function (req, res) {
            var id = req.body.id,
                name = req.body.name,
                description = req.body.description;
            
            teamModel.findOne({ _id : id, owner : req.user._id}, function (err, team) {
               if (err) {
                   console.log(err);
                   return res.json({ success : false });
               } else if (team) {
                   team.name = name;
                   team.description = description;
                   
                   team.save(function (err, team) {
                       if (err) {
                           console.log(err);
                           return res.json({ success : false });
                       } else {
                           return res.json({ success : true });
                       }
                   });
               } else {
                   return res.json({ success : false });
               }
            });
        },
        
        "post#removeTeam" : function (req, res) {
            var id = req.body.id;
            teamModel.findOne({ _id : id, owner : req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if (team) {
                    team.remove(function (err) {
                       if (err) {
                           console.log(err);
                           return res.json({ success : false });
                       } else {
                           return res.json({ success : true });
                       }
                    });
                } else {
                    return res.json({ success : false });
                }
            });
        },
        
        "post#addTeamMember" : function (req, res) {
            var title = req.body.title,
                roles = req.body.roles,
                description = req.body.description,
                team = req.body.team;
            
            teamModel.findOne({ id : team, owner : req.user._id }, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if (team) {
                    var teamMember = new teamMemberModel();
                    teamMember.title = title;
                    teamMember.roles = roles;
                    teamMember.description = description;
                    
                    teamMember.save(function (err, teamMember) {
                       if (err) {
                           console.log(err);оойцо 
                           return res.json({ success : false });
                       } 
                    });
                } else {
                    return res.json({ success : false });
                }
            });
        },
        
        "post#updateTeamMember" : function (req, res) {
            var id = req.body._id,
                title = req.body.title,
                status = req.body.status,
                description = req.body.description,
                roles = req.body.roles;
            
            teamModel.findOne({ teamMembers : id, owner : req.user._id }, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false });
                } else if (team) {
                    teamMemberModel.findById(id, function (err, member) {
                       if (err) {
                           console.log(err);
                           return res.json({ success : false });
                       } else if (member) {
                           member.title = title;
                           member.status = status;
                           member.description = description;
                           member.roles = roles;
                           
                           member.save(function (err, member) {
                               if (err) {
                                   console.log(err);
                                   return res.json({ success : false });
                               } else {
                                   return res.json({ success : true });
                               }
                           });
                       } else {
                           return res.json({ success : false });
                       }
                    });
                } else {
                    return res.json({ success : false });
                }
            });
        }
    }
}