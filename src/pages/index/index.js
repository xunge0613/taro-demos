import Taro, { Component, Events } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Square from '../../components/square/square.js'
import Board from '../../components/board/board.js'
import './index.scss'
 
 
// 计算获胜规则
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
      return squares[a];
    }
  }
  return null;
}


export default class Index extends Component {
  constructor(props) {
    super(props);    

    this.state = {
      history: [{
        squares: Array(9).fill('')
      }],
      stepNumber: 0,
      xIsNext: true
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
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // time travel
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render () {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
   
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <View key={move}>
          <View onClick={this.jumpTo.bind(this,move)}>{desc}</View>
        </View>
      );
    });
    

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      // <Game />
      <View className="game">
        <View className="game-board">
          <Board 
            squares={current.squares}           
          />
        </View>
        <View className="game-info">
          <View>{ status }</View>
          <View>{ moves }</View>
        </View>
      </View>
    )
  }
}

