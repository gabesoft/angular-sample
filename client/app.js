(function () {
    var app = angular.module('app', []);

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
        var rootEl = document.getElementById('content');
        angular.bootstrap(rootEl, ['app']);
    });
}());
