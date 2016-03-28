var app = angular.module('app', ['ngTouch', 'ui.grid']);


// HEOS Hybrid Page  //
app.controller('MainCtrl1', ['$scope', function ($scope) {

  var myData = [
    {
        "Customer": "Magna",
        "Supplier Canada": "Co-Ex-Tec to H&L",
        "Plant": "Newmarket",
        "Pick-Up": "Yes",
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
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
        "Supplier Canada": "Co-Ex-Tec to H&L",
        "Plant": "Newmarket",
        "Pick-Up": "Yes",
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
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
      { field: 'Customer', headerCellClass: 'HeaderStyle1', width: "10%",    },
	  { field: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "10%", },
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
}]);




// HEOS Hybrid Manual Entry  //
app.controller('MainCtrl2', ['$scope', function ($scope) {

  var myData = [
    {
        "Customer": "Magna",
        "Supplier Canada": "Co-Ex-Tec to H&L",
        "Plant": "Newmarket",
        "Pick-Up": "Yes",
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
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
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
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
}]);



// HEOS Customer Page //
app.controller('MainCtrl3', ['$scope', function ($scope) {

  var myData = [
    {
        "Customer": "Magna",
        "Supplier": "Co-Ex-Tec to H&L",
        "Plant": "Newmarket",
        "Pick-Up": "Yes",
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
		"Stack": "Yes",
		"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
		"Supplier Status": "Pending",
		"Assigned To": "",
		"Date": "",
		"By": "",
		"Status(Select)": "",
    },
    {
        "Customer": "Magna",
        "Supplier": "Co-Ex-Tec to H&L",
        "Plant": "Newmarket",
        "Pick-Up": "Yes",
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
		"Stack": "Yes",
		"Comments": "02/10/16 10:00 SHEIKHA: Found Issues with gty",
		"Supplier Status": "Pending",
		"Assigned To": "",
		"Date": "",
		"By": "",
		"Status(Select)": "",
    }
];


	$scope.gridOptions = {
    columnDefs: [
	  { field: 'Supplier', headerCellClass: 'HeaderStyle1'  },
	  { field: 'Plant', headerCellClass: 'HeaderStyle1' },
	  { field: 'Pick-Up', headerCellClass: 'HeaderStyle1' },
	  { field: 'Pick-Up Date', headerCellClass: 'HeaderStyle1' },
	  { field: 'Arrival Date', headerCellClass: 'HeaderStyle1' },
	  { field: 'Stack', headerCellClass: 'HeaderStyle1' },
	  { field: 'Comments', headerCellClass: 'HeaderStyle1', width: "15%" },
	  { field: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold' },
	  { field: 'Assigned To', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
	  { field: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
	  { field: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
	  { field: 'Status(Select)', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
	  ]
	  
	};
$scope.gridOptions.data = myData;
}]);






// HEOS Supplier Acknowledgement  //
app.controller('MainCtrl5', ['$scope', function ($scope) {

  var myData = [
    {
        "Customer": "Magna",
        "Plant": "Newmarket",
        "Pick-Up": "Yes",
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
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
		"Pick-Up Date": "Tuesday",
		"Arrival Date": "Thursday",
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
}]);













// Users //
app.controller('MainCtrl4', ['$scope', function ($scope) {

  var myData = [
    {
        "User ID": "1234",
        "Full Name": "User Full name 1",
        "Company": "User Company Name 1",
        "Email Address": "user1@gmail.com",
		"Password": "xxxxx",
    },
     {
        "User ID": "1234",
        "Full Name": "User Full name 2",
        "Company": "User Company Name 2",
        "Email Address": "user2@gmail.com",
		"Password": "xxxxx",
    }
];


	$scope.gridOptions = {
    columnDefs: [
      { field: 'User ID', headerCellClass: 'HeaderStyle1', width: "10%",  },
	  { field: 'Full Name', headerCellClass: 'HeaderStyle1'   },
	  { field: 'Company', headerCellClass: 'HeaderStyle1' },
	  { field: 'Email Address', headerCellClass: 'HeaderStyle1' },
	  { field: 'Password', headerCellClass: 'HeaderStyle1' },
	  ]
	  
	};
$scope.gridOptions.data = myData;
}]);