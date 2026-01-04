// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

/* eslint-disable no-unused-vars */
import { useGetAllProductQuery } from "./productSlice"
import React, { useState, useEffect, useRef } from 'react';
// import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Skeleton } from 'primereact/skeleton';
import { useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
// import { useUppdateProductMutation } from "../basket/basketSlise";
// import DeleteProduct from "./deleteProduct";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import productById from "./productById"
import GetBasket from "../basket/getBasket";
import AddProductToBasket from "../basket/addProductToBasket";
import { useUpdeteProductMutation } from "../basket/basketSlise";

const AllProduct = () => {
    const navigate = useNavigate();
    const { data: products = [], isError, isLoading } = useGetAllProductQuery()
    const [updateProduct, { isLoading: isAddingToCart }] = useUpdeteProductMutation()
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const toast = useRef(null);
    const [addingProductId, setAddingProductId] = useState(null);

    const [layout, setLayout] = useState('grid');
    const addproduct = async (id) => {
        if (!isUserLoggedIn) {
            // שמירת מזהה המוצר ב-sessionStorage
            sessionStorage.setItem('pendingProductId', id);
            
            toast.current.show({ 
                severity: 'warn', 
                summary: 'נדרשת התחברות', 
                detail: 'עליך להירשם או להתחבר כדי לבצע רכישות', 
                life: 3000 
            });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return;
        }
        
        // סימון המוצר שנמצא בתהליך הוספה
        setAddingProductId(id);
        
        try {
            await updateProduct(id).unwrap();
            toast.current.show({ 
                severity: 'success', 
                summary: 'נוסף בהצלחה', 
                detail: 'המוצר נוסף לסל הקניות', 
                life: 2000 
            });
        } catch (error) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'שגיאה', 
                detail: error?.data?.message || 'לא הצלחנו להוסיף את המוצר לסל', 
                life: 3000 
            });
        } finally {
            setAddingProductId(null);
        }
    }


    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };


    const listItem = (product, index) => {
        return (
            <>

                <div className="col-12" key={product.id}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:8888/${product.image} `} alt={product.name} />

                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.name}</div>
                                <Rating value={product.rating} readOnly cancel={false}></Rating>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="font-semibold">{product.body}</span>
                                    </span>
                                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">${product.price}</span>
                                {isUserLoggedIn ? (
                                    <Button 
                                        icon={addingProductId === product._id ? "pi pi-spin pi-spinner" : "pi pi-shopping-cart"}
                                        className="p-button-rounded" 
                                        disabled={product.inventoryStatus === 'OUTOFSTOCK' || addingProductId === product._id} 
                                        onClick={() => { addproduct(product._id) }}
                                        loading={addingProductId === product._id}
                                    />
                                ) : (
                                    <Button 
                                        label="התחבר" 
                                        icon="pi pi-sign-in" 
                                        className="p-button-sm p-button-outlined" 
                                        onClick={() => navigate('/login')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };


    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}  >
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.body}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:8888/${product.image} `} alt={product.name} />

                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        {isUserLoggedIn ? (
                            <Button 
                                icon={addingProductId === product._id ? "pi pi-spin pi-spinner" : "pi pi-shopping-cart"}
                                className="p-button-rounded" 
                                disabled={product.inventoryStatus === 'OUTOFSTOCK' || addingProductId === product._id} 
                                onClick={() => { addproduct(product._id) }}
                                loading={addingProductId === product._id}
                            />
                        ) : (
                            <Button 
                                label="התחבר" 
                                icon="pi pi-sign-in" 
                                className="p-button-sm p-button-outlined" 
                                onClick={() => navigate('/login')}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    const skeletonGridItem = () => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <Skeleton width="8rem" height="1.5rem"></Skeleton>
                        <Skeleton width="5rem" height="1.5rem" borderRadius="16px"></Skeleton>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <Skeleton width="100%" height="200px" borderRadius="8px"></Skeleton>
                        <Skeleton width="80%" height="2rem"></Skeleton>
                        <Skeleton width="6rem" height="1.5rem"></Skeleton>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Skeleton width="5rem" height="2rem"></Skeleton>
                        <Skeleton shape="circle" size="3rem"></Skeleton>
                    </div>
                </div>
            </div>
        );
    };

    const skeletonListItem = () => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <Skeleton width="10rem" height="10rem" borderRadius="8px"></Skeleton>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4" style={{width: '100%'}}>
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3" style={{flex: 1}}>
                            <Skeleton width="80%" height="2rem"></Skeleton>
                            <Skeleton width="6rem" height="1.5rem"></Skeleton>
                            <div className="flex gap-3">
                                <Skeleton width="8rem" height="1.5rem"></Skeleton>
                                <Skeleton width="5rem" height="1.5rem" borderRadius="16px"></Skeleton>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Skeleton width="5rem" height="2rem"></Skeleton>
                            <Skeleton shape="circle" size="3rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="card">
                <Toast ref={toast} />
                {isUserLoggedIn && (
                    <Button onClick={() => navigate('./basket')}>מעבר לסל</Button>
                )}
                <div style={{ marginTop: '1rem' }}>
                    {header()}
                    <div className="grid grid-nogutter">
                        {layout === 'grid' 
                            ? Array.from({ length: 6 }).map((_, i) => <React.Fragment key={i}>{skeletonGridItem()}</React.Fragment>)
                            : Array.from({ length: 4 }).map((_, i) => <React.Fragment key={i}>{skeletonListItem()}</React.Fragment>)
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            {isUserLoggedIn && (
                <Button onClick={() => navigate('./basket')}>מעבר לסל</Button>
            )}
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}

export default AllProduct
