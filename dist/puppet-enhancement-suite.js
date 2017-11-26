// ==UserScript==
// @name         Puppet Enhancement Suite
// @namespace    https://github.com/RcKeller/userscripts
// @version      0.1
// @description  UI Tweaks for Puppet Enterprise, incorporate your own fact types and definitions
// @author       Ryan Keller
// @require      http://code.jquery.com/jquery-latest.min.js
// @require      https://github.com/RcKeller/userscripts/raw/master/dist/waitForKeyElements.js
// @require      https://github.com/RcKeller/userscripts/raw/master/dist/addGlobalStyle.js
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/* jshint ignore:start */
'use strict';
/* jshint ignore:end */
/* jshint esnext: false */
/* jshint esversion: 6 */
/* jshint asi: true */
/* global console */
/* global $ */

(function () {
  console.log('Puppet Enhancement Suite - Placeholder');
  console.log('jQuery loaded:', typeof $ === 'function');
  console.log('waitForKeyElements loaded:', typeof waitForKeyElements === 'function');
  console.log('addGlobalStyle loaded:', typeof addGlobalStyle === 'function');
  //  ...
})();
