import react, { Children } from "react";
import {UserAuth} from "../context/AuthContext"
import { Navigate } from "react-router-dom";


//PrivateRoute ensures that only authenticated users can access certain routes, like /dashboard. 
//If the user is not logged in, they are redirected to the /signup page
const PrivateRoute = ({Children})=>{

    const {session} = UserAuth();
    if(session===undefined){
        return <p>Loading....</p>
    }


    return <>{session ? <>{Children}</>: <Navigate to="/signup" />}</>;

    
};

export default PrivateRoute;