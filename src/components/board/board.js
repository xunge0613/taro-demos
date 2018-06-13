import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Square from '../../components/square/square.js'
 
export default class Board extends Component {     

  render() {     
    return (
      <View>   
        <View className="board-row">
          <Square value={this.props.squares[0]} index={0}/>  
          <Square value={this.props.squares[1]} index={1} />  
          <Square value={this.props.squares[2]} index={2} />         
        </View>
        <View className="board-row">
          <Square value={this.props.squares[3]} index={3} />  
          <Square value={this.props.squares[4]} index={4} />  
          <Square value={this.props.squares[5]} index={5} />        
        </View>
        <View className="board-row">
          <Square value={this.props.squares[6]} index={6} />  
          <Square value={this.props.squares[7]} index={7} />  
          <Square value={this.props.squares[8]} index={8} />  
        </View>
      </View>
    );
  }
}