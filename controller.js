var angMod = angular.module("meapp", ['ngCookies']);
angMod.controller('mecontroller', function($scope,$filter, $http, $cookieStore) {
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
