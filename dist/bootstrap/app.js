"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import helmet from 'helmet'; 
const models_1 = __importDefault(require("../app/models"));
const exceptions_1 = __importDefault(require("../app/exceptions"));
const routes_1 = __importDefault(require("../routes"));
class App {
    constructor() {
        this.app = express_1.default();
        this.setup();
        this.database();
        this.authentication();
        this.routers();
    }
    setup() {
        // this.app.use(helmet());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default());
    }
    async database() {
        await models_1.default.sequelize.sync({ logging: false });
    }
    routers() {
        this.app.use("/api/v1", routes_1.default);
        this.app.use(exceptions_1.default);
    }
    authentication() { }
}
exports.default = new App().app;
