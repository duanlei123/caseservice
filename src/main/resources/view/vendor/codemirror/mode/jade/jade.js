!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../javascript/javascript"),require("../css/css"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../javascript/javascript","../css/css","../htmlmixed/htmlmixed"],t):t(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("jade",function(t){function e(){this.javaScriptLine=!1,this.javaScriptLineExcludesColon=!1,this.javaScriptArguments=!1,this.javaScriptArgumentsDepth=0,this.isInterpolating=!1,this.interpolationNesting=0,this.jsState=W.startState(),this.restOfLine="",this.isIncludeFiltered=!1,this.isEach=!1,this.lastTag="",this.scriptType="",this.isAttrs=!1,this.attrsNest=[],this.inAttributeName=!0,this.attributeIsType=!1,this.attrValue="",this.indentOf=1/0,this.indentToken="",this.innerMode=null,this.innerState=null,this.innerModeForLine=!1}function n(t,e){if(t.sol()&&(e.javaScriptLine=!1,e.javaScriptLineExcludesColon=!1),e.javaScriptLine){if(e.javaScriptLineExcludesColon&&":"===t.peek())return e.javaScriptLine=!1,void(e.javaScriptLineExcludesColon=!1);var n=W.token(t,e.jsState);return t.eol()&&(e.javaScriptLine=!1),n||!0}}function i(t,e){if(e.javaScriptArguments){if(0===e.javaScriptArgumentsDepth&&"("!==t.peek())return void(e.javaScriptArguments=!1);if("("===t.peek()?e.javaScriptArgumentsDepth++:")"===t.peek()&&e.javaScriptArgumentsDepth--,0===e.javaScriptArgumentsDepth)return void(e.javaScriptArguments=!1);var n=W.token(t,e.jsState);return n||!0}}function r(t){if(t.match(/^yield\b/))return"keyword"}function a(t){if(t.match(/^(?:doctype) *([^\n]+)?/))return K}function s(t,e){if(t.match("#{"))return e.isInterpolating=!0,e.interpolationNesting=0,"punctuation"}function c(t,e){if(e.isInterpolating){if("}"===t.peek()){if(e.interpolationNesting--,e.interpolationNesting<0)return t.next(),e.isInterpolating=!1,"puncutation"}else"{"===t.peek()&&e.interpolationNesting++;return W.token(t,e.jsState)||!0}}function o(t,e){if(t.match(/^case\b/))return e.javaScriptLine=!0,J}function u(t,e){if(t.match(/^when\b/))return e.javaScriptLine=!0,e.javaScriptLineExcludesColon=!0,J}function p(t){if(t.match(/^default\b/))return J}function f(t,e){if(t.match(/^extends?\b/))return e.restOfLine="string",J}function l(t,e){if(t.match(/^append\b/))return e.restOfLine="variable",J}function h(t,e){if(t.match(/^prepend\b/))return e.restOfLine="variable",J}function d(t,e){if(t.match(/^block\b *(?:(prepend|append)\b)?/))return e.restOfLine="variable",J}function m(t,e){if(t.match(/^include\b/))return e.restOfLine="string",J}function v(t,e){if(t.match(/^include:([a-zA-Z0-9\-]+)/,!1)&&t.match("include"))return e.isIncludeFiltered=!0,J}function S(t,e){if(e.isIncludeFiltered){var n=M(t,e);return e.isIncludeFiltered=!1,e.restOfLine="string",n}}function j(t,e){if(t.match(/^mixin\b/))return e.javaScriptLine=!0,J}function g(t,e){return t.match(/^\+([-\w]+)/)?(t.match(/^\( *[-\w]+ *=/,!1)||(e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0),"variable"):t.match(/^\+#{/,!1)?(t.next(),e.mixinCallAfter=!0,s(t,e)):void 0}function b(t,e){if(e.mixinCallAfter)return e.mixinCallAfter=!1,t.match(/^\( *[-\w]+ *=/,!1)||(e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0),!0}function L(t,e){if(t.match(/^(if|unless|else if|else)\b/))return e.javaScriptLine=!0,J}function A(t,e){if(t.match(/^(- *)?(each|for)\b/))return e.isEach=!0,J}function k(t,e){if(e.isEach){if(t.match(/^ in\b/))return e.javaScriptLine=!0,e.isEach=!1,J;if(t.sol()||t.eol())e.isEach=!1;else if(t.next()){for(;!t.match(/^ in\b/,!1)&&t.next(););return"variable"}}}function y(t,e){if(t.match(/^while\b/))return e.javaScriptLine=!0,J}function T(t,e){var n;if(n=t.match(/^(\w(?:[-:\w]*\w)?)\/?/))return e.lastTag=n[1].toLowerCase(),"script"===e.lastTag&&(e.scriptType="application/javascript"),"tag"}function M(e,n){if(e.match(/^:([\w\-]+)/)){var i;return t&&t.innerModes&&(i=t.innerModes(e.current().substring(1))),i||(i=e.current().substring(1)),"string"==typeof i&&(i=CodeMirror.getMode(t,i)),U(e,n,i),"atom"}}function x(t,e){if(t.match(/^(!?=|-)/))return e.javaScriptLine=!0,"punctuation"}function N(t){if(t.match(/^#([\w-]+)/))return P}function O(t){if(t.match(/^\.([\w-]+)/))return Q}function w(t,e){if("("==t.peek())return t.next(),e.isAttrs=!0,e.attrsNest=[],e.inAttributeName=!0,e.attrValue="",e.attributeIsType=!1,"punctuation"}function I(t,e){if(e.isAttrs){if(R[t.peek()]&&e.attrsNest.push(R[t.peek()]),e.attrsNest[e.attrsNest.length-1]===t.peek())e.attrsNest.pop();else if(t.eat(")"))return e.isAttrs=!1,"punctuation";if(e.inAttributeName&&t.match(/^[^=,\)!]+/))return"="!==t.peek()&&"!"!==t.peek()||(e.inAttributeName=!1,e.jsState=W.startState(),"script"===e.lastTag&&"type"===t.current().trim().toLowerCase()?e.attributeIsType=!0:e.attributeIsType=!1),"attribute";var n=W.token(t,e.jsState);if(e.attributeIsType&&"string"===n&&(e.scriptType=t.current().toString()),0===e.attrsNest.length&&("string"===n||"variable"===n||"keyword"===n))try{return Function("","var x "+e.attrValue.replace(/,\s*$/,"").replace(/^!/,"")),e.inAttributeName=!0,e.attrValue="",t.backUp(t.current().length),I(t,e)}catch(i){}return e.attrValue+=t.current(),n||!0}}function E(t,e){if(t.match(/^&attributes\b/))return e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0,"keyword"}function C(t){if(t.sol()&&t.eatSpace())return"indent"}function F(t,e){if(t.match(/^ *\/\/(-)?([^\n]*)/))return e.indentOf=t.indentation(),e.indentToken="comment","comment"}function D(t){if(t.match(/^: */))return"colon"}function V(t,e){return t.match(/^(?:\| ?| )([^\n]+)/)?"string":t.match(/^(<[^\n]*)/,!1)?(U(t,e,"htmlmixed"),e.innerModeForLine=!0,Z(t,e,!0)):void 0}function q(t,e){if(t.eat(".")){var n=null;return"script"===e.lastTag&&e.scriptType.toLowerCase().indexOf("javascript")!=-1?n=e.scriptType.toLowerCase().replace(/"|'/g,""):"style"===e.lastTag&&(n="css"),U(t,e,n),"dot"}}function z(t){return t.next(),null}function U(e,n,i){i=CodeMirror.mimeModes[i]||i,i=t.innerModes?t.innerModes(i)||i:i,i=CodeMirror.mimeModes[i]||i,i=CodeMirror.getMode(t,i),n.indentOf=e.indentation(),i&&"null"!==i.name?n.innerMode=i:n.indentToken="string"}function Z(t,e,n){return t.indentation()>e.indentOf||e.innerModeForLine&&!t.sol()||n?e.innerMode?(e.innerState||(e.innerState=e.innerMode.startState?e.innerMode.startState(t.indentation()):{}),t.hideFirstChars(e.indentOf+2,function(){return e.innerMode.token(t,e.innerState)||!0})):(t.skipToEnd(),e.indentToken):void(t.sol()&&(e.indentOf=1/0,e.indentToken=null,e.innerMode=null,e.innerState=null))}function $(t,e){if(t.sol()&&(e.restOfLine=""),e.restOfLine){t.skipToEnd();var n=e.restOfLine;return e.restOfLine="",n}}function B(){return new e}function G(t){return t.copy()}function H(t,e){var U=Z(t,e)||$(t,e)||c(t,e)||S(t,e)||k(t,e)||I(t,e)||n(t,e)||i(t,e)||b(t,e)||r(t,e)||a(t,e)||s(t,e)||o(t,e)||u(t,e)||p(t,e)||f(t,e)||l(t,e)||h(t,e)||d(t,e)||m(t,e)||v(t,e)||j(t,e)||g(t,e)||L(t,e)||A(t,e)||y(t,e)||T(t,e)||M(t,e)||x(t,e)||N(t,e)||O(t,e)||w(t,e)||E(t,e)||C(t,e)||V(t,e)||F(t,e)||D(t,e)||q(t,e)||z(t,e);return U===!0?null:U}var J="keyword",K="meta",P="builtin",Q="qualifier",R={"{":"}","(":")","[":"]"},W=CodeMirror.getMode(t,"javascript");return e.prototype.copy=function(){var t=new e;return t.javaScriptLine=this.javaScriptLine,t.javaScriptLineExcludesColon=this.javaScriptLineExcludesColon,t.javaScriptArguments=this.javaScriptArguments,t.javaScriptArgumentsDepth=this.javaScriptArgumentsDepth,t.isInterpolating=this.isInterpolating,t.interpolationNesting=this.intpolationNesting,t.jsState=CodeMirror.copyState(W,this.jsState),t.innerMode=this.innerMode,this.innerMode&&this.innerState&&(t.innerState=CodeMirror.copyState(this.innerMode,this.innerState)),t.restOfLine=this.restOfLine,t.isIncludeFiltered=this.isIncludeFiltered,t.isEach=this.isEach,t.lastTag=this.lastTag,t.scriptType=this.scriptType,t.isAttrs=this.isAttrs,t.attrsNest=this.attrsNest.slice(),t.inAttributeName=this.inAttributeName,t.attributeIsType=this.attributeIsType,t.attrValue=this.attrValue,t.indentOf=this.indentOf,t.indentToken=this.indentToken,t.innerModeForLine=this.innerModeForLine,t},{startState:B,copyState:G,token:H}}),CodeMirror.defineMIME("text/x-jade","jade")});