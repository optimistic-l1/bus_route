"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
let path = require('path');
/**
 * @api {GET} / / 返回后台页面
 * @apiDescription  返回后台页面
 * @apiName return index.html
 * @apiGroup Index
 * @apiVersion 1.0.0
*/
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../dist') + '/index.html');
});
module.exports = router;
