var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        from: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        to: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        team: {
            type: mongoose.Schema.ObjectId,
            ref: "Team",
            required: true
        },
        roles: {
            type: [String]
        },
        message : {
            type: String
        },
        closed: {
            type: Boolean,
            "default": false
        },
        ownerApproved : {
            type: Boolean,
            "default": false
        },
		ownerRejected : {
            type: Boolean,
            "default": false
        }
    });
    
    return Schema;
}