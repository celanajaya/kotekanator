app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "MAINCTRL"
    });
});

app.controller("MAINCTRL", function($scope, synthFactory, logicFactory){
	$scope._ = _;
	$scope.tuning = "minor";
	$scope.filter = "lowpass";
	$scope.tunings = synthFactory.tunings;
	$scope.filtTypes = synthFactory.filtTypes;
	$scope.isRecording = false;
	$scope.isNotPlaying = true;
	$scope.skeleton = [];

	$scope.record = function() {
		$scope.isRecording = true;
	};

	$scope.stop = function() {
		$scope.isRecording = false;
		$scope.isNotPlaying = true;
	};

	$scope.play = function() {
		$scope.isNotPlaying = false;
	};

	$scope.erase = function() {
		$scope.skeleton = [];
	};

	Tone.Transport.loop = true;
});
