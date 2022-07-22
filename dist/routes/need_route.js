"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../middlewares/is_auth"));
const NeedController_1 = require("../controllers/NeedController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route("/")
    .get(is_auth_1.default, NeedController_1.findNeeds)
    .post(is_auth_1.default, [
    (0, express_validator_1.body)("header").notEmpty().withMessage("Header must not be empty!"),
    (0, express_validator_1.body)("body").notEmpty().withMessage("Body must not be empty!"),
    (0, express_validator_1.body)("tags").isArray(),
], NeedController_1.createNeed);
router
    .route("/:id")
    .get(is_auth_1.default, NeedController_1.findNeed)
    .put(is_auth_1.default, [
    (0, express_validator_1.body)("header").notEmpty().withMessage("Header must not be empty!"),
    (0, express_validator_1.body)("body").notEmpty().withMessage("Body must not be empty!"),
    (0, express_validator_1.body)("tags").isArray(),
    (0, express_validator_1.body)("status").isBoolean(),
], NeedController_1.updateNeed)
    .delete(is_auth_1.default, NeedController_1.removeNeed);
exports.default = router;
//# sourceMappingURL=need_route.js.map