import { createApi, fetchBaseQuery } from
"@reduxjs/toolkit/query/react";
const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8888/api/",
        credentials:"include",
        prepareHeaders:(Headers,{getState})=>{
            const token=getState().auth.token
            if(token){
                Headers.set("authorization", `Bearer ${token}`)
            }
            return Headers
        }
    }),
    endpoints:()=>({})
})
export default apiSlice