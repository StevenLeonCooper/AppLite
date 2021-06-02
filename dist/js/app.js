(function () {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire4a09"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      let init = $parcel$inits[id];
      delete $parcel$inits[id];
      let module = {id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire4a09"] = parcelRequire;
}
class $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9 {
    constructor(content){
        let modalWindow = document.createElement("div");
        this.element = modalWindow;
        this.content = content;
        this.callbacks = {
            close: ()=>{
                this.element.remove();
            }
        };
        modalWindow.id = "ModalWrapper";
        modalWindow.dataset.mclick = "close";
        modalWindow.addEventListener("click", (e, z)=>{
            var ref, ref1, ref2;
            let action = (ref = e.target) === null || ref === void 0 ? void 0 : (ref1 = ref.dataset) === null || ref1 === void 0 ? void 0 : ref1.mclick;
            var _callbacks = this.callbacks[action];
            (ref2 = _callbacks) === null || ref2 === void 0 ? void 0 : ref2.call(_callbacks, e.target);
        });
    }
    /**
     * - Closes the active modal window.
     */ close() {
        this.element.remove();
    }
    /**
     * - Render the modal window to the page. 
     */ show() {
        let modalContent = `<div id="ModalContent">${this.content}</div>`;
        this.element.innerHTML = modalContent;
        document.body.appendChild(this.element);
    }
    /**
     * This implementation simply uses an alternate template for the content.
     */ alert() {
        let template = `<h1>Alert</h1><hr>\n                            <div id="Alert">${this.content}<hr>\n                            <button data-mclick="close" id="CloseModal">Okay</button>\n                            </div>`;
        this.content = template;
        this.show();
    }
    /**
     * This implementation includes warning text and returns false. 
     */ warn() {
        let template = `<h1>Warning</h1><hr>\n                        <div id="Warning">${this.content}<hr>\n                        <button data-mclick="close" id="CloseModal">Okay</button>\n                        </div>`;
        this.content = template;
        this.show();
        return false;
    }
    /**
     * - This implementation creates a confirm/decline dialogue and invokes callbacks for each. 
     * @param {function} ifYes 
     * @param {function} ifNo 
     * @returns - a promise object
     */ async confirm() {
        const self = this;
        return new Promise((resolve, reject)=>{
            try {
                let template = `<h1>Confirm</h1><hr>\n                                <div id="Confirm">${this.content}<hr>\n                                    <button data-mclick="confirmYes">Yes</button>\n                                    <button data-mclick="confirmNo">No</button>\n                                </div>`;
                self.content = template;
                self.callbacks.confirmYes = ()=>{
                    try {
                        self.close();
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                };
                self.callbacks.confirmNo = ()=>{
                    try {
                        self.close();
                        resolve(false);
                    } catch (error) {
                        reject(error);
                    }
                };
                self.show();
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * This implementation provides text input for the user and then sends it to the provided callback for use. 
     * @returns - a promise object
     */ async textInput() {
        const self = this;
        return new Promise((resolve, reject)=>{
            try {
                let template = `<h2>Input Text</h2>\n                                <textarea id="TextInput" class="modal-input">Write Text Here</textarea><hr>\n                                <button data-mclick="processTextInput">Continue</button>`;
                self.content = template;
                self.callbacks.processTextInput = (e)=>{
                    try {
                        let text = document.getElementById("TextInput").value;
                        self.close();
                        resolve(text);
                    } catch (error) {
                        reject(error);
                    }
                };
                this.show();
            } catch (error) {
                reject(error);
            }
        });
    }
}


const $4bbe31d86c558e6f197455fd06e731cb$export$fc4ac6ce2f1d593c = {
    click: {
    },
    change: {
    },
    keyup: {
    },
    actions: {
    }
};
/**
 * - Trigger an event (like jQuery's $().trigger)
 * @param {string} name 
 * @param {object} data 
 * @param {HTMLElement} element 
 */ const $4bbe31d86c558e6f197455fd06e731cb$var$triggerEvent = (name, data, element)=>{
    var ref;
    let eventData = {
        detail: data
    };
    let event = new CustomEvent(name, eventData);
    element = element !== null && element !== void 0 ? element : document;
    (ref = element.dispatchEvent) === null || ref === void 0 ? void 0 : ref.call(element, event, eventData);
};
/**
 * - Trigger an event on all elements that match a query. 
 * @param {string} name 
 * @param {object} data 
 * @param {string} selector - Query that will return multiple elements
 */ const $4bbe31d86c558e6f197455fd06e731cb$var$triggerEventAll = (name, data, selector)=>{
    try {
        let elements = document.querySelectorAll(selector);
        elements.forEach((item)=>{
            $4bbe31d86c558e6f197455fd06e731cb$var$triggerEvent(name, data, item);
        });
    } catch (er) {
        let message = new $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9("Error!").show();
    }
};


class $43ccbdbde4bf925e18ee06517f37f203$export$e7f8695b207ce249 {
    /**
     * 
     * @param {string} requestType - POST or GET
     * @param {string} returnType  - Data expected on return (JSON/HTML)
     * @param {string} url - URL for Request
     * @param {object} data - Data to Send
     */ constructor(requestType, returnType, url1, data1){
        if (typeof requestType === "object" && arguments.length == 1) Object.assign(this, requestType);
        else {
            this.requestType = requestType !== null && requestType !== void 0 ? requestType : "GET";
            this.returnType = returnType !== null && returnType !== void 0 ? returnType : "JSON";
            this.url = url1 !== null && url1 !== void 0 ? url1 : "";
            this.data = data1 !== null && data1 !== void 0 ? data1 : {
            };
        }
        this.thenHandler = ()=>{
        };
        this.catchHandler = ()=>{
        };
        this.xhr = new XMLHttpRequest();
        return this;
    }
    /**
     * - Set the URL for a GET request.
     * @param {string} url 
     * @returns a self reference for chaining.
     */ from(url) {
        this.url = url;
        return this;
    }
    /**
     * - Set the URL for a POST request.
     * @param {string} url 
     * @returns a self reference for chaining.
     */ to(url) {
        this.from(url);
        return this;
    }
    /**
     * Set the data to send in a request (POST or GET)
     * Key-value-pairs are converted to URL params for GET requests.
     * @param {object} data 
     * @returns a self reference for chaining.
     */ using(data) {
        this.data = data;
        return this;
    }
    /**
     * Deprecated - a callback for when the request completes. Use send() instead. 
     * @param {function} callback 
     * @returns  a self reference for chaining.
     */ then(callback) {
        this.thenHandler = callback;
        return this;
    }
    /**
     * Deprecated - a callback for catching request errors. Use send() instead. 
     * @param {function} callback 
     * @returns a self reference for chaining.
     */ catch(callback) {
        this.catchHandler = callback;
        return this;
    }
    /**
     * WARNING: This function is "private" & may return unexpected results. 
     * This determines whether to run the result through JSON.parse() to convert
     * JSON back into normal JavaScript. 
     * @param {object} data 
     * @returns 
     */ _processReturn(data) {
        if (this.returnType == "JSON") return JSON.parse(data);
        if (this.returnType == "HTML") return data;
    }
    /**
     * WARNING: This function is "private" & may return unexpected results. 
     * This function formates the headers and/or data for POST/GET requests. 
     */ _prepHeaders() {
        if (this.requestType === "POST") this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        if (this.requestType === "GET") {
            var str = Object.keys(this.data).map((key)=>`${key}=${this.data[key]}`
            ).join("&");
            this.url = `${this.url}?${str}`;
        }
    }
    /**
     * Execute the XHR Request
     * @returns A promise object with the result.
     */ async send() {
        this._prepHeaders();
        return new Promise((resolve, reject)=>{
            const Request1 = this;
            Request1.xhr.open(Request1.requestType, Request1.url, true);
            Request1.xhr.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    var data2 = Request1._processReturn(this.response);
                    resolve(data2);
                }
                reject("Moderate Error");
            };
            Request1.xhr.onerror = function() {
                reject("Serious Error");
            };
            // INITIATE AJAX REQUEST
            Request1.xhr.send(Request1.data);
        });
    }
    /**
     * Deprecated - I recommend using the promisified version, send(). 
     * @returns a reference to the request instance. 
     */ now() {
        this._prepHeaders();
        const promise = new Promise((resolve, reject)=>{
            const Request1 = this;
            Request1.xhr.open(Request1.requestType, Request1.url, true);
            Request1.xhr.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    var data3 = Request1._processReturn(this.response);
                    resolve(data3);
                }
                reject("Moderate Error");
            };
            Request1.xhr.onerror = function() {
                reject("Serious Error");
            };
            // INITIATE AJAX REQUEST
            Request1.xhr.send(Request1.data);
        }).then(this.thenHandler).catch(this.catchHandler);
        return this;
    }
}
class $43ccbdbde4bf925e18ee06517f37f203$export$ae4f7751a06ad53d extends $43ccbdbde4bf925e18ee06517f37f203$export$e7f8695b207ce249 {
    constructor(returnType1){
        super("GET", returnType1, null, null);
    }
}
class $43ccbdbde4bf925e18ee06517f37f203$export$d080338540ee233 extends $43ccbdbde4bf925e18ee06517f37f203$export$e7f8695b207ce249 {
    constructor(data4){
        super("POST", null, null, data4);
    }
}


const $ddf983cb6cf7d718db0dccd28c012ca5$export$578f55a5d60842ba = (url, callback, onError)=>{
    let request = new $43ccbdbde4bf925e18ee06517f37f203$export$ae4f7751a06ad53d("JSON").from(url).then(callback).catch(onError);
    request.now();
};
const $ddf983cb6cf7d718db0dccd28c012ca5$export$3be8d50f46f4d5c8 = (url, callback, onError)=>{
    let request = new $43ccbdbde4bf925e18ee06517f37f203$export$ae4f7751a06ad53d("HTML").from(url).then(callback).catch(onError);
    request.now();
};
const $ddf983cb6cf7d718db0dccd28c012ca5$export$9c3b7802c444e186 = (url, data, callback, onError)=>{
    let request = new $43ccbdbde4bf925e18ee06517f37f203$export$d080338540ee233(data).to(url).then(callback).catch(onError);
    request.now();
};
const $ddf983cb6cf7d718db0dccd28c012ca5$export$af43e85fe028a890 = (url, data)=>{
    let request = new $43ccbdbde4bf925e18ee06517f37f203$export$d080338540ee233(data).to(url);
    return request.send();
};
const $ddf983cb6cf7d718db0dccd28c012ca5$export$bb7e79c84dee9e44 = (url)=>{
    let request = new $43ccbdbde4bf925e18ee06517f37f203$export$ae4f7751a06ad53d("HTML").from(url);
    return request.send();
};
const $ddf983cb6cf7d718db0dccd28c012ca5$export$4aa02d87adfb76de = (url)=>{
    let request = new $43ccbdbde4bf925e18ee06517f37f203$export$ae4f7751a06ad53d("JSON").from(url);
    return request.send();
};



parcelRequire.register("68Tjd", function(module, exports) {

$parcel$export(module.exports, "default", () => $c9da7ea663ceec8556f7e5053096b938$export$9099ad97b570f7c);
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */ var objectToString = Object.prototype.toString;
var isArray = Array.isArray || function isArrayPolyfill(object) {
    return objectToString.call(object) === '[object Array]';
};
function isFunction(object) {
    return typeof object === 'function';
}
/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */ function typeStr(obj) {
    return isArray(obj) ? 'array' : typeof obj;
}
function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}
/**
 * Null safe way of checking whether or not an object,
 * including its prototype, has a given property
 */ function hasProperty(obj, propName) {
    return obj != null && typeof obj === 'object' && propName in obj;
}
/**
 * Safe way of detecting whether or not the given thing is a primitive and
 * whether it has the given property
 */ function primitiveHasOwnProperty(primitive, propName) {
    return primitive != null && typeof primitive !== 'object' && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
}
// Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
// See https://github.com/janl/mustache.js/issues/189
var regExpTest = RegExp.prototype.test;
function testRegExp(re, string) {
    return regExpTest.call(re, string);
}
var nonSpaceRe = /\S/;
function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
}
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};
function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
        return entityMap[s];
    });
}
var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;
/**
 * Breaks up the given `template` string into a tree of tokens. If the `tags`
 * argument is given here it must be an array with two string values: the
 * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
 * course, the default is to use mustaches (i.e. mustache.tags).
 *
 * A token is an array with at least 4 elements. The first element is the
 * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
 * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
 * all text that appears outside a symbol this element is "text".
 *
 * The second element of a token is its "value". For mustache tags this is
 * whatever else was inside the tag besides the opening symbol. For text tokens
 * this is the text itself.
 *
 * The third and fourth elements of the token are the start and end indices,
 * respectively, of the token in the original template.
 *
 * Tokens that are the root node of a subtree contain two more elements: 1) an
 * array of tokens in the subtree and 2) the index in the original template at
 * which the closing tag for that section begins.
 *
 * Tokens for partials also contain two more elements: 1) a string value of
 * indendation prior to that tag and 2) the index of that tag on that line -
 * eg a value of 2 indicates the partial is the third tag on this line.
 */ function parseTemplate(template, tags) {
    if (!template) return [];
    var lineHasNonSpace = false;
    var sections = []; // Stack to hold section tokens
    var tokens = []; // Buffer to hold the tokens
    var spaces = []; // Indices of whitespace tokens on the current line
    var hasTag = false; // Is there a {{tag}} on the current line?
    var nonSpace = false; // Is there a non-space char on the current line?
    var indentation = ''; // Tracks indentation for tags that use it
    var tagIndex = 0; // Stores a count of number of tags encountered on a line
    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
        if (hasTag && !nonSpace) while(spaces.length)delete tokens[spaces.pop()];
        else spaces = [];
        hasTag = false;
        nonSpace = false;
    }
    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags(tagsToCompile) {
        if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);
        if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);
        openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
        closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
        closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }
    compileTags(tags || mustache.tags);
    var scanner = new Scanner(template);
    var start, type, value, chr, token, openSection;
    while(!scanner.eos()){
        start = scanner.pos;
        // Match any text between tags.
        value = scanner.scanUntil(openingTagRe);
        if (value) for(var i = 0, valueLength = value.length; i < valueLength; ++i){
            chr = value.charAt(i);
            if (isWhitespace(chr)) {
                spaces.push(tokens.length);
                indentation += chr;
            } else {
                nonSpace = true;
                lineHasNonSpace = true;
                indentation += ' ';
            }
            tokens.push([
                'text',
                chr,
                start,
                start + 1
            ]);
            start += 1;
            // Check for whitespace on the current line.
            if (chr === '\n') {
                stripSpace();
                indentation = '';
                tagIndex = 0;
                lineHasNonSpace = false;
            }
        }
        // Match the opening tag.
        if (!scanner.scan(openingTagRe)) break;
        hasTag = true;
        // Get the tag type.
        type = scanner.scan(tagRe) || 'name';
        scanner.scan(whiteRe);
        // Get the tag value.
        if (type === '=') {
            value = scanner.scanUntil(equalsRe);
            scanner.scan(equalsRe);
            scanner.scanUntil(closingTagRe);
        } else if (type === '{') {
            value = scanner.scanUntil(closingCurlyRe);
            scanner.scan(curlyRe);
            scanner.scanUntil(closingTagRe);
            type = '&';
        } else value = scanner.scanUntil(closingTagRe);
        // Match the closing tag.
        if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);
        if (type == '>') token = [
            type,
            value,
            start,
            scanner.pos,
            indentation,
            tagIndex,
            lineHasNonSpace
        ];
        else token = [
            type,
            value,
            start,
            scanner.pos
        ];
        tagIndex++;
        tokens.push(token);
        if (type === '#' || type === '^') sections.push(token);
        else if (type === '/') {
            // Check section nesting.
            openSection = sections.pop();
            if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);
            if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        } else if (type === 'name' || type === '{' || type === '&') nonSpace = true;
        else if (type === '=') // Set the tags for the next time around.
        compileTags(value);
    }
    stripSpace();
    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    return nestTokens(squashTokens(tokens));
}
/**
 * Combines the values of consecutive text tokens in the given `tokens` array
 * to a single token.
 */ function squashTokens(tokens) {
    var squashedTokens = [];
    var token, lastToken;
    for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
        token = tokens[i];
        if (token) {
            if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                lastToken[1] += token[1];
                lastToken[3] = token[3];
            } else {
                squashedTokens.push(token);
                lastToken = token;
            }
        }
    }
    return squashedTokens;
}
/**
 * Forms the given array of `tokens` into a nested tree structure where
 * tokens that represent a section have two additional items: 1) an array of
 * all tokens that appear in that section and 2) the index in the original
 * template that represents the end of that section.
 */ function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];
    var token, section;
    for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
        token = tokens[i];
        switch(token[0]){
            case '#':
            case '^':
                collector.push(token);
                sections.push(token);
                collector = token[4] = [];
                break;
            case '/':
                section = sections.pop();
                section[5] = token[2];
                collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                break;
            default:
                collector.push(token);
        }
    }
    return nestedTokens;
}
/**
 * A simple string scanner that is used by the template parser to find
 * tokens in template strings.
 */ function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
}
/**
 * Returns `true` if the tail is empty (end of string).
 */ Scanner.prototype.eos = function eos() {
    return this.tail === '';
};
/**
 * Tries to match the given regular expression at the current position.
 * Returns the matched text if it can match, the empty string otherwise.
 */ Scanner.prototype.scan = function scan(re) {
    var match = this.tail.match(re);
    if (!match || match.index !== 0) return '';
    var string = match[0];
    this.tail = this.tail.substring(string.length);
    this.pos += string.length;
    return string;
};
/**
 * Skips all text until the given regular expression can be matched. Returns
 * the skipped string, which is the entire tail if no match can be made.
 */ Scanner.prototype.scanUntil = function scanUntil(re) {
    var index = this.tail.search(re), match;
    switch(index){
        case -1:
            match = this.tail;
            this.tail = '';
            break;
        case 0:
            match = '';
            break;
        default:
            match = this.tail.substring(0, index);
            this.tail = this.tail.substring(index);
    }
    this.pos += match.length;
    return match;
};
/**
 * Represents a rendering context by wrapping a view object and
 * maintaining a reference to the parent context.
 */ function Context(view, parentContext) {
    this.view = view;
    this.cache = {
        '.': this.view
    };
    this.parent = parentContext;
}
/**
 * Creates a new context using the given view with this context
 * as the parent.
 */ Context.prototype.push = function push(view) {
    return new Context(view, this);
};
/**
 * Returns the value of the given name in this context, traversing
 * up the context hierarchy if the value is absent in this context's view.
 */ Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;
    var value;
    if (cache.hasOwnProperty(name)) value = cache[name];
    else {
        var context = this, intermediateValue, names, index, lookupHit = false;
        while(context){
            if (name.indexOf('.') > 0) {
                intermediateValue = context.view;
                names = name.split('.');
                index = 0;
                /**
         * Using the dot notion path in `name`, we descend through the
         * nested objects.
         *
         * To be certain that the lookup has been successful, we have to
         * check if the last object in the path actually has the property
         * we are looking for. We store the result in `lookupHit`.
         *
         * This is specially necessary for when the value has been set to
         * `undefined` and we want to avoid looking up parent contexts.
         *
         * In the case where dot notation is used, we consider the lookup
         * to be successful even if the last "object" in the path is
         * not actually an object but a primitive (e.g., a string, or an
         * integer), because it is sometimes useful to access a property
         * of an autoboxed primitive, such as the length of a string.
         **/ while(intermediateValue != null && index < names.length){
                    if (index === names.length - 1) lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
                    intermediateValue = intermediateValue[names[index++]];
                }
            } else {
                intermediateValue = context.view[name];
                /**
         * Only checking against `hasProperty`, which always returns `false` if
         * `context.view` is not an object. Deliberately omitting the check
         * against `primitiveHasOwnProperty` if dot notation is not used.
         *
         * Consider this example:
         * ```
         * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
         * ```
         *
         * If we were to check also against `primitiveHasOwnProperty`, as we do
         * in the dot notation case, then render call would return:
         *
         * "The length of a football field is 9."
         *
         * rather than the expected:
         *
         * "The length of a football field is 100 yards."
         **/ lookupHit = hasProperty(context.view, name);
            }
            if (lookupHit) {
                value = intermediateValue;
                break;
            }
            context = context.parent;
        }
        cache[name] = value;
    }
    if (isFunction(value)) value = value.call(this.view);
    return value;
};
/**
 * A Writer knows how to take a stream of tokens and render them to a
 * string, given a context. It also maintains a cache of templates to
 * avoid the need to parse the same template twice.
 */ function Writer() {
    this.templateCache = {
        _cache: {
        },
        set: function set(key, value) {
            this._cache[key] = value;
        },
        get: function get(key) {
            return this._cache[key];
        },
        clear: function clear() {
            this._cache = {
            };
        }
    };
}
/**
 * Clears all cached templates in this writer.
 */ Writer.prototype.clearCache = function clearCache() {
    if (typeof this.templateCache !== 'undefined') this.templateCache.clear();
};
/**
 * Parses and caches the given `template` according to the given `tags` or
 * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
 * that is generated from the parse.
 */ Writer.prototype.parse = function parse(template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
    var isCacheEnabled = typeof cache !== 'undefined';
    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;
    if (tokens == undefined) {
        tokens = parseTemplate(template, tags);
        isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
};
/**
 * High-level method that is used to render the given `template` with
 * the given `view`.
 *
 * The optional `partials` argument may be an object that contains the
 * names and templates of partials that are used in the template. It may
 * also be a function that is used to load partial templates on the fly
 * that takes a single argument: the name of the partial.
 *
 * If the optional `config` argument is given here, then it should be an
 * object with a `tags` attribute or an `escape` attribute or both.
 * If an array is passed, then it will be interpreted the same way as
 * a `tags` attribute on a `config` object.
 *
 * The `tags` attribute of a `config` object must be an array with two
 * string values: the opening and closing tags used in the template (e.g.
 * [ "<%", "%>" ]). The default is to mustache.tags.
 *
 * The `escape` attribute of a `config` object must be a function which
 * accepts a string as input and outputs a safely escaped string.
 * If an `escape` function is not provided, then an HTML-safe string
 * escaping function is used as the default.
 */ Writer.prototype.render = function render(template, view, partials, config) {
    var tags = this.getConfigTags(config);
    var tokens = this.parse(template, tags);
    var context = view instanceof Context ? view : new Context(view, undefined);
    return this.renderTokens(tokens, context, partials, template, config);
};
/**
 * Low-level method that renders the given array of `tokens` using
 * the given `context` and `partials`.
 *
 * Note: The `originalTemplate` is only ever used to extract the portion
 * of the original template that was contained in a higher-order section.
 * If the template doesn't use higher-order sections, this argument may
 * be omitted.
 */ Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
    var buffer = '';
    var token, symbol, value;
    for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
        value = undefined;
        token = tokens[i];
        symbol = token[0];
        if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
        else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
        else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
        else if (symbol === '&') value = this.unescapedValue(token, context);
        else if (symbol === 'name') value = this.escapedValue(token, context, config);
        else if (symbol === 'text') value = this.rawValue(token);
        if (value !== undefined) buffer += value;
    }
    return buffer;
};
Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);
    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender(template) {
        return self.render(template, context, partials, config);
    }
    if (!value) return;
    if (isArray(value)) for(var j = 0, valueLength = value.length; j < valueLength; ++j)buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
    else if (isFunction(value)) {
        if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');
        // Extract the portion of the original template that the section contains.
        value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
        if (value != null) buffer += value;
    } else buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
    return buffer;
};
Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
    var value = context.lookup(token[1]);
    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate, config);
};
Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
    var partialByNl = partial.split('\n');
    for(var i = 0; i < partialByNl.length; i++)if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) partialByNl[i] = filteredIndentation + partialByNl[i];
    return partialByNl.join('\n');
};
Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
    if (!partials) return;
    var tags = this.getConfigTags(config);
    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
        var lineHasNonSpace = token[6];
        var tagIndex = token[5];
        var indentation = token[4];
        var indentedValue = value;
        if (tagIndex == 0 && indentation) indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
        var tokens = this.parse(indentedValue, tags);
        return this.renderTokens(tokens, context, partials, indentedValue, config);
    }
};
Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return value;
};
Writer.prototype.escapedValue = function escapedValue(token, context, config) {
    var escape = this.getConfigEscape(config) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null) return typeof value === 'number' && escape === mustache.escape ? String(value) : escape(value);
};
Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
};
Writer.prototype.getConfigTags = function getConfigTags(config) {
    if (isArray(config)) return config;
    else if (config && typeof config === 'object') return config.tags;
    else return undefined;
};
Writer.prototype.getConfigEscape = function getConfigEscape(config) {
    if (config && typeof config === 'object' && !isArray(config)) return config.escape;
    else return undefined;
};
var mustache = {
    name: 'mustache.js',
    version: '4.2.0',
    tags: [
        '{{',
        '}}'
    ],
    clearCache: undefined,
    escape: undefined,
    parse: undefined,
    render: undefined,
    Scanner: undefined,
    Context: undefined,
    Writer: undefined,
    /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */ set templateCache (cache){
        defaultWriter.templateCache = cache;
    },
    /**
   * Gets the default or overridden caching object from the default writer.
   */ get templateCache () {
        return defaultWriter.templateCache;
    }
};
// All high-level mustache.* functions use this writer.
var defaultWriter = new Writer();
/**
 * Clears all cached templates in the default writer.
 */ mustache.clearCache = function clearCache1() {
    return defaultWriter.clearCache();
};
/**
 * Parses and caches the given template in the default writer and returns the
 * array of tokens it contains. Doing this ahead of time avoids the need to
 * parse templates on the fly as they are rendered.
 */ mustache.parse = function parse1(template, tags) {
    return defaultWriter.parse(template, tags);
};
/**
 * Renders the `template` with the given `view`, `partials`, and `config`
 * using the default writer.
 */ mustache.render = function render1(template, view, partials, config) {
    if (typeof template !== 'string') throw new TypeError("Invalid template! Template should be a \"string\" but \"" + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
    return defaultWriter.render(template, view, partials, config);
};
// Export the escaping function so that the user may override it.
// See https://github.com/janl/mustache.js/issues/244
mustache.escape = escapeHtml;
// Export these mainly for testing, but also for advanced usage.
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;
var $c9da7ea663ceec8556f7e5053096b938$export$9099ad97b570f7c = mustache;

});


