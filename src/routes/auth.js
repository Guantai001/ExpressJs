const {Router} = require('express');
const router = Router();
const passport = require('passport');
const User = require('../database/schemas/User');
const  { hashPassword, comparePasswords } = require('../utils/helpers');


// router.post('/login',async  (req, res) => {
//     const {email, password} = req.body;
//     if(!email || !password) {
//         res.status(400).send('Please provide email and password');
//     }
//     const userDb = await User.findOne({email});
//     if(!userDb)  return res.status(401).send('Invalid email or password');
//     const isValid = comparePasswords(password, userDb.password);
//     if(isValid) {
//         req.session.user = userDb;
//         return res.status(200).send('Logged in');
//     }else{
//         return res.status(401).send('Invalid email or password');
//     }
    
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req.user);
    console.log("logged in");
    res.send('Logged in');
});



router.post('/register', async (req, res) => {
    const {username, email,} = req.body;
    const useDb = await User.findOne({email});
    if (useDb) {
        res.status(400).send('Username or email already in use');
    } else {
        const password = await hashPassword( req.body.password) 
        console.log(password);
        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();
        res.send(newUser);
    }
});
    
router.get('/discord' , passport.authenticate('discord'), (req, res) => {
    console.log(req.user);
    res.send('Logged in');
});

router.get('/discord/redirect', passport.authenticate('discord'),(req, res) => {
    console.log(req.user);
    res.send('Logged in');
    });
    

module.exports = router;