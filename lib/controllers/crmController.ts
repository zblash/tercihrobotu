import * as mongoose from 'mongoose';
import { UniversitiesSchema } from '../models/universities';
import { SchoolsSchema } from '../models/schools';
import { DepartmentsSchema } from '../models/departments';
import { CitiesSchema } from '../models/cities';
import { Request, Response } from 'express';

const University = mongoose.model('University',UniversitiesSchema);
const City = mongoose.model('City',CitiesSchema);
const School = mongoose.model('School',SchoolsSchema);
const Department = mongoose.model('Department',DepartmentsSchema);
export class ContactController{

    public editunis(req: Request, res: Response){
    let unis = ['ADA KENT','AZERBAYCAN DEVLET PEDAGOJİ','AZERBAYCAN DİLLER','AZERBAYCAN MİMARLIK VE İNŞAAT','AZERBAYCAN TIP','BAKÜ DEVLET','BAKÜ SLAVYAN','ODLAR YURDU','HOCA AHMET YESEVİ ULUSLARARASI TÜRK-KAZAK','KIRGIZİSTAN-TÜRKİYE MANAS','KOMRAT DEVLET','NAHCİVAN DEVLET','SUMGAYIT DEVLET','ULUSLARARASI BALKAN','ULUSLARARASI SARAYBOSNA','DOĞU AKDENİZ','GİRNE','GİRNE AMERİKAN','KIBRIS AMERİKAN','KIBRIS SAĞLIK VE TOPLUM BİLİMLERİ','KIBRIS SOSYAL BİLİMLER','LEFKE AVRUPA','LEFKOŞA İNGİLİZ','ULUSLARARASI FİNAL','ULUSLARARASI KIBRIS','YAKIN DOĞU'];
       unis.forEach(function(element) {
        University.update({school:element},{schooltype: 'YURTDISI'},{multi:true},(err,docs) => {
        
        });
      });
    
    }
    public getcities(req: Request, res: Response) {
        City.find({})
        .sort({name: 1})
        .exec()
        .then(cities => { res.json({cities}); })
        .catch(err => { res.send(err); })
    }

    public getschools(req: Request, res: Response) {
        School.find({})
        .sort({name: 1})
        .exec()
        .then(schools => { res.json({schools}); })
        .catch(err => { res.send(err); });
    }

    public getdepartments(req: Request, res: Response) {
        Department.find({})
        .sort({name: 1})
        .exec()
        .then(departments => { res.json({departments}); })
        .catch(err => { res.send(err); })
    }
    public getUniversityByCode(req: Request, res: Response){
        let code = parseInt(req.params.code);
        University.find({code:code})
        .exec()
        .then(universities => {
            res.json({universities});
        })
        .catch(err => {
            res.json({err});
        })
    }
    public getuniversities (req: Request, res: Response) {       
        let page = parseInt(req.query.page) || 0;
        let query = req.query.code ? {'code': {$in:req.query.code}} : {
            $and: [
                req.query.cities ? {'city': {$in: req.query.cities }} : {},
                req.query.schools ? {'school': {$in: req.query.schools }} : {},
                req.query.departments ? {'department': {$in: req.query.departments }} : {},
                req.query.deptype ? {'type': {$in: req.query.deptype}} : {},
                req.query.schooltype ? {'schooltype': req.query.schooltype} : {},
                req.query.years ? {'years': parseInt(req.query.years)} : {$or: [{'years':4},{'years':6}]},
                req.query.pointtop&&req.query.pointbot ? {$and: [{'point': {$gte: parseInt(req.query.pointbot)}},{'point': {$lte: parseInt(req.query.pointtop)}}]} : 
                req.query.ranktop&&req.query.rankbot ? {$and: [{'rank': {$gte: parseInt(req.query.rankbot)}},{'rank': {$lte: parseInt(req.query.ranktop)}}]} : {},
            ]
        }
        let q = University.find(query)
        .sort({point: -1})
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
                    totalPages: Math.ceil(count/30),
                    page: page,
                    pageSize: posts.length
                });
            })
            .catch(counterr => {
                return res.json(counterr);
            })
        })
        .catch(err => {
            res.send(err);
        });
    }
}