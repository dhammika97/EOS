// JavaScript Document
App.factory('locationFactory',function($resource){
	var location = $resource('../api/locations/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	return location
})

App.factory('locationAddFactory',function($resource, Notification){
	var factory = {}
	
	var location = $resource('../api/locations/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false},
		save: {method: 'POST'},
		update: {method: 'PUT', params: {id: '@id'}}
    });
	
	factory.updateLocation = function(id, params){
		location.update({id:id},params).$promise.then(function(data){
			Notification.success(data.message);
		},function(data){
			Notification.error(data.data.message);	
		})
	}
	
	factory.createLocation = function(params){
		location.save(params).$promise.then(function(data){
			Notification.success(data.message);
			document.locationForm.reset()
			$('input').blur();	
		},function(data){
			Notification.error(data.data.message);
		})	
	}
	
	return factory
})