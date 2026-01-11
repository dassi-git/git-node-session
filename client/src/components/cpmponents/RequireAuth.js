import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isUserLoggedIn) {
        // שמירת המיקום הנוכחי כדי לחזור אליו אחרי התחברות
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
