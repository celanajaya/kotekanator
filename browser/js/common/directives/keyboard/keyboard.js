app.directive('keyboard', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/keyboard/keyboard.html',
        controller: 'KYBDCTRL'
    };
});

app.controller("KYBDCTRL", function($scope, synthFactory, logicFactory){
	$scope._ = _;
	$scope.isOn = true;
	$scope.numKeys = 15;
	$scope.octaves = ['1','2','3','4','5','6'];
	$scope.octave = '3';
	$scope.tone = "sine";
	$scope.duration = "4n";
	$scope.instrumentType = "keys";
	$scope.attack = '0.25';
	$scope.attackTypes = synthFactory.attackTypes;
	$scope.key = "key";
	$scope.oscTypes = synthFactory.oscTypes;
	$scope.durations = synthFactory.durations;
	$scope.instrumentTypes = synthFactory.instrumentTypes;
	$scope.width = 100 / $scope.numKeys;
	$scope.current = 0;
	$scope.behaviors = ["none","norot", "telu", "empat", "nyogCag", "bass", "gong"];
	$scope.behavior = 'none';
	$scope.skeleton = [];
	$scope.elaboration = [];

	$scope.erase = function() {
		$scope.skeleton = [];
		$scope.elaboration = [];
	}

	$scope.toggleOn = function() {
		$scope.isOn = !$scope.isOn;
	};

	$scope.isCurrentKey = function(num) {
		return num === $scope.current;
	};

	$scope.getlooplength = function(beats) {
		var bars = Math.floor(beats/4);
		var beats = beats % 4;
		return "" + bars + ":" + "" + beats + ":0";
	};

	$scope.synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster();

	//synthFactor.params order: octave, range, oscillator, duration
	$scope.changeInstrument = function(inst) {
		_.forOwn(synthFactory.params, function(value, key){
			if (key === inst) {
				$scope.octave = value[0];
				$scope.numKeys = parseInt(value[1]); 
				$scope.tone = value[2];
				$scope.duration = value[3];
				$scope.key = value[4];
			}
			if (key === "gong") $scope.behavior = key;
			if (key === "bass") $scope.behavior = key;
		});
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
				if (arr[0] === arr[1]) return logicFactory[$scope.behavior]["move"](arr);
				else return logicFactory[$scope.behavior]["stay"](arr);
			});
			return _.flatten(ed);
		}
	};

	//main player function, takes a key number, determines the right octave and converts to a 
	//musical letter name based on the assigned tuning
	$scope.play = function(key) {
		this.current = key;
		if (key && $scope.isOn) {
			var oct = parseInt($scope.octave);
			oct = key < 7 ? oct : (oct + 1);

			//convert current notes to musical letters, plays in parallel fourths for extra POWER
			if (synthFactory[$scope.tuning][key]) {
				var keyArr = [];
				keyArr[0] = synthFactory[$scope.tuning][key] + oct;
				keyArr[1] = synthFactory[$scope.tuning][(key + 4) % $scope.numKeys] ? synthFactory[$scope.tuning][(key + 4) % $scope.numKeys] + oct : key;

				$scope.synth.set(
					{"oscillator": {"type": $scope.tone}},
					{"filter": {"type": $scope.filter}},
					{"envelope": {"attack": parseInt($scope.attack)}}
				);

				$scope.synth.triggerAttackRelease(keyArr, $scope.duration);
			}
		}
	};

	//sets the transport loop to play the notes in sequence...DOESN'T FUCKING WORK!
	$scope.setSequence = function () {
		var beats = $scope.skeleton.length;
		Tone.Transport.loopEnd = $scope.getlooplength(beats);
		Tone.Transport.loop = true;
		Tone.Transport.bpm.value = 120;

		//set interval to loop over every note and play correct sounds
		//pArr takes the current transport position and arrIndex converts that into the 
		//corresponding element in the elaboration 
		Tone.Transport.setInterval(function () {
			var time = Tone.Transport.position.split(':');
			console.log(time);
			var bar = parseInt(time[0] * 16);
			var beat = parseInt(time[1] * 4);
			var sixteenth = parseInt(time[2]);
			var arrIndex = (bar + beat + sixteenth);
			$scope.play($scope.elaboration[arrIndex]);
		}, $scope.duration);

		return $scope.synth;
	},

	//event listeners:
	window.addEventListener("keydown", function(e){
		var letterCode = e.keyCode.toString();
		var keyNum = synthFactory.keyToId[letterCode];
		if ($scope.isRecording && $scope.isOn && keyNum) {
			$scope.skeleton.push(keyNum);
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

