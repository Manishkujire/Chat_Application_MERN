import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, serverBaseUrl } from "../utils/services";





export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {



    const [user, setUser] = useState(null)
    const [regInfo, setRegInfo] = useState({
        name: "", email: "", password: ""
    })
    const [logInfo, setLogInfo] = useState({
        email: "", password: ""
    })
    const [authError, setAuthError] = useState(null)
    const [isRegLoading, setIsRegLoading] = useState(false)
    useEffect(() => {
        let user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])

    const updateRegInfo = useCallback((info) => {
        setRegInfo(info)

    }, [])
    const updateLogInfo = useCallback((info) => {
        setLogInfo(info)

    }, [])

    const resetError = useCallback(() => {
        setAuthError(null)
    }, [])


    const registerUser = useCallback(async (e) => {
        setIsRegLoading(true);
        setAuthError(null);
        const response = await postRequest(`${serverBaseUrl}/users/register`, JSON.stringify(regInfo));

        if (response.error) {
            setIsRegLoading(false);
            return setAuthError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        setIsRegLoading(false);

    }, [regInfo]);

    const loginUser = useCallback(async (e) => {
        setIsRegLoading(true);
        setAuthError(null);
        const response = await postRequest(`${serverBaseUrl}/users/login`, JSON.stringify(logInfo));

        if (response.error) {
            setIsRegLoading(false);
            return setAuthError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        setIsRegLoading(false);

    }, [logInfo]);


    const logutUser = useCallback(() => {
        setUser(null)
        localStorage.removeItem("User")
    }, [])

    return <AuthContext.Provider value={{ user, logInfo,regInfo, updateRegInfo,updateLogInfo, registerUser, isRegLoading, authError, resetError, logutUser ,loginUser}}>
        {children}
    </AuthContext.Provider>
}