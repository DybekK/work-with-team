import express, {Application, Response, Request} from "express";
//import bodyParser from "body-parser";
import { ContactController } from "../controllers/controller";

export class Routes {
   public contactController: ContactController = new ContactController();
   public routes(app: Application): void {
    app.route('/')
    .get((req: Request, res: Response) => {            
        res.status(200).send({
            message: 'Routes are working'
        })
    })

    app.route('/registerUser')       
    .post(this.contactController.registerUser);

    app.route('/loginUser')
    .post(this.contactController.loginUser);

    app.route('/findUser')
    .post(this.contactController.findUser);
    }
}