app.controller("indexController", ["$scope", "$location", "$window", "$stateParams", function ($scope, $location, $window, $stateParams) {
	$scope.r = "";
	var search = $location.search();
	if(search !== null ) $scope.r = search.r;
}]);
