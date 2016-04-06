// JavaScript Document
App.factory('customerFactory',function($resource, $location, Notification){
	var factory = {}
	factory.companyList = {}
	
	var partner = $resource('../api/company/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false},
		save: {method: 'POST'}
    });
	
	return partner	
})

App.factory('customerAddFactory',function($resource, $location, Notification){
	var factory = {}
	
	var partner = $resource('../api/company/:id', {}, {
		query: {method: 'GET', params: {}, isArray: false},
		save: {method: 'POST'}
    });
	
	factory.createPartner = function(params){
		partner.save(params).$promise.then(
			function(data){
				Notification.success(data.message);
				document.partnerForm.reset()
				$('input').blur();
			},function(data){
				Notification.error(data.message);	
			}
		)
	}
	
	/*factory.getPartners = function(){
		return partner.query().$promise.then(
			function(data){
				factory.companyList.data = data	
				console.log('calling n retrive')
			}
		)
	}*/
	
	return factory	
})