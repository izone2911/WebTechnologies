import express from "express"
import mongoose from "mongoose"
import cors from "cors"
const app = express()
app.use(express.json());
app.use(cors())

//database blog 
try {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://root:example@database:27017/" , {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("Error:", err.message);
}


//////////////////////////////////////////////////////////////////////
import AccountRoutes from "./routes/Account.js"
app.use("/api/auth",AccountRoutes)
//////////////////////////////////////////////////////////////////////
import ExamRoutes from "./routes/Exam.js"
app.use("/api/exam",ExamRoutes)

///////////////////////////////////////////////////////////////////
import MyCourseRoutes from "./routes/MyCourse.js";
app.use("/api/mycourse", MyCourseRoutes);

app.get('*', (req, res) => res.send('404 NOT FOUND!!!'));

app.listen(4000,() => {
    console.log("Server is running on port 4000!!!")
})


