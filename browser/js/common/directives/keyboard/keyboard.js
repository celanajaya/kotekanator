app.directive('keyboard', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/keyboard/keyboard.html',
        controller: 'KYBDCTRL'
    };
});

app.controller("KYBDCTRL", function($scope, synthFactory, logicFactory, gamelanFactory){
	$scope._ = _;
	$scope.isOn = true;
	$scope.numKeys = 15;
	$scope.octaves = ['1','2','3','4','5','6'];
	$scope.octave = '3';
	$scope.tone = "sine";
	$scope.duration = "4n";
	$scope.durationDict = { "1n": "Whole Note",
							"2n" :"Half Note",
							"4n": "Quarter Note",
							"8n" : "Eighth Note",
							"16n" : "Sixteenth Note"};
	$scope.instrumentType = "ugal";
	$scope.key = "key";
	$scope.oscTypes = synthFactory.oscTypes;
	$scope.instrumentTypes = synthFactory.instrumentTypes;
	$scope.width = 100 / $scope.numKeys;
	$scope.currentKey = 0;
	$scope.behaviors = ["none","norot", "telu", "empat", "nyogCag", "bass", "gong"];
	$scope.behavior = 'none';

	$scope.toggleOn = function() {
		$scope.isOn = !$scope.isOn;
	};

	$scope.isCurrentKey = function(num) {
		return num === $scope.currentKey;
	};

	$scope.getlooplength = function(beats) {
		var bars = Math.floor(beats/4);
		beats %= 4;
		return "" + bars + ":" + "" + beats + ":0";
	};

	$scope.synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster();

	//synthFactor.params order: octave, range, oscillator, duration
	$scope.changeInstrument = function(selectedInstrument) {
		_.forOwn(synthFactory.instrumentSettings, function(setting, instrument){
			if (instrument === selectedInstrument) {
				$scope.octave = setting[0];
				$scope.numKeys = parseInt(setting[1]); 
				$scope.tone = setting[2];
				$scope.duration = setting[3];
				$scope.key = setting[4];
				$scope.behavior = setting[5];
			}
		});
		$scope.$digest();
	};

	//converting the $scope.skeleton into an array of arrays with each pair of notes, then ready for logic functions
	$scope.parsedSkel = function() {
		var forLogic = $scope.skeleton.map(function(note, index){
			if ($scope.skeleton[index + 1]) return [note, $scope.skeleton[index + 1]];
			else return [note, note];
		});
		return forLogic;
	};

	//take an array of skeleton tones and returns a flattened array of the elaboration based on the behavior
	$scope.getElaborations = function(parsedSkelArrs) {
		if (Array.isArray(parsedSkelArrs)) {
			var ed = parsedSkelArrs.map(function(arr){
				if ($scope.instrumentType === "gong") return logicFactory.gong(arr);
				if ($scope.instrumentType === "bass") return logicFactory.bass(arr);
				if ($scope.behavior === "norot") return logicFactory.norot(arr);
				if (arr[0] === arr[1]) return logicFactory[$scope.behavior].move(arr);
				else return logicFactory[$scope.behavior].stay(arr);
			});
			return _.flatten(ed);
		}
	};

	//main player function, takes a key number, determines the right octave and converts to a 
	//musical letter name based on the assigned tuning
	$scope.play = function(key) {
		Tone.Transport.bpm.value = parseInt($scope.bpm);
		$scope.currentKey = key;
		$scope.$digest();
		if (key && $scope.isOn) {
			var oct = parseInt($scope.octave);
			oct = key < 7 ? oct : (oct + 1);

			//convert current notes to musical letters, plays in parallel fourths for extra POWER
			if (synthFactory[$scope.tuning][key]) {
				var keyArr = [];
				keyArr[0] = synthFactory[$scope.tuning][key] + oct;

				$scope.synth.set(
					{"oscillator": {"type": $scope.tone}}
				);

				$scope.synth.triggerAttackRelease(keyArr, $scope.duration);
			}
		}
	};

	//sets the transport loop to play the notes in sequence
	$scope.setSequence = function () {
		var beats = $scope.skeleton.length;
		Tone.Transport.loopEnd = $scope.getlooplength(beats);
		Tone.Transport.loop = true;

		//set interval to loop over every note and play correct sounds
		//pArr takes the current transport position and arrIndex converts that into the 
		//corresponding element in the elaboration 
		Tone.Transport.scheduleRepeat(function () {
			var time = Tone.Transport.position.split(':');
			var bar = parseInt(time[0] * 16);
			var beat = parseInt(time[1] * 4);
			var sixteenth = parseInt(time[2]);
			var arrIndex = (bar + beat + sixteenth);
			$scope.play($scope.elaboration[arrIndex]);
		}, $scope.duration);

		return $scope.synth;
	};

	$scope.audioTest = function() {
		gamelanFactory.load("01", "jublag");
	};

	//event listeners:
	window.addEventListener("keydown", function(e){
		var letterCode = e.keyCode.toString();
		var keyNum = synthFactory.keyToId[letterCode];
		if ($scope.isRecording && $scope.isOn && keyNum) {
			$scope.skeleton.shift(keyNum);
			if ($scope.behavior === "none") $scope.elaboration = logicFactory.padded($scope.skeleton);
			else $scope.elaboration = $scope.getElaborations($scope.parsedSkel());
			$scope.setSequence();
		}
		$scope.play(keyNum);
		$scope.$digest();
	});

	window.addEventListener('keyup', function(){
		$scope.current = [];
		$scope.$digest();
	});

	window.addEventListener("mousedown", function(e){
		if ($scope.isOn) {
			var keyNum = parseInt(e.srcElement.id);
			$scope.play(keyNum);
			$scope.$digest();
		}
	});

	window.addEventListener("mouseup", function(e){
		$scope.current = [];
		$scope.$digest();
	});
});

