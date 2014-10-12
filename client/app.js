(function () {
    var app = angular.module('app', []);

    app.config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    });

    app.filter('userUrl', function () {
        return function (username) {
            return 'www.creativelive.com/users/' + username;
        };
    });

    app.service('UserService', function () {
        this.verify = function (password, cb) {
            setTimeout(function () {
                cb(null, password === 'abcd');
            }, 1000);
        };
    });

    app.controller('VerifyController', [ '$scope', '$timeout', 'UserService', function ($scope, $timeout, UserService) {
        this.verify = function () {
            $timeout.cancel(this.verifyFn);
            this.verifyFn = $timeout(function () {
                $scope.checking = true;
                UserService.verify($scope.password, function (err, verified) {
                    console.log('VERIFIED', verified);
                    $scope.verified = verified;
                    $scope.checking = false;
                    $scope.$apply();
                });
            }, 300);
        };
    }]);

    app.controller('SettingsController', [ '$scope', function ($scope) {
        this.user = { timezone: 'AL' };

        this.initialize = function () {
            console.log('init');
        };

        this.verified = function () {
            return this.user.password === 'abc';
        };

        this.reset = function () {
            this.user = { timezone: 'AL' };
        };

        this.update = function () {
            $scope.settingsForm.$setPristine();
            console.log('updating user...');
        };

        this.isUnchanged = function () {
            var copy = angular.copy(this.user);
            delete copy.password;
            return angular.equals({ timezone: 'AL' }, copy);
        };
    }]);

    angular.element(document).ready(function () {
        setTimeout(function () {
            var rootEl = document.getElementById('content');
            angular.bootstrap(rootEl, ['app']);
        }, 1000);
    });
}());
