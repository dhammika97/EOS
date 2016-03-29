// JavaScript Document
var App = angular.module('heos', ['ngRoute', 'ngResource'])

window.routes =
{
    "/": {
        templateUrl: 'app/partials/dashboard_hybrid.html', 
        controller: '', 
        requireLogin: true
	},
    "/users": {
        templateUrl: 'app/partials/user_grid.html', 
        controller: 'controllers.userController', 
        requireLogin: true
    },
    "/add-new-users": {
        templateUrl: 'app/partials/user_new.html', 
        controller: 'controllers.userController', 
        requireLogin: true
    },
    "/partners": {
        templateUrl: 'app/partials/partners_grid.html', 
        controller: 'controllers.partnerController', 
        requireLogin: true
    }
};

App.config(function ($routeProvider, $httpProvider) {
    //$httpProvider.defaults.headers.common.Authorization = getUser();
	$httpProvider.defaults.headers.common.Authorization = sessionStorage.getItem("accessKey");
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
	$routeProvider.otherwise({
		redirectTo:'/'
	});

})
.run(function ($rootScope, $location, auth) {
	// register listener to watch route changes
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		if (sessionStorage.getItem("accessKey") == null) {
			//window.location.replace('../')
		}
	});
})
/*var getUser = function () {
    var ArrayCookies = document.cookie.split(';')
    for (i = 0; i < ArrayCookies.length; i++) {
        if (ArrayCookies[i].indexOf('accessKey') != -1) {
            return ArrayCookies[i].substr(ArrayCookies[i].indexOf('=') + 1)
        }
    }
}*/