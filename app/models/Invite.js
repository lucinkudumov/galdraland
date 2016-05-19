var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        from: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        toId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
		email: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        title_id: {
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
        accepted : {
            type: Boolean,
            "default": false
        },
        closed: {
            type: Boolean,
            "default": false
        },
        declined : {
            type: Boolean,
            "default": false
        }
    });
    
    return Schema;
}