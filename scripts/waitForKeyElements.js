/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
function waitForKeyElements (selector, callback, waitOnce, iframeSelector) {
  let targetNodes
  let btargetsFound

  if (typeof iframeSelector === 'undefined') {
    targetNodes = $(selector)
  } else {
    targetNodes = $(iframeSelector).contents().find(selector)
  }

  if (targetNodes && targetNodes.length > 0) {
    btargetsFound = true
        //  Found target node(s).  Go through each and act if they are new
    targetNodes.each(function () {
      const jThis = $(this)
      const alreadyFound = jThis.data('alreadyFound') || false

      if (!alreadyFound) {
                // Call the payload function.
        const cancelFound = callback(jThis)
        if (cancelFound) {
          btargetsFound = false
        } else {
          jThis.data('alreadyFound', true)
        }
      }
    })
  } else {
    btargetsFound = false
  }

  // Get the timer-control variable for this selector.
  const controlObj = waitForKeyElements.controlObj || {}
  const controlKey = selector.replace(/[^\w]/g, '_')
  let timeControl = controlObj[controlKey]

  // Now set or clear the timer as appropriate.
  if (btargetsFound && waitOnce && timeControl) {
    // The only condition where we need to clear the timer.
    clearInterval(timeControl)
    delete controlObj[controlKey]
  } else {
    // Set a timer, if needed.
    if (!timeControl) {
      timeControl = setInterval(
        () => waitForKeyElements(selector, callback, waitOnce, iframeSelector),
        300
      )
      controlObj[controlKey] = timeControl
    }
  }
  waitForKeyElements.controlObj = controlObj
}


/***/ })
/******/ ]);