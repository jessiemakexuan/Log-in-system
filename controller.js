var angMod = angular.module("meapp", ['ngCookies']);
angMod.controller('mecontroller', function($scope,$filter, $http, $cookieStore) {
    $scope.load = function(){
	//var date = new Date();
	//console.log(date);
	var minkey = $filter('date')(new Date(),'yyyy-MM-dd HH:mm');
	$http.get("app.php?cmd=incr&key="+minkey)
		.success(function(){
			$http.get("app.php?cmd=get&key="+minkey)
		            .success(function (data) {
                		// console.log("Get Succeed: ");
      			        console.log(minkey+" current minute visitors : "+data.data);
				$scope.timesPerMin=data.data;
 			    });
		});
	var hourkey = $filter('date')(new Date(),'yyyy-MM-dd HH');
	$http.get("app.php?cmd=incr&key="+hourkey)
                .success(function(){
                        $http.get("app.php?cmd=get&key="+hourkey)
                            .success(function (data) {
                                // console.log("Get Succeed: ");
                                console.log(hourkey+" current Hour visitors : "+data.data);
                                $scope.timesPerHour=data.data;
                            });
                });
	var daykey = $filter('date')(new Date(),'yyyy-MM-dd');
	$http.get("app.php?cmd=incr&key="+daykey)
                .success(function(){
                        $http.get("app.php?cmd=get&key="+daykey)
                            .success(function (data) {
                                // console.log("Get Succeed: ");
                                console.log(daykey+ " current day visitors : "+data.data);
                                $scope.timesPerDay=data.data;
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
                // console.log("DATA.DATA: "+data.data);
                if(data.data==$scope.user.password){
                      $cookieStore.put("email", $scope.user.email);
                      $cookieStore.put("password", $scope.user.password);
                      location.href = "http://www.info6250.com";
                }else{
                      alert("Wrong password");
                      $scope.user.password = "";
                }                
	    })
            .error(function () {
		alert("no such user");
		$scope.user.email="";
            });
    
    }
});
