import express from "express"
import passport from "passport"
import twilio from 'twilio'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import {Login, Register, getUserData, logOut, otp_sent, refreshToken, verify_otp} from "../controllers/authControl.js"
import { verifyToken, verifyUser } from "../utils/verifyToken.js"
import { createError } from "../utils/error.js"

const router = express.Router()
dotenv.config()
 
const accoundSid = process.env.accoundSid
const authtoken = process.env.authtoken

const client = twilio(accoundSid,authtoken)
const otps = {};

router.post('/login', Login)

router.post('/refreshToken',refreshToken)

router.put('/register/:id', Register)
 
//dummy token verification
router.get('/authenticatedUserId',verifyToken,(req,res,next)=>{
    console.log(req.user);
    res.status(200).json({message:"you are authenticated",user:req.user})
})


router.get('/checkUserAuthentication/:id',verifyUser,(req,res,next)=>{
    try {
        res.json({message:"you are authenticated",user:req.user})
    } catch (error) {
        next(error)
    }
    
})

router.get('/checkAdminAuthentication',verifyUser,(req,res,next)=>{
    try {
        res.json({message:"you are authenticated",user:req.user})
    } catch (error) {
        next(error)
    }
    
})

router.get('/user/:userId',getUserData);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));



router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:8003/api/auth/login' }),
    (req, res) => {
        const userId = req.user.user._id;
        const user = req.user.user;
        console.log(user);
        const userPwd = req.user.user.password;
        console.log("userPassword",userPwd);
        const token = jwt.sign({
            userId
        },
        process.env.JWT, 
        {expiresIn: '3h'}
    );
        if (user.password==="") {
            res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 36000000 });
            res.redirect(`http://localhost:5173/register/${userId}`);
            
        } else {
            res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 36000000 });
            res.redirect('http://localhost:5173/home');
        }
    }
);


router.post('/send-otp',otp_sent)

router.post('/verify-otp',verify_otp);

router.post('/logout',logOut)

export default router;