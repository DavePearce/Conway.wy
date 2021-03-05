'use strict';
function model$State$type($) {
   return ($.cells.length === ($.width * $.height)) && (($.width > 0) && ($.height > 0));
}
function model$init$Q4uintQ4uint$Q5State(width, height) {
   let r;
    {
      const $0 = Math.floor(width / 20);
      width = $0;
   }
    {
      const $1 = Math.floor(height / 20);
      height = $1;
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
         const $2 = !s.cells[index];
         s.cells[index] = $2;
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
      const $3 = count + model$alive$IIQ5State$Q4uint(x - 1, y, Wy.copy(state));
      count = $3;
   }
    {
      const $4 = count + model$alive$IIQ5State$Q4uint(x - 1, y + 1, Wy.copy(state));
      count = $4;
   }
    {
      const $5 = count + model$alive$IIQ5State$Q4uint(x, y - 1, Wy.copy(state));
      count = $5;
   }
    {
      const $6 = count + model$alive$IIQ5State$Q4uint(x, y + 1, Wy.copy(state));
      count = $6;
   }
    {
      const $7 = count + model$alive$IIQ5State$Q4uint(x + 1, y - 1, Wy.copy(state));
      count = $7;
   }
    {
      const $8 = count + model$alive$IIQ5State$Q4uint(x + 1, y, Wy.copy(state));
      count = $8;
   }
    {
      const $9 = count + model$alive$IIQ5State$Q4uint(x + 1, y + 1, Wy.copy(state));
      count = $9;
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
