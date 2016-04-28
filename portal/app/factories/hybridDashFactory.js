// JavaScript Document
App.factory('hybridDashFactory',function($resource){
	
	factory = {}
	
	factory.orders = $resource('../api/orders/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	factory.carriers = $resource('../api/carriers/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	return factory
		
})

App.factory('commentFactory',function($resource){
	var factory = {}
	
	var comment = $resource('../api/comment/:id', {}, {
		save: {method: 'POST'}
    });
	
	return comment
})

App.factory('orderDetailFactory',function($resource){
	var order = $resource('../api/orders/:id', {}, {
		get: { method: 'GET', params: { id: '@id' } }
    })	
	
	/*factory.getOrderDetails = function(id){
		order.get({id:id}).$promise.then(function(e){
			console.log(e.orders)
			$scope.product = e.orders.order_product
		})
	}*/
	return order
})