// cmsController.js

var app = angular.module('CMSApp', ['profileServices', 'ui.router', 'loginApp', 'ngCookies', 'ngSanitize']);

app.controller('CMSController', ['$cookies', '$state', '$rootScope', '$scope', '$timeout', 'loginService', function($cookies, $state, $rootScope, $scope, $timeout, loginService){
	$rootScope.user = $cookies.getObject('user') || {'userName': '', 'password': ''};
	$scope.loaded = false;
	$scope.showNav = false;
	$scope.mobile = false;
	$scope.tablet = false;
	$rootScope.submitted = false;


	$scope.checkScreenSize = function(){
		if(window.innerWidth < 769) {
			$scope.mobile = true;
		} 
		else {
			$scope.mobile = false;
		}
		if(window.innerWidth < 997) {
			$scope.tablet = true;
		} 
		else {
			$scope.tablet = false;
		}
	};
	$scope.checkScreenSize();

	$(window).resize(function(){
		$scope.checkScreenSize();
		$scope.$apply();
	});

	$scope.expand = function(event) {
		$(event.currentTarget).next('.expander').slideToggle();
	}
	$scope.$on('$viewContentLoaded', function(){
		$timeout(function(){
			$scope.loaded = true;
		}, 100);
	});

	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
		$scope.loaded = false;
		if (fromState.name != 'login' || toState.name != 'login'){
			loginService.login($rootScope.user).then(function(response) {
				if(response.data.success) {
				}
				else {
					$state.go('login');
				}
			});
		}
	});

	$rootScope.pathCheck = function(url){
		if(url.indexOf('.') != -1) {
			var ext = url.split('.').reverse();
			if(ext[0].length == 3) {
				return true;
			}
		}
		else {
			return false;
		}

	};

	$scope.logout = function() {
		$rootScope.user = {};
		loginService.logout().then(function(response) {
			$cookies.putObject('user', undefined);
			$state.go('login');
		});
	}
}]);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('intro');
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'templates/adminLogin.html',
		controller: ['$sanitize', '$cookies', '$rootScope', '$scope', '$http', '$state', 'loginService', function($sanitize, $cookies, $rootScope, $scope, $http, $state, loginService){
			$scope.login = function(){
				loginService.login($rootScope.user).then(function(response) {
					if(response.data.success) {
						$cookies.putObject('user', $rootScope.user);
						$state.go('admin.intro');
					}
					else {
						$state.go('login');
					}
				});
			};
		}]
	});

	$stateProvider.state('admin', {
		url: '',
		templateUrl: 'templates/admin.html',
	});

	$stateProvider.state('admin.intro', {
		url: '/intro',
		templateUrl: 'templates/introContent.html',
		controller: ['$rootScope', '$timeout', '$scope', 'pageContent', function($rootScope, $timeout, $scope, pageContent){
			$scope.introContent = {
				'page': 'introSection',
				'pageContent': {}
			}
			pageContent.getContent($scope.introContent.page).then(function(response){
				$scope.introContent.pageContent = response.data[0];
			});
			$scope.submitIntroData = function(){
				pageContent.setContent($scope.introContent).then(function(){
					$rootScope.submitted = true;
					$timeout(function(){
						$rootScope.submitted = false;
					}, 2000);
					pageContent.getContent($scope.introContent.page).then(function(response){
						$scope.introContent.pageContent.bodyCopy = response.data.bodyCopy;
					});
				});
			};

		}]
	});

	$stateProvider.state('admin.skills', {
		url: '/skills',
		templateUrl: 'templates/skillsContent.html',
		controller: ['$rootScope', '$timeout', '$scope', 'pageContent', function($rootScope, $timeout, $scope, pageContent){
			$scope.skillsContent = {
				'page': 'skillsSection',
				'pageContent': {
					'bodyCopy': {},
					'tools': []
				},
			};
			$scope.newTool = {'id': '', 'category': '', 'image': ''};

			pageContent.getContent($scope.skillsContent.page).then(function(response){
				$scope.skillsContent.pageContent.bodyCopy = response.data.bodyCopy;
				$scope.skillsContent.pageContent.tools = response.data.tools;
			});
			$scope.submitSkillsData = function(){
				if($scope.newTool.categoy != '' && $scope.newTool.image != ''){
					$scope.skillsContent.pageContent.tools.push($scope.newTool);
				}
				pageContent.setContent($scope.skillsContent).then(function(){
					$rootScope.submitted = true;
					$timeout(function(){
						$rootScope.submitted = false;
					}, 2000);
					pageContent.getContent($scope.skillsContent.page).then(function(response){
						$scope.skillsContent.pageContent.bodyCopy = response.data.bodyCopy;
						$scope.skillsContent.pageContent.tools = response.data.tools;
					});
					$scope.newTool = {'id': '', 'category': '', 'image': ''};
				});
			};

		}]
	});

