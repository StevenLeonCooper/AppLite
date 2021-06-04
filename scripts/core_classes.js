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
}
