//contactController.js

var app = angular.module('profileApp.contact', []);

app.controller('ContactController', ['$rootScope', '$scope', '$http', '$timeout', '$sanitize', function($rootScope, $scope, $http, $timeout, $sanitize){
	$scope.contact = {};
	$scope.submitted = false;

	//Submit contact form
	$scope.send = function(isValid) {
		console.log(JSON.stringify($scope.contact));
		if (isValid) {
			$http({
				method: 'POST',
				url: 'send.php',
				data: angular.element.param($scope.contact),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.success(function(data){
				$scope.submitted = true;
				$timeout(
					function(){
						$scope.submitted = false;
					}, 2000);
			}, $scope.submitted = false)
			.error(function(){
				alert('Message Failed to Send')
			});
		}
		else{
			alert('Form is not valid');
		}
	};
}]);