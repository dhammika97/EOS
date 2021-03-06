// JavaScript Document
controllers.locationController = function($scope, locationFactory, locationAddFactory, Notification){
	locationFactory.query().$promise.then(function(data){
		$scope.locationGridOptions.data = data.locations
		Notification.success('Data retrieved!');	
	})
	$scope.locationGridOptions = {
		columnDefs: [
			{ field: 'location_name', displayName:'Location Name', headerCellClass: 'HeaderStyle1',enableCellEditOnFocus:true, cellClass:'cellEditable'},
			{ field: 'location_description', displayName: 'Location Description', headerCellClass: 'HeaderStyle1',enableCellEditOnFocus:true, cellClass:'cellEditable'  },
			{ field: 'location_cordinates', displayName:'Location Cordinates', headerCellClass: 'HeaderStyle1',enableCellEditOnFocus:true, cellClass:'cellEditable' },
		]
	};
	
	$scope.locationGridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
			if(newValue != oldValue){
				locationAddFactory.updateLocation(rowEntity.location_id,rowEntity)
			}
		});
	}
}

controllers.locationAddController = function($scope, locationAddFactory){
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.addLocation()
	}
	
	$scope.addLocation = function(isValid){
		$scope.submitted = true
		if(isValid){
			locationAddFactory.createLocation($scope.location)
			$scope.submitted = false
			$scope.location = {}
		}
	}
}