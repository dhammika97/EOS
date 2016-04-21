// JavaScript Document
controllers.addNewOrderController = function($scope, getOrderDetailsFactory){
	$scope.isHideCustomer = true
	$scope.order = {}
	
	$scope.isHideSupplier = true
	
	$scope.minDate = new Date().toString();
	
	if($scope.userCompanyType == 2){
		$scope.isHideCustomer = false	
	}
	if($scope.userCompanyType == 3){
		$scope.isHideSupplier = false
		$scope.order.order_supplier_id = $scope.userCompanyID
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
	
	$scope.setDefaultCustomer = function(){
		if($scope.userCompanyType == 2){
			$scope.order.order_company_id = $scope.userCompanyID
		}
	}
	
	
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.addOrder()
	}
	
	$scope.addOrder = function(isValid){
		$scope.submitted = true
		if(isValid){
			if($scope.userCompanyType == 3){
				$scope.order.order_status = 0
			}else{
				$scope.order.order_status = 1
			}
			//$scope.order.order_status = 1
			getOrderDetailsFactory.saveOrder($scope.order)
			$scope.submitted = false
			$scope.order = {}
		}
	}
}