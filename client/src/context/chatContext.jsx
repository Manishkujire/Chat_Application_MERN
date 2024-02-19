import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, getRequest, postRequest } from "../utils/services";
import axios from "axios";
import { json } from "react-router-dom";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [chatError, setChatError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)

    const [messages, setMessages] = useState(null)
    console.log("current",currentChat)
    console.log("message",messages)
    useEffect(()=>{


        const getMessages=async()=>{
        setChatError(null)
        setMessages(null)
        try {
            const response = await getRequest(`${baseurl}/messages/${currentChat?._id}`)
            setMessages(response)

        } catch (err) {
            return setChatError(err)

        }}
        getMessages()

    },[currentChat])

    useEffect(() => {
        const getUsers = async () => {
            setChatError(null)
            try {
                const response = await getRequest(`${baseurl}/users`)

                const pChats = response.filter((u) => {
                    let isChatCreated
                    if (user._id === u._id) return false

                    if (userChats) {
                        isChatCreated = userChats?.some((chat) => {
                            return chat.members[0] === u._id || chat.members[1] === u._id
                        })

                    }
                    return !isChatCreated


                })
                setPotentialChats(pChats)

            } catch (err) {
                return setChatError(err)

            }

        }
        getUsers()

    }, [userChats])

    const createChat = useCallback(async (firstId, secondId) => {
        setChatError(null)

        try {
            const response = await postRequest(`${baseurl}/chats`, JSON.stringify({
                firstId, secondId
            }))
            setUserChats((pre) => [...pre, response])

        } catch (err) {
            console.log("err", err)
            return setChatError(err)

        }
    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])




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
        userChats, isUserChatsLoading, chatError, potentialChats, createChat,updateCurrentChat
    }}>{children}</ChatContext.Provider>

}