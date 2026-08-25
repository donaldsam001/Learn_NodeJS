import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

dotenv.config({
    path: './.env'
});

const startServer = async() => {
    try {
        await connectDB();

        app.on("error",(error) => {
            console.log("Error" ,error);
            throw error;
        });


        app.listen(PORT, () => {
            console.log(`Server port: ${PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection failed.", error);
        process.exit(1);
    }
}

startServer();