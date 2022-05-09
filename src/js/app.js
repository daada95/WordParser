"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.bodyParser = exports.cors = exports.express = exports.dotenv = void 0;
exports.dotenv = require('dotenv/config');
exports.express = require('express');
exports.cors = require('cors');
exports.bodyParser = require('body-parser');
const router_1 = require("./router");
class App {
    constructor() {
        this.express = (0, exports.express)();
        this.loadRoutes();
    }
    loadRoutes() {
        this.express.use('/', router_1.router);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map