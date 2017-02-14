var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        team: {
            type: mongoose.Schema.ObjectId,
            ref: "Team"
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        body: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            "default": Date.now
        }
    });

    return Schema;
}