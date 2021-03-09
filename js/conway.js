'use strict';
function model$State$type($) {
   return $.cells.length === ($.width * $.height);
}
function model$init$Q4uintQ4uint$Q5State(width, height) {
   let r;
   return new Wy.Record({cells: Wy.array(false, width * height), width: width, height: height});
}
function model$click$IIQ5State$Q5State(x, y, s) {
   let ns;
   if((x >= 0) && ((y >= 0) && ((x < s.width) && (y < s.height))))  {
      let index = x + (y * s.width);
       {
         const $0 = !s.cells[index];
         s.cells[index] = $0;
      }
   }
   return Wy.copy(s);
}
function model$update$Q5State$Q5State(state) {
   let nstate;
   let ncells = Wy.copy(state.cells);
   for(let x = 0;x < state.width;x = x + 1) {
      for(let y = 0;y < state.height;y = y + 1) {
         let c = model$count_living$Q4uintQ4uintQ5State$Q4uint(x, y, Wy.copy(state));
         let i = x + (state.width * y);
         if(model$alive$IIQ5State$Q4uint(x, y, Wy.copy(state)) === 1)  {
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
function model$count_living$Q4uintQ4uintQ5State$Q4uint(x, y, state) {
   let r;
   let count = model$alive$IIQ5State$Q4uint(x - 1, y - 1, Wy.copy(state));
    {
      const $1 = count + model$alive$IIQ5State$Q4uint(x - 1, y, Wy.copy(state));
      count = $1;
   }
    {
      const $2 = count + model$alive$IIQ5State$Q4uint(x - 1, y + 1, Wy.copy(state));
      count = $2;
   }
    {
      const $3 = count + model$alive$IIQ5State$Q4uint(x, y - 1, Wy.copy(state));
      count = $3;
   }
    {
      const $4 = count + model$alive$IIQ5State$Q4uint(x, y + 1, Wy.copy(state));
      count = $4;
   }
    {
      const $5 = count + model$alive$IIQ5State$Q4uint(x + 1, y - 1, Wy.copy(state));
      count = $5;
   }
    {
      const $6 = count + model$alive$IIQ5State$Q4uint(x + 1, y, Wy.copy(state));
      count = $6;
   }
    {
      const $7 = count + model$alive$IIQ5State$Q4uint(x + 1, y + 1, Wy.copy(state));
      count = $7;
   }
   return count;
}
function model$alive$IIQ5State$Q4uint(x, y, state) {
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
