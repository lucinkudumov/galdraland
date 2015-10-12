app.controller("searchController", ["$scope", "$http", "$location", "$stateParams",  "User", function ($scope, $http, $location, $stateParams, User) {
    $scope.user = User.isLoggedIn();
	$scope.results = [];
	$scope.loading = true;
    
    $scope.refresh = function () {
        $scope.loading = true;
		var request = null;
		switch($stateParams.scategory){
			case "a":
				request = $http({ method : "POST", url : "adventure/search", api : true, data : { term : $stateParams.sterm } });
				request.success($scope.parse_adventures);
				break;
			case "t":
				request = $http({ method : "POST", url : "searchTeam", api : true, data : { term : $stateParams.sterm } });
				request.success($scope.parse_teams);
				break;
			case "p":
				request = $http({ method : "POST", url : "searchUser", api : true, data : { term : $stateParams.sterm } });
				request.success($scope.parse_users);
				break;
		}
		
		request.then(function(){
			$scope.loading = false;
		});
    }
	
	$scope.parse_adventures = function(data){
		$scope.results = [];
		for(var i = 0; i < data.adventures.length; i++){
			var result = {};
			result._id = data.adventures[i]._id;
			result.name = data.adventures[i].name;
			result.text1 = data.adventures[i].tags.join(" ");
			result.text2 = data.adventures[i].start + " - " + data.adventures[i].end;
			result.href = "/adventures/view/" + data.adventures[i]._id;
			$scope.results.push(result);
		}
	}
	
	$scope.parse_teams = function(data){
		$scope.results = [];
		for(var i = 0; i < data.teams.length; i++){
			var result = {};
			result._id = data.teams[i]._id;
			result.name = data.teams[i].name;
			result.text1 = data.teams[i].teamMembers.length + " Members";
			result.href = "/teams/view/" + data.teams[i]._id;
			$scope.results.push(result);
		}
	}
	
	$scope.parse_users = function(data){
		$scope.results = [];
		for(var i = 0; i < data.users.length; i++){
			var result = {};
			result.name = data.users[i].username;
			result.text1 = data.users[i].fullname;
			result.photo = data.users[i].photo;
			$scope.results.push(result);
		}
	}
    
    $scope.refresh();
}]);