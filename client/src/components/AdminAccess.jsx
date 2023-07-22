import React from 'react'
import { Navigate } from 'react-router-dom'
import AccessDenied from '../routes/AccessDenied';

function AdminAccess({ children }) {
	const isAuthenticated = Boolean(localStorage.getItem("user_token"));
	const isAdmin = localStorage.getItem("user_isAdmin") == "true";

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