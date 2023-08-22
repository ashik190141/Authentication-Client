import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';

const Main = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('99_user'));
    console.log(user);
    useEffect(() => {
        if (user) {
            navigate('/post')
        }
    },[user])
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('registration');
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;