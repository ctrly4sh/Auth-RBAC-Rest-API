"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const httpStatusCodes_1 = __importDefault(require("./httpStatusCodes"));
const statusMessages_1 = __importDefault(require("./statusMessages"));
const successResponse = (res, message = statusMessages_1.default.SUCCESS, data = null, statusCode = httpStatusCodes_1.default.OK) => {
    return res.status(statusCode).json({
        message,
        data,
        statusCode
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message = statusMessages_1.default.SERVER_ERROR, statusCode = httpStatusCodes_1.default.INTERNAL_SERVER_ERROR, error = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error
    });
};
exports.errorResponse = errorResponse;
