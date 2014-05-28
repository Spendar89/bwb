angular.module('bike.controllers').controller('BikeCtrl', ['$scope', '$http', '$routeParams', '$location', 'Bike', 'FilterService', 'BikeImages', '$timeout', '$resource',
  function($scope, $http, $routeParams, $location, Bike, FilterService, BikeImages, $timeout, $resource) {

    $scope.hideBikes = true;

    Bike.smartQuery(function(bikes) {
      $scope.bikes = bikes;
      $timeout(function() {
        $scope.hideBikes = false;
      }, 100);
    });

    //For Bike Show Route
    $scope.bikeId = $routeParams.bikeId;

    Bike.get($scope.bikeId, function(bike) {
      $scope.bike = bike;
    });


    $scope.range = function(n) {
      var array = [];
      for (var i = 0; i < n; i++) {
        array.push(i);
      }
      return array;
    };

    $scope.master = {};

    $scope.images = [];

    $scope.recentlyAddedBikes = [];

    $scope.filterTerms = undefined;

    $scope.showBike = function(bike) {
      return bike.filterService.showBike($scope.filterTerms);
    };

    $scope.findSimilar = function() {
      var bike = $scope.bike;
      return _.filter($scope.bikes, function(b) {
        if (!bike) return false;
        var inPriceRange = (b.price >= (bike.price - 100) && b.price <= (bike.price + 100));
        var sameKind = (b.kind === bike.kind);
        var notSame = (b.id != bike.id);
        if (inPriceRange && sameKind && notSame) return b;
      });
    };

    $scope.reset = function() {
      $scope.bike = angular.copy($scope.master);
    };

    $scope.getImages = function(bike) {
      // $('#loader-container').fadeIn();
      $scope.loadingImages = true;
      BikeImages.query(bike).then(function(response) {
        $scope.loadingImages = false;
        $scope.images = response;
        $scope.current_index = 0;
        // $('.image-controls').show();
        // $('#submit-div').css('visibility', 'visible');
        // $('#loader-container').fadeOut();
      });
    };

    $scope.nextImage = function() {
      if ($scope.current_index < $scope.images.length - 1) {
        $scope.current_index += 1;
      } else {
        $scope.current_index = 0;
      }
      return false;
    };

    $scope.lastImage = function() {
      if ($scope.current_index > 0) {
        $scope.current_index -= 1;
      } else {
        $scope.current_index = $scope.images.length - 1;
      }
    }

    $scope.recentBikes = [];

    $scope.create = function(bike) {
      // $('#loader-container').fadeIn();
      $scope.loadingImages = true;
      bike.raw_image_url = $scope.images[$scope.current_index].url;
      var bikeObj = new Bike(bike).create().then(function(bike) {
        $scope.recentBikes.push(bike);
        $scope.reset();
        $scope.loadingImages = false;
      });
    };

    $scope.locations = ["Arlington", "Bethesda", "Old Town", "Potomac", "Georgetown"];

    $scope.getLocation = function(storeId) {
      return $scope.locations[parseInt(storeId) - 1];
    };

    $scope.getAvailability = function(bike, location) {
      if (!bike) return false;
      var avail = _.filter(bike.availability, function(b) {
        return b.location === location;
      });

      return avail[0].sizes;
    };

    //typeahead (autocomplete) stuff:

    $scope.kinds = ['hybrid', 'mountain', 'road', 'cruiser', 'kids', 'triathalon'];

    $scope.brands = ['Marin', 'Fuji', 'Kona', 'Bianchi', 'Electra', 'Scott'];

    $scope.materials = ['steel', 'aluminum', 'carbon'];

    $scope.groupsets = ['Shimano Claris', 'Shimano Sora', 'Shimano Tiagra',
      'Shimano 105', 'Shimano Ultegra', 'Shimano Dura-Ace',
      'Shimano Tourney', 'Shimano Altus', 'Shimano Acera',
      'Shimano Alivio', 'Shimano Hone', 'Shimano Zee',
      'Shimano Saint', 'Shimano Deore', 'Shimano Deore LX',
      'Shimano Deore XT', 'Shimano SLX', 'Shimano Deore XTR'
    ];

  }
]);
