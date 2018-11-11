"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UniversitiesSchema = new Schema({
    type: {
        type: String
    },
    oldtype: {
        type: String
    },
    code: {
        type: Number
    },
    school: {
        type: String
    },
    schooltype: {
        type: String
    },
    city: {
        type: String
    },
    department: {
        type: String
    },
    faculty: {
        type: String
    },
    info: {
        type: String
    },
    point: {
        type: Number
    },
    rank: {
        type: Number
    },
    years: {
        type: Number
    },
    pastquota: {
        type: Number
    },
    quota: {
        type: Number
    },
    topstudentquota: {
        type: Number
    },
    student: {
        type: Number
    },
    conditions: {
        type: String
    }
});
//# sourceMappingURL=universities.js.map