// JavaScript Document
App.factory('myProfileFactory',function($resource){
	var factory = {}
	
	var profile = $resource('../api/getMe/:id', {}, {
		update: {method: 'PUT', params: {id: '@id'}},
		get: { method: 'GET' }
    });
	
	factory.getUser=function(){
		return profile.get()
	}
	
	return factory
})