// JavaScript Document
controllers.customerDashController = function($scope, $location){
	
	var myData = [
		{
			"Customer": "Magna",
			"Supplier Canada": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "05 April 2016",
			"Arrival Date": "13 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "Magna 111",
			"Supplier Canada": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "12 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		}
	];
	
	$scope.gridOptions = {
		columnDefs: [
      { field: 'Customer', headerCellClass: 'HeaderStyle1', width: "10%",  cellTemplate: '<a href="manual_order_form.html"> {{row.entity.Customer}} </a>' },
	  { field: 'Supplier', headerCellClass: 'HeaderStyle1'  },
	  { field: 'Plant', headerCellClass: 'HeaderStyle1' },
	  { field: 'Pick-Up', headerCellClass: 'HeaderStyle1' },
	  { field: 'Pick-Up Date', headerCellClass: 'HeaderStyle1' },
	  { field: 'Arrival Date', headerCellClass: 'HeaderStyle1' },
	  { field: 'Stack', headerCellClass: 'HeaderStyle1' },
	  { field: 'Comments', headerCellClass: 'HeaderStyle1' },
	  { field: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold' },
	  { field: 'Assigned To', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
	  { field: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
	  { field: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
	  { field: 'Status(Select)', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
	  ]
		  
		};
	$scope.gridOptions.data = myData;
	
}