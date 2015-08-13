var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/productList', function(req, res) {
    res.render('modules/pages/productList/index');
});



module.exports = router;
