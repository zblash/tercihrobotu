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
        
        
      
}
}