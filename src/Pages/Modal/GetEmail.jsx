import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const GetEmail = ({ showModal, handleCloseModal }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [resetPass, setResetPass] = useState(false);

    if (!showModal) {
        return;
    }
    const resetPassButton = () => {
        setResetPass(true);
    }
    const onSubmit = data => {
        let email= data.email
        let password = data.password
        console.log(email)

        let user = {
            email: email,
            password: password
        }

        fetch(`https://student-info-iota.vercel.app/forgetPassword/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.email==email) {
                    fetch(`https://student-info-iota.vercel.app/users/${email}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                    .then(res => res.json())
                        .then(data => {
                            reset();
                            if (data.modifiedCount > 0) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Successfully Reset Your Password',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setResetPass(false);
                            handleCloseModal(false);
                        }
                    })
                }
                else if (data.message) {
                    reset();
                    Swal.fire({
                        title: 'Enter Valid Email',
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
        <div  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-4 backdrop-blur-sm">
            <div className="bg-slate-400 p-6 rounded-3xl w-full md:w-[500px] lg:w-[700px] h-[400px]">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <input type="email" name="email" {...register("email", {required:true})}
                            placeholder="Enter Your Email" className="p-2 border-b-2 border-black" />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className='form-control mt-6'>
                        <input onClick={resetPassButton} className={`btn text-lg ${resetPass ? 'hidden':'block'} text-white bg-gradient-to-r from-purple-500 to-pink-500`} type="submit" value="Set New Password" />
                    </div>
                    {resetPass && <div className="form-control">
                        <input type="password" name="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 10,
                            pattern: new RegExp(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/)
                        })}
                                placeholder="Reset Password" className="p-2 border-b-2 border-black" />
                            {errors.password?.type === "required" && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === "minLength" && <p className="text-red-600">Minimum six characters are required</p>}
                            {errors.password?.type === "pattern" && <p className="text-red-600">Password must have one Capital letter and one special Character</p>}
                    </div>}
                    {resetPass && <div className="form-control">
                        <input type="password" name="confirmPassword" {...register("confirmPassword", {required:true})}
                            placeholder="Confirm Reset Password" className="p-2 border-b-2 border-black" />
                        {errors.confirmPassword && <span className="text-red-600">Confirm Password is required</span>}
                    </div>}
                    {resetPass && <div className='form-control mt-6'>
                        <input className={`btn text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500`} type="submit" value="Set Password" />
                    </div>}
                </form>
            </div>
        </div>
    );
};

export default GetEmail;