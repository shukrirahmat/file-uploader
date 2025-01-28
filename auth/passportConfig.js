const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {

      const user = await db.findUser(username);
      if (!user) {
        return done(null, false, { message: "Username does not exist" });
      }

      const pwmatch = await bcrypt.compare(password, user.password);

      if (!pwmatch) {
        return done(null, false, { message: "Incorrect Password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserWithID(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
