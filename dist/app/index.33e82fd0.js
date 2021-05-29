function t(t,e,n,r){Object.defineProperty(t,e,{get:n,set:r,enumerable:!0,configurable:!0})}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=e.parcelRequire4a09;null==o&&((o=function(t){if(t in n)return n[t].exports;if(t in r){let e=r[t];delete r[t];let o={id:t,exports:{}};return n[t]=o,e.call(o.exports,o,o.exports),o.exports}var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}).register=function(t,e){r[t]=e},e.parcelRequire4a09=o),o.register("3Kbcj",(function(e,n){t(e.exports,"default",(()=>T));var r=o("73eJY"),i=Object.prototype.toString,a=Array.isArray||function(t){return"[object Array]"===i.call(t)};
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */function c(t){return"function"==typeof t}function s(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function u(t,e){return null!=t&&"object"==typeof t&&e in t}var l=RegExp.prototype.test;var p=/\S/;function f(t){return!function(t,e){return l.call(t,e)}(p,t)}var d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};var h=/\s*/,v=/\s+/,g=/\s*=/,y=/\s*\}/,m=/#|\^|\/|>|\{|&|=|!/;function w(t){this.string=t,this.tail=t,this.pos=0}function b(t,e){this.view=t,this.cache={".":this.view},this.parent=e}function k(){this.templateCache={_cache:{},set:function(t,e){this._cache[t]=e},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}w.prototype.eos=function(){return""===this.tail},w.prototype.scan=function(t){var e=this.tail.match(t);if(!e||0!==e.index)return"";var n=e[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},w.prototype.scanUntil=function(t){var e,n=this.tail.search(t);switch(n){case-1:e=this.tail,this.tail="";break;case 0:e="";break;default:e=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=e.length,e},b.prototype.push=function(t){return new b(t,this)},b.prototype.lookup=function(t){var e,n,r,o=this.cache;if(o.hasOwnProperty(t))e=o[t];else{for(var i,a,s,l=this,p=!1;l;){if(t.indexOf(".")>0)for(i=l.view,a=t.split("."),s=0;null!=i&&s<a.length;)s===a.length-1&&(p=u(i,a[s])||(n=i,r=a[s],null!=n&&"object"!=typeof n&&n.hasOwnProperty&&n.hasOwnProperty(r))),i=i[a[s++]];else i=l.view[t],p=u(l.view,t);if(p){e=i;break}l=l.parent}o[t]=e}return c(e)&&(e=e.call(this.view)),e},k.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},k.prototype.parse=function(t,e){var n=this.templateCache,r=t+":"+(e||x.tags).join(":"),o=void 0!==n,i=o?n.get(r):void 0;return null==i&&(i=function(t,e){if(!t)return[];var n,r,o,i=!1,c=[],u=[],l=[],p=!1,d=!1,b="",k=0;function C(){if(p&&!d)for(;l.length;)delete u[l.pop()];else l=[];p=!1,d=!1}function T(t){if("string"==typeof t&&(t=t.split(v,2)),!a(t)||2!==t.length)throw new Error("Invalid tags: "+t);n=new RegExp(s(t[0])+"\\s*"),r=new RegExp("\\s*"+s(t[1])),o=new RegExp("\\s*"+s("}"+t[1]))}T(e||x.tags);for(var E,M,L,j,U,I,H=new w(t);!H.eos();){if(E=H.pos,L=H.scanUntil(n))for(var O=0,S=L.length;O<S;++O)f(j=L.charAt(O))?(l.push(u.length),b+=j):(d=!0,i=!0,b+=" "),u.push(["text",j,E,E+1]),E+=1,"\n"===j&&(C(),b="",k=0,i=!1);if(!H.scan(n))break;if(p=!0,M=H.scan(m)||"name",H.scan(h),"="===M?(L=H.scanUntil(g),H.scan(g),H.scanUntil(r)):"{"===M?(L=H.scanUntil(o),H.scan(y),H.scanUntil(r),M="&"):L=H.scanUntil(r),!H.scan(r))throw new Error("Unclosed tag at "+H.pos);if(U=">"==M?[M,L,E,H.pos,b,k,i]:[M,L,E,H.pos],k++,u.push(U),"#"===M||"^"===M)c.push(U);else if("/"===M){if(!(I=c.pop()))throw new Error('Unopened section "'+L+'" at '+E);if(I[1]!==L)throw new Error('Unclosed section "'+I[1]+'" at '+E)}else"name"===M||"{"===M||"&"===M?d=!0:"="===M&&T(L)}if(C(),I=c.pop())throw new Error('Unclosed section "'+I[1]+'" at '+H.pos);return function(t){for(var e,n=[],r=n,o=[],i=0,a=t.length;i<a;++i)switch((e=t[i])[0]){case"#":case"^":r.push(e),o.push(e),r=e[4]=[];break;case"/":o.pop()[5]=e[2],r=o.length>0?o[o.length-1][4]:n;break;default:r.push(e)}return n}(function(t){for(var e,n,r=[],o=0,i=t.length;o<i;++o)(e=t[o])&&("text"===e[0]&&n&&"text"===n[0]?(n[1]+=e[1],n[3]=e[3]):(r.push(e),n=e));return r}(u))}(t,e),o&&n.set(r,i)),i},k.prototype.render=function(t,e,n,r){var o=this.getConfigTags(r),i=this.parse(t,o),a=e instanceof b?e:new b(e,void 0);return this.renderTokens(i,a,n,t,r)},k.prototype.renderTokens=function(t,e,n,r,o){for(var i,a,c,s="",u=0,l=t.length;u<l;++u)c=void 0,"#"===(a=(i=t[u])[0])?c=this.renderSection(i,e,n,r,o):"^"===a?c=this.renderInverted(i,e,n,r,o):">"===a?c=this.renderPartial(i,e,n,o):"&"===a?c=this.unescapedValue(i,e):"name"===a?c=this.escapedValue(i,e,o):"text"===a&&(c=this.rawValue(i)),void 0!==c&&(s+=c);return s},k.prototype.renderSection=function(t,e,n,r,o){var i=this,s="",u=e.lookup(t[1]);if(u){if(a(u))for(var l=0,p=u.length;l<p;++l)s+=this.renderTokens(t[4],e.push(u[l]),n,r,o);else if("object"==typeof u||"string"==typeof u||"number"==typeof u)s+=this.renderTokens(t[4],e.push(u),n,r,o);else if(c(u)){if("string"!=typeof r)throw new Error("Cannot use higher-order sections without the original template");null!=(u=u.call(e.view,r.slice(t[3],t[5]),(function(t){return i.render(t,e,n,o)})))&&(s+=u)}else s+=this.renderTokens(t[4],e,n,r,o);return s}},k.prototype.renderInverted=function(t,e,n,r,o){var i=e.lookup(t[1]);if(!i||a(i)&&0===i.length)return this.renderTokens(t[4],e,n,r,o)},k.prototype.indentPartial=function(t,e,n){for(var r=e.replace(/[^ \t]/g,""),o=t.split("\n"),i=0;i<o.length;i++)o[i].length&&(i>0||!n)&&(o[i]=r+o[i]);return o.join("\n")},k.prototype.renderPartial=function(t,e,n,r){if(n){var o=this.getConfigTags(r),i=c(n)?n(t[1]):n[t[1]];if(null!=i){var a=t[6],s=t[5],u=t[4],l=i;0==s&&u&&(l=this.indentPartial(i,u,a));var p=this.parse(l,o);return this.renderTokens(p,e,n,l,r)}}},k.prototype.unescapedValue=function(t,e){var n=e.lookup(t[1]);if(null!=n)return n},k.prototype.escapedValue=function(t,e,n){var r=this.getConfigEscape(n)||x.escape,o=e.lookup(t[1]);if(null!=o)return"number"==typeof o&&r===x.escape?String(o):r(o)},k.prototype.rawValue=function(t){return t[1]},k.prototype.getConfigTags=function(t){return a(t)?t:t&&"object"==typeof t?t.tags:void 0},k.prototype.getConfigEscape=function(t){return t&&"object"==typeof t&&!a(t)?t.escape:void 0};var x={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){C.templateCache=t},get templateCache(){return C.templateCache}},C=new k;x.clearCache=function(){return C.clearCache()},x.parse=function(t,e){return C.parse(t,e)},x.render=function(t,e,n,o){if("string"!=typeof t)throw new TypeError('Invalid template! Template should be a "string" but "'+((a(i=t)?"array":r.default(i))+'" was given as the first argument for mustache#render(template, view, partials)'));var i;return C.render(t,e,n,o)},x.escape=function(t){return String(t).replace(/[&<>"'`=\/]/g,(function(t){return d[t]}))},x.Scanner=w,x.Context=b,x.Writer=k;var T=x})),o.register("73eJY",(function(e,n){function r(t){return t&&t.constructor===Symbol?"symbol":typeof t}t(e.exports,"default",(()=>r))}));var i=o("3Kbcj"),a={};a.get={innerHTML:function(t){return t.innerHTML},textContent:function(t){return t.textContent},value:function(t){return t.value},template:function(t){var e="[data-for='".concat(t.id||t.name,"']"),n=document.querySelector(e).innerHTML;return i.default.render(n,{})}},a.set={innerHTML:function(t,e){return t.innerHTML=e,"target HTML is now ".concat(e)},textContent:function(t,e){return t.textContent=e,"target text is now ".concat(e)},value:function(t,e){return t.value=e,"target value is now ".concat(e)}},a.add={innerHTML:function(t,e){t.innerHTML=t.innerHTML+e},textContent:function(t,e){t.textContent=t.textContent+e},value:function(t,e){t.value=t.value+e}};var c=function(){var t;null===(t=document.getElementById("ModalWrapper"))||void 0===t||t.remove()};a.modal=function(t){s.click.closeModal=s.click.closeModal||c;var e='<div data-click="closeModal" id="ModalContent">'.concat(t,"</div>"),n=document.createElement("div");n.id="ModalWrapper",n.dataset.click="closeModal",n.innerHTML=e,document.body.appendChild(n)},a.alert=function(t){var e='<h1>Alert</h1><hr><div id="Alert">'.concat(t,'<hr><button data-click="closeModal">Okay</button></div>');a.modal(e)},a.warning=function(t){var e='<h1>Warning</h1><hr><div id="Warning">'.concat(t,'<hr><button data-click="closeModal">Okay</button></div>');return a.modal(e),!1},a.confirm=function(t,e,n){var r='<h1>Confirm</h1><hr>\n                    <div id="Confirm">'.concat(t,'<hr>\n                    <button data-click="confirmYes">Yes</button>\n                    <button data-click="confirmNo">No</button>\n                    </div>');s.click.confirmYes=function(){c(),null==e||e()},s.click.confirmNo=function(){c(),null==n||n()},a.modal(r)},a.textInput=function(t){s.click.processTextInput=function(e){var n=document.getElementById("TextInput").value;c(),t.call(e.target,n)},a.modal('<h2>Input Text</h2>\n                    <textarea id="TextInput" class="modal-input">Copy/Paste Here</textarea>\n                    <hr>\n                    <button data-click="processTextInput">Continue</button>\n                    ')};var s={click:{},change:{},keyup:{},actions:{}};document.body.addEventListener("keyup",(function(t){var e,n=t.target,r=s.keyup[n.dataset.keyup];null===(e=r)||void 0===e||e.call(r,n,t)})),document.body.addEventListener("change",(function(t){var e,n=t.target,r=s.change[n.dataset.change];null===(e=r)||void 0===e||e.call(r,n,t)})),document.body.addEventListener("click",(function(t){var e,n=t.target,r=s.click[n.dataset.click];null===(e=r)||void 0===e||e.call(r,n,t)})),document.body.onload=function(){};
//# sourceMappingURL=index.33e82fd0.js.map
