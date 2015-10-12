app.directive('ratingWidget', function ($http, User) {
	var rating_dir = {
		restrict: 'AE',
		replace: true,
		scope: {
			ref: '=ref',
			isstatic: '=isstatic',
		},
		template: '<input id="rating-elem" type="number" class="rating" min=0 max=5 step=0.5 data-size="xs">',
		link: function (scope, elem, attrs) {
			scope.user = User.isLoggedIn();
			scope.hoverin = false;
			scope.request_in_process = false;			

			scope.refresh = function(){
				$('#rating-elem').attr('id', 'rating-elem' + scope.ref);
				var request = $http({ method : "POST", url : "getRatingByRefId", api : true, data : { id : scope.ref, fromMe : false }});
				request.success(function (data) {
					scope.myrating = null;
					console.log(data);
					if( !data.success || data.ratings.length == 0 ){
						scope.count = 0;
						scope.average = 0;
					} else {
						var sum = 0;
						for(var i = 0; i < data.ratings.length; i++){
							sum += data.ratings[i].rating;
							if(data.ratings[i].from == scope.user._id) scope.myrating = data.ratings[i];
						}
						
						scope.count = data.ratings.length;
						scope.average = sum / scope.count;
					}
					
					$("#rating-elem" + scope.ref).rating();
					console.log(scope.isstatic + 'asdfasdf');
					if(scope.isstatic){
						$("#rating-elem" + scope.ref).rating('refresh', {"stars":5, "size":'xs', "showClear": false, "readonly": true, starCaptions: function(val) {
							return scope.count + ' ratings, ' + scope.average + ' stars';
						}});
					} else {
						$("#rating-elem" + scope.ref).rating('refresh', {"stars":5, "size":'xs', "showClear": false, starCaptions: function(val) {
							return scope.count + ' ratings, ' + scope.average + ' stars';
						}});
					}
					$("#rating-elem" + scope.ref).rating('update', scope.average);
				});
			}
			
			$('#rating-elem').on('rating.hover', function(event, value, caption, target) {
				if(scope.isstatic) return;
				if(!scope.hoverin){
					$("#rating-elem" + scope.ref).rating('refresh', {"stars":5, "size":'xs', "showClear": false, starCaptions: function(val) {
						return val + ' stars';
					}});
					scope.hoverin = true;
				}
			});
			
			$('#rating-elem').on('rating.hoverleave', function(event, target) {
				if(scope.isstatic) return;
				$("#rating-elem" + scope.ref).rating('refresh', {"stars":5, "size":'xs', "showClear": false, starCaptions: function(val) {
					return scope.count + ' ratings, ' + scope.average + ' stars';
				}});
				$("#rating-elem" + scope.ref).rating('update', scope.average);
				scope.hoverin = false;
			});
			
			$('#rating-elem').on('rating.change', function(event, value, caption) {
				if(scope.isstatic) return;
				if(scope.request_in_process) return;
				scope.request_in_process = true;
				if(scope.myrating == null){
					var request = $http({ method : "POST", url : "insertRating", api : true, data : { ref_id : scope.ref, rating : value }});
				} else {
					var request = $http({ method : "POST", url : "updateRating", api : true, data : { id : scope.myrating._id, rating : value }});
				}				
				request.then(function (result) {
					scope.request_in_process = false;
					scope.refresh();
				});
			});
			
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
	
	return rating_dir;
});