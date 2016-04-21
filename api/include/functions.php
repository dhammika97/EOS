<?php

function echoRespnse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');
	
    echo json_encode($response);
		
}



function verifyRequiredParams($required_fields) {
    $error = false;
    $error_fields = "";
    $request_params = array();
    $request_params = $_REQUEST;
    // Handling PUT request params
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $app = \Slim\Slim::getInstance();
        parse_str($app->request()->getBody(), $request_params);
    }
    foreach ($required_fields as $field) {
        if (!isset($request_params[$field]) || strlen(trim($request_params[$field])) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["error"] = true;
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoRespnse(400, $response);
        $app->stop();
    }
}

function validateEmail($email) {
    $app = \Slim\Slim::getInstance();
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["error"] = true;
        $response["message"] = 'Email address is not valid';
        echoRespnse(400, $response);
        $app->stop();
    }
}

function sendMail($content, $headers){
    switch ($content['mailType']) {
	case 'newOrderRequester':
	$subject ='Hybrid Logistics - New order request!';
	$message = '
	
				<html>
				<body>
					<p>
					Hi '.$content['user_name'].',
					</p>
					<p>
					Your oder request has added succesfully to the system.<br> 
					Thank you for connecting with Hybrid Logistics<br>
					</p>
					<p>
						Best Regards!<br>
						Team Hybrid
					</p>
					  
				</body>
				</html>';
	break;
	case 'newOrderOwn':
	$subject ='Hybrid Logistics - New order request!';
	$message = '
	
				<html>
				<body>
					<p>
					Hi '.$content['company_contact_name'].',
					</p>
					<p>
					Your oder request has added succesfully to the system.<br> 
					Thank you for connecting with Hybrid Logistics<br>
					</p>
					<p>
						Best Regards!<br>
						Team Hybrid
					</p>
					  
				</body>
				</html>';
	break;
	case 'newOrderOther':
	$subject ='Hybrid Logistics - New order request!';
	$message = '
	
				<html>
				<body>
					<p>
					Hi '.$content['company_contact_name'].',
					</p>
					<p>
					New oder request has been added to the system. Please review and ACCEPT.<br> 
					Thank you for connecting with Hybrid Logistics<br>
					</p>
					<p>
						Best Regards!<br>
						Team Hybrid
					</p>
					  
				</body>
				</html>';
	break;
	case 'newOrderSupplier':
	$subject ='Hybrid Logistics - New order request!';
	$message = '
	
				<html>
				<body>
					<p>
					Hi '.$content['company_contact_name'].',
					</p>
					<p>
					New oder request has been added to the system.<br> 
					Thank you for connecting with Hybrid Logistics<br>
					</p>
					<p>
						Best Regards!<br>
						Team Hybrid
					</p>
					  
				</body>
				</html>';
	break;
	} 
	if(mail($content['to'], $subject, $message, $headers)) return true; else return false;
}


?>