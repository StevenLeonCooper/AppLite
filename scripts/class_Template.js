import { getJsonPromise, getHTML, getJSON, getHtmlPromise } from './helper_ajax.js';

import Mustache from './libs/mustache.js';

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
    enhanceContext(items) {
        Object.assign(this.context, items);
    }

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

    async importPackage(dataUrl, templateUrl) {

        let self = this;

        dataUrl = dataUrl ?? self.dataUrl;
        templateUrl = templateUrl ?? self.templateUrl;

        await this.importPartial(templateUrl, true);

        await this.importContext(dataUrl, true);

        if (self.autoRender) self.render(self.target);

        return self;
    }

    load(selector) {
        let template = document.querySelector(selector);

        let engine = template.dataset.engine ?? "default";

        this.html = template.innerHTML ?? "<em>No Template Found</em>";

        this.engine = engine;

        if (this.autoRender) this.render(this.target);

        return this;
    }

    render(selector) {

        let target = document.querySelector(selector);

        let rendered = this.engines[this.engine]?.();

        this.rendered = rendered;

        if (target?.innerHTML) {
            target.innerHTML = rendered;
        }

        console.log("Rendered HTML to Page")

        return this.rendered;
    }

}