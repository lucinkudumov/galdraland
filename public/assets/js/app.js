var app = angular.module("galdra", ["ngRoute", "ui.router", "ngCookies", "ui.bootstrap", "ngFileUpload", 'decipher.tags', 'ui.bootstrap.typeahead', /*'ngTagsInput',*/ "envoc.simpleCalendar", "infinite-scroll", 'leaflet-directive'/* "uiGmapgoogle-maps", "meow.blog.view", "meow.blog.edit"*/]);
var config = {
    //siteurl : 'http://galdraland.com:9010/'
    siteurl: 'https://galdraland-1-0.herokuapp.com/'
}

app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "$httpProvider", "$qProvider", function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider, $qProvider) {
        $stateProvider.state("index", {
            url: "/",
            views: {
                "main": {
                    templateUrl: "/assets/partials/login.html"
                }
            }
//        }).state("who", {
//            url: "/#who",
//            views: {
//                "main": {
//                    templateUrl: "/assets/partials/login.html"
//                }
//            }
//        }).state("how", {
//            url: "/#how",
//            views: {
//                "main": {
//                    templateUrl: "/assets/partials/login.html"
//                }
//            }
//        }).state("contact", {
//            url: "/#contact",
//            views: {
//                "main": {
//                    templateUrl: "/assets/partials/login.html"
//                }
//            }
        }).state("about", {
            url: "/about",
            views: {
                "main": {
                    templateUrl: "/assets/partials/about.html"
                }
            }
/*        }).state("blog", {
            url: "/blog",
            views: {
                "main": {
                    templateUrl: "/assets/partials/blog.html"
                }
            }*/
        }).state("how_it_works", {
            url: "/how_it_works",
            views: {
                "main": {
                    templateUrl: "/assets/partials/how_it_works.html"
                }
            }
        }).state("contact_us", {
            url: "/contact_us",
            views: {
                "main": {
                    templateUrl: "/assets/partials/contact_us.html"
                }
            }
        }).state("redirect", {
            url: "/redirect/:returnTo",
            views: {
                "main": {
                    templateUrl: "/assets/partials/login.html"
                }
            }
        }).state("indexFacebook", {
            url: "/_=_",
            views: {
                "main": {
                    templateUrl: "/assets/partials/login.html"
                }
            }
        }).state("shareadventure", {
            url: "/shareadventure/:id",
            views: {
                "main": {
                    templateUrl: "/assets/partials/shareadventure.html"
                }
            }
        }).state("shareteam", {
            url: "/shareteam/:id",
            views: {
                "main": {
                    templateUrl: "/assets/partials/shareteam.html"
                }
            }
        }).state("profileView", {
            url: "/profile",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@profileView": {templateUrl: "/assets/partials/profile/profile-left-side.html"},
                "right-side@profileView": {templateUrl: "/assets/partials/profile/profile-view.html"}
            },
            requireLogin: true
        }).state("profileSettings", {
            url: "/settings",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@profileSettings": {templateUrl: "/assets/partials/profile/profile-left-side.html"},
                "right-side@profileSettings": {templateUrl: "/assets/partials/profile/profile-settings.html"}
            },
            requireLogin: true
        }).state("emailVerification", {
            url: "/emailVerification",
            views: {
                "main": {templateUrl: "/assets/partials/email.html"}
            },
            requireLogin: true
        }).state("search", {
            url: "/search/:scategory/:sterm/:sname/:sdescription/:stag",
            views: {
                "main": {templateUrl: "/assets/partials/search.html"},
                "search-result@search": {templateUrl: "/assets/partials/search/list.html"}
            },
            requireLogin: true
        }).state("advancedSearch", {
            url: "/adsearch",
            views: {
                "main": {templateUrl: "/assets/partials/search.html"},
                "search-result@advancedSearch": {templateUrl: "/assets/partials/search/search.html"}
            },
            requireLogin: true
        }).state("teamList", {
            url: "/teams",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamList": {templateUrl: "/assets/partials/team/left-side.html"},
                "right-side@teamList": {templateUrl: "/assets/partials/team/list.html"}
            },
            requireLogin: true
        }).state("teamTagList", {
            url: "/teamsTag/:tag",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamTagList": {templateUrl: "/assets/partials/teamTag/left-side.html"},
                "right-side@teamTagList": {templateUrl: "/assets/partials/teamTag/list.html"}
            },
            requireLogin: true
        }).state("users", {
                url: "/users",
                views: {
                    "main": {templateUrl: "/assets/partials/users.html"},
                    "left-side@users": {templateUrl: "/assets/partials/users/left-side.html"},
                    "right-side@users": {templateUrl: "/assets/partials/users/users-result.html"}
                },
                requireLogin: true
        }).state("home", {
            url: "/home",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@home": {templateUrl: "/assets/partials/home/left-side.html"},
                "right-side@home": {templateUrl: "/assets/partials/home/home.html"}
            },
            requireLogin: true
        }).state("news", {
            url: "/news",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@news": {templateUrl: "/assets/partials/news/left-side.html"},
                "right-side@news": {templateUrl: "/assets/partials/news/list.html"}
            },
            requireLogin: true
        }).state("teamCreate", {
            url: "/teams/create",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamCreate": {templateUrl: "/assets/partials/team/left-side.html"},
                "right-side@teamCreate": {templateUrl: "/assets/partials/team/create.html"}
            },
            requireLogin: true
        }).state("userView", {
            url: "/users/view/:id",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@userView": {templateUrl: "/assets/partials/user/left-side.html"},
                "right-side@userView": {templateUrl: "/assets/partials/user/view.html"}
            },
            requireLogin: true
        }).state("teamView", {
            url: "/teams/view/:id",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamView": {templateUrl: "/assets/partials/team/left-side.html"},
                "right-side@teamView": {templateUrl: "/assets/partials/team/view.html"}
            },
            requireLogin: true
        }).state("teamEdit", {
            url: "/teams/edit/:id",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamEdit": {templateUrl: "/assets/partials/team/left-side.html"},
                "right-side@teamEdit": {templateUrl: "/assets/partials/team/edit.html"}
            },
            requireLogin: true
        }).state("teamBlogCreate", {
                url: "/teams/blogcreate/:id",
                views: {
                    "main": {templateUrl: "/assets/partials/main.html"},
                    "left-side@teamBlogCreate": {templateUrl: "/assets/partials/team/left-side.html"},
                    "right-side@teamBlogCreate": {templateUrl: "/assets/partials/team/createblog.html"}
                },
                requireLogin: true
        }).state("teamBlogEdit", {
            url: "/teams/blogedit/:teamid/:blogid",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamBlogEdit": {templateUrl: "/assets/partials/team/left-side.html"},
                "right-side@teamBlogEdit": {templateUrl: "/assets/partials/team/editblog.html"}
            },
            requireLogin: true
        }).state("teamBlogView", {
            url: "/teams/blogview/:teamid/:blogid",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamBlogView": {templateUrl: "/assets/partials/team/left-side.html"},
                "right-side@teamBlogView": {templateUrl: "/assets/partials/team/viewblog.html"}
            },
            requireLogin: true
        }).state("teamSlack", {
            url: "/teams/slack/:id",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@teamSlack": {templateUrl: "/assets/partials/team/left-side.html"},
                "right-side@teamSlack": {templateUrl: "/assets/partials/team/slack.html"}
            },
            requireLogin: true
        }).state("adventureList", {
            url: "/adventures",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureList": {templateUrl: "/assets/partials/adventure/left-side.html"},
                "right-side@adventureList": {templateUrl: "/assets/partials/adventure/list.html"}
            },
            requireLogin: true
        }).state("adventureTagList", {
            url: "/adventuresTag/:tag",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureTagList": {templateUrl: "/assets/partials/adventureTag/left-side.html"},
                "right-side@adventureTagList": {templateUrl: "/assets/partials/adventureTag/list.html"}
            },
            requireLogin: true
        }).state("adventureTypeList", {
            url: "/adventuresType/:type",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureTypeList": {templateUrl: "/assets/partials/adventureType/left-side.html"},
                "right-side@adventureTypeList": {templateUrl: "/assets/partials/adventureType/list.html"}
            },
            requireLogin: true
        }).state("adventureCreate", {
            url: "/adventures/create",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureCreate": {templateUrl: "/assets/partials/adventure/left-side.html"},
                "right-side@adventureCreate": {templateUrl: "/assets/partials/adventure/create.html"}
            },
            requireLogin: true
        }).state("adventureView", {
            url: "/adventures/view/:id",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureView": {templateUrl: "/assets/partials/adventure/left-side.html"},
                "right-side@adventureView": {templateUrl: "/assets/partials/adventure/view.html"}
            },
            requireLogin: true
        }).state("adventureEdit", {
            url: "/adventures/edit/:id",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureEdit": {templateUrl: "/assets/partials/adventure/left-side.html"},
                "right-side@adventureEdit": {templateUrl: "/assets/partials/adventure/edit.html"}
            },
            requireLogin: true
        }).state("adventureBlogCreate", {
            url: "/adventures/blogcreate/:id",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureBlogCreate": {templateUrl: "/assets/partials/adventure/left-side.html"},
                "right-side@adventureBlogCreate": {templateUrl: "/assets/partials/adventure/createblog.html"}
            },
            requireLogin: true
        }).state("adventureBlogEdit", {
            url: "/adventures/blogedit/:adventureid/:blogid",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureBlogEdit": {templateUrl: "/assets/partials/adventure/left-side.html"},
                "right-side@adventureBlogEdit": {templateUrl: "/assets/partials/adventure/editblog.html"}
            },
            requireLogin: true
        }).state("adventureBlogView", {
            url: "/adventures/blogview/:adventureid/:blogid",
            views: {
                "main": {templateUrl: "/assets/partials/main.html"},
                "left-side@adventureBlogView": {templateUrl: "/assets/partials/adventure/left-side.html"},
                "right-side@adventureBlogView": {templateUrl: "/assets/partials/adventure/viewblog.html"}
            },
            requireLogin: true
        });

        $httpProvider.defaults.timeout = 10000;
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $httpProvider.interceptors.push('middleware');
        $qProvider.errorOnUnhandledRejections(false);
    }]).filter('groupBy', ['$parse', function ($parse) {
        return function (list, group_by) {

            var filtered = [];
            var prev_item = null;
            var group_changed = false;
            // this is a new field which is added to each item where we append "_CHANGED"
            // to indicate a field change in the list
            //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
            var new_field = 'group_by_CHANGED';

            // loop through each item in the list
            angular.forEach(list, function (item) {

                group_changed = false;

                // if not the first item
                if (prev_item !== null) {

                    // check if any of the group by field changed

                    //force group_by into Array
                    group_by = angular.isArray(group_by) ? group_by : [group_by];

                    //check each group by parameter
                    for (var i = 0, len = group_by.length; i < len; i++) {
                        if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
                            group_changed = true;
                        }
                    }


                }// otherwise we have the first item in the list which is new
                else {
                    group_changed = true;
                }

                // if the group changed, then add a new field to the item
                // to indicate this
                if (group_changed) {
                    item[new_field] = true;
                } else {
                    item[new_field] = false;
                }

                filtered.push(item);
                prev_item = item;

            });

            return filtered;
        };
    }]);

app.run(["$rootScope", "$http", "$location", "User", function ($rootScope, $http, $location, User) {

//      Debugging
        $rootScope.slackClientID = "188468856003.188694276882";
        $rootScope.slackClientSecret = "0ead08787cc5d8be0b53ea06a467e632";
//        $rootScope.slackClientID = "138423090594.145329929105";
//        $rootScope.slackClientSecret = "2cee7f73e16f6a949b20b81551d9cce0";

        $rootScope.return2Adventure = "normal";
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log(toState);
            if (toState.url == "/" || toState.url == "/#how" || toState.url == "/#who" || toState.url == "/#contact")
                $rootScope.flag = 1;
            else
                $rootScope.flag = 0;
            if(toState.url === "/about" || toState.url === "/how_it_works" || toState.url === "/contact_us" /*|| toState.url === "/blog"*/
                || toState.url === "/shareadventure/:id" || toState.url === "/shareteam/:id" ) {
                $location.url(toState.url);
            } else if (toState.requireLogin && !User.isLoggedIn()) {
                var url = "/redirect/?r=" + $location.path();
                $location.url(url);
            } else if (!toState.requireLogin && User.isLoggedIn()) {
                $location.path("/home");
            } else if (User.isLoggedIn() && !User.isLoggedIn().email.validated) {
                $location.path("/emailVerification");
            }
        });

        $http({
            method: "GET",
            url: "getDefaultUser",
            api: true}).then(function success(data) {
                console.log("getDefaultUser = ", data);
                if (data.data.user) {
                    $rootScope.defUser = data.data.user;
                } else {
                    $http({
                        method: "POST",
                        url: "createDefaultUser",
                        api: true}).then (function success(data) {
                            console.log(data);
                    });
                }
        });
    }]);
app.controller("loginController", ["$scope", "$location", "$anchorScroll", function ($scope, $location, $anchorScroll) {
//    $scope.gotoHash = function(hash) {
//        $location.hash(hash);
//        $anchorScroll();
//    };
}]);

app.controller("sendAdvRecommendationController", ["$scope", "$uibModalInstance", "values", "$http", "User", function ($scope, $uibModalInstance, values, $http, User) {
    $scope.values = angular.copy(values);
    $scope.values.recommendates = [];
    $scope.values.fb_friends = [];
    $scope.user = User.isLoggedIn();
    $scope.adventure = values.adventure;
    //Get FaceBook Friends list.
    console.log("Facebook friends response");
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            FB.api('/me/taggable_friends', function(response) {
                console.log("Logged in already");
                console.log("response = ", response);
                if (response && !response.error) {
                    $scope.values.fb_friends = response.data;
                    console.log(response.data);
                }
            });
        } else if (response.status == 'not_authorized') {
            FB.login(function(response) {
                console.log("Logging in now");
                console.log(response);
                if (response.authResponse) {
                    FB.api('/me/taggable_friends', function(response) {
                        if (response && !response.error) {
                            $scope.values.fb_friends = response.data;
//                               alert("Logging in now.");
                            console.log(response.data);
                        }
                    });
                } else {
                    console.log("Error");
                }
            }, {scope: 'public_profile,user_friends'});
        }
    });

    $scope.cancel = function () {
        $uibModalInstance.close({type: "CLOSE"});
    }

    $scope.findUser = function (usernameOrEmail) {
        if(usernameOrEmail != "")
        {
            $http({
                method: "POST",
                url: "getUsers",
                api: true,
                data: {usernameOrEmail: usernameOrEmail}
            }).then(function (r) {
                    var users = [];
                    for (var i = 0; i < r.data.users.length; i++) {
                        var user = r.data.users[i];
                        user.is_fb_friend = -1;

                        //Check If Current User
                        if ($scope.user._id == user._id)
                            continue;

                        //Check If Owner User
                        if ($scope.adventure.owner == user._id)
                            continue;

                        //Check If Exists in Facebook Friends List
                        for (j = 0; j < $scope.values.fb_friends.length; j++) {
                            if ($scope.values.fb_friends[j].id == user.profileId) {
                                user.is_fb_friend = user.profileId;
                                user.username = user.username + "(facebook friend - " + $scope.values.fb_friends[j].name + ")";
                            }
                        }
                        users.push(user);
                    }

                    for (i = 0; i < $scope.values.fb_friends.length; i++) {
                        var user = {username: $scope.values.fb_friends[i].name + "(facebook friend)", is_fb_friend: $scope.values.fb_friends[i].id, id: -1};
                        var add = true;

                        for (var j = 0; j < users.length; j++) {
                            if (users[j].profileId == user.is_fb_friend)
                                add = false;
                        }

                        if ($scope.values.recommendates.length > 0)
                            for (j = 0; j < $scope.values.recommendates.length; j++) {
                                if ($scope.values.recommendates[j].fb_id == user.is_fb_friend)
                                    add = false;
                            }

                        if (!add)
                            continue;

                        if ($scope.values.recommendates.length > 0) {
                            for (j = 0; j < $scope.values.recommendates.length; j++) {
                                if (user.username == $scope.values.recommendates[j].user) {
                                    break;
                                } else if (j == $scope.values.recommendates.length - 1) {
                                    users.push(user);
                                }
                            }
                        } else {
                            users.push(user);
                        }
                    }
                    $scope.values.users = users;
                });
        }
        else
            $scope.values.users = [];
    }

    $scope.addAdvRecommendation = function (user) {
        $scope.values.newMember = null;
        $scope.values.users = [];
        $scope.values.recommendates.push({user: user.username, memberId: user._id, photo: user.photo, fb_id: user.is_fb_friend});
        return false;
    }

    $scope.removeAdvRecommendation = function (index) {
        $scope.values.recommendates.splice(index, 1);
    }

    $scope.send = function () {
        $uibModalInstance.close({type: "SEND", recommendates: $scope.values.recommendates});
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}]);

