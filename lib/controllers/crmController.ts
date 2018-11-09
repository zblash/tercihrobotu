import * as mongoose from 'mongoose';
import * as url from 'url';
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

    public getuniversities (req: Request, res: Response) {       
        let page = parseInt(req.params.page) || 0;
        
        let query = {
            $and: [
                req.query.cities ? {'city': {$in: req.query.cities }} : {},
                req.query.schools ? {'school': {$in: req.query.schools }} : {},
                req.query.departments ? {'department': {$in: req.query.departments }} : {},
                req.query.deptype ? {'type': {$in: req.query.deptype}} : {},
                req.query.pointtop&&req.query.pointbot ? {$and: [{point: {$gte: req.query.pointbot}},{point: {$lte: req.query.pointtop}}]} : 
                req.query.ranktop&&req.query.rankbot ? {$and: [{rank: {$gte: req.query.rankbot}},{rank: {$lte: req.query.ranktop}}]} : {},
                
            ]
        }
        let q = University.find(query).skip(page * 30) 
        .limit(30)
        .sort({point: -1})
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