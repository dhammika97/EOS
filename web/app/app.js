// JavaScript Document
var App = angular.module('heos', ['ngRoute', 'ngResource'])

App.config(function ($routeProvider, $httpProvider) {

    //$httpProvider.defaults.headers.common.Authorization = getUser();

    $routeProvider
            .when('/',
				{
					controller: 'controllers.dashboardController',
					templateUrl: 'app/partials/dashboard_hybrid.html'
				}
            )
			
			.when('/users',
				{
					controller: 'controllers.userController',
					templateUrl: 'app/partials/user_grid.html'
				}
            )
			
			
			.when('/add_new_users',
				{
					controller: 'controllers.addNewUserController',
					templateUrl: 'app/partials/user_new.html'
				}
            )
			
			
			.when('/partners',
				{
					controller: 'controllers.partnerController',
					templateUrl: 'app/partials/partners_grid.html'
				}
            )
			
			
			
			
            .otherwise({
                redirectTo: '/'
            });

})

        /*.run(function ($rootScope, $location, User) {
			//console.log(User)
            // register listener to watch route changes
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if ($rootScope.accessToken == null) {
                    window.location.replace('../')
                }
            });
        })*/

/*var getUser = function () {
    var ArrayCookies = document.cookie.split(';')
    for (i = 0; i < ArrayCookies.length; i++) {
        if (ArrayCookies[i].indexOf('accessKey') != -1) {
            return ArrayCookies[i].substr(ArrayCookies[i].indexOf('=') + 1)
        }
    }
}
*/