import { Board } from '@/components';
import { buildBoard } from '@/utils';

export const Tetris = () => {
  return (
    <div className="Tetris">
      <Board board={buildBoard()} />
    </div>
  );
};
