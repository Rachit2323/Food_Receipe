import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import FoodCard from "./FoodCard.js";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getrecipedata, recipedata } from "../../Reducers/Reciepe";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addFoodInput, setAddFoodInput] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [stepInputs, setStepInputs] = useState([""]);
  const [ingredientInputs, setIngredientInputs] = useState([""]);
  const [reciepeData, setReciepeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = reciepeData.filter((recipe) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
  
    const recipeNameMatch = recipe.recipeName.toLowerCase().includes(lowerCaseQuery);
    const createdByMatch = recipe.createdBy.firstName.toLowerCase().includes(lowerCaseQuery);
    const ingredientMatch = recipe.ingredients
      .some((ingredient) => 
        ingredient.name.toLowerCase().includes(lowerCaseQuery) ||
        ingredient.description.toLowerCase().includes(lowerCaseQuery)
      );
    const stepMatch = recipe.steps
      .some((step) => step.toLowerCase().includes(lowerCaseQuery));
    const overviewMatch = recipe.overview
      .some((overviewItem) => 
        overviewItem.name.toLowerCase().includes(lowerCaseQuery) ||
        overviewItem.description.toLowerCase().includes(lowerCaseQuery)
      );
  
    return recipeNameMatch || createdByMatch || ingredientMatch || stepMatch || overviewMatch;
  });
  
  

  const handleAddStep = () => {
    setStepInputs([...stepInputs, ""]);
  };

  const { allreceipe, successallreceipe, createreceipe } = useSelector(
    (state) => state.reciepe
  );

  useEffect(() => {
    if (successallreceipe) {
      setReciepeData(allreceipe);
    }
  }, [allreceipe, successallreceipe, createreceipe]);

  useEffect(() => {
    dispatch(getrecipedata());
  }, []);


  const handleRemoveStep = (index) => {
    const newSteps = [...stepInputs];
    newSteps.splice(index, 1);
    setStepInputs(newSteps);
  };

  const handleAddIngredient = () => {
    setIngredientInputs([...ingredientInputs, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredientInputs];
    newIngredients.splice(index, 1);
    setIngredientInputs(newIngredients);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredientInputs];
    newIngredients[index] = value;
    setIngredientInputs(newIngredients);
  };


  const openFood=(id)=>{
    // navigate(`/add/${id}`);
  }
  const AddFood = () => {
    // setAddFoodInput(true);
    navigate(`/add/0`);
  };

  const handleCloseAddFood = () => {
    setAddFoodInput(false);
  };
  const [updatedPostData, setUpdatedPostData] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2)
        //2 means image is process and 0 means image is not processed
        setUpdatedPostData(Reader.result);
    };
  };
  
  const handleSubmit = () => {
    dispatch(
      recipedata({
        recipeName,
        recipeDescription,
        updatedPostData,
        ingredientInputs,
        stepInputs,
      })
    );
  };

  return (
    <>
      <div
        className={`flex p-4 bg-gray-900 flex-col h-screen w-screen items-center ${
          addFoodInput && "bg-gray-500"
        }`}
      >
        <div className="flex items-center w-full lg:w-1/4 border border-gray-300 rounded  mb-4 lg:mb-0">
          <input
            type="text"
            placeholder="Search... (Ingredients, Step)"
            className="w-full py-2 px-3 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
         
        </div>
        <span className="text-5xl  text-center lg:text-left font-serif text-gray-200 w-full block pt-6 pb-4 mx-auto">
          Foodopedia
        </span>

        <hr className="w-screen border-t border-gray-500 lg:mt-0" />
        <h4 className="text-gray-400 text-center w-full lg:text-right pt-2 lg:pb-2 pr-4">
          Add Your Recipe to showcase to the world{" "}
          <button
            className="bg-orange-500 text-gray-700 hover:bg-orange-400 py-1 px-4 rounded cursor-pointer"
            onClick={() => AddFood()}
          >
            Add
          </button>
        </h4>
        <hr className="w-screen border-t border-gray-500 mt-2 lg:mt-0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4">
        {searchQuery ? (
            // If searchQuery is not empty, use filtered recipes
            filteredRecipes.map((recipe) => (
              <div  key={recipe._id} onClick={()=>openFood(recipe._id)}>
              <FoodCard
                id={recipe._id}
                dull={addFoodInput}
                createdBy={recipe.createdBy.firstName}
                ingredients={recipe.ingredients}
                recipeDescription={recipe.recipeDescription}
                recipeName={recipe.recipeName}
                recipePhoto={recipe.recipePhoto}
                steps={recipe.steps}
                
              />
              </div>
            ))
          ) : (
            // If searchQuery is empty, use all recipes
            reciepeData.map((recipe) => (
              <div  key={recipe._id} onClick={()=>openFood(recipe._id)}>
              <FoodCard
              id={recipe._id}
                dull={addFoodInput}
                createdBy={recipe.createdBy.firstName}
                ingredients={recipe.ingredients}
                recipeDescription={recipe.recipeDescription}
                recipeName={recipe.recipeName}
                recipePhoto={recipe.recipePhoto}
                steps={recipe.steps}
                
              />
              </div>
            ))
          )}

       
        </div>
      </div>

      {addFoodInput && (
        <div className="bg-gray-700 fixed overflow-y-auto max-h-screen mb-8 w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 box-sizing-border rounded-xl ">
          <button
            className="absolute top-0 right-0 m-4 p-2 text-gray-400 hover:text-gray-200 cursor-pointer"
            onClick={handleCloseAddFood}
          >
            <AiOutlineClose className="text-xl" />
          </button>
          <div className="flex flex-col justify-center items-center gap-5 mt-10 w-full">
            <div className="flex w-full gap-4 justify-between items-center">
              <label
                htmlFor="recipeName"
                className="block font-medium  text-lg mb-2 w-1/4"
              >
                Recipe Name
              </label>
              <input
                type="text"
                id="recipeName"
                className="w-3/4 p-2 border outline-none rounded"
                placeholder="Enter recipe name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </div>

            <div className="flex w-full gap-4 justify-between items-center">
              <label
                htmlFor="recipeDescription"
                className="block font-medium text-lg mb-2 w-1/4"
              >
                Description
              </label>
              <textarea
                id="recipeDescription"
                className="w-3/4 p-2 border outline-none  rounded"
                placeholder="Enter recipe description"
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
              />
            </div>

            <div className="flex w-full gap-4 justify-between items-center">
              <label
                htmlFor="recipePhoto"
                className="block font-medium text-lg mb-2 w-1/4"
              >
                Photo Upload
              </label>
              <input
                type="file"
                id="recipePhoto"
                accept="image/*"
                className="cursor-pointer w-3/4 p-2 outline-none rounded"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex w-full gap-4">
              <label
                htmlFor="recipePhoto"
                className="block font-medium text-lg mb-2 w-1/4"
              >
                Ingredients
              </label>
              <div className="w-3/4 flex flex-wrap gap-2 items-start">
                {ingredientInputs.map((ingredient, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      className="p-2 outline-none rounded mb-2 "
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                    />
                    {index >= 1 && ( // Display subtract icon when index is greater than 2
                      <button
                        className="text-red-600 p-2 rounded cursor-pointer flex items-center justify-center"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="text-green-600 p-2 rounded cursor-pointer flex items-center justify-center"
                  onClick={handleAddIngredient}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="flex w-full gap-4">
              <label
                htmlFor="recipeSteps"
                className="block font-medium text-lg mb-2 w-1/4"
              >
                Steps
              </label>
              <div className="w-3/4 flex flex-wrap gap-2 items-start">
                {stepInputs.map((step, index) => (
                  <div key={index} className="flex items-center w-full">
                    <textarea
                      type="text"
                      className="w-[96%] p-2 outline-none rounded mb-2  "
                      placeholder={`Step ${index + 1}`}
                      value={step}
                      onChange={(e) => {
                        const newSteps = [...stepInputs];
                        newSteps[index] = e.target.value;
                        setStepInputs(newSteps);
                      }}
                    />
                    {index >= 1 && (
                      <button
                        className="text-red-600 p-2 rounded cursor-pointer flex items-center justify-center"
                        onClick={() => handleRemoveStep(index)}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="text-green-600 p-2 rounded cursor-pointer flex items-center justify-center"
                  onClick={handleAddStep}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <button
              className="bg-green-500 text-gray-800  border border-green-600 py-2 px-4 rounded cursor-pointer hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
