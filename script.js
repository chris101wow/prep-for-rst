const CANVAS = document.getElementById('game_canvas');
const CTX = CANVAS.getContext('2d');




let grass = new Image();

grass.src = 'images/grass.png';

for (let i = 0;i < 1200;i+=60){
CTX.drawImage(grass,i,150);
}
console.log("Canvas initialized",grass);