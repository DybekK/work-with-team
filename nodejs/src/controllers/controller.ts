import mongoose from "mongoose";
import passport from "passport";
import { UserAuth } from "../strategy/authStrategy";
import { userSchema } from "../models/mongooseModel";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import jwt from "jsonwebtoken";
import jwtSecret from "../configs/jwtConfig";

export const User = mongoose.model("contacts", userSchema);
export class ContactController {
  public userAuth = new UserAuth();
  public registerUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(200).send({ message: info.message });
      } else {
          if (err) {
            console.log(err);
          } else {
            const data = {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              email: req.body.email
            };
            User.findOneAndUpdate(
              { username: data.username },
              {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email
              },
              (err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("user created in db");
                  res.status(200).send({ message: "user created" });
                }
              }
            );
          }
      }
    })(req, res, next);
  }

  public loginUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("login", {session: false}, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(200).send({ message: info.message });
      } else {
            User.findOne({ username: user.username }, (err, user: any) => {
              const token = jwt.sign({ id: user.username }, jwtSecret.secret);
              res.status(200).send({
                auth: true,
                token: token,
                message: "user found & logged in"
              });
            });
      }
    })(req, res, next);
  }

  public findUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(200).send({ message: info.message });
      } else {
        console.log("user found in db from route");
        res.status(200).send({
          auth: true,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email
        });
      }
    })(req, res, next);
  }

  public googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { scope: ["profile"] })(req, res, next);
  }

  public googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      req.logIn(user, err => {
        User.findOne({ username: user.username }, (err, user: any) => {
          const token = jwt.sign({ id: user.username }, jwtSecret.secret);
          res.redirect(`http://localhost:4200/authGoogle/?jwt=${token}`);
        });
      });
    })(req, res, next);
  }
}
