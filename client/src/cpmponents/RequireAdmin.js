import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../features/user/useAuth';

const RequireAdmin = ({ children }) => {
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const location = useLocation();
    const [objToken] = useAuth();

    // אם המשתמש לא מחובר בכלל - העבר להתחברות
    if (!isUserLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // אם המשתמש מחובר אבל לא Admin - העבר לדף "אין הרשאה"
    if (objToken?.role !== 'Admin') {
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
                <i className="pi pi-ban" style={{ 
                    fontSize: '5rem', 
                    color: '#ef4444',
                    marginBottom: '1rem'
                }}></i>
                
                <h1 style={{ 
                    fontSize: '2rem', 
                    marginBottom: '1rem',
                    color: '#495057'
                }}>
                    אין לך הרשאה לגשת לעמוד זה
                </h1>
                
                <p style={{ 
                    fontSize: '1.1rem', 
                    color: '#6c757d',
                    marginBottom: '2rem'
                }}>
                    עמוד זה מיועד למנהלי המערכת בלבד.
                </p>
                
                <button 
                    onClick={() => window.location.href = '/allProduct'}
                    style={{
                        padding: '0.75rem 2rem',
                        fontSize: '1rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    חזור לדף הבית
                </button>
            </div>
        );
    }

    // אם המשתמש הוא Admin - אפשר גישה
    return children;
};

export default RequireAdmin;
