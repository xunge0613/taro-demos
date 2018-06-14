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
        squares: Array(9).fill(''),
        point: {},
      }],
      stepNumber: 0,
      xIsNext: true,
      highlightCurrent: {
        // time travel 时高亮当前步数
        status: false,      
      }
      
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
        point: point
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      highlightCurrent: false,
    });
  }

  // time travel
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      highlightCurrent: {
        status: true,       
      },
    });
  }

  render () {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; 
    const winner = calculateWinner(current.squares);
   
    const moves = history.map((step, move) => {
      // console.log( this.state.stepNumber,move)
      let isHighlight = this.state.highlightCurrent.status && this.state.stepNumber == move; // 高亮当前选择的步骤
      const desc = move ?
        `Go to move #${move}, at (${step.point.x},${step.point.y})` :
        'Go to game start';
      return (
        <View key={move} className={ isHighlight ? 'highlight' : ''}>
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

