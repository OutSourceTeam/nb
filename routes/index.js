var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/home', function(req, res) {
    res.render('modules/pages/home/index');
});

module.exports = router;
