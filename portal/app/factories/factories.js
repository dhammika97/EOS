App.factory('auth',function($rootScope, $resource){
	
	
	var getUser = function(){
		return sessionStorage.getItem("accessKey")
	}
	
	var userAccess = $resource('../api/access', {}, {
        query: { method: 'GET', params: {}, isArray: false }
    });
	
	var factory = {}
	factory._session = {
		data:{
			userName:null,
			userType:null
		}
	}
	factory.getAccess = function(params){
		userAccess.query().$promise.then(function(data) {
			 factory._session.data.userName = data.userName
			 factory._session.data.userType = data.userType
		});
	}
	
	$rootScope.accessToken = getUser()
	
	return factory
})
