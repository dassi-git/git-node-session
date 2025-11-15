// import { useGet} from "./productSlice"
// import React, { useState, useEffect } from 'react';
// // import { ProductService } from './service/ProductService';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
// import { classNames } from 'primereact/utils';
// // import { useUppdateProductMutation } from "../basket/basketSlise";
// // import DeletProduct from "./deletProduct";
// import {useNavigate} from "react-router-dom"
// import { Link } from "react-router-dom"
// import productById from "./productById"
// const {data:products=[],isError,isLoading}=useGetAllProductQuery()

// const ProductById=(id)=>{
//     const {data:products=[],isError,isLoading}=useGetAllProductQuery()
//     return(
//         <>
//       <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id} onClick={()=>{click(product._id)}} >
//             <div className="p-4 border-1 surface-border surface-card border-round">
//                 <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//                     <div className="flex align-items-center gap-2">
//                         <i className="pi pi-tag"></i>
//                         <span className="font-semibold">{product.category}</span>
//                     </div>
//                     <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
//                 </div>
//                 <div className="flex flex-column align-items-center gap-3 py-5">
//                     {/* <img className="w-9 shadow-2 border-round"  src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} /> */}
//                     <img className="w-9 shadow-2 border-round"  src={`http://localhost:8888/${product.image} `} alt={product.name} />

//                     <div className="text-2xl font-bold">{product.name}</div>
//                     <Rating value={product.rating} readOnly cancel={false}></Rating>
//                 </div>
//                 <div className="flex align-items-center justify-content-between">
//                     <span className="text-2xl font-semibold">${product.price}</span>
//                     <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                     {/* <Button icon="pi-spi pi-times" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} ></Button> */}
//                 </div>
//             </div>
//         </div>
//         </>

//     )
// }
// export default ProductById


