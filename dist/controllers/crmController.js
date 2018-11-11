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
    editunis(req, res) {
        let unis = ['ADA KENT', 'AZERBAYCAN DEVLET PEDAGOJİ', 'AZERBAYCAN DİLLER', 'AZERBAYCAN MİMARLIK VE İNŞAAT', 'AZERBAYCAN TIP', 'BAKÜ DEVLET', 'BAKÜ SLAVYAN', 'ODLAR YURDU', 'HOCA AHMET YESEVİ ULUSLARARASI TÜRK-KAZAK', 'KIRGIZİSTAN-TÜRKİYE MANAS', 'KOMRAT DEVLET', 'NAHCİVAN DEVLET', 'SUMGAYIT DEVLET', 'ULUSLARARASI BALKAN', 'ULUSLARARASI SARAYBOSNA', 'DOĞU AKDENİZ', 'GİRNE', 'GİRNE AMERİKAN', 'KIBRIS AMERİKAN', 'KIBRIS SAĞLIK VE TOPLUM BİLİMLERİ', 'KIBRIS SOSYAL BİLİMLER', 'LEFKE AVRUPA', 'LEFKOŞA İNGİLİZ', 'ULUSLARARASI FİNAL', 'ULUSLARARASI KIBRIS', 'YAKIN DOĞU'];
        unis.forEach(function (element) {
            University.update({ school: element }, { schooltype: 'YURTDISI' }, { multi: true }, (err, docs) => {
            });
        });
    }
    getcities(req, res) {
        City.find({})
            .sort({ name: 1 })
            .exec()
            .then(cities => { res.json({ cities }); })
            .catch(err => { res.send(err); });
    }
    getschools(req, res) {
        School.find({})
            .sort({ name: 1 })
            .exec()
            .then(schools => { res.json({ schools }); })
            .catch(err => { res.send(err); });
    }
    getdepartments(req, res) {
        Department.find({})
            .sort({ name: 1 })
            .exec()
            .then(departments => { res.json({ departments }); })
            .catch(err => { res.send(err); });
    }
    getUniversityByCode(req, res) {
        let code = parseInt(req.params.code);
        University.find({ code: code })
            .exec()
            .then(universities => {
            res.json({ universities });
        })
            .catch(err => {
            res.json({ err });
        });
    }
    getuniversities(req, res) {
        let page = parseInt(req.query.page) || 0;
        let query = req.query.code ? { 'code': { $in: parseInt(req.query.code) } } : {
            $and: [
                req.query.cities ? { 'city': { $in: req.query.cities } } : {},
                req.query.schools ? { 'school': { $in: req.query.schools } } : {},
                req.query.departments ? { 'department': { $in: req.query.departments } } : {},
                req.query.deptype ? { 'type': { $in: req.query.deptype } } : {},
                req.query.schooltype ? { 'schooltype': req.query.schooltype } : {},
                req.query.years ? { 'years': parseInt(req.query.years) } : { $or: [{ 'years': 4 }, { 'years': 6 }] },
                req.query.pointtop && req.query.pointbot ? { $and: [{ 'point': { $gte: parseInt(req.query.pointbot) } }, { 'point': { $lte: parseInt(req.query.pointtop) } }] } :
                    req.query.ranktop && req.query.rankbot ? { $and: [{ 'rank': { $gte: parseInt(req.query.rankbot) } }, { 'rank': { $lte: parseInt(req.query.ranktop) } }] } : {},
            ]
        };
        let q = University.find(query)
            .sort({ point: -1 })
            .skip(page * 30)
            .limit(30)
            .exec()
            .then(posts => {
            University.count(query)
                .exec()
                .then(count => {
                return res.json({
                    universities: posts,
                    total: count,
                    totalPages: Math.ceil(count / 30),
                    page: page,
                    pageSize: posts.length
                });
            })
                .catch(counterr => {
                return res.json(counterr);
            });
        })
            .catch(err => {
            res.send(err);
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map