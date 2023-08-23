import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';

const UpdatePost = () => {
    useTitle("Update Post");
    const post = useLoaderData();
    const id = post._id;
    console.log(id);
    const navigate = useNavigate();

    const handleUpdateBlog = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const blogTitle = form.blogTitle.value;
        const blog = form.blog.value;

        const blogInfo = {
            name,
            blogTitle,
            blog
        };

        fetch(`https://student-info-iota.vercel.app/post/${id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('media-post-token')}`
            },
            body: JSON.stringify(blogInfo)
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    title: `Successfully Updated Your Post`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate('/post/myPost');
                    }
                })
            }
        })
    }

    return (
        <div className="max-w-7xl mx-auto bg-slate-100 pt-20 pb-20">
            <div >
                <h2 className='font-bold font-mono  text-lightorange text-left text-2xl px-10 py-10  uppercase'>Update Your Post</h2>
                <form onSubmit={handleUpdateBlog} className="px-10">
                    <div className="mb-8 flex flex-col items-left justify-start">
                        <div className="form-control w-full mb-3">
                            <label>
                                <input type="text" name="name"
                                    placeholder="Your Name" defaultValue={post.name}
                                    className="input border-olive-lightgreen w-full bg-slate-100" />
                            </label>
                        </div>
                        <div className="form-control w-full mb-3">
                            <label>
                                <input required type="text" name="blogTitle"
                                    placeholder="Blog Title" defaultValue={post.blogTitle}
                                    className="input border-olive-lightgreen w-full bg-slate-100" />
                            </label>
                        </div>
                        <div className="form-control w-full mb-8">
                            <label>
                                <textarea type="text" name="blog" required
                                    placeholder="Blog" defaultValue={post.blog}
                                    className="input border-olive-lightgreen text-justify my-1 w-full h-80 bg-slate-100" />
                            </label>
                        </div>

                        <div className="form-control w-24 mb-20">
                            <input type="submit" value="Update"
                                className="btn bg-lightorange border-none  text-white btn-primary w-full" />
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default UpdatePost;