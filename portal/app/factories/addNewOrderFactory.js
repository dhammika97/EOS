// JavaScript Document
App.factory('getOrderDetailsFactory',function($resource){
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
	
	/*factory.getSuppliers = function(){
		suppliers.query().$promise.then(function(data){
			console.log(data.companies)
		})	
	}*/
	
	return factory
})