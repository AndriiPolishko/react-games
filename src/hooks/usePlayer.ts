import { useCallback, useState } from 'react';
import { IPlayer } from '@/types';
import { randomTetrominoes, WIDTH } from '@/utils';

export const usePlayer = () => {
  const [player, setPlayer] = useState<IPlayer>({
    collided: false,
    pos: { x: 0, y: 0 },
    tetromino: randomTetrominoes().shape,
  });

  const updatePlayerPos = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }): void => {
    // eslint-disable-next-line no-return-assign
    setPlayer((prevState) => ({
      ...prevState,
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      collided: false,
      pos: { x: WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetrominoes().shape,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer] as const;
};
