!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../ruby/ruby")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed","../ruby/ruby"],e):e(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("haml",function(e){function t(e){return function(t,r){var o=t.peek();return o==e&&1==r.rubyState.tokenize.length?(t.next(),r.tokenize=i,"closeAttributeTag"):n(t,r)}}function n(e,t){return e.match("-#")?(e.skipToEnd(),"comment"):o.token(e,t.rubyState)}function i(e,i){var o=e.peek();if("comment"==i.previousToken.style&&i.indented>i.previousToken.indented)return e.skipToEnd(),"commentLine";if(i.startOfLine){if("!"==o&&e.match("!!"))return e.skipToEnd(),"tag";if(e.match(/^%[\w:#\.]+=/))return i.tokenize=n,"hamlTag";if(e.match(/^%[\w:]+/))return"hamlTag";if("/"==o)return e.skipToEnd(),"comment"}if((i.startOfLine||"hamlTag"==i.previousToken.style)&&("#"==o||"."==o))return e.match(/[\w-#\.]*/),"hamlAttribute";if(i.startOfLine&&!e.match("-->",!1)&&("="==o||"-"==o))return i.tokenize=n,i.tokenize(e,i);if("hamlTag"==i.previousToken.style||"closeAttributeTag"==i.previousToken.style||"hamlAttribute"==i.previousToken.style){if("("==o)return i.tokenize=t(")"),i.tokenize(e,i);if("{"==o)return i.tokenize=t("}"),i.tokenize(e,i)}return r.token(e,i.htmlState)}var r=CodeMirror.getMode(e,{name:"htmlmixed"}),o=CodeMirror.getMode(e,"ruby");return{startState:function(){var e=r.startState(),t=o.startState();return{htmlState:e,rubyState:t,indented:0,previousToken:{style:null,indented:0},tokenize:i}},copyState:function(e){return{htmlState:CodeMirror.copyState(r,e.htmlState),rubyState:CodeMirror.copyState(o,e.rubyState),indented:e.indented,previousToken:e.previousToken,tokenize:e.tokenize}},token:function(e,t){if(e.sol()&&(t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;var r=t.tokenize(e,t);if(t.startOfLine=!1,r&&"commentLine"!=r&&(t.previousToken={style:r,indented:t.indented}),e.eol()&&t.tokenize==n){e.backUp(1);var o=e.peek();e.next(),o&&","!=o&&(t.tokenize=i)}return"hamlTag"==r?r="tag":"commentLine"==r?r="comment":"hamlAttribute"==r?r="attribute":"closeAttributeTag"==r&&(r=null),r}}},"htmlmixed","ruby"),CodeMirror.defineMIME("text/x-haml","haml")});