import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Swal from 'sweetalert2';

const Register = () => {
    useTitle('Registration');
    const navigate = useNavigate();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            Swal.fire({
                title: 'Password and Confirm Password is not Same',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return
        }
        const saveUser = {
            user_name: data.name,
            email: data.email,
            password: data.password
        }
        fetch('https://student-info-iota.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                console.log(saveUser.user_name);
                localStorage.setItem('99_user', JSON.stringify(saveUser.user_name));
                const user = {
                    username: saveUser.user_name
                }
                fetch('https://student-info-iota.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user) 
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('media-post-token', data.token);
                        Swal.fire({
                            title: `Registration Successful`,
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        }).then(result => {
                            if (result.isConfirmed) {
                                navigate('/post');
                            }
                        })
                })
            }
            else if (data.message) {
                Swal.fire({
                    title: `${data.name} is already exist`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                })
            }
        })
    }

    return (
        <div className="hero min-h-screen font-family back-Ground">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center">
            <div className="w-auto md:w-[400px] lg:w-[500px]">
                <div className="card flex-shrink-0 w-full py-5 my-10 shadow-2xl bg-white">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        
                        <div className="form-control">
                            <input type="text" name="name" {...register("name",{ required: true })}
                                placeholder="User Name" className="p-2 border-b-2 border-black bg-transparent" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                            
                        <div className="form-control">
                            <input type="email" name="email" {...register("email", {required:true})}
                                placeholder="Enter Your Email" className="p-2 border-b-2 border-black bg-transparent" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                            
                        <div className="form-control">
                            <input type="password" name="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 10,
                                pattern: new RegExp(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/)
                            })}
                                    placeholder="Password" className="p-2 border-b-2 border-black bg-transparent" />
                                {errors.password?.type === "required" && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === "minLength" && <p className="text-red-600">Minimum six characters are required</p>}
                                {errors.password?.type === "pattern" && <p className="text-red-600">Password must have one Capital letter and one special Character</p>}
                        </div>
                            
                        <div className="form-control">
                            <input type="password" name="confirmPassword" {...register("confirmPassword", {required:true})}
                                placeholder="Confirm Password" className="p-2 border-b-2 border-black bg-transparent" />
                            {errors.confirmPassword && <span className="text-red-600">Confirm Password is required</span>}
                        </div>
                            
                        <div className='form-control mt-6'>
                            <input className="btn text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500" type="submit" value="Sign Up" />
                        </div>
                     </form>
                     <div className='flex items-center justify-between mb-8 pl-8 pr-8'>
                         <p className="text-left text-lg text-black font-normal">Already Have an Account?</p>
                         <Link to="/login"><p className='btn text-white bg-gradient-to-r from-purple-500 to-pink-500'>Go to Login</p></Link>
                     </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Register;