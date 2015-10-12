app.controller("createAdventureController", ["$scope", "$http", "$location", "User", function ($scope, $http, $location, User) {
	$scope.user = User.isLoggedIn();
	$scope.values = {};
	$scope.values.team = null;
    $scope.values.newTeam = null;	
	$scope.values.teamCount = 1;
	
	$scope.refresh = function () {
        var request = $http({ method : "GET", url : "myOwnTeams", api : true });
        request.success(function (data) {
            $scope.values.teamCount = data.teams;
        });
    }
	
    $scope.createAdventure = function () {
		var post = $scope.fb_post;
        var request = $http({ method : "POST", url : "adventure/create", api : true, data : { name : $scope.name, description : $scope.description, team : $scope.team, start : $scope.formatDate($scope.start), end : $scope.formatDate($scope.end), tags : ($scope.tags)?$scope.tags.split(' '):[] } });
        request.success(function (data) {
            $location.path("/adventures/view/" + data.id);
			if(post) $scope.post_to_fb(data.id);
        });
    }
	
	$scope.post_to_fb = function(id){
		FB.login(function(){
			FB.api('/me/feed', 'post', {message: $scope.user.fullname + " has created a new adventure on Galdraland.\n" + config.siteurl + "/adventures/view/" + id});
		}, {scope: 'publish_actions'});
	}
	
	$scope.findTeam = function (name) {
        var request = $http({ method : "POST", url : "adventure/getTeams", api : true, data : { name : name }});
        request.then(function (r) {
            var teams = [];
            for (var i = 0; i < r.data.teams.length; i++) {
                if ($scope.values.team != null) {
					if (r.data.teams[i].name != $scope.values.team.name) {
						teams.push(r.data.teams[i]);
					}
                } else {
                    teams.push(r.data.teams[i]);
                }
            }
                        
            $scope.values.teams = teams;
        });
    }
	
	$scope.attachTeam = function (team) {
        $scope.values.newTeam = null;
        $scope.values.teams = [];
        $scope.values.team = team;
        return false;
    }
    
    $scope.removeTeam = function () {
        $scope.values.team = null;
    }
	
	$scope.refresh();
	
	
	$scope.setDate = function() {
		var numberOfDaysToAdd = 10;
		$scope.start = $scope.today = new Date();
		$scope.end = new Date();
		
		$scope.end.setDate($scope.end.getDate() + numberOfDaysToAdd); 
	};
	$scope.setDate();

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	
	$scope.formatDate = function(date){
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
		var dd  = date.getDate().toString();
		return yyyy + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]); // padding
	}

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
}]);
