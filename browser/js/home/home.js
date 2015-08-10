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
	$scope.isPlaying = false;
	$scope.bpm = 120;

	$scope.record = function() {
		$scope.isRecording = true;
	};

	$scope.stop = function() {
		$scope.isRecording = false;
		$scope.isPlaying = false;
		Tone.Transport.stop();
	};

	$scope.play = function() {
		$scope.isPlaying = true;
		Tone.Transport.start();
	};

	// window.addEventListener("keydown", function(e){
	// 	if (e.keyCode === 70) $scope.nextMode();
	// 	if (e.keyCode === 68) $scope.lastMode();
	// });

	Tone.Transport.loop = true;
});
