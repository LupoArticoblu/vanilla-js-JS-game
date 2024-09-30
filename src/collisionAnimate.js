export class CollisionAnimate {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById('boom');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 4;
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    // queste 4 righe devono essere eseguite in questo ordine preciso:
    // 1. calcoliamo la larghezza e l'altezza della collisione in base alla sizeModifier
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    // 2. calcoliamo la coordinata x e y della collisione in base alla posizione del player e alle dimensioni della collisione
    this.x = x - this.width * 0.5;
    this.y = y - this.width * 0.5;
    // se invertissimo l'ordine, la collisione verrebbe disegnata nella posizione sbagliata e non sarebbe visibile 
    this.markedForDeletion = false;
    this.fps = 15;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frameX >= this.maxFrame) this.markedForDeletion = true;
  }
}
