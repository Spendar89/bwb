angular.module('rental.services')
  .factory('Rental', ['railsResourceFactory',
    function(railsResourceFactory) {
      return railsResourceFactory({
        url: '/rentals',
        name: 'rental'
      });
    }
  ]);