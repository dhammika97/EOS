// JavaScript Document
controllers.supplierDashController = function($scope, supplierDashFactory, locationFactory, Notification, updateOrderFactory, Common, $fancyModal){
	var commentTemplate = '<div class="ui-grid-cell-contents" > <span ng-repeat="item in row.entity.comments">{{item}}</br></span><a href="" ng-click="grid.appScope.openDefault(row.entity.order_id)"><i class="fa fa-plus-circle"></i> Add Comment</a></div>'
	$scope.canEdit = function(){
		return false
	}
	$scope.supplierGridOptions = {
		enableCellEditOnFocus:true,
		cellEditableCondition: function($scope){
			if($scope.row.entity.order_status==1 && $scope.row.entity.order_supplier_status!=1){
				//console.log('client accepted')
				return true
			}else if($scope.row.entity.order_supplier_status==1 && $scope.row.entity.order_status==1){
				//console.log('client accepted && suplier accepted')
				return false
			}else{
				//console.log('else')
				return false	
			}
		},
		columnDefs: [
			  { name:'company', displayName: 'Customer', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_plant', displayName: 'Consignee', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80', enableCellEdit: false },
			  { name:'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false },
			  { name:'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80', enableCellEdit: false },
			  { name:'order_comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width:250 , enableCellEdit: false, cellTemplate: commentTemplate},
			  { name:'order_product', displayName: 'Product', headerCellClass: 'HeaderStyle2' ,cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 1 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1 cellEditable';
				}
				return 'CellClassStyle1'  
			}},
			  { name:'order_skid_count', displayName: 'Skid Count', headerCellClass: 'HeaderStyle2' ,cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 1 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1 cellEditable';
				}
				return 'CellClassStyle1'  
			}},
			  { name:'order_dimensions', displayName: 'Dimension', headerCellClass: 'HeaderStyle2' ,cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 1 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1 cellEditable';
				}
				return 'CellClassStyle1'  
			} },
			  { name:'order_freight_class', displayName: 'Freight Class', headerCellClass: 'HeaderStyle2' ,cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 1 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1 cellEditable';
				}
				return 'CellClassStyle1'  
			}},
			  { name:'order_stackable', displayName: 'Stackable', headerCellClass: 'HeaderStyle2' ,cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 1 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1 cellEditable';
				}
				return 'CellClassStyle1'  
			},cellFilter: 'mapPickup',
			  	editDropdownOptionsArray: [
					{ id: 1, status: 'Yes' },
					{ id: 2, status: 'No' }
				],
				editableCellTemplate: 'ui-grid/dropdownEditor',
				editDropdownValueLabel: 'status', 
				editDropdownIdLabel: 'id'},
			  { name:'order_weight', displayName: 'Weight', headerCellClass: 'HeaderStyle2' ,cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 1 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1 cellEditable';
				}
				return 'CellClassStyle1'  
			}},
			  { name:'order_supplier_status', displayName: 'Status', headerCellClass: 'HeaderStyle2' ,cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 1 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1 cellEditable';
				}
				return 'CellClassStyle1'  
			}, 	cellFilter: 'mapSuplierStatus',
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
		$scope.countryFilter = '0'
		$scope.getData($scope.firstDate, $scope.lastDate, $scope.countryFilter)
		$scope.refreshData()
		/*supplierDashFactory.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate, 'order_supplier_id':$scope.userCompanyID}).$promise.then(function(data){
			$scope.supplierGridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.supplierGridOptions.data = {}
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
	
	$scope.getData = function(startDate, endDate, Location){
		if(Location=='undefined')
		Location = 0
		supplierDashFactory.orders.query({'order_pickup_start':startDate, 'order_pickup_end':endDate, 'order_location_id':Location, 'order_supplier_id':$scope.userCompanyID}).$promise.then(function(data){
			$scope.supplierGridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.supplierGridOptions.data = {}
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