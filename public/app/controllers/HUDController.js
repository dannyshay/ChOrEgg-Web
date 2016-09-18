angular
    .module('choregg')
    .controller('HudController', ['$scope', 'HUDService', 'LoadingService', 'UserService', 'AuthenticationService', function($scope, HUDService, LoadingService, UserService, AuthenticationService) {
        // Watch the score
        $scope.$watch(function () { return HUDService.getCurrentScore(); },
            function (aScore) { $scope.currentScore = aScore; }
        );

        // Watch the loading indicator
        $scope.$watch(function() { return LoadingService.getLoading();},
            function (aLoading) {
                if (aLoading != null && aLoading != $scope.isLoading) {
                    $scope.isLoading = aLoading;
                }
            }
        );

        $scope.$watch(function() {return AuthenticationService.getSignedIn();},
            function(aSignedIn) {
                if(aSignedIn != null && aSignedIn != $scope.signedIn) {
                    $scope.signedIn = aSignedIn
                }
            }
        );

        // Watch the strikes
        $scope.$watch(function () { return HUDService.getNumStrikes(); },
            function (aNumStrikes) {
                $scope.numStrikes = aNumStrikes;

                // Game over baby!
                if ($scope.numStrikes && $scope.numStrikes >= 5) {
                    alert('GAME OVER!!');
                    HUDService.resetNumStrikes();
                    HUDService.resetCurrentScore()
                }
            }
        );

        // Used by Angular in the view (hud.html)
        $scope.getNumber = function(number) {
            return new Array(number);
        };
    }]);