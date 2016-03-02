<?php
session_start();
require_once 'include/database.php';
require_once 'include/DbHandler.php';
require_once 'include/PassHash.php';
require_once 'include/functions.php';
require 'libs/Slim/Slim.php';
 
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->add(new \Slim\Middleware\ContentTypes());

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');
	
/**
 * Adding Middle Layer to authenticate every request
 * Checking if the request has valid api key in the 'Authorization' header
 */
function authenticate(\Slim\Route $route) {
    // Getting request headers
    $headers = apache_request_headers();
    $response = array();
    $app = \Slim\Slim::getInstance();

    // Verifying Authorization Header
    if (isset($headers['Authorization'])) {
        $db = new DbHandler();

        // get the access token
        $user_accessToken = $headers['Authorization'];
        // validating Access Token
        if (!$db->isValidAccessToken($user_accessToken)) {
            // acess token not present in users table
            $response["error"] = true;
            $response["message"] = "Access Denied. Invalid Access Token";
            echoRespnse(401, $response);
            $app->stop();
        }        
    } else {
        // User Access Token is missing in header
        $response["error"] = true;
        $response["message"] = "invalid Request. Please login to the system";
        echoRespnse(400, $response);
        $app->stop();
    }
}



/**
 * Get all users
 * url - /userlist
 * method - GET
 * params - api Key*/

$app->get('/user', 'authenticate', function() {
		$request = \Slim\Slim::getInstance()->request();
		$params = $request->params();
		$response = array();
		$DbHandler = new DbHandler();		
		$result = $DbHandler->getAllUsers($params);
		if(!$result){
			$response["error"] = TRUE;
			$response["message"] = "The requested resource doesn't exists";
			echoRespnse(404, $response);
		}else{
			$response["error"] = false;
			$response['users'] = json_decode($result);
			echoRespnse(200, $response);
		}
});

/**
 * Get user by user id
 * url - /userlist
 * method - GET
 * params -user id*/		
$app->get('/user/:id', 'authenticate', function($user_id) {
		$response = array();
		$DbHandler = new DbHandler();	
		$result = $DbHandler->GetUserDetail($user_id);
        if ($result != NULL) {
        	$response["error"] = false;
			$response['user'] = json_decode($result);
			echoRespnse(200	, $response);
		} else {
			$response["error"] = true;
			$response["message"] = "The requested resource doesn't exists";
			echoRespnse(404, $response);
		}
	});	 

/**
 * Create user 
 * url - /userlist
 * method - POST
 * params -user object*/

$app->post('/user', 'authenticate', function() use ($app) {
		$users  = array();
		$response = array();
		$request = $app->request();
		$DbHandler = new DbHandler();

		$users = $request->getBody();		
		//verifyRequiredParams(array("user_email", "user_password"));
		if($DbHandler->createUser($users)){
			$response["error"] = false;
			$response["message"] = "user created successfully";
			echoRespnse(200, $response);				
			}else{
			$response["error"] = true;
			$response["message"] = "user creation failed!";
			echoRespnse(400, $response);
		}
});
		
/**
 * Update user 
 * url - /userlist
 * method - PUT
 * params -user object, user_id */
$app->put('/user/:id', 'authenticate', function($user_id) use ($app) {
		$request = $app->request();
		$DbHandler = new DbHandler();
		$response = array();
		$users =  $request->getBody();
		$result = $DbHandler->updateUser($user_id, $users);
		if ($result) {
			$response["error"] = false;
			$response["message"] = "User updated successfully";
			echoRespnse(200, $response);
		} else {                
			$response["error"] = true;
			$response["message"] = "User failed to update. Please try again!";
			echoRespnse(400, $response);
		}
});
 					
/**
 * Delete user 
 * url - /userlist/:id
 * method - DELETE
 * params - user_id */ 
$app->delete('/user/:id', 'authenticate', function($user_id) use($app) {
		$DbHandler = new DbHandler();
		$response = array();
		$result = $DbHandler->deleteUser($user_id);
		
		if ($result) {
			// user deleted successfully				
			$response["error"] = false;
			$response["message"] = "User deleted succesfully";
			echoRespnse(200, $response);
		} else {
			// task failed to delete
			$response["error"] = true;
			$response["message"] = "User failed to delete. Please try again!";
			echoRespnse(404, $response);
		}
});
		

/**
 * Get all locations
 * url - /locations
 * method - GET
 * params - api Key*/

$app->get('/locations',  function() {
		$request = \Slim\Slim::getInstance()->request();
		$params = $request->params();    
    
		$response = array();
		$DbHandler = new DbHandler();		
		$result = $DbHandler->getAllLocations($params);
		if (!$result) {
			$response["error"] = TRUE;
			$response["message"] = "The requested resource doesn't exists";
			echoRespnse(404, $response);
		} else {
			$response["error"] = false;
			$response['locations']=json_decode($result);
			echoRespnse(200, $response);
		}
});

