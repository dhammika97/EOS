// JavaScript Document
controllers.customerController = function($scope, customerFactory, customerAddFactory){
	$scope.partnerGridOptions = {
		columnDefs: [
		  { name: 'company_type', displayName: 'Partner Type', headerCellClass: 'HeaderStyle1',	
		  	filter: {}, 
			cellFilter: 'mapCompanyType',
			editableCellTemplate: 'ui-grid/dropdownEditor',
			editDropdownValueLabel: 'company_type_name', 
			editDropdownIdLabel: 'company_type',
			editDropdownOptionsArray: [
			  { company_type: 1, company_type_name: 'Admin' },
			  { company_type: 2, company_type_name: 'Customer' },
			  { company_type: 3, company_type_name: 'Supplier' },
			  { company_type: 4, company_type_name: 'Logistic' }
			]
		  },
		  { name: 'company_name', displayName: 'Company Name', headerCellClass: 'HeaderStyle1'},
		  { name: 'company_contact_name', displayName: 'Contact Full Name', headerCellClass: 'HeaderStyle1' },
		  { name: 'company_contact_no', displayName: 'Contact Phone No.', headerCellClass: 'HeaderStyle1'},
		  { name: 'company_email', displayName: 'Email Address', headerCellClass: 'HeaderStyle1' },
		  { name: 'company_alternate_contact', displayName: 'Alternate Contact', headerCellClass: 'HeaderStyle1'}
		  ]
		};
	 
	customerFactory.query().$promise.then(function(data){
		$scope.partnerGridOptions.data = data.companies
	})
	
	$scope.partnerGridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
			if(newValue != oldValue){
				customerAddFactory.updatePartner(rowEntity.company_id,rowEntity)
			}
		});
	}
}

controllers.addCustomerController = function($scope, customerAddFactory){
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.addPartner()
	}
	
	$scope.addPartner = function(isValid){
		$scope.submitted = true
		if(isValid){
			customerAddFactory.createPartner($scope.partner)
			$scope.submitted = false
			$scope.partner = {}
		}
	}
}