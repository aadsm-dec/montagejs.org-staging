montageDefine("8c245bc","merge",{dependencies:["collections/shim"],factory:function(e,t){"use strict";function n(e,t){for(var n,a=(t.length+1)*(e.length+1),s=Array(a),r=Array(t.length+1),i=Array(t.length+1),o=0;e.length+1>o;o++){for(var l=0;t.length+1>l;l++){var c,p;if(0===o&&0===l)c=" ",p=0;else if(0===o)c="insert",p=l;else if(0===l)c="delete",p=o;else if(e[o-1]===t[l-1])c="retain",p=i[l-1];else{var u=r[l-1],h=i[l];u>h?(c="delete",p=h+1):(c="insert",p=u+1)}s[o+l*(e.length+1)]=c,r[l]=p}n=r,r=i,i=n}return{edges:s,cost:i[t.length],source:t,target:e}}function a(e){for(var t,n,a=[],s=e.edges,r=t=e.target.length,i=e.source.length;t||i;){var o=s[t+i*(r+1)];if("delete"===o){if(n&&"delete"===n[0])n[1]++;else{var l=["delete",1];n=l,a.push(l)}t--}else if("insert"===o){if(n&&"insert"===n[0])n[1]++;else{var l=["insert",1];n=l,a.push(l)}i--}else if("retain"===o){var l=["retain",1];n&&"retain"===n[0]?n[1]++:(n=l,a.push(l)),t--,i--}}return a.reverse(),a}function s(e,t){return a(n(e,t))}function r(e,t){for(var n=s(e,t),a=[],r=0,i=0,o=0;n.length>o;){var l=n[o++];if("insert"===l[0])a.push([i,0,t.slice(i,i+l[1])]),i+=l[1];else if("delete"===l[0])if(n.length>o&&"insert"===n[o][0]){var c=n[o++];a.push([i,l[1],t.slice(i,i+c[1])]),r+=l[1],i+=c[1]}else a.push([i,l[1]]),r+=l[1];else"retain"==l[0]&&(r+=l[1],i+=l[1])}return a}function i(e,t){for(var n=0;t.length>n;n++)e.swap.apply(e,t[n])}function o(e,t){i(e,r(e,t))}e("collections/shim"),t.graphOt=n,t.traceOt=a,t.ot=s,t.diff=r,t.apply=i,t.merge=o}});