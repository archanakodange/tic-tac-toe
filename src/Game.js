import React, { Component } from 'react';
import Board from './Board';
import './Game.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Game extends Component {
  constructor(props) {
    super(props);
      this.state = {
          history: [
              {
                  squares: Array(9).fill(null)
              }
          ],
          stepNumber: 0,
          xIsNext: true
      };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: [...this.state.history, { squares: squares }],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            history: this.state.history.slice(0, step + 1),
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <Button variant="contained" color="primary" onClick={() => this.jumpTo(move)}>{desc}</Button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="container">
        <h1>Tic-Tac-Toe</h1>
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <Paper elevation={3} square={false} className='papercss'>
            <div>{status}</div>
            <ol>{moves}</ol>
          </Paper>
        </div>
        </div>
        </div>
    );
  }
}

// ========================================


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game