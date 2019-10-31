'use strict';
function w3c$app$run(app, root, document) {
   let state = new Wy.Ref(app);
   let init = state.$ref.view(state.$ref.model);
   let r = w3c$app$construct$Q4html4NodeqQ3AppQ3dom7ElementQ3dom8Document(Wy.copy(init), state, root, document);
   root.appendChild(r);
}
function w3c$app$refresh$qQ3AppQ3dom7ElementQ3dom8Document(state, root, document) {
   let init = state.$ref.view(state.$ref.model);
   let r = w3c$app$construct$Q4html4NodeqQ3AppQ3dom7ElementQ3dom8Document(Wy.copy(init), state, root, document);
   root.replaceChild(r, root.firstChild);
}
function w3c$app$construct$Q4html4NodeqQ3AppQ3dom7ElementQ3dom8Document(node, state, root, document) {
   if(is$Q4html4NodeaQ4char(node))  {
      return document.createTextNode(js$util$from_string(Wy.copy(node)));
   } else  {
      let r = document.createElement(js$util$from_string(Wy.copy(node.name)));
      let i = 0;
      while(i < node.attributes.length)  {
         let attr = Wy.copy(node.attributes[i]);
         if(is$Q9Attributer2Q7tagName3keyQ5ascii6string5value(attr))  {
            r.setAttribute(js$util$from_string(Wy.copy(attr.key)), js$util$from_string(Wy.copy(attr.value)));
         } else  {
            if(is$u3r2Q7tagName5eventQ7handler7handlerr2Q7tagName10mouseEventQ7handler7handlerr2Q7tagName8keyEventQ7handler7handlerr2Q7tagName10mouseEventQ7handler7handler(attr))  {
               let key = js$util$from_string(Wy.copy(attr.mouseEvent));
               r.addEventListener(key, function(attr, state, root, document) {
                  return function(e) {
                     return w3c$app$mouseEvent$Q3dom10MouseEventf2Q4html10MouseEventv1T1v1TqQ3AppQ3dom7ElementQ3dom8Document(e, attr.handler, state, root, document);
                  };
               }(attr, state, root, document));
            } else  {
               if(is$u2r2Q7tagName5eventQ7handler7handlerr2Q7tagName8keyEventQ7handler7handlerr2Q7tagName8keyEventQ7handler7handler(attr))  {
                  let key = js$util$from_string(Wy.copy(attr.keyEvent));
                  r.addEventListener(key, function(attr, state, root, document) {
                     return function(e) {
                        return w3c$app$keyEvent$Q3dom13KeyboardEventQ4html7handlerqQ3AppQ3dom7ElementQ3dom8Document(e, attr.handler, state, root, document);
                     };
                  }(attr, state, root, document));
               } else  {
                  r.addEventListener(js$util$from_string(Wy.copy(attr.event)), function(attr, state, root, document) {
                     return function(e) {
                        return w3c$app$event$Q3dom5Eventf2Q4html5Eventv1T1v1TqQ3AppQ3dom7ElementQ3dom8Document(e, attr.handler, state, root, document);
                     };
                  }(attr, state, root, document));
               }
            }
         }
         i = i + 1;
      }
      i = 0;
      while(i < node.children.length)  {
         r.appendChild(w3c$app$construct$Q4html4NodeqQ3AppQ3dom7ElementQ3dom8Document(Wy.copy(node.children[i]), state, root, document));
         i = i + 1;
      }
      return r;
   }
}
function w3c$app$event$Q3dom5Eventf2Q4html5Eventv1T1v1TqQ3AppQ3dom7ElementQ3dom8Document(event, handler, state, root, document) {
   let e = w3c$app$to_event$Q3dom5Event(event);
   state.$ref.model = handler(Wy.copy(e), state.$ref.model);
   w3c$app$refresh$qQ3AppQ3dom7ElementQ3dom8Document(state, root, document);
}
function w3c$app$mouseEvent$Q3dom10MouseEventf2Q4html10MouseEventv1T1v1TqQ3AppQ3dom7ElementQ3dom8Document(event, handler, state, root, document) {
   let e = w3c$app$to_mouse_event$Q3dom10MouseEvent(event);
   state.$ref.model = handler(Wy.copy(e), state.$ref.model);
   w3c$app$refresh$qQ3AppQ3dom7ElementQ3dom8Document(state, root, document);
}
function w3c$app$keyEvent$Q3dom13KeyboardEventQ4html7handlerqQ3AppQ3dom7ElementQ3dom8Document(event, handler, state, root, document) {
   let e = w3c$app$to_key_event$Q3dom13KeyboardEvent(event);
   state.$ref.model = handler(Wy.copy(e), state.$ref.model);
   w3c$app$refresh$qQ3AppQ3dom7ElementQ3dom8Document(state, root, document);
}
function w3c$app$to_event$Q3dom5Event(event) {
   return new Wy.Record({timeStamp: event.timeStamp});
}
function w3c$app$to_mouse_event$Q3dom10MouseEvent(event) {
   return new Wy.Record({altKey: event.altKey, button: event.button, buttons: event.buttons, clientX: event.clientX, clientY: event.clientY, ctrlKey: event.ctrlKey, metaKey: event.metaKey, movementX: event.movementX, movementY: event.movementY, offsetX: event.offsetX, offsetY: event.offsetY, pageX: event.pageX, pageY: event.pageY, region: event.region, screenX: event.screenX, screenY: event.screenY, shiftKey: event.shiftKey});
}
function w3c$app$to_key_event$Q3dom13KeyboardEvent(event) {
   return new Wy.Record({altKey: event.altKey, code: js$util$to_string(event.code), ctrlKey: event.ctrlKey, isComposing: event.isComposing, key: js$util$to_string(event.key), keyCode: event.keyCode, location: event.location, metaKey: event.metaKey, repeat: event.repeat, shiftKey: event.shiftKey});
}
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
function w3c$html$is_letter$Q5ascii4char(c) {
   return ((97 <= c) && (c <= 122)) || ((65 <= c) && (c <= 90));
}
function w3c$html$is_digit$Q5ascii4char(c) {
   return (48 <= c) && (c <= 57);
}
function w3c$html$tagChar$type(x) {
   return w3c$html$is_letter$Q5ascii4char(x) || w3c$html$is_digit$Q5ascii4char(x);
}
function w3c$html$class$Q5ascii6string(text) {
   return new Wy.Record({key: Wy.toString("class"), value: Wy.copy(text)});
}
function w3c$html$id$Q5ascii6string(text) {
   return new Wy.Record({key: Wy.toString("id"), value: Wy.copy(text)});
}
function w3c$html$name$Q5ascii6string(text) {
   return new Wy.Record({key: Wy.toString("name"), value: Wy.copy(text)});
}
function w3c$html$style$Q5ascii6string(text) {
   return new Wy.Record({key: Wy.toString("style"), value: Wy.copy(text)});
}
function w3c$html$tabindex$I(index) {
   return new Wy.Record({key: Wy.toString("tabindex"), value: std$ascii$to_string$I(index)});
}
function w3c$html$change$Q7handler(handler) {
   return new Wy.Record({mouseEvent: Wy.toString("change"), handler: handler});
}
function w3c$html$click$Q7handler(handler) {
   return new Wy.Record({mouseEvent: Wy.toString("click"), handler: handler});
}
function w3c$html$focus$Q7handler(handler) {
   return new Wy.Record({event: Wy.toString("focus"), handler: handler});
}
function w3c$html$keydown$Q7handler(handler) {
   return new Wy.Record({keyEvent: Wy.toString("keydown"), handler: handler});
}
function w3c$html$keypress$Q7handler(handler) {
   return new Wy.Record({keyEvent: Wy.toString("keypress"), handler: handler});
}
function w3c$html$keyup$Q7handler(handler) {
   return new Wy.Record({keyEvent: Wy.toString("keyup"), handler: handler});
}
function w3c$html$mousedown$Q7handler(handler) {
   return new Wy.Record({mouseEvent: Wy.toString("mousedown"), handler: handler});
}
function w3c$html$mousemove$Q7handler(handler) {
   return new Wy.Record({mouseEvent: Wy.toString("mousemove"), handler: handler});
}
function w3c$html$mouseover$Q7handler(handler) {
   return new Wy.Record({mouseEvent: Wy.toString("mouseover"), handler: handler});
}
function w3c$html$element$Q5ascii6stringQ4Node(tag, child) {
   return w3c$html$element$Q5ascii6stringaQ9AttributeaQ4Node(Wy.copy(tag), Wy.array(w3c$html$id$Q5ascii6string(Wy.toString("")), 0), [Wy.copy(child)]);
}
function w3c$html$element$Q5ascii6stringaQ4Node(tag, children) {
   return w3c$html$element$Q5ascii6stringaQ9AttributeaQ4Node(Wy.copy(tag), Wy.array(w3c$html$id$Q5ascii6string(Wy.toString("")), 0), Wy.copy(children));
}
function w3c$html$element$Q5ascii6stringaQ9AttributeQ4Node(tag, attributes, child) {
   return w3c$html$element$Q5ascii6stringaQ9AttributeaQ4Node(Wy.copy(tag), Wy.copy(attributes), [Wy.copy(child)]);
}
function w3c$html$element$Q5ascii6stringaQ9AttributeaQ4Node(tag, attributes, children) {
   return new Wy.Record({name: Wy.copy(tag), attributes: Wy.copy(attributes), children: Wy.copy(children)});
}
function is$u2r2Q7tagName5eventQ7handler7handlerr2Q7tagName8keyEventQ7handler7handlerr2Q7tagName8keyEventQ7handler7handler(v) {
   if(((typeof v.keyEvent) === "undefined") || (!is$u1Q7tagNameaQ7tagChar(v.keyEvent)))  {
      return false;
   } else if(((typeof v.handler) === "undefined") || (!is$u2Q7handlerQ7handlerf2Q13KeyboardEventv1T1v1T(v.handler)))  {
      return false;
   }
   return true;
}
function is$Q4html4NodeaQ4char(v) {
   return v.constructor === Array;
}
function is$Q9Attributer2Q7tagName3keyQ5ascii6string5value(v) {
   if(((typeof v.key) === "undefined") || (!is$u1Q7tagNameaQ7tagChar(v.key)))  {
      return false;
   } else if(((typeof v.value) === "undefined") || (!is$u1Q5ascii6stringaQ4char(v.value)))  {
      return false;
   }
   return true;
}
function is$u3r2Q7tagName5eventQ7handler7handlerr2Q7tagName10mouseEventQ7handler7handlerr2Q7tagName8keyEventQ7handler7handlerr2Q7tagName10mouseEventQ7handler7handler(v) {
   if(((typeof v.mouseEvent) === "undefined") || (!is$u1Q7tagNameaQ7tagChar(v.mouseEvent)))  {
      return false;
   } else if(((typeof v.handler) === "undefined") || (!is$u3Q7handlerQ7handlerQ7handlerf2Q10MouseEventv1T1v1T(v.handler)))  {
      return false;
   }
   return true;
}
function is$u2Q7handlerQ7handlerf2Q13KeyboardEventv1T1v1T(v) {
   return true;
}
function is$u3Q7handlerQ7handlerQ7handlerf2Q10MouseEventv1T1v1T(v) {
   return true;
}
function is$u1Q7tagNameaQ7tagChar(v) {
   return true;
}
function is$u1Q5ascii6stringaQ4char(v) {
   return true;
}
/**
 * Perform an HTTP request to a given URL.  Upon receipt of a
 * response, the handler is notified.
 */
function w3c$ajax$makeHttpRequest(method, url,handler) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if (this.readyState == 4) {
	    handler(this.status,this.responseText);
	}
    };
    xhttp.open(method, url, true);
    xhttp.send();
}
function w3c$dom$alert(wyString) {
    alert(js$util$from_string(wyString));
}
