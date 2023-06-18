const passport = require('passport');
const {
    Strategy
} = require('passport-discord');
const DiscordUser = require('../database/schemas/DiscordUser');



passport.serializeUser((user, done) => {
    console.log("serializeUser");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    console.log(id);
    try {
        const user = await DiscordUser.findById(id);
        if (!user) throw new Error('User not found');
        console.log(user);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});


passport.use(new Strategy({
        clientID: "1119909607314292796",
        clientSecret: "XizyYp-m5cmBp7VjS-2JOyo38mPAL4Fw",
        callbackURL: "http://localhost:3001/api/auth/discord/redirect",
        scope: ["identify"]
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken);
        console.log(profile);
        try {
            const discordUser = await DiscordUser.findOne({
                discordId: profile.id
            });
            if (discordUser) {
                console.log("Found user: " + discordUser);
                return done(null, discordUser);
            } else {
                const newUser = await DiscordUser.create({
                    discordId: profile.id,
                });
                console.log("Created user: " + newUser);
                return done(null, newUser);
            }
        } catch (err) {
            console.log(err);
            done(err, false, {
                message: err.message
            });
        }
    }

));