app.controller("emailController", ["$scope", "$location", "$http", "User", function ($scope, $location, $http, User) {
    $scope.validate = false;
    $scope.email = User.isLoggedIn().email.email || "";
    $scope.username = User.isLoggedIn().username || "";
    $scope.availableEmail = true;
    $scope.availableUsername = true;

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
            $scope.validate = false;
        } else {
            $scope.validate = true;
        }

        var request = $http.post("/api/validateEmail", { email : $scope.email });
        request.success(function (data) {
            if (!data.find) {
                $scope.availableEmail = true;
            } else {
                $scope.availableEmail = false;
            }
        });
    }

    $scope.saveInformation = function () {
        $scope.error = null;
        $scope.errors = {};
                
        var request = $http({ method : "POST", url : "saveMainInfo", api : true, data : { username : $scope.username, email : $scope.email } });
        request.then(function (r) {
            console.log(r);
            if (r.data.success) {
                User.update(function () {
                    $location.path("/profile");
                });    
            } else {
                $scope.error = r.data.error;
                $scope.errors = r.data.errors;
                console.log($scope.errors);
            }
        });
    }

    $scope.validateUsername = function () {
        $scope.validUsername = false;
        $scope.availableUsername = false;

        if ($scope.username.length == 0) {
            $scope.validateUsername = false;
        } else {
            $scope.validateUsername = true;
        }

        var request = $http.post("/api/validateUsername", {username : $scope.username});
        request.success(function (data) {
            if (!data.find) {
                $scope.availableUsername = true;
            } else {
                $scope.availableUsername = false;
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

    $scope.validateEmail();
    $scope.validateUsername();
}]);