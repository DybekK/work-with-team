import mongoose from "mongoose";
import { userSchema, userDocument } from "../models/crmModel";
import { Request, Response } from "express";

export const User = mongoose.model<userDocument>('contacts', userSchema);

export class ContactController {
    public addNewContact (req: Request, res: Response) {
        let newContact = new User(req.body);
        console.log(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.send(contact);
        })
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