"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import bodyParser from "body-parser";
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
        app.route('/contact')
            .get(this.contactController.getContacts)
            .post(this.contactController.addNewContact);
        app.route('/contact/:contactId')
            .get(this.contactController.getConctactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
exports.Routes = Routes;
