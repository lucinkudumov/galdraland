app.controller("viewApplyController", ["$scope", "User", "apply", "$modalInstance", function ($scope, User, apply, $modalInstance) {
    $scope.apply = apply;
	$scope.user = User.isLoggedIn();
    
    $scope.approve = function () {
        $modalInstance.close({ action : "APPROVE", model : apply });
    }
    
    $scope.reject = function () {
        $modalInstance.close({ action : "REJECT", model : apply });
    }
	
	$scope.close = function () {
        $modalInstance.close({ action : "CLOSE", model : apply });
    }
	
	$scope.publish = function () {
        $modalInstance.close({ action : "PUBLISH", model : apply });
    }
}]);