import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './logout';
import LoginButton from './login';

function Navbar() {
    const { isAuthenticated } = useAuth0();
    return (
        <div style={{ backgroundColor : "#2a2438"}}>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Add Vendor</Link>
                </li>
                <li>
                    <Link className="nav-link active" to="/vendors">Vendors</Link>
                </li>
                <li>
                    <Link className="nav-link active" to="/profile">Profile</Link>
                </li>
                <div className="nav-link active">
                    {
                        isAuthenticated ? <LogoutButton/> : <LoginButton/>
                    }
                </div>
            </ul>
        </div>
    )
}

export default Navbar