app.controller("adventureViewController", ["$scope", "$http", "$stateParams", "$sce", "User", "$uibModal", "$location", "$compile", "simpleCalendarConfig", function ($scope, $http, $stateParams, $sce, User, $uibModal, $location, $compile, simpleCalendarConfig) {
        $scope.user = User.isLoggedIn();
        $scope.photo = "";
        $scope.description = "";
        $scope.timeStart = "";
        $scope.timeEnd = "";
        $scope.ownerId = "";
        $scope.isFavorite = false;
        $scope.applyToAdv = false;

    angular.extend($scope, {
        position: {
            lat: 0,
            lng: 0,
            zoom: 4
        },
        markers: {
            mainMarker: {
                lat: 0,
                lng: 0,
                focus: true,
                draggable: false
            }
        },
        paths: {}
    });

        function onDayClick(day){
            console.log(day);
        }

        function onEventClick(event, day){
            console.log(event, day);
        }

        $scope.monthName = function(date) {
            var d = new Date(date);
            var months = [
                'January', 'February', 'March',
                'April', 'May', 'June',
                'July', 'August', 'September',
                'October', 'November', 'December'
            ];
            return months[d.getMonth()];
        }

        $scope.changeMonth = function (offset) {

            var d = new Date($scope.date);
            console.log("changeMonth...", d);
            $scope.date = d.setMonth(d.getMonth() + offset);
        }

        $scope.refresh = function () {
            $http({
                method: "POST",
                url: "adventure/get",
                api: true,
                data: {id: $stateParams.id}
            }).then (function success(data) {
                if (data.data.adventure.description && data.data.adventure.description != "") {
                    var find = "\n";
                    var re = new RegExp(find, 'g');
                    data.data.adventure.description = $sce.trustAsHtml(data.data.adventure.description.replace(re,"<br>"));
                    $scope.description = data.data.adventure.description;
                }
                if (data.data.adventure.tags && data.data.adventure.tags.length > 0) {
                    if (data.data.adventure.tags[0] == "") data.data.adventure.tags = [];
                }
                if (data.data.adventure.team && data.data.adventure.team != '') {
                    $scope.applyToAdv = false;
                } else {
                    $http({
                        method: "GET",
                        url: "myTeams",
                        api: true
                    }).then ( function success (data) {
                        console.log("dava = ", data);
                        if (data.data.teams && data.data.teams.length > 0) {
                            for (i = 0; i < data.data.teams.length; i ++) {
                                if (data.data.teams[i].name == "GALDRALANDERS") {
                                    continue;
                                }
                                $scope.applyToAdv = true;
                                break;
                            }
                        } else {
                            $scope.applyToAdv = false;
                        }
                    });
                }

                $scope.date = new Date(data.data.adventure.start);
                $scope.events = [
                    {
                        name: 'start',
                        date: new Date(data.data.adventure.start)
                    },
                    {
                        name: 'end',
                        date: new Date(data.data.adventure.end)
                    }
                ];
                $scope.timeStart = data.data.adventure.start;
                $scope.timeEnd = data.data.adventure.end;
                $scope.adventure = data.data.adventure;
                $scope.isManager = data.data.adventure.owner == $scope.user._id;
                $scope.ownerId = data.data.adventure.owner;

                if (data.data.adventure.latitude && !isNaN(data.data.adventure.latitude)) {
                    $scope.position.lat = parseFloat(data.data.adventure.latitude);
                    $scope.markers.mainMarker.lat = parseFloat(data.data.adventure.latitude);
                } else {
                    $scope.position.lat = 0;
                    $scope.markers.mainMarker.lat = 0;
                }

                if (data.data.adventure.longitude && !isNaN(data.data.adventure.longitude)) {
                    $scope.position.lng = parseFloat(data.data.adventure.longitude);
                    $scope.markers.mainMarker.lng = parseFloat(data.data.adventure.longitude);
                } else {
                    $scope.position.lng = 0 ;
                    $scope.markers.mainMarker.lng = 0;
                }

                if (data.data.adventure.radius && !isNaN(data.data.adventure.radius)) {
                    $scope.radius = parseFloat(data.data.adventure.radius);
                } else {
                    $scope.radius = 0 ;
                }


                $scope.paths = {};
                if ($scope.radius != 0)
                    $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker};

                $http({
                    method: "POST",
                    url: "getViewUser",
                    api: true,
                    data: {userid: data.data.adventure.owner}
                }).then ( function success (data) {
                    $scope.photo = data.data.user.photo;
                });

                $http({
                    method: "POST",
                    url: "existFavoriteAdventure",
                    api: true,
                    data: {adventureId: $stateParams.id}
                }).then(function (data) {
                    if (data && data.data.success == true) {
                        $scope.isFavorite = true;
                    }
                });
/*
                $http({
                    method: "POST",
                    url: "alreadyApplyToAdv",
                    api: true,
                    data: {adventure: $stateParams.id}
                }).then(function (data) {
                    if (data && data.data.success == true) {
                        $scope.applyToAdv = true;
                    }
                });
*/
                $http({
                    method: "POST",
                    url: "adventure/bloglist",
                    api: true,
                    data: {adventure: $stateParams.id}
                }).then(function (data) {
                        $scope.adventureblogs = data.data.adventureblogs;
                });
            });
        }

        $scope.$watch("date", function(newValue, oldValue, scope){
            simpleCalendarConfig.weekStart = 0;
            simpleCalendarConfig.onDayClick = onDayClick;
            simpleCalendarConfig.onEventClick = onEventClick;

            simpleCalendarConfig.date = new Date(newValue);
            simpleCalendarConfig.events = [
                {
                    name: 'start',
                    date: new Date(scope.timeStart)
                },
                {
                    name: 'end',
                    date: new Date(scope.timeEnd)
                }
            ];
            var htmlcontent = "<simple-calendar date='date' events='events'></simple-calendar>";
            var $scope = $('#simpeCalendar').html(htmlcontent).scope();
            $compile($('#simpeCalendar'))($scope);
        }, true);

        $scope.modal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to remove \"" + $scope.adventure.name + "\" adventure?"
                    },
                    title: function () {
                        return "Remove \"" + $scope.adventure.name + "\""
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    $http({
                        method: "POST",
                        url: "adventure/remove",
                        api: true,
                        data: {id: $scope.adventure._id}
                    }). then ( function success(data) {
                        $location.path("/adventures");
                    });
                }
            });
            return false;
        }

        $scope.$watch("adventure.fb_page", function(newValue, oldValue){
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'></div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script><div class='fb-page' data-tabs='timeline,events,messages' data-href='"+newValue+"' data-width='400' data-hide-cover='false'></div>";
                var $scope = $('#fbPage').html(htmlcontent).scope();
                $compile($('#fbPage'))($scope);
            }
        }, true);

        $scope.$watch("adventure._id", function(newValue, oldValue){
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'>" +
                    "</div>" +
                    "<script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));" +
                    "function fbshare() {" +
                    "window.open('https://www.facebook.com/sharer/sharer.php?app_id=110469289012320&sdk=joey&u=https://galdraland-1-0.herokuapp.com/adventures/view/"+newValue+"&display=popup&ref=plugin&src=share_button&description="+$scope.description+"&picture=https://galdraland-1-0.herokuapp.com"+$scope.adventure.image+"', '','width=200,height=100');" +
                    "}" +
                    "</script>" +
//                    "<div class='fb-share-button' onclick='a();' data-layout='button_count'></div>" +
                    "<img onclick='fbshare();' style='cursor:pointer;' src='/assets/images/fbshare.png'/>";
                var $scope1 = $('#fbshare').html(htmlcontent).scope();
                $compile($('#fbshare'))($scope1);

                htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<div class='fb-comments' data-href='http://webascender.com/blog/#adv" + newValue +"' data-numposts='5' data-colorscheme='light' data-width='350'></div>";
                $scope1 = $('#fbComment').html(htmlcontent).scope();
                $compile($('#fbComment'))($scope1);
            }
        }, true);


        $scope.shareAdventure = function () {
            console.log("advId = " + $stateParams.id);
            FB.ui({
                method: 'share',
                href : 'https://galdraland-1-0.herokuapp.com/adventures/view/' + $stateParams.id
            }, function(response){
                console.log("response = ", response);
            });
        }

        $scope.removeblog = function (blogid, title) {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to remove this blog?";
                    },
                    title: function () {
                        return "Remove Blog";
                    }
                }
            });

            modalInstance.result.then(function (result) {
                console.log(blogid);
                console.log(result);
                if (result == "YES") {
                    console.log(result);
                    $http({method: "POST", url: "adventure/deleteblog", api: true, data: {id: blogid}}).then(function (data) {
                        console.log($scope.adventure._id);
                        $scope.refresh();
                    });
                }
            });

            return false;
        }

        $scope.sendRecommendation = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/partials/modal/sendAdvRecommendation.html",
                controller: "sendAdvRecommendationController",
                resolve: {
                    values: function () {
                        return {title: "0", adventure: $scope.adventure}
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (result.type == "SEND") {
                    var fb_ids = [];

                    for (var i = 0; i < result.recommendates.length; i++) {
                        if (result.recommendates[i].fb_id != -1)
                            fb_ids.push(result.recommendates[i].fb_id);
                    }
                    if (fb_ids.length) {
                        FB.ui({method: 'apprequests',
                            title: 'Recommendation to Galdraland Team',
                            message: 'You have been invited to "' + $scope.team.name + '" team ',
                            to: fb_ids,
                            new_style_message: true
                        }, function (response) {
                            if (response.error_code !== undefined && response.error_code == 4201) {
                                for (i = 0; i < fb_ids.length; i++) {
                                    for (var j = result.invites.length - 1; j >= 0; j--) {
                                        if (result.invites[j].fb_id == fb_ids[i]) {
                                            result.invites.splice(j, 1);
                                        }
                                    }
                                }
                            }
                        });
                    }
                    function send_recommendation() {
                        if (result.recommendates.length == 0)
                            return;
                        $http({
                            method: "POST",
                            url: "getUserById",
                            api: true,
                            data: {id: $scope.adventure.owner}
                        }).then(function success(data) {
                                $scope.owner = data.data.user;
                                $http({method: "POST", url: "sendRecommendation", api: true, data: {recommendation_user: $scope.user, master_user: $scope.owner, adventure: $scope.adventure, team: null, type: "adventures", recommendates: result.recommendates}}).then(function (data) {
                                    console.log(data.data.success);
                                });
                        });
                    }
                    send_recommendation();
                }
            });
        }

        $scope.favoriteMsg = "";
        $scope.addFavoriteAdventure = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to favorite this adventure?";
                    },
                    title: function () {
                        return "Favorite Adventure";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    var adventureId = $stateParams.id;
                    $http({method: "POST", url: "addFavoriteAdventure", api: true, data: {adventureId: adventureId, ownerId:$scope.ownerId}}).then(function (data) {
                        $scope.favoriteMsg = data.data.msg;
                        $scope.favoriteModal();
                    });
                }
            });

            return false;
        }
        $scope.favoriteModal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yes.html',
                controller: "YesController",
                resolve: {
                    msg: function () {
                        return $scope.favoriteMsg;
                    },
                    title: function () {
                        return "Favorite Adventure";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    $scope.isFavorite = true;
                }
            });
            return false;
        }

        $scope.removeFavoriteAdventure = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to remove from favorites?";
                    },
                    title: function () {
                        return "Remove From Favorites";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    var adventureId = $stateParams.id;
                    $http({method: "POST", url: "removeFavoriteAdventure", api: true, data: {adventureId: adventureId}}).then(function (data) {
                        $scope.isFavorite = false;
                    });
                }
            });
            return false;
        }

        $scope.sendApplyToAdv = function () {
            $http({
                method: "GET",
                url: "myTeams",
                api: true
            }).then (function success(data) {
                var teams = [];
                console.log(data);
                teams = data.data.teams;
                console.log("teams = ", teams);
                if (teams.length) {
                    var modalInstance = $uibModal.open({
                        templateUrl: "/assets/partials/modal/sendApplyToAdv.html",
                        controller: "sendApplyToAdvController",
                        resolve: {
                            values: function () {
                                return {teams: teams}
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {
                        if (result.type == "SEND") {
                            console.log("sending...." + result.teamId);
                            function send_apply_to_adv() {
                                if (result.teamId == '')
                                    return;
                                $http({method: "POST", url: "sendApplyToAdv", api: true, data: {team: result.teamId, adventure: $stateParams.id, adv_user: $scope.ownerId}}).then(function (data) {
                                    var modalInstance = $uibModal.open({
                                        templateUrl: '/assets/partials/modal/yes.html',
                                        controller: "YesController",
                                        resolve: {
                                            msg: function () {
                                                return data.data.msg;
                                            },
                                            title: function () {
                                                return "Apply Team To Adventure";
                                            }
                                        }
                                    });
                                });
                            }
                            send_apply_to_adv();
                        }
                    });
                }
            });

        }
        $scope.refresh();
    }]);
app.controller("usersResultController", ["$scope", "$http", "User", "$location", function ($scope, $http, User, $location) {
    $scope.user = User.isLoggedIn();
    $scope.results = [];
    $scope.fusers = [];
    var users = [];
    $scope.refresh = function () {
        $scope.loading = true;
        $http({
            method: "GET",
            url: "myTeams",
            api: true
        }).then (function success(data) {
            $scope.teams = data.data.teams;
            if ($scope.teams.length) {
                var userIds = [];
                for (var i = 0; i < $scope.teams.length; i++) {
                    for (var j = 0; j < $scope.teams[i].teamMembers.length; j ++) {
                        var o = $scope.teams[i].teamMembers[j];
                        if(userIds.indexOf(o.user) != -1 || $scope.user._id == o.user) {
                            continue;
                        } else {
                            userIds.push(o.user);
                        }
                    }
                }
                if (userIds.length) {
                    $http({
                        method: "POST",
                        url: "getUsersByIds",
                        api: true,
                        data: {ids: userIds}
                    }).then(function success(data) {
                        $scope.users = data.data.users
                        if ($scope.users.length) {
                            for (var i = 0; i < $scope.users.length; i++) {
                                if ($scope.users[i].profileId == "000000000000000000000000") continue;
                                if ($scope.user._id == $scope.users[i]._id) continue;
                                users.push($scope.users[i]._id);
                                var result = {};
                                result.name = $scope.users[i].fullname;
                                result.href = "/users/view/" + $scope.users[i]._id;
                                result.photo = $scope.users[i].photo;
                                result.team_role = [];
                                for (var j = 0; j < $scope.teams.length; j++) {
                                    for (var k = 0; k < $scope.teams[j].teamMembers.length; k++) {
                                        var o = $scope.teams[j].teamMembers[k];
                                        if (o.user == $scope.users[i]._id) {
                                            result.team_role.push($scope.teams[j].name + '(' + $scope.teams[j].teamMembers[k].title + ') ');
                                        }
                                    }
                                }
                                $scope.results.push(result);
                            }
                        }
                        $http({
                            method: "POST",
                            url: "getFavoriteUser",
                            api: true,
                            data: {users: users}
                        }).then(function success(data) {
                            if (data && data.data.fusers) {
                                $scope.fusers = data.data.fusers
                            }
                            $scope.loading = false;
                        });

                    });
                } else {
                    $http({
                        method: "POST",
                        url: "getFavoriteUser",
                        api: true,
                        data: {users: users}
                    }).then(function success(data) {
                        if (data && data.data.fusers) {
                            $scope.fusers = data.data.fusers
                        }
                        $scope.loading = false;
                    });
                }
            } else {
                $http({
                    method: "POST",
                    url: "getFavoriteUser",
                    api: true,
                    data: {users: users}
                }).then(function success(data) {
                    if (data && data.data.fusers) {
                        $scope.fusers = data.data.fusers
                    }
                    $scope.loading = false;
                });
            }
        });
    }

    $scope.refresh();
}]);
app.controller("createAdventureController", ["$scope", "$rootScope", "Upload", "$http", "$location", "User", function ($scope, $rootScope, Upload, $http, $location, User) {
        $scope.user = User.isLoggedIn();
        $scope.values = {};
        $scope.values.team = null;
        $scope.values.newTeam = null;
        $scope.values.teamCount = 1;
        $scope.tags = [];
        angular.extend($scope, {
            position: {
                lat: 0,
                lng: 0,
                zoom: 4
            },
            markers: {
                mainMarker: {
                    lat: 0,
                    lng: 0,
                    focus: true,
                    draggable: true
                }
            },
            events: { // or just {} //all events
                markers:{
                    enable: [ 'dragend' ]
                    //logic: 'emit'
                }
            },
            paths: {}
        });

        $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
            $scope.position.lat = args.model.lat;
            $scope.position.lng = args.model.lng;
            $scope.markers.mainMarker.lat = args.model.lat;
            $scope.markers.mainMarker.lng = args.model.lng;
        });

        $scope.$watch("radius", function(newValue, oldValue){
            if (newValue != oldValue) {
                $scope.paths = {};
                if ($scope.radius != 0)
                    $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker}

            }
        }, true);

        $scope.refresh = function () {
            $http({
                method: "GET",
                url: "myOwnTeams",
                api: true
            }).then(function success(data) {
                $scope.values.teamCount = data.data.teams.length;
                if ($scope.values.teamCount == 0)
                    $rootScope.return2Adventure = "return";
                else
                    $rootScope.return2Adventure = "normal";
            });
        }

        $scope.onFileSelect = function (image1) {
            $scope.image = image1.files[0];
            if (angular.isArray($scope.image)) {
                $scope.image = $scope.image[0];
            }

            $scope.uploadInProgress = true;
            $scope.uploadProgress = 0;

            var fd = new FormData();
            fd.append('file', $scope.image);
            
            $scope.upload = Upload.upload({
                url: 'upload/image',
                method: 'POST',
                api: true,
                file: $scope.image
            }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately 
                console.log(data);
                $scope.uploadedImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
        };

        $scope.createAdventure = function () {
            var post = $scope.fb_post;
            var tmpTags = [];
            console.log("Create adventure Tags = ", $scope.tags);
            if ($scope.tags) {
                for (i=0; i<$scope.tags.length; i++) {
                    if ($scope.tags[i].name == null || $scope.tags[i].name == "undefined")
                        tmpTags.push($scope.tags[i]);
                    else
                        tmpTags.push($scope.tags[i].name);
                }
            }
            var teamId = ""
            if ($scope.values.team)
                teamId = $scope.values.team._id;

//            $scope.latitude = parseFloat($scope.position.lat);
//            $scope.longitude = parseFloat($scope.position.lng);
            console.log("lat" + $scope.markers.mainMarker.lat);
            console.log("lng" + $scope.markers.mainMarker.lng);
            $scope.latitude = parseFloat($scope.markers.mainMarker.lat);
            $scope.longitude = parseFloat($scope.markers.mainMarker.lng);
            $scope.radius = parseFloat($scope.radius);

            $http({
                method: "POST",
                url: "adventure/create",
                api: true,
                data: {name: $scope.name, type: $scope.type, latitude: $scope.latitude, longitude : $scope.longitude, radius: $scope.radius, fb_page: $scope.fb_page, description: $scope.description, link: $scope.link, image: $scope.uploadedImage, team: teamId, start: $scope.formatDate($scope.start), end: $scope.formatDate($scope.end), tags: tmpTags}
            }). then (function success(data) {
                $location.path("/adventures/view/" + data.data.id);
                if (post)
                    $scope.post_to_fb(data.data.id);
            });
        }

        $scope.post_to_fb = function (id) {
            console.log("create adventure with FB post");
            FB.login(function (response) {
                console.log(response);
                if (response.authResponse) {
                    FB.api('/me/feed', 'post', {message: $scope.user.fullname + " has created a new adventure on Galdraland.\n" + config.siteurl + "/adventures/view/" + id}, function(response) {
                        if (!response || response.error) {
                            console.log('Error occured');
                        } else {
                            console.log('Post ID: ' + response.id);
                        }
                    });
                }
            }, {scope: 'publish_actions'});
        }

        $scope.findTeam = function (name) {
            $http({
                method: "POST",
//                url: "adventure/getTeams",
                url: "adventure/getAllTeams",
                api: true,
                data: {name: name}
            }).then (function success(r) {
                var teams = [];
                for (var i = 0; i < r.data.teams.length; i++) {
                    if ($scope.values.team != null) {
                        if (r.data.teams[i].name != $scope.values.team.name) {
                            teams.push(r.data.teams[i]);
                        }
                    } else {
                        teams.push(r.data.teams[i]);
                    }
                }
                $scope.values.teams = teams;
            });
        }

        $scope.attachTeam = function (team) {
            $scope.values.newTeam = null;
            $scope.values.teams = [];
            $scope.values.team = team;
            return false;
        }

        $scope.removeTeam = function () {
            $scope.values.team = null;
        }

        $scope.refresh();


        $scope.setDate = function () {
            var numberOfDaysToAdd = 10;
            $scope.start = $scope.today = new Date();
            $scope.end = new Date();

            $scope.end.setDate($scope.end.getDate() + numberOfDaysToAdd);
        };
        $scope.setDate();

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formatDate = function (date) {
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
        }

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
    }]);

app.controller("editAdventureController", ["$scope", "$http", "$location", "$stateParams", "Upload", function ($scope, $http, $location, $stateParams, Upload) {
        $scope.values = {};
        $scope.values.team = null;
        $scope.values.newTeam = null;
        $scope.values.teamCount = 1;
        $scope.arr_status = ["Active", "Stopped", "Completed"];
        $scope.uploadInProgress = false;
        $scope.uploadProgress = 0;

        angular.extend($scope, {
            position: {
                lat: 0,
                lng: 0,
                zoom: 4
            },
            markers: {
                mainMarker: {
                    lat: 0,
                    lng: 0,
                    focus: true,
                    draggable: true
                }
            },
            events: { // or just {} //all events
                markers:{
                    enable: [ 'dragend' ]
                    //logic: 'emit'
                }
            },
            paths: {}
        });

        $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
            $scope.position.lat = args.model.lat;
            $scope.position.lng = args.model.lng;
            $scope.markers.mainMarker.lat = args.model.lat;
            $scope.markers.mainMarker.lng = args.model.lng;
        });

        $scope.$watch("radius", function(newValue, oldValue){
            if (newValue != oldValue) {
                $scope.paths = {};
                if ($scope.radius != 0)
                    $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker}

            }
        }, true);

        $scope.getAdventure = function () {
            $http({
                method: "POST",
                url: "adventure/get",
                api: true,
                data: {id: $stateParams.id}
            }).then(function success(data) {
                $scope.name = data.data.adventure.name;
                $scope.description = data.data.adventure.description;
                $scope.link = data.data.adventure.link;
                $scope.tags = data.data.adventure.tags;//.join(" ");
                $scope.start = new Date(Date.parse(data.data.adventure.start));
                $scope.end = new Date(Date.parse(data.data.adventure.end));
                $scope.status = data.data.adventure.status;
                $scope.team = data.data.adventure.team;
                $scope.temp_team = data.data.adventure.temp_team;
                $scope.type = data.data.adventure.type;
                $scope.uploadedImage = data.data.adventure.image;
                $scope.fb_page = data.data.adventure.fb_page;
                $scope.latitude = data.data.adventure.latitude;
                $scope.longitude = data.data.adventure.longitude;
                $scope.radius = data.data.adventure.radius;

                if(isNaN($scope.latitude))
                    $scope.latitude = 0;
                if(isNaN($scope.longitude))
                    $scope.longitude = 0;
                if(isNaN($scope.radius))
                    $scope.radius = 0;

                $scope.position.lat = parseFloat($scope.latitude);
                $scope.position.lng = parseFloat($scope.longitude);
                $scope.markers.mainMarker.lat = parseFloat($scope.latitude);
                $scope.markers.mainMarker.lng = parseFloat($scope.longitude);
                $scope.radius = parseFloat($scope.radius);
                console.log("get Adventure : lat -> " + $scope.markers.mainMarker.lat + " : lng -> " + $scope.markers.mainMarker.lng);

            });
        }

        $scope.getTeamCount = function () {
            $http({
                method: "GET",
                url: "myOwnTeams",
                api: true
            }).then (function success(data) {
                $scope.values.teamCount = data.data.teams;
            });
        }

        $scope.refresh = function () {
            $scope.getAdventure();
            $scope.getTeamCount();
        }
        $scope.onFileSelect = function (image) {
            console.log(image);
            image = image.files[0];
            if (angular.isArray(image)) {
                image = image[0];
            }

//            // This is how I handle file types in client side
//            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
//                alert('Only PNG and JPEG are accepted.');
//                return;
//            }

            $scope.uploadInProgress = true;
            $scope.uploadProgress = 0;

            var fd = new FormData();
            fd.append('file', image);
            
            $scope.upload = Upload.upload({
                url: 'upload/image',
                method: 'POST',
                api: true,
                file: image
            }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately 
                console.log(data);
                $scope.uploadedImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
        };
        $scope.editAdventure = function () {
            var tmpTags = [];
            console.log("Edit adventure Tags = ", $scope.tags);
            if ($scope.tags) {
                for (i=0; i<$scope.tags.length; i++) {
                    if ($scope.tags[i].name == null || $scope.tags[i].name == "undefined")
                        tmpTags.push($scope.tags[i]);
                    else
                        tmpTags.push($scope.tags[i].name);
                }
            }

            var teamId = "";
            if ($scope.values.team)
                teamId = $scope.values.team._id;

//            $scope.latitude = parseFloat($scope.position.lat);
//            $scope.longitude = parseFloat($scope.position.lng);
            $scope.latitude = parseFloat($scope.markers.mainMarker.lat);
            $scope.longitude = parseFloat($scope.markers.mainMarker.lng);
            $scope.radius = parseFloat($scope.radius);
            console.log("save Adventure : lat -> " + $scope.markers.mainMarker.lat + " : lng -> " + $scope.markers.mainMarker.lng);

            $http({
                method: "POST",
                url: "adventure/update",
                api: true,
                data: {id: $stateParams.id, name: $scope.name, team : teamId, latitude: $scope.latitude, longitude: $scope.longitude, radius: $scope.radius, fb_page: $scope.fb_page, description: $scope.description, link: $scope.link, image: $scope.uploadedImage, tags: tmpTags, start: $scope.formatDate($scope.start), end: $scope.formatDate($scope.end), status: $scope.status, type: $scope.type}
            }).then  (function success(data) {
                $location.path("/adventures/view/" + $stateParams.id);
            });
        }

        $scope.findTeam = function (name) {
            $http({
                method: "POST",
//                url: "adventure/getTeams",
                url: "adventure/getAllTeams",
                api: true,
                data: {name: name}
            }).then(function sucess(r) {

                var teams = [];
                for (var i = 0; i < r.data.teams.length; i++) {
                    if ($scope.values.team != null) {
                        if (r.data.teams[i].name != $scope.values.team.name) {
                            teams.push(r.data.teams[i]);
                        }
                    } else {
                        teams.push(r.data.teams[i]);
                    }
                }
                $scope.values.teams = teams;
            });
        }

        $scope.attachTeam = function (team) {
            $scope.values.newTeam = null;
            $scope.values.teams = [];
            $scope.values.team = team;
            $scope.team = team;
            return false;
        }

        $scope.removeTeam = function () {
            $scope.team = null;
            $scope.values.team = null;
        }

        $scope.setDate = function () {
            var numberOfDaysToAdd = 10;
            $scope.start = $scope.today = new Date();
            $scope.end = new Date();

            $scope.end.setDate($scope.end.getDate() + numberOfDaysToAdd);
        };
        $scope.setDate();

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formatDate = function (date) {
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
        }

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];

        $scope.goBack = function () {
            $location.path("/adventures/view/" + $stateParams.id);
        }

        $scope.refresh();
    }]);

