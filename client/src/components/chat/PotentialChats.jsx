import React, { useContext } from 'react'
import { ChatContext } from '../../context/chatContext'
import { AuthContext } from '../../context/AuthContext'

export default function PotentialChats() {
  const {user}=useContext(AuthContext)
    const { potentialChats,createChat } = useContext(ChatContext)

  return (
    <>
      <div className="all-users">{
        potentialChats && potentialChats.map((chat, index) => {
          return (
            <div className="single-user" key={index} onClick={()=>createChat(user._id,chat._id)}>{
              chat.name}
              <span className='user-online'></span></div>
          )

        })

      }</div></>
  )
}



