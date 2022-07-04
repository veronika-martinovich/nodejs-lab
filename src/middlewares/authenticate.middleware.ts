const passport = require('passport');

export const authenticate = passport.authenticate('jwt', { session: false });
