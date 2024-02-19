import React, { useContext } from 'react'
import { Container, Nav, Navbar, Stack, Button } from 'react-bootstrap'
import profile_pic from "../../assets/profile_pic.svg"
import { useFetchRecipient } from "../../hooks/useFetchRecipient"
import { ChatContext } from '../../context/chatContext'
export default function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipient(chat, user)

  // console.log(recipientUser)
  return (
    <Stack direction='horizontal' gap={3} className='user-card align-items-center p-2 justify-content-between' role="button" >
      <div className='d-flex align-items-center'>
        <div className="me-2 ">
          <img src={profile_pic} height="45px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">textmessage</div>
          
        </div>

      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2024</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>

      </div>
      
    </Stack>
  )
}
