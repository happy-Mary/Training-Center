"use strict";function brackets(t){if(!isPosixBracket(t))return t;var e=!1;-1!==t.indexOf("[^")&&(e=!0,t=t.split("[^").join("[")),-1!==t.indexOf("[!")&&(e=!0,t=t.split("[!").join("["));for(var r=t.split("["),a=t.split("]"),s=r.length!==a.length,i=t.split(/(?::\]\[:|\[?\[:|:\]\]?)/),n=i.length,c=0,l="",p="",u=[];n--;){var h=i[c++];"^[!"!==h&&"[!"!==h||(h="",e=!0);var o=e?"^":"",x=POSIX[h];x?u.push("["+o+x+"]"):h&&(/^\[?\w-\w\]?$/.test(h)?c===i.length?u.push("["+o+h):1===c?u.push(o+h+"]"):u.push(o+h):1===c?p+=h:c===i.length?l+=h:u.push("["+o+h+"]"))}var k=u.join("|"),g=u.length||1;return g>1&&(k="(?:"+k+")",g=1),p&&(g++,"["===p.charAt(0)&&(s?p="\\["+p.slice(1):p+="]"),k=p+k),l&&(g++,"]"===l.slice(-1)&&(l=s?l.slice(0,l.length-1)+"\\]":"["+l),k+=l),g>1&&(-1===(k=k.split("][").join("]|[")).indexOf("|")||/\(\?/.test(k)||(k="(?:"+k+")")),k=k.replace(/\[+=|=\]+/g,"\\b")}var isPosixBracket=require("is-posix-bracket"),POSIX={alnum:"a-zA-Z0-9",alpha:"a-zA-Z",blank:" \\t",cntrl:"\\x00-\\x1F\\x7F",digit:"0-9",graph:"\\x21-\\x7E",lower:"a-z",print:"\\x20-\\x7E",punct:"-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",space:" \\t\\r\\n\\v\\f",upper:"A-Z",word:"A-Za-z0-9_",xdigit:"A-Fa-f0-9"};module.exports=brackets,brackets.makeRe=function(t){try{return new RegExp(brackets(t))}catch(t){}},brackets.isMatch=function(t,e){try{return brackets.makeRe(e).test(t)}catch(t){return!1}},brackets.match=function(t,e){for(var r=t.length,a=0,s=t.slice(),i=brackets.makeRe(e);a<r;){var n=t[a++];i.test(n)&&s.splice(a,1)}return s};