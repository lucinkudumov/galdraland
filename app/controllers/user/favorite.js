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
                    ft.save(function (err, favorite) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, msg : "Occurs Unknown Error"});
                        }
                        return res.json({success: true, msg:'Favorite Successfully'});
                    });
                }
            });
        }
    }
}