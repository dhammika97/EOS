// JavaScript Document
controllers.supplierDashController = function($scope){
	var myData = [
		{
			"Customer": "Magna",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "13 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Product": "",
			"Skid Count": "",
			"Dimension": "",
			"Freight Class": "",
			"Stackable": "",
			"Weight": "",
			"Status": "PENDING",
		},
		{
			"Customer": "Magna",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "13 April 2016",
			"Arrival Date": "18 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Product": "",
			"Skid Count": "",
			"Dimension": "",
			"Freight Class": "",
			"Stackable": "",
			"Weight": "",
			"Status": "PENDING",
		}
	];
	
	$scope.gridOptions = {
		columnDefs: [
			  { field: 'Customer', headerCellClass: 'HeaderStyle1', width: "10%",    },
			  { field: 'Plant', headerCellClass: 'HeaderStyle1' },
			  { field: 'Pick-Up', headerCellClass: 'HeaderStyle1' },
			  { field: 'Pick-Up Date', headerCellClass: 'HeaderStyle1' },
			  { field: 'Arrival Date', headerCellClass: 'HeaderStyle1' },
			  { field: 'Stack', headerCellClass: 'HeaderStyle1' },
			  { field: 'Comments', headerCellClass: 'HeaderStyle1' },
			  { field: 'Product', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { field: 'Skid Count', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { field: 'Dimension', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { field: 'Freight Class', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { field: 'Stackable', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
			  { field: 'Weight', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
			  { field: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold'},
			  ]		  
		};
	$scope.gridOptions.data = myData;
	
}