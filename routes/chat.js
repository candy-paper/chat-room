var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    res.render('chat', { title: '聊天室' });
});
module.exports = router;

