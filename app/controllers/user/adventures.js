var validator = require('validator'),
        async = require('async');

module.exports = function (opts) {
    var userModel = opts.models.User,
            emailModel = opts.models.Email,
            teamModel = opts.models.Team,
            adventureModel = opts.models.Adventure;

    return {
        "post#adventure/create": function (req, res) {
            var name = req.body.name,
                    description = req.body.description,
                    team = req.body.team;

            if (!validator.isLength(validator.trim(name), 1)) {
                return res.json({success: false, error: "Provide adventure name"});
            }

            teamModel.findOne({id: team, owner: req.user._id}, function (err, team) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, error: "Internal server error"});
                } else if (team) {
                    var adventure = new adventureModel();
                    adventure.name = name;
                    adventure.owner = req.user._id;
                    adventure.team = team;
                    adventure.tags = req.body.tags;
                    adventure.start = req.body.start;
                    adventure.end = req.body.end;
                    adventure.description = req.body.description;
                    adventure.link = req.body.link;

                    adventure.save(function (err, adventure) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, error: "Internal server error"});
                        } else {
                            return res.json({success: true, id: adventure._id});
                        }
                    });
                } else {
                    return res.json({success: false, error: "Team not found"});
                }
            });
        },
        "post#adventure/getTeams": function (req, res) {
            var teamname = req.body.name,
                    userId = req.user._id;

            teamModel.find({$or: [{owner: userId}, {teamMembers: userId}], $and: [{name: new RegExp(teamname, 'i')}]}).populate("owner teamMembers").exec(function (err, teams) {
                if (err) {
                    console.log(err);
                    return res.json({teams: []});
                } else {
                    return res.json({teams: teams});
                }
            });
        },
        "post#adventure/search": function (req, res) {
            var term = req.body.term;
            var tags = term.split(" ");

            adventureModel.find({$or: [{name: new RegExp(term, 'i')}, {description: new RegExp(term, 'i')}, {tags: {$in: tags}}]}, function (err, adventures) {
                if (err) {
                    console.log(err);
                    return res.json({adventures: []});
                } else {
                    return res.json({adventures: adventures});
                }
            });
        },
        "post#newAdventure": function (req, res) {
            var date = new Date();
            date.setDate(date.getDate() - 7);
            adventureModel.find({"createdAt": {$gt: date}}, function (err, adventures) {
                if (err) {
                    console.log(err);
                    return res.json({adventures: []});
                } else {
                    return res.json({adventures: adventures});
                }
            });
        },
        "post#lastAdventure": function (req, res) {
            adventureModel.find({}, function (err, adventures) {
                if (err) {
                    console.log(err);
                    return res.json({adventures: []});
                } else {
                    return res.json({adventures: adventures});
                }
            });
        },
        "post#adventure/adsearch": function (req, res) {
            var name = req.body.name;
            var description = req.body.description;
            var tag = req.body.tag;
            var tags = tag.split(" ");

            if (name != "undefined" && description != "undefined" && tag != "undefined") {
                adventureModel.find({name: new RegExp(name, 'i'), description: new RegExp(description, 'i'), tags: {$in: tags}}, function (err, adventures) {
                    if (err) {
                        console.log(err);
                        return res.json({adventures: []});
                    } else {
                        return res.json({adventures: adventures});
                    }
                });
            } else if (name != "undefined" && description != "undefined") {
                adventureModel.find({name: new RegExp(name, 'i'), description: new RegExp(description, 'i')}, function (err, adventures) {
                    if (err) {
                        console.log(err);
                        return res.json({adventures: []});
                    } else {
                        return res.json({adventures: adventures});
                    }
                });
            } else if (description != "undefined" && tag != "undefined") {
                adventureModel.find({description: new RegExp(description, 'i'), tags: {$in: tags}}, function (err, adventures) {
                    if (err) {
                        console.log(err);
                        return res.json({adventures: []});
                    } else {
                        return res.json({adventures: adventures});
                    }
                });
            } else if (name != "undefined") {
                adventureModel.find({name: new RegExp(name, 'i')}, function (err, adventures) {
                    if (err) {
                        console.log(err);
                        return res.json({adventures: []});
                    } else {
                        return res.json({adventures: adventures});
                    }
                });
            } else if (description != "undefined") {
                adventureModel.find({description: new RegExp(description, 'i')}, function (err, adventures) {
                    if (err) {
                        console.log(err);
                        return res.json({adventures: []});
                    } else {
                        return res.json({adventures: adventures});
                    }
                });
            } else if (tag != "undefined") {
                adventureModel.find({tags: {$in: tags}}, function (err, adventures) {
                    if (err) {
                        console.log(err);
                        return res.json({adventures: []});
                    } else {
                        return res.json({adventures: adventures});
                    }
                });
            }
        },
        "post#adventure/update": function (req, res) {
            var id = req.body.id,
                    name = req.body.name,
                    description = req.body.description,
                    link = req.body.link,
                    team = req.body.team,
                    tags = req.body.tags,
                    start = req.body.start,
                    end = req.body.end,
                    status = req.body.status;

            var updateInfo = {};

            if (name) {
                updateInfo.name = name;
            }

            if (description) {
                updateInfo.description = description;
            }

            if (link) {
                updateInfo.link = link;
            }

            if (team) {
                updateInfo.team = team;
            }

            if (tags) {
                updateInfo.tags = tags;
            }

            if (start) {
                updateInfo.start = start;
            }

            if (end) {
                updateInfo.end = end;
            }

            if (status) {
                updateInfo.status = status;
            }

            adventureModel.findOneAndUpdate({_id: id, owner: req.user._id}, updateInfo, function (err, invite) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, error: "Internal server error"});
                } else if (invite) {
                    return res.json({success: true});
                } else {
                    return res.json({success: false, error: "Not found"});
                }
            });
        },
        "post#adventure/remove": function (req, res) {
            var id = req.body.id;

            adventureModel.findOneAndRemove({_id: id, owner: req.user._id}, function (err) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, error: "Internal server error"});
                } else {
                    return res.json({success: true});
                }
            });
        },
        "post#adventure/list": function (req, res) {
            var teams = req.body.teams;
            var queries = [];

            for (var i = 0; i < teams.length; i++)
                queries.push({team: teams[i]._id});

            adventureModel.find({$or: queries}, function (err, advs) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, adventures: []});
                } else {
                    return res.json({success: true, adventures: advs});
                }
            });
        },
        "post#adventure/get": function (req, res) {
            adventureModel.findOne({_id: req.body.id}).populate("team team").exec(function (err, adventure) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, adventure: null});
                } else {
                    return res.json({success: true, adventure: adventure});
                }
            });
        }
    }
}