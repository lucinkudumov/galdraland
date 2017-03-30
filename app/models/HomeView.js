var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        master: {
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
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        type: {
            type: String,
            required: true
        }
    });

    return Schema;
}