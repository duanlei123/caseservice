!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../javascript/javascript")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../javascript/javascript"],e):e(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("pegjs",function(e){function t(e){return e.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)}var n=CodeMirror.getMode(e,"javascript");return{startState:function(){return{inString:!1,stringType:null,inComment:!1,inChracterClass:!1,braced:0,lhs:!0,localState:null}},token:function(e,r){if(e&&(r.inString||r.inComment||'"'!=e.peek()&&"'"!=e.peek()||(r.stringType=e.peek(),e.next(),r.inString=!0)),r.inString||r.inComment||!e.match(/^\/\*/)||(r.inComment=!0),r.inString){for(;r.inString&&!e.eol();)e.peek()===r.stringType?(e.next(),r.inString=!1):"\\"===e.peek()?(e.next(),e.next()):e.match(/^.[^\\\"\']*/);return r.lhs?"property string":"string"}if(r.inComment){for(;r.inComment&&!e.eol();)e.match(/\*\//)?r.inComment=!1:e.match(/^.[^\*]*/);return"comment"}if(r.inChracterClass)for(;r.inChracterClass&&!e.eol();)e.match(/^[^\]\\]+/)||e.match(/^\\./)||(r.inChracterClass=!1);else{if("["===e.peek())return e.next(),r.inChracterClass=!0,"bracket";if(e.match(/^\/\//))return e.skipToEnd(),"comment";if(r.braced||"{"===e.peek()){null===r.localState&&(r.localState=n.startState());var i=n.token(e,r.localState),a=e.current();if(!i)for(var o=0;o<a.length;o++)"{"===a[o]?r.braced++:"}"===a[o]&&r.braced--;return i}if(t(e))return":"===e.peek()?"variable":"variable-2";if(["[","]","(",")"].indexOf(e.peek())!=-1)return e.next(),"bracket";e.eatSpace()||e.next()}return null}}},"javascript")});