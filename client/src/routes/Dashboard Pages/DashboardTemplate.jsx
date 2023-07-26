import React from 'react'
import Sidenav from '../../components/Sidenav'
import { Outlet } from 'react-router-dom'

function DashboardTemplate() {
    
    return (
       <>
            <Sidenav />
            <Outlet />

        </>

    )
}

export default DashboardTemplate

