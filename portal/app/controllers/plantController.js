// JavaScript Document
controllers.plantController = function($scope, plantFactory, plantAddFactory, Notification){
	plantFactory.query().$promise.then(function(data){
		$scope.plantGridOptions.data = data.plants
		Notification.success('Data retrieved!');	
	})
	$scope.plantGridOptions = {
		columnDefs: [
			{ field: 'plant_name', displayName:'Plant Name', headerCellClass: 'HeaderStyle1'},
			{ field: 'plant_description', displayName: 'Plant Description', headerCellClass: 'HeaderStyle1'  }
		]
	};
	
	$scope.plantGridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
			if(newValue != oldValue){
				plantAddFactory.updatePlant(rowEntity.plant_id,rowEntity)
			}
		});
	}
}

controllers.plantAddController = function($scope, plantAddFactory){
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.addPlant()
	}
	
	$scope.addPlant = function(isValid){
		$scope.submitted = true
		if(isValid){
			plantAddFactory.createPlant($scope.plant)
			$scope.submitted = false
			$scope.location = {}
		}
	}
}