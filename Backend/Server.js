const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routers/profileRouters");
require("dotenv").config();
const main = require("./config/connect")




app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../DoneLoo/src")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "../DoneLoo/src/index.html"))
    );
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});