import { useEffect, useState, useRef } from "react";
import { useLoginMutation } from "./userSlice";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { setToken } from "./authSlice";
import { useUpdeteProductMutation } from "../basket/basketSlise";
/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import {useSelector,useDispatch} from "react-redux"
const Login = () => {
    const toast = useRef(null);
    const dispatch=useDispatch() 
    const [login, { isError, isSuccess, error, data }] = useLoginMutation()
    const [updateProduct] = useUpdeteProductMutation()
    const navigate=useNavigate();

    const [formDate, setFromDate] = useState({
       
        userName: "",
        password: ""
    })
    useEffect(() => {
        if (isSuccess) {
            toast.current.show({severity:'success', summary: 'הצלחה', detail: 'התחברת בהצלחה!', life: 3000});
            dispatch(setToken(data))
            
            // בדיקה אם יש מוצר ממתין להוספה
            const pendingProductId = sessionStorage.getItem('pendingProductId');
            if (pendingProductId) {
                // הוספת המוצר לסל עם טיפול בשגיאות
                updateProduct(pendingProductId)
                    .unwrap()
                    .then((response) => {
                        // ניקוי ה-sessionStorage
                        sessionStorage.removeItem('pendingProductId');
                        
                        // הצגת הודעת הצלחה
                        setTimeout(() => {
                            toast.current.show({
                                severity:'success', 
                                summary: 'המוצר נוסף לסל', 
                                detail: response.message || 'המוצר שבחרת נוסף לסל הקניות', 
                                life: 3000
                            });
                        }, 1200);
                        
                        // מעבר לדף הסל
                        setTimeout(() => navigate("/allProduct/basket"), 2000);
                    })
                    .catch((error) => {
                        // טיפול בשגיאות - אם המוצר אזל
                        sessionStorage.removeItem('pendingProductId');
                        
                        setTimeout(() => {
                            if (error.data?.outOfStock) {
                                toast.current.show({
                                    severity:'error', 
                                    summary: 'המוצר אזל מהמלאי', 
                                    detail: `מצטערים, ${error.data.productName || 'המוצר'} אזל מהמלאי במהלך ההתחברות`, 
                                    life: 5000
                                });
                            } else {
                                toast.current.show({
                                    severity:'error', 
                                    summary: 'שגיאה', 
                                    detail: error.data?.message || 'לא הצלחנו להוסיף את המוצר לסל', 
                                    life: 4000
                                });
                            }
                        }, 1200);
                        
                        // מעבר לדף המוצרים
                        setTimeout(() => navigate("/allProduct"), 2500);
                    });
            } else {
                // אם אין מוצר ממתין, מעבר רגיל לדף המוצרים
                setTimeout(() => navigate("/allProduct"), 1000);
            }
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError && error) {
            // הצגת השגיאה הספציפית מהשרת
            let errorMessage = 'שם משתמש או סיסמה שגויים';
            
            // בדיקה של מבנה השגיאה והצגת ההודעה הספציפית
            if (error.data?.message) {
                // הודעה מהשרת (Backend)
                errorMessage = error.data.message;
            } else if (error.error) {
                // שגיאת רשת או שגיאה אחרת
                errorMessage = error.error;
            } else if (error.status) {
                // שגיאה לפי סטטוס
                switch(error.status) {
                    case 400:
                        errorMessage = 'יש למלא את כל השדות';
                        break;
                    case 401:
                        errorMessage = 'שם משתמש או סיסמה שגויים';
                        break;
                    case 500:
                        errorMessage = 'שגיאת שרת, נסה שוב מאוחר יותר';
                        break;
                    default:
                        errorMessage = `שגיאה: ${error.status}`;
                }
            }
            
            toast.current.show({
                severity: 'error', 
                summary: 'שגיאה בהתחברות', 
                detail: errorMessage,
                life: 5000
            });
        }
    }, [isError, error])
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

