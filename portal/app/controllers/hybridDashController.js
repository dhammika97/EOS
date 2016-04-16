// JavaScript Document
controllers.hybridDashController = function($scope, hybridDashFactory, locationFactory, Notification){
	
	$scope.gridOptions = {
		columnDefs: [
		  { name: 'company', displayName: 'Customer', headerCellClass: 'HeaderStyle1', width: "12%" },
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "12%"},
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
		  { name: 'order_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', cellFilter: 'mapOrderStatus'},
		  ]
		  
		};
	
	locationFactory.query().$promise.then(function(data){
		$scope.locationsList = data.locations
		$scope.countryFilter = 0
		hybridDashFactory.query({'order_location_id':$scope.countryFilter}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders	
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);	
		});
	})
	
	$scope.getCountryFiltered = function(){
		hybridDashFactory.query({'order_location_id':$scope.countryFilter}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders	
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);	
		});	
	}
	
}


//App.controller(controllers)