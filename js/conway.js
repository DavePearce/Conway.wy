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
   let el1 = function(st) {
      return function(e) {
         return main$onclick_canvas$Q10MouseEventqQ5State$V(e, st);
      };
   }(st);
   let el2 = function(b, st) {
      return function(e) {
         return main$onclick_button$Q7ElementqQ5State$V(b, st);
      };
   }(b, st);
   c.addEventListener("click", el1);
   b.addEventListener("click", el2);
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
   return $.cells.length === ($.width * $.height);
}
function model$init$Q4uintQ4uint$Q5State(width, height) {
   let r;
   return new Wy.Record({cells: Wy.array(false, width * height), width: width, height: height});
}
function model$click$IIQ5State$Q5State(x, y, s) {
   let ns;
   if((((x >= 0) && (y >= 0)) && (x < s.width)) && (y < s.height))  {
      let index = x + (y * s.width);
       {
         const $6 = !s.cells[index];
         s.cells[index] = $6;
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
      const $7 = count + model$alive$IIQ5State$Q4uint(x - 1, y, Wy.copy(state));
      count = $7;
   }
    {
      const $8 = count + model$alive$IIQ5State$Q4uint(x - 1, y + 1, Wy.copy(state));
      count = $8;
   }
    {
      const $9 = count + model$alive$IIQ5State$Q4uint(x, y - 1, Wy.copy(state));
      count = $9;
   }
    {
      const $10 = count + model$alive$IIQ5State$Q4uint(x, y + 1, Wy.copy(state));
      count = $10;
   }
    {
      const $11 = count + model$alive$IIQ5State$Q4uint(x + 1, y - 1, Wy.copy(state));
      count = $11;
   }
    {
      const $12 = count + model$alive$IIQ5State$Q4uint(x + 1, y, Wy.copy(state));
      count = $12;
   }
    {
      const $13 = count + model$alive$IIQ5State$Q4uint(x + 1, y + 1, Wy.copy(state));
      count = $13;
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
function view$draw(canvas, state) {
   let ctx = canvas.getContext("2d");
    {
      const $14 = "#DDDDDD";
      ctx.strokeStyle = $14;
   }
   for(let x = 0;x < state.width;x = x + 1) {
      for(let y = 0;y < state.height;y = y + 1) {
         if(model$alive$IIQ5State$Q4uint(x, y, Wy.copy(state)) === 1)  {
             {
               const $15 = "#000000";
               ctx.fillStyle = $15;
            }
         } else  {
             {
               const $16 = "#FFFFFF";
               ctx.fillStyle = $16;
            }
         }
         ctx.fillRect(x * 20, y * 20, 20, 20);
         ctx.strokeRect(x * 20, y * 20, 20, 20);
      }
   }
}
const w3c$ajax$UNSENT$static = 0;
const w3c$ajax$OPENED$static = 1;
const w3c$ajax$HEADERS_RECEIVED$static = 2;
const w3c$ajax$LOADING$static = 3;
const w3c$ajax$DONE$static = 4;
const w3c$dom$ELEMENT_NODE$static = 1;
const w3c$dom$TEXT_NODE$static = 3;
const w3c$dom$CDATA_SECTION_NODE$static = 4;
const w3c$dom$PROCESSING_INSTRUCTION_NODE$static = 7;
const w3c$dom$COMMENT_NODE$static = 8;
const w3c$dom$DOCUMENT_NODE$static = 9;
const w3c$dom$DOCUMENT_TYPE_NODE$static = 10;
const w3c$dom$DOCUMENT_FRAGMENT_NODE$static = 11;
function w3c$dom$Document$type(n) {
   return n.nodeType === w3c$dom$DOCUMENT_NODE$static;
}
function w3c$dom$Text$type(n) {
   return n.nodeType === w3c$dom$TEXT_NODE$static;
}
const js$core$MAX_SAFE_INTEGER$static = 9007199254740991;
const js$core$MIN_SAFE_INTEGER$static = -9007199254740991;
function js$core$string$type($) {
   return true;
}
function js$core$integer$type(x) {
   return (js$core$MIN_SAFE_INTEGER$static <= x) && (x <= js$core$MAX_SAFE_INTEGER$static);
}
function js$core$uinteger$type(x) {
   return (0 <= x) && (x <= js$core$MAX_SAFE_INTEGER$static);
}
function js$core$number$type(x) {
   return true;
}
function js$date$day$type(x) {
   return (x >= 0) && (x <= 6);
}
function js$date$month$type(x) {
   return (x >= 1) && (x <= 31);
}
function std$array$equals$av1Tav1TII$B(lhs, rhs, start, end) {
   return ((lhs.length >= end) && (rhs.length >= end)) && function() {
      for(let i = start;i < end;i = i + 1) {
         if(!Wy.equals(lhs[i], rhs[i]))  {
            return false;
         }
      }
      return true;
   }();
}
function std$array$equals$av1TIav1TII$B(l, l_start, r, r_start, length) {
   return ((l.length >= (l_start + length)) && (r.length >= (r_start + length))) && function() {
      for(let k = 0;k < length;k = k + 1) {
         if(!Wy.equals(l[l_start + k], r[r_start + k]))  {
            return false;
         }
      }
      return true;
   }();
}
function std$array$contains$av1Tv1TII$B(lhs, item, start, end) {
   return function() {
      for(let i = start;i < end;i = i + 1) {
         if(Wy.equals(lhs[i], item))  {
            return true;
         }
      }
      return false;
   }();
}
function std$array$matches$av1Tav1T$B(arr, subseq) {
   return (subseq.length <= arr.length) && std$array$matches$av1Tav1TII$B(Wy.copy(arr), Wy.copy(subseq), 0, arr.length - subseq.length);
}
function std$array$matches$av1Tav1TII$B(arr, subseq, start, end) {
   return function() {
      for(let i = start;i < end;i = i + 1) {
         if(std$array$equals$av1TIav1TII$B(Wy.copy(arr), i, Wy.copy(subseq), 0, subseq.length))  {
            return true;
         }
      }
      return false;
   }();
}
function std$array$first_match$av1Tav1TI$B(arr, subseq, index) {
   return std$array$equals$av1TIav1TII$B(Wy.copy(arr), index, Wy.copy(subseq), 0, subseq.length) && (!std$array$matches$av1Tav1TII$B(Wy.copy(arr), Wy.copy(subseq), 0, index));
}
function std$array$unique_elements$av1TI$B(items, end) {
   return function() {
      for(let i = 0;i < end;i = i + 1) {
         for(let j = i + 1;j < end;j = j + 1) {
            if(!(!Wy.equals(items[i], items[j])))  {
               return false;
            }
         }
      }
      return true;
   }();
}
function std$array$first_index_of$av1Tv1T$u2Q4uintN(items, item) {
   let index;
   return std$array$first_index_of$av1Tv1TQ4uint$u2Q4uintN(Wy.copy(items), Wy.copy(item), 0);
}
function std$array$first_index_of$av1Tv1TQ4uint$u2Q4uintN(items, item, start) {
   let index;
   for(let i = start;i < items.length;i = i + 1) {
      if(Wy.equals(items[i], item))  {
         return i;
      }
   }
   return null;
}
function std$array$first_index_of$av1Tav1T$u2Q4uintN(items, item) {
   let index;
   if(item.length <= items.length)  {
      return std$array$first_index_of$av1Tav1TQ4uintQ4uint$u2Q4uintN(Wy.copy(items), Wy.copy(item), 0, items.length - item.length);
   } else  {
      return null;
   }
}
function std$array$first_index_of$av1Tav1TQ4uintQ4uint$u2Q4uintN(items, item, start, end) {
   let index;
   for(let i = start;i < end;i = i + 1) {
      let j = 0;
      if(std$array$equals$av1TIav1TII$B(Wy.copy(items), i, Wy.copy(item), 0, item.length))  {
         return i;
      }
   }
   return null;
}
function std$array$last_index_of$av1Tv1T$u2Q4uintN(items, item) {
   let index;
   let i = items.length;
   while(i > 0)  {
       {
         const $0 = i - 1;
         i = $0;
      }
      if(Wy.equals(items[i], item))  {
         return i;
      }
   }
   return null;
}
function std$array$replace_all$av1Tv1Tv1T$av1T(items, o, n) {
   let r;
   let oldItems = Wy.copy(items);
   for(let i = 0;i < items.length;i = i + 1) {
      if(Wy.equals(oldItems[i], o))  {
         items[i] = Wy.copy(n);
      }
   }
   return Wy.copy(items);
}
function std$array$replace_first$av1Tv1Tv1T$av1T(items, o, n) {
   let r;
   let oldItems = Wy.copy(items);
   for(let i = 0;i < items.length;i = i + 1) {
      if(Wy.equals(oldItems[i], o))  {
         items[i] = Wy.copy(n);
         return Wy.copy(items);
      }
   }
   return Wy.copy(items);
}
function std$array$replace_first$av1Tav1Tav1T$av1T(items, o, n) {
   let r;
   let i = std$array$first_index_of$av1Tav1T$u2Q4uintN(Wy.copy(items), Wy.copy(o));
   if(i === null)  {
      Wy.assert(function() {
         for(let j = 0;j < (items.length - o.length);j = j + 1) {
            if(!(!std$array$equals$av1TIav1TII$B(Wy.copy(items), j, Wy.copy(o), 0, o.length)))  {
               return false;
            }
         }
         return true;
      }());
      Wy.assert(function() {
         for(let j = 0;j < (items.length - o.length);j = j + 1) {
            if(!(!std$array$first_match$av1Tav1TI$B(Wy.copy(items), Wy.copy(o), j)))  {
               return false;
            }
         }
         return true;
      }());
      Wy.assert(!std$array$matches$av1Tav1T$B(Wy.copy(items), Wy.copy(o)));
      return Wy.copy(items);
   } else  {
      if(o.length === n.length)  {
         return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(n), 0, Wy.copy(items), i, o.length);
      } else  {
         std$array$lemma_matches$av1Tav1TQ4uint$V(Wy.copy(items), Wy.copy(o), i);
         let size = (items.length - o.length) + n.length;
         let nitems = std$array$resize$av1TQ4uintv1T$av1T(Wy.copy(items), size, Wy.copy(o[0]));
          {
            const $1 = std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(n), 0, Wy.copy(nitems), i, n.length);
            nitems = $1;
         }
         let remainder = (size - i) - n.length;
         return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(items), i + o.length, Wy.copy(nitems), i + n.length, remainder);
      }
   }
}
function std$array$replace_all$av1Tav1Tav1T$av1T(items, o, n) {
   let r;
   while(std$array$first_index_of$av1Tav1T$u2Q4uintN(Wy.copy(items), Wy.copy(o)) !== null)  {
       {
         const $2 = std$array$replace_first$av1Tav1Tav1T$av1T(Wy.copy(items), Wy.copy(o), Wy.copy(n));
         items = $2;
      }
   }
   return Wy.copy(items);
}
function std$array$replace$av1Tav1Taav1T$av1T(items, o, nn) {
   let r;
   let i = 0;
   while((i < nn.length) && (std$array$first_index_of$av1Tav1T$u2Q4uintN(Wy.copy(items), Wy.copy(o)) !== null))  {
       {
         const $3 = std$array$replace_first$av1Tav1Tav1T$av1T(Wy.copy(items), Wy.copy(o), Wy.copy(nn[i]));
         items = $3;
      }
       {
         const $4 = i + 1;
         i = $4;
      }
   }
   return Wy.copy(items);
}
function std$array$slice$av1TQ4uintQ4uint$av1T(items, start, end) {
   let r;
   if(start === end)  {
      return [];
   } else  {
      let nitems = Wy.array(items[0], end - start);
      return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(items), start, Wy.copy(nitems), 0, nitems.length);
   }
}
function std$array$append$av1Tav1T$av1T(lhs, rhs) {
   let r;
   if(lhs.length === 0)  {
      return Wy.copy(rhs);
   } else  {
      let rs = std$array$resize$av1TQ4uintv1T$av1T(Wy.copy(lhs), lhs.length + rhs.length, Wy.copy(lhs[0]));
      return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(rhs), 0, Wy.copy(rs), lhs.length, rhs.length);
   }
}
function std$array$append$av1Tv1T$av1T(items, item) {
   let r;
   let nitems = Wy.array(item, items.length + 1);
   for(let i = 0;i < items.length;i = i + 1) {
      nitems[i] = Wy.copy(items[i]);
   }
   return Wy.copy(nitems);
}
function std$array$append$v1Tav1T$av1T(item, items) {
   let r;
   let nitems = Wy.array(item, items.length + 1);
   for(let i = 0;i < items.length;i = i + 1) {
      nitems[i + 1] = Wy.copy(items[i]);
   }
   return Wy.copy(nitems);
}
function std$array$resize$av1TQ4uint$av1T(src, size) {
   let result;
   if(src.length === 0)  {
      return Wy.copy(src);
   } else  {
      result = Wy.array(src[0], size);
      for(let i = 0;i < size;i = i + 1) {
         result[i] = Wy.copy(src[i]);
      }
      return Wy.copy(result);
   }
}
function std$array$resize$av1TQ4uintv1T$av1T(items, size, item) {
   let result;
   let nitems = Wy.array(item, size);
   let i = 0;
   while((i < size) && (i < items.length))  {
      nitems[i] = Wy.copy(items[i]);
       {
         const $5 = i + 1;
         i = $5;
      }
   }
   return Wy.copy(nitems);
}
function std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(src, srcStart, dest, destStart, length) {
   let result;
   let _dest = Wy.copy(dest);
   for(let i = 0;i < length;i = i + 1) {
      dest[i + destStart] = Wy.copy(src[i + srcStart]);
   }
   return Wy.copy(dest);
}
function std$array$remove$av1TQ4uint$av1T(src, ith) {
   let result;
   result = Wy.array(src[0], src.length - 1);
    {
      const $6 = std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(src), 0, Wy.copy(result), 0, ith);
      result = $6;
   }
   return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(src), ith + 1, Wy.copy(result), ith, result.length - ith);
}
function std$array$swap$av1TQ4uintQ4uint$av1T(src, ith, jth) {
   let result;
   let tmp = Wy.copy(src[ith]);
    {
      const $7 = Wy.copy(src[jth]);
      src[ith] = $7;
   }
   src[jth] = Wy.copy(tmp);
   return Wy.copy(src);
}
function std$array$map$av1Sfv1Sv1T$av1T(items, fn) {
   let r;
   if(items.length === 0)  {
      return [];
   } else  {
      let nitems = Wy.array(fn(Wy.copy(items[0])), items.length);
      for(let i = 1;i < nitems.length;i = i + 1) {
         nitems[i] = fn(Wy.copy(items[i]));
      }
      return Wy.copy(nitems);
   }
}
function std$array$filter$av1Tfv1TB$av1T(items, fn) {
   let r;
   const len = items.length;
   let j = 0;
   for(let i = 0;i < items.length;i = i + 1) {
      if(fn(Wy.copy(items[i])))  {
          {
            const $8 = Wy.copy(items[i]);
            items[j] = $8;
         }
          {
            const $9 = j + 1;
            j = $9;
         }
      }
   }
   return std$array$resize$av1TQ4uint$av1T(Wy.copy(items), j);
}
function std$array$foldl$av1Tv1Tf2v1Tv1Tv1T$v1T(items, dEfault, fn) {
   let r;
   if(items.length === 0)  {
      return Wy.copy(dEfault);
   } else  {
      return std$array$foldl$av1Tf2v1Tv1Tv1T$v1T(Wy.copy(items), fn);
   }
}
function std$array$foldl$av1Tf2v1Tv1Tv1T$v1T(items, fn) {
   let r;
   let acc = Wy.copy(items[0]);
   for(let i = 1;i < items.length;i = i + 1) {
       {
         const $10 = fn(Wy.copy(acc), Wy.copy(items[i]));
         acc = $10;
      }
   }
   return Wy.copy(acc);
}
function std$ascii$char$type(x) {
   return (0 <= x) && (x <= 127);
}
function std$ascii$letter$type(x) {
   return ((97 <= x) && (x <= 122)) || ((65 <= x) && (x <= 90));
}
function std$ascii$uppercase$type(x) {
   return (65 <= x) && (x <= 90);
}
function std$ascii$lowercase$type(x) {
   return (97 <= x) && (x <= 122);
}
function std$ascii$digit$type(x) {
   return (48 <= x) && (x <= 57);
}
let std$ascii$NUL$static = 0;
let std$ascii$SOH$static = 1;
let std$ascii$STX$static = 2;
let std$ascii$ETX$static = 3;
let std$ascii$EOT$static = 4;
let std$ascii$ENQ$static = 5;
let std$ascii$ACK$static = 6;
let std$ascii$BEL$static = 7;
let std$ascii$BS$static = 8;
let std$ascii$HT$static = 9;
let std$ascii$LF$static = 10;
let std$ascii$VT$static = 11;
let std$ascii$FF$static = 12;
let std$ascii$CR$static = 13;
let std$ascii$SO$static = 14;
let std$ascii$SI$static = 15;
let std$ascii$DLE$static = 16;
let std$ascii$DC1$static = 17;
let std$ascii$DC2$static = 18;
let std$ascii$DC3$static = 19;
let std$ascii$DC4$static = 20;
let std$ascii$NAK$static = 21;
let std$ascii$SYN$static = 22;
let std$ascii$ETB$static = 23;
let std$ascii$CAN$static = 24;
let std$ascii$EM$static = 25;
let std$ascii$SUB$static = 26;
let std$ascii$ESC$static = 27;
let std$ascii$FS$static = 28;
let std$ascii$GS$static = 29;
let std$ascii$RS$static = 30;
let std$ascii$US$static = 31;
let std$ascii$DEL$static = 127;
function std$ascii$to_byte$Q4char$U(v) {
   let mask = 0b1;
   let r = 0b0;
   for(let i = 0;i < 8;i = i + 1) {
      if((v % 2) === 1)  {
          {
            const $11 = r | mask;
            r = $11;
         }
      }
       {
         const $12 = Math.floor(v / 2);
         v = $12;
      }
       {
         const $13 = mask << 1;
         mask = $13;
      }
   }
   return r;
}
function std$ascii$to_bytes$Q6string$aU(s) {
   let r = Wy.array(0b0, s.length);
   for(let i = 0;i < s.length;i = i + 1) {
      r[i] = std$ascii$to_byte$Q4char$U(s[i]);
   }
   return Wy.copy(r);
}
function std$ascii$from_bytes$aU$Q6string(data) {
   let r = Wy.array(0, data.length);
   for(let i = 0;i < data.length;i = i + 1) {
      let v = std$integer$to_uint$U$Q2u8(data[i]);
      if(v >= 127)  {
         v = 63;
      }
      r[i] = v;
   }
   return Wy.copy(r);
}
function std$ascii$is_upper_case$Q4char$B(c) {
   return (65 <= c) && (c <= 90);
}
function std$ascii$is_lower_case$Q4char$B(c) {
   return (97 <= c) && (c <= 122);
}
function std$ascii$is_letter$Q4char$B(c) {
   return ((97 <= c) && (c <= 122)) || ((65 <= c) && (c <= 90));
}
function std$ascii$is_digit$Q4char$B(c) {
   return (48 <= c) && (c <= 57);
}
function std$ascii$is_whitespace$Q4char$B(c) {
   return (((c === 32) || (c === 9)) || (c === 10)) || (c === 13);
}
function std$ascii$to_string$I$Q6string(item) {
   let sign;
   if(item < 0)  {
      sign = false;
       {
         const $14 = -item;
         item = $14;
      }
   } else  {
      sign = true;
   }
   let tmp = item;
   let digits = 0;
   do {
       {
         const $15 = Math.floor(tmp / 10);
         tmp = $15;
      }
       {
         const $16 = digits + 1;
         digits = $16;
      }
   } while(tmp !== 0);
   let r = Wy.array(48, digits);
   let i = digits;
   do {
      let remainder = item % 10;
       {
         const $17 = Math.floor(item / 10);
         item = $17;
      }
      let digit = 48 + remainder;
       {
         const $18 = i - 1;
         i = $18;
      }
      r[i] = digit;
   } while((item !== 0) && (i > 0));
   if(sign)  {
      return Wy.copy(r);
   } else  {
      return std$array$append$av1Tav1T$av1T(Wy.toString("-"), Wy.copy(r));
   }
}
function std$ascii$to_string$aI$Q6string(items) {
   let r = Wy.toString("");
   for(let i = 0;i < items.length;i = i + 1) {
      if(i !== 0)  {
          {
            const $19 = std$array$append$av1Tav1T$av1T(Wy.copy(r), Wy.toString(","));
            r = $19;
         }
      }
       {
         const $20 = std$array$append$av1Tav1T$av1T(Wy.copy(r), std$ascii$to_string$I$Q6string(items[i]));
         r = $20;
      }
   }
   return Wy.copy(r);
}
function std$ascii$parse_int$Q5ascii6string$u2IN(input) {
   let start = 0;
   let negative;
   if(input[0] === 45)  {
      negative = true;
       {
         const $21 = start + 1;
         start = $21;
      }
   } else  {
      negative = false;
   }
   let r = 0;
   for(let i = start;i < input.length;i = i + 1) {
      let c = input[i];
       {
         const $22 = r * 10;
         r = $22;
      }
      if(!std$ascii$is_digit$Q4char$B(c))  {
         return null;
      }
       {
         const $23 = r + (c - 48);
         r = $23;
      }
   }
   if(negative)  {
      return -r;
   } else  {
      return r;
   }
}
function std$collections$array_set$ArraySet$type(v) {
   return std$array$unique_elements$av1TI$B(Wy.copy(v.items), v.length);
}
function std$collections$array_set$ArraySet$V$Q8ArraySettv1T() {
   let r;
   return new Wy.Record({length: 0, items: []});
}
function std$collections$array_set$ArraySet$av1T$Q6Vectortv1T(items) {
   let r;
   return std$collections$vector$Vector$av1T$Q6Vectortv1T(Wy.copy(items));
}
function std$collections$array_set$insert$Q8ArraySettv1Tv1T$Q8ArraySettv1T(set, item) {
   let r;
   if(std$array$contains$av1Tv1TII$B(Wy.copy(set.items), Wy.copy(item), 0, set.length))  {
      return Wy.copy(set);
   } else  {
      return std$collections$vector$push$Q6Vectortv1Tv1T$Q6Vectortv1T(Wy.copy(set), Wy.copy(item));
   }
}
function std$collections$hash$hash$I$Q3u32(x) {
   let _x = (x + 2147483648) % 4294967295;
   return _x;
}
function std$collections$hash$hash$B$Q3u32(b) {
   if(b)  {
      return 1;
   } else  {
      return 0;
   }
}
function std$collections$hash$hash$aI$Q3u32(xs) {
   let r = 0;
   for(let i = 0;i < xs.length;i = i + 1) {
       {
         const $24 = (r + std$collections$hash$hash$I$Q3u32(xs[i])) % 4294967295;
         r = $24;
      }
   }
   return r;
}
function std$collections$hash$hash$aB$Q3u32(xs) {
   let r = 0;
   for(let i = 0;i < xs.length;i = i + 1) {
       {
         const $25 = (r + std$collections$hash$hash$B$Q3u32(xs[i])) % 4294967295;
         r = $25;
      }
   }
   return r;
}
function std$collections$hash_map$HashMap$type($) {
   return $.buckets.length > 0;
}
function std$collections$hash_map$HashMap$V$Q7HashMaptIv1T() {
   let r;
   return std$collections$hash_map$HashMap$Q4hash2fntv1S$Q7HashMaptv1Sv1T(std$collections$hash$hash$I$Q3u32);
}
function std$collections$hash_map$HashMap$V$Q7HashMaptBv1T() {
   let r;
   return std$collections$hash_map$HashMap$Q4hash2fntv1S$Q7HashMaptv1Sv1T(std$collections$hash$hash$B$Q3u32);
}
function std$collections$hash_map$HashMap$V$Q7HashMaptQ6stringv1T() {
   let r;
   return std$collections$hash_map$HashMap$Q4hash2fntv1S$Q7HashMaptv1Sv1T(std$collections$hash$hash$aI$Q3u32);
}
function std$collections$hash_map$HashMap$Q4hash2fntv1S$Q7HashMaptv1Sv1T(hasher) {
   let r;
   let init = std$collections$vector$Vector$V$Q6Vectortv1T();
   return new Wy.Record({length: 0, buckets: Wy.array(init, 10), hasher: hasher});
}
function std$collections$hash_map$contains$Q7HashMaptv1Sv1Tv1S$B(map, key) {
   let r;
   let index = map.hasher(Wy.copy(key)) % map.buckets.length;
   let bucket = Wy.copy(map.buckets[index]);
   for(let i = 0;i < std$collections$vector$size$Q6Vectortv1T$I(Wy.copy(bucket));i = i + 1) {
      let ith = std$collections$vector$get$Q6Vectortv1TI$v1T(Wy.copy(bucket), i);
      if(Wy.equals(ith.first, key))  {
         return true;
      }
   }
   return false;
}
function std$collections$hash_map$get$Q7HashMaptv1Sv1Tv1S$Q6Optiontv1T(map, key) {
   let r;
   let index = map.hasher(Wy.copy(key)) % map.buckets.length;
   let bucket = Wy.copy(map.buckets[index]);
   for(let i = 0;i < std$collections$vector$size$Q6Vectortv1T$I(Wy.copy(bucket));i = i + 1) {
      let ith = std$collections$vector$get$Q6Vectortv1TI$v1T(Wy.copy(bucket), i);
      if(Wy.equals(ith.first, key))  {
         return std$option$Some$v1T$Q4Sometv1T(Wy.copy(ith.second));
      }
   }
   return Wy.copy(std$option$None$static);
}
function std$collections$hash_map$insert$Q7HashMaptv1Sv1Tv1Sv1T$Q7HashMaptv1Sv1T(map, key, value) {
   let r;
   let index = map.hasher(Wy.copy(key)) % map.buckets.length;
   let bucket = Wy.copy(map.buckets[index]);
   for(let i = 0;i < std$collections$vector$size$Q6Vectortv1T$I(Wy.copy(bucket));i = i + 1) {
      let ith = std$collections$vector$get$Q6Vectortv1TI$v1T(Wy.copy(bucket), i);
      if(Wy.equals(ith.first, key))  {
         map.buckets[index] = std$collections$vector$set$Q6Vectortv1TIv1T$Q6Vectortv1T(Wy.copy(bucket), i, std$collections$pair$Pair$v1Sv1T$Q4Pairtv1Sv1T(Wy.copy(key), Wy.copy(value)));
         return Wy.copy(map);
      }
   }
   map.buckets[index] = std$collections$vector$push$Q6Vectortv1Tv1T$Q6Vectortv1T(Wy.copy(bucket), std$collections$pair$Pair$v1Sv1T$Q4Pairtv1Sv1T(Wy.copy(key), Wy.copy(value)));
    {
      const $26 = map.length + 1;
      map.length = $26;
   }
   return Wy.copy(map);
}
function std$collections$hash_map$to_array$Q7HashMaptv1Sv1T$aQ4Pairtv1Sv1T(map) {
   let result;
   let [b, i] = std$collections$hash_map$advance$Q7HashMaptv1Sv1TQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), 0, 0);
   if(b >= map.buckets.length)  {
      return [];
   } else  {
      let first = std$collections$vector$get$Q6Vectortv1TI$v1T(Wy.copy(map.buckets[b]), i);
      let items = Wy.array(first, map.length);
      for(let j = 1;j < items.length;j = j + 1) {
          {
            const $27 = std$collections$hash_map$advance$Q7HashMaptv1Sv1TQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), b, i + 1);
            b = $27[0];
            i = $27[1];
         }
         items[j] = std$collections$vector$get$Q6Vectortv1TI$v1T(Wy.copy(map.buckets[b]), i);
      }
      return Wy.copy(items);
   }
}
function std$collections$hash_map$iterator$Q7HashMaptv1Sv1T$Q8IteratortQ4Pairtv1Sv1T(map) {
   let [b, i] = std$collections$hash_map$advance$Q7HashMaptv1Sv1TQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), 0, 0);
   return new Wy.Record({get: function(b, map, i) {
      return function() {
         return std$collections$hash_map$get$Q7HashMaptv1Sv1TQ4uintQ4uint$Q6OptiontQ4Pairtv1Sv1T(Wy.copy(map), b, i);
      };
   }(b, map, i), next: function(b, map, i) {
      return function() {
         return std$collections$hash_map$next$Q7HashMaptv1Sv1TQ4uintQ4uint$Q8IteratortQ4Pairtv1Sv1T(Wy.copy(map), b, i);
      };
   }(b, map, i)});
}
function std$collections$hash_map$get$Q7HashMaptv1Sv1TQ4uintQ4uint$Q6OptiontQ4Pairtv1Sv1T(map, bucket, index) {
   Wy.assert((bucket >= map.buckets.length) || (index < std$collections$vector$size$Q6Vectortv1T$I(Wy.copy(map.buckets[bucket]))));
   if(bucket < map.buckets.length)  {
      return std$option$Some$v1T$Q4Sometv1T(std$collections$vector$get$Q6Vectortv1TI$v1T(Wy.copy(map.buckets[bucket]), index));
   } else  {
      return Wy.copy(std$option$None$static);
   }
}
function std$collections$hash_map$next$Q7HashMaptv1Sv1TQ4uintQ4uint$Q8IteratortQ4Pairtv1Sv1T(map, bucket, index) {
   let [b, i] = std$collections$hash_map$advance$Q7HashMaptv1Sv1TQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), bucket, index + 1);
   return new Wy.Record({get: function(b, map, i) {
      return function() {
         return std$collections$hash_map$get$Q7HashMaptv1Sv1TQ4uintQ4uint$Q6OptiontQ4Pairtv1Sv1T(Wy.copy(map), b, i);
      };
   }(b, map, i), next: function(b, map, i) {
      return function() {
         return std$collections$hash_map$next$Q7HashMaptv1Sv1TQ4uintQ4uint$Q8IteratortQ4Pairtv1Sv1T(Wy.copy(map), b, i);
      };
   }(b, map, i)});
}
function std$collections$hash_map$advance$Q7HashMaptv1Sv1TQ4uintQ4uint$Q4uintQ4uint(map, bucket, index) {
   let i;
   let b;
   if(bucket < map.buckets.length)  {
      if(index < std$collections$vector$size$Q6Vectortv1T$I(Wy.copy(map.buckets[bucket])))  {
         return [bucket, index];
      } else  {
         return std$collections$hash_map$advance$Q7HashMaptv1Sv1TQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), bucket + 1, 0);
      }
   } else  {
      return [map.buckets.length, 0];
   }
}
function std$collections$pair$Pair$v1Sv1T$Q4Pairtv1Sv1T(first, second) {
   let r;
   return new Wy.Record({first: Wy.copy(first), second: Wy.copy(second)});
}
function std$collections$pair$swap$Q4Pairtv1Sv1T$Q4Pairtv1Tv1S(p) {
   let r;
   return new Wy.Record({first: Wy.copy(p.second), second: Wy.copy(p.first)});
}
function std$collections$pair$map$Q4Pairtv1Sv1Sfv1Sv1T$Q4Pairtv1Tv1T(pair, fn) {
   return new Wy.Record({first: fn(Wy.copy(pair.first)), second: fn(Wy.copy(pair.second))});
}
function std$collections$pair$map_1st$Q4Pairtv1Sv1Tfv1Sv1U$Q4Pairtv1Uv1T(pair, fn) {
   return new Wy.Record({first: fn(Wy.copy(pair.first)), second: Wy.copy(pair.second)});
}
function std$collections$pair$map_2nd$Q4Pairtv1Sv1Tfv1Tv1U$Q4Pairtv1Sv1U(pair, fn) {
   return new Wy.Record({first: Wy.copy(pair.first), second: fn(Wy.copy(pair.second))});
}
function std$collections$vector$Vector$type($) {
   return $.length <= $.items.length;
}
function std$collections$vector$Vector$V$Q6Vectortv1T() {
   let r;
   return new Wy.Record({items: [], length: 0});
}
function std$collections$vector$Vector$av1T$Q6Vectortv1T(items) {
   let r;
   return new Wy.Record({items: Wy.copy(items), length: items.length});
}
function std$collections$vector$top$Q6Vectortv1T$v1T(vec) {
   return Wy.copy(vec.items[vec.length - 1]);
}
function std$collections$vector$size$Q6Vectortv1T$I(vec) {
   let r;
   return vec.length;
}
function std$collections$vector$get$Q6Vectortv1TI$v1T(vec, ith) {
   let item;
   return Wy.copy(vec.items[ith]);
}
function std$collections$vector$to_array$Q6Vectortv1T$av1T(vec) {
   let items;
   return std$array$slice$av1TQ4uintQ4uint$av1T(Wy.copy(vec.items), 0, vec.length);
}
function std$collections$vector$push$Q6Vectortv1Tv1T$Q6Vectortv1T(vec, item) {
   let nvec;
   if(vec.length === vec.items.length)  {
      let nlen = (vec.length * 2) + 1;
       {
         const $28 = std$array$resize$av1TQ4uintv1T$av1T(Wy.copy(vec.items), nlen, Wy.copy(item));
         vec.items = $28;
      }
   } else  {
       {
         const $29 = Wy.copy(item);
         vec.items[vec.length] = $29;
      }
   }
    {
      const $30 = vec.length + 1;
      vec.length = $30;
   }
   return Wy.copy(vec);
}
function std$collections$vector$push_all$Q6Vectortv1Tav1T$Q6Vectortv1T(vec, items) {
   let nvec;
   let len = vec.length + items.length;
   if(items.length === 0)  {
      return Wy.copy(vec);
   } else  {
      if(len > vec.items.length)  {
         let nlen = (vec.length * 2) + items.length;
          {
            const $31 = std$array$resize$av1TQ4uintv1T$av1T(Wy.copy(vec.items), nlen, Wy.copy(items[0]));
            vec.items = $31;
         }
      }
   }
    {
      const $32 = std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(items), 0, Wy.copy(vec.items), vec.length, items.length);
      vec.items = $32;
   }
    {
      const $33 = vec.length + items.length;
      vec.length = $33;
   }
   return Wy.copy(vec);
}
function std$collections$vector$pop$Q6Vectortv1T$Q6Vectortv1T(vec) {
   let nvec;
    {
      const $34 = vec.length - 1;
      vec.length = $34;
   }
   return Wy.copy(vec);
}
function std$collections$vector$set$Q6Vectortv1TIv1T$Q6Vectortv1T(vec, ith, item) {
   let result;
   vec.items[ith] = Wy.copy(item);
   return Wy.copy(vec);
}
function std$collections$vector$remove$Q6Vectortv1TQ4uint$Q6Vectortv1T(vec, ith) {
   let result;
   let items = std$array$remove$av1TQ4uint$av1T(Wy.copy(vec.items), ith);
   let len = vec.length - 1;
   std$array$lemma_equals$av1TQ4uintav1TQ4uintQ4uintQ4uint$V(Wy.copy(vec.items), ith + 1, Wy.copy(items), ith, len - ith, items.length - ith);
   return new Wy.Record({items: Wy.copy(items), length: len});
}
function std$collections$vector$swap$Q6Vectortv1TQ4uintQ4uint$Q6Vectortv1T(vec, ith, jth) {
   let result;
    {
      const $35 = std$array$swap$av1TQ4uintQ4uint$av1T(Wy.copy(vec.items), ith, jth);
      vec.items = $35;
   }
   return Wy.copy(vec);
}
function std$collections$vector$clear$Q6Vectortv1T$Q6Vectortv1T(vec) {
   let r;
   vec.length = 0;
   return Wy.copy(vec);
}
function std$collections$vector$equals$Q6Vectortv1TQ6Vectortv1T$B(lhs, rhs) {
   return (lhs.length === rhs.length) && std$array$equals$av1Tav1TII$B(Wy.copy(lhs.items), Wy.copy(rhs.items), 0, lhs.length);
}
function std$filesystem$uint$type(x) {
   return x >= 0;
}
const std$filesystem$READONLY$static = 0;
const std$filesystem$READWRITE$static = 1;
function std$filesystem$rwMode$type(x) {
   return (x === std$filesystem$READONLY$static) || (x === std$filesystem$READWRITE$static);
}
function std$integer$i8$type(x) {
   return (x >= (-128)) && (x <= 127);
}
function std$integer$i16$type(x) {
   return (x >= (-32768)) && (x <= 32768);
}
function std$integer$i32$type(x) {
   return (x >= (-2147483648)) && (x <= 2147483647);
}
function std$integer$u8$type(x) {
   return (x >= 0) && (x <= 255);
}
function std$integer$u16$type(x) {
   return (x >= 0) && (x <= 65535);
}
function std$integer$u32$type(x) {
   return (x >= 0) && (x <= 4294967295);
}
function std$integer$uint$type(x) {
   return x >= 0;
}
function std$integer$nat$type(x) {
   return x >= 0;
}
function std$integer$to_unsigned_byte$Q2u8$U(v) {
   let mask = 0b1;
   let r = 0b0;
   for(let i = 0;i < 8;i = i + 1) {
      if((v % 2) === 1)  {
          {
            const $36 = r | mask;
            r = $36;
         }
      }
       {
         const $37 = Math.floor(v / 2);
         v = $37;
      }
       {
         const $38 = mask << 1;
         mask = $38;
      }
   }
   return r;
}
function std$integer$to_signed_byte$Q2i8$U(v) {
   let u;
   if(v >= 0)  {
      u = v;
   } else  {
      u = v + 256;
   }
   return std$integer$to_unsigned_byte$Q2u8$U(u);
}
function std$integer$to_string$U$Q5ascii6string(b) {
   let r = Wy.array(0, 8);
   for(let i = 0;i < 8;i = i + 1) {
      if((b & 0b1) === 0b1)  {
         r[7 - i] = 49;
      } else  {
         r[7 - i] = 48;
      }
       {
         const $39 = b >> 1;
         b = $39;
      }
   }
   return Wy.copy(r);
}
function std$integer$to_uint$U$Q2u8(b) {
   let r = 0;
   let base = 1;
   while(((b !== 0b0) && (base <= 128)) && (r < base))  {
      if((b & 0b1) === 0b1)  {
          {
            const $40 = r + base;
            r = $40;
         }
      }
       {
         const $41 = (b >> 1) & 0b1111111;
         b = $41;
      }
       {
         const $42 = base * 2;
         base = $42;
      }
   }
   return r;
}
function std$integer$to_uint$aU$Q4uint(bytes) {
   let val = 0;
   let base = 1;
   for(let i = 0;i < bytes.length;i = i + 1) {
      let v = std$integer$to_uint$U$Q2u8(bytes[i]) * base;
       {
         const $43 = val + v;
         val = $43;
      }
       {
         const $44 = base * 256;
         base = $44;
      }
   }
   return val;
}
function std$integer$to_int$U$I(b) {
   let r = 0;
   let base = 1;
   while(b !== 0b0)  {
      if((b & 0b1) === 0b1)  {
          {
            const $45 = r + base;
            r = $45;
         }
      }
       {
         const $46 = (b >> 1) & 0b1111111;
         b = $46;
      }
       {
         const $47 = base * 2;
         base = $47;
      }
   }
   if(r >= 128)  {
      return -(256 - r);
   } else  {
      return r;
   }
}
function std$integer$to_int$aU$I(bytes) {
   let val = 0;
   let base = 1;
   for(let i = 0;i < bytes.length;i = i + 1) {
      let v = std$integer$to_uint$U$Q2u8(bytes[i]) * base;
       {
         const $48 = val + v;
         val = $48;
      }
       {
         const $49 = base * 256;
         base = $49;
      }
   }
   if(val >= Math.floor(base / 2))  {
      return -(base - val);
   } else  {
      return val;
   }
}
function std$math$abs$I$I(x) {
   let r;
   if(x < 0)  {
      return -x;
   } else  {
      return x;
   }
}
function std$math$max$II$I(a, b) {
   let r;
   if(a < b)  {
      return b;
   } else  {
      return a;
   }
}
function std$math$min$II$I(a, b) {
   let r;
   if(a > b)  {
      return b;
   } else  {
      return a;
   }
}
function std$math$pow$II$I(base, exponent) {
   let r = 1;
   for(let i = 0;i < exponent;i = i + 1) {
       {
         const $50 = r * base;
         r = $50;
      }
   }
   return r;
}
function std$math$isqrt$I$I(x) {
   let r;
   let square = 1;
   let delta = 3;
   while(square <= x)  {
       {
         const $51 = square + delta;
         square = $51;
      }
       {
         const $52 = delta + 2;
         delta = $52;
      }
   }
   return Math.floor(delta / 2) - 1;
}
function std$option$None$type($) {
   return true;
}
function std$option$Some$type($) {
   return true;
}
const std$option$None$static = null;
function std$option$Some$v1T$Q4Sometv1T(value) {
   let r;
   return new Wy.Record({value: Wy.copy(value)});
}
function std$option$contains$Q6Optiontv1Tv1T$B(option, value) {
   let r;
   if(is$Q6Optiontv1TQ4None(option))  {
      return false;
   } else  {
      return Wy.equals(option.value, value);
   }
}
function std$option$unwrap$Q6Optiontv1Tv1T$v1T(option, dEfault) {
   let r;
   if(is$Q6Optiontv1TQ4None(option))  {
      return Wy.copy(dEfault);
   } else  {
      return Wy.copy(option.value);
   }
}
function std$option$map$Q6Optiontv1Sfv1Sv1T$Q6Optiontv1T(option, fn) {
   let result;
   if(is$Q6Optiontv1SQ4None(option))  {
      return Wy.copy(std$option$None$static);
   } else  {
      return std$option$Some$v1T$Q4Sometv1T(fn(Wy.copy(option.value)));
   }
}
function std$option$filter$Q6Optiontv1Tfv1TB$Q6Optiontv1T(option, filter) {
   let r;
   if((!is$Q6Optiontv1TQ4None(option)) && filter(Wy.copy(option.value)))  {
      return Wy.copy(option);
   } else  {
      return Wy.copy(std$option$None$static);
   }
}
function std$utf8$uint$type(x) {
   return x >= 0;
}
function std$utf8$char$type(c) {
   return (0 <= c) && (c <= 1112064);
}
function std$utf8$is_internal$U$B(data) {
   return (data & std$utf8$TRAILING_BYTE_MASK$static) === data;
}
function std$utf8$is_start_one$U$B(data) {
   return (data & std$utf8$ONE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_two$U$B(data) {
   return (data & std$utf8$TWO_BYTE_MASK$static) === data;
}
function std$utf8$is_start_three$U$B(data) {
   return (data & std$utf8$THREE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_four$U$B(data) {
   return (data & std$utf8$THREE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_n$UQ4uint$B(data, len) {
   return (((std$utf8$is_start_one$U$B(data) && (len === 1)) || (std$utf8$is_start_two$U$B(data) && (len >= 2))) || (std$utf8$is_start_three$U$B(data) && (len >= 3))) || (std$utf8$is_start_four$U$B(data) && (len >= 4));
}
function std$utf8$valid_2nd_byte$aUQ4uint$B(chars, i) {
   return ((i <= 0) || (!std$utf8$is_internal$U$B(chars[i]))) || std$utf8$is_start_n$UQ4uint$B(chars[i - 1], 2);
}
function std$utf8$valid_3rd_byte$aUQ4uint$B(chars, i) {
   return ((i <= 1) || (!std$utf8$is_internal$U$B(chars[i]))) || std$utf8$is_start_n$UQ4uint$B(chars[i - 2], 3);
}
function std$utf8$valid_4th_byte$aUQ4uint$B(chars, i) {
   return ((i <= 2) || (!std$utf8$is_internal$U$B(chars[i]))) || std$utf8$is_start_n$UQ4uint$B(chars[i - 2], 4);
}
function std$utf8$string$type(chars) {
   return function() {
      for(let i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_2nd_byte$aUQ4uint$B(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }() && function() {
      for(let i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_3rd_byte$aUQ4uint$B(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }() && function() {
      for(let i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_4th_byte$aUQ4uint$B(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }();
}
const std$utf8$ONE_BYTE_MASK$static = 0b1111111;
const std$utf8$TWO_BYTE_MASK$static = 0b11011111;
const std$utf8$THREE_BYTE_MASK$static = 0b11101111;
const std$utf8$FOUR_BYTE_MASK$static = 0b11110111;
const std$utf8$TRAILING_BYTE_MASK$static = 0b10111111;
function std$utf8$length$Q6string$Q4uint(str) {
   let x;
   let len = 0;
   for(let i = 0;i < str.length;i = i + 1) {
      let data = str[i];
      if((data & std$utf8$TRAILING_BYTE_MASK$static) !== data)  {
          {
            const $53 = len + 1;
            len = $53;
         }
      }
   }
   return len;
}
function is$u2Q4uintNQ4uint(v) {
   return ((typeof v) === "number") && std$integer$uint$type(v);
}
function is$Q6Optiontv1SQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$Q6Optiontv1TQ4Sometv1T(v) {
   return is$Q6Optiontv1Tr1v1T5value(v) && std$option$Some$type(v);
}
function is$u2Q4NoneQ4Sometv1SQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$u2NQ4uintQ4uint(v) {
   return ((typeof v) === "number") && std$integer$uint$type(v);
}
function is$u2Q4NoneQ4Sometv1TQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$Q6Optiontv1TQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$Q6Optiontv1SQ4Sometv1S(v) {
   return is$Q6Optiontv1Sr1v1S5value(v) && std$option$Some$type(v);
}
function is$Q6Optiontv1Sr1v1S5value(v) {
   return true;
}
function is$Q6Optiontv1Tr1v1T5value(v) {
   return true;
}
function w3c$ajax$newXMLHttpRequest() {
    return new XMLHttpRequest();
}
function w3c$dom$alert(message) {
    alert(message);
}

function w3c$dom$setTimeout(callback,ms){
    setTimeout(callback,ms);
}

function w3c$dom$setInterval(callback, ms) {
    setInterval(callback,ms);
}

function w3c$dom$clearTimeout() {
    clearTimeout();
}

function w3c$dom$clearInterval() {
    clearInterval();
}

function w3c$dom$open(URL, name, specs, replace) {
    open(URL,name,specs,replace)
}

function w3c$dom$prompt(text, defaultText) {
    prompt(text,defaultText);
}

function w3c$dom$confirm(text) {
    confirm(text);
}

function w3c$dom$close() {
    close();
}
function js$JSON$parse(str) {
    return JSON.parse(str);
}

function js$JSON$stringify(item) {
    return JSON.stringify(item);
}
function js$core$append$Q6stringQ6string$Q6string(lhs, rhs) {
    return lhs + rhs;
}

function js$core$append$Q6stringQ3intQ6string(lhs, rhs) {
    return lhs + rhs;
}

function js$core$append$Q3intQ6numberQ6string(lhs, rhs) {
    return lhs + rhs;
}


function js$core$append$Q6stringQ6number$Q6string(lhs, rhs) {
    return lhs + rhs;
}

function js$core$append$Q6numberQ6string$Q6string(lhs, rhs) {
    return lhs + rhs;
}
function js$date$now() {
    return Date.now();
}

function js$date$Date(ms) {
    return new Date(ms);
}
function js$math$abs(x) {
    return Math.abs(x);
}

function js$math$sin(radians) {
    return Math.sin(radians)
}

function js$math$cos(radians) {
    return Math.sin(radians)    
}

function js$math$to_radians(degrees) {
    return (degrees * Math.PI) / 180;
}

function js$math$random(magnitude) {
    // Generate random integer between 0 and magnitude.
    return Math.floor(Math.random() * magnitude);
}
/**
 * The module Wy contains various runtime support functions necessary
 * for implementing the Whiley language in JavaScript.
 */
var Wy = {};

/**
 *
 */
Wy.array = function(val, len) {
    var arr = [];
    for(var i=0;i<len;i=i+1) {
	arr[i] = val;
    }
    return arr;
};

/**
 * Provide a generic mechanism for raising assertions
 */
Wy.assert = function(result) {
    if(!result) {
	// Assertion failed, now try to raise exception
	if(typeof console !== "undefined") {
	    // Use console assert (if available)
	    console.assert(false);
	} else {
	    throw "assertion failure";
	}
    }
};

/**
 * Clone an arbitrary value or object.  This is a deep clone,
 * meaning that nested references are also cloned.
 */
Wy.copy = function(obj) {
    if (null == obj || "object" != typeof obj) {
	// Handle primitive types
	return obj;
    } else if(obj.constructor === Array) {
	// Clone whiley arrays by recursively (i.e. deep) cloning
	// all elements.
	var r = [];
	for(var i=0;i!=obj.length;++i) {
	    r[i] = Wy.copy(obj[i]);
	}
	return r;
    } else if(obj.constructor == Wy.Record) {
	// Clone whiley records by recursively (i.e. deep) cloning
	// all fields.
	var r = new Wy.Record({});
	for(var p in obj) {
	    r[p] = Wy.copy(obj[p]);
	}
	return r;
    } else {
	// This represents everything else, including Whiley
	// references and external JS references.
	return obj;
    }
};

/**
 * Provide a generic equality method for objects.
 */
Wy.equals = function(o1, o2) {
    if(o1 === o2) {
	return true;
    } else if(o1 == null || o2 == null) {
	// One is null, and other is not
	return false;
    } else if((typeof o1) == "object" || (typeof o2) == "object") {
	if((typeof o1) == "string") {
	    return Wy.strObjEquals(o1,o2);
	} else if((typeof o2) == "string") {
	    return Wy.strObjEquals(o2,o1);
	} else {
	    return Wy.objObjEquals(o1,o2);
	}
    } else {
	// Primitive types cannot be equal.
	return false;
    }
};

/**
 * Check whether a string and an object are equal, assuming neither is
 * null.
 */
Wy.strObjEquals = function(s1,o2){
    if(s1.length != o2.length) {
	return false;
    } else {
	for (var i = 0; i < s1.length; i++) {
	    if (s1.charCodeAt(i) != o2[i]) {	
		return false;
	    }
	}
	return true;	    
    }
};

/**
 * Check whether two objects (e.g. arrays or records) are equal,
 * assuming neither is null.
 */
Wy.objObjEquals = function(o1,o2) {
    var o1Fields = Object.getOwnPropertyNames(o1);
    var o2Fields = Object.getOwnPropertyNames(o2);
    // Check whether same number of fields
    if (o1Fields.length != o2Fields.length) {
	// No, different numbers of fields
	return false;
    } else {
	// Now, compare fields
	for (var i = 0; i < o1Fields.length; i++) {
	    var field = o1Fields[i];
	    //
	    if (!Wy.equals(o1[field],o2[field])) {
		// Values for this field not equal, hence
		// entire recordnot equal.
		return false;
	    }
	}
    }
    // Done
    return true;
};

/**
 * Whiley record constructor.
 */
Wy.Record = function(x) {
    for(var prop in x) {
	this[prop] = x[prop];
    }
};

/**
 * Whiley reference constuctor.
 */
Wy.Ref = function(x) {
    this.$ref = x;
};

/**
 * Convert a Whiley string into a JavaScript string.  This is done by
 * converting each character code in the array into a JavaScript
 * string character.
 */
Wy.fromString = function(whileyString) {
    var result = "";
    for (var i = 0; i < whileyString.length; i++) {
	result += String.fromCharCode(whileyString[i]);
    }
    return result;
}

/**
 * Convert a JavaScript string into a Whiley string.  
 */
Wy.toString = function(jsString) {
    var result = [];
    for (var i = 0; i < jsString.length; i++) {
	result.push(jsString.charCodeAt(i));
    }
    return result;
}
