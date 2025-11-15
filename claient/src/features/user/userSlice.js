import apiSlice from "./apiSlice";

const userSlice=apiSlice.injectEndpoints({
    endpoints: (build)=>({
        // כניסה
        login:build.mutation({
            query:(user)=>({
                url:"/user/login",
                method:"POST",
                body:user
            })
        }),
        //הרשמה
        register:build.mutation({
            query:(user)=>({
                url:"/user/register",
                method:"POST",
                body:user
            })
        })

    })
})
export const {useLoginMutation,useRegisterMutation}=userSlice