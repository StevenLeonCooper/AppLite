import { ajax } from './helper_ajax.js';

import Mustache from './libs/mustache.js';

import { basicRender } from './helper_template.js';
import { handleError } from './core_errors.js';

/**
 * - A class representing a template for rendering content onto the page. 
 * Setup options include: target (selector/node), dataUrl (url), htmlUrl (url),
 * method (string: replace, append, prepend, appendOnce or prependOnce), 
 * stylesheets (array of URLs), scripts (array of URLs), autoRender (bool),
 * context (data object), html (template HTML), engine (string: mustache/default).
 */
export class Template {
    constructor(settings) {

        if (typeof settings === "object") {
            Object.assign(this, settings);
        }
        // Setup Properties 
        this.target = this.target ?? "#NoTargetSelected";
        this.dataUrl = this.dataUrl ?? null;
        this.htmlUrl = this.htmlUrl ?? null;
        this.method = this.method || "replace";
        this.stylesheets = this.stylesheets || null;
        this.scripts = this.scripts || null;
        this.autoRender = this.autoRender || false;
        this.context = this.context || {};
        this.html = this.html ?? "";
        this.engine = this.engine ?? "mustache";

        // Functional Properties
        this.rendered = this.rendered ?? "";
        this.renderCount = 0;
        this.engines = {
            default: () => {
                return basicRender(this.html, this.context);
            },
            mustache: () => {
                return Mustache.render(this.html, this.context);
                //let {prep_func: ()=>{ return (object, render)=>{//Code Here}}};
            }
        };
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
        return this;
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
            if (self.autoRender && noRender != true) self.render();
            return self;
        }
        catch (error) {
            handleError(error);
            return self;
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

        if (typeof url === "object") {
            self.context = url;
            return self;
        }

        try {
            let result = await ajax.getJSON(url);
            self.context = result;
            if (self.autoRender && noRender != true) self.render();
            return self;
        }
        catch (error) {
            handleError(error);
            return self;
        }
    }

    /**
     * Imports a DOM Element.
     * @param {String | Array} url - URL or Array of URLs
     * @param {*} type 
     * @param {*} parent 
     * @returns 
     */
    async importElement(url, type, parent, property) {

        const self = this;

        if (url == null) {
            return self;
        }

        if (typeof url !== "string" && !Array.isArray(url)) {
            handleError("importElement, Invalid url");
            return self;
        }

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
            self[property] = elements;

            return self;
        }
        catch (error) {
            handleError(error);
            return self;
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

        await this.importElement(stylesheetUrl, "style", document.head, "stylesheets");

        await this.importElement(scriptUrl, "script", document.head, "scripts");

        if (self.autoRender) self.render();

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

        if (this.autoRender) this.render();

        return this;
    }

    insert(target, rendered) {
        const self = this;

        let type = self.method;

        function setupInsert(rendered, onceOnly) {
            let wrapper = document.createElement("div");
            let newId = `${target.id}_${Date.now()}`
            if (onceOnly === true) {
                self.target = `#${newId}`;
                self.method = "replace";
            }
            wrapper.id = newId;
            wrapper.classList.add("dynamic-child")
            wrapper.classList.add(`${target.id}-child`);
            wrapper.classList.add(`render-${self.renderCount}`)
            wrapper.innerHTML = rendered;
            return wrapper;
        }

        const methods = {
            replace: (rendered) => {
                target.innerHTML = rendered;
                let pre = self.renderCount - 1;
                let cur = self.renderCount;

                target.classList.remove(`render-${pre}`);
                target.classList.add(`render-${cur}`);

                let child = target.querySelector(`.render-${pre}`);
                if (child instanceof Node) {

                    child.classList.remove(`render-${pre}`);
                    child.classList.add(`render-${cur}`);
                }
            },
            append: (rendered) => {
                let wrapper = setupInsert(rendered);
                target.append(wrapper);
            },
            prepend: (rendered) => {
                let wrapper = setupInsert(rendered);
                target.prepend(wrapper);
            },
            appendOnce: (rendered) => {
                let wrapper = setupInsert(rendered, true);
                target.prepend(wrapper);
            },
            prependOnce: (rendered) => {
                let wrapper = setupInsert(rendered, true);
                target.prepend(wrapper);
            }
        };

        methods[type]?.(rendered);
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

        if (target instanceof Node) {

            this.insert(target, rendered);
        }

        this.renderCount++;

        console.log(`${target.id} Count: ${this.renderCount}`);

        return this;
    }

}