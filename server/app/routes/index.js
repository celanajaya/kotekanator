'use strict';
var router = require('express').Router();
module.exports = router;

router.use(function(req, res) {
	res.status(200).send();
});

router.get('/audio', function(req, res){
    res.set({'Content-Type': 'audio/WAV'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
});


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
