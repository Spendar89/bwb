angular.module('usedBike.controllers').controller('UsedBikeCtrl', ['$scope', '$routeParams',
                                                  '$location', 'UsedBike', 'Store',
  function ($scope, $routeParams, $location, UsedBike, Store) {
    // $scope.location = ($routeParams.location || "Bethesda");

    Store.smartQuery(function (data) {
      $scope.stores = data;
    });

    $scope.getUsedInventory = function () {
      UsedBike.smartQuery($scope.store, function (data) {
        $scope.usedInv = data;
      });

    };

    $scope.$watch("store", function () {
      $scope.getUsedInventory();
    });


    $scope.create = function (usedBike) {
      usedBike.storeId = $scope.store.id;
      $scope.master = angular.copy(usedBike);
      var usedBikeObj = new UsedBike(usedBike);

      //TODO: clear cache when shat changes like new used bike is added to db
      usedBikeObj.create().then(function (response) {
        $scope.getUsedInventory();
      });
    };

    $scope.update = function (usedBike) {
      var storeId = $scope.store && $scope.store.id;
      usedBike.storeId = storeId || usedBike.storeId;
      $scope.master = angular.copy(usedBike);
      var usedBikeObj = new UsedBike(usedBike);
      usedBikeObj.update().then(function (response) {
        usedBike.editing = false;
      });
    };

    //code for table sorting:
    $scope.order = "brand";
    $scope.directions = [{
      alias: 'ascending',
      value: false
    }, {
      alias: 'descending',
      value: true
    }];
    $scope.reverse = false;

    $scope.getStockNumber = function (id) {
      if (id <= 999999) id = ("00000" + id).slice(-6);
      return id;
    };

  }
]);