app.controller("createAdventureBlogController", ["$scope", "$http", "$location", "$stateParams", "Upload", function ($scope, $http, $location, $stateParams, Upload) {
    var id = $stateParams.id;
    $scope.uploadInProgress = false;
    $scope.uploadProgress = 0;

    console.log("calling... createAdventureBlogController");

    $scope.onFileSelect = function (image) {
        console.log(image);
        $scope.blogImage = image.files[0];
        if (angular.isArray($scope.blogImage)) {
            $scope.blogImage = $scope.blogImage[0];
        }

        $scope.uploadInProgress = true;
        $scope.uploadProgress = 0;

        var fd = new FormData();
        fd.append('file', $scope.blogImage);

        $scope.upload = Upload.upload({
            url: 'upload/image',
            method: 'POST',
            api: true,
            file: $scope.blogImage
        }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately
                console.log(data);
                $scope.uploadedBlogImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
    }
    $scope.createBlog = function () {
        console.log("calling... createBlog");
        $http({method: "POST", url: "adventure/createblog", api: true, data: {adventure: id, blogTitle: $scope.blogTitle, blogImage:$scope.uploadedBlogImage, blogBody: $scope.blogBody}}).then(function (data) {
            console.log("ending... createBlog");
            $location.path("/adventures/view/" + id);
        });
    }
    $scope.goBack = function () {
        $location.path("/adventures/view/" + id);
    }
}]);

app.controller("editAdventureBlogController", ["$scope", "$http", "$location", "$stateParams", "Upload", function ($scope, $http, $location, $stateParams, Upload) {
    var adventureid = $stateParams.adventureid;
    var blogid = $stateParams.blogid;
    $scope.uploadInProgress = false;
    $scope.uploadProgress = 0;

    console.log("calling... editAdventureBlogController");

    $http({
        method: "POST",
        url: "adventure/blogget",
        api: true,
        data: {id: blogid}
    }).then(function (data) {
            console.log(data);
            $scope.blogTitle = data.data.adventureblog.title;
            $scope.blogBody = data.data.adventureblog.body;
            $scope.uploadedBlogImage = data.data.adventureblog.image;
        });

    $scope.onFileSelect = function (image) {
        console.log(image);
        $scope.blogImage = image.files[0];
        if (angular.isArray($scope.blogImage)) {
            $scope.blogImage = $scope.blogImage[0];
        }

        $scope.uploadInProgress = true;
        $scope.uploadProgress = 0;

        var fd = new FormData();
        fd.append('file', $scope.blogImage);

        $scope.upload = Upload.upload({
            url: 'upload/image',
            method: 'POST',
            api: true,
            file: $scope.blogImage
        }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately
                console.log(data);
                $scope.uploadedBlogImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
    }

    $scope.updateBlog = function () {
        console.log("calling... updateBlog");
        $http({method: "POST", url: "adventure/updateblog", api: true, data: {id: blogid, blogTitle: $scope.blogTitle, blogImage:$scope.uploadedBlogImage, blogBody: $scope.blogBody}}).then(function (data) {
            console.log("ending... updateBlog");
            $location.path("/adventures/view/" + adventureid);
        });
    }
    $scope.goBack = function () {
        $location.path("/adventures/view/" + adventureid);
    }
}]);

app.controller("adventureBlogViewController", ["$scope", "$http", "$sce", "$location", "$stateParams", "Upload", function ($scope, $http, $sce, $location, $stateParams, Upload) {
    var adventureid = $stateParams.adventureid;
    var blogid = $stateParams.blogid;

    console.log("calling... viewAdventureBlogController");
    $scope.refresh = function () {
        $http({
            method: "POST",
            url: "adventure/blogget",
            api: true,
            data: {id: blogid}
        }).then(function (data) {
                console.log(data);
                $scope.blogTitle = data.data.adventureblog.title;
                $scope.blogBody = data.data.adventureblog.body;
                $scope.uploadedBlogImage = data.data.adventureblog.image;
                if ($scope.blogBody && $scope.blogBody != "") {
                    var find = "\n";
                    var re = new RegExp(find, 'g');
                    $scope.blogBody = $sce.trustAsHtml($scope.blogBody.replace(re,"<br>"));
                    $scope.blogBody = $scope.blogBody;
                }

                /* FB commenting*/
                var htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<div class='fb-comments' data-href='http://webascender.com/blog/#adventureblog" + blogid +"' data-numposts='5' data-colorscheme='light' data-width='550'></div>";
                $scope1 = $('#fbComment').html(htmlcontent).scope();
                $compile($('#fbComment'))($scope1);
        });
    };

    $scope.$watch("blogid", function(newValue, oldValue){
        console.log("newValue = ", newValue);
        console.log("oldValue = ", oldValue);
    }, true);


    $scope.goBack = function () {
        $location.path("/adventures/view/" + adventureid);
    }

    $scope.refresh();
}]);

app.controller("myAdventuresController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.user = User.isLoggedIn();
        $scope.adventures = [];
        $scope.fadventures = [];
        $scope.teams = [];
        $scope.refresh = function () {
            $scope.loading = true;
            $http({
                method: "GET",
                url: "myTeams",
                api: true
            }).then(function success(data) {
                $scope.teams = data.data.teams;
                if ($scope.teams.length) {
//                    return $http({method: "POST", url: "adventure/list", api: true, data: {teams: $scope.teams}});
                    return $http({method: "POST", url: "adventure/listbyme", api: true, data: {teams: $scope.teams}});
                } else {
                    $scope.loading = false;
                }
            }).then(function (r) {
                var advs = [];
                if (r != null) {
                    $scope.adventures = r.data.adventures;
                    advs = $scope.adventures;
                }
                $http({
                    method: "POST",
                    url: "getFavoriteAdventure",
                    api: true,
                    data : {adventures: advs}
                }).then(function success(data) {
                    if (data && data.data.fadventures) {
                        $scope.fadventures = data.data.fadventures
                    }
                    $scope.loading = false;
                });
            });
        }
        $scope.refresh();
    }]);

app.controller("myAdventuresTypeController", ["$scope", "$http", "$location", "$stateParams", "User", function ($scope, $http, $location, $stateParams, User) {
    $scope.user = User.isLoggedIn();
    $scope.refresh = function () {
        $scope.loading = true;
        $http({
            method: "POST",
            url: "adventureType/list",
            api: true,
            data: {type: $stateParams.type}
        }).then (function success(data) {
            $scope.adventures = [];
            if (data != null) $scope.adventures = data.data.adventures;
            $scope.loading = false;
        });
    }
    $scope.refresh();
}]);

app.controller("myAdventuresTagController", ["$scope", "$http", "$location", "$stateParams", "User", function ($scope, $http, $location, $stateParams, User) {
    $scope.user = User.isLoggedIn();
    $scope.refresh = function () {
        $scope.loading = true;
        $http({
            method: "POST",
            url: "adventureTag/list",
            api: true,
            data: {tag: $stateParams.tag}
        }).then (function success(data) {
                $scope.adventures = [];
                if (data != null) $scope.adventures = data.data.adventures;
                $scope.loading = false;
        });
    }
    $scope.refresh();
}]);

app.controller("emailController", ["$scope", "$location", "$http", "User", function ($scope, $location, $http, User) {
        $scope.validate = false;
        $scope.email = User.isLoggedIn().email.email || "";
        $scope.username = User.isLoggedIn().username || "";
        $scope.availableEmail = true;
        $scope.availableUsername = true;

        if ($scope.email) {
            $scope.validate = true;
        }



        $scope.validateEmailFormat = function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        $scope.validateEmail = function () {
            $scope.validate = false;
            $scope.availableEmail = false;

            if (!$scope.validateEmailFormat($scope.email)) {
                $scope.validate = false;
            } else {
                $scope.validate = true;
            }

            $http.post("/api/validateEmail", {email: $scope.email}).then(function (data) {
                if (!data.data.find) {
                    $scope.availableEmail = true;
                } else {
                    $scope.availableEmail = false;
                }
            });
        }

        $scope.saveInformation = function () {
            $scope.error = null;
            $scope.errors = {};

            $http({
                method: "POST",
                url: "saveMainInfo",
                api: true,
                data: {username: $scope.username, email: $scope.email}
            }).then(function success(r) {
                if (r.data.success) {
                    User.update(function () {
                        $location.path("/home");
                    });
                } else {
                    $scope.error = r.data.error;
                    $scope.errors = r.data.errors;
                    console.log($scope.errors);
                }
            });
        }

        $scope.validateUsername = function () {
            $scope.validUsername = false;
            $scope.availableUsername = false;

            if ($scope.username.length == 0) {
                $scope.validateUsername = false;
            } else {
                $scope.validateUsername = true;
            }
            $http({
                method: "POST",
                url: "/api/validateUsername",
                api: true,
                data: {username: $scope.username}
            }).then(function success(data) {
                if (!data.data.find) {
                    $scope.availableUsername = true;
                } else {
                    $scope.availableUsername = false;
                }
            });
        }

        $scope.saveEmail = function () {
            $http.post("/api/saveEmail", {email: $scope.email}).then(function (data) {
                User.update();
                $location.path("/profile");
            });
        }

        $scope.validateEmail();
        $scope.validateUsername();
    }]);
