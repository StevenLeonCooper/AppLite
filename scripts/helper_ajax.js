import {Request, GET, POST} from './class_Request.js';

export const getJSON = (url, callback) => {
    let request = new GET("JSON").from(url).then(callback);
    request.now();
}

export const getHTML = (url, callback) => {
    let request = new GET("HTML").from(url).then(callback);
    request.now();
};

export const postData = (url, data, callback) => {
    let request = new POST(data).to(url).then(callback);
    request.now();
};


