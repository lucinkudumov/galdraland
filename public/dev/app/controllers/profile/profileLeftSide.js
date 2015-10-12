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
        
        if (!$scope.teams || $scope.teams.length == 0) {
            $scope.recomendation.push("Add new team now.");
        }
    }
    
    $scope.getTeams = function () {
        var request = $http({ method : "GET", url : "myTeams", api : true });
        request.success(function (data) {
            $scope.teams = data.teams;
        });
    }
    
    $scope.$watch("teams", function () {
        $scope.calculateRecomendation();
    });
    
    $scope.getTeams();
}]);