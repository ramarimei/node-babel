import { Router } from 'express';
import argon2 from 'argon2';
import User from '../models/usersModel.js';
import registerSchema from '../validation/authRegisterUser.js';

const router = Router();
console.log(router);

router.post('/register', async (req, res, next) => {
    try {
        const { body } = req;
        // console.log(body); 

        //check if the user has a firstname, lastname, username, password and email
    if (
        // !body.hasOwnProperty('firstname') ||
        // !body.hasOwnProperty('lastname') ||
        !body.hasOwnProperty('username') ||
        !body.hasOwnProperty('password') ||
        !body.hasOwnProperty('email') 

     ) {
        return res.status(400).json({ 
            error: 'all fields have to be filled out, username, email and password' 
        });
    }

    // const { username, email, password} = body;

    const validValue = await registerSchema.validateAsync(body);
    console.log('validValues:', validValues);
    //check username is unique
    // const checkUsername = await User.findOne({ username });
    // if (checkUsername) {
    //     return res.status(400).json({error: 'Username already taken!'});
    // }

    // //check username is unique
    // const checkEmail = await User.findOne({ email });
    // if (checkEmail) {
    //     return res.status(400).json({error: 'Email address already in use!'});
    // }

    // const hash =  await argon2.hash(password);
    // // use the model to create a new user
    // const user = new User({...body, password: hash});
    // // save the marketplace
    // await user.save();

    return res.status(201).json({ success: true });
    } catch (e) {
      next(e);  
    }
});

export default router;
