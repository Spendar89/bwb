angular.module('app').controller('AdminCtrl', ['$scope', '$http', '$routeParams', '$location', '$resource',
  function($scope, $http, $routeParams, $location, $resource) {

    $scope.adminLinks = [{
        href: "#/current_events/new",
        description: "Mange Current Event Posts"
      }, {
        href: "#/new_bike_inventory/new",
        description: "Manage New Bike Inventory"
      }, {
        href: "#/used_bike_inventory/new",
        description: "Manage Used Bike Inventory"
      }, {
        href: "#/bikes/new",
        description: "Add A Bike"
      }

    ];

  }
]);