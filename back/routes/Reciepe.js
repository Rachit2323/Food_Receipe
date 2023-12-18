const express = require("express");
const app = express.Router();
const createReceipe=require("../controllers/Reciepe.js");
const getAllRecipes=require("../controllers/Reciepe.js");


const authMiddleware = require("../controllers/authMiddleware.js");

app.post("/create",authMiddleware, createReceipe.createReceipe);
app.get("/allreceipe",authMiddleware,createReceipe.getAllRecipes);

module.exports = app;