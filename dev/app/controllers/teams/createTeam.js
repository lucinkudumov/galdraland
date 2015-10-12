app.controller("createTeamController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.createTeam = function () {
        var request = $http({ method : "POST", url : "createTeam", api : true, data : { name : $scope.name, description : $scope.description } });
        request.success(function (data) {
            console.log(data.id);
            $location.path("/teams/view/" + data.id);
        });
    }
}]);
