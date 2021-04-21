import React,{useState,useEffect } from'react'
import { Button } from 'antd';

const Header = (props) => {
    const {
        setName
    } = props
    const Consumer = window.__Consumer__
    return(
        <Consumer>
        {
            (value)=>{
                console.log("13--------",value)
                const {_setBasalState} = value
                return(
                    <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
                        <Button onClick={()=>_setBasalState()}>设置名称</Button>
                        <h3>this is qk-part3-home</h3>
                    </div>
                )
            }
        }
        </Consumer>
    )
    // return(
    //     <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
    //         <Button onClick={setName}>设置名称</Button>
    //         <h3>this is qk-part3-home</h3>
    //     </div>
    // )
}

export default Header;