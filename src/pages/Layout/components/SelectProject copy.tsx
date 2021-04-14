import React from 'react'
import {Input, Button, Icon} from 'antd'
const { Search } = Input;
import style from '../styles/selectProject.less'
/***
 * 选择项目
 */
class SelectProject extends React.Component{
    constructor(props:any){
        super(props)
        this.state = {
            selectId: '',
            selectProject: {},
            showScroll: false,
            projectData: []
        }
    }

    componentDidMount(){
        this.setState({projectData: this.props.projectList})
    }

    onSearchPrj(e:any){
        let name = e.target.value
        let prjData = []
        let data = this.props.projectList
        for(let i in data){
            if(data[i].name.indexOf(name) !== -1){
                prjData.push(data[i])
            }
        }
        this.setState({projectData: prjData})
    }

    chooseProject(item){
        this.setState({selectId: item.id, selectProject: item})
    }

    showHideScroll(value){
        this.setState({showScroll: value})
    }

    enterProject(){
      this.props.selectProject(this.state.selectProject)
    }

    render(){
        let {selectId, showScroll, projectData} = this.state
        let topicColor = window.__TOPIC_COLOR__
      return(
            <div className={style.selectProject}>
                <header>
                    <span className={style.selectProject_title}>项目列表</span>
                    <p className={style.selectProject_search}>
                        <Input placeholder="请输入项目名称"
                               onChange={value => this.onSearchPrj(value)}
                               suffix={<Icon type='search'/>}
                               size="large"
                        />
                    </p>
                </header>
                <div className={style.selectProject_project}>
                    <ul onMouseEnter={this.showHideScroll.bind(this, true)}
                        onMouseLeave={this.showHideScroll.bind(this, false)}
                        style={{overflow: showScroll ? 'auto' : 'hidden'}}>
                        {projectData.map((item, index) =>
                            <li key={item.id} onClick={this.chooseProject.bind(this, item)} style={{color: item.id == selectId && '#1890ff'}}>
                                <span title={item.name}>{item.name}</span>
                                <span>{item.id == selectId && <Icon type="check" style={{color: topicColor}}/>}</span>
                            </li>
                        )}
                    </ul>
                </div>
                <footer>
                  <button onClick={this.enterProject.bind(this)} style={{background: topicColor}}>进入项目</button>
                </footer>
            </div>
        )
    }
}
export default SelectProject

