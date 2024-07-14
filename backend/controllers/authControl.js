import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import twilio from 'twilio'
import dotenv from 'dotenv'


dotenv.config()


const accoundSid = process.env.accoundSid
const authtoken = process.env.authtoken

const client = twilio(accoundSid, authtoken)
const otps = {};


export const Register = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    if (user) {
      user.age = req.body.age;
      user.gender = req.body.gender;
      user.dateOfBirth = req.body.dateOfBirth;
      user.city = req.body.city;
      user.state = req.body.state;
      user.district = req.body.district;
      user.qualification = req.body.qualification;
      user.professional = req.body.professional;
      user.password = hash,
        await user.save();
      res.status(200).json({ user, message: "User updated successfully" });
    } else {

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        googleID: req.body.googleID,
        displayName: req.body.displayName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        city: req.body.city,
        state: req.body.state,
        district: req.body.district,
        qualification: req.body.qualification,
        professional: req.body.professional,
        password: hash,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully again" });

      res.status(400).json({ message: "User  is already created so please login in" })
    }
  } catch (err) {
    next(err);
  }
};

export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(createError(404, "user not found"))

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) return next(createError(400, "Invalid password"))

    const token = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
      isStaff: user.isStaff,
    },
      process.env.JWT, {
      expiresIn: '7d'
    }
    )
    const { _id, password, isAdmin, googleID, isStaff, email, city, state, district, ...otherDetails } = user._doc

    


    const refreshToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
      },
      process.env.JWT,
      { expiresIn: '7d' });


      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 360000000
      });
      
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      }).status(201).json({message:"login successful",otherDetails});
  } catch (err) {
    next(err)
  }
}

export const refreshToken = (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return next(createError(401, "No refresh token"));

  jwt.verify(refreshToken, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Invalid refresh token"));
    

    const accessToken = jwt.sign(
      { id: user.id,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
      },
      process.env.JWT,
      { expiresIn: '7h' }
    );

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.status(200).json({ accessToken: accessToken });
    console.log(accessToken);
  });
};

export const logOut = (req, res) => {
  res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: 'none' });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'none' });
  res.status(200).json({ message: "logged out successfully" })
}


export const getUserData = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "user not found"))
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
};

export const otp_sent = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    })
    otps[phoneNumber] = otp;
    res.status(200).json({ message: 'OTP send successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification' });
  }
}

export const verify_otp = (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (otps[phoneNumber] && otps[phoneNumber] === otp) {
    delete otps[phoneNumber];
    res.status(200).json({ message: 'Verification successful' });
  } else {
    res.status(400).json({ error: 'Invalid code' });
  }
}

