var app = angular.module("galdra", ["ngRoute", "ui.router", "ngCookies", "ui.bootstrap", "ngFileUpload"]);
var config = {
    //siteurl : 'http://galdraland.com:9010/'
    siteurl: 'http://galdraland-1-0.herokuapp.com/'
}

app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "$httpProvider", function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
        $stateProvider.state("index", {
            url: "/",
            views: {
                "main": {
                    templateUrl: "/assets/partials/login.html"
                }
            },
        }).state("about", {
            url: "/about",
            views: {
                "main": {
                    templateUrl: "/assets/partials/about.html"
                }
            },
        }).state("blog", {
            url: "/blog",
            views: {
                "main": {
                    templateUrl: "/assets/partials/blog.html"
                }
            },
        }).state("how_it_works", {
            url: "/how_it_works",
            views: {
                "main": {
                    templateUrl: "/assets/partials/how_it_works.html"
                }
            },
        }).state("contact_us", {
            url: "/contact_us",
            views: {
                "main": {
                    templateUrl: "/assets/partials/contact_us.html"
                }
            },
        }).state("redirect", {
            url: "/redirect/:returnTo",
            views: {
                "main": {
                    templateUrl: "/assets/partials/login.html"
                }
            },
        }).state("indexFacebook", {
            url: "/_=_",
            views: {
                "main": {
                    templateUrl: "/assets/partials/login.html"
                }
            },
        }).state("shareadventure", {
            url: "/shareadventure/:id",
            views: {
                "main": {
                    templateUrl: "/assets/partials/shareadventure.html"
                }
            },
        }).state("shareteam", {
            url: "/shareteam/:id",
            views: {
                "main": {
                    templateUrl: "/assets/partials/shareteam.html"
                }
            },
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
                    "users-result@users": {templateUrl: "/assets/partials/users/users-result.html"},
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
                "right-side@teamView": {templateUrl: "/assets/partials/team/view.html"},
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
                "right-side@adventureView": {templateUrl: "/assets/partials/adventure/view.html"},
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
        })

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $httpProvider.interceptors.push('middleware');
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
        $rootScope.return2Adventure = "normal";
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log(toState.url);
            if(toState.url === "/about" || toState.url === "/how_it_works" || toState.url === "/contact_us" || toState.url === "/blog"
                || toState.url === "/shareadventure/:id" || toState.url === "/shareteam/:id" ) {
                $location.url(toState.url);
            } else if (toState.requireLogin && !User.isLoggedIn()) {
                var url = "/redirect/?r=" + $location.path();
                $location.url(url);
            } else if (!toState.requireLogin && User.isLoggedIn()) {
                $location.path("/profile");
            } else if (User.isLoggedIn() && !User.isLoggedIn().email.validated) {
                $location.path("/emailVerification");
            }
        });

        var request = $http({method: "GET", url: "getDefaultUser", api: true});
        request.success(function (data) {
            if (data.user) {
                $rootScope.defUser = data.user;
            } else {
                request = $http({method: "POST", url: "createDefaultUser", api: true});
                request.success(function (data) {
                    console.log(data);
                });
            }
        });
    }]);
app.controller("adventureViewController", ["$scope", "$http", "$stateParams", "$sce", "User", "$modal", "$location", "$compile", function ($scope, $http, $stateParams, $sce, User, $modal, $location, $compile) {
        $scope.user = User.isLoggedIn();

        $scope.refresh = function () {
            var request = $http({method: "POST", url: "adventure/get", api: true, data: {id: $stateParams.id}});
            request.success(function (data) {
                if (data.adventure.description && data.adventure.description != "") {
                    var find = "\n";
                    var re = new RegExp(find, 'g');
                    data.adventure.description = $sce.trustAsHtml(data.adventure.description.replace(re,"<br>"));
                }
                $scope.adventure = data.adventure;
                $scope.isManager = data.adventure.owner == $scope.user._id;
            });
        }

        $scope.modal = function () {
            var modalInstance = $modal.open({
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
                    var request = $http({method: "POST", url: "adventure/remove", api: true, data: {id: $scope.adventure._id}});
                    request.success(function () {
                        $location.path("/adventures");
                    });
                }
            });

            return false;
        }

        $scope.$watch("adventure.fb_page", function(newValue, oldValue){
            console.log("newValue = " + newValue);
            console.log("oldValue = " + oldValue);
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'></div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script><div class='fb-page' data-tabs='timeline,events,messages' data-href='"+newValue+"' data-width='400' data-hide-cover='false'></div>";
                var $scope = $('#fbPage').html(htmlcontent).scope();
                $compile($('#fbPage'))($scope);
            }
        }, true);

        $scope.$watch("adventure._id", function(newValue, oldValue){
            console.log("id_newValue = " + newValue);
            console.log("id_oldValue = " + oldValue);
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<div class='fb-share-button' data-href='http://galdraland-1-0.herokuapp.com/adventures/view/"+newValue+"' data-layout='button_count'></div>";
                var $scope = $('#fbshare').html(htmlcontent).scope();
                $compile($('#fbshare'))($scope);

                htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<div class='fb-comments' data-href='http://galdraland-1-0.herokuapp.com/adventures/view/" + newValue +"' data-numposts='5' data-colorscheme='light' data-width='350'></div>";
                $scope = $('#fbComment').html(htmlcontent).scope();
                $compile($('#fbComment'))($scope);

                htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<div class='fb-comments' data-href='http://webascender.com/blog/#" + newValue +"' data-numposts='5' data-colorscheme='light' data-width='350'></div>";
                $scope = $('#fbComment2').html(htmlcontent).scope();
                $compile($('#fbComment2'))($scope);

                htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<fb:comments reverse='false' publish_feed='false' showform='true' " +
                    "simple='false' migrated='1' canpost='true' url='http://webascender.com/blog' " +
                    "width='350px' numposts='10' xid='"+newValue+"'>" +
                    "</fb:comments>"
                $scope = $('#fbComment3').html(htmlcontent).scope();
                $compile($('#fbComment3'))($scope);

            }
        }, true);


        $scope.shareAdventure = function () {
            console.log("advId = " + $stateParams.id);
    //            FB.login(function(response) {
    //                if (response.authResponse) {
    //
    //                } else {
    //                    console.log("share team Error!");
    //                }
    //            });
            FB.ui({
                method: 'share',
    //                    action_type: 'og.comments',
    //                    action_properties: JSON.stringify({
    //                        object : {
    //                            'og:url': 'http://galdraland-1-0.herokuapp.com/teams/view/' + $stateParams.id, // your url to share
    //                            'og:title': 'Share Team Page',
    //    //                        'og:type': 'website',
    //                            'og:description': "You can share your team page",
    //                            'og:image': 'http://www.hyperarts.com/external-xfbml/share-image.gif'
    //                        }
                href : 'http://galdraland-1-0.herokuapp.com/adventures/view/' + $stateParams.id
            }, function(response){
                console.log("response = ", response);
            });
        }

    $scope.refresh();
    }]);
