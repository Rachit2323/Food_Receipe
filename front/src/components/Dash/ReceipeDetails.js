import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import {
  getrecipedata,
  recipedata,
  findReceipe,
  deleteReceipe,
  editdata,
} from "../../Reducers/Reciepe";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../Reducers/auth.js";

const RecipeDetail = ({ edit }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [allreceipedata, setAllReceipeData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [updatedPostData, setUpdatedPostData] = useState(null);

  const [data, setData] = useState({
    recipeName: "",
    recipeDescription: "",
    overview: [{ name: "", description: "" }],
    ingredients: [{ name: "", description: "" }],
    steps: [""],
  });
  const {
    successallreceipe,
    createreceipe,
    currentreceipe,
    findReceipedata,
    findReceipeSuccess,
    deleteSuccess,
    allreceipe,
    loading,
  } = useSelector((state) => state.reciepe);

  const { userdetailsucs, userpost, userdet } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [imageprev, setImagePrev] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id !== "0" && id !== undefined) {
      dispatch(findReceipe(id));
    } else if (id === "0") {
      setEditMode(true);
    }
  }, [id]);

  // useEffect(() => {
  //   if (editMode && id === "0") {

  //   }
  // }, [editMode]);

  const handleDelete = () => {
    dispatch(deleteReceipe(id));
  };

  useEffect(() => {
    if (deleteSuccess) {
      navigate("/dash");
    }
  }, [deleteSuccess]);

  const handleEdit = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (edit) {
      setEditMode(true);
    }
  }, [edit, editMode]);

  useEffect(() => {
    if (id !== "0" && id !== undefined) {
      dispatch(userDetail());
    }
  }, []);

  const handleShowAllIngredients = () => {
    setShowAllIngredients(!showAllIngredients);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (successallreceipe && id !== "0") setAllReceipeData(allreceipe);
  }, [successallreceipe, userdetailsucs, userdet]);

  useEffect(() => {
    if (Array.isArray(allreceipedata) && id !== "0") {
      const matchingRecipe = allreceipedata.find((recipe) => recipe._id === id);
      setCurrentUser(matchingRecipe);
    }
  }, [allreceipedata, id]);

  useEffect(() => {
    if (findReceipeSuccess && id !== "0") {
      setData(findReceipedata);
      setImagePrev(findReceipedata?.recipePhoto?.secure_url);
      setEditMode(false);
    }
  }, [findReceipedata, findReceipeSuccess]);

  useEffect(() => {
    if (id !== "0" && id !== undefined) {
      dispatch(getrecipedata());
    }
  }, []);

  useEffect(() => {
    if (createreceipe && id !== "0") {
      setData(currentreceipe);
      setImagePrev(currentreceipe?.recipePhoto?.secure_url);
      setEditMode(false);
    }
  }, [currentreceipe, createreceipe]);

  const handleAddOverview = () => {
    const newData = { ...data };

    newData.overview = [...newData.overview];

    newData.overview.push({ name: "", description: "" });

    setData(newData);
  };

  const handleDeleteOverview = (index) => {
    const newData = { ...data };

    // Remove the overview at the specified index
    newData.overview.splice(index, 1);

    setData(newData);
  };

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
    const newData = JSON.parse(JSON.stringify(data));
    newData.ingredients.push({ name: "", description: "" });
    setData(newData);
  };

  const handleDeleteIngredient = (index) => {
    const newData = { ...data };

    newData.ingredients.splice(index, 1);

    setData(newData);
  };

  const handleAddStep = () => {
    const newData = { ...data };

    newData.steps = [...newData.steps];

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
          <button
            className="w-40 bg-cyan-600 rounded-md p-1"
            onClick={() => addFun()}
          >
            <p className="text-white text-xs font-medium font-['Roboto']">
              Add {name}
            </p>
          </button>
        </div>
      )}
    </>
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    setImagePreview(file);
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) setImagePreview(Reader.result);
      //2 means image is process and 0 means image is not processed
      setUpdatedPostData(Reader.result);
    };
  };

  const handleUpdate = () => {
    dispatch(
      editdata({
        id,
        recipeName: data.recipeName,
        recipeDescription: data.recipeDescription,
        updatedPostData,
        ingredientInputs: data.ingredients,
        stepInputs: data.steps,
        overviewInputs: data.overview,
      })
    );
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

    // navigate("/dash");
    setEditMode(false);
  };

  if (loading) {
    return <div className="text-white text-3xl">Loading...</div>;
  }

  return (
    <div className="">
      <div className="w-full">
        <div className="w-full h-full left-0 top-0 absolute  rounded-2xl" />
        <div className="w-full h-96 left-[4.32px] top-[6.71px] absolute  rounded-2xl" />
      </div>
      {id !== "0" && (
        <div className="left-[29.13px] top-[16.19px] absolute text-gray-200 lg:text-5xl md:text-4xl xl:text-5xl text-2xl   font-serif p-4 ">
          Receipe By: {currentUser?.createdBy?.firstName}
        </div>
      )}

      <div className="w-full absolute top-16 ">
        <div className="h-96 p-2 mx-0 lg:ml-16  flex flex-col gap-2 md:flex-row ">
          <div className="w-full lg:w-2/3">
            <div className="w-full  md:p-4  rounded-2xl  mt-3">
              <div className=" rounded-2xl p-4">
                <div className="w-full">
                  {userdet._id === currentUser?.createdBy?._id && (
                    <div className="w-full flex gap-2 justify-end">
                      {id !== "0" && (
                        <button
                          className="w-16 bg-red-400 hover:bg-red-600 rounded-md p-2 flex items-center justify-center"
                          onClick={() => handleDelete()}
                        >
                          <AiOutlineDelete className="text-white" />
                        </button>
                      )}

                      {!editMode && (
                        <button
                          className="w-16 bg-cyan-500 rounded-md p-1 flex items-center justify-center"
                          onClick={() => handleEdit()}
                        >
                          <AiOutlineEdit className="text-white" />
                        </button>
                      )}
                    </div>
                  )}

                  {editMode ? (
                    <input
                      className="h-10 w-full text-neutral-800 text-xl font-serif outline-none bg-gray-200 mt-4"
                      type="text"
                      name="recipeName"
                      placeholder="Enter recipe name..."
                      value={data?.recipeName || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="h-10 w-full text-gray-200 text-2xl font-serif">
                      {data?.recipeName}
                    </div>
                  )}

                  {editMode ? (
                    <textarea
                      className="w-full p-2  mt-2 text-neutral-800 text-justify text-sm font-serif  outline-none leading-none bg-gray-200"
                      name="recipeDescription"
                      value={data.recipeDescription || ""}
                      placeholder="Enter recipe Description"
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="md:w-4/5 text-gray-300 text-justify text-sm font-normal font-['Roboto'] leading-none">
                      {data?.recipeDescription}
                    </div>
                  )}
                  {/* image */}

                  {editMode ? (
                    <>
                      {imagePreview === null && (
                        <>
                          {" "}
                          <label
                            htmlFor="recipePhoto"
                            className="cursor-pointer lg:hidden text-red-600 hover:text-red-900"
                          >
                            Put your food here (click)
                          </label>
                          <input
                            type="file"
                            id="recipePhoto"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </>
                      )}
                      {imagePreview && (
                        <img
                          style={{
                            height: "230px",
                            width: "230px",
                            borderRadius: "10px",
                          }}
                          className="lg:hidden"
                          src={imagePreview}
                          alt="Uploaded Food"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      // style={{ width: "100%", objectFit: "contain" }}
                      className="mt-4 mb-4 lg:hidden h-60 shadow-2xl  w-full md:w-1/2  sm:w-1/2 bg-white object-contain rounded-3xl"

                      src={imageprev || imagePreview}
                      alt="..."
                    />
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="w-50 h-5 text-gray-200 text-2xl font-extrabold  mt-3 underline">
                    Overview
                  </div>
                  <div className="md:w-96 mt-2 grid grid-cols-2 gap-4">
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
                            <AiOutlineDelete style={{ cursor: "pointer" }} />
                          </div>
                        )}

                        {/* <div className="w-12 h-10 bg-white rounded-lg shadow">
                          <div className="w-12 h-10 bg-blue-50 rounded-lg" />
                        </div> */}
                        <div className="hover:scale-125 cursor-pointer">
                          {editMode ? (
                            <>
                              <input
                                className="text-xs w-full font-medium text-neutral-700 outline-none"
                                disabled={!editMode}
                                name="name"
                                placeholder="eg: Time"
                                value={item?.name || ""}
                                onChange={(e) => handleOverviewChange(e, index)}
                              />
                              <textarea
                                className="text-xs w-full font-medium text-neutral-700 outline-none"
                                disabled={!editMode}
                                name="description"
                                placeholder="eg: 1 min"
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
                  <div className="w-50 h-5 text-gray-200 text-2xl font-extrabold  mt-3 underline">
                    Ingredients
                  </div>
                  <div className="md:w-96 mt-2 grid grid-cols-2 gap-4">
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
                            <AiOutlineDelete style={{ cursor: "pointer" }} />
                          </div>
                        )}

                        {/* <div className="w-12 h-10 bg-white rounded-lg shadow">
                          <div className="w-12 h-10 bg-blue-50 rounded-lg" />
                        </div> */}
                        <div className="hover:scale-125 cursor-pointer">
                          {editMode ? (
                            <>
                              <input
                                className="text-xs w-full font-medium outline-none text-neutral-700"
                                disabled={!editMode}
                                name="name"
                                placeholder="name..."
                                value={ingredient?.name || ""}
                                onChange={(e) =>
                                  handleIngredientChange(e, index)
                                }
                              />
                              <textarea
                                className="text-xs w-full font-medium outline-none text-neutral-700"
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
                  <AddButton
                    name={"ingredient"}
                    addFun={handleAddIngredient}
                    style={{ cursor: "pointer" }}
                  />

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
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-4">
                      <div className="w-50 h-5 text-gray-200 text-2xl font-extrabold underline">
                        Steps
                      </div>
                      <div className=" mt-2 grid grid-cols-1 gap-4 list-decimal">
                        {data?.steps?.map((step, index) => (
                          <li
                            key={index}
                            className={`w-full h-auto gap-2 flex items-center `}
                          >
                            <div className="text-sm w-full font-medium text-justify text-neutral-400">
                              {editMode ? (
                                <div className="flex gap-1 items-center">
                                  <span onClick={() => handleDeleteStep(index)}>
                                    <AiOutlineDelete
                                      style={{ cursor: "pointer" }}
                                    />
                                  </span>
                                  <span>{index + 1}. </span>
                                  <input
                                    className="w-full outline-none text-neutral-700"
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
                  {editMode &&
                    (id !== "0" ? (
                      <button
                        onClick={() => handleUpdate()}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSubmit()}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        Submit
                      </button>
                    ))}
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
                  {imagePreview === null && (
                    <>
                      {" "}
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
                  )}
                  {imagePreview && (
                    <img
                      style={{
                        height: "230px",
                        width: "230px",
                        borderRadius: "130px",
                      }}
                      src={imagePreview}
                      alt="Uploaded Food"
                    />
                  )}
                </>
              ) : (
                <img
                  // className="mt-4 mb-4 h-60 shadow-2xl w-full object-cover rounded-2xl"
                  style={{
                    height: "230px",
                    width: "230px",
                    borderRadius: " 130px",
                  }}
                  src={imageprev || imagePreview}
                  alt="ssss"
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
