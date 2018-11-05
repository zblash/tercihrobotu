"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const universities_1 = require("../models/universities");
const schools_1 = require("../models/schools");
const departments_1 = require("../models/departments");
const cities_1 = require("../models/cities");
const University = mongoose.model('University', universities_1.UniversitiesSchema);
const City = mongoose.model('City', cities_1.CitiesSchema);
const School = mongoose.model('School', schools_1.SchoolsSchema);
const Department = mongoose.model('Department', departments_1.DepartmentsSchema);
class ContactController {
    getcities(req, res) {
        City.find({}, (err, cities) => {
            if (err) {
                res.send(err);
            }
            res.json({
                cities
            });
        });
    }
    getschools(req, res) {
        School.find({}, (err, schools) => {
            if (err) {
                res.send(err);
            }
            res.json({
                schools
            });
        });
    }
    getdepartments(req, res) {
        Department.find({}, (err, departments) => {
            if (err) {
                res.send(err);
            }
            res.json({
                departments
            });
        });
    }
    getuniversities(req, res) {
        let cities = req.query.cities;
        let page = parseInt(req.query.page) || 0;
        let q = University.find({
            $and: [
                { 'sehir': { $in: cities } },
                { $and: [{ id: { $gte: 1 } }, { id: { $lte: 1000 } }] }
            ]
        }).skip(page * 30)
            .limit(5);
        q.exec((err, posts) => {
            if (err) {
                res.send(err);
            }
            University.count({}).exec((counterr, count) => {
                if (counterr) {
                    return res.json(counterr);
                }
                return res.json({
                    universities: posts,
                    total: count,
                    totalPage: Math.ceil(count / 30),
                    page: page,
                    pageSize: posts.length,
                    nextPage: req.protocol + '://' + (req.get('host') + req.path).replace(/\/$/, "") + '?page=' + (page + 1)
                });
            });
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map