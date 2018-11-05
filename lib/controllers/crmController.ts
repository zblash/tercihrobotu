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

    
    public getcities(req: Request, res: Response) {
        City.find({}, (err,cities) => {
            if(err){
                res.send(err);
            }
            res.json(
                {
                    cities
                }
            );
        })
    }

    public getschools(req: Request, res: Response) {
        School.find({}, (err,schools) => {
            if(err){
                res.send(err);
            }
            res.json(
                {
                    schools
                }
            );
        })
    }

    public getdepartments(req: Request, res: Response) {
        Department.find({}, (err,departments) => {
            if(err){
                res.send(err);
            }
            res.json(
                {
                    departments
                }
            );
        })
    }

    public getuniversities (req: Request, res: Response) {       
        let cities = req.query.cities;
        let page = parseInt(req.query.page) || 0;
        let q = University.find({
            $and: [
                {'sehir': {$in: cities}},
                {$and: [{id: {$gte: 1}},{id: {$lte: 1000}}]}
        ]
        }).skip(page * 30) 
        .limit(5);
       q.exec((err, posts) => {
        if(err){
            res.send(err);
        }
        
        University.count({}).exec((counterr, count) => {
            if (counterr) {
                return res.json(counterr);
              }
              return res.json({
                universities: posts,
                total: count,
                totalPage: Math.ceil(count/30),
                page: page,
                pageSize: posts.length,
                nextPage: req.protocol + '://' + (req.get('host') + req.path).replace(/\/$/, "")+'?page='+(page+1)
              });
        })

        });
    }
 
    

}