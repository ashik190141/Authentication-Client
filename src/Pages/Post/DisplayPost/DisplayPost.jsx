import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useTitle from '../../../hooks/useTitle';
import DisplayEveryPost from './DisplayEveryPost';

const DisplayPost = () => {
    useTitle('Posts');
    

    const url = `https://student-info-iota.vercel.app/posts`
    
    const {data: posts = [], refetch} = useQuery(['posts'], async () => {
        const res = await fetch(url)
        return res.json();
    })

    const handleLike = (id, user, like) => {
        if (like==false) {
            const giveLike = {
                userId: user,
                name: user,
            }
            fetch(`https://student-info-iota.vercel.app/like/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(giveLike)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        like = true;
                        refetch();
                        // setBlogs(blogs);
                    }
                });
        } else {
            const giveUnLike = {
                userId: user,
                name: user,
            }
            fetch(`https://student-info-iota.vercel.app/unlike/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(giveUnLike)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        like = false;
                        refetch();
                        // setBlogs(blogs);
                    }
            });
        }
    }

    const handleGiveFeedback = (event) => {
        event.preventDefault();

        const form = event.target;
        const feedback = form.feedback.value;
        const id = form.postID.value;

        const giveFeedback = {
            feedback: feedback,
            name: user
        }

        fetch(`https://student-info-iota.vercel.app/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(giveFeedback)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Send Feedback Successfully', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    form.reset();
                    refetch();
                    // setBlogs(blogs);
                }
            });
    }

    return (
        <div className='max-w-7xl mx-auto'>
            {
                posts.map(post => <DisplayEveryPost key={post._id}
                    post={post}
                    user={user}
                    handleLike={handleLike}
                    handleGiveFeedback={handleGiveFeedback}>
                </DisplayEveryPost>)
            }
            <ToastContainer />
        </div>
    );
};

export default DisplayPost;