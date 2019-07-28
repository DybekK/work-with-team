import {Application, Response, Request} from "express";
import { ContactController } from "../controllers/controller";
import { UserAuth } from "../strategy/authStrategy";

export class Routes {
public userAuth: UserAuth = new UserAuth();
   public contactController: ContactController = new ContactController();
   public routes(app: Application): void {
    app.route('/registerUser')       
    .post(this.contactController.registerUser);

    app.route('/loginUser')
    .post(this.contactController.loginUser);

    app.route('/auth/google')
    .get(this.contactController.googleAuth);
  
    app.route('/auth/google/callback')
    .get(this.contactController.googleAuthCallback);

    app.route('/findUser')
    .get(this.contactController.findUser)
    }
}