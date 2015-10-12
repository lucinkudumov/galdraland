app.controller("applyTeamController", ["$scope", "$modalInstance", "values", "$http", function ($scope, $modalInstance, values, $http) {
    $scope.values = angular.copy(values);
    
    $scope.cancel = function () {
        $modalInstance.close({ type : "CLOSE" });
    }
    
    $scope.send = function () {
        $modalInstance.close({ type : "SEND", msg : $scope.values.msg, title : $scope.values.title, roles : $scope.values.roles });
    }
}]);