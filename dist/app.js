"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const need_route_1 = __importDefault(require("./routes/need_route"));
const error_1 = __importDefault(require("./middlewares/error"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({ message: "Hello World!" });
});
mongoose_1.default.connect(process.env.DATABASE || "").then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use("/api/v1/needs", need_route_1.default);
    app.use(error_1.default);
});
//# sourceMappingURL=app.js.map