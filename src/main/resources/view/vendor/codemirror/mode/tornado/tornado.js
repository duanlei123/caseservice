!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../../addon/mode/overlay")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed","../../addon/mode/overlay"],e):e(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("tornado:inner",function(){function e(e,n){e.eatWhile(/[^\{]/);var o=e.next();if("{"==o&&(o=e.eat(/\{|%|#/)))return n.tokenize=t(o),"tag"}function t(t){return"{"==t&&(t="}"),function(o,r){var i=o.next();return i==t&&o.eat("}")?(r.tokenize=e,"tag"):o.match(n)?"keyword":"#"==t?"comment":"string"}}var n=["and","as","assert","autoescape","block","break","class","comment","context","continue","datetime","def","del","elif","else","end","escape","except","exec","extends","false","finally","for","from","global","if","import","in","include","is","json_encode","lambda","length","linkify","load","module","none","not","or","pass","print","put","raise","raw","return","self","set","squeeze","super","true","try","url_escape","while","with","without","xhtml_escape","yield"];return n=new RegExp("^(("+n.join(")|(")+"))\\b"),{startState:function(){return{tokenize:e}},token:function(e,t){return t.tokenize(e,t)}}}),CodeMirror.defineMode("tornado",function(e){var t=CodeMirror.getMode(e,"text/html"),n=CodeMirror.getMode(e,"tornado:inner");return CodeMirror.overlayMode(t,n)}),CodeMirror.defineMIME("text/x-tornado","tornado")});