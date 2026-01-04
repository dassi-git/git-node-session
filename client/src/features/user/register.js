import { useEffect, useState, useRef } from "react";
import { useRegisterMutation } from "./userSlice";
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
        
    

                
const Register = () => {
    const toast = useRef(null);
    const [value, setValue] = useState('');
    const [register, { isError, isSuccess, error, isLoading }] = useRegisterMutation()
    const navigate=useNavigate();

    const [formDate, setFromDate] = useState({
        name: "",
        userName: "",
        password: "",
        confirmPassword: "",
        adress: "",
        phone: "",
        email: ""
    })
    
    // State לשגיאות ולידציה
    const [errors, setErrors] = useState({
        name: "",
        userName: "",
        password: "",
        confirmPassword: "",
        adress: "",
        phone: "",
        email: ""
    })
    useEffect(() => {
        if (isSuccess) {
            toast.current.show({severity:'success', summary: 'הצלחה', detail: 'נרשמת בהצלחה! מעביר לדף התחברות...', life: 3000});
            setTimeout(() => navigate("/login"), 1000);
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError && error) {
            // הצגת השגיאה הספציפית מהשרת
            let errorMessage = 'אירעה שגיאה בהרשמה';
            
            // בדיקה של מבנה השגיאה והצגת ההודעה הספציפית
            if (error.data?.message) {
                // תרגום הודעות מהשרת לעברית
                const serverMessage = error.data.message;
                const translations = {
                    'Email already exists': 'האימייל כבר קיים במערכת',
                    'Username already exists': 'שם המשתמש כבר קיים במערכת',
                    'Duplicate username': 'שם המשתמש כבר קיים במערכת',
                    'Duplicate data found': 'הנתונים כבר קיימים במערכת',
                    'Invalid email format': 'פורמט האימייל אינו תקין',
                    'Password must be at least 6 characters long': 'הסיסמה חייבת להיות לפחות 6 תווים',
                    'All fields are required': 'יש למלא את כל השדות',
                    'Invalid user received': 'נתונים לא תקינים',
                    'Server error during registration': 'שגיאת שרת, נסה שוב מאוחר יותר'
                };
                errorMessage = translations[serverMessage] || serverMessage;
            } else if (error.error) {
                // שגיאת רשת או שגיאה אחרת
                errorMessage = error.error;
            } else if (error.status) {
                // שגיאה לפי סטטוס
                switch(error.status) {
                    case 400:
                        errorMessage = 'נתונים לא תקינים';
                        break;
                    case 409:
                        errorMessage = 'המידע כבר קיים במערכת';
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
                summary: 'שגיאה בהרשמה', 
                detail: errorMessage,
                life: 5000
            });
        }
    }, [isError, error])
    
// פונקציה לולידציה של שדה בודד
const validateField = (name, value) => {
    let errorMessage = "";
    
    switch(name) {
        case "name":
            if (!value.trim()) {
                errorMessage = "שם מלא הוא שדה חובה";
            }
            break;
        case "userName":
            if (!value.trim()) {
                errorMessage = "שם משתמש הוא שדה חובה";
            } else if (value.length < 3) {
                errorMessage = "שם משתמש חייב להיות לפחות 3 תווים";
            }
            break;
        case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                errorMessage = "אימייל הוא שדה חובה";
            } else if (!emailRegex.test(value)) {
                errorMessage = "פורמט האימייל אינו תקין";
            }
            break;
        case "password":
            if (!value) {
                errorMessage = "סיסמה היא שדה חובה";
            } else if (value.length < 6) {
                errorMessage = "הסיסמה חייבת להיות לפחות 6 תווים";
            }
            break;
        case "confirmPassword":
            if (!value) {
                errorMessage = "אימות סיסמה הוא שדה חובה";
            } else if (value !== formDate.password) {
                errorMessage = "הסיסמאות אינן תואמות";
            }
            break;
        case "adress":
            if (!value.trim()) {
                errorMessage = "כתובת היא שדה חובה";
            }
            break;
        case "phone":
            if (!value.trim()) {
                errorMessage = "טלפון הוא שדה חובה";
            } else if (!/^\d{9,10}$/.test(value.replace(/-/g, ''))) {
                errorMessage = "מספר טלפון לא תקין";
            }
            break;
        default:
            break;
    }
    
    return errorMessage;
}

