import mongoose from "mongoose";
import passport from 'passport';
import { UserAuth } from '../strategy/crmStrategy';
import { userSchema, userDocument } from "../models/crmModel";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import jwt from 'jsonwebtoken';
import jwtSecret from '../jwt/jwtConfig';

export const User = mongoose.model<userDocument>('contacts', userSchema);

export class ContactController {
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
                        mail: req.body.mail,
                        username: user.username
                    };
                    User.findOne ({username: data.username}, (err, user) => {
                            user.update({
                                firstname: data.firstname,
                                lastname: data.lastname,
                                mail: data.mail
                            }).then(() => {
                                console.log('user created in db');
                                res.status(200).send({message: 'user created'});
                            });
                        });
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
                    User.findOne({username: user.username}, (err, user) => {
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

    public getContacts (req: Request, res: Response) {
        User.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getConctactWithID (req: Request, res: Response) {
        User.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
    }

    public updateContact (req: Request, res: Response) {
        User.findOneAndUpdate ({_id: req.params.contactId}, req.body, {new: true}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
    }
    public deleteContact (req: Request, res: Response) {           
        User.remove({_id: req.params.contactId }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
}