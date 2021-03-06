angular
    .module('choregg')
    .controller('TimerController', ['$scope', 'TimerService', 'ItemService', 'HUDService', 'DifficultyService', 'CategoryService', 'LoadingService', 'UserService', 'StateService', function($scope, TimerService, ItemService, HUDService, DifficultyService, CategoryService, LoadingService, UserService, StateService) {
        $scope.$on('loadingChanged', function(event, options) {
            $scope.loading = options.loading;
        });

        $scope.$on('currentStateChanged', function(event, options) {
            $scope.currentState = options.currentState;
        });

        $scope.$on('isRunningChanged', function(event, options) {
            $scope.isRunning = options.isRunning;
        });

        $scope.$on('isPausedChanged', function(event, options) {
            $scope.isPaused = options.isPaused;
        });

        $scope.$on('timeRemainingChanged', function(event, options) {
            $scope.timeRemaining = options.timeRemaining;

            // Check for a timeout scenario
            if ($scope.timeRemaining == 0) {
                TimerService.restartTimer();
                ItemService.shiftItems();
                HUDService.addStrike();
                UserService.addRoundPlayed();

                // Get some more items (up to 10 based on currenct amount in item cache) to keep going
                ItemService.getItemsInTimespan(CategoryService.getCurrentCategory().categoryName, DifficultyService.getCurrentDifficulty().timeSpan, 10 - ItemService.getItems().length);
            }

            // Update the timer if necessary (this is ugly but must be done :( )
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });

        // Every time the ticker ticks (once per second)
        $scope.$on('timer-tick', function(event, value) {
            // Subtract a second from our 'time remaining'
            TimerService.tickDown();
        });
    }]);