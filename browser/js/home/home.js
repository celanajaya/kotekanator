app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "MAINCTRL"
    });

    $stateProvider.state('home.record', {
		url: '/record',
		templateUrl: 'js/home/record.html'
    });
});

app.controller("MAINCTRL", function($scope, synthFactory, logicFactory){
	$scope._ = _;
	$scope.tuning = "minor";
	$scope.filter = "lowpass";
	$scope.tunings = synthFactory.tunings;
	$scope.filtTypes = synthFactory.filtTypes;
	$scope.isRecording = false;
	$scope.pokok = logicFactory.pokok;

	$scope.record = function() {
		$scope.isRecording = true;
	};

	$scope.stop = function() {
		$scope.isRecording = false;
	}

	$scope.erase = function() {
		logicFactory.pokok = [];
	};

});
