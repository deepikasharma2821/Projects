<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Methods: ['OPTIONS','GET','POST']");

//require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';

//$face=new Facebook\Facebook([ 'app_id'=>'1195686820543907', 'app_secret'=>'bd920c7b2f3435f3f3ac55c21f33abbe', 'default_graph_version'=>'v2.8',]);
$access='EAAQZCeIgzfaMBAHnCmhB1Vlc7pObU1N6NcRykuWjcmKCsQifMcAnMmLRxVPINfunB2xOuJxvKqU63JZCUtDcYHvBRrpodLZB1aZCuqVpUhFMzcrbNj5vbnuE1qaZBudtywlIBrVSTXnZBGfT0ZAoM61K5Fuv53tjLIZD';

   //$type=$_GET['type'];
  if(isset($_GET['keyword']))
  {
  	$keyword = $_GET['keyword'];

  	if(isset($_GET['type'])) {
		$type=$_GET['type'];

		if($type=='place'){
			$lat=$_GET['latitude'];
			$lng=$_GET['longitude'];
			$user_url ='https://graph.facebook.com/v2.8/search?q='.$keyword."&type=".$type."&center=".$lat.",".$lng."&fields=id,name,posts.limit(5),albums.limit(5){name,photos.limit(2){name,picture}},picture.width(700).height(700)&access_token=EAAQZCeIgzfaMBAHnCmhB1Vlc7pObU1N6NcRykuWjcmKCsQifMcAnMmLRxVPINfunB2xOuJxvKqU63JZCUtDcYHvBRrpodLZB1aZCuqVpUhFMzcrbNj5vbnuE1qaZBudtywlIBrVSTXnZBGfT0ZAoM61K5Fuv53tjLIZD";

			$userResult = file_get_contents($user_url);
	  		echo $userResult;
 
		} else {

		  	$user_url ='https://graph.facebook.com/v2.8/search?q='.$keyword."&type=".$type."&fields=id,name,posts.limit(5),albums.limit(5){name,photos.limit(2){name,picture}},picture.width(700).height(700)&access_token=EAAQZCeIgzfaMBAHnCmhB1Vlc7pObU1N6NcRykuWjcmKCsQifMcAnMmLRxVPINfunB2xOuJxvKqU63JZCUtDcYHvBRrpodLZB1aZCuqVpUhFMzcrbNj5vbnuE1qaZBudtywlIBrVSTXnZBGfT0ZAoM61K5Fuv53tjLIZD";

		  	$userResult = file_get_contents($user_url);
		  	echo $userResult;
		  }
  	}
  }

if(isset($_GET['nexturl']))
{
	$userResult = file_get_contents($_GET['nexturl']);	
	echo $userResult;
}

if(isset($_GET['prevurl']))
{
	$userResult = file_get_contents($_GET['prevurl']);
	echo $userResult;
}



if(isset($_GET['id']))

{
	$id= $_GET['id'];
	if(isset($_GET['type'])) {
		$type=$_GET['type'];

		if($type=='event'){
			$details_url="https://graph.facebook.com/v2.8/".$id."?fields=id,name,picture.width(700).height(700),posts.limit(5)&access_token=EAAQZCeIgzfaMBAHnCmhB1Vlc7pObU1N6NcRykuWjcmKCsQifMcAnMmLRxVPINfunB2xOuJxvKqU63JZCUtDcYHvBRrpodLZB1aZCuqVpUhFMzcrbNj5vbnuE1qaZBudtywlIBrVSTXnZBGfT0ZAoM61K5Fuv53tjLIZD";
			$details_result=file_get_contents($details_url);
			echo $details_result;
		} else{
			$details_url="https://graph.facebook.com/v2.8/".$id."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5)&access_token=EAAQZCeIgzfaMBAHnCmhB1Vlc7pObU1N6NcRykuWjcmKCsQifMcAnMmLRxVPINfunB2xOuJxvKqU63JZCUtDcYHvBRrpodLZB1aZCuqVpUhFMzcrbNj5vbnuE1qaZBudtywlIBrVSTXnZBGfT0ZAoM61K5Fuv53tjLIZD";
			$details_result=file_get_contents($details_url);
			echo $details_result;
		}
	}
} 

//if isset(
//{
//	echo id
//})




//$json_response=json_encode($userResult,true);
//echo $json_response;







	//$data =  array($user_json);
    
?>