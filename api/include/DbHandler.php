<?php

/**
 * Class to handle all db operations
 * This class will have CRUD methods for database tables
 */
class DbHandler {


	public function isValidAccessToken($user_accessToken) {     
		$db = new database();
		$table = 'users';
		$rows ='*';
		$where = 'user_accessToken = "'.$user_accessToken.'"';	
		$db->select($table,$rows,$where,'','');
		$user = $db->getResults();
		return $user;	
	}
	
	public function getUserId($user_accessToken) {
        $db = new database();
        $table = 'users';
        $rows = '*';
        $where = 'user_accessToken = "' . $user_accessToken . '"';
        $db->select($table, $rows, $where, '', '');
        $user = $db->getResults();
        return $user;
    }
	
	public function getLastLogin($user_email) {
		$db = new database();
		//echo $user_email;
		$table = 'audit_login';
        $rows = 'audit_login_date_time';
        $where = 'audit_login_user_email = "' . $user_email . '"';
		$order = 'audit_login_date_time DESC';
		$limit = '1,1';
        $db->select($table, $rows, $where, $order, $limit);
        $user_last_login = $db->getResults();
        return $user_last_login;
	}
	
	public function getCompanyName($user_company){
		$db = new database();
		$table = 'company';
        $rows = 'company_name, company_type';
        $where = 'company_id = "' . $user_company . '"';
        $db->select($table, $rows, $where, '', '');
        $user_company_name = $db->getResults();
        return $user_company_name;
	}

	private function generateApiKey() {
		return strtoupper(md5(uniqid(rand(), true)));
	}
	
	private function auditLogEntry($params){
		$db = new database();
		(isset($params['table']) ? $table = $params['table'] : $table = "" );
		(isset($params['user']) ? $user = $params['user'] : $user = "" );
		(isset($params['status']) ? $status = $params['status'] : $status = "" );
		(isset($params['update_id']) ? $update_id = $params['update_id'] : $update_id = "");
		//(isset($params['old_value']) ? $old_value = $params['old_value'] : $old_value = "" );
		(isset($params['new_value']) ? $new_value = $params['new_value'] : $new_value = "" );
		switch($params['action']){
			case 'login':
				$tables = 'audit_login';
				$values = "'".$new_value."',
							'".$status."'";
				$rows = "audit_login_user_email,
						 audit_login_status";
				$db->insert($tables,$values,$rows);
			break;
			case 'create':
				$out = array();
				$out = explode(',',$new_value);
				//echo json_encode($out);
				$tables = 'audit_create';
				$values = "'".$table."',
							'".json_encode($out)."',
							'".$user."'";
				$rows = "audit_create_table,
						 audit_values,
						 audit_user";
				//$db->insert($tables,$values,$rows);
			break;
			case 'update':
				$tables = 'audit_update';
				$values = "'".$table."',
							'".$new_value."',
							'".$user."'";
				$rows = "audit_update_table,
						 update_new_value,
						 update_log_user";
				$db->insert($tables,$values,$rows);
			break;
			case 'delete':
				$tables = 'audit_delete';
				$values = "'".$table."',
							'".$new_value."',
							'".$user."'";
				$rows = "audit_delete_table,
						 audit_delete_value,
						 audit_delete_user";
				$db->insert($tables,$values,$rows);
			break;
		}
	}

	public function getAllUsers($params) {
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= $key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();
		$table = 'users';
		$rows ='user_id, user_name, user_email, user_type, user_company, user_contactNo, user_status';	
		$db->selectJson($table,$rows,$where,'','','');
		$user_list = $db->getJson();
		return $user_list;
	}

