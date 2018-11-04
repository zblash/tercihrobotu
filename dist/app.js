"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./routes/crmRoutes");
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        // public mongoUrl: string = 'mongodb://localhost/CRMdb';  
        this.mongoUrl = 'mongodb://dalenguyen:123123@localhost:27017/CRMdb';
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        // this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map