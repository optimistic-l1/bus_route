"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const errorHandler_1 = require("./src/exceptions/errorHandler");
require("express-async-errors"); //捕获异步中的异常
const express_jwt_1 = require("express-jwt");
// 创建并设置express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 跨域
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Referer') ? req.get('Referer').slice(0, -1) : '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , X-Token');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);
// session
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 * 72, // 设置 session 的有效时间，单位毫秒
    },
}));
// 配置静态资源
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/static', express.static(path.join(__dirname, 'static')));
// jwt
app.use((0, express_jwt_1.expressjwt)({
    secret: 'secret',
    algorithms: ["HS256"]
}).unless({
    path: ['/adminUser/captcha', '/adminUser/login']
}));
// 路由
const user_1 = require("./src/routes/admin/user");
const role_1 = require("./src/routes/admin/role");
app.use('/adminUser', user_1.adminUser);
app.use('/adminRole', role_1.adminRole);
// 统一处理异常
app.use(function (err, req, res, next) {
    errorHandler_1.errorHandler.handleError(err, res);
});
// 启动 express server
app.listen(3000);
