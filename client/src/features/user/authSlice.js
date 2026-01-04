import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:localStorage.getItem("token")||"",
        isUserLoggedIn:localStorage.getItem("token")?true:false,
        userFullName:""
    },
    reducers:{
        setToken:(state,action)=>{
            const token=action.payload.token
            state.token=token
            state.isUserLoggedIn=true
            localStorage.setItem("token",token)
        },
        removeToken:(state,action)=>{
            state=""
            state.isUserLoggedIn=false
            localStorage.removeItem("token")
        },
        logOut:(state)=>{
            state.token=""
            state.isUserLoggedIn=false
            state.userFullName=""
            localStorage.removeItem("token")
        }
    }
})
export default authSlice.reducer
export const {setToken,removeToken,logOut}=authSlice.actions
