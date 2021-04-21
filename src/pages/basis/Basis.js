import React,{useState,useEffect } from'react'
import styles from './index.less'
import Layout from '../Layout/index'
import Home from '../home/Home'
const Body = (props) => {
    return(
        // <div className = {styles._basis_main_}>
        //     <div className={styles.header}></div>
        //     <div className = {styles.bsis_body}>
        //         <div className = {styles.navBar}></div>
        //         <div className = {styles.container}>
        //             {props.children}
        //         </div>
        //     </div>
        // </div>
        <Layout><Home/></Layout>
    )
}

export default Body;