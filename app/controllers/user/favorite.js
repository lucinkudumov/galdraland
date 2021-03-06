var validator = require('validator'),
        async = require('async');

module.exports = function (opts) {
    var adventureModel = opts.models.Adventure;
    var teamModel = opts.models.Team;
    var userModel = opts.models.User;
    var favoriteTeamModel = opts.models.FavoriteTeam;
    var favoriteAdvModel = opts.models.FavoriteAdventure;
    var favoriteUserModel = opts.models.FavoriteUser;

    return {
        "post#addFavoriteTeam": function (req, res) {
            favoriteTeamModel.findOne({user: req.user._id, team: req.body.teamId}).populate("user team").exec(function (err, favorite) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg:'Occurs Unknown Error'});
                } else if (favorite) {
                    return res.json({success: false, msg:'You have already favored'});
                } else {
                    var ft = new favoriteTeamModel();
                    ft.user = req.user._id;
                    ft.team = req.body.teamId;
                    ft.owner = req.body.ownerId;
                    ft.save(function (err, favorite) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, msg : "Occurs Unknown Error!"});
                        }
                        return res.json({success: true, msg:'Favorite Successfully'});
                    });
                }
            });
        },
        "post#existFavoriteTeam": function (req, res) {
            favoriteTeamModel.findOne({user: req.user._id, team: req.body.teamId}).exec(function (err, favorite) {
                if (err) {
                    return res.json({success: false, favorite:[]});
                } else if (favorite) {
                    return res.json({success: true, favorite: favorite});
                } else {
                    return res.json({success: false, favorite:[]});
                }
            });
        },
        "post#removeFavoriteTeam": function (req, res) {
            favoriteTeamModel.findOne({user: req.user._id, team: req.body.teamId}).exec(function (err, favorite) {
                if (err) {
                    return res.json({success: false});
                } else if (favorite) {
                    favorite.remove(function (err) {
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
        "post#addFavoriteAdventure": function (req, res) {
            favoriteAdvModel.findOne({user: req.user._id, adventure: req.body.adventureId}).populate("user adventure").exec(function (err, favorite) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg:'Occurs Unknown Error'});
                } else if (favorite) {
                    return res.json({success: false, msg:'You have already favored'});
                } else {
                    var fa = new favoriteAdvModel();
                    fa.user = req.user._id;
                    fa.adventure = req.body.adventureId;
                    fa.owner = req.body.ownerId;
                    fa.save(function (err, favorite) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, msg : "Occurs Unknown Error"});
                        }
                        return res.json({success: true, msg:'Favorite Successfully'});
                    });
                }
            });
        },
        "post#existFavoriteAdventure": function (req, res) {
            favoriteAdvModel.findOne({user: req.user._id, adventure: req.body.adventureId}).exec(function (err, favorite) {
                if (err) {
                    return res.json({success: false, favorite:[]});
                } else if (favorite) {
                    return res.json({success: true, favorite: favorite});
                } else {
                    return res.json({success: false, favorite:[]});
                }
            });
        },
        "post#removeFavoriteAdventure": function (req, res) {
            favoriteAdvModel.findOne({user: req.user._id, adventure: req.body.adventureId}).exec(function (err, favorite) {
                if (err) {
                    return res.json({success: false});
                } else if (favorite) {
                    favorite.remove(function (err) {
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
        "post#addFavoriteUser": function (req, res) {
            favoriteUserModel.findOne({user: req.user._id, fuser: req.body.userId}).populate("user fuser").exec(function (err, favorite) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg:'Occurs Unknown Error'});
                } else if (favorite) {
                    return res.json({success: false, msg:'You have already favored'});
                } else {
                    var fu = new favoriteUserModel();
                    fu.user = req.user._id;
                    fu.fuser = req.body.userId;
                    fu.save(function (err, favorite) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, msg : "Occurs Unknown Error"});
                        }
                        return res.json({success: true, msg:'Favorite Successfully'});
                    });
                }
            });
        },
        "post#existFavoriteUser": function (req, res) {
            favoriteUserModel.findOne({user: req.user._id, fuser: req.body.userId}).exec(function (err, favorite) {
                if (err) {
                    return res.json({success: false, favorite:[]});
                } else if (favorite) {
                    return res.json({success: true, favorite: favorite});
                } else {
                    return res.json({success: false, favorite:[]});
                }
            });
        },
        "post#removeFavoriteUser": function (req, res) {
            favoriteUserModel.findOne({user: req.user._id, fuser: req.body.userId}).exec(function (err, favorite) {
                if (err) {
                    return res.json({success: false});
                } else if (favorite) {
                    favorite.remove(function (err) {
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
        "post#getFavoriteAdventure": function (req, res) {
            var adv_ids = [];
//            for (var i = 0; i < req.body.adventures.length; i++) {
//                adv_ids.push(req.body.adventures[i]._id);
//            }
            favoriteAdvModel.find({$and : [{user: req.user._id}, {adventure : {$nin: adv_ids}}]}).populate("user adventure").exec(function (err, favorites) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, fadventures: []});
                } else if (favorites) {
                    return res.json({success: true, fadventures: favorites});
                } else {
                    return res.json({success: true, fadventures: []});
                }
            });
        },
        "post#getFavoriteTeam": function (req, res) {
            var team_ids = [];
//            for (var i = 0; i < req.body.teams.length; i++) {
//                team_ids.push(req.body.teams[i]._id);
//            }
            favoriteTeamModel.find({$and : [{user: req.user._id}, {team : {$nin : team_ids}}]}).populate("user team").exec(function (err, favorites) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, fteams: []});
                } else if (favorites) {
                    return res.json({success: true, fteams: favorites});
                } else {
                    return res.json({success: true, fteams: []});
                }
            });
        },
        "post#getFavoriteUser": function (req, res) {
            var user_ids = [];
//            for (var i = 0; i < req.body.users.length; i++) {
//                user_ids.push(req.body.users[i]);
//            }
            favoriteUserModel.find({$and : [{user: req.user._id}, {fuser : {$nin : user_ids}}]}).populate("user fuser").exec(function (err, favorites) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, fusers: []});
                } else if (favorites) {
                    return res.json({success: true, fusers: favorites});
                } else {
                    return res.json({success: true, fusers: []});
                }
            });
        },
        "post#getFavoritedUsers": function (req, res) {
            favoriteUserModel.find({$and : [{user: {$ne: req.user._id}}, {fuser : req.body.fuserid}]}).populate("user").exec(function (err, favorites) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, favorites: []});
                } else if (favorites) {
                    return res.json({success: true, favorites: favorites});
                } else {
                    return res.json({success: true, favorites: []});
                }
            });
        }
    }
}