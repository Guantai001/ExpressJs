const passport = require('passport');
const {
    Strategy
} = require('passport-local');
const User = require('../database/schemas/User');
const {
    comparePasswords
} = require('../utils/helpers');

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    console.log(id);
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        console.log(user);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});



passport.use(
    new Strategy({
            usernameField: 'email',
            // passwordField: 'password',
        },
        async (email, password, done) => {
            console.log(email);
            console.log(password);
            try {
                if (!email || !password) throw new Error('Missing credentials');
                const userDb = await User.findOne({
                    email
                });
                if (!userDb) throw new Error('User not found');
                const isValid = comparePasswords(password, userDb.password);
                if (isValid) {
                    console.log("Authenticated Successfully");
                    return done(null, userDb);
                } else {
                    console.log("Invalid credentials");
                    done(null, false, {
                        message: 'Invalid credentials'
                    });

                }

            } catch (err) {
                console.log(err);
                done(err, false, {
                    message: err.message
                });
            }
        })


);