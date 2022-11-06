import { KeyChar, ITetromino, IPlayer } from '@/types';

export const WIDTH = 12;
export const HEIGHT = 20;

export const tetromino: ITetromino = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
    shape: [['I'], ['I'], ['I'], ['I']],
    color: 'red',
  },
  J: {
    shape: [
      [0, 'J'],
      [0, 'J'],
      ['J', 'J'],
    ],
    color: 'blue',
  },
  L: {
    shape: [
      ['L', 0],
      ['L', 0],
      ['L', 'L'],
    ],
    color: 'yellow',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: 'purple',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
    ],
    color: 'green',
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0, 'T', 0],
    ],
    color: 'orange',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
    ],
    color: 'lightgreen',
  },
};

export const randomTetrominoes = () => {
  const keys: KeyChar[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const indexKey = Math.floor(Math.random() * keys.length);
  const randKey: KeyChar = keys[indexKey];
  return tetromino[randKey];
};

export const buildBoard = () =>
  Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, (): [KeyChar, string] => [0, 'clear'])
  );

export const isColliding = (
  player: IPlayer,
  board: [KeyChar, string][][],
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !board[y + player.pos.y + moveY] ||
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }

  return false;
};
