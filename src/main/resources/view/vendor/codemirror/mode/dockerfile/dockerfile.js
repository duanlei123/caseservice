!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../../addon/mode/simple")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../../addon/mode/simple"],e):e(CodeMirror)}(function(CodeMirror){"use strict";var e=["from","maintainer","run","cmd","expose","env","add","copy","entrypoint","volume","user","workdir","onbuild"],n="("+e.join("|")+")",r=new RegExp(n+"\\s*$","i"),o=new RegExp(n+"(\\s+)","i");CodeMirror.defineSimpleMode("dockerfile",{start:[{regex:/#.*$/,token:"comment"},{regex:r,token:"variable-2"},{regex:o,token:["variable-2",null],next:"arguments"},{regex:/./,token:null}],arguments:[{regex:/#.*$/,token:"error",next:"start"},{regex:/[^#]+\\$/,token:null},{regex:/[^#]+/,token:null,next:"start"},{regex:/$/,token:null,next:"start"},{token:null,next:"start"}]}),CodeMirror.defineMIME("text/x-dockerfile","dockerfile")});