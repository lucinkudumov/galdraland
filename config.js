var mongoose = require("mongoose");

module.exports.devPort = process.env.PORT || 9010;
module.exports.prodPort = process.env.PORT || 80;

module.exports.smtpOptions = {
    service: "Gmail",
    auth : {
        user: "wuguangcheng1114@gmail.com",
        pass: "possibleokskkh8"
    }
}

//module.exports.dbConnection = mongoose.createConnection(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://wuguangcheng:wuguangcheng@ds053300.mongolab.com:53300/heroku_app21828601");
module.exports.dbConnection = mongoose.createConnection("mongodb://wuguangcheng:wuguangcheng@ds053300.mongolab.com:53300/heroku_app21828601");
//module.exports.dbConnection = mongoose.createConnection("mongodb://haha:haha@ds029811.mongolab.com:29811/galdra");