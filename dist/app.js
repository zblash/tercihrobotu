"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const crmRoutes_1 = require("./routes/crmRoutes");
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        this.mongoUrl = "mongodb://zblash:fb19077774@ds151533.mlab.com:51533/tercihrobotu";
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        var whitelist = ["https://www.faktoryel.com", "http://tercihrobotu.online"];
        var corsOptions = {
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback("Yetkisiz İşlem");
                }
            }
        };
        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static("public"));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map