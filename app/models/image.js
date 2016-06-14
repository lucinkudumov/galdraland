var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        data: {
            data: Buffer, 
            contentType: String
        },
        name:{
        	type: String,
          required: true
        }
    });
    
    return Schema;
}