import { Board } from '@/components';
import { useBoard, usePlayer } from '@/hooks';

export const Tetris = () => {
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard(player);

  const movePlayer = (dir: number) => {
    updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const move = ({ keyCode }: { keyCode: number }): void => {
    if (keyCode === 37) {
      movePlayer(-1);
    } else if (keyCode === 39) {
      movePlayer(1);
    }
  };

  console.log(setBoard, resetPlayer);

  return (
    <div className="Tetris" role="button" tabIndex={0} onKeyDown={move}>
      <Board board={board} />
    </div>
  );
};
