!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("z80",function(){var e=/^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i,t=/^(call|j[pr]|ret[in]?)\b/i,r=/^b_?(call|jump)\b/i,n=/^(af?|bc?|c|de?|e|hl?|l|i[xy]?|r|sp)\b/i,i=/^(n?[zc]|p[oe]?|m)\b/i,o=/^([hl][xy]|i[xy][hl]|slia|sll)\b/i,l=/^([\da-f]+h|[0-7]+o|[01]+b|\d+)\b/i;return{startState:function(){return{context:0}},token:function(f,u){if(f.column()||(u.context=0),f.eatSpace())return null;var c;if(f.eatWhile(/\w/)){if(c=f.current(),!f.indentation())return l.test(c)?"number":null;if(1==u.context&&n.test(c))return"variable-2";if(2==u.context&&i.test(c))return"variable-3";if(e.test(c))return u.context=1,"keyword";if(t.test(c))return u.context=2,"keyword";if(r.test(c))return u.context=3,"keyword";if(o.test(c))return"error"}else{if(f.eat(";"))return f.skipToEnd(),"comment";if(f.eat('"')){for(;(c=f.next())&&'"'!=c;)"\\"==c&&f.next();return"string"}if(f.eat("'")){if(f.match(/\\?.'/))return"number"}else if(f.eat(".")||f.sol()&&f.eat("#")){if(u.context=4,f.eatWhile(/\w/))return"def"}else if(f.eat("$")){if(f.eatWhile(/[\da-f]/i))return"number"}else if(f.eat("%")){if(f.eatWhile(/[01]/))return"number"}else f.next()}return null}}}),CodeMirror.defineMIME("text/x-z80","z80")});