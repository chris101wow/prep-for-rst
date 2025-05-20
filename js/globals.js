export const CANVAS = document.getElementById('game_canvas');
export const CTX = CANVAS.getContext('2d', {
    powerPreference: "high-performance"
  });

export const FPS = 60;
export const MS_PER_FRAME = 1000 / FPS;
export function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export let board = [[0, 17, 17, 17, 17, 17, 17, 21, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 2],
  [15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 16],
  [15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 16],
  [19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 16],
  [15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 16],
  [15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20],
  [15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 16],
  [15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 16],
  [15, 22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 16],
  [1, 14, 14, 14, 14, 14, 14, 18, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 3]]


  
export default {CANVAS , CTX, FPS , MS_PER_FRAME,board,randint}
