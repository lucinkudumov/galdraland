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
		rating : {
            type: Number,
			"enum": [1, 2, 3, 4, 5],
			required: true
        }
    });
    
    return Schema;
}