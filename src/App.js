import { useState } from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);//<--- filled with beginning state (single array of 9 nulls)
    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

    const xIsNext = (currentMoveIndex % 2) === 0;
    const currentSquares = history[currentMoveIndex];

    function handlePlay(nextSquares) {

        const nextHistory = [...history.slice(0, currentMoveIndex + 1), nextSquares];

        setHistory(nextHistory);//<---- Trigger re-render
        setCurrentMoveIndex(nextHistory.length - 1);
    }

    // Update status
    let status;
    let winningLetter = getTTTWinner(currentSquares);
    if (winningLetter) {
        status = winningLetter + " has won the game";
    } else {
        status = "Next turn: " + (xIsNext ? "X" : "0");
    }

    function jumpTo(nextMove) {
        setCurrentMoveIndex(nextMove);
    }


    const movesListItems = history.map((squaresSnapshot, moveIndex) => {

        let description = (moveIndex ? "Move #" + moveIndex : "Game start");

        return (
        <li key={moveIndex}>
            <button onClick={() => {
                jumpTo(moveIndex);
            }}>
                {description}
            </button>
        </li>
        );
    });


    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul>
                    {movesListItems}
                </ul>
            </div>
        </div>
    );
}

function Board({xIsNext, squares, onPlay}) {

    function handleSquareClick(i) {
        let winningLetter = getTTTWinner(squares);
        if (winningLetter) {
            console.log("Game already won by " + winningLetter);
            return; // Game already won
        }
        if (squares[i]) {
            console.log("Square already filled");
            return; // Square already filled
        }

        // Create a copy to modify
        const modifiedSquares = squares.slice();

        // Modify
        modifiedSquares[i] = (xIsNext ? "X" : "O");
        
        onPlay(modifiedSquares);
    }


    return (
        <>
            <div className="board-row">
                <Square
                    letter={squares[0]}
                    onClickHandler={() => handleSquareClick(0)}
                />
                <Square
                    letter={squares[1]}
                    onClickHandler={() => handleSquareClick(1)}
                />
                <Square
                    letter={squares[2]}
                    onClickHandler={() => handleSquareClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    letter={squares[3]}
                    onClickHandler={() => handleSquareClick(3)}
                />
                <Square
                    letter={squares[4]}
                    onClickHandler={() => handleSquareClick(4)}
                />
                <Square
                    letter={squares[5]}
                    onClickHandler={() => handleSquareClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    letter={squares[6]}
                    onClickHandler={() => handleSquareClick(6)}
                />
                <Square
                    letter={squares[7]}
                    onClickHandler={() => handleSquareClick(7)}
                />
                <Square
                    letter={squares[8]}
                    onClickHandler={() => handleSquareClick(8)}
                />
            </div>
        </>
    );
}

function Square({ letter, onClickHandler }) {
    return (
        <button className="square" onClick={onClickHandler}>
            {letter}
        </button>
    );
}

function getTTTWinner(squares) {
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
