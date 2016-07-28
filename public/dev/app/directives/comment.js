app.directive('commentWidget', function ($http, User) {
	var comment_dir = {
		restrict: 'AE',
		replace: true,
		scope: {
			ref: '=ref',
            ismanager: '=ismanager',
		},
        template: '<div class="row">' +
            '<div class="user-container"><h4>Comments</h4><hr></div>' +
            '<div id="dv1">' +
            '<ul>' +
            '<li ng-repeat="comnt in comments"> ' +
            '<img src="{{ comnt.from.photo }}" style="width:50px;height:50px;"><span  style="width:350px;">{{comnt.from.fullname}}: {{ comnt.comment }}</span>' +
            '<span ng-show="ismanager" style="width:350px;">' +
            '<a class="btn btn-danger" style="float: right;">Reject</a>' +
            '<a class="btn btn-primary" style="float: right;">Approve</a>' +
            '</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="user-container"><h4>Post your comment</h4><hr></div><div class="row" style="width:100%"><textarea ng-model="txtcomment" placeholder="Your Comment" style="width:100%;display:block;"></textarea><button ng-click="save();" style="margin-top:10px;float:right;">Post Comment</button></div></div>',
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

            scope.$watch('ismanager', function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== null) {
                    scope.ismanager = newValue;
                    scope.refresh();
                }
            });

            if (scope.ref !== undefined && scope.ref !== null && scope.ismanager !== undefined && scope.ismanager !== null)
                scope.refresh();

            scope.cmt_reject = function (cmtId) {
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;

                var request = $http({method: "POST", url: "updateStatus", api: true, data: {id: cmtId, status: "REJECT"}});
                request.then(function (result) {
                    scope.request_in_process = false;
                    scope.refresh();
                });
            }

            scope.cmt_approve = function (cmtId) {
                if (scope.request_in_process)
                    return;
                scope.request_in_process = true;

                var request = $http({method: "POST", url: "updateStatus", api: true, data: {id: cmtId, status: "APPROVE"}});
                request.then(function (result) {
                    scope.request_in_process = false;
                    scope.refresh();
                });
            }
		}
	};
	
	return comment_dir;
});