app.controller("headerController", ["$scope", "$rootScope", "$http", "$location", "User", "$uibModal", "$stateParams", "$state", function ($scope, $rootScope, $http, $location, User, $uibModal, $stateParams, $state) {
        $scope.user = User.isLoggedIn();
        $temp = $stateParams.scategory;
        if ($temp == "aa")
            $temp = "a";
        if ($temp == "tt")
            $temp = "t";
        if ($temp == "pp")
            $temp = "p";
        $scope.scategory = ($temp) ? $temp : "a";
        $scope.stext = ($stateParams.sterm) ? $stateParams.sterm : "";
        $scope.slackAuthentication = false;
        $scope.loading = true;
        $http({
            method: "POST",
            url: "getUserById",
            api: true,
            data: {id: $scope.user._id}
        }).then(function success(data) {
            if (data.data.user.slackToken && data.data.user.slackToken != '' && data.data.user.slackUser && data.data.user.slackUser != '') {
                $scope.slackAuthentication = true;
            }
            $scope.loading = false;
            $http({
                method: "GET", url: "getInvites", api: true
            }).then (function (result) {
                if (result !== undefined && result.data !== undefined && result.data.invites !== undefined)
                    $scope.invites = result.data.invites;
                else
                    $scope.invites = [];
                return $http({method: "GET", url: "getApplies", api: true});
            }).then(function (result) {
                if (result !== undefined && result.data !== undefined && result.data.applies !== undefined)
                    $scope.applies = result.data.applies;
                else
                    $scope.applies = [];
                $http({
                    method: "GET", url: "getMasterRecommendates", api: true
                }).then (function (result) {
                    if (result !== undefined && result.data !== undefined && result.data.recommendates !== undefined)
                        $scope.masterRecommendates = result.data.recommendates;
                    else
                        $scope.masterRecommendates = [];

                    $http({
                        method: "GET", url: "getSlaveRecommendates", api: true
                    }).then (function (result) {
                        if (result !== undefined && result.data !== undefined && result.data.recommendates !== undefined)
                            $scope.slaveRecommendates = result.data.recommendates;
                        else
                            $scope.slaveRecommendates = [];

                        $http({
                            method: "POST", url: "adventure/notification", api: true
                        }).then (function (result) {
                            if (result !== undefined && result.data !== undefined && result.data.notifications !== undefined) {
                                $scope.notifications = result.data.notifications;
                            }
                            else
                                $scope.notifications = [];

                            $http({
                                method: "POST", url: "adventure/replynotification", api: true
                            }).then (function (result) {
                                if (result !== undefined && result.data !== undefined && result.data.replynotifications !== undefined) {
                                    $scope.replynotifications = result.data.replynotifications;
                                }
                                else
                                    $scope.replynotifications = [];

                                $http({
                                    method: "POST", url: "getApplyToAdv", api: true
                                }).then (function (result) {
                                    if (result !== undefined && result.data !== undefined && result.data.applyToAdvs !== undefined) {
                                        $scope.applyToAdvs = result.data.applyToAdvs;
                                    }
                                    else
                                        $scope.applyToAdvs = [];

                                    $http({
                                        method: "POST", url: "replyApplyToAdv", api: true
                                    }).then (function (result) {
                                        if (result !== undefined && result.data !== undefined && result.data.replyApplyToAdvs !== undefined) {
                                            $scope.replyApplyToAdvs = result.data.replyApplyToAdvs;
                                        }
                                        else
                                            $scope.replyApplyToAdvs = [];

                                        $http({
                                            method: "POST", url: "slacknoauth", api: true
                                        }).then (function (result) {
                                            if (result !== undefined && result.data !== undefined && result.data.slacknoauth !== undefined) {
                                                $scope.slacknoauth = result.data.slacknoauth;
                                            }
                                            else
                                                $scope.slacknoauth = null;
                                            refresh_feeds();
                                        });
                                    });
                                });
                            });
                        });
//                        $http({
//                            method: "GET", url: "slack/getFeeds", api: true
//                        }).then (function (result) {
//                            console.log(result);
//                            if (result !== undefined && result.data !== undefined && result.data.feeds !== undefined)
//                                $scope.slackFeeds = result.data.feeds;
//                            else
//                                $scope.slackFeeds = [];
//
//                            refresh_feeds();
//                        });
//                        refresh_feeds();
                    });
                });
            });
        });

        function refresh_feeds() {
            $scope.feeds = [];
            if ($scope.invites !== undefined) {
                for (var i = 0; i < $scope.invites.length; i++) {
                    var feed = $scope.invites[i];
                    feed.category = 0;

                    if (feed.accepted) {
                        feed.alert = feed.to + " has accepted your invitation to \"" + feed.team.name + "\" as " + feed.title + ".";
                    } else if (feed.declined) {
                        feed.alert = feed.to + " has declined your invitation to \"" + feed.team.name + "\" as " + feed.title + ".";
                    } else {
                        feed.alert = "You have received an invitation to join \"" + feed.team.name + "\" team as " + feed.title + ".";
                    }
                    $scope.feeds.push(feed);
                }
            }

            if ($scope.applies !== undefined) {
                for (i = 0; i < $scope.applies.length; i++) {
                    var feed = $scope.applies[i];
                    feed.category = 1;

                    if (feed.ownerApproved) {
                        feed.alert = "Your request to join \"" + feed.team.name + "\" team has been approved.";
                    } else if (feed.ownerRejected) {
                        feed.alert = "Your request to join \"" + feed.team.name + "\" team has been rejected.";
                    } else {
                        feed.alert = "You have a new member role request for \"" + feed.team.name + "\" team.";
                    }
                    $scope.feeds.push(feed);
                }
            }

            for (var i = 0; i < $scope.masterRecommendates.length; i++) {
                var feed = $scope.masterRecommendates[i];
                feed.category = 2;
                feed.msg = feed.masterMsg;
                feed.position = "master";
                $scope.feeds.push(feed);
            }

            for (var i = 0; i < $scope.slaveRecommendates.length; i++) {
                var feed = $scope.slaveRecommendates[i];
                feed.category = 2;
                feed.msg = feed.slaveMsg;
                feed.position = "slave";
                $scope.feeds.push(feed);
            }

//            for (var i = 0; i < $scope.slackFeeds.length; i++) {
//                var feed = $scope.slackFeeds[i];
//                feed.category = 3;
//                feed.msg = "You have not seen " + $scope.slackFeeds[i].unread_count + " slack messages for team '"+feed.teamName+"'";
//                $scope.feeds.push(feed);
//            }

            for (var i = 0; i < $scope.notifications.length; i++) {
                var feed = $scope.notifications[i];
                feed.category = 4;
                if (feed.notify_type == "request")
                    feed.msg = feed.master.fullname + " has added your team '" + feed.team.name + "' in his adventure '"+feed.adventure.name + "'";
                if (feed.notify_type == "delete")
                    feed.msg = feed.master.fullname + " has deleted your team '" + feed.team.name + "' in his adventure '"+feed.adventure.name + "'";
                $scope.feeds.push(feed);
            }

            for (var i = 0; i < $scope.replynotifications.length; i++) {
                var feed = $scope.replynotifications[i];
                feed.category = 5;
                if (feed.notify_type == "approved")
                    feed.msg = feed.slave.fullname + " has approved your request for adding his team '" + feed.team.name + "' in your adventure '"+feed.adventure.name + "'";
                if (feed.notify_type == "rejected")
                    feed.msg = feed.slave.fullname + " has rejected your request for adding his team '" + feed.team.name + "' in your adventure '"+feed.adventure.name + "'";
                $scope.feeds.push(feed);
            }

            for (var i = 0; i < $scope.applyToAdvs.length; i++) {
                var feed = $scope.applyToAdvs[i];
                feed.category = 6;
                if (feed.apply_type == "request")
                    feed.msg = feed.team_user.fullname + " has applied his team '" + feed.team.name + "' to your adventure '"+feed.adventure.name + "'";
                else
                    feed.msg = "";
                $scope.feeds.push(feed);
            }

            for (var i = 0; i < $scope.replyApplyToAdvs.length; i++) {
                var feed = $scope.replyApplyToAdvs[i];
                feed.category = 7;
                if (feed.apply_type == "approved")
                    feed.msg = feed.adv_user.fullname + " has approved your request for adding your team '" + feed.team.name + "' to his adventure '"+feed.adventure.name + "'";
                if (feed.apply_type == "rejected")
                    feed.msg = feed.adv_user.fullname + " has rejected your request for adding your team '" + feed.team.name + "' to his adventure '"+feed.adventure.name + "'";
                $scope.feeds.push(feed);
            }

            if ($scope.slacknoauth) {
                var feed = $scope.slacknoauth;
                feed.category = 8;
                feed.msg = "if you do not rgister with slack you cannot get any message from the teams you have joined!";
                $scope.feeds.push(feed);
            }
        }

        $scope.logout = function () {
            $http({
                method: "GET",
                url: "logout",
                api: true
            }).then(function success(data) {
                User.logout();
                $location.path("/");
            });
       }

        $scope.search = function () {
            $location.path("/search/" + $scope.scategory + "/" + $scope.stext + "/ / / ");
        }

        $scope.showInvite = function (invite) {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/partials/modal/viewInvite.html",
                controller: "viewInviteController",
                resolve: {
                    invite: function () {
                        return invite;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                var invite = result.model;
                var index = $scope.invites.indexOf(invite);
                $scope.invites.splice(index, 1);
//                refresh_feeds();
                if (index > -1) {
                    if (result.action == "ACCEPT") {
                        $http({method: "POST", url: "acceptInvite", api: true, data: {id: invite._id}});
                    } else if (result.action == "DECLINE") {
                        $http({method: "POST", url: "rejectInvite", api: true, data: {id: invite._id}});
                    } else if (result.action == "CLOSE") {
                        $http({method: "POST", url: "closeInvite", api: true, data: {id: invite._id}});
                    } else if (result.action == "PUBLISH") {
                        /*
                         FB.login(function(){
                         FB.api('/me/feed', 'post', {message: $scope.user.fullname + " has joined the \"" + invite.team.name + "\" team on galdraland as " + invite.title});
                         }, {scope: 'publish_actions'});*/
                        $http({method: "POST", url: "closeInvite", api: true, data: {id: invite._id}});
                    }
                }
                refresh_feeds();
            });
        }


        $scope.showApply = function (apply) {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/partials/modal/viewApply.html",
                controller: "viewApplyController",
                resolve: {
                    apply: function () {
                        return apply;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                var apply = result.model;
                var index = $scope.applies.indexOf(apply);
                $scope.applies.splice(index, 1);
//                refresh_feeds();
                if (index > -1) {
                    if (result.action == "APPROVE") {
                        $http({method: "POST", url: "approveApply", api: true, data: {id: apply._id}}).then(function (result) {
                            console.log("calling APPROVE...");
                            $http({method: "POST", url: "slack/sendInviteByApply", api: true, data: {id: apply._id}});
                        });
                    } else if (result.action == "REJECT") {
                        $http({method: "POST", url: "rejectApply", api: true, data: {id: apply._id}});
                    } else if (result.action == "CLOSE") {
                        $http({method: "POST", url: "closeApply", api: true, data: {id: apply._id}});
                    } else if (result.action == "PUBLISH") {
                        FB.login(function () {
                            FB.api('/me/feed', 'post', {message: $scope.user.fullname + " has joined the \"" + apply.team.name + "\" team on galdraland as " + apply.title});
                        }, {scope: 'publish_actions'});
                        $http({method: "POST", url: "closeApply", api: true, data: {id: apply._id}});
                    }
                }
                refresh_feeds();
            });
        }

        $scope.showRecommendation = function (recommendate) {
            $http({
                method: "POST", url: "applyRecommendates", api: true, data: {id: recommendate._id, position: recommendate.position}
            }).then (function (result) {
                console.log(result);
            });
            if (recommendate.position == "master") {
                var url = "/users/view/" + recommendate.slaveId;
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            } else {
                if (recommendate.type == "teams") {
                    var url = "/teams/view/" + recommendate.teamId;
                    if ($location.path() == url)
                        $state.reload();
                    else
                        $location.path(url);
                } else {
                    var url = "/adventures/view/" + recommendate.adventureId;
                    if ($location.path() == url)
                        $state.reload();
                    else
                        $location.path(url);
                }
            }
        }

        $scope.showSlackMsg = function (slackFeed) {
            var url = "/teams/slack/" + slackFeed.teamId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        }

        $scope.alertSlackAuth = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yes.html',
                controller: "YesController",
                resolve: {
                    msg: function () {
                        return "You must first register with slack to be able to create teams!";
                    },
                    title: function () {
                        return "Authorize SLACK";
                    }
                }
            });
            return false;
        }

        $scope.showNotification = function (notification) {
            var id = notification._id;
            if (notification.notify_type == "request") {
                var modalInstance = $uibModal.open({
                    templateUrl: "/assets/partials/modal/viewNotification.html",
                    controller: "viewNotificationController",
                    resolve: {
                        notification: function () {
                            return notification;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    var index = $scope.notifications.indexOf(notification);
                    $scope.notifications.splice(index, 1);
                    if (result.action == 'APPROVE' || result.action == 'REJECT') {
                        $http({method: "POST", url: "adventure/applyNotification", api: true, data: {id: id, action: result.action}}).then(function (result) {

                        });
                        refresh_feeds();
                    }
                });
            }

            if (notification.notify_type == "delete") {
                var modalInstance = $uibModal.open({
                    templateUrl: '/assets/partials/modal/yes.html',
                    controller: "YesController",
                    resolve: {
                        msg: function () {
                            return notification.msg;
                        },
                        title: function () {
                            return "Notification";
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    var index = $scope.notifications.indexOf(notification);
                    $scope.notifications.splice(index, 1);
                    if (result == "YES") {
                        $http({method: "POST", url: "adventure/applyNotification", api: true, data: {id: id, action: 'delete'}}).then(function (result) {
                        });
                        refresh_feeds();
                    }
                });
            }
        }

        $scope.showReplyNotification = function (replynotification) {
            var id = replynotification._id;
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yes.html',
                controller: "YesController",
                resolve: {
                    msg: function () {
                        return replynotification.msg;
                    },
                    title: function () {
                        return "Notification";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                var index = $scope.replynotifications.indexOf(replynotification);
                $scope.replynotifications.splice(index, 1);
                if (result == "YES") {
                    $http({method: "POST", url: "adventure/applyNotification", api: true, data: {id: id, action: 'delete'}}).then(function (result) {
                    });
                    refresh_feeds();
                }
            });
        }

        $scope.showApplyToAdv = function (applyToAdv) {
            var id = applyToAdv._id;
            if (applyToAdv.apply_type == "request") {
                var modalInstance = $uibModal.open({
                    templateUrl: "/assets/partials/modal/viewApplyToAdv.html",
                    controller: "viewApplyToAdvController",
                    resolve: {
                        applyToAdv: function () {
                            return applyToAdv;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    var index = $scope.applyToAdvs.indexOf(applyToAdv);
                    $scope.applyToAdvs.splice(index, 1);
                    if (result.action == 'APPROVE' || result.action == 'REJECT') {
                        $http({method: "POST", url: "processApplyToAdv", api: true, data: {id: id, action: result.action}}).then(function (result) {

                        });
                        refresh_feeds();
                    }
                });
            }
        }

        $scope.showReplyApplyToAdv = function (replyApplyToAdv) {
            var id = replyApplyToAdv._id;
            $http({method: "POST", url: "processApplyToAdv", api: true, data: {id: id, action: 'delete'}}).then(function (result) {
                var url = "/adventures/view/" + replyApplyToAdv.adventure._id;
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            });
        }
        $scope.showSlackNoAuth = function (slackNoAuth) {
            var id = slackNoAuth._id;
            $http({method: "POST", url: "processSlackNoAuth", api: true, data: {id: id, action: 'delete'}}).then(function (result) {
                var url = "/home";
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            });
        }
    }]);

app.controller("indexController", ["$scope", "$location", "$window", "$stateParams", "$http", "$filter", "$cookies", "User", function ($scope, $location, $window, $stateParams, $http, $filter, $cookies, User) {
        $scope.r = "";
        $scope.adventures = [];
        $scope.teams = [];
        $scope.users = [];
        $scope.loading = true;

        $scope.ourEmail = 'info@galdratekcorp.com';
        $scope.yourEmail = '';
        $scope.description = '';
        $scope.sentSuccess = false;
        $scope.sentFailed = false;

        var search = $location.search();
//    var fb_user = $cookies.get("c_user", { 'path': '/', 'domain': '.facebook.com'});
//    console.log("facebook user = ", fb_user);

    $scope.compare = function (a, b) {
        if (a._id < b._id)
            return -1;
        if (a._id > b._id)
            return 1;
        return 0;
    }

    $scope.refresh = function () {
        $scope.loading = true;
        console.log("index refreshing...");
        $http({
            method: "POST",
            url: "lastAdventure",
            api: true,
            data: {term: ""}}).then (function success(data) {
                $scope.adventures = [];
                if (data != null && data.data.adventures != null && data.data.adventures.length) {
                    data.data.adventures.sort($scope.compare);
                    data.data.adventures.reverse();
                    if (data.data.adventures.length > 4) {
                        data.data.adventures.length = 4;
                    }
                    for (var i = 0; i < data.data.adventures.length; i++) {
                        var result = {};
                        result._id = data.data.adventures[i]._id;
                        result.name = data.data.adventures[i].name;
                        result.image = data.data.adventures[i].image;
                        result.text1 = data.data.adventures[i].tags.join(" ");
                        result.text2 = data.data.adventures[i].start + " - " + data.data.adventures[i].end;
                        $scope.adventures.push(result);
                    }
                }

                $http({
                    method: "POST",
                    url: "lastTeam",
                    api: true,
                    data: {term: ""}}).then (function success(data) {
                        $scope.teams = [];
                        if (data != null && data.data.teams != null && data.data.teams.length) {
                            data.data.teams.sort($scope.compare);
                            data.data.teams.reverse();
                            if (data.data.teams.length > 4) {
                                data.data.teams.length = 4;
                            }

                            for (var i = 0; i < data.data.teams.length; i++) {
                                var result = {};
                                result._id = data.data.teams[i]._id;
                                result.name = data.data.teams[i].name;
                                result.image = data.data.teams[i].image;
                                $scope.teams.push(result);
                            }
                        }

                        $http({
                            method: "POST",
                            url: "lastUser",
                            api: true,
                            data: {term: ""}}).then (function success (data){
                                $scope.users = [];
                                if (data != null && data.data.users != null && data.data.users.length) {
                                    data.data.users.sort($scope.compare);
                                    data.data.users.reverse();
                                    if (data.data.users.length > 4) {
                                        data.data.users.length = 4;
                                    }
                                    for (var i = 0; i < data.data.users.length; i++) {
                                        var result = {};
                                        result._id = data.data.users[i]._id;
                                        result.name = data.data.users[i].fullname;
                                        result.image = data.data.users[i].photo;
                                        console.log("photo = " + data.data.users[i].photo);
                                        $scope.users.push(result);
                                    }
                                }
                                $scope.loading = false;
                        });
                });
        });
    }

        $scope.sendEmail = function () {
            $http({
                method: "POST",
                url: "sendContact",
                api: true,
                data: {
                    toEmail: 'info@galdratekcorp.com',
                    fromEmail: $scope.yourEmail,
                    text: $scope.description,
                    subject: 'Contact Galdraland Support Center'}
            }).then( function success(data) {
                    console.log(data);
                    if (data.data.success == true)
                        $scope.sentSuccess = true;
                    else
                        $scope.sentFailed = true;
                }, function error (data) {
                    $scope.sentFailed = true;
                }
            );
        }

        $scope.refresh();

        if (search !== null) {
            console.log(search.r);
            $scope.r = search.r;
        }

    }]);

app.controller("leftMenuController", ["$scope", "$location", function ($scope, $location) {
        $scope.go = function (url) {
            $location.path(url);
        }
    }]);
app.controller("MemberEditController", ["$scope", "user", "$uibModalInstance", function ($scope, user, $uibModalInstance) {
        $scope.user = angular.copy(user);

        if ($scope.user.roles && $scope.user.roles.join) {
            $scope.user.roles = $scope.user.roles.join(", ");
        }

        $scope.cancel = function () {
            $scope.user = $scope.backup;
            $uibModalInstance.close();
        }

        $scope.save = function () {
            $uibModalInstance.close({type: "SAVE", user: $scope.user});
        }

        $scope.remove = function () {
            $uibModalInstance.close({type: "REMOVE", user: $scope.user});
        }
    }]);

app.controller("MemberViewController", ["$scope", "user", "$uibModalInstance", function ($scope, user, $uibModalInstance) {
    $scope.user = angular.copy(user);

    $scope.cancel = function () {
        $uibModalInstance.close();
    }

}]);


app.controller("YesAndNoController", ["$scope", "msg", "title", "$uibModalInstance", function ($scope, msg, title, $uibModalInstance) {
    $scope.msg = msg;
    $scope.title = title;

    $scope.yes = function () {
        $uibModalInstance.close("YES");
    }

    $scope.no = function () {
        $uibModalInstance.close("NO");
    }
}]);

app.controller("YesController", ["$scope", "msg", "title", "$uibModalInstance", function ($scope, msg, title, $uibModalInstance) {
    $scope.msg = msg;
    $scope.title = title;

    $scope.yes = function () {
        $uibModalInstance.close("YES");
    }
}]);

app.controller("applyTeamController", ["$scope", "$uibModalInstance", "values", "$http", function ($scope, $uibModalInstance, values, $http) {
        $scope.values = angular.copy(values);

        $scope.cancel = function () {
            $uibModalInstance.close({type: "CLOSE"});
        }

        $scope.send = function () {
            $uibModalInstance.close({type: "SEND", msg: $scope.values.msg, title: $scope.values.title, roles: $scope.values.roles});
        }
    }]);

app.controller("addMemberTitleController", ["$scope", "$uibModalInstance", "values", "$http", function ($scope, $uibModalInstance, values, $http) {
        $scope.values = angular.copy(values);

        $scope.cancel = function () {
            console.log('close member title action');
            $uibModalInstance.close({type: "CLOSE"});
        }

        $scope.create = function () {
            console.log('create member title action');
            console.log('skills = ', $scope.values.skills);
            console.log('whatisthere = ', $scope.values.whatisthere);
            $uibModalInstance.close({type: "CREATE", titles: $scope.values.titles, skills: $scope.values.skills, description: $scope.values.description, whatisthere: $scope.values.whatisthere, team: $scope.values.team});
        }
    }]);

app.controller("sendRecommendationController", ["$scope", "$uibModalInstance", "values", "$http", "User", function ($scope, $uibModalInstance, values, $http, User) {
    $scope.values = angular.copy(values);
    $scope.values.recommendates = [];
    $scope.values.newMember = null;
    $scope.values.memberId = null;
    $scope.values.fb_friends = [];
    $scope.user = User.isLoggedIn();
    $scope.team = values.team;
    console.log(values.emptyRecMembers);
    $scope.values._emptyRecMembers = [];

    $scope.init = function(values){
        for(var i = 0; i < values.emptyRecMembers.length; i++)
            $scope.values._emptyRecMembers.push(values.emptyRecMembers[i]);
    }
    $scope.init(values);
    //Get FaceBook Friends list.
    console.log("Facebook friends response");
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            FB.api('/me/taggable_friends', function(response) {
                console.log("Logged in already");
                console.log("response = ", response);
                if (response && !response.error) {
                    $scope.values.fb_friends = response.data;
                    console.log(response.data);
                }
            });
        } else if (response.status == 'not_authorized') {
            FB.login(function(response) {
                console.log("Logging in now");
                console.log(response);
                if (response.authResponse) {
                    FB.api('/me/taggable_friends', function(response) {
                        if (response && !response.error) {
                            $scope.values.fb_friends = response.data;
//                               alert("Logging in now.");
                            console.log(response.data);
                        }
                    });
                } else {
                    console.log("Error");
                }
            }, {scope: 'public_profile,user_friends'});
        }
    });

    $scope.cancel = function () {
        $uibModalInstance.close({type: "CLOSE"});
    }

    $scope.findUser = function (usernameOrEmail) {
        if(usernameOrEmail != "")
        {
            $http({
                method: "POST",
                url: "getUsers",
                api: true,
                data: {usernameOrEmail: usernameOrEmail}
            }).then(function (r) {
                    var users = [];
                    for (var i = 0; i < r.data.users.length; i++) {
                        var user = r.data.users[i];
                        var exist_in_team = false;
                        user.is_fb_friend = -1;

                        //Check If Current User
                        if ($scope.user._id == user._id)
                            continue;

                        //Check If Owner User
                        if ($scope.team.owner._id == user._id)
                            continue;
                        //Check If Exists in Team
//                        for (var j = 0; j < $scope.team.teamMembers.length; j++) {
//                            if ($scope.team.teamMembers[j].user._id == user._id)
//                                exist_in_team = true;
//                        }

//                        if (exist_in_team)
//                            continue;

                        //Check If Exists in Facebook Friends List
                        for (j = 0; j < $scope.values.fb_friends.length; j++) {
                            if ($scope.values.fb_friends[j].id == user.profileId) {
                                user.is_fb_friend = user.profileId;
                                user.username = user.username + "(facebook friend - " + $scope.values.fb_friends[j].name + ")";
                            }
                        }

                        //Check If Exists in Recommendation List
//                        if ($scope.values.recommendates.length > 0) {
//                            for (j = 0; j < $scope.values.recommendates.length; j++) {
//                                if (user.username == $scope.values.recommendates[j].user || (user.is_fb_friend != -1 && user.is_fb_friend == $scope.values.recommendates[j].profileId)) {
//                                    break;
//                                } else if (j == $scope.values.recommendates.length - 1) {
//                                    users.push(user);
//                                }
//                            }
//                        } else {
//                            users.push(user);
//                        }
                        users.push(user);
                    }

                    for (i = 0; i < $scope.values.fb_friends.length; i++) {
                        var user = {username: $scope.values.fb_friends[i].name + "(facebook friend)", is_fb_friend: $scope.values.fb_friends[i].id, id: -1};
                        var add = true;

                        for (var j = 0; j < users.length; j++) {
                            if (users[j].profileId == user.is_fb_friend)
                                add = false;
                        }

                        if ($scope.values.recommendates.length > 0)
                            for (j = 0; j < $scope.values.recommendates.length; j++) {
                                if ($scope.values.recommendates[j].fb_id == user.is_fb_friend)
                                    add = false;
                            }

                        if (!add)
                            continue;

                        if ($scope.values.recommendates.length > 0) {
                            for (j = 0; j < $scope.values.recommendates.length; j++) {
                                if (user.username == $scope.values.recommendates[j].user) {
                                    break;
                                } else if (j == $scope.values.recommendates.length - 1) {
                                    users.push(user);
                                }
                            }
                        } else {
                            users.push(user);
                        }
                    }

                    $scope.values.users = users;
                });
        }
        else
            $scope.values.users = [];
    }

    $scope.addRecommendation = function (user) {
        if($scope.values.title === "0")
            return true;
        $scope.values.newMember = null;
        $scope.values.users = [];
        var title = {_id: $scope.values.title, title: ""};
        //Remove Recommendated title
        for(var i = 0; i < $scope.values._emptyRecMembers.length; i++)
            if($scope.values._emptyRecMembers[i]._id === $scope.values.title)
            {
                title.title = $scope.values._emptyRecMembers[i].title;
                break;
            }
        $scope.values.title = "0";
        $scope.values.recommendates.push({user: user.username, memberId: user._id, photo: user.photo, fb_id: user.is_fb_friend, title: title});
        $scope.values._emptyRecMembers.splice(i, 1);
        return false;
    }

    $scope.removeRecommendation = function (index) {
        $scope.values._emptyRecMembers.push($scope.values.recommendates[index].title);
        $scope.values.recommendates.splice(index, 1);
    }

    $scope.send = function () {
        $uibModalInstance.close({type: "SEND", to: $scope.values.to, recommendates: $scope.values.recommendates});
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}]);

app.controller("sendInviteController", ["$scope", "$uibModalInstance", "values", "$http", "User", function ($scope, $uibModalInstance, values, $http, User) {
        $scope.values = angular.copy(values);
        $scope.values.invites = [];
        $scope.values.newMember = null;
        $scope.values.memberId = null;
        $scope.values.fb_friends = [];
        $scope.user = User.isLoggedIn();
        $scope.team = values.team;
        console.log(values.emptyMembers);
        $scope.values._emptyMembers = [];
        
        $scope.init = function(values){
            for(var i = 0; i < values.emptyMembers.length; i++)
                $scope.values._emptyMembers.push(values.emptyMembers[i]);
        }
        $scope.init(values);
        //Get FaceBook Friends list.
        console.log("Facebook friends response");
        FB.getLoginStatus(function(response) {
           if (response.status == 'connected') {
             FB.api('/me/taggable_friends', function(response) {
                 console.log("Logged in already");
                 console.log("response = ", response);
                 if (response && !response.error) {
                     $scope.values.fb_friends = response.data;
                     console.log(response.data);
                 }
             });
           } else if (response.status == 'not_authorized') {
               FB.login(function(response) {
                   console.log("Logging in now");
                   console.log(response);
                   if (response.authResponse) {
                       FB.api('/me/taggable_friends', function(response) {
                           if (response && !response.error) {
                               $scope.values.fb_friends = response.data;
//                               alert("Logging in now.");
                               console.log(response.data);
                           }
                       });
                   } else {
                       console.log("Error");
                   }
               }, {scope: 'public_profile,user_friends'});
           }
        });

        $scope.cancel = function () {
            $uibModalInstance.close({type: "CLOSE"});
        }

        $scope.findUser = function (usernameOrEmail) {
            if(usernameOrEmail != "")
            {
                $http({
                    method: "POST",
                    url: "getUsers",
                    api: true,
                    data: {usernameOrEmail: usernameOrEmail}
                }).then(function (r) {
                    var users = [];
                    for (var i = 0; i < r.data.users.length; i++) {
                        var user = r.data.users[i];
                        var exist_in_team = false;
                        user.is_fb_friend = -1;

                        //Check If Current User
                        if ($scope.user._id == user._id)
                            continue;

                        //Check If Exists in Team
                        for (var j = 0; j < $scope.team.teamMembers.length; j++) {
                            if ($scope.team.teamMembers[j].user._id == user._id)
                                exist_in_team = true;
                        }

                        if (exist_in_team)
                            continue;

                        //Check If Exists in Facebook Friends List
                        for (j = 0; j < $scope.values.fb_friends.length; j++) {
                            if ($scope.values.fb_friends[j].id == user.profileId) {
                                user.is_fb_friend = user.profileId;
                                user.username = user.username + "(facebook friend - " + $scope.values.fb_friends[j].name + ")";
                            }
                        }

                        //Check If Exists in Invite List
                        if ($scope.values.invites.length > 0) {
                            for (j = 0; j < $scope.values.invites.length; j++) {
                                if (user.username == $scope.values.invites[j].user || (user.is_fb_friend != -1 && user.is_fb_friend == $scope.values.invites[j].profileId)) {
                                    break;
                                } else if (j == $scope.values.invites.length - 1) {
                                    users.push(user);
                                }
                            }
                        } else {
                            users.push(user);
                        }
                    }

                    for (i = 0; i < $scope.values.fb_friends.length; i++) {
                        var user = {username: $scope.values.fb_friends[i].name + "(facebook friend)", is_fb_friend: $scope.values.fb_friends[i].id, id: -1};
                        var add = true;

                        for (var j = 0; j < users.length; j++) {
                            if (users[j].profileId == user.is_fb_friend)
                                add = false;
                        }

                        if ($scope.values.invites.length > 0)
                            for (j = 0; j < $scope.values.invites.length; j++) {
                                if ($scope.values.invites[j].fb_id == user.is_fb_friend)
                                    add = false;
                            }

                        if (!add)
                            continue;

                        if ($scope.values.invites.length > 0) {
                            for (j = 0; j < $scope.values.invites.length; j++) {
                                if (user.username == $scope.values.invites[j].user) {
                                    break;
                                } else if (j == $scope.values.invites.length - 1) {
                                    users.push(user);
                                }
                            }
                        } else {
                            users.push(user);
                        }
                    }

                    $scope.values.users = users;
                });
            }
            else
                $scope.values.users = [];
        }

        $scope.addInvite = function (user) {
            if($scope.values.title === "0")
                return true;
            $scope.values.newMember = null;
            $scope.values.users = [];
            var title = {_id: $scope.values.title, title: ""};
            //Remove invited title
            for(var i = 0; i < $scope.values._emptyMembers.length; i++)
                if($scope.values._emptyMembers[i]._id === $scope.values.title)
                {
                    title.title = $scope.values._emptyMembers[i].title;
                    break;
                }
            $scope.values.title = "0";
            $scope.values.invites.push({user: user.username, memberId: user._id, fb_id: user.is_fb_friend, title: title});
            $scope.values._emptyMembers.splice(i, 1);
            return false;
        }

        $scope.removeInvite = function (index) {
            //Add uninvited title
            $scope.values._emptyMembers.push($scope.values.invites[index].title);
            $scope.values.invites.splice(index, 1);
        }

        $scope.send = function () {
            $uibModalInstance.close({type: "SEND", to: $scope.values.to, msg: $scope.values.msg, roles: $scope.values.roles, invites: $scope.values.invites});
            console.log("sending invitation...");
            if ($scope.team.slackGroupId && $scope.team.slackGroupId != "") {
                console.log("slackGroupId = " + $scope.team.slackGroupId);
                $http({method: "POST", url: "slack/sendInvite", api: true, data: {invites: $scope.values.invites, slackGroupId: $scope.team.slackGroupId}});
            }
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }]);

app.controller("sendApplyToAdvController", ["$scope", "$uibModalInstance", "values", "$http", "User", function ($scope, $uibModalInstance, values, $http, User) {
    $scope.values = angular.copy(values);
    $scope.selTeam = '0';
    $scope.cancel = function () {
        $uibModalInstance.close({type: "CLOSE"});
    }

    $scope.send = function () {
        $uibModalInstance.close({type: "SEND", teamId: $scope.selTeam});
    }
}]);

app.controller("viewApplyController", ["$scope", "User", "apply", "$uibModalInstance", function ($scope, User, apply, $uibModalInstance) {
        $scope.apply = apply;
        $scope.user = User.isLoggedIn();

        $scope.approve = function () {
            $uibModalInstance.close({action: "APPROVE", model: apply});
        }

        $scope.reject = function () {
            $uibModalInstance.close({action: "REJECT", model: apply});
        }

        $scope.close = function () {
            $uibModalInstance.close({action: "CLOSE", model: apply});
        }

        $scope.publish = function () {
            $uibModalInstance.close({action: "PUBLISH", model: apply});
        }
    }]);

app.controller("viewNotificationController", ["$scope", "User", "notification", "$uibModalInstance", function ($scope, User, notification, $uibModalInstance) {
    $scope.notification = notification;
    $scope.user = User.isLoggedIn();

    $scope.approve = function () {
        $uibModalInstance.close({action: "APPROVE", model: notification});
    }

    $scope.reject = function () {
        $uibModalInstance.close({action: "REJECT", model: notification});
    }
}]);

app.controller("viewApplyToAdvController", ["$scope", "User", "applyToAdv", "$uibModalInstance", function ($scope, User, applyToAdv, $uibModalInstance) {
    $scope.applyToAdv = applyToAdv;
    $scope.user = User.isLoggedIn();

    $scope.approve = function () {
        $uibModalInstance.close({action: "APPROVE", model: applyToAdv});
    }

    $scope.reject = function () {
        $uibModalInstance.close({action: "REJECT", model: applyToAdv});
    }
}]);

app.controller("viewInviteController", ["$scope", "invite", "$uibModalInstance", "User", function ($scope, invite, $uibModalInstance, User) {
        $scope.invite = invite;
        $scope.user = User.isLoggedIn();

        $scope.accept = function () {
            $uibModalInstance.close({action: "ACCEPT", model: invite});
        }

        $scope.decline = function () {
            $uibModalInstance.close({action: "DECLINE", model: invite});
        }

        $scope.close = function () {
            $uibModalInstance.close({action: "CLOSE", model: invite});
        }

        $scope.publish = function () {
            $uibModalInstance.close({action: "PUBLISH", model: invite});
        }
    }]);
app.controller("profileLeftSideController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.user = User.isLoggedIn();
        $scope.selTeam = "";
        $scope.selAdv = "";
        $scope.users = [];
        $scope.rusers = [];

        $http.get("/api/getUserDetail").then(function (data) {
            $scope.user = data.data.user;
        });

        $scope.calculateRecomendation = function () {
            if (!$scope.user) {
                return;
            }

            $scope.recomendation = [];

            if (!$scope.user.educations || $scope.user.educations.length == 0) {
                $scope.recomendation.push("Add education: college or university.");
            }

            if (!$scope.user.skype) {
                $scope.recomendation.push("Add skype in settings page.");
            }

            if (!$scope.user.experience) {
                $scope.recomendation.push("Add experience.");
            }

            if (!$scope.teams || $scope.teams.length == 0) {
                $scope.recomendation.push("Add new team now.");
            }
        }

        $scope.getTeams = function () {
            $http({
                method: "GET",
                url: "myTeams", api: true
            }).then(function (data) {
                for (var i = 0; i < data.data.teams.length; i++) {
                    for (var j = 0; j < data.data.teams[i].teamMembers.length; j ++) {
                        var o = data.data.teams[i].teamMembers[j];
                        if (o.user == $scope.user._id) {
                            data.data.teams[i].tName =  data.data.teams[i].name + " (" + data.data.teams[i].teamMembers[j].title + ")";
                            break;
                        }
                    }
                }
                $scope.teams = data.data.teams;
            });
        }
        var ruserIds = [];
        $scope.getRecommendationTeams = function () {
            $http({
                method: "GET",
                url: "myRecommendationTeams", api: true
            }).then(function (data) {
                    console.log(data);
                    $scope.rteams = data.data.recommendates;
                    for (var i = 0; i < data.data.recommendates.length; i++) {
                        if (ruserIds.indexOf(data.data.recommendates[i].recommendationId) != -1 ) {
                            continue;
                        }
                        var result = {};
                        result.name = data.data.recommendates[i].recommendationUserName;
                        result.id = data.data.recommendates[i].recommendationId;
                        $scope.rusers.push(result);
                        ruserIds.push(result.id);
                    }
                });
        }

        $scope.getRecommendationAdventures = function () {
            $http({
                method: "GET",
                url: "myRecommendationAdventures", api: true
            }).then(function (data) {
                    console.log(data);
                    $scope.radventures = data.data.recommendates;
                    for (var i = 0; i < data.data.recommendates.length; i++) {
                        if (ruserIds.indexOf(data.data.recommendates[i].recommendationId) != -1 ) {
                            continue;
                        }
                        var result = {};
                        result.name = data.data.recommendates[i].recommendationUserName;
                        result.id = data.data.recommendates[i].recommendationId;
                        $scope.rusers.push(result);
                        ruserIds.push(result.id);
                    }
                });
        }

        var userTeams = [];
        var users = [];
        $scope.getUsers = function () {
            $http({
                method: "GET",
                url: "myTeams",
                api: true
            }).then(function (data) {
                userTeams = data.data.teams;
                if (userTeams.length) {
                    var userIds = [];
                    for (var i = 0; i < userTeams.length; i++) {
                        for (var j = 0; j < userTeams[i].teamMembers.length; j ++) {
                            var o = userTeams[i].teamMembers[j];
                            if(userIds.indexOf(o.user) != -1 || o.user == $scope.user._id) {
                                continue;
                            } else {
                                userIds.push(o.user);
                            }
                        }
                    }
                    console.log("usersId = " + userIds);
                    if (userIds.length) {
                        $http({
                            method: "POST",
                            url: "getUsersByIds",
                            api: true,
                            data: {ids: userIds}
                        }).then (function (data) {
                            users = data.data.users;
                            if (users.length) {
                                console.log("usrs = ", users);
                                var results = [];
                                for (var i = 0; i < users.length; i++) {
                                    if (users[i].profileId == "000000000000000000000000") continue;
                                    if ($scope.user._id == users[i]._id) continue;
                                    var result = {};
                                    result.name = users[i].fullname;
                                    result._id = users[i]._id;
                                    result.photo = users[i].photo;
                                    results.push(result);
                                }
                                $scope.users = results;
                            }
                        });
                    }
                }
            });
        }


        $scope.getAdventures = function () {
            $http({
                method: "POST",
                url: "adventure/listbyme",
                api: true,
                data: {teams: $scope.teams}
            }).then(function (r) {
                $scope.adventures = r.data.adventures;
            });
        }

        $scope.$watch("teams", function () {
            $scope.calculateRecomendation();
            $scope.getAdventures();
//            $scope.getUsers();
        });

        $scope.$watch("rteams", function () {
            $scope.getRecommendationAdventures();
        });


//        $scope.$watch("users", function () {
//            $scope.calculateRecomendation();
//            $scope.getAdventures();
//        });

        $scope.selectTeamView = function() {
            if ($scope.selTeam != "") {
                $location.path("/teams/view/" + $scope.selTeam);
            }
        }
        $scope.selecteAdvView = function() {
            if ($scope.selAdv != "") {
                $location.path("/adventures/view/" + $scope.selAdv);
            }
        }
        $scope.getTeams();
        $scope.getRecommendationTeams();
    }]);
