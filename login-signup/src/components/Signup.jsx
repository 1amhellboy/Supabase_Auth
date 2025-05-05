import react from 'react';
import { UserAuth } from '../context/AuthContext';
import {Link, Navigate, useNavigate} from "react-router-dom";

const Signup = () => {

    // cosnt [name,setName] = react.useState("");
    const [email,setEmail] = react.useState("");
    const [password,setPassword] = react.useState("");
    const [error,setError] = react.useState("");
    const [loading,setLoading] = react.useState("");

    const {session,signUpNewUser} = UserAuth();
    const navigate = useNavigate()
    console.log(session);
    console.log(email,password);

    const handleSignUp = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signUpNewUser(email,password)
            if(result.success){
                navigate("/signin")
            }
        }catch(err){
            setError("an error occured")
        }finally{
            setLoading(false)
        }
    }

    return(
        <div>
            <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
                <h2 className="font-bold pb-2">Sign up today!</h2>
                <p>Already have an account? <Link to="/signin">Sign in!</Link></p>
                <div className='flex flex-col py-4'>
                    <input onChange={(e)=> setEmail(e.target.value)} className='p-3 mt-2' type="email" name="" id="" placeholder='Email id'/>
                    <input onChange={(e)=> setPassword(e.target.value)}className='p-3 mt-2' type="password" name="" id="" placeholder='Password'/>
                    <button type='submit' disabled={loading} className='mt-6 w-full'>Sign up</button>
                    {error && <p className='text-red-600 text-center pt-4'>{error}</p> }
                </div>
            </form>
        </div>
    )
}

export default Signup;