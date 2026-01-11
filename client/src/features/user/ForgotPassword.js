import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from './userSlice';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [emailSent, setEmailSent] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.current.show({
                severity: 'warn',
                summary: 'שים לב',
                detail: 'נא להזין כתובת אימייל',
                life: 3000
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.current.show({
                severity: 'warn',
                summary: 'שים לב',
                detail: 'נא להזין כתובת אימייל תקינה',
                life: 3000
            });
            return;
        }

        try {
            await forgotPassword({ email }).unwrap();
            setEmailSent(true);
            toast.current.show({
                severity: 'success',
                summary: 'נשלח בהצלחה',
                detail: 'קישור לאיפוס סיסמה נשלח לאימייל שלך',
                life: 5000
            });
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'שגיאה',
                detail: error?.data?.message || 'אירעה שגיאה, נסה שוב',
                life: 3000
            });
        }
    };

    if (emailSent) {
        return (
            <div className="auth-container">
                <Toast ref={toast} />
                <div className="auth-card-wrapper">
                    <Card className="auth-card success-card">
                        <div className="auth-header">
                            <div className="success-icon">
                                <i className="pi pi-check-circle"></i>
                            </div>
                            <h2>המייל נשלח בהצלחה!</h2>
                        </div>
                        
                        <div className="success-message">
                            <p>שלחנו לך קישור לאיפוס סיסמה לכתובת:</p>
                            <p className="email-display">{email}</p>
                            <p>הקישור תקף למשך שעה אחת.</p>
                        </div>

                        <div className="auth-actions">
                            <Button 
                                label="חזרה לדף הכניסה" 
                                icon="pi pi-arrow-right"
                                onClick={() => navigate('/login')}
                                className="p-button-text"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <Toast ref={toast} />
            <div className="auth-card-wrapper">
                <Card className="auth-card">
                    <div className="auth-header">
                        <i className="pi pi-lock auth-icon"></i>
                        <h2>שכחתי סיסמה</h2>
                        <p>הזן את כתובת האימייל שלך ונשלח לך קישור לאיפוס הסיסמה</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="p-field">
                            <label htmlFor="email">כתובת אימייל</label>
                            <InputText
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your-email@example.com"
                                className="p-inputtext-lg"
                                disabled={isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            label={isLoading ? 'שולח...' : 'שלח קישור לאיפוס'}
                            icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-send'}
                            className="p-button-lg"
                            disabled={isLoading}
                        />

                        <div className="auth-links">
                            <Button
                                label="חזרה לדף הכניסה"
                                className="p-button-text p-button-plain"
                                onClick={() => navigate('/login')}
                                type="button"
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;
