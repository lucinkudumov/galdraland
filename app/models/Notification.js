var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        master: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        slave: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        team: {
            type: mongoose.Schema.ObjectId,
            ref: "Team"
        },
        adventure: {
            type: mongoose.Schema.ObjectId,
            ref: "Adventure"
        },
        homeview: {
            type: Boolean,
            "default": false
        }
    });

    return Schema;
}