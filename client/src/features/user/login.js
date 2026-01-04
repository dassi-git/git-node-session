import { useEffect, useState } from "react";
import { useLoginMutation } from "./userSlice";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { setToken } from "./authSlice";
/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
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
    login(formDate)
}

    return (
        <>
               <h2>התחברות</h2>
                 {isError && (
                    <div style={{ 
                        padding: '12px 15px', 
                        marginBottom: '20px', 
                        backgroundColor: '#fee', 
                        border: '1px solid #fcc', 
                        borderRadius: '5px', 
                        color: '#c00',
                        textAlign: 'center'
                    }}>
                        <strong>שגיאה בהתחברות:</strong> {error?.data?.message || error?.error || 'שם משתמש או סיסמה שגויים'}
                    </div>
                 )}
                 {isSuccess && (
                    <div style={{ 
                        padding: '12px 15px', 
                        marginBottom: '20px', 
                        backgroundColor: '#efe', 
                        border: '1px solid #cfc', 
                        borderRadius: '5px', 
                        color: '#060',
                        textAlign: 'center'
                    }}>
                        <strong>התחברות מוצלחת!</strong> מעביר אותך לדף הראשי...
                    </div>
                 )}
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

