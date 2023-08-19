import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";


const MyPost = ({user}) => {
    useTitle('My Posts');
    

    
    const url = `https://student-info-iota.vercel.app/specificPost?username=${user}`;

    const {data: posts = [], refetch} = useQuery(['posts'], async () => {
        const res = await fetch(url)
        return res.json();
    })

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://student-info-iota.vercel.app/post/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your Post has been deleted.',
                            'success'
                        )
                    }
                    refetch();
                })
            }
        }) 
    }
    
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className='font-bold font-mono text-center text-lightorange text-2xl px-10 py-10  uppercase'>Your Post</h2>
            {
                posts.map(post => <div key={post._id}>
                    <div className="mt-5 md:mt-10 lg:mt-20 mb-20">
                        <div className="grid grid-cols-2 mb-1">
                            <p>{post.name}</p>
                            <p className="flex justify-end">{post.date}</p>
                        </div>
                        <p className="mb-3">Post Title: {post.blogTitle}</p>
                        <p className="text-justify mb-8">{post.blog}</p>
                        <div className="flex gap-5 justify-end">
                            <div>
                                <button onClick={() => handleDelete(post._id)} className="btn btn-warning">Delete</button>
                            </div>
                            <div>
                                <Link to={`/post/updatePost/${post._id}`}>
                                    <button className="btn btn-success">Update</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyPost;