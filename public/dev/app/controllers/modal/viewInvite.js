app.controller("viewInviteController", ["$scope", "invite", "$modalInstance", "User", function ($scope, invite, $modalInstance, User) {
    $scope.invite = invite;
	$scope.user = User.isLoggedIn();
    
    $scope.accept = function () {
        $modalInstance.close({ action : "ACCEPT", model : invite });
    }
    
    $scope.decline = function () {
        $modalInstance.close({ action : "DECLINE", model : invite });
    }
	
	$scope.close = function () {
        $modalInstance.close({ action : "CLOSE", model : invite });
    }
	
	$scope.publish = function () {
        $modalInstance.close({ action : "PUBLISH", model : invite });
    }
}]);