"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUser = void 0;
const express = require("express");
const appError_1 = require("../../exceptions/appError");
const adminUser_1 = require("../../entity/adminUser");
const adminRole_1 = require("../../entity/adminRole");
const jwt = require("jsonwebtoken");
const appDataSource_1 = require("../../../appDataSource");
let router = express.Router();
let svgCaptcha = require('svg-captcha');
/**
 * 验证码
*/
router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create({
        size: 4,
        width: 100,
        height: 50,
        noise: 2,
        fontSize: 35,
        ignoreChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxz',
        color: false // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有           
    });
    req.session.captcha = captcha.text;
    req.session.a = "aaa";
    res.type('svg');
    res.json({ captcha: captcha.data });
});
/**
 * 登录
*/
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, password, captcha } = req.body;
    if (!user || !password) {
        throw new appError_1.AppError('用户名密码不能为空！');
    }
    if (captcha !== req.session.captcha) {
        throw new appError_1.AppError('验证码错误！');
    }
    const userInfo = yield adminUser_1.AdminUser.findOneBy({ user, password });
    if (!userInfo) {
        throw new appError_1.AppError('用户名或密码错误！');
    }
    const token = 'Bearer ' + jwt.sign(Object.assign({}, userInfo), 'secret', { expiresIn: 3600 * 24 * 3 });
    res.json({ token });
}));
/**
 * 获取用户信息
*/
router.get('/userInfo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取权限
    const rolesData = yield appDataSource_1.appDataSource
        .getRepository(adminUser_1.AdminUser)
        .createQueryBuilder("u")
        .leftJoinAndSelect(adminRole_1.AdminRole, "role", 'find_in_set(role.id, u.role_ids)')
        .where('u.id = :uid', { uid: req.auth.id })
        .select('role.permissions')
        .getRawMany();
    const roles = rolesData.map(item => item.role_permissions).join(',');
    res.json(Object.assign(Object.assign({}, req.auth), { roles }));
}));
/**
 * 获取所有用户
*/
router.get('/list', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield appDataSource_1.appDataSource
        .getRepository(adminUser_1.AdminUser)
        .createQueryBuilder("u")
        .leftJoinAndSelect(adminRole_1.AdminRole, "role", 'find_in_set(role.id, u.role_ids)')
        .select('u.*,group_concat(role.name) as roles')
        .groupBy('u.id')
        .getRawMany();
    res.json({ list: userData });
}));
/**
 * 添加用户
 */
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new adminUser_1.AdminUser();
    user.user = req.body.user;
    user.password = req.body.password;
    user.role_ids = req.body.role_ids;
    let result = yield user.save();
    if (!result || !result.id)
        throw new appError_1.AppError('插入失败');
    res.json({ message: "插入成功！" });
}));
/**
 * 修改用户
 */
router.post('/update', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield adminUser_1.AdminUser.findOneBy({ id: req.body.id });
    if (!user)
        throw new appError_1.AppError('用户不存在');
    user.user = req.body.name;
    if (req.body.password)
        user.password = req.body.password;
    user.role_ids = req.body.role_ids;
    let result = yield user.save();
    if (!result || !result.id)
        throw new appError_1.AppError('修改失败');
    res.json({ message: "修改成功！" });
}));
/**
 * 删除用户
 */
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resulte = yield adminUser_1.AdminUser.delete({ id: req.body.id });
    if (!resulte || !resulte.affected)
        throw new appError_1.AppError('删除失败');
    res.json({ message: "删除成功！" });
}));
exports.adminUser = router;
