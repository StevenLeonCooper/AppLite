var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n={},r=t.parcelRequire4a09;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in n){let r=n[t];delete n[t];let s={id:t,exports:{}};return e[t]=s,r.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){n[t]=e},t.parcelRequire4a09=r);class s{close(){this.element.remove()}show(){let t=`<div id="ModalContent">${this.content}</div>`;this.element.innerHTML=t,document.body.appendChild(this.element)}alert(){let t=`<h1>Alert</h1><hr>\n                            <div id="Alert">${this.content}<hr>\n                            <button data-mclick="close" id="CloseModal">Okay</button>\n                            </div>`;this.content=t,this.show()}warn(){let t=`<h1>Warning</h1><hr>\n                        <div id="Warning">${this.content}<hr>\n                        <button data-mclick="close" id="CloseModal">Okay</button>\n                        </div>`;return this.content=t,this.show(),!1}confirm(t,e){let n=`<h1>Confirm</h1><hr>\n                        <div id="Confirm">${this.content}<hr>\n                            <button data-mclick="confirmYes">Yes</button>\n                            <button data-mclick="confirmNo">No</button>\n                        </div>`;this.content=n,this.callbacks.confirmYes=()=>{this.close(),null==t||t()},this.callbacks.confirmNo=()=>{this.close(),null==e||e()},this.show()}textInput(t){this.content='<h2>Input Text</h2>\n        <textarea id="TextInput" class="modal-input">Copy/Paste Here</textarea><hr>\n        <button data-mclick="processTextInput">Continue</button>',this.callbacks.processTextInput=e=>{let n=document.getElementById("TextInput").value;this.close(),t.call(e.target,n)},this.show()}constructor(t){let e=document.createElement("div");this.element=e,this.content=t,this.callbacks={close:()=>{this.element.remove()}},e.id="ModalWrapper",e.dataset.mclick="close",e.addEventListener("click",((t,e)=>{var n,r,s;let i=null===(n=t.target)||void 0===n||null===(r=n.dataset)||void 0===r?void 0:r.mclick;var a=this.callbacks[i];null===(s=a)||void 0===s||s.call(a,t.target)}))}}const i={click:{},change:{},keyup:{},actions:{}};class a{from(t){return this.url=t,this}to(t){return this.from(t),this}using(t){return this.data=t,this}then(t){return this.thenHandler=t,this}catch(t){return this.catchHandler=t,this}_processReturn(t){return"JSON"==this.returnType?JSON.parse(t):"HTML"==this.returnType?t:void 0}_prepHeaders(){if("POST"===this.requestType&&this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),"GET"===this.requestType){var t=Object.keys(this.data).map((t=>`${t}=${this.data[t]}`)).join("&");this.url=`${this.url}?${t}`}}async send(){return this._prepHeaders(),new Promise(((t,e)=>{const n=this;n.xhr.open(n.requestType,n.url,!0),n.xhr.onload=function(){if(this.status>=200&&this.status<400){var r=n._processReturn(this.response);t(r)}e("Moderate Error")},n.xhr.onerror=function(){e("Serious Error")},n.xhr.send(n.data)}))}now(){this._prepHeaders();new Promise(((t,e)=>{const n=this;n.xhr.open(n.requestType,n.url,!0),n.xhr.onload=function(){if(this.status>=200&&this.status<400){var r=n._processReturn(this.response);t(r)}e("Moderate Error")},n.xhr.onerror=function(){e("Serious Error")},n.xhr.send(n.data)})).then(this.thenHandler).catch(this.catchHandler);return this}constructor(t,e,n,r){return"object"==typeof t&&1==arguments.length?Object.assign(this,t):(this.requestType=null!=t?t:"GET",this.returnType=null!=e?e:"JSON",this.url=null!=n?n:"",this.data=null!=r?r:{}),this.thenHandler=()=>{},this.catchHandler=()=>{},this.xhr=new XMLHttpRequest,this}}class o extends a{constructor(t){super("GET",t,null,null)}}const l=t=>new o("HTML").from(t).send(),c=t=>new o("JSON").from(t).send();r.register("4zBgM",(function(t,e){var n,r,s,i;n=t.exports,r="default",s=()=>E,Object.defineProperty(n,r,{get:s,set:i,enumerable:!0,configurable:!0});
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var a=Object.prototype.toString,o=Array.isArray||function(t){return"[object Array]"===a.call(t)};function l(t){return"function"==typeof t}function c(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function h(t,e){return null!=t&&"object"==typeof t&&e in t}var u=RegExp.prototype.test;var d=/\S/;function p(t){return!function(t,e){return u.call(t,e)}(d,t)}var f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};var v=/\s*/,g=/\s+/,m=/\s*=/,b=/\s*\}/,y=/#|\^|\/|>|\{|&|=|!/;function w(t){this.string=t,this.tail=t,this.pos=0}function x(t,e){this.view=t,this.cache={".":this.view},this.parent=e}function T(){this.templateCache={_cache:{},set:function(t,e){this._cache[t]=e},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}w.prototype.eos=function(){return""===this.tail},w.prototype.scan=function(t){var e=this.tail.match(t);if(!e||0!==e.index)return"";var n=e[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},w.prototype.scanUntil=function(t){var e,n=this.tail.search(t);switch(n){case-1:e=this.tail,this.tail="";break;case 0:e="";break;default:e=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=e.length,e},x.prototype.push=function(t){return new x(t,this)},x.prototype.lookup=function(t){var e,n,r,s=this.cache;if(s.hasOwnProperty(t))e=s[t];else{for(var i,a,o,c=this,u=!1;c;){if(t.indexOf(".")>0)for(i=c.view,a=t.split("."),o=0;null!=i&&o<a.length;)o===a.length-1&&(u=h(i,a[o])||(n=i,r=a[o],null!=n&&"object"!=typeof n&&n.hasOwnProperty&&n.hasOwnProperty(r))),i=i[a[o++]];else i=c.view[t],u=h(c.view,t);if(u){e=i;break}c=c.parent}s[t]=e}return l(e)&&(e=e.call(this.view)),e},T.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},T.prototype.parse=function(t,e){var n=this.templateCache,r=t+":"+(e||k.tags).join(":"),s=void 0!==n,i=s?n.get(r):void 0;return null==i&&(i=function(t,e){if(!t)return[];var n,r,s,i=!1,a=[],l=[],h=[],u=!1,d=!1,f="",x=0;function T(){if(u&&!d)for(;h.length;)delete l[h.pop()];else h=[];u=!1,d=!1}function C(t){if("string"==typeof t&&(t=t.split(g,2)),!o(t)||2!==t.length)throw new Error("Invalid tags: "+t);n=new RegExp(c(t[0])+"\\s*"),r=new RegExp("\\s*"+c(t[1])),s=new RegExp("\\s*"+c("}"+t[1]))}C(e||k.tags);for(var E,O,j,U,H,M,S=new w(t);!S.eos();){if(E=S.pos,j=S.scanUntil(n))for(var P=0,R=j.length;P<R;++P)p(U=j.charAt(P))?(h.push(l.length),f+=U):(d=!0,i=!0,f+=" "),l.push(["text",U,E,E+1]),E+=1,"\n"===U&&(T(),f="",x=0,i=!1);if(!S.scan(n))break;if(u=!0,O=S.scan(y)||"name",S.scan(v),"="===O?(j=S.scanUntil(m),S.scan(m),S.scanUntil(r)):"{"===O?(j=S.scanUntil(s),S.scan(b),S.scanUntil(r),O="&"):j=S.scanUntil(r),!S.scan(r))throw new Error("Unclosed tag at "+S.pos);if(H=">"==O?[O,j,E,S.pos,f,x,i]:[O,j,E,S.pos],x++,l.push(H),"#"===O||"^"===O)a.push(H);else if("/"===O){if(!(M=a.pop()))throw new Error('Unopened section "'+j+'" at '+E);if(M[1]!==j)throw new Error('Unclosed section "'+M[1]+'" at '+E)}else"name"===O||"{"===O||"&"===O?d=!0:"="===O&&C(j)}if(T(),M=a.pop())throw new Error('Unclosed section "'+M[1]+'" at '+S.pos);return function(t){for(var e,n=[],r=n,s=[],i=0,a=t.length;i<a;++i)switch((e=t[i])[0]){case"#":case"^":r.push(e),s.push(e),r=e[4]=[];break;case"/":s.pop()[5]=e[2],r=s.length>0?s[s.length-1][4]:n;break;default:r.push(e)}return n}(function(t){for(var e,n,r=[],s=0,i=t.length;s<i;++s)(e=t[s])&&("text"===e[0]&&n&&"text"===n[0]?(n[1]+=e[1],n[3]=e[3]):(r.push(e),n=e));return r}(l))}(t,e),s&&n.set(r,i)),i},T.prototype.render=function(t,e,n,r){var s=this.getConfigTags(r),i=this.parse(t,s),a=e instanceof x?e:new x(e,void 0);return this.renderTokens(i,a,n,t,r)},T.prototype.renderTokens=function(t,e,n,r,s){for(var i,a,o,l="",c=0,h=t.length;c<h;++c)o=void 0,"#"===(a=(i=t[c])[0])?o=this.renderSection(i,e,n,r,s):"^"===a?o=this.renderInverted(i,e,n,r,s):">"===a?o=this.renderPartial(i,e,n,s):"&"===a?o=this.unescapedValue(i,e):"name"===a?o=this.escapedValue(i,e,s):"text"===a&&(o=this.rawValue(i)),void 0!==o&&(l+=o);return l},T.prototype.renderSection=function(t,e,n,r,s){var i=this,a="",c=e.lookup(t[1]);if(c){if(o(c))for(var h=0,u=c.length;h<u;++h)a+=this.renderTokens(t[4],e.push(c[h]),n,r,s);else if("object"==typeof c||"string"==typeof c||"number"==typeof c)a+=this.renderTokens(t[4],e.push(c),n,r,s);else if(l(c)){if("string"!=typeof r)throw new Error("Cannot use higher-order sections without the original template");null!=(c=c.call(e.view,r.slice(t[3],t[5]),(function(t){return i.render(t,e,n,s)})))&&(a+=c)}else a+=this.renderTokens(t[4],e,n,r,s);return a}},T.prototype.renderInverted=function(t,e,n,r,s){var i=e.lookup(t[1]);if(!i||o(i)&&0===i.length)return this.renderTokens(t[4],e,n,r,s)},T.prototype.indentPartial=function(t,e,n){for(var r=e.replace(/[^ \t]/g,""),s=t.split("\n"),i=0;i<s.length;i++)s[i].length&&(i>0||!n)&&(s[i]=r+s[i]);return s.join("\n")},T.prototype.renderPartial=function(t,e,n,r){if(n){var s=this.getConfigTags(r),i=l(n)?n(t[1]):n[t[1]];if(null!=i){var a=t[6],o=t[5],c=t[4],h=i;0==o&&c&&(h=this.indentPartial(i,c,a));var u=this.parse(h,s);return this.renderTokens(u,e,n,h,r)}}},T.prototype.unescapedValue=function(t,e){var n=e.lookup(t[1]);if(null!=n)return n},T.prototype.escapedValue=function(t,e,n){var r=this.getConfigEscape(n)||k.escape,s=e.lookup(t[1]);if(null!=s)return"number"==typeof s&&r===k.escape?String(s):r(s)},T.prototype.rawValue=function(t){return t[1]},T.prototype.getConfigTags=function(t){return o(t)?t:t&&"object"==typeof t?t.tags:void 0},T.prototype.getConfigEscape=function(t){return t&&"object"==typeof t&&!o(t)?t.escape:void 0};var k={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){C.templateCache=t},get templateCache(){return C.templateCache}},C=new T;k.clearCache=function(){return C.clearCache()},k.parse=function(t,e){return C.parse(t,e)},k.render=function(t,e,n,r){if("string"!=typeof t)throw new TypeError('Invalid template! Template should be a "string" but "'+((o(s=t)?"array":typeof s)+'" was given as the first argument for mustache#render(template, view, partials)'));var s;return C.render(t,e,n,r)},k.escape=function(t){return String(t).replace(/[&<>"'`=\/]/g,(function(t){return f[t]}))},k.Scanner=w,k.Context=x,k.Writer=T;var E=k}));var h=r("4zBgM");class u{enhanceContext(t){Object.assign(this.context,t)}async importPartial(t,e){const n=this;t=null!=t?t:n.htmlUrl;try{let r=await l(t);return n.html=r,n.autoRender&&1!=e&&n.render(n.target),r}catch(t){return t}}async importContext(t,e){const n=this;t=null!=t?t:n.dataUrl;try{let r=await c(t);return n.context=r,n.autoRender&&1!=e&&n.render(n.target),r}catch(t){return t}}async importPackage(t,e){let n=this;return t=null!=t?t:n.dataUrl,e=null!=e?e:n.templateUrl,await this.importPartial(e,!0),await this.importContext(t,!0),n.autoRender&&n.render(n.target),n}load(t){let e=document.querySelector(t);var n;let r=null!==(n=e.dataset.engine)&&void 0!==n?n:"default";var s;return this.html=null!==(s=e.innerHTML)&&void 0!==s?s:"<em>No Template Found</em>",this.engine=r,this.autoRender&&this.render(this.target),this}render(t){var e;let n=document.querySelector(t);var r=this.engines[this.engine];let s=null===(e=r)||void 0===e?void 0:e.call(r);return this.rendered=s,(null==n?void 0:n.innerHTML)&&(n.innerHTML=s),console.log("Rendered HTML to Page"),this.rendered}constructor(t){var e,n,r,s,i,a;"object"==typeof t&&Object.assign(this,t),this.context=this.context||{},this.html=null!==(e=this.html)&&void 0!==e?e:"",this.engine=null!==(n=this.engine)&&void 0!==n?n:"default",this.target=null!==(r=this.target)&&void 0!==r?r:"#NoTargetSelected",this.rendered=null!==(s=this.rendered)&&void 0!==s?s:"",this.dataUrl=null!==(i=this.dataUrl)&&void 0!==i?i:null,this.htmlUrl=null!==(a=this.htmlUrl)&&void 0!==a?a:null,this.autoRender=this.autoRender||!1,this.engines={default:()=>this.html,mustache:()=>h.default.render(this.html,this.context)}}}class d{stop(){return this.result=performance.now()-this.start,this}get detailedResults(){return`Task "${this.name}" executed in ${this.result} ms.`}constructor(t){this.name=t,this.start=performance.now(),this.result=0}}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}h=r("4zBgM");class f{send(){this.subscribers.forEach((t=>{var e;null===(e=t.receive)||void 0===e||e.call(t,this.getData())}))}receive(t){this.setData(t)}getData(){}setData(){}subscribe(t){var e;this.subscribers.push(t),null===(e=t.subscriptions)||void 0===e||e.push(this)}unsubscribe(t){this.subscribers=this.subscribers.filter((e=>e==t)),t.subscriptions=t.subscriptions.filter((t=>t==this))}constructor(){this.subscribers=[],this.subscriptions=[]}}class v extends f{setData(t){var e;var n=this[`render_${this.target}`]?.bind(this);null===(e=n)||void 0===e||e.call(n,t)}getData(){var t;let e=null!==(t=this.element[this.target])&&void 0!==t?t:null,n={};var r;return n[null!==(r=this.subContext)&&void 0!==r?r:"data"]=e,n}setContext(t){this.subscriptions=[t]}render_innerHTML(t){var e;t=null!==(e=t[this.subContext])&&void 0!==e?e:t,this.element.innerHTML=t}render_template(t){var e;t=null!==(e=t[this.subContext])&&void 0!==e?e:t,this.template&&(this.element.innerHTML=h.default.render(this.template,t))}render_value(t){var e;t=null!==(e=t[this.subContext])&&void 0!==e?e:t,this.element.value=t}send(){if(!0===this.quiet)return!1;super.send()}constructor(t){var e,n;super();let r=null===(e=t.dataset.bind)||void 0===e?void 0:e.split(":");this.quiet=!1,this.element=t,this.action=null==r?void 0:r[0],this.target=null==r?void 0:r[1],this.subContext=t.dataset.context,this.template=null===(n=this.element.querySelector("template"))||void 0===n?void 0:n.innerHTML,t.dataset.bindOn&&t.addEventListener(t.dataset.bindOn,this.send.bind(this))}}class g extends f{getData(){return this.data}setData(t){this.data=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){p(t,e,n[e])}))}return t}({},this.data,t),this.send()}replaceData(t){this.data=t,this.send()}send(){if(!0===this.quiet)return!1;super.send()}constructor(t){super(),this.data=t,this.quiet=!1}}const m={models:[],views:[]};m.setup=async t=>{m.models.push(await(async t=>{try{if("object"==typeof t)return new g(t);let e=await c(t);return new g(e)}catch(t){return t}})(t)),m.views=(()=>{try{let t=[];return document.querySelectorAll("[data-bind]").forEach((e=>{t.push(new v(e))})),t}catch(t){return[t]}})(m.pageContext),m.models.forEach((t=>{var e,n;e=m.views,n=t,e.forEach((t=>{"receive"===t.action&&n.subscribe(t),t.receive(n.getData())}))})),m.views.forEach((t=>{var e,n;e=m.models,n=t,e.forEach((t=>{"send"===n.action&&n.subscribe(t)}))}))},m.update=t=>{t.send()},m.updateAll=()=>{m.models.forEach((t=>{t.send()})),m.views.forEach((t=>{t.send()}))};document.body.addEventListener("keyup",(t=>{var e;let n=t.target;var r=i.keyup[n.dataset.keyup];null===(e=r)||void 0===e||e.call(r,n,t)})),document.body.addEventListener("change",(t=>{var e;let n=t.target;var r=i.change[n.dataset.change];null===(e=r)||void 0===e||e.call(r,n,t)})),document.body.addEventListener("click",(t=>{var e;let n=t.target;var r=i.click[n.dataset.click];null===(e=r)||void 0===e||e.call(r,n,t)})),document.body.onload=()=>{new u({engine:"mustache",autoRender:!0,dataUrl:"api/test.json",htmlUrl:"api/partial.html",target:"#TestArea"}).importPackage().catch((t=>{console.log(t)})),c("api/test.json").then((t=>{console.log(`We got this text: ${t.someText}`)})).catch((t=>{console.log(t)})),i.click.hello=async function(){try{let t="api/greeting.html",e=await l(t);new s(e).show()}catch(t){console.log(t)}};let t=new d("Doing Stuff");(async function(t){let e=await c(`api/test.json?_=${Math.random()}`);console.log(e)})().then((()=>{t.stop(),console.log(t.detailedResults)})),m.setup("api/test.json")};
//# sourceMappingURL=index.8dc764a1.js.map
