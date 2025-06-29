import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import passport, { Profile } from "passport";
import dotenv from "dotenv";
import prisma from "./prismaClient";

dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/callback/google",
    },
    async (_, __, profile: Profile, done: VerifyCallback) => {
      try {
        if (!profile) {
          done(new Error("Fail to Authorize!"));
          return;
        }

        console.log(profile);

        const user = await prisma.user.findUnique({
          where: {
            email: profile.emails?.[0].value,
          },
        });

        if (!user) {
          done(new Error("User is not register yet!"));
          return;
        }

        if (user.isPending) {
          await prisma.user.update({
            where: {
              email: profile.emails?.[0].value,
            },
            data: {
              profileImg: profile.photos?.[0].value,
              isPending: false,
            },
          });
        }

        console.log(user)

        done(null, user);

      } catch (error: any) {
        console.log("Error is", error);
        done(new Error(error));
      }
    }
  )
);

export default passport;
