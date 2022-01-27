import { TOKEN } from '../../credentials/configs';
import usersService from '../resources/user/user.service';

const { Strategy, ExtractJwt } = require('passport-jwt');

export const applyPassportStrategy = (passport: any) => {
  const options: { jwtFromRequest?: string; secretOrKey?: string } = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = TOKEN.secret;

  passport.use(
    new Strategy(options, async (payload: any, done: any) => {
      const { username } = payload;
      const user = await usersService.getByUsername(username);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
