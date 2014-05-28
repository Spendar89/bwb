angular.module('bike.services')
  .factory('Bike', ['railsResourceFactory', '$cacheFactory', 'FilterService',
    function (railsResourceFactory, $cacheFactory, FilterService) {

      var Bike = railsResourceFactory({
        url: '/bikes',
        name: 'bike'
      });

      Bike.cache = $cacheFactory('bikesCache');

      Bike.smartQuery = function (callback) {
        var cachedBikes = this.cache.get("bikes");
        var afterQuery = function (data) {
          this.setCache(data, callback);
        }.bind(this);
        cachedBikes ? callback(cachedBikes) : this.query().then(afterQuery);
      };

      Bike.setCache = function (bikes, callback) {
        Bike.filterize(bikes);
        this.cache.put("bikes", bikes);
        callback(bikes);
      };
      
      Bike.filterize = function (data) {
        _.each(data, function (d) {
          d.filterService = new FilterService(d);
        });
      };

      Bike.get = function (bikeId, callback) {
        this.smartQuery(function (bikes) {
          var bike = _.detect(bikes, function (b) {
            return b.id == bikeId;
          });
          callback(bike);
        });
      };

      Bike.clearCache = function (callback) {
        this.cache.remove("bikes");
        if (callback) callback();
      };

      return Bike;
    }
  ])

  .factory('BikeImages', ['railsResourceFactory',
    function (railsResourceFactory) {
      return railsResourceFactory({
        url: '/bikes/images',
        name: 'bike_images'
      });
    }
  ])

  .factory('FilterService', function () {

    var FilterService = function (bike) {
      this.matchArray = _.union(this.attrsArray(bike), this.excludeArray);
      this.price = bike.price;
    };

    FilterService.prototype = {

      excludeArray: ["with", "by", "and", "for", "the", "it", "by",
        "bike", "bikes", "brand", "brands", "model",
        "models", "speed", "kind", "type", "has", "more",
        "speeds", "has", "which", "whose", "year", "cost", "costs",
        "from", "less", "greater", "than", "that", "are",
        "dollars", "price", "is", "equals", "="
      ],

      attrsArray: function (bike) {
        var attrs = _.pick(bike,"model", "brand", "year", 
            "kind", "price", "groupset", "material");
        var attrsArray = _.values(attrs);
        return _.flatten(_.map(attrsArray, function (attr) {
          return attr.toString().replace(/\s|,/g, '').toLowerCase().split(" ");
        }));
      },

      termMatches: function (term) {
        var regMatches = _.filter(this.matchArray, function (attr) {
          var isYear = Number(term) > 2000 && Number(term) < 2020; 
          var t = isYear ? term : term.slice(0, -1); 
          return attr.indexOf(t) > -1
        });
        return _.any(regMatches); 
      },

      allTermsMatch: function (filterTerms) {
        return _.all(filterTerms, function (term) {
          return this.termMatches(term);
        }.bind(this));
      },

      getPriceTermObj: function (filterTermsString) {
        var priceTerm = filterTermsString.match(/(\$\d+)|(\d+\s*dollars)|(d+.00)/);
        if (!priceTerm) return false;
        return {
          priceTerm: parseInt(priceTerm[0].match(/\d+/)[0]),
          greaterThan: (filterTermsString.match(/(greater than)|(cost more than)|(more than)/)) ? true : false,
          lessThan: (filterTermsString.match(/(less than)|(under)/)) ? true : false
        };
      },

      priceMatches: function (priceTermObj) {
        if (!priceTermObj) return true;
        var termPrice = priceTermObj.priceTerm;
        return (priceTermObj.greaterThan) ? (this.price > termPrice) : (this.price < termPrice);
      },

      showBike: function (filterTermsString) {
        if (!filterTermsString) return true;
        var priceTermObj = this.getPriceTermObj(filterTermsString);
        if (priceTermObj) {
          filterTermsString = filterTermsString.replace(priceTermObj.priceTerm, "");
        }
        var filterTerms = filterTermsString.replace(/\$|,|=/g, '').toLowerCase().split(" ");
        return this.allTermsMatch(filterTerms) && this.priceMatches(priceTermObj);
      }
    };

    return FilterService;

  });
