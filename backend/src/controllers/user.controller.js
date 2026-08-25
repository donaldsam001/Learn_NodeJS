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
            // loggedIn: false,
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


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                message: "User must fillout name and password."
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user){
            return res.status(400).json({
                message: "User not exist."
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(400).json({
                message: "Password invalid."
            })
        }

        res.status(200).json({
            message: "Login seccessfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

const logoutUser = async (req, res)=>{
    try {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required."
            });
        }

        const user = await User.findOne({
            email
        });

        if (!user){
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            message: "Logout successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutUser
};