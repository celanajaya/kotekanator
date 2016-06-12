'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/', function (req, res){
    res.set({'Content-Type': 'audio/WAV'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
});
