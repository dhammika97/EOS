App.factory('auth',function($rootScope, $resource){
	
	
	var getUser = function(){
		return sessionStorage.getItem("accessKey")
	}
	
	var userAccess = $resource('../api/access', {}, {
        query: { method: 'GET', params: {}, isArray: false }
    });
	
	/*var factory = {}
	factory._session = {
		data:{
			userName:null,
			userType:null,
			userLastLogin:null
		}
	}
	factory.getAccess = function(params){
		userAccess.query().$promise.then(function(data) {
			 factory._session.data.userName = data.userName
			 factory._session.data.userType = data.userType
			 factory._session.data.userLastLogin = data.lastLogin
		});
	}*/
	
	$rootScope.accessToken = getUser()
	
	return userAccess
})