app.controller("profileSettingsController", ["$scope", "$rootScope", "$location", "$http", "User", function ($scope, $rootScope, $location, $http, User) {
        $scope.username = "";
        $scope.fullname = "";
        $scope.email = "";
        $scope.location = "";
        $scope.skype = "";
        $scope.latitude = "";
        $scope.longitude = "";
        $scope.radius = "";
        $scope.goals = "";
        $scope.categories = "";
        $scope.educations = [];
        $scope.links = [];
        $scope.experience = "";
        $scope.bio = "";
        $scope.bio_placeholder = "Provide your biography or import from facebook...";
        $scope.interests = [];
        $scope.likes = [];
        $scope.dislikes = [];
        $scope.skills = [];
        $scope.looks = [];
        $scope.roles = [];

        angular.extend($scope, {
            position: {
                lat: 0,
                lng: 0,
                zoom: 4
            },
            markers: {
                mainMarker: {
                    lat: 0,
                    lng: 0,
                    focus: true,
                    draggable: true
                }
            },
            events: { // or just {} //all events
                markers:{
                    enable: [ 'dragend' ]
                    //logic: 'emit'
                }
            },
            paths: {}
        });

        $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
            $scope.position.lat = args.model.lat;
            $scope.position.lng = args.model.lng;
            $scope.markers.mainMarker.lat = args.model.lat;
            $scope.markers.mainMarker.lng = args.model.lng;
        });

        $scope.$watch("radius", function(newValue, oldValue){
            if (newValue != oldValue) {
                $scope.paths = {};
                if ($scope.radius != 0)
                    $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker}

            }
        }, true);

        $http.get("/api/getUserDetail").then(function (data) {
            $scope.username = data.data.user.username;
            $scope.fullname = data.data.user.fullname;
            $scope.email = data.data.user.email.email;
            $scope.location = data.data.user.location;
            $scope.skype = data.data.user.skype;
            $scope.latitude = data.data.user.latitude;
            $scope.longitude = data.data.user.longitude;
            $scope.radius = data.data.user.radius;
            $scope.goals = data.data.user.goals;
            $scope.categories = data.data.user.categories;
            $scope.educations = data.data.user.educations;
            $scope.links = data.data.user.links;
            $scope.experience = data.data.user.experience;
            $scope.bio = data.data.user.bio;
            $scope.interests = (data.data.user.interests.length) ? data.data.user.interests : [{topic: {topic: ""}, information: ""}];
            $scope.likes = data.data.user.likes;
            $scope.dislikes = data.data.user.dislikes;
            $scope.skills = data.data.user.skills;
            $scope.looks = data.data.user.looks;
            $scope.roles = data.data.user.roles;

            $scope.invalidUsername = false;
            $scope.invalidEmail = false;

            if(isNaN($scope.latitude))
                $scope.latitude = 0;
            if(isNaN($scope.longitude))
                $scope.longitude = 0;
            if(isNaN($scope.radius))
                $scope.radius = 0;
            $scope.position.lat = parseFloat($scope.latitude);
            $scope.position.lng = parseFloat($scope.longitude);
            $scope.markers.mainMarker.lat = parseFloat($scope.latitude);
            $scope.markers.mainMarker.lng = parseFloat($scope.longitude);
            $scope.radius = parseFloat($scope.radius);

        });

        $scope.checkUsername = function () {
            $scope.invalidUsername = true;
            $http({method: "POST", url: "validateUsername", api: true, data: {username: $scope.username}}).then(function (data) {
                $scope.invalidUsername = data.data.find;
            });
        }

        $scope.checkEmail = function () {
            $scope.invalidEmail = true;
            $http({
                method: "POST",
                url: "validateEmail",
                api: true,
                data: {email: $scope.email}
            }).then(function (data) {
                $scope.invalidEmail = data.data.find;
            });
        }

        $scope.saveMainInformation = function () {
            $scope.latitude = parseFloat($scope.markers.mainMarker.lat);
            $scope.longitude = parseFloat($scope.markers.mainMarker.lng);
            $scope.radius = parseFloat($scope.radius);
            $http({
                method: "POST",
                url: "saveMainInformation",
                api: true,
                data: {username: $scope.username, fullname: $scope.fullname, email: $scope.email, location: $scope.location, latitude : $scope.latitude, longitude : $scope.longitude, radius : $scope.radius, skype: $scope.skype, /*goals: $scope.goals,*/ categories: $scope.categories}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.goBack = function () {
            $location.path("/profile");
        }

        $scope.setType = function (e, type) {
            e.type = type;
        }

        $scope.addSchool = function () {
            var e = {};
            e.type = "";
            e.school = {};
            e.school.name = "";
            e.year = {};
            e.year.name = "";
            $scope.educations.push(e);
        }

        $scope.validateEducation = function () {
            for (var i = 0; i < $scope.educations.length; i++) {
                var e = $scope.educations[i];
                if (!e.type || !e.school.name || !e.year.name) {
                    return true;
                }
            }

            return false;
        }

        $scope.saveEducations = function () {
            $http({
                method: "POST",
                url: "saveEducations",
                api: true,
                data: {educations: $scope.educations}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.addLink = function () {
            $scope.links.push({name: "", link: ""});
        }

        $scope.addLikes = function () {
            $scope.likes.push({like: ""});
        }

        $scope.addDislikes = function () {
            $scope.dislikes.push({dislike: ""});
        }

        $scope.addSkills = function () {
            $scope.skills.push({skill: ""});
        }

        $scope.addLooks = function () {
            $scope.looks.push({look: ""});
        }

        $scope.addRoles = function () {
            $scope.roles.push({role: ""});
        }

        $scope.addInterest = function () {
            $scope.interests.push({topic: {topic:""}, information: ""});
            $scope.interest_placeholder = "";
        }

        $scope.validateLinks = function () {
            for (var i = 0; i < $scope.links.length; i++) {
                var l = $scope.links[i];

                if (!l.link) {
                    return true;
                }
            }

            return false;
        }

        $scope.saveLinks = function () {
            $http({
                method: "POST",
                url: "saveLinks",
                api: true,
                data: {links: $scope.links}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.validateLikes = function () {
            for (var i = 0; i < $scope.likes.length; i++) {
                var l = $scope.likes[i];

                if (!l.like) {
                    return true;
                }
            }

            return false;
        }

        $scope.validateDislikes = function () {
            for (var i = 0; i < $scope.dislikes.length; i++) {
                var l = $scope.dislikes[i];

                if (!l.dislike) {
                    return true;
                }
            }

            return false;
        }

        $scope.validateSkills = function () {
            for (var i = 0; i < $scope.skills.length; i++) {
                var l = $scope.skills[i];

                if (!l.skill) {
                    return true;
                }
            }

            return false;
        }

        $scope.validateLooks = function () {
            for (var i = 0; i < $scope.looks.length; i++) {
                var l = $scope.looks[i];

                if (!l.look) {
                    return true;
                }
            }

            return false;
        }

        $scope.validateRoles = function () {
            for (var i = 0; i < $scope.roles.length; i++) {
                var l = $scope.roles[i];

                if (!l.role) {
                    return true;
                }
            }

            return false;
        }

        $scope.saveLikes = function () {
            $http({
                method: "POST",
                url: "saveLikes",
                api: true,
                data: {likes: $scope.likes}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.saveDislikes = function () {
            $http({
                method: "POST",
                url: "saveDislikes",
                api: true,
                data: {dislikes: $scope.dislikes}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.saveSkills = function () {
            $http({
                method: "POST",
                url: "saveSkills",
                api: true,
                data: {skills: $scope.skills}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.saveLooks = function () {
            $http({
                method: "POST",
                url: "saveLooks",
                api: true,
                data: {looks: $scope.looks}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.saveRoles = function () {
            $http({
                method: "POST",
                url: "saveRoles",
                api: true,
                data: {roles: $scope.roles}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.saveExperience = function () {
            $http({
                method: "POST",
                url: "saveExperience",
                api: true,
                data: {experience: $scope.experience}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.saveInterests = function () {
            for (var i = $scope.interests.length - 1; i >= 0; i--)
                if ($scope.interests[i].topic.topic == "" && $scope.interests[i].information == "")
                    $scope.interests.splice(i, 1);
            $http({
                method: "POST",
                url: "saveInterests",
                api: true,
                data: {interests: $scope.interests}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.saveBiography = function () {
            $http({
                method: "POST",
                url: "saveBiography",
                api: true,
                data: {biography: $scope.bio}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

        $scope.removeLink = function (l) {
            var index = $scope.links.indexOf(l);
            if (index >= 0) {
                $scope.links.splice(index, 1);
            }
        }

        $scope.removeInterest = function (i) {
            var index = $scope.interests.indexOf(i);
            if (index >= 0) {
                $scope.interests.splice(index, 1);
            }
        }

        $scope.removeEducation = function (e) {
            var index = $scope.educations.indexOf(e);
            if (index >= 0) {
                $scope.educations.splice(index, 1);
            }
        }

        $scope.removeLikes = function (l) {
            var index = $scope.likes.indexOf(l);
            if (index >= 0) {
                $scope.likes.splice(index, 1);
            }
        }

        $scope.removeDislikes = function (l) {
            var index = $scope.dislikes.indexOf(l);
            if (index >= 0) {
                $scope.dislikes.splice(index, 1);
            }
        }

        $scope.removeSkills = function (l) {
            var index = $scope.skills.indexOf(l);
            if (index >= 0) {
                $scope.skills.splice(index, 1);
            }
        }

        $scope.removeLooks = function (l) {
            var index = $scope.looks.indexOf(l);
            if (index >= 0) {
                $scope.looks.splice(index, 1);
            }
        }

        $scope.removeRoles = function (l) {
            var index = $scope.roles.indexOf(l);
            if (index >= 0) {
                $scope.roles.splice(index, 1);
            }
        }

        $scope.importBio = function () {
            FB.login(function () {
                FB.api("/me", function (response) {
                    $scope.$apply(function () {
                        if (response && !response.error) {
                            $scope.bio = response.bio;
                            if ($scope.bio == "")
                                $scope.bio_placeholder = "No biography information on facebook...";
                        } else {
                            $scope.bio_placeholder = "Error importing...";
                        }
                    });
                }
                );
            }, {scope: ['user_about_me']});
        }

        $scope.importInterests = function () {
            FB.login(function () {
                FB.api("/me/likes", function (response) {
                    $scope.$apply(function () {
                        if (response && !response.error) {
                            for (var i = 0; i < response.data.length; i++) {
                                if (!$scope.exist_interests(response.data[i].category, response.data[i].name))
                                    $scope.interests.push({topic: {topic: response.data[i].category}, information: response.data[i].name});
                            }

                            if (response.data.length == "")
                                $scope.interest_placeholder = "No interests information on facebook...";
                        } else {
                            $scope.interest_placeholder = "Error importing...";
                        }
                    });
                }
                );
            }, {scope: ['user_likes', 'user_about_me']});
        }

        $scope.exist_interests = function (topic, information) {
            if ($scope.interests == null)
                return false;
            for (var i = 0; i < $scope.interests.length; i++) {
                if ($scope.interests[i].topic.topic === topic && $scope.interests[i].information === information)
                    return true;
            }

            return false;
        }

        $scope.saveGoal = function () {
            $http({
                method: "POST",
                url: "saveGoal",
                api: true,
                data: {goals: $scope.goals}
            }).then(function (data) {
                if (data.data.success) {
                    User.update();
                }
            });
        }

    }]);
app.controller("aboutViewController", ["$scope", "$http", "User", function ($scope, $http, User) {
    $scope.items = [{"title":"About us"}, {"title":"How it works"}];
    $scope.contents = [];
    for (var i = 0; i < 10; i++) {
        $scope.contents.push(i);
    }
    $scope.nextPage = function () {
        $scope.items.push({"title":"About us"});
        $scope.items.push({"title":"How it works"});
    }
}]);

app.controller("contactController", ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
    $scope.ourEmail = 'info@galdratekcorp.com';
    $scope.yourEmail = '';
    $scope.description = '';
    $scope.sentSuccess = false;
    $scope.sentFailed = false;
    $scope.sendEmail = function () {
        $http({
            method: "POST", url: "sendContact", api: true,
            data: {toEmail: 'info@galdratekcorp.com',
                fromEmail: $scope.yourEmail,
                text: $scope.description,
                subject: 'Contact Galdraland Support Center'}
        }).then( function success (data) {
            console.log('Mail Sent Success');
            console.log(data);
            if (data.data.success == true)
                $scope.sentSuccess = true;
            else
                $scope.sentFailed = true;
        }, function error (err) {
            $scope.sentFailed = true;
        });
    }
}]);

app.controller("profileViewController", ["$scope", "$http", "User", function ($scope, $http, User) {
    $scope.user = User.isLoggedIn();
    $scope.badgesData = [];
    angular.extend($scope, {
        position: {
            lat: 0,
            lng: 0,
            zoom: 4
        },
        markers: {
            mainMarker: {
                lat: 0,
                lng: 0,
                focus: true,
                draggable: false
            }
        },
        paths: {}
    });
    $http.get("/api/getUserDetail").then(function (data) {
        $scope.user = data.data.user;
        if (data.data.user.latitude && !isNaN(data.data.user.latitude)) {
            $scope.position.lat = parseFloat(data.data.user.latitude);
            $scope.markers.mainMarker.lat = parseFloat(data.data.user.latitude);
        } else {
            $scope.position.lat = 0 ;
            $scope.markers.mainMarker.lat = 0;
        }

        if (data.data.user.longitude && !isNaN(data.data.user.longitude)) {
            $scope.position.lng = parseFloat(data.data.user.longitude);
            $scope.markers.mainMarker.lng = parseFloat(data.data.user.longitude);
        } else {
            $scope.position.lng = 0 ;
            $scope.markers.mainMarker.lng = 0;
        }

        if (data.data.user.radius && !isNaN(data.data.user.radius)) {
            $scope.radius = parseFloat(data.data.user.radius);
        } else {
            $scope.radius = 0 ;
        }

        $scope.paths = {};
        if ($scope.radius != 0)
            $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker};
    });

    $http({
        method: "POST",
        url: "getBadgesByCreateAdv",
        api: true,
        data: {id: $scope.user._id}
    }).then(function (data) {
        if (data && data.data.badges && data.data.badges) {
            for (i = 0; i < data.data.badges.length; i++) {
                var result = {};
                result._id = data.data.badges[i]._id;
                result.name = data.data.badges[i].name;
                result.image = data.data.badges[i].image;
                result.title = "You created adventure '"+result.name+"'";
                result.kind = "adventure";
                result.badgeImg = "/assets/images/badge.png";
                result.href = "/adventures/view/" + data.data.badges[i]._id;
                $scope.badgesData.push(result);
            }
        }
    });

    $http({
        method: "POST",
        url: "getBadgesByCreateTeam",
        api: true,
        data: {id: $scope.user._id}
    }).then(function (data) {
        if (data && data.data.badges && data.data.badges) {
            for (i = 0; i < data.data.badges.length; i++) {
                var result = {};
                result._id = data.data.badges[i]._id;
                result.name = data.data.badges[i].name;
                result.image = data.data.badges[i].image;
                result.title = "You created team '"+result.name+"'";
                result.kind = "team";
                result.badgeImg = "/assets/images/badge.png";
                result.href = "/teams/view/" + data.data.badges[i]._id;
                $scope.badgesData.push(result);
            }
        }
    });

    function processBadgesByRecommend(recommendate) {
        var teamId = recommendate.teamId;
        var roleId = recommendate.roleId;
        var masterId = recommendate.masterId;
        var masterUserName = recommendate.masterUserName;
        var slaveId = recommendate.slaveId;
        var slaveUserName = recommendate.slaveUserName;
        var teamName = recommendate.teamName;
        var roleTitle = recommendate.roleTitle;
        $http({
            method: "POST",
            url: "getBadgesByRecommend",
            api: true,
            data: {teamId: teamId, roleId: roleId, masterId: masterId, slaveId: slaveId}
        }).then(function (data) {
            if (data && data.data && data.data.success == true) {
                var result = {};
                result.title = "You recommendated "+slaveUserName+" for role '"+roleTitle+"' of user "+masterUserName+"'s team '"+teamName+"')";
                result.kind = "recommend";
                result.badgeImg = "/assets/images/bag.png";
                result.href = "/teams/view/" + teamId;
                $scope.badgesData.push(result);
            }
        });
    }
    $http({
        method: "POST",
        url: "RecommendationTeams",
        api: true,
        data: {id: $scope.user._id}
    }).then(function (data) {
        console.log("RecommendationTeams = ",data.data.recommendates);
        if (data && data.data.recommendates && data.data.recommendates) {
            for (i = 0; i < data.data.recommendates.length; i++) {
                processBadgesByRecommend(data.data.recommendates[i]);
            }
        }
    });
}]);

app.controller("advancedSearchController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.scategory = "aa";
        $scope.advancedSearch = function () {
            $location.path("/search/" + $scope.scategory + "/ /" + $scope.name + "/" + $scope.description + "/" + $scope.tag);
        }
    }]);

app.controller("searchController", ["$scope", "$http", "$location", "$stateParams", "User", function ($scope, $http, $location, $stateParams, User) {
        $scope.user = User.isLoggedIn();
        $scope.results = [];
        $scope.loading = true;

        $scope.refresh = function () {
            $scope.loading = true;
            var request = null;
            switch ($stateParams.scategory) {
                case "aa":
                    $http({method: "POST", url: "adventure/adsearch", api: true, data: {name: $stateParams.sname, description: $stateParams.sdescription, tag: $stateParams.stag}}).then($scope.parse_adventures).then(function () {
                        $scope.loading = false;
                    });
                    break;
                case "tt":
                    $http({method: "POST", url: "adsearchTeam", api: true, data: {name: $stateParams.sname, description: $stateParams.sdescription}}).then($scope.parse_teams).then(function () {
                        $scope.loading = false;
                    });
                    break;
                case "pp":
                    $http({method: "POST", url: "searchUser", api: true, data: {term: $stateParams.sname}}).then($scope.parse_users).then(function () {
                        $scope.loading = false;
                    });
                    break;
                case "a":
                    $http({method: "POST", url: "adventure/search", api: true, data: {term: $stateParams.sterm}}).then($scope.parse_adventures).then(function () {
                        $scope.loading = false;
                    });
                    break;
                case "t":
                    $http({method: "POST", url: "searchTeam", api: true, data: {term: $stateParams.sterm}}).then($scope.parse_teams).then(function () {
                        $scope.loading = false;
                    });
                    break;
                case "p":
                    $http({method: "POST", url: "searchUser", api: true, data: {term: $stateParams.sterm}}).then($scope.parse_users).then(function () {
                        $scope.loading = false;
                    });
                    break;
            }
        }

        $scope.parse_adventures = function (data) {
            $scope.results = [];
            for (var i = 0; i < data.data.adventures.length; i++) {
                var result = {};
                result._id = data.data.adventures[i]._id;
                result.name = data.data.adventures[i].name;
                result.text1 = data.data.adventures[i].tags.join(" ");
                result.text2 = data.data.adventures[i].start + " - " + data.data.adventures[i].end;
                result.href = "/adventures/view/" + data.data.adventures[i]._id;
                $scope.results.push(result);
            }
        }

        $scope.parse_teams = function (data) {
            $scope.results = [];
            for (var i = 0; i < data.data.teams.length; i++) {
                var result = {};
                result._id = data.data.teams[i]._id;
                result.name = data.data.teams[i].name;
                result.text1 = data.data.teams[i].teamMembers.length + " Members";
                result.href = "/teams/view/" + data.data.teams[i]._id;
                $scope.results.push(result);
            }
        }

        $scope.parse_users = function (data) {
            $scope.results = [];
            for (var i = 0; i < data.data.users.length; i++) {
                var result = {};
                result.name = data.data.users[i].username;
                result.text1 = data.data.users[i].fullname;
                result.photo = data.data.users[i].photo;
                result.href = "/users/view/" + data.data.users[i]._id;
                $scope.results.push(result);
            }
        }

        $scope.refresh();
    }]);
app.controller("createTeamController", ["$scope", "$rootScope", "Upload", "$http", "$compile", "$location", function ($scope, $rootScope, Upload, $http, $compile, $location) {
    $scope.errMsg = "";
    $scope.slackAuthentication = false;

    angular.extend($scope, {
        position: {
            lat: 0,
            lng: 0,
            zoom: 4
        },
        markers: {
            mainMarker: {
                lat: 0,
                lng: 0,
                focus: true,
                draggable: true
            }
        },
        events: { // or just {} //all events
            markers:{
                enable: [ 'dragend' ]
                //logic: 'emit'
            }
        },
        paths: {}
    });

    $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
        $scope.position.lat = args.model.lat;
        $scope.position.lng = args.model.lng;
        $scope.markers.mainMarker.lat = args.model.lat;
        $scope.markers.mainMarker.lng = args.model.lng;
    });

    $scope.$watch("radius", function(newValue, oldValue){
        if (newValue != oldValue) {
            $scope.paths = {};
            if ($scope.radius != 0)
                $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker}

        }
    }, true);

        $scope.refresh = function () {
            $http({
                method: "GET",
                url: "getUser",
                api: true
            }).then(function success(data) {
                if (data.data.user.slackToken && data.data.user.slackToken != '' && data.data.user.slackUser && data.data.user.slackUser != '') {
                    $scope.slackAuthentication = true;
                }
            });
        }

        $scope.createTeam = function () {
            var post = $scope.fb_post;
            console.log("Create Team Tags = ", $scope.tags);
            var tmpTags = [];
            for (i=0; i<$scope.tags.length; i++) {
                if ($scope.tags[i].name == null || $scope.tags[i].name == "undefined")
                    tmpTags.push($scope.tags[i]);
                else
                    tmpTags.push($scope.tags[i].name);
            }

            $scope.latitude = parseFloat($scope.markers.mainMarker.lat);
            $scope.longitude = parseFloat($scope.markers.mainMarker.lng);
            $scope.radius = parseFloat($scope.radius);

            $http({
                method: "POST",
                url: "createTeam",
                api: true,
                data: {name: $scope.name, description: $scope.description, rols: $scope.roles, defuser: $rootScope.defUser, latitude: $scope.latitude, longitude: $scope.longitude, radius: $scope.radius, fb_page: $scope.fb_page, mission: $scope.mission, image: $scope.uploadedImage, tags: tmpTags}
            }).then(function (data) {
                if (data && data.data && data.data.success == true) {
                    if($scope.slackAuthentication == true) {
                        $http({
                            method: "POST",
                            url: "slack/createChannel",
                            api: true,
                            data: {
                                name : $scope.name,
                                teamId:  data.data.id
                            }
                        }).then(function (data1) {
                            if (data1.data.success ==  false) {
                                var htmlcontent = data1.data.msg;
                                $scope1 = $('#err').html(htmlcontent).scope();
                                $compile($('#err'))($scope1);
                                $http({method: "POST", url: "removeTeam", api: true, data: {id: data.data.id}}).then(function () {

                                });
                            } else {
                                if ($rootScope.return2Adventure == "return")
                                {
                                    $rootScope.return2Adventure = "normal";
                                    $location.path("/adventures/create");
                                }
                                else {
                                    $location.path("/teams/view/" + data.data.id);
//                                if (post) {
//                                    $scope.post_to_fb(data.data.id);
//                                }
                                }
                            }
                        });
                    } else {
                        if ($rootScope.return2Adventure == "return")
                        {
                            $rootScope.return2Adventure = "normal";
                            $location.path("/adventures/create");
                        }
                        else {
                            $location.path("/teams/view/" + data.data.id);
                        }
                    }
                } else {
                    if (data && data.data) {
                        var htmlcontent = data.data.msg;
                        $scope1 = $('#err').html(htmlcontent).scope();
                        $compile($('#err'))($scope1);
                    }
                }
            });
        }

        $scope.post_to_fb = function (id) {
            FB.login(function (response) {
                console.log("response = ", response);
                if (response.authResponse) {
                    FB.api('/me/feed', 'post', {message: $scope.user.fullname + " has created a new team on Galdraland.\n" + config.siteurl + "/teams/view/" + id}, function(response) {
                        if (!response || response.error) {
                            console.log('Error occured');
                        } else {
                            console.log('Post ID: ' + response.id);
                        }
                    });
                }
            }, {scope: 'publish_actions'});
        }

        $scope.tags = [];
        $scope.onFileSelect = function (image1) {
            $scope.image = image1.files[0];
            if (angular.isArray($scope.image)) {
                $scope.image = $scope.image[0];
            }

            // This is how I handle file types in client side
//            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
//                alert('Only PNG and JPEG are accepted.');
//                return;
//            }

            $scope.uploadInProgress = true;
            $scope.uploadProgress = 0;

            var fd = new FormData();
            fd.append('file', $scope.image);
            
            $scope.upload = Upload.upload({
                url: 'upload/image',
                method: 'POST',
                api: true,
                file: $scope.image
            }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately 
                console.log(data);
                $scope.uploadedImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
        }

        $scope.refresh();
    }]);

app.controller("editTeamController", ["$scope", "$http", "$location", "$stateParams", "Upload", function ($scope, $http, $location, $stateParams, Upload) {
        var id = $stateParams.id;
        $scope.uploadInProgress = false;
        $scope.uploadProgress = 0;

        angular.extend($scope, {
            position: {
                lat: 0,
                lng: 0,
                zoom: 4
            },
            markers: {
                mainMarker: {
                    lat: 0,
                    lng: 0,
                    focus: true,
                    draggable: true
                }
            },
            events: { // or just {} //all events
                markers:{
                    enable: [ 'dragend' ]
                    //logic: 'emit'
                }
            },
            paths: {}
        });

    $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
        $scope.position.lat = args.model.lat;
        $scope.position.lng = args.model.lng;
        $scope.markers.mainMarker.lat = args.model.lat;
        $scope.markers.mainMarker.lng = args.model.lng;
    });

    $scope.$watch("radius", function(newValue, oldValue){
        if (newValue != oldValue) {
            $scope.paths = {};
            if ($scope.radius != 0)
                $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker}

        }
    }, true);

        $http({
            method: "POST",
            url: "getTeam",
            api: true,
            data: {id: id}
        }).then(function (data) {
            console.log(data);
            $scope.name = data.data.team.name;
            $scope.description = data.data.team.description;
            $scope.uploadedImage = data.data.team.image;
            $scope.tags = data.data.team.tags;
            $scope.fb_page = data.data.team.fb_page;
            $scope.latitude = data.data.team.latitude;
            $scope.longitude = data.data.team.longitude;
            $scope.radius = data.data.team.radius;
            $scope.mission = data.data.team.mission;
            if(isNaN($scope.latitude))
                $scope.latitude = 0;
            if(isNaN($scope.longitude))
                $scope.longitude = 0;
            if(isNaN($scope.radius))
                $scope.radius = 0;

            $scope.position.lat = parseFloat($scope.latitude);
            $scope.position.lng = parseFloat($scope.longitude);
            $scope.markers.mainMarker.lat = parseFloat($scope.latitude);
            $scope.markers.mainMarker.lng = parseFloat($scope.longitude);
            $scope.radius = parseFloat($scope.radius);

            $scope.paths = {};
            if ($scope.radius != 0)
                $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker}
        });
        $scope.onFileSelect = function (image) {
            console.log(image);
            image = image.files[0];
            if (angular.isArray(image)) {
                image = image[0];
            }

            $scope.uploadInProgress = true;
            $scope.uploadProgress = 0;

            var fd = new FormData();
            fd.append('file', image);
            
            $scope.upload = Upload.upload({
                url: 'upload/image',
                method: 'POST',
                api: true,
                file: image
            }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately 
                console.log(data);
                $scope.uploadedImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
        }
        $scope.editTeam = function () {
            var tmpTags = [];
            console.log("Edit Team Tags = ", $scope.tags);
            for (i=0; i<$scope.tags.length; i++) {
                if ($scope.tags[i].name == null || $scope.tags[i].name == "undefined")
                    tmpTags.push($scope.tags[i]);
                else
                    tmpTags.push($scope.tags[i].name);
            }

            $scope.latitude = parseFloat($scope.markers.mainMarker.lat);
            $scope.longitude = parseFloat($scope.markers.mainMarker.lng);
            $scope.radius = parseFloat($scope.radius);

            $http({method: "POST", url: "editTeam", api: true, data: {id: id, name: $scope.name, description: $scope.description, image:$scope.uploadedImage, latitude: $scope.latitude, longitude: $scope.longitude, radius: $scope.radius, fb_page: $scope.fb_page, mission: $scope.mission, tags:tmpTags}}).then(function (data) {
                $location.path("/teams/view/" + id);
            });
        }

        $scope.goBack = function () {
            $location.path("/teams/view/" + id);
        }
    }]);

app.controller("createTeamBlogController", ["$scope", "$http", "$location", "$stateParams", "Upload", function ($scope, $http, $location, $stateParams, Upload) {
    var id = $stateParams.id;
    $scope.uploadInProgress = false;
    $scope.uploadProgress = 0;

    console.log("calling... createTeamBlogController");

    $scope.onFileSelect = function (image) {
        console.log(image);
        $scope.blogImage = image.files[0];
        if (angular.isArray($scope.blogImage)) {
            $scope.blogImage = $scope.blogImage[0];
        }

        $scope.uploadInProgress = true;
        $scope.uploadProgress = 0;

        var fd = new FormData();
        fd.append('file', $scope.blogImage);

        $scope.upload = Upload.upload({
            url: 'upload/image',
            method: 'POST',
            api: true,
            file: $scope.blogImage
        }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately
                console.log(data);
                $scope.uploadedBlogImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
    }
    $scope.createBlog = function () {
        console.log("calling... createBlog");
        $http({method: "POST", url: "team/createblog", api: true, data: {team: id, blogTitle: $scope.blogTitle, blogImage:$scope.uploadedBlogImage, blogBody: $scope.blogBody}}).then(function (data) {
            console.log("ending... createBlog");
            $location.path("/teams/view/" + id);
        });
    }
    $scope.goBack = function () {
        $location.path("/teams/view/" + id);
    }
}]);

app.controller("editTeamBlogController", ["$scope", "$http", "$location", "$stateParams", "Upload", function ($scope, $http, $location, $stateParams, Upload) {
    var teamid = $stateParams.teamid;
    var blogid = $stateParams.blogid;
    $scope.uploadInProgress = false;
    $scope.uploadProgress = 0;

    console.log("calling... editTeamBlogController");

    $http({
        method: "POST",
        url: "team/blogget",
        api: true,
        data: {id: blogid}
    }).then(function (data) {
            console.log(data);
            $scope.blogTitle = data.data.teamblog.title;
            $scope.blogBody = data.data.teamblog.body;
            $scope.uploadedBlogImage = data.data.teamblog.image;
    });

    $scope.onFileSelect = function (image) {
        console.log(image);
        $scope.blogImage = image.files[0];
        if (angular.isArray($scope.blogImage)) {
            $scope.blogImage = $scope.blogImage[0];
        }

        $scope.uploadInProgress = true;
        $scope.uploadProgress = 0;

        var fd = new FormData();
        fd.append('file', $scope.blogImage);

        $scope.upload = Upload.upload({
            url: 'upload/image',
            method: 'POST',
            api: true,
            file: $scope.blogImage
        }).success(function (data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately
                console.log(data);
                $scope.uploadedBlogImage = "/api/assets/images/upload/" + data.data;
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
            });
    }

    $scope.updateBlog = function () {
        console.log("calling... updateBlog");
        $http({method: "POST", url: "team/updateblog", api: true, data: {id: blogid, blogTitle: $scope.blogTitle, blogImage:$scope.uploadedBlogImage, blogBody: $scope.blogBody}}).then(function (data) {
            console.log("ending... updateBlog");
            $location.path("/teams/view/" + teamid);
        });
    }
    $scope.goBack = function () {
        $location.path("/teams/view/" + teamid);
    }
}]);

app.controller("teamBlogViewController", ["$scope", "$http", "$sce", "$location", "$stateParams", "Upload", function ($scope, $http, $sce, $location, $stateParams, Upload) {
    var teamid = $stateParams.teamid;
    var blogid = $stateParams.blogid;

    console.log("calling... viewTeamBlogController");
    $scope.refresh = function () {
        $http({
            method: "POST",
            url: "team/blogget",
            api: true,
            data: {id: blogid}
        }).then(function (data) {
            console.log(data);
            $scope.blogTitle = data.data.teamblog.title;
            $scope.blogBody = data.data.teamblog.body;
            $scope.uploadedBlogImage = data.data.teamblog.image;
            if ($scope.blogBody && $scope.blogBody != "") {
                var find = "\n";
                var re = new RegExp(find, 'g');
                $scope.blogBody = $sce.trustAsHtml($scope.blogBody.replace(re,"<br>"));
                $scope.blogBody = $scope.blogBody;
            }

            /* FB commenting*/
            var htmlcontent = "<div id='fb-root'>" +
                "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                "<div class='fb-comments' data-href='http://webascender.com/blog/#teamblog" + blogid +"' data-numposts='5' data-colorscheme='light' data-width='550'></div>";
            $scope1 = $('#fbComment').html(htmlcontent).scope();
            $compile($('#fbComment'))($scope1);
       });
    };

    $scope.goBack = function () {
        $location.path("/teams/view/" + teamid);
    }

    $scope.refresh();
}]);

app.controller("teamSlackController", ["$scope", "$http", "$sce", "$stateParams", "User", "$location", "$compile", "$state", function ($scope, $http, $sce, $stateParams, User, $location, $compile, $state) {
    var id = $stateParams.id;

    $scope.goBack = function () {
        $location.path("/teams/view/" + id);
    }

    $scope.refresh = function () {
        $scope.loading = true;
        $http({
            method: "POST",
            url: "slack/getMessages",
            api: true,
            data: {teamId: id}
        }).then(function (data) {
            console.log(data);
            if(data.data.data.messages) {
                $scope.messages = [];
                for (var i = 0; i < data.data.data.messages.length; i++) {
                    var result = {};
                    if (data.data.data.messages[i].subtype && data.data.data.messages[i].subtype == "bot_message")
                        result.userName = data.data.data.messages[i].username;
                    else
                        result.userName = data.data.data.messages[i].userName;
                    result.dateTime = data.data.data.messages[i].dateTime;
                    result.text = data.data.data.messages[i].text;
                    $scope.messages.push(result);
                }
                $scope.loading = false;
            }
        });
    };

    $scope.sendSlack = function () {
        console.log("calling... sendSlack msg = " + $scope.slackMsg);
        $http({method: "POST", url: "slack/sendMessage", api: true, data: {teamId: id, msg: $scope.slackMsg}}).then(function (data) {
            console.log("ending... sendSlack");
//            $location.path("/teams/slack/" + id);
            $state.reload();
        });
    };

    $scope.refresh();
}]);

app.controller("myTeamsController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.user = User.isLoggedIn();

        $scope.refresh = function () {
            $scope.loading = true;
            $http({
                method: "GET",
                url: "myTeams",
                api: true
            }).then(function (data) {
                var teams = [];
                if (data && data.data.teams) {
                    $scope.teams = data.data.teams;
                    teams = $scope.teams;
                }
                $http({
                    method: "POST",
                    url: "getFavoriteTeam",
                    api: true,
                    data : {teams: teams}
                }).then(function success(data) {
                    if (data && data.data.fteams) {
                        $scope.fteams = data.data.fteams;
                    }
                    $scope.loading = false;
                });
            });
        }

        $scope.refresh();
    }]);

app.controller("myTeamsTagController", ["$scope", "$http", "$location", "$stateParams", "User", function ($scope, $http, $location, $stateParams, User) {
    $scope.user = User.isLoggedIn();
    $scope.refresh = function () {
        $scope.loading = true;
        $http({
            method: "POST",
            url: "teamTag/list",
            api: true,
            data: {tag: $stateParams.tag}
        }).then(function (data) {
            $scope.teams = data.data.teams;
            $scope.loading = false;
        });
    }

    $scope.refresh();
}]);

app.controller("homeController", ["$scope", "$http", "$location", "$stateParams", "User", "$state", function ($scope, $http, $location, $stateParams, User, $state) {
    $scope.user = User.isLoggedIn();
    $scope.adventures = [];
    $scope.teams = [];
    $scope.peoples = [];
    $scope.feeds = [];
    $scope.slacks = [];
    $scope.badges = [];
    $scope.newsloading = true;
    $scope.feedloading = true;
    $scope.slackloading = true;
    $scope.badgeloading = true;
    $scope.slackloading = true;
    $scope.slackAuthentication = false;

    $scope.refresh = function () {
        $scope.newsloading = true;
        $scope.feedloading = true;
              
        $http({
            method: "POST",
            url: "getUserById",
            api: true,
            data: {id: $scope.user._id}
        }).then(function success(data) {
            if (data.data.user.slackToken && data.data.user.slackToken != '' && data.data.user.slackUser && data.data.user.slackUser != '') {
                $scope.slackAuthentication = true;
            } else {
                console.log('calling send email for slack');
                function send_email_signup_slack(email) {
                    console.log('email = ' + email);
                    $http({method: "POST", url: "sendEmailSingupSlack", api: true, data: {email: email}}).then(function (data) {
                    });
                }                
                send_email_signup_slack(data.data.user.email);
            }
            $scope.slackloading = false;
        });

        $http({method: "POST", url: "newAdventureHome", api: true, data: {term: ""}}).then($scope.parse_adventures);

        $http({method: "POST", url: "newTeamHome", api: true, data: {term: ""}}).then($scope.parse_teams);

        $http({method: "POST", url: "newUserHome", api: true, data: {term: ""}}).then($scope.parse_users);

        $http({method: "POST", url: "newFavoriteAdventureHome", api: true, data: {term: ""}}).then($scope.parse_fadventures);

        $http({method: "POST", url: "newFavoriteTeamHome", api: true, data: {term: ""}}).then($scope.parse_fteams);

        $http({method: "POST", url: "newFavoriteUserHome", api: true, data: {term: ""}}).then($scope.parse_fusers).then(function () {
            $scope.newsloading = false;
        });

        $http({
            method: "GET", url: "getMasterRecommendates", api: true
        }).then (function (result) {
            if (result !== undefined && result.data !== undefined && result.data.recommendates !== undefined)
                $scope.masterRecommendates = result.data.recommendates;
            else
                $scope.masterRecommendates = [];
            console.log("marster = ", $scope.masterRecommendates);
            $http({
                method: "GET", url: "getSlaveRecommendates", api: true
            }).then (function (result) {
                if (result !== undefined && result.data !== undefined && result.data.recommendates !== undefined)
                    $scope.slaveRecommendates = result.data.recommendates;
                else
                    $scope.slaveRecommendates = [];
                console.log("slave = ", $scope.slaveRecommendates);
                refresh_home_feeds();
                $scope.feedloading = false;
            });
        });

        $http({
            method: "GET",
            url: "myTeams",
            api: true
        }).then(function (data) {
            var slackTeams = [];
            var slackTeams1 = [];
            if(data && data.data && data.data.teams) {
                var k = 0;
                for (i=0; i< data.data.teams.length;i++){
                    var result = {};
                    result._id = data.data.teams[i]._id;
                    result.name = data.data.teams[i].name;
                    result.slackGroupId = data.data.teams[i].slackGroupId;
                    slackTeams.push(result);
                    if (i != 0 && i % 5 == 0) {
                        slackTeams1.push(slackTeams);
                        slackTeams = [];
                    }
                }
                slackTeams1.push(slackTeams);
                for (i = 0; i < slackTeams1.length; i++) {
                    $http({
                        method: "POST", url: "slack/getFeeds1", api: true, data : {teams : slackTeams1[i]}
                    }).then (function (result) {
                        console.log("slack Feeds = ", result);
                        if (result !== undefined && result.data !== undefined && result.data.feeds !== undefined) {
                            refresh_home_slacks(result.data.feeds);
                        }
                        $scope.slackloading = false;
                    });
                }
            }
        });

        $http({method: "POST", url: "badgesAdventure", api: true}).then($scope.parse_badgeAdventures);
        $http({method: "POST", url: "badgesTeam", api: true}).then($scope.parse_badgeTeams);
        $http.get("/api/HomeRecommendationTeams").then(function (data) {
            console.log("HomeRecommendationTeams = ",data.data.recommendates);
            if (data && data.data.recommendates && data.data.recommendates) {
                for (i = 0; i < data.data.recommendates.length; i++) {
                    processBadgesHomeViewByRecommend(data.data.recommendates[i]);
                }
                $scope.badgeloading = false;
            }
        });

    }

    function processBadgesHomeViewByRecommend(recommendate) {
        var id = recommendate._id;
        var teamId = recommendate.teamId;
        var roleId = recommendate.roleId;
        var masterId = recommendate.masterId;
        var masterUserName = recommendate.masterUserName;
        var slaveId = recommendate.slaveId;
        var slaveUserName = recommendate.slaveUserName;
        var teamName = recommendate.teamName;
        var roleTitle = recommendate.roleTitle;
        $http({
            method: "POST",
            url: "getBadgesByRecommend",
            api: true,
            data: {teamId: teamId, roleId: roleId, masterId: masterId, slaveId: slaveId}
        }).then(function (data) {
            if (data && data.data && data.data.success == true) {
                var result = {};
                result._id = id;
                result.title = "You recommendated "+slaveUserName+" for role '"+roleTitle+"' of user "+masterUserName+"'s team '"+teamName+"')";
                result.kind = "recommend";
                result.badgeImg = "/assets/images/bag.png";
                result.href = "/teams/view/" + teamId;
                $scope.badges.push(result);
            }
        });
    }

    function prettyDate(startDate) {
        var date = new Date();
        var secs = Math.floor((date.getTime() - Date.parse(startDate)) / 1000);
        if (secs < 60)
            return secs + " sec(s) ago";
        if (secs < 3600)
            return Math.floor(secs / 60) + " min(s) ago";
        if (secs < 86400)
            return Math.floor(secs / 3600) + " hour(s) ago";
        if (secs < 604800)
            return Math.floor(secs / 86400) + " day(s) ago";
        return date.toDateString();
    }

    $scope.parse_adventures = function (data) {
        $scope.adventures = [];
        for (var i = 0; i < data.data.adventures.length; i++) {
            var result = {};
            result._id = data.data.adventures[i]._id;
            result.name = data.data.adventures[i].name;
            result.advImg = data.data.adventures[i].image;
            result.username = data.data.adventures[i].owner.fullname;
            result.userImg = data.data.adventures[i].owner.photo;
            result.text1 = data.data.adventures[i].tags.join(" ");
            result.text2 = data.data.adventures[i].start + " - " + data.data.adventures[i].end;
            result.href = "/adventures/view/" + data.data.adventures[i]._id;
            result.createdAt = prettyDate(data.data.adventures[i].createdAt);
            $scope.adventures.push(result);
        }
    }

    $scope.parse_fadventures = function (data) {
        $scope.fadventures = [];
        console.log("fadventures = ", data.data.fadventures);
        for (var i = 0; i < data.data.fadventures.length; i++) {
            var result = {};
            result._id = data.data.fadventures[i]._id;
            result.advName = data.data.fadventures[i].adventure.name;
            result.advImg = data.data.fadventures[i].adventure.image;
            result.advId = data.data.fadventures[i].adventure._id;
            result.userName = data.data.fadventures[i].user.fullname;
            result.userImg = data.data.fadventures[i].user.photo;
            result.ownerName = data.data.fadventures[i].owner.fullname;
            result.ownerImg = data.data.fadventures[i].owner.photo;
            result.href = "/adventures/view/" + data.data.fadventures[i].adventure._id;
            result.createdAt = prettyDate(data.data.fadventures[i].createdAt);
            $scope.fadventures.push(result);
        }
    }

    $scope.parse_teams = function (data) {
        $scope.teams = [];
        for (var i = 0; i < data.data.teams.length; i++) {
            var result = {};
            result._id = data.data.teams[i]._id;
            result.name = data.data.teams[i].name;
            result.teamImg = data.data.teams[i].image;
            result.username = data.data.teams[i].owner.fullname;
            result.userImg = data.data.teams[i].owner.photo;
            result.text1 = data.data.teams[i].teamMembers.length + " Members";
            result.href = "/teams/view/" + data.data.teams[i]._id;
            result.createdAt = prettyDate(data.data.teams[i].createdAt);
            $scope.teams.push(result);
        }
    }

    $scope.parse_fteams = function (data) {
        $scope.fteams = [];
        console.log("fteams = ", data.data.fteams);
        for (var i = 0; i < data.data.fteams.length; i++) {
            var result = {};
            result._id = data.data.fteams[i]._id;
            result.teamName = data.data.fteams[i].team.name;
            result.teamImg = data.data.fteams[i].team.image;
            result.teamId = data.data.fteams[i].team._id;
            result.userName = data.data.fteams[i].user.fullname;
            result.userImg = data.data.fteams[i].user.photo;
            result.ownerName = data.data.fteams[i].owner.fullname;
            result.ownerImg = data.data.fteams[i].owner.photo;
            result.href = "/teams/view/" + data.data.fteams[i].team._id;
            result.createdAt = prettyDate(data.data.fteams[i].createdAt);
            $scope.fteams.push(result);
        }
    }


    $scope.parse_users = function (data) {
        $scope.peoples = [];
        for (var i = 0; i < data.data.users.length; i++) {
            var result = {};
            result._id = data.data.users[i]._id;
            result.name = data.data.users[i].username;
            result.text1 = data.data.users[i].fullname;
            result.photo = data.data.users[i].photo;
            result.signin = prettyDate(data.data.users[i].signin);
            $scope.peoples.push(result);
        }
    }

    $scope.parse_fusers = function (data) {
        $scope.fusers = [];
        console.log("fusers = ", data.data.fusers);
        for (var i = 0; i < data.data.fusers.length; i++) {
            var result = {};
            result._id = data.data.fusers[i]._id;
            result.userName = data.data.fusers[i].user.fullname;
            result.userImg = data.data.fusers[i].user.photo;
            if ($scope.user._id == data.data.fusers[i].fuser._id)
                result.fuserName = "you";
            else
                result.fuserName = data.data.fusers[i].fuser.fullname;
            result.fuserImg = data.data.fusers[i].fuser.photo;
            result.fuserId = data.data.fusers[i].fuser._id;
            result.href = "/users/view/" + data.data.fusers[i].fuser._id;
            result.createdAt = prettyDate(data.data.fusers[i].createdAt);
            $scope.fusers.push(result);
        }
    }

    function refresh_home_feeds() {
        for (var i = 0; i < $scope.masterRecommendates.length; i++) {
            var feed = $scope.masterRecommendates[i];
            feed.category = 2;
            feed.msg = feed.masterMsg;
            feed.position = "master";
            $scope.feeds.push(feed);
        }
        for (var i = 0; i < $scope.slaveRecommendates.length; i++) {
            var feed = $scope.slaveRecommendates[i];
            feed.category = 2;
            feed.msg = feed.masterMsg;
            feed.position = "slave";
            $scope.feeds.push(feed);
        }
    }

    function refresh_home_slacks(feeds) {
        for (var i = 0; i < feeds.length; i++) {
            var feed = feeds[i];
            feed.category = 3;
            feed.msg = "You have not seen " + feed.unread_count + " slack messages for team '"+feed.teamName+"'";
            $scope.slacks.push(feed);
        }
    }

    $scope.parse_badgeAdventures = function (data) {
        for (var i = 0; i < data.data.adventures.length; i++) {
            var result = {};
            result._id = data.data.adventures[i]._id;
            result.name = data.data.adventures[i].name;
            result.image = data.data.adventures[i].image;
            result.title = "You created adventure '"+result.name+"'";
            result.kind = "adventure";
            result.badgeImg = "/assets/images/badge.png";
            result.href = "/adventures/view/" + data.data.adventures[i]._id;
            $scope.badges.push(result);
        }
    }

    $scope.parse_badgeTeams = function (data) {
        for (var i = 0; i < data.data.teams.length; i++) {
            var result = {};
            result._id = data.data.teams[i]._id;
            result.name = data.data.teams[i].name;
            result.image = data.data.teams[i].image;
            result.title = "You created team '"+result.name+"'";
            result.kind = "team";
            result.badgeImg = "/assets/images/badge.png";
            result.href = "/teams/view/" + data.data.teams[i]._id;
            $scope.badges.push(result);
        }
    }

    $scope.showHomeRecommendation = function (recommendate) {
        $http({
            method: "POST", url: "applyRecommendates", api: true, data: {id: recommendate._id, position: recommendate.position}
        }).then (function (result) {
            console.log(result);
        });
        if (recommendate.position == "master") {
            var url = "/users/view/" + recommendate.slaveId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        } else {
            if (recommendate.type == "teams") {
                var url = "/teams/view/" + recommendate.teamId;
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            } else {
                var url = "/adventures/view/" + recommendate.adventureId;
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            }
        }
    }

    $scope.showHomeUser = function (userId) {
        $http({
            method: "POST", url: "updateUserHomeView", api: true, data: {id: userId}
        }).then (function (result) {
            var url = "/users/view/" + userId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        });
    }

    $scope.showHomeTeam = function (teamId) {
        $http({
            method: "POST", url: "updateTeamHomeView", api: true, data: {id: teamId}
        }).then (function (result) {
            var url = "/teams/view/" + teamId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        });
    }

    $scope.showHomeAdv = function (advId) {
        $http({
            method: "POST", url: "updateAdventureHomeView", api: true, data: {id: advId}
        }).then (function (result) {
            var url = "/adventures/view/" + advId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        });
    }

    $scope.showHomeFavoriteAdv = function (fa) {
        $http({
            method: "POST", url: "updateFavoriteAdventureHomeView", api: true, data: {id: fa._id}
        }).then (function (result) {
            var url = "/adventures/view/" + fa.advId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        });
    }

    $scope.showHomeFavoriteTeam = function (ft) {
        $http({
            method: "POST", url: "updateFavoriteTeamHomeView", api: true, data: {id: ft._id}
        }).then (function (result) {
            var url = "/teams/view/" + ft.teamId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        });
    }

    $scope.showHomeFavoriteUser = function (fu) {
        $http({
            method: "POST", url: "updateFavoriteUserHomeView", api: true, data: {id: fu._id}
        }).then (function (result) {
            var url = "/users/view/" + fu.fuserId;
            if ($location.path() == url)
                $state.reload();
            else
                $location.path(url);
        });
    }

    $scope.showHomeSlackMsg = function (slackFeed) {
        var url = "/teams/slack/" + slackFeed.teamId;
        if ($location.path() == url)
            $state.reload();
        else
            $location.path(url);
    }


    $scope.showHomeBadges = function (badge) {
        if (badge.kind == "team") {
            $http({
                method: "POST", url: "updateBadgesTeamHomeView", api: true, data: {id: badge._id}
            }).then (function (result) {
                var url = badge.href;
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            });
        }
        if (badge.kind == "adventure") {
            $http({
                method: "POST", url: "updateBadgesAdventureHomeView", api: true, data: {id: badge._id}
            }).then (function (result) {
                var url = badge.href;
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            });
        }
        if (badge.kind == "recommend") {
            $http({
                method: "POST", url: "updateBadgesRecommendHomeView", api: true, data: {id: badge._id}
            }).then (function (result) {
                var url = badge.href;
                if ($location.path() == url)
                    $state.reload();
                else
                    $location.path(url);
            });
        }
    }
    $scope.refresh();

}]);

app.controller("newsController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.user = User.isLoggedIn();
        $scope.adventures = [];
        $scope.teams = [];
        $scope.peoples = [];
        $scope.loading = true;

        $scope.refresh = function () {
            $scope.loading = true;

            $http({method: "POST", url: "newAdventure", api: true, data: {term: ""}}).then($scope.parse_adventures);

            $http({method: "POST", url: "newTeam", api: true, data: {term: ""}}).then($scope.parse_teams);

            $http({method: "POST", url: "newUser", api: true, data: {term: ""}}).then($scope.parse_users).then(function () {
                $scope.loading = false;
            });
        }

        function prettyDate(startDate) {
            var date = new Date();
            var secs = Math.floor((date.getTime() - Date.parse(startDate)) / 1000);
            if (secs < 60)
                return secs + " sec(s) ago";
            if (secs < 3600)
                return Math.floor(secs / 60) + " min(s) ago";
            if (secs < 86400)
                return Math.floor(secs / 3600) + " hour(s) ago";
            if (secs < 604800)
                return Math.floor(secs / 86400) + " day(s) ago";
            return date.toDateString();
        }

        $scope.parse_adventures = function (data) {
            $scope.adventures = [];
            for (var i = 0; i < data.data.adventures.length; i++) {
                var result = {};
                result._id = data.data.adventures[i]._id;
                result.name = data.data.adventures[i].name;
                result.text1 = data.data.adventures[i].tags.join(" ");
                result.text2 = data.data.adventures[i].start + " - " + data.data.adventures[i].end;
                result.href = "/adventures/view/" + data.data.adventures[i]._id;
                result.createdAt = prettyDate(data.data.adventures[i].createdAt);
                $scope.adventures.push(result);
            }
        }

        $scope.parse_teams = function (data) {
            $scope.teams = [];
            for (var i = 0; i < data.data.teams.length; i++) {
                var result = {};
                result._id = data.data.teams[i]._id;
                result.name = data.data.teams[i].name;
                result.text1 = data.data.teams[i].teamMembers.length + " Members";
                result.href = "/teams/view/" + data.data.teams[i]._id;
                result.createdAt = prettyDate(data.data.teams[i].createdAt);
                $scope.teams.push(result);
            }
        }

        $scope.parse_users = function (data) {
            $scope.peoples = [];
            for (var i = 0; i < data.data.users.length; i++) {
                var result = {};
                result._id = data.data.users[i]._id;
                result.name = data.data.users[i].username;
                result.text1 = data.data.users[i].fullname;
                result.photo = data.data.users[i].photo;
                result.signin = prettyDate(data.data.users[i].signin);
                $scope.peoples.push(result);
            }
        }

        $scope.refresh();
    }]);

app.controller("userViewController", ["$scope", "$http", "$stateParams", "User", "$uibModal", "$location", function ($scope, $http, $stateParams, User, $uibModal, $location) {
        $scope.user = User.isLoggedIn();
        $scope.badgesData = [];
        $scope.isFavorite = false;

        angular.extend($scope, {
            position: {
                lat: 0,
                lng: 0,
                zoom: 4
            },
            markers: {
                mainMarker: {
                    lat: 0,
                    lng: 0,
                    focus: true,
                    draggable: false
                }
            },
            paths: {}
        });

        $scope.refresh = function () {
            $http({
                method: "POST",
                url: "getViewUser",
                api: true,
                data: {userid: $stateParams.id}
            }).then(function (data) {
                $scope.username = data.data.user.username;
                $scope.fullname = data.data.user.fullname;
                $scope.email = data.data.user.email;
                $scope.location = data.data.user.location;
                $scope.skype = data.data.user.skype;
                $scope.latitude = data.data.user.latitude;
                $scope.longitude = data.data.user.longitude;
                $scope.radius = data.data.user.radius;
                $scope.goals = data.data.user.goals;
                $scope.categories = data.data.user.categories;
                $scope.educations = data.data.user.educations;
                $scope.links = data.data.user.links;
                $scope.experience = data.data.user.experience;
                $scope.bio = data.data.user.bio;
                $scope.interests = data.data.user.interests;
                $scope.photo = data.data.user.photo;
                $scope.searchUserId = $stateParams.id;
                $scope.likes = data.data.user.likes;
                $scope.dislikes = data.data.user.dislikes;
                $scope.skills= data.data.user.skills;
                $scope.looks= data.data.user.looks;
                $scope.roles= data.data.user.roles;
                $scope.isManager = $scope.user._id == $stateParams.id;

                if ($scope.latitude && !isNaN($scope.latitude)) {
                    $scope.position.lat = parseFloat($scope.latitude);
                    $scope.markers.mainMarker.lat = parseFloat($scope.latitude);
                } else {
                    $scope.position.lat = 0 ;
                    $scope.markers.mainMarker.lat = 0;
                }

                if ($scope.longitude && !isNaN($scope.longitude)) {
                    $scope.position.lng = parseFloat($scope.longitude);
                    $scope.markers.mainMarker.lng = parseFloat($scope.longitude);
                } else {
                    $scope.position.lng = 0 ;
                    $scope.markers.mainMarker.lng = 0;
                }

                if ($scope.radius && !isNaN($scope.radius)) {
                    $scope.radius = parseFloat($scope.radius);
                } else {
                    $scope.radius = 0 ;
                }

                $scope.paths = {};
                if ($scope.radius != 0)
                    $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker};
                $http({
                    method: "POST",
                    url: "getBadgesByCreateAdv",
                    api: true,
                    data: {id: $stateParams.id}
                }).then(function (data) {
                    if (data && data.data.badges && data.data.badges) {
                        for (i = 0; i < data.data.badges.length; i++) {
                            var result = {};
                            result._id = data.data.badges[i]._id;
                            result.name = data.data.badges[i].name;
                            result.image = data.data.badges[i].image;
                            result.title = $scope.username + " created adventure '"+result.name+"'";
                            result.kind = "adventure";
                            result.badgeImg = "/assets/images/badge.png";
                            result.href = "/adventures/view/" + data.data.badges[i]._id;
                            $scope.badgesData.push(result);
                        }
                    }
                });

                $http({
                    method: "POST",
                    url: "getBadgesByCreateTeam",
                    api: true,
                    data: {id: $stateParams.id}
                }).then(function (data) {
                    if (data && data.data.badges && data.data.badges) {
                        for (i = 0; i < data.data.badges.length; i++) {
                            var result = {};
                            result._id = data.data.badges[i]._id;
                            result.name = data.data.badges[i].name;
                            result.image = data.data.badges[i].image;
                            result.title = $scope.username + " created team '"+result.name+"'";
                            result.kind = "team";
                            result.badgeImg = "/assets/images/badge.png";
                            result.href = "/teams/view/" + data.data.badges[i]._id;
                            $scope.badgesData.push(result);
                        }
                    }
                });

                $http({
                    method: "POST",
                    url: "RecommendationTeams",
                    api: true,
                    data: {id: $stateParams.id}
                }).then(function (data) {
                    console.log("RecommendationTeams = ",data.data.recommendates);
                    if (data && data.data.recommendates && data.data.recommendates) {
                        for (i = 0; i < data.data.recommendates.length; i++) {
                            processBadgesByRecommend(data.data.recommendates[i]);
                        }
                    }
                });
            });

            $http({
                method: "POST",
                url: "existFavoriteUser",
                api: true,
                data: {userId: $stateParams.id}
            }).then(function (data) {
                if (data && data.data.success == true) {
                    $scope.isFavorite = true;
                }
            });

            $scope.teams = [];
            $http({
                method: "POST",
                url: "userTeams",
                api: true,
                data: {userid: $stateParams.id}
            }).then(function (data) {
                $scope.teams = data.data.teams;
                $http({
                    method: "POST",
                    url: "adventure/listbyme",
                    api: true,
                    data: {teams: $scope.teams}
                }).then(function (r) {
                    $scope.adventures = r.data.adventures;
                });
            });

            $http({
                method: "POST",
                url: "getFavoritedUsers",
                api: true,
                data: {fuserid: $stateParams.id}
            }).then(function (r) {
                    $scope.favorites = r.data.favorites;
            });

        }

        function processBadgesByRecommend(recommendate) {
            var teamId = recommendate.teamId;
            var roleId = recommendate.roleId;
            var masterId = recommendate.masterId;
            var masterUserName = recommendate.masterUserName;
            var slaveId = recommendate.slaveId;
            var slaveUserName = recommendate.slaveUserName;
            var teamName = recommendate.teamName;
            var roleTitle = recommendate.roleTitle;
            $http({
                method: "POST",
                url: "getBadgesByRecommend",
                api: true,
                data: {teamId: teamId, roleId: roleId, masterId: masterId, slaveId: slaveId}
            }).then(function (data) {
                if (data && data.data && data.data.success == true) {
                    var result = {};
                    result.title = $scope.username + " recommendated "+slaveUserName+" for role '"+roleTitle+"' of user "+masterUserName+"'s team '"+teamName+"')";
                    result.kind = "recommend";
                    result.badgeImg = "/assets/images/bag.png";
                    result.href = "/teams/view/" + teamId;
                    $scope.badgesData.push(result);
                }
            });
        }

        $scope.favoriteMsg = "";
        $scope.addFavoriteUser = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to favorite this user?";
                    },
                    title: function () {
                        return "Favorite User";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    var userId = $stateParams.id;
                    $http({method: "POST", url: "addFavoriteUser", api: true, data: {userId: userId}}).then(function (data) {
                        $scope.favoriteMsg = data.data.msg;
                        $scope.favoriteModal();
                    });
                }
            });

            return false;
        }
        $scope.favoriteModal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yes.html',
                controller: "YesController",
                resolve: {
                    msg: function () {
                        return $scope.favoriteMsg;
                    },
                    title: function () {
                        return "Favorite User";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    $scope.isFavorite = true;
                }
            });
            return false;
        }

        $scope.removeFavoriteUser = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to remove from favorites?";
                    },
                    title: function () {
                        return "Remove From Favorites";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    var userId = $stateParams.id;
                    $http({method: "POST", url: "removeFavoriteUser", api: true, data: {userId: userId}}).then(function (data) {
                        $scope.isFavorite = false;
                    });
                }
            });
            return false;
        }

        $scope.refresh();
    }]);

app.controller("teamViewController", ["$rootScope", "$scope", "$http", "$sce", "$stateParams", "User", "$uibModal", "$location", "$compile", "$state", 'leafletData', "$timeout", function ($rootScope, $scope, $http, $sce, $stateParams, User, $uibModal, $location, $compile, $state, leafletData, $timeout) {
        $scope.user = User.isLoggedIn();
        $scope.description = "";
        $scope.owner = null;
        $scope.ownerId = "";
    $scope.isFavorite = false;

    $scope.emptyMembers = [];
    $scope.emptyRecMembers = [];
    $scope.slackAuthentication = false;

    angular.extend($scope, {
        position: {
            lat: 0,
            lng: 0,
            zoom: 4
        },
        markers: {
            mainMarker: {
                lat: 0,
                lng: 0,
                focus: true,
                draggable: false
            }
        },
        paths: {}
    });

        $scope.refresh = function () {
            console.log("refreshing.....");
            $http({
                method: "POST",
                url: "getUserById",
                api: true,
                data: {id: $scope.user._id}
            }).then(function success(data) {
                if (data.data.user.slackToken && data.data.user.slackToken != '' && data.data.user.slackUser && data.data.user.slackUser != '') {
                    $scope.slackAuthentication = true;
                }
                $http({
                    method: "POST",
                    url: "getTeam",
                    api: true,
                    data: {id: $stateParams.id}
                }).then(function (data) {
                    if (data.data.team.description && data.data.team.description != "") {
                        var find = "\n";
                        var re = new RegExp(find, 'g');
                        data.data.team.description = $sce.trustAsHtml(data.data.team.description.replace(re,"<br>"));
                        $scope.description = data.data.team.description;
                    }
                    if (data.data.team.mission && data.data.team.mission != "") {
                        var find = "\n";
                        var re = new RegExp(find, 'g');
                        data.data.team.mission = $sce.trustAsHtml(data.data.team.mission.replace(re,"<br>"));
                    }
                    if (data.data.team.tags && data.data.team.tags.length > 0) {
                        if (data.data.team.tags[0] == "") data.data.team.tags = [];
                    }
                    $scope.team = data.data.team;
                    $scope.adventures = data.data.advs;
                    $scope.isManager = data.data.team.owner._id == $scope.user._id;
                    $scope.ownerId = data.data.team.owner._id;

                    if (data.data.team.latitude && !isNaN(data.data.team.latitude)) {
                        $scope.position.lat = parseFloat(data.data.team.latitude);
                        $scope.markers.mainMarker.lat = parseFloat(data.data.team.latitude);
                    } else {
                        $scope.position.lat = 0;
                        $scope.markers.mainMarker.lat = 0;
                    }

                    if (data.data.team.longitude && !isNaN(data.data.team.longitude)) {
                        $scope.position.lng = parseFloat(data.data.team.longitude);
                        $scope.markers.mainMarker.lng = parseFloat(data.data.team.longitude);
                    } else {
                        $scope.position.lng = 0;
                        $scope.markers.mainMarker.lng = 0;
                    }

                    if (data.data.team.radius && !isNaN(data.data.team.radius)) {
                        $scope.radius = parseFloat(data.data.team.radius);
                    } else {
                        $scope.radius = 0;
                    }

                    $scope.paths = {};
                    if ($scope.radius != 0)
                        $scope.paths['circle'] = {type:'circle', color: '#008000', weight: 1, radius: $scope.radius*1000, latlngs:$scope.markers.mainMarker};
                    $scope.isMember = false;
                    for (var i = 0; i < data.data.team.teamMembers.length; i++) {
                        if (data.data.team.teamMembers[i].user.profileId == '000000000000000000000000') {
                            $scope.emptyMembers.push(data.data.team.teamMembers[i]);
                            $scope.emptyRecMembers.push(data.data.team.teamMembers[i]);
                        }
                        if (data.data.team.teamMembers[i].user._id == $scope.user._id)
                            $scope.isMember = true;
                    }

                    $http({
                        method: "POST",
                        url: "existFavoriteTeam",
                        api: true,
                        data: {teamId: $stateParams.id}
                    }).then(function (data) {
                            if (data && data.data.success == true) {
                                $scope.isFavorite = true;
                                $scope.favoriteTeamId = data.data.favorite._id;
                            }
                    });

                    $http({
                        method: "POST",
                        url: "team/bloglist",
                        api: true,
                        data: {team: $stateParams.id}
                    }).then(function (data) {
                            $scope.teamblogs = data.data.teamblogs;
                            console.log("teamblogs = ", teamblogs);
                    });
                });
            });
        }

        $scope.modal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to remove \"" + $scope.team.name + "\" team?"
                    },
                    title: function () {
                        return "Remove \"" + $scope.team.name + "\""
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    $http({method: "POST", url: "slack/closeChannel", api: true, data: {id: $scope.team._id}}).then(function (data) {
                        $http({method: "POST", url: "removeTeam", api: true, data: {id: $scope.team._id}}).then(function () {
                            $location.path("/teams");
                        });
                    });
                }
            });

            return false;
        }

        $scope.viewAdventure = function (adv) {
            location.href = "/adventures/view/" + adv._id;
        }

        $scope.showMember = function (member) {
            $scope.activeMember = member;
            if (member.user.profileId != "000000000000000000000000") return;
            if ($scope.isManager) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/assets/partials/modal/memberEdit.html',
                    controller: "MemberEditController",
                    resolve: {
                        user: function () {
                            return member;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    model = result.user;
                    if (model) {
                        model.roles = model.roles.split(/\s*,\s*/);
                        $scope.activeMember.title = model.title;
                        $scope.activeMember.description = model.description;
                        $scope.activeMember.roles = model.roles;
                        $scope.activeMember.status = model.status;
                        $scope.activeMember.skills = model.skills;
                        $scope.activeMember.whatisthere = model.whatisthere;

                        var request = $http({method: "POST", url: "updateTeamMember", api: true, data: model});
                    }
                    if (result.type == "SAVE") {
                        if (model) {
                            var request = $http({method: "POST", url: "updateTeamMember", api: true, data: model});
                        }
                    } else if (result.type == "REMOVE") {
                        if (model) {
                            var request = $http({method: "POST", url: "removeTeamMember", api: true, data: model});
                        }
                    }
                });
            } else {
                var modalInstance = $uibModal.open({
                    templateUrl: '/assets/partials/modal/memberView.html',
                    controller: "MemberViewController",
                    resolve: {
                        user: function () {
                            return member;
                        }
                    }
                });
            }
        }

        $scope.leave = function () {
            $http({method: "POST", url: "leaveTeam", api: true, data: {id: $scope.team._id}});
            $http({method: "POST", url: "slack/leaveChannel", api: true, data: {id: $scope.team._id}}).then(function (data) {
                console.log("calling leaveChannel....");
            });
            $location.path("/teams");
        }

        $scope.addMemberTitle = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/partials/modal/addMemberTitle.html",
                controller: "addMemberTitleController",
                resolve: {
                    values: function () {
                        return {titles: "", skills: "", description: "", whatisthere: "", team: $scope.team}
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (result.type == "CREATE") {
                    console.log('send request : create member title');
                    $http({method: "POST", url: "addMemberTitle", api: true, data: {team_id: result.team._id, titles: result.titles, skills: result.skills, description: result.description, whatisthere: result.whatisthere,defuser: $rootScope.defUser}}).then(function (data) {
                        location.reload();
                    });
                }
            });
        }

        $scope.sendRecommendation = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/partials/modal/sendRecommendation.html",
                controller: "sendRecommendationController",
                resolve: {
                    values: function () {
                        return {to: "", msg: "", title: "0", roles: "", team: $scope.team, emptyRecMembers: $scope.emptyRecMembers}
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (result.type == "SEND") {
                    var fb_ids = [];

                    for (var i = 0; i < result.recommendates.length; i++) {
                        if (result.recommendates[i].fb_id != -1)
                            fb_ids.push(result.recommendates[i].fb_id);
                    }
                    if (fb_ids.length) {
                        FB.ui({method: 'apprequests',
                            title: 'Recommendation to Galdraland Team',
                            message: 'You have been invited to "' + $scope.team.name + '" team ',
                            to: fb_ids,
                            new_style_message: true
                        }, function (response) {
                            if (response.error_code !== undefined && response.error_code == 4201) {
                                for (i = 0; i < fb_ids.length; i++) {
                                    for (var j = result.invites.length - 1; j >= 0; j--) {
                                        if (result.invites[j].fb_id == fb_ids[i]) {
                                            result.invites.splice(j, 1);
                                        }
                                    }
                                }
                            }
                        });
                    }
                    function send_recommendation() {
                        if (result.recommendates.length == 0)
                            return;
                        $http({
                            method: "POST",
                            url: "getUserById",
                            api: true,
                            data: {id: $scope.team.owner._id}
                        }).then(function success(data) {
                            $scope.owner = data.data.user;
                            console.log(result.recommendates);
                            $http({method: "POST", url: "sendRecommendation", api: true, data: {recommendation_user: $scope.user, master_user: $scope.owner, adventure: null, team: $scope.team, type: "teams", recommendates: result.recommendates}}).then(function (data) {
                                console.log(data.data.success);
                            });
                        });

//                        var msg = "User "+$scope.user.fullname+" has recommended User C for such role in your team T"
                    }
                    send_recommendation();
                }
            });
        }
        $scope.sendInvite = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/partials/modal/sendInvite.html",
                controller: "sendInviteController",
                resolve: {
                    values: function () {
                        return {to: "", msg: "", title: "0", roles: "", team: $scope.team, emptyMembers: $scope.emptyMembers}
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (result.type == "SEND") {
                    var fb_ids = [];

                    if (result.roles) {
                        result.roles = result.roles.split(/\s*,\s*/);
                    }

                    for (var i = 0; i < result.invites.length; i++) {
                        if (result.invites[i].fb_id != -1)
                            fb_ids.push(result.invites[i].fb_id);
                    }
                    if (fb_ids.length) {
                        FB.ui({method: 'apprequests',
                            title: 'Invite to Galdraland Team',
                            message: 'You have been invited to "' + $scope.team.name + '" team ',
                            to: fb_ids,
                            new_style_message: true
                        }, function (response) {
                            if (response.error_code !== undefined && response.error_code == 4201) {
                                for (i = 0; i < fb_ids.length; i++) {
                                    for (var j = result.invites.length - 1; j >= 0; j--) {
                                        if (result.invites[j].fb_id == fb_ids[i]) {
                                            result.invites.splice(j, 1);
                                        }
                                    }
                                }
                            }
                        });
                    }
                    function send_invite() {
                        if (result.invites.length == 0)
                            return;
                        $http({method: "POST", url: "sendInvite", api: true, data: {team: $scope.team._id, invites: result.invites, msg: result.msg, roles: result.roles}}).then(function (data) {

                        });
                    }
                    send_invite();
                }
            });
        }

        $scope.applyTeam = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/partials/modal/applyTeam.html",
                controller: "applyTeamController",
                resolve: {
                    values: function () {
                        return {to: "", msg: "", title: "0", emptyMembers: $scope.emptyMembers}
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (result.type == "SEND") {
                    if (result.roles) {
                        result.roles = result.roles.split(/\s*,\s*/);
                    }

                    $http({method: "POST", url: "sendApply", api: true, data: {team: $scope.team._id, msg: result.msg, title: result.title, memberList: $scope.emptyMembers}}).then(function (data) {
                        console.log(data);
                    });
                }
            })
        }
        $scope.$watch("team.fb_page", function(newValue, oldValue){
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'></div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script><div class='fb-page' data-tabs='timeline,events,messages' data-href='"+newValue+"' data-width='350' data-hide-cover='false'></div>";
                var $scope = $('#fbPage').html(htmlcontent).scope();
                $compile($('#fbPage'))($scope);
            }
        }, true);

        $scope.$watch("team._id", function(newValue, oldValue){
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));" +
//                    "<div class='fb-share-button' data-href='http://galdraland-1-0.herokuapp.com/teams/view/"+newValue+"' data-layout='button_count'></div>";
                    "function fbshare() {" +
                    "window.open('https://www.facebook.com/sharer/sharer.php?app_id=110469289012320&sdk=joey&u=https://galdraland-1-0.herokuapp.com/teams/view/"+newValue+"&display=popup&ref=plugin&src=share_button&description="+$scope.description+"&picture=https://galdraland-1-0.herokuapp.com"+$scope.team.image+"', '','width=200,height=100');" +
                    "}" +
                    "</script>" +
                    "<img onclick='fbshare();' style='cursor:pointer;' src='/assets/images/fbshare.png'/>";

                var $scope1 = $('#fbshare').html(htmlcontent).scope();
                $compile($('#fbshare'))($scope1);

                htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.4'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
