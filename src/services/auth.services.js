"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWT_SECRET = process.env.JWT_SECRET;
var ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
var REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
console.log("Access token expiry : ", ACCESS_TOKEN_EXPIRY);
console.log("Refresh token expiry : ", REFRESH_TOKEN_EXPIRY);
// const options: SignOptions = {
//     expiresIn: ACCESS_TOKEN_EXPIRY as str,
//     algorithm: "HS256"
// }
// export const generateToken = (userId: string, role: string) => {
//     return jwt.sign({userId, role}, JWT_SECRET, options)
// }
