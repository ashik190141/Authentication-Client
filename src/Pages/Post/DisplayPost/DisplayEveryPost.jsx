import React from 'react';
import './DisplayPost.css'
import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import ModalLike from '../../Modal/ModalLike';
import ModalComment from '../../Modal/ModalComment';

const DisplayEveryPost = ({ post, user, handleLike, handleGiveFeedback }) => {
    const [showModalLike, setShowModalLike] = useState(false);
    const [showModalComment, setShowModalComment] = useState(false);

    const handleCloseModalLike = () => {
        setShowModalLike(false);
    }

    const handleCloseModalComment = () => {
        setShowModalComment(false);
    }

    let emailLikes;
    let like = false;
    
    emailLikes = post.like;

    for (let i = 0; i < emailLikes.length; i++){
        if (emailLikes[i].userId == user) {
            like = true;
            console.log(like);
            break;
        }
    }

    return (
        <div>
            <div className="mt-20 mb-20">
                <div className="grid grid-cols-2 mb-1">
                    <p>Name: {post.name}</p>
                    <p className="flex justify-end">{post.date}</p>
                </div>
                <p className="mb-3">Post Title: {post.blogTitle}</p>
                <p className={`text-justify mb-8`}>
                    {post.blog}
                </p>
                <div className="react-section items-center">
                    <div>
                        <button className="border border-olive-lightgreen w-full flex flex-col items-center justify-center rounded-xl">
                            <FaThumbsUp onClick={() => handleLike(post._id, user, like)}
                            className={`${like ? 'color':'dislike'} w-7 h-7 text-gray-800 dark:text-white my-2`}></FaThumbsUp>
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleGiveFeedback} className="mt-3 feedback-section">
                            <div className="form-control w-full mb-3">
                                <label>
                                    <input required type="text" name="feedback"
                                        placeholder="Comment"
                                        className="input border-olive-lightgreen w-full bg-slate-100" />
                        </label>
                            </div>
                            <div className="form-control w-full mb-3 hidden">
                                <label>
                                    <input type="text" name="postID"
                                        defaultValue={post._id}
                                        className="input border-olive-lightgreen w-full bg-slate-100" />
                                </label>
                            </div>
                            <div className="form-control w-full mb-3">
                                <label>
                                    <input type="submit" value="SEND"
                                        className="input border-olive-lightgreen w-full bg-slate-100" />
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="react-section items-center">
                    <div>
                        {post.totalLike > 0 ? <button onClick={()=>setShowModalLike(true)} className="btn btn-link">
                            <p className="text-justify italic text-lightorange">Like: {post.totalLike}</p>
                        </button> : ''}
                    </div>
                    <div>
                        {post.totalComment > 0 ? <button onClick={()=>setShowModalComment(true)}  className="btn btn-link">
                            <p className="text-justify italic text-lightorange">Comment: {post.totalComment}</p> 
                        </button>: ''}
                    </div>
                </div>
            </div>
            <ModalLike handleCloseModalLike={handleCloseModalLike} showModalLike={showModalLike} post={post}></ModalLike>
            <ModalComment handleCloseModalComment={handleCloseModalComment} showModalComment={showModalComment} post={post}></ModalComment>
        </div>
    );
};

export default DisplayEveryPost;