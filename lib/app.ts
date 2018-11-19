import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import { Routes } from "./routes/crmRoutes";
import * as dotenv from "dotenv";
dotenv.config({path:__dirname+'/../.env'});
class App {
  
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = process.env.Mongodb;

  constructor() {
    
    console.log(`${__dirname}../.env`)
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    var whitelist = process.env.corsWhitelist.split(',');
    var corsOptions = {
      origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
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

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
