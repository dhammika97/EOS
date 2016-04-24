// JavaScript Document
App.factory('myProfileFactory',function($resource, Notification){
	var factory = {}
	
	var profile = $resource('../api/profile/:id', {}, {
		update: {method: 'PUT', params: {id: '@id'}},
		get: { method: 'GET' }
    });
	
	factory.getUser=function(){
		return profile.get()
	}
	
	factory.updateUser=function(params){
		profile.update(params).$promise.then(function(data){
			Notification.success(data.message);
			$('input').blur();
		},function(data){
			Notification.error(data.data.message);
			$('input').blur();
		})
	}
	
	return factory
})

App.factory('changePassFactory',function($resource, Notification){
	var factory = {}
	var password = $resource('../api/password/:id', {}, {
		update: {method: 'PUT', params: {id: '@id'}},
    });
	
	factory.changePassword=function(params){
		password.update(params).$promise.then(function(data){
			Notification.success(data.message);
			$('input').blur();
		},function(data){
			Notification.error(data.data.message);
			$('input').blur();
		})
	}
	return factory
})