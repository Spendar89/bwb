angular.module('currentEvent.controllers').controller('CurrentEventsCtrl', ['$scope', '$http', '$routeParams', '$location', '$document', 'CurrentEvent', '$resource', '$timeout',
    function($scope, $http, $routeParams, $location, $document, CurrentEvent, $resource, $timeout) {

        $scope.master = {};

        $scope.colors = [
            {name: 'white', value: 'white'},
            {name: 'black', value: '#333'},
            {name: 'yellow', value: '#ffbd27'},
            {name: 'red', value: '#F03C3C'}
        ];

        $scope.backgroundColors = [
            {name: 'white', value: 'rgba(255, 255, 255, 0.9)'}, 
            {name: 'Transparent', value: 'transparent'}, 
            {name: 'black', value: 'rgba(0, 0, 0, 0.9)'}, 
            {name: 'red', value: 'rgba(198, 19, 19,0.95)'}, 
            {name: 'yellow', value: 'rgba(255, 189, 39, 0.9)'}
        ];

        $scope.create = function(currentEvent) {
            currentEvent.image = $('#imageUrlInput').val()
            var currentEventObj = new CurrentEvent(currentEvent)
            currentEventObj.create().then(function(response) {
                $scope.postCreated = true;
                $scope.refresh();
            }, function(error) {
                $scope.postCreated = false;
            })
        };

        $scope.update = function(currentEvent) {
            var $image = $('#imageUrlInput').val()
            if ($image) currentEvent.image = $image;
            var currentEventObj = new CurrentEvent(currentEvent)
            currentEventObj.update().then(function(response) {
                $scope.postCreated = true;
                $scope.refresh();
            }, function(error) {
                $scope.postCreated = false;
            })
        }

        $scope.save = function(currentEvent) {
            if (!currentEvent) {
                $timeout(function() {
                    $scope.postCreated = false;
                })
            } else if (currentEvent.id) {
                $scope.update(currentEvent)
            } else {
                $scope.create(currentEvent)
            }
        }

        $scope.show = function(currentEvent) {
            $scope.currentEvent = currentEvent
        }

        $scope.delete = function(currentEvent) {
            currentEvent.remove();
        }

        $scope.refresh = function() {
            CurrentEvent.query().then(function(data) {
                $scope.currentEvents = data;
                $scope.currentEvent = undefined;
            })
        }

        $document.ready(function() {
            $scope.refresh();
        })

    }
])
