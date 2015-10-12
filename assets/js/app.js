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
app.controller("emailController", ["$scope", "$location", "$http", "User", function ($scope, $location, $http, User) {
    $scope.validate = false;
    $scope.email = User.isLoggedIn().email.email;
    
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
            $scope.formatError = true;
            return false;
        } else {
            $scope.formatError = false;
        }
        
        
        var request = $http.post("/api/validateEmail", { email : $scope.email });
        request.success(function (data) {
            if (!data.find) {
                $scope.validate = true;
            } else {
                $scope.validate = false;
                $scope.availableEmail = false;
            }
        });
    }    
    
    $scope.saveEmail = function () {
        var request = $http.post("/api/saveEmail", { email : $scope.email });
        request.success(function (data) {
            User.update();
            $location.path("/profile");
        });
    }
}]);
app.controller("headerController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
    $scope.logout = function () {
        var request = $http.get({ url : "logout", api : true });
        request.success(function (data) {
            User.logout();
            $location.path("/");
        });
    }
}]);

app.controller("indexController", ["$scope", "$location", "$window", function ($scope, $location, $window) {
    
}]);

app.controller("leftMenuController", ["$scope", "$location", function ($scope, $location) {
    $scope.go = function (url) {
        $location.path(url);
    }
}]);
app.controller("profileLeftSideController", ["$scope", "$http", "User", function ($scope, $http, User) {
    $scope.user = User.isLoggedIn();
    
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
        
        if (!$scope.user.interests || $scope.user.interests.length == 0) {
            $scope.recomendation.push("Add interests.");
        }
        
        if (!$scope.user.team) {
            $scope.recomendation.push("Search and join to team.");
        }
    }
    
    $scope.$watch("user", function () {
        $scope.calculateRecomendation();
    });
}]);
app.controller("profileSettingsController", ["$scope", "$rootScope", "$location", "$http", "User", function ($scope, $rootScope, $location, $http, User) {
    $scope.username = User.isLoggedIn().username;
    $scope.fullname = User.isLoggedIn().fullname;
    $scope.email = User.isLoggedIn().email.email;
    $scope.location = User.isLoggedIn().location;
    $scope.skype = User.isLoggedIn().skype;
    $scope.goals = User.isLoggedIn().goals;
    $scope.educations = User.isLoggedIn().educations;
    $scope.links = User.isLoggedIn().links;
    $scope.experience = User.isLoggedIn().experience;
    
    $scope.invalidUsername = false;
    $scope.invalidEmail = false;
    
    $scope.checkUsername = function () {
        $scope.invalidUsername = true;
        var request = $http({ method : "POST", url : "validateUsername", api : true, data : { username : $scope.username }});
        request.success(function (data) {
            $scope.invalidUsername = data.find;
        });
    }
    
    $scope.checkEmail = function () {
        $scope.invalidEmail = true;
        var request = $http({ method : "POST", url : "validateEmail", api : true, data : { email : $scope.email }});
        request.success(function (data) {
           $scope.invalidEmail = data.find;
        });
    }
    
    $scope.saveMainInformation = function () {
        var request = $http({ method : "POST", url : "saveMainInformation", api : true,  data : { username : $scope.username, fullname : $scope.fullname, email : $scope.email, location : $scope.location, skype : $scope.skype, goals : $scope.goals }});
        
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
        var request = $http({ method : "POST", url : "saveEducations", api : true, data : { educations : $scope.educations }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            } 
        });
    }
    
    $scope.addLink = function () {
        $scope.links.push({ name : "", link : "" });
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
        var request = $http({ method : "POST", url : "saveLinks", api : true, data :  { links : $scope.links }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }
    
    $scope.saveExperience = function () {
        var request = $http({ method : "POST", url : "saveExperience", api : true, data : { experience : $scope.experience }});
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
    
    $scope.removeEducation = function (e) {
        var index = $scope.educations.indexOf(e);
        if (index >= 0) {
            $scope.educations.splice(index, 1);
        }
    }
}]);
app.controller("profileViewController", ["$scope", "User", function ($scope, User) {
    $scope.user = User.isLoggedIn();
}]);
app.controller("createTeamController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.createTeam = function () {
        var request = $http({ method : "POST", url : "createTeam", api : true, data : { name : $scope.name, description : $scope.description } });
        request.success(function (data) {
            console.log(data.id);
            $location.path("/teams/view/" + data.id);
        });
    }
}]);

app.controller("myTeamsController", ["$scope", "$http", "$location",  "User", function ($scope, $http, $location, User) {
    $scope.user = User.isLoggedIn();
    
    $scope.refresh = function () {
        $scope.loading = true;
        var request = $http({ method : "GET", url : "myTeams", api : true });
        request.success(function (data) {
            $scope.teams = data.teams;
            $scope.loading = false;
        });
    }
    
    $scope.refresh();
}]);
app.controller("teamViewController", ["$scope", "$http", "$stateParams", "User", function ($scope, $http, $stateParams, User) {
    $scope.user = User.isLoggedIn();
    
    $scope.refresh = function () {
        var request = $http({ method : "POST", url : "getTeam", api : true, data : { id : $stateParams.id }});
        request.success(function (data) {
            $scope.team = data.team;
            $scope.isManager = data.team.owner._id == $scope.user._id;
        });
    }
    
    $scope.refresh();
}]);

app.factory('middleware', function() {
    return {
        request: function(config) {
            if (config.api) {
                config.url = "/api/" + config.url;
            }
            
            return config;
        }
    };
});
app.factory("User", ["$http", "$cookieStore", function ($http, $cookieStore) {
    var user = $cookieStore.get("user");
    return {
        isLoggedIn : function () {
            return  $cookieStore.get("user");
        },
        logout: function () {
            user = null;
            $cookieStore.remove("user");
        },
        update : function () {
            $http.get("/api/getUser").success(function (data) {
               $cookieStore.remove("user");
               $cookieStore.put("user", data.user);
               user = data.user;
            });
        }
    }
}]);
