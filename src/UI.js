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
  }
}