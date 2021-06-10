class PropList {
    constructor(styleProps, element) {
        this.states = 1;
        this.currentState = 1;
        this.properties = JSON.parse(JSON.stringify(styleProps)); // Deep Clone
        this.element = element;

        const transform = {
            height: (_val) => {
                let cur = this.target.clientHeight + "px";
                this.target.style.height = "auto";
                let calculated = this.target.clientHeight;
                this.target.style.height = cur;
                return `${calculated}px`;
            },
            width: (_val) => {
                let cur = this.target.clientWidth + "px";
                this.target.style.width = "auto";
                let calculated = this.target.clientWidth;
                this.target.style.width = cur;
                return `${calculated}px`;
            },
            default: (val) => {
                return val;
            }
        };
        // Ensure all arrays are the same size. If no values
        // were given for some, just repeat the first value. 
        for (const key in this.properties) {
            let item = this.properties[key];
            if (Array.isArray(item)) {
                if (item.length > this.states) {
                    this.states = item.length;
                }
                if (item.length < this.states) {
                    let diff = this.states - item.length,
                        i = 0;
                    for (i; i <= diff; i++) {
                        item[i] = item[0];
                    }
                }
                item.forEach((val, index) => {
                    // Animating to/from "auto" is not recommended so we'll do
                    // something special to calculate certain values. 
                    if (val === "*") {
                        item[index] = (transform[key] ?? transform.default)(val);
                    }
                });
            }
        }
    }

    get target() {
        if (this.element instanceof Node) return this.element;
        if (typeof this.element === "string") return document.querySelector(this.element);
        return false;
    }

    _get(key, index) {
        const self = this;
        return self.properties[key]?.[index] ?? self.properties[key] ?? null;
    }

    in(key) {

        return this._get(key, 0);
    }

    out(key) {

        return this._get(key, 1);
    }

    _advance(index) {

        if (index < this.states) {
            this.currentState = index + 1;
        }
        if (index === this.states) {
            this.currentState = 1;
        }
        if (index > this.states) {
            throw ("Invalid index used on _advance().");
        }
    }
    // TODO: Implement states for advanced animations
    state(key, index) {
        index = index ?? this.currentState;
        this._advance(index);
        return this._get(key, index);
    }

}

export class Transition {
    /**
     * 
     * @param {string | Array | Node | Object} target - HTML Node(s) to transition (Selector OK)
     * @param {Object} styleProperties - CSS properties as {prop: ['in','out']}
     * @param {number} speedIn - transition duration for "in" (and "out")
     * @param {number} speedOut - (optional) transition duraton for "out"
     */
    constructor(element, styleProperties, speedIn, speedOut, easing) {

        const settings = {};
        let target = null;

        if (arguments.length == 1 && typeof target == "object") {
            let importedSettings = element;
            Object.assign(settings, importedSettings);
        }

        target = settings.target || element;
        styleProperties = settings.css || styleProperties;
        speedIn = settings.speedIn || speedIn;
        speedOut = settings.speedOut || speedOut || speedIn;
        easing = settings.easing || easing;

        this.flip = false;

        this.props = new WeakMap();

        this.speed = {
            in: speedIn,
            out: speedOut
        };

        this.easing = easing ?? "ease";

        this.target = target;

        this.elements.forEach((el) => {
            let propList = new PropList(styleProperties, el);
            this.props.set(el, propList);
        });
    }

    get elements() {
        if (this.target instanceof NodeList) {
            return Array.from(this.target);
        }

        if (this.target instanceof Node) {
            return [this.target];
        }

        if (typeof this.target === "string") {
            return Array.from(document.querySelectorAll(this.target));
        }

    }

    /**
     * Private: Sets/Removes extra data/classes if they were specified via toggleData. 
     * @param {*} element 
     * @param {*} remove 
     * @returns 
     */
    _applyData(element, remove) {
        let data = this.toggleData || null;
        if (data === null) return false;
        let classes = data.classes?.split(" ") || [];
        let datasets = data.data || {};

        classes.forEach((className) => {
            element.classList[(remove ? "remove" : "add")](className);
        });

        for (const key in datasets) {
            let item = datasets[key];
            element[`${(remove ? "remove" : "set")}Attribute`](`data-${key}`, item);
        }
    }

    /**
     * - Executes the transition. 
     * @param {boolean} flip - Choose whether to go from Start to End (default) or End to Start (flipped)
     */
    go(flip) {
        let self = this;
        this.elements.forEach((el) => {

            el.classList.add("in-transit");

            let speed = flip ? self.speed.out : self.speed.in;

            el.style.transition = `all ${speed} ${self.easing}`

            el.addEventListener("transitionend", (e) => {

                el.classList.remove("in-transit");

                self._applyData.bind(self)(el, flip);

            }, { once: true });

            setTimeout(() => {
                for (const key in self.props.get(el).properties) {
                    el.style[key] = flip ? self.props.get(el).in(key, el) : self.props.get(el).out(key, el);
                }
            }, 0);
        });
    }

    /**
     * Toggle between in (default) and out (after) states. 
     * @param {Object} data - Classes/Data to add/remove to the element(s). Format: {classes: "class1 class2", data {prop: val}}
     */
    toggle(data) {
        this.toggleData = data;
        this.go(this.flip);
        this.flip = !this.flip;
    }

    /**
     * This outputs an example settings option, an easier way to use this class for complex transitions. 
     */
    get __settingsDemo() {
        return {
            target: "This can be a query selector, a NodeList or a single Node.",
            easing: "Any of the default CSS speed surve options like ease, ease-in or ease-out",
            speedIn: "The speed value for the first transition (in).",
            speedOut: "Optional: The speed value for the optional back (out) transition.",
            css: {
                propertyName: ["Starting Value (in)", "Ending value (out)"],
                propertyName2: ["Ending value only"]
            },
            toggleData: {
                _info: "This optional parameter adds/removes data/classes when transitioning.",
                data: { key: "value", pairs: "go here" },
                classes: "space separated class names"
            }
        };
    }

}