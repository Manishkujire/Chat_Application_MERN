import { createContext, useEffect, useState } from "react";
import { baseurl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [chatError, setChatError] = useState(null)
    const [potentialChats,setPotentialChats]=useState([])
    useEffect(()=>{
        const getUsers= async()=>{
            setChatError(null)
            try{
            const response = await getRequest(`${baseurl}/users`)
            
            const pChats=response.filter((u)=>{
                let isChatCreated
                if(user._id===u._id) return false

                if(userChats){
                   isChatCreated= userChats?.some((chat)=>{
                        return chat.members[0]===u._id||chat.members[1]===u._id
                    })
                    console.log("hii:",isChatCreated)

                }
                return !isChatCreated


            })
            console.log("pchats:",pChats
            )
            setPotentialChats(pChats)

        }catch(err){
            console.log("err",err)
                return setChatError(err)

        }

        }
        getUsers() 

    },[userChats])




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
        userChats, isUserChatsLoading, chatError,potentialChats
    }}>{children}</ChatContext.Provider>

}