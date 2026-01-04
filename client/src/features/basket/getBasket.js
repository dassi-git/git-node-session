import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useGetBasketQuery, useUpdeteProductMutation } from './basketSlise';
import { useDeleteProductMutation } from "../basket/basketSlise";
import {useDeletebasketMutation}from"../basket/basketSlise"
import { useNavigate } from 'react-router-dom';
export default function GetBasket() {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const { data: basket = [], isSuccess } = useGetBasketQuery()

    useEffect(() => {
        if (isSuccess) {
            setProducts(basket)
        }
    }, [isSuccess, basket]);
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };
    const [register] = useDeleteProductMutation()
    const [deleteBasket] = useDeletebasketMutation()
    const navigate = useNavigate();

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        register(product._id)
        setProducts(_products)
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
         setDeleteProductDialog(false);
        
    };

   
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        //  let _products = products.filter((val) => !selectedProducts.includes(val));

             deleteBasket()
             setProducts([])
             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
             setDeleteProductsDialog(false);
             

    };

    

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {/* <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} /> */}
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`http://localhost:8888/${rowData.image} `} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };
    
    const quntityTemplate = (rowData) => {
    
        // פונקציה שמחזירה כמות
        console.log(rowData.quantity);
        return rowData.quantity;

    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };
    const [plus] = useUpdeteProductMutation()

    const actionBodyTemplate = (rowData) => {
        // console.log("*******",rowData);
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} /> */}
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
                <Button icon="pi pi-minus" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
                <Button icon="pi pi-plus" rounded outlined severity="danger" onClick={() => plus(rowData._id)} />


            </React.Fragment>
        );
    };

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

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            
            {/* Empty basket state */}
            {products.length === 0 ? (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: '60vh',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <i className="pi pi-shopping-cart" style={{ 
                        fontSize: '8rem', 
                        color: '#dee2e6',
                        marginBottom: '1.5rem'
                    }}></i>
                    <h2 style={{ color: '#6c757d', marginBottom: '1rem' }}>
                        הסל שלך ריק
                    </h2>
                    <p style={{ color: '#adb5bd', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        נראה שעדיין לא הוספת מוצרים לסל הקניות
                    </p>
                    <Button 
                        label="חזרה לחנות כדי להתחיל לקנות" 
                        icon="pi pi-arrow-left" 
                        severity="success" 
                        size="large"
                        onClick={() => navigate('/allProduct')}
                        style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}
                    />
                </div>
            ) : (
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                        {/* סימון v */}
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                        <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="quntity" header="quntity" body={quntityTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="body" header="body" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                </div>
            )}

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete your entire shopping cart?</span>}
                </div>
            </Dialog>
        </div>
    );
}        