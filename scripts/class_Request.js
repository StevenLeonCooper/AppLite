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
        this.data = data;
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
        if (this.returnType == "JSON") {
            return JSON.parse(data);
        }

        if (this.returnType == "HTML") {
            return data;
        }
    }

    /**
     * WARNING: This function is "private" & may return unexpected results. 
     * This function formates the headers and/or data for POST/GET requests. 
     */
    _prepHeaders() {
        if (this.requestType === "POST") {
            this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (this.requestType === "GET") {
            var str = Object.keys(this.data).map(key => `${key}=${this.data[key]}`).join("&");
            this.url = `${this.url}?${str}`;
        }
    }

    /**
     * Execute the XHR Request
     * @returns A promise object with the result.
     */
    async send() {
        this._prepHeaders();

        return new Promise((resolve, reject) => {
            
            const Request = this;

            Request.xhr.open(Request.requestType, Request.url, true);

            Request.xhr.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    var data = Request._processReturn(this.response);
                    resolve(data);
                }
                reject("Moderate Error");
            };
            Request.xhr.onerror = function () {
                reject("Serious Error");
            };
            // INITIATE AJAX REQUEST
            Request.xhr.send(Request.data);

        });
    }

    /**
     * Deprecated - I recommend using the promisified version, send(). 
     * @returns a reference to the request instance. 
     */
    now() {
        this._prepHeaders();

        const promise = new Promise((resolve, reject) => {
            const Request = this;

            Request.xhr.open(Request.requestType, Request.url, true);

            Request.xhr.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    var data = Request._processReturn(this.response);
                    resolve(data);
                }
                reject("Moderate Error");
            };
            Request.xhr.onerror = function () {
                reject("Serious Error");
            };
            // INITIATE AJAX REQUEST
            Request.xhr.send(Request.data);
        })
            .then(this.thenHandler)
            .catch(this.catchHandler);

        return this;
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
