// JavaScript Document
controllers.userController = function($scope, userFactory, customerFactory, userAddFactory, Notification){
	customerFactory.query().$promise.then(function(data){
		$scope.companies = data.companies
		$scope.userGridOptions = {
			columnDefs: [
				{ field: 'user_name', displayName:'Display Name', headerCellClass: 'HeaderStyle1', cellClass:'cellEditable',enableCellEditOnFocus:true},
				{ field: 'user_email', displayName: 'Email', headerCellClass: 'HeaderStyle1', cellClass:'cellEditable',enableCellEditOnFocus:true  },
				{ field: 'user_type', displayName:'User Type', headerCellClass: 'HeaderStyle1',
					//filter: {},
					cellFilter: 'mapUserType',
					editDropdownOptionsArray: [
					  { user_type: 1, user_type_name: 'Admin' },
					  { user_type: 2, user_type_name: 'Customer' },
					  { user_type: 3, user_type_name: 'Supplier' }
					],
					editableCellTemplate: 'ui-grid/dropdownEditor',
					editDropdownValueLabel: 'user_type_name', 
					editDropdownIdLabel: 'user_type', cellClass:'cellEditable',enableCellEditOnFocus:true
				 },
				{ field: 'user_company', displayName:'Company', headerCellClass: 'HeaderStyle1',
					editableCellTemplate: 'ui-grid/dropdownEditor',
					editDropdownValueLabel: 'company_name', 
					editDropdownIdLabel: 'company_id',
					editDropdownOptionsArray:$scope.companies,
					//cellFilter: 'mapCompany',
					cellFilter: "companyDropdown:this", 
					cellClass:'cellEditable',enableCellEditOnFocus:true
				 },
				{ field: 'user_contactNo', displayName:'Contact No.', headerCellClass: 'HeaderStyle1', cellClass:'cellEditable',enableCellEditOnFocus:true },
				{ field: 'user_status', displayName:'Status', headerCellClass: 'HeaderStyle1',
					editDropdownOptionsArray: [
					  { user_status: 1, name: 'Active' },
					  { user_status: 2, name: 'Disabled' }
					],
					editableCellTemplate: 'ui-grid/dropdownEditor',
					editDropdownValueLabel: 'name', 
					editDropdownIdLabel: 'user_status', cellClass:'cellEditable',enableCellEditOnFocus:true
				}
			]
		};
		//console.log($scope.companies)
		//$scope.userGridOptions.columnDefs[3].editDropdownOptionsArray = $scope.companies
		$scope.userGridOptions.columnDefs[5].cellFilter='mapStatus'
		//$scope.userGridOptions.columnDefs[3].cellFilter = 'griddropdown'
		userFactory.query().$promise.then(function(data){
			$scope.userGridOptions.data = data.users;
			//Notification.success('Data retrieved!');
		})
		
	})
	
	$scope.userGridOptions = {};
	
	$scope.userGridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
			if(newValue != oldValue){
				var tmpVar = '{"'+colDef.field+'":"'+newValue+'"}'
				var obj = JSON.parse(tmpVar)
				userAddFactory.updateUser(rowEntity.user_id,obj)
			}
		});
	}
	
	
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.addUser()
	}
	
	$scope.addUser = function(isValid){
		$scope.submitted = true
		if(isValid){
			userAddFactory.createUser($scope.user)
			$scope.submitted = false
			$scope.user = {}
		}
	}
	
}