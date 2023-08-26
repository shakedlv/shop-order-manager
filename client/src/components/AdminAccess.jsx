import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AccessDenied from '../routes/Error Pages/AccessDenied';

function AdminAccess({ children }) {
	const isAdmin = localStorage.getItem("user_isAdmin") === "true";
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem("user_token")));
    
	useEffect(() => {

        if (new Date() >= new Date(localStorage.getItem("login_expires"))) {
            localStorage.setItem("user_token", "");
            localStorage.setItem('login_expires', "")
			setAuthenticated(false);
        }
    }, [])


	if (isAuthenticated) {
        if(isAdmin)
        {
            return children;
        }
        return <AccessDenied/> 
	}

	return <Navigate to='/login'/> ;
}

export default AdminAccess