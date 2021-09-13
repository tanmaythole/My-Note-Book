import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const UserAuth = (props) => {
    const [loggedin, setLoggedin] = useState(false);
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            setAuthToken(localStorage.getItem('auth-token'));
            setLoggedin(true);
        } else {
            setAuthToken("");
            setLoggedin(false);
        }
    }, [])


    return (
        <AuthContext.Provider value={{loggedin, setLoggedin, authToken, setAuthToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default UserAuth;