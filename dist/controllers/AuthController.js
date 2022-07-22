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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
// import { deleteFile } from "../utils";
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log("isError");
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 12);
        const userDto = {
            email: req.body.email,
            password: hashedPassword,
        };
        const user = new User_1.default(userDto);
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET || "secret", {
            expiresIn: "1d",
        });
        res.json({ message: "User created successfully", token, status: 1 });
    }
    catch (err) {
        // if (!err.statusCode) {
        //   err.statusCode = 500;
        // }
        next(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            const error = new Error("User with this email does not exist!");
            error.statusCode = 404;
            throw error;
        }
        const isEqual = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!isEqual) {
            const error = new Error("Password is incorrect!");
            error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET || "secret", {
            expiresIn: "1d",
        });
        res.json({
            id: user._id,
            username: user.username,
            token,
            message: "Login successful!",
            profileImage: user.profileImage,
            status: 1,
        });
    }
    catch (err) {
        // if (!err.statusCode) {
        //   err.statusCode = 500;
        // }
        next(err);
    }
});
exports.login = login;
const editProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        let profileImage = req.body.profileImage;
        if (req.file) {
            profileImage = req.file.path.replace("\\", "/");
        }
        if (!profileImage) {
            const error = new Error("No file picked.");
            error.statusCode = 422;
            throw error;
        }
        const user = yield User_1.default.findById(req.userId);
        if (!user) {
            const error = new Error("User not found!");
            error.statusCode = 404;
            throw error;
        }
        if (user.profileImage && user.profileImage != profileImage) {
            (0, utils_1.deleteFile)(user.profileImage);
        }
        user.profileImage = profileImage;
        user.username = req.body.username;
        const result = yield user.save();
        res.json({
            message: "Profile updated successfully!",
            data: result,
            status: 1,
        });
    }
    catch (err) {
        // if (!err.statusCode) {
        //   err.statusCode = 500;
        // }
        next(err);
    }
});
exports.editProfile = editProfile;
//# sourceMappingURL=AuthController.js.map