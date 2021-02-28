const test = require('ava');
const dtf = require('../lib/');

const h12 = (h) => h > 12 ? h - 12 : h;
const single = (x) => x[0] === 0 ? x.substring(1) - 12 : x;


// test dtf() function with no args
test('dtf()', t => {
	let d = new Date;
	let exp = `${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
	t.is(dtf(), exp); // pass or fail
});

// test dtf() function with custom format
test('dtf("h:mm ampm")', t => {
	let d = new Date;
	let exp = `${single(h12(d.getHours()))}:${('0' + d.getMinutes()).slice(-2)} ${d.getHours() >= 12 ? 'pm' : 'am'}`;
	t.is(dtf('h:mm ampm'), exp); // pass or fail
});

// test('dtf("HH:mm:ss)', t => { // disabled because timezones
// 	let d = new Date(0);
// 	let exp = '01:00:00';
// 	t.is(dtf('HH:mm:ss', d), exp); // pass or fail
// });

test('dtf("DDDD", "fr-FR")', t => {
	let d = new Date;
	let exp = d.toLocaleString('fr-FR', {weekday: 'long'});
	t.is(dtf('DDDD', 'fr-FR'), exp); // pass or fail
});

test('dtf("DD/MM/YY", new Date(1))', t => {
	let exp = '70';
	t.is(dtf('YY', new Date(1)), exp); // pass or fail
});

// test('dtf(new Date(1))', t => { // disabled because timezones
// 	let exp = '01:00:00';
// 	t.is(dtf(new Date(1)), exp); // pass or fail
// });
