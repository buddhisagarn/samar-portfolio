import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/subscriber.js";

//comment
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;

      // only allow real Gmail
      if (!email || !email.endsWith("@gmail.com")) {
        return done(null, false);
      }

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email,
          avatar: profile.photos[0].value,
        });
      }

      return done(null, {
        email,
        name: profile.displayName,
      });
    },
  ),
);

export default passport;
