import {Player} from './player.js';
import {InputHandler} from './input.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class Game{
    constructor(width, height){
      this.width = width;
      this.height = height;
      //questo servirà a tener conto del terreno di gioco
      this.groundMargin = 50;
      this.player = new Player(this);
      this.input = new InputHandler();
    }

    draw(context){
      this.player.draw(context);
    }

    update(deltaTime){
      this.player.update(this.input.keys, deltaTime);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);
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
    requestAnimationFrame(animate);
  }
  animate(0);
})

