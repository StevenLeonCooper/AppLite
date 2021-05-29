
/**
 * Class for making AJAX requests
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

    from(url) {
        this.url = url;
        return this;
    }

    to(url) {
        this.from(url);
        return this;
    }

    using(data) {
        this.data = data;
        return this;
    }

    then(callback) {
        this.thenHandler = callback;
        return this;
    }

    catch(callback) {
        this.catchHandler = callback;
        return this;
    }

    _processReturn(data){
        if(this.returnType == "JSON"){
            return JSON.parse(data);
        }

        if(this.returnType == "HTML"){
            return data;
        }
    }

    now() {
        if (this.requestType === "POST") {
            this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (this.requestType === "GET") {
            var str = Object.keys(this.data).map(key => `${key}=${this.data[key]}`).join("&");
            this.url = `${this.url}?${str}`;
        }

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
            .then((data) => {
                this.thenHandler(data);
            })
            .catch((error) => {
                this.catchHandler(error);
            });

    return this;
    }
}

export class GET extends Request {
    constructor(returnType) {
        super("GET", returnType, null, null);
    }
}

export class POST extends Request {
    constructor(data) {
        super("POST", null, null, data);
    }
}

export const getJSON = (url, callback) =>{
    let request = new GET("JSON").from(url).then(callback);
    request.now();
}

export const postData = (url, data, callback)=>{
    let request = new POST(data).to(url).then(callback);
    request.now();
};


