/**
 * Class for making AJAX (XHR) requests
 */
export class Request {
    /**
     * 
     * @param {string} requestType - POST or GET
     * @param {string} returnType  - Data expected on return (JSON/HTML)
     * @param {string} url - URL for Request
     * @param {object} data - Data to Send
     */
    constructor(requestType, returnType, url, data) {
        if (typeof requestType === "object" && arguments.length == 1) {
            Object.assign(this, requestType);
        } else {
            this.requestType = requestType ?? "GET";
            this.returnType = returnType ?? "JSON";
            this.url = url ?? "";
            this.data = data ?? {};
        }
        this.thenHandler = () => { };
        this.catchHandler = () => { };
        this.xhr = new XMLHttpRequest();
        return this;
    }

    /**
     * - Set the URL for a GET request.
     * @param {string} url 
     * @returns a self reference for chaining.
     */
    from(url) {
        this.url = url;
        return this;
    }

    /**
     * - Set the URL for a POST request.
     * @param {string} url 
     * @returns a self reference for chaining.
     */
    to(url) {
        this.from(url);
        return this;
    }

    /**
     * Set the data to send in a request (POST or GET)
     * Key-value-pairs are converted to URL params for GET requests.
     * @param {object} data 
     * @returns a self reference for chaining.
     */
    using(data) {
        this.data = data ?? {};
        return this;
    }

    /**
     * Deprecated - a callback for when the request completes. Use send() instead. 
     * @param {function} callback 
     * @returns  a self reference for chaining.
     */
    then(callback) {
        this.thenHandler = callback;
        return this;
    }

    /**
     * Deprecated - a callback for catching request errors. Use send() instead. 
     * @param {function} callback 
     * @returns a self reference for chaining.
     */
    catch(callback) {
        this.catchHandler = callback;
        return this;
    }

    /**
     * WARNING: This function is "private" & may return unexpected results. 
     * This determines whether to run the result through JSON.parse() to convert
     * JSON back into normal JavaScript. 
     * @param {object} data 
     * @returns 
     */
    _processReturn(data) {
        const returnMethods = {
            JSON: data => JSON.parse(data),
            HTML: data => data
        };
        return returnMethods[this.returnType]?.(data);
    }

    _encodePostData(obj) {
        return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&')
    };

    /**
     * WARNING: This function is "private" & may return unexpected results. 
     * This function formates the headers and/or data for POST/GET requests. 
     */
    _prepHeaders() {
        const prepMethods = {
            POST: (request) => {
                request.data = this._encodePostData(request.data);
                request.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            },
            GET: (request) => {
                let str = Object.keys(request.data).map(key => `${key}=${request.data[key]}`).join("&");
                request.url = str.length > 0 ? `${request.url}?${str}` : request.url;
            }
        };
        prepMethods[this.requestType]?.(this);
    }

    sendJSONP() {
        const Request = this;
        return new Promise((resolve, reject) => {
            try {
                Request._prepHeaders.bind(Request)();
                let callbackName = `callback_${performance.now().toString().replace(".", "")}`;
                let script = document.createElement("script");
                let char = Request.url.includes("?") ? "&" : "?";
                script.src = `${Request.url}${char}callback=${callbackName}`;
                window[callbackName] = (data) => {
                    resolve(data);
                };
                document.head.appendChild(script);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Execute the XHR Request
     * @returns A promise object with the result.
     */
    async send() {
        const Request = this;
        const xhr = Request.xhr;
        return new Promise((resolve, reject) => {
            Request.xhr.open(Request.requestType, Request.url, true);
            Request._prepHeaders.bind(Request)();
            Request.xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var data = Request._processReturn(xhr.response);
                    resolve(data);
                }
                reject(xhr);
            };
            Request.xhr.onerror = (event) => {
                reject(event);
            };
            // INITIATE AJAX REQUEST
            Request.xhr.send(Request.data);
        });
    }

}

/**
 * A request preset to "GET"
 */
export class GET extends Request {
    constructor(returnType) {
        super("GET", returnType, null, null);
    }
}

/**
 * A request preset to "POST"
 */
export class POST extends Request {
    constructor(data) {
        super("POST", null, null, data);
    }
}
