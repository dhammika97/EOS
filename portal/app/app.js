// JavaScript Document
var App = angular.module('heos', [
	'ngRoute', 
	'ngResource',
	'ngSanitize',
	'ui.grid',
	'ui.grid.edit',
	'ui.grid.rowEdit', 
	'ui.grid.cellNav',
	'ui.grid.resizeColumns',
	'ui.grid.cellNav',
	'ui-notification',
	'720kb.datepicker',
	'vesparny.fancyModal',
	'angularFileUpload',
	'angular-loading-bar'
])
	
window.routes =
{
    "/": {
        templateUrl: 'app/partials/dashboard/dashboard_hybrid.html', 
        controller: 'hybridDashController', 
        requireLogin: true,
		accessType:1
	},
	"/customer-landing": {
        templateUrl: 'app/partials/dashboard/dashboard_customer.html', 
        controller: 'customerDashController', 
        requireLogin: true,
		accessType:2
	},
	"/supplier-landing": {
        templateUrl: 'app/partials/dashboard/dashboard_supplier.html', 
        controller: 'supplierDashController', 
        requireLogin: true,
		accessType:3
	},
    "/users": {
        templateUrl: 'app/partials/user/user_grid.html', 
        controller: 'userController', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-user": {
        templateUrl: 'app/partials/user/user_new.html', 
        controller: 'userController', 
        requireLogin: true,
		accessType:1
    },
    "/customers": {
        templateUrl: 'app/partials/customer/customers_grid.html', 
        controller: 'customerController', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-customer": {
        templateUrl: 'app/partials/customer/customer_add.html', 
        controller: 'addCustomerController', 
        requireLogin: true,
		accessType:1
    }/*,
	"/suppliers": {
        templateUrl: 'app/partials/suppliers_grid.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    }*/,
	"/locations": {
        templateUrl: 'app/partials/location/locations_grid.html', 
        controller: 'locationController', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-location": {
        templateUrl: 'app/partials/location/location_add.html', 
        controller: 'locationAddController', 
        requireLogin: true,
		accessType:1
    },/*,
	"/logistics": {
        templateUrl: 'app/partials/partners_grid.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    }*/
	"/plants": {
        templateUrl: 'app/partials/plant/plants_grid.html', 
        controller: 'plantController', 
        requireLogin: true,
		accessType:1
    },
	"/add-new-plant": {
        templateUrl: 'app/partials/plant/plant_add.html', 
        controller: 'plantAddController', 
        requireLogin: true,
		accessType:1
    },
    "/accounts": {
        templateUrl: 'app/partials/accounts/accounts_wrapper.html', 
        controller: '', 
        requireLogin: true,
		accessType:1
    },
    "/add-new-order": {
        templateUrl: 'app/partials/orders/add_new_order.html', 
        controller: 'addNewOrderController', 
        requireLogin: true,
		accessType:1
    },
	"/add-new-order-customer": {
        templateUrl: 'app/partials/orders/add_new_order_customer.html', 
        controller: 'addNewOrderController', 
        requireLogin: true
    },
	"/add-new-order-supplier": {
        templateUrl: 'app/partials/orders/add_new_order_supplier.html', 
        controller: 'addNewOrderController', 
        requireLogin: true
    },
    "/import-orders": {
        templateUrl: 'app/partials/orders/import_orders.html', 
        controller: 'importOrderController', 
        requireLogin: true
    },
    "/change-password": {
        templateUrl: 'app/partials/my_profile/change_password.html', 
        controller: 'changePasswordController', 
        requireLogin: true
    },
    "/my-profile": {
        templateUrl: 'app/partials/my_profile/my_profile.html', 
        controller: 'myProfileController', 
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
		//console.log('init' + new Date())
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
.service('Common', function () {
    return {};
})
.config(function(NotificationProvider) {
	NotificationProvider.setOptions({
		/*delay: 200000,
		startTop: 20,
		startRight: 10,
		verticalSpacing: 20,
		horizontalSpacing: 20,
		positionX: 'left',*/
		positionY: 'bottom'
	});
})
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.latencyThreshold = 100;
}])
/*var getUser = function () {
    var ArrayCookies = document.cookie.split(';')
    for (i = 0; i < ArrayCookies.length; i++) {
        if (ArrayCookies[i].indexOf('accessKey') != -1) {
            return ArrayCookies[i].substr(ArrayCookies[i].indexOf('=') + 1)
        }
    }
}*/