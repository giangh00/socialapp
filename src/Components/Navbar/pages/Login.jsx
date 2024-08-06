import React, { useContext, useEffect,useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { AuthContext } from '../../AppContext/AppContext';
import { auth, onAuthStateChanged } from '../../firebase/firebase';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { signInWithGoogle, loginWithEmailAndPassword } = useContext(AuthContext);
    const navigate = useNavigate();

   useEffect(()=>{
    setLoading(true);
    onAuthStateChanged(auth,(user)=>{
    if(user){
        navigate("/");
        setLoading(false);
    }else{
        setLoading(false);
    }
    })
   },[navigate]);

   const handleSubmit = (e) =>{
   e.preventDefault();
   const{email, password} = formik.values;
   if(formik.isValid === true){
    loginWithEmailAndPassword(email, password);
    setLoading(true);
   }else{
    setLoading(false);
    
   }
   };

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, 'Must be at least 6 characters long')
            .matches(/^[a-zA-Z]+$/, 'Password can only contain letters'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const { email, password } = values;
            if (formik.isValid) {
                alert('good');
            } else {
                alert('check your email or password');
            }
        },
    });

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            type="email"
                            placeholder="Username"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <Typography variant="small" color="red">
                                {formik.errors.email}
                            </Typography>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="password"
                            type="password"
                            placeholder="Password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <Typography variant="small" color="red">
                                {formik.errors.password}
                            </Typography>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={signInWithGoogle}
                        >
                            Sign In with Google
                        </button>
                    </div>

                   

                    <div className="flex mt-4">
                        <Link to="/register">
                            <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center mx-3">Register</p>
                        </Link>
                        <Link to="/reset">
                            <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">Reset Password</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
