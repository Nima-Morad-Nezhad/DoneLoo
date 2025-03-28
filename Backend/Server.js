const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")
const user = require("./models/userModel");
const task = require("./models/taskModel");
const cors= require("cors");
const authRoutes = require("./router/authRouter");
const protectedRouter = require("./router/protectedRouter");
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/protected", protectedRouter)
main().then(()=> {console.log("connected to the DB")}).catch(err => console.log("Is not able to connect" ,err));
async function main(){
    await mongoose.connect(process.env.MONGO_DB)
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})