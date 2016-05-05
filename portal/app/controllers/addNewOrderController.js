// JavaScript Document
controllers.addNewOrderController = function($scope, getOrderDetailsFactory){
	$scope.isHideCustomer = true
	$scope.order = {}
	
	$scope.isHideSupplier = true
	var date = new Date()
	date.setDate(date.getDate() - 1)
	$scope.minDate = date.toString();
	$scope.arrivalMindate = $scope.minDate
	
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
	
	getOrderDetailsFactory.plants.query().$promise.then(function(data){
		$scope.plants = data.plants
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
	
	$scope.setArrivalMin = function(){
		$scope.arrivalMindate = dateConverter($scope.order.order_pickup_day)
		setArrivalMax()
	}
	var setArrivalMax = function(){
		if($scope.order.order_pickup_day===undefined){
			var tmpMax = new Date()
		}else{
			var tmpMax = dateConverter($scope.order.order_pickup_day)
		}
		varNumDays = 6-tmpMax.getDay()
		tmpMax.setDate(tmpMax.getDate()+varNumDays)
		$scope.arrivalMaxDate = tmpMax.toString()
	}
	var dateConverter = function(date){
		var tmpDate = date.split('/')
		var newDate = tmpDate[1]+'/'+tmpDate[2]+'/'+tmpDate[0]
		return (new Date(newDate))
	}
	setArrivalMax()
}