var app = angular.module("galdra", ["ngRoute", "ui.router", "ngCookies"]);

app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "$httpProvider", function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
    $stateProvider.state("index", {
       url: "/",
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
    });
    
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    
    $httpProvider.interceptors.push('middleware');
}]);

app.run(["$rootScope", "$http", "$location", "User", function ($rootScope, $http, $location, User) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 
        if (toState.requireLogin && !User.isLoggedIn()) {
            $location.path("/");
        } else if (!toState.requireLogin && User.isLoggedIn()) {
            $location.path("/profile");
        } else if (User.isLoggedIn() && !User.isLoggedIn().email.validated) {
            $location.path("/emailVerification");
        }
    });
}]);