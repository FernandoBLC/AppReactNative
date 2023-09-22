import * as React from 'react';
import { useDispatch } from 'react-redux';
import { changeCredentials } from '../store/loginSlice/LoginSlice';

function LoginAuth() {
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();

    const login = (dataUser) => {
        setIsLoading(true);
        console.log("Esto es dataUser\n", dataUser);
        if (dataUser.user === "admin" && dataUser.pass === "test") {
            dispatch(changeCredentials({
                user: dataUser.user,
                pass: dataUser.pass,
            }));
            return 1;
        } else{
            return 0;
        }
    }

    return {
        isLoading,
        dispatch,
        login,
    }
}

export default LoginAuth;