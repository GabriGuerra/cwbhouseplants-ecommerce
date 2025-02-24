import { configureStore } from '@reduxjs/toolkit';
import plantsReducer from './CartSlice';


const store = configureStore({
  reducer: {
    plants: plantsReducer,
    
  },
});

export default store;
