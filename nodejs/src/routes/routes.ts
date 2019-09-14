import { Application } from "express";
import { ContactController } from "../controllers/controller";
import { UserAuth } from "../strategy/authStrategy";

export class Routes {
public userAuth: UserAuth = new UserAuth();
   public contactController: ContactController = new ContactController();
   public routes(app: Application): void {
    // USER OPERATIONS
    app.route('/registerUser')       
    .post(this.contactController.registerUser);

    app.route('/loginUser')
    .post(this.contactController.loginUser);

    app.route('/auth/google')
    .get(this.contactController.googleAuth);
  
    app.route('/auth/google/callback')
    .get(this.contactController.googleAuthCallback);

    //AUTH USER WHILE LOGGING

    app.route('/findUser')
    .get(this.contactController.findUser)

    // USER GET AND POSTS OPERATIONS

    app.route('/postTask')
    .post(this.contactController.postTask);

    app.route('/getTasks')
    .get(this.contactController.getTasks);

    app.route('/addTag')
    .post(this.contactController.addTag);

    app.route('/getTags')
    .get(this.contactController.getTags);
    }
}