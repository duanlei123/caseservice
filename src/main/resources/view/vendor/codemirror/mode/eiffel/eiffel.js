!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("eiffel",function(){function e(e){for(var t={},r=0,n=e.length;r<n;++r)t[e[r]]=!0;return t}function t(e,t,r){return r.tokenize.push(e),e(t,r)}function r(e,r){if(i=null,e.eatSpace())return null;var o=e.next();return'"'==o||"'"==o?t(n(o,"string"),e,r):"-"==o&&e.eat("-")?(e.skipToEnd(),"comment"):":"==o&&e.eat("=")?"operator":/[0-9]/.test(o)?(e.eatWhile(/[xXbBCc0-9\.]/),e.eat(/[\?\!]/),"ident"):/[a-zA-Z_0-9]/.test(o)?(e.eatWhile(/[a-zA-Z_0-9]/),e.eat(/[\?\!]/),"ident"):/[=+\-\/*^%<>~]/.test(o)?(e.eatWhile(/[=+\-\/*^%<>~]/),"operator"):null}function n(e,t,r){return function(n,i){for(var o,a=!1;null!=(o=n.next());){if(o==e&&(r||!a)){i.tokenize.pop();break}a=!a&&"%"==o}return t}}var i,o=e(["note","across","when","variant","until","unique","undefine","then","strip","select","retry","rescue","require","rename","reference","redefine","prefix","once","old","obsolete","loop","local","like","is","inspect","infix","include","if","frozen","from","external","export","ensure","end","elseif","else","do","creation","create","check","alias","agent","separate","invariant","inherit","indexing","feature","expanded","deferred","class","Void","True","Result","Precursor","False","Current","create","attached","detachable","as","and","implies","not","or"]),a=e([":=","and then","and","or","<<",">>"]);return{startState:function(){return{tokenize:[r]}},token:function(e,t){var r=t.tokenize[t.tokenize.length-1](e,t);if("ident"==r){var n=e.current();r=o.propertyIsEnumerable(e.current())?"keyword":a.propertyIsEnumerable(e.current())?"operator":/^[A-Z][A-Z_0-9]*$/g.test(n)?"tag":/^0[bB][0-1]+$/g.test(n)?"number":/^0[cC][0-7]+$/g.test(n)?"number":/^0[xX][a-fA-F0-9]+$/g.test(n)?"number":/^([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)$/g.test(n)?"number":/^[0-9]+$/g.test(n)?"number":"variable"}return r},lineComment:"--"}}),CodeMirror.defineMIME("text/x-eiffel","eiffel")});