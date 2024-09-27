import { Dust, Fire } from './particles.js';
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6
}
//la classe state si occuperà di tener traccia dei movimenti del player e di reagire di conseguenza; esempio: se player si trova in uno stato onGround() alla pressione del tasto "arrowDown" passerà allo stato SITTING, al contrario !onGround() alla pressione del medesiomo tasto passerà allo stato ROLLING...
class State {
   constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(game) {
    super('SITTING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes('Enter')) {
      this.game.player.setState(states.ROLLING, 2);
    } 
  }
}

export class Running extends State{
  constructor(game) {
    super('RUNNING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 8;
  }


  handleInput(input) {
    //inseriamo i particolari in corsa
    this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.3, this.game.player.y + this.game.player.height));
    //durante la corsa, per arrestarsi o per saltare il player cambia stato in jumping o falling
    if (input.includes('ArrowDown')) {
      this.game.player.setState(states.SITTING, 0);
    }else if (input.includes('ArrowUp')){
      this.game.player.setState(states.JUMPING, 1);
    }else if (input.includes('Enter')) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }  
}

export class Jumping extends State{
  constructor(game) {
    super('JUMPING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 1;
    if (this.game.player.onGround()) {
      this.game.player.vy -= 30;
    }
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    //quando è alla massima estensione di vy, il player cambia stato in falling
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(states.FALLING, 1);
    }else if (input.includes('Enter')) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Falling extends State{
  constructor(game) {
    super('FALLING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrame = 6;
  }

  handleInput() {
    //quando il player cade e tocca il suolo, il suo stato cambia in running
    //perchè il player deve tornare ad essere in grado di muoversi
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    }
  }
}

export class Rolling extends State{
  constructor(game) {
    super('ROLLING', game);
  }

  enter(){
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    //aggiungiamo i particolari alla rollata
    this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height * 0.7));
    if (!input.includes('Enter') && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    }else if (!input.includes('Enter') && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    }else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()) {
      this.game.player.vy -= 25; 
    }
  }
}
