<?php
if ( !empty( $_FILES ) ) {
	
	$target_dir = "../uploads/";
	$unique = strtoupper(md5(uniqid(rand(), true)));
	$file = $target_dir . $_FILES["file_name"]["name"];
	$uploadOk = 1;
	$imageFileType = pathinfo($file,PATHINFO_EXTENSION);
	$target_file = $target_dir .$unique.'.'.$imageFileType;

	/*if($imageFileType != "csv") {
	    
	    $uploadOk = 0;
	}*/

	if ($uploadOk == 0) {
	   $response = array('error' => True, 'message' => 'File type not support');
	    $json = json_encode($response);
	    echo $json;
	} else {
	    if (move_uploaded_file($_FILES["file_name"]["tmp_name"], $target_file)) {
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