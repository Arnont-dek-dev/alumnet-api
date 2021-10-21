var express = require('express');
var router = express.Router();
const db = require('./queires');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/student',db.getStudents);

module.exports = router;
