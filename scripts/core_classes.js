// These core classes are small and kept in a single file
// to reduce excessive network requests. 
/**
 * Class representing a performance benchmark.
 */
export class Benchmark {
    constructor(name) {
        this.name = name;
        this.start = performance.now();
        this.result = 0;
    }

    /**
     * 
     * @returns a completed benchmark
     */
    stop() {
        this.result = performance.now() - this.start;
        return this;
    }

    /**
     * verbose benchmark output
     */
    get detailedResults() {
        return `Task "${this.name}" executed in ${this.result} ms.`;
    }
}

/**
 * Class representing the browser's address bar values
 */
export class AddressBar {
    constructor() {
        this.urlParameters = {};
        this.initialValue = window.location.href;
    }

    get params() {
        let queryString = window.location.search.replace("?", "");
        let params = queryString.split("&");
        params.forEach((pair) => {
            let arr = pair.split("=");
            this.urlParameters[arr[0]] = arr[1];
        });

        return this.urlParameters;
    }

    param(key) {
        return this.params[key] ?? null;
    }

    update(url, state) {
        state = state || null;
        history.pushState(state, "", url);
    }

    append(text, state) {
        state = state || null;
        let url = window.location.href + text;
        this.update(url, state);
    }

    changeQuery(text, state) {
        state = state || null;
        let url = window.location.search !== "" ? window.location.href : window.location.href + "?";
        let search = window.location.search || "?";
        url = url.replace(search, text);
        this.update(url, state);
    }

    navigate(url) {
        window.location.href = url;
    }

    redirect(url) {
        window.location.replace(url);
    }

    /**
     * Executes an ANONYMOUS async function before navigating. 
     * You can use this to execute a warning diaglogue. 
     * The implementation is generic to prevent this module from having any dependencies.  
    * @param {String} url 
     * @param {Function} asyncFunction - A function that returns a promise (No Promise, No Redirect)
     */
    safeNavigate(url, asyncFunction) {
        asyncFunction().then?.(() => {
            this.navigate(url);
        });
    }
}
