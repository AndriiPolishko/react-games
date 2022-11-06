import { useEffect, useState } from 'react';
import { buildBoard } from '@/utils';
import { IPlayer, KeyChar } from '@/types';

export const useBoard = (player: IPlayer, resetPlayer: () => void) => {
  const [board, setBoard] = useState(buildBoard());

  useEffect(() => {
    const updateBoard = (prevState: [KeyChar, string][][]) => {
      const newStage: [KeyChar, string][][] = prevState.map((row: [KeyChar, string][]) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
      }
      return newStage;
    };

    setBoard((prevState) => updateBoard(prevState));
  }, [player, resetPlayer]);

  return [board, setBoard] as const;
};
