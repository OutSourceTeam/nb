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

router.get('/productList', function(req, res) {
    res.render('modules/pages/productList/index');
});

router.get('/contactus', function(req, res) {
    res.render('modules/pages/contactus/index');
});

router.get('/mobile/home', function(req, res) {
    res.render('modules/pages/m_home/index');
});
module.exports = router;
