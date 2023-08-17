import React from 'react';
import First from '../Pages/Shared/First';
import { Outlet } from 'react-router-dom';

const Post = () => {
    return (
        <div>
            <First></First>
            <Outlet></Outlet>
        </div>
    );
};

export default Post;