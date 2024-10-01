import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import taskRoute from "./routes/task.route.js"
import path from "path";
dotenv.config();


const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin:'http://localhost:5173',
  credentials:true
}
app.use(cors(corsOptions));


// Testing the server
app.get("/", (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Server is up and running ...",
    });
  });


//Api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/task",taskRoute);

app.use(express.static(path.join(DIRNAME,"/frontend/dist")));
app.use("*",(_,res)=>{
  res.sendFile(path.resolve(DIRNAME,"frontend","dist","index.html"))
});


// Listening to the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
