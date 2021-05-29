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