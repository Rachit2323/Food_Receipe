const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const cloudinary = require("cloudinary");


// Increase limit to handle larger payloads

const userRoutes = require("./routes/user.js");
const receipeRoutes = require("./routes/Reciepe.js");
// const postRoutes = require("./routes/post.js");
// const URI =
//   "mongodb+srv://Rachit23:UhP8Iiyp4xxptvmM@cluster0.fgnb20h.mongodb.net/zero";
const URI="mongodb://localhost:27017/food";

cloudinary.v2.config({
  cloud_name: "dyedquiym",
  api_key: "154218675918319",
  api_secret: "d_TyO6pmhjEMcj2-CUooPs93bhI",
});

app.use(express.json({ limit: '50mb' }));



const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/users", userRoutes);
app.use("/receipe", receipeRoutes);

app.get("/", (req, res) => {
  res.send("Hello, I am here and running!");
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});