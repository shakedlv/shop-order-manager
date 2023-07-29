import React from 'react'
import { Navigate } from 'react-router-dom'

function UserAccess({ children }) {
	const isAuthenticated = Boolean(localStorage.getItem("user_token"));

	if (isAuthenticated) {

            return children;
	}

	return <Navigate to='/login'/> ;
}

export default UserAccess