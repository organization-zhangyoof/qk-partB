import React, {useState,useEffect} from 'react';
import { Input, Button, Icon } from 'antd'
import '../styles/selectProject.less'

import * as CF from '../utils/commonFun'
const { Consumer } = CF

export default (props: any) => {
    const [selectId,setSelectId] = useState('')
    console.log('selectId----',selectId)
    return (
        <Consumer>
            {({projectList,changeBasalInfo}) => {
                return (
                    <div className="_ewec_layout_select_project_">
                        <div className="_select_project_container_">
                            <div className="_select_project_header_">
                                <div className="title">项目列表</div>
                                <div className="search">
                                    <Input placeholder="请输入项目名称"
                                        //    onChange={value => this.onSearchPrj(value)}
                                        suffix={<Icon type='search' style={{ cursor: 'pointer' }} />}
                                        size="large"
                                    />
                                </div>
                            </div>
                            <div className="_select_project_body_">
                                {
                                    projectList?.map((item:any)=>{
                                        return (
                                            <div className={item.id == selectId?'_select_project_body_item_choice_':'_select_project_body_item_'}
                                                onClick={(e:any)=>setSelectId(item.id)} 
                                                key={item.id}
                                            >
                                                <div className="name">{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                            <div className="_select_project_footer_">
                                <Button type="primary" onClick={()=>changeBasalInfo({isChangState:false,})}>进入项目</Button>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Consumer>

    );
};
 
