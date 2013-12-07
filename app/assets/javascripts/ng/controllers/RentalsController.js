angular.module('rental.controllers').controller('RentalsCtrl', ['$scope', '$http', '$routeParams', '$location','Rental', 'UsedBike','$resource', '$timeout', function($scope, $http, $routeParams, $location, Rental, UsedBike, $resource, $timeout){
	$scope.currentSmallBikes = []
	$scope.currentMediumBikes = []
	$scope.currentLargeBikes = []
	
	$scope.scheduleRental = function(rental, customer) {
		rental.customerId = customer.id
		$scope.quantErrors = []
		rental.quantities = {
			hybrid: {
				small: 0,
				medium: 0,
				large: 0
			},
			mountain: {
				small: 0,
				medium: 0,
				large: 0
			},
			road: {
				small: 0,
				medium: 0,
				large: 0
			}
		}
		$scope.getUsedInventory($scope.rental.location)
		var pos = $('#used-bike-step').show().offset();
		$('body').animate({ scrollTop: (pos.top) });
		$scope.showHybrids()
		
	};
	
	$scope.getUsedInventory = function(location) {
		return UsedBike.query({location: location }).then(function(response) {
			$scope.showCurrent = false;
			$scope.usedBikes = response;
			organizeUsedBikes();
		})
	}
	
	var organizeUsedBikes = function(){
		$scope.hybrids = []
		$scope.mountainBikes = []
		$scope.roadBikes = []
		_.each($scope.usedBikes, function(usedBike){
			if(usedBike.kind){
				var kind = usedBike.kind.toLowerCase()
				if( kind == "hybrid") {
					$scope.hybrids.push(usedBike)
				}else if(kind == "mountain") {
					$scope.mountainBikes.push(usedBike)
				}else if(kind == "road") {
					$scope.roadBikes.push(usedBike)
				}
			}
		})
	}
	
	$scope.getCurrentSmallBikes = function() {
		$scope.currentSmallBikes =  _.filter($scope.currentBikes, function(bike) {
			var size = parseInt(bike.size)
			return size < 17
		})
		return $scope.currentSmallBikes
	}
	
	$scope.getCurrentMediumBikes = function() {
		$scope.currentMediumBikes = _.filter($scope.currentBikes, function(bike) {
			var size = parseInt(bike.size)
			return size >= 17 && size < 19
		})
		return $scope.currentMediumBikes
	}
	
	$scope.getCurrentLargeBikes = function() {
		$scope.currentLargeBikes = _.filter($scope.currentBikes, function(bike) {
			var size = parseInt(bike.size)
			return size >= 19
		})
		return $scope.currentLargeBikes
	}

	$scope.resetQuants = function(){
		$scope.smallQuant = null
		$scope.mediumQuant = null
		$scope.largeQuant = null
	}

	$scope.setCurrentBikes = function() {
		$scope.getCurrentSmallBikes();
		$scope.getCurrentMediumBikes();
		$scope.getCurrentLargeBikes();
	}
	
	$scope.showHybrids = function() {
		$timeout(function(){
			$scope.resetQuants();
			$scope.currentType = "hybrid"
			$scope.currentBikes = $scope.hybrids
			$scope.setCurrentBikes();
			$scope.showCurrent = true
			$('#hybrid-tab').addClass('active')
			$('#mountain-tab').removeClass('active')
		}, 100)
	}
	
	$scope.showMountainBikes = function() {
		$timeout(function(){
			$scope.resetQuants();
			$scope.currentType = "mountain"
			$scope.currentBikes = $scope.mountainBikes
			$scope.setCurrentBikes();
			$scope.showCurrent = true
			$('#mountain-tab').addClass('active')
			$('#hybrid-tab').removeClass('active')
		}, 100)
	}
	
	$scope.create = function(rental, customer) {
		rental.date = rental.date.toString();
		rental.customerId = customer.id
		var rentalObj = new Rental(rental)		
		rentalObj.save().then(function(response){
			$scope.rental = response;
			console.log(response)

		})
	}

	$scope.quantFormValid = function(){
		var largeValid = ($scope.largeQuant <= $scope.currentLargeBikes.length && $scope.largeQuant >= 0)
		var mediumValid = ($scope.mediumQuant <= $scope.currentMediumBikes.length && $scope.mediumQuant >= 0)
		var smallValid = ($scope.smallQuant <= $scope.currentSmallBikes.length && $scope.smallQuant >= 0)
		var totalQuant = $scope.smallQuant + $scope.mediumQuant + $scope.largeQuant
		if(totalQuant <= 0) return false
		return largeValid && mediumValid && smallValid
	}

	$scope.addQuant = function(rental){
		var currentBikes = $scope.currentBikes
		if($scope.currentType == "hybrid"){
			var quants = rental.quantities.hybrid
		}else if($scope.currentType == "mountain"){
			var quants = rental.quantities.mountain
		}
		quants.small = $scope.smallQuant	
		quants.medium = $scope.mediumQuant
		quants.large = $scope.largeQuant
	}
	
	$scope.startTimes = [11, 12, 13, 14, 15, 16, 17, 18]
	
	
}])

