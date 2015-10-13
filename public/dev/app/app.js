var app = angular.module("galdra", ["ngRoute", "ui.router", "ngCookies", "ui.bootstrap"]);
var config = {
	//siteurl : 'http://kkkalyosha.wix.com/galdraland/'
	siteurl : 'http://galdralandapp.herokuapp.com/'
}

app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "$httpProvider", function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
    $stateProvider.state("index", {
       url: "/",
       views: {
           "main" : { 
               templateUrl: "/assets/partials/login.html"
           }
       },
    }).state("redirect", {
       url: "/redirect/:returnTo",
       views: {
           "main" : { 
               templateUrl: "/assets/partials/login.html"
           }
       },
    }).state("indexFacebook", {
        url: "/_=_",
        views: {
            "main" : { 
                templateUrl: "/assets/partials/login.html"
            }
        }
    }).state("profileView", {
        url: "/profile",
        views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@profileView" : { templateUrl : "/assets/partials/profile/profile-left-side.html" },
            "right-side@profileView" : { templateUrl : "/assets/partials/profile/profile-view.html" }
        },
        requireLogin : true 
    }).state("profileSettings", {
         url: "/settings",
         views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@profileSettings" : { templateUrl : "/assets/partials/profile/profile-left-side.html" },
            "right-side@profileSettings" : { templateUrl : "/assets/partials/profile/profile-settings.html" }
         },
         requireLogin : true
    }).state("emailVerification", {
        url: "/emailVerification",
        views: {
            "main" : { templateUrl : "/assets/partials/email.html" }
        },
        requireLogin: true
    }).state("search", {
        url: "/search/:scategory/:sterm",
        views: {
            "main" : { templateUrl : "/assets/partials/search.html" },
            "search-result@search" : { templateUrl : "/assets/partials/search/list.html" }
        },
        requireLogin: true
    }).state("teamList", {
        url: "/teams",
        views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@teamList" : { templateUrl : "/assets/partials/team/left-side.html" },
            "right-side@teamList" : { templateUrl : "/assets/partials/team/list.html" }
        },
        requireLogin: true
    }).state("teamCreate", {
        url: "/teams/create",
        views: {
            "main" : { templateUrl  : "/assets/partials/main.html" },
            "left-side@teamCreate"  : { templateUrl : "/assets/partials/team/left-side.html"},
            "right-side@teamCreate" : { templateUrl : "/assets/partials/team/create.html" }
        },
        requireLogin: true
    }).state("teamView", {
        url: "/teams/view/:id",
        views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@teamView" : { templateUrl : "/assets/partials/team/left-side.html" },
            "right-side@teamView" : { templateUrl : "/assets/partials/team/view.html" },
        },
        requireLogin: true
    }).state("teamEdit", {
        url : "/teams/edit/:id",
        views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@teamEdit" : { templateUrl : "/assets/partials/team/left-side.html" },
            "right-side@teamEdit" : { templateUrl : "/assets/partials/team/edit.html" }
        },
        requireLogin: true
    }).state("adventureList", {
        url: "/adventures",
        views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@adventureList" : { templateUrl : "/assets/partials/adventure/left-side.html" },
            "right-side@adventureList" : { templateUrl : "/assets/partials/adventure/list.html" }
        },
        requireLogin: true
    }).state("adventureCreate", {
        url: "/adventures/create",
        views: {
            "main" : { templateUrl  : "/assets/partials/main.html" },
            "left-side@adventureCreate"  : { templateUrl : "/assets/partials/adventure/left-side.html"},
            "right-side@adventureCreate" : { templateUrl : "/assets/partials/adventure/create.html" }
        },
        requireLogin: true
    }).state("adventureView", {
        url: "/adventures/view/:id",
        views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@adventureView" : { templateUrl : "/assets/partials/adventure/left-side.html" },
            "right-side@adventureView" : { templateUrl : "/assets/partials/adventure/view.html" },
        },
        requireLogin: true
    }).state("adventureEdit", {
        url : "/adventures/edit/:id",
        views: {
            "main" : { templateUrl : "/assets/partials/main.html" },
            "left-side@adventureEdit" : { templateUrl : "/assets/partials/adventure/left-side.html" },
            "right-side@adventureEdit" : { templateUrl : "/assets/partials/adventure/edit.html" }
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
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 
        if (toState.requireLogin && !User.isLoggedIn()) {
			var url = "/redirect/?r=" + $location.path();
			$location.url(url);
        } else if (!toState.requireLogin && User.isLoggedIn()) {
            $location.path("/profile");
        } else if (User.isLoggedIn() && !User.isLoggedIn().email.validated) {
            $location.path("/emailVerification");
        }
    });
}]);