	public function GetUserDetail($user_id) {
		$db = new database();
		$table = 'users';
		$rows ='*';
		$where = 'user_id = "'.$user_id.'"';	
		$db->selectJson($table,$rows,$where,'','','');
		$user = $db->getJson();
		return $user;
	}
	
   
	public function createUser($user) {
		
		$date= date('y-m-d');
		$db = new database();
		$table  = "users";
		//return $user;
        
		
		if(!isset($user['user_name'])){
			 throw new Exception('Username cannot be blank!.');
		}elseif(!isset($user['user_password'])){
			 throw new Exception('Password cannot be blank!.');
		}elseif(!isset($user['user_email'])){
			 throw new Exception('Email cannot be blank!.');
		}elseif(!isset($user['user_type'])){
			throw new Exception('Please select user type!.');
		}elseif(!isset($user['user_company'])){
			throw new Exception('Please select company!.');
		}
		
		(isset($user['user_contactNo']) ? $user_contactNo = $user['user_contactNo'] : $user_contactNo = "" );
		
		$values = "'".$user['user_name']."','".md5 ($user['user_password'])."','".strtoupper(md5(uniqid(rand(), true)))."','".$user['user_email']."','".$user['user_type']."','".$user['user_company']."','".$user_contactNo."','1'";		
					  
		$rows   = "user_name,
                   user_password,
                   user_accessToken,
				   user_email,
				   user_type,
				   user_company,
				   user_contactNo,
				   user_status";		
        
		global $user_id;
		
		if($db->insert($table,$values,$rows) ){
			$params['table'] = $table;
			$params['action'] = 'create';
			$params['user'] = $user_id;
			$params['new_value'] = $values;
			$this->auditLogEntry($params);
			return $db->getInsertId();
		}else{
			return false;
		}				
	}
	
	public function updateUser($user_update_id, $user) {       
		$db = new database();	
		$table = 'users';
		$rows  = $user ;
		$where = 'user_id = "'.$user_update_id.'"';
		global $user_id;
		//$params['old_value'] = $this->GetUserDetail($user_update_id);
		if($db->update($table,$rows,$where) ){
			$params['table'] = $table;
			$params['action'] = 'update';
			$params['user'] = $user_id;
			$params['update_id'] = $user_update_id;
			$params['new_value']= json_encode($rows);
			$params['status'] = 1;
			$this->auditLogEntry($params);
			return true;
		}else{
			return false;
		}
	}
	

	public function deleteUser($user_delid) { 
		$db = new database();
		$rows = array('user_status'=>'0');
		$table = 'users';
		$where = 'user_id = "'.$user_delid.'" ';
		global $user_id;
		$params['new_value'] = $this->GetUserDetail($user_delid);
		if ($db->update($table,$rows,$where) ){
			$params['table'] = $table;
			$params['action'] = 'delete';
			$params['user'] = $user_id;
			$this->auditLogEntry($params);
			return true;
		}		
	}
	
	public function createLocation($location){
		$db = new database();
		$table  = "location";
		if(!isset($location['location_name'])){
			 throw new Exception('Location name cannot be blank!.');
		}
		(isset($location['location_description']) ? $location_description = $location['location_description'] : $location_description = "");
		(isset($location['location_cordinates']) ? $location_cordinates = $location['location_cordinates'] : $location_cordinates = "");
		$values = "'".$location['location_name']."',
				'".$location_description."', 
				'".$location_cordinates."'";					  
		$rows   = "location_name, 
				   location_description,
				   location_cordinates";
		
		if($db->insert($table,$values,$rows)){
			return true;
		}else{
			return false;
		}
	}
	
	public function getAllLocations($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= $key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();
		$table = 'location';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$location_list = $db->getJson();
		return $location_list;
	}
	
