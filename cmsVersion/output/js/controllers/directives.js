//directives.js

var app = angular.module('profileApp.directives', ['profileApp.contact', 'profileApp.experience']);

app.directive('skillsSection', function(){
	return {
		restrict: 'E',
		templateUrl: '../../templates/skills-section.html',
		controller: function($rootScope, $scope, pageContent) {
			//Initialize object to hold page content
			$scope.skillsPageContent = {
				'bodyCopy': {},
				'tools': []
			};
			$scope.devTools = [];
			$scope.designTools = [];

			//Get page content from CMS
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
		templateUrl: '../../templates/experience-section.html',
		controller: 'ExperienceController'
	}
});

app.directive('testimonialsSection', function(){
	return {
		restrict: 'E',
		templateUrl: '../../templates/testimonials-section.html',
		controller: function($rootScope, $scope, pageContent){
			$scope.activeQuotes = 0;

			//Initialize object to hold page content
			$scope.testimonialsPageContent = {
				'bodyCopy': {},
				'quotes': []
			};

			//Get page content from CMS
			pageContent.getContent('testimonialsSection').then(function(response){
				$rootScope.navItems.page4 = response.data.bodyCopy.title;
				$scope.testimonialsPageContent.bodyCopy = response.data.bodyCopy;
				$scope.testimonialsPageContent.quotes = response.data.quotes;
			});
			
			//Show selected quotes page
			$scope.rotateCarousel = function(nextQuotes) {
				$scope.activeQuotes = nextQuotes;
			}
		}
	}
});

app.directive('aboutSection', function(){
	return {
		restrict: 'E',
		templateUrl: '../../templates/about-section.html',
		controller: function($rootScope, $scope, pageContent) {
			//Initialize object to hold page content
			$scope.aboutPageContent = {
				'header': {},
				'paragraphs': [],
				'artLinks': []
			};

			//Get page content from CMS
			pageContent.getContent('aboutSection').then(function(response){
				$rootScope.navItems.page5 = response.data.header.title;
				$scope.aboutPageContent.header = response.data.header;
				$scope.aboutPageContent.paragraphs = response.data.paragraphs;
				$scope.aboutPageContent.artLinks = response.data.artLinks;
			});
			
			//Show full .png image after drawing animation completes
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

//Directive to add class to element when it enter the viewport
app.directive('inView', function(){
	return {
		restrict: 'A',
		controller: ['$scope', function($scope){
			//Determine screen height
			$scope.windowHeight = $(window).height();
			$(window).resize(function(){
				$scope.windowHeight = $(window).height();
			});

			//Find position of element relative to window scroll position
			$scope.checkVisibility = function(top, element, value){
				$scope.windowBottom = $(window).scrollTop() + $scope.windowHeight - 50;

				//If the window enter viewport when scrolling down add attribute value to element as a class
				if (top <= $scope.windowBottom && !$(element).hasClass(value)) {

					//value of "background-grow" gets special function call instead of adding css class
					if (value == "background-grow" && !$scope.mobile && !$scope.tablet) {
						$scope.backgroundGrow(element);
					}
					else {
						$(element).addClass(value);
					}
				}

				//Remove added class when element exits screen while scrolling up
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

			//Function to grow and shrink background image
			$scope.backgroundGrow = function(element, aboveFold) {
				//Background size set to 100% when element is below the fold
				if (aboveFold) {
					$scope.bgSize = 100;
				}

				//Grow background size by .05% when scrolling down with element above the fold
				else if($scope.windowTop < $(window).scrollTop()) {
					$scope.bgSize = $scope.bgSize + .05;
					
				}

				//Shrink background size by .05% when scrolling down with element below the fold
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

			//Bind scroll event to object with "in-view" attribute and pass value to checkVisibility function
			attrs.$observe('inView', function(value) {
				scope.checkVisibility(scope.elementTop, value);

				$(window).scroll(function(){
					scope.checkVisibility(scope.elementTop, element, value);
				});
			});
		}
	}
});












