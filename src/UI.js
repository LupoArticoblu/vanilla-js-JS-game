//interfaccia utente
export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = 'Bangers';
  }

  draw(context) {
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillStyle = this.game.fontColor;
    context.fillText('Score: ' + this.game.score, 20, 20);
    context.font = this.fontSize *0.8 + 'px ' + this.fontFamily;
    context.fillText('Time: ' + this.game.time, 20, 50);
    //game over text
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.fillStyle = '#FFF';
      context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5 - 20);
      context.fillStyle = 'black';
      context.fillText('GAME OVER', this.game.width * 0.5 + 5, this.game.height * 0.5 - 20 + 5);
    }
  }
}