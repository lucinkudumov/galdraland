var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        title : {
            type: String,
            required: true
        }
    });
    
    return Schema;
}