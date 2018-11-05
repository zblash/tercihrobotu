"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.route('/universities')
            .get((req, res, next) => {
            next();
        }, this.contactController.getuniversities);
        app.route('/cities')
            .get(this.contactController.getcities);
        app.route('/schools')
            .get(this.contactController.getschools);
        app.route('/departments')
            .get(this.contactController.getdepartments);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map