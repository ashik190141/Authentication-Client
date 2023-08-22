import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTitle from '../../../hooks/useTitle';
import DisplayEveryPost from './DisplayEveryPost';

const DisplayPost = () => {
    useTitle('Posts');
    const [axiosSecure] = useAxiosSecure();
    const user = JSON.parse(localStorage.getItem('99_user'));

    // const url = `https://student-info-iota.vercel.app/posts`
    
    const {data: posts = [], refetch} = useQuery(['posts'], async () => {
        const res = await axiosSecure.get('http://localhost:5000/posts')
        return res.data;
    })

    const handleLike = (id, user, like) => {
        if (like==false) {
            const giveLike = {
                userId: user,
                name: user,
            }
            fetch(`http://localhost:5000/like/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('media-post-token')}`
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
            fetch(`http://localhost:5000/unlike/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('media-post-token')}`
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

        fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('media-post-token')}`
            },
            body: JSON.stringify(giveFeedback)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Send Feedback Successfully',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
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
        </div>
    );
};

export default DisplayPost;