const User = require('../database/schemas/User');
const { hashPassword } = require('../utils/helpers');


async function authRegisterController  (req, res) {
    const { email} = req.body;
    const useDb = await User.findOne({email});
    if (useDb) {
        res.status(400)
        res.send('Username or email already in use');
    } else {
        const password = await hashPassword( req.body.password) 
        console.log(password);
        const newUser = new User({
            email,
            password,
        });
        await newUser.save();
        res.send(newUser);
    }
};

module.exports = {authRegisterController}