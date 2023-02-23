"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("./appError");
class ErrorHandler {
    handleError(err, res) {
        if (err.name === 'UnauthorizedError') {
            res.status(200).json({
                code: 401,
                message: 'invalid token',
            });
        }
        else if (err instanceof appError_1.AppError && res) {
            res.status(200).json({
                code: 400,
                message: err.message,
            });
        }
        else {
            // log ...
            console.log(err);
            res.status(500).json({
                message: '服务器处理异常',
            });
        }
    }
}
exports.errorHandler = new ErrorHandler();
