var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
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