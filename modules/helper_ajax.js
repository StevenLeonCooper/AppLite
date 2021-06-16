import { GET, POST } from './class_Request.js';

export const ajax = {};

/**
 * - Post data asynchronously to a URL. 
 * @param {string} url 
 * @param {object} data 
 * @returns - A promise object with the result 
 */
ajax.postData = (url, data) => {
    let request = new POST(data).to(url);
    return request.send();
};

/**
 * - Get HTML text from a URL
 * @param {string} url 
 * @returns - A promise object with the result
 */
ajax.getAny = (url, data) => {
    let request = new GET("HTML").from(url).using(data);
    return request.send();
};

/**
 * - Get JSON text from a URL
 * @param {string} url 
 * @returns - A promise object with the result
 */
ajax.getJSON = (url, data) => {
    let request = new GET("JSON").from(url).using(data);

    return request.send();
};

ajax.getJSONP = (url, data) =>{
    let request = new GET("JSONP").from(url).using(data);
    return request.sendJSONP();
};

ajax.getScript = async (url, parent) => {
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

