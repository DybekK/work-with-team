import express, {Application} from "express";
import bodyParser from "body-parser";
import { Routes } from './routes/crmRoutes';
import mongoose from 'mongoose';

class App {
    public app: Application;
    public routePriv: Routes = new Routes();
    public URL: string = 'mongodb://127.0.0.1:27017/nodets';
    constructor () {
        this.app = express();
        this.config();
        this.routePriv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    private mongoSetup(): void {
        mongoose.connect(this.URL, {useNewUrlParser: true})
        .catch(err => console.log(err));
        mongoose.connection.on('error', err => console.log(err));
    }
}

export default new App().app;