import Taro, { Component, Events } from '@tarojs/taro'
import { View } from '@tarojs/components'
 

export default class Square extends Component {    
    constructor(props) {
        super(props);      
    }
    
    handleClick() {
        // this.props.handleClick();
        // 触发一个事件，传参
         
        Taro.eventCenter.trigger('xxClick', {i:this.props.index})
        // console.log(this.props)
        // console.log(this.props.index)
    }

    render () {
        return (
            <View className="square" onClick={this.handleClick}>
             {this.props.value}
            </View>
        )
    }
}