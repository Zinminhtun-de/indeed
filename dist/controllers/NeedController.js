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
exports.createNeed = exports.findNeeds = void 0;
const express_validator_1 = require("express-validator");
const Need_1 = __importDefault(require("../models/Need"));
const User_1 = __importDefault(require("../models/User"));
const findNeeds = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const needs = yield Need_1.default.find();
        res.json({ data: needs, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findNeeds = findNeeds;
const createNeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const needDto = {
            body: req.body.body,
            header: req.body.header,
            tags: req.body.tags,
            user: req.userId,
        };
        const need = new Need_1.default(needDto);
        const result = yield need.save();
        const user = yield User_1.default.findById(req.userId);
        user === null || user === void 0 ? void 0 : user.needs.push(need);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    }
    catch (err) {
        // if (!err.statusCode) {
        //   err.statusCode = 500;
        // }
        next(err);
    }
});
exports.createNeed = createNeed;
//# sourceMappingURL=NeedController.js.map