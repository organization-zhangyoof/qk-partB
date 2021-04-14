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
    
    return(
        <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
            <div>
                <Header {...headerProps}/>
            </div>
            <div>
                <Body {...bodyProps}/>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {...state};
  }
  
export default connect(mapStateToProps)(Home);