import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Square from '../../components/square/square.js'
 
export default class Board extends Component {     

  checkIsWinnerMove(move) {
    return this.props.winnerMoves.includes(move);
  }

  render() {
    let props = this.props;     
    // return ( 
    //   <View>   
    //     {
    //       [[0,1,2],[3,4,5],[6,7,8]].map((item,index) => {
    //         return (
    //           <View className="board-row" key={index}>
    //             {item.map(child => {
    //               return (
    //                 // <Square value={this.props.squares[child]} index={child} key={child} />  
    //                 <Square value={child} index={child}/>  
    //               )
    //             })}
    //           </View>
    //         )
    //       })
    //     }
    //     {/* {
    //        <View className="board-row" key={index}>
    //         {
    //           [0,1,2].map((item,index) => {            
    //             // <Square value={this.props.squares[child]} index={child} key={child} />  
    //             return <Square value={0} index={0}/>                                 
    //           })           
    //         }
    //        </View>
    //     }    */}
    //   </View>
    // );

    return (
      <View> 
        <View className="board-row">
          <Square value={this.props.squares[0]} index={0} highlightWinner={this.checkIsWinnerMove(0)} />  
          <Square value={this.props.squares[1]} index={1} highlightWinner={this.checkIsWinnerMove(1)} />  
          <Square value={this.props.squares[2]} index={2} highlightWinner={this.checkIsWinnerMove(2)} />       
        </View>
        <View className="board-row">
          <Square value={this.props.squares[3]} index={3} highlightWinner={this.checkIsWinnerMove(3)} />  
          <Square value={this.props.squares[4]} index={4} highlightWinner={this.checkIsWinnerMove(4)} />  
          <Square value={this.props.squares[5]} index={5} highlightWinner={this.checkIsWinnerMove(5)} />      
        </View>
        <View className="board-row">
          <Square value={this.props.squares[6]} index={6} highlightWinner={this.checkIsWinnerMove(6)} />  
          <Square value={this.props.squares[7]} index={7} highlightWinner={this.checkIsWinnerMove(7)} />  
          <Square value={this.props.squares[8]} index={8} highlightWinner={this.checkIsWinnerMove(8)} />  
        </View>
      </View>
    );
  }
}