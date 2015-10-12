app.controller("editAdventureController", ["$scope", "$http", "$location", "$stateParams", function  ($scope, $http, $location, $stateParams) {
	$scope.values = {};
	$scope.values.team = null;
    $scope.values.newTeam = null;	
	$scope.values.teamCount = 1;
	$scope.arr_status = ["Active", "Stopped", "Completed"];
	
	$scope.getAdventure = function(){
		var request = $http({ method : "POST", url : "adventure/get", api : true, data : { id : $stateParams.id }});
		request.success(function (data) {
			$scope.name = data.adventure.name;
			$scope.description = data.adventure.description;
			$scope.tags = data.adventure.tags.join(" ");
			$scope.start = new Date(Date.parse(data.adventure.start));
			$scope.end = new Date(Date.parse(data.adventure.end));
			$scope.status = data.adventure.status;
			$scope.team = data.adventure.team;
			console.log($scope.status);
		});
	}
	
	$scope.getTeamCount = function(){
		var request = $http({ method : "GET", url : "myOwnTeams", api : true });
        request.success(function (data) {
            $scope.values.teamCount = data.teams;
        });
	}
	
	$scope.refresh = function () {
		$scope.getAdventure();
		$scope.getTeamCount();
	}
        
    $scope.editAdventure = function () {
        var request = $http({ method : "POST", url : "adventure/update", api : true, data : { id : $stateParams.id, name : $scope.name, description : $scope.description, tags : $scope.tags.split(" "), start : $scope.formatDate($scope.start), end : $scope.formatDate($scope.end), status : $scope.status }});
        request.success(function (data) {
            $location.path("/adventures/view/" + $stateParams.id);
        });
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
        $scope.team = team;
        return false;
    }
    
    $scope.removeTeam = function () {
        $scope.team = null;
    }	
	
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
    
    $scope.goBack = function () {
        $location.path("/adventures/view/" + $stateParams.id);
    }
	
	$scope.refresh();
}]);
