// JavaScript Document
App.factory('plantFactory',function($resource){
	var plant = $resource('../api/plants/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	return plant
})

App.factory('plantAddFactory',function($resource, Notification){
	var factory = {}
	
	var plant = $resource('../api/plants/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false},
		save: {method: 'POST'},
		update: {method: 'PUT', params: {id: '@id'}}
    });
	
	factory.updatePlant = function(id, params){
		plant.update({id:id},params).$promise.then(function(data){
			Notification.success(data.message);
		},function(data){
			Notification.error(data.data.message);	
		})
	}
	
	factory.createPlant = function(params){
		plant.save(params).$promise.then(function(data){
			Notification.success(data.message);
			document.plantForm.reset()
			$('input').blur();	
		},function(data){
			Notification.error(data.data.message);
		})	
	}
	
	return factory
})