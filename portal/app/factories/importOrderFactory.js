// JavaScript Document
App.factory('importOrderFactory',function($resource, Notification){
	var factory = {}
	
	var orders = $resource('../api/batch_import/:id',{},{
		save: {method: 'POST'}
	})
	
	factory.importFile = function(params){
		return orders.save(params)
	}
	
	return factory
})

App.factory('tmpDataFactory',function($resource, Notification){
	
	var orders = $resource('../api/batch_import/:id',{},{
		save: {method: 'POST'}
	})
	
	return orders
})
