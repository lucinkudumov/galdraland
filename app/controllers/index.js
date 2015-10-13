var passport = require("passport");

module.exports = function (opts) {
    if (process.env.HEROKU) {
        var fail = "http://galdralandapp.herokuapp.com/";
    } else {
        var fail = 'http://kkkalyosha.wix.com/galdraland/';
    }

//	var fail = "http://galdralandapp.herokuapp.com/";
    
    return {
        "get#login/facebook" : [function(req,res,next){req.session.returnTo = req.query.r; console.log(req.query); next();}, passport.authenticate('facebook', { scope: ['user_photos', 'email'] })],
        "get#callback/facebook" : passport.authenticate('facebook', { failureRedirect: fail, successRedirect : "/api/cookie" }),
    }
}