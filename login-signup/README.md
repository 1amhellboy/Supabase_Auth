-------Overall Flow of the App------

1.Initial Load:
AuthProvider is rendered, and inside useEffect, it checks the user's session via supabase.auth.getSession().

If the session is null (no user logged in), the app considers the user not logged in. If the session exists, the app has the user's session and their data (email, etc.).

PrivateRoute ensures that only authenticated users can access certain routes, like /dashboard. If the user is not logged in, they are redirected to the /signup page.

2.Signup Flow:
The user fills out the Signup form.

After submitting, signUpNewUser is called to create a new user via Supabase.

If the sign-up is successful, the user is redirected to the sign-in page (/signin).

3.Signin Flow:
The user enters their credentials on the Signin page.

signInUser is called to authenticate the user.

If successful, the user is redirected to the /dashboard.

4.Dashboard:
The user's email is displayed on the dashboard.

Clicking "Sign Out" logs them out via signOut(), and they are redirected to the sign-up page (/signup).


----Key React Concepts Used-----
React Context: Used to store and share authentication-related data (like session and auth functions) across your app.

useState and useEffect: Manage state (for session, loading, etc.) and handle side effects (checking sessions, listening for auth changes).

react-router-dom: Used for routing and navigation (useNavigate, Link, Navigate).

Private Routes: Protects specific routes by checking if a user is authenticated.

-----AUTH CONTEXT FLOW-------

Overall Flow Summary:
1.AuthContext provides authentication-related state and functions (like signInUser, signUpNewUser, signOut, session) to all child components.

2.AuthProvider is the component that holds the authentication logic and provides it through the AuthContext to the rest of the app.

3.useEffect is used to initialize the session (via getSession) and listen for authentication state changes (via onAuthStateChange).

4.UserAuth is a custom hook that makes it easier for other components to access authentication data and methods without having to manually use useContext.