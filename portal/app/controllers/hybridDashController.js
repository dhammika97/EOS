// JavaScript Document
controllers.hybridDashController = function($scope, hybridDashFactory){
	
	
	$scope.gridOptions = {
		columnDefs: [
		  { name: 'company', displayName: 'Customer', headerCellClass: 'HeaderStyle1', width: "10%" },
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "10%"},
		  { name: 'order_plant', displayName: 'Plant', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup'},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup'},
		  { name: 'Comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width: "250" },
		  { name: 'order_supplier_status', displayName: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', cellFilter: 'mapSuplierStatus'},
		  { name: 'order_assign_to', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' ,cellClass:'CellClassStyle1' },
		  { name: 'order_assign_date', displayName: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
		  { name: 'order_assigned_by', displayName: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
		  { name: 'order_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
		  ]
		  
		};
		
	hybridDashFactory.query().$promise.then(function(data){
		$scope.gridOptions.data = data.orders	
	});
	
}


//App.controller(controllers)