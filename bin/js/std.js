'use strict';
function std$array$equals$av1Tav1TII(lhs, rhs, start, end) {
   return ((lhs.length >= end) && (rhs.length >= end)) && function() {
      for(var i = start;i < end;i = i + 1) {
         if(!Wy.equals(lhs[i], rhs[i]))  {
            return false;
         }
      }
      return true;
   }();
}
function std$array$equals$av1TIav1TII(l, l_start, r, r_start, length) {
   return ((l.length >= (l_start + length)) && (r.length >= (r_start + length))) && function() {
      for(var i = 0;i < length;i = i + 1) {
         if(!Wy.equals(l[l_start + i], r[r_start + i]))  {
            return false;
         }
      }
      return true;
   }();
}
function std$array$contains$av1Tv1TII(lhs, item, start, end) {
   return function() {
      for(var i = start;i < end;i = i + 1) {
         if(Wy.equals(lhs[i], item))  {
            return true;
         }
      }
      return false;
   }();
}
function std$array$matches$av1Tav1T(arr, subseq) {
   return std$array$matches$av1Tav1TII(Wy.copy(arr), Wy.copy(subseq), 0, arr.length);
}
function std$array$matches$av1Tav1TII(arr, subseq, start, end) {
   return function() {
      for(var i = start;i < end;i = i + 1) {
         if(std$array$equals$av1TIav1TII(Wy.copy(arr), i, Wy.copy(subseq), 0, subseq.length))  {
            return true;
         }
      }
      return false;
   }();
}
function std$array$first_match$av1Tav1TI(arr, subseq, index) {
   return std$array$equals$av1TIav1TII(Wy.copy(arr), index, Wy.copy(subseq), 0, subseq.length) && (!std$array$matches$av1Tav1TII(Wy.copy(arr), Wy.copy(subseq), 0, index));
}
function std$array$unique_elements$av1TI(items, end) {
   return function() {
      for(var i = 0;i < end;i = i + 1) {
         for(var j = i + 1;j < end;j = j + 1) {
            if(!(!Wy.equals(items[i], items[j])))  {
               return false;
            }
         }
      }
      return true;
   }();
}
function std$array$first_index_of$av1Tv1T(items, item) {
   let index;
   return std$array$first_index_of$av1Tv1TI(Wy.copy(items), Wy.copy(item), 0);
}
function std$array$first_index_of$av1Tv1TI(items, item, start) {
   let index;
   let i = start;
   while(i < items.length)  {
      if(Wy.equals(items[i], item))  {
         return i;
      }
      i = i + 1;
   }
   return null;
}
function std$array$first_index_of$av1Tav1T(items, item) {
   let index;
   return std$array$first_index_of$av1Tav1TI(Wy.copy(items), Wy.copy(item), 0);
}
function std$array$first_index_of$av1Tav1TI(items, item, start) {
   let index;
   let i = start;
   while(i <= (items.length - item.length))  {
      let j = 0;
      while(j < item.length)  {
         if(!Wy.equals(items[i + j], item[j]))  {
            break;
         }
         j = j + 1;
      }
      if(j === item.length)  {
         return i;
      }
      i = i + 1;
   }
   return null;
}
function std$array$last_index_of$av1Tv1T(items, item) {
   let index;
   let i = items.length;
   while(i > 0)  {
      i = i - 1;
      if(Wy.equals(items[i], item))  {
         return i;
      }
   }
   return null;
}
function std$array$replace_all$av1Tv1Tv1T(items, old, n) {
   let r;
   let i = 0;
   let oldItems = Wy.copy(items);
   while(i < items.length)  {
      if(Wy.equals(oldItems[i], old))  {
         items[i] = Wy.copy(n);
      }
      i = i + 1;
   }
   return Wy.copy(items);
}
function std$array$replace_first$av1Tv1Tv1T(items, old, n) {
   let r;
   let i = 0;
   let oldItems = Wy.copy(items);
   while(i < items.length)  {
      if(Wy.equals(oldItems[i], old))  {
         items[i] = Wy.copy(n);
         return Wy.copy(items);
      }
      i = i + 1;
   }
   return Wy.copy(items);
}
function std$array$replace_first$av1Tav1Tav1T(items, old, n) {
   let r;
   let i = std$array$first_index_of$av1Tav1T(Wy.copy(items), Wy.copy(old));
   if(i === null)  {
      return Wy.copy(items);
   } else  {
      if(old.length === n.length)  {
         return std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(n), 0, Wy.copy(items), i, old.length);
      } else  {
         let size = (items.length - old.length) + n.length;
         let nitems = std$array$resize$av1TI(Wy.copy(items), size);
         nitems = std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(n), 0, Wy.copy(nitems), i, n.length);
         let remainder = (size - i) - n.length;
         return std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(items), i + old.length, Wy.copy(nitems), i + n.length, remainder);
      }
   }
}
function std$array$replace_all$av1Tav1Tav1T(items, old, n) {
   let r;
   while(std$array$first_index_of$av1Tav1T(Wy.copy(items), Wy.copy(old)) !== null)  {
      items = std$array$replace_first$av1Tav1Tav1T(Wy.copy(items), Wy.copy(old), Wy.copy(n));
   }
   return Wy.copy(items);
}
function std$array$replace$av1Tav1Taav1T(items, old, nn) {
   let r;
   let i = 0;
   while((i < nn.length) && (std$array$first_index_of$av1Tav1T(Wy.copy(items), Wy.copy(old)) !== null))  {
      items = std$array$replace_first$av1Tav1Tav1T(Wy.copy(items), Wy.copy(old), Wy.copy(nn[i]));
      i = i + 1;
   }
   return Wy.copy(items);
}
function std$array$slice$av1TII(items, start, end) {
   let r;
   if(start === end)  {
      return [];
   } else  {
      let nitems = Wy.array(items[0], end - start);
      return std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(items), start, Wy.copy(nitems), 0, nitems.length);
   }
}
function std$array$append$av1Tav1T(lhs, rhs) {
   let r;
   if(lhs.length === 0)  {
      return Wy.copy(rhs);
   } else  {
      let rs = std$array$resize$av1TIv1T(Wy.copy(lhs), lhs.length + rhs.length, Wy.copy(lhs[0]));
      return std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(rhs), 0, Wy.copy(rs), lhs.length, rhs.length);
   }
}
function std$array$append$av1Tv1T(items, item) {
   let r;
   let nitems = Wy.array(item, items.length + 1);
   let i = 0;
   while(i < items.length)  {
      nitems[i] = Wy.copy(items[i]);
      i = i + 1;
   }
   return Wy.copy(nitems);
}
function std$array$append$v1Tav1T(item, items) {
   let r;
   let nitems = Wy.array(item, items.length + 1);
   let i = 0;
   while(i < items.length)  {
      nitems[i + 1] = Wy.copy(items[i]);
      i = i + 1;
   }
   return Wy.copy(nitems);
}
function std$array$resize$av1TI(src, size) {
   let result;
   if(src.length === 0)  {
      return Wy.copy(src);
   } else  {
      result = Wy.array(src[0], size);
      let i = 0;
      while(i < size)  {
         result[i] = Wy.copy(src[i]);
         i = i + 1;
      }
      return Wy.copy(result);
   }
}
function std$array$resize$av1TIv1T(items, size, item) {
   let result;
   let nitems = Wy.array(item, size);
   let i = 0;
   while((i < size) && (i < items.length))  {
      nitems[i] = Wy.copy(items[i]);
      i = i + 1;
   }
   return Wy.copy(nitems);
}
function std$array$copy$av1TQ4uintav1TQ4uintQ4uint(src, srcStart, dest, destStart, length) {
   let result;
   let i = srcStart;
   let j = destStart;
   let srcEnd = srcStart + length;
   while(i < srcEnd)  {
      dest[j] = Wy.copy(src[i]);
      i = i + 1;
      j = j + 1;
   }
   return Wy.copy(dest);
}
function std$array$remove$av1TQ4uint(src, ith) {
   let result;
   result = Wy.array(src[0], src.length - 1);
   result = std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(src), 0, Wy.copy(result), 0, ith);
   return std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(src), ith + 1, Wy.copy(result), ith, result.length - ith);
}
function std$array$swap$av1TQ4uintQ4uint(src, ith, jth) {
   let result;
   let tmp = Wy.copy(src[ith]);
   src[ith] = Wy.copy(src[jth]);
   src[jth] = Wy.copy(tmp);
   return Wy.copy(src);
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
function std$ascii$to_byte$Q4char(v) {
   let mask = 0b1;
   let r = 0b0;
   let i = 0;
   while(i < 8)  {
      if((v % 2) === 1)  {
         r = r | mask;
      }
      v = Math.floor(v / 2);
      mask = mask << 1;
      i = i + 1;
   }
   return r;
}
function std$ascii$to_bytes$Q6string(s) {
   let r = Wy.array(0b0, s.length);
   let i = 0;
   while(i < s.length)  {
      r[i] = std$ascii$to_byte$Q4char(s[i]);
      i = i + 1;
   }
   return Wy.copy(r);
}
function std$ascii$from_bytes$aU(data) {
   let r = Wy.array(0, data.length);
   let i = 0;
   while(i < data.length)  {
      let v = std$integer$to_uint$U(data[i]);
      if(v >= 127)  {
         v = 63;
      }
      r[i] = v;
      i = i + 1;
   }
   return Wy.copy(r);
}
function std$ascii$is_upper_case$Q4char(c) {
   return (65 <= c) && (c <= 90);
}
function std$ascii$is_lower_case$Q4char(c) {
   return (97 <= c) && (c <= 122);
}
function std$ascii$is_letter$Q4char(c) {
   return ((97 <= c) && (c <= 122)) || ((65 <= c) && (c <= 90));
}
function std$ascii$is_digit$Q4char(c) {
   return (48 <= c) && (c <= 57);
}
function std$ascii$is_whitespace$Q4char(c) {
   return (c === 32) || ((c === 9) || ((c === 10) || (c === 13)));
}
function std$ascii$to_string$I(item) {
   let sign;
   if(item < 0)  {
      sign = false;
      item = -item;
   } else  {
      sign = true;
   }
   let tmp = item;
   let digits = 0;
   do {
      tmp = Math.floor(tmp / 10);
      digits = digits + 1;
   } while(tmp !== 0);
   let r = Wy.array(48, digits);
   do {
      let remainder = item % 10;
      item = Math.floor(item / 10);
      let digit = 48 + remainder;
      digits = digits - 1;
      r[digits] = digit;
   } while(item !== 0);
   if(sign)  {
      return Wy.copy(r);
   } else  {
      return std$array$append$av1Tav1T(Wy.toString("-"), Wy.copy(r));
   }
}
function std$ascii$to_string$aI(items) {
   let r = Wy.toString("");
   let i = 0;
   while(i < items.length)  {
      if(i !== 0)  {
         r = std$array$append$av1Tav1T(Wy.copy(r), Wy.toString(","));
      }
      r = std$array$append$av1Tav1T(Wy.copy(r), std$ascii$to_string$I(items[i]));
      i = i + 1;
   }
   return Wy.copy(r);
}
function std$ascii$parse_int$Q5ascii6string(input) {
   let start = 0;
   let negative;
   if(input[0] === 45)  {
      negative = true;
      start = start + 1;
   } else  {
      negative = false;
   }
   let r = 0;
   let i = start;
   while(i < input.length)  {
      let c = input[i];
      r = r * 10;
      if(!std$ascii$is_digit$Q4char(c))  {
         return null;
      }
      r = r + (c - 48);
      i = i + 1;
   }
   if(negative)  {
      return -r;
   } else  {
      return r;
   }
}
function std$filesystem$uint$type(x) {
   return x >= 0;
}
let std$filesystem$READONLY$static = 0;
let std$filesystem$READWRITE$static = 1;
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
function std$integer$to_unsigned_byte$Q2u8(v) {
   let mask = 0b1;
   let r = 0b0;
   let i = 0;
   while(i < 8)  {
      if((v % 2) === 1)  {
         r = r | mask;
      }
      v = Math.floor(v / 2);
      mask = mask << 1;
      i = i + 1;
   }
   return r;
}
function std$integer$to_signed_byte$Q2i8(v) {
   let u;
   if(v >= 0)  {
      u = v;
   } else  {
      u = v + 256;
   }
   return std$integer$to_unsigned_byte$Q2u8(u);
}
function std$integer$to_string$U(b) {
   let r = Wy.array(0, 98);
   let i = 0;
   while(i < 8)  {
      if((b & 0b1) === 0b1)  {
         r[7 - i] = 49;
      } else  {
         r[7 - i] = 48;
      }
      b = b >> 1;
      i = i + 1;
   }
   return Wy.copy(r);
}
function std$integer$to_uint$U(b) {
   let r = 0;
   let base = 1;
   while(b !== 0b0)  {
      if((b & 0b1) === 0b1)  {
         r = r + base;
      }
      b = (b >> 1) & 0b1111111;
      base = base * 2;
   }
   return r;
}
function std$integer$to_uint$aU(bytes) {
   let val = 0;
   let base = 1;
   let i = 0;
   while(i < bytes.length)  {
      let v = std$integer$to_uint$U(bytes[i]) * base;
      val = val + v;
      base = base * 256;
      i = i + 1;
   }
   return val;
}
function std$integer$to_int$U(b) {
   let r = 0;
   let base = 1;
   while(b !== 0b0)  {
      if((b & 0b1) === 0b1)  {
         r = r + base;
      }
      b = (b >> 1) & 0b1111111;
      base = base * 2;
   }
   if(r >= 128)  {
      return -(256 - r);
   } else  {
      return r;
   }
}
function std$integer$to_int$aU(bytes) {
   let val = 0;
   let base = 1;
   let i = 0;
   while(i < bytes.length)  {
      let v = std$integer$to_uint$U(bytes[i]) * base;
      val = val + v;
      base = base * 256;
      i = i + 1;
   }
   if(val >= Math.floor(base / 2))  {
      return -(base - val);
   } else  {
      return val;
   }
}
function std$math$abs$I(x) {
   let r;
   if(x < 0)  {
      return -x;
   } else  {
      return x;
   }
}
function std$math$max$II(a, b) {
   let r;
   if(a < b)  {
      return b;
   } else  {
      return a;
   }
}
function std$math$min$II(a, b) {
   let r;
   if(a > b)  {
      return b;
   } else  {
      return a;
   }
}
function std$math$pow$II(base, exponent) {
   let r = 1;
   let i = 0;
   while(i < exponent)  {
      r = r * base;
      i = i + 1;
   }
   return r;
}
function std$math$isqrt$I(x) {
   let r;
   let square = 1;
   let delta = 3;
   while(square <= x)  {
      square = square + delta;
      delta = delta + 2;
   }
   return Math.floor(delta / 2) - 1;
}
function std$set$ArraySet$type(v) {
   return std$array$unique_elements$av1TI(Wy.copy(v.items), v.length);
}
function std$set$insert$Q8ArraySetv1T(set, item) {
   let r;
   if(std$array$contains$av1Tv1TII(Wy.copy(set.items), Wy.copy(item), 0, set.length))  {
      return Wy.copy(set);
   } else  {
      return std$vector$push$Q6Vectorv1T(Wy.copy(set), Wy.copy(item));
   }
}
function std$utf8$uint$type(x) {
   return x >= 0;
}
function std$utf8$char$type(c) {
   return (0 <= c) && (c <= 1112064);
}
function std$utf8$is_internal$U(data) {
   return (data & std$utf8$TRAILING_BYTE_MASK$static) === data;
}
function std$utf8$is_start_one$U(data) {
   return (data & std$utf8$ONE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_two$U(data) {
   return (data & std$utf8$TWO_BYTE_MASK$static) === data;
}
function std$utf8$is_start_three$U(data) {
   return (data & std$utf8$THREE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_four$U(data) {
   return (data & std$utf8$THREE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_n$UQ4uint(data, len) {
   return ((len !== 1) || (std$utf8$is_start_one$U(data) || (std$utf8$is_start_two$U(data) || (std$utf8$is_start_three$U(data) || std$utf8$is_start_four$U(data))))) && ((len !== 2) || (std$utf8$is_start_two$U(data) || (std$utf8$is_start_three$U(data) || std$utf8$is_start_four$U(data)))) && ((len !== 3) || (std$utf8$is_start_three$U(data) || std$utf8$is_start_four$U(data))) && ((len !== 4) || std$utf8$is_start_four$U(data));
}
function std$utf8$valid_2nd_byte$aUQ4uint(chars, i) {
   return ((i <= 0) || (!std$utf8$is_internal$U(chars[i]))) || std$utf8$is_start_n$UQ4uint(chars[i - 1], 2);
}
function std$utf8$valid_3rd_byte$aUQ4uint(chars, i) {
   return ((i <= 1) || (!std$utf8$is_internal$U(chars[i]))) || std$utf8$is_start_n$UQ4uint(chars[i - 2], 3);
}
function std$utf8$valid_4th_byte$aUQ4uint(chars, i) {
   return ((i <= 2) || (!std$utf8$is_internal$U(chars[i]))) || std$utf8$is_start_n$UQ4uint(chars[i - 2], 4);
}
function std$utf8$string$type(chars) {
   return function() {
      for(var i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_2nd_byte$aUQ4uint(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }() && function() {
      for(var i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_3rd_byte$aUQ4uint(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }() && function() {
      for(var i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_4th_byte$aUQ4uint(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }();
}
let std$utf8$ONE_BYTE_MASK$static = 0b1111111;
let std$utf8$TWO_BYTE_MASK$static = 0b11011111;
let std$utf8$THREE_BYTE_MASK$static = 0b11101111;
let std$utf8$FOUR_BYTE_MASK$static = 0b11110111;
let std$utf8$TRAILING_BYTE_MASK$static = 0b10111111;
function std$utf8$length$Q6string(str) {
   let x;
   let i = 0;
   let len = 0;
   while(i < str.length)  {
      let data = str[i];
      if((data & std$utf8$TRAILING_BYTE_MASK$static) !== data)  {
         len = len + 1;
      }
      i = i + 1;
   }
   return len;
}
function std$vector$Vector$type($) {
   return $.length <= $.items.length;
}
function std$vector$Vector() {
   return new Wy.Record({items: [], length: 0});
}
function std$vector$Vector$av1T(items) {
   return new Wy.Record({items: Wy.copy(items), length: items.length});
}
function std$vector$top$Q6Vector(vec) {
   return Wy.copy(vec.items[vec.length - 1]);
}
function std$vector$size$Q6Vector(vec) {
   let r;
   return vec.length;
}
function std$vector$get$Q6VectorI(vec, ith) {
   let item;
   return Wy.copy(vec.items[ith]);
}
function std$vector$push$Q6Vectorv1T(vec, item) {
   let nvec;
   if(vec.length === vec.items.length)  {
      let nlen = (vec.length * 2) + 1;
      vec.items = std$array$resize$av1TIv1T(Wy.copy(vec.items), nlen, Wy.copy(item));
   } else  {
      vec.items[vec.length] = Wy.copy(item);
   }
   vec.length = vec.length + 1;
   return Wy.copy(vec);
}
function std$vector$push_all$Q6Vectorav1T(vec, items) {
   let nvec;
   let len = vec.length + items.length;
   if(items.length === 0)  {
      return Wy.copy(vec);
   } else  {
      if(len > vec.items.length)  {
         let nlen = (vec.length * 2) + items.length;
         vec.items = std$array$resize$av1TIv1T(Wy.copy(vec.items), nlen, Wy.copy(items[0]));
      }
   }
   vec.items = std$array$copy$av1TQ4uintav1TQ4uintQ4uint(Wy.copy(items), 0, Wy.copy(vec.items), vec.length, items.length);
   vec.length = vec.length + items.length;
   return Wy.copy(vec);
}
function std$vector$pop$Q6Vector(vec) {
   let nvec;
   vec.length = vec.length - 1;
   return Wy.copy(vec);
}
function std$vector$set$Q6VectorIv1T(vec, ith, item) {
   let result;
   vec.items[ith] = Wy.copy(item);
   return Wy.copy(vec);
}
function std$vector$remove$Q6VectorI(vec, ith) {
   let result;
   let items = std$array$remove$av1TQ4uint(Wy.copy(vec.items), ith);
   return new Wy.Record({items: Wy.copy(items), length: vec.length - 1});
}
function std$vector$swap$Q6VectorQ4uintQ4uint(vec, ith, jth) {
   let result;
   vec.items = std$array$swap$av1TQ4uintQ4uint(Wy.copy(vec.items), ith, jth);
   return Wy.copy(vec);
}
function std$vector$clear$Q6Vector(vec) {
   let r;
   vec.length = 0;
   return Wy.copy(vec);
}
function std$vector$equals$Q6VectorQ6Vector(lhs, rhs) {
   return (lhs.length === rhs.length) && std$array$equals$av1Tav1TII(Wy.copy(lhs.items), Wy.copy(rhs.items), 0, lhs.length);
}
