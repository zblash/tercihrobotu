import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/crmController";

export class Routes { 
    
    public contactController: ContactController = new ContactController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        app.route('/universities')
        .get((req: Request, res: Response, next: NextFunction) => {
            
                next();
                                    
        }, this.contactController.getuniversities)  

        app.route('/universities/:code([0-9]+)')
        .get( this.contactController.getUniversityByCode)    

        app.route('/cities')
        .get( this.contactController.getcities)    
            
        app.route('/schools')
        .get( this.contactController.getschools)     

        app.route('/edit').get( this.contactController.editunis)  

        app.route('/departments')
        .get( this.contactController.getdepartments)     
      
}
}