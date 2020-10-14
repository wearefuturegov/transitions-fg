// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel/src/builtins/bundle-url.js"}],"node_modules/reset-css/reset.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/header/header.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"/Users/caroleancia/Documents/projects/futuregov/images/chevron.svg":[["chevron.e78f122e.svg","images/chevron.svg"],"images/chevron.svg"],"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/header/index.js":[function(require,module,exports) {
"use strict";

require("./header.scss");

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".parent > .navigation-link");
  var hamburger = document.querySelector("#nav-toggle");
  var navigation = document.querySelector("#navigation-wrapper");

  function toggleMenu(navLink, event) {
    event.stopPropagation();
    var isOpened = navLink.parentNode.classList.contains('open');

    if (isOpened) {
      navLink.parentNode.classList.remove("open");
    } else {
      navLink.parentNode.classList.add("open");
    }
  } //toggling the menu on click on the element


  navLinks.forEach(function (navLink) {
    var subMenuLinks = navLink.parentNode.querySelectorAll('.sub-navigation .navigation-link');
    navLink.addEventListener('click', function (event) {
      toggleMenu(navLink, event);
    });
    navLink.addEventListener('keypress', function (event) {
      toggleMenu(navLink, event);
    });
    subMenuLinks.forEach(function (subLink) {
      subLink.addEventListener('focusout', function (event) {
        if (subLink === subMenuLinks[subMenuLinks.length - 1]) {
          subLink.parentNode.parentNode.parentNode.classList.remove("open");
        }
      });
    });
  });
  /* Mobile menu handling */

  hamburger.addEventListener('click', function (event) {
    event.stopPropagation();
    var isOpened = navigation.classList.contains('open');

    if (isOpened) {
      navigation.classList.remove("open");
      hamburger.classList.remove("close");
    } else {
      navigation.classList.add("open");
      hamburger.classList.add("close");
    }
  });
});
},{"./header.scss":"components/header/header.scss"}],"components/banner/banner.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/banner/index.js":[function(require,module,exports) {
"use strict";

require("./banner.scss");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.querySelector("#carousel");
  var slides = document.querySelectorAll(".carousel-item");
  var pagination = document.querySelectorAll(".carousel-pager");
  var hooks = document.querySelectorAll(".carousel-hook");
  var totalItems = slides.length;
  var timer = 3000; //slide timer

  var slide = 0; // current slide

  var playing = false; // carousel currently playing

  var loopedThrough; // carousel looped through all the slides

  var interval;
  var longTouch = false; // long or short touch event

  var touchTimer;
  var touchDuration = 1000; // tier to determine long or short touch

  var scroll = false; // determines if the touch event is a swipe or just a tap

  /* carousel functions */
  // remove all the active (from previous run or while we change page)

  function removeActive() {
    [].concat(_toConsumableArray(slides), _toConsumableArray(pagination), _toConsumableArray(hooks)).forEach(function (el) {
      el.classList.remove("active");
    });
  } // sets the active page (first one on init, or requested one while we change page)


  function defineActiveSlide(slide) {
    slides[slide].classList.add("active");
    pagination[slide].classList.add("active");
    hooks[slide].classList.add("active");
  } // first init of the carousel


  function initCarousel() {
    loopedThrough = false;
    removeActive();
    defineActiveSlide(0);
  } // changing the slide


  function moveCarouselTo(slide) {
    removeActive();
    defineActiveSlide(slide);
  } // defining the new slide to display and if the carousel ran completely


  function moveNext() {
    slide = slide === totalItems - 1 ? 0 : slide + 1;
    moveCarouselTo(slide);

    if (slide === totalItems - 1) {
      loopedThrough = true;
      playing = false;
    }
  } // autoplaying the carousel once


  function autoplay() {
    playing = true;
    interval = setInterval(function () {
      moveNext();

      if (loopedThrough) {
        pause();
      }
    }, timer);
  } // pauses the carousel


  function pause() {
    playing = false;
    clearInterval(interval);
  } // wrapping function to actually run the carousel


  function startCarousel() {
    initCarousel();
    autoplay();
  }
  /* event handlers */


  function clickAndTouchEndAction(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!playing && !event.target.classList.contains('.carousel-pager')) {
      startCarousel();
    }
  }

  function mouseoverAndLongTouchStartAction(event) {
    event.preventDefault();
    event.stopPropagation();

    if (playing && !loopedThrough && !event.target.classList.contains('.carousel-pager')) {
      pause();
    }
  }

  function mouseoutAndTouchEndAction(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!playing && !loopedThrough && !event.target.classList.contains('.carousel-pager')) {
      startCarousel();
    }
  }
  /* attaching events */
  // mouseover event => pauses the carousel


  carousel.addEventListener('mouseover', function (event) {
    mouseoverAndLongTouchStartAction(event);
  }); // touchstart event => pauses the carousel or relauches it depending on long or short touch

  carousel.addEventListener('touchstart', function (event) {
    if (!touchTimer) {
      touchTimer = setTimeout(function () {
        longTouch = true;
        mouseoverAndLongTouchStartAction(event);
      }, touchDuration);
    }
  });
  carousel.addEventListener("touchmove", function () {
    scroll = true;
  }); // mouseout event => relaunch the carousel

  carousel.addEventListener('mouseout', function (event) {
    mouseoutAndTouchEndAction(event);
  }); // touchend event => relaunch the carousel delayed depending on short or long click

  carousel.addEventListener('touchend', function (event) {
    if (scroll) {
      scroll = false;
      return;
    }

    if (longTouch) {
      longTouch = false;
      clearTimeout(touchTimer);
      mouseoutAndTouchEndAction(event);
    } else {
      clickAndTouchEndAction(event);
    }
  }); //click event => relaunch the carousel if stopped

  carousel.addEventListener('click', function (event) {
    clickAndTouchEndAction(event);
  }); //pagination event

  pagination.forEach(function (pager) {
    pager.addEventListener("click", function (event) {
      var desiredSlide = pager.getAttribute("attr-page");
      pause();
      moveCarouselTo(desiredSlide);
    });
  });
  startCarousel();
});
},{"./banner.scss":"components/banner/banner.scss"}],"components/cards/cards.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/cards/index.js":[function(require,module,exports) {
"use strict";

require("./cards.scss");

document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".cards__box");
  cards.forEach(function (card) {
    var image = card.querySelector('.cards__image-wrapper');
    var cta = card.querySelector('.cards__cta');
    image.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      cta.click();
    });
  });
});
},{"./cards.scss":"components/cards/cards.scss"}],"components/whatwedo/whatwedo.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/whatwedo/index.js":[function(require,module,exports) {
"use strict";

require("./whatwedo.scss");
},{"./whatwedo.scss":"components/whatwedo/whatwedo.scss"}],"components/ourwork/ourwork.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/ourwork/index.js":[function(require,module,exports) {
"use strict";

require("./ourwork.scss");
},{"./ourwork.scss":"components/ourwork/ourwork.scss"}],"components/partners/partners.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/partners/index.js":[function(require,module,exports) {
"use strict";

require("./partners.scss");
},{"./partners.scss":"components/partners/partners.scss"}],"components/newsletter/newsletter.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/newsletter/index.js":[function(require,module,exports) {
"use strict";

require("./newsletter.scss");
},{"./newsletter.scss":"components/newsletter/newsletter.scss"}],"components/footer/footer.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"/Users/caroleancia/Documents/projects/futuregov/images/footer/sociallinks/icon-twitter.svg":[["icon-twitter.9ea00e51.svg","images/footer/sociallinks/icon-twitter.svg"],"images/footer/sociallinks/icon-twitter.svg"],"/Users/caroleancia/Documents/projects/futuregov/images/footer/sociallinks/icon-instagram.svg":[["icon-instagram.f43d2bdd.svg","images/footer/sociallinks/icon-instagram.svg"],"images/footer/sociallinks/icon-instagram.svg"],"/Users/caroleancia/Documents/projects/futuregov/images/footer/sociallinks/icon-linkedin.svg":[["icon-linkedin.00677f5a.svg","images/footer/sociallinks/icon-linkedin.svg"],"images/footer/sociallinks/icon-linkedin.svg"],"/Users/caroleancia/Documents/projects/futuregov/images/footer/sociallinks/icon-youtube.svg":[["icon-youtube.6de96af4.svg","images/footer/sociallinks/icon-youtube.svg"],"images/footer/sociallinks/icon-youtube.svg"],"/Users/caroleancia/Documents/projects/futuregov/images/footer/sociallinks/icon-vimeo.svg":[["icon-vimeo.1db96151.svg","images/footer/sociallinks/icon-vimeo.svg"],"images/footer/sociallinks/icon-vimeo.svg"],"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"components/footer/index.js":[function(require,module,exports) {
"use strict";

require("./footer.scss");
},{"./footer.scss":"components/footer/footer.scss"}],"index.js":[function(require,module,exports) {
"use strict";

require("reset-css");

require("./styles/main.scss");

require("./components/header");

require("./components/banner");

require("./components/cards");

require("./components/whatwedo");

require("./components/ourwork");

require("./components/partners");

require("./components/newsletter");

require("./components/footer");
},{"reset-css":"node_modules/reset-css/reset.css","./styles/main.scss":"styles/main.scss","./components/header":"components/header/index.js","./components/banner":"components/banner/index.js","./components/cards":"components/cards/index.js","./components/whatwedo":"components/whatwedo/index.js","./components/ourwork":"components/ourwork/index.js","./components/partners":"components/partners/index.js","./components/newsletter":"components/newsletter/index.js","./components/footer":"components/footer/index.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49387" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/futuregov.e31bb0bc.js.map