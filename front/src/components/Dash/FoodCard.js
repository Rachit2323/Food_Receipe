import React from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const FoodCard = ({
  id,
  dull,
  recipeName,
  recipeDescription,
  createdBy,
  ingredients,
  recipePhoto,
  steps,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = (id) => {

    navigate(`/edit/${id}`);
  };

  const openFood = (id) => {
    navigate(`/add/${id}`);
  };

  
  return (
    <div
      className={`bg-white w-full h-full  p-4 rounded-md shadow-md transition-transform transform-gpu hover:scale-105 cursor-pointer ${
        dull && "opacity-50"
      }`}
    >
      <div className="mb-4 flex justify-around flex-col h-full">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold  flex text-gray-700 m-0">
            Name: {recipeName}
          </h3>
          <button
            className="bg-green-500 text-white border border-green-600 px-2 flex justify-center items-center rounded-md hover:bg-green-600 cursor-pointer"
            onClick={() => handleButtonClick(id)}
          >
            <AiOutlineEdit />
          </button>
        </div>

        <div onClick={() => openFood(id)}>
          <img
            src={recipePhoto.secure_url}
            alt="Food Photo"
            className="w-full pt-2 h-auto rounded-md shadow-md transition-transform transform-gpu hover:scale-105"
          />
        </div>

        <hr className="border-t border-gray-300 mb-4" />

        <div className="flex items-center justify-between">
          <p className="text-gray-600">Suggested By: {createdBy}</p>
          {/* <button className="text-red-500 hover:text-red-600">
          <FaHeart className="text-xl" />
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
