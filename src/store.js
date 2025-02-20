import { configureStore } from '@reduxjs/toolkit';
import plantsReducer from './plantsSlice';


const store = configureStore({
  reducer: {
    plants: plantsReducer,
    
  },
});

export default store;
