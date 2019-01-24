//ecperienceController.js

var app = angular.module('profileApp.experience', []);

app.controller('ExperienceController', ['$rootScope', '$scope', '$timeout', 'pageContent', '$sanitize', function($rootScope, $scope, $timeout, pageContent, $sanitize){

	//Get page content from CMS
	$scope.experiencePageContent = [];
	$scope.projects = [];
	pageContent.getContent('experienceSection').then(function(response){
		$rootScope.navItems.page3 = response.data.bodyCopy.title;
		$scope.experiencePageContent = response.data.bodyCopy;
		$scope.projects = response.data.projects;
	});

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