app.controller("usersResultController", ["$scope", "$http", "User", "$location", function ($scope, $http, User, $location) {
    $scope.user = User.isLoggedIn();
    $scope.results = [];
    $scope.refresh = function () {
        $scope.loading = true;
        var request = $http({method: "GET", url: "myTeams", api: true});
        request.success(function (data) {
            $scope.teams = data.teams;
        }).then(function (r) {
                if ($scope.teams.length) {
                    var userIds = [];
                    for (var i = 0; i < $scope.teams.length; i++) {
                        for (var j = 0; j < $scope.teams[i].teamMembers.length; j ++) {
                            var o = $scope.teams[i].teamMembers[j];
                            if(userIds.indexOf(o.user) != -1) {
                                continue;
                            } else {
                                userIds.push(o.user);
                            }
                        }
                    }
                    if (userIds.length) {
                        var request = $http({method: "POST", url: "getUsersByIds", api: true, data: {ids: userIds}});
                        request.success(function (data) {
                            $scope.users = data.users
                        }).then(function (r) {
                           if ($scope.users.length) {
                                for (var i = 0; i < $scope.users.length; i++) {
                                    if ($scope.users[i].profileId == "000000000000000000000000") continue;
                                    if ($scope.user._id == $scope.users[i]._id) continue;
                                    var result = {};
                                    result.name = $scope.users[i].fullname;
                                    result.href = "/users/view/" + $scope.users[i]._id;
                                    result.photo = $scope.users[i].photo;
                                    result.team_role = [];
                                    for (var j = 0; j < $scope.teams.length; j++) {
                                        for (var k = 0; k < $scope.teams[j].teamMembers.length; k++) {
                                            var o = $scope.teams[j].teamMembers[k];
                                            if (o.user == $scope.users[i]._id) {
//                                                result.team_role += $scope.teams[j].name + '(' + $scope.teams[j].teamMembers[k].title + ') ';
                                                result.team_role.push($scope.teams[j].name + '(' + $scope.teams[j].teamMembers[k].title + ') ');
                                            }
                                        }
                                    }

                                    $scope.results.push(result);
                                }
                                $scope.loading = false;
                            } else {
                                $scope.loading = false;
                            }
                        });
                    }
                } else {
                    $scope.loading = false;
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

        $scope.refresh = function () {
            var request = $http({method: "GET", url: "myOwnTeams", api: true});
            request.success(function (data) {
                $scope.values.teamCount = data.teams.length;
                if ($scope.values.teamCount == 0)
                    $rootScope.return2Adventure = "return";
                else
                    $rootScope.return2Adventure = "normal";
            });
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

        $scope.createAdventure = function () {
            var post = $scope.fb_post;

            var request = $http({
                method: "POST",
                url: "adventure/create",
                api: true,
                data: {name: $scope.name, type: $scope.type, fb_page: $scope.fb_page, description: $scope.description, link: $scope.link, image: $scope.uploadedImage, team: $scope.team, start: $scope.formatDate($scope.start), end: $scope.formatDate($scope.end), tags: ($scope.tags) ? $scope.tags.split(' ') : []}
            });
            request.success(function (data) {
                $location.path("/adventures/view/" + data.id);
                if (post)
                    $scope.post_to_fb(data.id);
            });
        }

        $scope.post_to_fb = function (id) {
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
            var request = $http({method: "POST", url: "adventure/getTeams", api: true, data: {name: name}});
            request.then(function (r) {
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
        $scope.getAdventure = function () {
            var request = $http({method: "POST", url: "adventure/get", api: true, data: {id: $stateParams.id}});
            request.success(function (data) {
                $scope.name = data.adventure.name;
                $scope.description = data.adventure.description;
                $scope.link = data.adventure.link;
                $scope.tags = data.adventure.tags.join(" ");
                $scope.start = new Date(Date.parse(data.adventure.start));
                $scope.end = new Date(Date.parse(data.adventure.end));
                $scope.status = data.adventure.status;
                $scope.team = data.adventure.team;
                $scope.type = data.adventure.type;
                $scope.uploadedImage = data.adventure.image;
                $scope.fb_page = data.adventure.fb_page;
            });
        }

        $scope.getTeamCount = function () {
            var request = $http({method: "GET", url: "myOwnTeams", api: true});
            request.success(function (data) {
                $scope.values.teamCount = data.teams;
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
            var request = $http({method: "POST", url: "adventure/update", api: true, data: {id: $stateParams.id, name: $scope.name, fb_page: $scope.fb_page, description: $scope.description, link: $scope.link, image: $scope.uploadedImage, tags: $scope.tags.split(" "), start: $scope.formatDate($scope.start), end: $scope.formatDate($scope.end), status: $scope.status, type: $scope.type}});
            request.success(function (data) {
                $location.path("/adventures/view/" + $stateParams.id);
            });
        }

        $scope.findTeam = function (name) {
            var request = $http({method: "POST", url: "adventure/getTeams", api: true, data: {name: name}});
            request.then(function (r) {
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
            $scope.team = team;
            return false;
        }

        $scope.removeTeam = function () {
            $scope.team = null;
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

app.controller("myAdventuresController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.user = User.isLoggedIn();

        $scope.refresh = function () {
            $scope.loading = true;
            var request = $http({method: "GET", url: "myTeams", api: true});
            request.success(function (data) {
                $scope.teams = data.teams;
            }).then(function (r) {
                if ($scope.teams.length) {
                    return $http({method: "POST", url: "adventure/list", api: true, data: {teams: $scope.teams}});
                } else {
                    $scope.loading = false;
                }
            }).then(function (r) {
                $scope.adventures = r.data.adventures;
                $scope.loading = false;
            });
        }
        $scope.shareAdventrue = function () {
//            FB.ui({
//                method: 'feed',
//                name: 'This is the content of the "name" field.',
//                link: 'http://www.hyperarts.com/',
//                picture: 'http://www.hyperarts.com/external-xfbml/share-image.gif',
//                caption: 'This is the content of the "caption" field.',
//                description: 'This is the content of the "description" field, below the caption.',
//                message: ''
//            });
        }
        $scope.refresh();
    }]);

app.controller("myAdventuresTagController", ["$scope", "$http", "$location", "$stateParams", "User", function ($scope, $http, $location, $stateParams, User) {
    $scope.user = User.isLoggedIn();
    $scope.refresh = function () {
        $scope.loading = true;
        var request = $http({method: "POST", url: "adventureTag/list", api: true, data: {tag: $stateParams.tag}});
        request.success(function (data) {
            $scope.teams = data.teams;
        }).then(function (r) {
                $scope.adventures = r.data.adventures;
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

            var request = $http.post("/api/validateEmail", {email: $scope.email});
            request.success(function (data) {
                if (!data.find) {
                    $scope.availableEmail = true;
                } else {
                    $scope.availableEmail = false;
                }
            });
        }

        $scope.saveInformation = function () {
            $scope.error = null;
            $scope.errors = {};

            var request = $http({method: "POST", url: "saveMainInfo", api: true, data: {username: $scope.username, email: $scope.email}});
            request.then(function (r) {
                if (r.data.success) {
                    User.update(function () {
                        $location.path("/profile");
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

            var request = $http.post("/api/validateUsername", {username: $scope.username});
            request.success(function (data) {
                if (!data.find) {
                    $scope.availableUsername = true;
                } else {
                    $scope.availableUsername = false;
                }
            });
        }

        $scope.saveEmail = function () {
            var request = $http.post("/api/saveEmail", {email: $scope.email});
            request.success(function (data) {
                User.update();
                $location.path("/profile");
            });
        }

        $scope.validateEmail();
        $scope.validateUsername();
    }]);
app.controller("headerController", ["$scope", "$http", "$location", "User", "$modal", "$stateParams", function ($scope, $http, $location, User, $modal, $stateParams) {
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


        /*
         if(localStorage.getItem("galdraland.redirect") != null && localStorage.getItem("galdraland.redirect") != ""){
         location.href = localStorage.getItem("galdraland.redirect");
         localStorage.setItem("galdraland.redirect", "");
         return;
         }*/
        var invite_request = $http({method: "GET", url: "getInvites", api: true});

        invite_request.then(function (result) {
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

            refresh_feeds();
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
        }

        $scope.logout = function () {
            var request = $http.get({url: "logout", api: true});
            request.success(function (data) {
                User.logout();
                $location.path("/");
            }); 
       }

        $scope.search = function () {
            $location.path("/search/" + $scope.scategory + "/" + $scope.stext + "/ / / ");
        }

        $scope.showInvite = function (invite) {
            var modalInstance = $modal.open({
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
                refresh_feeds();

                if (index > -1) {
                    if (result.action == "ACCEPT") {
                        $http({method: "POST", url: "acceptInvite", api: true, data: {id: invite._id}});
                    } else if (result.action == "DECLINE") {
                        $http({method: "POST", url: "declineInvite", api: true, data: {id: invite._id}});
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
            });
        }


        $scope.showApply = function (apply) {
            var modalInstance = $modal.open({
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
                refresh_feeds();

                if (index > -1) {
                    if (result.action == "APPROVE") {
                        $http({method: "POST", url: "approveApply", api: true, data: {id: apply._id}});
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
            });
        }
    }]);

app.controller("indexController", ["$scope", "$location", "$window", "$stateParams", "$http", function ($scope, $location, $window, $stateParams, $http) {
        $scope.r = "";
        $scope.adventures = [];
        $scope.teams = [];
        $scope.loading = true;
        var search = $location.search();

        $scope.refresh = function () {
            $scope.loading = true;

            var request = $http({method: "POST", url: "lastAdventure", api: true, data: {term: ""}});
            request.success($scope.parse_adventures);

            request = $http({method: "POST", url: "lastTeam", api: true, data: {term: ""}});
            request.success($scope.parse_teams);

            request.then(function () {
                $scope.loading = false;
            });
        }

        $scope.compare = function (a, b) {
            if (a._id < b._id)
                return -1;
            if (a._id > b._id)
                return 1;
            return 0;
        }

        $scope.parse_adventures = function (data) {
            $scope.adventures = [];

            data.adventures.sort($scope.compare);
            data.adventures.reverse();
            if (data.adventures.length > 4) {
                data.adventures.length = 4;
            }

            for (var i = 0; i < data.adventures.length; i++) {
                var result = {};
                result._id = data.adventures[i]._id;
                result.name = data.adventures[i].name;
                result.image = data.adventures[i].image;
                result.text1 = data.adventures[i].tags.join(" ");
                result.text2 = data.adventures[i].start + " - " + data.adventures[i].end;
                $scope.adventures.push(result);
            }
        }

        $scope.parse_teams = function (data) {
            $scope.teams = [];

            data.teams.sort($scope.compare);
            data.teams.reverse();
            if (data.teams.length > 4) {
                data.teams.length = 4;
            }

            for (var i = 0; i < data.teams.length; i++) {
                var result = {};
                result._id = data.teams[i]._id;
                result.name = data.teams[i].name;
                $scope.teams.push(result);
            }
        }

        $scope.refresh();

        if (search !== null)
            $scope.r = search.r;
    }]);

app.controller("leftMenuController", ["$scope", "$location", function ($scope, $location) {
        $scope.go = function (url) {
            $location.path(url);
        }
    }]);
app.controller("MemberEditController", ["$scope", "user", "$modalInstance", function ($scope, user, $modalInstance) {
        $scope.user = angular.copy(user);

        if ($scope.user.roles && $scope.user.roles.join) {
            $scope.user.roles = $scope.user.roles.join(", ");
        }

        $scope.cancel = function () {
            $scope.user = $scope.backup;
            $modalInstance.close();
        }

        $scope.save = function () {
            $modalInstance.close({type: "SAVE", user: $scope.user});
        }

        $scope.remove = function () {
            $modalInstance.close({type: "REMOVE", user: $scope.user});
        }
    }]);

app.controller("MemberViewController", ["$scope", "user", "$modalInstance", function ($scope, user, $modalInstance) {
    $scope.user = angular.copy(user);

    $scope.cancel = function () {
        $modalInstance.close();
    }

}]);

app.controller("YesAndNoController", ["$scope", "msg", "title", "$modalInstance", function ($scope, msg, title, $modalInstance) {
        $scope.msg = msg;
        $scope.title = title;

        $scope.yes = function () {
            $modalInstance.close("YES");
        }

        $scope.no = function () {
            $modalInstance.close("NO");
        }
    }]);

app.controller("applyTeamController", ["$scope", "$modalInstance", "values", "$http", function ($scope, $modalInstance, values, $http) {
        $scope.values = angular.copy(values);

        $scope.cancel = function () {
            $modalInstance.close({type: "CLOSE"});
        }

        $scope.send = function () {
            $modalInstance.close({type: "SEND", msg: $scope.values.msg, title: $scope.values.title, roles: $scope.values.roles});
        }
    }]);

app.controller("addMemberTitleController", ["$scope", "$modalInstance", "values", "$http", function ($scope, $modalInstance, values, $http) {
        $scope.values = angular.copy(values);

        $scope.cancel = function () {
            console.log('close member title action');
            $modalInstance.close({type: "CLOSE"});
        }

        $scope.create = function () {
            console.log('create member title action');
            console.log('skills = ', $scope.values.skills);
            console.log('whatisthere = ', $scope.values.whatisthere);
            $modalInstance.close({type: "CREATE", titles: $scope.values.titles, skills: $scope.values.skills, description: $scope.values.description, whatisthere: $scope.values.whatisthere, team: $scope.values.team});
        }
    }]);

app.controller("sendInviteController", ["$scope", "$modalInstance", "values", "$http", "User", function ($scope, $modalInstance, values, $http, User) {
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
        // FB.getLoginStatus(function(response) {
        //   if (response.status == 'connected') {
        //     FB.api('/me/friends', function(response) {
        //         if (response && !response.error) {
        //             $scope.values.fb_friends = response.data;
        //             alert("Logged in already.");
        //             console.log(response.data);
        //         }
        //     });
        //   } else if (response.status == 'not_authorized') {
            
        //   } 
        // });
        // FB.login(function () {
        //     FB.api(
        //             "/me/friends",
        //             function (response) {
        //                 console.log("Facebook friends response");
        //                 if (response && !response.error) {
        //                     $scope.values.fb_friends = response.data;
        //                     console.log(response.data);
        //                 }
        //             }
        //         );
        //     }, {scope: 'user_friends'});
        FB.login(function(response) {
              console.log(response);
              if (response.authResponse) {
                FB.api('/me/taggable_friends', function(response) {
                  if (response && !response.error) {
                        $scope.values.fb_friends = response.data;
                        alert("Logging in now.");
                        console.log(response.data);
                    }
                });
              } else {
                console.log("Error");
              }
            }, {scope: 'public_profile,user_friends'});
        $scope.cancel = function () {
            $modalInstance.close({type: "CLOSE"});
        }

        $scope.findUser = function (usernameOrEmail) {
            if(usernameOrEmail != "")
            {
                var request = $http({method: "POST", url: "getUsers", api: true, data: {usernameOrEmail: usernameOrEmail}});
                request.success(function (r) {
                    var users = [];
                    for (var i = 0; i < r.users.length; i++) {
                        var user = r.users[i];
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
            $modalInstance.close({type: "SEND", to: $scope.values.to, msg: $scope.values.msg, roles: $scope.values.roles, invites: $scope.values.invites});
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }]);
app.controller("viewApplyController", ["$scope", "User", "apply", "$modalInstance", function ($scope, User, apply, $modalInstance) {
        $scope.apply = apply;
        $scope.user = User.isLoggedIn();

        $scope.approve = function () {
            $modalInstance.close({action: "APPROVE", model: apply});
        }

        $scope.reject = function () {
            $modalInstance.close({action: "REJECT", model: apply});
        }

        $scope.close = function () {
            $modalInstance.close({action: "CLOSE", model: apply});
        }

        $scope.publish = function () {
            $modalInstance.close({action: "PUBLISH", model: apply});
        }
    }]);
app.controller("viewInviteController", ["$scope", "invite", "$modalInstance", "User", function ($scope, invite, $modalInstance, User) {
        $scope.invite = invite;
        $scope.user = User.isLoggedIn();

        $scope.accept = function () {
            $modalInstance.close({action: "ACCEPT", model: invite});
        }

        $scope.decline = function () {
            $modalInstance.close({action: "DECLINE", model: invite});
        }

        $scope.close = function () {
            $modalInstance.close({action: "CLOSE", model: invite});
        }

        $scope.publish = function () {
            $modalInstance.close({action: "PUBLISH", model: invite});
        }
    }]);
app.controller("profileLeftSideController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.user = User.isLoggedIn();
        $scope.selTeam = "";
        $scope.selAdv = "";

        $http.get("/api/getUserDetail").success(function (data) {
            $scope.user = data.user;
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
            var request = $http({method: "GET", url: "myTeams", api: true});
            request.success(function (data) {
                for (var i = 0; i < data.teams.length; i++) {
                    for (var j = 0; j < data.teams[i].teamMembers.length; j ++) {
                        var o = data.teams[i].teamMembers[j];
                        if (o.user == $scope.user._id) {
                            data.teams[i].tName =  data.teams[i].name + " (" + data.teams[i].teamMembers[j].title + ")";
                            break;
                        }
                    }
                }
                $scope.teams = data.teams;
            });
        }

        $scope.getAdventures = function () {
            var request = $http({method: "POST", url: "adventure/list", api: true, data: {teams: $scope.teams}});
            request.success(function (r) {
                $scope.adventures = r.adventures;
            });
        }

        $scope.$watch("teams", function () {
            $scope.calculateRecomendation();
            $scope.getAdventures();
        });

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
    }]);
app.controller("profileSettingsController", ["$scope", "$rootScope", "$location", "$http", "User", function ($scope, $rootScope, $location, $http, User) {
        $scope.username = "";
        $scope.fullname = "";
        $scope.email = "";
        $scope.location = "";
        $scope.skype = "";
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

        $http.get("/api/getUserDetail").success(function (data) {
            $scope.username = data.user.username;
            $scope.fullname = data.user.fullname;
            $scope.email = data.user.email.email;
            $scope.location = data.user.location;
            $scope.skype = data.user.skype;
            $scope.goals = data.user.goals;
            $scope.categories = data.user.categories;
            $scope.educations = data.user.educations;
            $scope.links = data.user.links;
            $scope.experience = data.user.experience;
            $scope.bio = data.user.bio;
            $scope.interests = (data.user.interests.length) ? data.user.interests : [{topic: {topic: ""}, information: ""}];
            $scope.likes = data.user.likes;
            $scope.dislikes = data.user.dislikes;
            $scope.skills = data.user.skills;
            $scope.looks = data.user.looks;
            $scope.roles = data.user.roles;

            $scope.invalidUsername = false;
            $scope.invalidEmail = false;
        });

        $scope.checkUsername = function () {
            $scope.invalidUsername = true;
            var request = $http({method: "POST", url: "validateUsername", api: true, data: {username: $scope.username}});
            request.success(function (data) {
                $scope.invalidUsername = data.find;
            });
        }

        $scope.checkEmail = function () {
            $scope.invalidEmail = true;
            var request = $http({method: "POST", url: "validateEmail", api: true, data: {email: $scope.email}});
            request.success(function (data) {
                $scope.invalidEmail = data.find;
            });
        }

        $scope.saveMainInformation = function () {
            var request = $http({method: "POST", url: "saveMainInformation", api: true, data: {username: $scope.username, fullname: $scope.fullname, email: $scope.email, location: $scope.location, skype: $scope.skype, /*goals: $scope.goals,*/ categories: $scope.categories}});

            request.success(function (data) {
                if (data.success) {
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
            var request = $http({method: "POST", url: "saveEducations", api: true, data: {educations: $scope.educations}});
            request.success(function (data) {
                if (data.success) {
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
            $scope.interests.push({topic: "", information: ""});
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
            var request = $http({method: "POST", url: "saveLinks", api: true, data: {links: $scope.links}});
            request.success(function (data) {
                if (data.success) {
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
            var request = $http({method: "POST", url: "saveLikes", api: true, data: {likes: $scope.likes}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

        $scope.saveDislikes = function () {
            var request = $http({method: "POST", url: "saveDislikes", api: true, data: {dislikes: $scope.dislikes}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

        $scope.saveSkills = function () {
            var request = $http({method: "POST", url: "saveSkills", api: true, data: {skills: $scope.skills}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

        $scope.saveLooks = function () {
            var request = $http({method: "POST", url: "saveLooks", api: true, data: {looks: $scope.looks}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

        $scope.saveRoles = function () {
            var request = $http({method: "POST", url: "saveRoles", api: true, data: {roles: $scope.roles}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

        $scope.saveExperience = function () {
            var request = $http({method: "POST", url: "saveExperience", api: true, data: {experience: $scope.experience}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

        $scope.saveInterests = function () {
            for (var i = $scope.interests.length - 1; i >= 0; i--)
                if ($scope.interests[i].topic.topic == "" && $scope.interests[i].information == "")
                    $scope.interests.splice(i, 1);
            var request = $http({method: "POST", url: "saveInterests", api: true, data: {interests: $scope.interests}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

        $scope.saveBiography = function () {
            var request = $http({method: "POST", url: "saveBiography", api: true, data: {biography: $scope.bio}});
            request.success(function (data) {
                if (data.success) {
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
            var request = $http({method: "POST", url: "saveGoal", api: true, data: {goals: $scope.goals}});
            request.success(function (data) {
                if (data.success) {
                    User.update();
                }
            });
        }

    }]);
app.controller("profileViewController", ["$scope", "$http", "User", function ($scope, $http, User) {
        $http.get("/api/getUserDetail").success(function (data) {
            $scope.user = data.user;
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
                    request = $http({method: "POST", url: "adventure/adsearch", api: true, data: {name: $stateParams.sname, description: $stateParams.sdescription, tag: $stateParams.stag}});
                    request.success($scope.parse_adventures);
                    break;
                case "tt":
                    request = $http({method: "POST", url: "adsearchTeam", api: true, data: {name: $stateParams.sname, description: $stateParams.sdescription}});
                    request.success($scope.parse_teams);
                    break;
                case "pp":
                    request = $http({method: "POST", url: "searchUser", api: true, data: {term: $stateParams.sname}});
                    request.success($scope.parse_users);
                    break;
                case "a":
                    request = $http({method: "POST", url: "adventure/search", api: true, data: {term: $stateParams.sterm}});
                    request.success($scope.parse_adventures);
                    break;
                case "t":
                    request = $http({method: "POST", url: "searchTeam", api: true, data: {term: $stateParams.sterm}});
                    request.success($scope.parse_teams);
                    break;
                case "p":
                    request = $http({method: "POST", url: "searchUser", api: true, data: {term: $stateParams.sterm}});
                    request.success($scope.parse_users);
                    break;
            }

            request.then(function () {
                $scope.loading = false;
            });
        }

        $scope.parse_adventures = function (data) {
            $scope.results = [];
            for (var i = 0; i < data.adventures.length; i++) {
                var result = {};
                result._id = data.adventures[i]._id;
                result.name = data.adventures[i].name;
                result.text1 = data.adventures[i].tags.join(" ");
                result.text2 = data.adventures[i].start + " - " + data.adventures[i].end;
                result.href = "/adventures/view/" + data.adventures[i]._id;
                $scope.results.push(result);
            }
        }

        $scope.parse_teams = function (data) {
            $scope.results = [];
            for (var i = 0; i < data.teams.length; i++) {
                var result = {};
                result._id = data.teams[i]._id;
                result.name = data.teams[i].name;
                result.text1 = data.teams[i].teamMembers.length + " Members";
                result.href = "/teams/view/" + data.teams[i]._id;
                $scope.results.push(result);
            }
        }

        $scope.parse_users = function (data) {
            $scope.results = [];
            for (var i = 0; i < data.users.length; i++) {
                var result = {};
                result.name = data.users[i].username;
                result.text1 = data.users[i].fullname;
                result.photo = data.users[i].photo;
                result.href = "/users/view/" + data.users[i]._id;
                $scope.results.push(result);
            }
        }

        $scope.refresh();
    }]);
app.controller("createTeamController", ["$scope", "$rootScope", "Upload", "$http", "$location", function ($scope, $rootScope, Upload, $http, $location) {
        $scope.createTeam = function () {
            request = $http({method: "POST", url: "createTeam", api: true, data: {name: $scope.name, description: $scope.description, roles: $scope.roles, defuser: $rootScope.defUser, fb_page: $scope.fb_page, image: $scope.uploadedImage, tags: ($scope.tags) ? $scope.tags.split(' ') : []}});
            request.success(function (data) {
                if ($rootScope.return2Adventure == "return")
                {
                    $rootScope.return2Adventure = "normal";
                    $location.path("/adventures/create");
                }
                else
                    $location.path("/teams/view/" + data.id);
            });
        }
        
        $scope.onFileSelect = function (image) {
            console.log(image);
            image = image.files[0];
            if (angular.isArray(image)) {
                image = image[0];
            }

            // This is how I handle file types in client side
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
        }
    }]);

app.controller("editTeamController", ["$scope", "$http", "$location", "$stateParams", "Upload", function ($scope, $http, $location, $stateParams, Upload) {
        var id = $stateParams.id;
        var request = $http({method: "POST", url: "getTeam", api: true, data: {id: id}});
        $scope.uploadInProgress = false;
        $scope.uploadProgress = 0;

        request.success(function (data) {
            console.log(data);
            $scope.name = data.team.name;
            $scope.description = data.team.description;
            $scope.uploadedImage = data.team.image;
            $scope.tags = data.team.tags.join(" ");
            $scope.fb_page = data.team.fb_page;
        });
        $scope.onFileSelect = function (image) {
            console.log(image);
            image = image.files[0];
            if (angular.isArray(image)) {
                image = image[0];
            }

            // This is how I handle file types in client side
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
        }
        $scope.editTeam = function () {
            var request = $http({method: "POST", url: "editTeam", api: true, data: {id: id, name: $scope.name, description: $scope.description, image:$scope.uploadedImage, fb_page: $scope.fb_page, tags:$scope.tags.split(" ")}});
            request.success(function (data) {
                $location.path("/teams/view/" + id);
            });
        }

        $scope.goBack = function () {
            $location.path("/teams/view/" + id);
        }
    }]);

app.controller("myTeamsController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
        $scope.user = User.isLoggedIn();

        $scope.refresh = function () {
            $scope.loading = true;
            var request = $http({method: "GET", url: "myTeams", api: true});
            request.success(function (data) {
                $scope.teams = data.teams;
                $scope.loading = false;
            });
        }
        $scope.shareTeam = function () {
//            console.log("starting share.... ");
//            FB.ui({
//                method: 'share_open_graph',
//                action_type: 'og.comments',
//                action_properties: JSON.stringify({
//                    object : {
//                        'og:url': 'http://galdraland-1-0.herokuapp.com/users', // your url to share
//                        'og:title': 'Here my custom title',
////                        'og:type': 'website',
//                        'og:description': 'here custom description',
//                        'og:image': 'http://www.hyperarts.com/external-xfbml/share-image.gif'
//                    }
//                })
//            }, function(response){
//                console.log("response = ", response);
//            });
        }

        $scope.refresh();
    }]);

app.controller("myTeamsTagController", ["$scope", "$http", "$location", "$stateParams", "User", function ($scope, $http, $location, $stateParams, User) {
    $scope.user = User.isLoggedIn();
    $scope.refresh = function () {
        $scope.loading = true;
        var request = $http({method: "POST", url: "teamTag/list", api: true, data: {tag: $stateParams.tag}});
        request.success(function (data) {
            $scope.teams = data.teams;
            $scope.loading = false;
        });
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

            request = $http({method: "POST", url: "newAdventure", api: true, data: {term: ""}});
            request.success($scope.parse_adventures);

            request = $http({method: "POST", url: "newTeam", api: true, data: {term: ""}});
            request.success($scope.parse_teams);

            request = $http({method: "POST", url: "newUser", api: true, data: {term: ""}});
            request.success($scope.parse_users);

            request.then(function () {
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
            for (var i = 0; i < data.adventures.length; i++) {
                var result = {};
                result._id = data.adventures[i]._id;
                result.name = data.adventures[i].name;
                result.text1 = data.adventures[i].tags.join(" ");
                result.text2 = data.adventures[i].start + " - " + data.adventures[i].end;
                result.href = "/adventures/view/" + data.adventures[i]._id;
                result.createdAt = prettyDate(data.adventures[i].createdAt);
                $scope.adventures.push(result);
            }
        }

        $scope.parse_teams = function (data) {
            $scope.teams = [];
            for (var i = 0; i < data.teams.length; i++) {
                var result = {};
                result._id = data.teams[i]._id;
                result.name = data.teams[i].name;
                result.text1 = data.teams[i].teamMembers.length + " Members";
                result.href = "/teams/view/" + data.teams[i]._id;
                result.createdAt = prettyDate(data.teams[i].createdAt);
                $scope.teams.push(result);
            }
        }

        $scope.parse_users = function (data) {
            $scope.peoples = [];
            for (var i = 0; i < data.users.length; i++) {
                var result = {};
                result._id = data.users[i]._id;
                result.name = data.users[i].username;
                result.text1 = data.users[i].fullname;
                result.photo = data.users[i].photo;
                result.signin = prettyDate(data.users[i].signin);
                $scope.peoples.push(result);
            }
        }

        $scope.refresh();
    }]);

app.controller("userViewController", ["$scope", "$http", "$stateParams", "User", "$modal", "$location", function ($scope, $http, $stateParams, User, $modal, $location) {
        $scope.user = User.isLoggedIn();

        $scope.refresh = function () {
            var request = $http({method: "POST", url: "getViewUser", api: true, data: {userid: $stateParams.id}});
            request.success(function (data) {
                $scope.username = data.user.username;
                $scope.fullname = data.user.fullname;
                $scope.email = data.user.email;
                $scope.location = data.user.location;
                $scope.skype = data.user.skype;
                $scope.goals = data.user.goals;
                $scope.categories = data.user.categories;
                $scope.educations = data.user.educations;
                $scope.links = data.user.links;
                $scope.experience = data.user.experience;
                $scope.bio = data.user.bio;
                $scope.interests = data.user.interests;
                $scope.photo = data.user.photo;
                $scope.searchUserId = $stateParams.id;
                $scope.likes = data.user.likes;
                $scope.dislikes = data.user.dislikes;
                $scope.skills= data.user.skills;
                $scope.looks= data.user.looks;
                $scope.roles= data.user.roles;
            });

            $scope.teams = [];
            request = $http({method: "POST", url: "userTeams", api: true, data: {userid: $stateParams.id}});
            request.success(function (data) {
                $scope.teams = data.teams;
            });

            request = $http({method: "POST", url: "adventure/list", api: true, data: {teams: $scope.teams}});
            request.success(function (r) {
                $scope.adventures = r.adventures;
            });
        }

        $scope.refresh();
    }]);

app.controller("teamViewController", ["$rootScope", "$scope", "$http", "$sce", "$stateParams", "User", "$modal", "$location", "$compile", function ($rootScope, $scope, $http, $sce, $stateParams, User, $modal, $location, $compile) {
        $scope.user = User.isLoggedIn();

        $scope.emptyMembers = [];

        $scope.refresh = function () {
            console.log("refreshing.....");
            var request = $http({method: "POST", url: "getTeam", api: true, data: {id: $stateParams.id}});
            request.success(function (data) {
                if (data.team.description && data.team.description != "") {
                    var find = "\n";
                    var re = new RegExp(find, 'g');
                    data.team.description = $sce.trustAsHtml(data.team.description.replace(re,"<br>"));
                }
                $scope.team = data.team;
                $scope.adventures = data.advs;
                $scope.isManager = data.team.owner._id == $scope.user._id;
                $scope.isMember = false;
                for (var i = 0; i < data.team.teamMembers.length; i++) {
                    if (data.team.teamMembers[i].user.profileId == '000000000000000000000000')
                        $scope.emptyMembers.push(data.team.teamMembers[i]);
                    if (data.team.teamMembers[i].user._id == $scope.user._id)
                        $scope.isMember = true;
                }
            });
        }

        $scope.modal = function () {
            var modalInstance = $modal.open({
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
                    var request = $http({method: "POST", url: "removeTeam", api: true, data: {id: $scope.team._id}});
                    request.success(function () {
                        $location.path("/teams");
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

            if ($scope.isManager) {
                var modalInstance = $modal.open({
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
                var modalInstance = $modal.open({
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
        }

        $scope.addMemberTitle = function () {
            var modalInstance = $modal.open({
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
                    var request = $http({method: "POST", url: "addMemberTitle", api: true, data: {team_id: result.team._id, titles: result.titles, skills: result.skills, description: result.description, whatisthere: result.whatisthere,defuser: $rootScope.defUser}});
                    request.success(function (data) {
                        location.reload();
                    });
                }
            });
        }

        $scope.sendInvite = function () {
            var modalInstance = $modal.open({
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
                            new_style_message: true,
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
                        var request = $http({method: "POST", url: "sendInvite", api: true, data: {team: $scope.team._id, invites: result.invites, msg: result.msg, roles: result.roles}});
                        request.success(function (data) {

                        });
                    }
                    send_invite();
                }
            });
        }

        $scope.applyTeam = function () {
            var modalInstance = $modal.open({
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

                    var request = $http({method: "POST", url: "sendApply", api: true, data: {team: $scope.team._id, msg: result.msg, title: result.title, memberList: $scope.emptyMembers}});
                    request.success(function (data) {
                        console.log(data);
                    });
                }
            })
        }
        $scope.$watch("team.fb_page", function(newValue, oldValue){
            console.log("newValue = " + newValue);
            console.log("oldValue = " + oldValue);
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'></div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script><div class='fb-page' data-tabs='timeline,events,messages' data-href='"+newValue+"' data-width='350' data-hide-cover='false'></div>";
                var $scope = $('#fbPage').html(htmlcontent).scope();
                $compile($('#fbPage'))($scope);
            }
        }, true);

        $scope.$watch("team._id", function(newValue, oldValue){
            console.log("id_newValue = " + newValue);
            console.log("id_oldValue = " + oldValue);
            if (newValue != oldValue) {
                var htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<div class='fb-share-button' data-href='http://galdraland-1-0.herokuapp.com/teams/view/"+newValue+"' data-layout='button_count'></div>";
                var $scope = $('#fbshare').html(htmlcontent).scope();
                $compile($('#fbshare'))($scope);
                htmlcontent = "<div id='fb-root'>" +
                    "</div><script>window.fbAsyncInit = function () {FB.init({appId: '110469289012320',status: true,cookie: true,xfbml: true,version: 'v2.6'});};window.fbAsyncInit();(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.src = '//connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>" +
                    "<div class='fb-comments' data-href='http://galdraland-1-0.herokuapp.com/teams/view/" + newValue +"' data-numposts='5' data-colorscheme='light' data-width='350'></div>";
                $scope = $('#fbComment').html(htmlcontent).scope();
                $compile($('#fbComment'))($scope);
            }
        }, true);

//        $scope.shareTeam = function () {
//                console.log("teamId = " + $stateParams.id);
////            FB.login(function(response) {
////                if (response.authResponse) {
////
////                } else {
////                    console.log("share team Error!");
////                }
////            });
//                FB.ui({
//                    method: 'share',
////                    action_type: 'og.comments',
////                    action_properties: JSON.stringify({
////                        object : {
////                            'og:url': 'http://galdraland-1-0.herokuapp.com/teams/view/' + $stateParams.id, // your url to share
////                            'og:title': 'Share Team Page',
////    //                        'og:type': 'website',
////                            'og:description': "You can share your team page",
////                            'og:image': 'http://www.hyperarts.com/external-xfbml/share-image.gif'
////                        }
//                    href : 'http://galdraland-1-0.herokuapp.com/teams/view/' + $stateParams.id
//                }, function(response){
//                    console.log("response = ", response);
//                });
//        }

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
            ismanager: '=ismanager',
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
                var request = $http({method: "POST", url: "getCommentByRefId", api: true, data: {id: scope.ref, fromMe: false, isManager : scope.ismanager, owner: scope.user._id}});
                request.success(function (data) {
                    if (!data.success || data.comments.length == 0) {
                        scope.comments = [];
                    } else {
                        scope.comments = data.comments;
                        console.log(scope.comments);
                    }
                });
            }

            scope.save = function () {
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;

                var request = $http({method: "POST", url: "insertComment", api: true, data: {ref_id: scope.ref, comment: scope.txtcomment}});
                request.then(function (result) {
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

                var request = $http({method: "POST", url: "updateStatus", api: true, data: {id: cmtId, status: "REJECT"}});
                request.then(function (result) {
                    scope.request_in_process = false;
                    scope.refresh();
                });
            }

            scope.cmt_approve = function (cmtId) {
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;

                var request = $http({method: "POST", url: "updateStatus", api: true, data: {id: cmtId, status: "APPROVE"}});
                request.then(function (result) {
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
            isstatic: '=isstatic',
        },
        template: '<input id="rating-elem" type="number" class="rating" min=0 max=5 step=0.5 data-size="xs">',
        link: function (scope, elem, attrs) {
            scope.user = User.isLoggedIn();
            scope.hoverin = false;
            scope.request_in_process = false;

            scope.refresh = function () {
                $('#rating-elem').attr('id', 'rating-elem' + scope.ref);
                var request = $http({method: "POST", url: "getRatingByRefId", api: true, data: {id: scope.ref, fromMe: false}});
                request.success(function (data) {
                    scope.myrating = null;
                    if (!data.success || data.ratings.length == 0) {
                        scope.count = 0;
                        scope.average = 0;
                    } else {
                        var sum = 0;
                        for (var i = 0; i < data.ratings.length; i++) {
                            sum += data.ratings[i].rating;
                            if (data.ratings[i].from == scope.user._id)
                                scope.myrating = data.ratings[i];
                        }

                        scope.count = data.ratings.length;
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
                    var request = $http({method: "POST", url: "insertRating", api: true, data: {ref_id: scope.ref, rating: value}});
                } else {
                    var request = $http({method: "POST", url: "updateRating", api: true, data: {id: scope.myrating._id, rating: value}});
                }
                request.then(function (result) {
                    scope.request_in_process = false;
                    scope.refresh();
                });
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
                $http.get("/api/getUser").success(function (data) {
                    $cookieStore.remove("user");
                    $cookieStore.put("user", data.user);
                });

                if (cb)
                    cb();
            }
        }
    }]);
