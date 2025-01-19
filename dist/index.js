"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
app_1.default.use((0, cors_1.default)({
    origin: "*"
}));
app_1.default.use(express_1.default.json());
app_1.default.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.default)().then(() => {
    app_1.default.use("/api/v1/users", user_routes_1.default);
    app_1.default.listen(PORT, () => {
        console.log(`Sever running on port::${PORT}`);
    });
}).catch(() => {
    console.log("Failed to conenct db");
});