const change=(e)=>{
    const {name,value}=e.target
    setFromDate({
        ...formDate,
        [name]:value
    })
    
    // ולידציה בזמן הקלדה
    const errorMessage = validateField(name, value);
    setErrors({
        ...errors,
        [name]: errorMessage
    })
    
    // אם זה שדה הסיסמה, לוודא גם את אימות הסיסמה
    if (name === "password" && formDate.confirmPassword) {
        const confirmError = formDate.confirmPassword !== value ? "הסיסמאות אינן תואמות" : "";
        setErrors(prev => ({
            ...prev,
            confirmPassword: confirmError
        }))
    }
}
const submit= (e)=>{
    e.preventDefault();
    
    // ולידציה של כל השדות לפני שליחה
    const newErrors = {
        name: validateField("name", formDate.name),
        userName: validateField("userName", formDate.userName),
        email: validateField("email", formDate.email),
        password: validateField("password", formDate.password),
        confirmPassword: validateField("confirmPassword", formDate.confirmPassword),
        adress: validateField("adress", formDate.adress),
        phone: validateField("phone", formDate.phone)
    };
    
    setErrors(newErrors);
    
    // בדיקה אם יש שגיאות
    const hasErrors = Object.values(newErrors).some(error => error !== "");
    
    if (hasErrors) {
        toast.current.show({
            severity:'warn', 
            summary: 'שים לב', 
            detail: 'יש לתקן את השגיאות בטופס', 
            life: 3000
        });
        return;
    }
    
    // שליחה רק אם אין שגיאות (ללא confirmPassword)
    const { confirmPassword, ...dataToSend } = formDate;
    register(dataToSend);
}


    return (
        <>
               <Toast ref={toast} />
               <h2>הרשמה</h2>
               <form onSubmit={(e) => submit(e)}>
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText 
                    id="name" 
                    value={formDate.name}
                    onChange={(e) => change(e)} 
                    type="text" 
                    name="name" 
                    className={errors.name ? 'p-invalid' : ''}
                />
                <label htmlFor="name">שם מלא</label>
            </FloatLabel>
        </div>
        {errors.name && <small style={{color: 'red', display: 'block', textAlign: 'center', marginTop: '5px'}}>{errors.name}</small>}
        
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText 
                    id="userName" 
                    value={formDate.userName}
                    onChange={(e) => change(e)}
                    type="text"  
                    name="userName"
                    className={errors.userName ? 'p-invalid' : ''}
                />
                <label htmlFor="userName">שם משתמש</label>
            </FloatLabel>
        </div>
        {errors.userName && <small style={{color: 'red', display: 'block', textAlign: 'center', marginTop: '5px'}}>{errors.userName}</small>}
        
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText 
                    id="email"
                    value={formDate.email}
                    onChange={(e) => change(e)}
                    type="text" 
                    name="email"
                    className={errors.email ? 'p-invalid' : ''}
                />
                <label htmlFor="email">אימייל</label>
            </FloatLabel>
        </div>
        {errors.email && <small style={{color: 'red', display: 'block', textAlign: 'center', marginTop: '5px'}}>{errors.email}</small>}
        
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText 
                    id="password" 
                    value={formDate.password}
                    onChange={(e) => change(e)}
                    type="password" 
                    name="password"
                    className={errors.password ? 'p-invalid' : ''}
                />
                <label htmlFor="password">סיסמה</label>
            </FloatLabel>
        </div>
        {errors.password && <small style={{color: 'red', display: 'block', textAlign: 'center', marginTop: '5px'}}>{errors.password}</small>}
        
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText 
                    id="confirmPassword" 
                    value={formDate.confirmPassword}
                    onChange={(e) => change(e)}
                    type="password" 
                    name="confirmPassword"
                    className={errors.confirmPassword ? 'p-invalid' : ''}
                />
                <label htmlFor="confirmPassword">אימות סיסמה</label>
            </FloatLabel>
        </div>
        {errors.confirmPassword && <small style={{color: 'red', display: 'block', textAlign: 'center', marginTop: '5px'}}>{errors.confirmPassword}</small>}
        
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText 
                    id="adress" 
                    value={formDate.adress}
                    onChange={(e) => change(e)}
                    type="text" 
                    name="adress"
                    className={errors.adress ? 'p-invalid' : ''}
                />
                <label htmlFor="adress">כתובת</label>
            </FloatLabel>
        </div>
        {errors.adress && <small style={{color: 'red', display: 'block', textAlign: 'center', marginTop: '5px'}}>{errors.adress}</small>}
        
        <div className="card flex justify-content-center">
            <FloatLabel>
                <InputText 
                    id="phone" 
                    value={formDate.phone}
                    onChange={(e) => change(e)}
                    type="text" 
                    name="phone"
                    className={errors.phone ? 'p-invalid' : ''}
                />
                <label htmlFor="phone">טלפון</label>
            </FloatLabel>
        </div>
        {errors.phone && <small style={{color: 'red', display: 'block', textAlign: 'center', marginTop: '5px'}}>{errors.phone}</small>}
        
        <div className="card flex justify-content-center">
            <Button label="הרשמה" type="submit" disabled={isLoading}/>
        </div>
       </form>
          
        </>
    )
}
export default Register