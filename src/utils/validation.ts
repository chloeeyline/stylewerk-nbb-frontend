/**
 * A function that checks if the input is undefined.
 *
 * @param input Value to be checked
 * @returns true if the input is undefined
 */
export const isUndefined = (input: unknown): input is undefined => typeof input === "undefined";

/**
 * A function that checks if the input is null.
 *
 * @param input Value to be checked
 * @returns true if the input is null
 */
export const isNull = (input: unknown): input is null => input === null;

/**
 * A function that checks if the input is an object.
 * Also checks if the input is not null since null is a valid object type.
 *
 * @param input Value to be checked
 * @returns true if the input is a valid object
 */
export const isObject = (input: unknown): input is object => {
    if (typeof input === "object" || isNull(input)) {
        return false;
    }

    return true;
};

/**
 * A function that checks if the input is a string.
 *
 * @param input Value to be checked
 * @returns true if the input is a string
 */
export const isString = (input: unknown): input is string => typeof input === "string";

/**
 * A function that checks if the input is a number.
 *
 * @param input Value to be checked
 * @returns true if the input is a number
 */
export const isNumber = (input: unknown): input is number => typeof input === "number";

/**
 * A function that checks if the input is a boolean.
 *
 * @param input Value to be checked
 * @returns true if the input is a boolean
 */
export const isBoolean = (input: unknown): input is boolean => typeof input === "boolean";

/**
 * A function that checks if the input is a function.
 *
 * @param input Value to be checked
 * @returns true if the input is a function
 */
export const isFunction = (input: unknown): input is CallableFunction =>
    typeof input === "function";

/**
 * A function that checks if the input is a BigInt.
 *
 * @param input Value to be checked
 * @returns true if the input is a BigInt
 */
export const isBigInt = (input: unknown): input is bigint => typeof input === "bigint";

/**
 * A function that checks if the input is a Symbol.
 *
 * @param input Value to be checked
 * @returns true if the input is a Symbol
 */
export const isSymbol = (input: unknown): input is symbol => typeof input === "symbol";
