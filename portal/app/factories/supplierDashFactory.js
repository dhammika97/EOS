// JavaScript Document
App.factory('supplierDashFactory',function($resource){
	var orders = $resource('../api/orders/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	return orders
		
})

App.factory('updateOrderFactory',function($resource, Notification){
	var factory = {}
	
	var order = $resource('../api/order/:id',{},{
		save: {method: 'POST'},
		update: {method: 'PUT', params: {id: '@id'}}	
	})
	
	factory.updateOrder = function(id, params){
		order.update({id:id},params).$promise.then(function(data){
			Notification.success(data.message);
		},function(data){
			Notification.error(data.data.message);	
		})
	}
	
	return factory
})