import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

// const API = "http://localhost:4000/";
const API ="https://food-receipe-henna.vercel.app/";

let initialState = {
  loading: false,
  allreceipe: {},
  successallreceipe: false,
  createreceipe: false,
  currentreceipe: {},
  findReceipedata: {},
  findReceipeSuccess: false,
  deleteSuccess:false,
};

export const recipedata = createAsyncThunk(
  "recipedata",
  async ({
 
    recipeName,
    recipeDescription,
    updatedPostData,
    ingredientInputs,
    stepInputs,
    overviewInputs,
  }) => {
    try {
      const token = localStorage.getItem("token");
      const body = JSON.stringify({
        recipeName,
        recipeDescription,
        updatedPostData,
        ingredientInputs,
        stepInputs,
        overviewInputs,
      });

      const result = await fetch(`${API}receipe/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });
      const data = await result.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const getrecipedata = createAsyncThunk("getrecipedata", async () => {
  try {
    const token = localStorage.getItem("token");

    const result = await fetch(`${API}receipe/allreceipe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const findReceipe = createAsyncThunk("findReceipe", async (id) => {
  try {
    const token = localStorage.getItem("token");

    const result = await fetch(`${API}receipe/find/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const deleteReceipe = createAsyncThunk("deleteReceipe", async (id) => {
  try {
    const token = localStorage.getItem("token");

    const result = await fetch(`${API}receipe/delete/${id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const editdata = createAsyncThunk("editdata", async ({
   id,
  recipeName,
  recipeDescription,
  updatedPostData,
  ingredientInputs,
  stepInputs,
  overviewInputs,
}) => {
  try {
  
    const token = localStorage.getItem("token");
    const body = JSON.stringify({
      id,
      recipeName,
      recipeDescription,
      updatedPostData,
      ingredientInputs,
      stepInputs,
      overviewInputs,
    });
    const result = await fetch(`${API}receipe/edit`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
    const data = await result.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

const reciepeSlice = createSlice({
  name: "reciepe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recipedata.pending, (state) => {
        state.loading = true;
        state.createreceipe = false;
      })
      .addCase(recipedata.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          // state.errorsignup = action.payload.error;
          state.createreceipe = action.payload.success;
        } else {
          // state.errorsignup = action.payload.message;
          state.createreceipe = action.payload.success;
          state.currentreceipe = action.payload.data;
        }
      })
      .addCase(recipedata.rejected, (state) => {
        state.loading = true;
        state.createreceipe = false;
      })
      .addCase(getrecipedata.pending, (state) => {
        state.loading = true;
        state.successallreceipe = false;
      })
      .addCase(getrecipedata.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          // state.errorsignup = action.payload.error;
          state.successallreceipe = action.payload.success;
        } else {
          // state.errorsignup = action.payload.message;
          state.successallreceipe = action.payload.success;
          state.allreceipe = action.payload.data;
        }
      })
      .addCase(getrecipedata.rejected, (state) => {
        state.loading = true;
        state.successallreceipe = false;
      })
      .addCase(findReceipe.pending, (state) => {
        state.loading = true;
        state.findReceipeSuccess = false;
      })
      .addCase(findReceipe.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          // state.errorsignup = action.payload.error;
          state.findReceipeSuccess = action.payload.success;
        } else {
          // state.errorsignup = action.payload.message;
          state.findReceipeSuccess = action.payload.success;
          state.findReceipedata = action.payload.data;
        }
      })
      .addCase(findReceipe.rejected, (state) => {
        state.loading = true;
        state.findReceipeSuccess = false;
      })
      .addCase(deleteReceipe.pending, (state) => {
        state.loading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteReceipe.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          // state.errorsignup = action.payload.error;
          state.deleteSuccess = action.payload.success;
        } else {
          // state.errorsignup = action.payload.message;
          state.deleteSuccess = action.payload.success;

        }
      })
      .addCase(deleteReceipe.rejected, (state) => {
        state.loading = true;
        state.deleteSuccess = false;
      })
      .addCase(editdata.pending, (state) => {
        state.loading = true;
        state.createreceipe = false;
      })
      .addCase(editdata.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          // state.errorsignup = action.payload.error;
          state.createreceipe = action.payload.success;
        } else {
          // state.errorsignup = action.payload.message;
          state.createreceipe = action.payload.success;
          state.currentreceipe = action.payload.data;
        }
      })
      .addCase(editdata.rejected, (state) => {
        state.loading = true;
        state.createreceipe = false;
      })
      
  },
});

export default reciepeSlice.reducer;
