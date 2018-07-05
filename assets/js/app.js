var app = angular.module('myApp', ['ngMaterial', 'ui.router', 'md.data.table']);

app.run(function ($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            console.log('Changed state to: ' + toState);
            console.log($location.path().localeCompare('/login')!=0);
            console.log(!LoginService.isAuthenticated());
            //3 dong consle, moiws co 2, 3 ma
            if ( $location.path().localeCompare('/login')!=0 &&
             !LoginService.isAuthenticated()) {
                console.log('chưa đăng nhập!');
                $location.path('login');
                // $state.go('login');
            }
        });
//cho nay kiểm tra không cho vào dashboard á
    
});


app.config(function ($stateProvider, $urlRouterProvider, $qProvider, $locationProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');


    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html',
            controller: 'LoginController'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('dashboard', {
            // we'll get to this in a bit   
            url: '/dashboard',
            templateUrl: 'pages/dashboard.html',
            controller: 'DashboardController'
        });

});

app.controller('myCtrl', function ($scope, $location, $http) {
    $scope.isActive = function (path) {
        return $location.path() === path;
    };



});


app.factory('LoginService', function () {
    var admin = 'admin';
    var pass = 'pass';

    return {
        login: function (username, password) {
           // có hàm localeCompảe
            // console.log('login' + isAuthenticated);
            localStorage.setItem('loginUser', username === admin && password === pass);
            return  localStorage.getItem('loginUser') ||  false;
        },
        isAuthenticated: function () {
            return localStorage.getItem('loginUser') ||  false;
        }
    };

});
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('red')
        .primaryPalette('red');

    $mdThemingProvider.theme('blue')
        .primaryPalette('blue');

})


