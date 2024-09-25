import { Sitting, Running, Jumping, Falling  } from './payerStates.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.5;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.x =0;
    this.image = document.getElementById('player');
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameY = 0;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.speed = 0;
    this.maxSpeed = 6;
    this.vy = 0;
    this.weight = 1;
    this.states =[new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }

  draw(context) {
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  update(input, deltaTime) {
    this.currentState.handleInput(input);
    // horizontal movement
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width){
      this.x = this.game.width - this.width;
    }
    this.x += this.speed;
    if (input.includes('ArrowRight')){
      this.speed = this.maxSpeed;
    }else if (input.includes('ArrowLeft')){
      this.speed = -this.maxSpeed;
    }else{
      this.speed = 0;
    }

    // vertical movement
    if (this.y < 0) this.y = 0;
    if (this.y > this.game.height - this.height){
      this.y = this.game.height - this.height;
    }
    this.y += this.vy;
    if (input.includes('ArrowUp') && this.onGround()){
      this.vy = -20;
    }
    if (!this.onGround()){
      this.vy += this.weight;
    }else{
      this.vy = 0;
      this.y = this.game.height - this.height - this.game.groundMargin; // Correzione per la posizione del player sull'asse Y
    }

    //sprite animation
    if(this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }else{
      this.frameTimer += deltaTime;
    }
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.maxSpeed * speed;
    this.currentState.enter();
  }
}