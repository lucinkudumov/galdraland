app.controller("emailController", ["$scope", "$location", "$http", "User", function ($scope, $location, $http, User) {
    $scope.validate = false;
    $scope.email = User.isLoggedIn().email.email;
    
    if ($scope.email) {
        $scope.validate = true;
    }
    
    $scope.validateEmailFormat = function (email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 
    
    $scope.validateEmail = function () {
        $scope.validate = false;
        $scope.availableEmail = false;
        
        
        if (!$scope.validateEmailFormat($scope.email)) {
            $scope.formatError = true;
            return false;
        } else {
            $scope.formatError = false;
        }
        
        
        var request = $http.post("/api/validateEmail", { email : $scope.email });
        request.success(function (data) {
            if (!data.find) {
                $scope.validate = true;
            } else {
                $scope.validate = false;
                $scope.availableEmail = false;
            }
        });
    }    
    
    $scope.saveEmail = function () {
        var request = $http.post("/api/saveEmail", { email : $scope.email });
        request.success(function (data) {
            User.update();
            $location.path("/profile");
        });
    }
}]);