//                    "<div class='fb-comments' data-href='http://galdraland-1-0.herokuapp.com/blog/#team" + newValue +"' data-numposts='5' data-colorscheme='light' data-width='350'></div>";
                    "<div class='fb-comments' data-href='http://webascender.com/blog/#team" + newValue +"' data-numposts='5' data-colorscheme='light' data-width='350'></div>";
                $scope1 = $('#fbComment').html(htmlcontent).scope();
                $compile($('#fbComment'))($scope1);
            }
        }, true);

        $scope.removeblog = function (blogid, title) {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to remove this blog?";
                    },
                    title: function () {
                        return "Remove Blog";
                    }
                }
            });

            modalInstance.result.then(function (result) {
                console.log(blogid);
                console.log(result);
                if (result == "YES") {
                    console.log(result);
                    $http({method: "POST", url: "team/deleteblog", api: true, data: {id: blogid}}).then(function (data) {
                        console.log($scope.team._id);
                        $scope.refresh();
//                        $location.path("/teams/view/" + $scope.team._id);
                    });
                }
            });

            return false;
        }

        $scope.slackAuth = function () {
            $http({method: "POST", url: "slack/requestAuth", api: true}).then(function (data) {
                console.log("calling requestAuth....");
            });
        }

        $scope.favoriteMsg = "";
        $scope.addFavoriteTeam = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to favorite this team?";
                    },
                    title: function () {
                        return "Favorite Team";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    var teamId = $stateParams.id;
                    $http({method: "POST", url: "addFavoriteTeam", api: true, data: {teamId: teamId, ownerId: $scope.ownerId}}).then(function (data) {
                        $scope.favoriteMsg = data.data.msg;
                        $scope.favoriteModal();
                    });
                }
            });

            return false;
        }
        $scope.favoriteModal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yes.html',
                controller: "YesController",
                resolve: {
                    msg: function () {
                        return $scope.favoriteMsg;
                    },
                    title: function () {
                        return "Favorite Team";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    $scope.isFavorite = true;
                }
            });
            return false;
        }

        $scope.removeFavoriteTeam = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yesandno.html',
                controller: "YesAndNoController",
                resolve: {
                    msg: function () {
                        return "Do you want to remove from favorites?";
                    },
                    title: function () {
                        return "Remove From Favorites";
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == "YES") {
                    var teamId = $stateParams.id;
                    $http({method: "POST", url: "removeFavoriteTeam", api: true, data: {teamId: teamId}}).then(function (data) {
                        $scope.isFavorite = false;
                    });
                }
            });
            return false;
        }

        $scope.alertSlackAuth = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/partials/modal/yes.html',
                controller: "YesController",
                resolve: {
                    msg: function () {
                        return "You must first register with slack to be able to use slack";
                    },
                    title: function () {
                        return "Authorize SLACK";
                    }
                }
            });
            return false;
        }

        $scope.refresh();
    }]);

