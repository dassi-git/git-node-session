import { createApi, fetchBaseQuery } from
"@reduxjs/toolkit/query/react";
import { logOut } from './authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl:"http://localhost:8888/api/",
    credentials:"include",
    prepareHeaders:(Headers,{getState})=>{
        const token=getState().auth.token
        if(token){
            Headers.set("authorization", `Bearer ${token}`)
        }
        return Headers
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    
    // Get the endpoint URL
    const url = typeof args === 'string' ? args : args.url;
    
    // Don't show token expiry message for login/register endpoints
    const isAuthEndpoint = url?.includes('/user/login') || url?.includes('/user/register');
    
    if (result?.error?.status === 401 && !isAuthEndpoint) {
        // Token expired or invalid (only for authenticated requests)
        alert('החיבור פקע, נא להתחבר מחדש');
        api.dispatch(logOut());
        window.location.href = '/login';
    }
    
    return result;
};

const apiSlice=createApi({
    reducerPath:"api",
    baseQuery: baseQueryWithReauth,
    endpoints:()=>({})
})
export default apiSlice