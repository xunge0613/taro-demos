import Taro, { Component, Events } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Square from '../../components/square/square.js'
import Board from '../../components/board/board.js'
import './index.scss'
 
 
// 计算获胜规则
// @return {winner: 'X', moves: [a,b,c]} 
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        moves: [a,b,c],
      };
    }
  }
  return null;
}


export default class Index extends Component {
  constructor(props) {
    super(props);    

    this.state = {
      history: [{
        squares: Array(9).fill(''),
        point: {},
        index: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      highlightCurrent: {
        // time travel 时高亮当前步数
        status: false,      
      },
      isDescRecords: false,
      
    };
  }

  config = {
    navigationBarTitleText: '黑白棋'
  }

  componentWillMount () { }

  componentDidMount () { 
    // 监听一个事件，接受参数
    Taro.eventCenter.on('xxClick', (arg) => {
      // doSth
      // console.log('xx Click',arg)
      this.handleClick(arg.i)
    })
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const point = {
      x: i%3,
      y: parseInt(i/3),
    }
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        point: point,
        index: history.length,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      highlightCurrent: false,
    });
  }

  // time travel
  jumpTo(step) {
    console.log(step)
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      highlightCurrent: {
        status: true,       
      },
    });
  }

  // 倒序记录
  reverseRecords() {
    this.setState({
      isDescRecords: !this.state.isDescRecords,
    })
  }

  render () {
    const isDescRecords = this.state.isDescRecords;
    let history = this.state.history.concat(); // 深拷贝，以便于倒序不改变原数组
    const current = history[this.state.stepNumber]; 
    const winner = calculateWinner(current.squares);
    
     
    // 倒序
    if(isDescRecords) {
      history = history.reverse();
    } 

    const moves = history.map((step, move) => {
      // console.log( this.state.stepNumber,move)
      
      // console.log(jumpMove)
      if(isDescRecords) {
        // 倒序
        move = history.length - move - 1;        
      }      

      let jumpMove = move; // 必须使用临时变量记录待跳转值，否则会出错 TBD 可以研究一下
     
      const desc = move ?
        `Go to move #${move}, at (${step.point.x},${step.point.y})` :
        'Go to game start';
      return (
        <View key={move} className={ this.state.highlightCurrent.status && this.state.stepNumber === move ? 'highlight' : ''}>
          <View onClick={this.jumpTo.bind(this,jumpMove)}>{desc}</View>
        </View>
      );
    });
    

    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else {      
      //console.log(history.length)
      // 如果无人获胜，提示平局
      if(history.length === 10) {        
        status = 'Round Draw';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }      
    }


    return (
      // <Game />
      <View className="game">
        <View className="game-board">
          <Board 
            squares={current.squares}   
            winnerMoves={winner ? winner.moves : []}        
          />
        </View>
        <View className="game-info">
          <View>{ status }</View>
          <View>{ moves }</View>
        </View>
        <View className="action-list">
          <Button size="mini" type="primary" onClick={this.reverseRecords} >倒序记录</Button>
        </View>
      </View>
    )
  }
}

