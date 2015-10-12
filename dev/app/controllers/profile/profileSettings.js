app.controller("profileSettingsController", ["$scope", "$rootScope", "$location", "$http", "User", function ($scope, $rootScope, $location, $http, User) {
    $scope.username = User.isLoggedIn().username;
    $scope.fullname = User.isLoggedIn().fullname;
    $scope.email = User.isLoggedIn().email.email;
    $scope.location = User.isLoggedIn().location;
    $scope.skype = User.isLoggedIn().skype;
    $scope.goals = User.isLoggedIn().goals;
    $scope.educations = User.isLoggedIn().educations;
    $scope.links = User.isLoggedIn().links;
    $scope.experience = User.isLoggedIn().experience;
    
    $scope.invalidUsername = false;
    $scope.invalidEmail = false;
    
    $scope.checkUsername = function () {
        $scope.invalidUsername = true;
        var request = $http({ method : "POST", url : "validateUsername", api : true, data : { username : $scope.username }});
        request.success(function (data) {
            $scope.invalidUsername = data.find;
        });
    }
    
    $scope.checkEmail = function () {
        $scope.invalidEmail = true;
        var request = $http({ method : "POST", url : "validateEmail", api : true, data : { email : $scope.email }});
        request.success(function (data) {
           $scope.invalidEmail = data.find;
        });
    }
    
    $scope.saveMainInformation = function () {
        var request = $http({ method : "POST", url : "saveMainInformation", api : true,  data : { username : $scope.username, fullname : $scope.fullname, email : $scope.email, location : $scope.location, skype : $scope.skype, goals : $scope.goals }});
        
        request.success(function (data) {
            if (data.success) {
                User.update();
            } 
        });
    }
    
    $scope.goBack = function () {
        $location.path("/profile");
    }
    
    $scope.setType = function (e, type) {
        e.type = type;
    }
    
    $scope.addSchool = function () {
        var e = {};
        e.type = "";
        e.school = {};
        e.school.name = "";
        e.year = {};
        e.year.name = "";
        $scope.educations.push(e);
    }
    
    $scope.validateEducation = function () {
        for (var i = 0; i < $scope.educations.length; i++) {
            var e = $scope.educations[i];
            if (!e.type || !e.school.name || !e.year.name) {
                return true;
            }
        }
        
        return false;
    }
    
    $scope.saveEducations = function () {
        var request = $http({ method : "POST", url : "saveEducations", api : true, data : { educations : $scope.educations }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            } 
        });
    }
    
    $scope.addLink = function () {
        $scope.links.push({ name : "", link : "" });
    }
    
    $scope.validateLinks = function () {
        for (var i = 0; i < $scope.links.length; i++) {
            var l = $scope.links[i];
            
            if (!l.link) {
                return true;
            }
        }
        
        return false;
    }
    
    $scope.saveLinks = function () {
        var request = $http({ method : "POST", url : "saveLinks", api : true, data :  { links : $scope.links }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }
    
    $scope.saveExperience = function () {
        var request = $http({ method : "POST", url : "saveExperience", api : true, data : { experience : $scope.experience }});
        request.success(function (data) {
            if (data.success) {
                User.update();
            }
        });
    }
    
    $scope.removeLink = function (l) {
        var index = $scope.links.indexOf(l);
        if (index >= 0) {
            $scope.links.splice(index, 1);
        }
    }
    
    $scope.removeEducation = function (e) {
        var index = $scope.educations.indexOf(e);
        if (index >= 0) {
            $scope.educations.splice(index, 1);
        }
    }
}]);