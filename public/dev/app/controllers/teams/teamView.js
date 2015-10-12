app.controller("teamViewController", ["$scope", "$http", "$stateParams", "User", "$modal", "$location", function ($scope, $http, $stateParams, User, $modal, $location) {
    $scope.user = User.isLoggedIn();
    
    $scope.refresh = function () {
        var request = $http({ method : "POST", url : "getTeam", api : true, data : { id : $stateParams.id }});
        request.success(function (data) {
            $scope.team = data.team;
			$scope.adventures = data.advs;
            $scope.isManager = data.team.owner._id == $scope.user._id;
			$scope.isMember = false;
			for(var i = 0; i < data.team.teamMembers.length; i++){
				
				if(data.team.teamMembers[i].user._id == $scope.user._id)
					$scope.isMember = true;
			}
			console.log(data);
        });
    }
    
    $scope.modal = function () {
        var modalInstance = $modal.open({
          templateUrl: '/assets/partials/modal/yesandno.html',
          controller: "YesAndNoController",
          resolve: {
            msg: function () { return "Do you want to remove \"" + $scope.team.name + "\" team?" },
            title : function () { return "Remove \"" + $scope.team.name + "\"" }
          }
        });
        
        modalInstance.result.then(function (result) {
            if (result == "YES") {
                var request = $http({ method : "POST", url : "removeTeam", api : true, data : { id : $scope.team._id }});
                request.success(function () {
                    $location.path("/teams");
                });
            }
        });
        
        return false;
    }
	
	$scope.viewAdventure = function(adv){
		location.href = "/adventures/view/" + adv._id;
	}
    
    $scope.showMember = function (member) {
        $scope.activeMember = member;
        
        if ($scope.isManager) {
            var modalInstance = $modal.open({
              templateUrl: '/assets/partials/modal/memberEdit.html',
              controller: "MemberEditController",
              resolve: {
                  user : function () { return member; }
              }
            });
            
            modalInstance.result.then(function (model) {
                 if (model) {
                     model.roles = model.roles.split(/\s*,\s*/);
                     $scope.activeMember.title = model.title;
                     $scope.activeMember.description = model.description;
                     $scope.activeMember.roles = model.roles;
                     $scope.activeMember.status = model.status;
                     
                     var request = $http({ method : "POST", url : "updateTeamMember", api : true, data : model });
                 }
            });
        } else {
            
        }
    }
	
	$scope.leave = function(){
		$http({ method : "POST", url : "leaveTeam", api : true, data : { id : $scope.team._id }});
	}
    
    $scope.sendInvite = function () {
	   var modalInstance = $modal.open({
			templateUrl: "/assets/partials/modal/sendInvite.html",
			controller: "sendInviteController",
			resolve : {
				values : function () { return { to : "", msg : "", title : "", roles : "", team : $scope.team }}
			}
		});
        
        modalInstance.result.then(function (result) {
            if (result.type == "SEND") {
				var fb_ids = [];
				
                if (result.roles) {
                    result.roles = result.roles.split(/\s*,\s*/);
                }
				
				for(var i = 0; i < result.invites.length; i++){
					if(result.invites[i].fb_id != -1) fb_ids.push(result.invites[i].fb_id);
				}
				
				if(fb_ids.length ){
					FB.ui({method: 'apprequests',
						title: 'Invite to Galdraland Team',
						message: 'You have been invited to "' + $scope.team.name + '" team as ' + result.title,
						to: fb_ids,
						new_style_message: true,
					}, function(response){
						if(response.error_code !== undefined && response.error_code == 4201){
							for(i = 0; i < fb_ids.length; i++){
								for(var j = result.invites.length - 1; j >= 0; j--){
									if(result.invites[j].fb_id == fb_ids[i]){
										console.log(result.invites);
										result.invites.splice(j, 1);
										console.log(result.invites);
									}
								}
							}
						}						
						
						send_invite();
					});
				} else send_invite();
				
				function send_invite(){		
					console.log('haha');
					console.log(result.invites.length);
					if(result.invites.length == 0) return;
					var request = $http({ method : "POST", url : "sendInvite", api : true, data : { team : $scope.team._id, invites : result.invites, msg : result.msg, title : result.title, roles : result.roles }});
					request.success(function (data) {
						
					});
				}
            }
        })
    }
	
	$scope.applyTeam = function () {
        var modalInstance = $modal.open({
            templateUrl: "/assets/partials/modal/applyTeam.html",
            controller: "applyTeamController",
            resolve : {
                values : function () { return { to : "", msg : "", title : "", roles : "" }}
            }
        });       
        
        modalInstance.result.then(function (result) {
            if (result.type == "SEND") {
                if (result.roles) {
                    result.roles = result.roles.split(/\s*,\s*/);
                }
                
                var request = $http({ method : "POST", url : "sendApply", api : true, data : { team : $scope.team._id, msg : result.msg, title : result.title, roles : result.roles }});
                request.success(function (data) {
                    console.log(data);
                });
            }
        })
    }
	
    $scope.refresh();
}]);
