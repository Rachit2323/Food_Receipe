const express = require("express");
const app = express.Router();
const createReceipe=require("../controllers/Reciepe.js");


const authMiddleware = require("../controllers/authMiddleware.js");

app.post("/create",authMiddleware, createReceipe.createReceipe);
app.get("/allreceipe",authMiddleware,createReceipe.getAllRecipes);
app.get("/find/:id",authMiddleware,createReceipe.findReceipe);
app.post("/delete/:id",authMiddleware,createReceipe.deleteReceipe);
app.post("/edit",authMiddleware, createReceipe.updateReceipe);




module.exports = app;

