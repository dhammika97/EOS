// JavaScript Document
App.factory('hybridDashFactory',function($resource){
	var orders = $resource('../api/orders/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	return orders
		
})