// JavaScript Document
controllers.importOrderController = function($scope, getOrderDetailsFactory, FileUploader, importOrderFactory, tmpDataFactory){
	$scope.isHideCustomer = true
	$scope.isDisabled = true
	$scope.importData = {}
	
	$scope.GridOptions = {
		columnDefs: [
		  { name: 'order_supplier_name', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "15%"},
		  { name: 'order_plant', displayName: 'Consignee', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80'},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80'}
		  ]
		  
	};
	
	
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
					$scope.importData.file_name=response.file_name
					tmpDataFactory.save($scope.importData).$promise.then(function(data){
						$scope.submitted = false
						$scope.importData = {}
						$scope.GridOptions.data=data.batch
						$scope.isDisabled = false
					})
				}
					
			}
			
		}
	}
	
	$scope.saveAll = function(){
		//console.log($scope.GridOptions.data)
		importOrderFactory.importFile($scope.GridOptions.data)
		$scope.isDisabled = true
	}
	
	$scope.cancelAll = function(){
		$scope.GridOptions.data=''
		window.location.replace('../portal/import-orders')
	}
}