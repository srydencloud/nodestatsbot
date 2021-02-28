/**
 * @module @eartharoid/dtf
 * @author eartharoid <contact@eartharoid.me>
 * @description A date / time formatter (inspired by 'time-stamp' by Jon Schlinkert)
 * @copyright 2020 Isaac Saunders (eartharoid)
 * @license MIT
 */

// regex for format placeholders
const regex = /\b(?=(YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|HH|hh|h|mm|m|ss|s|SSS|ii|ampm|AMPM|n_YY|n_M|n_D|n_h|n_HH|n_m|n_s]))\1\b/g;

// for nth() function
const nStr = {
	1: 'st',
	2: 'nd',
	3: 'rd',
	11: 'th',
	12: 'th',
	13: 'th'
};

// remove leading 0 for singular numbers
const single = (x) => x[0] === 0 ? x.substring(1) - 12 : x;

// convert 24h time to 12h time 
const h12 = (h) => h > 12 ? h - 12 : h;

/**
 * @description Returns 'st', 'nd', 'rd' or 'th' with the number (eg. nth)
 * @param {number} n - an integer 
 * @returns {string}
 */
const nth = (n) => n += nStr[n.toString().slice(-2)] || nStr[n.toString().slice(-1)] || 'th';

// function for each format code
const placeholders = {
	YYYY: (d, l) => d.toLocaleString(l, {year: 'numeric'}),
	YY: (d, l) => d.toLocaleString(l, {year: '2-digit'}),
	MMMM: (d, l) => d.toLocaleString(l, {month: 'long'}),
	MMM: (d, l) => d.toLocaleString(l, {month: 'short'}),
	MM: (d, l) => d.toLocaleString(l, {month: '2-digit'}),
	M: (d, l) => d.toLocaleString(l, {month: 'numeric'}),
	DDDD: (d, l) => d.toLocaleString(l, {weekday: 'long'}),
	DDD: (d, l) => d.toLocaleString(l, {weekday: 'short'}),
	DD: (d) => ('0' + d.getDate()).slice(-2),
	D: (d) => single(d.getDate()),
	HH: (d) => ('0' + d.getHours()).slice(-2),
	hh: (d) => ('0' + h12(d.getHours())).slice(-2),
	h: (d) => single(h12(d.getHours())),
	mm: (d) => ('0' + d.getMinutes()).slice(-2),
	m: (d) => single(d.getMinutes()),
	ss: (d) => ('0' + d.getSeconds()).slice(-2),
	s: (d) => single(d.getSeconds()),
	SSS: (d) => d.getMilliseconds(),
	ii: (d) => d.getMilliseconds(), // deprecated
	ampm: (d) => d.getHours() >= 12 ? 'pm' : 'am',
	AMPM: (d) => d.getHours() >= 12 ? 'PM' : 'AM',
	n_YY: (d) => nth(parseInt(placeholders.YY(d)) + 1),
	n_M: (d) => nth(parseInt(placeholders.M(d))),
	n_D: (d) => nth(parseInt(placeholders.D(d))),
	n_HH: (d) => nth(parseInt(placeholders.HH(d))),
	n_h: (d) => nth(parseInt(placeholders.h(d))),
	n_m: (d) => nth(parseInt(placeholders.m(d))),
	n_s: (d) => nth(parseInt(placeholders.s(d)))
};

/**
 * @description Format a date/time string using placeholders within a string
 * @param {string} f - string to format (default is 'HH:mm:ss')
 * @param {Date} d - specific time to use, otherwise uses current time
 * @param {string} l - locale
 * @returns {string}
 */
let dtf = (f, d, l) => {
	if (typeof f !== 'string') l = d, d = f, f = 'HH:mm:ss';
	return f.replace(regex, (key) => placeholders[key](!d || typeof d !== 'object' ? new Date() : d, l || d || 'en-GB'));
};


const preset = (t, f, d, l) => {
	if (typeof d !== 'object' || typeof f == 'object') l = d, d = f;
	if(!['full', 'long', 'medium', 'short'].includes(f)) l = f, f = t == 'date' ? 'short' : 'medium';
	let s = {};
	s[t + 'Style'] = f;
	return (!d || typeof d !== 'object' ? new Date() : d).toLocaleString(l || 'en-GB', s);
};

/**
 * @description Format date in a preset style
 * @param {string} f - 'full', 'long', 'medium', or 'short'
 * @param {Date} d - specific time to use, otherwise uses current time
 * @param {string} l - locale
 * @returns {string}
 */
dtf.date = (f, d, l) => preset('date', f, d, l);

/**
 * @description Format time in a preset style
 * @param {string} f - 'full', 'long', 'medium', or 'short'
 * @param {Date} d - specific time to use, otherwise uses current time
 * @param {string} l - locale
 * @returns {string}
 */
dtf.time = (f, d, l) => preset('time', f, d, l);

/**
 * @description Returns 'am' or 'pm' based on time, same as using ampm placeholder
 * @param {Date} d - specific time to use, otherwise uses current time
 * @returns {string}
 */
dtf.ampm = (d) => (!d ? new Date() : d).getHours() >= 12 ? 'pm' : 'am';

/**
 * @description Returns 'AM' or 'PM' based on time, same as using AMPM placeholder
 * @param {Date} d - specific time to use, otherwise uses current time
 * @returns {string}
 */
dtf.AMPM = (d) => (!d ? new Date() : d).getHours() >= 12 ? 'PM' : 'AM';

dtf.nth = nth;

if (typeof exports !== 'undefined') {
	module.exports = dtf; // export module if not in a browser enviroment
}