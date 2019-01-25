//directives.js

var app = angular.module('profileApp.directives', ['profileApp.contact', 'profileApp.experience']);

app.directive('skillsSection', function(){
	return {
		restrict: 'E',
		templateUrl: '../../templates/skills-section.html',
		controller: function($rootScope, $scope) {
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
		controller: function($rootScope, $scope){
			$scope.activeQuotes = 0;

			//Initialize object to hold page content
			$scope.testimonialsPageContent = {
				'quotes': [
				   {
				      "id":"1",
				      "author":"Greg Airel, Avantia",
				      "image":"greg.jpg",
				      "quote":"Ian has a true passion for cutting edge designs and web technology. In my time working with him, there was a never a task he didn't put his all into. He constantly pushed himself and others to perform beyond \"just getting the job done\". Ian's constant learning and incorporation of various cutting edge technologies into projects is what drove many successful campaigns to their completion."
				   },
				   {
				      "id":"3",
				      "author":"Don Crislip, Medical Mutual",
				      "image":"don.jpg",
				      "quote":"When I first interviewed Ian at Medical Mutual I was immediately blown away by his design and creative skills. He was filled with energy, confidence, and enthusiasm to learn. Ian lived up to my impressions and became a very valuable member to our team. I really enjoyed working with Ian and I would gladly be on a team with him again. He has a great personality, enthusiasm, critical eye, and talent for design and development."
				   },
				   {
				      "id":"5",
				      "author":"Seth Coelen, Medical Mutual",
				      "image":"seth.jpg",
				      "quote":"Ian is a great team player with a passion for front-end development. He is extremely skilled at Javascript, HTML\/CSS and responsive design. I was impressed with how he interacted between both designers and back-end developers to get tasks done. I really enjoy working with Ian because he is easy to collaborate with and is always able to provide constructive feedback. Ian's eye for design and ability to take ideas from concept to creation is great asset to any team."
				   },
				   {
				      "id":"6",
				      "author":"Martin Hlavaty, Avantia",
				      "image":"martin.jpg",
				      "quote":"Ian is a very talented web and graphic designer with a unique artistic flair, fine-tuned to capture a client's needs visually. His ability to take on new challenges and master new technologies makes him a great asset to any client. He is willing to offer input and work hard on any project that is assigned to him."
				   }
				]
			};
			
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
		controller: function($rootScope, $scope) {
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












