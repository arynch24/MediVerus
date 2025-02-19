import { configureStore } from '@reduxjs/toolkit';
import infoReducer from './infoSlice';

const store = configureStore({
    reducer: {
        info: infoReducer,
    },
});

export default store;

