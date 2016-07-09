app.controller("MemberViewController", ["$scope", "user", "$modalInstance", function ($scope, user, $modalInstance) {
    $scope.user = angular.copy(user);
    $scope.cancel = function () {
        $modalInstance.close();
    }
}]);
