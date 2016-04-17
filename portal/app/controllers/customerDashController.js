// JavaScript Document
controllers.customerDashController = function($scope, locationFactory, customerDashFactory, Notification){
	$scope.gridOptions = {
		columnDefs: [
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "15%"},
		  { name: 'order_plant', displayName: 'Plant', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80'},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80'},
		  { name: 'Comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width: "200" },
		  { name: 'order_supplier_status', displayName: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', cellFilter: 'mapSuplierStatus'},
		  { name: 'order_assign_to', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' ,cellClass:'CellClassStyle1' },
		  { name: 'order_assign_date', displayName: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
		  { name: 'order_assigned_by', displayName: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
		  { name: 'order_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', cellFilter: 'mapOrderStatus'}
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
		console.log($scope.countryFilter)
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
	//'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID
	//'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID
	//'order_location_id':$scope.countryFilter,
}