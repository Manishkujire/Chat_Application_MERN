import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, getRequest, postRequest } from "../utils/services";
import axios from "axios";
import { json } from "react-router-dom";
import { io } from "socket.io-client"
export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [chatError, setChatError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessageLoading, setIsMessageLoading] = useState(false)

    const [sendTextMessageError, setSendTextMessageError] = useState(null)

    const [newMessage, setNewMessage] = useState(null)

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const [notifications, setNotifications] = useState([])
    console.log("notifications", notifications)

    useEffect(() => {
        const newSocket = io("http://192.168.87.117:3000")
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [user])


    useEffect(() => {

        if (socket == null) return
        socket.emit("addNewUser", user?._id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })


    }, [socket])
    useEffect(() => {
        if (socket == null) return
        let recipentId = currentChat?.members.find((id) => id != user?._id)

        socket.emit("sendMessage", { ...newMessage, recipentId })


    }, [newMessage])

    //recieve msg and ntfctn

    useEffect(() => {
        if (socket == null) return

        socket.on("getMessage", (res) => {

            if (currentChat?._id !== res.chatId) return

            setMessages((pre) => [...pre, res])
        })

        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members.some(id => id === res.senderId)
            if (isChatOpen) {
                setNotifications(pre => [{ ...res, isRead: true }, ...pre])
            } else {
                setNotifications(pre => [ res,...pre])
            }
        })

        return () => {
            socket.off("getMessage")
            socket.off("getNotification")
        }

    }, [socket, currentChat])


    useEffect(() => {


        const getMessages = async () => {
            setChatError(null)
            setIsMessageLoading(true)
            setMessages(null)
            try {
                const response = await getRequest(`${baseurl}/messages/${currentChat?._id}`)
                setMessages(response)
                setIsMessageLoading(false)

            } catch (err) {
                setIsMessageLoading(false)
                return setChatError(err)

            }
        }
        getMessages()

    }, [currentChat])

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
            return setChatError(err)

        }
    }, [])

    const updateCurrentChat = useCallback((chat) => {

        setCurrentChat(chat)
    }, [])


    const sendTextMessage = useCallback(async (text, senderId, chatId, setTextMessage) => {
        if (!text) return console.log("empty")
        try {
            const response = await postRequest(`${baseurl}/messages`, JSON.stringify({
                chatId, senderId, text
            }))
            setNewMessage(response)
            setTextMessage("")
            setMessages((pre) => [...pre, response])
        }
        catch (err) {
            setSendTextMessageError(err)
        }
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
        userChats, isUserChatsLoading, chatError, potentialChats, createChat, updateCurrentChat, currentChat, isMessageLoading, messages, sendTextMessage, onlineUsers,notifications
    }}>{children}</ChatContext.Provider>

}