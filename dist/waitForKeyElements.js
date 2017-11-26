/*
https://github.com/RcKeller/userscripts/raw/master/dist/waitForKeyElements.js
*/
/**
Utility function for detecting and operating on AJAX content after mounting.
IMPORTANT: This function requires your script to have loaded jQuery.

@param {string} selector - The jQuery selector string that specifies the desired element(s)
@param {function} callback - Callback to run when target is found. Passed the jNode as first argument
@param {boolean} [waitOnce] - If false, will continue to scan for
new elements even after the first match
@param {string} iframeSelector - If set, identifies the iframe to search

EXAMPLES:
  waitForKeyElements (
      "div.comments"
      , commentCallbackFunction
  )

  // Page-specific function to do what we want when the node is found.
  function commentCallbackFunction (jNode) {
      jNode.text ("This comment changed by waitForKeyElements().")
  }
*/
'use strict';

function waitForKeyElements(selector, callback, waitOnce, iframeSelector) {
  var targetNodes = void 0;
  var btargetsFound = void 0;

  if (typeof iframeSelector === 'undefined') {
    targetNodes = $(selector);
  } else {
    targetNodes = $(iframeSelector).contents().find(selector);
  }

  if (targetNodes && targetNodes.length > 0) {
    btargetsFound = true;
    //  Found target node(s).  Go through each and act if they are new
    targetNodes.each(function () {
      var jThis = $(this);
      var alreadyFound = jThis.data('alreadyFound') || false;

      if (!alreadyFound) {
        // Call the payload function.
        var cancelFound = callback(jThis);
        if (cancelFound) {
          btargetsFound = false;
        } else {
          jThis.data('alreadyFound', true);
        }
      }
    });
  } else {
    btargetsFound = false;
  }

  // Get the timer-control variable for this selector.
  var controlObj = waitForKeyElements.controlObj || {};
  var controlKey = selector.replace(/[^\w]/g, '_');
  var timeControl = controlObj[controlKey];

  // Now set or clear the timer as appropriate.
  if (btargetsFound && waitOnce && timeControl) {
    // The only condition where we need to clear the timer.
    clearInterval(timeControl);
    delete controlObj[controlKey];
  } else {
    // Set a timer, if needed.
    if (!timeControl) {
      timeControl = setInterval(function () {
        return waitForKeyElements(selector, callback, waitOnce, iframeSelector);
      }, 300);
      controlObj[controlKey] = timeControl;
    }
  }
  waitForKeyElements.controlObj = controlObj;
}
