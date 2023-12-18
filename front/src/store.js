import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/auth'; 
import reciepeReducer from "./Reducers/Reciepe.js";
// import postReducer from './Reducers/createpost';

const store = configureStore({
  reducer: {
    user: authReducer,
    reciepe: reciepeReducer, 
  },
});

export default store;