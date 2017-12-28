// ==UserScript==
// @name         Paperclip Game Bot
// @namespace    https://github.com/RcKeller/userscripts
// @version      0.1
// @description  Gaming the Paperclip Game
// @author       Ryan Keller
// @match        *://*/paperclips/index2.html
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

// Using callbacks to prevent stack overflow. Tickspeed determines the rate of execution.

(function () {
  var tickSpeed = 100;
  function Bot(selectors) {
    for (var _iterator = selectors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var selector = _ref;

      var nodes = document.querySelectorAll(selector);
      for (var _iterator2 = nodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var node = _ref2;

        if (!node.disabled) node.click();
      }
    }
    setTimeout(function () {
      return Bot(selectors);
    }, tickSpeed);
  }

  var buttons = ['#btnMakePaperclip', '#btnExpandMarketing', '#manufacturingDiv button', '#btnAddProc', '#btnAddMem', '#projectsDiv button'];
  Bot(buttons);
})();
