import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:4000/";

let initialState = {
  loading: false,
  errorsignup: "",
  errorsignin: "",
  successsignin: false,
  successsignup: false,
  signupdata: "",
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
  try {
    const result = await fetch(`${API}users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();
    const { token } = data;

    localStorage.setItem("token", token);

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  try {
    const result = await fetch(`${API}users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();
    const { token } = data;

    localStorage.setItem("token", token);

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.successsignup = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          state.errorsignup = action.payload.error;
          state.successsignup = action.payload.success;
        } else {
          state.errorsignup = action.payload.message;
          state.successsignup = action.payload.success;
          state.signupdata = action.payload.data;
        }
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
        state.successsignup = false;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.successsignin = false;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          state.errorsignin = action.payload.error;
          state.successsignin = action.payload.success;
        } else {
          state.errorsignin = action.payload.message;
          state.successsignin = action.payload.success;
        }
      })
      .addCase(signinUser.rejected, (state) => {
        state.loading = false;
        state.successsignin = false;
      });
  },
});

export default authSlice.reducer;
