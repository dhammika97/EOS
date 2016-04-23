<?php
if ( !empty( $_FILES ) ) {
	
	$target_dir = "uploads/";
	$unique = strtoupper(md5(uniqid(rand(), true)));
	$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]).$unique;
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	

	if($imageFileType != "csv") {
	    
	    $uploadOk = 0;
	}

	if ($uploadOk == 0) {
	   $response = array('error' => True, 'message' => 'File type not support');
	    $json = json_encode($response);
	    echo $json;
	} else {
	    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
	       	$response = array('error' => True, 'message' => 'File successfully uploaded', 'file_name' => $target_file);
		    $json = json_encode($response);
		    echo $json;
	    } else {
	    	$response = array('error' => True, 'message' => 'File upload faild', 'file_name' => '');
		    $json = json_encode($response);
		    echo $json;
	         
	    }
	}


} else {
	$response = array('error' => True, 'message' => 'File type not support');
    $json = json_encode($response);
    echo $json;
}

?>