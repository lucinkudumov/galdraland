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