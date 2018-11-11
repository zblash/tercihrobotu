"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.DepartmentsSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    }
});
//# sourceMappingURL=departments.js.map