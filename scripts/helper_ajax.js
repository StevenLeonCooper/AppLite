import { GET, POST } from './class_Request.js';

export const getJSON = (url, callback, onError) => {
    let request = new GET("JSON").from(url).then(callback).catch(onError);
    request.now();
}

export const getHTML = (url, callback, onError) => {
    let request = new GET("HTML").from(url).then(callback).catch(onError);
    request.now();
};

export const postData = (url, data, callback, onError) => {
    let request = new POST(data).to(url).then(callback).catch(onError);
    request.now();
};

export const postDataPromise = (url, data) => {
    let request = new POST(data).to(url);
    return request.send();
};

export const getHtmlPromise = (url) => {
    let request = new GET("HTML").from(url);
    return request.send();
};

export const getJsonPromise = (url) => {
    let request = new GET("JSON").from(url);

    return request.send();
};