var $68Tjd = parcelRequire("68Tjd");
const $67f3c28b6189fbe9f675dafd37799408$export$a5637ab7763d9eb7 = (html, context)=>{
    let workshop = document.createElement("div");
    workshop.innerHTML = html;
    workshop.querySelectorAll("[data-context]").forEach((el)=>{
        var ref;
        let binding = (ref = el.dataset.context) === null || ref === void 0 ? void 0 : ref.split(".");
        let cache = context;
        binding.forEach((key)=>{
            cache = cache[key];
        });
        el.textContent = $67f3c28b6189fbe9f675dafd37799408$var$interpretData(cache);
    });
    return workshop.innerHTML;
};
const $67f3c28b6189fbe9f675dafd37799408$var$interpretData = (data)=>{
    // This is where you would customize instead of just convert everything to a string.
    return `${data}`;
};


class $183807914a5cd5c6f58e448ac2ea05fc$export$93af88fe68eea917 {
    constructor(settings){
        if (typeof settings === "object") Object.assign(this, settings);
        this.context = this.context || {
        };
        var _html;
        this.html = (_html = this.html) !== null && _html !== void 0 ? _html : "";
        var _engine;
        this.engine = (_engine = this.engine) !== null && _engine !== void 0 ? _engine : "default";
        var _target;
        this.target = (_target = this.target) !== null && _target !== void 0 ? _target : "#NoTargetSelected";
        var _rendered;
        this.rendered = (_rendered = this.rendered) !== null && _rendered !== void 0 ? _rendered : "";
        var _dataUrl;
        this.dataUrl = (_dataUrl = this.dataUrl) !== null && _dataUrl !== void 0 ? _dataUrl : null;
        var _htmlUrl;
        this.htmlUrl = (_htmlUrl = this.htmlUrl) !== null && _htmlUrl !== void 0 ? _htmlUrl : null;
        this.autoRender = this.autoRender || false;
        this.engines = {
            default: ()=>{
                return $67f3c28b6189fbe9f675dafd37799408$export$a5637ab7763d9eb7(this.html, this.context);
            },
            mustache: ()=>{
                return $68Tjd.default.render(this.html, this.context);
            }
        };
    //let {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
    }
    /**
     * 
     * @param {object} items - Merge items with context. For Mustache render helpers
     * use this format: {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
     */ enhanceContext(items) {
        Object.assign(this.context, items);
    }
    /**
     * - Gets HTML from a URL and sets the html field. 
     * @param {string} url 
     * @param {boolean} noRender - flag to prevent unnecessary rendering
     * @returns a promise object with the result. 
     */ async importPartial(url, noRender) {
        const self = this;
        url = url !== null && url !== void 0 ? url : self.htmlUrl;
        try {
            let result = await $ddf983cb6cf7d718db0dccd28c012ca5$export$bb7e79c84dee9e44(url);
            self.html = result;
            if (self.autoRender && noRender != true) self.render(self.target);
            return result;
        } catch (error) {
            return error;
        }
    }
    /**
     * - Gets JSON from a URL and sets the context field. 
     * @param {string} url 
     * @param {boolean} noRender 
     * @returns A promise object with the result.
     */ async importContext(url, noRender) {
        const self = this;
        url = url !== null && url !== void 0 ? url : self.dataUrl;
        try {
            let result = await $ddf983cb6cf7d718db0dccd28c012ca5$export$4aa02d87adfb76de(url);
            self.context = result;
            if (self.autoRender && noRender != true) self.render(self.target);
            return result;
        } catch (error) {
            return error;
        }
    }
    /**
     * - Gets JSON/HTML from a URL and sets the context & html fields. 
     * @param {string} dataUrl - URL of JSON string
     * @param {*} templateUrl - URL of HTML text
     * @returns a promise object with a reference to the template. 
     */ async importPackage(dataUrl, templateUrl) {
        let self = this;
        dataUrl = dataUrl !== null && dataUrl !== void 0 ? dataUrl : self.dataUrl;
        templateUrl = templateUrl !== null && templateUrl !== void 0 ? templateUrl : self.templateUrl;
        await this.importPartial(templateUrl, true);
        await this.importContext(dataUrl, true);
        if (self.autoRender) self.render(self.target);
        return self;
    }
    /**
     * - Gets HTML from a template already on the page. Can render if the
     * target is already set. 
     * @param {string} selector 
     * @returns a reference to the template instance for chaining. 
     */ load(selector) {
        if (!selector) selector = `[data-template-for='${this.target.replace("#", "")}']`;
        let template = document.querySelector(selector);
        var _engine1;
        let engine = (_engine1 = template.dataset.engine) !== null && _engine1 !== void 0 ? _engine1 : "default";
        var _innerHTML;
        this.html = (_innerHTML = template.innerHTML) !== null && _innerHTML !== void 0 ? _innerHTML : "<em>No Template Found</em>";
        this.engine = engine;
        if (this.autoRender) this.render(this.target);
        return this;
    }
    /**
     * - Renders the current template to the innerHTML of the element
     * matching the provided selector. 
     * @param {string} selector 
     * @returns a reference to the tamplet instance for chaining. 
     */ render(selector) {
        var ref;
        if (!selector && this.target.length > 1) selector = this.target;
        let target = document.querySelector(selector);
        var _engines = this.engines[this.engine];
        let rendered = (ref = _engines) === null || ref === void 0 ? void 0 : ref.call(_engines);
        this.rendered = rendered;
        if (target === null || target === void 0 ? void 0 : target.innerHTML) target.innerHTML = rendered;
        return this.rendered;
    }
}



