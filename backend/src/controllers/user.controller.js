import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // validate input

        if (!username || !email || !password){
            return res.status(400).json({
                message: "All field are important."
            })
        }

        // check exist

        const existing = await User.findOne({email: email.toLowerCase()});
        if (existing){
            return res.status(400).json({
                message: "User already exists."
            })
        }

        // create user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIN: false,
        });

        res.status(201).json({
            message: "Register successfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export {
    registerUser
};