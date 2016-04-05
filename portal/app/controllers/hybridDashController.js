// JavaScript Document
controllers.hybridDashController = function($scope){
	var myData = [
		{
			"Customer": "Magna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "15 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		},
		{
			"Customer": "aMagna",
			"Supplier": "Co-Ex-Tec to H&L",
			"Plant": "Newmarket",
			"Pick-Up": "Yes",
			"Pick-Up Date": "02 April 2016",
			"Arrival Date": "22 April 2016",
			"Stack": "Yes",
			"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
			"Supplier Status": "ACCEPTED",
			"Assigned To": "",
			"Date": "",
			"By": "",
			"Status(Select)": "",
		}
	];
	
	$scope.gridOptions = {
		columnDefs: [
		  { name: 'Customer', headerCellClass: 'HeaderStyle1', width: "10%", enableCellEdit: false  },
		  { name: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "10%", enableCellEdit: false},
		  { name: 'Plant', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
		  { name: 'Pick-Up', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
		  { name: 'Pick-Up Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
		  { name: 'Arrival Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
		  { name: 'Stack', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
		  { name: 'Comments', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
		  { name: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', enableCellEdit: false },
		  { name: 'assignedTo', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', 
		  editableCellTemplate: 'ui-grid/dropdownEditor',
		  editDropdownOptionsArray: [
      		{ id: 1, assignedTo: 'ABC' },
      		{ id: 2, assignedTo: 'DEF' }
    	  ], 
		  editDropdownIdLabel:'assignedTo',
		  editDropdownValueLabel: 'assignedTo'
		  },
		  { name: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'Status(Select)', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false},
		  ]
		  
		};
	$scope.gridOptions.data = myData;
	
}

controllers.addCustomerController = function($scope){
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.addPartner()
	}
	
	$scope.addPartner = function(){
		console.log($scope.partner)
	}
}
//App.controller(controllers)