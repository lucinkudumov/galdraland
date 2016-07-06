app.controller("profileSettingsController", ["$scope", "$rootScope", "$location", "$http", "User", function ($scope, $rootScope, $location, $http, User) {
	$scope.username = "";
	$scope.fullname = "";
	$scope.email = "";
	$scope.location = "";
	$scope.skype = "";
	$scope.goals = "";
	$scope.categories = "";
	$scope.educations = [];
	$scope.links = [];
	$scope.experience = "";
	$scope.bio = "";
	$scope.bio_placeholder = "Provide your biography or import from facebook...";
	$scope.interests = [];
    $scope.likes = [];
		
	$http.get("/api/getUserDetail").success(function (data) {
		$scope.username = data.user.username;
		$scope.fullname = data.user.fullname;
		$scope.email = data.user.email.email;
		$scope.location = data.user.location;
		$scope.skype = data.user.skype;
		$scope.goals = data.user.goals;
		$scope.categories = data.user.categories;
		$scope.educations = data.user.educations;
		$scope.links = data.user.links;
		$scope.experience = data.user.experience;
		$scope.bio = data.user.bio;
		$scope.interests = (data.user.interests.length)?data.user.interests:[{topic: {topic : ""}, information: ""}];
		
		$scope.invalidUsername = false;
		$scope.invalidEmail = false;
	});
    
    $scope.checkUsername = function () {
        $scope.invalidUsername = true;
        var request = $http({ method : "POST", url : "validateUsername", api : true, data : { username : $scope.username }});
        request.success(function (data) {
            $scope.invalidUsername = data.find;
        });
    }
    
    $scope.checkEmail = function () {
        $scope.invalidEmail = true;
        var request = $http({ method : "POST", url : "validateEmail", api : true, data : { email : $scope.email }});
        request.success(function (data) {
           $scope.invalidEmail = data.find;
        });
    }
    
    $scope.saveMainInformation = function () {
        var request = $http({ method : "POST", url : "saveMainInformation", api : true,  data : { username : $scope.username, fullname : $scope.fullname, email : $scope.email, location : $scope.location, skype : $scope.skype, /*goals : $scope.goals,*/ categories : $scope.categories }});
        
        request.success(function (data) {
            if (data.success) {
                User.update();
            } 
        });
    }
    
    $scope.goBack = function () {
        $location.path("/profile");
    }
    
    $scope.setType = function (e, type) {
        e.type = type;
    }
    
    $scope.addSchool = function () {
        var e = {};
        e.type = "";
        e.school = {};
        e.school.name = "";
        e.year = {};
        e.year.name = "";
        $scope.educations.push(e);
    }
    
    $scope.validateEducation = function () {
        for (var i = 0; i < $scope.educations.length; i++) {
            var e = $scope.educations[i];
            if (!e.type || !e.school.name || !e.year.name) {
                return true;
            }
        }
        
        return false;
    }
    
    $scope.saveEducations = function () {
        var request = $http({ method : "POST", url : "saveEducations", api : true, data : { educations : $scope.educations }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            } 
        });
    }
    
    $scope.addLink = function () {
        $scope.links.push({ name : "", link : "" });
    }
	
	$scope.addInterest = function () {
        $scope.interests.push({ topic : "", information : "" });
		$scope.interest_placeholder = "";
    }

    $scope.addLikes = function () {
        $scope.likes.push({ like : "" });
    }

    $scope.validateLinks = function () {
        for (var i = 0; i < $scope.links.length; i++) {
            var l = $scope.links[i];
            
            if (!l.link) {
                return true;
            }
        }
        
        return false;
    }

    $scope.validateLikes = function () {
        for (var i = 0; i < $scope.likes.length; i++) {
            var l = $scope.likes[i];

            if (!l.like) {
                return true;
            }
        }

        return false;
    }
    
    $scope.saveLinks = function () {
        var request = $http({ method : "POST", url : "saveLinks", api : true, data :  { links : $scope.links }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }

    $scope.saveLikes = function () {
        var request = $http({ method : "POST", url : "saveLikes", api : true, data :  { likes : $scope.likes }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }

    $scope.validateLikes = function () {
        for (var i = 0; i < $scope.likes.length; i++) {
            var l = $scope.likes[i];

            if (!l.likes) {
                return true;
            }
        }

        return false;
    }

    $scope.saveExperience = function () {
        var request = $http({ method : "POST", url : "saveExperience", api : true, data : { experience : $scope.experience }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }

    $scope.saveGoal = function () {
        var request = $http({ method : "POST", url : "saveGoal", api : true, data : { goals : $scope.goals }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }

	$scope.saveInterests = function () {
		for(var i = $scope.interests.length - 1; i >= 0; i--)
			if($scope.interests[i].topic.topic == "" && $scope.interests[i].information == "" ) $scope.interests.splice(i, 1);
        var request = $http({ method : "POST", url : "saveInterests", api : true, data : { interests : $scope.interests }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }
	
	$scope.saveBiography = function () {
        var request = $http({ method : "POST", url : "saveBiography", api : true, data : { biography : $scope.bio }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }
    
    $scope.removeLink = function (l) {
        var index = $scope.links.indexOf(l);
        if (index >= 0) {
            $scope.links.splice(index, 1);
        }
    }
	
	$scope.removeInterest = function (i) {
		var index = $scope.interests.indexOf(i);
        if (index >= 0) {
            $scope.interests.splice(index, 1);
        }
    }
    
    $scope.removeEducation = function (e) {
        var index = $scope.educations.indexOf(e);
        if (index >= 0) {
            $scope.educations.splice(index, 1);
        }
    }

    $scope.removeLikes = function (l) {
        var index = $scope.likes.indexOf(l);
        if (index >= 0) {
            $scope.likes.splice(index, 1);
        }
    }

	$scope.importBio = function(){
		FB.login(function(){
			FB.api("/me", function (response) {
				$scope.$apply(function(){
					if (response && !response.error) {
						$scope.bio = response.bio;
						if($scope.bio == "") $scope.bio_placeholder = "No biography information on facebook...";
					} else {
						$scope.bio_placeholder = "Error importing...";
					}
				});
			}
		);}, {scope: ['user_about_me']});
	}
	
	$scope.importInterests = function(){
		FB.login(function(){
			FB.api("/me/likes", function (response) {
				$scope.$apply(function(){
					if (response && !response.error) {
						for(var i = 0; i < response.data.length; i++){
							if(!$scope.exist_interests(response.data[i].category, response.data[i].name)) $scope.interests.push({topic: {topic : response.data[i].category}, information: response.data[i].name});
						}
						
						if(response.data.length == "") $scope.interest_placeholder = "No interests information on facebook...";
					} else {
						$scope.interest_placeholder = "Error importing...";
					}
				});
			}
		);}, {scope: ['user_likes', 'user_about_me']});
	}
	
	$scope.exist_interests = function(topic, information){
		if($scope.interests == null ) return false;
		for(var i = 0; i < $scope.interests.length; i++){
			if($scope.interests[i].topic.topic === topic && $scope.interests[i].information === information) return true;
		}
		
		return false;
	}
}]);