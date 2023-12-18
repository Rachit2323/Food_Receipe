import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getrecipedata, recipedata } from "../../Reducers/Reciepe";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const RecipeDetail = () => {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const [data, setData] = useState({
    recipeName: "",
    recipeDescription: "",
    overview: [{ name: "", description: "" }],
    ingredients: [{ name: "", description: "" }],
    steps: [""],
  });

  const [imageprev, setImagePrev] = useState(null);

  ///////////////////////
  const handleSave = () => {
    setEditMode(false);
  };

  // to delete all data
  const handleDelete = () => {};

  const handleEdit = () => {
    setEditMode(true);
  };

  //////////////////////
  const handleShowAllIngredients = () => {
    setShowAllIngredients(!showAllIngredients);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const { successallreceipe, createreceipe, currentreceipe } = useSelector(
    (state) => state.reciepe
  );

  useEffect(() => {
    if (createreceipe) {
      console.log(currentreceipe);
      setData(currentreceipe);
      setImagePrev(currentreceipe?.recipePhoto?.secure_url);
      setEditMode(false);
    }
  }, [currentreceipe, createreceipe]);

  ///////////////// Overview /////////////////

  const handleAddOverview = () => {
    const newData = { ...data };

    newData.overview.push({ name: "", description: "" });

    setData(newData);
  };

  const handleDeleteOverview = (index) => {
    const newData = { ...data };

    // Remove the overview at the specified index
    newData.overview.splice(index, 1);

    setData(newData);
  };

  //////////////// ingredients ///////////////////////
  const handleOverviewChange = (e, index) => {
    if (e !== undefined && e.target) {
      const type = e.target.name;
      const value = e.target.value;

      const newData = { ...data };
      const modifiedOverview = { ...newData.overview[index] };

      if (type === "name") {
        modifiedOverview.name = value;
      } else if (type === "description") {
        modifiedOverview.description = value;
      }

      const newOverview = [...newData.overview];
      newOverview[index] = modifiedOverview;

      newData.overview = newOverview;

      setData(newData);
    }
  };

  const handleIngredientChange = (e, index) => {
    if (e !== undefined && e.target) {
      const type = e.target.name;
      const value = e.target.value;

      const newData = { ...data };
      const modifiedIngredient = { ...newData.ingredients[index] };

      if (type === "name") {
        modifiedIngredient.name = value;
      } else if (type === "description") {
        modifiedIngredient.description = value;
      }

      const newIngredients = [...newData.ingredients];
      newIngredients[index] = modifiedIngredient;

      newData.ingredients = newIngredients;

      setData(newData);
    }
  };

  const handleAddIngredient = () => {
    const newData = { ...data };

    // Add an empty ingredient to the ingredients array
    newData?.ingredients?.push({ name: "", description: "" });

    setData(newData);
  };

  const handleDeleteIngredient = (index) => {
    const newData = { ...data };

    newData.ingredients.splice(index, 1);

    setData(newData);
  };

  const handleAddStep = () => {
    const newData = { ...data };

    newData.steps.push("");

    setData(newData);
  };

  const handleStepChange = (e, index) => {
    const newData = { ...data };

    newData.steps[index] = e.target.value;

    setData(newData);
  };

  const handleDeleteStep = (index) => {
    const newData = { ...data };

    newData.steps.splice(index, 1);

    setData(newData);
  };

  const AddButton = ({ name, addFun }) => (
    <>
      {editMode && (
        <div>
          <button className="w-40 bg-cyan-600 rounded-md p-1" onClick={addFun}>
            <p className="text-white text-xs font-medium font-['Roboto']">
              Add {name}
            </p>
          </button>
        </div>
      )}
    </>
  );
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
        recipeName: data.recipeName,
        recipeDescription: data.recipeDescription,
        updatedPostData,
        ingredientInputs: data.ingredients,
        stepInputs: data.steps,
        overviewInputs: data.overview,
      })
    );
  };

  return (
    <div className="">
      <div className="w-full">
        <div className="w-full h-full left-0 top-0 absolute  rounded-2xl" />
        <div className="w-full h-96 left-[4.32px] top-[6.71px] absolute  rounded-2xl" />
      </div>
      <div className=" left-[29.13px] top-[16.19px] absolute text-gray-400 text-4xl font-serif p-5">
        Receipe By :Rachit Sharma
      </div>

      <div className="w-full absolute top-16 md:top-32">
        <div className="h-96 p-2 mx-0 lg:ml-16  flex flex-col gap-2 md:flex-row ">
          <div className="w-full lg:w-2/3">
            <div className="w-full  md:p-4  rounded-2xl ">
              <div className=" rounded-2xl p-4">
                <div className="w-full">
                  {
                    <div className="w-full flex gap-2 justify-end">
                      <button
                        className="w-16 bg-red-400 rounded-md p-1 flex items-center justify-center"
                        onClick={handleDelete}
                      >
                        <AiOutlineDelete className="text-white" />
                      </button>

                      {editMode ? (
                        <button
                          className="w-16 bg-green-500 rounded-md p-1 flex items-center justify-center"
                          onClick={handleSave}
                        >
                          <AiOutlineSave className="text-white" />
                        </button>
                      ) : (
                        <button
                          className="w-16 bg-cyan-500 rounded-md p-1 flex items-center justify-center"
                          onClick={handleEdit}
                        >
                          <AiOutlineEdit className="text-white" />
                        </button>
                      )}
                    </div>
                  }

                  {editMode ? (
                    <input
                      className="h-10 w-full text-neutral-700 text-2xl font-extrabold outline-none bg-gray-400 mt-4"
                      type="text"
                      name="recipeName"
                      placeholder="Enter recipe name..."
                      value={data?.recipeName || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="h-10 w-full text-gray-200 text-2xl font-extrabold">
                      {data?.recipeName}
                    </div>
                  )}

                  {editMode ? (
                    <textarea
                      className="w-full p-2 md:w-4/5 mt-2 text-neutral-200 text-justify text-sm font-normal font-['Roboto'] outline-none leading-none bg-gray-400"
                      name="recipeDescription"
                      value={data.recipeDescription || ""}
                      placeholder="Enter recipeDescription..."
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="md:w-4/5 text-neutral-500 text-justify text-sm font-normal font-['Roboto'] leading-none">
                      {data?.recipeDescription}
                    </div>
                  )}
                  {/* image */}

                  <img
                    className="mt-4 mb-4 lg:hidden h-60 shadow-2xl w-1/3 object-cover rounded-2xl"
                    src={imageprev}
                    alt="..."
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="w-40 h-5 text-neutral-400 text-xl font-extrabold ">
                    Overview
                  </div>
                  <div className="md:w-96 mt-2 grid grid-cols-2 gap-2">
                    {data?.overview?.map((item, index) => (
                      <div
                        key={index}
                        className={`w-full h-auto gap-2 flex relative `}
                      >
                        {editMode && (
                          <div
                            className="absolute -left-2 -top-2 rounded text-white bg-red-400"
                            onClick={() => handleDeleteOverview(index)}
                          >
                            <AiOutlineDelete />
                          </div>
                        )}

                        <div className="w-12 h-10 bg-white rounded-lg shadow">
                          <div className="w-12 h-10 bg-blue-50 rounded-lg" />
                        </div>
                        <div>
                          {editMode ? (
                            <>
                              <input
                                className="text-xs w-full font-medium text-neutral-700"
                                disabled={!editMode}
                                name="name"
                                placeholder="name..."
                                value={item?.name || ""}
                                onChange={(e) => handleOverviewChange(e, index)}
                              />
                              <textarea
                                className="text-xs w-full font-medium text-neutral-400"
                                disabled={!editMode}
                                name="description"
                                placeholder="description..."
                                value={item.description || ""}
                                onChange={(e) => handleOverviewChange(e, index)}
                              />
                            </>
                          ) : (
                            <>
                              <div className="text-xs font-medium text-neutral-700">
                                {item?.name}
                              </div>
                              <div className="text-xs font-medium text-neutral-400">
                                {item?.description}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* add overview */}
                  <AddButton name={"overview"} addFun={handleAddOverview} />

                  {/* Ingredients */}
                  <div className="w-40 h-5 text-neutral-400 text-xl font-extrabold ">
                    Ingredients
                  </div>
                  <div className="md:w-96 mt-2 grid grid-cols-2 gap-2">
                    {data?.ingredients?.map((ingredient, index) => (
                      <div
                        key={index} // Add key prop here
                        className={`w-full h-auto gap-2 flex relative  ${
                          index >= 4 &&
                          !showAllIngredients &&
                          !editMode &&
                          "hidden"
                        }`}
                      >
                        {editMode && (
                          <div
                            className="absolute -left-2 -top-2 rounded text-white bg-red-400"
                            onClick={() => handleDeleteIngredient(index)}
                          >
                            <AiOutlineDelete />
                          </div>
                        )}

                        <div className="w-12 h-10 bg-white rounded-lg shadow">
                          <div className="w-12 h-10 bg-blue-50 rounded-lg" />
                        </div>
                        <div>
                          {editMode ? (
                            <>
                              <input
                                className="text-xs w-full font-medium text-neutral-700"
                                disabled={!editMode}
                                name="name"
                                placeholder="name..."
                                value={ingredient?.name || ""}
                                onChange={(e) =>
                                  handleIngredientChange(e, index)
                                }
                              />
                              <textarea
                                className="text-xs w-full font-medium text-neutral-400"
                                disabled={!editMode}
                                name="description"
                                placeholder="description..."
                                value={ingredient?.description || ""}
                                onChange={(e) =>
                                  handleIngredientChange(e, index)
                                }
                              />
                            </>
                          ) : (
                            <>
                              <div className="text-xs font-medium text-neutral-700">
                                {ingredient?.name}
                              </div>
                              <div className="text-xs font-medium text-neutral-400">
                                {ingredient?.description}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* add ingredient */}
                  <AddButton name={"ingredient"} addFun={handleAddIngredient} />

                  {/* show all button */}
                  {!editMode && (
                    <button
                      className="w-40 bg-cyan-600 rounded-md p-1"
                      onClick={handleShowAllIngredients}
                    >
                      <p className="text-white text-xs font-medium font-['Roboto']">
                        {showAllIngredients ? "Hide" : "Show All Ingredients"}
                      </p>
                    </button>
                  )}

                  {/* Steps */}
                  <div className="">
                    <div className="flex flex-col gap-4">
                      <div className="w-40 h-5 text-neutral-400 text-xl font-extrabold ">
                        Steps
                      </div>
                      <div className=" mt-2 grid grid-cols-1 gap-2 list-decimal">
                        {data?.steps?.map((step, index) => (
                          <li
                            key={index}
                            className={`w-full h-auto gap-2 flex items-center `}
                          >
                            <div className="text-sm w-full font-medium text-justify text-neutral-400">
                              {editMode ? (
                                <div className="flex gap-1 items-center">
                                  <span onClick={() => handleDeleteStep(index)}>
                                    <AiOutlineDelete />
                                  </span>
                                  <span>{index + 1}. </span>
                                  <input
                                    className="w-full"
                                    value={step || ""}
                                    onChange={(e) => handleStepChange(e, index)}
                                  />
                                </div>
                              ) : (
                                <p>{`${index + 1}. ${step}`}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </div>
                    </div>

                    <AddButton name={"step"} addFun={handleAddStep} />
                  </div>
                  {editMode && (
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block md:relative w-1/2 md:w-96 h-full mt-14">
            <img
              className="h-full w-full"
              src="https://pnghq.com/wp-content/uploads/pnghq.com-white-plate-transparent-background.png"
              alt="..."
            />

            {/* Upload section */}
            <div className="absolute inset-0 flex items-center w-full h-full justify-center">
              {editMode ? (
                <>
                  <span
                    className="cursor-pointer text-gray-600 hover:text-red-500"
                    onClick={() =>
                      document.getElementById("recipePhoto").click()
                    }
                  >
                    Put your food here (click)
                  </span>
                  <input
                    type="file"
                    id="recipePhoto"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </>
              ) : (
                <img
                  // className="mt-4 mb-4 h-60 shadow-2xl w-full object-cover rounded-2xl"
                  style={{
                    height: "230px",
                    width: "230px",
                    borderRadius: " 130px",
                  }}
                  src={imageprev}
                  alt="..."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
