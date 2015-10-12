app.controller("profileController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.logout = function () {
        var request = $http.get("/api/logout");
        request.success(function (data) {
            $location.path("/"); 
        });
    }
}]);
