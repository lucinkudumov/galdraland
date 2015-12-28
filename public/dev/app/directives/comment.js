app.directive('commentWidget', function ($http, User) {
	var comment_dir = {
		restrict: 'AE',
		replace: true,
		scope: {
			ref: '=ref',
		},
		template: '<div class="row"><div class="user-container"><h4>Comments</h4><hr></div><div id="dv1"><ul><li ng-repeat="comnt in comments"> <img src="{{ comnt.from.photo }}" style="width:50px;height:50px;">{{comnt.from.fullname}}: {{ comnt.comment }} </li></ul>Post your Comment<textarea ng-model="txtcomment" placeholder="Your Comment" style="width:550px"></textarea><button ng-click="save();" style="margin-top:10px;">Post Comment</button></div></div>',
		link: function (scope, elem, attrs) {
			scope.comment = [];
			scope.user = User.isLoggedIn();
			scope.request_in_process = false;			

			scope.refresh = function(){
				var request = $http({ method : "POST", url : "getCommentByRefId", api : true, data : { id : scope.ref, fromMe : false }});
				request.success(function (data) {
					console.log(data);
					if( !data.success || data.comments.length == 0 ){
						scope.comments = [];
					} else {
						scope.comments = data.comments;
						console.log(scope.comments);						
					}
				});
			}
			
			scope.save = function(){
				if(scope.request_in_process) return;
				scope.request_in_process = true;
				
				var request = $http({ method : "POST", url : "insertComment", api : true, data : { ref_id : scope.ref, comment : scope.txtcomment }});
				request.then(function (result) {
					scope.request_in_process = false;
					scope.refresh();
				});
			}
			
			scope.$watch('ref', function (newValue, oldValue) {
				if( newValue !== undefined && newValue !== null ){
					scope.ref = newValue;
					scope.refresh();
				}
			});
			
			if( scope.ref !== undefined && scope.ref !== null )
				scope.refresh();
		}
	};
	
	return comment_dir;
});