import React from 'react';

const ModalLike = ({ handleCloseModalLike, showModalLike, post }) => {
    if (!showModalLike) {
        return;
    }
    const likes = post.like;
    return (
        <div  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-4 backdrop-blur-sm">
            <div className="bg-slate-400 p-6 rounded-3xl w-full md:w-[500px] lg:w-[500px]">
                {
                    likes.map(like => <div key={post._id}>
                        <p className="font-bold">{like.name}</p>
                    </div>)
                }
                <div className="text-right">
                    <button onClick={handleCloseModalLike} className="btn btn-primary mt-5 text-center">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ModalLike;