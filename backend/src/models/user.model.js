import mongoose,{Schema} from "mongoose";
import bscrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 30
        },
        
        password:{
            type: String,
            required: true,
            minLength: 8,
            maxLength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    },

    {
        timeStamps: true
    }
)

userSchema.pre("save", async function () {
   if (!this.isModified("password")) return;
   this.password = await bscrypt.hash(this.password, 10);

//    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bscrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);