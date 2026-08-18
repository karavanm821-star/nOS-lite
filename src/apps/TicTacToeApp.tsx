import React, { useState } from 'react';

export default function TicTacToeApp() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(s => s !== null);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black/20 text-slate-200 p-4">
      <div className="mb-6 text-xl font-bold bg-white/10 px-6 py-2 rounded-full border border-white/10">
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell, i) => (
          <button
            key={i}
            className="w-20 h-20 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-4xl font-bold flex items-center justify-center transition-colors"
            onClick={() => handleClick(i)}
          >
            <span className={cell === 'X' ? 'text-indigo-400' : 'text-rose-400'}>{cell}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={reset}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-900/20"
      >
        Restart Game
      </button>
    </div>
  );
}
