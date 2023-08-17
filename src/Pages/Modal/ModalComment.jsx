import React from 'react';

const ModalComment = ({ handleCloseModalComment, showModalComment, post }) => {
    if (!showModalComment) {
        return;
    }
    const comments = post.comment;
    return (
        <div  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-4 backdrop-blur-sm">
            <div className="bg-slate-400 p-6 rounded-3xl w-full md:w-[500px] lg:w-[500px]">
                {
                    comments.map(comment => <div key={post._id}>
                        <p className="font-bold text-xl">{comment.name}</p>
                        <p className="ml-5">{comment.feedback}</p>
                    </div>)
                }
                <div className="text-right">
                    <button onClick={handleCloseModalComment} className="btn btn-primary mt-5 text-center">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ModalComment;