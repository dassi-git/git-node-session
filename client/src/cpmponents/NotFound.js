import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{ 
                fontSize: '8rem', 
                fontWeight: 'bold', 
                color: '#dee2e6',
                marginBottom: '1rem'
            }}>
                404
            </div>
            
            <h1 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                color: '#495057'
            }}>
                הדף לא נמצא
            </h1>
            
            <p style={{ 
                fontSize: '1.2rem', 
                color: '#6c757d',
                marginBottom: '2rem',
                maxWidth: '500px'
            }}>
                מצטערים, הדף שחיפשת אינו קיים או שהועבר למקום אחר.
                אנא בדוק את הכתובת או חזור לדף הבית.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button 
                    label="חזרה לדף הבית" 
                    icon="pi pi-home" 
                    onClick={() => navigate('/allProduct')}
                    className="p-button-lg"
                />
                <Button 
                    label="חזור אחורה" 
                    icon="pi pi-arrow-right" 
                    onClick={() => navigate(-1)}
                    className="p-button-lg p-button-outlined"
                />
            </div>

            <div style={{ marginTop: '3rem' }}>
                <i className="pi pi-exclamation-circle" style={{ 
                    fontSize: '4rem', 
                    color: '#dee2e6' 
                }}></i>
            </div>
        </div>
    );
};

export default NotFound;
