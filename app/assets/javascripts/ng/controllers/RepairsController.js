angular.module('repairs.controllers').controller('RepairsCtrl', ['$scope', '$routeParams', '$location', 'Repairs', function($scope, $routeParams, $location, Repairs){

$scope.services = {};
$scope.categories = [];

$scope.order = {"tune-up services": 0, "special services": 1, "assembly and installations": 2, "common services":3};

// _.each(Repairs.dataStore, function(val, key) {
//   $scope.services.push(key);
//   $scope.categories.push(val.category);
// });

$scope.services.byCategory = _.groupBy(Repairs.dataStore, function(val, key) {
  return val.category;
});



}]);

