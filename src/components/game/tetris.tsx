import { useCallback, useEffect, useState } from 'react';
import { Board } from '@/components';
import { useBoard, useInterval, usePlayer } from '@/hooks';
import { isColliding } from '@/utils';
import './tetris.css';

export const Tetris = () => {
  const [dropTime, setDropTime] = useState(500);
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard(player, resetPlayer);

  const movePlayer = useCallback(
    (dir: number) => {
      if (!isColliding(player, board, { x: dir, y: 0 }))
        updatePlayerPos({ x: dir, y: 0, collided: false });
      else {
        updatePlayerPos({ x: 0, y: 0, collided: true });
      }
    },
    [board, player, updatePlayerPos]
  );

  const drop = useCallback(() => {
    if (!isColliding(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [board, player, updatePlayerPos]);

  const dropPlayer = useCallback(() => {
    setDropTime(50);
    drop();
  }, [drop]);

  const move = useCallback(
    ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
      if (keyCode === 37 && !repeat) {
        movePlayer(-1);
      } else if (keyCode === 39 && !repeat) {
        movePlayer(1);
      } else if (keyCode === 40 && !repeat) {
        dropPlayer();
      }
    },
    [dropPlayer, movePlayer]
  );

  useEffect(() => {
    window.addEventListener('keydown', move);
    window.addEventListener('keyup', () => {
      setDropTime(500);
    });

    return () => {
      window.removeEventListener('keydown', move);
      window.removeEventListener('keyup', () => {
        setDropTime(500);
      });
    };
  }, [move]);

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div className="Tetris">
      <Board board={board} />
    </div>
  );
};
