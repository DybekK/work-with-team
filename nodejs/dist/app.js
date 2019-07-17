"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const crmRoutes_1 = require("./routes/crmRoutes");
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor() {
        this.routePriv = new crmRoutes_1.Routes();
        this.URL = 'mongodb://127.0.0.1:27017/nodets';
        this.app = express_1.default();
        this.config();
        this.routePriv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose_1.default.connect(this.URL, { useNewUrlParser: true })
            .catch(err => console.log(err));
        mongoose_1.default.connection.on('error', err => console.log(err));
    }
}
exports.default = new App().app;
