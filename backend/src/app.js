import express from "express"

// create an express app
const app = express();
app.use(express.json());


import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

app.use("/app/v1/users", userRouter);
app.use("/app/v1/post", postRouter);


export default app;