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
	
	public function updateUser($user_id, $users) {       
		$db = new database();	
		$table = 'user';
		$rows  = $users ;
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
    public function getAllFixedAd($params) {
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
		$table = 'fixedads';
		$rows ='*';
		$db->selectJson($table,$rows,$where,'','','');
		$fixedad_list = $db->getJson();
		return $fixedad_list;
	}
	public function getAllFixedAdds($params) {
		$where = 'fixedads_type = "'.$params['fixedads_type'].'" AND fixedads_status = "'.$params['fixedads_status'].'"';
		$addtype = $params['fixedads_type'];
		$limit = '';
		if(isset($addtype)){
			
			switch ($addtype) {
				case 1:
					$limit = '1';
					break;
				case 4:
					$limit = '1';
					break;
				case 5:
					$limit = '1';
					break;
				
				default:
					$limit = '2';
			}	
		}
		
		$db = new database();    
		$table = 'fixedads';
		$rows ='*';
		$db->selectJson($table,$rows,$where,'RAND()',$limit,'');
		$fixedad_list = $db->getJson();
		return $fixedad_list;
	}

	public function GetFixedAdvertismentDetail($fixedads_id) {           
		  $db = new database();
		  $table = 'fixedads';
		  $rows ='*';
		  $where = 'fixedads_id = "'.$fixedads_id.'"';
		  $db->selectJson($table,$rows,$where,'','','');
		  $user = $db->getJson();
		  return $user; 
	}

	public function createFixedAdvertisment( $fixed_advertisment) {
		$db = new database();
		$table  = "fixedads";
		
		isset($fixed_advertisment['fixedads_title']) ? $fixedads_title = $fixed_advertisment['fixedads_title'] : $fixedads_title = "" ;
		isset($fixed_advertisment['fixedads_type']) ? $fixedads_type = $fixed_advertisment['fixedads_type'] : $fixedads_type = "" ;
		isset($fixed_advertisment['fixedads_image']) ? $fixedads_image = $fixed_advertisment['fixedads_image'] : $fixedads_image = "" ;		
		isset($fixed_advertisment['fixedads_url']) ? $fixedads_url = $fixed_advertisment['fixedads_url'] : $fixedads_url = "" ;
		
		$values = "'".$fixedads_title."',
				  '".$fixedads_type."',
				  '".$fixedads_image."',
				  '".$fixedads_url."',              
				  '1'";
		$rows="fixedads_title,
			   fixedads_type, 
			   fixedads_image,
			   fixedads_url,
			   fixedads_status";
		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}				
	}


	public function updateFixedAdvertisment($fixedads_id, $fixed_advertisment) {       
	   $db = new database();   
	   $table = 'fixedads';
	   $rows  = $fixed_advertisment ;
	   $where = 'fixedads_id = "'.$fixedads_id.'"';
	   if($db->update($table,$rows,$where) ){
			return true;
	   }else{
			return false;
	   }
	}
	
	public function deleteFixedAdvertisment($fixedads_id) { 
		$db = new database();
		$table = 'fixedads';
		$where = 'fixedads_id = "'.$fixedads_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		} else{
			return false;
		}
	}
	
	public function getAllCategories($params){
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
		$table = 'category';
		$rows ='*';
		$db->selectJson($table,$rows,$where,'','','');
		$category_list = $db->getJson();
		return $category_list;
	}
	public function getAllCategoriesWithCount($params){
		$where = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where .= ' AND '.$key .'='.$value.' AND ';
			else
			$where .= $key .'='.$value;
			$i++;
		}
		$db = new database();  
		$table = 'category c, advertisment a';
		$rows ='c.* , count( a. advertisment_id) as addCount';
		$where_query = 'a.advertisement_categoryId = c.category_id'.$where;
		$group_by = 'c.category_id';
		$db->selectJson($table,$rows,$where_query,'','',$group_by);
		$category_list = $db->getJson();
		return $category_list;
	}
	
	//SELECT c.* , count( a. advertisment_id)
