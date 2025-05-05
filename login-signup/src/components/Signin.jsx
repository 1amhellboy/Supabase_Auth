import react from 'react';
import {Navigate,Link,useNavigate} from 'react-router-dom';
import {UserAuth} from "../context/AuthContext";

const Signin = () => {

    const [email,setEmail] = react.useState("");
    const [password,setPassword] = react.useState("");
    const [error,setError] = react.useState("");
    const [loading,setLoading] = react.useState("");

    const {session,signInUser} = UserAuth();
    const navigate = useNavigate();
    console.log(session);
    
    const handleSignIn = async (e)=>{
        e.preventDefault();
        try{
            const result = await signInUser(email,password)
            if(result.success){
                navigate("/dashboard");
            }
        }catch(err){
            setError("an error occured")
        }finally{
            setLoading(false)
        }
    }

    return(
        <div>
            <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
                <h2 className="font-bold pb-2">Sign In</h2>
                <p>Make an account? <Link to="/signup">Sign up!</Link></p>
                <div className="flex flex-col py-4">
                    <input onChange={(e)=>setEmail(e.target.value)} className="p-3 mt-2" type="email" name="" id="" placeholder="Email Id"/>
                    <input onChange={(e)=>setPassword(e.target.value)}className="p-3 mt-2" type="password" name="" id="" placeholder="Password"/>
                    <button type="submit" disabled={loading} className='mt-6 w-full'>Sign In</button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>
        </div>
        
    )
}

export default Signin;