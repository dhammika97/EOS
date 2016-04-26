// JavaScript Document
App.factory('importOrderFactory',function($resource, Notification,$location){
	var factory = {}
	
	var orders = $resource('../api/batch_import/:id',{},{
		save: {method: 'POST'}
	})
	
	var saveBatch = $resource('../api/batch_save/:id',{},{
		save: {method: 'POST'}
	})
	
	
	factory.importFile = function(params){
		saveBatch.save(params).$promise.then(function(data){
			Notification.success(data.message)
			$location.path('/')
		})
	}
	
	factory.exportData = function(params){
		return 
	}
	
	return factory
})

App.factory('tmpDataFactory',function($resource, Notification){
	
	var orders = $resource('../api/batch_import/:id',{},{
		save: {method: 'POST'}
	})
	
	return orders
})

