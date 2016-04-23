// JavaScript Document
App.factory('importOrderFactory',function($resource, Notification){
	var factory = {}
	
	var orders = $resource('../api/batch_import/:id',{},{
		save: {method: 'POST'}
	})
	
	factory.importFile = function(params){
		orders.save(params).$promise.then(function(data){
			Notification.success(data.message);
			document.importForm.reset()
			$('input').blur();
		},function(data){
			Notification.success(data.data.message);
		})
	}
	
	return factory
})