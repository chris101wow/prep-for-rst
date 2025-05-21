import {CANVAS , CTX, FPS , MS_PER_FRAME,board,randint} from './globals.js';
 

export class Entity{
    constructor(x,y,img,type) {
        this.type = type
        this.x = x
        this.y = y
        this.img = img
    }
}
let shark_moves = {
  0 : [-1,0],
  1 : [1,0],
  2 : [0,-1],
  3 : [0,1]
}
export class Shark_class extends Entity {
    dashing = false
    direction = 0
    constructor(x,y,img,type) {
        super(x,y,img,type)
    }
    shark_move(){
        let chosen_move = shark_moves[this.direction]
        if(board[this.y + chosen_move[1]][this.x + chosen_move[0]]< 14 && board[this.y + chosen_move[1]][this.x + chosen_move[0]] > 4 || board[this.y + chosen_move[1]][this.x + chosen_move[0]]< 25 && board[this.y + chosen_move[1]][this.x + chosen_move[0]] > 21){
            board[this.y][this.x] = 5
            this.y += chosen_move[1]
            this.x += chosen_move[0]
            this.img = 9 + this.direction
            board[this.y][this.x] = this.img
        }else{
            this.dashing = false
        }
    }
}

let noodle_info = {
    18 : [0,-1,8],
    19 : [1,0,7],
    20 : [-1,0,7],
    21 : [0,1,8]
}

export class Noodle extends Entity{
    direction = -1
    active = false
    constructor(x,y,img,type){
        super(x,y,img,type)
    }
    recreate(shooter){
        let info = noodle_info[shooter.img]
        this.x = shooter.x + info[0]
        this.y = shooter.y + info[1]
        this.img = info[2]
        console.log(this.x,this.y)
        board[this.y][this.x] = this.img
        this.direction = shooter.img
        this.active = true
    }
    move(){
        let info = noodle_info[this.direction]
        if(board[this.y + info[1]][this.x + info[0]]< 14 &&board[this.y + info[1]][this.x + info[0]] > 4 || board[this.y + info[1]][this.x + info[0]] < 25 && board[this.y + info[1]][this.x + info[0]] > 21){
            board[this.y][this.x] = 5
            this.x += info[0]
            this.y += info[1]
            board[this.y][this.x] = this.img
        }else{
            this.active = false
            board[this.y][this.x] = 5
        }
    }
}
export default {Entity, Shark_class,Noodle}