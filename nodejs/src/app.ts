import express, {Application} from "express";
import bodyParser from "body-parser";
import { Routes } from './routes/routes';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';

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
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(passport.initialize());
    }

    private mongoSetup(): void {
        mongoose.connect(this.URL, {useNewUrlParser: true})
        .catch(err => console.log(err));
        mongoose.connection.on('error', err => console.log(err));
    }
}

export default new App().app;