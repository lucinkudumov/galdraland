var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        master: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        team: {
            type: mongoose.Schema.ObjectId,
            ref: "FavoriteTeam"
        },
        adventure: {
            type: mongoose.Schema.ObjectId,
            ref: "FavoriteAdventure"
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "FavoriteUser"
        },
        type: {
            type: String,
            required: true
        }
    });

    return Schema;
}