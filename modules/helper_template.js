import { Template } from "./class_Template.js";

export const template = {};

/**
 * Creates a new Template object. Convenience function for chaining.
 * @param {Object} settings 
 * @returns 
 */
template.new = (settings) => {
    return new Template(settings);
}

