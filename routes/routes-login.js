var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Express' });
});

router.post('/doLogin', function(req, res) {
    res.cookie('name',  req.param('username'));
    console.log(req.param('username'));
    console.log(req.param('password'));
    res.render('chat', { title: '聊天室' });


});


module.exports = router;
