import { ajax } from './helper_ajax.js';

import Mustache from './libs/mustache.js';

import { basicRender } from './helper_template.js';

/**
 * - A class representing a template for rendering content onto the page. 
 */
export class Template {
    constructor(settings) {

        if (typeof settings === "object") {
            Object.assign(this, settings);
        }

        this.context = this.context || {};
        this.html = this.html ?? "";
        this.engine = this.engine ?? "default";
        this.target = this.target ?? "#NoTargetSelected";
        this.rendered = this.rendered ?? "";
        this.dataUrl = this.dataUrl ?? null;
        this.htmlUrl = this.htmlUrl ?? null;
        this.autoRender = this.autoRender || false;
        this.stylesheets = this.stylesheets || null;
        this.scripts = this.scripts || null;

        this.engines = {
            default: () => {
                return basicRender(this.html, this.context);
            },
            mustache: () => {
                return Mustache.render(this.html, this.context);
            }
        };

        //let {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
    }

    get targetElement() {
        return document.querySelector(this.target);
    }

    /**
     * 
     * @param {object} items - Merge items with context. For Mustache render helpers
     * use this format: {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
     */
    enhanceContext(items) {
        Object.assign(this.context, items);
    }

    /**
     * - Gets HTML from a URL and sets the html field. 
     * @param {string} url 
     * @param {boolean} noRender - flag to prevent unnecessary rendering
     * @returns a promise object with the result. 
     */
    async importPartial(url, noRender) {

        const self = this;

        url = url ?? self.htmlUrl;

        try {
            let result = await ajax.getAny(url);
            self.html = result;
            if (self.autoRender && noRender != true) self.render(self.target);
            return result;
        }
        catch (error) {
            return error;
        }
    }

    /**
     * - Gets JSON from a URL and sets the context field. 
     * @param {string} url 
     * @param {boolean} noRender 
     * @returns A promise object with the result.
     */
    async importContext(url, noRender) {

        const self = this;

        url = url ?? self.dataUrl;

        if (url === null) { return null; }

        if(typeof url === "object"){
            self.context = url;
            return url;
        }

        try {
            let result = await ajax.getJSON(url);
            self.context = result;
            if (self.autoRender && noRender != true) self.render(self.target);
            return result;
        }
        catch (error) {
            return error;
        }
    }

    async importElement(url, type, parent) {

        const self = this;

        if (typeof url !== "string" && !Array.isArray(url)) { return false; }

        url = Array.isArray(url) ? url : [url];

        try {
            let i = 0, max = url.length,
                elements = [];

            for (i; i < max; i++) {
                let result = await ajax.getAny(url[i]);

                let container = document.createElement(type);

                container.innerHTML = result;

                parent.appendChild(container);

                elements.push(container);
            }
            return elements;
        }
        catch (error) {
            return error;
        }
    }

    /**
     * - Gets JSON/HTML from a URL and sets the context & html fields. 
     * @param {string} dataUrl - URL of JSON string
     * @param {*} templateUrl - URL of HTML text
     * @returns a promise object with a reference to the template. 
     */
    async importPackage(dataUrl, templateUrl, stylesheetUrl, scriptUrl) {

        let self = this;

        dataUrl = dataUrl ?? self.dataUrl;

        templateUrl = templateUrl ?? self.templateUrl;

        stylesheetUrl = stylesheetUrl ?? self.stylesheets;

        scriptUrl = scriptUrl ?? self.scripts;

        await this.importPartial(templateUrl, true);

        await this.importContext(dataUrl, true);

        self.stylesheets = await this.importElement(stylesheetUrl, "style", document.head);

        self.scripts = await this.importElement(scriptUrl, "script", document.head);

        if (self.autoRender) self.render(self.target);

        return self;
    }

    /**
     * - Gets HTML from a template already on the page. Can render if the
     * target is already set. 
     * @param {string} selector 
     * @returns a reference to the template instance for chaining. 
     */
    load(selector) {

        if (!selector) {
            selector = `[data-template-for='${this.target.replace("#", "")}']`
        }

        let template = document.querySelector(selector);

        let engine = template.dataset.engine ?? "default";

        this.html = template.innerHTML ?? "<em>No Template Found</em>";

        this.engine = engine;

        if (this.autoRender) this.render(this.target);

        return this;
    }

    /**
     * - Renders the current template to the innerHTML of the element
     * matching the provided selector. 
     * @param {string} selector 
     * @returns a reference to the tamplet instance for chaining. 
     */
    render(selector) {

        if (!selector && this.target.length > 1) {
            selector = this.target;
        }

        let target = document.querySelector(selector);

        let rendered = this.engines[this.engine]?.();

        this.rendered = rendered;

        if ("innerHTML" in target) {
            target.innerHTML = rendered;
        }
        return this.rendered;
    }

}