app.controller("blogController", ["$scope", "$http", "User", "$location", function ($scope, $http, User, $location) {
    $scope.user = User.isLoggedIn();
    $scope.results = [];
    console.log("calling blog");
    $scope.refresh = function () {
        $scope.loading = true;
        $http({method: "POST", url: "/api/blogs", api: true}).then(function (data) {
            console.log(data);
        });
    }
    $scope.refresh();
}]);

app.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts, colorscheme) {
        return '<div class="fb-comment-comment" ' +
            'data-href="' + href + '" ' +
            'data-numposts="' + numposts + '" ' +
            'data-colorsheme="' + colorscheme + '">' +
            '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href        = newValue;
                var numposts    = attrs.numposts    || 5;
                var colorscheme = attrs.colorscheme || 'light';

                elem.html(createHTML(href, numposts, colorscheme));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});

app.directive('commentWidget', function ($http, User) {
    var comment_dir = {
        restrict: 'AE',
        replace: true,
        scope: {
            ref: '=ref',
            ismanager: '=ismanager'
        },
        template: '<div class="row">' +
//            '<div class="user-container"><h4>Comments</h4><hr></div>' +
            '<div id="dv1">' +
            '<div ng-repeat="comnt in comments">' +
                '<table width="100%"><tr>' +
                    '<td width="50px;"><img src="{{ comnt.from.photo }}" style="width:50px;height:50px;"></td>' +
                        '<td style="text-align: left;"><p style="margin-left:10px; word-wrap: break-word; word-break: break-word;">{{comnt.from.fullname}}</p><p style="margin-left:10px; word-wrap: break-word; word-break: break-word;"> {{ comnt.createdAt | date : ' + '"yyyy-MM-dd HH:mm:ss"' + ' }}</p><p style="margin-left:10px; word-wrap: break-word; word-break: break-word;">{{ comnt.comment }}</p> <p ng-show="ismanager" style="margin-left:10px; word-wrap: break-word; word-break: break-word;">({{ comnt.status }})</p></td>' +
                        '<td ng-show="ismanager" width="50px;">' +
                            '<a class="btn btn-primary" style="float: left;" ng-click="cmt_approve(comnt._id)">Approve</a>' +
                            '<a class="btn btn-danger" style="float: left;" ng-click="cmt_reject(comnt._id)">Reject</a>' +
                        '</td>' +
                    '</tr>' +
                '</table>' +
            '</div>' +
            '</div>' +
//            '<div id="fb-root"></div>' +
//            '<div class="fb-comment-embed" data-href="https://www.facebook.com/zuck/posts/10102735452532991?comment_id=1070233703036185" data-width="500"></div>' +
            '<div class="user-container"><h4>Post your comment</h4><hr></div><div class="row" style="width:100%"><textarea ng-model="txtcomment" placeholder="Your Comment" style="width:100%;display:block;"></textarea><button ng-click="save();" style="margin-top:10px;float:right;">Post Comment</button></div></div>',
        link: function (scope, elem, attrs) {
            scope.comment = [];
            scope.user = User.isLoggedIn();
            scope.request_in_process = false;

            scope.refresh = function () {
                console.log("id = " + scope.ref);
                console.log("isManager = " + scope.ismanager);
                console.log("owner = " + scope.user._id);
                $http({method: "POST", url: "getCommentByRefId", api: true, data: {id: scope.ref, fromMe: false, isManager : scope.ismanager, owner: scope.user._id}}).then(function (data) {
                    if (!data.data.success || data.data.comments.length == 0) {
                        scope.comments = [];
                    } else {
                        scope.comments = data.data.comments;
                        console.log(scope.comments);
                    }
                });
            }

            scope.save = function () {
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;

                $http({method: "POST", url: "insertComment", api: true, data: {ref_id: scope.ref, comment: scope.txtcomment}}).then(function (result) {
                    scope.request_in_process = false;
                    scope.refresh();
                });
            }

            scope.$watch('ref', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== null) {
                    console.log("getting newRef = " + newValue);
                    console.log("getting oldRef = " + oldValue);
                    scope.ref = newValue;
                    scope.refresh();
                }
            });

            scope.$watch('ismanager', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== null) {
                    console.log("getting newismanager = " + newValue);
                    console.log("getting oldismanager = " + oldValue);
                    scope.ismanager = newValue;
                    scope.refresh();
                }
            });

            if (scope.ref !== undefined && scope.ref !== null && scope.ismanager !== undefined && scope.ismanager !== null)
                scope.refresh();

            scope.cmt_reject = function (cmtId) {
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;

                $http({method: "POST", url: "updateStatus", api: true, data: {id: cmtId, status: "REJECT"}}).then(function (result) {
                    scope.request_in_process = false;
                    scope.refresh();
                });
            }

            scope.cmt_approve = function (cmtId) {
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;

                $http({method: "POST", url: "updateStatus", api: true, data: {id: cmtId, status: "APPROVE"}}).then(function (result) {
                    scope.request_in_process = false;
                    scope.refresh();
                });
            }

        }
    };

    return comment_dir;
});
app.directive('ratingWidget', function ($http, User) {
    var rating_dir = {
        restrict: 'AE',
        replace: true,
        scope: {
            ref: '=ref',
            isstatic: '=isstatic'
        },
        template: '<input id="rating-elem" type="number" class="rating" min=0 max=5 step=0.5 data-size="xs">',
        link: function (scope, elem, attrs) {
            scope.user = User.isLoggedIn();
            scope.hoverin = false;
            scope.request_in_process = false;

            scope.refresh = function () {
                $('#rating-elem').attr('id', 'rating-elem' + scope.ref);
                $http({method: "POST", url: "getRatingByRefId", api: true, data: {id: scope.ref, fromMe: false}}).then(function (data) {
                    scope.myrating = null;
                    if (!data.data.success || data.data.ratings.length == 0) {
                        scope.count = 0;
                        scope.average = 0;
                    } else {
                        var sum = 0;
                        for (var i = 0; i < data.data.ratings.length; i++) {
                            sum += data.data.ratings[i].rating;
                            if (data.data.ratings[i].from == scope.user._id)
                                scope.myrating = data.data.ratings[i];
                        }

                        scope.count = data.data.ratings.length;
                        scope.average = sum / scope.count;
                    }

                    $("#rating-elem" + scope.ref).rating();
                    if (scope.isstatic) {
                        $("#rating-elem" + scope.ref).rating('refresh', {"stars": 5, "size": 'xs', "showClear": false, "readonly": true, starCaptions: function (val) {
                                return scope.count + ' ratings, ' + scope.average + ' stars';
                            }});
                    } else {
                        $("#rating-elem" + scope.ref).rating('refresh', {"stars": 5, "size": 'xs', "showClear": false, starCaptions: function (val) {
                                return scope.count + ' ratings, ' + scope.average + ' stars';
                            }});
                    }
                    $("#rating-elem" + scope.ref).rating('update', scope.average);
                });
            }

            $('#rating-elem').on('rating.hover', function (event, value, caption, target) {
                if (scope.isstatic)
                    return;
                if (!scope.hoverin) {
                    $("#rating-elem" + scope.ref).rating('refresh', {"stars": 5, "size": 'xs', "showClear": false, starCaptions: function (val) {
                            return val + ' stars';
                        }});
                    scope.hoverin = true;
                }
            });

            $('#rating-elem').on('rating.hoverleave', function (event, target) {
                if (scope.isstatic)
                    return;
                $("#rating-elem" + scope.ref).rating('refresh', {"stars": 5, "size": 'xs', "showClear": false, starCaptions: function (val) {
                        return scope.count + ' ratings, ' + scope.average + ' stars';
                    }});
                $("#rating-elem" + scope.ref).rating('update', scope.average);
                scope.hoverin = false;
            });

            $('#rating-elem').on('rating.change', function (event, value, caption) {
                if (scope.isstatic)
                    return;
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;
                if (scope.myrating == null) {
                    $http({method: "POST", url: "insertRating", api: true, data: {ref_id: scope.ref, rating: value}}).then(function (result) {
                        scope.request_in_process = false;
                        scope.refresh();
                    });
                } else {
                    $http({method: "POST", url: "updateRating", api: true, data: {id: scope.myrating._id, rating: value}}).then(function (result) {
                        scope.request_in_process = false;
                        scope.refresh();
                    });
                }
            });

            scope.$watch('ref', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== null) {
                    scope.ref = newValue;
                    scope.refresh();
                }
            });

            if (scope.ref !== undefined && scope.ref !== null)
                scope.refresh();
        }
    };

    return rating_dir;
});
app.directive("uiToggle", function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.click(function (e) {
                e.preventDefault();
                return false;
            });
        }
    };
});

