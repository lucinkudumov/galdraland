app.factory('middleware', function() {
    return {
        request: function(config) {
            if (config.api) {
                config.url = "/api/" + config.url;
            }
            
            return config;
        }
    };
});