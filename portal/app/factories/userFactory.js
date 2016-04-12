// JavaScript Document
App.factory('userFactory',function($resource){
	var user = $resource('../api/user/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	return user
})

App.factory('userAddFactory', function($resource, Notification){
	var factory = {}
	
	var user = $resource('../api/user/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false},
		save: {method: 'POST'},
		update: {method: 'PUT', params: {id: '@id'}}
    });
	
	factory.updateUser = function(id, params){
		user.update({id:id},params).$promise.then(function(data){
			Notification.success(data.message);
		},function(data){
			Notification.error(data.data.message);	
		})
	}
	
	factory.createUser = function(params){
		user.save(params).$promise.then(function(data){
			Notification.success(data.message);
			document.userForm.reset()
			$('input').blur();	
		},function(data){
			Notification.error(data.data.message);
		})
	}
	
	return factory
})