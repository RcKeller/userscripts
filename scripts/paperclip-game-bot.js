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
  const tickSpeed = 100
  function Bot (selectors) {
    for (let selector of selectors) {
      const nodes = document.querySelectorAll(selector)
      for (let node of nodes) {
        if (!node.disabled) node.click()
      }
    }
    setTimeout(() => Bot(selectors), tickSpeed)
  }

  const buttons = ['#btnMakePaperclip', '#btnExpandMarketing', '#manufacturingDiv button', '#btnAddProc', '#btnAddMem', '#projectsDiv button']
  Bot(buttons)
})()
