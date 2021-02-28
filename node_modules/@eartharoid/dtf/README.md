# dtf <!-- omit in toc -->

[![npm](https://img.shields.io/npm/v/@eartharoid/dtf/latest?style=flat-square)](https://www.npmjs.com/package/@eartharoid/dtf)   [![GitHub issues](https://img.shields.io/github/issues/eartharoid/dtf?style=flat-square)](https://github.com/eartharoid/dtf/issues)    [![GitHub stars](https://img.shields.io/github/stars/eartharoid/dtf?style=flat-square)](https://github.com/eartharoid/dtf/stargazers)    [![GitHub forks](https://img.shields.io/github/forks/eartharoid/dtf?style=flat-square)](https://github.com/eartharoid/dtf/network)    [![GitHub license](https://img.shields.io/github/license/eartharoid/dtf?style=flat-square)](https://github.com/eartharoid/dtf/blob/master/LICENSE)    ![Codacy grade](https://img.shields.io/codacy/grade/15dc38c312c3430d8ed02c58edb2e8bd?logo=codacy&style=flat-square)    [![Discord support server](https://discordapp.com/api/guilds/451745464480432129/embed.png?style=shield)](https://discord.gg/pXc9vyC)

 A simple date and time formatter with placeholder support.

 > If you are viewing this on NPM or Yarn, please go to [GitHub](https://github.com/eartharoid/dtf) for the most up-to-date documentation.

See [releases](https://github.com/eartharoid/dtf/releases) for changelog.

**Contents:**

- [Features](#features)
- [Install](#install)
	- [Node](#node)
	- [Browser](#browser)
- [How to use](#how-to-use)
	- [Functions](#functions)
		- [Paramaters](#paramaters)
	- [Placeholders](#placeholders)
	- [Formatting a string using placeholders](#formatting-a-string-using-placeholders)
	- [Formatting a specific date / time](#formatting-a-specific-date--time)
	- [Formatting in your locale](#formatting-in-your-locale)
- [Flexibility](#flexibility)
- [Caveats](#caveats)
- [Support](#support)
- [Credits](#credits)

## Features

- Converts strings containing placeholders to timestamps
- Option to format a custom date (in the past or future)
- NEW: Format in your preferred language/locale (default is `en-GB`)
- NEW: Browser support **(can be used server or client side)**
- A range of placeholders and formatting functions
- Extremely lightweight (excluding unnecessary files such as tests and license, it is less than 5KB, or 2KB minified)

This was originally made for my [leekslazylogger](https://www.npmjs.com/package/leekslazylogger) [(github)](https://github.com/eartharoid/leekslazylogger) project to provide easy file naming and timestamp formatting.

## Install

### Node

Download with `npm i @eartharoid/dtf` or `yarn add @eartharoid/dtf`.
Then require the module:

```js
const dtf = require('@eartharoid/dtf');
...
// console.log(dtf())
```

Run `npm examples` to see example outputs.

### Browser

For use in the browser, you can use a CDN:

- <https://cdn.jsdelivr.net/npm/@eartharoid/dtf@latest/lib/index.min.js> (recommended)
- <https://unpkg.com/@eartharoid/dtf/lib/index.min.js>

```html
<script src="A CDN URL FROM ABOVE"></script>
<script>
  ...
  // console.log(dtf())
</script>
```

## How to use

**If you want to see examples in use, look at [examples.js](https://github.com/eartharoid/dtf/blob/master/examples.js).**

### Functions

#### Paramaters

**All parameters are optional**

- f: string - string with placeholders to format
- d: date - date object to use
- l: string - locale
- n: number - nth number
- p: string - length of preset

> See [**Flexibility**](#flexibility) and [**Caveats**](#caveats) below for more information about function parameters.

**Functions using parameters shown above:**

- `(f, d, l)`: returns a formatted string (a timestamp)
- `.ampm(d, l)`: returns `AM` or `PM`
- `.AMPM(d, l)`: returns `AM` or `PM`
- `.nth(n)`: returns `n` with `st, nd, rd, th` (Example: `.nth(5)` -> `5th`)
- `.time(p, d, l)`: Formats time using a preset style
  - p: `full`, `long`, `medium`, or `short` (default is `medium`)
- `.date(p, d, l)`: Formats date using a preset style
  - p: `full`, `long`, `medium`, or `short` (default is `short`)

### Placeholders

All of the accepted placeholders are listed below. These can be used within strings passed to the main `dtf()` formatting function.

[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time placeholders:

| Placeholder | Description                   |    Example |
|-------------|-------------------------------|-----------:|
| `YYYY`      | full year                     |     `2020` |
| `YY`        | short year                    |       `20` |
| `MMMM`      | full month name               | `February` |
| `MMM`       | short month name              |      `Feb` |
| `MM`        | month number (zero-padded)    |       `02` |
| `M`         | single month number           |        `2` |
| `DDDD`      | full day name (zero-padded)   | `Saturday` |
| `DDD`       | short day name                |      `Sat` |
| `DD`        | day number (zero-padded)      |       `01` |
| `D`         | single day number             |        `1` |
| `HH`        | 24h hour (zero-padded)        |       `20` |
| `hh`        | 12h hour (zero-padded)        |       `08` |
| `h`         | single 12h hour               |        `8` |
| `ampm`      | am/pm                         |       `pm` |
| `AMPM`      | AM/PM                         |       `PM` |
| `mm`        | minute (zero-padded)          |       `05` |
| `m`         | single minute                 |        `5` |
| `ss`        | second (zero-padded)          |       `20` |
| `s`         | single second                 |       `20` |
| `SSS`       | milliseconds                  |      `123` |
| `n_YY`      | year of the century           |     `21st` |
| `n_M`       | month of the year             |      `2nd` |
| `n_D`       | day of the month              |      `1st` |
| `n_H`       | hour of the day               |     `20th` |
| `n_h`       | hour of the morning/afternoon |      `8th` |
| `n_m`       | minute of the hour            |      `5th` |
| `n_s`       | second of the minute          |     `20th` |

### Formatting a string using placeholders

The `dtf()` function has 3 optional arguments: `formatString, dateObject, localeString`

Examples:

```js
let time = dtf("HH:mm:ss DD/MM/YY") // 20:05:20 01/02/20
```

```js
let time = dtf("HH:mm:ss on DD/MM/YYYY (DDD, n_D MMMM YYYY)") // 20:05:20 on 01/02/2020 (Sat, 1st February 2020)
```

```js
let time = dtf("h ampm on DDDD") // 8 PM on Saturday
console.log(time) // -> 8 PM on Saturday
```

### Formatting a specific date / time

By default, all functions format the given string using the current time. If you want to format a time in the past or future, you can pass your own `Date` object with any of the functions:

```js
dtf('hh:mm ampm', futureDate); // string with date
dtf(new Date(1)); // only date, will use default string

dtf.date("full", pastDate); // full
dtf.time(pastDate); // will use default preset length
dtf.ampm(pastDate);
```

> See [**Flexibility**](#flexibility) and [**Caveats**](#caveats) below for more information.

### Formatting in your locale

The default locale used by the `()`, `.time()`, `date()` functions is `en-GB`.
The `.nth()` function, `.ampm()`/`.AMPM()` functions, and the `ampm`/`AMPM` placeholders do not support locales.

> *Note that numbers are not affected by the locale option, only words (names of days and months). See **Caveats** below for more information*

```js
dtf('DDD n_D MMMM YYYY', 'en-US'); // custom locale with string
dtf('DDDD n_D MMMM YYYY', new Date(1), 'fr-FR'); // custom locale and string and date

dtf.date('short', new Date(), 'en-US'); // custom locale, preset length, and date
dtf.date('short', 'en-US'); // custom locale and preset length
dtf.date('de-DE'); // only custom locale, default preset length
```

> See [**Flexibility**](#flexibility) and [**Caveats**](#caveats) below for more information.

## Flexibility

With the exception of `.nth()`, all of the parameters for all of the functions are **optional**, and you can include some (such as locale) whilst omitting others that should come before (like date).

All of the following are valid:

```js
console.log(dtf('DDD n_D MMMM YYYY', 'en-US'))
console.log(dtf('DDDD n_D MMMM YYYY', new Date(), 'fr-FR'))

console.log(dtf.date())
console.log(dtf.date('short'))
console.log(dtf.date(new Date()))
console.log(dtf.date('de-DE'))

console.log(dtf.date('long', new Date()))
console.log(dtf.date('short', new Date(), 'en-US'))
console.log(dtf.date('short', 'en-US'))
```

## Caveats

1: To use a custom locale with the main function (`dtf()`) you must also pass `f` (string) or `d` (date object), or both. Examples:

```js
dtf() // valid
dtf('hh:mm') // valid
dtf(new Date()) // valid
dtf('hh:mm', new Date()) // valid
dtf('hh:mm', new Date(), 'fr-FR') // valid
dtf('hh:mm', 'fr-FR') // valid
dtf(new Date(), 'fr-FR') // valid

dtf('de-DE') // invalid - will just return "de-DE"
```

2: When using `.date()` or `.time()`, you cannot pass `d` (date object) and `l` (locale) together without also passing a custom preset length (`p`/`f`). Examples:

```js
dtf.date() // valid
dtf.date('long') // valid
dtf.date(new Date()) // valid
dtf.date('full', new Date()) // valid
dtf.date('full', new Date(), 'de-DE') // valid
dtf.date('short', 'en-US') // valid


dtf.date(new Date(), 'fr-FR') // invalid - locale wil have no affect (will be "en-GB" default)

```

3: This module was designed to be lightweight and for basic use for timestamps and does not fully support timezones and locales. For advanced usage of timezones or locales refer to [Number.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) and [Date.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

## Support

If you need help using this module (everything you need should be either here or in `examples.js`), you can ask for help on my Discord server. If you believe there is a problem with my code, or you want to request a new feature, feel free to create a new issue (but for basic help I will respond faster on Discord).

[![Discord](https://discordapp.com/api/guilds/451745464480432129/widget.png?style=banner4)](https://discord.gg/pXc9vyC)

## Credits

- [Wessel](https://github.com/passthewessel) - helped with RegEx
