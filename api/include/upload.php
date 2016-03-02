<?php
require_once 'SimpleImage.php';
if ( !empty( $_FILES ) ) {
	
	if(isset($_FILES['news_image']['name']) != ""){
		$dir = '../uploads/news/';
		$unique = strtoupper(md5(uniqid(rand(), true)));	
		$image = new SimpleImage();
		$image->load($_FILES['news_image']['tmp_name']);
		$image->resizeToWidth(466);
		$image->save($dir.$unique.$_FILES['news_image']['name']);
		$response = array('error' => false, 'message'=>'File transfered completed!','image' =>$unique.$_FILES['news_image']['name']);
		$json = json_encode($response);
		echo $json;
	}else{
		$response = array('error' => true, 'message'=>'Bad Request');
		$json = json_encode($response);
		echo $json;	
	}
} else {

    echo 'No files';

}

?>