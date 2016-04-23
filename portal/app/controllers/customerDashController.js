// JavaScript Document
controllers.customerDashController = function($scope, locationFactory, customerDashFactory, Notification, updateOrderFactory, Common,$fancyModal){
	//row.entity.supplier
	var supplierTemplate = '<div class="ui-grid-cell-contents" >'
	supplierTemplate += '<span ng-if="row.entity.order_supplier_status == 0 "> {{row.entity.supplier}} </span>'
	supplierTemplate += '<span ng-if="row.entity.order_supplier_status == 1 "> <a href="" ng-click="grid.appScope.openDetails(row.entity.order_id)">{{row.entity.supplier}}</a> </span>'
	supplierTemplate += '</div>'
	
	var commentTemplate = '<div class="ui-grid-cell-contents" >{{row.entity.order_comments}} <a href="" ng-click="grid.appScope.openDefault(row.entity.order_id)"><i class="fa fa-plus-circle"></i> Add Comment</a></div>'
	
	$scope.gridOptions = {
		columnDefs: [
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "15%", enableCellEdit: false, cellTemplate:supplierTemplate},
		  { name: 'order_plant', displayName: 'Plant', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80', enableCellEdit: false},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80', enableCellEdit: false},
		  { name: 'order_comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width: "250" , enableCellEdit: false, cellTemplate: commentTemplate},
		  { name: 'order_supplier_status', displayName: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', cellFilter: 'mapSuplierStatus', enableCellEdit: false},
		  { name: 'order_assign_to', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' ,cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'order_assign_date', displayName: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'order_assigned_by', displayName: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false},
		  { name: 'order_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', 
		  	cellFilter: 'mapOrderStatus',
		  	editDropdownOptionsArray: [
				{ id: 1, status: 'Accepted' },
				{ id: 2, status: 'Pending' },
				{ id: 3, status: 'Canceled' },
				{ id: 4, status: 'Closed' }
			],
			editableCellTemplate: 'ui-grid/dropdownEditor',
			editDropdownValueLabel: 'status', 
			editDropdownIdLabel: 'id'}
		  ]
		  
	};
	
	var curr = new Date;
	var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
	var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
	//$scope.currentWeek = week.getMonth()+1+'/'+week.getDate()+'/'+week.getFullYear()
	$scope.firstDate = firstday.getFullYear()+'-'+(firstday.getMonth()+1)+'-'+firstday.getDate()
	$scope.lastDate = lastday.getFullYear()+'-'+(lastday.getMonth()+1)+'-'+lastday.getDate()
	
	locationFactory.query().$promise.then(function(data){
		$scope.locationsList = data.locations
		$scope.countryFilter = 0
		
		customerDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID}).$promise.then(function(data){
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
		customerDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID, 'order_location_id':$scope.countryFilter}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);	
			$scope.noData = true;
		});	
	}
	
	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
			if(newValue != oldValue){
				var tmpVar = '{"'+colDef.name+'":"'+newValue+'"}'
				var obj = JSON.parse(tmpVar)
				updateOrderFactory.updateOrder(rowEntity.order_id,obj)
			}
		});
	}
	//'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID
	//'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID
	//'order_location_id':$scope.countryFilter,
	
	$scope.common = Common
	$scope.openDefault = function(data){
	
	$scope.common.modalInstance=$fancyModal.open({ template : '<div><form name="commentForm" class="form-inline" ng-keypress="keyPress($event)" ng-submit="addComment(commentForm.$valid)" novalidate><div class="form-group" ng-class="{ \'has-error\' : commentForm.comment_description.$invalid && submitted}"><label for="txtCompany" >Comment </label><textarea class="commentBox"  name="comment_description" ng-model="comment.comment_description" required></textarea></div><button type="submit" class="btn btn-green btn-form" >Add Comment</button></form></div>',controller : 'popUpController' });
	
	$scope.common.comment = {}	
	$scope.common.comment.comment_order_id = data
	
	}
	
	var detailsTemplate = 	'<div><div class="WR_PageTitle"><h1><i class="fa fa-chevron-circle-right"></i> Logistic Details</h1></div><table width="470" border="1" class="dataTbl"><tr><th scope="row">Product</th><td>Sample Product</td></tr><tr><th scope="row">Skid Count</th><td>Sample Skid Count</td></tr><tr><th scope="row">Dimension</th><td>Sample Dimension</td></tr><tr><th scope="row">Freight Class</th><td>Sample Freight Class</td></tr><tr><th scope="row">Stackable</th><td>Sample Stackable</td></tr><tr><th scope="row">Weight</th><td>Sample Weight</td></tr><tr><th scope="row">Status</th><td>Sample Status</td></tr></table></div>'
	
	$scope.openDetails = function(e){
		$scope.common.orderDetail = {}	
		$scope.common.orderDetail.comment_order_id = e
		$fancyModal.open({ template : detailsTemplate, controller:'detailsPopupController'})
	}
}

controllers.detailsPopupController = function($scope, Common, hybridDashFactory){
	$scope.common = Common
	console.log($scope.common.orderDetail.comment_order_id)
	
	
}