class $21865f84987a7bcb2dcb0d04131c6001$export$ccc769439d8c8491 {
    constructor(name){
        this.name = name;
        this.start = performance.now();
        this.result = 0;
    }
    /**
     * 
     * @returns a completed benchmark
     */ stop() {
        this.result = performance.now() - this.start;
        return this;
    }
    /**
     * verbose benchmark output
     */ get detailedResults() {
        return `Task "${this.name}" executed in ${this.result} ms.`;
    }
}



var $68Tjd = parcelRequire("68Tjd");
/**
 * Class representing a bindable View or Model
 */ class $61b3e52342e2ae588029ad4fd6ca78a7$var$Bindable {
    constructor(){
        this.subscribers = [];
        this.subscriptions = [];
    }
    send() {
        this.subscribers.forEach((item)=>{
            var ref;
            (ref = item.receive) === null || ref === void 0 ? void 0 : ref.call(item, this.getData());
        });
    }
    receive(data) {
        this.setData(data);
    }
    requestUpdate() {
        this.subscriptions.forEach((item)=>{
            this.receive(item.getData());
        });
    }
    getData() {
    // Implemented at the View/Model level
    }
    setData() {
    // Implemented at the View/Modal level
    }
    subscribe(subscriber) {
        var ref;
        this.subscribers.push(subscriber);
        (ref = subscriber.subscriptions) === null || ref === void 0 ? void 0 : ref.push(this);
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((x)=>x !== subscriber
        );
        subscriber.subscriptions = subscriber.subscriptions.filter((x)=>x !== this
        );
    }
}
class $61b3e52342e2ae588029ad4fd6ca78a7$export$ee39aefc8ac7973d extends $61b3e52342e2ae588029ad4fd6ca78a7$var$Bindable {
    constructor(element){
        var ref, ref1;
        super();
        let bindInfo = (ref = element.dataset.bind) === null || ref === void 0 ? void 0 : ref.split(":");
        this.quiet = false; // prevents sends on an update
        this.element = element;
        this.action = bindInfo === null || bindInfo === void 0 ? void 0 : bindInfo[0];
        this.target = bindInfo === null || bindInfo === void 0 ? void 0 : bindInfo[1];
        this.subContext = element.dataset.context;
        this.template = (ref1 = this.element.querySelector("template")) === null || ref1 === void 0 ? void 0 : ref1.innerHTML;
        if (element.dataset.bindOn) element.addEventListener(element.dataset.bindOn, this.send.bind(this));
    }
    setData(data) {
        var ref2;
        let method = `render_${this.target}`;
        var _obj = this[method]?.bind(this);
        (ref2 = _obj) === null || ref2 === void 0 ? void 0 : ref2.call(_obj, data);
    }
    getData() {
        var _target;
        let data = (_target = this.element[this.target]) !== null && _target !== void 0 ? _target : null;
        let wrapper = {
        };
        var _subContext;
        wrapper[(_subContext = this.subContext) !== null && _subContext !== void 0 ? _subContext : "data"] = data;
        return wrapper;
    }
    setContext(context) {
        this.subscriptions = [
            context
        ];
    }
    render_innerHTML(context) {
        var _subContext;
        context = (_subContext = context[this.subContext]) !== null && _subContext !== void 0 ? _subContext : context;
        this.element.innerHTML = context;
    }
    render_template(context) {
        var _subContext;
        context = (_subContext = context[this.subContext]) !== null && _subContext !== void 0 ? _subContext : context;
        if (this.template) this.element.innerHTML = $68Tjd.default.render(this.template, context);
    }
    render_value(context) {
        var _subContext;
        context = (_subContext = context[this.subContext]) !== null && _subContext !== void 0 ? _subContext : context;
        this.element.value = context;
    }
    send() {
        if (this.quiet === true) return false;
        super.send();
    }
}
class $61b3e52342e2ae588029ad4fd6ca78a7$export$4d9aa5949e79e4c extends $61b3e52342e2ae588029ad4fd6ca78a7$var$Bindable {
    constructor(data1){
        super();
        this.data = data1;
        this.quiet = false; // prevents sends on an update
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = {
            ...this.data,
            ...data
        };
        this.send();
    }
    replaceData(newData) {
        this.data = newData;
        this.send();
    }
    send() {
        if (this.quiet === true) return false;
        super.send();
    }
}



