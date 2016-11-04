var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET tests listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增加test
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});

router.get('/deleteUsesr', function(req, res, next) {
	userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});

module.exports = router;