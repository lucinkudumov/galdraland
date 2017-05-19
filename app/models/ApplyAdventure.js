var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        team_user: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        adv_user: {
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
        apply_type: {
            type: String,
            required: false
        }
    });

    return Schema;
}