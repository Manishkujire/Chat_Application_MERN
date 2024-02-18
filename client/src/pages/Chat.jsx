import React, { useEffect } from 'react'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chatContext';
import UserChat from '../components/chat/UserChat';
import PotentialChats from '../components/chat/PotentialChats'
export default function Chat() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user])


  const { userChats, isUserChatsLoading, chatError } = useContext(ChatContext)
  console.log(userChats)
  return (
    <>
      <Container>
        {userChats?.length < 1 ? null : (<Stack direction='horizontal' gap={4} className='align-items-start'>
          <Stack className='messages-box  flex-grow-0 pe-3' gap={3} >
     <PotentialChats/>       {
 isUserChatsLoading?(<p>Loading...</p>):(userChats?.map((chat,index)=>{
  return(<div key={index}>
    <UserChat chat={chat} user={user}/>
  </div>)
 }))         
}</Stack>
          <p>ChatBox</p>
        </Stack>)}
      </Container></>

  )
}
