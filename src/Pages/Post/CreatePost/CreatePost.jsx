import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import moment from 'moment';
import Swal from 'sweetalert2';

const CreatePost = () => {
    useTitle('Create Post');
    const user = JSON.parse(localStorage.getItem('99_user'));
    // const [cnt, setCount] = useState(200);
    // const [disable, setDisable] = useState(true);
    const navigate = useNavigate();
    console.log(user);

    // const handleInput = (e) => {
    //     let n = e.target.value;
    //     console.log(n.length);
    //     let requiredLength = 200 - n.length;
    //     if (requiredLength <= 0) {
    //         setDisable(false);
    //     } else {
    //         setDisable(true);
    //     }
    //     setCount(requiredLength);
    // }


    const handleSubmitBlog = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const blogTitle = form.blogTitle.value;
        const blog = form.blog.value;
        const totalLike = 0;
        const totalComment = 0;
        const totalReaction = 0;
        const like = [];
        const comment = [];
        const username = user;
        const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        const blogInfo = {
            name,
            blogTitle,
            blog,
            totalLike,
            totalComment,
            totalReaction,
            like,
            comment,
            date,
            username    
        };

        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('media-post-token')}`
            },
            body: JSON.stringify(blogInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: `Successfully Create Your Post`,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate('/post');
                        }
                    })
                    form.reset();
                }
            });
    }


    return (
        <div className="max-w-7xl mx-auto bg-slate-100 pt-20 pb-20">
            <div >
                <h2 className='font-bold font-mono  text-lightorange text-left text-2xl px-10 py-10  uppercase'>Create Your Post</h2>
                <form onSubmit={handleSubmitBlog} className="px-10">
                    <div className="mb-8 flex flex-col items-left justify-start">
                        <div className="form-control w-full mb-3">
                            <label>
                                <input type="text" name="name"
                                    placeholder="Your Name" required
                                    className="input border-olive-lightgreen w-full bg-slate-100" />
                            </label>
                        </div>
                        <div className="form-control w-full mb-3">
                            <label>
                                <input required type="text" name="blogTitle"
                                    placeholder="Post Title"
                                    className="input border-olive-lightgreen w-full bg-slate-100" />
                            </label>
                        </div>
                        <div className="form-control w-full mb-8">
                            <label>
                                <textarea type="text" name="blog" required
                                    placeholder="Post"
                                    className="input border-olive-lightgreen text-justify my-1 w-full h-80 bg-slate-100" />
                            </label>
                        </div>
                        {/* <div className={`form-control w-full mb-8 ${cnt<=0 ? 'hidden':'block'}`}>
                            <p className='text-red-500 font-bold'>* Must have {cnt} characters</p>
                        </div> */}

                        <div className="form-control w-24 mb-2">
                            <input type="submit" value="Post"
                            className={`btn bg-lightorange border-none text-white btn-primary w-full}`}/>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreatePost;