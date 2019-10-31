'use strict';
function main$State$type($) {
   return $.cells.length === ($.width * $.height);
}
function main$init(width, height) {
   width = Math.floor(width / 20);
   height = Math.floor(height / 20);
   return new Wy.Record({cells: Wy.array(false, width * height), width: width, height: height});
}
function main$click(x, y, s) {
   let index = x + (y * s.width);
   s.cells[index] = !s.cells[index];
   return Wy.copy(s);
}
function main$update(state) {
   let ncells = Wy.copy(state.cells);
   let x = 0;
   while(x < state.width)  {
      let y = 0;
      while(y < state.height)  {
         let c = main$count_living$Q4uintQ4uintQ5State(x, y, Wy.copy(state));
         let i = x + (state.width * y);
         if(main$alive$IIQ5State(x, y, Wy.copy(state)) === 1)  {
            switch(c) {
               case 0:
               case 1: {
                  ncells[i] = false;
                  break;
               }
               case 2:
               case 3: {
                  break;
               }
               case 4:
               case 5:
               case 6:
               case 7:
               case 8: {
                  ncells[i] = false;
                  break;
               }
            }
         } else  {
            if(c === 3)  {
               ncells[i] = true;
            }
         }
         y = y + 1;
      }
      x = x + 1;
   }
   state.cells = Wy.copy(ncells);
   return Wy.copy(state);
}
function main$count_living$Q4uintQ4uintQ5State(x, y, state) {
   let r;
   let count = main$alive$IIQ5State(x - 1, y - 1, Wy.copy(state));
   count = count + main$alive$IIQ5State(x - 1, y, Wy.copy(state));
   count = count + main$alive$IIQ5State(x - 1, y + 1, Wy.copy(state));
   count = count + main$alive$IIQ5State(x, y - 1, Wy.copy(state));
   count = count + main$alive$IIQ5State(x, y + 1, Wy.copy(state));
   count = count + main$alive$IIQ5State(x + 1, y - 1, Wy.copy(state));
   count = count + main$alive$IIQ5State(x + 1, y, Wy.copy(state));
   count = count + main$alive$IIQ5State(x + 1, y + 1, Wy.copy(state));
   return count;
}
function main$alive$IIQ5State(x, y, state) {
   let r;
   if((x < 0) || (x >= state.width))  {
      return 0;
   } else  {
      if((y < 0) || (y >= state.height))  {
         return 0;
      } else  {
         if(state.cells[x + (y * state.width)])  {
            return 1;
         } else  {
            return 0;
         }
      }
   }
}
function main$draw(canvas, state) {
   let ctx = canvas.getContext(js$util$from_string(Wy.toString("2d")));
   ctx.strokeStyle = js$util$from_string(Wy.toString("#DDDDDD"));
   let x = 0;
   while(x < state.width)  {
      let y = 0;
      while(y < state.height)  {
         if(main$alive$IIQ5State(x, y, Wy.copy(state)) === 1)  {
            ctx.fillStyle = js$util$from_string(Wy.toString("#000000"));
         } else  {
            ctx.fillStyle = js$util$from_string(Wy.toString("#FFFFFF"));
         }
         ctx.fillRect(x * 20, y * 20, 20, 20);
         ctx.strokeRect(x * 20, y * 20, 20, 20);
         y = y + 1;
      }
      x = x + 1;
   }
}
