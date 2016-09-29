var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        team: {
            type: mongoose.Schema.ObjectId,
            ref: "Team",
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
//        tags: {
//            type: [String]
//        },
        tags: {
            type: [{
                tag : {
                    type: String,
                    reqired: true
                }
            }]
        },
        createdAt: {
            type: Date,
            "default": Date.now
        },
        start: {
            type: String
        },
        end: {
            type: String
        },
        status: {
            type: String,
            "default": "Active"
        },
        link: {
            type: String
        }
    });

    return Schema;
}