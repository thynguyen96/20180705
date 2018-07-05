angular.module('myApp').controller('DashboardController', function ($location, $scope, $mdDialog, $interval, $http) {
   console.log('DashboardController');
    $scope.message = "This is a dashboard page!"
    // Dialog form
    $scope.theme = 'red';

    var isThemeRed = true;

    $interval(function () {
        $scope.theme = isThemeRed ? 'blue' : 'red';

        isThemeRed = !isThemeRed;
    }, 2000);

    $scope.logout = function(){
        console.log('logout');
        localStorage.removeItem('loginUser');//no có hiểu cái này không vậy
        // $scope.go('login');
        $location.path('login');
    }

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'pages/dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    $scope.results = [
        {
            "id": 1,
            "screen": "Lorem Lipsum",
            "keyboard": "Lorem Lipsum",
            "mouse": "Lorem Lipsum",
            "CPU": "Lorem Lipsum",
            "remove": false,
            "editable": false
        },
        {
            "id": 2,
            "screen": "Lorem Lipsum",
            "keyboard": "Lorem Lipsum",
            "mouse": "Lorem Lipsum",
            "CPU": "Lorem Lipsum",
            "remove": false,
            "editable": false
        }
    ];
    $scope.addItem = function () {
        $scope.results.push({
            screen: $scope.screen,
            keyboard: $scope.keyboard,
            mouse: $scope.mouse,
            CPU: $scope.CPU,
            remove: false,
            editable: false
        });

        $scope.screen = '';
        $scope.keyboard = '';
        $scope.mouse = '';
        $scope.CPU = '';
        console.log("lorem");

    }

   

    $scope.removeItem = function (index) {
        if (index > -1)
            $scope.results.splice(index, 1);
    };
    $scope.entity = {}

    $scope.editItem = function (index) {
        $scope.entity = $scope.results[index];
        $scope.entity.index = index;
        $scope.entity.editable = true;
    }
    $scope.saveItem = function (index) {
        $scope.results[index].editable = false;

    }

    $scope.add = function () {
        $scope.results.push({
            screen: $scope.screen,
            keyboard: $scope.keyboard,
            mouse: $scope.mouse,
            CPU: $scope.CPU,
            remove: false,
            editable: true
        })
    }


    
     


    //   $http.get('http://localhost:3000/results').then(function(response) {
    //     $scope.results = response.data;
    //     console.log( $scope.results);
    // });
    // $scope.addItem = function () {
    //     $scope.results.push({ screen: $scope.screen, keyboard: $scope.keyboard,mouse: $scope.mouse,CPU: $scope.CPU, remove: false });
    //     $scope.screen = '';
    //     $scope.keyboard = '';
    //     $scope.mouse = '';
    //     $scope.CPU = '';
    // }
    $scope.selected = [];

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    function success(results) {
        $scope.results = results;
    }

    $scope.getDesserts = function () {
        $scope.promise = $nutrition.results.get($scope.query, success).$promise;
    };


  $scope.sendData = function(index){
    $scope.results[index].editable = false;
      return $http.post('http://localhost:3000/results', { 
        screen: $scope.screen,
        keyboard: $scope.keyboard,
        mouse: $scope.mouse,
        CPU: $scope.CPU
       
       }).then(function(success){
          return 0;
      })
     
  }

 
});