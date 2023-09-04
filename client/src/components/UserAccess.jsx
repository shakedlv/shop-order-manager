import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Logout } from '../utils/auth';

function UserAccess({ children }) {
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

            return children;
	}

	return <Navigate to='/login'/> ;
}

export default UserAccess