var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var moment = require('moment');


/* GET home page. */
router.get('/',function(req,res){
    res.render('register', { title: 'Express' });

});
router.post('/do', function (req, res) {
    var user = {
        name: req.param("name"),
        password: req.param("password"),
        respassword: req.param("respassword"),
        email: req.param("email") ,
        createtime:moment().format('YYYY-MM-DD HH:mm:ss')
    }
    User.register(user, function (err, results) {
        if (results && results.affectedRows > 0) {
            res.send("注册成功");
        } else {
            res.send("注册失败:" + err.message);
        }
    });


});


module.exports = router;
