import mongoose from "mongoose";
import passport from 'passport';
import { UserAuth } from '../strategy/authStrategy';
import { userSchema } from "../models/mongooseModel";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import jwt from 'jsonwebtoken';
import jwtSecret from '../jwt/jwtConfig';

export const User = mongoose.model('contacts', userSchema);

export class ContactController {
    public userAuth = new UserAuth();
    public registerUser (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    const data = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        mail: req.body.mail
                    };
                     User.findOneAndUpdate ({username: data.username}, {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        mail: data.mail
                    }, (err, user) => {
                                console.log('user created in db');
                                res.status(200).send({message: 'user created'});
                            
                        });

                    // User.findOne ({username: data.username}, (err, user:any) => {
                    //         user.update({
                    //             firstname: data.firstname,
                    //             lastname: data.lastname,
                    //             mail: data.mail
                    //         }).then(() => {
                    //             console.log('user created in db');
                    //             res.status(200).send({message: 'user created'});
                    //         });
                    //     });
                });
            }
        })(req, res, next);
    }

    public loginUser (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    User.findOne({username: user.username}, (err, user: any) => {
                        const token = jwt.sign({id: user.username}, jwtSecret.secret);
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'user found & logged in'
                        })
                    });
                });
            }
        })(req, res, next);
    }

    public findUser (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                console.log('user found in db from route');
                res.status(200).send({
                    auth: true,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    mail: user.mail
                });
            }
        })(req, res, next);
    }

}