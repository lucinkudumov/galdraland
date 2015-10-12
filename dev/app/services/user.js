app.factory("User", ["$http", "$cookieStore", function ($http, $cookieStore) {
    var user = $cookieStore.get("user");
    return {
        isLoggedIn : function () {
            return  $cookieStore.get("user");
        },
        logout: function () {
            user = null;
            $cookieStore.remove("user");
        },
        update : function () {
            $http.get("/api/getUser").success(function (data) {
               $cookieStore.remove("user");
               $cookieStore.put("user", data.user);
               user = data.user;
            });
        }
    }
}]);
