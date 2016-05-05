// JavaScript Document
App.factory('customerDashFactory',function($resource){
	factory = {}
	
	factory.orders = $resource('../api/orders/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	return factory
		
})