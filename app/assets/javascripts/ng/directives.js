angular.module('app.directives')
  .directive('bikeradio', function() {
    return {
      restrict: 'A',
      link: function($scope, elem, attr) {
        elem.bind('click', function() {
          $(this).siblings('.selected').removeClass('selected');
          $(this).addClass('selected');
        });
      }
    };
  })
  .directive('fadeIn', ['$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function($scope, elem, attrs) {
          var amount = attrs.fadeIn;
          console.log(amount);
          $timeout(function() {
            elem.css("display", "none").css("visibility", "visible").fadeIn('fast');
          }, amount);
        }
      };
    }
  ])
  .directive('ngMax', function() {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        $scope.$watch(attrs.ngModel, function() {
          var maxQuant = parseInt(attrs.ngMax);
          var quant = elem.val();
          var valid = (maxQuant >= quant && quant >= 0);
          if (!valid && quant) {
            elem.removeClass('ng-valid').addClass('ng-invalid');
          } else {
            elem.removeClass('ng-invalid').addClass('ng-valid');
          }
        });
      }
    };
  })
  .directive('flashBtn', ['$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function($scope, elem, attrs) {
          elem.click(function() {
            if ($scope.disableBtn) return false;
            $scope.disableBtn = true;
            var $text = elem.html();
            elem.html(attrs.flashWaiting);
            $scope.$watch($scope[attrs.flashBtn], function() {
              if ($scope[attrs.flashBtn]) {
                elem.addClass("success").html(attrs.flashSuccess);
              } else {
                elem.addClass("failure").html(attrs.flashFailure);
              }
              $timeout(function() {
                elem.removeClass("success").removeClass("failure").html($text);
                $scope.disableBtn = false;
              }, 1000);
            });
          });
        }
      };
    }
  ])
  .directive('loadMore', function() {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        elem.bind('scroll', function() {
          var scrollAmt = (elem[0].scrollHeight - elem.scrollTop());
          var bottom = elem.outerHeight();

          if (scrollAmt == bottom) {
            $scope.$apply(function() {
              $scope.showNumber += 50;
            });
          }
        });
      }
    };
  })
  .directive("trashIcon", function() {
    return {
      restrict: "E",
      scope: {
        deleteMethod: '&'
      },
      replace: true,
      template: "<a href='' ng-click='deleteMethod()'><i  class='glyphicon glyphicon-large glyphicon-trash'></i></a>",
      link: function($scope, elem, attrs) {
        elem.bind('click', function() {
          var $target = $(this).parents(attrs["deleteTarget"]);
          $target.remove();
        });
      }
    };
  })
  .directive("editIcon", function() {
    return {
      restrict: "E",
      scope: {
        editMethod: '&'
      },
      replace: true,
      template: "<a href='' ng-click='editMethod()'><i  class='glyphicon glyphicon-large glyphicon-pencil'></i></a>"
    };
  })
  .directive("loader", function() {
    return {
      restrict: "E",
      replace: true,
      template: '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>',
      link: function() {
        $(".spinner").css("background-color", "white");
      }
    };
  })
  .directive("editInput", function() {
    return {
      restrict: "E",
      replace: true,
      template: '<input class="form-control col-sm-12" type="text" ng-disabled="!inv.editing" required/>'
    };
  })
  .directive("opacityDown", function() {
    return {
      link: function(scope, elem, attrs) {
        elem.addClass('opacity-full');
        scope.$watch(attrs.opacityDown, function() {
          if (scope[attrs.opacityDown]) {
            elem.addClass('opacity-faded');
          } else {
            elem.removeClass('opacity-faded');
          }
        });
      }
    };
  })
  .directive("modalSlideDown", function() {
    return {
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.modalSlideDown, function() {
          if (scope[attrs.modalSlideDown]) {
            elem.addClass('slide-down');
          } else {
            elem.removeClass('slide-down');
          }
        });
      }
    };
  })
  .directive('ngValidateLength', function() {
    return {
      require: 'ngModel',
      link: function($scope, elem, attrs, ngModel) {
        ngModel.$parsers.unshift(function(viewValue) {
          if (viewValue.length < attrs.ngValidateLength) {
            ngModel.$setValidity('length', true);
          } else {
            ngModel.$setValidity('length', false);
          }
          return viewValue;
        });
      }
    };
  });