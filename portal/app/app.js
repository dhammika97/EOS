// JavaScript Document
var App = angular.module('heos', [
	'ngRoute', 
	'ngResource',
	'ngSanitize',
	'ui.grid',
	'ui.grid.edit'
])

window.routes =
{
    "/": {
        templateUrl: 'app/partials/dashboard_hybrid.html', 
        controller: 'hybridDashController', 
        requireLogin: true,
		accessType:1
	},
	"/customer-landing": {
        templateUrl: 'app/partials/dashboard_customer.html', 
        controller: 'customerDashController', 
        requireLogin: true,
		accessType:2
	},
	"/supplier-landing": {
        templateUrl: 'app/partials/dashboard_supplier.html', 
        controller: 'supplierDashController', 
        requireLogin: true,
		accessType:3
	},
    "/users": {
        templateUrl: 'app/partials/user_grid.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-user": {
        templateUrl: 'app/partials/user_new.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    },
    "/customers": {
        templateUrl: 'app/partials/customers_grid.html', 
        controller: 'customerDashController', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-customer": {
        templateUrl: 'app/partials/customer_add.html', 
        controller: 'addCustomerController', 
        requireLogin: true,
		accessType:1
    },
	"/suppliers": {
        templateUrl: 'app/partials/suppliers_grid.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-supplier": {
        templateUrl: 'app/partials/supplier_add.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    },
	"/logistics": {
        templateUrl: 'app/partials/partners_grid.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-order": {
        templateUrl: 'app/partials/add_new_order.html', 
        controller: '', 
        requireLogin: true
    }
};

App.config(function ($routeProvider, $httpProvider, $locationProvider) {
    //$httpProvider.defaults.headers.common.Authorization = getUser();
	$httpProvider.defaults.headers.common.Authorization = sessionStorage.getItem("accessKey");
	
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
	$routeProvider.otherwise({
		redirectTo:'/'
	});
	$locationProvider.html5Mode(true);
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
					}else if(window.routes[i].accessType == null){
						$location.path(i)
					}else if(!window.routes[i].accessType === userType){
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