angular.module('bike.services')
.factory('Store', ['railsResourceFactory', '$cacheFactory', 'FilterService', function(railsResourceFactory, $cacheFactory, FilterService) {
  var store = railsResourceFactory({url: '/stores', name: 'store'});

  store.cache = $cacheFactory('storesCache');

  store.smartQuery = function(callback) {
    var self = this;
    var cachedStores = this.cache.get("stores");
    if(cachedStores) {
      callback(cachedStores);
    }else {
      this.query().then(function(data) {
        var stores = _.map(data, function(s){
          return self.addDetail(s);
        });
        self.cache.put("stores", stores);
        callback(stores);
      });
    }
  };

  store.addDetail = function(s) {
    if(!s.location) return false;
    var location = s.location.toLowerCase();
    s.dataStore = this.dataStore[location];
    // s.hours = dataStore.hours;
    // s.address = dataStore.address;
    // s.phone = dataStore.phone;
    // s.email = dataStore.email;
    // s.images = dataStore.images;
    return s;
  };

  store.dataStore = {
    "arlington": {
      "hours": {
        "monday-friday": "11-7",
        "saturday-sunday": "10-6"
      },
      "address": {
        "number": "3119",
        "street": "Lee Highway",
        "city": "Arlington",
        "state": "Virginia",
        "zipcode": "22201"
      },
      "phone": "703-522-1110",
      "email": "arlington@bigwheelbikes.com",
      "images": [
      "bwb_arl_1.png",
      "bwb_arl_2.jpg"
      ]
    },

    "bethesda": {
      "hours": {
        "monday-friday": "11-7",
        "saturday-sunday": "10-6"
      },
      "address": {
        "number": "3119",
        "street": "Lee Highway",
        "city": "Bethesda",
        "state": "Maryland",
        "zipcode": "22201"
      },
      "phone": "301-652-0192",
      "email": "bethesda@bigwheelbikes.com",
      "images": [
      "bwb_beth_1.jpg",
      "bwb_beth_2.jpg"
      ]
    },

    "georgetown": {
      "hours": {
        "monday-friday": "11-7",
        "saturday-sunday": "10-6"
      },
      "address": {
        "number": "3119",
        "street": "Lee Highway",
        "city": "Arlington",
        "state": "Virginia",
        "zipcode": "22201"
      },
      "phone": "202-337-0254",
      "email": "georgetown@bigwheelbikes.com",
      "images": [
      "bwb_gtown_1.jpg",
      "bwb_gtown_2.jpg"
      ]
    },

    "potomac": {
      "hours": {
        "monday-friday": "11-7",
        "saturday-sunday": "10-6"
      },
      "address": {
        "number": "3119",
        "street": "Falls Road",
        "city": "Potomac",
        "state": "Maryland",
        "zipcode": "20854"
      },
      "phone": "703-522-1110",
      "email": "potomac@bigwheelbikes.com",
      "images": [
      "bwb_gtown_1.jpg",
      "bwb_gtown_2.jpg"
      ]
    },

    "old town": {
      "hours": {
        "monday-friday": "11-7",
        "saturday-sunday": "10-6"
      },
      "address": {
        "number": "3119",
        "street": "Lee Highway",
        "city": "Arlington",
        "state": "Virginia",
        "zipcode": "22201"
      },
      "phone": "703-522-1110",
      "email": "oldtown@bigwheelbikes.com",
      "images": [
      "bwb_ot_1.jpg",
      "bwb_ot_2.png"
      ]
    }
  };


return store;
}]);