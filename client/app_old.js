'use strict';

var app = angular.module("myApp",['lbServices']);

app.controller("myController", function($scope, Trail, Item, Traveler) {
	$scope.trails = [];
	$scope.trail = 0;
	$scope.search = function(){
		//if($('#checkbox').is(':checked'))
		var departure = $("#departure").val().split(" ")[0];
		var arrival = $("#arrival").val().split(" ")[0];
		if(departure != '' && arrival !='') {
	  		Trail.find({ filter : { where : { and : [{ departureCity : departure }, { arrivalCity : arrival }]}}}, function(trails) {
	  			$scope.trails = trails;
	  			console.log("trails count - " + trails.length);
				//var htmlForTrail = '';
				//for(var i = 0; i < trails.length; i++){
				    //console.log(trails[i]);
				    //var trail = trails[i];
				    //console.log("trail id - " + trail.id + ", name - " + trail.name + ", dayWisePlan - " + trail.dayWisePlan + ", rating - " + trail.rating);
				    //htmlForTrail += '<div class="result"><div class="row"><div class="col-md-9"><div><a href="javascript:void()"><h4><b>';
				    //htmlForTrail += trail.name;
				    //htmlForTrail += ', ';
				    //htmlForTrail += trail.durationInDays;
				    ///htmlForTrail += " days</b>";
				    //var trailId = trail.id;
				    //htmlForTrail += sample(trailId);
			    	//htmlForTrail += $scope.getItemsForTrail(trailId);
		    		//htmlForTrail += '</h4></a></div>';
		    		//htmlForTrail += '<div><p>';
		    		//htmlForTrail += trail.dayWisePlan;
		    		//htmlForTrail += '</p></div><div class="row"><div class="col-md-7"><div class="progress"><div class="progress-bar progress-bar-warning progress-bar-striped" style="width:65%">';
		    		//htmlForTrail += '65% Profile Match</div><div class="progress-bar progress-bar-info progress-bar-striped" style="width:35%"></div></div>';
		    		//htmlForTrail += '<div class="col-md-2"><span class="glyphicon glyphicon-share"></span></div>';
		    		//htmlForTrail += '<div class="col-md-3">';
		    		//for(var k = 0; k < trail.rating; k++) {
		    		//	htmlForTrail += '<span class="glyphicon glyphicon-star yellow"></span>';
		    		//}
		    		//htmlForTrail += '</div></div></div><div class="row"><div class="col vcenter"><div class="input-group input-group-sm"> <a class="btn btn-sm btn-primary" href="#" role="button">View</a></div></div></div></div></div>';
				//}
				//console.log(htmlForTrail);
				//$("#searchresults").append(htmlForTrail);
			});
			$(".marketing").toggle("slow");
		}
		else
			alert("Please enter source and destination locations");
	};

	//$scope getItemsForTrail = function(trailId, itemname) {
	$scope.getItemsForTrail = function(trailId) {
	    var htmlForItems = '';
	    var itemname = 'air';
	    $scope.items = [];
	    //Item.find({ filter : { where : { and: [{trailId : '57f3e73725ec4a380410fe30' }, { type : itemname }]}}}, function(items) {
	    Item.find({ filter : { where : { and: [{trailId : trailId }, { type : itemname }]}}}, function(items) {
	    	$scope.items = items;
	    	console.log("items count for trailId - " + trailId + " is " + items.length);
	    	//for(var j = 0; j < items.length; j++) {
	    		//console.log(items[j]);
/*	    		var item = items[j];
	    		switch(item.type) {
	    			case "air":
	    				htmlForItems += '<span title="Flight Info" class="glyphicon glyphicon-plane text-success"></span>';
	    				break;
	    			case "hotel":
	    				htmlForItems += '<span title="Hotel Info" class="glyphicon glyphicon-bed text-info"></span>';
	    				break;
	    			case "car":
	    				htmlForItems += '<i class="fa fa-taxi green"></i>';
	    				break;
	    			case "restaurant":
	    				htmlForItems += '<span title="Restaurant Info" class="glyphicon glyphicon-cutlery green"></span>';
	    				break;
	    			case "attraction":
	    				htmlForItems += '<span title="Attractions Info" class="glyphicon glyphicon-map-marker "></span>';
	    				break;
	    			case "shopping":
	    				htmlForItems += '<span title="Shopping Info" class="glyphicon glyphicon-shopping-cart orange"></span>';
	    				break;
	    			case "cruise":
	    				htmlForItems += '<i class="fa fa-ship blue"></i>';
	    				break;
	    		}*/
	    	//}
	    });
	    return true;		
	};
	$scope.getBool = function(trailId, itemname) {
		console.log(trailId);
		console.log(itemname);
		//$scope.items = [];
		Item.find({ filter : { where : {trailId : '57f3e73725ec4a380410fe30' }}}, function(items) {
	    	//$scope.items = items;
	    	//console.log("items count for trailId - " + trailId + " is " + items.length);
	    	//if(items.length > 0)
	    	//	return true;
	    	//else
	    	//	return false; 
	    });
		return false;
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