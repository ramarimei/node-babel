import { Router } from 'express';
import argon2 from 'argon2';
import User from '../models/usersModel.js';
import registerSchema from '../validation/authRegisterUser.js';
import loginSchema from '../validation/authLoginUser';

const router = Router();
console.log(router);

router.post('/register', async (req, res, next) => {
    try {
    const { body } = req;
    const validValues = await registerSchema.validateAsync(body);
    console.log('validValues:', validValues);

    const { username, email, password} = validValues;

    // check username is unique
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
        return res.status(400).json({error: 'Username already taken!'});
    }

    //check username is unique
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
        return res.status(400).json({error: 'Email address already in use!'});
    }

    const hash =  await argon2.hash(password);
    // use the model to create a new user
    const user = new User({...body, password: hash});
    // save the marketplace
    await user.save();

    return res.status(201).json({ success: true });
    } catch (e) {
// catch custom validation errors
        if(e.message.startsWith('Invalid')){
            return res.status(400).json({ error: e.message });
        }
 
      next(e);  
    }
});

 router.post('/login', async (req, res, next) => {
    try {
        // login with username
        const { body } = req,
        const validValues = await loginSchema.validateAsync(body);
        console.log('validValues:', validValues);
    
        const { username, email, password} = validValues;
        

        return res.end();
    } catch (e) {

        // catch custom validation errors
        if(e.message.startsWith('Invalid')){
            return res.status(400).json({ error: e.message });
        }
        
        next(e);
    }

 });

export default router;
