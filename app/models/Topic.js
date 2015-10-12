var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        topic: {
            type: String,
        }
    });
    
    return Schema;
}