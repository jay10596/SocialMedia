import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import themeReducer from "./reducers/Theme";
import socialMediaReducer from "./reducers/SocialMedia";

const Store = configureStore({
    reducer: {
        theme: themeReducer,
        socialMedia: socialMediaReducer
    },
    middleware: [thunk]
})

export default Store