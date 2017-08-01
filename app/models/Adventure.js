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
            ref: "Team"
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        tags: {
            type: [String]
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
        },
        fb_page: {
            type: String
        },
        homeview: {
            type: Boolean,
            "default": true
        },
        temp_team: {
            type: mongoose.Schema.ObjectId,
            ref: "Team"
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        radius: {
            type: String,
            "default": '0'
        }
    });

    return Schema;
}