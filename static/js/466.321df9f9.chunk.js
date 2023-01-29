"use strict";(self.webpackChunkbest=self.webpackChunkbest||[]).push([[466],{8466:function(r,e,t){t.r(e),t.d(e,{default:function(){return V}});var n={};t.r(n),t.d(n,{exclude:function(){return D},extract:function(){return T},parse:function(){return $},parseUrl:function(){return M},pick:function(){return B},stringify:function(){return L},stringifyUrl:function(){return q}});var o=t(2791),i=t(3531),a=t(1087),s=t(4657),l=t(1694),u=t.n(l),c=t(1413),f=t(9195),d=t(184),p=function(r){var e=r.findFilterUsers,t=r.count,n=r.term,o=r.friend,i=(0,f.cI)({defaultValues:{term:n,friend:o}}),a=i.register,s=i.handleSubmit;return(0,d.jsxs)("form",{className:"flex flex-col items-start gap-2 mb-3",onSubmit:s((function(r){e(t,r.term,r.friend?r.friend:null)})),children:[(0,d.jsxs)("div",{className:"flex gap-2",children:[(0,d.jsx)("label",{children:"Term:"}),(0,d.jsx)("input",(0,c.Z)({className:"flex-auto border-b",placeholder:"Term",type:"text"},a("term")))]}),(0,d.jsxs)("div",{className:"flex gap-2",children:[(0,d.jsx)("label",{children:"Friends:"}),(0,d.jsx)("input",(0,c.Z)({type:"checkbox"},a("friend")))]}),(0,d.jsx)("button",{className:"border-2 py-1 px-5 rounded-[10px]",children:"Find"})]})},m=function(r){for(var e=r.users,t=r.page,n=r.totalCount,o=r.count,i=r.isFetching,l=(r.setPage,r.portion),c=r.portionNumber,f=r.setPortionNumber,m=r.followUnfollow,g=r.isAuth,v=r.followProgressingUsers,b=r.setUsers,y=(r.setFilterFriend,r.setFilterTerm,r.term),h=r.friend,x=r.findFilterUsers,j=Math.ceil(n/o),F=Math.ceil(j/l),w=[],N=1;N<=j;N++)w.push(N);var k=t;return i?(0,d.jsx)("div",{className:"p-4 text-start",children:"Loading..."}):(t>j&&j>0&&(f(F),b(o,j,y,h)),(0,d.jsxs)("div",{className:"p-4",children:[(0,d.jsx)(p,{count:o,term:y,friend:h,findFilterUsers:x}),(0,d.jsxs)("div",{className:"flex gap-1 mb-4",children:[(0,d.jsx)("button",{className:u()("p-1 border rounded-[5px]",{"bg-slate-100":1==c}),disabled:1==c,onClick:function(){return f(c-1)},children:"prev"}),(0,d.jsx)("div",{className:"flex gap-1",children:w.map((function(r){if(r<=l*c&&r>=l*(c-1)+1)return(0,d.jsx)("button",{className:u()("p-1 border rounded-[5px]",{"bg-red-300":r==k}),onClick:function(){return b(o,r,y,h)},children:r},r)}))}),(0,d.jsx)("button",{className:u()("p-1 border rounded-[5px]",{"bg-slate-100":c==F}),disabled:c==F,onClick:function(){return f(c+1)},children:"next"})]}),(0,d.jsx)("div",{className:"flex flex-col gap-3",children:e.map((function(r){var e,t=v.some((function(e){return e==r.id}));return(0,d.jsxs)("div",{className:"p-2 border-2 border-red-700 rounded-[5px] text-start flex flex-col items-start gap-2",children:[(0,d.jsxs)("div",{className:"flex gap-3",children:[(0,d.jsx)(a.OL,{to:"/profile/".concat(r.id),className:"w-[75px] h-[75px] w-[75px] overflow-hidden border-2 border-red-700 rounded-[50%]",children:(0,d.jsx)("img",{src:(null===r||void 0===r||null===(e=r.photos)||void 0===e?void 0:e.small)||s,alt:""})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{children:r.name}),(0,d.jsx)("div",{children:r.status})]})]}),(0,d.jsx)("button",{className:u()({"bg-slate-100":t},"px-3 py-1 rounded-[5px] border",{"bg-red-300":r.followed}),disabled:!g||t,onClick:function(){return m(r.id,!r.followed)},children:r.followed?"Unfollow":"Follow"})]},r.id)}))})]}))},g=t(1640),v=t(7689),b=t(4942),y=t(9439),h=t(7762),x=t(3433),j="%[a-f0-9]{2}",F=new RegExp("("+j+")|([^%]+?)","gi"),w=new RegExp("("+j+")+","gi");function N(r,e){try{return[decodeURIComponent(r.join(""))]}catch(o){}if(1===r.length)return r;e=e||1;var t=r.slice(0,e),n=r.slice(e);return Array.prototype.concat.call([],N(t),N(n))}function k(r){try{return decodeURIComponent(r)}catch(n){for(var e=r.match(F)||[],t=1;t<e.length;t++)e=(r=N(e,t).join("")).match(F)||[];return r}}function U(r){if("string"!==typeof r)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return decodeURIComponent(r)}catch(e){return function(r){for(var e={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},t=w.exec(r);t;){try{e[t[0]]=decodeURIComponent(t[0])}catch(s){var n=k(t[0]);n!==t[0]&&(e[t[0]]=n)}t=w.exec(r)}e["%C2"]="\ufffd";for(var o=0,i=Object.keys(e);o<i.length;o++){var a=i[o];r=r.replace(new RegExp(a,"g"),e[a])}return r}(r)}}function Z(r,e){if("string"!==typeof r||"string"!==typeof e)throw new TypeError("Expected the arguments to be of type `string`");if(""===r||""===e)return[];var t=r.indexOf(e);return-1===t?[]:[r.slice(0,t),r.slice(t+e.length)]}function C(r,e){var t={};if(Array.isArray(e)){var n,o=(0,h.Z)(e);try{for(o.s();!(n=o.n()).done;){var i=n.value,a=Object.getOwnPropertyDescriptor(r,i);null!==a&&void 0!==a&&a.enumerable&&Object.defineProperty(t,i,a)}}catch(f){o.e(f)}finally{o.f()}}else{var s,l=(0,h.Z)(Reflect.ownKeys(r));try{for(l.s();!(s=l.n()).done;){var u=s.value,c=Object.getOwnPropertyDescriptor(r,u);if(c.enumerable)e(u,r[u],r)&&Object.defineProperty(t,u,c)}}catch(f){l.e(f)}finally{l.f()}}return t}var S=Symbol("encodeFragmentIdentifier");function O(r){if("string"!==typeof r||1!==r.length)throw new TypeError("arrayFormatSeparator must be single character string")}function P(r,e){return e.encode?e.strict?encodeURIComponent(r).replace(/[!'()*]/g,(function(r){return"%".concat(r.charCodeAt(0).toString(16).toUpperCase())})):encodeURIComponent(r):r}function E(r,e){return e.decode?U(r):r}function A(r){return Array.isArray(r)?r.sort():"object"===typeof r?A(Object.keys(r)).sort((function(r,e){return Number(r)-Number(e)})).map((function(e){return r[e]})):r}function I(r){var e=r.indexOf("#");return-1!==e&&(r=r.slice(0,e)),r}function R(r,e){return e.parseNumbers&&!Number.isNaN(Number(r))&&"string"===typeof r&&""!==r.trim()?r=Number(r):!e.parseBooleans||null===r||"true"!==r.toLowerCase()&&"false"!==r.toLowerCase()||(r="true"===r.toLowerCase()),r}function T(r){var e=(r=I(r)).indexOf("?");return-1===e?"":r.slice(e+1)}function $(r,e){O((e=(0,c.Z)({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},e)).arrayFormatSeparator);var t=function(r){var e;switch(r.arrayFormat){case"index":return function(r,t,n){e=/\[(\d*)]$/.exec(r),r=r.replace(/\[\d*]$/,""),e?(void 0===n[r]&&(n[r]={}),n[r][e[1]]=t):n[r]=t};case"bracket":return function(r,t,n){e=/(\[])$/.exec(r),r=r.replace(/\[]$/,""),e?void 0!==n[r]?n[r]=[].concat((0,x.Z)(n[r]),[t]):n[r]=[t]:n[r]=t};case"colon-list-separator":return function(r,t,n){e=/(:list)$/.exec(r),r=r.replace(/:list$/,""),e?void 0!==n[r]?n[r]=[].concat((0,x.Z)(n[r]),[t]):n[r]=[t]:n[r]=t};case"comma":case"separator":return function(e,t,n){var o="string"===typeof t&&t.includes(r.arrayFormatSeparator),i="string"===typeof t&&!o&&E(t,r).includes(r.arrayFormatSeparator);t=i?E(t,r):t;var a=o||i?t.split(r.arrayFormatSeparator).map((function(e){return E(e,r)})):null===t?t:E(t,r);n[e]=a};case"bracket-separator":return function(e,t,n){var o=/(\[])$/.test(e);if(e=e.replace(/\[]$/,""),o){var i=null===t?[]:t.split(r.arrayFormatSeparator).map((function(e){return E(e,r)}));void 0!==n[e]?n[e]=[].concat((0,x.Z)(n[e]),(0,x.Z)(i)):n[e]=i}else n[e]=t?E(t,r):t};default:return function(r,e,t){void 0!==t[r]?t[r]=[].concat((0,x.Z)([t[r]].flat()),[e]):t[r]=e}}}(e),n=Object.create(null);if("string"!==typeof r)return n;if(!(r=r.trim().replace(/^[?#&]/,"")))return n;var o,i=(0,h.Z)(r.split("&"));try{for(i.s();!(o=i.n()).done;){var a=o.value;if(""!==a){var s=e.decode?a.replace(/\+/g," "):a,l=Z(s,"="),u=(0,y.Z)(l,2),f=u[0],d=u[1];void 0===f&&(f=s),d=void 0===d?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?d:E(d,e),t(E(f,e),d,n)}}}catch(U){i.e(U)}finally{i.f()}for(var p=0,m=Object.entries(n);p<m.length;p++){var g=(0,y.Z)(m[p],2),v=g[0],b=g[1];if("object"===typeof b&&null!==b)for(var j=0,F=Object.entries(b);j<F.length;j++){var w=(0,y.Z)(F[j],2),N=w[0],k=w[1];b[N]=R(k,e)}else n[v]=R(b,e)}return!1===e.sort?n:(!0===e.sort?Object.keys(n).sort():Object.keys(n).sort(e.sort)).reduce((function(r,e){var t=n[e];return Boolean(t)&&"object"===typeof t&&!Array.isArray(t)?r[e]=A(t):r[e]=t,r}),Object.create(null))}function L(r,e){if(!r)return"";O((e=(0,c.Z)({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},e)).arrayFormatSeparator);for(var t=function(t){return e.skipNull&&function(r){return null===r||void 0===r}(r[t])||e.skipEmptyString&&""===r[t]},n=function(r){switch(r.arrayFormat){case"index":return function(e){return function(t,n){var o=t.length;return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?t:[].concat((0,x.Z)(t),null===n?[[P(e,r),"[",o,"]"].join("")]:[[P(e,r),"[",P(o,r),"]=",P(n,r)].join("")])}};case"bracket":return function(e){return function(t,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?t:[].concat((0,x.Z)(t),null===n?[[P(e,r),"[]"].join("")]:[[P(e,r),"[]=",P(n,r)].join("")])}};case"colon-list-separator":return function(e){return function(t,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?t:[].concat((0,x.Z)(t),null===n?[[P(e,r),":list="].join("")]:[[P(e,r),":list=",P(n,r)].join("")])}};case"comma":case"separator":case"bracket-separator":var e="bracket-separator"===r.arrayFormat?"[]=":"=";return function(t){return function(n,o){return void 0===o||r.skipNull&&null===o||r.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[P(t,r),e,P(o,r)].join("")]:[[n,P(o,r)].join(r.arrayFormatSeparator)])}};default:return function(e){return function(t,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?t:[].concat((0,x.Z)(t),null===n?[P(e,r)]:[[P(e,r),"=",P(n,r)].join("")])}}}}(e),o={},i=0,a=Object.entries(r);i<a.length;i++){var s=(0,y.Z)(a[i],2),l=s[0],u=s[1];t(l)||(o[l]=u)}var f=Object.keys(o);return!1!==e.sort&&f.sort(e.sort),f.map((function(t){var o=r[t];return void 0===o?"":null===o?P(t,e):Array.isArray(o)?0===o.length&&"bracket-separator"===e.arrayFormat?P(t,e)+"[]":o.reduce(n(t),[]).join("&"):P(t,e)+"="+P(o,e)})).filter((function(r){return r.length>0})).join("&")}function M(r,e){var t,n,o;e=(0,c.Z)({decode:!0},e);var i=Z(r,"#"),a=(0,y.Z)(i,2),s=a[0],l=a[1];return void 0===s&&(s=r),(0,c.Z)({url:null!==(t=null===(n=s)||void 0===n||null===(o=n.split("?"))||void 0===o?void 0:o[0])&&void 0!==t?t:"",query:$(T(r),e)},e&&e.parseFragmentIdentifier&&l?{fragmentIdentifier:E(l,e)}:{})}function q(r,e){e=(0,c.Z)((0,b.Z)({encode:!0,strict:!0},S,!0),e);var t=I(r.url).split("?")[0]||"",n=T(r.url),o=L((0,c.Z)((0,c.Z)({},$(n,{sort:!1})),r.query),e);o&&(o="?".concat(o));var i=function(r){var e="",t=r.indexOf("#");return-1!==t&&(e=r.slice(t)),e}(r.url);if(r.fragmentIdentifier){var a=new URL(t);a.hash=r.fragmentIdentifier,i=e[S]?a.hash:"#".concat(r.fragmentIdentifier)}return"".concat(t).concat(o).concat(i)}function B(r,e,t){var n=M(r,t=(0,c.Z)((0,b.Z)({parseFragmentIdentifier:!0},S,!1),t)),o=n.url,i=n.query,a=n.fragmentIdentifier;return q({url:o,query:C(i,e),fragmentIdentifier:a},t)}function D(r,e,t){return B(r,Array.isArray(e)?function(r){return!e.includes(r)}:function(r,t){return!e(r,t)},t)}var H=n,V=(0,i.$j)((function(r){return{users:r.users.users,page:r.users.page,count:r.users.count,isFetching:r.users.isFetching,followProgressingUsers:r.users.followProgressingUsers,totalCount:r.users.totalCount,portion:r.users.portion,portionNumber:r.users.portionNumber,isAuth:r.authMe.isAuth,term:r.users.filter.term,friend:r.users.filter.friend}}),{setUsers:g.HM,setPage:g.Nw.setPage,setPortionNumber:g.Nw.setPortionNumber,followUnfollow:g._V,setFilterTerm:g.Nw.setFilterTerm,setFilterFriend:g.Nw.setFilterFriend,findFilterUsers:g.e})((function(r){var e=r.users,t=r.page,n=r.count,i=r.isFetching,a=r.followProgressingUsers,s=r.setUsers,l=r.totalCount,u=r.setPage,c=r.portion,f=r.portionNumber,p=r.setPortionNumber,g=r.isAuth,b=r.followUnfollow,y=r.setFilterFriend,h=r.setFilterTerm,x=r.term,j=r.friend,F=r.findFilterUsers,w=(0,v.s0)(),N=(0,v.TH)();return(0,o.useEffect)((function(){var r=H.parse(N.search.slice(1));y(!(null===r||void 0===r||!r.friend)||null),h(null!==r&&void 0!==r&&r.term?r.term:null),u(null!==r&&void 0!==r&&r.page?+r.page:t),p(Math.ceil((null!==r&&void 0!==r&&r.page?+r.page:t)/c)),s(n,null!==r&&void 0!==r&&r.page?+r.page:t,null!==r&&void 0!==r&&r.term?r.term:null,!(null===r||void 0===r||!r.friend)||null)}),[]),(0,o.useEffect)((function(){var r={};t&&(r.page=t.toString()),x&&(r.term=x),j&&(r.friend="true");var e=new URLSearchParams(r).toString();w({pathname:"/users",search:"?".concat(e)})}),[x,j,t]),(0,d.jsx)(m,{followProgressingUsers:a,users:e,page:t,setPortionNumber:p,totalCount:l,count:n,isFetching:i,setPage:u,portion:c,portionNumber:f,followUnfollow:b,isAuth:g,setUsers:s,setFilterFriend:y,setFilterTerm:h,term:x,friend:j,findFilterUsers:F})}))},4657:function(r,e,t){r.exports=t.p+"static/media/avatar.5cc100f95b621ce4f01b.jpg"}}]);
//# sourceMappingURL=466.321df9f9.chunk.js.map