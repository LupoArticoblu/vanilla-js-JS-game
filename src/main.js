import {Player} from './player.js';
import {InputHandler} from './input.js';
import {Background} from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';
import {UI} from './UI.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class Game{
    constructor(width, height){
      //queste proprietà fanno riferimento alla larghezza e all'altezza del canvas
      //sia in termini di pixel che in termini di unità di gioco (es. 100px = 100 unità di gioco)
      this.width = width;
      this.height = height;
      //questo servirà a tener conto del terreno di gioco
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.particles = [];
      this.enemies = [];
      this.collisions = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = 'black';
      this.time = 0;
      this.maxTime = 15020;
      this.gameOver = false;
      this.lives = 5;
      this.win = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }

    update(deltaTime){
      this.time += deltaTime;
      if(this.time > this.maxTime){
        this.gameOver = true;
        this.UI.updateGameover(ctx);
      }
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //gestione enemies
      if(this.enemyTimer > this.enemyInterval){
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      //filtro dei nemici per le collisioni col player
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      this.enemies.forEach(enemy => enemy.update(deltaTime));
      //gestione particles
      this.particles.forEach((particle, index) => { 
        particle.update(deltaTime);
        if(particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if(this.particles.length > 50){
        this.particles = this.particles.slice(0, 50);
      }
      //gestione animazione collisioni
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if(collision.markedForDeletion) this.collisions.splice(index, 1)
      }); 
    }
    draw(context){
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      })
      this.particles.forEach(particle => {
        particle.draw(context);
      })
      this.collisions.forEach(collision => {
        collision.draw(context);
      })
      this.UI.draw(context);
    }
    addEnemy(){
      if(Math.random() < 0.3 && this.speed > 0){
         this.enemies.push(new GroundEnemy(this));
      }else if(Math.random() < 0.2 && this.speed > 0){
        this.enemies.push(new ClimbingEnemy(this));
      } 
      this.enemies.push(new FlyingEnemy(this));
    }    
  }
  
  const game = new Game(canvas.width, canvas.height);
  
  //variabile di supporto: terrà conto del valore del timestamp dal precedente animation frame
  let lastTime = 0;
  function animate(timeStamp){
    //deltaTime: tempo trascorso in millisecondi tra il loop precedente e il successivo
    const deltaTime = timeStamp - lastTime;
    //serve a tenere traccia del tempo trascorso tra l'ultimo frame e il nuovo frame, in questo modo possiamo calcolare il deltaTime, ovvero il tempo trascorso tra il nuovo frame e il precedente. Questo ci serve per regolare la velocità di animazione e per renderla indipendente dalla velocità del processore. In questo modo, la velocità di animazione sarà indipendente dalla velocità del processore e sarà costante su tutti i dispositivi.
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update(deltaTime);
    //requestAnimationFrame() ha 2 funzioni speciali: regola automaticamente la frequenza di aggiornamento dello schermo e genera automaticamente un valore di timestamp e lo passa agli argomenti della funzione richiesta, tipo "(animate)",il nome della variabile passata come argomento in animate lo chiameremo timeStamp. Quindi la variabile timeStamp sarà richiamata e autogenerata da questa funzione ogni volta che la animazione richiesta esegue un nuovo frame.
    if(!game.gameOver) requestAnimationFrame(animate);
    else {
      game.draw(ctx);
      game.UI.updateGameover(ctx);
    }
  
  }
  animate(0);
});
