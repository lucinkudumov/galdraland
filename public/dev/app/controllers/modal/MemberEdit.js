app.controller("MemberEditController", ["$scope", "user", "$modalInstance", function ($scope, user, $modalInstance) {
    $scope.user = angular.copy(user);
    
    if ($scope.user.roles && $scope.user.roles.join) {
        $scope.user.roles = $scope.user.roles.join(", ");
    }
    
    $scope.cancel = function () {
        $scope.user = $scope.backup;
        $modalInstance.close();
    }
    
    $scope.save = function () {
        $modalInstance.close($scope.user);
    }
}]);
