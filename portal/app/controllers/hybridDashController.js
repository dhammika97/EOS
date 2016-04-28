// JavaScript Document
controllers.hybridDashController = function($scope, hybridDashFactory, locationFactory, Notification, $fancyModal, Common){
	$scope.gridOptions = {}
	hybridDashFactory.carriers.query().$promise.then(function(data){
		//console.log(data.companies)
		$scope.logistics = data.companies
		
		var supplierTemplate = '<div class="ui-grid-cell-contents" >'
	supplierTemplate += '<span ng-if="row.entity.order_supplier_status == 0 "> {{row.entity.supplier}} </span>'
	supplierTemplate += '<span ng-if="row.entity.order_supplier_status == 1 "> <a href="" ng-click="grid.appScope.openDetails(row.entity.order_id)">{{row.entity.supplier}}</a> </span>'
	supplierTemplate += '</div>'
	
	var commentTemplate = '<div class="ui-grid-cell-contents" > <span ng-repeat="item in row.entity.comments">{{item}}</br></span><a href="" ng-click="grid.appScope.openDefault(row.entity.order_id)"><i class="fa fa-plus-circle"></i> Add Comment</a></div>'
	$scope.gridOptions = {
		cellEditableCondition: function($scope){
			if($scope.row.entity.order_status==1 && $scope.row.entity.order_supplier_status==1)
			return true
			else
			return false
		},
		columnDefs: [
		  { name: 'company', displayName: 'Customer', headerCellClass: 'HeaderStyle1', width: "12%", enableCellEdit: false },
		  { name: 'supplier', displayName: 'Supplier', headerCellClass: 'HeaderStyle1' , width: "12%", enableCellEdit: false, cellTemplate:supplierTemplate},
		  { name: 'order_plant', displayName: 'Consignee', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_pickup', displayName: 'Pick-Up', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup', width: '80', enableCellEdit: false},
		  { name: 'order_pickup_day', displayName: 'Pick-Up Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_arrival_day', displayName: 'Arrival Date', headerCellClass: 'HeaderStyle1', enableCellEdit: false},
		  { name: 'order_stack', displayName: 'Stack', headerCellClass: 'HeaderStyle1', cellFilter: 'mapPickup' , width: '80', enableCellEdit: false},
		  { name: 'order_comments', displayName: 'Comments', headerCellClass: 'HeaderStyle1', width: "250" , cellTemplate: commentTemplate, enableCellEdit: false},
		  { name: 'order_supplier_status', displayName: 'Supplier Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1 bold', cellFilter: 'mapSuplierStatus', enableCellEdit: false},
		  { name: 'order_assign_to', displayName: 'Assigned To', headerCellClass: 'HeaderStyle2' , cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
			  	if (row.entity.order_status == 2 && row.entity.order_supplier_status==0) {
					return 'CellClassStyle1';
				}
				return 'CellClassStyle1 cellEditable'  
			}, 
			enableCellEditOnFocus:true,
			editableCellTemplate: 'ui-grid/dropdownEditor',
			editDropdownValueLabel: 'company_name', 
			editDropdownIdLabel: 'company_id',
			cellFilter: "companyDropdown:this",
			editDropdownOptionsArray: $scope.logistics },
		  { name: 'order_assign_date', displayName: 'Date', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false },
		  { name: 'order_assigned_by', displayName: 'By', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', enableCellEdit: false},
		  { name: 'order_status', displayName: 'Customer Status', headerCellClass: 'HeaderStyle2' , cellClass:'CellClassStyle1', cellFilter: 'mapOrderStatus', enableCellEdit: false},
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
		
		hybridDashFactory.orders.query({'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);
			$scope.noData = true;	
		});
	})
	

	})
		$scope.getCountryFiltered = function(){
		hybridDashFactory.orders.query({'order_location_id':$scope.countryFilter,'order_pickup_start':$scope.firstDate, 'order_pickup_end':$scope.lastDate}).$promise.then(function(data){
			$scope.gridOptions.data = data.orders
			Notification.success('Data retrieved!');
			$scope.noData = false;
		},function(data){
			$scope.gridOptions.data = {}
			Notification.error(data.data.message);	
			$scope.noData = true;
		});	
	}
	
	var detailsTemplate = 	'<div><div class="WR_PageTitle"><h1><i class="fa fa-chevron-circle-right"></i> Logistic Details</h1></div><table width="470" border="1" class="dataTbl"><tr><th scope="row" width="150">Product</th><td>{{order.order_product}}</td></tr><tr><th scope="row">Skid Count</th><td>{{order.order_skid_count}}</td></tr><tr><th scope="row">Dimension</th><td>{{order.order_dimensions}}</td></tr><tr><th scope="row">Freight Class</th><td>{{order.order_freight_class}}</td></tr><tr><th scope="row">Stackable</th><td>{{order.order_stackable}}</td></tr><tr><th scope="row">Weight</th><td>{{order.order_weight}}</td></tr></table></div>'
	
	$scope.openDetails = function(e){
		$scope.common.orderDetail = {}	
		$scope.common.orderDetail.order_id = e
		$fancyModal.open({ template : detailsTemplate, controller:'detailsPopupController'})
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