import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const [data,setData] = useState(null)
export const loginCall = async(user,dispatch)=>{
    dispatch({type:"LOGIN_START"}); 
    try{
        if (res.status === 201) {
          const res = await axios.post("http://localhost:8003/api/auth/login",user);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            toast.success('Login successful');
          } else{
            dispatch({type:"LOGIN_FAILURE",payload:err.res.data});
            toast.error('Login failed. Please check your credentials and try again.');
          }
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err});
        toast.error('Login failed. Please check your credentials and try again.');
        console.log("login error", err);
    }
}

