/*
https://github.com/RcKeller/userscripts/raw/master/dist/addGlobalStyle.js
*/
/**
Inject Global Styles with top specificity
@param {string} css - CSS rule string to inject

EXAMPLE:
  addGlobalStyle('.entryBody { max-width: 900px; }');
  addGlobalStyle('#feedlyFrame { width: 1230px; }');
  addGlobalStyle('#feedlyPage { width: 900px; }');
  addGlobalStyle('.entryBody .content img { max-width: 850px; width: auto; height: auto; max-height: 600px;}');
*/
'use strict';

function addGlobalStyle(css) {
  var head = void 0;
  var style = void 0;
  head = document.getElementsByTagName('head')[0];
  if (!head) {
    return;
  }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css.replace(/;/g, ' !important;');
  head.appendChild(style);
}
