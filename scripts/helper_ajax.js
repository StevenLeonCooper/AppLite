import { GET, POST } from './class_Request.js';

export const ajax = {};

/**
 * - Post data asynchronously to a URL. 
 * @param {string} url 
 * @param {object} data 
 * @returns - A promise object with the result 
 */
ajax.postDataPromise = (url, data) => {
    let request = new POST(data).to(url);
    return request.send();
};

/**
 * - Get HTML text from a URL
 * @param {string} url 
 * @returns - A promise object with the result
 */
ajax.getHtmlPromise = (url) => {
    let request = new GET("HTML").from(url);
    return request.send();
};

/**
 * - Get JSON text from a URL
 * @param {string} url 
 * @returns - A promise object with the result
 */
ajax.getJsonPromise = (url) => {
    let request = new GET("JSON").from(url);

    return request.send();
};

ajax.getScriptPromise = async (url, parent) => {
    try {
        parent = parent ?? document.head;
        let request = new GET("HTML").from(url);
        let result = await request.send();
        let script = document.createElement("script");
        script.innerHTML = result;
        parent.appendChild(script);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

