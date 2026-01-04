import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "../features/user/apiSlice"
import {setupListeners} from "@reduxjs/toolkit/query"
import authSlice from "../features/user/authSlice"
const store=configureStore({
    reducer:{
        auth:authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
      
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})
export default store
setupListeners(store.dispatch)
