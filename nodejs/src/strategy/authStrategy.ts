import passport from "passport";
import passportLocal from "passport-local";
import jwtSecret from "../configs/jwtConfig";
import bcrypt from "bcrypt";
import { User } from "../controllers/controller";
import passportJwt, { ExtractJwt, StrategyOptions } from "passport-jwt";
import passportGoogle from "passport-google-oauth20";
import googleSecret from "../configs/googleConfig";

export class UserAuth {
  public BCRYPT_SALT_ROUNDS: number = 12;
  public localStrategy = passportLocal.Strategy;
  public googleStrategy = passportGoogle.Strategy;
  public jwtStrategy = passportJwt.Strategy;
  public extractJwt = passportJwt.ExtractJwt;
  public opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret.secret
  };
  constructor() {
    this.userRegister();
    this.userLogin();
    this.userJwt();
    this.userGoogleAuth();
  }

  public userRegister() {
    passport.use(
      "register",
      new this.localStrategy(
        {
          usernameField: "email",
          session: false,
          passReqToCallback: true
        },
        (req, username, password, done) => {
          User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (user != null) {
              return done(null, false, { message: "Email already taken" });
            }
            bcrypt
              .hash(password, this.BCRYPT_SALT_ROUNDS)
              .then(hashedPassword => {
                console.log(hashedPassword);
                User.create({
                  username: req.body.username,
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: req.body.email,
                  password: hashedPassword,
                }).then(user => {
                  return done(null, user);
                });
              });
          });
        }
      )
    );
  }

  public userLogin() {
    passport.use(
      "login",
      new this.localStrategy(
        {
          usernameField: "username",
          session: false,
          passReqToCallback : true 
        },
        (req, username, password, done) => {
          User.findOne({ username: username, email: req.body.email }, (err, user: any) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, { message: "Incorrect username or email" });
            }
            
            bcrypt.compare(password, user.password).then(response => {
              if (!response) {
                return done(null, false, { message: "Incorrect password." });
              }
              return done(null, user);
            });
          });
        }
      )
    );
  }

  public userJwt() {
    passport.use(
      "jwt",
      new this.jwtStrategy(this.opts, (jwt_payload, done) => {
        User.findOne({ email: jwt_payload.id }, (err, user: any) => {
          if (err) {
            done(err);
          } else if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
      })
    );
  }

  public userGoogleAuth() {
    passport.use(
      "google",
      new this.googleStrategy(
        {
          callbackURL: googleSecret.callbackURL,
          clientID: googleSecret.clientID,
          clientSecret: googleSecret.clientSecret,
        },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({ email: profile.emails![0].value }, (err, user) => {
            if (err) {
              return done(err);
            } 
            if (user != null) {  
              return done(err, user);
            } 
              User.create({
                username: profile.displayName,
                firstname: profile.name!.givenName,
                lastname: profile.name!.familyName,
                email: profile.emails![0].value,
                img: profile.photos![0].value
              }, (err: any, user: any) => {
                if (err){
                  return done(err)
                }
                return done(err, user);
              })
          });
        }
      )
    );
  }
}
