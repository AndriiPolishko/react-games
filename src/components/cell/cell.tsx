import React, { FC, memo } from 'react';
import { tetromino } from '@/utils';
import './cell.css';
import { KeyChar } from '@/types';

interface IProps {
  type: KeyChar;
}

const BoardCell: FC<IProps> = ({ type }) => {
  return <div className="Cell" style={{ backgroundColor: tetromino[type]?.color }} />;
};

export const Cell = memo(BoardCell);
