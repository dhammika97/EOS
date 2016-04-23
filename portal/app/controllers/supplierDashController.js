// JavaScript Document
controllers.supplierDashController = function($scope, supplierDashFactory, locationFactory, Notification, updateOrderFactory, Common, $fancyModal){
	
	$scope.supplierGridOptions = {
		columnDefs: [
			  { name:'company', displayName: 'Customer', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_plant', displayName: 'Consignee', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80', enableCellEdit: false },
			  { name:'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80', enableCellEdit: false },
			  { name:'order_comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width:200 , enableCellEdit: false, cellTemplate: '<div class="ui-grid-cell-contents" >{{row.entity.order_comments}} <a href="" ng-click="grid.appScope.openDefault(row.entity.order_id)"><i class="fa fa-plus-circle"></i> Add Comment</a></div>'},
			  { name:'order_product', displayName: 'Product', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { name:'order_skid_count', displayName: 'Skid Count', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { name:'order_dimensions', displayName: 'Dimension', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { name:'order_freight_class', displayName: 'Freight Class', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1' },
			  { name:'order_stackable', displayName: 'Stackable', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
			  { name:'order_weight', displayName: 'Weight', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1'},
			  { name:'order_supplier_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', 	cellFilter: 'mapSuplierStatus',
			  	editDropdownOptionsArray: [
					{ id: 0, status: 'Pending' },
					{ id: 1, status: 'Accepted' }
				],
				editableCellTemplate: 'ui-grid/dropdownEditor',
				editDropdownValueLabel: 'status', 
				editDropdownIdLabel: 'id'},
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
		
		supplierDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_supplier_id':$scope.userCompanyID}).$promise.then(function(data){
			$scope.supplierGridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.supplierGridOptions.data = {}
			Notification.error(data.data.message);
			$scope.noData = true;	
		});
	})
	
	$scope.getCountryFiltered = function(){
		supplierDashFactory.query({'order_location_id':$scope.countryFilter,'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_supplier_id':$scope.userCompanyID}).$promise.then(function(data){
			$scope.supplierGridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.supplierGridOptions.data = {}
			Notification.error(data.data.message);	
			$scope.noData = true;
		});	
	}
	
	$scope.supplierGridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
			if(newValue != oldValue){
				var tmpVar = '{"'+colDef.name+'":"'+newValue+'"}'
				var obj = JSON.parse(tmpVar)
				updateOrderFactory.updateOrder(rowEntity.order_id,obj)
				//console.log(rowEntity)
			}
		});
	}
	
	$scope.common = Common
	$scope.openDefault = function(data){
	
	$scope.common.modalInstance=$fancyModal.open({ template : '<div><form name="commentForm" class="form-inline" ng-keypress="keyPress($event)" ng-submit="addComment(commentForm.$valid)" novalidate><div class="form-group" ng-class="{ \'has-error\' : commentForm.comment_description.$invalid && submitted}"><label for="txtCompany" >Comment </label><textarea class="commentBox"  name="comment_description" ng-model="comment.comment_description" required></textarea></div><button type="submit" class="btn btn-green btn-form" >Add Comment</button></form></div>',controller : 'popUpController' });
	
	$scope.common.comment = {}	
	$scope.common.comment.comment_order_id = data
	}
}