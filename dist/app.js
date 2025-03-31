"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use('/user', user_routes_1.default);
app.use((req, res) => {
    res.status(404).send({ message: `Internal Server error ${req.originalUrl} - not found` });
});
app.use((error, req, res, next) => {
    console.error(`${error.stack}`);
    res.status(500).send({ message: "Internal server error" });
});
exports.default = app;