const $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433 = {
    models: [],
    views: []
};
const $3080fa9a8db1d431833ea19b0760baa3$var$getViews = ()=>{
    try {
        let viewList = [];
        let targetList = document.querySelectorAll("[data-bind]");
        targetList.forEach((el)=>{
            viewList.push(new $61b3e52342e2ae588029ad4fd6ca78a7$export$ee39aefc8ac7973d(el));
        });
        return viewList;
    } catch (error) {
        return [
            error
        ];
    }
};
const $3080fa9a8db1d431833ea19b0760baa3$var$getModel = async (context)=>{
    try {
        if (typeof context === "object") return new $61b3e52342e2ae588029ad4fd6ca78a7$export$4d9aa5949e79e4c(context);
        let imported = await $ddf983cb6cf7d718db0dccd28c012ca5$export$4aa02d87adfb76de(context);
        return new $61b3e52342e2ae588029ad4fd6ca78a7$export$4d9aa5949e79e4c(imported);
    } catch (error) {
        return error;
    }
};
const $3080fa9a8db1d431833ea19b0760baa3$var$subscribeViews = (views, sender)=>{
    views.forEach((item)=>{
        if (item.action === "receive") sender.subscribe(item);
        // give views the initial data value.
        item.receive(sender.getData());
    });
};
const $3080fa9a8db1d431833ea19b0760baa3$var$subscribeModels = (models, sender)=>{
    models.forEach((item)=>{
        if (sender.action === "send") sender.subscribe(item);
    });
};
/**
 * - Setup Bindings
 * @param {any} context 
 */ $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.setup = async (context)=>{
    $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.models.push(await $3080fa9a8db1d431833ea19b0760baa3$var$getModel(context));
    $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.views = $3080fa9a8db1d431833ea19b0760baa3$var$getViews($3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.pageContext);
    $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.models.forEach((model)=>{
        $3080fa9a8db1d431833ea19b0760baa3$var$subscribeViews($3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.views, model);
    });
    $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.views.forEach((view)=>{
        $3080fa9a8db1d431833ea19b0760baa3$var$subscribeModels($3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.models, view);
    });
    // Updating isn't necessary since the initial setup injects the values
    window._bindings = $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433; // debug
};
$3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.update = (item)=>{
    item.send();
};
$3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.updateAll = ()=>{
    $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.models.forEach((model)=>{
        model.send();
    });
    $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433.views.forEach((view)=>{
        view.send();
    });
};



