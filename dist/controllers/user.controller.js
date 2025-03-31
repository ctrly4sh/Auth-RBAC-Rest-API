"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserById = exports.getUserById = exports.getUsers = exports.createUser = exports.getHealth = void 0;
const userModel = __importStar(require("../models/user.model"));
const httpStatusCodes_1 = __importDefault(require("../utils/httpStatusCodes"));
const statusMessages_1 = __importDefault(require("../utils/statusMessages"));
const responseHandler_1 = require("../utils/responseHandler");
const getHealth = (req, res) => {
    try {
        (0, responseHandler_1.successResponse)(res, statusMessages_1.default.SUCCESS, "Server Health is okay", httpStatusCodes_1.default.OK);
    }
    catch (error) {
        (0, responseHandler_1.errorResponse)(res, "Server Health is bad :(", httpStatusCodes_1.default.INTERNAL_SERVER_ERROR, error);
    }
};
exports.getHealth = getHealth;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield userModel.getUserByEmail(email);
        if (user) {
            (0, responseHandler_1.errorResponse)(res, statusMessages_1.default.CONFLICT, httpStatusCodes_1.default.CONFLICT, "User already exists !!");
            return;
        }
        user = yield userModel.createUser(email, password);
        (0, responseHandler_1.successResponse)(res, statusMessages_1.default.CREATED, user, httpStatusCodes_1.default.CREATED);
    }
    catch (error) {
        (0, responseHandler_1.errorResponse)(res, statusMessages_1.default.SERVER_ERROR, httpStatusCodes_1.default.INTERNAL_SERVER_ERROR, error);
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page = "1", limit = "10" } = req.query;
        const pageNumber = Math.max(1, parseInt(page, 10) || 1);
        const limitNumber = Math.max(1, parseInt(limit, 10) || 1);
        const offset = (pageNumber - 1) * limitNumber;
        const users = yield userModel.getUsers({ offset, limitNumber });
        res.status(201).send({ message: "User fetched successfully", data: users });
    }
    catch (error) {
        res.status(401).send({ message: "Error fetching users" });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield userModel.getUserById(id);
        res.status(201).send({ message: "User fetched successfully", data: user });
    }
    catch (error) {
        res.status(401).send({ message: "Error getting user" });
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const userBeforeUpdate = yield userModel.getUserById(id);
        const updatedUser = yield userModel.updateUserById(id, data);
        res.status(201).send({ message: "User updated successfully", userBeforeUpdate: userBeforeUpdate, updatedUser: updatedUser });
    }
    catch (error) {
        console.log("Error in updating user", error);
    }
});
exports.updateUserById = updateUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userToDelete = yield userModel.getUserById(id);
        const deletedUser = yield userModel.deleteUser(id);
        res.status(201).send({ message: "User deletes successfully", userDeleted: userToDelete, data: deletedUser });
    }
    catch (error) {
        console.error("Error deleting user", error.message);
    }
});
exports.deleteUser = deleteUser;
