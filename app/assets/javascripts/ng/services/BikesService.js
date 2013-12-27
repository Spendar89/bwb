angular.module('bike.services')
.factory('Bike', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory({url: '/bikes', name: 'bike'});
}])
.factory('BikeImages', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory({url: '/bikes/images', name: 'bike_images'});
}])
.factory('FilterService', function() {
	
  var FilterService = function(bike) {
    var excludeTerms = ["with", "by", "and", "for", "the", "it", "by", 
    "bike", "bikes", "brand", "brands", "model", 
    "models", "speed", "kind", "type", "has", 
    "speeds", "has", "which", "whose", "year", 
    "from", "less", "greater", "than", "that", "are", 
    "dollars", "price", "is", "equals", "="]
    this.excludeTermsString = excludeTerms.join("").replace(/\s|,/g, '').toLowerCase()
    this.attrsString = bike.attrsString
    this.price = bike.price
  }

  FilterService.prototype = {
    termMatches: function(term) {
      var termMatch = this.attrsString.indexOf(term) > -1
      var excludeTermMatch = this.excludeTermsString.indexOf(term) > -1
      return termMatch || excludeTermMatch
    },


    allTermsMatch: function(filterTerms) {
      var self = this;
      return _.all(filterTerms, function(term) {
        var regMatch = self.termMatches(term),
        postMatch = self.termMatches(term.slice(0,-1)),
        preMatch = self.termMatches(term.slice(1));
        return regMatch || preMatch || postMatch 
      })
    },

    getPriceTermObj: function(filterTermsString) {
      var priceTerm = filterTermsString.match(/(\$\d+)|(\d+\s*dollars)/)
      if(priceTerm) {
        var priceTerm = priceTerm[0].match(/\d+/)[0]
        var greaterThan = (filterTermsString.match(/(greater than)|(more than)/))? true : false
        var lessThan = (filterTermsString.match(/(less than)/))? true : false
        return { priceTerm: parseInt(priceTerm), greaterThan: greaterThan, lessThan: lessThan }
      } else {
        return false
      }
    },

    priceMatches: function(priceTermObj) {
      if(!priceTermObj) return true;
      var match;
      var bikePrice = this.price;
      var termPrice = priceTermObj.priceTerm;
      match = (priceTermObj.greaterThan)? (bikePrice > termPrice) : (bikePrice < termPrice);
      return match
    },

    showBike: function(filterTermsString) {
      if(!filterTermsString) return true
        var priceTermObj = this.getPriceTermObj(filterTermsString)
      if(priceTermObj) filterTermsString = filterTermsString.replace(priceTermObj.priceTerm, "")
        var filterTerms = filterTermsString.replace(/\$|,|=/g, '').toLowerCase().split(" ");
      return this.allTermsMatch(filterTerms) && this.priceMatches(priceTermObj)
    }
  }

  return FilterService

})
