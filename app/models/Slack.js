var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        user : {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        userId : {
            type: String
        },
        groupId : {
            type: String
        },
        accessToken : {
            type: String
        },
        createdAt: {
            type : Date,
            "default" : Date.now
        }
    });
    
    return Schema;
}