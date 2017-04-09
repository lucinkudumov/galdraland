var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        user : {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        team: {
            type: mongoose.Schema.ObjectId,
            ref: "Team",
            required: true
        },
        createdAt: {
            type : Date,
            "default" : Date.now
        }
    });
    
    return Schema;
}