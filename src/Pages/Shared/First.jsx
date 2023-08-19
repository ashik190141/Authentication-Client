import React from 'react';
import useTitle from '../../hooks/useTitle';
import { useNavigate, Link } from 'react-router-dom';

const First = () => {
    useTitle('Post');
    const navigate = useNavigate();
    const logout = () => {
        setUser(false)
        navigate('/');
    }
    return (
        <div>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">ATG</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex gap-5">
                        <Link to="/post"><button className='btn btn-link text-white hover:text-orange-500'>Posts</button></Link>
                        <Link to="/post/createPost"><button className='btn btn-link text-white hover:text-orange-500'>Create Post</button></Link>
                        <Link to="/post/myPost"><button className='btn btn-link text-white hover:text-orange-500'>My Post</button></Link>
                    </ul>
                </div>
                <div className="navbar-end font-bold mr-20">
                    <button onClick={logout} className="btn btn-primary">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default First;