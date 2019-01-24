var app = angular.module('profileServices', []);

app.factory('pageContent', function($http, $q){
	var content = {};
	
	//Service call to retrieve page content from CMS
	content.getContent = function(page) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '../getContent.php',
			params: {'page': page}
		})
		.then(function successCallback(response) {
			deferred.resolve(response);
		}, 
		function errorCallback(response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	}

	//Service call to set page content in CMS
	content.setContent = function(pageData){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '../updateContent.php',
			data: angular.element.param(pageData),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.then(function successCallback(response) {
			deferred.resolve(response);
		}, 
		function errorCallback(response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	};

	return content;
});