import { getJsonPromise, getHtmlPromise } from './helper_ajax.js';

import Mustache from './libs/mustache.js';

import {basicRender} from './helper_template.js';

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

        this.engines = {
            default: () => {
                return basicRender(this.html, this.context);
            },
            mustache: () => {
                return Mustache.render(this.html, this.context);
            }
        };

        this.targetElement = document.querySelector(this.target);

        //let {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
    }

    get target(){
        return this.target;
    }

    set target(value){
        this.target = value;
        this.targetElement = document.querySelector(value);
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
            let result = await getHtmlPromise(url);
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

        try {
            let result = await getJsonPromise(url);
            self.context = result;
            if (self.autoRender && noRender != true) self.render(self.target);
            return result;
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
    async importPackage(dataUrl, templateUrl) {

        let self = this;

        dataUrl = dataUrl ?? self.dataUrl;
        
        templateUrl = templateUrl ?? self.templateUrl;

        await this.importPartial(templateUrl, true);

        await this.importContext(dataUrl, true);

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

        if(!selector){
            selector = `[data-template-for='${this.target.replace("#","")}']`
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

        if(!selector && this.target.length > 1){
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