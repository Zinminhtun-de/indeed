"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// middlewares
const error_1 = __importDefault(require("./middlewares/error"));
// routes
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const need_route_1 = __importDefault(require("./routes/need_route"));
const utils_1 = require("./utils");
const PORT = process.env.PORT || 3000;
const fileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "images");
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}_${file.originalname}`);
    },
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    res.json({ message: "Server is running." });
});
app.use(express_1.default.json());
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single("profileImage"));
app.use("/images", express_1.default.static(path_1.default.join(utils_1.rootDir, "images")));
mongoose_1.default.connect(process.env.DATABASE || "").then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use("/api/v1/auth", auth_route_1.default);
    app.use("/api/v1/needs", need_route_1.default);
    app.use(error_1.default);
});
// in Node
// require('crypto').randomBytes(64).toString('hex')
//# sourceMappingURL=app.js.map