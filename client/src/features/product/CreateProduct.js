/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import { useCreateProductMutation } from "./productSlice"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';

const CreateProduct=()=>{
    const [register, { isError, isSuccess, error, isLoading }] = useCreateProductMutation()


    const navigate=useNavigate();

    const [formDate, setFromDate] = useState({
        name: "",
        price:0,
        body: "",
        productExit:"",
        image:""
      
    })
    useEffect(() => {
        if (isSuccess) {
            navigate("/allProduct")
        }
    }, [isSuccess])
const change=(e)=>{
    const {name,value}=e.target
    setFromDate({
        ...formDate,
        [name]:value
    })
}
const submit= (e)=>{
    e.preventDefault();
    register(formDate)
}


    return (
        <>
               <h2>הוספת מוצר</h2>
                 {isError && (
                    <div style={{ 
                        padding: '10px', 
                        marginBottom: '15px', 
                        backgroundColor: '#fee', 
                        border: '1px solid #fcc', 
                        borderRadius: '5px', 
                        color: '#c00' 
                    }}>
                        <strong>שגיאה ביצירת המוצר:</strong> {error?.data?.message || error?.error || 'אירעה שגיאה לא צפויה'}
                    </div>
                 )}
               <form onSubmit={(e) => submit(e)}>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="name"  onChange={(e) => change(e)} type="text" name="name" required/>
                <label htmlFor="name">name</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="price"  onChange={(e) => change(e)}type="namber"  name="price" required />
                <label htmlFor="price">price</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="body" onChange={(e) => change(e)}type="text" name="body"  />
                <label htmlFor="body">body</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="productExit"  onChange={(e) => change(e)}type="text" name="productExit"/>
                <label htmlFor="productExit">productExit</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="image"  onChange={(e) => change(e)}type="text" name="image" required/>
                <label htmlFor="image">image</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <Button label="Submit" type="submit"/>
        </div>
       </form>
          
        </>
    )
}
export default CreateProduct
