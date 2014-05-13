angular.module('rental.controllers').controller('RentalsCtrl', ['$scope', '$routeParams',
  '$location', 'Rental', 'UsedBike', '$resource', '$timeout',
  function ($scope, $routeParams, $location, Rental, UsedBike, $resource, $timeout) {

    $scope.locationNames = ["Bethesda", "Georgetown", "Old Town", "Arlington", "Potomac"];

    $scope.customer = {};

    $scope.rental = new Rental({});

    $scope.showConfirmation = false;

    $scope.saveRental = function () {
      $scope.rental = _.extend($scope.rental, $scope.customer);
      $scope.rental.save().then(function (rental) {
        $scope.showConfirmation = true;
      }, function (error) {
        console.log(error);
      });
    };

    $scope.startTimes = _.range(11, 18);
  }
]);