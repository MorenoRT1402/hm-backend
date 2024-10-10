//#region Arrays
/**
 * Get random element from an array.
 * 
 * @template T - Array elements type.
 * @param {T[]} arr - Array with selectable elements.
 * @returns {T} - random element from array.
 * @throws {Error} - throw an error if array is empty.
 */
const fromArray = <T>(arr: T[]): T => {
    if (arr.length === 0)
        throw new Error("Array can't be empty.");

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

/**
 * Get a random element from each provided array.
 * 
 * @template T - Type of elements in the arrays.
 * @param {T[][]} arrays - Array of arrays containing selectable elements.
 * @returns {T[]} - An array of random elements, one from each provided array.
 * @throws {Error} - Throws an error if any array is empty.
 */
const fromEachArray = <T>(arrays: T[][]): T[] => arrays.map((array) => fromArray(array));
//#endregion

/**
 * Generate a random float between a specified minimum and maximum value.
 *
 * @param {Object} range - An object containing the min and max values.
 * @param {number} range.min - The minimum value for the random float.
 * @param {number} range.max - The maximum value for the random float.
 * @returns {number} - A random float between the specified min and max.
 * @throws {Error} - Throws an error if min is greater than max.
 */
const number = (range: { min: number, max: number } = {min: 0, max: 1}, decimals:number=2): number => {
    if (range.min > range.max) {
        throw new Error("Minimum value cannot be greater than maximum value.");
    }
    return (+(range.min + Math.random() * (range.max - range.min)).toFixed(decimals));
};

const boolean = (threshold: number = .5) => {
    if (threshold < 0 || threshold > 1) {
      throw new Error('Threshold must be between 0 and 1');
    }
    return Math.random() > threshold;
  };
    
export default { fromArray, fromEachArray, number, boolean }
