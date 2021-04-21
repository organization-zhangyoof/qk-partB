import React,{useState,useEffect } from'react'
import { Button } from 'antd';
import {connect} from 'dva';
import Header from './components/Header'
import Body from './components/Body'

const Home = (props) => {
    const {
        dispatch,
        homeModels
    } = props

    const bodyProps = {
        name:homeModels.name,
    }

    const headerProps = {
        setName: ()=>{
            dispatch({
                type:'homeModels/setName',
                payload:{value:12345}
            })
        }
    }
    const Consumer = window.__Consumer__
    console.log("props-------",props)
    console.log("Consumer-------",Consumer)
    const b = (a)=>{
        a = "发生改变"
    }
    return(
        <Consumer>
        {
            (value) => {
                console.log("***home***value------",value)
                return (
                    <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
                        <div>
                            <Header {...headerProps}/>
                        </div>
                        <div>
                            <Body {...bodyProps}/>
                            {/* <div>次出显示：{aaaa}</div>
                            <Button onClick ={()=>{b(aaaa)}}>4567897</Button> */}
                        </div>
                    </div>
                )
            }
        }
        </Consumer>
    )
    // return (
    //                     <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
    //                         <div>
    //                             <Header {...headerProps}/>
    //                         </div>
    //                         <div>
    //                             <Body {...bodyProps}/>
    //                         </div>
    //                     </div>
    //                 )
}
function mapStateToProps(state) {
    return {...state};
  }
  
export default connect(mapStateToProps)(Home);