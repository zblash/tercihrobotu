"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UniversitiesSchema = new Schema({
    id: {
        type: Number
    },
    tur: {
        type: String
    },
    eskitur: {
        type: String
    },
    kod: {
        type: String
    },
    okul: {
        type: String
    },
    sehir: {
        type: String
    },
    bolum: {
        type: String
    },
    fakulte: {
        type: String
    },
    ekbilgi: {
        type: String
    },
    puan: {
        type: Number
    },
    eskisira: {
        type: Number
    },
    sure: {
        type: Number
    },
    eskikont: {
        type: Number
    },
    ogrencisayisi: {
        type: Number
    },
    okulbir: {
        type: Number
    },
    yerlesen: {
        type: Number
    },
    ozelkosullar: {
        type: String
    }
});
//# sourceMappingURL=universities.js.map