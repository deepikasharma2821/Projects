var demo = angular.module('myFirstAngularApp', ["ngAnimate"]);

demo.controller('myController',['$scope','$http',function($scope,$http,id) {
$scope.showprevious=false;
$scope.myValue=true;
  $scope.show1=true;
  $scope.prog=false;
  $scope.showthenext=true;
 //$scope.type='event';
$scope.showAlbum=false;
$scope.main_table=true;
$scope.panel=true;
$scope.alltables=true;
 /* $scope.findtype = function(id) {
    console.log(id);
    type=id; */
$scope.favorite_name=" ";
$scope.favorite_id=" ";
$scope.favorite_url=" ";
$scope.favorite_type=" ";
$scope.something=false;
$scope.prog_bar=false;
 $scope.nextandprev=false;
 $scope.selected_tab=" "; 
console.log($scope.input_text)

window.onload = function(){
  get_location();
}

function get_location(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      $scope.location_values = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${$scope.location_values.latitude}`);
      console.log(`Longitude: ${$scope.location_values.longitude}`);
      console.log(`More or less ${$scope.location_values.accuracy} meters.`);
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
}

/*user Data */
$scope.retrieveData = function(){
$scope.myValue=true;
console.log("Inside the controller function retrieveData");
var atext = $scope.input_text;
$scope.selected_tab="user"
$scope.nextandprev=false;
$scope.alltables=false; 
$scope.prog_bar=true;
$scope.showAlbum=false;
//console.log(document.getElementbyID('input_text').value);
console.log(atext);
$scope.user_table=false;
$scope.type='user';


  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                keyword : atext,
                type: $scope.type
            }
  }).then (function successCallback (response){
    if($scope.input_text!=null){ 
    $scope.showAlbum=false;
    $scope.nextandprev=true;
  $scope.prog_bar=false;
  $scope.alltables=true;
  $scope.userID = response.data.data;
  $scope.name=response.data.data[0].name;
  $scope.posts=[ ];
  $scope.namelist=[ ];
  $scope.namelist=response.data.data[0].name;
  $scope.picturearray=[ ];
  $scope.picturearray=response.data.data[0].picture.data.url
 // $scope.posts=response.data.data[0].posts.data;
 // console.log("here are posts");
 // console.log($scope.posts)
  $scope.next=response.data.paging.next;
  $scope.user = response.data;
   }
   else
   {
    $scope.prog_bar=false;
   }
  
}, function errorCallback(response){

    console.log("response")
});  

}

//onclick of favorites
$scope.getfromstorage = function(){

  $scope.showAlbum=true;
  $scope.nextandprev=false;
 // $scope.alltables=true;
  $scope.local_Array=[];
  for(var k in window.localStorage){
    var temp = JSON.parse(window.localStorage.getItem(k));
    $scope.local_Array.push(temp);
  }
  console.log($scope.local_Array);
  if($scope.local_Array.length==6){
    //when there is no element in local storage
    $scope.local_storage_length=0;
  }else{
    $scope.local_storage_length=1;
  }
}

$scope.getfromstorage1 = function(){
 $scope.selected_tab="favorites";
  $scope.showAlbum=false;
  $scope.nextandprev=false;
 // $scope.alltables=true;
  $scope.local_Array=[];
  for(var k in window.localStorage){
    var temp = JSON.parse(window.localStorage.getItem(k));
    $scope.local_Array.push(temp);
  }
  console.log($scope.local_Array);
  if($scope.local_Array.length==6){
    //when there is no element in local storage
    $scope.local_storage_length=0;
  }else{
    $scope.local_storage_length=1;
  }
}

$scope.delete_item_from_storage = function(id){
  $scope.showAlbum=false;
  $scope.nextandprev=false;
  console.log("Key exists, hence deleting localStorage");
  window.localStorage.removeItem(id);
  $scope.getfromstorage();
}

$scope.delete_item_from_storage1 = function(id){
  $scope.showAlbum=false;
  $scope.nextandprev=false;
  console.log("Key exists, hence deleting localStorage");
  window.localStorage.removeItem(id);
  $scope.getfromstorage1();
}

$scope.addtostorage = function(id,name,url){
  $scope.showAlbum=false;
  $scope.nextandprev=true;
for(var key in window.localStorage){
      //console.log("local storage key: "+key);
    if(key==id){
      console.log("Key exists, hence not adding to localStorage");
      $scope.delete_item_from_storage(id);
      return;
    }
  } 



console.log("Inside the controller function to add to storage");
$scope.id=id;
$scope.fav_name=name;
$scope.fav_url=url;
console.log(id);
console.log("success!!!!!!!!!!!!!!!!!!!!")
console.log($scope.selected_tab);
 var testObject = { 'id': $scope.id,'name': $scope.fav_name,'url':$scope.fav_url,'type':$scope.selected_tab}; 
 window.localStorage.setItem($scope.id, JSON.stringify(testObject));




}

$scope.addtostorage1 = function(id,name,url){
  $scope.showAlbum=true;
  //$scope.nextandprev=false;
for(var key in window.localStorage){
      //console.log("local storage key: "+key);
    if(key==id){
      console.log("Key exists, hence not adding to localStorage");
      $scope.delete_item_from_storage(id);
      return;
    }
  } 



console.log("Inside the controller function to add to storage");
$scope.id=id;
$scope.fav_name=name;
$scope.fav_url=url;
console.log(id);
console.log("success!!!!!!!!!!!!!!!!!!!!")
console.log($scope.selected_tab);
 var testObject = { 'id': $scope.id,'name': $scope.fav_name,'url':$scope.fav_url,'type':$scope.selected_tab}; 
 window.localStorage.setItem($scope.id, JSON.stringify(testObject));
$scope.nextandprev=false;



}

/*$scope.takefromstorage = function( ){

console.log("Inside the controller function to get from storage");
 
  var retrievedObject = localStorage.getItem('testObject');

  console.log('typeof retrievedObject: ' + typeof retrievedObject);
console.log('Value of retrievedObject: ' + retrievedObject);
$scope.hmm= retrievedObject;
 
}*/

$scope.yellow = function(id){
    for(var key in window.localStorage){
      //console.log("local storage key: "+key);
    if(key==id){
      console.log("The Id: "+id);

      return 'glyphicon-star yellow';
    }
  }

  return 'glyphicon-star-empty';
}
// {
//   var starClass =  Object.childNodes[1].className; 
//   if(starClass=="glyphicon glyphicon-star gold")
//   {
//     Object.childNodes[1].className = "glyphicon glyphicon-star gold";

//   }


/*next button for pagination */
$scope.shownext = function(){
$scope.showprevious=true;
$scope.showthenext=true;
console.log("Inside the controller function to show next");
console.log($scope.next)
  //$scope.next=response.data.paging.next;
var next_url= $scope.next;
if(next_url==null)
{
  $scope.showthenext=false;;
}
//var atext = $scope.input_text;
//console.log(document.getElementbyID('input_text').value);
//console.log(atext);


  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                nexturl : next_url

            }
  }).then (function successCallback (response){
 console.log(response);
  
  $scope.userID = response.data.data;
  $scope.next=response.data.paging.next;
  $scope.name=response.data.data[0].name;

  //$scope.profilepic=response.data.data[0].picture.data.url;
  //console.log($scope.profilepic);
  var next_url= $scope.next;
if(next_url==null)
{
  $scope.showthenext=false;;
}
  console.log($scope.next);
  console.log($scope.userID);
  $scope.prev=response.data.paging.previous;
  console.log($scope.prev);
  console.log($scope.name);

  console.log(response.statusText);

  $scope.user = response.data;

  console.log($scope.user);
  

}, function errorCallback(response){

    console.log("response")
});  

};
//previous button for pagination 
$scope.showprev = function(){

console.log("Inside the controller function to show previous");
console.log($scope.prev)
  //$scope.next=response.data.paging.next;
var prev_url= $scope.prev;

$scope.showprevious=false;
if(prev_url!=null)
{
  $scope.showprevious=true;
}

//var atext = $scope.input_text;
//console.log(document.getElementbyID('input_text').value);
//console.log(atext);


  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                prevurl : prev_url

            }
  }).then (function successCallback (response){
 console.log(response);
  
  $scope.userID = response.data.data;
  
  $scope.name=response.data.data[0].name;

  //$scope.profilepic=response.data.data[0].picture.data.url;
  //console.log($scope.profilepic);
  
  console.log($scope.prev);
  console.log($scope.userID);

  console.log($scope.name);

  console.log(response.statusText);
  $scope.next=response.data.paging.next;
  $scope.prev=response.data.paging.previous;
if($scope.prev==null)
{
  $scope.showprevious=false;
}
  $scope.user = response.data;

  console.log($scope.user);
  

}, function errorCallback(response){

    console.log("response")
});  

};




/*page Data */
$scope.retrievePageData = function(){
  $scope.showAlbum=false;
$scope.selected_tab="page";
console.log("Inside the controller function retrieveData");
var atext = $scope.input_text;
console.log(atext);
$scope.nextandprev=false; 
$scope.type='page';
$scope.alltables=false; 
$scope.prog_bar=true;
  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                keyword : atext,
                type: $scope.type
            }
  }).then (function successCallback (response){
    if($scope.input_text!=null)
    {


    $scope.showAlbum=false;
 console.log(response);
 $scope.nextandprev=true; 
 $scope.alltables=true; 
$scope.prog_bar=false;
  $scope.userID = response.data.data;
  $scope.name=response.data.data[0].name;
  $scope.posts=[ ];
  $scope.namelist=[ ];
  $scope.namelist=response.data.data[0].name;
  $scope.picturearray=[ ];
  $scope.picturearray=response.data.data[0].picture.data.url
 // $scope.posts=response.data.data[0].posts.data;
 // console.log("here are posts");
 // console.log($scope.posts)
  $scope.next=response.data.paging.next;
  $scope.user = response.data;
  
}
else
   {
    $scope.prog_bar=false;
   }
}, function errorCallback(response){

    console.log("response")
});  

};

$scope.retrievePageDetails = function(id){
  $scope.detailsShow="details_in";
$scope.showAlbum=true;
$scope.showAlbum1=false;
$scope.nextandprev=false;
$scope.details_table=false;
$scope.mini_prog=true; 
 $scope.alltables=false;
 

console.log("Inside the controller to retrievePageDetails");
console.log(id);
//var page_id = $scope.id;
$scope.id=id;
console.log($scope.id);
$scope.main_table=false;
$scope.something=true;
 console.log("heello psots");
  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                id : id,
               type : $scope.selected_tab
            }
  }).then (function successCallback (response){
 console.log(response);
 $scope.details_table=true;
$scope.mini_prog=false; 
 console.log("heello psots");
 // $scope.userID = response.data.data;
 // $scope.name=response.data.data[0].name;
  $scope.posts=[ ];
  $scope.main_data=[];
  $scope.main_data=response.data;
  console.log($scope.main_data.name);

  if(typeof response.data.posts=== 'undefined') {
     $scope.posts=null;
   }
   else{ 
    $scope.posts=response.data.posts.data;

    // console.log($scope.posts.story);
   }
  
  console.log($scope.posts);
  $scope.albums=[ ];

  if(typeof response.data.albums=== 'undefined') {
    $scope.albums=null;
  }
  else {
    $scope.albums=response.data.albums.data;
  }
  
  console.log($scope.albums);
  //$scope.pics=response.data.albums.data.photos.data[0].picture;
  //console.log($scope.pics);
  //$scope.pics=$scope.albums.photos.data.url;
  //console.log($scope.pics);
  //$scope.namelist=[ ];
  //$scope.namelist=response.data.data[0].name;
  //$scope.picturearray=[ ];
  //$scope.picturearray=response.data.data[0].picture.data.url
 // $scope.posts=response.data.data[0].posts.data;
 // console.log("here are posts");
 // console.log($scope.posts)
  //$scope.next=response.data.paging.next;
 // $scope.user = response.data;
 if($scope.albums==null)
 {
//$scope.showAlbum=false;
 $scope.showAlbum1=true;
 }

  

}, function errorCallback(response){

    console.log("response")
});  

};

$scope.pagedetailsclear = function()
 {
  console.log("inside clear");
  $scope.input_text=null;
  //$scope.userID=[ ];
  //$scope.something=false;
  $scope.showAlbum=false;
  $scope.alltables=false;
  $scope.nextandprev=false; 
 }

 $scope.onback = function()
 {
  console.log("inside clear");
  $scope.alltables=true;
  $scope.showAlbum=false;
  $scope.something=true;
  //$scope.details_table=false;
  $scope.nextandprev=true; 
   $scope.detailsShow="details_out";
  // if($scope.selected_tab="favorites")
  // {
  //   $scope.nextandprev=false;; 
  // }
  //$scope.user_table=true;
   //$scope.state = {Users_table : true};

 }



 //Facebook
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1195686820543907',
      xfbml      : true,
      version    : 'v2.8'
    });
     FB.AppEvents.logPageView();
};

$scope.share= function(id,name,url) {
  call_fb(id,name,url);
} 

function call_fb(id,name,url){
  
  FB.ui({
      method: 'share',
      title: name,
      picture: url,
      href: 'https://developers.facebook.com/docs/',
      caption: 'FB SEARCH FROM USC CSCI571',
      display: 'popup'
  }, function(response){
  if (response && !response.error_message)
    alert('Posted successfully.');
  else 
  alert('Not Posted.');
  });

}

//Facebook
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/*eventdata*/
$scope.retrieveEventData = function(){
  $scope.showAlbum=false;
$scope.selected_tab="event";
console.log("Inside the controller function retrieveData");
var atext = $scope.input_text;
$scope.type='event';
$scope.nextandprev=false; 
$scope.alltables=false; 
$scope.prog_bar=true;
  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                keyword : atext,
                type: $scope.type
            }
  }).then (function successCallback (response){
    if($scope.input_text!=null){ 
    $scope.nextandprev=true; 
    $scope.showAlbum=false;
    $scope.alltables=true; 
$scope.prog_bar=false;
 console.log(response);
  $scope.userID = response.data.data;
  $scope.name=response.data.data[0].name;
  $scope.posts=[ ];
  $scope.namelist=[ ];
  $scope.namelist=response.data.data[0].name;
  $scope.picturearray=[ ];
  $scope.picturearray=response.data.data[0].picture.data.url
  $scope.next=response.data.paging.next;
  $scope.user = response.data;
}
  else
   {
    $scope.prog_bar=false;
   }

}, function errorCallback(response){

    console.log("response")
});  

};
//end of eventdata
//places
$scope.retrievePlaceData = function(){
  $scope.showAlbum=false;
$scope.selected_tab="place";
console.log("Inside the controller function retrieveData");
var atext = $scope.input_text;
$scope.nextandprev=false; 
console.log(atext);
$scope.alltables=false; 
$scope.prog_bar=true;
$scope.type='place';

var latitude=null;
var longitude=null;

latitude=$scope.location_values.latitude;
longitude=$scope.location_values.longitude;

console.log(latitude+ "**** " + longitude);

  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                keyword : atext,
                type: $scope.type,
                latitude: latitude,
                longitude: longitude
            }
  }).then (function successCallback (response){
    if($scope.input_text!=null){ 
 console.log(response);
 $scope.showAlbum=false;
$scope.nextandprev=true; 
  $scope.alltables=true; 
$scope.prog_bar=false;
  $scope.userID = response.data.data;
  
  $scope.name=response.data.data[0].name;
  $scope.posts=[ ];
  $scope.namelist=[ ];
  $scope.namelist=response.data.data[0].name;
  $scope.picturearray=[ ];
  $scope.picturearray=response.data.data[0].picture.data.url
  $scope.next=response.data.paging.next;
  $scope.user = response.data;

  }
  else
   {
    $scope.prog_bar=false;
   }

}, function errorCallback(response){

    console.log("response")
});  

};  //end of places

//groups
$scope.retrieveGroupData = function(){
  $scope.showAlbum=false;
$scope.selected_tab="group";
console.log("Inside the controller function retrieveData");
var atext = $scope.input_text;
console.log(atext);
$scope.alltables=false; 
$scope.prog_bar=true;
$scope.type='group';
$scope.nextandprev=false; 
  $http({
  method: 'GET',
            url: 'http://sample-env-1.feeuekubxr.us-west-2.elasticbeanstalk.com/phpfile.php',
            datatype: 'json',
            params: {
                keyword : atext,
                type: $scope.type
            }
  }).then (function successCallback (response){
    if($scope.input_text!=null){ 
 console.log(response);
$scope.showAlbum=false;
  $scope.alltables=true; 
$scope.prog_bar=false;
  $scope.userID = response.data.data;
  $scope.nextandprev=true; 
  $scope.name=response.data.data[0].name;
  $scope.posts=[ ];
  $scope.namelist=[ ];
  $scope.namelist=response.data.data[0].name;
  $scope.picturearray=[ ];
  $scope.picturearray=response.data.data[0].picture.data.url
  $scope.next=response.data.paging.next;
  console.log($scope.name);
  console.log(response.statusText);
  $scope.user = response.data;
  console.log($scope.user);
}
  else
   {
    $scope.prog_bar=false;
   }

}, function errorCallback(response){

    console.log("response")
});  

}; //end of groups
 
 $scope.postshow = function()
 {
  console.log("inside postshow");
  $scope.state = {Posts_table : true};

 }
  
  $scope.legShow = function () {

    
    console.log("Inside the leg show function");

     $scope.state = {Users_table : true};
   
    };
  $scope.pageShow = function () {

    
    console.log("Inside the leg show function");

     $scope.state = {Pages_table : true};
   
    };
   $scope.eventShow = function () {

    
    console.log("Inside the leg show function");

     $scope.state = {Events_table : true};
   
    };
    $scope.placeShow = function () {

    
    console.log("Inside the leg show function");

     $scope.state = {Places_table : true};
   
    };
$scope.groupShow = function () {

    
    console.log("Inside the groups function");

     $scope.state = {Groups_table : true};
   
    };

$scope.favShow = function () {

    
    console.log("Inside the groups function");

     $scope.state = {Fav_table : true};
   
    };


$scope.search=function()
{
  $scope.retrieveData();
}

  
  $scope.legShow = function () {
    
    console.log("Inside the leg show function");

     $scope.state = {Users_table : true};
   
    };


    // $scope.search = function(){
    //   if($scope.selected=="Users") {

    //   }
    // }

  }]); 






