app.controller("profileViewController", ["$scope", "User", function ($scope, User) {
    $scope.user = User.isLoggedIn();
}]);