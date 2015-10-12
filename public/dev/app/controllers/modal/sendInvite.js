app.controller("sendInviteController", ["$scope", "$modalInstance", "values",  "$http", "User", function ($scope, $modalInstance, values, $http, User) {
    $scope.values = angular.copy(values);
    $scope.values.invites = [];
    $scope.values.newMember = null;
    $scope.values.memberId = null;
	$scope.values.fb_friends = null;
	$scope.user = User.isLoggedIn();
	$scope.team = values.team;
	console.log(values);

	FB.login(function(){
		FB.api(
			"/me/friends",
			//"/me/taggable_friends",
			function (response) {
				if (response && !response.error) {
					$scope.values.fb_friends = response.data;
					console.log(response);
				}
			}
		);
	}, {scope: 'user_friends'});
    
    $scope.cancel = function () {
        $modalInstance.close({ type : "CLOSE" });
    }
    
    $scope.findUser = function (usernameOrEmail) {
        var request = $http({ method : "POST", url : "getUsers", api : true, data : { usernameOrEmail : usernameOrEmail }});
        request.then(function (r) {
            var users = [];
            for (var i = 0; i < r.data.users.length; i++) {
				var user = r.data.users[i];
				var exist_in_team = false;
				user.is_fb_friend = -1;
				
				//Check If Current User
				if($scope.user._id == user._id) continue;
				
				//Check If Exists in Team
				for(var j = 0; j < $scope.team.teamMembers.length; j++){					
					if($scope.team.teamMembers[j].user._id == user._id)
						exist_in_team = true;
				}
				
				if(exist_in_team) continue;
				
				//Check If Exists in Facebook Friends List
				for(j = 0; j < $scope.values.fb_friends.length; j++){
					if( $scope.values.fb_friends[j].id == user.profileId ){
						user.is_fb_friend = user.profileId;
						user.username = user.username + "(facebook friend - " + $scope.values.fb_friends[j].name + ")";
					}
				}
				
				//Check If Exists in Invite List
                if ($scope.values.invites.length > 0) {
                    for (j = 0; j < $scope.values.invites.length; j++) {
                        if (user.username == $scope.values.invites[j].user || (user.is_fb_friend != -1 && user.is_fb_friend == $scope.values.invites[j].profileId)) {
                            break;
                        } else if(j == $scope.values.invites.length - 1){
							users.push(user);
						}
                    }
                } else {
                    users.push(user);
                }
            }
			
			for (i = 0; i < $scope.values.fb_friends.length; i++) {
				var user = {username : $scope.values.fb_friends[i].name + "(facebook friend)", is_fb_friend : $scope.values.fb_friends[i].id, id : -1};
				var add = true;
				
				for(var j = 0; j < users.length; j++){
					if( users[j].profileId == user.is_fb_friend ) add = false;
				}
				
				if ($scope.values.invites.length > 0)
					for(j = 0; j < $scope.values.invites.length; j++){
						if( $scope.values.invites[j].fb_id == user.is_fb_friend ) add = false;
					}
				
				console.log(add);
				
				if(!add) continue;
				
                if ($scope.values.invites.length > 0) {
                    for (j = 0; j < $scope.values.invites.length; j++) {
                        if (user.username == $scope.values.invites[j].user) {
                            break;
                        } else if(j == $scope.values.invites.length - 1){
							users.push(user);
						}
                    }
                } else {
                    users.push(user);
                }
            }		
			
            $scope.values.users = users;
        });
    }
    
    $scope.addInvite = function (user) {
        $scope.values.newMember = null;
        $scope.values.users = [];
        $scope.values.invites.push({ user: user.username, memberId : user._id, fb_id : user.is_fb_friend });
        return false;
    }
    
    $scope.removeInvite = function (index) {
        $scope.values.invites.splice(index, 1);
    }
    
    $scope.send = function () {
        $modalInstance.close({ type : "SEND", to : $scope.values.to, msg : $scope.values.msg, title : $scope.values.title, roles : $scope.values.roles, invites : $scope.values.invites });
    }
	
	function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}]);