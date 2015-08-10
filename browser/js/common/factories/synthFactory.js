app.factory("synthFactory", function(){

	return {

		oscTypes: ["sine", "square", "sawtooth", "triangle", "pwm", "pulse"],

		tunings: ["major", "minor", "balinese", "tembung", "selesir", "sunaren", "slendro"],

		filtTypes: ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"],

		durations: ["1n", "2n", "3n", "4n", "6n", "8n", "12n", "16n"],

		instrumentTypes: ['gong', 'bass', 'main', 'reyong', 'keys', 'highkeys'],

		attackTypes: ['0', '0.25', '0.5', '0.75', '1'],

		params: {
			'gong':['1', 3, 'sine', '1n', 'gong'],
			'bass':['2', 8, "sine", "2n", 'key'],
			'main': ['3', 8, "sine", "4n", 'key'],
			'reyong':['3', 15, "triangle", "16n", 'gong'],
			'keys': ['3', 15, "pulse", "16n", 'key'],
			'highkeys': ['4', 7, "pulse", "16n", 'key']
		},

		keyToId: {
			90: 1,
			88: 2,
			67: 3,
			86: 4,
			66: 5,
			78: 6,
			77: 7,
			89: 8,
			85: 9,
			73: 10,
			79: 11,
			80: 12,
			219: 13,
			221: 14,
			220: 15
		},

		major: {
			1: "C",
			2: "D",
			3: "E",
			4: "F",
			5: "G",
			6: "A",
			7: "B",
			8: "C",
			9: "D",
			10: "E",
			11: "F",
			12: "G",
			13: "A",
			14: "B",
			15: "C"
		},

		minor: {
			1: "C",
			2: "D",
			3: "Eb",
			4: "F",
			5: "G",
			6: "Ab",
			7: "Bb",
			8: "C",
			9: "D",
			10: "Eb",
			11: "F",
			12: "G",
			13: "Ab",
			14: "Bb",
			15: "C"
		},

		balinese: {
			1: "C#",
			2: "D",
			3: "E",
			4: "F#",
			5: "G#",
			6: "A",
			7: "B",
			8: "C#",
			9: "D",
			10: "E",
			11: "F#",
			12: "G#",
			13: "A",
			14: "B",
			15: "C#"
		},

		tembung: {
			1: "C#",
			2: "D",
			3: "F#",
			4: "G#",
			5: "A",
			6: "C#",
			7: "D",
			8: "F#",
			9: "G#",
			10: "A",
			11: "C#"
		},

		selesir: {
			1: "C#",
			2: "D",
			3: "E",
			4: "G#",
			5: "A",
			6: "C#",
			7: "D",
			8: "E",
			9: "G#",
			10: "A",
			11: "C#"
		},

		sunaren: {
			1: "D",
			2: "E",
			3: "G#",
			4: "A",
			5: "B",
			6: "D",
			7: "E",
			8: "G#",
			9: "A",
			10: "B",
			11: "D"
		},

		slendro: {
			1: "C#",
			2: "E",
			3: "F#",
			4: "G#",
			5: "B",
			6: "C#",
			7: "E",
			8: "F#",
			9: "G#",
			10: "B",
			11: "C#"
		}

	};
});

