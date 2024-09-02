import { configureStore } from '@reduxjs/toolkit';
import CardSlice from './slice/userSlice' 


const store = configureStore({
    reducer: {
        posts : CardSlice
    },
});

export default store;