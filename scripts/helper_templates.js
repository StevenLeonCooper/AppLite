import { getHTML, getJSON } from './helper_ajax.js';

import Mustache from './libs/mustache.js';

export class Template {
    constructor() {
        this.context = {};
        this.html = "";
        this.engine = "default";
        this.target = "";
        this.rendered = "";
        this.engines = {
            default: () => {
                return this.html;
            },
            mustache: () => {
                return Mustache.render(this.html, this.context);
            }
        };
    }

    async import(url) {

        const self = this;

        return new Promise((resolve, reject) => {

            getHTML(url, (result) => {
                self.html = result;
                resolve(self);
            });
        });
    }

    load(selector) {
        let template = document.querySelector(selector);
        let engine = template.dataset.engine ?? "default";
        this.html = template.innerHTML ?? "<em>No Template Found</em>";
        this.engine = engine;
    }

    render(selector) {
        let target = document.querySelector(selector);

        let rendered = this.engines[this.engine]?.();

        this.rendered = rendered;

        if(target.innerHTML){
            target.innerHTML = rendered;
        }

        return this.rendered;
    }

}