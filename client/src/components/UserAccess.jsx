import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function UserAccess({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem("user_token")));
	useEffect(() => {

        if (new Date() >= new Date(localStorage.getItem("login_expires"))) {
            localStorage.setItem("user_token", "");
            localStorage.setItem('login_expires', "")
			setAuthenticated(false);
        }
    }, [])


	

	if (isAuthenticated) {

            return children;
	}

	return <Navigate to='/login'/> ;
}

export default UserAccess