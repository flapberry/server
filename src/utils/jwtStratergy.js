import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { db } from '../db/mongoose/userSchema.js';
import { Admindb } from '../db/mongoose/adminSchema.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'very strong key',
  passReqToCallback: true,
};

passport.use(new JwtStrategy(opts, async (req, jwt_payload, done) => {
  let Model;
  if (req.modeltype === 'User') Model = db.user;
  else Model = Admindb.user;
  try {
    const user = await Model.findOne({ username: jwt_payload.username });
    console.log(user);
    if (req.modelType === 'User') {
      if (!user.mailverified) throw new Error('Mail not Verified');
    }
    if (user) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));  

