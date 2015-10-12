app.controller("headerController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
    $scope.logout = function () {
        var request = $http.get({ url : "logout", api : true });
        request.success(function (data) {
            User.logout();
            $location.path("/");
        });
    }
}]);
