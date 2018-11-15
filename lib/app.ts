import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import { Routes } from "./routes/crmRoutes";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string =
    "mongodb://zblash:fb19077774@ds151533.mlab.com:51533/tercihrobotu";

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    var whitelist = ["https://www.faktoryel.com","https://tercihrobotu.online"];
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
