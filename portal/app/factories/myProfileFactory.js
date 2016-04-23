// JavaScript Document
App.factory('myProfileFactory',function($resource){
	var factory = {}
	
	var profile = $resource('../api/userMe/:id', {}, {
		update: {method: 'PUT', params: {id: '@id'}},
		get: { method: 'GET', params: { id: '@id' } }
    });
	
	factory.getUser=function(){
		return profile.get()
	}
	
	return factory
})