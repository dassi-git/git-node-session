import apiSlice from "../user/apiSlice"
const productSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAllProduct:build.query({
            query:()=>({
                url:"/product"
            })
        }),
        getProductId:build.query({
            query:(product)=>({
                url:"/product/id",
                body:product
            })
        }),

        delateProduct:build.mutation({
            query:(id)=>({
                url:`/product/${id}`,
                method:"DELETE",
                // body:id
                
                
            })
        }),
        uppdateProduct:build.mutation({
            query:(product)=>({
                url:"/product",
                method:"PUT",
                body:product
            })
        }),

        createProduct:build.mutation({
            query:(product)=>({
                url:"/product",
                method:"POST",
                body:product
            })
        })
    })

})
export const{useGetAllProductQuery,useGetProductIdQuery,useDelateProductMutation,useUppdateProductMutation,useCreateProductMutation}=productSlice

