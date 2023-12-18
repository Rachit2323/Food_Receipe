const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true,
  },
  recipeDescription: {
    type: String,
    required: true,
  },
  recipePhoto: {
    secure_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  ingredients: [
    {
      name: String,
      description: String,
    },
  ],
  steps: [
    {
      type: String, // Assuming each step is a string
    },
  ],
  overview: [
    {
      name: String,
      description: String,
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
