const CANVAS = document.getElementById('game_canvas');
const CTX = CANVAS.getContext('2d', {
    powerPreference: "high-performance"
  });



let grass = new Image();

grass.src="images/grass.png"

CTX.rect(20, 20, 150, 100);
CTX.fillStyle = "red";
CTX.fill();
CTX.drawImage(grass,0,300);
  
for (let i = 0;i < 1200;i+=60){
    CTX.drawImage(grass,i,150);
}
console.log("Canvas initialized",grass);