var validator = require('validator'),
        async = require('async');

module.exports = function (opts) {
    var applyAdvModel = opts.models.ApplyAdventure;

    return {
        "post#alreadyApplyToAdv": function (req, res) {
            applyAdvModel.findOne({team_user: req.user._id, adventure: req.body.adventure}).exec(function (err, applyAdv) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg:'Occurs Unknown Error'});
                } else if (applyAdv) {
                    return res.json({success: true});
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#sendApplyToAdv": function (req, res) {
            applyAdvModel.findOne({team_user: req.user._id, adv_user: req.body.adv_user, adventure: req.body.adventure}).exec(function (err, applyAdv) {
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
                    apply.apply_type = "request";
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
        "post#getApplyToAdv": function (req, res) {
            var userId = req.user._id;
            applyAdvModel.find({$and:[{adv_user: userId}, {$or:[{apply_type:'request'}, {apply_type:'delete'}]}]}).populate("team_user adv_user team adventure").exec(function (err, applyToAdvs) {
                if (err) {
                    console.log(err);
                    return res.json({applyToAdvs: []});
                } else if (applyToAdvs) {
                    return res.json({applyToAdvs: applyToAdvs});
                } else {
                    return res.json({applyToAdvs: []});
                }
            });
        },
        "post#replyApplyToAdv": function (req, res) {
            var userId = req.user._id;
            applyAdvModel.find({$and:[{team_user: userId}, {$or:[{apply_type:'approved'}, {apply_type: 'rejected'}]}]}).populate("team_user adv_user team adventure").exec(function (err, replyApplyToAdvs) {
                if (err) {
                    console.log(err);
                    return res.json({replyApplyToAdvs: []});
                } else if (replyApplyToAdvs) {
                    return res.json({replyApplyToAdvs: replyApplyToAdvs});
                } else {
                    return res.json({replyApplyToAdvs: []});
                }
            });
        },
        "post#processApplyToAdv": function (req, res) {
            var id = req.body.id;
            var action = req.body.action;
            applyAdvModel.findOne({_id: id}, function (err, applyToAdv) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (applyToAdv) {
                    if (action == "delete") {
                        applyToAdv.remove( function (err) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else {
                                return res.json({success: true});
                            }
                        });
                    } else if (action != '') {
                        if (action == "APPROVE")
                            applyToAdv.apply_type = "approved";
                        if (action == "REJECT")
                            applyToAdv.apply_type = "rejected";
                        applyToAdv.save(function (err) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else {
                                if (action == "APPROVE") {
                                    var op = {};
                                    op = {$set: {team:applyToAdv.team}};
                                    adventureModel.findOneAndUpdate({_id: applyToAdv.adventure}, op, function (err, adv) {
                                        console.log(adv);
                                        if (err) {
                                            console.log(err);
                                            return res.json({success: false});
                                        } else {
                                            return res.json({success: true});
                                        }
                                    });
                                } else {
                                    return res.json({success: true});
                                }
                            }
                        });
                    }
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#removeApplyToAdv": function (req, res) {
        }
    }
}