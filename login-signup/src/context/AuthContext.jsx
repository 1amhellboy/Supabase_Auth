import { createContext,useEffect,useState,useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();
//This creates a React context to hold authentication-related state and functions (session, signInUser, etc.).
 
export const AuthProvider = ({children}) => {

    //In Supabase, a session represents the authentication state of a user — including their access token, refresh token, and user info. 
    //It tells you whether a user is logged in and provides the data needed to authorize them in your app.

    const [session, setSession] = useState(undefined);

    //session is initially undefined to indicate "we're checking the login status.

    
    // Sign up
    const signUpNewUser = async(email,password)=>{
        const {data,error} = await supabase.auth.signUp({
            email:email,
            password:password,
        });

        if(error){
            console.log("There was a problem signing up:", error);
            return {success:false,error};
        }
        return {success:true,data};
    };

    // Sign in

    const signInUser = async (email,password)=>{
        try{
            const {data,error} = await supabase.auth.signInWithPassword({
                email:email,
                password:password,
            });
            if(error){
                console.error("sign in error occured:",error);
                return{success:false,error:error.message}
            }
            console.log("sign-in success:",data);
            return {success:true,data};
        }catch(error){
            console.error("an error occured:",error)
        }
    }


    //getSession(): Checks if a user is currently logged in (based on Supabase’s local storage tokens).
    //onAuthStateChange(): Listens for login/logout and automatically updates session.
    useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
        });
    },[]);

    // Sign out

    const signOut = ()=>{
        const {error} = supabase.auth.signOut();
        if(error){
            console.error("there was an error:", error);
        }
    }


    return (
        <AuthContext.Provider value={{session, signUpNewUser,signOut,signInUser}}>
            {children}
        </AuthContext.Provider>
    )
}


// UserAuth() this custom hook simplifies access to the AuthContext.
// it uses the useContext hook to retrive the values provided by AuthContext.Provider.
// this allows any components to easily access authentication-related data(like session) and functions(like signUpNewUser,signInUser,signOut)
// without needing to pass them as props.

export const UserAuth = () => {
    return useContext(AuthContext);
}