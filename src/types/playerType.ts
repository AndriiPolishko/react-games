import { KeyChar } from '@/types';

export interface IPlayer {
  pos: {
    x: number;
    y: number;
  };
  tetromino: KeyChar[][];
  collided: boolean;
}
