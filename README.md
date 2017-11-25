# userscripts
Personal userscripts for TamperMonkey / Greasemonkey

## Boilerplate
Use this boilerplate for loading dependencies (jQuery, my userscript utils).
Run webpack to transpile to cross-browser compatible ES5. Latest and proposed ECMAscript features are all supported.

```
// ==UserScript==
// @name         New Userscript
// @namespace    https://github.com/RcKeller/userscripts
// @version      0.1
// @author       Ryan Keller
// @description  New UserScript w/ jQuery, AJAX selectors and style injector
// @require      http://code.jquery.com/jquery-latest.min.js
// @require      https://github.com/RcKeller/userscripts/raw/master/scripts/waitForKeyElements.js
// @require      https://github.com/RcKeller/userscripts/raw/master/scripts/addGlobalStyle.js
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(function () {
  'use strict'
  //  ...
})
```
