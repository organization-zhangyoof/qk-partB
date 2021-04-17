import React, {useState,useEffect} from 'react';
import { Input, Button, Icon } from 'antd'
import '../styles/selectProject.less'

import * as CF from '../utils/commonFun'
const { Consumer,selectProject } = CF
interface ordinaryObj {
    [propName: string] : any;
}
export default (props: any) => {
    const [result,setResult] = useState<ordinaryObj>({})
    return (
        <Consumer>
            {({projectList = [],setState}) => {
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
                                    projectList.map((item:any)=>{
                                        return (
                                            <div className={item.id == result.id?'_select_project_body_item_choice_':'_select_project_body_item_'}
                                                onClick={(e:any)=>setResult(item)} 
                                                key={item.id}
                                            >
                                                <div className="name">{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                            <div className="_select_project_footer_">
                                <Button type="primary" 
                                    onClick={()=>{selectProject({setState,project:result})}}>
                                    进入项目
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Consumer>

    );
};
 