/**
 * get location details
 * url - /locations/:id
 * method - GET
 * params - location id */ 
$app->GET('/locations/:id',  function($location_id) {
		$DbHandler = new DbHandler();
		$response = array();
		$row = $DbHandler->getLocationDetail($location_id);
		if ($row != NULL) {
			$response["error"] = false;
			$response["location"] = json_decode($row);
			echoRespnse(200, $response);
		} else {
			$response["error"] = true;
			$response["message"] = "The requested resource doesn't exists";
			echoRespnse(404, $response);
		}
}); 

/**
 * Create locations 
 * url - /locations
 * method - POST
 * params -location object*/

$app->post('/locations', 'authenticate', function() use ($app) {
		$location  = array();
		$response = array();
		$request = $app->request();
		$DbHandler = new DbHandler();

		$location = $request->getBody();		
		//verifyRequiredParams(array("user_email", "user_password"));
		if($DbHandler->createLocation($location)){
			$response["error"] = false;
			$response["message"] = "location created successfully";
			echoRespnse(201, $response);				
			}else{
			$response["error"] = true;
			$response["message"] = "location creation failed";	
			echoRespnse(200, $response);
		}
});
		
/**
 * Update location 
 * url - /locations
 * method - PUT
 * params - location object */
$app->put('/locations/:id', 'authenticate', function($location_id) use ($app) {
		$request = $app->request();
		$DbHandler = new DbHandler();
		$response = array();
		$location =  $request->getBody();
		$result = $DbHandler->updateLocation($location_id, $location);
		if ($result) {
			$response["error"] = false;
			$response["message"] = "Location updated successfully";
			echoRespnse(200, $response);
		} else {                
			$response["error"] = true;
			$response["message"] = "Location failed to update. Please try again!";
			echoRespnse(400, $response);
		}
});
 					
/**
 * Delete location
 * url - /locations/:id
 * method - DELETE
 * params - location id */ 
$app->delete('/locations/:id', 'authenticate', function($location_id) use($app) {
		$DbHandler = new DbHandler();
		$response = array();
		$result = $DbHandler->deleteLocation($location_id);
		
		if ($result) {			
			$response["error"] = false;
			$response["message"] = "Location deleted succesfully";
			echoRespnse(200, $response);
		} else {
			$response["error"] = true;
			$response["message"] = "Location failed to delete. Please delete the coraspond subers!";
			echoRespnse(400, $response);
		}
});



/**
 * User Login
 * url - /login
 * method - POST
 * params -email, password */
$app->post('/login', function() use ($app) {    						
		// reading post params
		if($app->request()->post('email')){
			$email = $app->request()->post('email');
			$password = $app->request()->post('password');
		}else{
			$params = $app->request()->getBody();
			$email= $params['email'];
			$password = $params['password'];
		}
		$response = array();
		$db = new DbHandler();
		if ($db->checkLogin($email, $password)) {
			//get the user by email
			$logged_User = $db->getUserByEmail($email);
			
			if ($logged_User != NULL) {
				$response["error"] = false;
				$response['accessToken'] = $logged_User['user_accessToken'];
				$response['message'] = "Successfully authenticated";
				echoRespnse(200, $response);
			} else {
				// unknown error occurred
				$response['error'] = true;
				$response['message'] = "An error occurred. Please try again";
				echoRespnse(200, $response);
			}
		} else {
			// user credentials are wrong
			$response['error'] = true;
			$response['message'] = 'Login failed. Incorrect credentials';
			echoRespnse(200, $response);
		}
			
});


/**
 * User Registration
 * url - /register
 * method - POST
 * params - $users object
 */
$app->post('/register', function() use ($app) {
            
        $users  = array();
		$response = array();
		$request = $app->request();
		$DbHandler = new DbHandler();

		$users = $request->getBody();
		//echo print_r($users);	
		$users['user_type']='3';
		if($users['user_password']!=$users['user_confirmPassword']){
			$response["error"] = true;
			$response["message"] = "Password mis-matched!";
			echoRespnse(409, $response);
			return;
		}
		if($DbHandler->checkUserAvailability($users['user_email'])){
			$response["error"] = true;
			$response["message"] = "User already exist! please login to the system";
			echoRespnse(409, $response);
		}else{
			if($userId = $DbHandler->createUser($users)){
				$defaultPackageList = json_decode($DbHandler->getAllDefaultPackages(),true);
				for($i=0; $i<count($defaultPackageList);$i++){
					$DbHandler->CreateUserPackages($userId,$defaultPackageList[$i]['package_id'],$defaultPackageList[$i]['package_adLimit']);
				}
				$response["error"] = false;
				$response["message"] = "Congradulations! We have sent an activation email to ".$users['user_email']." Please activate your account first";
				echoRespnse(200, $response);
			}else{
				$response["error"] = true;
				$response["message"] = "User creation failed!, Please contact system administrator";
				echoRespnse(412, $response);
			}
		}
});



$app->run();
		
		
?>
