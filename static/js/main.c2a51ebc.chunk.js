(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(38)},18:function(e,t,n){},19:function(e,t,n){},20:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(11),l=n.n(c),o=(n(18),n(5)),u=(n(19),n(2)),i=function(e){return{opacity:e?1:0}};function s(e){var t=e.imageURI,n=e.breed,c=Object(a.useState)(!1),l=Object(o.a)(c,2),s=l[0],m=l[1];return r.a.createElement("figure",{key:t},!s&&r.a.createElement("div",{className:"loading"},r.a.createElement("span",{role:"img","aria-label":"loading"},"\ud83d\udc36")),r.a.createElement("img",{style:Object(u.a)({},i(s),{transition:"800ms"}),onLoad:function(e){return m(!0)},alt:n.getOrElse(""),src:t}))}n(20);var m=null,d=function(e){return function(t){return t.fold(function(e){return r.a.createElement("h3",{className:"error"},e)},function(t){return r.a.createElement("ul",null,t.slice(0,12).map(function(t){return r.a.createElement("li",{key:t},r.a.createElement(s,{imageURI:t,breed:e}))}))})}};function f(e){var t=e.images,n=e.breed;return r.a.createElement("section",{className:"gallery-container"},t.fold(m,d(n)))}var E=n(12),b=n.n(E),h=(n(32),r.a.createElement("h2",{className:"loading"},"Loading...")),g=function(e,t,n){return function(a){return a.fold(function(e){return r.a.createElement("h3",{className:"error"},e)},function(a){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.filter(function(t){return(n=e,new RegExp(b()(n),"gi")).test(t);var n});return c.length?r.a.createElement("ul",null,c.slice(0,12).map(function(e){var a=e===n.getOrElse("");return r.a.createElement("li",{key:e},r.a.createElement("button",{type:"button",onClick:t(e),"aria-pressed":a,className:a?"active":"",id:e},e))})):r.a.createElement("h2",{className:"no-match"},"No breed matches found.")})}};function p(e){var t=e.breeds,n=e.query,a=e.handleSelect,c=e.selectedBreed;return r.a.createElement("nav",{className:"nav-container"},t.fold(h,g(n,a,c)))}n(33);function y(e){var t=e.query,n=e.onQueryChange;return r.a.createElement("span",{className:"search-container"},r.a.createElement("input",{"aria-label":"search",value:t,onChange:n,className:"search-input",type:"text"}),0===t.length&&r.a.createElement("span",{className:"search-placeholder"},r.a.createElement("span",{role:"img","aria-label":"detective"},"\ud83d\udd75\ufe0f\u200d\u2640\ufe0f")," ","Search"))}var j=n(3),v=n(1),O={breeds:v.none,images:v.none,query:"",selectedBreed:v.none},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_BREEDS":return Object(u.a)({},e,{breeds:t.payload});case"SET_QUERY":return Object(u.a)({},e,{query:t.payload});case"SET_SELECTED_BREED":return Object(u.a)({},e,{selectedBreed:t.payload});case"SET_IMAGES":return Object(u.a)({},e,{images:t.payload});default:return e}},N=function(){Object(a.useEffect)(function(){fetch("https://dog.ceo/api/breeds/list/all").then(function(e){return e.json()}).then(function(e){var t=e.message;return"object"===typeof t?Object(v.some)(Object(j.right)(Object.keys(t))):Object(v.some)(Object(j.left)("Failed to fetch dog breeds!"))}).catch(function(e){return Object(v.some)(Object(j.left)("Something went wrong!"))}).then(function(e){return s(function(e){return{type:"SET_BREEDS",payload:e}}(e))})},[]);var e=Object(a.useReducer)(S,O),t=Object(o.a)(e,2),n=t[0],c=n.breeds,l=n.images,u=n.query,i=n.selectedBreed,s=t[1];return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"header-wrapper"},r.a.createElement("header",{className:"container"},r.a.createElement("h1",null,"Dogs!"),r.a.createElement(y,{query:u,onQueryChange:function(e){s({type:"SET_QUERY",payload:e.target.value})}}))),r.a.createElement("main",{className:"container"},r.a.createElement(p,{selectedBreed:i,breeds:c,query:u,handleSelect:function(e){return function(t){s(function(e){return{type:"SET_SELECTED_BREED",payload:e}}(Object(v.some)(e))),function(e){return fetch("https://dog.ceo/api/breed/".concat(e,"/images")).then(function(e){return e.json()}).then(function(e){var t=e.message;return Array.isArray(t)?Object(v.some)(Object(j.right)(t)):Object(v.some)(Object(j.left)("Failed to fetch images!"))}).catch(function(e){return Object(v.some)(Object(j.left)("Something went wrong!"))})}(e).then(function(e){return s(function(e){return{type:"SET_IMAGES",payload:e}}(e))})}}}),r.a.createElement(f,{breed:i,images:l})))};l.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.c2a51ebc.chunk.js.map