# userscripts
Personal userscripts and functions for TamperMonkey / Greasemonkey

## Boilerplate
Use this boilerplate for loading dependencies (jQuery, my userscript utils).
Run webpack to transpile to cross-browser compatible ES5. Latest and proposed ECMAscript features are all supported.

```
// ==UserScript==
// @name         New Userscript
// @namespace    https://github.com/RcKeller/userscripts
// @version      0.1
// @description  New UserScript w/ jQuery, AJAX selectors and style injector
// @author       Ryan Keller
// @require      http://code.jquery.com/jquery-latest.min.js
// @require      https://github.com/RcKeller/userscripts/raw/master/scripts/waitForKeyElements.js
// @require      https://github.com/RcKeller/userscripts/raw/master/scripts/addGlobalStyle.js
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/* jshint ignore:start */
'use strict'
/* jshint ignore:end */
/* jshint esnext: false */
/* jshint esversion: 6 */
/* jshint asi: true */
/* global console */
/* global $ */

(function () {
  console.log('New UserScript - Test');
  console.log('jQuery loaded:', typeof $ === 'function')
  console.log('waitForKeyElements loaded:', typeof waitForKeyElements === 'function')
  console.log('addGlobalStyle loaded:', typeof addGlobalStyle === 'function')
  //  ...
})()
```

## Include / Require statements

```
// @require      http://code.jquery.com/jquery-latest.min.js
// @require      https://github.com/RcKeller/userscripts/raw/master/scripts/waitForKeyElements.js
// @require      https://github.com/RcKeller/userscripts/raw/master/scripts/addGlobalStyle.js
```
