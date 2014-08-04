angular.module('rental.controllers').controller('RentalsCtrl', ['$scope', '$routeParams',
  '$location', 'Rental', 'UsedBike', '$resource', '$timeout',
  function ($scope, $routeParams, $location, Rental, UsedBike, $resource, $timeout) {

    $scope.locationNames = ["Bethesda", "Georgetown", "Old Town", "Arlington", "Potomac"];
    $scope.customer = {};
    $scope.rental = new Rental({});
    $scope.showConfirmation = false;
    $scope.showMin = 0;
    $scope.showMax = 100;

    $scope.saveRental = function () {
      $scope.rental = _.extend($scope.rental, $scope.customer);
      $scope.rental.save().then(function (rental) {
        $scope.showConfirmation = true;
      }, function (error) {
        console.log(error);
      });
    };

    $scope.convertDate = function (time) {
       return new Date(time).toLocaleDateString();
    }

    $scope.convertTime = function (time) {
       var time = new Date(time).toLocaleTimeString();
       return time.split(":", 2).join(":") + " " + time.split(" ", 2)[1]
    }

    $scope.getDate = function (time) {
       return new Date(time).getTime(); 
    }
    
    $scope.getTime = function (time) {
       return new Date(time).getHours(); 
    }

    $scope.paginate = function(index) {
        return index >= $scope.showMin && index < $scope.showMax;
    }

	Rental.query().then(function(response){
        $scope.rentals = _.map(response, function (r) {
            r.date = r.time;
            r.time = $scope.convertTime(r.time);
            return r;
        });
	});

    $scope.startTimes = _.range(11, 18);
  }
]);
