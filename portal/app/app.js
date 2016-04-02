// JavaScript Document
var App = angular.module('heos', ['ngRoute', 'ngResource'])

window.routes =
{
    "/": {
        templateUrl: 'app/partials/dashboard_hybrid.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
	},
	"/customer-landing": {
        templateUrl: 'app/partials/dashboard_customer.html', 
        controller: '', 
        requireLogin: true,
		accessType:2
	},
	"/supplier-landing": {
        templateUrl: 'app/partials/dashboard_supplier.html', 
        controller: '', 
        requireLogin: true,
		accessType:3
	},
    "/users": {
        templateUrl: 'app/partials/user_grid.html', 
        controller: 'controllers.userController', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-users": {
        templateUrl: 'app/partials/user_new.html', 
        controller: 'controllers.userController', 
        requireLogin: true,
		accessType:1
    },
    "/partners": {
        templateUrl: 'app/partials/partners_grid.html', 
        controller: 'controllers.partnerController', 
        requireLogin: true,
		accessType:1
    }
};

App.config(function ($routeProvider, $httpProvider) {
    //$httpProvider.defaults.headers.common.Authorization = getUser();
	$httpProvider.defaults.headers.common.Authorization = sessionStorage.getItem("accessKey");
	//$locationProvider.html5Mode(true);
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
	$routeProvider.otherwise({
		//redirectTo:'/'
	});

})
.run(function ($rootScope, $location, auth) {
	// register listener to watch route changes
	var userType = sessionStorage.getItem("type")
	$rootScope.$on("$locationChangeStart", function (event, next, current) {
		for(var i in window.routes) {
			if(next.indexOf(i.split('/')[1]) != -1) {
				if (window.routes[i].requireLogin && $rootScope.accessToken == null ) {
					window.location.replace('../')
				}else{
					if(i=='/' && window.routes[i].accessType != userType){
						if(userType==2)						
						$location.path('/customer-landing')
						else if(userType == 3)
						$location.path('/supplier-landing')
					}else if(i=='/customer-landing' && window.routes[i].accessType != userType){
						if(userType==1)						
						$location.path('/')
						else if(userType == 3)
						$location.path('/supplier-landing')
					}else if(i=='/supplier-landing' && window.routes[i].accessType != userType){
						if(userType==1)						
						$location.path('/')
						else if(userType == 2)
						$location.path('/customer-landing')
					}else if(window.routes[i].accessType != userType){
						if(userType == 2)
						$location.path('/customer-landing')
						else if(userType == 3)
						$location.path('/supplier-landing')
					}
				}
			}
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