var angMod = angular.module("meapp", ['ngCookies']);
angMod.controller('mecontroller', function($scope,$filter, $http, $cookieStore) {
   //hit counter history page 
   $scope.getpassedmin = function(){
        var min = $filter('date')($scope.mintime,'yyyy-MM-dd HH:mm');
	console.log(min);
	$http.get("app.php?cmd=get&key="+min)
                            .success(function (data) {
                                console.log($scope.mintime);
                                console.log(data.data);
                                if(data.data ==""){
                                    $scope.minvisitor=0;
                                }else{            
                                    $scope.minvisitor=data.data;
                                }
                            });
    }
    $scope.getpassedhour = function(){
        $http.get("app.php?cmd=get&key="+$scope.hourtime)
                            .success(function (data) {
                                // console.log("Get Succeed: ");
                                console.log(data.data);
                                if(data.data ==""){
                                    $scope.hourvisitor=0;
                                }else{            
                                    $scope.hourvisitor=data.data;
                                }
                            });
    }
    $scope.getpassedday = function(){
        $http.get("app.php?cmd=get&key="+$scope.daytime)
                            .success(function (data) {
                                // console.log("Get Succeed: ");
                                console.log(data.data);
                                if(data.data ==""){
                                    $scope.dayvisitor=0;
                                }else{            
                                    $scope.dayvisitor=data.data;
                                }
                            });
    }
    $scope.getpassedmonth = function(){
        $http.get("app.php?cmd=get&key="+$scope.monthtime)
                            .success(function (data) {
                                // console.log("Get Succeed: ");
                                console.log(data.data);
                                if(data.data ==""){
                                    $scope.monthvisitor=0;
                                }else{            
                                    $scope.monthvisitor=data.data;
                                }
                            });
    }
    $scope.getpassedyear = function(){
        $http.get("app.php?cmd=get&key="+$scope.yeartime)
                            .success(function (data) {
                                // console.log("Get Succeed: ");
                                console.log(data.data);
                                if(data.data ==""){
                                    $scope.yearvisitor=0;
                                }else{            
                                    $scope.yearvisitor=data.data;
                                }
                            });
    }

    //show hit counter in main page
    $scope.load = function(){
        var minkey = $filter('date')(new Date(),'yyyy-MM-dd HH:mm');
        $http.get("app.php?cmd=incr&key="+minkey)
                .success(function(){
                       // $http.get("app.php?cmd=get&key="+minkey)
                            //.success(function (data) {
                                // console.log("Get Succeed: ");
                               // console.log(minkey+" current minute visitors : "+data.data);
                                //$scope.timesPerMin=data.data;
                           // });
                });
//	var lasttime =new Date().setMinutes( (new Date().getMinutes()-1));
//	var lastminkey = $filter('date')(lasttime,'yyyy-MM-dd HH:mm');
  //      $http.get("app.php?cmd=get&key="+lastminkey)
    //            .success(function(data){
                        // console.log("Get Succeed: ");
      //                  console.log(lastminkey+" last minute visitors : "+data.data);
	//		if(data.data == ""){
	//		    $scope.timesPerLastMin = 0;
	//		}else{
          //                  $scope.timesPerLastMin=data.data;
	//		}
                            
          //      });
        var hourkey = $filter('date')(new Date(),'yyyy-MM-dd HH');
        $http.get("app.php?cmd=incr&key="+hourkey)
                .success(function(){
       //                 $http.get("app.php?cmd=get&key="+hourkey)
         //                   .success(function (data) {
                                // console.log("Get Succeed: ");
           //                     console.log(hourkey+" current Hour visitors : "+data.data);
             //                   $scope.timesPerHour=data.data;
               //             });
                });
        var daykey = $filter('date')(new Date(),'yyyy-MM-dd');
        $http.get("app.php?cmd=incr&key="+daykey)
                .success(function(){
                 //       $http.get("app.php?cmd=get&key="+daykey)
                   //         .success(function (data) {
                                // console.log("Get Succeed: ");
                     //           console.log(daykey+ " current day visitors : "+data.data);
                       //         $scope.timesPerDay=data.data;
                         //   });
                });
        var monthkey = $filter('date')(new Date(),'yyyy-MM');
        $http.get("app.php?cmd=incr&key="+monthkey)
                .success(function(){
                       // $http.get("app.php?cmd=get&key="+monthkey)
                         //   .success(function (data) {
                                // console.log("Get Succeed: ");
                           //     console.log(monthkey+" current Month visitors : "+data.data);
                             //   $scope.timesPerMonth=data.data;
                  //          });
                });
        var yearkey = $filter('date')(new Date(),'yyyy');
        $http.get("app.php?cmd=incr&key="+yearkey)
                .success(function(){
                        $http.get("app.php?cmd=get&key="+yearkey)
                            .success(function (data) {
                                // console.log("Get Succeed: ");
                                console.log(yearkey+" current Year visitors : "+data.data);
                                $scope.timesPerYear=data.data;
                            });
                });

    }
    /*check cookies*/
    $scope.checkcookies = function(){
        console.log("enter function");
        var cookieEmail = $cookieStore.get("email");
        var cookiePassword = $cookieStore.get("password");
        if(cookieEmail!=undefined && cookiePassword!=undefined){
           console.log("get cookie");
            if(confirm("Hi " + cookieEmail+" , Welcome back! Want to log in directly?(click cancel for new username)") == true){
                location.href = "http://www.info6250.com/";
            }else{
                location.href = "signup.html";
            }
        }else{
            console.log("no cookie");
            location.href = "login.html";
        }
    }
    
    /*sign up page*/
    $scope.signup = function(){
            $http.get("app.php?cmd=set&key="+$scope.input.email+"&value="+$scope.input.password)
                .success(function () {
                    $scope.redisResponse = "Updated.";
                     console.log("Set Secceed.");
                    location.href = "login.html";
                });
            

    }
    
    /*reset inputs*/
    $scope.reset = function(){
        $scope.input.email = "";
        $scope.input.password = "";
    }


    /* log in page*/
    $scope.login = function(){
        $http.get("app.php?cmd=get&key="+$scope.user.email)
            .success(function (data) {
                // console.log("Get Succeed: ");
                // console.log("DATA= "+data);
		if(data.data == ""){
			alert("no such user!");
			$scope.user.email="";
		}else{
               	    if(data.data==$scope.user.password){
                	 $cookieStore.put("email", $scope.user.email);
                     	 $cookieStore.put("password", $scope.user.password);
                     	 location.href = "http://www.info6250.com";
               	    }else{
                	 alert("Wrong password");
                     	 $scope.user.password = "";
               	    } 
		}               
            })
            .error(function () {
                console.log("Database failed");
                
            });
    
    }
});
