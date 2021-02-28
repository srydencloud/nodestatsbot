/**
 * A date / time formatter (inspired by 'time-stamp' by Jon Schlinkert)
 */
declare module '@eartharoid/dtf' {
	/**
	 * Format a date/time string using placeholders within a string
	 * @param f - string to format (default is 'HH:mm:ss')
	 * @param d - specific time to use, otherwise uses current time
	 * @param l - locale
	 * @returns {string}
	 */
	function dtf(f?: string, d?: Date, l?: string): string;
	export = dtf;

	/**
	 * Format date in a preset style
	 * @param {string} f - 'full', 'long', 'medium', or 'short'
	 * @param {Date} d - specific time to use, otherwise uses current time
	 * @param {string} l - locale
	 * @returns {string}
	 */
	export const date: (f?: string, d?: Date, l?: string) => string;

	/**
	 * Format time in a preset style
	 * @param {string} f - 'full', 'long', 'medium', or 'short'
	 * @param {Date} d - specific time to use, otherwise uses current time
	 * @param {string} l - locale
	 * @returns {string}
	 */
	export const time: (f?: string, d?: Date, l?: string) => string;

	/**
	 * Returns 'am' or 'pm' based on time, same as using ampm placeholder
	 * @param {Date} d - specific time to use, otherwise uses current time
	 * @returns {string}
	 */
	export const ampm: (d?: Date) => string;

	/**
	 * Returns 'AM' or 'PM' based on time, same as using AMPM placeholder
	 * @param {Date} d - specific time to use, otherwise uses current time
	 * @returns {string}
	 */
	export const AMPM: (d?: Date) => string;

	/**
     * Returns 'st', 'nd', 'rd' or 'th' with the number (eg. nth)
     * @param n - an integer
	 * @returns {string}
     */
	export const nth: (n: number) => string;
}