import passport from "passport";
import passportLocal from "passport-local";
import jwtSecret from "../jwt/jwtConfig";
import bcrypt from "bcrypt";
import { User } from "../controllers/controller";
import passportJwt, { ExtractJwt, StrategyOptions } from "passport-jwt";

export class UserAuth {
  public BCRYPT_SALT_ROUNDS: number = 12;
  public localStrategy = passportLocal.Strategy;
  public jwtStrategy = passportJwt.Strategy;
  public extractJwt = passportJwt.ExtractJwt;
  public opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtSecret.secret
  };
  constructor() {
    this.userRegister();
    this.userLogin();
    this.userJwt();
  }
  // LOCAL STRATEGY ONLY WITH USERNAME AND PASSWORD

  // METHOD WHICH ALLOWS YOU TO REGISTER NEW USER
  public userRegister() {
    passport.use(
      "register",
      new this.localStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          session: false
        },
        (username, password, done) => {
          User.findOne({ username: username }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (user != null) {
              return done(null, false, { message: "username already taken" });
            }
            // I HAVE TO UNDERSTAND THAT LATER BECAUSE I DONT KNOW WHAT ACTUALLY USER IS...
            bcrypt
              .hash(password, this.BCRYPT_SALT_ROUNDS)
              .then(hashedPassword => {
                console.log(hashedPassword);
                User.create({
                  username: username,
                  password: hashedPassword
                }).then(user => {
                  console.log("user created");
                  return done(null, user);
                });
              });
          }).catch(err => {
            done(err);
          });
        }
      )
    );
  }
  // METHOD WHICH ALLOWS YOU TO LOGIN AS AN USER
  public userLogin() {
    passport.use(
      "login",
      new this.localStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          session: false
        },
        (username, password, done) => {
          User.findOne({ username: username }, (err, user: any) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, { message: "incorrect username" });
            }
            bcrypt.compare(password, user.password).then(response => {
              if (!response) {
                return done(null, false, { message: "Incorrect password." });
              }
              console.log("user found and authenticated");
              return done(null, user);
            });
          });
        }
      )
    );
  }
  // METHOD WHICH ALLOWS YOU TO USE JWT
  public userJwt() {
    passport.use(
      "jwt",
      new this.jwtStrategy(this.opts, (jwt_payload, done) => {
        User.findOne({ username: jwt_payload }, (err, user: any) => {
          if (err) {
            done(err);
          } else if (user) {
            console.log("username found in db in passport");
            done(null, user);
          } else {
            console.log("user not found in db");
            done(null, false);
          }
        });
      })
    );
  }
}
