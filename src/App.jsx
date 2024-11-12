import React from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      winner: null, 
      isDraw: false 
    };
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  clickHandler = (event) => {
    const data = event.target.getAttribute('data');
    const currentSquares = [...this.state.squares];

    if (this.state.winner || this.state.isDraw || currentSquares[data]) {
      return;
    }

    currentSquares[data] = this.state.count % 2 === 0 ? 'X' : 'O';

    const s = currentSquares[data];
    let winnerFound = false;
    for (let i = 0; i < this.winnerLine.length; i++) {
      const [a, b, c] = this.winnerLine[i];
      if (currentSquares[a] === s && currentSquares[b] === s && currentSquares[c] === s) {
        winnerFound = true;
        break;
      }
    }

    if (winnerFound) {
      this.setState({ squares: currentSquares, winner: s });
    } else {
      const isDraw = !currentSquares.includes(null);
      this.setState({ squares: currentSquares, count: this.state.count + 1, isDraw });
    }
  };

  resetGame = () => {
    this.setState({
      squares: Array(9).fill(null),
      count: 0,
      winner: null,
      isDraw: false
    });
  };

  render() {
    return (
      
      <div className="game-container">
        <div className="tic-tac-toe">
          {this.state.squares.map((value, index) => (
            <div
              key={index}
              className="ttt-grid"
              onClick={this.clickHandler}
              data={index}
              data-player={value}
            >
              {value}
            </div>
          ))}
        </div>

        {(this.state.winner || this.state.isDraw) && (
          <div className="winner-message">
            {this.state.winner ? (
              <p>{this.state.winner} победил!</p>
            ) : (
              <p>Ничья!</p>
            )}
            <button onClick={this.resetGame} className="restart-button">Рестарт</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
