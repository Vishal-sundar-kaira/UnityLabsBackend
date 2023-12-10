const User = require("../models/Users.js")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
const createError = require("../utils/createError.js")
exports.register = async (req, res,next) => {
        try {
            console.log(req.body.password)
            const salt = await bcrypt.genSalt(10); // 10 represents the number of rounds
            const secpass = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                ...req.body,
                password:secpass
            });
            await newUser.save();
            res.status(201).send("user has been created")
        } catch (err) {
            next(err)
        }
    }
exports.login = async (req, res,next) => {
        try {
            const user=await User.findOne({username:req.body.username})

            if(!user)
            {
                return next(createError(404, "user not found"))
            }
            const iscorrect=bcrypt.compareSync(req.body.password,user.password)
            if(!iscorrect){
                return next(createError(400,"Wrong password use correct password"))
            } 
            // console.log("1")
            const token=jwt.sign(
            {
                id:user._id,
                isSeller:user.isSeller
            },process.env.JWT_KEY)
            // console.log("2")
            const {password,...info}=user._doc
            res.cookie("accessToken",token,{
                httpOnly:true,
                sameSite:'none',
                secure:true,
            }).status(200).send(info)
            console.log(req.cookies.accessToken,"token")
            // console.log("3")
        } catch (err) {
            next(err)
        }
    }

exports.logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true
    })
    .status(200)
    .send("User has been logged out.");
    console.log("logged out");
};
