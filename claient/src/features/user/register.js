import { useEffect, useState } from "react";
import { useRegisterMutation } from "./userSlice";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
        
    

                
const Register = () => {
    const [value, setValue] = useState('');
    const [register, { isError, isSuccess, error, isLoading }] = useRegisterMutation()
    const navigate=useNavigate();

    const [formDate, setFromDate] = useState({
        name: "",
        userName: "",
        password: "",
        adress: "",
        phone: "",
        email: ""
    })
    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
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
    console.log("aaaaa");
    e.preventDefault();
    register(formDate)
}


    return (
        <>
               <h2>Register</h2>
                 {isError && JSON.stringify(error)}
               <form onSubmit={(e) => submit(e)}>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="name"  onChange={(e) => change(e)} type="text" name="name" required/>
                <label htmlFor="name">name</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="userName"  onChange={(e) => change(e)}type="text"  name="userName" required />
                <label htmlFor="userName">userName</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="password" onChange={(e) => change(e)}type="text" name="password" required />
                <label htmlFor="password">password</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="adress"  onChange={(e) => change(e)}type="text" name="adress" required />
                <label htmlFor="adress">adress</label>
            </FloatLabel>
        </div>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="phone" onChange={(e) => change(e)}type="text" name="phone" required />
                <label htmlFor="phone">phone</label>
            </FloatLabel>
            </div>
            <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText onChange={(e) => change(e)}type="text" id="email" name="email" required />
                <label htmlFor="email">email</label>
            </FloatLabel>
        </div>
        {/* <button type="submit">submit</button>  */}
        <div className="card flex justify-content-center">
            <Button label="Submit" type="submit"/>
        </div>
       </form>
          
        </>
    )
}
export default Register