'use strict';
function main$State$type($) {
   return $.cells.length === ($.width * $.height);
}
function main$init(width, height) {
    {
      const $0 = Math.floor(width / 20);
      width = $0;
   }
    {
      const $1 = Math.floor(height / 20);
      height = $1;
   }
   return new Wy.Record({cells: Wy.array(false, width * height), width: width, height: height});
}
function main$click(x, y, s) {
   if((x >= 0) && ((y >= 0) && ((x < s.width) && (y < s.height))))  {
      let index = x + (y * s.width);
       {
         const $2 = !s.cells[index];
         s.cells[index] = $2;
      }
   }
   return Wy.copy(s);
}
function main$update(state) {
   let ncells = Wy.copy(state.cells);
   for(let x = 0;x < state.width;x = x + 1) {
      for(let y = 0;y < state.height;y = y + 1) {
         let c = main$count_living$Q4uintQ4uintQ5State$Q4uint(x, y, Wy.copy(state));
         let i = x + (state.width * y);
         if(main$alive$IIQ5State$Q4uint(x, y, Wy.copy(state)) === 1)  {
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
      }
   }
   state.cells = Wy.copy(ncells);
   return Wy.copy(state);
}
function main$count_living$Q4uintQ4uintQ5State$Q4uint(x, y, state) {
   let r;
   let count = main$alive$IIQ5State$Q4uint(x - 1, y - 1, Wy.copy(state));
    {
      const $3 = count + main$alive$IIQ5State$Q4uint(x - 1, y, Wy.copy(state));
      count = $3;
   }
    {
      const $4 = count + main$alive$IIQ5State$Q4uint(x - 1, y + 1, Wy.copy(state));
      count = $4;
   }
    {
      const $5 = count + main$alive$IIQ5State$Q4uint(x, y - 1, Wy.copy(state));
      count = $5;
   }
    {
      const $6 = count + main$alive$IIQ5State$Q4uint(x, y + 1, Wy.copy(state));
      count = $6;
   }
    {
      const $7 = count + main$alive$IIQ5State$Q4uint(x + 1, y - 1, Wy.copy(state));
      count = $7;
   }
    {
      const $8 = count + main$alive$IIQ5State$Q4uint(x + 1, y, Wy.copy(state));
      count = $8;
   }
    {
      const $9 = count + main$alive$IIQ5State$Q4uint(x + 1, y + 1, Wy.copy(state));
      count = $9;
   }
   return count;
}
function main$alive$IIQ5State$Q4uint(x, y, state) {
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
   let ctx = canvas.getContext("2d");
    {
      const $10 = "#DDDDDD";
      ctx.strokeStyle = $10;
   }
   for(let x = 0;x < state.width;x = x + 1) {
      for(let y = 0;y < state.height;y = y + 1) {
         if(main$alive$IIQ5State$Q4uint(x, y, Wy.copy(state)) === 1)  {
             {
               const $11 = "#000000";
               ctx.fillStyle = $11;
            }
         } else  {
             {
               const $12 = "#FFFFFF";
               ctx.fillStyle = $12;
            }
         }
         ctx.fillRect(x * 20, y * 20, 20, 20);
         ctx.strokeRect(x * 20, y * 20, 20, 20);
      }
   }
}
