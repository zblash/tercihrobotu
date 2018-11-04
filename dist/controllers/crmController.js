"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crmModel_1 = require("../models/crmModel");
const Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
class ContactController {
    getContacts(req, res) {
        res.send("gugu");
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map