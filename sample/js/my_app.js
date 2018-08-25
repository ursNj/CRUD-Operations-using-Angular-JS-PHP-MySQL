var app = angular.module('myApp', ["ngRoute",'ui.bootstrap','cp.ngConfirm']);

// app.config(['$locationProvider', function($locationProvider) {
  // $locationProvider.hashPrefix('');
// }]);

app.config(function($routeProvider, $locationProvider) {
	
    //$locationProvider.html5Mode(true); //activate HTML5 Mode
	
	$routeProvider
	.when("/", {
		templateUrl : "views/home/home.html"
	})
	.when("/addUser", {
		templateUrl : "views/add_user/add_user.html"
	})    	
    .when('/userDetails/:sid', {
		templateUrl : "views/user_details/user_details.html"
	})
    .otherwise({
        redirectTo: '/'
    });
	
    // $locationProvider.html5Mode(true); //activate HTML5 Mode
	// $locationProvider.hashPrefix('');
	
});

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]);

app.factory('defaultService', ['$http','$ngConfirm','$ngConfirmDefaults', function ($http,$ngConfirm,$ngConfirmDefaults) {
        return {
		
		showLanguage : function(){
			var url = 'languages/allLangs.json';
			// console.log(url);
			return $http({
			method: 'get',
			url: url,
			}).then(function successCallback(response) {
		   
				return response.data;
				
			});
		},
		
        getLangStrings : function(){
			
			var lang = getCookie("userLang");
			var url = 'languages/'+lang+'.json';
			// console.log(url);
			return $http({
			method: 'get',
			url: url,
			}).then(function successCallback(response) {
		   
				return response.data;
				
			});
		},
		
		alert : function (title,text) {
			$ngConfirm({
				title: title,
				icon: 'fa fa-rocket',
				content: '<p>'+text+'</p>',
				animation: 'scale',
				buttons: {
					okay: {
						btnClass: "btn-success",
					}
				},
			})
		},
		
		authUser : function () {
			var access_token = getCookie("access_token");
			var userName = getCookie("userName");
			if (access_token == "") {
				authUser = 0;
				$('span#menu_account_block').hide();
				$('.welcome_text').hide();
			} else {
				authUser = 1;
				$("span#menu_account_block").show();
				$('.welcome_text span').html(userName);
				$('.welcome_text').hide();
			}
			return authUser;
		},
		
		njFun : function () {
			
		}
		
		}
		
    }]);

app.controller('homeCtrl', ['$scope', '$http','$ngConfirm','$ngConfirmDefaults', 'defaultService', function ($scope, $http, $ngConfirm, $ngConfirmDefaults, defaultService) {
	
	// Fetch data
	 $scope.getSipUsers = function(){
		var url = 'http://localhost/nj/api/users.php';
		console.log(url);
		$http({
		method: 'get',
		url: url,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache",
			"postman-token": "06c21c36-6719-a0ca-f7a4-a4b4018162e7"
		},
		}).then(function successCallback(response) {
	   
			//console.log(response.data);
				if(response.data){
						$scope.users = response.data;
						console.log($scope.users);
				}else{
					
					defaultService.alert("Error","No Users Available");
					
				}

		}, function errorCallback(response) {
				
				defaultService.alert("Error","Something went wrong");
				
				
		});
	 };

	// Call function
	$scope.getSipUsers();
    
	$scope.deleteUser = function (sid) {
		var sid = sid;
		var title = "Alert";
		var description = "Are you sure to delete this user?";
		if(sid != '') {
			console.log(sid);
			
			$ngConfirm({
				title: title,
				icon: 'fa fa-rocket',
				content: description,
				autoClose: 'cancel|8000',
				buttons: {
					delete: {
						text: "Delete",
						btnClass: 'btn-red',
						action: function () {
							
							var url = 'http://localhost/nj/api/delete_user.php?id='+sid;
							$http({
							method: 'get',
							url: url,
							headers: {
								"content-type": "application/json",
								"cache-control": "no-cache",
								"postman-token": "06c21c36-6719-a0ca-f7a4-a4b4018162e7"
							},
							}).then(function successCallback(response) {
								
								console.log(response.data);
								if(response.data) {
									defaultService.alert("Success","User deleted sucessfully");
									location.href = '#!/';
								} else {
									defaultService.alert("Error", "User deleted unsuccessful");	
								}
								
							}, function errorCallback(response) {
								
								console.log(response.status);
								defaultService.alert("Error","Something went wrong");
								
							});
			
						}
					},
					cancel: function () {
						// $ngConfirm('action is canceled');
					}
				}
			});
			
		}
		
	};
		
}]);

