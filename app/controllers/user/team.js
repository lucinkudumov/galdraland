var async = require("async");

module.exports = function (opts) {
    var userModel = opts.models.User,
            teamModel = opts.models.Team,
            teamMemberModel = opts.models.TeamMember;
    var adventureModel = opts.models.Adventure;
    var recommendationModel = opts.models.Recommendation;
    var homeviewModel = opts.models.HomeView;
    var inviteModel = opts.models.Invite;

    return {
        "post#upload/image": function (req, res) {
            var file = req.files.file;
            if (file !== 'undefined') {
//                if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
//                    return res.json({success: false, error: "Image file type error"});
//                }

                fs.readFile(file.path, function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.json({success: false, error: "File Save error"});
                    }

                    var newPath = "/app/public/assets/images/upload/";
                    var newName = new Date().toISOString().replace(':', '-').replace(':', '-') + file.name;
                    if (!fs.exists(newPath)) {
                        fs.mkdir(newPath, function (error) {
                            console.log(error);
                        })
                    }
                    var image = new imageModel();
                    image.data.data = data;
                    image.data.contentType = "png";
                    image.name = newName;
                    image.save(function (err, image) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, error: "Internal server error"});
                        }
                    });
                    fs.writeFile(newPath + newName, data, function (err) {
                        if (!err) {
                            console.log(newPath + newName);
                            return res.json({success: true, data: newName});
                        } else {
                            console.log(err);
                            return res.json({success: false, error: "File Save error"});
                        }
                    });
                });
            }
        },
        "post#createTeam": function (req, res) {
            var name = req.body.name,
                    description = req.body.description,
                    image = req.body.image,
                    tags = req.body.tags,
                    fb_page = req.body.fb_page,
                    mission = req.body.mission,
                    team = new teamModel();
            console.log("tags", tags);
            var roles;
            if (req.body.roles) {
                roles = req.body.roles.split(",");
            }

            var teamName = name;
            teamModel.find({name: new RegExp(teamName, 'i')}).populate("owner teamMembers").exec(function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg : "Occur Unknown Error"});
                } else if (teams) {
                    if (teams.length <= 0) {
                        team.owner = req.user._id;
                        team.name = name;
                        team.description = description;
                        team.image = image;
                        team.tags = tags;
                        team.fb_page = fb_page;
                        team.mission = mission;
                        team.teamMembers = [];
                        team.slackGroupId = "";
                        team.slackGroupName = "";
                        team.homeview = true;

                        var i = 0;
                        if (roles) {
                            for (i = 0; i < roles.length; i++) {
                                var member = new teamMemberModel();
                                member.title = roles[i];
                                member.user = req.body.defuser._id;
                                member.save(function (err, member) {
                                    if (err) {
                                        console.log(err);
                                        return res.json({success: false, msg : "Occur Unknown Error"});
                                    } else {
                                        team.teamMembers.push(member._id);
                                    }
                                });
                            }
                        }

                        var founder = new teamMemberModel();
                        founder.title = "Founder";
                        founder.user = req.user._id;

                        founder.save(function (err, founder) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false, msg : "Occur Unknown Error"});
                            } else {
                                team.teamMembers.unshift(founder._id);

                                team.save(function (err, team) {
                                    if (err) {
                                        console.log(err);
                                        founder.remove(function () {
                                            return res.json({success: false, msg : "Occur Unknown Error"});
                                        });
                                    } else {
                                        return res.json({success: true, id: team._id});
                                    }
                                });
                            }
                        });
                    } else {
                        return res.json({success: false, msg : "The Same Team Name already exists." });
                    }
                } else {
                    return res.json({success: false, msg : "Occur Unknown Error"});
                }
            });
        },
        "post#getTeam": function (req, res) {
            var id = req.body.id;
            teamModel.findById(id).populate("owner teamMembers").exec(function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    async.parallel([
                        function (cb) {
                            userModel.populate(team.teamMembers, {path: "user"}, function (err, teamMembers) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    team.teamMembers = teamMembers;
                                }
                                cb(err, teamMembers);
                            });
                        },
                        function (cb) {
                            adventureModel.find({team: id}, function (err, advs) {
                                if (err) {
                                    console.log(err);
                                    cb(err, []);
                                } else {
                                    cb(err, advs);
                                }
                            });
                        }],
                            function (err, vals) {
                                if (err) {
                                    return res.json({success: false});
                                } else {
                                    return res.json({success: true, team: team, advs: vals[1]});
                                }
                            });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#searchTeam": function (req, res) {
            var term = req.body.term;
            var tags = term.split(" ");

            //teamModel.find({ $or : [ {name : new RegExp(term, 'i')}, {description : new RegExp(term, 'i')}, {tags : { $in : tags } } ] }, function (err, teams) {
            teamModel.find({$or: [{name: new RegExp(term, 'i')}, {description: new RegExp(term, 'i')}, {tags: {$in: tags}}]}).populate("owner teamMembers").exec(function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({teams: []});
                } else {
                    return res.json({teams: teams});
                }
            });
        },
        "post#newTeam": function (req, res) {
            var date = new Date();
            date.setDate(date.getDate() - 7);
            teamModel.find({"createdAt": {$gt: date}}, function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({teams: []});
                } else {
                    return res.json({teams: teams});
                }
            });
        },
        "post#badgesTeam": function (req, res) {
            teamModel.find({$and:[{owner: req.user._id}, {"homeview": true}]}, function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({teams: []});
                } else {
                    return res.json({teams: teams});
                }
            });
        },
        "post#newTeamHome": function (req, res) {
            var date = new Date();
            date.setDate(date.getDate() - 7);
            teamModel.find({"createdAt": {$gt: date}}).populate("owner").exec(function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({teams: []});
                } else if(teams) {
                    homeviewModel.find({$and: [{"master" : req.user._id}, {"type" : "team"}]}, function (err, homeviewteams) {
                        var unviewteams = [];
                        if (err) {
                            console.log(err);
                            return res.json({teams: []});
                        } else if (homeviewteams) {
                            for(i = 0; i < teams.length; i++) {
                                var view = false;
                                var teamId = teams[i]._id;
                                for(j = 0; j < homeviewteams.length; j++) {
                                    var homeviewteamId = homeviewteams[j].team;
                                    if (teamId.toString() == homeviewteamId.toString()) {
                                        view = true;
                                        break;
                                    }
                                }
                                if (view === false) {
                                    unviewteams.push(teams[i]);
                                }
                            }
                            return res.json({teams: unviewteams});
                        } else {
                            return res.json({teams: teams});
                        }
                    });
                } else {
                    return res.json({teams: []});
                }
            });
        },
        "post#updateTeamHomeView": function (req, res) {
            var id = req.body.id;
            teamModel.findOne({_id: id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    var homeviewmodel = new homeviewModel();
                    homeviewmodel.master = req.user._id;
                    homeviewmodel.team = team._id;
                    homeviewmodel.type = "team";
                    homeviewmodel.save(function (err) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#lastTeam": function (req, res) {
            teamModel.find({}, function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({teams: []});
                } else {
                    return res.json({teams: teams});
                }
            });
        },
        "post#lastUser": function (req, res) {
            userModel.find({profileId: {'$ne' : "000000000000000000000000"}}, function (err, users) {
                if (err) {
                    console.log(err);
                    return res.json({users: []});
                } else {
                    return res.json({users: users});
                }
            });
        },
        "post#adsearchTeam": function (req, res) {
            var name = req.body.name;
            var description = req.body.description;

            if (name != "undefined" && description != "undefined") {
                teamModel.find({name: new RegExp(name, 'i'), description: new RegExp(description, 'i')}).populate("owner teamMembers").exec(function (err, teams) {
                    if (err) {
                        console.log(err);
                        return res.json({teams: []});
                    } else {
                        return res.json({teams: teams});
                    }
                });
            } else if (name != "undefined") {
                teamModel.find({name: new RegExp(name, 'i')}).populate("owner teamMembers").exec(function (err, teams) {
                    if (err) {
                        console.log(err);
                        return res.json({teams: []});
                    } else {
                        return res.json({teams: teams});
                    }
                });
            } else if (description != "undefined") {
                teamModel.find({description: new RegExp(description, 'i')}).populate("owner teamMembers").exec(function (err, teams) {
                    if (err) {
                        console.log(err);
                        return res.json({teams: []});
                    } else {
                        return res.json({teams: teams});
                    }
                });
            }
        },
        "get#myTeams": function (req, res) {
            teamMemberModel.find({user: req.user._id}, function (err, members) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    var member_ids = [];
                    if (!members)
                        member_ids = [];
                    else {
                        for (var i = 0; i < members.length; i++)
                            member_ids.push(members[i]._id);
                    }
                    teamModel.find({$or: [{owner: req.user._id}, {teamMembers: {$in: member_ids}}]}).populate("owner teamMembers").exec(function (err, teams) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true, teams: teams});
                        }
                    });
                }
            });
        },
        "get#getBadgesByCreateTeam": function (req, res) {
            teamModel.find({owner: req.user._id}, function (err, badges) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, badges: []});
                } else if (badges) {
                    return res.json({success: true, badges: badges});
                } else {
                    console.log(err);
                    return res.json({success: false, badges: []});
                }
            });
        },
        "get#RecommendationTeams": function (req, res) {
            recommendationModel.find({
                recommendationId: req.user._id,
                type: "teams"
            }, function (success, recommendates) {
                if (recommendates.length > 0) {
                    return res.json({success: true, recommendates : recommendates});
                } else {
                    return res.json({success: true, recommendates : []});
                }
            }, function (err) {
                console.log(err);
                return res.json({success: false, recommendates : []});
            });
        },
        "post#getBadgesByRecommend": function (req, res) {
            var teamId = req.body.teamId,
                roleId = req.body.roleId,
                masterId = req.body.masterId,
                slaveId = req.body.slaveId;
            inviteModel.findOne({$and: [{"team" : teamId}, {"title_id" : roleId}, {"from" : masterId}, {"toId" : slaveId}]}, function (err, invites) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (invites) {
                    return res.json({success: true});
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#teamTag/list": function (req, res) {
            var tag = req.body.tag;
            teamModel.find({"tags" : {$in : [tag]}}, function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, teams: []});
                } else {
                    return res.json({success: true, teams: teams});
                }
            });
        },
        "get#myRecommendationTeams": function (req, res) {
            recommendationModel.find({
                slaveId: req.user._id,
                type: "teams"
            }, function (success, recommendates) {
                if (recommendates.length > 0) {
                    return res.json({success: true, recommendates : recommendates});
                } else {
                    return res.json({success: true, recommendates : []});
                }
            }, function (err) {
                console.log(err);
                return res.json({success: false, recommendates : []});
            });
        },
