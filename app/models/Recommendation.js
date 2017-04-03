var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        recommendationId: {
            type: String,
            required: true
        },
        recommendationUserName: {
            type: String,
            required: true
        },
        recommendationUserPhoto: {
            type: String
        },
        masterId: {
            type: String,
            required: true
        },
        masterUserName: {
            type: String,
            required: true
        },
        masterUserPhoto : {
            type: String
        },
        slaveId: {
            type: String,
            required: true
        },
        slaveUserName: {
            type: String,
            required: true
        },
        slaveUserPhoto : {
            type: String
        },
        roleId: {
            type: String
        },
        roleTitle: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        adventureId: {
            type: String
        },
        adventureName: {
            type: String
        },
        adventureImage: {
            type: String
        },
        teamId: {
            type: String
        },
        teamName: {
            type: String
        },
        teamImage: {
            type: String
        },
        masterMsg : {
            type: String,
            required: true
        },
        slaveMsg : {
            type: String,
            required: true
        },
        masterViewed : {
            type: Boolean,
            "default": false
        },
        slaveViewed : {
            type: Boolean,
            "default": false
        },
        homeview: {
            type: Boolean,
            "default": true
        }
    });
    
    return Schema;
}