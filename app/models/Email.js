var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        email: {
            type: String,
        },
        activated: {
            type: Boolean,
            required: true,
            "default": false
        },
        activatedDate: {
            type: Date
        },
        validated: {
            type: Boolean,
            required: true,
            "default": false
        }
    });
    
    return Schema;
}