// JavaScript Document
controllers.addNewOrderController = function($scope, getOrderDetailsFactory){
	$scope.isHideCustomer = false
	if($scope.userCompanyType == 2){
		$scope.isHideCustomer = true	
	}
	
	getOrderDetailsFactory.suppliers.query().$promise.then(function(data){
		$scope.companies = data.companies	
	})
	getOrderDetailsFactory.locations.query().$promise.then(function(data){
		$scope.locations = data.locations	
	})
	
	getOrderDetailsFactory.customers.query().$promise.then(function(data){
		$scope.customers = data.companies	
	})
}