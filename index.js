var express = require('express');

var app = express();
var router = express.Router();

var path = __dirname + '/views/';
app.use('/',router);

router.get('/', function (req, res) {
	res.sendFile(path + 'index.html');
});
router.get('/viewModels/index.js', function (req, res) {
	res.sendFile(__dirname + '/viewModels/index.js');
});

router.get('/product', function (req, res) {
	res.sendFile(path + 'product.html');
});
router.get('/about', function (req, res) {
	res.sendFile(path + 'about.html');
});
router.use('*', function (req, res) {
	res.send('Error 404: Not Found!');
});
app.listen(3000, function() {
	console.log('App listening on port 3000!')
}); 