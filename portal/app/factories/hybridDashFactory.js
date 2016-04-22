// JavaScript Document
App.factory('hybridDashFactory',function($resource){
	var orders = $resource('../api/orders/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false}
    });
	
	return orders
		
})

App.factory('commentFactory',function($resource){
	var factory = {}
	
	var comment = $resource('../api/comment/:id', {}, {
		save: {method: 'POST'}
    });
	
	/*factory.addComment = function(params){
		comment.save(params).$promise.then(function(data){
			Notification.success(data.message);
			//document.locationForm.reset()
			//$('input').blur();	
		},function(data){
			Notification.error(data.data.message);
		})	
	}*/
	
	return comment
})