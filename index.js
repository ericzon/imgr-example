/**
	Author: @EricLaraAmat
	Description: Example of this great lib using maxsize feature.
*/

var express = require('express');
var app = express();
var path = require('path');

/************************** IMGR ***************************/    
var imgPath = path.join(__dirname, 'assets','images');
console.log('Images path: '+imgPath);

var IMGR = require('imgr').IMGR;
var imgrDebug = true;
var imgrOptions = {
	image_magick: true
	//try_cache: false
};
    if(imgrDebug){
        imgrOptions = {
            debug: true,
            trace: function (event) {
                console.log("IMGR tracer event: ",event);
            }
        };
    }
var imgr = new IMGR(imgrOptions);

imgr.serve(imgPath)
    .namespace('/data/images')
    .cacheDir(path.join(__dirname,'assets','images','.cache'))
    .urlRewrite('/:path/:size/:file.:ext')
    //.whitelist([ '1005x750', '1000x1050' ])
    .maxsize('500x')// 500x600, 500x, x600
    .using(app);

/*****************************************************/    

app.use("/public", express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);

});
