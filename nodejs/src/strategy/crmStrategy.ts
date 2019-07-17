import passport from 'passport';
import passportLocal from 'passport-local';
import { User } from '../controllers/crmController';

import passportJwt from 'passport-jwt'

class UserAuth {
    public jwtStrategy = passportJwt.Strategy;
    public extractJwt = passportJwt.ExtractJwt;
    public opts = {};
    constructor () {
        
    }
    //LOCAL STRATEGY ONLY WITH USERNAME AND PASSWORD
    /*
    public localStrategy = passportLocal.Strategy;
    public userLocalStrategy () {
        passport.use(new this.localStrategy((username, password, done) => {
            User.findOne({username: username}, (err, user: any) => {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            })
        }))
    }
    */
}























