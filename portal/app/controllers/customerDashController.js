// JavaScript Document
controllers.customerDashController = function($scope, locationFactory, customerDashFactory, Notification, updateOrderFactory){
	$scope.gridOptions = {
		columnDefs: [
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "15%", enableCellEdit: false},
		  { name: 'order_plant', displayName: 'Plant', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80', enableCellEdit: false},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80', enableCellEdit: false},
		  { name: 'order_comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width: "250" , enableCellEdit: false},
		  { name: 'order_supplier_status', displayName: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', cellFilter: 'mapSuplierStatus', enableCellEdit: false},
		  { name: 'order_assign_to', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' ,cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'order_assign_date', displayName: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'order_assigned_by', displayName: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false},
		  { name: 'order_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', 
		  	cellFilter: 'mapOrderStatus',
		  	editDropdownOptionsArray: [
				{ id: 1, status: 'Accepted' },
				{ id: 2, status: 'Pending' },
				{ id: 3, status: 'Canceled' },
				{ id: 4, status: 'Closed' }
			],
			editableCellTemplate: 'ui-grid/dropdownEditor',
			editDropdownValueLabel: 'status', 
			editDropdownIdLabel: 'id'}
		  ]
		  
	};
	
	var curr = new Date;
	var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
	var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
	//$scope.currentWeek = week.getMonth()+1+'/'+week.getDate()+'/'+week.getFullYear()
	$scope.firstDate = firstday.getFullYear()+'-'+(firstday.getMonth()+1)+'-'+firstday.getDate()
	$scope.lastDate = lastday.getFullYear()+'-'+(lastday.getMonth()+1)+'-'+lastday.getDate()
	
	locationFactory.query().$promise.then(function(data){
		$scope.locationsList = data.locations
		$scope.countryFilter = 0
		
		customerDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);
			$scope.noData = true;	
		});
	})

	
	$scope.getCountryFiltered = function(){
		customerDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID, 'order_location_id':$scope.countryFilter}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);	
			$scope.noData = true;
		});	
	}
	
	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
			if(newValue != oldValue){
				var tmpVar = '{"'+colDef.name+'":"'+newValue+'"}'
				var obj = JSON.parse(tmpVar)
				updateOrderFactory.updateOrder(rowEntity.order_id,obj)
			}
		});
	}
	//'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID
	//'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID
	//'order_location_id':$scope.countryFilter,
}