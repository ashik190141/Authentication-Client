import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';
import './Login.css'
import GetEmail from '../Modal/GetEmail';

const Login = () => {
    useTitle('Login');
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const emailRef = useRef();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const onSubmit = (data) => {
        console.log('find');

        let user_name= data.name
        let password = data.password
        console.log(user_name, password);

        fetch(`https://student-info-iota.vercel.app/users/${user_name}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.user_name === user_name && data.password === password) {
                    localStorage.setItem('99_user', JSON.stringify(data.user_name));
                    const user = { username: data.user_name };
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
                                position: 'top-end',
                                icon: 'success',
                                title: 'Successfully Login',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate('/post');
                    })
                }
                else if(data.message){
                    Swal.fire({
                        title: 'username not found',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
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
                <div className="card flex-shrink-0 w-full  shadow-2xl bg-white">
                    <div className='card-body'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='pb-8'>
                                <input type="text" name="name" ref={emailRef} {...register("name", {required:true})}
                                    placeholder="user name" className="p-2 border-b-2 border-black bg-transparent w-full" />
                                {errors.name && <span className="text-red-600">username is required</span>}
                            </div>
                            <div className='pb-8'>
                                <input type="password" name="password" {...register("password",{required:true,minLength:6, maxLength:20})}
                                    placeholder="Password" className="p-2 border-b-2 border-black bg-transparent w-full" />
                                    {errors.password?.type === "required" && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === "minLength" && <p className="text-red-600">Minimum six characters are required</p>}
                                    <p onClick={() => setShowModal(true)} className='flex justify-end text-lg text-black font-normal link link-hover'>Forget Password</p>
                            </div>
                            <div>
                                <input type="submit" value="Login" className='btn text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 w-full'/>
                            </div>
                        </form>
                        <div className='grid grid-cols-2 mt-5'>
                            <p className='text-left text-lg text-black font-normal'>New to ATG?</p>
                            <Link to="/registration"><p className='text-right text-lg text-black font-normal link link-hover'>Go to Register</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <GetEmail handleCloseModal={handleCloseModal} showModal={showModal}></GetEmail>
    </div>
    );
};

export default Login;