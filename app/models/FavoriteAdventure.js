var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        user : {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        adventure: {
            type: mongoose.Schema.ObjectId,
            ref: "Adventure",
            required: true
        },
        createdAt: {
            type : Date,
            "default" : Date.now
        }
    });
    
    return Schema;
}