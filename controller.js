var angMod = angular.module("meapp", ['ngCookies']);
angMod.controller('mecontroller', function($scope,$filter, $http, $cookieStore) {
   //hit counter history page 
   $scope.getpassedmin = function(){
        var min = $filter('date')($scope.mintime,'yyyy-MM-dd HH:mm');
	$http.get("app.php?cmd=get&key="+min)
                            .success(function (data) {
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
        
	var hourkey = $filter('date')(new Date(),'yyyy-MM-dd HH');
        $http.get("app.php?cmd=incr&key="+hourkey)
        
	var daykey = $filter('date')(new Date(),'yyyy-MM-dd');
        $http.get("app.php?cmd=incr&key="+daykey)
        
	var monthkey = $filter('date')(new Date(),'yyyy-MM');
        $http.get("app.php?cmd=incr&key="+monthkey)
        
	var yearkey = $filter('date')(new Date(),'yyyy');
        $http.get("app.php?cmd=incr&key="+yearkey)
                .success(function(){
                        $http.get("app.php?cmd=get&key="+yearkey)
                            .success(function (data) {
                                $scope.timesPerYear=data.data;
                            });
                });

    }
    /*check cookies*/
    $scope.checkcookies = function(){
        var cookieEmail = $cookieStore.get("email");
        var cookiePassword = $cookieStore.get("password");
        if(cookieEmail!=undefined && cookiePassword!=undefined){
            if(confirm("Hi " + cookieEmail+" , Welcome back! Want to log in directly?(click cancel for new username)") == true){
                location.href = "http://www.info6250.com/";
            }else{
                location.href = "signup.html";
            }
        }else{
            location.href = "login.html";
        }
    }
    
    /*sign up page*/
    $scope.signup = function(){
            $http.get("app.php?cmd=set&key="+$scope.input.email+"&value="+$scope.input.password)
                .success(function () {
                    $scope.redisResponse = "Updated.";
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
		if(data.data == ""){
			alert("no such user!");
			$scope.user.email="";
			$scope.user.password="";
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