app.controller('addUserCtrl', ['$scope', '$http', 'defaultService', function ($scope, $http, defaultService) {
	
	$scope.addUser = function () {
		
		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		if(name == '') {
			defaultService.alert("Error","All feilds should filled");
		} else {
			
			var data = [];

			data.push({ 
				"name":name,
				"email":email,
				"phone":phone
			});
			
			var myData1 = JSON.stringify(data);
			var myData = myData1.substring(1, myData1 .length-1);
			console.log(myData);
			
			var url = 'http://localhost/nj/api/add_user.php';
			$http({
			method: 'post',
			url: url,
			headers: {
				"content-type": "application/json",
				"cache-control": "no-cache",
				"postman-token": "06c21c36-6719-a0ca-f7a4-a4b4018162e7"
			  },
			data: myData,
			}).then(function successCallback(response) {
				
				console.log(response.data);
				if(response.data) {
				defaultService.alert("Success","User Created");
				location.href = '#!/home';	
				} else {
					defaultService.alert("Error","Something went wrong");
				}
				
			}, function errorCallback(response) {
				
					defaultService.alert("Error","Something went wrong");
				
				
			});
		}
	};
		
}]);


app.controller('userDetailsCtrl', ['$scope', '$http', '$routeParams', 'defaultService', function ($scope, $http, $routeParams, defaultService) {
	
    var sid = $routeParams.sid;
	// Fetch data
	 $scope.getSipUsers = function(){
		var url = 'http://localhost/nj/api/user_details.php?id='+sid;
		console.log(url);
		$http({
		method: 'get',
		url: url,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache",
			"postman-token": "06c21c36-6719-a0ca-f7a4-a4b4018162e7"
		},
		}).then(function successCallback(response) {
	   
			//console.log(response.data);
				if(response.data){
						$scope.users = response.data;
						console.log($scope.users);
				}else{
					
					defaultService.alert("Error","No Users Available");
					
				}

		}, function errorCallback(response) {
				
				defaultService.alert("Error","Something went wrong");
				
				
		});
	 };

	// Call function
	$scope.getSipUsers();
		
	$scope.updateUserDetails = function () {
		
		
		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		if(name == '') {
			defaultService.alert("Error","All feilds should filled");
		} else {
			
			var data = [];

			data.push({ 
				"id":sid,
				"name":name,
				"email":email,
				"phone":phone
			});
			
			var myData1 = JSON.stringify(data);
			var myData = myData1.substring(1, myData1 .length-1);
			console.log(myData);
			
			var url = 'http://localhost/nj/api/update_user.php';
			$http({
			method: 'post',
			url: url,
			headers: {
				"content-type": "application/json",
				"cache-control": "no-cache",
				"postman-token": "06c21c36-6719-a0ca-f7a4-a4b4018162e7"
			  },
			data: myData,
			}).then(function successCallback(response) {
				
				console.log(response.data);
				if(response.data) {
				defaultService.alert("Success","User Updated");
				location.href = '#!/home';	
				} else {
					defaultService.alert("Error","Something went wrong");
				}
				
			}, function errorCallback(response) {
				
					defaultService.alert("Error","Something went wrong");
				
				
			});
		}
	};
		
}]);
