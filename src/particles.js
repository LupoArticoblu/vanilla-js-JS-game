class Particles{
  constructor(game){
    this.game = game;
    this.markedForDeletion = false;
  }

  update(){
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if(this.size < 0.5) this.markedForDeletion = true;
  }
}

export class Dust extends Particles{
  constructor(game, x, y){
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'rgba(255,255,255,0.2)';
  };

  draw(context){
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

export class Fire extends Particles{
  constructor(game, x, y){
    super(game);
    this.image = document.getElementById('fire');
    this.size = Math.random() * 100 + 50;
    this.x = x - this.size * 0.5;
    this.y = y - this.size * 0.5;
    this.speedX = 1;
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }

  draw(context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(this.image, -this.size * 0.4, -this.size * 0.2, this.size, this.size);
    context.restore();
  }


  update(){
    super.update();
    /* this.angle += this.va; incrementa l'angolo della particella di un valore casuale tra -0.1 e 0.1 per dare un effetto di movimento irregolare alla fiamma.*/ 
    this.angle += this.va;
   /* this.x += Math.sin(this.angle) * this.speedX; aggiorna la coordinata x della particella in base
   all'angolo e alla velocità orizzontale.*/ 
    this.x += Math.sin(this.angle) * this.speedX;
   /* this.y += Math.cos(this.angle) * this.speedY; aggiorna la coordinata y della particella in base
   all'angolo e alla velocità verticale.*/
    this.y += Math.cos(this.angle) * this.speedY;
  }
}