	public function updateLocation($location_id, $locations){
		$db = new database();	
		$table = 'location';
		$rows  = $locations ;
		$where = 'location_id = "'.$location_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deleteLocation($location_id){
		$db = new database();
		/*$table1 = 'location';
		$rows1 ='location_id';
		$where1 = 'location_id = "'.$location_id.'"';
		$db->select($table1,$rows1,$where1,'','');
		$NumRows = $db->getNumRows();	
		if( $NumRows > 1 ){
			return false;
		}*/
		$table = 'location';
		$where = 'location_id = "'.$location_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	public function getLocationDetail($location_id){
		$db = new database();
		$table = 'location';
		$rows ='*';
		$where = 'location_id = "'.$location_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	
	public function checkLogin($user_email, $user_password) {
		$db = new database();
		$params = array();	
		$table = 'users';
		$rows ='*';
		$where = 'user_email= "'.$user_email.'" AND user_password="'.md5($user_password).'" AND user_status = 1';
		
		$db->select($table,$rows,$where,'','');
		$logged_User = $db->getResults();
		
		if ($logged_User != NULL) {
			$params['action'] = 'login';
			$params['new_value'] = $user_email;
			$params['status'] = 1;
			$this->auditLogEntry($params);
			return TRUE;
		} else {
			$params['action'] = 'login';
			$params['new_value'] = $user_email;
			$params['status'] = 0;
			$this->auditLogEntry($params);
			return FALSE;
		}      
	}

	public function getUserByEmail($user_email) {
      $db = new database();
	  // fetching user by email
      $table = 'users';
      $rows ='*';
      $where = 'user_email= "'.$user_email.'"';
    
      $db->select($table,$rows,$where,'','');
      $logged_User = $db->getResults();
 	  return $logged_User;

   }
   	
	
	public function checkUserAvailability($user_email) {
		$db = new database();	
		$table = 'users';
		$rows ='*';
		$where = 'user_email= "'.$user_email.'"';
		
		$db->select($table,$rows,$where,'','');
		$avail_User = $db->getResults();
		//return true;
		if ($avail_User != NULL) {	      		
			return true;
		} else {                  
			return false;
		}      
	}

	public function createCompany($company) {
		
		$db = new database();
		$table  = "company";
		//return $user;
        
		if(!isset($company['company_type'])){
			throw new Exception('Please select company type!.');
		}elseif(!isset($company['company_name'])){
			 throw new Exception('Company name cannot be blank!.');
		}elseif(!isset($company['company_email'])){
			 throw new Exception('Company email cannot be blank!.');
		}
		
		(isset($company['company_contactNo']) ? $company_contactNo = $company['company_contactNo'] : $company_contactNo = "" );
		(isset($company['company_contactName']) ? $company_contactName = $company['company_contactName'] : $company_contactName = "" );
		(isset($company['company_alternateContact']) ? $company_alternateContact = $company['company_alternateContact'] : $company_alternateContact = "" );
		
		$values = "'".$company['company_type']."',
					  '".$company['company_name']."',
					  '".$company['company_email']."',
					  '".$company_contactNo."', 
					  '".$company_contactName."',
                      '".$company_alternateContact."'";		
					  
		$rows   = "company_type,
				   company_name,
                   company_email,
                   company_contact_no,
				   company_contact_name,
				   company_alternate_contact";		
        
		if($db->insert($table,$values,$rows) ){
			return $db->getInsertId();
		}else{
			return false;
		}				
	}
	
	
	public function getAllCompanies($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= $key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();
		$table = 'company';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$company_list = $db->getJson();
		return $company_list;
	}
	
	
	public function getCompanies($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= $key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();
		$table = 'company';
		$rows ='company_id, company_name';	
		$db->selectJson($table,$rows,$where,'','');
		$company_list = $db->getJson();
		return $company_list;
	}
	
	public function getCompanyDetail($company_id){
		$db = new database();
		$table = 'company';
		$rows ='*';
		$where = 'company_id = "'.$company_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	public function updateCompany($company_id, $company){
		$db = new database();	
		$table = 'company';
		$rows  = $company ;
		$where = 'company_id = "'.$company_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deleteCompany($company_id){
		$db = new database();
		$table = 'company';
		$where = 'company_id = "'.$company_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	
	public function createSupplier($supplier) {
		
		$db = new database();
		$table  = "supplier";
		//return $user;
        
		if(!isset($supplier['supplier_name'])){
			 throw new Exception('Supplier name cannot be blank!.');
		}elseif(!isset($supplier['supplier_email'])){
			 throw new Exception('Supplier email cannot be blank!.');
		}
		
		(isset($supplier['supplier_contactNo']) ? $supplier_contactNo = $supplier['supplier_contactNo'] : $supplier_contactNo = "" );
		(isset($supplier['supplier_contactName']) ? $supplier_contactName = $supplier['supplier_contactName'] : $supplier_contactName = "" );
		(isset($supplier['supplier_alternateContact']) ? $supplier_alternateContact = $supplier['supplier_alternateContact'] : $supplier_alternateContact = "" );
		
		$values = "'".$supplier['supplier_name']."',
					  '".$supplier['supplier_email']."',
					  '".$supplier_contactNo."', 
					  '".$supplier_contactName."',
                      '".$supplier_alternateContact."'";		
					  
		$rows   = "supplier_name,
                   supplier_email,
                   supplier_contact_no,
				   supplier_contact_name,
				   supplier_alternate_contact";		
        
		if($db->insert($table,$values,$rows) ){
			return $db->getInsertId();
		}else{
			return false;
		}				
	}
	
	
	public function getAllSuppliers($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= $key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();
		$table = 'company';
		$rows ='*';
		$where = 'company_type = 3';
		$db->selectJson($table,$rows,$where,'','');
		$supplier_list = $db->getJson();
		return $supplier_list;
	}
	
	public function getAllCustomers($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= $key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();
		$table = 'company';
		$rows ='*';
		$where = 'company_type = 2';
		$db->selectJson($table,$rows,$where,'','');
		$supplier_list = $db->getJson();
		return $supplier_list;
	}
	
	public function getSuplierDetail($supplier_id){
		$db = new database();
		$table = 'supplier';
		$rows ='*';
		$where = 'supplier_id = "'.$supplier_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	public function updateSupplier($supplier_id, $supplier){
		$db = new database();	
		$table = 'supplier';
		$rows  = $supplier ;
		$where = 'supplier_id = "'.$supplier_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deleteSupplier($supplier_id){
		$db = new database();
		$table = 'supplier';
		$where = 'supplier_id = "'.$supplier_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	public function createSingleOrder($order){
		
		if(!isset($order['order_company_id'])){
			 throw new Exception('Company sould be selected!');
		}elseif(!isset($order['order_supplier_id'])){
			 throw new Exception('Supplier sould be selected!');
		}elseif(!isset($order['order_location_id'])){
			 throw new Exception('Location sould be selected!');
		}elseif(!isset($order['order_plant'])){
			 throw new Exception('Plant cannot be blank!');
		}elseif(!isset($order['order_pickup'])){
			 throw new Exception('Pick-up sould be selected!');
		}elseif(!isset($order['order_pickup_day'])){
			 throw new Exception('Pick-up date sould be selected!');
		}elseif(!isset($order['order_arrival_day'])){
			 throw new Exception('Arrival Date sould be selected!');
		}elseif(!isset($order['order_stack'])){
			 throw new Exception('Stack cannot be blank!');
		}elseif(!isset($order['order_status'])){
			 throw new Exception('Stack cannot be blank!');
		}
		
		
		global $user_id;
		//$user = $this->GetUserDetail($user_id);
		$db = new database();
		$table = 'users';
		$rows ='*';
		$where = 'user_id = "'.$user_id.'"';	
		$db->select($table,$rows,$where,'','');
		$user = $db->getResults();
		
		$values = "'".$order['order_company_id']."',
					  '".$order['order_supplier_id']."',
					  '".$order['order_location_id']."',
					  '".$order['order_plant']."',
					  '".$order['order_pickup']."',
					  '".$order['order_pickup_day']."',
					  '".$order['order_arrival_day']."',
					  '".$order['order_stack']."',
					  '".$user_id."',";
		if($user['user_type']==1){
			$values .= "'".'2'."'";
		}else if($user['user_type']==2){
			$values .= "'".'1'."'";
		}else if($user['user_type']==3){
			$values = "'".'1'."'";
		}
		$db = new database();
		$table  = "orders";
		
		$rows   = "order_company_id,
		   order_supplier_id,
		   order_location_id,
		   order_plant,
		   order_pickup,
		   order_pickup_day,
		   order_arrival_day,
		   order_stack,
		   order_added_by,
		   order_status";
		
		if($db->insert($table,$values,$rows) ){
			$insertedId = $db->getInsertId();
			if(isset($order['order_comments'])){
				
				$params['comment_order_id']=$insertedId;
				$params['comment_description'] = $order['order_comments'];
				$comment = $this->addComment($params);
			}
			//print_r($user);
			//mail to requester
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
				$headers .= 'From: HEOS - Hybrid Logistics <info@hybridlogistics.ca>' . "\r\n";
				$content['user_name'] = $user['user_name'];
				$content['to'] = $user['user_email'];
				$content['mailType'] = "newOrderRequester";
				sendMail($content, $headers);
			
			//mail to company 
				$db = new database();
				$table = 'company';
				$rows ='*';
				$where = 'company_id = "'.$order['order_company_id'].'"';	
				$db->select($table,$rows,$where,'','');
				$company = $db->getResults();
			
			//print_r($company);
			if($user['user_type']==2){
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
				$headers .= 'From: HEOS - Hybrid Logistics <info@hybridlogistics.ca>' . "\r\n";
				$headers .= 'Cc: dhammika97@gmail.com' . "\r\n";
				$content['company_contact_name'] = $company['company_contact_name'];
				$content['to'] = $company['company_email'];
				$content['mailType'] = "newOrderOwn";
				sendMail($content, $headers);
			}else{
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
				$headers .= 'From: HEOS - Hybrid Logistics <info@hybridlogistics.ca>' . "\r\n";
				$headers .= 'Cc: dhammika97@gmail.com' . "\r\n";
				$content['company_contact_name'] = $company['company_contact_name'];
				$content['to'] = $company['company_email'];
				$content['mailType'] = "newOrderOther";
				sendMail($content, $headers);
			}
			//mail to supplier
				$db = new database();
				$table = 'company';
				$rows ='*';
				$where = 'company_id = "'.$order['order_supplier_id'].'"';	
				$db->select($table,$rows,$where,'','');
				$supplier = $db->getResults();
			
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
				$headers .= 'From: HEOS - Hybrid Logistics <info@hybridlogistics.ca>' . "\r\n";
				$content['company_contact_name'] = $supplier['company_contact_name'];
				$content['to'] = $supplier['company_email'];
				$content['mailType'] = "newOrderSupplier";
				sendMail($content, $headers);
			
			
			return $insertedId;
		}else{
			return false;
		}
	}
	
	public function addComment($params){
		global $user_id;
		//print_r($params);
		$db = new database();
		$tableComment = "order_comment";
		$valuesComment = "'".$params['comment_order_id']."',
						  '".$params['comment_description']."',
						  '".$user_id."'";
						  
		$rowsComment = "comment_order_id,
						comment_description,
						comment_user_id";
						
		$db->insert($tableComment,$valuesComment,$rowsComment);
		return true;
	}
	
	
	public function getAllOrders($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($key == 'order_pickup_end'){
				$pickup_end = $value;
			}elseif($key == 'order_pickup_start'){
				$pickup_start = $value;
			}elseif($key == 'order_location_id' && $value != 0){
				$location = $value;
			}elseif($key == 'order_company_id'){
				$customer_id = $value;
			}elseif($key == 'order_supplier_id'){
				$supplier_id = $value;
			}
			
			
			if(isset($pickup_start) && isset($pickup_end)){
				$where = '(order_pickup_day BETWEEN "'.$pickup_start.'" and "'. $pickup_end .'" ) ';
			}
			if(isset($location)){
				$where .= 'AND order_location_id = '.$location.' ' ;
			}
			if(isset($customer_id)){
				$where .= 'AND 	order_company_id = '.$customer_id ;
			}
			if(isset($supplier_id)){
				$where .= 'AND 	order_supplier_id = '.$supplier_id ;
			}
			
			$i++;
		}
		$where .= ' AND order_status != 4';
		$db = new database();
		$table = 'dataview';
		$rows ='*';
		//$where = 'company_type = 2';
		$db->selectJson($table,$rows,$where,'','');
		$orders_list = $db->getJson();
		return $orders_list;
	}
	
	public function updateOrder($order_id, $order){
		$db = new database();	
		$table = 'orders';
		$rows  = $order;
		$where = 'order_id = "'.$order_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function createPlant($location){
		$db = new database();
		$table  = "plants";
		if(!isset($location['plant_name'])){
			 throw new Exception('Plant name cannot be blank!.');
		}
		(isset($location['plant_description']) ? $plant_description = $location['plant_description'] : $plant_description = "");
		$values = "'".$location['plant_name']."',
				'".$plant_description."'";					  
		$rows   = "plant_name, 
				   plant_description";
		
		if($db->insert($table,$values,$rows)){
			return true;
		}else{
			return false;
		}
	}
	
	public function getAllPlants($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= $key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();
		$table = 'plants';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$location_list = $db->getJson();
		return $location_list;
	}
	
	public function updatePlant($location_id, $locations){
		$db = new database();	
		$table = 'plants';
		$rows  = $locations ;
		$where = 'plant_id = "'.$location_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deletePlant($location_id){
		$db = new database();
		/*$table1 = 'location';
		$rows1 ='location_id';
		$where1 = 'location_id = "'.$location_id.'"';
		$db->select($table1,$rows1,$where1,'','');
		$NumRows = $db->getNumRows();	
		if( $NumRows > 1 ){
			return false;
		}*/
		$table = 'location';
		$where = 'location_id = "'.$location_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	public function getPlantDetail($location_id){
		$db = new database();
		$table = 'location';
		$rows ='*';
		$where = 'location_id = "'.$location_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
}
?>
