// JavaScript Document
controllers.myProfileController=function($scope, myProfileFactory){
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.myProfile()
	}
	
	$scope.myProfile = function(isValid){
		$scope.submitted = true
		if(isValid){
			myProfileFactory.updateUser($scope.profile.user_details[0])
			$scope.submitted = false
		}
	}
	$scope.profile = myProfileFactory.getUser()
}

controllers.changePasswordController=function($scope, changePassFactory){
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.changePass()
	}
	
	$scope.changePass = function(isValid){
		$scope.submitted = true
		if(isValid){
			changePassFactory.changePassword($scope.password)
			$scope.submitted = false
		}
	}
}