import { useEffect, useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import axios from "axios";
import { setUserLoginTrue,setUserLoginFalse } from "../redux/user/userLogin";
import { Navigate } from "react-router-dom"; 

interface prop {
    children: JSX.Element;
}

export function PrivateRoute({ children }: prop) {
    const userLogin = useSelector((state: RootState) => state.userLogin.value);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_DOMAIN;

    useEffect(() => {
        if (!userLogin) {
            axios.get(`${apiUrl}/api/v1/auth/checktoken`)
                .then(() => {
                    dispatch(setUserLoginTrue());
                })
                .catch(err => {
                    console.log(err);
                    dispatch(setUserLoginFalse())
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userLogin, dispatch, apiUrl]);

    if (loading) {
        return ;
    }

    return userLogin ? children : <Navigate to="/" replace />
}


export function TokenCheck({ children }: prop) {
    const userLogin = useSelector((state: RootState) => state.userLogin.value);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_DOMAIN;

    useEffect(() => {
        if (!userLogin) {
            axios.get(`${apiUrl}/api/v1/auth/checktoken`, {withCredentials: true})
                .then(() => {
                    dispatch(setUserLoginTrue());
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userLogin, dispatch, apiUrl]);

    if (loading) {
        return ;
    }

    return children
}




