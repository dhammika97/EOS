// JavaScript Document
App.factory('getOrderDetailsFactory',function($resource, Notification){
	var factory = {}
	
	factory.suppliers = $resource('../api/supplier/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	factory.locations = $resource('../api/locations/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	factory.customers = $resource('../api/customers/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	var orders = $resource('../api/orders/:id',{},{
		query: {method: 'GET', params: {}, isArray: false},
		save: {method: 'POST'},
		update: {method: 'PUT', params: {id: '@id'}}	
	})
	
	factory.saveOrder = function(params){
		orders.save(params).$promise.then(function(data){
			Notification.success(data.message);
			document.orderForm.reset()
			$('input').blur();
		},function(data){
			Notification.success(data.data.message);
		})
	}
	
	return factory
})