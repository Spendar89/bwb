angular.module('rental.controllers').controller('RentalsCtrl', ['$scope', '$routeParams', '$location','Rental', 'UsedBike', '$resource', '$timeout', function($scope, $routeParams, $location, Rental, UsedBike, $resource, $timeout){

  $scope.locationNames = ["Bethesda", "Georgetown", "Old Town", "Arlington", "Potomac"];

  $scope.customer = {};

  $scope.rental = new Rental({});

  $scope.showConfirmation = false;

  $scope.saveRental = function() {
   $scope.rental.firstName = $scope.customer.firstName;
   $scope.rental.lastName = $scope.customer.lastName;
   $scope.rental.email = $scope.customer.email;
   $scope.rental.phoneNumber = $scope.customer.phoneNumber;

   $scope.rental.save().then(function(rental){
    $scope.showConfirmation = true;
  }, function(error) {
    console.log(error);
  });
 };

 $scope.startTimes = [11, 12, 13, 14, 15, 16, 17, 18];
}]);

