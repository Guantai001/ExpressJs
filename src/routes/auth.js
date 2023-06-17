const {Router} = require('express');
const router = Router();
const User = require('../database/schemas/User');


router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (username && password) {
      if(req.session.user) {
        res.send(req.session.user);
        } else {
            req.session.user = {
                username,
            }
            res.send(req.session.user);
        }
    } else {
        res.status(400).send('Please enter a username and password');
    }
});


router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    const useDb = await User.findOne({ $or: [{username}, {email}]});
    if (useDb) {
        res.status(400).send('Username or email already in use');
    } else {
        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();
        res.send(newUser);
    }
});
    

module.exports = router;