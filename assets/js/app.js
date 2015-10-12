var app = angular.module("galdra", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl : "/assets/partials/login.html"
    }).when("/_=_", {
        templateUrl : "/assets/partials/login.html" 
    }).when("/profile", {
        templateUrl : "/assets/partials/profile.html",
        requireLogin: true
    }).otherwise({
        redirectTo: "/"
    });
    
    $locationProvider.html5Mode(true);
}]);

app.run(["$rootScope", "$http", "$location", function ($rootScope, $http, $location) {
    console.log("start");
    
    var request = $http.get("/api/getUser");
    request.success(function (data) {
        $rootScope.user = data.user;
        
        if ($rootScope.user) {
            $location.path("/profile");
        }
    });
    
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        console.log(next);
    });
}]);
app.controller("indexController", ["$scope", "$location", "$window", function ($scope, $location, $window) {
    
}]);

app.controller("profileController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.logout = function () {
        var request = $http.get("/api/logout");
        request.success(function (data) {
            $location.path("/"); 
        });
    }
}]);
