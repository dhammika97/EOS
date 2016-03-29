App.factory('auth',function($rootScope){
	var getUser = function(){
		return sessionStorage.getItem("accessKey")
	}
	$rootScope.accessToken = getUser()
})
