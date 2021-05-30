import { GET, POST } from './class_Request.js';

/**
 * - Deprecated, I recommend using the promisified version. 
 * @param {string} url 
 * @param {function} callback 
 * @param {function} onError 
 */
export const getJSON = (url, callback, onError) => {
    let request = new GET("JSON").from(url).then(callback).catch(onError);
    request.now();
}

/**
 * - Deprecated, I recommend using the promisified version. 
 * @param {string} url 
 * @param {function} callback 
 * @param {function} onError 
 */
export const getHTML = (url, callback, onError) => {
    let request = new GET("HTML").from(url).then(callback).catch(onError);
    request.now();
};

/**
 * - Deprecated, I recommend using the promisified version. 
 * @param {string} url 
 * @param {object} data
 * @param {function} callback 
 * @param {function} onError 
 */
export const postData = (url, data, callback, onError) => {
    let request = new POST(data).to(url).then(callback).catch(onError);
    request.now();
};

/**
 * - Post data asynchronously to a URL. 
 * @param {string} url 
 * @param {object} data 
 * @returns - A promise object with the result 
 */
export const postDataPromise = (url, data) => {
    let request = new POST(data).to(url);
    return request.send();
};

/**
 * - Get HTML text from a URL
 * @param {string} url 
 * @returns - A promise object with the result
 */
export const getHtmlPromise = (url) => {
    let request = new GET("HTML").from(url);
    return request.send();
};

/**
 * - Get JSON text from a URL
 * @param {string} url 
 * @returns - A promise object with the result
 */
export const getJsonPromise = (url) => {
    let request = new GET("JSON").from(url);

    return request.send();
};


