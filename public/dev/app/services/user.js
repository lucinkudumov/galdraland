app.factory("User", ["$http", "$cookieStore", "$q", function ($http, $cookieStore, $q) {
    var user = $cookieStore.get("user");
    return {
        isLoggedIn : function () {
             return $cookieStore.get("user");
        },
        logout: function () {
            user = null;
            $cookieStore.remove("user");
        },
        update : function (cb) {
            $http.get("/api/getUser").success(function (data) {
                $cookieStore.remove("user");
                $cookieStore.put("user", data.user);
            });

			if(cb) cb();
        }
    }
}]);
