var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        from: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        refId: {
            type: mongoose.Schema.ObjectId,
        },
        status : {
            type: String,
        },
		comment : {
            type: String,
        },
        createdAt: {
            type: Date,
            "default": Date.now
        }
    });
    
    return Schema;
}