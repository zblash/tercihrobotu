"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.SchoolsSchema = new Schema({
    city: {
        type: String
    },
    name: {
        type: String
    }
});
//# sourceMappingURL=schools.js.map