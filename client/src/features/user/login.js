import { useEffect, useState, useRef } from "react";
import { useLoginMutation } from "./userSlice";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { setToken } from "./authSlice";
/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import {useSelector,useDispatch} from "react-redux"
const Login = () => {
    const toast = useRef(null);
    const dispatch=useDispatch() 
    const [login, { isError, isSuccess, error, data }] = useLoginMutation()
    const navigate=useNavigate();

    const [formDate, setFromDate] = useState({
       
        userName: "",
        password: ""
    })
    useEffect(() => {
        if (isSuccess) {
            toast.current.show({severity:'success', summary: 'הצלחה', detail: 'התחברת בהצלחה!', life: 3000});
            dispatch(setToken(data))
            setTimeout(() => navigate("/allProduct"), 1000);
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError) {
            toast.current.show({
                severity:'error', 
                summary: 'שגיאה בהתחברות', 
                detail: error?.data?.message || error?.error || 'שם משתמש או סיסמה שגויים', 
                life: 5000
            });
        }
    }, [isError])
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
               <Toast ref={toast} />
               <h2>התחברות</h2>
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

