const Recipe = require("../models/Reciepe");
const User = require("../models/user.js");
const cloudinary = require("cloudinary");

exports.createReceipe = async (req, res) => {
  try {
    const {
      recipeName,
      recipeDescription,
      updatedPostData,
      ingredientInputs,
      stepInputs,
      overviewInputs,
    } = req.body;

    const mycloud = await cloudinary.v2.uploader.upload(updatedPostData, {
      folder: "Food",
    });

    const newRecipe = new Recipe({
      recipeName,
      recipeDescription,
      recipePhoto: {
        secure_url: mycloud.secure_url,
        public_id: mycloud.public_id,
      },
      ingredients: ingredientInputs?.map(({ name, description }) => ({
        name,
        description: description,
      })),
      steps: stepInputs || [],
      overview: overviewInputs?.map(({ name, description }) => ({
        name,
        description: description,
      })),
      createdBy: req.userId,
    });

    const savedRecipe = await newRecipe.save();

    res.status(201).json({
      success: true,
      data: savedRecipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while creating the recipe",
    });
  }
};


exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "firstName");
    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching recipes",
    });
  }
};

exports.findReceipe = async (req, res) => {
  try {
    const id = req.params.id;

    const recipe = await Recipe.findById(id).populate("createdBy", "firstName");

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching recipes",
    });
  }
};

exports.deleteReceipe = async (req, res) => {
  try {
    const id = req.params.id;

    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while deleting the recipe",
    });
  }
};
