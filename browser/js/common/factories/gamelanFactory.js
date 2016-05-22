app.factory("gamelanFactory", function(){
 	var source;

	return {
	 	loadSound: function(key, instrument) {
		  var request = new XMLHttpRequest();
		  request.open("GET", "http://localhost:1337/audio/" + key + "_" + instrument + ".WAV", true);
		  request.responseType = "arraybuffer";

		  request.onload = function() {
		      var data = request.response;
		      process(data);
		  };

		  request.send();
		},

		process: function(data) {
			context.decodeAudioData(data, function(buffer){
		    source = context.createBufferSource(); // Create Sound Source
		    source.buffer = buffer;
		    source.connect(context.destination);
		    source.start(context.currentTime);
		  });
		},

		end: function() {
			source.disconnect(context.destination);
		}
	}
});