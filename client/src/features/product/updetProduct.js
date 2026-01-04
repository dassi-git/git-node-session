/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import { useUppdateProductMutation } from "./productSlice"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
        
    

                
const UpdetProduct=()=>{
    const [value, setValue] = useState('');
    const [register, { isError, isSuccess, error, isLoading }] = useUppdateProductMutation()

    const navigate=useNavigate();
    const [formDate, setFromDate] = useState({
        id:"",
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
               <h2>עדכון מוצר</h2>
                 {isError && JSON.stringify(error)}
               <form onSubmit={(e) => submit(e)}>
               <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="id"  onChange={(e) => change(e)} type="text" name="id" required/>
                <label htmlFor="id">id</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="name"  onChange={(e) => change(e)} type="text" name="name" />
                <label htmlFor="name">name</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="price"  onChange={(e) => change(e)}type="namber"  name="price"  />
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
                <InputText id="image"  onChange={(e) => change(e)}type="text" name="image"  required />
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
export default UpdetProduct
