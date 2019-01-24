var app = angular.module('loginApp', []);

app.factory('loginService', function($http, $q){
	var content = {};
	
	//Log in to Amin application
	content.login = function(user) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '../login.php',
			dataType: 'json',
			data: angular.element.param(user),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.then(function successCallback(response) {
			deferred.resolve(response);
		}, 
		function errorCallback(response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	}

	//Log out of Amin application
	content.logout = function(user) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '../logout.php',
			dataType: 'json',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.then(function successCallback(response) {
			deferred.resolve(response);
		}, 
		function errorCallback(response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	}

	return content;
});