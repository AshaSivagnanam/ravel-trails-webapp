'use strict';

var app = angular.module("myApp",['angularModalService', 'lbServices']);

app.controller("myController", function($scope, Trail, Item, Traveler, ModalService) {
	$scope.trails = [];
	$scope.trail = 0;
	$scope.pages = 1;
	$scope.search = function(){
		//if($('#attractions').is(':checked'))
		var departure = $("#departure").val();
		var arrival = $("#arrival").val();
		//$scope.trails = [];
		if(departure != '' && arrival !='') {
			//Trail.find({filter : {include : { relation : 'items'}, where : {and : [{ departureCity : departure }, { arrivalCity : arrival }, { status : 'booked'}]}}}).$promise
			Trail.find({filter : {include : { relation : 'items'}, where : {and : [{ departureCity : departure }, { arrivalCity : arrival }]}}}).$promise
			.then(function(trails){
				//console.log(trails);
				$scope.trails = trails;

			});
			//$(".marketing").toggle("slow").toggle("slow");
			$(".marketing").fadeIn("slow");
		}
		else
			alert("Please enter source and destination locations");
	};
	$scope.trailHasItem = function(items, type){
		console.log("inside scope trailHasItem type " + type + ", items ");
		console.log(items);
		var flag = false;
        for(var i = 0; i < items.length; i++) {
        	if(items[i].type.toUpperCase() === type.toUpperCase()) {
        		console.log("returning true");
        		flag = true;
        		break;
        	}
        }
        console.log(flag);
        return flag;
	};
	$scope.filterTrails = function(trail){
		var checkedTypes = [];
		var items = trail.items;
		var duration = $("#slider12c").val();
		var typeFlag = false, durationFlag = false, minPriceFlag = false, maxPriceFlag = false;

		if(duration !== '' || duration !== undefined) {
			console.log(duration);
			if(trail.durationInDays >= duration)
				durationFlag = true;
		}
		else
			durationFlag = true;

		if($("#attractions").is(":checked")){
			checkedTypes.push("attraction");
		}
		if($("#restaurants").is(":checked")){
			checkedTypes.push("restaurant");
		}
		if($("#cruise").is(":checked")){
			checkedTypes.push("cruise");
		}
		if($("#shopping").is(":checked")){
			checkedTypes.push("shopping");
		}
		if(checkedTypes.length == 0)
			typeFlag = true;
        for(var i = 0; i < items.length; i++) {
        	//if(items[i].type === type) {
        	if(checkedTypes.indexOf(items[i].type) !== -1) {
        		console.log("returning true");
        		typeFlag = true;
        		break;
        	}
        }

        var minPrice = $("#min-price").val(), maxPrice = $("#max-price").val();
        if(minPrice !== '' && minPrice !== undefined){
        	console.log("min price is defined");
        	if(trail.costPerPerson >= minPrice) {
        		minPriceFlag = true;
        	}
        }
        else
        	minPriceFlag = true;
        if(maxPrice !== '' && maxPrice !== undefined){
        	console.log("max price is defined");
        	if(trail.costPerPerson <= maxPrice) {
        		maxPriceFlag = true;
        	}
        }
        else
        	maxPriceFlag = true;
        console.log("typeFlag - " + typeFlag + ", durationFlag - " + durationFlag + ", minPriceFlag - " + minPriceFlag + ", maxPriceFlag - " + maxPriceFlag);
        console.log("maxPrice - " + maxPrice + ", trail.costPerPerson - " + trail.costPerPerson);
        return typeFlag && durationFlag && minPriceFlag && maxPriceFlag;
	};
	$('.marketing').on('change keyup', 'input', function(e) {
    	console.log("on change checkbox");
    	$scope.search();
	});

	$scope.showTaAnlytics = function() {
		ModalService.showModal({
			templateUrl: "analytics.html",
			controller: "ModalController"
		}).then(function(modal) {
			modal.element.modal();
			modal.close();
		});
	};

	/*$scope.openAnalyticsPage = function() {
		$window.open('analyticsdata.html', 'Analtics Data', 'width=500,height=400');
	};
	$scope.analyticsPage = "analyticsdata.html";*/
});

app.controller('ModalController', function($scope, close) {
  
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };
});

app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i < total; ++i) {
            input.push(i);
        }
        return input;
    };
});

