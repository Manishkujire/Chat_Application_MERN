import React, { useContext } from 'react'
import { ChatContext } from '../../context/chatContext'
export default function PotentialChats() {
    const {potentialChats}=useContext(ChatContext)
console.log("potentialChat:",potentialChats)

  return (
    <>
    <div className="all-users">{
potentialChats&& potentialChats.map((user,index)=>{
  return (
    <div className="single-user" key={index}>{
      user.name}
      <span className='user-online'></span></div>
  )

})

}</div></>
  )
}
