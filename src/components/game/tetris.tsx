import { useEffect, useState } from 'react';
import { Board } from '@/components';
import { useBoard, usePlayer } from '@/hooks';
import { HEIGHT, WIDTH } from '@/utils';

export const Tetris = () => {
  const [dropTime, setDropTime] = useState(1000);
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard(player);

  useEffect(() => {
    const movePlayer = (dir: number) => {
      if (player.pos.x + dir >= 0 && player.pos.x + player.tetromino[0].length + dir <= WIDTH)
        updatePlayerPos({ x: dir, y: 0, collided: false });
    };

    const drop = () => {
      if (player.pos.y < HEIGHT - player.tetromino.length) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
      } else {
        console.log('fuck');
      }
    };

    const dropPlayer = () => {
      drop();
    };

    const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
      if (keyCode === 37 && !repeat) {
        movePlayer(-1);
      } else if (keyCode === 39 && !repeat) {
        movePlayer(1);
      } else if (keyCode === 40 && !repeat) {
        dropPlayer();
      }
    };
    window.addEventListener('keydown', move);
    window.addEventListener('keyup', () => {
      setDropTime(1000);
    });

    return () => {
      window.removeEventListener('keydown', move);
      window.removeEventListener('keyup', () => {
        setDropTime(1000);
      });
    };
  }, [player, updatePlayerPos]);

  console.log(setBoard, resetPlayer, dropTime, player);

  return (
    <div className="Tetris">
      <Board board={board} />
    </div>
  );
};
