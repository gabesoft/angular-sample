(function () {
    var app = angular.module('app', []);

    app.filter('userUrl', function () {
        return function (username) {
            return 'www.creativelive.com/users/' + username;
        };
    });

    app.controller('VerifyController', [ '$scope', function ($scope) {
        this.verify = function () {
            setTimeout(function () {
                $scope.verified = ($scope.password === 'abc');
                $scope.$apply();
            }, 1000);
        };
    }]);

    app.controller('SettingsController', function () {
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
            console.log('updating user...');
        };

        this.isUnchanged = function () {
            var copy = angular.copy(this.user);
            delete copy.password;
            return angular.equals({ timezone: 'AL' }, copy);
        };
    });

    angular.element(document).ready(function () {
        setTimeout(function () {
            var rootEl = document.getElementById('content');
            angular.bootstrap(rootEl, ['app']);
        }, 1000);
    });
}());
