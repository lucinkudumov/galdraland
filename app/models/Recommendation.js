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
        masterId: {
            type: String,
            required: true
        },
        masterUserName: {
            type: String,
            required: true
        },
        slaveId: {
            type: String,
            required: true
        },
        slaveUserName: {
            type: String,
            required: true
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
        adventure: {
            type: String
        },
        team: {
            type: String
        },
        toMasterMsg : {
            type: String,
            required: true
        },
        toSlaveMsg : {
            type: String,
            required: true
        },
        accepted : {
            type: Boolean,
            "default": false
        }
    });
    
    return Schema;
}