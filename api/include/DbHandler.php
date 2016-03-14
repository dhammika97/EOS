<?php

/**
 * Class to handle all db operations
 * This class will have CRUD methods for database tables
 */
class DbHandler {

	public function getCategoryMatrix($params){
		$where = 'category_status=1';
		$db = new database();
		$table = 'category c inner join category_sub s on c.category_id = s.category_sub_parentId';
		$rows ='c.category_id,c.category_name,s.category_sub_id,s.category_sub_name,s.category_sub_tplType';	
		$db->selectJson($table,$rows,$where,'','','');
		$subcategories = $db->getJson();
		return $subcategories;
	}


	public function isValidAccessToken($user_accessToken) {     
		$db = new database();
		$table = 'users';
		$rows ='*';
		$where = 'user_accessToken = "'.$user_accessToken.'"';	
		$db->select($table,$rows,$where,'','');
		$user = $db->getResults();
		return $user;	
	}
	
	public function getUserId($api_key) {
		$stmt = $this->conn->prepare("SELECT id FROM users WHERE api_key = ?");
		$stmt->bind_param("s", $api_key);
		if ($stmt->execute()) {
			$stmt->bind_result($user_id);
			$stmt->fetch();
			$stmt->close();
			return $user_id;
		} else {
			return NULL;
		}
	}

	private function generateApiKey() {
		return strtoupper(md5(uniqid(rand(), true)));
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
        
		if($db->insert($table,$values,$rows) ){
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
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	

	public function deleteUser($user_id) { 
		$db = new database();
		$table = 'users';
		$where = 'user_id = "'.$user_id.'" ';
		if ($db->delete($table,$where) ){
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
	$table = 'users';
	$rows ='*';
	$where = 'user_email= "'.$user_email.'" AND user_status = 1';
	
	$db->select($table,$rows,$where,'','');
	$logged_User = $db->getResults();
	//return true;
	if ($logged_User != NULL) {
		if ($logged_User["user_password"]== md5($user_password)) {
			return TRUE;
		} else {	      		
			return FALSE;
		}
	} else {                  
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
   	
	
	public function createRegisteredUser( $users) {
		$date= date('y-m-d');
		$db = new database();
		$table  = "user";
		
		(isset($users['user_firstname']) ? $user_firstname = $users['user_firstname'] : $user_firstname = "" );
		(isset($users['user_lastname']) ? $user_lastname = $users['user_lastname'] : $user_lastname = "" );
		(isset($users['user_address1']) ? $user_address1 = $users['user_address1'] : $user_address1 = "" );
		(isset($users['user_address2']) ? $user_address2 = $users['user_address2'] : $user_address2 = "" );
		(isset($users['user_city']) ? $user_city = $users['user_city'] : $user_city = "" );
		(isset($users['user_contactNo']) ? $user_contactNo = $users['user_contactNo'] : $user_contactNo = "" );
		
		$values = "'".$users['user_username']."', 
					  '".md5 ($users['user_password'])."', 
					  '".$users['user_email']."', 
					  '".$user_firstname."', 
					  '".$user_lastname."', 
					  '".$user_address1."', 
					  '".$user_address2."', 
					  '".$user_city."',
					  '".$user_contactNo."', 
					  '".$date."', 
					  '".$users['user_type']."',
					  '1',
					  '".strtoupper(md5(uniqid(rand(), true)))."'";		
					  
		$rows   = "user_username, 
				   user_password,
				   user_email,
				   user_firstname,
				   user_lastname,
				   user_address1,
				   user_address2,
				   user_city,
				   user_contactNo,
				   user_registeredDate,
				   user_type,
				   user_status,
				   user_accessToken";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}				
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
		$location_list = $db->getJson();
		return $location_list;
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
	
}
?>
