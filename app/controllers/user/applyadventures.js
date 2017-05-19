var validator = require('validator'),
        async = require('async');

module.exports = function (opts) {
    var applyAdvModel = opts.models.ApplyAdventure;

    return {
        "post#sendApplyToAdv": function (req, res) {
            applyAdvModel.findOne({team_user: req.user._id, adv_user: req.body.adv_user, team: req.body.team, adventure: req.body.adventure}).exec(function (err, applyAdv) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg:'Occurs Unknown Error'});
                } else if (applyAdv) {
                    return res.json({success: false, msg:'You have already applied'});
                } else {
                    var apply = new applyAdvModel();
                    apply.team_user = req.user._id;
                    apply.adv_user = req.body.adv_user;
                    apply.team = req.body.team;
                    apply.adventure = req.body.adventure;
                    apply.save(function (err, applyAdv) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false, msg : "Occurs Unknown Error"});
                        }
                        return res.json({success: true, msg:'Apply Successfully'});
                    });
                }
            });

        },
        "post#removeApplyToAdv": function (req, res) {
        }
    }
}