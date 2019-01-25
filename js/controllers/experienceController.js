//ecperienceController.js

var app = angular.module('profileApp.experience', []);

app.controller('ExperienceController', ['$rootScope', '$scope', '$timeout', '$sanitize', function($rootScope, $scope, $timeout, $sanitize){

	$scope.projects = [
	   {
	      "id":"9",
	      "company":"Kalibrate",
	      "position":"Senior Software Engineer",
	      "logo":"kalibrate.png",
	      "backgroundImg":"kalibrate.jpg",
	      "projectSummary":"Fuel Pricing Software",
	      "projectTools":"Angular2, Angular CLI, ElasticSearch, D3, HTML, Bootstrap 4, Sass",
	      "description":"<p>I work on a team of three on a brand new product for wholesale fuel pricing. My responsibilities include architecting the client side of the application as well as designing the UX workflow and the UI design. The application is built with Angular2 using TypeScript and Angular CLI. The styles use Sass as the CSS preprocessor.<\/p>\n\n<p>The main function of the application is to present data to the user in an easily consumed form. For this we are utilizing the D3 javascript library for data visualization.<\/p>"
	   },
	   {
	      "id":"10",
	      "company":"DecisionDesk",
	      "position":"Lead Front End Developer",
	      "logo":"decisiondesk.png",
	      "backgroundImg":"decisionDesk.jpg",
	      "projectSummary":"Higher Education Admissions Application",
	      "projectTools":"BackboneJS, JQuery, Less, Bootstrap, HTML, CSS",
	      "description":"<p>As Lead Front End developer my role was to build out new features for our Higher Education Application software. I worked with Backbone JS as the main client side technology as well as HTML and Less.<\/p>\n\n<p>In my time with DecisionDesk I helped bring an old product to production quality to deliver to our enterprise clients in time for school enrollment season.<\/p>"
	   },
	   {
	      "id":"11",
	      "company":"Macy's",
	      "position":"AngularJS Developer",
	      "logo":"macys.png",
	      "backgroundImg":"macys.jpg",
	      "projectSummary":"Customer relationship management software",
	      "projectTools":"AngularJS, Spring MVC,  HTML, CSS, JQuery",
	      "description":"<p>Brought in as a contractor 2 months into the project, I was a part of building a new CRM system for Macy's and Bloomingdale's department stores. As the front end developer I was in charge of coding the Javascript, HTML, and CSS for the user interface. <\/p>\n\n<p>I lead the way to better front end practices in order to create a more sustainable , lean code base. I introduced the team to responsive design in order to make a code base that is not only re-usable across brands, but across devices as well.<\/p>\n\n<p>I also implemented the use of AngularJS routing, as this was a single page application with a majority of the controller logic running on the client with AngularJS. <\/p>\n\n<p>We utilized AngularJS for the front end framework to create dynamic functionality and an interactive user experience. The application was built to run in IE8 on the store registers and in Safari on iPad.<\/p>"
	   },
	   {
	      "id":"12",
	      "company":"Lands' End",
	      "position":"Javascript Developer",
	      "logo":"landsend.png",
	      "backgroundImg":"landsEnd.jpg",
	      "projectSummary":"E-commerce Website",
	      "projectTools":"AngularJS, HTML, Less, JQuery",
	      "description":"<p>I spent four months on assignment with Lands' End as a consultant representing Avantia. During my time with Lands End I worked mainly on fixing bugs in Javascript and converting the application into AngularJS from native Javascript and JQuery. The development environment included Java on the server side and we utilized Git for source control with the Eclipse IDE.<\/p>"
	   },
	   {
	      "id":"13",
	      "company":"Ben and Jerry's",
	      "position":"Front End Developer",
	      "logo":"benjerry.png",
	      "backgroundImg":"benJerry.jpg",
	      "projectSummary":"Redesign of company website",
	      "projectTools":"JSP, Jahia CMS, HTML, CSS",
	      "description":"<p>While working as a consultant for Avantia our company worked with Ben and Jerry's ice cream on integrating their website re-design into the content management system Jahia. Our team received the front end code for the new design from a separate company. Due to this fragmented process there was a lot of work to do to make the front end code work with Jahia. This is where my extensive experience coding for content management systems came in.<\/p>\n\n<p> I cleaned up the HTML and CSS to create a more modular structure. This made it possible for our team to create individual components in Jahia and in turn allows a content editor to add, remove, and edit site pages using a sort of \"building blocks\" structure. Aside from re-structuring parts of the front end code I was responsible for all changes to design that came at that stage of development.<\/p>"
	   },
	   {
	      "id":"14",
	      "company":"Ian Cramer",
	      "position":"Designer and Full Stack Developer",
	      "logo":"IanCramer.png",
	      "backgroundImg":"IanCramer.jpg",
	      "projectSummary":"This Website",
	      "projectTools":"AngularJS, HTML, Less, PHP, MySQL",
	      "description":"<p>The goal of this website is to showcase my experience, career goals, accomplishments, and strengths as a web designer and developer. I used my favorite technologies in the most creatives ways I could envision in both design and development and pushed myself to challenge the standards of practice.<\/p>\n\n<p>The site is built in AngularJS, HTML, and Less with a custom content management system built with AngularJS, HTML, Less, PHP and MySQL. I wanted the design to show my artistic foundation with a tactile illustration feel and to engage the user interactively. To accomplish these goals I created all icons and imagery as SVG images and used CSS animations to create an effect that shows the images \"draw\" on the screen. I chose my hometown city of Cleveland, OH as the overall theme because the personality and character of the city is an big influence in my life. Using AngularJS I created a custom attribute directive that can be used to specify a class to be added to any element when it enters the view port and then removed that element goes back \"above the fold\".<\/p>\n\n<p>The animations on the site are all done with CSS animations and transitions. For the \"card flipping\" effect in this section of the site I used 3D transforms with CSS transitions.<\/p>\n\n<p>Copy and images for each section are stored in a MySQL database and retrieved on page load in JSON format. Using the two-way data binding provided by AngularJS the page content is displayed on the view from the provided JSON. On the other end in the CMS there is a form for each section of the site to input, edit and remove content (shown in the screenshots below). The input is stored in JSON with two-way data binding and uses a PHP service to publish the content to the database.<\/p>\n<p>View the source code on my <a href=\"https:\/\/github.com\/iCramer\/resume-website\" target=\"_blank\">GitHub account.<\/p>\n<h4>Screenshots<\/h4>\n<img src=\"images\/CMS2.png\" alt=\"CMS Screenshot One\" \/>\n<img src=\"images\/CMS1.png\" alt=\"CMS Screenshot Two\" \/>"
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