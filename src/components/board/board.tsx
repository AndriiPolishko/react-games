import { FC } from 'react';
import { Cell } from '@/components';
import { IBoard } from '@/types';
import './board.css';

export const Board: FC<IBoard> = ({ board }) => {
  return (
    <div className="Board">
      {board.map((row) => {
        return row.map((cell) => {
          return <Cell key={Math.random()} type={cell[0]} />;
        });
      })}
    </div>
  );
};
