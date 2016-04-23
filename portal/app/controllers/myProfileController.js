// JavaScript Document
controllers.myProfileController=function($scope, myProfileFactory){
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.myProfile()
	}
	
	$scope.myProfile = function(isValid){
		$scope.submitted = true
		if(isValid){
			//plantAddFactory.createPlant($scope.plant)
			$scope.submitted = false
			$scope.location = {}
		}
	}
	$scope.profile = myProfileFactory.getUser()
}