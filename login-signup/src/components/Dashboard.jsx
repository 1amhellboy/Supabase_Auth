import react from 'react';
import { UserAuth } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const {session,signOut} = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async(e)=>{
        e.preventDefault();
        try{
            signOut();
            navigate("/signup");
        }catch(err){
            console.error("an erro occured:", err);
        }
    }

    return(
        <>
                <h1>Dashboard</h1>
                <p>Welcome! {session?.user?.email}</p>
                <p 
                onClick={handleSignOut}
                className='hover:cursor-pointer border inline-block px-4 py-3 mt-4'>Sign Out</p>
        </>
    )
}

export default Dashboard;