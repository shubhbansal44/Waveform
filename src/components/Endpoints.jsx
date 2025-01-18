import React from 'react'
import { NavLink } from 'react-router-dom'

function Endpoint({label, icon, isExpanded, endpoint}) {
    return (
    <NavLink to={endpoint} className={({ isActive }) => `flex flex-row ${isActive ? 'bg-red-600/45 hover:bg-red-600/60' : 'hover:bg-white/5'} rounded-lg p-3 space-x-2 w-full items-center`}>
        <i className={`bx ${icon} text-gray-600 text-4xl`}></i>
        <p className={`${isExpanded ? 'text-2xl poppins-regular text-gray-600 h-fit capitalize' : 'hidden'}`}>{label}</p>
    </NavLink>
    )
}

export default Endpoint