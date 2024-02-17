import { useState, useEffect } from "react";
import { baseurl, getRequest } from "../utils/services";


export const useFetchRecipient = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error,setError]=useState(null)

    const recipentId=chat?.members.find((id)=> id!=user?._id)

    useEffect(()=>{
        const getUser=async()=>{
            if(!recipentId) return null
            try{
            const response = await getRequest(`${baseurl}/users/find/${recipentId}`)
            setRecipientUser(response)
            }catch(err){
                let message
                    if (err.response?.data) {
                        message = err.response?.data
                    }
                    else {
                        message = err.message
                    }
                    return setError(message)
            }

        }
        getUser()

    })


    return {recipientUser}


}