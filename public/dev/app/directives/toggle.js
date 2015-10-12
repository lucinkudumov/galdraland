app.directive("uiToggle", function () {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.click(function (e) {
                e.preventDefault();
                return false;
            });              
        }
    };
});
