

angular.module('myApp').controller('LoginController', function ($location, $scope, $rootScope, $stateParams, $state, LoginService) {
    console.log('LoginController');
    $scope.message = "This is a login page!"
    $rootScope.title = "AngularJS Login Sample";
    // tự động lòad cái này khi chạy czô /login?
    if(LoginService.isAuthenticated()) {
        //  $scope.go('dasđúnghboard');
         $location.path('dashboard');
    }

    $scope.formSubmit = function () {
        console.log('LoginService:' + LoginService.login("admin", "pass"))
        if (LoginService.login($scope.username, $scope.password)) {
          // login
            localStorage.setItem('loginUser', {username: $scope.username , password: $scope.password}); // lưu cái gì thì tùy thy, lưu vầy hơi chuối 
            // logout 
           
            
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $state.transitionTo('dashboard');
        } else {
            $scope.error = "Incorrect username/password !";
        }
    };


   


})

