app.controller("profileLeftSideController", ["$scope", "$http", "User", function ($scope, $http, User) {
    $scope.user = User.isLoggedIn();
    $scope.viewType = "ttt";
    $scope.adventrueView = false;
    $scope.teamView = true;

    $scope.calculateRecomendation = function () {
        if (!$scope.user) {
            return;
        }
        
        $scope.recomendation = [];
        
        if (!$scope.user.educations || $scope.user.educations.length == 0) {
            $scope.recomendation.push("Add education: college or university.");
        }
        
        if (!$scope.user.skype) {
            $scope.recomendation.push("Add skype in settings page.");
        }
        
        if (!$scope.user.experience) {
            $scope.recomendation.push("Add experience.");
        }
        
        if (!$scope.teams || $scope.teams.length == 0) {
            $scope.recomendation.push("Add new team now.");
        }
    }
    
    $scope.getTeams = function () {
        var request = $http({ method : "GET", url : "myTeams", api : true });
        request.success(function (data) {
            for (var i = 0; i < data.teams.length; i++) {
                for (var j = 0; j < data.teams[i].teamMembers.length; j ++) {
                    var o = data.teams[i].teamMembers[j];
                    if (o.user == $scope.user._id) {
                        data.teams[i].tName =  data.teams[i].name + " (" + data.teams[i].teamMembers[j].title + ")";
                        break;
                    }
                }
            }
            $scope.teams = data.teams;
        });
    }
    
    $scope.$watch("teams", function () {
        $scope.calculateRecomendation();
    });

    $scope.selectedProfileView = function() {
        if ($scope.viewType == "aaa") {
            $scope.adventrueView = true;
            $scope.teamView = false;
        } else {
            $scope.adventrueView = false;
            $scope.teamView = true;
        }
    }

    $scope.getTeams();

}]);