app.controller("profileViewController", ["$scope", "$http", "User", function ($scope, $http, User) {
	$http.get("/api/getUserDetail").success(function (data) {
		$scope.user = data.user;
	});
}]);