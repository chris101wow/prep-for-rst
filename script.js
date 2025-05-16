const CANVAS = document.getElementById('game_canvas');
const CTX = CANVAS.getContext('2d', {
    powerPreference: "high-performance"
  });


let grass = new Image();

grass.src="images/poolleft.png"



CTX.fillRect(0, 0, 100, 100); // 100 pixels wide, 50 pixels tallCTX.fillStyle = "red";
CTX.fill();
function draw(){
CTX.drawImage(grass,0,300);
for (let j = 0; j < 720;j+=60){  
for (let i = 0;i < 1200;i+=60){
    CTX.drawImage(grass,i,j);
}
}
}
console.log("Canvas initialized",grass);

draw()
grass.onload = function() {draw()}
