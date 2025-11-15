
import { useDelateProductMutation } from "./productSlice"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
        
    

                
const DeletProduct=()=>{
    // const [value, setValue] = useState('');
    const [register, { isError, isSuccess, error, isLoading }] = useDelateProductMutation()


    const navigate=useNavigate();

    const [formDate, setFromDate] = useState("")

    useEffect(() => {
        if (isSuccess) {
            navigate("/allProdact")
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
    console.log(formDate);
    e.preventDefault();
    register(formDate)
}


    return (
        <>
               <h2>הוספת מוצר</h2>
                 {isError && JSON.stringify(error)}
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
// const DeletProduct2=(id)=>({
  
//     register(id)



// })

export default DeletProduct