app.factory("gamelanFactory", function(){
 	var source;

	return {
	 	load: function(key, instrument) {
			var request = new XMLHttpRequest();
			request.open("GET", "api/audio/" + key + "_" + instrument + ".WAV", true);
			request.responseType = "arraybuffer";

			var process = function(data) {
				var context = new (window.AudioContext || window.webkitAudioContext)();
				context.decodeAudioData(data, function(buffer){
				    source = context.createBufferSource(); // Create Sound Source
				    source.buffer = buffer;
				    source.connect(context.destination);
				    source.start(context.currentTime);
			  	});
			}

			request.onload = function() {
			    var data = request.response;
			    process(data);
			};

		    request.send();
		},

		end: function() {
			source.disconnect(context.destination);
		}
	}
});