// JavaScript Document
controllers.customerDashController = function($scope, locationFactory, customerDashFactory, Notification, updateOrderFactory, Common,$fancyModal){
	//row.entity.supplier
	var supplierTemplate = '<div class="ui-grid-cell-contents" >'
	supplierTemplate += '<span ng-if="row.entity.order_supplier_status == 0 "> {{row.entity.supplier}} </span>'
	supplierTemplate += '<span ng-if="row.entity.order_supplier_status == 1 "> <a href="" ng-click="grid.appScope.openDetails(row.entity.order_id)">{{row.entity.supplier}}</a> </span>'
	supplierTemplate += '</div>'
	
	var commentTemplate = '<div class="ui-grid-cell-contents" > <span ng-repeat="item in row.entity.comments">{{item}}</br></span><a href="" ng-click="grid.appScope.openDefault(row.entity.order_id)"><i class="fa fa-plus-circle"></i> Add Comment</a></div>'
	
	$scope.gridOptions = {
		/*cellEditableCondition: function($scope){
			if($scope.row.entity.order_status==1)
			return false
			else
			return true
		},*/
		columnDefs: [
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "15%", enableCellEdit: false, cellTemplate:supplierTemplate},
		  { name: 'order_plant', displayName: 'Consignee', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80', enableCellEdit: false},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80', enableCellEdit: false},
		  { name: 'order_comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width: "250" , enableCellEdit: false, cellTemplate: commentTemplate},
		  { name: 'order_supplier_status', displayName: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', cellFilter: 'mapSuplierStatus', enableCellEdit: false},
		  { name: 'order_assign_to', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' ,cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'order_assign_date', displayName: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'order_assigned_by', displayName: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false},
		  { name: 'order_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1  cellEditable', 
		  	cellFilter: 'mapOrderStatus',
		  	editDropdownOptionsArray: [
				{ id: 1, status: 'Accepted' },
				{ id: 2, status: 'Pending' },
				{ id: 3, status: 'Canceled' },
				{ id: 4, status: 'Closed' }
			],
			editableCellTemplate: 'ui-grid/dropdownEditor',
			editDropdownValueLabel: 'status', 
			editDropdownIdLabel: 'id',
			enableCellEditOnFocus:true}
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
		$scope.countryFilter = '0'
		$scope.getData($scope.firstDate, $scope.lastDate, $scope.countryFilter)
		$scope.refreshData()
		/*customerDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_company_id':$scope.userCompanyID}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);
			$scope.noData = true;	
		});*/
	})

	
	$scope.getCountryFiltered = function(){
		$scope.getData($scope.firstDate, $scope.lastDate, $scope.countryFilter)
	}
	var timer
	$scope.refreshData = function(){
		$scope.autoRefresh = true
		timer = setTimeout(function(){
		$scope.getData($scope.firstDate, $scope.lastDate, $scope.countryFilter, $scope.countryFilter)
			$scope.refreshData()
		},1000*60*3)	
	}
	
	$scope.$on('$destroy', function() {
		$scope.stopRefresh()  
	});
	$scope.stopRefresh = function(){
		clearTimeout(timer)
		$scope.autoRefresh = false
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
	
	var detailsTemplate = 	'<div><div class="WR_PageTitle"><h1><i class="fa fa-chevron-circle-right"></i> Logistic Details</h1></div><table width="470" border="1" class="dataTbl"><tr><th scope="row" width="150">Product</th><td>{{order.order_product}}</td></tr><tr><th scope="row">Skid Count</th><td>{{order.order_skid_count}}</td></tr><tr><th scope="row">Dimension</th><td>{{order.order_dimensions}}</td></tr><tr><th scope="row">Freight Class</th><td>{{order.order_freight_class}}</td></tr><tr><th scope="row">Stackable</th><td>{{order.order_stackable}}</td></tr><tr><th scope="row">Weight</th><td>{{order.order_weight}}</td></tr></table></div>'
	
	$scope.openDetails = function(e){
		$scope.common.orderDetail = {}	
		$scope.common.orderDetail.order_id = e
		$fancyModal.open({ template : detailsTemplate, controller:'detailsPopupController'})
	}
	
	$scope.getData = function(startDate, endDate, Location){
		if(Location=='undefined')
		Location = 0
		customerDashFactory.orders.query({'order_pickup_start':startDate, 'order_pickup_end':endDate, 'order_location_id':Location, 'order_company_id':$scope.userCompanyID}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);
			$scope.noData = true;	
		});
	}
	
	$scope.nextWeek = function(){
		var tmpS = new Date($scope.firstDate)
		var tmpL = new Date($scope.lastDate)
		firstday = new Date(tmpS.setDate(tmpS.getDate()-tmpS.getDay()+7))
		lastday = new Date(tmpL.setDate(tmpL.getDate()-tmpL.getDay()+13))
		$scope.firstDate = firstday.getFullYear()+'-'+(firstday.getMonth()+1)+'-'+firstday.getDate()
		$scope.lastDate = lastday.getFullYear()+'-'+(lastday.getMonth()+1)+'-'+lastday.getDate()
		$scope.getData($scope.firstDate, $scope.lastDate, $scope.countryFilter)
	}
	
	$scope.previousWeek = function(){
		//console.log($scope.firstDate+' 0 '+$scope.lastDate)
		var tmpS = new Date($scope.firstDate)
		var tmpL = new Date($scope.lastDate)
		firstday = new Date(tmpS.setDate(tmpS.getDate()-tmpS.getDay()-7))
		lastday = new Date(tmpL.setDate(tmpL.getDate()-tmpL.getDay()-1))
		$scope.firstDate = firstday.getFullYear()+'-'+(firstday.getMonth()+1)+'-'+firstday.getDate()
		$scope.lastDate = lastday.getFullYear()+'-'+(lastday.getMonth()+1)+'-'+lastday.getDate()
		//console.log($scope.firstDate+' 0 '+$scope.lastDate)
		$scope.getData($scope.firstDate, $scope.lastDate, $scope.countryFilter)
	}
}

controllers.detailsPopupController = function($scope, Common, orderDetailFactory){
	$scope.common = Common
	$scope.order={}
	var id = $scope.common.orderDetail.order_id
	//orderDetailFactory.getOrderDetails($scope.common.orderDetail.order_id)
	orderDetailFactory.get({id:id}).$promise.then(function(data){
		
		$scope.order.order_product=data.orders[0].order_product
		$scope.order.order_skid_count=data.orders[0].order_skid_count
		$scope.order.order_dimensions=data.orders[0].order_dimensions
		$scope.order.order_freight_class = data.orders[0].order_freight_class
		$scope.order.order_stackable=data.orders[0].order_stackable
		$scope.order.order_weight=data.orders[0].order_weight
		//console.log($scope.order)
		//console.log(data)
	})
}