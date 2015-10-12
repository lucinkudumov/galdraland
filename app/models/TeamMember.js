var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        title : {
            type: String,
            required: true
        },
        user : {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        roles : {
            type: [String]
        },
        description : {
            type: String
        },
        status : {
            type: String
        },
        createdAt: {
            type : Date,
            "default" : Date.now
        }
    });
    
    return Schema;
}