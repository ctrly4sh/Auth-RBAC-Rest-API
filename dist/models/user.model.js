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
exports.deleteUser = exports.updateUserById = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (email_1, password_1, ...args_1) => __awaiter(void 0, [email_1, password_1, ...args_1], void 0, function* (email, password, role = client_1.Role.USER) {
    return yield prisma.user.create({
        data: { email, password, role }
    });
});
exports.createUser = createUser;
const getUsers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ offset, limitNumber }) {
    return (yield prisma.user.findMany({
        skip: offset,
        take: limitNumber
    }));
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({ where: { id } });
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({ where: { email } });
});
exports.getUserByEmail = getUserByEmail;
const updateUserById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({ where: { id }, data });
});
exports.updateUserById = updateUserById;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({ where: { id } });
});
exports.deleteUser = deleteUser;
