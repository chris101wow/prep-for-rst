import {Entity,Noodle,Shark_class} from "./entity.js";
// import { performance } from "perf_hooks";
import { CANVAS,CTX, MS_PER_FRAME,randint ,FPS,board} from "./globals.js";
let sharks = []
let shooters  = []
const Player = new Entity(0,5,22,"player") 

  document.addEventListener("keyup", keypress);

// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

let noodles = []
let counter = 0
let index = 0

// let board = [[17,17,17,0,0,0,0,0,0,0,0,0,17,17,17,17,17,0,17,0],
//               [5,5,5,0,0,0,0,0,0,0,0,0,5,5,5,5,9,0,5,0],
//               [5,0,5,5,0,0,5,5,5,9,0,0,5,5,5,5,5,0,5,0],
//               [5,0,0,5,5,0,5,0,0,5,5,0,5,0,0,0,5,0,5,0],
//               [5,0,0,0,9,5,5,0,0,0,5,5,5,0,0,0,5,5,5,0],
//               [22,0,0,0,9,5,5,0,0,0,5,5,5,0,0,0,5,5,5,0],
//               [5,0,0,5,5,0,5,0,0,5,5,0,5,0,0,0,5,5,5,0],
//               [5,0,5,5,0,0,5,5,5,9,0,0,5,5,5,5,5,5,5,0],
//               [5,5,5,0,0,0,0,0,0,0,0,0,5,5,5,5,9,0,5,0],
//               [14,14,14,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,14,0]]

function keypress(event){
  // console.log(event.keyCode,Player.x,Player.y,board[Player.y-1][Player.x])
  if(event.keyCode == 87 && Player.y != 0){
    if(board[Player.y - 1][Player.x] < 14 && board[Player.y - 1][Player.x] > 4){
      board[Player.y][Player.x] = 5
      Player.y -=1
      board[Player.y][Player.x] = 22
      for ( let i of sharks){
        check_dash(Player,i)
      }
    }
  }else if (event.keyCode == 65 && Player.x != 0){
    if(board[Player.y][Player.x-1] < 14 && board[Player.y ][Player.x-1] > 4){
      board[Player.y][Player.x] = 5
      Player.x -=1
      board[Player.y][Player.x] = 22
      for ( let i of sharks){
        check_dash(Player,i)
      }
    }
  }else if (event.keyCode == 83 && Player.y != 9){
    if(board[Player.y + 1][Player.x] < 14 && board[Player.y + 1][Player.x] > 4){
      board[Player.y][Player.x] = 5
      Player.y +=1
      board[Player.y][Player.x] = 22
      for ( let i of sharks){
        check_dash(Player,i)
      }
    }
  }else if (event.keyCode == 68  && Player.x != 19){
    if(board[Player.y][Player.x+1] < 14 && board[Player.y][Player.x+1] > 4){
      board[Player.y][Player.x] = 5
      Player.x +=1
      board[Player.y][Player.x] = 22
      for ( let i of sharks){
        check_dash(Player,i)
      }
    }
  }
}


// grass.src="images/poolleft.png"
function draw(){
  
  for(let i in board){
    for(let j in board[i]){
      CTX.drawImage(pics[board[i][j]],j*60,i*60)
    }
  }
}


let pics = []
function LoadImages(n = 0 ){
  let img = new Image()
  img.src = `../images/${n}.png`
  pics.push(img)
  console.log(n)
  if (n == 24){
    img.onload = function() {innit()}
    return
  }
  img.onload = function() {LoadImages(n+1)}

}
LoadImages()

let frame_time = performance.now()
function innit(){
  for (let i  = 0; i < 10;i++){
    for (let j = 0 ;j <20;j++){
      if (board[i][j] == 0){
        if(randint(0,1)){
          board[i][j]= randint(0,4)
        }
      }else if(board[i][j] == 9){
        sharks.push(new Shark_class(j,i,9,"shark"))
      }else if(board[i][j] < 22 && board[i][j] > 17){
        shooters.push(new Entity(j,i,board[i][j],"shooter"))
        noodles.push(new Noodle(0,0,8,"noodles"))
        noodles.push(new Noodle(0,0,8,"noodle"))
      }else if(board[i][j] == 22){
        Player.x = j
        
        Player.y = i
        
      }
    }
  }
  update()
}

function check_dash(player,shark){
  if(shark.dashing){
    return
  }
  let originaldir = shark.direction
  let low = -1
  let high = -1
  if(player.x == shark.x){
      if (player.y > shark.y){
          low = shark.y 
          high = player.y
          shark.direction = 3
      }else{
          low = player.y
          high = shark.y
          shark.direction = 2

      }
      for (let i = low; i < high; i++){
          if((board[i][shark.x ]< 5 && board[i][shark.x ] > -1) || (board[i][shark.x ]< 22 && board[i][shark.x ] > 13)){
              shark.direction = originaldir
              return false     
          }
      }
      shark.dashing = true
      return true
  } else if(player.y == shark.y){
      if (player.x > shark.x){
          low = shark.x 
          high = player.x
          shark.direction = 1
      }else{
          low = player.x
          high = shark.x
          shark.direction = 0
      }
      for (let i = low; i < high; i++){
        if((board[shark.y][i ]< 5 && board[shark.y][i] > -1) || (board[shark.y][i]< 22 && board[shark.y][i] > 13)){
          shark.direction = originaldir
          return false     
        }
      }
      shark.dashing = true
      return true
  }
}
function update() {
  // console.log("hi")
  // Prepare for the next frame
    requestAnimationFrame(update)
   
  /*** Desired FPS Trap ***/ 
  const NOW = performance.now() 
  const TIME_PASSED = NOW - frame_time 
   
  if (TIME_PASSED < MS_PER_FRAME) return 
   
  const EXCESS_TIME = TIME_PASSED % MS_PER_FRAME 
  frame_time = NOW - EXCESS_TIME 
  /*** END FPS Trap ***/ 
  counter ++

  if (counter % 3 == 0){
    for(let i of noodles){
      if(i.active){
        i.move()
      }
    }
  }
  if(counter % 30 == 0){
    if(randint(0,2)){
      for (let i of sharks){
        if(!i.dashing){
          i.direction = randint(0,3)
          i.shark_move()
          board[i.y][i.x] = i.img
          check_dash(Player,i)
        }
      }
    }
    if(!randint(0,2)){
      console.log("heresss")
      for(let i of shooters){
        noodles[index].recreate(i)

        index ++ 
        if(index>noodles.length-1){
          index = 0
        }
      }
    }
  }
  if(counter % 5 == 0){
    for(let i of sharks){
      if(i.dashing){
        i.shark_move()
        board[i.y][i.x] = i.img
      }
    }
  }
  // Clear the canvas
  // CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); 
   
  draw()

  } 

  // update()
// CTX.fillRect(0, 0, 100, 100); // 100 pixels wide, 50 pixels tallCTX.fillStyle = "red";
// CTX.fill();

// console.log("Canvas initialized",grass);

