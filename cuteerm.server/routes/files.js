var express = require('express');
var router = express.Router();
var { OFFICE_FILE_ROOT_PATH } = require('../constants');
var { addFiles } = require('../service/file-service');
const fs = require('fs');
const path = require('path');
var file_count=0;
var result=[];

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

