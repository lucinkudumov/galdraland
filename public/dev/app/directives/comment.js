app.directive('commentWidget', function ($http, User) {
	var comment_dir = {
		restrict: 'AE',
		replace: true,
		scope: {
			ref: '=ref',
            ismanager: '=ismanager',
		},
        template: '<div class="row">' +
//            '<div class="user-container"><h4>Comments</h4><hr></div>' +
            '<div id="dv1">' +
            '<div ng-repeat="comnt in comments">' +
            '<table width="100%"><tr>' +
            '<td width="50px;"><img src="{{ comnt.from.photo }}" style="width:50px;height:50px;"></td>' +
            '<td style="text-align: left;"><p style="margin-left:10px; word-wrap: break-word; word-break: break-word;">{{comnt.from.fullname}}</p><p style="margin-left:10px; word-wrap: break-word; word-break: break-word;"> {{ comnt.createdAt | date : ' + '"yyyy-MM-dd HH:mm:ss"' + ' }}</p><p style="margin-left:10px; word-wrap: break-word; word-break: break-word;">{{ comnt.comment }}</p> <p ng-show="ismanager" style="margin-left:10px; word-wrap: break-word; word-break: break-word;">({{ comnt.status }})</p></td>' +
            '<td ng-show="ismanager" width="50px;">' +
            '<a class="btn btn-primary" style="float: left;" ng-click="cmt_approve(comnt._id)">Approve</a>' +
            '<a class="btn btn-danger" style="float: left;" ng-click="cmt_reject(comnt._id)">Reject</a>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '</div>' +
            '<div class="user-container"><h4>Post your comment</h4><hr></div><div class="row" style="width:100%"><textarea ng-model="txtcomment" placeholder="Your Comment" style="width:100%;display:block;"></textarea><button ng-click="save();" style="margin-top:10px;float:right;">Post Comment</button></div></div>',
		link: function (scope, elem, attrs) {
			scope.comment = [];
			scope.user = User.isLoggedIn();
			scope.request_in_process = false;

            scope.refresh = function () {
                console.log("id = " + scope.ref);
                console.log("isManager = " + scope.ismanager);
                console.log("owner = " + scope.user._id);
                var request = $http({method: "POST", url: "getCommentByRefId", api: true, data: {id: scope.ref, fromMe: false, isManager : scope.ismanager, owner: scope.user._id}});
                request.success(function (data) {
                    if (!data.success || data.comments.length == 0) {
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