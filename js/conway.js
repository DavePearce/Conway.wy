'use strict';
function main$State$Q6WindowQ17HTMLCanvasElementQ5model5State$Q5State(window, canvas, game) {
   return new Wy.Record({window: window, canvas: canvas, game: Wy.copy(game), running: false});
}
function main$main(window, canvas, width, height) {
   let document = window.document;
   let c = document.getElementById("mycanvas");
   let b = document.getElementById("startstop");
   let m = model$init$Q4uintQ4uint$Q5State(width, height);
   let st = new Wy.Ref(main$State$Q6WindowQ17HTMLCanvasElementQ5model5State$Q5State(window, canvas, Wy.copy(m)));
   c.addEventListener("click", function(st) {
      return function(e) {
         return main$onclick_canvas$Q10MouseEventqQ5State$V(e, st);
      };
   }(st));
   b.addEventListener("click", function(b, st) {
      return function(e) {
         return main$onclick_button$Q7ElementqQ5State$V(b, st);
      };
   }(b, st));
   main$loop$qQ5State$V(st);
}
function main$onclick_canvas$Q10MouseEventqQ5State$V(e, st) {
   let x = Math.floor(e.offsetX / 20);
   let y = Math.floor(e.offsetY / 20);
   let g = model$click$IIQ5State$Q5State(x, y, st.$ref.game);
    {
      const $0 = Wy.copy(g.cells);
      st.$ref.game.cells = $0;
   }
}
function main$onclick_button$Q7ElementqQ5State$V(b, st) {
   if(st.$ref.running)  {
       {
         const $1 = false;
         st.$ref.running = $1;
      }
       {
         const $2 = "START";
         b.textContent = $2;
      }
   } else  {
       {
         const $3 = true;
         st.$ref.running = $3;
      }
       {
         const $4 = "STOP";
         b.textContent = $4;
      }
   }
}
function main$loop$qQ5State$V(st) {
   if(st.$ref.running)  {
      let g = model$update$Q5State$Q5State(st.$ref.game);
       {
         const $5 = Wy.copy(g.cells);
         st.$ref.game.cells = $5;
      }
   }
   view$draw(st.$ref.canvas, st.$ref.game);
   st.$ref.window.requestAnimationFrame(function(st) {
      return function(ms) {
         return main$loop$qQ5State$V(st);
      };
   }(st));
}
function model$State$type($) {
   return ($.cells.length === ($.width * $.height)) && (($.width > 0) && ($.height > 0));
}
function model$init$Q4uintQ4uint$Q5State(width, height) {
   let r;
    {
      const $6 = Math.floor(width / 20);
      width = $6;
   }
    {
      const $7 = Math.floor(height / 20);
      height = $7;
   }
   if(width <= 0)  {
      width = 1;
   }
   if(height <= 0)  {
      height = 1;
   }
   return new Wy.Record({cells: Wy.array(false, width * height), width: width, height: height});
}
function model$click$IIQ5State$Q5State(x, y, s) {
   let r;
   if((x >= 0) && ((y >= 0) && ((x < s.width) && (y < s.height))))  {
      let index = x + (y * s.width);
       {
         const $8 = !s.cells[index];
         s.cells[index] = $8;
      }
   }
   return Wy.copy(s);
}
function model$update$Q5State$Q5State(state) {
   let r;
   let ncells = Wy.copy(state.cells);
   for(let y = 0;y < state.height;y = y + 1) {
      for(let x = 0;x < state.width;x = x + 1) {
         let i = x + (y * state.width);
         ncells[i] = model$update_cell$IQ5State$B(i, Wy.copy(state));
      }
   }
   state.cells = Wy.copy(ncells);
   return Wy.copy(state);
}
function model$update_cell$IQ5State$B(index, state) {
   let out;
   let count = model$count_living$Q4uintQ5State$Q4uint(index, Wy.copy(state));
   if(state.cells[index])  {
      switch(count) {
         case 0:
         case 1: {
            return false;
            break;
         }
         case 2:
         case 3: {
            return true;
            break;
         }
         case 4:
         case 5:
         case 6:
         case 7:
         case 8: {
            return false;
            break;
         }
      }
   } else  {
      if(count === 3)  {
         return true;
      }
   }
   return false;
}
function model$count_living$Q4uintQ5State$Q4uint(index, state) {
   let r;
   let x = index % state.width;
   let y = Math.floor(index / state.width);
   let count = model$alive$IIQ5State$Q4uint(x - 1, y - 1, Wy.copy(state));
    {
      const $9 = count + model$alive$IIQ5State$Q4uint(x - 1, y, Wy.copy(state));
      count = $9;
   }
    {
      const $10 = count + model$alive$IIQ5State$Q4uint(x - 1, y + 1, Wy.copy(state));
      count = $10;
   }
    {
      const $11 = count + model$alive$IIQ5State$Q4uint(x, y - 1, Wy.copy(state));
      count = $11;
   }
    {
      const $12 = count + model$alive$IIQ5State$Q4uint(x, y + 1, Wy.copy(state));
      count = $12;
   }
    {
      const $13 = count + model$alive$IIQ5State$Q4uint(x + 1, y - 1, Wy.copy(state));
      count = $13;
   }
    {
      const $14 = count + model$alive$IIQ5State$Q4uint(x + 1, y, Wy.copy(state));
      count = $14;
   }
    {
      const $15 = count + model$alive$IIQ5State$Q4uint(x + 1, y + 1, Wy.copy(state));
      count = $15;
   }
   return count;
}
function model$alive$IIQ5State$Q4uint(x, y, state) {
   let r;
   if((x < 0) || ((x >= state.width) || ((y < 0) || ((y >= state.height) || (!state.cells[x + (y * state.width)])))))  {
      return 0;
   } else  {
      return 1;
   }
}
function view$draw(canvas, state) {
   let ctx = canvas.getContext("2d");
    {
      const $16 = "#DDDDDD";
      ctx.strokeStyle = $16;
   }
   for(let x = 0;x < state.width;x = x + 1) {
      for(let y = 0;y < state.height;y = y + 1) {
         if(model$alive$IIQ5State$Q4uint(x, y, Wy.copy(state)) === 1)  {
             {
               const $17 = "#000000";
               ctx.fillStyle = $17;
            }
         } else  {
             {
               const $18 = "#FFFFFF";
               ctx.fillStyle = $18;
            }
         }
         ctx.fillRect(x * 20, y * 20, 20, 20);
         ctx.strokeRect(x * 20, y * 20, 20, 20);
      }
   }
}
