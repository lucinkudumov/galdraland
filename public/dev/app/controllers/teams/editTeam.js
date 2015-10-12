app.controller("editTeamController", ["$scope", "$http", "$location", "$stateParams", function  ($scope, $http, $location, $stateParams) {
    var id = $stateParams.id;
    
    var request = $http({ method : "POST", url : "getTeam", api : true, data : { id : id }});
    request.success(function (data) {
        $scope.name = data.team.name;
        $scope.description = data.team.description;
    });
    
    $scope.editTeam = function () {
        var request = $http({ method : "POST", url : "editTeam", api : true, data : { id : id, name : $scope.name, description : $scope.description }});
        request.success(function (data) {
            $location.path("/teams/view/" + id);
        });
    }
    
    $scope.goBack = function () {
        $location.path("/teams/view/" + id);
    }
}]);
