import mongoose, { DeepPartial } from "mongoose";
import passport from "passport";
import { UserAuth } from "../strategy/authStrategy";
import { userSchema, tasksSchema } from "../models/mongooseModel";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import jwt from "jsonwebtoken";
import jwtSecret from "../configs/jwtConfig";

export const User = mongoose.model("users", userSchema);
const Task = mongoose.model("tasks", tasksSchema);

export class ContactController {
  public userAuth = new UserAuth();
  public registerUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false})
      }
      if (info != undefined) {
        res.status(400).send({ auth: false, message: info.message });
      } else {
            const token = jwt.sign({ id: req.body.email }, jwtSecret.secret);
            res.status(200).send({
              auth: true,
              token: token,
            });
      }
    })(req, res, next);
  }

  public loginUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("login", {session: false}, (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false})
      }
      if (info != undefined) {
        res.status(400).send({auth: false, message: info.message });
      } else {
        const token = jwt.sign({ id: req.body.email }, jwtSecret.secret);
        res.status(200).send({
          auth: true,
          token: token,
        });
      }
    })(req, res, next);
  }

  public findUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false})
      }
      if (info != undefined) {
        res.status(400).send({auth: false});
      } else {
        // const data: DeepPartial<any> = {
        //   taskname: 'Nazwa tasku',
        //   description: 'Nazwa opisu'
        // }
        // const task = new Task(data);
        // task.save();
        // user.tasks.push(task);
        // user.save();

        // user.populate('tasks', (err: any, task: any) => {
        //   console.log(task.tasks);
        // })
        
        res.status(200).send({
          auth: true,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          img: user.img
        });
      }
    })(req, res, next);
  }

  public googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { scope: ["profile", "email"], prompt: 'select_account',  })(req, res, next);
  }

  public googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false})
      } else {
        User.findOne({ email: user.email }, (err, user: any) => {
          if(err){
            res.status(500).send({auth: false})
          } else {
          const token= jwt.sign({ id: user.email }, jwtSecret.secret);
          res.status(200).send({auth: true, token:token});
          }
          
        });
      }
    })(req, res, next);
  }


}
