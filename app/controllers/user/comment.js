var validator = require('validator');

module.exports = function (opts) {
    var userModel = opts.models.User,
            commentModel = opts.models.Comment;

    return {
        "get#getComment": function (req, res) {
            var id = req.body.id;
            commentModel.findById({_id: id}, function (err, comment) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (comment) {
                    return res.json({success: true, comment: comment});
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#getCommentByRefId": function (req, res) {
            var id = req.body.id;
            var user_id = req.user._id;
            var isManager = req.isManager;
            var owner = req.owner;
            var query;
            if (isManager == true) {
                query = commentModel.find({refId: id}).populate('from').exec(function (err, comments) {
                    if (err) {
                        console.log(err);
                        return res.json({success: false});
                    } else if (comments) {
                        return res.json({success: true, comments: comments});
                    } else {
                        return res.json({success: false});
                    }
                });
            } else {
                query = commentModel.find({$and :
                    [
                        {refId: id},
                        {
                            $or :
                            [
                                {status: "APPROVE"},
                                {from: owner}
                            ]
                        }
                    ]
                    }).populate('from').exec(function (err, comments) {
                    if (err) {
                        console.log(err);
                        return res.json({success: false});
                    } else if (comments) {
                        return res.json({success: true, comments: comments});
                    } else {
                        return res.json({success: false});
                    }
                });
            }
        },
        "post#insertComment": function (req, res) {
            var ref_id = req.body.ref_id;
            var from = req.user._id;
            var commentVal = req.body.comment;
            var comment = new commentModel;

            comment.refId = ref_id;
            comment.from = from;
            comment.comment = commentVal;
            comment.status = "PENDING";

            comment.save(function (err, r) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    return res.json({success: true});
                }
            });
      },
        "post#updateComment": function (req, res) {
            var id = req.body.id;
            var commentVal = req.body.comment;
            var comment = new commentModel;

            commentModel.findOneAndUpdate({_id: id}, {comment: commentVal}, function (err, comment) {
                if (err) {
                    return res.json({success: false});
                } else if (comment) {
                    return res.json({success: true, comment: comment});
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#updateStatus": function (req, res) {
            var id = req.body.id;
            var statVal = req.body.status;
            var comment = new commentModel;

            commentModel.findOneAndUpdate({_id: id}, {status: statVal}, function (err, status) {
                if (err) {
                    return res.json({success: false});
                } else if (status) {
                    return res.json({success: true, status: status});
                } else {
                    return res.json({success: false});
                }
            });
        },
    }
}
