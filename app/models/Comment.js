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
		comment : {
            type: String,
        }
    });
    
    return Schema;
}