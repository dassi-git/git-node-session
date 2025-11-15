import { useEffect, useState } from "react";
import { useLoginMutation } from "./userSlice";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { setToken } from "./authSlice";
import {useSelector,useDispatch} from "react-redux"
const Login = () => {
    
    const dispatch=useDispatch() 
    const [login, { isError, isSuccess, error, data }] = useLoginMutation()
    const navigate=useNavigate();

    const [formDate, setFromDate] = useState({
       
        userName: "",
        password: ""
    })
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate("/allProdact")
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
    login(formDate)
}

    return (
        <>
               <h2>login</h2>
                 {isError && JSON.stringify(error)}
               <form onSubmit={(e) => submit(e)}>
       
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="userName" value={formDate.userName}  onChange={(e) => change(e)} type="text"  name="userName" required />
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
            <Button label="Submit" type="submit"/>
        </div>
       </form>
          
        </>
    )
}
export default Login

