!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed"],t):t(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("htmlembedded",function(t,e){function n(t,e){return t.match(d,!1)?(e.token=i,o.token(t,e.scriptState)):r.token(t,e.htmlState)}function i(t,e){return t.match(a,!1)?(e.token=n,r.token(t,e.htmlState)):o.token(t,e.scriptState)}var o,r,d=e.scriptStartRegex||/^<%/i,a=e.scriptEndRegex||/^%>/i;return{startState:function(){return o=o||CodeMirror.getMode(t,e.scriptingModeSpec),r=r||CodeMirror.getMode(t,"htmlmixed"),{token:e.startOpen?i:n,htmlState:CodeMirror.startState(r),scriptState:CodeMirror.startState(o)}},token:function(t,e){return e.token(t,e)},indent:function(t,e){return t.token==n?r.indent(t.htmlState,e):o.indent?o.indent(t.scriptState,e):void 0},copyState:function(t){return{token:t.token,htmlState:CodeMirror.copyState(r,t.htmlState),scriptState:CodeMirror.copyState(o,t.scriptState)}},innerMode:function(t){return t.token==i?{state:t.scriptState,mode:o}:{state:t.htmlState,mode:r}}}},"htmlmixed"),CodeMirror.defineMIME("application/x-ejs",{name:"htmlembedded",scriptingModeSpec:"javascript"}),CodeMirror.defineMIME("application/x-aspx",{name:"htmlembedded",scriptingModeSpec:"text/x-csharp"}),CodeMirror.defineMIME("application/x-jsp",{name:"htmlembedded",scriptingModeSpec:"text/x-java"}),CodeMirror.defineMIME("application/x-erb",{name:"htmlembedded",scriptingModeSpec:"ruby"})});