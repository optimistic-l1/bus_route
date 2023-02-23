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
exports.adminRole = void 0;
const express = require("express");
const appError_1 = require("../../exceptions/appError");
const adminRole_1 = require("../../entity/adminRole");
let router = express.Router();
/**
 * 获取所有角色
*/
router.get('/list', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let rolesData = yield adminRole_1.AdminRole.find();
    rolesData = rolesData.map(item => {
        item.routes = item.permissions.split(',');
        delete item.permissions;
        return item;
    });
    res.json({ list: rolesData });
}));
/**
 * 添加角色
 */
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let role = new adminRole_1.AdminRole();
    role.name = req.body.name;
    role.remark = req.body.remark;
    role.permissions = req.body.routes;
    let result = yield role.save();
    if (!result || !result.id)
        throw new appError_1.AppError('插入失败');
    res.json({ message: "插入成功！" });
}));
/**
 * 修改角色
 */
router.post('/update', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let role = yield adminRole_1.AdminRole.findOneBy({ id: req.body.id });
    if (!role)
        throw new appError_1.AppError('角色不存在');
    role.name = req.body.name;
    role.permissions = req.body.routes;
    role.remark = req.body.remark;
    let result = yield role.save();
    if (!result || !result.id)
        throw new appError_1.AppError('修改失败');
    res.json({ message: "修改成功！" });
}));
/**
 * 删除角色
 */
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resulte = yield adminRole_1.AdminRole.delete({ id: req.body.id });
    if (!resulte || !resulte.affected)
        throw new appError_1.AppError('删除失败');
    res.json({ message: "删除成功！" });
}));
exports.adminRole = router;
