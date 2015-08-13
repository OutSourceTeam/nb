var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res) {
    res.render('modules/pages/home/index');
});

router.get('/home', function(req, res) {
    res.render('modules/pages/home/index');
});

router.get('/shopList', function(req, res) {
    res.render('modules/pages/shopList/index');
});
module.exports = router;
