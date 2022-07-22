"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, _res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated!");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET || "secret");
    }
    catch (err) {
        // err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated!");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
//# sourceMappingURL=is_auth.js.map