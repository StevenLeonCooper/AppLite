import { getHTML, getJSON } from './helper_ajax.js';

import Mustache from './libs/mustache.js';

export class Template {
    constructor(settings) {

        if (typeof settings === "object") {
            Object.assign(this, settings);
        }

        this.context = this.context || {};
        this.html = this.html ?? "";
        this.engine = this.engine ?? "default";
        this.target = this.target ?? "";
        this.rendered = this.rendered ?? "";
        this.engines = {
            default: () => {
                return this.html;
            },
            mustache: () => {
                return Mustache.render(this.html, this.context);
            }
        };

        //let {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
    }

    /**
     * 
     * @param {object} items - Merge items with context. For Mustache render helpers
     * use this format: {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
     */
    fortifyContext(items){
        Object.assign(this.context, items);
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

        if (target.innerHTML) {
            target.innerHTML = rendered;
        }

        return this.rendered;
    }

}