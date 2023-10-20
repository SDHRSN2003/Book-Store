import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDB_URL } from "./config.js";
import bookRoutes from './routes/bookRoutes.js';
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors()); 
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods : ['GET','POST','PUT','DELETE'],
//         allowedHeaders : ['Content-Type'],
//     })
// )

app.get('/',(request,response) =>{
    console.log(request)
    return response.status(234).send('Hello world')
});

app.use('/books',bookRoutes);


mongoose.connect(mongoDB_URL).then(() =>{
    console.log("Connected to mongodb successfully");
    app.listen(PORT, () => {
        console.log(`App is working at PORT ${PORT}`);
    });
}).catch((err) => {
    console.log(err.message);
});