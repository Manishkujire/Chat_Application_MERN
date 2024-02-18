import { createContext, useEffect, useState } from "react";
import { baseurl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [chatError, setChatError] = useState(null)
    const [potentialChats,setPotentialChats]=useState([])
    useEffect(()=>{
        const getUsers=()=>{

        }
        getUsers() 

    },[])
    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setChatError(null)
                setUserChats(null)
                setIsUserChatsLoading(true)
                const response = await getRequest(`${baseurl}/chats/${user?._id}`)
                if (response.error) {
                    setIsUserChatsLoading(false)
                    return setChatError(response.error)
                }
                setUserChats(response)
                setIsUserChatsLoading(false)
            }
        }
        getUserChats()
    }, [user])

    return <ChatContext.Provider value={{
        userChats, isUserChatsLoading, chatError
    }}>{children}</ChatContext.Provider>

}