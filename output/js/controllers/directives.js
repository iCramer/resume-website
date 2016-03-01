//directives.js

var app = angular.module('profileApp.directives', ['profileApp.contact', 'profileApp.experience']);

app.directive('skillsSection', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/skills-section.html',
		controller: function($rootScope, $scope, pageContent) {
			$scope.skillsPageContent = {
				'bodyCopy': {},
				'tools': []
			};
			$scope.devTools = [];
			$scope.designTools = [];

			pageContent.getContent('skillsSection').then(function(response){
				$rootScope.navItems.page2 = response.data.bodyCopy.title;
				$scope.skillsPageContent.bodyCopy = response.data.bodyCopy;
				$scope.skillsPageContent.tools = response.data.tools;
				angular.forEach($scope.skillsPageContent.tools, function(item){
					if(item.category == 'dev') {
						$scope.devTools.push(item);
					}
					else if(item.category == 'design') {
						$scope.designTools.push(item);
					}
				});
			});
		}
	}
});

app.directive('experienceSection', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/experience-section.html',
		controller: 'ExperienceController'
	}
});

app.directive('testimonialsSection', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/testimonials-section.html',
		controller: function($rootScope, $scope, pageContent){
			$scope.activeQuotes = 0;

			$scope.testimonialsPageContent = {
				'bodyCopy': {},
				'quotes': []
			};

			pageContent.getContent('testimonialsSection').then(function(response){
				$rootScope.navItems.page4 = response.data.bodyCopy.title;
				$scope.testimonialsPageContent.bodyCopy = response.data.bodyCopy;
				$scope.testimonialsPageContent.quotes = response.data.quotes;
			});
			
			$scope.rotateCarousel = function(nextQuotes) {
				$scope.activeQuotes = nextQuotes;
			}
		}
	}
});

app.directive('aboutSection', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/about-section.html',
		controller: function($rootScope, $scope, pageContent) {
			$scope.aboutPageContent = {
				'header': {},
				'paragraphs': [],
				'artLinks': []
			};
			pageContent.getContent('aboutSection').then(function(response){
				$rootScope.navItems.page5 = response.data.header.title;
				$scope.aboutPageContent.header = response.data.header;
				$scope.aboutPageContent.paragraphs = response.data.paragraphs;
				$scope.aboutPageContent.artLinks = response.data.artLinks;
			});
			
			$('body').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', '#self-pic-drawing svg', function(e) {
				$('#self-pic-drawing').addClass('done');
			});
		}
	}
});

app.directive('contactSection', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/contact-section.html',
		controller: 'ContactController'
	}
});


app.directive('inView', function(){
	return {
		restrict: 'A',
		controller: ['$scope', function($scope){
			$scope.windowHeight = $(window).height();
			$(window).resize(function(){
				$scope.windowHeight = $(window).height();
			});

			$scope.checkVisibility = function(top, element, value){
				$scope.windowBottom = $(window).scrollTop() + $scope.windowHeight - 50;
				if (top <= $scope.windowBottom && !$(element).hasClass(value)) {
					if (value == "background-grow" && !$scope.mobile && !$scope.tablet) {
						$scope.backgroundGrow(element);
					}
					else {
						$(element).addClass(value);
					}
				}
				else if (top > $scope.windowBottom) {
					if (value == "background-grow" && !$scope.mobile && !$scope.tablet) {
						$scope.backgroundGrow(element, true);
					}
					else if ($(element).hasClass(value)) {
						$(element).removeClass(value);
					}
				}
			}

			$scope.windowTop = $(window).scrollTop();
			$scope.bgSize = 100;
			$scope.backgroundGrow = function(element, aboveFold) {
				if (aboveFold) {
					$scope.bgSize = 100;
				}
				else if($scope.windowTop < $(window).scrollTop()) {
					$scope.bgSize = $scope.bgSize + .05;
					
				}
				else {
					$scope.bgSize = $scope.bgSize - .05;
					if ($scope.bgSize < 100) {
						$scope.bgSize = 100;
					}
				}
				$(element).css('background-size', $scope.bgSize + '%');
				$scope.windowTop = $(window).scrollTop();
			}
		}],
		scope:{},
		link: function(scope, element, attrs){
			$(window).scroll(function(){
				scope.elementTop = $(element).offset().top;
			});
			scope.visible = false;
			attrs.$observe('inView', function(value) {
				scope.checkVisibility(scope.elementTop, value);

				$(window).scroll(function(){
					scope.checkVisibility(scope.elementTop, element, value);
				});
			});
		}
	}
});












