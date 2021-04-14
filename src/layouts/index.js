import React,{Component} from'react'
import Basis from '@/pages/basis/Basis'
class BasicLayout extends Component {
    render(){
        return (
                <Basis>
                    {this.props.children}
                </Basis>
        )
    }
}

export default BasicLayout;
