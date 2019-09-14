import mongoose, { DeepPartial  } from "mongoose";
import passport from "passport";
import { UserAuth } from "../strategy/authStrategy";
import { userSchema, tasksSchema, tagsSchema } from "../models/mongooseModel";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import jwt from "jsonwebtoken";
import jwtSecret from "../configs/jwtConfig";

export const User = mongoose.model("users", userSchema);
const Task = mongoose.model("tasks", tasksSchema);
const Tag = mongoose.model('tags', tagsSchema);

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
        //    const data: DeepPartial<any> = {
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

  public postTask(req: Request, res: Response, next: NextFunction){
    passport.authenticate("jwt", {session: false}, (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false})
      }
      if (info != undefined) {
        res.status(400).send({auth: false});
      } else {
        const data: DeepPartial<any> = req.body;
        const task = new Task(data);
        // for(let i = 0; i < data.tags.length; i++) {
        //   const tag = new Tag(data.tags);
        // }
        
        task.save();
        user.tasks.push(task);
        user.save();

        user.populate('tasks', (err: any, task: any) => {
          if(err) {
            res.send({complete: false});
            return;
          } 
          res.send(task.tasks[task.tasks.length - 1])
        })
      }
    })(req, res, next);;
  }

  public addTag(req: Request, res: Response, next: NextFunction){
    passport.authenticate("jwt", {session: false}, (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false})
      }
      if (info != undefined) {
        res.status(400).send({auth: false});
      } else {
        const data: DeepPartial<any> = req.body;
        const tag = new Tag(data);
        tag.save();
        user.tags.push(tag);
        user.save();
        user.populate('tags', (err: any, tag: any) => {
          if(err) {
            res.send({complete: false});
            return;
          } 
          res.send(tag.tags[tag.tags.length - 1])
        })
      }
    })(req, res, next);;
  }

  public getTasks(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", {session: false}, (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false});
      }
      if (info != undefined) {
        res.status(400).send({auth: false});
      } else {
        user.populate('tasks', (err: any, task: any) => {
          res.status(200).send(task.tasks);
        })
      }
    })(req, res, next)
  }

  public getTags(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", {session: false}, (err, user, info) => {
      if (err) {
        res.status(500).send({auth: false});
      }
      if (info != undefined) {
        res.status(400).send({auth: false});
      } else {
        user.populate('tags', (err: any, tag: any) => {
          if(err) {
            res.send({complete: false});
            return;
          } 
          res.send(tag.tags);
        })
      }
    })(req, res, next)
  }

}
