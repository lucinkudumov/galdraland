var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        owner : {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "User"
        },
        name : {
            type: String,
            required: true
        },
        description : {
            type: String
        },
        image: {
            type: String
        },
        tags: {
            type: [String]
        },
        fb_page: {
            type: String
        },
        teamMembers: [{
            type: mongoose.Schema.ObjectId,
            ref: "TeamMember"
        }],
        createdAt: {
            type : Date,
            "default" : Date.now
        },
        mission: {
            type: String
        },
        slackGroupId: {
            type: String
        },
        slackGroupName: {
            type: String
        }
    });
    
    return Schema;
}