angular.module('inventory.controllers').controller('InventoryCtrl', ['$scope', '$http', '$routeParams', '$location','Inventory', 'Bike', '$resource', '$timeout', '$anchorScroll', function($scope, $http, $routeParams, $location, Inventory, Bike, $resource, $timeout, $anchorScroll){

	$scope.order="bike.brand"
	$scope.locationNames = ["Bethesda", "Georgetown", "Old Town", "Arlington", "Potomac"]
	$scope.disableBtn = false;
	$scope.showNumber = 50;
    $scope.transferLocation = "Bethesda"
	
	Inventory.query().then(function(response){
		$scope.inventories = response
	})

	Bike.query().then(function(response){
		$scope.bikes = response
		$scope.bikeBrands = _.uniq($scope.bikes.map(function(bike){
			return bike.brand
		}))

		$scope.bikeModels = function(brand){
			var bikes = $scope.bikes.filter(function(bike){
				return bike.brand == brand
			})
			return window.bikeModels = bikes.map(function(bike){
				return { model: bike.model, id: bike.id }
			})
		}
	})
	
	$scope.getStockNumber = function(id){
		if (id<=999999) id = ("00000"+id).slice(-6)
			return id;
	};

	$scope.create = function(inventory) {
		var invObj = new Inventory(inventory)
		invObj.create().then(function(response) {
			$scope.inventoryAdded = response.success;
		});
	};

	$scope.update = function(inventory) {
		var invObj = new Inventory(inventory)
		invObj.update().then(function(response){
			inventory.editing = false;
		});
	};

    $scope.anyTransfers = window.anyTransfers = function () {
        return _.any($scope.selectedTransfers());
    };

    $scope.selectedTransfers = function () {
		return _.filter($scope.inventories, function(inv) {
			return inv.transfer;
		});
    };

	$scope.makeTransfer = function() {
        var transfers = $scope.selectedTransfers();
		var inventory = _.map(transfers, function(inv) {
			return inv.id
		});

        var location = $scope.transferLocation;

		Inventory.$post("bike_inventories/transfer", { inventory: inventory, location: location }).then(function(response) {
            $timeout(function () {
                _.each(transfers, function (t) {
                    t.store.location = location
                    t.transfer = false;
                });
                $scope.transferSuccess = true;
            });
        })
	}


	$scope.gotoBottom = function (){
    	// set the location.hash to the id of
    	// the element you wish to scroll to.
    	$location.hash('bottom');

    	// call $anchorScroll()
    	$anchorScroll();
    }

}])



