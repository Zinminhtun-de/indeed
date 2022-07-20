"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NeedController_1 = require("../controllers/NeedController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route("/")
    .get(NeedController_1.findNeeds)
    .post([
    (0, express_validator_1.body)("header").notEmpty().withMessage("Header must not be empty!"),
    (0, express_validator_1.body)("body").notEmpty().withMessage("Body must not be empty!"),
    (0, express_validator_1.body)("tags").isArray(),
], NeedController_1.createNeed);
exports.default = router;
//# sourceMappingURL=need_route.js.map