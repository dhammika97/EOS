// JavaScript Document
var controllers = {};
///ng-controller="masterController"
controllers.masterController = function($scope, $location, $window, auth){
	auth.query().$promise.then(function(data){
	//console.log('now only data came' + new Date())
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	if(data.lastLogin!=null){
		var d = new Date(data.lastLogin)
		$scope.lastLogin = monthNames[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
	}else{
		$scope.lastLogin = ''	
	}
	$scope.username = data.userName
	$scope.userType = data.userType
	$scope.userCompany = data.userCompany
	$scope.userCompanyID = data.cID
	$scope.userCompanyType = data.cType
	$scope.userId = data.sId
	$('#overlay').hide()
})
		
	$scope.go = function(path){
		$location.path(path)
	}
	
	$scope.logout = function(){
		sessionStorage.removeItem('username')
		sessionStorage.removeItem('accessKey')
		sessionStorage.removeItem('type')
		$scope.username = ''
		//$scope.go('../')
		window.location.replace("../")
	}
	/*$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
	
	$scope.alerts = []
	//{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }
	
	$scope.addAlert = function(typ, massage) {
    	$scope.alerts.push({type:typ, msg: massage});
  	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
	
	
	
	$scope.setUser = function(data){
		$scope.username = data.username
	}
	
	$scope.$on('$viewContentLoaded', function(){
		ngProgress.complete()//Here your view content is fully loaded !!
		//$scope.isCollapsed = true;
	});
	
	
	$scope.$on('$viewContentLoaded', function(event) {
		//$window._gaq.push(['_trackPageview', $location.path()]);
		$window.ga('send', 'pageview', { page: $location.path() });
	});*/
}

/*controllers.dashController = function($scope, dashFactory){
	//$scope.categories = dashFactory.getCategory();
}*/

App.controller(controllers)
.filter('mapCompanyType', function() {
  var genderHash = {
    1: 'Admin',
    2: 'Customer',
	3: 'Supplier',
	4: 'Logistic'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };
})
.filter('mapUserType', function() {
  var userHash = {
    1: 'Admin',
    2: 'Customer',
	3: 'Supplier'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return userHash[input];
    }
  };
})
.filter('mapStatus', function() {
  var userHash = {
    1: 'Active',
	2: 'Disabled'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return userHash[input];
    }
  };
})
.filter('mapPickup', function() {
  var userHash = {
    1: 'Yes',
	2: 'No'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return userHash[input];
    }
  };
})
.filter('mapSuplierStatus', function() {
  var userHash = {
    0: 'PENDING',
	1: 'ACCEPTED'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return userHash[input];
    }
  };
})
.filter('mapOrderStatus', function() {
  var userHash = {
    1: 'ACCEPTED',
	2: 'PENDING',
	3: 'CANCELED',
	4: 'CLOSED',
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return userHash[input];
    }
  };
})
.filter('companyDropdown', function(){
	return function(value, scope){
		//console.log(scope.row.entity.company)
		//return scope.row.entity.company
	}	
})