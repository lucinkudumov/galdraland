app.controller("YesAndNoController", ["$scope", "msg", "title", "$modalInstance", function ($scope, msg, title, $modalInstance) {
    $scope.msg = msg;
    $scope.title = title;
    
    $scope.yes = function () {
        $modalInstance.close("YES");
    }
    
    $scope.no = function () {
        $modalInstance.close("NO");
    }
}]);
