import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AccessDenied from '../routes/Feedback Pages/AccessDenied';
import { Logout } from '../utils/auth';

function AdminAccess({ children }) {
    const isAdmin = localStorage.getItem("user_isAdmin") === "true";
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem("user_token")));

    useEffect(() => {
        if(localStorage.getItem("login_expires") != null)
        {
            if (new Date() >= new Date(localStorage.getItem("login_expires"))) {
                Logout();
                setAuthenticated(false);
            }
        }
    }, [])


    if (isAuthenticated) {
        if (isAdmin) {
            return children;
        }
        return <AccessDenied />
    }

    return <Navigate to='/login' />;
}

export default AdminAccess