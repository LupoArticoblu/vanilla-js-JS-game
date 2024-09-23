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
    this.player.frameY = 5;
  }

  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(states.RUNNING);
    }
  }
}

export class Running extends State{
  constructor(player) {
    super('RUNNING');
    this.player = player;
  }

  enter() {
    this.player.frameY = 3;
  }


  handleInput(input) {
    if (input.includes('ArrowDown')) {
      this.player.setState(states.SITTING);
    }
  }  
}