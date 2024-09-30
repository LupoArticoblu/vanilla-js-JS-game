//interfaccia utente
export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = 'Bangers';
  }

  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.shadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillStyle = this.game.fontColor;
    context.fillText('Score: ' + this.game.score, 20, 20);
    context.font = this.fontSize *0.8 + 'px ' + this.fontFamily;
    context.fillText('Time: ' + Math.floor(this.game.time / 100), 20, 50);
    context.restore();
  }

  updateGameover(context) {
    if(this.game.score >= 10) {
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = 'white';
      context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5 + 15);
      context.fillStyle = 'black';
      context.fillText('YOU WIN', this.game.width * 0.5, this.game.height * 0.5 - 15);
    } else{
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = 'white';
      context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5 - 15);
      context.fillStyle = 'black';
      context.fillText('YOU LOST', this.game.width * 0.5, this.game.height * 0.5 + 15);

    }
  }
}