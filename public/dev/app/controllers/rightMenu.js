app.controller("rightMenuController", ["$scope", "$location", function ($scope, $location) {
    $scope.go = function (url) {
        $location.path(url);
    }
}]);