//FROM category c, advertisment a
//where a.advertisement_categoryId = c.category_id
//GROUP BY c.category_id


	public function GetCategoryDetail($category_id){
		$db = new database();
		$table = 'category';
		$rows ='*';
		$where = 'category_id = "'.$category_id.'" AND category_status = "1" ';
		$db->selectJson($table,$rows,$where,'','','');
		$user = $db->getJson();
		return $user;			
	}

	public function addCategory($category){
		$db = new database();
		$table1 = 'category';
		$rows1 ='category_name';
		$where1 = 'category_name = "'.$category['category_name'].'"';
		$db->select($table1,$rows1,$where1,'','');
		$categoryNumRows = $db->getNumRows();	
		if( $categoryNumRows > 1 ){
			return false;
		}
		$table  = "category";
		(isset($category['category_name']) ? $category_name = $category['category_name'] : $category_name = "" );
		(isset($category['category_enteredBy']) ? $category_enteredBy = $category['category_enteredBy'] : $category_enteredBy = "" );
		(isset($category['category_parentId']) ? $category_parentId = $category['category_parentId'] : $category_parentId = "" );
		$values = "'".$category_name."', 
				  '".$category_enteredBy."' , 
				  '".$category_parentId."'";				
		$rows   = "category_name, category_enteredBy, category_parentId";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}
	}
	
	public function updateCateory( $category, $category_id){
		$db = new database();	   
		$table = 'category';
		$rows  = $category;
		$where = 'category_id = "'.$category_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}

	public function deleteCategory($category_id){
		$db = new database();
		$table1 = 'category_sub';
		$rows1 ='*';
		$where1 = '	category_sub_parentId = "'.$category_id.'"';
		$db->select($table1,$rows1,$where1,'','');
		$NumRows = $db->getNumRows();	
		if( $NumRows > 1 ){
			return false;
		}
		$table = 'category';
		$where = 'category_id = "'.$category_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}	
	}

	public function getAllsubCategorys($params){
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
		$table = 'category_sub';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','','');
		$subcategories = $db->getJson();
		return $subcategories;
	}
	

	public function GetsubCategoryDetail($id){
		$db = new database();
		$table = 'category_sub';
		$rows ='*';
		$where = 'category_sub_id = "'.$id.'"';
		$db->selectJson($table,$rows,$where,'','','');
		$subcategory = $db->getJson();
		return $subcategory;	
	}

	public function addsubCategory($category){	
		$db = new database();
		$table  = "category_sub";
		(isset($category['category_sub_tplType']) ? $category_sub_tplType = $category['category_sub_tplType'] : $category_sub_tplType = "" );
		(isset($category['category_sub_name']) ? $category_sub_name = $category['category_sub_name'] : $category_sub_name = "" );
		(isset($category['category_sub_enteredBy']) ? $category_sub_enteredBy = $category['category_sub_enteredBy'] : $category_sub_enteredBy = "" );
		(isset($category['category_sub_parentId']) ? $category_sub_parentId = $category['category_sub_parentId'] : $category_sub_parentId = "" );
		$values = "'".$category_sub_name."', '".$category_sub_parentId."' , '".$category_sub_enteredBy."','".$category_sub_tplType."'";								
		$rows   = "category_sub_name, category_sub_enteredBy, category_sub_parentId, category_sub_tplType";
		if($db->insert($table,$values,$rows) ){
			return true;
		}	
	}
	
	public function updatesubCategory($subCategory, $category_sub_id){
		$db = new database();  
		$table = 'category_sub';
		$rows  = $subCategory ;
		$where = 'category_sub_id = "'.$category_sub_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}	
	
	public function deleteSubCategory($category_sub_id){
		$db = new database();
		$table = 'category_sub';
		$where = 'category_sub_id = "'.$category_sub_id.'" ';
		if ($db->delete($table,$where) ){
				return true;
		}
	}
	
	public function createLocation($location){
		$db = new database();
		$table  = "locations";
		$values = "'".$location['location_name']."', 
				'".$location['location_cordinates']."'";					  
		$rows   = "location_name, 
				   location_cordinates";		
		if($db->insert($table,$values,$rows) ){
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
		$table = 'locations';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$location_list = $db->getJson();
		return $location_list;
	}
	
	public function updateLocation($location_id, $locations){
		$db = new database();	
		$table = 'locations';
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
		$table1 = 'suburbs';
		$rows1 ='suburb_id';
		$where1 = 'suburb_location_id = "'.$location_id.'"';
		$db->select($table1,$rows1,$where1,'','');
		$NumRows = $db->getNumRows();	
		if( $NumRows > 1 ){
			return false;
		}
		$table = 'locations';
		$where = 'location_id = "'.$location_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	public function getLocationDetail($location_id){
		$db = new database();
		$table = 'locations';
		$rows ='*';
		$where = 'location_id = "'.$location_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	public function addPage($page){
		$db = new database();
		$table1 = 'pages';
		$rows1 ='page_title';
		$where1 = 'page_title = "'.$page['page_title'].'"';
		$db->select($table1,$rows1,$where1,'','');
		$pageNumRows = $db->getNumRows();	
		if( $pageNumRows > 1 ){
			return false;
		}
		$table  = "pages";
		$values = "'".$page['page_title']."', '".$page['page_content']."','".$page['page_addedBy']."'";				
		$rows   = "page_title,page_content, page_addedBy";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}
	}
	public function updatePages($page, $page_id){
		$db = new database();  
		$table = 'pages';
		$rows  = $page;
		$where = 'page_id = "'.$page_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}	
	public function deletePage($page_id){
		$db = new database();
		$table = 'pages';
		$where = 'page_id = "'.$page_id.'"';
		if ($db->delete($table,$where) ){
				return true;
		}
	}
	
	public function getAllPages($params){
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
		$table = 'pages';
		$rows ='*';
		$db->selectJson($table,$rows,$where,'','');
		$pages_list = $db->getJson();
		return $pages_list;
	}
	public function GetPageDetail($page_id){
		$db = new database();
		$table = 'pages';
		$rows ='*';
		$where = 'page_id = "'.$page_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;			
	}	

public function checkLogin($user_email, $user_password) {
	$db = new database();	
	$table = 'user';
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
      $table = 'user';
      $rows ='*';
      $where = 'user_email= "'.$user_email.'"';
    
      $db->select($table,$rows,$where,'','');
      $logged_User = $db->getResults();
 	  return $logged_User;

   }
   	
	public function addPageContent($pageContent){
		$db = new database();
		/*$table1 = 'pagecontent';
		$rows1 ='pageContent_pageTitle';
		$where1 = 'pageContent_pageTitle = "'.$pageContent['pageContent_pageTitle'].'"';
		$db->select($table1,$rows1,$where1,'','');
		$pageNumRows = $db->getNumRows();	
		if( $pageNumRows > 1 ){
			return false;
		}*/
		$table  = "pagecontent";
		$values = "'".$pageContent['pageContent_pageId']['page_id']."', '".$pageContent['pageContent_Description']."'";				
		$rows   = "pageContent_pageId, pageContent_Description";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}
	}
	public function updatePagesContent($pageContent, $pageContent_id){
		$db = new database();  
		$table = 'pagecontent';
		$rows  = $pageContent;
		$where = 'pageContent_id = "'.$pageContent_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}	
	public function deletePageContent($pageContent_id){
		$db = new database();
		$table = 'pagecontent';
		$where = 'pageContent_id = "'.$pageContent_id.'"';
		if ($db->delete($table,$where) ){
				return true;
		}
	}
	
	public function getAllPagesContent(){
		$db = new database();  
		$table = 'pagecontent';
		$rows ='*';
		
		$db->selectJson($table,$rows,'','','');
		$pages_list = $db->getJson();
		return $pages_list;
	}
	public function GetPageContentDetail($pageContent_id){
		$db = new database();
		$table = 'pagecontent';
		$rows ='*';
		$where = 'pageContent_id = "'.$pageContent_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;			
	}
	
	
	public function createSuburb($suburb){
		$db = new database();
		$table  = "suburbs";
		$values = "'".$suburb['suburb_location_id']."', 
				'".$suburb['suburb_name']."',
				'".$suburb['suburb_cordinates']."'";					  
		$rows   = "suburb_location_id, 
				   suburb_name,
				   suburb_cordinates";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function getAllSuburbs($params){
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
		$table = 'suburbs';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$location_list = $db->getJson();
		return $location_list;
	}
	
	public function GetSuburbDetail($suburb_id){
		$db = new database();
		$table = 'suburbs';
		$rows ='*';
		$where = 'suburb_id = "'.$suburb_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	public function updateSuburb($suburb_id, $suburbs){
		$db = new database();	
		$table = 'suburbs';
		$rows  = $suburbs ;
		$where = 'suburb_id = "'.$suburb_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deleteSuburb($suburb_id){
		$db = new database();
		$table = 'suburbs';
		$where = 'suburb_id = "'.$suburb_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	public function addEvent($event){
		$db = new database();
		$table1 = 'events';
		$rows1 ='event_title';
		$where1 = 'event_title = "'.$event['event_title'].'"';
		$db->select($table1,$rows1,$where1,'','');
		$pageNumRows = $db->getNumRows();	
		if( $pageNumRows > 1 ){
			return false;
		}
		
		$table  = "events";
		(isset($event['event_title']) ? $event_title = $event['event_title'] : $event_title = "" );
		(isset($event['event_description']) ? $event_description = $event['event_description'] : $event_description = "" );
		(isset($event['event_date']) ? $event_date = $event['event_date'] : $event_date = "" );
		(isset($event['event_shortDescription']) ? $event_shortDescription = $event['event_shortDescription'] : $event_shortDescription = "" );
		(isset($event['event_image']) ? $event_image = $event['event_image'] : $event_image = "" );
		$values = "'".$event_title."', '".$event_date."', 
				  '".$event_shortDescription."', '".$event_description."', '".$event_image."'";				
		$rows   = "event_title, event_date, event_shortDescription, event_description,event_image";		 
		if($db->insert($table,$values,$rows) ){
			return true;
		}
	}
	public function updateEvent($event, $event_id){
		$db = new database();  
		$table = 'events';
		$rows  = $event;
		$where = 'evenet_id = "'.$event_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}	
	public function deleteEvent($event_id){
		$db = new database();
		$table = 'events';
		$where = 'evenet_id = "'.$event_id.'"';
		if ($db->delete($table,$where) ){
				return true;
		}
	}
	
	public function getAllEvents($params){
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
		$table = 'events';
		$rows ='*';
		
		$db->selectJson($table,$rows,$where,'','','');
		$pages_list = $db->getJson();
		return $pages_list;
	}
	public function GetEventDetail($evenet_id){
		$db = new database();
		$table = 'events';
		$rows ='*';
		$where = 'evenet_id = "'.$evenet_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;			
	}
	
	public function createSlider($slider){
		$db = new database();
		$table  = "sliders";
		(isset($slider['slider_title']) ? $slider_title = $slider['slider_title'] : $slider_title = "" );
		(isset($slider['slider_image']) ? $slider_image = $slider['slider_image'] : $slider_image = "" );
		(isset($slider['slider_url']) ? $slider_url = $slider['slider_url'] : $slider_url = "" );
		
		$values = "'".$slider_title."', 
				'".$slider_image."',
				'".$slider_url."'";					  
		$rows   = "slider_title, 
				   slider_image,
				   slider_url";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function getAllSliders($params){
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
		$table = 'sliders';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$location_list = $db->getJson();
		return $location_list;
	}
	
	public function GetSliderDetail($slider_id){
		$db = new database();
		$table = 'sliders';
		$rows ='*';
		$where = 'slider_id = "'.$slider_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	public function updateSlider($slider_id, $slider){
		$db = new database();	
		$table = 'sliders';
		$rows  = $slider ;
		$where = 'slider_id = "'.$slider_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deleteSlider($slider_id){
		$db = new database();
		$table = 'sliders';
		$where = 'slider_id = "'.$slider_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	public function createNews($news){
		$date= date('y-m-d');
		(isset($news['news_image']) ? $news_image = $news['news_image'] : $news_image = "" );
		$db = new database();
		$table  = "news";
		$values = "'".$news['news_title']."', 
				'".$news['news_shortDescription']."',
				'".$news['news_Description']."',
				'".$news_image."',
				'".$date."',
				'1'";					  
		$rows   = "news_title, 
				   news_shortDescription,
				   news_Description,
				   news_image,
				   news_date,
				   news_status";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function getAllNews($params){
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
		$table = 'news';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$location_list = $db->getJson();
		return $location_list;
	}
	
	public function GetNewsDetail($news_id){
		$db = new database();
		$table = 'news';
		$rows ='*';
		$where = 'news_id = "'.$news_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	public function updateNews($news_id, $news){
		$db = new database();	
		$table = "news";
		$rows  = $news ;
		$where = "news_id = '".$news_id."'";
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deleteNews($news_id){
		$db = new database();
		$table = 'news';
		$where = 'news_id = "'.$news_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
	}
	
	public function createPackageType($packageType){
		(isset($packageType['packageType']) ? $package_type = $packageType['packageType'] : $package_type = "" );
		(isset($packageType['package_name']) ? $package_name = $packageType['package_name'] : $package_name = "" );
		(isset($packageType['package_Description']) ? $package_description = $packageType['package_Description'] : $package_description = "" );
		(isset($packageType['package_price']) ? $package_price = $packageType['package_price'] : $package_price = "" );
		(isset($packageType['package_adLimit']) ? $package_adLimit = $packageType['package_adLimit'] : $package_adLimit = "" );
		
		$db = new database();
		$table  = "packagetypes";
		$values = "'".$package_type."',
				'".$package_name."', 
				'".$package_description."',
				'".$package_price."',
				'".$package_adLimit."',
				'1',
				'1'";					  
		$rows   = "packageType,
				   package_name, 
				   package_Description,
				   package_price,
				   package_adLimit,
				   package_addedBy,
				   package_status";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function getAllPackageTypes($params){
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
		$table = 'packagetypes';
		$rows ='*';	
		$db->selectJson($table,$rows,$where,'','');
		$location_list = $db->getJson();
		return $location_list;
	}
	
	public function GetPackageTypeDetail($packageType_id){
		$db = new database();
		$table = 'packagetypes';
		$rows ='*';
		$where = 'package_id = "'.$packageType_id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$page = $db->getJson();
		return $page;
	}
	
	public function updatePackageType($packageType_id, $packageType){
		$db = new database();	
		$table = 'packagetypes';
		$rows  = $packageType ;
		$where = 'package_id = "'.$packageType_id.'"';
		if($db->update($table,$rows,$where) ){
			return true;
		}else{
			return false;
		}
	}
	
	public function deletePackageType($packageType_id){
		$db = new database();
		$table = 'packagetypes';
		$where = 'package_id = "'.$packageType_id.'" ';
		if ($db->delete($table,$where) ){
			return true;
		}
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
		$table = 'user';
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

	public function getAllDefaultPackages(){

		$db = new database();  
		$table = ' packagetypes';
		$rows ='package_id,package_adLimit';
		$where = 'packageType = 0';		
		$db->selectJson($table,$rows,$where,'','');
		$default_package_list = $db->getJson();
		return $default_package_list;
	}

	public function CreateUserPackages($userpkg_userId,$userpkg_pkgId,$userpkg_remainAds){
		$db = new database();
		
		$table  = "userpackge";
		$values = "'".$userpkg_userId."', 					 
					  '".$userpkg_pkgId."',
					  '".$userpkg_remainAds."', 
					  '1'";	
					 				  
		$rows   = "userpkg_userId, 
				   userpkg_pkgId,
				   userpkg_remainAds,
				   userpkg_status";		
		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}	
	}


	public function addUserSubscription($userSubscription){	
			$db = new database();
			$table  = "usersubscription";
			(isset($userSubscription['subscription_email']) ? $subscription_email = $userSubscription['subscription_email'] : $subscription_email = "" );
			
			$values = "'".$subscription_email."',  
			 			'1'";	
						
			$rows   = "subscription_email,subscription_status";
			if($db->insert($table,$values,$rows) ){
				return true;
			}	
		}  	
	public function advertismentDetail($id){
		$db = new database();
		$table = 'advertisment a , locations l, suburbs s, category_sub c';
		$rows ='a.advertisement_title,a.advertisement_contactName,a.advertisement_price,a.advertisement_description,a.advertisement_attributes
		,a.advertisement_contactNo,date(a.advertisement_date) as date,
				time(a.advertisement_date) as time , 
				l.location_name, 	
				l.location_cordinates,s.suburb_name,s.suburb_cordinates, c.category_sub_name';
		$where = 'a.advertisement_location= l.location_id
				 AND a.advertisement_suburb = s.suburb_id
				 AND a.advertisement_subCategoryId	 = c.category_sub_id
				 AND a.advertisment_id = "'.$id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$prod = json_decode($db->getJson(),true);
		//print_r ($prod);
		$db = new database();
		$table = 'advertisement_images';
		$rows = 'advertisement_image';
		$where = 'advertisement_id = "'.$id.'"';
		$db->selectJson($table,$rows,$where,'','');
		$images = $db->getJson();
		$images = json_decode($images,true);
		$obj = array_merge($prod,$images);
		//print_r( $obj);
		//$add = $db->getJson();
		$add = json_encode($obj);
		return $add;
	}	
	
	public function advertisments($params){
		//$catid = $params['categoryID'];
		$where_atri = '';
		$i = 1;
		
		
		foreach($params as $key => $value){
			if($i != count($params) )
			$where_atri .= ' AND '.$key .'='.$value;
			else
			$where_atri .= ' AND '.$key .'="'.$value.'"';
			$i++;
		}
		
		
		$db = new database();
		$table = 'advertisment a, advertisement_images i, locations l , category_sub c, suburbs s';
		$rows  ='a.advertisement_title, a.advertisment_id as aid, a.advertisement_price as price, a.advertisement_description, i.advertisement_image, s.suburb_name as suberb, s.suburb_id as suburbid
				,date(a.advertisement_date) as date,time(a.advertisement_date) as time, l.location_name as location, 
				l.location_id as locationid,c.category_sub_name as category,c.category_sub_id as categoryid';
		$where = 'a.advertisment_id = i.advertisement_id
				 AND advertisement_suburb = s.suburb_id	
				 AND advertisement_location = l.location_id 
				 AND advertisement_status = "1"
				 AND a.advertisement_subCategoryId = c.category_sub_id'.$where_atri;
		$db->selectJson($table,$rows,$where,'','');
		$add = $db->getJson();
		return $add;
	}
	
	public function createAdvertisment( $advertisment) {
		$db = new database();
		$advertisement_expire= $end = date('Y-m-d', strtotime('+1 years'));
		$table  = "advertisment";
		
		isset($advertisment['advertisement_attributes']) ? $advertisement_attributes = $advertisment['advertisement_attributes'] : $advertisement_attributes = "" ;		
		isset($advertisment['advertisement_title']) ? $advertisement_title = $advertisment['advertisement_title'] : $advertisement_title = "" ;
		isset($advertisment['advertisement_description']) ? $advertisement_description = $advertisment['advertisement_description'] : $advertisement_description = "" ;
		
		$values = "'".$advertisment['advertisement_categoryId']."',
				  '".$advertisment['advertisement_subCategoryId']."',
				  '".$advertisement_attributes."',
				  '".$advertisement_title."', 				 
				  '".$advertisement_description."',
				  '".$advertisment['advertisement_price']."',
				  '".$advertisment['advertisement_contactName']."',
				  '".$advertisment['advertisement_contactNo']."',
				  '".$advertisment['advertisement_contactEmail']."',              
				  '1',
				  '".$advertisement_expire."'";
		$rows="advertisement_categoryId,
			   advertisement_subCategoryId, 
			   advertisement_attributes,
			   advertisement_title,
			   advertisement_description, 
			   advertisement_price,
			   advertisement_contactName,
			   advertisement_contactNo,	
			   advertisement_contactEmail,			   
			   advertisement_status,
			   advertisement_expire";
		if($db->insert($table,$values,$rows) ){
			return $db->getInsertId();
		}else{
			return false;
		}				
	}

	public function CreateAdvertismentImage( $advertisement_id,$advertisement_image) {
		$db = new database();		
		$table  = "advertisement_images";
		
		isset($advertisment['advertisement_image']) ? $advertisement_image = $advertisment['advertisement_image'] : $advertisement_image = "" ;		
		
		$values = "'".$advertisement_id."',			
				  '".$advertisement_image."'";
		$rows="advertisement_id,
			   advertisement_image";

		if($db->insert($table,$values,$rows) ){
			return true;
		}else{
			return false;
		}				
	}
	
public function advertismentsByLocation($params){
		$where_atri = '';
		$i = 1;
		foreach($params as $key => $value){
			if($i != count($params) )
			$where_atri .= ' AND '.$key .'='.$value;
			else
			$where_atri .= ' AND '.$key .'="'.$value.'"';
			$i++;
		}
		$db = new database();
		$table = 'advertisment a, advertisement_images i,locations l, suburbs s , category_sub c';
		$rows  ='a.advertisement_title, a.advertisment_id, a.advertisement_price as price, a.advertisement_description, i.advertisement_image
				,date(a.advertisement_date) as date,time(a.advertisement_date) as time, s.suburb_name as suburb, 
				s.suburb_id as suburbid,c.category_sub_name as category,c.category_sub_id as categoryid';
		$where = 'a.advertisment_id = i.advertisement_id
				 AND advertisement_suburb = s.suburb_id
				 AND advertisement_location = l.location_id
				 AND advertisement_status = "1"
				 AND a.advertisement_subCategoryId = c.category_sub_id'.$where_atri;
		$db->selectJson($table,$rows,$where,'','');
		$add = $db->getJson();
		return $add;
	}
	
	
}
?>