//        "POST#teams/getMembers": function (req, res) {
//            var teams = req.body.teams;
//            var queries = [];
//
//            for (var i = 0; i < teams.length; i++)
//                queries.push({team: teams[i]._id});
//
//            adventureModel.find({$or: queries}, function (err, advs) {
//                if (err) {
//                    console.log(err);
//                    return res.json({success: false, adventures: []});
//                } else {
//                    return res.json({success: true, adventures: advs});
//                }
//            });
//        },

        "post#userTeams": function (req, res) {
            teamMemberModel.find({user: req.body.userid}, function (err, members) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    var member_ids = [];
                    if (!members)
                        member_ids = [];
                    else {
                        for (var i = 0; i < members.length; i++)
                            member_ids.push(members[i]._id);
                    }
                    teamModel.find({$or: [{owner: req.body.userid}, {teamMembers: {$in: member_ids}}]}).populate("owner teamMembers").exec(function (err, teams) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true, teams: teams});
                        }
                    });
                }
            });
        },
        "post#leaveTeam": function (req, res) {
            var id = req.body.id;

            async.parallel([
                function (cb) {
                    teamMemberModel.find({user: req.user._id}, function (err, members) {
                        if (err) {
                            console.log(err);
                            cb(err)
                        } else {
                            var member_ids = [];
                            if (!members)
                                member_ids = [];
                            else {
                                for (var i = 0; i < members.length; i++)
                                    member_ids.push(members[i]._id);
                            }
                            cb(err, member_ids);
                        }
                    });
                },
                function (cb) {
                    teamModel.findOne({_id: id}, function (err, team) {
                        if (err) {
                            console.log(err);
                            cb(err)
                        } else if (team) {
                            cb(err, team);
                        } else {
                            cb();
                        }
                    });
                }
            ], function (err, vals) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    var member_ids = vals[0];
                    var team = vals[1];
                    var remove_id = -1;

                    if (!team)
                        return res.json({success: false});

                    for (var i = team.teamMembers.length - 1; i >= 0; i--) {
                        for (var j = 0; j < member_ids.length; j++) {
                            if (team.teamMembers[i].toString() === member_ids[j].toString()) {
                                remove_id = team.teamMembers[i];
                                //team.teamMembers.splice(i, 1);
                            }
                        }
                    }

                    if (remove_id != -1) {
                        team.save(function (err, team) {
                            if (err) {
                                return res.json({success: false});
                            } else {
                                teamMemberModel.findOne({_id: remove_id}, function (err, teamMember) {
                                    userModel.findOne({profileId: "000000000000000000000000"}, function (err, user) {
                                        if (err) {
                                            console.log(err);
                                            return res.json({success: false});
                                        } else {
                                            teamMember.user = user._id;
                                            teamMember.save();
                                            return res.json({success: true});
                                        }
                                    });
                                });
                            }
                        });
                    }

                    return res.json({success: true});
                }
            })
        },
        "get#myOwnTeams": function (req, res) {
            teamModel.find({owner: req.user._id}).populate("owner teamMembers").exec(function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    return res.json({success: true, teams: teams});
                }
            });
        },
        "post#addMemberTitle": function (req, res) {
            console.log('ha');
            var team_id = req.body.team_id,
                    defuser = req.body.defuser,
                    titles = req.body.titles,
                    skills = req.body.skills,
                    description = req.body.description,
                    whatisthere = req.body.whatisthere;

            console.log('haha');
            teamModel.findById(team_id).populate("owner teamMembers").exec(function (err, team) {
                if (err) {
                    console.log('hahaerror');
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    console.log('hahaha');
                    var title_list = titles.split(",");

                    var member_ids = [];
                    for (i = 0; i < team.teamMembers.length; i++) {
                        member_ids.push(team.teamMembers[i]._id);
                    }

                    for (i = 0; i < title_list.length; i++) {
                        var member = new teamMemberModel();
                        member.title = title_list[i];
                        member.user = defuser._id;
                        member.description = description;
                        member.skills = skills;
                        member.whatisthere = whatisthere;
                        member.save(function (err, member) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else {
                                member_ids.push(member._id);
                                team.teamMembers = [];
                                team.teamMembers = member_ids;
                                team.save(function (err, team) {
                                    if (err) {
                                        console.log(err);
                                        console.log('error kamil');
                                        return res.json({success: false});
                                    } else {
                                        return res.json({success: true});
                                    }
                                });
                            }
                        });
                    }

                    console.log('hahahahaha');
                    console.log(team.teamMembers);
                    return res.json({success: true});
                    /*team.save(function (err, team) {
                     if (err) {
                     console.log(err);
                     console.log('error kamil');
                     return res.json({ success : false });
                     } else {
                     console.log(team.teamMembers);
                     return res.json({ success : true });
                     }
                     });*/
                }
            });
        },
        "post#editTeam": function (req, res) {
            var id = req.body.id,
                    name = req.body.name,
                    description = req.body.description,
                    tags = req.body.tags,
                    fb_page = req.body.fb_page,
                    mission = req.body.mission,
                    image = req.body.image;

            teamModel.findOne({_id: id, owner: req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    team.name = name;
                    team.description = description;
                    team.image = image;
                    team.tags = tags;
                    team.fb_page = fb_page;
                    team.mission = mission;
                    team.save(function (err, team) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },

        "post#removeTeam": function (req, res) {
            var id = req.body.id;
            teamModel.findOne({_id: id, owner: req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    team.remove(function (err) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#addTeamMember": function (req, res) {
            var title = req.body.title,
                    roles = req.body.roles,
                    description = req.body.description,
                    team = req.body.team;

            teamModel.findOne({id: team, owner: req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    var teamMember = new teamMemberModel();
                    teamMember.title = title;
                    teamMember.roles = roles;
                    teamMember.description = description;

                    teamMember.save(function (err, teamMember) {
                        if (err) {
                            console.log(err);
                            оойцо
                            return res.json({success: false});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#updateTeamMember": function (req, res) {
            var id = req.body._id,
                    title = req.body.title,
                    status = req.body.status,
                    description = req.body.description,
                    skills = req.body.skills,
                    whatisthere = req.body.whatisthere,
                    roles = req.body.roles;

            teamModel.findOne({teamMembers: id, owner: req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    teamMemberModel.findById(id, function (err, member) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else if (member) {
                            member.title = title;
                            member.status = status;
                            member.description = description;
                            member.skills = skills;
                            member.whatisthere = whatisthere;
                            member.roles = roles;

                            member.save(function (err, member) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else {
                                    return res.json({success: true});
                                }
                            });
                        } else {
                            return res.json({success: false});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#removeTeamMember": function (req, res) {
            var id = req.body._id,
                    title = req.body.title,
                    status = req.body.status,
                    description = req.body.description,
                    roles = req.body.roles;

            teamModel.findOne({teamMembers: id, owner: req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (team) {
                    teamMemberModel.findById(id, function (err, member) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else if (member) {
                            for (var i = team.teamMembers.length - 1; i >= 0; i--) {
                                if (team.teamMembers[i].toString() === member.toString()) {
                                    team.teamMembers.splice(i, 1);
                                }
                            }
                            teamMemberModel.findOneAndRemove({_id: member._id}, function () {
                            });
                        } else {
                            return res.json({success: false});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        }
    }
}