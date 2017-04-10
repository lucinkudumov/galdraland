var validator = require('validator'),
        uuid = require('node-uuid'),
        multiparty = require('multiparty'),
        fs = require('fs'),
        async = require('async');
module.exports = function (opts) {
    var userModel = opts.models.User,
            emailModel = opts.models.Email,
            teamModel = opts.models.Team,
            adventureModel = opts.models.Adventure,
            imageModel = opts.models.Imagestore;
    var recommendationModel = opts.models.Recommendation;
    var homeviewModel = opts.models.HomeView;
    var fhomeviewModel = opts.models.FavoriteHomeView;
    var faModel = opts.models.FavoriteAdventure;

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
                    adventure.type = req.body.type;
                    adventure.owner = req.user._id;
                    adventure.team = team;
                    adventure.image = req.body.image;
                    adventure.tags = req.body.tags;
                    adventure.fb_page = req.body.fb_page;
                    adventure.start = req.body.start;
                    adventure.end = req.body.end;
                    adventure.description = req.body.description;
                    adventure.link = req.body.link;
                    adventure.homeview = true;

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
        "post#badgesAdventure": function (req, res) {
            adventureModel.find({$and:[{owner: req.user._id}, {"homeview": true}]}, function (err, adventures) {
                if (err) {
                    console.log(err);
                    return res.json({adventures: []});
                } else {
                    return res.json({adventures: adventures});
                }
            });
        },
        "post#updateBadgesAdventureHomeView": function (req, res) {
            var id = req.body.id;
            adventureModel.findOne({_id: id}, function (err, adventure) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (adventure) {
                    adventure.homeview = false;
                    adventure.save(function (err) {
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
        "post#newAdventureHome": function (req, res) {
            var date = new Date();
            date.setDate(date.getDate() - 7);
            adventureModel.find({"createdAt": {$gt: date}}).populate("owner").exec(function (err, adventures) {
                if (err) {
                    console.log(err);
                    return res.json({adventures: []});
                } else if (adventures) {
                    homeviewModel.find({$and: [{"master" : req.user._id}, {"type" : "adventure"}]}, function (err, homeviewadventures) {
                        var unviewadventures = [];
                        if (err) {
                            console.log(err);
                            return res.json({adventures: []});
                        } else if (homeviewadventures) {
                            for(i = 0; i < adventures.length; i++) {
                                var view = false;
                                var adventureId = adventures[i]._id;
                                for(j = 0; j < homeviewadventures.length; j++) {
                                    var homeviewadventureId = homeviewadventures[j].adventure;
                                    if (adventureId.toString() == homeviewadventureId.toString()) {
                                        view = true;
                                        break;
                                    }
                                }
                                if (view === false) {
                                    unviewadventures.push(adventures[i]);
                                }
                            }
                            return res.json({adventures: unviewadventures});
                        } else {
                            return res.json({adventures: adventures});
                        }
                    });
                } else {
                    return res.json({adventures: []});
                }
            });
        },
        "post#updateAdventureHomeView": function (req, res) {
            var id = req.body.id;
            adventureModel.findOne({_id: id}, function (err, adv) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (adv) {
                    var homeviewmodel = new homeviewModel();
                    homeviewmodel.master = req.user._id;
                    homeviewmodel.adventure = adv._id;
                    homeviewmodel.type = "adventure";
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
        "post#newFavoriteAdventureHome": function (req, res) {
            var date = new Date();
            date.setDate(date.getDate() - 7);
            var populateQuery = [{path:'user'}, {path:'adventure', select:'owner'}];
            faModel.find({"createdAt": {$gt: date}}).populate(populateQuery).exec(function (err, fadventures) {
                if (err) {
                    console.log(err);
                    return res.json({fadventures: []});
                } else if (fadventures) {
                    fhomeviewModel.find({$and: [{"master" : req.user._id}, {"type" : "adventure"}]}, function (err, homeviewfadventures) {
                        var unviewfadventures = [];
                        if (err) {
                            console.log(err);
                            return res.json({fadventures: []});
                        } else if (homeviewfadventures) {
                            for(i = 0; i < fadventures.length; i++) {
                                var view = false;
                                var fadventureId = fadventures[i]._id;
                                for(j = 0; j < homeviewfadventures.length; j++) {
                                    var homeviewfadventureId = homeviewfadventures[j].adventure;
                                    if (fadventureId.toString() == homeviewfadventureId.toString()) {
                                        view = true;
                                        break;
                                    }
                                }
                                if (view === false) {
                                    unviewfadventures.push(fadventures[i]);
                                }
                            }
                            return res.json({fadventures: unviewfadventures});
                        } else {
                            return res.json({fadventures: fadventures});
                        }
                    });
                } else {
                    return res.json({fadventures: []});
                }
            });
        },
        "post#updateFavoriteAdventureHomeView": function (req, res) {
            var id = req.body.id;
            faModel.findOne({_id: id}, function (err, fadv) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (fadv) {
                    var fhomeviewmodel = new fhomeviewModel();
                    fhomeviewmodel.master = req.user._id;
                    fhomeviewmodel.adventure = fadv._id;
                    fhomeviewmodel.type = "adventure";
                    fhomeviewmodel.save(function (err) {
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
                    fb_page = req.body.fb_page,
                    start = req.body.start,
                    end = req.body.end,
                    status = req.body.status,
                    type = req.body.type,
                    image = req.body.image;


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

            if (fb_page) {
                updateInfo.fb_page = fb_page;
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

            if (type) {
                updateInfo.type = type;
            }
            if (image) {
                updateInfo.image = image;
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
//            var teams = req.body.teams;
            var queries = [];

            if (req.body.teams != null) {
                for (var i = 0; i < req.body.teams.length; i++)
                    queries.push({team: req.body.teams[i]._id});
            }

            adventureModel.find({$or: queries}, function (err, advs) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, adventures: []});
                } else {
                    return res.json({success: true, adventures: advs});
                }
            });
        },
        "post#adventureTag/list": function (req, res) {
            var tag = req.body.tag;
            adventureModel.find({"tags" : {$in : [tag]}}, function (err, advs) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, adventures: []});
                } else {
                    return res.json({success: true, adventures: advs});
                }
            });
        },
        "post#adventureType/list": function (req, res) {
            var type = req.body.type;
            console.log("type="+type);
            adventureModel.find({"type" : type}, function (err, advs) {
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
        },
        "get#myRecommendationAdventures": function (req, res) {
            recommendationModel.find({
                slaveId: req.user._id,
                type: "adventures"
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
        "post#getBadgesByCreateAdv": function (req, res) {
            var id = req.body.id;
            adventureModel.find({owner: id}, function (err, badges) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, badges: []});
                } else if (badges){
                    return res.json({success: true, badges: badges});
                } else {
                    return res.json({success: false, badges: []});
                }
            });
        }
    }
}