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
