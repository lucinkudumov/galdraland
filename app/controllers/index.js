var passport = require("passport");

module.exports = function (opts) {
    if (process.env.HEROKU) {
        var fail = "http://galdraland-1-0.herokuapp.com/";
    } else {
        var fail = 'http://galdraland.com:9010/';
    }

//	var fail = "http://galdraland-1-0.herokuapp.com/";
    
    return {
        "get#login/facebook" : [function(req,res,next){req.session.returnTo = "/api/myTeams";/*req.query.r*/ console.log(req.query); next();}, passport.authenticate('facebook', { scope: ['user_photos', 'email'] })],
        "get#callback/facebook" : passport.authenticate('facebook', { failureRedirect: fail, successRedirect : "/api/cookie" }),
    }
}