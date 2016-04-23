// JavaScript Document
controllers.hybridDashController = function($scope, hybridDashFactory, locationFactory, Notification, $fancyModal,Common){
	
	$scope.gridOptions = {
		columnDefs: [
		  { name: 'company', displayName: 'Customer', headerCellClass: 'HeaderStyle1', width: "12%" },
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "12%"},
		  { name: 'order_plant', displayName: 'Consignee', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80'},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1'},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80'},
		  { name: 'order_comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width: "250" , cellTemplate: '<div class="ui-grid-cell-contents" >{{row.entity.order_comments}} <a href="" ng-click="grid.appScope.openDefault(row.entity.order_id)"><i class="fa fa-plus-circle"></i> Add Comment</a></div>'},
		  { name: 'order_supplier_status', displayName: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', cellFilter: 'mapSuplierStatus'},
		  { name: 'order_assign_to', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' ,cellClass:'CellClassStyle1' },
		  { name: 'order_assign_date', displayName: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
		  { name: 'order_assigned_by', displayName: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
		  { name: 'order_status', displayName: 'Customer Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', cellFilter: 'mapOrderStatus'},
		  ]
		  
		};
		
	$scope.common = Common
	$scope.openDefault = function(data){
	
	$scope.common.modalInstance=$fancyModal.open({ template : '<div><form name="commentForm" class="form-inline" ng-keypress="keyPress($event)" ng-submit="addComment(commentForm.$valid)" novalidate><div class="form-group" ng-class="{ \'has-error\' : commentForm.comment_description.$invalid && submitted}"><label for="txtCompany" >Comment </label><textarea class="commentBox"  name="comment_description" ng-model="comment.comment_description" required></textarea></div><button type="submit" class="btn btn-green btn-form" >Add Comment</button></form></div>',controller : 'popUpController' });
	
	$scope.common.comment = {}	
	$scope.common.comment.comment_order_id = data
	}
	
	
	
	var curr = new Date;
	var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
	var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
	//$scope.currentWeek = week.getMonth()+1+'/'+week.getDate()+'/'+week.getFullYear()
	$scope.firstDate = firstday.getFullYear()+'-'+(firstday.getMonth()+1)+'-'+firstday.getDate()
	$scope.lastDate = lastday.getFullYear()+'-'+(lastday.getMonth()+1)+'-'+lastday.getDate()
	
	
	locationFactory.query().$promise.then(function(data){
		$scope.locationsList = data.locations
		$scope.countryFilter = 0
		
		hybridDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);
			$scope.noData = true;	
		});
	})
	
	$scope.getCountryFiltered = function(){
		hybridDashFactory.query({'order_location_id':$scope.countryFilter,'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);	
			$scope.noData = true;
		});	
	}
	
}

controllers.popUpController = function($scope, Common, commentFactory, Notification){
	$scope.common = Common
	
	$scope.keyPress = function(e){
		if (e.which === 13)
    	$scope.addComment()
	}
	
	$scope.addComment = function(isValid){
		$scope.submitted = true
		if(isValid){
			$scope.common.comment.comment_description = $scope.comment.comment_description
			//console.log($scope.common.comment)
			commentFactory.save($scope.common.comment).$promise.then(function(data){
				Notification.success(data.message)
				$scope.common.modalInstance.close()
				window.location.replace('portal/')
			},function(data){
				Notification.error(data.data.message)
			})
			//commentFactory.addComment($scope.common.comment)
			$scope.submitted = false
			$scope.common.comment = {}
		}
	}
}
//App.controller(controllers)