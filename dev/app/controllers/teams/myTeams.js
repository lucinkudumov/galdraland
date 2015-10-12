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