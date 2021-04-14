import React,{useState,useEffect } from'react'

const Body = (props) => {
    return(
        <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
            this is react ahook api test page
            <p>name: {props.name}</p>
        </div>
    )
}

export default Body;