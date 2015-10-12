app.controller("myAdventuresController", ["$scope", "$http", "$location",  "User", function ($scope, $http, $location, User) {
    $scope.user = User.isLoggedIn();
    
    $scope.refresh = function () {
        $scope.loading = true;
        var request = $http({ method : "GET", url : "myTeams", api : true });
        request.success(function (data) {
            $scope.teams = data.teams;
        }).then(function(r){
			if( $scope.teams.length ){
				return $http({ method : "POST", url : "adventure/list", api : true, data : { teams : $scope.teams } });
			} else {
				$scope.loading = false;
			}
		}).then(function (r){
			$scope.adventures = r.data.adventures;
			$scope.loading = false;
		});
    }
    
    $scope.refresh();
}]);