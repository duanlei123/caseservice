!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(CodeMirror){"use strict";function t(t,e){e.mode=d.newLayout,e.tableHeading=!1,"definitionList"===e.layoutType&&e.spanningLayout&&t.match(u("definitionListEnd"),!1)&&(e.spanningLayout=!1)}function e(t,e,a){if("_"===a)return t.eat("_")?n(t,e,"italic",/__/,2):n(t,e,"em",/_/,1);if("*"===a)return t.eat("*")?n(t,e,"bold",/\*\*/,2):n(t,e,"strong",/\*/,1);if("["===a)return t.match(/\d+\]/)&&(e.footCite=!0),i(e);if("("===a){var l=t.match(/^(r|tm|c)\)/);if(l)return r(e,s.specialChar)}if("<"===a&&t.match(/(\w+)[^>]+>[^<]+<\/\1>/))return r(e,s.html);if("?"===a&&t.eat("?"))return n(t,e,"cite",/\?\?/,2);if("="===a&&t.eat("="))return n(t,e,"notextile",/==/,2);if("-"===a&&!t.eat("-"))return n(t,e,"deletion",/-/,1);if("+"===a)return n(t,e,"addition",/\+/,1);if("~"===a)return n(t,e,"sub",/~/,1);if("^"===a)return n(t,e,"sup",/\^/,1);if("%"===a)return n(t,e,"span",/%/,1);if("@"===a)return n(t,e,"code",/@/,1);if("!"===a){var o=n(t,e,"image",/(?:\([^\)]+\))?!/,1);return t.match(/^:\S+/),o}return i(e)}function n(t,e,n,a,r){var l=t.pos>r?t.string.charAt(t.pos-r-1):null,o=t.peek();if(e[n]){if((!o||/\W/.test(o))&&l&&/\S/.test(l)){var u=i(e);return e[n]=!1,u}}else(!l||/\W/.test(l))&&o&&/\S/.test(o)&&t.match(new RegExp("^.*\\S"+a.source+"(?:\\W|$)"),!1)&&(e[n]=!0,e.mode=d.attributes);return i(e)}function i(t){var e=a(t);if(e)return e;var n=[];return t.layoutType&&n.push(s[t.layoutType]),n=n.concat(l(t,"addition","bold","cite","code","deletion","em","footCite","image","italic","link","span","strong","sub","sup","table","tableHeading")),"header"===t.layoutType&&n.push(s.header+"-"+t.header),n.length?n.join(" "):null}function a(t){var e=t.layoutType;switch(e){case"notextile":case"code":case"pre":return s[e];default:return t.notextile?s.notextile+(e?" "+s[e]:""):null}}function r(t,e){var n=a(t);if(n)return n;var r=i(t);return e?r?r+" "+e:e:r}function l(t){for(var e=[],n=1;n<arguments.length;++n)t[arguments[n]]&&e.push(s[arguments[n]]);return e}function o(t){var e=t.spanningLayout,n=t.layoutType;for(var i in t)t.hasOwnProperty(i)&&delete t[i];t.mode=d.newLayout,e&&(t.layoutType=n,t.spanningLayout=!0)}function u(t){return c.cache[t]||(c.cache[t]=c.createRe(t))}var s={addition:"positive",attributes:"attribute",bold:"strong",cite:"keyword",code:"atom",definitionList:"number",deletion:"negative",div:"punctuation",em:"em",footnote:"variable",footCite:"qualifier",header:"header",html:"comment",image:"string",italic:"em",link:"link",linkDefinition:"link",list1:"variable-2",list2:"variable-3",list3:"keyword",notextile:"string-2",pre:"operator",p:"property",quote:"bracket",span:"quote",specialChar:"tag",strong:"strong",sub:"builtin",sup:"builtin",table:"variable-3",tableHeading:"operator"},c={cache:{},single:{bc:"bc",bq:"bq",definitionList:/- [^(?::=)]+:=+/,definitionListEnd:/.*=:\s*$/,div:"div",drawTable:/\|.*\|/,foot:/fn\d+/,header:/h[1-6]/,html:/\s*<(?:\/)?(\w+)(?:[^>]+)?>(?:[^<]+<\/\1>)?/,link:/[^"]+":\S/,linkDefinition:/\[[^\s\]]+\]\S+/,list:/(?:#+|\*+)/,notextile:"notextile",para:"p",pre:"pre",table:"table",tableCellAttributes:/[\/\\]\d+/,tableHeading:/\|_\./,tableText:/[^"_\*\[\(\?\+~\^%@|-]+/,text:/[^!"_=\*\[\(<\?\+~\^%@-]+/},attributes:{align:/(?:<>|<|>|=)/,selector:/\([^\(][^\)]+\)/,lang:/\[[^\[\]]+\]/,pad:/(?:\(+|\)+){1,2}/,css:/\{[^\}]+\}/},createRe:function(t){switch(t){case"drawTable":return c.makeRe("^",c.single.drawTable,"$");case"html":return c.makeRe("^",c.single.html,"(?:",c.single.html,")*","$");case"linkDefinition":return c.makeRe("^",c.single.linkDefinition,"$");case"listLayout":return c.makeRe("^",c.single.list,u("allAttributes"),"*\\s+");case"tableCellAttributes":return c.makeRe("^",c.choiceRe(c.single.tableCellAttributes,u("allAttributes")),"+\\.");case"type":return c.makeRe("^",u("allTypes"));case"typeLayout":return c.makeRe("^",u("allTypes"),u("allAttributes"),"*\\.\\.?","(\\s+|$)");case"attributes":return c.makeRe("^",u("allAttributes"),"+");case"allTypes":return c.choiceRe(c.single.div,c.single.foot,c.single.header,c.single.bc,c.single.bq,c.single.notextile,c.single.pre,c.single.table,c.single.para);case"allAttributes":return c.choiceRe(c.attributes.selector,c.attributes.css,c.attributes.lang,c.attributes.align,c.attributes.pad);default:return c.makeRe("^",c.single[t])}},makeRe:function(){for(var t="",e=0;e<arguments.length;++e){var n=arguments[e];t+="string"==typeof n?n:n.source}return new RegExp(t)},choiceRe:function(){for(var t=[arguments[0]],e=1;e<arguments.length;++e)t[2*e-1]="|",t[2*e]=arguments[e];return t.unshift("(?:"),t.push(")"),c.makeRe.apply(null,t)}},d={newLayout:function(t,e){if(t.match(u("typeLayout"),!1))return e.spanningLayout=!1,(e.mode=d.blockType)(t,e);var n;return a(e)||(t.match(u("listLayout"),!1)?n=d.list:t.match(u("drawTable"),!1)?n=d.table:t.match(u("linkDefinition"),!1)?n=d.linkDefinition:t.match(u("definitionList"))?n=d.definitionList:t.match(u("html"),!1)&&(n=d.html)),(e.mode=n||d.text)(t,e)},blockType:function(t,e){var n,a;return e.layoutType=null,(n=t.match(u("type")))?(a=n[0],(n=a.match(u("header")))?(e.layoutType="header",e.header=parseInt(n[0][1])):a.match(u("bq"))?e.layoutType="quote":a.match(u("bc"))?e.layoutType="code":a.match(u("foot"))?e.layoutType="footnote":a.match(u("notextile"))?e.layoutType="notextile":a.match(u("pre"))?e.layoutType="pre":a.match(u("div"))?e.layoutType="div":a.match(u("table"))&&(e.layoutType="table"),e.mode=d.attributes,i(e)):(e.mode=d.text)(t,e)},text:function(t,n){if(t.match(u("text")))return i(n);var a=t.next();return'"'===a?(n.mode=d.link)(t,n):e(t,n,a)},attributes:function(t,e){return e.mode=d.layoutLength,t.match(u("attributes"))?r(e,s.attributes):i(e)},layoutLength:function(t,e){return t.eat(".")&&t.eat(".")&&(e.spanningLayout=!0),e.mode=d.text,i(e)},list:function(t,e){var n=t.match(u("list"));e.listDepth=n[0].length;var a=(e.listDepth-1)%3;return a?1===a?e.layoutType="list2":e.layoutType="list3":e.layoutType="list1",e.mode=d.attributes,i(e)},link:function(t,e){return e.mode=d.text,t.match(u("link"))?(t.match(/\S+/),r(e,s.link)):i(e)},linkDefinition:function(t,e){return t.skipToEnd(),r(e,s.linkDefinition)},definitionList:function(t,e){return t.match(u("definitionList")),e.layoutType="definitionList",t.match(/\s*$/)?e.spanningLayout=!0:e.mode=d.attributes,i(e)},html:function(t,e){return t.skipToEnd(),r(e,s.html)},table:function(t,e){return e.layoutType="table",(e.mode=d.tableCell)(t,e)},tableCell:function(t,e){return t.match(u("tableHeading"))?e.tableHeading=!0:t.eat("|"),e.mode=d.tableCellAttributes,i(e)},tableCellAttributes:function(t,e){return e.mode=d.tableText,t.match(u("tableCellAttributes"))?r(e,s.attributes):i(e)},tableText:function(t,n){return t.match(u("tableText"))?i(n):"|"===t.peek()?(n.mode=d.tableCell,i(n)):e(t,n,t.next())}};CodeMirror.defineMode("textile",function(){return{startState:function(){return{mode:d.newLayout}},token:function(e,n){return e.sol()&&t(e,n),n.mode(e,n)},blankLine:o}}),CodeMirror.defineMIME("text/x-textile","textile")});