app.controller("headerController", ["$scope", "$http", "$location", "User", "$modal", "$stateParams", function ($scope, $http, $location, User, $modal, $stateParams) {
	$scope.user = User.isLoggedIn();
	$scope.scategory = ($stateParams.scategory)?$stateParams.scategory:"a";
	$scope.stext = ($stateParams.sterm)?$stateParams.sterm:"";
	
	
	/*
	if(localStorage.getItem("galdraland.redirect") != null && localStorage.getItem("galdraland.redirect") != ""){
		location.href = localStorage.getItem("galdraland.redirect");
		localStorage.setItem("galdraland.redirect", "");
		return;
	}*/
    var invite_request = $http({ method : "GET", url : "getInvites", api : true});

	invite_request.then(function(result){
		if(result !== undefined && result.data !== undefined && result.data.invites !== undefined) $scope.invites = result.data.invites;
		else $scope.invites = [];
		
		return $http({ method : "GET", url : "getApplies", api : true});
	}).then(function (result) {
		if(result !== undefined && result.data !== undefined && result.data.applies !== undefined) $scope.applies = result.data.applies;
		else $scope.applies = [];
		
		refresh_feeds();
	});
	
	function refresh_feeds(){
		$scope.feeds = [];
		if($scope.invites !== undefined ){
			for(var i = 0; i < $scope.invites.length; i++){
				var feed = $scope.invites[i];
				feed.category = 0;
			  
				if(feed.accepted){
					feed.alert = feed.to + " has accepted your invitation to \"" + feed.team.name + "\" as " + feed.title + ".";
				} else if(feed.declined) {
					feed.alert = feed.to + " has declined your invitation to \"" + feed.team.name + "\" as " + feed.title + ".";
				} else {
					feed.alert = "You have received an invitation to join \"" + feed.team.name + "\" team as " + feed.title + ".";
				}
				$scope.feeds.push(feed);
			}
		}
		
		if($scope.applies !== undefined ){
			for(i = 0; i < $scope.applies.length; i++){
				var feed = $scope.applies[i];
				feed.category = 1;
			  
				if(feed.ownerApproved){
					feed.alert = "Your request to join \"" + feed.team.name + "\" team has been approved.";
				} else if(feed.ownerRejected) {
					feed.alert = "Your request to join \"" + feed.team.name + "\" team has been rejected.";
				} else {
					feed.alert = "You have a new member role request for \"" + feed.team.name + "\" team.";
				}
				$scope.feeds.push(feed);
			}
		}
	}
    
    $scope.logout = function () {
        var request = $http.get({ url : "logout", api : true });
        request.success(function (data) {
            User.logout();
            $location.path("/");
        });
    }
	
	$scope.search = function(){
		$location.path("/search/" + $scope.scategory + "/" + $scope.stext);
	}
    
    $scope.showInvite = function (invite) {
        var modalInstance = $modal.open({
          templateUrl: "/assets/partials/modal/viewInvite.html",
          controller: "viewInviteController",
          resolve: {
              invite : function () { return invite; }
          }
        });
        
		modalInstance.result.then(function (result) {
			var invite = result.model;
			var index = $scope.invites.indexOf(invite);
			$scope.invites.splice(index, 1);
			refresh_feeds();
						
			if (index > -1) {
				if (result.action == "ACCEPT") {
					$http({ method : "POST", url : "acceptInvite", api : true, data : { id : invite._id }});
				} else if (result.action == "DECLINE") {
                    $http({ method : "POST", url : "declineInvite", api : true, data : { id : invite._id }});
                } else if (result.action == "CLOSE") {
                    $http({ method : "POST", url : "closeInvite", api : true, data : { id : invite._id }});
                } else if (result.action == "PUBLISH") {
				/*
					FB.login(function(){
						FB.api('/me/feed', 'post', {message: $scope.user.fullname + " has joined the \"" + invite.team.name + "\" team on galdraland as " + invite.title});
					}, {scope: 'publish_actions'});*/
                    $http({ method : "POST", url : "closeInvite", api : true, data : { id : invite._id }});
                }
            }
        });
    }
	
	
	$scope.showApply = function (apply) {
        var modalInstance = $modal.open({
          templateUrl: "/assets/partials/modal/viewApply.html",
          controller: "viewApplyController",
          resolve: {
              apply : function () { return apply; }
          }
        });
        
        modalInstance.result.then(function (result) {
			var apply = result.model;
			var index = $scope.applies.indexOf(apply);
			$scope.applies.splice(index, 1);
			refresh_feeds();
			
			if (index > -1) {
				if (result.action == "APPROVE") {
					$http({ method : "POST", url : "approveApply", api : true, data : { id : apply._id }});
				} else if (result.action == "REJECT") {
                    $http({ method : "POST", url : "rejectApply", api : true, data : { id : apply._id }});
                } else if (result.action == "CLOSE") {
                    $http({ method : "POST", url : "closeApply", api : true, data : { id : apply._id }});
                } else if (result.action == "PUBLISH") {
					FB.login(function(){
						FB.api('/me/feed', 'post', {message: $scope.user.fullname + " has joined the \"" + apply.team.name + "\" team on galdraland as " + apply.title});
					}, {scope: 'publish_actions'});
                    $http({ method : "POST", url : "closeApply", api : true, data : { id : apply._id }});
                }
            }
        });
    }    
}]);
