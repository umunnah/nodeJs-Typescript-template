"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./bootstrap/app"));
const port = process.env.PORT || 3000;
(async () => {
    app_1.default.listen(port, () => {
        console.log(`app is listening on port ${port}`);
    });
    process.on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection at:", p, "reason:", reason);
    });
})();
