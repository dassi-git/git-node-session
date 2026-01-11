
/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import { useDelateProductMutation } from "./productSlice"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
        
    

                
const DeleteProduct=()=>{
    // const [value, setValue] = useState('');
    const [register, { isError, isSuccess, error, isLoading }] = useDelateProductMutation()


    const navigate=useNavigate();

    const [formDate, setFromDate] = useState("")

    useEffect(() => {
        if (isSuccess) {
            navigate("/allProduct")
        }
    }, [isSuccess])
// const change=(e)=>{
//     const {name,value}=e.target
//     setFromDate({
//         ...formDate,
//         [name]:value
//     })
// }
const submit= (e)=>{
    e.preventDefault();
    register(formDate)
}


    return (
        <>
               <h2>מחיקת מוצר</h2>
                 {isError && (
                    <div style={{ 
                        padding: '10px', 
                        marginBottom: '15px', 
                        backgroundColor: '#fee', 
                        border: '1px solid #fcc', 
                        borderRadius: '5px', 
                        color: '#c00' 
                    }}>
                        <strong>שגיאה במחיקת המוצר:</strong> {error?.data?.message || error?.error || 'אירעה שגיאה לא צפויה'}
                    </div>
                 )}
               <form onSubmit={(e) => submit(e)}>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="id"  onChange={(e) => setFromDate(e.target.value)} type="text" name="id" required/>
                <label htmlFor="id">id</label>
            </FloatLabel>
        </div>
      
        <div className="card flex justify-content-center">
            <Button label="Submit" type="submit"/>
        </div>
       </form>
          
        </>
    )
}
// const [register, { isError, isSuccess, error, isLoading }] = useDelateProductMutation()
// const DeleteProduct2=(id)=>({
  
//     register(id)



// })

export default DeleteProduct