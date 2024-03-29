import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context/chatContext'
import { AuthContext } from '../../context/AuthContext'
import unreadNotificationFunc from '../../utils/unreadNotificationFunc'

export default function Notificaion() {
    const [isOpen,setIsOpen]=useState(false)

    const {user}=useContext(AuthContext)
    const {notifications,userChats,allUsers}=useContext(ChatContext)
    console.log("notifications",notifications)

    const unreadNotifications=unreadNotificationFunc(notifications)
    const modifiedNotifications=notifications.map((n)=>{
        const sender=allUsers.find(user=>user._id==n.senderId)

        return({...n,senderName:sender?.name})
    })
console.log("unreadNotifications",unreadNotifications)
    console.log("m notifications",modifiedNotifications)

    


    const toggleIsOpen=(res)=>{
        setIsOpen(res)
    }
  return (
    <>
    <div className="notifications">
        <div className="notifications-icon" onClick={()=>{toggleIsOpen(!isOpen)}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg></div>
{isOpen?( 
<div className="notifications-box">
    <div className="notifications-header">
        <h3>Notifications</h3>
        <div className="mark-as-read">
            Mark all as read
        </div>
    </div>
</div>):null}
    </div>
    </>
  )
}
