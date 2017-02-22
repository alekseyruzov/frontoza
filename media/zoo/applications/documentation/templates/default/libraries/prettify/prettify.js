/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

window.PR_SHOULD_USE_CONTINUATION=!0,function(){function e(e){function n(e){var n=e.charCodeAt(0);if(92!==n)return n;var t=e.charAt(1);return n=d[t],n?n:t>="0"&&"7">=t?parseInt(e.substring(1),8):"u"===t||"x"===t?parseInt(e.substring(2),16):e.charCodeAt(1)}function t(e){if(32>e)return(16>e?"\\x0":"\\x")+e.toString(16);var n=String.fromCharCode(e);return("\\"===n||"-"===n||"["===n||"]"===n)&&(n="\\"+n),n}function r(e){for(var r=e.substring(1,e.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),a=[],s=[],i="^"===r[0],l=i?1:0,o=r.length;o>l;++l){var u=r[l];if(/\\[bdsw]/i.test(u))a.push(u);else{var c,d=n(u);o>l+2&&"-"===r[l+1]?(c=n(r[l+2]),l+=2):c=d,s.push([d,c]),65>c||d>122||(65>c||d>90||s.push([32|Math.max(65,d),32|Math.min(c,90)]),97>c||d>122||s.push([-33&Math.max(97,d),-33&Math.min(c,122)]))}}s.sort(function(e,n){return e[0]-n[0]||n[1]-e[1]});for(var f=[],E=[0/0,0/0],l=0;l<s.length;++l){var p=s[l];p[0]<=E[1]+1?E[1]=Math.max(E[1],p[1]):f.push(E=p)}var R=["["];i&&R.push("^"),R.push.apply(R,a);for(var l=0;l<f.length;++l){var p=f[l];R.push(t(p[0])),p[1]>p[0]&&(p[1]+1>p[0]&&R.push("-"),R.push(t(p[1])))}return R.push("]"),R.join("")}function a(e){for(var n=e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),t=n.length,a=[],l=0,o=0;t>l;++l){var u=n[l];if("("===u)++o;else if("\\"===u.charAt(0)){var c=+u.substring(1);c&&o>=c&&(a[c]=-1)}}for(var l=1;l<a.length;++l)-1===a[l]&&(a[l]=++s);for(var l=0,o=0;t>l;++l){var u=n[l];if("("===u)++o,void 0===a[o]&&(n[l]="(?:");else if("\\"===u.charAt(0)){var c=+u.substring(1);c&&o>=c&&(n[l]="\\"+a[o])}}for(var l=0,o=0;t>l;++l)"^"===n[l]&&"^"!==n[l+1]&&(n[l]="");if(e.ignoreCase&&i)for(var l=0;t>l;++l){var u=n[l],d=u.charAt(0);u.length>=2&&"["===d?n[l]=r(u):"\\"!==d&&(n[l]=u.replace(/[a-zA-Z]/g,function(e){var n=e.charCodeAt(0);return"["+String.fromCharCode(-33&n,32|n)+"]"}))}return n.join("")}for(var s=0,i=!1,l=!1,o=0,u=e.length;u>o;++o){var c=e[o];if(c.ignoreCase)l=!0;else if(/[a-z]/i.test(c.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){i=!0,l=!1;break}}for(var d={b:8,t:9,n:10,v:11,f:12,r:13},f=[],o=0,u=e.length;u>o;++o){var c=e[o];if(c.global||c.multiline)throw new Error(""+c);f.push("(?:"+a(c)+")")}return new RegExp(f.join("|"),l?"gi":"g")}function n(e){function n(e){switch(e.nodeType){case 1:if(r.test(e.className))return;for(var t=e.firstChild;t;t=t.nextSibling)n(t);var u=e.nodeName;("BR"===u||"LI"===u)&&(a[l]="\n",i[l<<1]=s++,i[l++<<1|1]=e);break;case 3:case 4:var c=e.nodeValue;c.length&&(c=o?c.replace(/\r\n?/g,"\n"):c.replace(/[ \t\r\n]+/g," "),a[l]=c,i[l<<1]=s,s+=c.length,i[l++<<1|1]=e)}}var t,r=/(?:^|\s)nocode(?:\s|$)/,a=[],s=0,i=[],l=0;e.currentStyle?t=e.currentStyle.whiteSpace:window.getComputedStyle&&(t=document.defaultView.getComputedStyle(e,null).getPropertyValue("white-space"));var o=t&&"pre"===t.substring(0,3);return n(e),{sourceCode:a.join("").replace(/\n$/,""),spans:i}}function t(e,n,t,r){if(n){var a={sourceCode:n,basePos:e};t(a),r.push.apply(r,a.decorations)}}function r(e){for(var n=void 0,t=e.firstChild;t;t=t.nextSibling){var r=t.nodeType;n=1===r?n?e:t:3===r&&H.test(t.nodeValue)?e:n}return n===e?void 0:n}function a(n,r){var a,s={};!function(){for(var t=n.concat(r),i=[],l={},o=0,u=t.length;u>o;++o){var c=t[o],d=c[3];if(d)for(var f=d.length;--f>=0;)s[d.charAt(f)]=c;var E=c[1],p=""+E;l.hasOwnProperty(p)||(i.push(E),l[p]=null)}i.push(/[\0-\uffff]/),a=e(i)}();var i=r.length,l=function(e){for(var n=e.sourceCode,o=e.basePos,c=[o,_],d=0,f=n.match(a)||[],E={},p=0,R=f.length;R>p;++p){var g,h=f[p],T=E[h],m=void 0;if("string"==typeof T)g=!1;else{var N=s[h.charAt(0)];if(N)m=h.match(N[1]),T=N[0];else{for(var S=0;i>S;++S)if(N=r[S],m=h.match(N[1])){T=N[0];break}m||(T=_)}g=T.length>=5&&"lang-"===T.substring(0,5),!g||m&&"string"==typeof m[1]||(g=!1,T=M),g||(E[h]=T)}var C=d;if(d+=h.length,g){var v=m[1],P=h.indexOf(v),O=P+v.length;m[2]&&(O=h.length-m[2].length,P=O-v.length);var I=T.substring(5);t(o+C,h.substring(0,P),l,c),t(o+C+P,v,u(I,v),c),t(o+C+O,h.substring(O),l,c)}else c.push(o+C,T)}e.decorations=c};return l}function s(e){var n=[],t=[];n.push(e.tripleQuotedStrings?[A,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]:e.multiLineStrings?[A,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]:[A,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),e.verbatimStrings&&t.push([A,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var r=e.hashComments;if(r&&(e.cStyleComments?(n.push(r>1?[w,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]:[w,/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),t.push([A,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,null])):n.push([w,/^#[^\r\n]*/,null,"#"])),e.cStyleComments&&(t.push([w,/^\/\/[^\r\n]*/,null]),t.push([w,/^\/\*[\s\S]*?(?:\*\/|$)/,null])),e.regexLiterals){var s="/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/";t.push(["lang-regex",new RegExp("^"+B+"("+s+")")])}var i=e.types;i&&t.push([x,i]);var l=(""+e.keywords).replace(/^ | $/g,"");return l.length&&t.push([L,new RegExp("^(?:"+l.replace(/[\s,]+/g,"|")+")\\b"),null]),n.push([_,/^\s+/,null," \r\n	 "]),t.push([y,/^@[a-z_$][a-z_$@0-9]*/i,null],[x,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[_,/^[a-z_$][a-z_$@0-9]*/i,null],[y,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[_,/^\\[\s\S]?/,null],[b,/^.[^\s\w\.$@\'\"\`\/\#\\]*/,null]),a(n,t)}function i(e,n){function t(e){switch(e.nodeType){case 1:if(s.test(e.className))break;if("BR"===e.nodeName)r(e),e.parentNode&&e.parentNode.removeChild(e);else for(var n=e.firstChild;n;n=n.nextSibling)t(n);break;case 3:case 4:if(o){var a=e.nodeValue,u=a.match(i);if(u){var c=a.substring(0,u.index);e.nodeValue=c;var d=a.substring(u.index+u[0].length);if(d){var f=e.parentNode;f.insertBefore(l.createTextNode(d),e.nextSibling)}r(e),c||e.parentNode.removeChild(e)}}}}function r(e){function n(e,t){var r=t?e.cloneNode(!1):e,a=e.parentNode;if(a){var s=n(a,1),i=e.nextSibling;s.appendChild(r);for(var l=i;l;l=i)i=l.nextSibling,s.appendChild(l)}return r}for(;!e.nextSibling;)if(e=e.parentNode,!e)return;for(var t,r=n(e.nextSibling,0);(t=r.parentNode)&&1===t.nodeType;)r=t;c.push(r)}var a,s=/(?:^|\s)nocode(?:\s|$)/,i=/\r\n?|\n/,l=e.ownerDocument;e.currentStyle?a=e.currentStyle.whiteSpace:window.getComputedStyle&&(a=l.defaultView.getComputedStyle(e,null).getPropertyValue("white-space"));for(var o=a&&"pre"===a.substring(0,3),u=l.createElement("LI");e.firstChild;)u.appendChild(e.firstChild);for(var c=[u],d=0;d<c.length;++d)t(c[d]);n===(0|n)&&c[0].setAttribute("value",n);var f=l.createElement("OL");f.className="linenums";for(var E=Math.max(0,n-1|0)||0,d=0,p=c.length;p>d;++d)u=c[d],u.className="L"+(d+E)%10,u.firstChild||u.appendChild(l.createTextNode(" ")),f.appendChild(u);e.appendChild(f)}function l(e){var n=/\bMSIE\b/.test(navigator.userAgent),t=/\n/g,r=e.sourceCode,a=r.length,s=0,i=e.spans,l=i.length,o=0,u=e.decorations,c=u.length,d=0;u[c]=a;var f,E;for(E=f=0;c>E;)u[E]!==u[E+2]?(u[f++]=u[E++],u[f++]=u[E++]):E+=2;for(c=f,E=f=0;c>E;){for(var p=u[E],R=u[E+1],g=E+2;c>=g+2&&u[g+1]===R;)g+=2;u[f++]=p,u[f++]=R,E=g}c=u.length=f;for(;l>o;){var h,T=(i[o],i[o+2]||a),m=(u[d],u[d+2]||a),g=Math.min(T,m),N=i[o+1];if(1!==N.nodeType&&(h=r.substring(s,g))){n&&(h=h.replace(t,"\r")),N.nodeValue=h;var S=N.ownerDocument,C=S.createElement("SPAN");C.className=u[d+1];var v=N.parentNode;v.replaceChild(C,N),C.appendChild(N),T>s&&(i[o+1]=N=S.createTextNode(r.substring(g,T)),v.insertBefore(N,C.nextSibling))}s=g,s>=T&&(o+=2),s>=m&&(d+=2)}}function o(e,n){for(var t=n.length;--t>=0;){var r=n[t];G.hasOwnProperty(r)?window.console&&console.warn("cannot override language handler %s",r):G[r]=e}}function u(e,n){return e&&G.hasOwnProperty(e)||(e=/^\s*</.test(n)?"default-markup":"default-code"),G[e]}function c(e){var t=e.langExtension;try{var r=n(e.sourceNode),a=r.sourceCode;e.sourceCode=a,e.spans=r.spans,e.basePos=0,u(t,a)(e),l(e)}catch(s){"console"in window&&console.log(s&&s.stack?s.stack:s)}}function d(e,n,t){var r=document.createElement("PRE");r.innerHTML=e,t&&i(r,t);var a={langExtension:n,numberLines:t,sourceNode:r};return c(a),r.innerHTML}function f(e){function n(e){return document.getElementsByTagName(e)}function t(){for(var n=window.PR_SHOULD_USE_CONTINUATION?d.now()+250:1/0;E<s.length&&d.now()<n;E++){var a=s[E],l=a.className;if(l.indexOf("prettyprint")>=0){var o,u=l.match(p);!u&&(o=r(a))&&"CODE"===o.tagName&&(u=o.className.match(p)),u&&(u=u[1]);for(var R=!1,g=a.parentNode;g;g=g.parentNode)if(("pre"===g.tagName||"code"===g.tagName||"xmp"===g.tagName)&&g.className&&g.className.indexOf("prettyprint")>=0){R=!0;break}if(!R){var h=a.className.match(/\blinenums\b(?::(\d+))?/);h=h?h[1]&&h[1].length?+h[1]:!0:!1,h&&i(a,h),f={langExtension:u,sourceNode:a,numberLines:h},c(f)}}}E<s.length?setTimeout(t,250):e&&e()}for(var a=[n("pre"),n("code"),n("xmp")],s=[],l=0;l<a.length;++l)for(var o=0,u=a[l].length;u>o;++o)s.push(a[l][o]);a=null;var d=Date;d.now||(d={now:function(){return+new Date}});var f,E=0,p=/\blang(?:uage)?-([\w.]+)(?!\S)/;t()}var E=["break,continue,do,else,for,if,return,while"],p=[E,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],R=[p,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],g=[R,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],h=[R,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],T=[h,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],m="all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",N=[R,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],S="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",C=[E,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],v=[E,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],P=[E,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],O=[g,T,N,S+C,v,P],I=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,A="str",L="kwd",w="com",x="typ",y="lit",b="pun",_="pln",U="tag",D="dec",M="src",k="atn",$="atv",F="nocode",B="(?:^^\\.?|[+-]|\\!|\\!=|\\!==|\\#|\\%|\\%=|&|&&|&&=|&=|\\(|\\*|\\*=|\\+=|\\,|\\-=|\\->|\\/|\\/=|:|::|\\;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\@|\\[|\\^|\\^=|\\^\\^|\\^\\^=|\\{|\\||\\|=|\\|\\||\\|\\|=|\\~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*",H=/\S/,z=s({keywords:O,hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),G={};o(z,["default-code"]),o(a([],[[_,/^[^<?]+/],[D,/^<!\w[^>]*(?:>|$)/],[w,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[b,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),o(a([[_,/^[\s]+/,null," 	\r\n"],[$,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[U,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[k,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[b,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),o(a([],[[$,/^[\s\S]+/]]),["uq.val"]),o(s({keywords:g,hashComments:!0,cStyleComments:!0,types:I}),["c","cc","cpp","cxx","cyc","m"]),o(s({keywords:"null,true,false"}),["json"]),o(s({keywords:T,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:I}),["cs"]),o(s({keywords:h,cStyleComments:!0}),["java"]),o(s({keywords:P,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]),o(s({keywords:C,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py"]),o(s({keywords:S,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]),o(s({keywords:v,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]),o(s({keywords:N,cStyleComments:!0,regexLiterals:!0}),["js"]),o(s({keywords:m,hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),o(a([],[[A,/^[\s\S]+/]]),["regex"]),window.prettyPrintOne=d,window.prettyPrint=f,window.PR={createSimpleLexer:a,registerLangHandler:o,sourceDecorator:s,PR_ATTRIB_NAME:k,PR_ATTRIB_VALUE:$,PR_COMMENT:w,PR_DECLARATION:D,PR_KEYWORD:L,PR_LITERAL:y,PR_NOCODE:F,PR_PLAIN:_,PR_PUNCTUATION:b,PR_SOURCE:M,PR_STRING:A,PR_TAG:U,PR_TYPE:x}}(),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/,null,"\"'"]],[[PR.PR_COMMENT,/^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],[PR.PR_KEYWORD,/^(?:ADD|ALL|ALTER|AND|ANY|AS|ASC|AUTHORIZATION|BACKUP|BEGIN|BETWEEN|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMPUTE|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DENY|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|ELSE|END|ERRLVL|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FOR|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IN|INDEX|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KILL|LEFT|LIKE|LINENO|LOAD|MATCH|MERGE|NATIONAL|NOCHECK|NONCLUSTERED|NOT|NULL|NULLIF|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUTER|OVER|PERCENT|PLAN|PRECISION|PRIMARY|PRINT|PROC|PROCEDURE|PUBLIC|RAISERROR|READ|READTEXT|RECONFIGURE|REFERENCES|REPLICATION|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLLBACK|ROWCOUNT|ROWGUIDCOL|RULE|SAVE|SCHEMA|SELECT|SESSION_USER|SET|SETUSER|SHUTDOWN|SOME|STATISTICS|SYSTEM_USER|TABLE|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|UNION|UNIQUE|UPDATE|UPDATETEXT|USE|USER|USING|VALUES|VARYING|VIEW|WAITFOR|WHEN|WHERE|WHILE|WITH|WRITETEXT)(?=[^\w-]|$)/i,null],[PR.PR_LITERAL,/^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],[PR.PR_PLAIN,/^[a-z_][\w-]*/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]]),["sql"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[ \t\r\n\f]+/,null," 	\r\n\f"]],[[PR.PR_STRING,/^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/,null],[PR.PR_STRING,/^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/,null],["lang-css-str",/^url\(([^\)\"\']*)\)/i],[PR.PR_KEYWORD,/^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i,null],["lang-css-kw",/^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_COMMENT,/^(?:<!--|-->)/],[PR.PR_LITERAL,/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],[PR.PR_LITERAL,/^#(?:[0-9a-f]{3}){1,2}/i],[PR.PR_PLAIN,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],[PR.PR_PUNCTUATION,/^[^\s\w\'\"]+/]]),["css"]),PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_KEYWORD,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]),["css-kw"]),PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_STRING,/^[^\)\"\']+/]]),["css-str"]);