//ecperienceController.js

var app = angular.module('profileApp.experience', []);

app.controller('ExperienceController', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout){

	$scope.projects = [
	{
	      "id":"1",
	      "company":"FireEye",
	      "position":"AngularJS Developer",
	      "logo":"fireeye.png",
	      "backgroundImg":"iceDS.jpg",
	      "projectSummary":"Design System and Machine Learning Analytics",
	      "projectTools":"Angular, React, HTML, SASS, Plotly.js",
	      "description":"<p>I work in the UX organization of FireEye where I am the engineering lead and a design contributor. I lead a team of engineers and act as project manager for a deign system that we built in both React and Angular frameworks. The design system is a way of offering a library of well thought out UI components and patterns to the company and creating a consistent look across all company products.<\/p><p>My first year at FireEye was spent in the Innovation and Custom Engineering organization building an application for data scientists to measure the efficacy of machine learning models. I was solely responsible for designing and developing the Angular application including workflow, graphic design, and all coding.<\/p>"
	   },
	   {
	      "id":"2",
	      "company":"Kalibrate",
	      "position":"Senior Software Engineer",
	      "logo":"kalibrate.png",
	      "backgroundImg":"kalibrate.jpg",
	      "projectSummary":"Fuel Pricing Software",
	      "projectTools":"Angular2, Angular CLI, ElasticSearch, D3, HTML, Bootstrap 4, Sass",
	      "description":"<p>I work on a team of three on a brand new product for wholesale fuel pricing. My responsibilities include architecting the client side of the application as well as designing the UX workflow and the UI design. The application is built with Angular2 using TypeScript and Angular CLI. The styles use Sass as the CSS preprocessor.<\/p>\n\n<p>The main function of the application is to present data to the user in an easily consumed form. For this we are utilizing the D3 javascript library for data visualization.<\/p>"
	   },
	   {
	      "id":"3",
	      "company":"DecisionDesk",
	      "position":"Lead Front End Developer",
	      "logo":"decisiondesk.png",
	      "backgroundImg":"decisionDesk.jpg",
	      "projectSummary":"Higher Education Admissions Application",
	      "projectTools":"BackboneJS, JQuery, Less, Bootstrap, HTML, CSS",
	      "description":"<p>As Lead Front End developer my role was to build out new features for our Higher Education Application software. I worked with Backbone JS as the main client side technology as well as HTML and Less.<\/p>\n\n<p>In my time with DecisionDesk I helped bring an old product to production quality to deliver to our enterprise clients in time for school enrollment season.<\/p>"
	   }
	];

	$scope.toggleDetails = '';
	$scope.viewFull = false;
	$scope.transitions = false;
	$scope.detailView = false;

	//Show project details
	$scope.showDetails = function(index){
		//Hide nav and prevent page scroll when details are open
		$rootScope.navVisible = false;
		$rootScope.noScroll = true;

		//Unbind transition-end event from project placeholder div
		$('body').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', '.placeholder .front', function(e) {});

		//Animate project details view
		$scope.detailView = true;

		//Measure screen to set placeholder to full screen
		$scope.projectHeight = $('.project:first-child').height();
		$scope.projectWidth = $('.project:first-child').width();
		$scope.windowHeight = window.innerHeight;
		$scope.windowWidth = window.innerWidth + 15;
		$scope.leftAlign = $('.grid').offset().left + 15;
		$scope.topAlign = $(window).scrollTop() - $('.grid').offset().top;

		//Set positioning of placeholder
		$scope.elementTop = $('#project' + index).offset().top - ($('.grid').offset().top + 10);
		$scope.elementLeft = $('#project' + index).offset().left - ($('.grid').offset().left + 10);
		$('.placeholder > div').css({'top': $scope.elementTop, 'left': $scope.elementLeft, 'visibility': 'visible'});

		//Set placeholder to position of selected project div
		$timeout(function(){
			$scope.transitions = true;
			$scope.viewFull = true;
			$('.placeholder > div').css({'top': ($scope.topAlign - 8), 'left': -$scope.leftAlign, 'width': $scope.windowWidth, 'height': $scope.windowHeight});
		}, 10);

		//Set projectDetails object to content of select project and hide project card
		$('#project' + index).addClass('invisible');
		$scope.projectDetails = $scope.projects[index];
		$scope.toggleDetails = 'open';

	};
	$scope.hideDetails = function(){
		//Allow body scrolling again
		$rootScope.noScroll = false;

		//Reset placeholder card to position of selected project card
		$scope.viewFull = false;
		$scope.toggleDetails = 'close';
		$('.placeholder > div').css({'top': $scope.elementTop, 'left': $scope.elementLeft, 'height': $scope.projectHeight, 'width': $scope.projectWidth});

		//Show original project card and hide placeholder when card animation ends
		$('body').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', '.placeholder .front', function(e) {
			if($('.grid-wrapper').hasClass('view-full')) {
				return;
			}
			else {
				$scope.transitions = false;
				$timeout(function(){
					$('.placeholder > div').css({'visibility': 'hidden'});
				}, 100);
				$('.project').removeClass('invisible');
				$scope.detailView = false;
				$rootScope.navVisible = true;
			}
		});
	};

	//To be called when any part of project card is clicked and not just the "view details" button on mobile
	$scope.showDetailsMobile = function(index){
		if($scope.mobile || $scope.tablet) {
			$scope.showDetails(index);
		}
	};
}]);