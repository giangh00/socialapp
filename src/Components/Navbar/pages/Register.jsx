import React, { useContext, useState , useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from '@mui/material';
import CircleLoader from "react-spinners/CircleLoader";
import { AuthContext } from "../../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../../firebase/firebase";

const Register = () => {
    const[loading, setLoading] = useState(false);
    const{ registerWithEmailAndPassword } = useContext(AuthContext);
    const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);


  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(4, "Must be at least 4 characters long")
      .matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters long")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = formik.values;
    if (formik.isValid === true) {
      registerWithEmailAndPassword(name, email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input fields");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
    {loading? <div className="min-h-screen flex items-center justify-center bg-gray-100"><CircleLoader /></div> :(
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
           <h2 className="text-2xl font-bold mb-6 text-gray-900">Register</h2>
           <form onSubmit={handleRegister}>
             <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                 Name
               </label>
               <input
                 name="name"
                 type="text"
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 placeholder="Name"
                 {...formik.getFieldProps("name")}
               />
               {formik.touched.name && formik.errors.name && (
                 <Typography variant='small' color="red">
                   {formik.errors.name}
                 </Typography>
               )}
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                 Email
               </label>
               <input
                 name="email"
                 type="email"
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 placeholder="Email"
                 {...formik.getFieldProps("email")}
               />
               {formik.touched.email && formik.errors.email && (
                 <Typography variant='small' color="red">
                   {formik.errors.email}
                 </Typography>
               )}
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                 Password
               </label>
               <input
                 name="password"
                 type="password"
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 placeholder="Password"
                 {...formik.getFieldProps("password")}
               />
               {formik.touched.password && formik.errors.password && (
                 <Typography variant='small' color="red">
                   {formik.errors.password}
                 </Typography>
               )}
             </div>
             <div className="flex items-center justify-center ">
               <button
                 type="submit"
                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
               >
                 Register
               </button>
             </div>
           </form>
           <div className='mt-2 flex justify-center'>
             Already have an account?
             <Link to="/login">
               <p className='ml-1 font-roboto font-bold text-blue-500 text-center'>Login</p>
             </Link>
           </div>
         </div>
       </div>
    )}
   
    </>
  );
  
}

export default Register;
