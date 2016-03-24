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

	private function generateApiKey() {
		return strtoupper(md5(uniqid(rand(), true)));
	}
	
	private function auditLogEntry($params){
		$db = new database();
		$tables = 'audit_log';
		
		(isset($params['action']) ? $action = $params['action'] : $action = "" );
		(isset($params['table']) ? $table = $params['table'] : $table = "" );
		(isset($params['user']) ? $user = $params['user'] : $user = "" );
		(isset($params['status']) ? $status = $params['status'] : $status = "" );
		(isset($params['field']) ? $field = $params['field'] : $field = "" );
		(isset($params['old_value']) ? $old_value = $params['old_value'] : $old_value = "" );
		(isset($params['new_value']) ? $new_value = $params['new_value'] : $new_value = "" );
		
		$values = "'".$action."',
					'".$table."',
					'".$field."',
					'".$old_value."',
					'".$new_value."',
					'".$user."',
					'".$status."'";
		$rows = "log_action,
				 log_table,
				 log_field,
				 log_old_value,
				 log_new_value,
				 log_user,
				 log_status";
				
		$db->insert($tables,$values,$rows);
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
		$rows ='*';	
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
		
		$values = "'".$user['user_name']."',
                      '".md5 ($user['user_password'])."',
                      '".strtoupper(md5(uniqid(rand(), true)))."', 
					  '".$user['user_email']."', 
					  '".$user['user_type']."',
                      '".$user['user_company']."',
                      '".$user_contactNo."',
                      '1'";		
					  
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
			$params['action'] = 'create user';
			$params['user'] = $user_id;
			$params['field']='user_email';
			$params['new_value'] = $user['user_email'];
			$params['status'] = 1;
			$this->auditLogEntry($params);
			return $db->getInsertId();
		}else{
			return false;
		}				
	}
	
	public function updateUser($user_id, $user) {       
		$db = new database();	
		$table = 'users';
		$rows  = $user ;
		$where = 'user_id = "'.$user_id.'"';
		global $user_id;
		
		if($db->update($table,$rows,$where) ){
			$params['table'] = $table;
			$params['action'] = 'update user';
			$params['user'] = $user_id;
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
		$table = 'users';
		$where = 'user_id = "'.$user_delid.'" ';
		global $user_id;
		if ($db->delete($table,$where) ){
			$params['table'] = $table;
			$params['action'] = 'delete user';
			$params['user'] = $user_id;
			$params['new_value']= $user_delid;
			$params['status'] = 1;
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
			$params['table'] = $table;
			$params['action'] = 'login';
			$params['user'] = $logged_User['user_id'];
			$params['status'] = 1;
			$this->auditLogEntry($params);
			return TRUE;
		} else {
			$params['table'] = $table;
			$params['action'] = 'login';
			$params['field'] = 'user_email';
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
        
		if(!isset($company['company_name'])){
			 throw new Exception('Company name cannot be blank!.');
		}elseif(!isset($company['company_email'])){
			 throw new Exception('Company email cannot be blank!.');
		}
		
		(isset($company['company_contactNo']) ? $company_contactNo = $company['company_contactNo'] : $company_contactNo = "" );
		(isset($company['company_contactName']) ? $company_contactName = $company['company_contactName'] : $company_contactName = "" );
		(isset($company['company_alternateContact']) ? $company_alternateContact = $company['company_alternateContact'] : $company_alternateContact = "" );
		
		$values = "'".$company['company_name']."',
					  '".$company['company_email']."',
					  '".$company_contactNo."', 
					  '".$company_contactName."',
                      '".$company_alternateContact."'";		
					  
		$rows   = "company_name,
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
		$table = 'supplier';
		$rows ='*';	
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
}
?>
