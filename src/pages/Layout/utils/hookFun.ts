import React,{useState,useEffect} from 'react';

export const useChangeState = (params:any,b:any) =>{
    const [state,setSatte] = useState(null)
    useEffect(()=>{
        setSatte(params)
    },[b])
    return state
}