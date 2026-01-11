/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import { useCreateProductMutation } from "./productSlice"
import { useEffect, useState, useRef } from "react";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import './CreateProduct.css';

const CreateProduct=()=>{
    const [register, { isError, isSuccess, error, isLoading }] = useCreateProductMutation()
    const navigate=useNavigate();
    const toast = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        body: "",
        productExit: "",
        image: ""
    })

    useEffect(() => {
        if (isSuccess) {
            toast.current.show({ 
                severity: 'success', 
                summary: 'הצלחה', 
                detail: 'המוצר נוסף בהצלחה', 
                life: 2000 
            });
            setTimeout(() => {
                navigate("/adminproduct")
            }, 2000);
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'שגיאה', 
                detail: error?.data?.message || 'אירעה שגיאה ביצירת המוצר', 
                life: 3000 
            });
        }
    }, [isError])

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
    }

    return (
        <div className="create-product-container">
            <Toast ref={toast} />
            
            {/* Hero Section */}
            <div className="create-product-hero">
                <h1 className="create-product-hero-title">הוספת מוצר חדש</h1>
                <p className="create-product-hero-subtitle">מלא את פרטי המוצר למטה</p>
            </div>

            <div className="create-product-content">
                <Card className="create-product-card">
                    <form onSubmit={handleSubmit} className="create-product-form">
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="name">שם המוצר *</label>
                                <InputText 
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    required
                                    placeholder="הזן שם מוצר"
                                    className="w-full"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="price">מחיר *</label>
                                <InputNumber 
                                    id="price"
                                    value={formData.price}
                                    onValueChange={(e) => handleChange('price', e.value)}
                                    mode="currency"
                                    currency="USD"
                                    locale="en-US"
                                    required
                                    placeholder="0.00"
                                    className="w-full"
                                    min={0}
                                />
                            </div>

                            <div className="form-field full-width">
                                <label htmlFor="body">תיאור</label>
                                <InputTextarea 
                                    id="body"
                                    value={formData.body}
                                    onChange={(e) => handleChange('body', e.target.value)}
                                    rows={4}
                                    placeholder="תיאור המוצר"
                                    className="w-full"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="productExit">מלאי</label>
                                <InputText 
                                    id="productExit"
                                    value={formData.productExit}
                                    onChange={(e) => handleChange('productExit', e.target.value)}
                                    placeholder="כמות במלאי"
                                    className="w-full"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="image">תמונה (URL) *</label>
                                <InputText 
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => handleChange('image', e.target.value)}
                                    required
                                    placeholder="נתיב או URL לתמונה"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button 
                                label="ביטול" 
                                icon="pi pi-times" 
                                onClick={() => navigate('/adminproduct')}
                                className="p-button-outlined p-button-secondary"
                                type="button"
                            />
                            <Button 
                                label={isLoading ? "שומר..." : "שמור מוצר"}
                                icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-check"}
                                type="submit"
                                loading={isLoading}
                                className="create-product-submit-btn"
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
export default CreateProduct