const $e6f3795dc1a6d3bbc50fc95684eeb9d4$export$9704214ef6d90ae9 = {
};
$e6f3795dc1a6d3bbc50fc95684eeb9d4$export$9704214ef6d90ae9.message = (content)=>{
    let modal = new $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9(content);
    modal.show();
};
$e6f3795dc1a6d3bbc50fc95684eeb9d4$export$9704214ef6d90ae9.alert = (content)=>{
    let modal = new $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9(content);
    modal.alert();
};
$e6f3795dc1a6d3bbc50fc95684eeb9d4$export$9704214ef6d90ae9.warn = (content)=>{
    let modal = new $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9(content);
    return modal.warn();
};
$e6f3795dc1a6d3bbc50fc95684eeb9d4$export$9704214ef6d90ae9.confirm = async (content)=>{
    try {
        let modal = new $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9(content);
        let result = await modal.confirm();
        return result;
    } catch (error) {
        return error;
    }
};
$e6f3795dc1a6d3bbc50fc95684eeb9d4$export$9704214ef6d90ae9.textInput = async (content)=>{
    try {
        let modal = new $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9(content);
        let result = await modal.textInput();
        return result;
    } catch (error) {
        return error;
    }
};


window._ = {
    Template: $183807914a5cd5c6f58e448ac2ea05fc$export$93af88fe68eea917,
    Modal: $0f5f6950cd1ff676cfaf28562fd759e5$export$b3e36f066d3bceb9,
    Benchmark: $21865f84987a7bcb2dcb0d04131c6001$export$ccc769439d8c8491,
    events: $4bbe31d86c558e6f197455fd06e731cb$export$fc4ac6ce2f1d593c,
    bindings: $3080fa9a8db1d431833ea19b0760baa3$export$491842680a93f433,
    ui: $e6f3795dc1a6d3bbc50fc95684eeb9d4$export$9704214ef6d90ae9,
    getHTML: $ddf983cb6cf7d718db0dccd28c012ca5$export$bb7e79c84dee9e44,
    getJSON: $ddf983cb6cf7d718db0dccd28c012ca5$export$4aa02d87adfb76de,
    postData: $ddf983cb6cf7d718db0dccd28c012ca5$export$af43e85fe028a890
};
/**
 * Here we add event listeners and setup the app. 
 */ document.body.addEventListener("keyup", (e)=>{
    var ref;
    var _keyup = $4bbe31d86c558e6f197455fd06e731cb$export$fc4ac6ce2f1d593c.keyup[e.target.dataset.keyup];
    (ref = _keyup) === null || ref === void 0 ? void 0 : ref.call(_keyup, e.target, e);
});
document.body.addEventListener("change", (e)=>{
    var ref;
    var _change = $4bbe31d86c558e6f197455fd06e731cb$export$fc4ac6ce2f1d593c.change[e.target.dataset.change];
    (ref = _change) === null || ref === void 0 ? void 0 : ref.call(_change, e.target, e);
});
document.body.addEventListener("click", (e)=>{
    var ref;
    var _click = $4bbe31d86c558e6f197455fd06e731cb$export$fc4ac6ce2f1d593c.click[e.target.dataset.click];
    (ref = _click) === null || ref === void 0 ? void 0 : ref.call(_click, e.target, e);
});

})();
//# sourceMappingURL=app.js.map
