var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        user : {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        team: {
            type: mongoose.Schema.ObjectId,
            ref: "Team",
            required: true
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type : Date,
            "default" : Date.now
        }
    });
    
    return Schema;
}