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
   constructor(state) {
    this.state = state;
  }
}

export class Sitting extends State {
  constructor(player) {
    super('SITTING');
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 5;
    this.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(states.RUNNING, 1);
    }  
  }
}

export class Running extends State{
  constructor(player) {
    super('RUNNING');
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 3;
    this.player.maxFrame = 8;
  }


  handleInput(input) {
    //durante la corsa, per arrestarsi o per saltare il player cambia stato in jumping o falling
    if (input.includes('ArrowDown')) {
      this.player.setState(states.SITTING, 0);
    }else if (input.includes('ArrowUp')){
      this.player.setState(states.JUMPING, 1);
    }
  }  
}

export class Jumping extends State{
  constructor(player) {
    super('JUMPING');
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 1;
    if (this.player.onGround()) {
      this.player.vy -= 30;
    }
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    //quando è alla massima estensione di vy, il player cambia stato in falling
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.FALLING, 1);
      
    }
  }
}

export class Falling extends State{
  constructor(player) {
    super('FALLING');
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 2;
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    //quando il player cade e tocca il suolo, il suo stato cambia in running
    //perchè il player deve tornare ad essere in grado di muoversi
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    }
  }
}
