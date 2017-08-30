var passport = require("passport"),
    FacebookStrategy = require('passport-facebook').Strategy,
    SlackStrategy = require('passport-slack').Strategy,
    request = require('request'),
    hat = require('hat'),
    fs   = require('fs'),
    utils = require('./utils'),
    path = require('path'),
    cloudinary = require('cloudinary');
    var galdraGroupName = "galdraland_channel";
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

module.exports.facebook = function (opts, cb) {
    var userModel = opts.models.User;
    var emailModel = opts.models.Email;
    var masterSlackModel = opts.models.MasterSlack;
    var teamModel = opts.models.Team;
    var teamMemberModel = opts.models.TeamMember;
    var inviteModel = opts.models.Invite;

	if (process.env.HEROKU) {
        var clientID ="110469289012320",
            clientSecret = "1409e3c1451756d7c2ce7be7e78a20ea",
            callback = "https://galdraland-1-0.herokuapp.com/api/callback/facebook";
    } else {
		var clientID ="1406306389669359",
            clientSecret = "fa79806ce48dd6051d257b2679d566d7",
            callback = "http://galdraland.com:9010/api/callback/facebook";
    }
/*
	var clientID ="1496374667309040",
            clientSecret = "e49ac222948c70b2afdede016dbacb22",
            callback = "https://galdraland-1-0.herokuapp.com/api/callback/facebook";
*/
    passport.use(new FacebookStrategy({
        clientID: clientID, // need change to real id (this is test clientID)
        clientSecret: clientSecret, // need change to real secret (this is test secretKey)
        callbackURL: callback, // need change to real local or remote domain
        profileFields: ['id', 'location', 'link', 'first_name', 'education', 'last_name', 'emails']
      }, function(accessToken, refreshToken, profile, done) {
        console.log("accessToken = ",accessToken);
        console.log("refreshToken = ", refreshToken);
        console.log("profile", profile);
          var profileJSON = profile._json;
		  console.log(profileJSON);
          console.log("starting invite to master group");
          var email = profileJSON.email;
            masterSlackModel.findOne({}, function (err, masterSlack) {
                if (err) {
                    console.log(err);
                    return done(err);
                } else if (masterSlack) {
                    console.log("accessToken = " + masterSlack.accessToken);
                    var accessToken = masterSlack.accessToken;
                    request.get({
                        url: 'https://slack.com/api/groups.list?token='+accessToken+
                            '&exclude_archived=true'
                    }, function (err, response) {
                        if(err) {
                            console.log("get channel list error = ", err);
                        }
                        else {
                            var result = JSON.parse(response.body);
                            console.log("groups.list = ", result);
                            if (result.groups != null) {
                                for (i=0; i<result.groups.length; i++) {
                                    if (result.groups[i].name == galdraGroupName) {
                                        request.get({
                                            url: 'https://slack.com/api/users.admin.invite?token='+accessToken+
                                                '&email='+email+'&channels='+result.groups[i].id
                                        }, function (err, response) {
                                            if(err) {
                                                console.log("invite admin error = ", err);
                                            }
                                            else {
                                                var result = JSON.parse(response.body);
                                                console.log("invite admin result = ", result);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    });
                }
            });
          userModel.findOne({ profileId : profileJSON.id }, function (err, user) {
              if (err) {
                  console.log(err);
                  return done(err);
              } else if (user) {
                  console.log(user);
                  return done(null, user);
              } else {
                  console.log('no user;');
                  var u = new userModel();
                  
                  u.profileId = profileJSON.id;
                  u.fullname = profileJSON.first_name + " " + profileJSON.last_name;
                  u.links     = [];
                  u.links.push({ link : profileJSON.link, name : profile.provider });
                  u.likes = [];
                  u.dislikes = [];
                  u.skills = [];
                  u.looks = [];
                  u.roles = [];
                  if (profileJSON.location) {
                    u.location  = profileJSON.location.name;
                  }
                  
                  if (profileJSON.education && profileJSON.education.length > 0) {
                      for (var i = 0; i < profileJSON.education.length; i++) {
                          u.educations.push(profileJSON.education[i]);
                      }
                  }
                  
                  if (profileJSON.username) {
                      u.username = profileJSON.username;
                  }
                  u.email = profileJSON.email;
                  u.skype = "";
                  u.goals = "";
                  u.categories = "";
                  u.bio = "";
                  u.interests = [];
                  u.slackToken = "";
                  u.slackUser = "";
                  u.homeview = true;
                    console.log('user ==== ', u);
                  var saveToUser = function (url) {
                      u.photo = url;

                      u.save(function (err, user) {
                          if (err) {
                              console.log(err);
                              return done(err);
                          } else {
                              var email = new emailModel();
                              email.userId = user._id;
                              email.email = profileJSON.email;
                              email.save(function (err, email) {
                                  if (err) {
                                      console.log(err);
                                      return done(err);
                                  } else {
                                      var defaultUser = null;
                                      var masterTeam = null;
                                      userModel.findOne({profileId: "000000000000000000000000"}, function (err, duser) {
                                          if (err) {
                                              console.log(err);
                                              return done(err);
                                          } else {
                                              defaultUser = duser;
                                              teamModel.findOne({name: "GALDRALANDERS"}/*, {"sort" : ['createdAt', 'asc']}*/).populate("owner teamMembers").exec(function (err, team) {
                                                  if (err) {
                                                      console.log(err);
                                                      return done(err);
                                                  } else if (team) {
                                                      var member_ids = [];
                                                      if (team && team.teamMembers && team.teamMembers.length) {
                                                          for (i = 0; i < team.teamMembers.length; i++) {
                                                              member_ids.push(team.teamMembers[i]._id);
                                                          }
                                                      }

                                                      var member = new teamMemberModel();
                                                      member.title = "GaldraLander#" + member_ids.length;
                                                      member.user = defaultUser._id;
                                                      member.description = "";
                                                      member.skills = "";
                                                      member.whatisthere = "";
                                                      console.log("member = ", member);
                                                      member.save(function (err, member) {
                                                          if (err) {
                                                              console.log(err);
                                                              return done(err);
                                                          } else {
                                                              member_ids.push(member._id);
                                                              team.teamMembers = [];
                                                              team.teamMembers = member_ids;
                                                              team.save(function (err, team1) {
                                                                  if (err) {
                                                                      console.log(err);
                                                                      return done(err);
                                                                  } else {
                                                                      var invite = new inviteModel;
                                                                      invite.to = user.fullname;
                                                                      invite.toId = user._id;
                                                                      invite.from = team.owner._id;
                                                                      invite.title = member.title;
                                                                      invite.title_id = member._id;
                                                                      invite.roles = [];
                                                                      invite.message = "Hello, Please join our team.";
                                                                      invite.team = team._id;
                                                                      console.log("invite = ", invite);
                                                                      invite.save(function (err, invite) {
                                                                          if (err) {
                                                                              console.log(err);
                                                                              return done(err);
                                                                          } else {
                                                                              console.log("Invite OK!!!");
                                                                              return done(null, user);
                                                                          }
                                                                      });
                                                                  }
                                                              });
                                                          }
                                                      });
                                                  } else {
                                                      return done(null, user);
                                                  }
                                              });
                                          }
                                      });
                                  }
                              });
                          }
                      });
                  }

				  console.log("came here");

                  if (process.env.HEROKU) {
                      console.log('11111');
                      cloudinary.uploader.upload("http://graph.facebook.com/" + u.profileId + "/picture?type=large", function (r) {
                          console.log('22222');
                          saveToUser(r.url);
                      });
                  } else {
                      console.log('33333');
                      var fileName = hat() + ".jpg";
                      // save image
                      utils.downloadFileFromUrl("http://graph.facebook.com/" + u.profileId + "/picture?type=large", path.join(__dirname, "public", "users", fileName), function (err) {
                          if (err) {
                              console.log(err);
                              return done(err);
                          } else {
                              console.log('55555');
                              saveToUser("/users/" + fileName);
                          }
                      });
                  }
/*
					cloudinary.uploader.upload("http://graph.facebook.com/" + u.profileId + "/picture?type=large", function (r) {
                         saveToUser(r.url);
                     });*/

              }
          }); 
    }));
    
    if (cb) {
        cb(null);
    }
}
