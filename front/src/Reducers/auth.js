import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

// const API = "http://localhost:4000/";
const API ="https://food-receipe-henna.vercel.app/";


let initialState = {
  loading: false,
  errorsignup: "",
  errorsignin: "",
  successsignin: false,
  successsignup: false,
  logoutstate:false,
  signupdata: "",
  userpost: {},
  userdet: {},
  userdetailsucs: false,
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

export const userDetail = createAsyncThunk("userDetail", async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}users/details`, {
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

export const logout = createAsyncThunk("logout", async () => {
  try {
    // const result = await fetch(`${API}users/details`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    localStorage.clear();

    // return data;
  } catch (error) {
    return { error: error.message };
  }
});

const authSlice = createSlice({
  name: "user",
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
          state.logoutstate=false;
        }
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = true;
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
          state.logoutstate=false;
        }
      })
      .addCase(signinUser.rejected, (state) => {
        state.loading = true;
        state.successsignin = false;
      })
      .addCase(userDetail.pending, (state) => {
        state.loading = true;
        state.userdetailsucs = false;
      })
      .addCase(userDetail.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
        } else {
          state.userpost = action.payload.data.allPosts;
          state.userdet = action.payload.data.user;
          state.userdetailsucs = action.payload.success;
        }
      })
      .addCase(userDetail.rejected, (state) => {
        state.loading = true;
        state.userdetailsucs = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.successsignin=false;
        state.successsignup = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        // state.errorsignin ="Logout"
        state.loading = false;
        state.successsignup = false;
        state.successsignin=false;
        state.logoutstate=true;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = true;
        state.successsignin=false;
        state.successsignup = false;
      });
  },
});

export default authSlice.reducer;
