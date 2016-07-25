app.controller("adventureViewController", ["$scope", "$http", "$stateParams", "$sce", "User", "$modal", "$location", function ($scope, $http, $stateParams, $sce, User, $modal, $location) {
    $scope.user = User.isLoggedIn();
    
    $scope.refresh = function () {
        var request = $http({ method : "POST", url : "adventure/get", api : true, data : { id : $stateParams.id }});
        request.success(function (data) {
            if (data.adventure.description && data.adventure.description != "") {
                var find = "\n";
                var re = new RegExp(find, 'g');
                data.adventure.description = $sce.trustAsHtml(data.adventure.description.replace(re,"<br>"));
            }
            $scope.adventure = data.adventure;
            $scope.isManager = data.adventure.owner == $scope.user._id;
        });
    }
    
    $scope.modal = function () {
        var modalInstance = $modal.open({
          templateUrl: '/assets/partials/modal/yesandno.html',
          controller: "YesAndNoController",
          resolve: {
            msg: function () { return "Do you want to remove \"" + $scope.adventure.name + "\" adventure?" },
            title : function () { return "Remove \"" + $scope.adventure.name + "\"" }
          }
        });
        
        modalInstance.result.then(function (result) {
            if (result == "YES") {
                var request = $http({ method : "POST", url : "adventure/remove", api : true, data : { id : $scope.adventure._id }});
                request.success(function () {
                    $location.path("/adventures");
                });
            }
        });
        
        return false;
    }

    $scope.refresh();
}]);
