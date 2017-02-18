var validator = require('validator');

module.exports = function (opts) {
    var userModel = opts.models.User,
            emailModel = opts.models.Email,
            topicModel = opts.models.Topic;

    return {
        "post#createDefaultUser": function (req, res) {
            var defaultUser = new userModel();
            var link = {name: "name", link: "link"};
            defaultUser.profileId = "000000000000000000000000";
            defaultUser.fullname = "Default User";
            defaultUser.username = "default";
            defaultUser.links = [];
            defaultUser.links.push(link);

            defaultUser.save(function (err, defaultUser) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    return res.json({success: true});
                }
            });
        },
        "get#getDefaultUser": function (req, res) {
            userModel.findOne({profileId: "000000000000000000000000"}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else {
                    return res.json({success: true, user: user});
                }
            });
        },
        "get#getUser": function (req, res) {
            userModel.findOne({_id: req.user._id}).select("_id profileId fullname username email signin photo skype experience goals categories").exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    emailModel.findOne({userId: user._id}, function (err, email) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            user = user.toObject();
                            user.email = email.toObject();
                            return res.json({success: true, user: user});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "get#getUserById": function (req, res) {
            console.log("aaaaaaaaaa = ", req);
            userModel.findOne({_id: req.body.id}).select("_id profileId fullname username email signin photo skype experience goals categories").exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    emailModel.findOne({userId: user._id}, function (err, email) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            user = user.toObject();
                            user.email = email.toObject();
                            return res.json({success: true, user: user});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#getUsersByIds": function (req, res) {
            var ids = req.body.ids;
            var queries = [];
            for (var i = 0; i < ids.length; i++)
                queries.push({_id: ids[i]});

            userModel.find({$or: queries}).select("_id profileId fullname username email signin photo skype experience goals categories").exec(function (err, users) {
                if (err) {
                    console.log("getUsersByIds Error = " + err);
                    return res.json({success: false});
                } else if (users) {
                    console.log("getUsersByIds Success = ", users);
                    return res.json({success: true, users: users});
                } else {
                    console.log("getUsersByIds Error! No Data");
                    return res.json({success: false});
                }
            });
        },
        "get#getUserDetail": function (req, res) {
            userModel.findById(req.user._id).populate("interests.topic").exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    emailModel.findOne({userId: user._id}, function (err, email) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            user = user.toObject();
                            user.email = email.toObject();
                            return res.json({success: true, user: user});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#searchUser": function (req, res) {
            var term = req.body.term;

            userModel.find({username: new RegExp(term, 'i')}, function (err, users) {
                if (err) {
                    console.log(err);
                    return res.json({users: []});
                } else {
                    return res.json({users: users});
                }
            });
        },
        "post#newUser": function (req, res) {
            var date = new Date();
            date.setDate(date.getDate() - 7);
            userModel.find({"signin": {$gt: date}}, function (err, users) {
                if (err) {
                    console.log(err);
                    return res.json({users: []});
                } else {
                    return res.json({users: users});
                }
            });
        },
        "get#cookie": function (req, res) {
            if (req.session.returnTo)
                var returnTo = req.session.returnTo;
            if (process.env.HEROKU) {
                var redirect = "https://galdraland-1-0.herokuapp.com",
                        failRedirect = "https://galdraland-1-0.herokuapp.com/";
            } else {
                var redirect = "http://galdraland.com:9010",
                        failRedirect = "http://galdraland.com:9010/";
            }

            if (req.session.returnTo)
                redirect = redirect + req.session.returnTo;
            else
                redirect = redirect + "/profile";

            emailModel.findOne({userId: req.user._id}, function (err, email) {
                if (err) {
                    console.log(err);
                    return res.redirect(failRedirect);
                } else if (email) {
                    var user = req.user;
                    user.email = email.toObject();
                    res.cookie("user", encodeURIComponent(JSON.stringify(user)), { 'path': '/', 'domain': 'galdraland-1-0.herokuapp.com' });
                    res.redirect(redirect);
                } else {
                    return res.redirect(failRedirect);
                }
            });
        },
        "get#logout": function (req, res) {
            req.logout();
            req.user = null;
            return res.json({success: true});
        },
        "post#validateEmail": function (req, res) {
            emailModel.findOne({email: req.body.email}, function (err, email) {
                if (err) {
                    console.log(err);
                    res.json({success: false});
                } else if (email) {
                    res.json({success: true, find: true});
                } else {
                    res.json({success: true, find: false});
                }
            });
        },
        "post#validateUsername": function (req, res) {
            userModel.findOne({username: req.body.username}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    return res.json({success: true, find: true});
                } else {
                    return res.json({success: true, find: false});
                }
            });
        },
        "post#saveMainInfo": function (req, res) {
            var username = req.body.username,
                    email = req.body.email;


            if (!validator.isLength(username, 1)) {
                return res.json({success: false, errors: {"username": "Provide username pleaese"}});
            } else if (!validator.isEmail(email)) {
                return res.json({success: false, errors: {"email": "Provide valid email please"}});
            } else {

                userModel.findOne({$or: [{username: username}, {email: email}]}, function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.json({success: false, error: "Internal server error"});
                    } else if (user && user._id != req.user._id) {
                        var errors = {};
                        if (user.username == username) {
                            errors["username"] = "This username already used by another user";
                        } else if (user.email == email) {
                            errors["email"] = "This email arleady used by another user";
                        }

                        return res.json({success: false, errors: errors});
                    } else {
                        userModel.findOne({_id: req.user._id}, function (err, user) {
                            user.username = username;
                            user.email = email;

                            user.save(function (err) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else {
                                    emailModel.findOne({userId: req.user._id}, function (err, e) {
                                        if (err) {
                                            console.log(err);
                                            return res.json({success: false});
                                        } else {
                                            e.email = email;
                                            e.validated = true;

                                            e.save(function (err) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.json({success: false});
                                                } else {
                                                    return res.json({success: true});
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        },
        "post#validateEmail" : function (req, res) {
            emailModel.findOne({email: req.body.email}, function (err, email) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (email) {
                    if (email.userId == req.user._id) {
                        return res.json({success: true, find: false});
                    } else {
                        return res.json({success: true, find: true});
                    }
                } else {
                    return res.json({success: true, find: false});
                }
            });
        },
                "post#saveEmail": function (req, res) {
                    var email = req.body.email;
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var valid = re.test(email);

                    if (!valid) {
                        return res.json({success: false});
                    }

                    emailModel.findOne({userId: req.user._id}, function (err, e) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else if (e) {
                            e.email = email;
                            e.validated = true;
                            e.save(function (err, e) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else {
                                    return res.json({success: true, email: e.email});
                                }
                            });
                        } else {
                            return res.json({success: false});
                        }
                    });
                },
        "post#validateUsername" : function (req, res) {
            var username = req.body.username;

            userModel.findOne({username: username}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    if (user._id == req.user._id) {
                        return res.json({success: true, find: false});
                    } else {
                        return res.json({sucess: true, find: true});
                    }
                } else {
                    return res.json({success: true, find: false});
                }
            });
        },
                "post#saveLinks": function (req, res) {
                    var links = req.body.links;

                    userModel.findById(req.user._id, function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else if (user) {
                            user.links = links;
                            user.save(function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else {
                                    return res.json({success: true});
                                }
                            });
                        } else {
                            return res.json({success: false});
                        }
                    });
                },
        "post#saveLikes": function (req, res) {
            var likes = req.body.likes;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.likes = likes;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveDislikes": function (req, res) {
            var dislikes = req.body.dislikes;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.dislikes = dislikes;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveSkills": function (req, res) {
            var skills = req.body.skills;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.skills = skills;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveLooks": function (req, res) {
            var looks = req.body.looks;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.looks = looks;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveRoles": function (req, res) {
            var roles = req.body.roles;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.roles = roles;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveBiography": function (req, res) {
            var bio = req.body.biography;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.bio = bio;
                    user.save(function (err, user) {
                        console.log(user);
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveInterests": function (req, res) {
            var interests = req.body.interests;
            var i = -1;
            var topic = null;

            register_topic();

            function register_topic() {
                i++;
                if (i < interests.length) {
                    topic = interests[i].topic;
                    topicModel.findOne({topic: topic.topic}, callback);
                } else {
                    save_interests();
                }
            }

            function callback(err, t_find) {
                if (err || t_find == null) {
                    var t_save = new topicModel();
                    t_save.topic = topic.topic;

                    t_save.save(function (err, t_return) {
                        if (err) {
                            return res.json({success: false});
                        } else {
                            interests[i].topic = t_return._id;
                            register_topic();
                        }
                    });
                } else {
                    interests[i].topic = t_find._id;
                    register_topic();
                }
            }

            function save_interests() {
                userModel.findById(req.user._id, function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.json({success: false});
                    } else if (user) {
                        user.interests = interests;
                        user.save(function (err, user) {
                            if (err) {
                                console.log(err);
                                return res.json({success: false});
                            } else {
                                return res.json({success: true});
                            }
                        });
                    } else {
                        return res.json({success: false});
                    }
                });
            }
        },
        "post#saveExperience": function (req, res) {
            var experience = req.body.experience;
            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.experience = experience;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveGoal": function (req, res) {
            var goals = req.body.goals;
            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.goals = goals;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        },

        "post#saveEducations": function (req, res) {
            var educations = req.body.educations;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.educations = educations;

                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            return res.json({success: true});
                        }
                    });

                } else {
                    return res.json({success: false});
                }
            });
        },
        "post#saveMainInformation": function (req, res) {
            var username = req.body.username,
                    fullname = req.body.fullname,
                    email = req.body.email,
                    location = req.body.location,
                    skype = req.body.skype,
//                    goals = req.body.goals;
            categories = req.body.categories;

            userModel.findById(req.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                } else if (user) {
                    user.username = username;
                    user.fullname = fullname;
                    user.location = location;
                    user.skype = skype;
//                    user.goals = goals;
                    user.categories = categories;

                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.json({success: false});
                        } else {
                            emailModel.findOne({userId: req.user._id}, function (err, e) {
                                if (err) {
                                    console.log(err);
                                    return res.json({success: false});
                                } else if (e) {
                                    e.email = email;
                                    e.save(function (err, e) {
                                        if (err) {
                                            console.log(err);
                                            return res.json({success: false});
                                        } else {
                                            return res.json({success: true});
                                        }
                                    });
                                } else {
                                    return res.json({success: true});
                                }
                            });
                            return res.json({success: true});
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });

        }
    }
}
