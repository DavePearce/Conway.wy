
// ================================================================================
// Preamble
// ================================================================================
const Context#Level : int;
type Type;
var HEAP : [Ref]Any;

// Any
// --------------------------------------------------------------------------------
type Any;
function Any#within(HEAP : [Ref]Any, p : Ref, q : Any) returns (bool) {
   (Ref#is(q) && Ref#within(HEAP,p,Ref#unbox(q))) || (Array#is(q) && Array#within(HEAP,p,Array#unbox(q))) || (Record#is(q) && Record#within(HEAP,p,Record#unbox(q)))
}

// Void
// --------------------------------------------------------------------------------
const unique Void : Any;
function Void#is(v : Any) returns (bool) {
   v == Void
}

// Null
// --------------------------------------------------------------------------------
const unique Null : Any;
function Null#is(v : Any) returns (bool) {
   v == Null
}

// Booleans
// --------------------------------------------------------------------------------
function Bool#box(bool) returns (Any);
function Bool#unbox(Any) returns (bool);
function Bool#is(v : Any) returns (bool) {
   (exists b:bool :: Bool#box(b) == v)
}
axiom (forall b:bool :: Bool#unbox(Bool#box(b)) == b);
axiom (forall b:bool :: Bool#box(b) != Void);

// Bytes
// --------------------------------------------------------------------------------
function Byte#box(bv8) returns (Any);
function Byte#unbox(Any) returns (bv8);
function {:bvbuiltin "bv2int"} Byte#toInt(bv8) returns (int);
function Byte#is(v : Any) returns (bool) {
   (exists b:bv8 :: Byte#box(b) == v)
}
function {:bvbuiltin "(_ int2bv 8)"} Byte#fromInt(int) returns (bv8);
function {:bvbuiltin "bvnot"} Byte#Not(bv8) returns (bv8);
function {:bvbuiltin "bvand"} Byte#And(bv8, bv8) returns (bv8);
function {:bvbuiltin "bvor"} Byte#Or(bv8, bv8) returns (bv8);
function {:bvbuiltin "bvxor"} Byte#Xor(bv8, bv8) returns (bv8);
function {:bvbuiltin "bvshl"} Byte#Shl(bv8, bv8) returns (bv8);
function {:bvbuiltin "bvlshr"} Byte#Shr(bv8, bv8) returns (bv8);
axiom (forall b:bv8 :: Byte#unbox(Byte#box(b)) == b);
axiom (forall b:bv8 :: Byte#box(b) != Void);

// Integers
// --------------------------------------------------------------------------------
function Int#box(int) returns (Any);
function Int#unbox(Any) returns (int);
function Int#is(v : Any) returns (bool) {
   (exists i:int :: Int#box(i) == v)
}
axiom (forall i:int :: Int#unbox(Int#box(i)) == i);
axiom (forall i:int :: Int#box(i) != Void);

// Arrays
// --------------------------------------------------------------------------------
function Array#box([int]Any) returns (Any);
function Array#unbox(Any) returns ([int]Any);
function Array#is(v : Any) returns (bool) {
   (exists a:[int]Any :: Array#box(a) == v)
}
function Array#in(a : [int]Any, i : int) returns (bool) {
   (i >= 0) && (i < Array#Length(a))
}
axiom (forall i:[int]Any :: Array#unbox(Array#box(i)) == i);
axiom (forall a:[int]Any :: Array#box(a) != Void);
function Array#Length([int]Any) returns (int);
axiom (forall a:[int]Any :: 0 <= Array#Length(a));
axiom (forall a:[int]Any,i:int,v:Any :: ((v != Void) && Array#in(a,i)) ==> (Array#Length(a) == Array#Length(a[i:=v])));
// Array Initialisers
function Array#Empty(int) returns ([int]Any);
axiom (forall l:int,i:int :: ((0 <= i) && (i < l)) || (Array#Empty(l)[i] == Void));
axiom (forall l:int,i:int :: ((0 <= i) && (i < l)) ==> (Array#Empty(l)[i] != Void));
axiom (forall a:[int]Any,l:int :: ((0 <= l) && (Array#Empty(l) == a)) ==> (Array#Length(a) == l));
// Array Generators
function Array#Generator(Any, int) returns ([int]Any);
axiom (forall v:Any,l:int,i:int :: ((0 <= i) && (i < l) && (v != Void)) ==> (Array#Generator(v,l)[i] == v));
axiom (forall v:Any,l:int,i:int :: ((0 <= i) && (i < l)) || (Array#Generator(v,l)[i] == Void));
axiom (forall a:[int]Any,v:Any,l:int :: ((0 <= l) && (Array#Generator(v,l) == a)) ==> (Array#Length(a) == l));
function Array#within(HEAP : [Ref]Any, p : Ref, q : [int]Any) returns (bool) {
   (exists i:int :: Any#within(HEAP,p,q[i]))
}

// Fields
// --------------------------------------------------------------------------------
type Field;
const unique $cells : Field;
const unique $width : Field;
const unique $height : Field;

// Records
// --------------------------------------------------------------------------------
function Record#box([Field]Any) returns (Any);
function Record#unbox(Any) returns ([Field]Any);
function Record#is(v : Any) returns (bool) {
   (exists r:[Field]Any :: Record#box(r) == v)
}
axiom (forall i:[Field]Any :: Record#unbox(Record#box(i)) == i);
axiom (forall r:[Field]Any :: Record#box(r) != Void);
const unique Record#Empty : [Field]Any;
axiom (forall f:Field :: Record#Empty[f] == Void);
function Record#within(HEAP : [Ref]Any, p : Ref, q : [Field]Any) returns (bool) {
   (exists f:Field :: Any#within(HEAP,p,q[f]))
}

// References
// --------------------------------------------------------------------------------
type Ref;
function Ref#box(Ref) returns (Any);
function Ref#unbox(Any) returns (Ref);
function Ref#is(v : Any) returns (bool) {
   (exists r:Ref :: Ref#box(r) == v)
}
const unique Ref#Empty : [Ref]Any;
axiom (forall r:Ref :: Ref#unbox(Ref#box(r)) == r);
axiom (forall r:Ref :: Ref#box(r) != Void);
procedure Ref#new(val : Any) returns (ref : Ref);
ensures HEAP[ref] == val;
ensures old(HEAP)[ref] == Void;
ensures (forall r:Ref :: (ref == r) || (old(HEAP)[r] == HEAP[r]));
modifies HEAP;
function Ref#within(HEAP : [Ref]Any, p : Ref, q : Ref) returns (bool) {
   (p == q) || Any#within(HEAP,p,HEAP[q])
}

// Lambdas
// --------------------------------------------------------------------------------
type Lambda;
function Lambda#box(Lambda) returns (Any);
function Lambda#unbox(Any) returns (Lambda);
function Lambda#return(Lambda, int) returns (Any);
function Lambda#is(v : Any) returns (bool) {
   (exists l:Lambda :: Lambda#box(l) == v)
}
axiom (forall l:Lambda :: Lambda#unbox(Lambda#box(l)) == l);
axiom (forall l:Lambda :: Lambda#box(l) != Void);
function f_apply$0(i : int, l : Lambda) returns (Any);
axiom (forall i:int,l:Lambda :: f_apply$0(i,l) == Lambda#return(l,i));
function f_apply$1(i : int, l : Lambda, x0 : Any) returns (Any);
axiom (forall i:int,l:Lambda,x0:Any :: f_apply$1(i,l,x0) == Lambda#return(l,i));
function f_apply$2(i : int, l : Lambda, x0 : Any, x1 : Any) returns (Any);
axiom (forall i:int,l:Lambda,x0:Any,x1:Any :: f_apply$2(i,l,x0,x1) == Lambda#return(l,i));
function f_apply$3(i : int, l : Lambda, x0 : Any, x1 : Any, x2 : Any) returns (Any);
axiom (forall i:int,l:Lambda,x0:Any,x1:Any,x2:Any :: f_apply$3(i,l,x0,x1,x2) == Lambda#return(l,i));
function f_apply$4(i : int, l : Lambda, x0 : Any, x1 : Any, x2 : Any, x3 : Any) returns (Any);
axiom (forall i:int,l:Lambda,x0:Any,x1:Any,x2:Any,x3:Any :: f_apply$4(i,l,x0,x1,x2,x3) == Lambda#return(l,i));

// Exclusions
// --------------------------------------------------------------------------------
axiom (forall v:Any :: Null#is(v) ==> ((!Byte#is(v)) && (!Bool#is(v)) && (!Int#is(v)) && (!Array#is(v)) && (!Record#is(v)) && (!Ref#is(v)) && (!Lambda#is(v))));
axiom (forall v:Any :: Byte#is(v) ==> ((!Null#is(v)) && (!Bool#is(v)) && (!Int#is(v)) && (!Array#is(v)) && (!Record#is(v)) && (!Ref#is(v)) && (!Lambda#is(v))));
axiom (forall v:Any :: Bool#is(v) ==> ((!Null#is(v)) && (!Byte#is(v)) && (!Int#is(v)) && (!Array#is(v)) && (!Record#is(v)) && (!Ref#is(v)) && (!Lambda#is(v))));
axiom (forall v:Any :: Int#is(v) ==> ((!Null#is(v)) && (!Byte#is(v)) && (!Bool#is(v)) && (!Array#is(v)) && (!Record#is(v)) && (!Ref#is(v)) && (!Lambda#is(v))));
axiom (forall v:Any :: Array#is(v) ==> ((!Null#is(v)) && (!Byte#is(v)) && (!Bool#is(v)) && (!Int#is(v)) && (!Record#is(v)) && (!Ref#is(v)) && (!Lambda#is(v))));
axiom (forall v:Any :: Record#is(v) ==> ((!Null#is(v)) && (!Byte#is(v)) && (!Bool#is(v)) && (!Int#is(v)) && (!Array#is(v)) && (!Ref#is(v)) && (!Lambda#is(v))));
axiom (forall v:Any :: Ref#is(v) ==> ((!Null#is(v)) && (!Byte#is(v)) && (!Bool#is(v)) && (!Int#is(v)) && (!Array#is(v)) && (!Record#is(v)) && (!Lambda#is(v))));
axiom (forall v:Any :: Lambda#is(v) ==> ((!Null#is(v)) && (!Byte#is(v)) && (!Bool#is(v)) && (!Int#is(v)) && (!Array#is(v)) && (!Record#is(v)) && (!Ref#is(v))));

// Meta Types
// --------------------------------------------------------------------------------
function Type#is([Ref]Any, Type, Any) returns (bool);
const unique Type#V : Type;
axiom (forall HEAP:[Ref]Any,v:Any :: Type#is(HEAP,Type#V,v) <==> Void#is(v));

// ================================================================================
// TYPE: model::State : {bool[] cells,uint width,uint height}
// ================================================================================
type State = [Field]Any;
function State#inv($ : [Field]Any, HEAP : [Ref]Any) returns (bool) {
   (Array#Length(Array#unbox($[$cells])) == (Int#unbox($[$width]) * Int#unbox($[$height]))) && ((Int#unbox($[$width]) > 0) && (Int#unbox($[$height]) > 0))
}
function State#is($ : Any, HEAP : [Ref]Any) returns (bool) {
   ((Record#is($) && ((Array#is(Record#unbox($)[$cells]) && (forall i#1:int :: (Array#in(Array#unbox(Record#unbox($)[$cells]),i#1) ==> Bool#is(Array#unbox(Record#unbox($)[$cells])[i#1])) && ((!Array#in(Array#unbox(Record#unbox($)[$cells]),i#1)) ==> (Array#unbox(Record#unbox($)[$cells])[i#1] == Void)))) && uint#is(Record#unbox($)[$width],HEAP) && uint#is(Record#unbox($)[$height],HEAP))) && (forall f#0:Field :: (($cells != f#0) && ($width != f#0) && ($height != f#0)) ==> (Record#unbox($)[f#0] == Void))) && State#inv(Record#unbox($),HEAP)
}

// ================================================================================
// FUNCTION: model::init : function(uint,uint)->(State)
// ================================================================================

// Precondition Check
// --------------------------------------------------------------------------------
function init#pre(HEAP : [Ref]Any, width : uint, height : uint) returns (bool) {
   uint#is(Int#box(width),HEAP) && uint#is(Int#box(height),HEAP) && ((width > 0) && (height > 0))
}

// Postcondition Check
// --------------------------------------------------------------------------------
function init#post(HEAP : [Ref]Any, width : uint, height : uint, r : State) returns (bool) {
   State#is(Record#box(r),HEAP) && (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(r[$cells])))) ==> (0 <= i)) && (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(r[$cells])))) ==> (i < Array#Length(Array#unbox(r[$cells])))) && (Int#unbox(r[$width]) == width) && (Int#unbox(r[$height]) == height) && (Array#Length(Array#unbox(r[$cells])) == (Int#unbox(r[$width]) * Int#unbox(r[$height]))) && (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(r[$cells])))) ==> (Bool#unbox(Array#unbox(r[$cells])[i]) == false))
}

// Postcondition Axiom
// --------------------------------------------------------------------------------
axiom (Context#Level > 1) ==> (forall HEAP:[Ref]Any,width:uint,height:uint :: init#pre(HEAP,width,height) ==> init#post(HEAP,width,height,init(HEAP,width,height)));

// Prototype
// --------------------------------------------------------------------------------
function init(HEAP : [Ref]Any, width : uint, height : uint) returns (State);

// Lambda Reference & Axiom
// --------------------------------------------------------------------------------
const unique init#lambda : Lambda;
axiom (forall HEAP:[Ref]Any :: State#is(Lambda#return(init#lambda,0),HEAP));

// Implementation
// --------------------------------------------------------------------------------
procedure init#impl(HEAP : [Ref]Any, width : uint, height : uint) returns (r : State);
requires uint#is(Int#box(width),HEAP);
requires uint#is(Int#box(height),HEAP);
requires (width > 0) && (height > 0);
requires Context#Level > 1;
ensures State#is(Record#box(r),HEAP);
ensures (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(r[$cells])))) ==> (0 <= i));
ensures (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(r[$cells])))) ==> (i < Array#Length(Array#unbox(r[$cells]))));
ensures Int#unbox(r[$width]) == width;
ensures Int#unbox(r[$height]) == height;
ensures Array#Length(Array#unbox(r[$cells])) == (Int#unbox(r[$width]) * Int#unbox(r[$height]));
ensures (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(r[$cells])))) ==> (Bool#unbox(Array#unbox(r[$cells])[i]) == false));
implementation init#impl(HEAP# : [Ref]Any, width# : uint, height# : uint) returns (r : State)
{
   var HEAP : [Ref]Any;
   var width : uint;
   var height : uint;
   HEAP := HEAP#;
   width := width#;
   height := height#;
   assert 0 <= (width * height);
   r := Record#Empty[$cells:=Array#box(Array#Generator(Bool#box(false),width * height))][$width:=Int#box(width)][$height:=Int#box(height)];
   return;
}

// ================================================================================
// FUNCTION: model::click : function(int,int,State)->(State)
// ================================================================================

// Precondition Check
// --------------------------------------------------------------------------------
function click#pre(HEAP : [Ref]Any, x : int, y : int, s : State) returns (bool) {
   State#is(Record#box(s),HEAP)
}

// Postcondition Check
// --------------------------------------------------------------------------------
function click#post(HEAP : [Ref]Any, x : int, y : int, s : State, r : State) returns (bool) {
   State#is(Record#box(r),HEAP) && (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> (0 <= (a + (b * Int#unbox(s[$width]))))) && (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> ((a + (b * Int#unbox(s[$width]))) < Array#Length(Array#unbox(r[$cells])))) && (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> (0 <= (a + (b * Int#unbox(s[$width]))))) && (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> ((a + (b * Int#unbox(s[$width]))) < Array#Length(Array#unbox(s[$cells])))) && (((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> (0 <= (x + (y * Int#unbox(s[$width]))))) && (((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> ((x + (y * Int#unbox(s[$width]))) < Array#Length(Array#unbox(r[$cells])))) && (((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> (0 <= (x + (y * Int#unbox(s[$width]))))) && (((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> ((x + (y * Int#unbox(s[$width]))) < Array#Length(Array#unbox(s[$cells])))) && ((Int#unbox(s[$height]) == Int#unbox(r[$height])) && (Int#unbox(s[$width]) == Int#unbox(r[$width]))) && (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> ((((a + (b * Int#unbox(s[$width]))) < Array#Length(Array#unbox(r[$cells]))) && ((a != x) || (b != y))) <==> (Bool#unbox(Array#unbox(r[$cells])[a + (b * Int#unbox(s[$width]))]) == Bool#unbox(Array#unbox(s[$cells])[a + (b * Int#unbox(s[$width]))])))) && (((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> (Bool#unbox(Array#unbox(r[$cells])[x + (y * Int#unbox(s[$width]))]) == (!Bool#unbox(Array#unbox(s[$cells])[x + (y * Int#unbox(s[$width]))]))))
}

// Postcondition Axiom
// --------------------------------------------------------------------------------
axiom (Context#Level > 1) ==> (forall HEAP:[Ref]Any,x:int,y:int,s:State :: click#pre(HEAP,x,y,s) ==> click#post(HEAP,x,y,s,click(HEAP,x,y,s)));

// Prototype
// --------------------------------------------------------------------------------
function click(HEAP : [Ref]Any, x : int, y : int, s : State) returns (State);

// Lambda Reference & Axiom
// --------------------------------------------------------------------------------
const unique click#lambda : Lambda;
axiom (forall HEAP:[Ref]Any :: State#is(Lambda#return(click#lambda,0),HEAP));

// Implementation
// --------------------------------------------------------------------------------
procedure click#impl(HEAP : [Ref]Any, x : int, y : int, s : State) returns (r : State);
requires State#is(Record#box(s),HEAP);
requires Context#Level > 1;
ensures State#is(Record#box(r),HEAP);
ensures (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> (0 <= (a + (b * Int#unbox(s[$width])))));
ensures (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> ((a + (b * Int#unbox(s[$width]))) < Array#Length(Array#unbox(r[$cells]))));
ensures (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> (0 <= (a + (b * Int#unbox(s[$width])))));
ensures (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> ((a + (b * Int#unbox(s[$width]))) < Array#Length(Array#unbox(s[$cells]))));
ensures ((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> (0 <= (x + (y * Int#unbox(s[$width]))));
ensures ((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> ((x + (y * Int#unbox(s[$width]))) < Array#Length(Array#unbox(r[$cells])));
ensures ((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> (0 <= (x + (y * Int#unbox(s[$width]))));
ensures ((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> ((x + (y * Int#unbox(s[$width]))) < Array#Length(Array#unbox(s[$cells])));
ensures (Int#unbox(s[$height]) == Int#unbox(r[$height])) && (Int#unbox(s[$width]) == Int#unbox(r[$width]));
ensures (forall a:int,b:int :: ((0 <= a) && (a < Int#unbox(s[$width])) && (0 <= b) && (b < Int#unbox(s[$height]))) ==> ((((a + (b * Int#unbox(s[$width]))) < Array#Length(Array#unbox(r[$cells]))) && ((a != x) || (b != y))) <==> (Bool#unbox(Array#unbox(r[$cells])[a + (b * Int#unbox(s[$width]))]) == Bool#unbox(Array#unbox(s[$cells])[a + (b * Int#unbox(s[$width]))]))));
ensures ((0 <= x) && ((x < Int#unbox(s[$width])) && ((0 <= y) && (y < Int#unbox(s[$height]))))) ==> (Bool#unbox(Array#unbox(r[$cells])[x + (y * Int#unbox(s[$width]))]) == (!Bool#unbox(Array#unbox(s[$cells])[x + (y * Int#unbox(s[$width]))])));
implementation click#impl(HEAP# : [Ref]Any, x# : int, y# : int, s# : State) returns (r : State)
{
   var index : int;
   var HEAP : [Ref]Any;
   var x : int;
   var y : int;
   var s : State;
   HEAP := HEAP#;
   x := x#;
   y := y#;
   s := s#;
   if((x >= 0) && ((y >= 0) && ((x < Int#unbox(s[$width])) && (y < Int#unbox(s[$height]))))) {
      index := x + (y * Int#unbox(s[$width]));
      assert 0 <= index;
      assert index < Array#Length(Array#unbox(s[$cells]));
      assert 0 <= index;
      assert index < Array#Length(Array#unbox(s[$cells]));
      s := s[$cells:=Array#box(Array#unbox(s[$cells])[index:=Bool#box(!Bool#unbox(Array#unbox(s[$cells])[index]))])];
      assert State#is(Record#box(s),HEAP);
   }
   r := s;
   return;
}

// ================================================================================
// PROPERTY: model::updated_cell
// ================================================================================
function updated_cell(HEAP : [Ref]Any, index : int, s : State, out : bool) returns (bool) {
   (0 <= index) && ((index < Array#Length(Array#unbox(s[$cells]))) && (out <==> ((Int#box(count_living(HEAP,index,s)) == Int#box(3)) || (Bool#unbox(Array#unbox(s[$cells])[index]) && (Int#box(count_living(HEAP,index,s)) == Int#box(2))))))
}

// ================================================================================
// FUNCTION: model::update : function(State)->(State)
// ================================================================================

// Precondition Check
// --------------------------------------------------------------------------------
function update#pre(HEAP : [Ref]Any, state : State) returns (bool) {
   State#is(Record#box(state),HEAP)
}

// Postcondition Check
// --------------------------------------------------------------------------------
function update#post(HEAP : [Ref]Any, state : State, r : State) returns (bool) {
   State#is(Record#box(r),HEAP) && (forall j:int :: ((0 <= j) && (j < Array#Length(Array#unbox(r[$cells])))) ==> (0 <= j)) && (forall j:int :: ((0 <= j) && (j < Array#Length(Array#unbox(r[$cells])))) ==> (j < Array#Length(Array#unbox(r[$cells])))) && (forall j:int :: ((0 <= j) && (j < Array#Length(Array#unbox(r[$cells])))) ==> updated_cell(HEAP,j,state,Bool#unbox(Array#unbox(r[$cells])[j]))) && ((Int#unbox(state[$width]) == Int#unbox(r[$width])) && (Int#unbox(state[$height]) == Int#unbox(r[$height])))
}

// Postcondition Axiom
// --------------------------------------------------------------------------------
axiom (Context#Level > 1) ==> (forall HEAP:[Ref]Any,state:State :: update#pre(HEAP,state) ==> update#post(HEAP,state,update(HEAP,state)));

// Prototype
// --------------------------------------------------------------------------------
function update(HEAP : [Ref]Any, state : State) returns (State);

// Lambda Reference & Axiom
// --------------------------------------------------------------------------------
const unique update#lambda : Lambda;
axiom (forall HEAP:[Ref]Any :: State#is(Lambda#return(update#lambda,0),HEAP));

// Implementation
// --------------------------------------------------------------------------------
procedure update#impl(HEAP : [Ref]Any, state : State) returns (r : State);
requires State#is(Record#box(state),HEAP);
requires Context#Level > 1;
ensures State#is(Record#box(r),HEAP);
ensures (forall j:int :: ((0 <= j) && (j < Array#Length(Array#unbox(r[$cells])))) ==> (0 <= j));
ensures (forall j:int :: ((0 <= j) && (j < Array#Length(Array#unbox(r[$cells])))) ==> (j < Array#Length(Array#unbox(r[$cells]))));
ensures (forall j:int :: ((0 <= j) && (j < Array#Length(Array#unbox(r[$cells])))) ==> updated_cell(HEAP,j,state,Bool#unbox(Array#unbox(r[$cells])[j])));
ensures (Int#unbox(state[$width]) == Int#unbox(r[$width])) && (Int#unbox(state[$height]) == Int#unbox(r[$height]));
implementation update#impl(HEAP# : [Ref]Any, state# : State) returns (r : State)
{
   var ncells : [int]Any;
   var i : int;
   var x : int;
   var y : int;
   var HEAP : [Ref]Any;
   var state : State;
   HEAP := HEAP#;
   state := state#;
   ncells := Array#unbox(state[$cells]);
   assert (forall i#2:int :: (Array#in(ncells,i#2) ==> Bool#is(ncells[i#2])) && ((!Array#in(ncells,i#2)) ==> (ncells[i#2] == Void)));
   y := 0;
   while(y < Int#unbox(state[$height]))
   invariant (forall i#5:int :: (Array#in(ncells,i#5) ==> Bool#is(ncells[i#5])) && ((!Array#in(ncells,i#5)) ==> (ncells[i#5] == Void)));
   invariant (forall j:int :: ((0 <= j) && (j < (y * Int#unbox(state[$width])))) ==> ((j < Array#Length(ncells)) ==> ((j >= 0) ==> (0 <= j))));
   invariant (forall j:int :: ((0 <= j) && (j < (y * Int#unbox(state[$width])))) ==> ((j < Array#Length(ncells)) ==> ((j >= 0) ==> (j < Array#Length(ncells)))));
   invariant (forall j:int :: ((0 <= j) && (j < (y * Int#unbox(state[$width])))) ==> ((j < Array#Length(ncells)) ==> ((j >= 0) ==> update_cell#pre(HEAP,j,state))));
   invariant (0 <= y) && (y <= Int#unbox(state[$height]));
   invariant Array#Length(ncells) == Array#Length(Array#unbox(state[$cells]));
   invariant (forall j:int :: ((0 <= j) && (j < (y * Int#unbox(state[$width])))) ==> ((j < Array#Length(ncells)) && ((j >= 0) && (Bool#unbox(ncells[j]) == update_cell(HEAP,j,state)))));
   {
      x := 0;
      while(x < Int#unbox(state[$width]))
      invariant (forall i#4:int :: (Array#in(ncells,i#4) ==> Bool#is(ncells[i#4])) && ((!Array#in(ncells,i#4)) ==> (ncells[i#4] == Void)));
      invariant (forall j:int :: ((0 <= j) && (j < (x + (y * Int#unbox(state[$width]))))) ==> ((j < Array#Length(ncells)) ==> ((j >= 0) ==> (0 <= j))));
      invariant (forall j:int :: ((0 <= j) && (j < (x + (y * Int#unbox(state[$width]))))) ==> ((j < Array#Length(ncells)) ==> ((j >= 0) ==> (j < Array#Length(ncells)))));
      invariant (forall j:int :: ((0 <= j) && (j < (x + (y * Int#unbox(state[$width]))))) ==> ((j < Array#Length(ncells)) ==> ((j >= 0) ==> update_cell#pre(HEAP,j,state))));
      invariant (0 <= x) && (x <= Int#unbox(state[$width]));
      invariant Array#Length(ncells) == Array#Length(Array#unbox(state[$cells]));
      invariant (forall j:int :: ((0 <= j) && (j < (x + (y * Int#unbox(state[$width]))))) ==> ((j < Array#Length(ncells)) && ((j >= 0) && (Bool#unbox(ncells[j]) == update_cell(HEAP,j,state)))));
      {
         i := x + (y * Int#unbox(state[$width]));
         assert 0 <= i;
         assert i < Array#Length(ncells);
         assert update_cell#pre(HEAP,i,state);
         ncells := ncells[i:=Bool#box(update_cell(HEAP,i,state))];
         assert (forall i#3:int :: (Array#in(ncells,i#3) ==> Bool#is(ncells[i#3])) && ((!Array#in(ncells,i#3)) ==> (ncells[i#3] == Void)));
         x := x + 1;
      }
      y := y + 1;
   }
   state := state[$cells:=Array#box(ncells)];
   assert State#is(Record#box(state),HEAP);
   r := state;
   return;
}

// ================================================================================
// FUNCTION: model::update_cell : function(int,State)->(bool)
// ================================================================================

// Precondition Check
// --------------------------------------------------------------------------------
function update_cell#pre(HEAP : [Ref]Any, index : int, state : State) returns (bool) {
   State#is(Record#box(state),HEAP) && ((index >= 0) && (index < Array#Length(Array#unbox(state[$cells]))))
}

// Postcondition Check
// --------------------------------------------------------------------------------
function update_cell#post(HEAP : [Ref]Any, index : int, state : State, out : bool) returns (bool) {
   updated_cell(HEAP,index,state,out)
}

// Postcondition Axiom
// --------------------------------------------------------------------------------
axiom (Context#Level > 1) ==> (forall HEAP:[Ref]Any,index:int,state:State :: update_cell#pre(HEAP,index,state) ==> update_cell#post(HEAP,index,state,update_cell(HEAP,index,state)));

// Prototype
// --------------------------------------------------------------------------------
function update_cell(HEAP : [Ref]Any, index : int, state : State) returns (bool);

// Lambda Reference & Axiom
// --------------------------------------------------------------------------------
const unique update_cell#lambda : Lambda;
axiom (forall HEAP:[Ref]Any :: Bool#is(Lambda#return(update_cell#lambda,0)));

// Implementation
// --------------------------------------------------------------------------------
procedure update_cell#impl(HEAP : [Ref]Any, index : int, state : State) returns (out : bool);
requires State#is(Record#box(state),HEAP);
requires (index >= 0) && (index < Array#Length(Array#unbox(state[$cells])));
requires Context#Level > 1;
ensures updated_cell(HEAP,index,state,out);
implementation update_cell#impl(HEAP# : [Ref]Any, index# : int, state# : State) returns (out : bool)
{
   var count : uint;
   var HEAP : [Ref]Any;
   var index : int;
   var state : State;
   HEAP := HEAP#;
   index := index#;
   state := state#;
   assert uint#is(Int#box(index),HEAP);
   assert count_living#pre(HEAP,index,state);
   count := count_living(HEAP,index,state);
   assert uint#is(Int#box(count),HEAP);
   assert 0 <= index;
   assert index < Array#Length(Array#unbox(state[$cells]));
   if(Bool#unbox(Array#unbox(state[$cells])[index])) {
      goto SWITCH_9420_0, SWITCH_9420_1, SWITCH_9420_2, SWITCH_9420_DEFAULT;
      SWITCH_9420_0:
      assume (count == 0) || (count == 1);
      out := false;
      return;
      goto SWITCH_9420_BREAK;
      SWITCH_9420_1:
      assume (count == 2) || (count == 3);
      out := true;
      return;
      goto SWITCH_9420_BREAK;
      SWITCH_9420_2:
      assume (count == 4) || (count == 5) || (count == 6) || (count == 7) || (count == 8);
      out := false;
      return;
      goto SWITCH_9420_BREAK;
      SWITCH_9420_DEFAULT:
      assume (count != 0) && (count != 1) && (count != 2) && (count != 3) && (count != 4) && (count != 5) && (count != 6) && (count != 7) && (count != 8);
      goto SWITCH_9420_BREAK;
      SWITCH_9420_BREAK:
   } else {
      if(Int#box(count) == Int#box(3)) {
         out := true;
         return;
      }
   }
   out := false;
   return;
}

// ================================================================================
// FUNCTION: model::count_living : function(uint,State)->(uint)
// ================================================================================

// Precondition Check
// --------------------------------------------------------------------------------
function count_living#pre(HEAP : [Ref]Any, index : uint, state : State) returns (bool) {
   uint#is(Int#box(index),HEAP) && State#is(Record#box(state),HEAP) && (index < Array#Length(Array#unbox(state[$cells])))
}

// Postcondition Check
// --------------------------------------------------------------------------------
function count_living#post(HEAP : [Ref]Any, index : uint, state : State, r : uint) returns (bool) {
   uint#is(Int#box(r),HEAP) && (r <= 8)
}

// Postcondition Axiom
// --------------------------------------------------------------------------------
axiom (Context#Level > 1) ==> (forall HEAP:[Ref]Any,index:uint,state:State :: count_living#pre(HEAP,index,state) ==> count_living#post(HEAP,index,state,count_living(HEAP,index,state)));

// Prototype
// --------------------------------------------------------------------------------
function count_living(HEAP : [Ref]Any, index : uint, state : State) returns (uint);

// Lambda Reference & Axiom
// --------------------------------------------------------------------------------
const unique count_living#lambda : Lambda;
axiom (forall HEAP:[Ref]Any :: uint#is(Lambda#return(count_living#lambda,0),HEAP));

// Implementation
// --------------------------------------------------------------------------------
procedure count_living#impl(HEAP : [Ref]Any, index : uint, state : State) returns (r : uint);
requires uint#is(Int#box(index),HEAP);
requires State#is(Record#box(state),HEAP);
requires index < Array#Length(Array#unbox(state[$cells]));
requires Context#Level > 1;
ensures uint#is(Int#box(r),HEAP);
ensures r <= 8;
implementation count_living#impl(HEAP# : [Ref]Any, index# : uint, state# : State) returns (r : uint)
{
   var x : int;
   var y : int;
   var count : uint;
   var HEAP : [Ref]Any;
   var index : uint;
   var state : State;
   HEAP := HEAP#;
   index := index#;
   state := state#;
   assert Int#unbox(state[$width]) != 0;
   x := index mod Int#unbox(state[$width]);
   assert Int#unbox(state[$width]) != 0;
   y := index div Int#unbox(state[$width]);
   assert alive#pre(HEAP,x - 1,y - 1,state);
   count := alive(HEAP,x - 1,y - 1,state);
   assert uint#is(Int#box(count),HEAP);
   assert alive#pre(HEAP,x - 1,y,state);
   count := count + alive(HEAP,x - 1,y,state);
   assert uint#is(Int#box(count),HEAP);
   assert alive#pre(HEAP,x - 1,y + 1,state);
   count := count + alive(HEAP,x - 1,y + 1,state);
   assert uint#is(Int#box(count),HEAP);
   assert alive#pre(HEAP,x,y - 1,state);
   count := count + alive(HEAP,x,y - 1,state);
   assert uint#is(Int#box(count),HEAP);
   assert alive#pre(HEAP,x,y + 1,state);
   count := count + alive(HEAP,x,y + 1,state);
   assert uint#is(Int#box(count),HEAP);
   assert alive#pre(HEAP,x + 1,y - 1,state);
   count := count + alive(HEAP,x + 1,y - 1,state);
   assert uint#is(Int#box(count),HEAP);
   assert alive#pre(HEAP,x + 1,y,state);
   count := count + alive(HEAP,x + 1,y,state);
   assert uint#is(Int#box(count),HEAP);
   assert alive#pre(HEAP,x + 1,y + 1,state);
   count := count + alive(HEAP,x + 1,y + 1,state);
   assert uint#is(Int#box(count),HEAP);
   r := count;
   return;
}

// ================================================================================
// FUNCTION: model::alive : function(int,int,State)->(uint)
// ================================================================================

// Precondition Check
// --------------------------------------------------------------------------------
function alive#pre(HEAP : [Ref]Any, x : int, y : int, state : State) returns (bool) {
   State#is(Record#box(state),HEAP)
}

// Postcondition Check
// --------------------------------------------------------------------------------
function alive#post(HEAP : [Ref]Any, x : int, y : int, state : State, r : uint) returns (bool) {
   uint#is(Int#box(r),HEAP) && ((x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(state[$cells])))) ==> ((i == (x + (y * Int#unbox(state[$width])))) ==> (0 <= i))))))) && ((x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(state[$cells])))) ==> ((i == (x + (y * Int#unbox(state[$width])))) ==> (i < Array#Length(Array#unbox(state[$cells]))))))))) && ((Int#box(r) == Int#box(0)) || (Int#box(r) == Int#box(1))) && ((Int#box(r) == Int#box(0)) <==> ((x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (exists i:int :: (0 <= i) && (i < Array#Length(Array#unbox(state[$cells]))) && ((i == (x + (y * Int#unbox(state[$width])))) && (!Bool#unbox(Array#unbox(state[$cells])[i])))))))))
}

// Postcondition Axiom
// --------------------------------------------------------------------------------
axiom (Context#Level > 1) ==> (forall HEAP:[Ref]Any,x:int,y:int,state:State :: alive#pre(HEAP,x,y,state) ==> alive#post(HEAP,x,y,state,alive(HEAP,x,y,state)));

// Prototype
// --------------------------------------------------------------------------------
function alive(HEAP : [Ref]Any, x : int, y : int, state : State) returns (uint);

// Lambda Reference & Axiom
// --------------------------------------------------------------------------------
const unique alive#lambda : Lambda;
axiom (forall HEAP:[Ref]Any :: uint#is(Lambda#return(alive#lambda,0),HEAP));

// Implementation
// --------------------------------------------------------------------------------
procedure alive#impl(HEAP : [Ref]Any, x : int, y : int, state : State) returns (r : uint);
requires State#is(Record#box(state),HEAP);
requires Context#Level > 1;
ensures uint#is(Int#box(r),HEAP);
ensures (x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(state[$cells])))) ==> ((i == (x + (y * Int#unbox(state[$width])))) ==> (0 <= i))))));
ensures (x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (forall i:int :: ((0 <= i) && (i < Array#Length(Array#unbox(state[$cells])))) ==> ((i == (x + (y * Int#unbox(state[$width])))) ==> (i < Array#Length(Array#unbox(state[$cells]))))))));
ensures (Int#box(r) == Int#box(0)) || (Int#box(r) == Int#box(1));
ensures (Int#box(r) == Int#box(0)) <==> ((x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (exists i:int :: (0 <= i) && (i < Array#Length(Array#unbox(state[$cells]))) && ((i == (x + (y * Int#unbox(state[$width])))) && (!Bool#unbox(Array#unbox(state[$cells])[i]))))))));
implementation alive#impl(HEAP# : [Ref]Any, x# : int, y# : int, state# : State) returns (r : uint)
{
   var HEAP : [Ref]Any;
   var x : int;
   var y : int;
   var state : State;
   HEAP := HEAP#;
   x := x#;
   y := y#;
   state := state#;
   assert (x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (0 <= (x + (y * Int#unbox(state[$width])))))));
   assert (x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || ((x + (y * Int#unbox(state[$width]))) < Array#Length(Array#unbox(state[$cells]))))));
   if((x < 0) || ((x >= Int#unbox(state[$width])) || ((y < 0) || ((y >= Int#unbox(state[$height])) || (!Bool#unbox(Array#unbox(state[$cells])[x + (y * Int#unbox(state[$width]))])))))) {
      r := 0;
      return;
   } else {
      r := 1;
      return;
   }
}

// ================================================================================
// TYPE: std::integer::uint : int
// ================================================================================
type uint = int;
function uint#inv(x : int, HEAP : [Ref]Any) returns (bool) {
   x >= 0
}
function uint#is(x : Any, HEAP : [Ref]Any) returns (bool) {
   Int#is(x) && uint#inv(Int#unbox(x),HEAP)
}