app.factory('middleware', function () {
    return {
        request: function (config) {
            if (config.api) {
                config.url = "/api/" + config.url;
            }

            return config;
        }
    };
});

/*
app.factory("User", ["$http", "$cookieStore", "$q", function ($http, $cookieStore, $q) {
        var user = $cookieStore.get("user");
        return {
            isLoggedIn: function () {
                return $cookieStore.get("user");
            },
            logout: function () {
                user = null;
                $cookieStore.remove("user");
            },
            update: function (cb) {
                $http.get("/api/getUser").then(function (data) {
                    console.log(data);
                    $cookieStore.remove("user");
                    $cookieStore.put("user", data.data.user);
                });
                if (cb)
                    cb();
            }
        }
    }]);
*/
app.factory("User", ["$http", "$cookies", "$q", function ($http, $cookies, $q) {
    var user = $cookies.get("user");
    return {
        isLoggedIn: function () {
            if (typeof $cookies.get("user") === "undefined")
                return false;
            return JSON.parse(decodeURIComponent($cookies.get("user", { 'path': '/', 'domain': 'galdraland-1-0.herokuapp.com' })));
        },
        logout: function () {
            user = null;
            $cookies.remove("user", { 'path': '/', 'domain': 'galdraland-1-0.herokuapp.com' });
        },
        update: function (cb) {
            $http.get("/api/getUser").then(function (data) {
                var t = encodeURIComponent(JSON.stringify(data.data.user));
                $cookies.remove("user", { 'path': '/', 'domain': 'galdraland-1-0.herokuapp.com' });
                $cookies.put("user", t, { 'path': '/', 'domain': 'galdraland-1-0.herokuapp.com' });
            });
            if (cb)
                cb();
        }
    }
}]);