$stateProvider.state('admin.experience', {
	url: '/experience',
	templateUrl: 'templates/experienceContent.html',
	controller: ['$rootScope', '$timeout', '$scope', 'pageContent', function($rootScope, $timeout, $scope, pageContent){
		$scope.experienceContent = {
			'page': 'experienceSection',
			'pageContent': {
				'bodyCopy': {},
				'projects': []
			}
		};
		$scope.newProject = {'id': '', 'company': '', 'position': '',  'logo': '', 'backgroundImg': '', 'projectSummary': '', 'projectTools': '', 'description': ''};

		pageContent.getContent($scope.experienceContent.page).then(function(response){
			$scope.experienceContent.pageContent.bodyCopy = response.data.bodyCopy;
			$scope.experienceContent.pageContent.projects = response.data.projects;
		});
		$scope.submitExperienceData = function(){
			if($scope.newProject.company != '' && $scope.newProject.position != '' && $scope.newProject.projectSumary != ''){
				$scope.experienceContent.pageContent.projects.push($scope.newProject);
			}
			pageContent.setContent($scope.experienceContent).then(function(response){
				$rootScope.submitted = true;
				$timeout(function(){
					$rootScope.submitted = false;
				}, 2000);
				pageContent.getContent($scope.experienceContent.page).then(function(response){
					$scope.experienceContent.pageContent.bodyCopy = response.data.bodyCopy;
					$scope.experienceContent.pageContent.projects = response.data.projects;
				});
				$scope.newProject = {'id': '', 'company': '', 'position': '',  'logo': '', 'backgroundImg': '', 'projectSummary': '', 'projectTools': '', 'description': ''};
			});
		};
	}]
});

$stateProvider.state('admin.testimonials', {
	url: '/testimonials',
	templateUrl: 'templates/testimonialsContent.html',
	controller: ['$rootScope', '$timeout', '$scope', 'pageContent', function($rootScope, $timeout, $scope, pageContent){
		$scope.testimonialsContent = {
			'page': 'testimonialsSection',
			'pageContent': {
				'bodyCopy': {},
				'quotes': []
			}
		};
		$scope.newQuote = {'id': '', 'author': '', 'image': '', 'quote': ''};

		pageContent.getContent($scope.testimonialsContent.page).then(function(response){
			$scope.testimonialsContent.pageContent.quotes = response.data.quotes;
			$scope.testimonialsContent.pageContent.bodyCopy = response.data.bodyCopy;
		});
		$scope.submitTestimonialsData = function(){
			if($scope.newQuote.author != '' && $scope.newQuote.quote != ''){
				$scope.testimonialsContent.pageContent.quotes.push($scope.newQuote);
			}
			pageContent.setContent($scope.testimonialsContent).then(function(){
				$rootScope.submitted = true;
				$timeout(function(){
					$rootScope.submitted = false;
				}, 2000);
				pageContent.getContent($scope.testimonialsContent.page).then(function(response){
					$scope.testimonialsContent.pageContent.quotes = response.data.quotes;
					$scope.testimonialsContent.pageContent.bodyCopy = response.data.bodyCopy;
				});
				$scope.newQuote = {'id': '', 'author': '', 'image': '', 'quote': ''};
			});
		};
	}]
});

$stateProvider.state('admin.about', {
	url: '/about',
	templateUrl: 'templates/aboutContent.html',
	controller: ['$rootScope', '$timeout', '$scope', 'pageContent', function($rootScope, $timeout, $scope, pageContent){
		$scope.aboutContent = {
			'page': 'aboutSection',
			'pageContent': {
				'header': {},
				'paragraphs': [],
				'artLinks': []
			}
		};
		$scope.newParagraph = {'id': '', 'title': '', 'body': ''};
		$scope.newLink = {'id': '', 'name': '', 'image': '', 'url': ''};

		pageContent.getContent($scope.aboutContent.page).then(function(response){
			$scope.aboutContent.pageContent.header = response.data.header;
			$scope.aboutContent.pageContent.paragraphs = response.data.paragraphs;
			$scope.aboutContent.pageContent.artLinks = response.data.artLinks;
		});
		$scope.submitAboutData = function(){
			if($scope.newParagraph.title != '' && $scope.newParagraph.body != ''){
				$scope.aboutContent.pageContent.paragraphs.push($scope.newParagraph);
			}
			if($scope.newLink.name != '' && $scope.newLink.image != ''){
				$scope.aboutContent.pageContent.artLinks.push($scope.newLink);
			}
			pageContent.setContent($scope.aboutContent).then(function(){
				$rootScope.submitted = true;
				$timeout(function(){
					$rootScope.submitted = false;
				}, 2000);
				pageContent.getContent($scope.aboutContent.page).then(function(response){
					$scope.aboutContent.pageContent.header = response.data.header;
					$scope.aboutContent.pageContent.paragraphs = response.data.paragraphs;
					$scope.aboutContent.pageContent.artLinks = response.data.artLinks;
				});

				$scope.newParagraph = {'id': '', 'title': '', 'body': ''};
				$scope.newLink = {'id': '', 'image': '', 'url': ''};
			});
		};

	}]
});

$stateProvider.state('admin.contact', {
	url: '/contact',
	templateUrl: 'templates/contactContent.html',
	controller: ['$rootScope', '$timeout', '$scope', 'pageContent', function($rootScope, $timeout,$scope, pageContent){
		$scope.contactContent = {
			'page': 'contactSection',
			'pageContent': {}
		};
		pageContent.getContent($scope.contactContent.page).then(function(response){
			$scope.contactContent.pageContent = response.data[0];
		});
		$scope.submitContactData = function(){
			pageContent.setContent($scope.contactContent).then(function(){
				$rootScope.submitted = true;
				$timeout(function(){
					$rootScope.submitted = false;
				}, 2000);
			});
		};
	}]
});
});
























