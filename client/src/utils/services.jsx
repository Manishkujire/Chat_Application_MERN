export const serverBaseUrl = "http://192.168.1.7:5000/api";
export const socketBaseUrl = "http://192.168.1.7:3000";
import axios from "axios"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
export const postRequest = async (url, body) => {
    
    try{
    const response=await axios.post(url,body,config)

    const data=response.data
    

    return data
}catch(err){
    let message
        if (err.response?.data) {
            message = err.response?.data
        }
        else {
            message = err.message
        }
        return { error: true, message }
}

}


export const getRequest =async(url)=>{
    const response=await axios.get(url)
    try{
        const response=await axios.get(url,config)
        const data=response.data

        return data
    }catch(err){
        let message
            if (err.response?.data) {
                message = err.response?.data
            }
            else {
                message = err.message
            }
            return { error: true, message }
    }
}