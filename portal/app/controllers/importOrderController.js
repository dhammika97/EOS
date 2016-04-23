// JavaScript Document
controllers.importOrderController = function($scope, getOrderDetailsFactory, FileUploader){
	$scope.isHideCustomer = true
	$scope.importData = {}
	if($scope.userCompanyType == 2){
		$scope.isHideCustomer = false	
		$scope.importData.company_id = $scope.userCompanyID
	}
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.uploadCSV()
	}
	
	getOrderDetailsFactory.customers.query().$promise.then(function(data){
		$scope.customers = data.companies
	})
	var uploader = $scope.uploader = new FileUploader({
		url: '../api/include/upload.php'
	})
	$scope.uploadCSV = function(isValid){
		$scope.submitted = true
		if(isValid){
			if(uploader.queue.length !=0){
				uploader.uploadAll()
				uploader.onCompleteItem = function(fileItem, response, status, headers){
					console.log(response)
					//plantAddFactory.createPlant($scope.plant)
					//$scope.submitted = false
					//$scope.location = {}	
				}
					
			}
			
		}
	}
}