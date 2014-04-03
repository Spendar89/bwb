angular.module('store.controllers').controller('StoresCtrl', ['$scope', '$routeParams', '$location', 'Store', function($scope, $routeParams, $location, Store){


  Store.smartQuery(function (data) {
    $scope.stores = data;
  });

}]);

