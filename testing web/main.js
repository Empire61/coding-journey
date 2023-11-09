(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    'use strict';
    
    var _impression = require('@trustpilot/trustbox-framework-vanilla/modules/impression');
    
    var _impression2 = _interopRequireDefault(_impression);
    
    var _api = require('@trustpilot/trustbox-framework-vanilla/modules/api');
    
    var _utils = require('@trustpilot/trustbox-framework-vanilla/modules/utils');
    
    var _queryString = require('@trustpilot/trustbox-framework-vanilla/modules/queryString');
    
    var _stars = require('@trustpilot/trustbox-framework-vanilla/modules/templates/stars');
    
    var _logo = require('@trustpilot/trustbox-framework-vanilla/modules/templates/logo');
    
    var _dom = require('@trustpilot/trustbox-framework-vanilla/modules/dom');
    
    var _init = require('@trustpilot/trustbox-framework-vanilla/modules/init');
    
    var _init2 = _interopRequireDefault(_init);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    _impression2.default.attachImpressionHandler();
    
    var addUtm = (0, _utils.addUtmParams)('Mini');
    
    var _getQueryString = (0, _queryString.getAsObject)(),
        locale = _getQueryString.locale,
        businessUnitId = _getQueryString.businessunitId,
        _getQueryString$theme = _getQueryString.theme,
        theme = _getQueryString$theme === undefined ? 'light' : _getQueryString$theme,
        location = _getQueryString.location,
        templateId = _getQueryString.templateId,
        fontFamily = _getQueryString.fontFamily,
        textColor = _getQueryString.textColor;
    
    var injectWidgetLinks = function injectWidgetLinks(_ref) {
      var _ref$baseData = _ref.baseData,
          totalNumberOfReviews = _ref$baseData.businessEntity.numberOfReviews.total,
          links = _ref$baseData.links;
    
      var item = document.getElementById('profile-link');
      var baseUrl = totalNumberOfReviews ? links.profileUrl : links.evaluateUrl;
      item.href = addUtm(baseUrl);
    };
    
    var populateNumberOfReviews = function populateNumberOfReviews(_ref2) {
      var locale = _ref2.locale,
          _ref2$baseData = _ref2.baseData,
          _ref2$baseData$busine = _ref2$baseData.businessEntity,
          numberOfReviews = _ref2$baseData$busine.numberOfReviews.total,
          trustScore = _ref2$baseData$busine.trustScore,
          translations = _ref2$baseData.translations;
    
      var reviewsTextContainer = document.getElementById('translations-reviews');
      var trustscoreContainerId = numberOfReviews ? 'businessEntity-numberOfReviews-total' : 'reviews-summary';
      var trustscoreContainer = document.getElementById(trustscoreContainerId);
      var scoreElem = document.getElementById('trust-score');
      var translationString = numberOfReviews ? (0, _utils.insertNumberSeparator)(numberOfReviews, locale) : translations.noReviews;
      (0, _utils.setHtmlContent)(trustscoreContainer, translationString);
      (0, _utils.setTextContent)(scoreElem, trustScore.toFixed(1));
      (0, _utils.setTextContent)(reviewsTextContainer, translations.reviews);
    };
    
    var showWrapper = function showWrapper() {
      var wrapper = document.getElementById('tp-widget-wrapper');
      (0, _dom.removeClass)(wrapper, 'tp-widget-wrapper--placeholder');
    };
    
    var applyCustomStyling = function applyCustomStyling() {
      if (fontFamily) {
        (0, _utils.setFont)(fontFamily);
      }
      if (textColor) {
        (0, _utils.setTextColor)(textColor);
      }
    };
    
    var constructTrustBox = function constructTrustBox(_ref3) {
      var baseData = _ref3.baseData,
          locale = _ref3.locale;
    
      showWrapper();
      (0, _utils.setHtmlLanguage)(locale);
      populateNumberOfReviews({ baseData: baseData, locale: locale });
      (0, _stars.populateStars)(baseData, 'tp-widget-stars');
      (0, _logo.populateLogo)();
      injectWidgetLinks({ baseData: baseData });
      if (baseData.settings.customStylesAllowed) {
        applyCustomStyling();
      }
    };
    
    var fetchParams = {
      businessUnitId: businessUnitId,
      locale: locale,
      theme: theme,
      location: location
    };
    
    (0, _init2.default)(function () {
      return (0, _api.fetchServiceReviewData)(templateId)(fetchParams, constructTrustBox);
    });
    
    },{"@trustpilot/trustbox-framework-vanilla/modules/api":4,"@trustpilot/trustbox-framework-vanilla/modules/dom":11,"@trustpilot/trustbox-framework-vanilla/modules/impression":13,"@trustpilot/trustbox-framework-vanilla/modules/init":14,"@trustpilot/trustbox-framework-vanilla/modules/queryString":16,"@trustpilot/trustbox-framework-vanilla/modules/templates/logo":20,"@trustpilot/trustbox-framework-vanilla/modules/templates/stars":21,"@trustpilot/trustbox-framework-vanilla/modules/utils":23}],11:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.populateElements = /* common-shake removed: exports.hasClass = */ exports.removeClass = exports.addClass = undefined;
    
    var _utils = require('./utils');
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
    
    var hasClass = function hasClass(elem, className) {
      if (elem) {
        var elemClassList = elem.getAttribute('class');
        var classNames = elemClassList ? elemClassList.split(' ') : '';
        return classNames.indexOf(className) !== -1;
      }
      return false;
    };
    
    var addClass = function addClass(elem, forAddition) {
      if (elem) {
        var elemClassList = elem.getAttribute('class');
        var classNames = elemClassList ? elemClassList.split(' ') : [];
    
        if (!hasClass(elem, forAddition)) {
          var newClasses = [].concat(_toConsumableArray(classNames), [forAddition]).join(' ');
          elem.setAttribute('class', newClasses);
        }
      }
    };
    
    var removeClass = function removeClass(elem, forRemoval) {
      if (elem) {
        var classNames = elem.className.split(' ');
        elem.className = classNames.filter(function (name) {
          return name !== forRemoval;
        }).join(' ');
      }
    };
    
    /**
     * Populates a series of elements with HTML content.
     *
     * For each object in a list, either a given string value is used to populate
     * the given element (including optional substitutions); or, where no string
     * value is provided, remove the given element.
     */
    var populateElements = function populateElements(elements) {
      elements.forEach(function (_ref) {
        var element = _ref.element,
            string = _ref.string,
            _ref$substitutions = _ref.substitutions,
            substitutions = _ref$substitutions === undefined ? {} : _ref$substitutions;
    
        if (string) {
          (0, _utils.setHtmlContent)(element, (0, _utils.makeTranslations)(substitutions, string), false);
        } else {
          (0, _utils.removeElement)(element);
        }
      });
    };
    
    exports.addClass = addClass;
    exports.removeClass = removeClass;
    /* common-shake removed: exports.hasClass = */ void hasClass;
    exports.populateElements = populateElements;
    
    },{"./utils":23}],13:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _queryString3 = require('./queryString');
    
    var _utils = require('./utils');
    
    var _rootUri = require('./rootUri');
    
    var _rootUri2 = _interopRequireDefault(_rootUri);
    
    var _xhr = require('./xhr');
    
    var _xhr2 = _interopRequireDefault(_xhr);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
    
    function setCookie(cname, cvalue, expires) {
      var path = 'path=/';
      var domain = 'domain=' + window.location.hostname.replace(/^.*\.([^.]+\.[^.]+)/, '$1');
      var samesite = 'samesite=none';
      var secure = 'secure';
      document.cookie = [cname + '=' + cvalue, path, expires, domain, samesite, secure].join('; ');
      document.cookie = [cname + '-legacy=' + cvalue, path, expires, domain].join('; ');
    }
    
    function makeTrackingUrl(eventName, impressionData) {
      // Destructure the impressionData and query params so that we only pass the
      // desired values for constructing the tracking URL.
      var userId = impressionData.anonymousId,
          _ = impressionData.sessionExpiry,
          impressionParams = _objectWithoutProperties(impressionData, ['anonymousId', 'sessionExpiry']);
    
      var _queryString = (0, _queryString3.getAsObject)(),
          businessUnitId = _queryString.businessunitId,
          widgetId = _queryString.templateId,
          widgetSettings = _objectWithoutProperties(_queryString, ['businessunitId', 'templateId']);
    
      var urlParams = _extends({}, widgetSettings, impressionParams, widgetSettings.group && userId ? { userId: userId } : { nosettings: 1 }, {
        businessUnitId: businessUnitId,
        widgetId: widgetId
      });
      var urlParamsString = Object.keys(urlParams).map(function (property) {
        return property + '=' + encodeURIComponent(urlParams[property]);
      }).join('&');
      return (0, _rootUri2.default)() + '/stats/' + eventName + '?' + urlParamsString;
    }
    
    function setTrackingCookies(eventName, _ref) {
      var session = _ref.session,
          testId = _ref.testId,
          sessionExpiry = _ref.sessionExpiry;
    
      var _queryString2 = (0, _queryString3.getAsObject)(),
          group = _queryString2.group,
          businessUnitId = _queryString2.businessunitId;
    
      if (!group) {
        return;
      }
    
      if (!testId || !session) {
        // eslint-disable-next-line
        console.warn('TrustBox Optimizer test group detected but no running test settings found!');
      }
    
      if (sessionExpiry) {
        var settings = { group: group, session: session, testId: testId };
        setCookie('TrustboxSplitTest_' + businessUnitId, encodeURIComponent(JSON.stringify(settings)), sessionExpiry);
      }
    }
    
    function trackEventRequest(eventName, impressionData) {
      setTrackingCookies(eventName, impressionData);
      var url = makeTrackingUrl(eventName, impressionData);
      try {
        (0, _xhr2.default)({ url: url });
      } catch (e) {
        // do nothing
      }
    }
    
    var trackImpression = function trackImpression(data) {
      trackEventRequest('TrustboxImpression', data);
    };
    
    var trackView = function trackView(data) {
      trackEventRequest('TrustboxView', data);
    };
    
    var trackEngagement = function trackEngagement(data) {
      trackEventRequest('TrustboxEngagement', data);
    };
    
    var id = null;
    
    var attachImpressionHandler = function attachImpressionHandler() {
      (0, _utils.addEventListener)(window, 'message', function (event) {
        if (typeof event.data !== 'string') {
          return;
        }
    
        var e = void 0;
        try {
          e = { data: JSON.parse(event.data) };
        } catch (e) {
          // probably not for us
          return;
        }
    
        if (e.data.command === 'setId') {
          id = e.data.widgetId;
          window.parent.postMessage(JSON.stringify({ command: 'impression', widgetId: id }), '*');
          return;
        }
    
        if (e.data.command === 'impression-received') {
          delete e.data.command;
          trackImpression(e.data);
        }
    
        if (e.data.command === 'trustbox-in-viewport') {
          delete e.data.command;
          trackView(e.data);
        }
      });
    };
    
    var tracking = {
      engagement: trackEngagement,
      attachImpressionHandler: attachImpressionHandler
    };
    
    exports.default = tracking;
    
    },{"./queryString":16,"./rootUri":17,"./utils":23,"./xhr":24}],16:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getAsObject = /* common-shake removed: exports.getQueryParams = */ undefined;
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
    
    var _fn = require('./fn');
    
    /**
     * Convert a parameter string to an object.
     */
    function paramsToObject(paramString) {
      var tokens = ['?', '#'];
      var dropFirstIfToken = function dropFirstIfToken(str) {
        return tokens.indexOf(str[0]) !== -1 ? str.substring(1) : str;
      };
      var toPairs = function toPairs(str) {
        return str.split('&').filter(Boolean).map(function (pairString) {
          var _pairString$split = pairString.split('='),
              _pairString$split2 = _slicedToArray(_pairString$split, 2),
              key = _pairString$split2[0],
              value = _pairString$split2[1];
    
          try {
            var dKey = decodeURIComponent(key);
            var dValue = decodeURIComponent(value);
            return [dKey, dValue];
          } catch (e) {}
        }).filter(Boolean);
      };
      var mkObject = (0, _fn.compose)(_fn.pairsToObject, toPairs, dropFirstIfToken);
      return mkObject(paramString);
    }
    
    /**
     * Get all params from the TrustBox's URL.
     *
     * The only query parameters required to run the initial load of a TrustBox are
     * businessUnitId and templateId. The rest are only used within the TrustBox to
     * make the data call(s) and set options. These are passed as part of the hash
     * to ensure that we can properly utilise browser caching.
     *
     * Note: this only captures single occurences of values in the URL.
     *
     * @param {Location} location - A location object for which to get query params.
     * @return {Object} - All query params for the given location.
     */
    function getQueryParams() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location;
    
      var queryParams = paramsToObject(location.search);
      var hashParams = paramsToObject(location.hash);
      return _extends({}, queryParams, hashParams);
    }
    
    /* common-shake removed: exports.getQueryParams = */ void getQueryParams;
    exports.getAsObject = getQueryParams;
    
    },{"./fn":12}],23:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* common-shake removed: exports.sortAttributeRatings = */ exports.showTrustBox = /* common-shake removed: exports.setWidgetAlignment = */ exports.setTextContent = exports.setTextColor = /* common-shake removed: exports.setPopupAlignment = */ exports.setFont = exports.setHtmlLanguage = exports.setHtmlContent = /* common-shake removed: exports.setBorderColor = */ exports.sanitizeHtmlProp = /* common-shake removed: exports.sanitizeHtml = */ exports.sanitizeColor = exports.removeElement = /* common-shake removed: exports.regulateFollowForLocation = */ /* common-shake removed: exports.range = */ exports.makeTranslations = /* common-shake removed: exports.handlePopoverPosition = */ exports.insertNumberSeparator = /* common-shake removed: exports.injectWidgetLinks = */ /* common-shake removed: exports.getTrustpilotBusinessUnitId = */ exports.getOnPageReady = exports.addUtmParams = exports.addEventListener = undefined;
    
    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-console */
    
    
    var _dom = require('./dom');
    
    var _styleAlignmentPositions = require('./models/styleAlignmentPositions');
    
    var _rootUri = require('./rootUri');
    
    var _rootUri2 = _interopRequireDefault(_rootUri);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
    
    function addEventListener(element, type, listener) {
      if (element) {
        if (element.addEventListener) {
          element.addEventListener(type, listener);
        } else {
          element.attachEvent('on' + type, function (e) {
            e = e || window.event;
            e.preventDefault = e.preventDefault || function () {
              e.returnValue = false;
            };
            e.stopPropagation = e.stopPropagation || function () {
              e.cancelBubble = true;
            };
            listener.call(element, e);
          });
        }
      }
    }
    
    function getOnPageReady() {
      return new Promise(function (resolve) {
        var resolveWithTimeout = function resolveWithTimeout() {
          setTimeout(function () {
            resolve();
          }, 0);
        };
        if (document.readyState === 'complete') {
          resolveWithTimeout();
        } else {
          addEventListener(window, 'load', function () {
            resolveWithTimeout();
          });
        }
      });
    }
    
    function insertNumberSeparator(input, locale) {
      try {
        input.toLocaleString();
      } catch (e) {
        return input;
      }
      return input.toLocaleString(locale || 'en-US');
    }
    
    function setTextContent(element, content) {
      if (!element) {
        console.log('Attempting to set content on missing element');
      } else if ('innerText' in element) {
        // IE8
        element.innerText = content;
      } else {
        element.textContent = content;
      }
    }
    
    var sanitizeHtmlProp = function sanitizeHtmlProp(string) {
      if (typeof string === 'string') {
        string = string.replaceAll('>', '');
        string = string.replaceAll('<', '');
        string = string.replaceAll('"', '');
      }
      return string;
    };
    
    var sanitizeHtml = function sanitizeHtml(string) {
      if (typeof string !== 'string') {
        return string;
      }
      // TODO: Get rid of <a> tags in translations
      // Remove html tags, except <p> <b> <i> <li> <ul> <a> <strong>
      // Breakdown:
      //  (<\/?(?:p|b|i|li|ul|a|strong)\/?>) — 1st capturing group, selects allowed tags (opening and closing)
      //  (?:<\/?.*?\/?>) — non-capturing group (?:), matches all html tags
      //  $1 — keep matches from 1st capturing group as is, matches from non-capturing group will be omitted
      //  /gi — global (matches all occurrences) and case-insensitive
      // Test: https://regex101.com/r/cDa8jr/1
      return string.replace(/(<\/?(?:p|b|i|li|ul|a|strong)\/?>)|(?:<\/?.*?\/?>)/gi, '$1');
    };
    
    /**
     * Safely sets innerHTML to DOM element. Always use it instead of setting .innerHTML directly on element.
     * Sanitizes HTML by default. Use sanitize flag to control this behaviour.
     *
     * @param element
     * @param content
     * @param sanitize
     */
    function setHtmlContent(element, content) {
      var sanitize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    
      if (!element) {
        console.warn('Attempting to set HTML content on missing element');
      } else {
        element.innerHTML = sanitize ? sanitizeHtml(content) : content;
      }
    }
    
    /**
     * Helper function, check if the
     * @param alignment
     * @returns `true` if the supplied value is left or right, false otherwise
     */
    
    var isValidAlignment = function isValidAlignment(alignment) {
      return _styleAlignmentPositions.styleAlignmentPositions.includes(alignment);
    };
    
    /**
     * Set widget alignment, allowed values are `left` and `right`
     *
     * @param elementId
     * @param alignment
     */
    var setWidgetAlignment = function setWidgetAlignment(elementId, alignment) {
      if (!elementId) {
        console.warn('Trustpilot: cannot find stars wrapper element, please contact support!');
        return;
      }
    
      if (!alignment) {
        console.warn('Trustpilot: cannot apply widget alignment, please contact support!');
        return;
      }
    
      var isAlignmentValid = isValidAlignment(alignment);
      console.log('isAlignmentValid: ', isAlignmentValid);
    
      if (!isAlignmentValid) {
        console.warn('Trustpilot: ' + alignment + ' is not a valid widget alignment value, please contact support!');
        return;
      }
    
      var wapperElement = document.getElementById(elementId);
    
      if (!wapperElement) {
        console.error("Trustpilot: couldn't find the stars wrapper element, please contact support!");
        return;
      }
    
      // Note: Element's Id and Class Name are the same
      wapperElement.classList.add(elementId + '--' + alignment);
    };
    
    /**
     * Set popup alignment, allowed values are left and right
     * @param {string} alignment
     * @returns set the position of the popup of the Product Mini and Product Mini Imported widgets to `left` or `right`, as provided by the html data- field
     */
    
    var setPopupAlignment = function setPopupAlignment(alignment) {
      if (!alignment) {
        console.warn('Trustpilot: cannot apply widget alignment, please contact support!');
        return;
      }
    
      var isAlignmentValid = isValidAlignment(alignment);
    
      if (!isAlignmentValid) {
        console.warn('Trustpilot: ' + alignment + ' is not a valid value for style alignment, please contact support!');
        return;
      }
    
      // Note: Element's Id and class name have the same value
      var widgetPopupWrapperElement = document.getElementById('tp-widget-wrapper');
      if (!widgetPopupWrapperElement) {
        console.error('Trustpilot: widget popup is not found, please contact support!');
        return;
      }
    
      var popupStyleAlignment = 'tp-widget-wrapper--' + alignment;
      widgetPopupWrapperElement.classList.add(popupStyleAlignment);
    };
    
    function makeTranslations(translations, string) {
      if (!string) {
        console.log('Missing translation string');
        return '';
      }
      return Object.keys(translations).reduce(function (result, key) {
        return result.split(key).join(translations[key]);
      }, string);
    }
    
    function removeElement(element) {
      if (!element || !element.parentNode) {
        console.log('Attempting to remove a non-existing element');
        return;
      }
      return element.parentNode.removeChild(element);
    }
    
    var showTrustBox = function showTrustBox(theme, hasReviews) {
      var body = document.getElementsByTagName('body')[0];
      var wrapper = document.getElementById('tp-widget-wrapper');
    
      (0, _dom.addClass)(body, theme);
      (0, _dom.addClass)(wrapper, 'visible');
    
      if (!hasReviews) {
        (0, _dom.addClass)(body, 'first-reviewer');
      }
    };
    
    // url can already have query params in it
    var verifyQueryParamSeparator = function verifyQueryParamSeparator(url) {
      return '' + url + (url.indexOf('?') === -1 ? '?' : '&');
    };
    
    var addUtmParams = function addUtmParams(trustBoxName) {
      return function (url) {
        return verifyQueryParamSeparator(url) + 'utm_medium=trustbox&utm_source=' + trustBoxName;
      };
    };
    
    var regulateFollowForLocation = function regulateFollowForLocation(location) {
      return function (element) {
        if (location && element) {
          element.rel = 'nofollow';
        }
      };
    };
    
    var injectWidgetLinks = function injectWidgetLinks(baseData, utmTrustBoxId) {
      var linksClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'profile-url';
      var numberOfReviews = baseData.businessEntity.numberOfReviews.total,
          links = baseData.links;
    
      var items = [].slice.call(document.getElementsByClassName(linksClass));
      var baseUrl = numberOfReviews ? links.profileUrl : links.evaluateUrl;
      for (var i = 0; i < items.length; i++) {
        items[i].href = addUtmParams(utmTrustBoxId)(baseUrl);
      }
    };
    
    // Create a range of numbers, up to (but excluding) the argument.
    // Written to support IE11.
    var range = function range(num) {
      var result = [];
      while (num > 0) {
        result.push(result.length);
        num--;
      }
      return result;
    };
    
    // Shifts the given color to either lighter or darker based on the base value given.
    // Positive values give you lighter color, negative darker.
    var colorShift = function colorShift(col, amt) {
      var validateBounds = function validateBounds(v) {
        return v > 255 ? 255 : v < 0 ? 0 : v;
      };
      var usePound = false;
    
      if (col[0] === '#') {
        col = col.slice(1);
        usePound = true;
      }
    
      var num = parseInt(col, 16);
      if (!num) {
        return col;
      }
    
      var r = (num >> 16) + amt;
      r = validateBounds(r);
    
      var g = (num >> 8 & 0x00ff) + amt;
      g = validateBounds(g);
    
      var b = (num & 0x0000ff) + amt;
      b = validateBounds(b);
    
      var _map = [r, g, b].map(function (color) {
        return color <= 15 ? '0' + color.toString(16) : color.toString(16);
      });
    
      var _map2 = _slicedToArray(_map, 3);
    
      r = _map2[0];
      g = _map2[1];
      b = _map2[2];
    
      return (usePound ? '#' : '') + r + g + b;
    };
    
    var hexToRGBA = function hexToRGBA(hex) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    
      var num = hex[0] === '#' ? parseInt(hex.slice(1), 16) : parseInt(hex, 16);
      var red = num >> 16;
      var green = num >> 8 & 0x00ff;
      var blue = num & 0x0000ff;
      return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
    };
    
    var setTextColor = function setTextColor(textColor) {
      var textColorStyle = document.createElement('style');
      textColorStyle.appendChild(document.createTextNode('\n      * {\n        color: inherit !important;\n      }\n      body {\n        color: ' + textColor + ' !important;\n      }\n      .bold-underline {\n        border-bottom-color: ' + textColor + ' !important;\n      }\n      .bold-underline:hover {\n        border-color: ' + colorShift(textColor, -30) + ' !important;\n      }\n      .secondary-text {\n        color: ' + hexToRGBA(textColor, 0.6) + ' !important;\n      }\n      .secondary-text-arrow {\n        border-color: ' + hexToRGBA(textColor, 0.6) + ' transparent transparent transparent !important;\n      }\n      .read-more {\n        color: ' + textColor + ' !important;\n      }\n    '));
      document.head.appendChild(textColorStyle);
    };
    
    var setBorderColor = function setBorderColor(borderColor) {
      var borderColorStyle = document.createElement('style');
      borderColorStyle.appendChild(document.createTextNode('\n     * {\n        border-color: ' + borderColor + ' !important;\n      }\n    '));
      document.head.appendChild(borderColorStyle);
    };
    
    var setFont = function setFont(fontFamily) {
      var widgetRootUri = (0, _rootUri2.default)();
      var fontFamilyNormalizedForUrl = fontFamily.replace(/\s/g, '-').toLowerCase();
      var fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      // we are using the following three weights in most of our TrustBoxes
      // in future iterations, we can optimize the bytes transferred by having a list of weights per TrustBox
      fontLink.href = widgetRootUri + '/fonts/' + fontFamilyNormalizedForUrl + '.css';
      document.head.appendChild(fontLink);
    
      var cleanFontName = fontFamily.replace(/\+/g, ' ');
      var fontStyle = document.createElement('style');
      fontStyle.appendChild(document.createTextNode('\n    * {\n      font-family: inherit !important;\n    }\n    body {\n      font-family: "' + cleanFontName + '", sans-serif !important;\n    }\n    '));
      document.head.appendChild(fontStyle);
    };
    
    var setHtmlLanguage = function setHtmlLanguage(language) {
      document.documentElement.setAttribute('lang', language);
    };
    
    var sanitizeColor = function sanitizeColor(color) {
      var hexRegExp = /^#(?:[\da-fA-F]{3}){1,2}$/;
      return typeof color === 'string' && hexRegExp.test(color) ? color : null;
    };
    
    var handlePopoverPosition = function handlePopoverPosition(label, popover, container, popUpArrow) {
      var popoverRect = popover.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();
      var labelRect = label.getBoundingClientRect();
    
      if (popoverRect.left < containerRect.left) {
        // We need to stick the popover to the left side of the container
        // Because the `left` and `right` values are relative to the parent,
        // we need to make the following calculation to find where to stick the popover
        popover.style.left = containerRect.left - labelRect.left + 'px';
        popover.style.right = 'auto';
        // Moving the arrow by the distance of the popover shift over X axis
        var newPopupRect = popover.getBoundingClientRect();
        var currentLeftValue = getComputedStyle(popUpArrow).left;
        popUpArrow.style.left = 'calc(' + currentLeftValue + ' + ' + Math.floor(popoverRect.left - newPopupRect.left) + 'px)';
      } else if (popoverRect.right > containerRect.right) {
        // We need to stick the popover to the right side of the container
        // Because the `left` and `right` values are relative to the parent,
        // we need to make the following calculation to find where to stick the popover
        popover.style.right = labelRect.right - containerRect.right + 'px';
        popover.style.left = 'auto';
        // Moving the arrow by the distance of the popover shift over X axis
        var _newPopupRect = popover.getBoundingClientRect();
        var _currentLeftValue = getComputedStyle(popUpArrow).left;
        popUpArrow.style.left = 'calc(' + _currentLeftValue + ' + ' + Math.floor(popoverRect.right - _newPopupRect.right) + 'px)';
      }
    };
    
    var sortAttributeRatings = function sortAttributeRatings(attributeRatingsArray) {
      var sortByName = function sortByName(a, b) {
        return a.name.localeCompare(b.name);
      };
    
      var starAttributes = attributeRatingsArray.filter(function (x) {
        return x.type === 'range_1to5';
      }).sort(sortByName);
      var scaleAttributes = attributeRatingsArray.filter(function (x) {
        return x.type === 'scale';
      }).sort(sortByName);
    
      return [].concat(_toConsumableArray(starAttributes), _toConsumableArray(scaleAttributes));
    };
    
    var getTrustpilotBusinessUnitId = function getTrustpilotBusinessUnitId() {
      // This will be substituted within the buildscripts
      var buid = '#{TrustpilotBusinessUnitId}';
      return buid.indexOf('#') === 0 ? '46d6a890000064000500e0c3' : buid;
    };
    
    exports.addEventListener = addEventListener;
    exports.addUtmParams = addUtmParams;
    exports.getOnPageReady = getOnPageReady;
    /* common-shake removed: exports.getTrustpilotBusinessUnitId = */ void getTrustpilotBusinessUnitId;
    /* common-shake removed: exports.injectWidgetLinks = */ void injectWidgetLinks;
    exports.insertNumberSeparator = insertNumberSeparator;
    /* common-shake removed: exports.handlePopoverPosition = */ void handlePopoverPosition;
    exports.makeTranslations = makeTranslations;
    /* common-shake removed: exports.range = */ void range;
    /* common-shake removed: exports.regulateFollowForLocation = */ void regulateFollowForLocation;
    exports.removeElement = removeElement;
    exports.sanitizeColor = sanitizeColor;
    /* common-shake removed: exports.sanitizeHtml = */ void sanitizeHtml;
    exports.sanitizeHtmlProp = sanitizeHtmlProp;
    /* common-shake removed: exports.setBorderColor = */ void setBorderColor;
    exports.setHtmlContent = setHtmlContent;
    exports.setHtmlLanguage = setHtmlLanguage;
    exports.setFont = setFont;
    /* common-shake removed: exports.setPopupAlignment = */ void setPopupAlignment;
    exports.setTextColor = setTextColor;
    exports.setTextContent = setTextContent;
    /* common-shake removed: exports.setWidgetAlignment = */ void setWidgetAlignment;
    exports.showTrustBox = showTrustBox;
    /* common-shake removed: exports.sortAttributeRatings = */ void sortAttributeRatings;
    
    },{"./dom":11,"./models/styleAlignmentPositions":15,"./rootUri":17}],20:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.populateLogo = /* common-shake removed: exports.makeLogo = */ undefined;
    
    var _templating = require('../templating');
    
    var _dom = require('../dom');
    
    var makeLogo = function makeLogo() {
      return (0, _templating.mkElemWithSvgLookup)('logo');
    };
    
    var populateLogo = function populateLogo() {
      var logoContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tp-widget-logo';
    
      var container = typeof logoContainer === 'string' ? document.getElementById(logoContainer) : logoContainer;
    
      (0, _dom.populateElements)([{
        element: container,
        string: makeLogo()
      }]);
    };
    
    /* common-shake removed: exports.makeLogo = */ void makeLogo;
    exports.populateLogo = populateLogo;
    
    },{"../dom":11,"../templating":22}],14:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    
    var _communication = require('./communication');
    
    var _errorFallback = require('./templates/errorFallback');
    
    var FALLBACK_DELAY = 500;
    
    /**
     * Makes sure that the widget is initialized only when the bootstrapper is present.
     *
     * Sends a "ping" message to the bootstrapper and waits for a "pong" reply before initializing the widget.
     *
     * @param {Function} onInit the callback to be executed when the init is done.
     */
    var init = function init(onInit) {
      var initialized = false;
      (0, _communication.onPong)(function () {
        initialized = true;
        if (typeof onInit === 'function') {
          onInit();
        } else {
          console.warn('`onInit` not supplied');
        }
      });
    
      (0, _communication.ping)();
    
      // we want to avoid rendering the fallback right away in case the "pong" message from the bootstrapper comes back immediately
      // this way we will avoid a flicker from "empty screen" -> "fallback" -> "TrustBox" and have "empty screen" -> "TrustBox"
      setTimeout(function () {
        if (!initialized) {
          (0, _errorFallback.errorFallback)();
        }
      }, FALLBACK_DELAY);
    };
    
    exports.default = init;
    
    },{"./communication":10,"./templates/errorFallback":18}],21:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.populateStars = /* common-shake removed: exports.makeStars = */ undefined;
    
    var _templating = require('../templating');
    
    var _dom = require('../dom');
    
    var _utils = require('../utils');
    
    var makeStars = function makeStars(_ref) {
      var num = _ref.num,
          _ref$trustScore = _ref.trustScore,
          trustScore = _ref$trustScore === undefined ? null : _ref$trustScore,
          _ref$wrapperClass = _ref.wrapperClass,
          wrapperClass = _ref$wrapperClass === undefined ? '' : _ref$wrapperClass,
          color = _ref.color;
    
      var fullPart = Math.floor(num);
      var halfPart = num === fullPart ? '' : ' tp-stars--' + fullPart + '--half';
      var sanitizedColor = (0, _utils.sanitizeColor)(color);
      return (0, _templating.div)({ class: wrapperClass },
      // add a different class so that styles from widgets-styleguide do not apply
      (0, _templating.mkElemWithSvgLookup)('stars', '' + (sanitizedColor ? 'tp-stars-custom-color' : 'tp-stars tp-stars--' + fullPart + halfPart), { rating: num, trustScore: trustScore || num, color: sanitizedColor }));
    };
    
    var populateStars = function populateStars(_ref2) {
      var _ref2$businessEntity = _ref2.businessEntity,
          stars = _ref2$businessEntity.stars,
          trustScore = _ref2$businessEntity.trustScore,
          total = _ref2$businessEntity.numberOfReviews.total;
      var starsContainer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tp-widget-stars';
      var starsColor = arguments[2];
    
      var sanitizedColor = (0, _utils.sanitizeColor)(starsColor);
      var container = typeof starsContainer === 'string' ? document.getElementById(starsContainer) : starsContainer;
    
      // Ensure we properly handle empty review state - we sometimes get a rating
      // back from the API even where we have no reviews, so explicitly check.
      var displayedStars = total ? stars : 0;
    
      (0, _dom.populateElements)([{
        element: container,
        string: makeStars({ num: displayedStars, trustScore: trustScore, color: sanitizedColor })
      }]);
    };
    
    /* common-shake removed: exports.makeStars = */ void makeStars;
    exports.populateStars = populateStars;
    
    },{"../dom":11,"../templating":22,"../utils":23}],4:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* common-shake removed: exports.fetchServiceRevieMultipleData = */ exports.fetchServiceReviewData = /* common-shake removed: exports.constructTrustBoxAndComplete = */ /* common-shake removed: exports.fetchProductReview = */ /* common-shake removed: exports.fetchProductData = */ undefined;
    
    var _fetchData = require('./fetchData');
    
    var _productReviews = require('./productReviews');
    
    var fetchServiceReviewData = function fetchServiceReviewData(templateId) {
      return function (fetchParams, constructTrustBox, passToPopup) {
        (0, _fetchData.fetchData)('/trustbox-data/' + templateId)(fetchParams, constructTrustBox, passToPopup, _fetchData.hasServiceReviews);
      };
    };
    
    var fetchServiceRevieMultipleData = function fetchServiceRevieMultipleData(templateId) {
      return function (fetchParams, constructTrustBox, passToPopup) {
        (0, _fetchData.multiFetchData)('/trustbox-data/' + templateId)(fetchParams, constructTrustBox, passToPopup, _fetchData.hasServiceReviewsMultiFetch);
      };
    };
    
    /* common-shake removed: exports.fetchProductData = */ void _productReviews.fetchProductData;
    /* common-shake removed: exports.fetchProductReview = */ void _productReviews.fetchProductReview;
    /* common-shake removed: exports.constructTrustBoxAndComplete = */ void _fetchData.constructTrustBoxAndComplete;
    exports.fetchServiceReviewData = fetchServiceReviewData;
    /* common-shake removed: exports.fetchServiceRevieMultipleData = */ void fetchServiceRevieMultipleData;
    
    },{"./fetchData":3,"./productReviews":5}],2:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.apiCall = undefined;
    
    var _xhr = require('../xhr');
    
    var _xhr2 = _interopRequireDefault(_xhr);
    
    var _queryString = require('../queryString');
    
    var _rootUri = require('../rootUri');
    
    var _rootUri2 = _interopRequireDefault(_rootUri);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    // Make a random ID where an apiCall requires one.
    var makeId = function makeId(numOfChars) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < numOfChars; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };
    
    /* eslint-disable compat/compat */
    var apiCall = function apiCall(uri, params) {
      return new Promise(function (resolve, fail) {
        var values = void 0;
        var url = void 0;
    
        if (uri.indexOf('/') === 0) {
          values = params || {};
    
          var _getQuerystringAsObje = (0, _queryString.getAsObject)(),
              token = _getQuerystringAsObje.token;
    
          if (token) {
            values.random = makeId(20);
          }
        }
    
        if (uri.indexOf('http') === 0) {
          // is a full url from a paging link, ensure https
          url = uri.replace(/^https?:/, 'https:');
        } else if (uri.indexOf('/') === 0) {
          // is a regular "/v1/..." add domain for local testing (value is empty in prod)
          url = (0, _rootUri2.default)() + uri;
        } else {
          // weird/broken url
          return fail();
        }
    
        return (0, _xhr2.default)({
          url: url,
          data: values,
          success: resolve,
          error: fail
        });
      });
    };
    
    exports.apiCall = apiCall;
    /* eslint-enable compat/compat */
    
    },{"../queryString":16,"../rootUri":17,"../xhr":24}],24:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* global ActiveXObject */
    
    function isIE() {
      var myNav = navigator.userAgent.toLowerCase();
      return myNav.indexOf('msie') !== -1 ? parseInt(myNav.split('msie')[1]) : false;
    }
    
    // adapted (stolen) from https://github.com/toddmotto/atomic
    
    function parse(req) {
      try {
        return JSON.parse(req.responseText);
      } catch (e) {
        return req.responseText;
      }
    }
    
    // http://stackoverflow.com/a/1714899
    function toQueryString(obj) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
      }
      return str.join('&');
    }
    
    function noop() {}
    
    function makeRequest(params) {
      var XMLHttpRequest = window.XMLHttpRequest || ActiveXObject;
      var request = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
      request.open(params.type, params.url, true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 300) {
            params.success(parse(request));
          } else {
            params.error(parse(request));
          }
        }
      };
    
      request.send(params.data);
    }
    
    /* IE9-compatible request function.
    
    IE9 does not permit cross-origin HTTP requests in the usual way. It also does
    not permit a request to be made to a URI with a different protocol from that
    of the page, e.g. an HTTPS request from an HTTP page.
    
    This function makes requests in a manner compatible with IE9's limitations.
    */
    function makeRequestIE(params) {
      var request = new window.XDomainRequest();
      var protocol = window.location.protocol;
      params.url = params.url.replace(/https?:/, protocol);
      request.open(params.type, params.url);
      request.onload = function () {
        params.success(parse(request));
      };
      request.onerror = function () {
        params.error(parse(request));
      };
    
      setTimeout(function () {
        request.send(params.data);
      }, 0);
    }
    
    function xhr(options) {
      var params = {
        type: options.type || 'GET',
        error: options.error || noop,
        success: options.success || noop,
        data: options.data,
        url: options.url || ''
      };
    
      if (params.type === 'GET' && params.data) {
        params.url = params.url + '?' + toQueryString(params.data);
        delete params.data;
      }
    
      if (isIE() && isIE() <= 9) {
        makeRequestIE(params);
      } else {
        makeRequest(params);
      }
    }
    
    exports.default = xhr;
    
    },{}],17:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    
    exports.default = function () {
      var host = '#{WidgetApi.Host}';
      return host.indexOf('#') === 0 ? 'https://widget.tp-staging.com' : host;
    };
    
    },{}],3:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.hasProductReviews = exports.hasServiceReviewsMultiFetch = exports.hasServiceReviews = /* common-shake removed: exports.constructTrustBoxAndComplete = */ exports.multiFetchData = exports.fetchData = undefined;
    
    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _call = require('./call');
    
    var _utils = require('../utils');
    
    var _loader = require('../templates/loader');
    
    var _errorFallback = require('../templates/errorFallback');
    
    var _communication = require('../communication');
    
    var _fn = require('../fn');
    
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    
    function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
    
    /**
     * Define a unique single fetch object key, allowing us to flatten back to a
     * single set of base data. This is arbitrary, and has been selected to ensure
     * it will not be accidentally used in a fetchParamsObject.
     */
    var singleFetchObjectKey = 'default_singleFetch_f98ac77b';
    
    /**
     * Flatten a fetchParamsObject value to one single set of fetchParams, where
     * that object contains only one value, and it is indexed by
     * singleFetchObjectKey.
     */
    var flattenSingleParams = function flattenSingleParams(fetchParamsObject) {
      var keys = Object.keys(fetchParamsObject);
      return singleFetchObjectKey in fetchParamsObject && keys.length === 1 ? fetchParamsObject[singleFetchObjectKey] : fetchParamsObject;
    };
    
    /**
     * Check if business has service reviews
     */
    var hasServiceReviews = function hasServiceReviews(_ref) {
      var total = _ref.businessEntity.numberOfReviews.total;
      return total > 0;
    };
    
    /**
     * Check if a business has service reviews using multi-fetch.
     *
     * This checks that any of the base data sets has service reviews present
     * within it.
     */
    var hasServiceReviewsMultiFetch = function hasServiceReviewsMultiFetch(baseData) {
      var keys = Object.keys(baseData);
      return keys.some(function (k) {
        return hasServiceReviews(baseData[k]);
      });
    };
    
    /**
     * Check if business has imported or regular product reviews
     */
    var hasProductReviews = function hasProductReviews(_ref2) {
      var productReviewsSummary = _ref2.productReviewsSummary,
          importedProductReviewsSummary = _ref2.importedProductReviewsSummary;
    
      var totalProductReviews = productReviewsSummary ? productReviewsSummary.numberOfReviews.total : 0;
      var totalImportedProductReviews = importedProductReviewsSummary ? importedProductReviewsSummary.numberOfReviews.total : 0;
    
      return totalProductReviews + totalImportedProductReviews > 0;
    };
    
    // Construct a base data call promise.
    var baseDataCall = function baseDataCall(uri) {
      return function (_ref3) {
        var businessUnitId = _ref3.businessUnitId,
            locale = _ref3.locale,
            opts = _objectWithoutProperties(_ref3, ['businessUnitId', 'locale']);
    
        var baseDataParams = (0, _fn.rejectNullaryValues)(_extends({
          businessUnitId: businessUnitId,
          locale: locale
        }, opts, {
          theme: null // Force rejection of the theme param
        }));
        return (0, _call.apiCall)(uri, baseDataParams);
      };
    };
    
    /**
     * Call a constructTrustBox callback, and then complete the loading process
     * for the TrustBox.
     */
    var constructTrustBoxAndComplete = function constructTrustBoxAndComplete(constructTrustBox) {
      var passToPopup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var hasReviewsFromBaseData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : hasServiceReviews;
      return function (_ref4) {
        var baseData = _ref4.baseData,
            locale = _ref4.locale,
            theme = _ref4.theme,
            hasMoreReviews = _ref4.hasMoreReviews,
            loadMoreReviews = _ref4.loadMoreReviews;
    
        var hasReviews = hasReviewsFromBaseData(baseData);
    
        constructTrustBox({
          baseData: baseData,
          locale: locale,
          hasMoreReviews: hasMoreReviews,
          loadMoreReviews: loadMoreReviews
        });
    
        // Conditionally send to popup
        var sendOnPopupLoad = function sendOnPopupLoad(_ref5) {
          var event = _ref5.data;
    
          if ((0, _communication.isLoadedMessage)(event)) {
            (0, _communication.sendAPIDataMessage)({
              baseData: baseData,
              locale: locale
            });
          }
        };
        if (passToPopup) {
          (0, _communication.setListener)(sendOnPopupLoad);
        }
    
        (0, _utils.showTrustBox)(theme, hasReviews);
        (0, _errorFallback.removeErrorFallback)();
      };
    };
    
    /**
     * Fetch data from the data API, making zero or more requests.
     *
     * This function accepts an object with arbitrary keys, and values which are
     * each an object containing query params for one request. A request is made
     * for each query param object, and the result is wrapped within an object
     * indexed by the keys of the original argument object.
     *
     * These data, together with locale data, are passed to the
     * constructTrustBox callback.
     *
     * An optional argument, passToPopup, can be provided to this function. If set
     * to a truthy value, this function will attempt to pass the data obtained to
     * any popup iframe.
     */
    var multiFetchData = function multiFetchData(uri) {
      return function (fetchParamsObject, constructTrustBox, passToPopup, hasReviewsFromBaseData) {
        var firstFetchParams = fetchParamsObject[Object.keys(fetchParamsObject)[0]];
        var locale = firstFetchParams.locale,
            _firstFetchParams$the = firstFetchParams.theme,
            theme = _firstFetchParams$the === undefined ? 'light' : _firstFetchParams$the;
    
    
        var baseDataPromises = (0, _fn.promiseAllObject)((0, _fn.mapObject)(baseDataCall(uri), fetchParamsObject));
        var readyPromise = (0, _utils.getOnPageReady)();
    
        // eslint-disable-next-line compat/compat
        var fetchPromise = Promise.all([baseDataPromises, readyPromise]).then(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 1),
              originalBaseData = _ref7[0];
    
          var baseData = flattenSingleParams(originalBaseData);
    
          return {
            baseData: baseData,
            locale: locale,
            theme: theme
          };
        }).then(constructTrustBoxAndComplete(constructTrustBox, passToPopup, hasReviewsFromBaseData)).catch(function (e) {
          if (e && e.FallbackLogo) {
            // render fallback only if allowed, based on the response
            return (0, _errorFallback.errorFallback)();
          }
          // do nothing
        });
    
        (0, _loader.withLoader)(fetchPromise);
      };
    };
    
    // Fetch and structure API data.
    var fetchData = function fetchData(uri) {
      return function (fetchParams, constructTrustBox, passToPopup, hasReviewsFromBaseData) {
        var fetchParamsObject = _defineProperty({}, singleFetchObjectKey, fetchParams);
        multiFetchData(uri)(fetchParamsObject, constructTrustBox, passToPopup, hasReviewsFromBaseData);
      };
    };
    
    exports.fetchData = fetchData;
    exports.multiFetchData = multiFetchData;
    /* common-shake removed: exports.constructTrustBoxAndComplete = */ void constructTrustBoxAndComplete;
    exports.hasServiceReviews = hasServiceReviews;
    exports.hasServiceReviewsMultiFetch = hasServiceReviewsMultiFetch;
    exports.hasProductReviews = hasProductReviews;
    
    },{"../communication":10,"../fn":12,"../templates/errorFallback":18,"../templates/loader":19,"../utils":23,"./call":2}],10:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* common-shake removed: exports.scrollToTrustBox = */ exports.onPong = exports.ping = /* common-shake removed: exports.isPopupToggleMessage = */ /* common-shake removed: exports.isAPIDataMessage = */ exports.sendAPIDataMessage = exports.isLoadedMessage = exports.setListener = /* common-shake removed: exports.resizeHeight = */ /* common-shake removed: exports.setStyles = */ /* common-shake removed: exports.loaded = */ /* common-shake removed: exports.focusModal = */ /* common-shake removed: exports.hideModal = */ /* common-shake removed: exports.showModal = */ /* common-shake removed: exports.focusPopup = */ /* common-shake removed: exports.hidePopup = */ /* common-shake removed: exports.showPopup = */ /* common-shake removed: exports.hideTrustBox = */ /* common-shake removed: exports.createModal = */ /* common-shake removed: exports.createPopup = */ /* common-shake removed: exports.send = */ undefined;
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _utils = require('./utils.js');
    
    var wparent = window.parent;
    var messageQueue = [];
    var defaultOptions = {
      command: 'createIFrame',
      position: 'center top',
      show: false,
      source: 'popup.html',
      queryString: ''
    };
    var popupOptions = {
      name: 'popup',
      modal: false,
      styles: {
        height: '300px',
        width: ''
      }
    };
    var modalOptions = {
      name: 'modal',
      modal: true,
      styles: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        margin: '0 auto',
        zindex: 99
      }
    };
    
    var id = null;
    var listenerCallbacks = [];
    
    function sendMessage(message) {
      if (id) {
        message.widgetId = id;
        message = JSON.stringify(message); // This is to make it IE8 compatible
        wparent.postMessage(message, '*');
      } else {
        messageQueue.push(message);
      }
    }
    
    function sendMessageTo(target) {
      return function (message) {
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return sendMessage(_extends({}, payload, {
          message: message,
          command: 'message',
          name: target
        }));
      };
    }
    
    function sendQueue() {
      while (messageQueue.length) {
        sendMessage(messageQueue.pop());
      }
    }
    
    function createPopupIframe(options) {
      sendMessage(_extends({}, defaultOptions, popupOptions, options));
    }
    
    function createModalIframe(options) {
      sendMessage(_extends({}, defaultOptions, modalOptions, options));
    }
    
    function setStyles(styles, optionalIframeName) {
      sendMessage({ command: 'setStyle', name: optionalIframeName, style: styles });
    }
    
    function showIframe(iframeName) {
      sendMessage({ command: 'show', name: iframeName });
      sendMessageTo('main')(iframeName + ' toggled', { visible: true });
    }
    
    function hideIframe(iframeName) {
      sendMessage({ command: 'hide', name: iframeName });
      sendMessageTo('main')(iframeName + ' toggled', { visible: false });
    }
    
    function focusIframe(iframeName) {
      sendMessage({ command: 'focus', name: iframeName });
    }
    
    function sendLoadedMessage() {
      sendMessage({ command: 'loaded' });
    }
    
    function isLoadedMessage(message) {
      return message === 'loaded';
    }
    
    /**
     * Send data obtained from an API call to a popup iframe.
     */
    function sendAPIDataMessage(data) {
      sendMessageTo('popup')('API data', data);
    }
    
    /**
     * Test if two messages are of the same type.
     *
     * Ignores any additional data contained within the message.
     */
    function areMatchingMessages(message, otherMessage) {
      return ['message', 'command', 'name'].every(function (key) {
        return message[key] && otherMessage[key] && message[key] === otherMessage[key];
      });
    }
    
    function isAPIDataMessage(message) {
      return areMatchingMessages(message, {
        command: 'message',
        name: 'popup',
        message: 'API data'
      });
    }
    
    function isPopupToggleMessage(message) {
      return areMatchingMessages(message, {
        command: 'message',
        name: 'main',
        message: 'popup toggled'
      });
    }
    
    function addCallbackFunction(func) {
      listenerCallbacks.push(func);
    }
    
    function hideMainIframe() {
      hideIframe('main');
    }
    
    function showPopupIframe() {
      showIframe('popup');
    }
    
    function hidePopupIframe() {
      hideIframe('popup');
    }
    
    function focusPopupIframe() {
      focusIframe('popup');
    }
    
    function showModalIframe() {
      showIframe('modal');
    }
    
    function hideModalIframe() {
      hideIframe('modal');
    }
    
    function focusModalIframe() {
      focusIframe('modal');
    }
    
    var sendPing = function sendPing() {
      return sendMessage({ command: 'ping' });
    };
    
    var onPong = function onPong(cb) {
      var pong = function pong(event) {
        if (event.data.command === 'pong') {
          // eslint-disable-next-line callback-return
          cb(event);
        }
      };
      addCallbackFunction(pong);
    };
    
    function resizeHeight(optionalHeight, optionalIframeName) {
      var body = document.getElementsByTagName('body')[0];
      sendMessage({
        command: 'resize-height',
        name: optionalIframeName,
        height: optionalHeight || body.offsetHeight
      });
    }
    
    function scrollToTrustBox(targets) {
      sendMessage({
        command: 'scrollTo',
        targets: targets
      });
    }
    
    (0, _utils.addEventListener)(window, 'message', function (event) {
      if (typeof event.data !== 'string') {
        return;
      }
    
      var e = void 0;
      try {
        e = { data: JSON.parse(event.data) }; // This is to make it IE8 compatible
      } catch (e) {
        return; // probably not for us
      }
    
      if (e.data.command === 'setId') {
        id = e.data.widgetId;
        sendQueue();
      } else {
        for (var i = 0; i < listenerCallbacks.length; i++) {
          var callback = listenerCallbacks[i];
          // eslint-disable-next-line callback-return
          callback(e);
        }
      }
    });
    
    /* common-shake removed: exports.send = */ void sendMessage;
    /* common-shake removed: exports.createPopup = */ void createPopupIframe;
    /* common-shake removed: exports.createModal = */ void createModalIframe;
    /* common-shake removed: exports.hideTrustBox = */ void hideMainIframe;
    /* common-shake removed: exports.showPopup = */ void showPopupIframe;
    /* common-shake removed: exports.hidePopup = */ void hidePopupIframe;
    /* common-shake removed: exports.focusPopup = */ void focusPopupIframe;
    /* common-shake removed: exports.showModal = */ void showModalIframe;
    /* common-shake removed: exports.hideModal = */ void hideModalIframe;
    /* common-shake removed: exports.focusModal = */ void focusModalIframe;
    /* common-shake removed: exports.loaded = */ void sendLoadedMessage;
    /* common-shake removed: exports.setStyles = */ void setStyles;
    /* common-shake removed: exports.resizeHeight = */ void resizeHeight;
    exports.setListener = addCallbackFunction;
    exports.isLoadedMessage = isLoadedMessage;
    exports.sendAPIDataMessage = sendAPIDataMessage;
    /* common-shake removed: exports.isAPIDataMessage = */ void isAPIDataMessage;
    /* common-shake removed: exports.isPopupToggleMessage = */ void isPopupToggleMessage;
    exports.ping = sendPing;
    exports.onPong = onPong;
    /* common-shake removed: exports.scrollToTrustBox = */ void scrollToTrustBox;
    
    },{"./utils.js":23}],12:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    
    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
    
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    
    // Convert reduce method into a function
    var reduce = function reduce(f) {
      return function (init) {
        return function (xs) {
          return xs.reduce(f, init);
        };
      };
    };
    
    // Convert filter method into a function
    var filter = function filter(p) {
      return function (xs) {
        return xs.filter(p);
      };
    };
    
    // Convert map method into a function
    var map = function map(f) {
      return function (xs) {
        return xs.map(f);
      };
    };
    
    // Implementation of map, but for an object. Values are replaced with the result
    // of calling the passed function of them; keys remain unchanged.
    var mapObject = function mapObject(f, obj) {
      return Object.keys(obj).reduce(function (all, k) {
        return _extends({}, all, _defineProperty({}, k, f(obj[k])));
      }, {});
    };
    
    // Transforms an object containing arbitrary keys, and promise values, into a
    // promise-wrapped object, with the same keys and the result of resolving each
    // promise as values.
    var promiseAllObject = function promiseAllObject(obj) {
      var keys = Object.keys(obj);
      var values = keys.map(function (k) {
        return obj[k];
      });
      // eslint-disable-next-line compat/compat
      return Promise.all(values).then(function (promises) {
        return promises.reduce(function (all, promise, idx) {
          return _extends({}, all, _defineProperty({}, keys[idx], promise));
        }, {});
      });
    };
    
    /**
     * Convert an array containing pairs of values into an object.
     *
     *   [[k1, v1], [k2, v2], ... ] -> { [k1]: v1, [k2]: v2, ... }
     */
    var pairsToObject = function pairsToObject(pairs) {
      return pairs.reduce(function (obj, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];
    
        return _extends({}, obj, _defineProperty({}, k, v));
      }, {});
    };
    
    var isNullary = function isNullary(value) {
      return typeof value === 'undefined' || value === null;
    };
    
    var isNullaryOrFalse = function isNullaryOrFalse(value) {
      return isNullary(value) || value === false;
    };
    
    // Filter out all null or undefined values from an object.
    var rejectNullaryValues = function rejectNullaryValues(obj) {
      return Object.keys(obj).reduce(function (newObj, key) {
        return _extends({}, newObj, isNullary(obj[key]) ? {} : _defineProperty({}, key, obj[key]));
      }, {});
    };
    
    /**
     * Split an array of values into chunks of a given size.
     *
     * If the number of values does not divide evenly into the chunk size, the
     * final chunk will be smaller than chunkSize.
     *
     *   chunk 2 [a, b, c, d, e, f, g] -> [[a, b], [c, d], [e, f], [g]]
     */
    var chunk = function chunk(chunkSize) {
      return reduce(function (chunks, val, idx) {
        var lastChunk = chunks[chunks.length - 1];
        var isNewChunk = idx % chunkSize === 0;
        var newChunk = isNewChunk ? [val] : [].concat(_toConsumableArray(lastChunk), [val]);
        return [].concat(_toConsumableArray(chunks.slice(0, chunks.length - (isNewChunk ? 0 : 1))), [newChunk]);
      })([]);
    };
    
    /**
     * Split an array of values into chunks of a given size, and then transpose values.
     *
     * This is equivalent to {@link 'chunk'}, but with the values transposed:
     *
     *   chunkTranspose 2 [a, b, c, d, e, f, g] -> [[a, c, e, g], [b, d, f]]
     *
     * The transposition has the effect of turning an array of x chunks of size n,
     * into an array of n chunks of size x.
     */
    var chunkTranspose = function chunkTranspose(chunkSize) {
      return reduce(function (chunks, val, idx) {
        var chunkIdx = idx % chunkSize;
        var newChunk = [].concat(_toConsumableArray(chunks[chunkIdx] || []), [val]);
        return [].concat(_toConsumableArray(chunks.slice(0, chunkIdx)), [newChunk], _toConsumableArray(chunks.slice(chunkIdx + 1)));
      })([]);
    };
    
    /**
     * Compose a series of functions together.
     *
     * Equivalent to applying an array of functions to a value, right to left.
     *
     *   compose(f, g, h)(x) === f(g(h(x)))
     *
     */
    var compose = function compose() {
      for (var _len = arguments.length, fs = Array(_len), _key = 0; _key < _len; _key++) {
        fs[_key] = arguments[_key];
      }
    
      return function (x) {
        return fs.reduceRight(function (val, f) {
          return f(val);
        }, x);
      };
    };
    
    // Pipe a value through a series of functions which terminates immediately on
    // receiving a nullary value.
    var pipeMaybe = function pipeMaybe() {
      for (var _len2 = arguments.length, fs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        fs[_key2] = arguments[_key2];
      }
    
      return function (x) {
        return fs.reduce(function (val, f) {
          return isNullary(val) ? val : f(val);
        }, x);
      };
    };
    
    // Get first value from an array
    var first = function first(_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
          x = _ref5[0];
    
      return x;
    };
    
    // First first value matching predicate p in an array of values.
    var find = function find(p) {
      return pipeMaybe(filter(p), first);
    };
    
    // Get a value from an object at a given key.
    var prop = function prop(k) {
      return function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return obj[k];
      };
    };
    
    // Get a value from an object at a given key if it exists.
    var propMaybe = function propMaybe(k) {
      return function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return obj[k] || obj;
      };
    };
    
    // Test if a value is false or nullary, returning null if true, or a second value if false.
    // Intended for use within a pipeMaybe where you want to terminate execution where
    // an arbitrary value is null.
    var guard = function guard(p) {
      return function (x) {
        return isNullaryOrFalse(p) ? null : x;
      };
    };
    
    /* common-shake removed: exports.chunk = */ void chunk;
    /* common-shake removed: exports.chunkTranspose = */ void chunkTranspose;
    exports.compose = compose;
    /* common-shake removed: exports.filter = */ void filter;
    exports.find = find;
    /* common-shake removed: exports.first = */ void first;
    exports.guard = guard;
    exports.map = map;
    exports.mapObject = mapObject;
    exports.pairsToObject = pairsToObject;
    exports.pipeMaybe = pipeMaybe;
    exports.promiseAllObject = promiseAllObject;
    exports.prop = prop;
    exports.propMaybe = propMaybe;
    exports.rejectNullaryValues = rejectNullaryValues;
    
    },{}],18:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.removeErrorFallback = exports.errorFallback = undefined;
    
    var _dom = require('../dom');
    
    var _templating = require('../templating');
    
    var _utils = require('../utils');
    
    var errorFallback = function errorFallback() {
      var containerElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tp-widget-fallback';
    
      var container = document.getElementById(containerElement);
    
      (0, _dom.populateElements)([{
        element: container,
        string: (0, _templating.a)({
          href: 'https://www.trustpilot.com?utm_medium=trustboxfallback',
          target: '_blank',
          rel: 'noopener noreferrer'
        }, (0, _templating.mkElemWithSvgLookup)('logo', 'fallback-logo'))
      }]);
    };
    
    var removeErrorFallback = function removeErrorFallback() {
      var containerElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tp-widget-fallback';
    
      var container = document.getElementById(containerElement);
      (0, _utils.removeElement)(container);
    };
    
    exports.errorFallback = errorFallback;
    exports.removeErrorFallback = removeErrorFallback;
    
    },{"../dom":11,"../templating":22,"../utils":23}],19:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.withLoader = undefined;
    
    var _dom = require('../dom');
    
    var _utils = require('../utils');
    
    var _templating = require('../templating');
    
    var defaultLoaderContainer = 'tp-widget-loader';
    
    var addLoader = function addLoader(loaderElement) {
      var loader = document.getElementById(loaderElement);
    
      (0, _dom.populateElements)([{
        element: loader,
        string: (0, _templating.mkElemWithSvgLookup)('logo')
      }]);
    };
    
    var removeLoader = function removeLoader(loaderElement) {
      var loader = document.getElementById(loaderElement);
      var loaderLoadedClass = loaderElement + '--loaded';
      (0, _dom.addClass)(loader, loaderLoadedClass);
    
      // Remove loader after completion of animation.
      if (loader) {
        loader.addEventListener('animationend', function () {
          return (0, _utils.removeElement)(loader);
        });
        loader.addEventListener('webkitAnimationEnd', function () {
          return (0, _utils.removeElement)(loader);
        });
        loader.addEventListener('oanimationend', function () {
          return (0, _utils.removeElement)(loader);
        });
      }
    };
    
    // Creates a loader element in the DOM, then resolves a passed promise and removes
    // the loader once complete. The loader is displayed only after the passed delay
    // has elapsed.
    var withLoader = function withLoader(promise) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$loaderElement = _ref.loaderElement,
          loaderElement = _ref$loaderElement === undefined ? defaultLoaderContainer : _ref$loaderElement,
          _ref$delay = _ref.delay,
          delay = _ref$delay === undefined ? 1000 : _ref$delay;
    
      var loaderTimeoutId = setTimeout(function () {
        return addLoader(loaderElement);
      }, delay);
      return promise.finally(function () {
        clearTimeout(loaderTimeoutId);
        removeLoader(loaderElement);
      });
    };
    
    exports.withLoader = withLoader;
    
    },{"../dom":11,"../templating":22,"../utils":23}],5:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* common-shake removed: exports.fetchProductReview = */ /* common-shake removed: exports.fetchProductData = */ undefined;
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _fetchData = require('./fetchData');
    
    var _call = require('./call');
    
    var _reviewFetcher = require('./reviewFetcher');
    
    var _reviewFetcher2 = _interopRequireDefault(_reviewFetcher);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
    
    /**
     * Fetches data for a product attribute TrustBox.
     *
     * This uses a "new-style" endpoint, which takes a templateId and supplies data
     * based on that.
     */
    var fetchProductData = function fetchProductData(templateId) {
      return function (fetchParams, constructTrustBox) {
        var passToPopup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var includeImportedReviews = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    
        // Add extra data to the constructTrustBox callback, where we are fetching reviews
        var wrappedConstruct = function wrappedConstruct(_ref) {
          var baseData = _ref.baseData,
              locale = _ref.locale,
              args = _objectWithoutProperties(_ref, ['baseData', 'locale']);
    
          var fetcher = new _reviewFetcher2.default(_extends({
            baseData: baseData,
            includeImportedReviews: includeImportedReviews,
            reviewsPerPage: parseInt(fetchParams.reviewsPerPage),
            locale: locale
          }, args));
          return fetcher.consumeReviews(constructTrustBox)();
        };
    
        var construct = fetchParams.reviewsPerPage > 0 ? wrappedConstruct : constructTrustBox;
        (0, _fetchData.fetchData)('/trustbox-data/' + templateId)(fetchParams, construct, passToPopup, _fetchData.hasProductReviews);
      };
    };
    
    /**
     * Fetches product review data given an ID and a locale.
     */
    var fetchProductReview = function fetchProductReview(productReviewId, locale, callback) {
      (0, _call.apiCall)('/product-reviews/' + productReviewId, { locale: locale }).then(callback);
    };
    
    /* common-shake removed: exports.fetchProductData = */ void fetchProductData;
    /* common-shake removed: exports.fetchProductReview = */ void fetchProductReview;
    
    },{"./call":2,"./fetchData":3,"./reviewFetcher":6}],6:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    var _fn = require('../../fn');
    
    var _call = require('../call');
    
    var _util = require('./util');
    
    var _responseProcessor = require('./responseProcessor');
    
    var _responseProcessor2 = _interopRequireDefault(_responseProcessor);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
    
    function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var NO_REVIEWS_ERROR = 'No reviews available';
    
    /**
     * This class provides reviews on request of a consumer. It collects reviews
     * through paginated API calls, and then provides one page of reviews on request
     * from the consumer.
     *
     * Three methods are exposed as intended for use: {@link ReviewFetcher#consumeReviews},
     * {@link ReviewFetcher#produceReviews}, and {@link ReviewFetcher#hasMoreReviews}. Other
     * methods should be considered private.
     */
    
    var ReviewFetcher = function () {
      /**
       * Construct a ReviewFetcher.
       *
       * The constructor takes an object containing options and data required to
       * obtain and produce reviews for consumption.
       *
       * @param {Object} args - An object containing the arguments below.
       * @param {number} args.reviewsPerPage - The number of reviews to provide per
       * request.
       * @param {boolean} args.includeImportedReviews - Whether to include imported
       * reviews in the reviews provided.
       * @param {Object} args.baseData - The baseData response received from a base-data
       * call.
       * @param {...Object} args.wrapArgs - An arbitrary set of arguments to add to
       * the data provided to the callback in {@link ReviewFetcher#consumeReviews}.
       */
      function ReviewFetcher(_ref) {
        var reviewsPerPage = _ref.reviewsPerPage,
            includeImportedReviews = _ref.includeImportedReviews,
            baseData = _ref.baseData,
            wrapArgs = _objectWithoutProperties(_ref, ['reviewsPerPage', 'includeImportedReviews', 'baseData']);
    
        _classCallCheck(this, ReviewFetcher);
    
        // Get next page links from a base data response.
        var getBaseDataNextPageLinks = (0, _util.getNextPageLinks)(function (responseKey) {
          return (0, _fn.pipeMaybe)((0, _fn.prop)(responseKey), (0, _fn.prop)('links'), (0, _fn.prop)('nextPage'));
        });
    
        this.reviewsPerPage = reviewsPerPage;
        this.includeImportedReviews = includeImportedReviews;
        this.baseData = baseData;
        this.nextPage = getBaseDataNextPageLinks(baseData, includeImportedReviews);
        this.wrapArgs = wrapArgs;
    
        this.reviews = this._makeResponseProcessor(baseData).getReviews();
      }
    
      /**
       * Consume a number of reviews using a callback function.
       *
       * This method gets one page of reviews, and combines this with the data in
       * the wrapArgs field and passes it all to a callback. The return value is
       * wrapped in an anonymous function to make it suitable for use within event
       * handlers.
       *
       * @param {Function} callback - A function to call with a set of review data.
       */
    
    
      _createClass(ReviewFetcher, [{
        key: 'consumeReviews',
        value: function consumeReviews(callback) {
          var _this = this;
    
          return function () {
            return _this.produceReviews().then(function (reviews) {
              return callback(_extends({}, _this.wrapArgs, {
                baseData: _this.baseData,
                reviews: reviews,
                hasMoreReviews: _this.hasMoreReviews,
                loadMoreReviews: _this.consumeReviews.bind(_this)
              }));
            }).catch(function (err) {
              if (err === NO_REVIEWS_ERROR) {
                return callback(_extends({}, _this.wrapArgs, {
                  baseData: _this.baseData,
                  reviews: [],
                  hasMoreReviews: false,
                  loadMoreReviews: _this.consumeReviews.bind(_this)
                }));
              } else {
                // Rethrow error which is unexpected
                throw err;
              }
            });
          };
        }
    
        /**
         * Produce a number of reviews.
         *
         * This method produces one page of reviews. It may require to fetch additional
         * reviews from an API if there are insufficent reviews available locally. The
         * reviews are thus returned wrapped in a Promise.
         */
    
      }, {
        key: 'produceReviews',
        value: function produceReviews() {
          var _this2 = this;
    
          var processResponse = function processResponse(response) {
            var _reviews;
    
            var responseProcessor = _this2._makeResponseProcessor(response);
            _this2.nextPage = responseProcessor.getNextPageLinks();
            (_reviews = _this2.reviews).push.apply(_reviews, _toConsumableArray(responseProcessor.getReviews()));
            return _this2._takeReviews();
          };
    
          if (this.reviews.length === 0) {
            // eslint-disable-next-line compat/compat
            return Promise.reject(NO_REVIEWS_ERROR);
          }
          return this.reviewsPerPage >= this.reviews.length ? this._fetchReviews().then(processResponse) : // eslint-disable-next-line compat/compat
          Promise.resolve(this._takeReviews());
        }
    
        /**
         * Flag whether more reviews are available for consumption.
         *
         * Where true, this means it is possible to load more reviews. If false, no
         * more reviews are available.
         */
    
      }, {
        key: '_takeReviews',
    
    
        // Private Methods //
    
        /**
         * Take a page of reviews from internal cache of reviews, removing these and
         * returning them from the method.
         */
        value: function _takeReviews() {
          return this.reviews.splice(0, this.reviewsPerPage);
        }
    
        /**
         * Fetch more reviews from the API.
         */
    
      }, {
        key: '_fetchReviews',
        value: function _fetchReviews() {
          return (0, _fn.promiseAllObject)((0, _fn.mapObject)(_call.apiCall, this.nextPage));
        }
    
        /**
         * Construct a {@link ResponseProcessor} instance using properties from this instance.
         */
    
      }, {
        key: '_makeResponseProcessor',
        value: function _makeResponseProcessor(response) {
          return new _responseProcessor2.default(response, {
            includeImportedReviews: this.includeImportedReviews,
            displayName: this.baseData.businessEntity.displayName
          });
        }
      }, {
        key: 'hasMoreReviews',
        get: function get() {
          return this.reviews.length > 0;
        }
      }]);
    
      return ReviewFetcher;
    }();
    
    exports.default = ReviewFetcher;
    
    },{"../../fn":12,"../call":2,"./responseProcessor":7,"./util":8}],8:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getNextPageLinks = undefined;
    
    var _fn = require('../../fn');
    
    /**
     * Get next page links from a response.
     *
     * This function take a getter function, used to extract a particular type of link,
     * either for productReviews or importedProductReviews. It returns a function which
     * take a response and a flag to indicate whether to include imported reviews. This
     * can then be called to obtain available next page links.
     */
    var getNextPageLinks = function getNextPageLinks(getter) {
      return function (response) {
        var includeImportedReviews = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    
        var productReviews = getter('productReviews')(response);
        var importedProductReviews = (0, _fn.pipeMaybe)((0, _fn.guard)(includeImportedReviews), getter('importedProductReviews'))(response);
        return (0, _fn.rejectNullaryValues)({
          productReviews: productReviews,
          importedProductReviews: importedProductReviews
        });
      };
    };
    
    exports.getNextPageLinks = getNextPageLinks;
    
    },{"../../fn":12}],7:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    var _fn = require('../../fn');
    
    var _util = require('./util');
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    /**
     * This class processes an API response containing reviews and pagination
     * data.
     */
    var ReviewResponseProcessor = function () {
      /**
       * Create a ReviewResponseProcessor instance.
       *
       * Takes an API response object for processing, together with a short list
       * of options for processing and annotating reviews.
       */
      function ReviewResponseProcessor(response, _ref) {
        var includeImportedReviews = _ref.includeImportedReviews,
            displayName = _ref.displayName;
    
        _classCallCheck(this, ReviewResponseProcessor);
    
        this.response = response;
        this.includeImportedReviews = includeImportedReviews;
        this.displayName = displayName;
      }
    
      /**
       * Get a combined list of reviews from the API response.
       *
       * This method extracts all reviews from the response, including optionally
       * imported reviews, and then combines and sorts these by date, descending.
       */
    
    
      _createClass(ReviewResponseProcessor, [{
        key: 'getReviews',
        value: function getReviews() {
          var _this = this;
    
          var _response = this.response,
              productReviews = _response.productReviews,
              importedProductReviews = _response.importedProductReviews;
    
          var orderByCreatedAtDesc = function orderByCreatedAtDesc(_ref2, _ref3) {
            var c1 = _ref2.createdAt;
            var c2 = _ref3.createdAt;
            return new Date(c2) - new Date(c1);
          };
          var productReviewsList = (0, _fn.pipeMaybe)((0, _fn.propMaybe)('productReviews'), (0, _fn.propMaybe)('reviews'))(productReviews) || [];
    
          var importedReviewsList = (0, _fn.pipeMaybe)((0, _fn.guard)(this.includeImportedReviews), (0, _fn.propMaybe)('importedProductReviews'), (0, _fn.propMaybe)('productReviews'), (0, _fn.map)(function (review) {
            return _extends({}, review, {
              verifiedBy: review.type === 'External' ? review.source ? review.source.name : _this.displayName : _this.displayName
            });
          }))(importedProductReviews) || [];
    
          return [].concat(_toConsumableArray(productReviewsList), _toConsumableArray(importedReviewsList)).sort(orderByCreatedAtDesc);
        }
    
        /**
         * Get an object containing links to the next page URIs contained within the
         * API response.
         */
    
      }, {
        key: 'getNextPageLinks',
        value: function getNextPageLinks() {
          // Get next page links from a pagination response.
          var getOldPaginationNextPageLinks = (0, _util.getNextPageLinks)(function (responseKey) {
            return (0, _fn.pipeMaybe)((0, _fn.prop)(responseKey), (0, _fn.prop)('links'), (0, _fn.find)(function (link) {
              return link.rel === 'next-page';
            }), (0, _fn.prop)('href'));
          });
    
          var getNewPaginationNextPageLinks = (0, _util.getNextPageLinks)(function (responseKey) {
            return (0, _fn.pipeMaybe)((0, _fn.prop)(responseKey), (0, _fn.prop)(responseKey), (0, _fn.prop)('links'), (0, _fn.prop)('nextPage'));
          });
    
          var newLinks = getNewPaginationNextPageLinks(this.response, this.includeImportedReviews);
          var oldLinks = getOldPaginationNextPageLinks(this.response, this.includeImportedReviews);
    
          return _extends({}, oldLinks, newLinks);
        }
      }]);
    
      return ReviewResponseProcessor;
    }();
    
    exports.default = ReviewResponseProcessor;
    
    },{"../../fn":12,"./util":8}],9:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* common-shake removed: exports.SCALE_DIMENSIONS_105x19 = */ /* common-shake removed: exports.SCALE_DIMENSIONS_90x16 = */ /* common-shake removed: exports.SCALE_DIMENSIONS_80x15 = */ exports.svgMap = undefined;
    
    var _SCALE_SVG_PROPS;
    
    var _utils = require('../utils');
    
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* This module defines a number of SVG elements.
                                                                                                                                                                                                                       *
                                                                                                                                                                                                                       * IE11 does not properly display SVG tags, except using one of several hacks.
                                                                                                                                                                                                                       * So, we use one below: we wrap each SVG in a div element, with particular
                                                                                                                                                                                                                       * styling attached. We do this following Option 4 in the article at
                                                                                                                                                                                                                       * https://css-tricks.com/scale-svg/.
                                                                                                                                                                                                                       */
    
    var svgStarStyle = 'style="position: absolute; height: 100%; width: 100%; left: 0; top: 0;"';
    
    var wrapSvg = function wrapSvg(dimensions, inner) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    
      var sanitizedProps = Object.keys(props).reduce(function (acc, cur) {
        acc[cur] = (0, _utils.sanitizeHtmlProp)(props[cur]);
        if (cur === 'color') {
          acc[cur] = (0, _utils.sanitizeColor)(acc[cur]);
        }
        return acc;
      }, {});
      return '\n    <div style="position: relative; height: 0; width: 100%; padding: 0; padding-bottom: ' + dimensions.height / dimensions.width * 100 + '%;">\n      ' + inner(dimensions, sanitizedProps) + '\n    </div>\n  ';
    };
    
    var SCALE_DIMENSIONS_80x15 = '80x15';
    var SCALE_DIMENSIONS_90x16 = '90x16';
    var SCALE_DIMENSIONS_105x19 = '105x19';
    
    var SCALE_SVG_PROPS = (_SCALE_SVG_PROPS = {}, _defineProperty(_SCALE_SVG_PROPS, SCALE_DIMENSIONS_80x15, {
      dimensions: { width: 80, height: 15 },
      lines: [{ x1: 80, y1: 7.5, x2: 0, y2: 7.5 }, { x1: 0.5, y1: 3.5, x2: 0.5, y2: 11.5 }, { x1: 20.5, y1: 6, x2: 20.5, y2: 9 }, { x1: 40.5, y1: 6, x2: 40.5, y2: 9 }, { x1: 60.5, y1: 6, x2: 60.5, y2: 9 }, { x1: 80, y1: 3.5, x2: 80, y2: 11.5 }],
      stars: [{
        x: 1.5,
        w: 14,
        h: 14,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M9.7613 6.02594H13.7205L10.5316 8.29316L8.55968 9.68372L5.35535 11.9509L6.57238 8.29316L3.36804 6.02594H7.32724L8.54427 2.36816L9.7613 6.02594ZM10.7935 9.14011L8.54429 9.69936L11.7332 11.9817L10.7935 9.14011Z" fill="white"/>'
      }, {
        x: 13.5,
        w: 14,
        h: 14,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7615 6.02606H25.7208L22.5318 8.29328L20.5599 9.68384L17.3556 11.9511L18.5726 8.29328L15.3683 6.02606H19.3275L20.5445 2.36829L21.7615 6.02606ZM22.7938 9.14034L20.5446 9.69959L23.7335 11.9819L22.7938 9.14034Z" fill="white"/>'
      }, {
        x: 13.5,
        w: 14,
        h: 14,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7615 6.02606H25.7208L22.5318 8.29328L20.5599 9.68384L17.3556 11.9511L18.5726 8.29328L15.3683 6.02606H19.3275L20.5445 2.36829L21.7615 6.02606ZM22.7938 9.14034L20.5446 9.69959L23.7335 11.9819L22.7938 9.14034Z" fill="white"/>'
      }, {
        x: 33.5,
        w: 14,
        h: 14,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M41.7615 6.02606H45.7208L42.5318 8.29328L40.5599 9.68384L37.3556 11.9511L38.5726 8.29328L35.3683 6.02606H39.3275L40.5445 2.36829L41.7615 6.02606ZM42.7938 9.14034L40.5446 9.69959L43.7335 11.9819L42.7938 9.14034Z" fill="white"/>'
      }, {
        x: 64.5,
        w: 14,
        h: 14,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M72.7615 6.02606H76.7208L73.5318 8.29328L71.5599 9.68384L68.3556 11.9511L69.5726 8.29328L66.3683 6.02606H70.3275L71.5445 2.36829L72.7615 6.02606ZM73.7935 9.14022L71.5443 9.69947L74.7332 11.9818L73.7935 9.14022Z" fill="white"/>'
      }]
    }), _defineProperty(_SCALE_SVG_PROPS, SCALE_DIMENSIONS_90x16, {
      dimensions: { width: 90, height: 16 },
      lines: [{ x1: 90, y1: 8.5, x2: 0, y2: 8.5 }, { x1: 0.5, y1: 5, x2: 0.5, y2: 12 }, { x1: 23.2185, y1: 7, x2: 23.2185, y2: 10 }, { x1: 45.5, y1: 7, x2: 45.5, y2: 10 }, { x1: 67.7815, y1: 7, x2: 67.7815, y2: 10 }, { x1: 90, y1: 5, x2: 90, y2: 12 }],
      stars: [{
        x: 1.5,
        w: 15,
        h: 15,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3454 6.42769H14.5685L11.167 8.84606L9.06363 10.3293L5.64567 12.7477L6.94384 8.84606L3.52588 6.42769H7.74903L9.04719 2.52606L10.3454 6.42769ZM11.4464 9.74948L9.04727 10.346L12.4488 12.7805L11.4464 9.74948Z" fill="white"/>'
      }, {
        x: 15.5,
        w: 15,
        h: 15,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M24.3456 6.42781H28.5688L25.1672 8.84618L23.0639 10.3294L19.6459 12.7478L20.9441 8.84618L17.5261 6.42781H21.7493L23.0474 2.52618L24.3456 6.42781ZM25.4466 9.74967L23.0475 10.3462L26.449 12.7807L25.4466 9.74967Z" fill="white"/>'
      }, {
        x: 37.5,
        w: 15,
        h: 15,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M46.3456 6.42781H50.5688L47.1672 8.84618L45.0639 10.3294L41.6459 12.7478L42.9441 8.84618L39.5261 6.42781H43.7493L45.0474 2.52618L46.3456 6.42781ZM47.4466 9.74967L45.0475 10.3462L48.449 12.7807L47.4466 9.74967Z" fill="white"/>'
      }, {
        x: 60.5,
        w: 15,
        h: 15,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M69.3456 6.42781H73.5688L70.1672 8.84618L68.0639 10.3294L64.6459 12.7478L65.9441 8.84618L62.5261 6.42781H66.7493L68.0474 2.52618L69.3456 6.42781ZM70.4466 9.74967L68.0475 10.3462L71.449 12.7807L70.4466 9.74967Z" fill="white"/>'
      }, {
        x: 73.5,
        w: 15,
        h: 15,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M82.3456 6.42781H86.5688L83.1672 8.84618L81.0639 10.3294L77.6459 12.7478L78.9441 8.84618L75.5261 6.42781H79.7493L81.0474 2.52618L82.3456 6.42781ZM83.4464 9.74957L81.0473 10.3461L84.4488 12.7806L83.4464 9.74957Z" fill="white"/>'
      }]
    }), _defineProperty(_SCALE_SVG_PROPS, SCALE_DIMENSIONS_105x19, {
      dimensions: { width: 105, height: 19 },
      lines: [{ x1: 105, y1: 10, x2: 0, y2: 10 }, { x1: 0.5, y1: 6, x2: 0.5, y2: 14.3125 }, { x1: 26.5, y1: 8, x2: 26.5, y2: 12 }, { x1: 52.5, y1: 8, x2: 52.5, y2: 12 }, { x1: 78.5, y1: 8, x2: 78.5, y2: 12 }, { x1: 105, y1: 6, x2: 105, y2: 14.3125 }],
      stars: [{
        x: 1.5,
        w: 18,
        h: 19,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0976 7.63288H17.1126L13.0733 10.5047L10.5756 12.2661L6.51676 15.1379L8.05834 10.5047L3.99951 7.63288H9.0145L10.5561 2.99969L12.0976 7.63288ZM13.4051 11.5774L10.5561 12.2858L14.5954 15.1768L13.4051 11.5774Z" fill="white"/>'
      }, {
        x: 17.5682,
        w: 18,
        h: 18,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M28.1661 7.633H33.1811L29.1418 10.5048L26.6441 12.2662L22.5852 15.138L24.1268 10.5048L20.068 7.633H25.083L26.6246 2.99982L28.1661 7.633ZM29.4736 11.5777L26.6246 12.2861L30.6639 15.1771L29.4736 11.5777Z" fill="white"/>'
      }, {
        x: 43.5,
        w: 18,
        h: 18,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M54.0979 7.633H59.1129L55.0736 10.5048L52.5758 12.2662L48.517 15.138L50.0586 10.5048L45.9998 7.633H51.0147L52.5563 2.99982L54.0979 7.633ZM55.4054 11.5777L52.5564 12.2861L56.5957 15.1771L55.4054 11.5777Z" fill="white"/>'
      }, {
        x: 69.7046,
        w: 18,
        h: 18,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M80.3025 7.633H85.3175L81.2782 10.5048L78.7804 12.2662L74.7216 15.138L76.2632 10.5048L72.2043 7.633H77.2193L78.7609 2.99982L80.3025 7.633ZM81.61 11.5777L78.761 12.2861L82.8003 15.1771L81.61 11.5777Z" fill="white"/>'
      }, {
        x: 85.7727,
        w: 18,
        h: 18,
        p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M96.3706 7.633H101.386L97.3463 10.5048L94.8485 12.2662L90.7897 15.138L92.3313 10.5048L88.2725 7.633H93.2874L94.829 2.99982L96.3706 7.633ZM97.6778 11.5776L94.8289 12.286L98.8682 15.177L97.6778 11.5776Z" fill="white"/>'
      }]
    }), _SCALE_SVG_PROPS);
    
    var createScaleLines = function createScaleLines(dimensionId, color) {
      return SCALE_SVG_PROPS[dimensionId].lines.reduce(function (acc, _ref) {
        var x1 = _ref.x1,
            y1 = _ref.y1,
            x2 = _ref.x2,
            y2 = _ref.y2;
        return acc + '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '"/>';
      }, '');
    };
    
    var createScaleStar = function createScaleStar(dimensionId, rating, color) {
      if (rating === 0) {
        return '';
      }
    
      var _SCALE_SVG_PROPS$dime = SCALE_SVG_PROPS[dimensionId].stars[rating - 1],
          x = _SCALE_SVG_PROPS$dime.x,
          w = _SCALE_SVG_PROPS$dime.w,
          h = _SCALE_SVG_PROPS$dime.h,
          p = _SCALE_SVG_PROPS$dime.p;
    
    
      return '\n    <rect x="' + x + '" y="0.5" width="' + w + '" height="' + h + '" fill="' + color + '" stroke="' + color + '"/>\n    ' + p + '\n  ';
    };
    
    var _scale = function _scale(dimensions, _ref2) {
      var dimensionId = _ref2.dimensionId,
          color = _ref2.color,
          rating = _ref2.rating;
      return '\n  <svg role="img" aria-labelledby="scaleRating" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '">\n      <g class="tp-stars">\n        ' + createScaleLines(dimensionId, color) + '\n        ' + createScaleStar(dimensionId, rating, color) + '\n      </g>\n  </svg>';
    };
    
    var emptyStarColor = '#dcdce6';
    var _stars = function _stars(dimensions, _ref3) {
      var rating = _ref3.rating,
          trustScore = _ref3.trustScore,
          color = _ref3.color;
    
      var titleId = 'starRating-' + Math.random().toString(36).substring(2);
    
      return '\n    <svg role="img" aria-labelledby="' + titleId + '" viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n      <title id="' + titleId + '" lang="en">' + trustScore + ' out of five star rating on Trustpilot</title>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 1 && color ? color : emptyStarColor) + '" d="M0 46.330002h46.375586V0H0z"/>\n          <path class="tp-star__shape" d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 2 && color ? color : emptyStarColor) + '" d="M51.24816 46.330002h46.375587V0H51.248161z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 1.5 && color ? color : emptyStarColor) + '" d="M51.24816 46.330002h23.187793V0H51.248161z"/>\n          <path class="tp-star__shape" d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 3 && color ? color : emptyStarColor) + '" d="M102.532209 46.330002h46.375586V0h-46.375586z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 2.5 && color ? color : emptyStarColor) + '" d="M102.532209 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 4 && color ? color : emptyStarColor) + '" d="M153.815458 46.330002h46.375586V0h-46.375586z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 3.5 && color ? color : emptyStarColor) + '" d="M153.815458 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating === 5 && color ? color : emptyStarColor) + '" d="M205.064416 46.330002h46.375587V0h-46.375587z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 4.5 && color ? color : emptyStarColor) + '" d="M205.064416 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"/>\n      </g>\n    </svg>\n  ';
    };
    
    var _logo = function _logo(dimensions) {
      var titleId = 'trustpilotLogo-' + Math.random().toString(36).substring(2);
    
      return '\n    <svg role="img" aria-labelledby="' + titleId + '" viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n      <title id="' + titleId + '">Trustpilot</title>\n      <path class="tp-logo__text" d="M33.074774 11.07005H45.81806v2.364196h-5.010656v13.290316h-2.755306V13.434246h-4.988435V11.07005h.01111zm12.198892 4.319629h2.355341v2.187433h.04444c.077771-.309334.222203-.60762.433295-.894859.211092-.287239.466624-.56343.766597-.79543.299972-.243048.633276-.430858.999909-.585525.366633-.14362.744377-.220953 1.12212-.220953.288863 0 .499955.011047.611056.022095.1111.011048.222202.033143.344413.04419v2.408387c-.177762-.033143-.355523-.055238-.544395-.077333-.188872-.022096-.366633-.033143-.544395-.033143-.422184 0-.822148.08838-1.199891.254096-.377744.165714-.699936.41981-.977689.740192-.277753.331429-.499955.729144-.666606 1.21524-.166652.486097-.244422 1.03848-.244422 1.668195v5.39125h-2.510883V15.38968h.01111zm18.220567 11.334883H61.02779v-1.579813h-.04444c-.311083.574477-.766597 1.02743-1.377653 1.369908-.611055.342477-1.233221.51924-1.866497.51924-1.499864 0-2.588654-.364573-3.25526-1.104765-.666606-.740193-.999909-1.856005-.999909-3.347437V15.38968h2.510883v6.948968c0 .994288.188872 1.701337.577725 2.1101.377744.408763.922139.618668 1.610965.618668.533285 0 .96658-.077333 1.322102-.243048.355524-.165714.644386-.37562.855478-.65181.222202-.265144.377744-.596574.477735-.972194.09999-.37562.144431-.784382.144431-1.226288v-6.573349h2.510883v11.323836zm4.27739-3.634675c.07777.729144.355522 1.237336.833257 1.535623.488844.287238 1.06657.441905 1.744286.441905.233312 0 .499954-.022095.799927-.055238.299973-.033143.588836-.110476.844368-.209905.266642-.099429.477734-.254096.655496-.452954.166652-.198857.244422-.452953.233312-.773335-.01111-.320381-.133321-.585525-.355523-.784382-.222202-.209906-.499955-.364573-.844368-.497144-.344413-.121525-.733267-.232-1.17767-.320382-.444405-.088381-.888809-.18781-1.344323-.287239-.466624-.099429-.922138-.232-1.355432-.37562-.433294-.14362-.822148-.342477-1.166561-.596573-.344413-.243048-.622166-.56343-.822148-.950097-.211092-.386668-.311083-.861716-.311083-1.436194 0-.618668.155542-1.12686.455515-1.54667.299972-.41981.688826-.75124 1.14434-1.005336.466624-.254095.97769-.430858 1.544304-.541334.566615-.099429 1.11101-.154667 1.622075-.154667.588836 0 1.15545.066286 1.688736.18781.533285.121524 1.02213.320381 1.455423.60762.433294.276191.788817.640764 1.07768 1.08267.288863.441905.466624.98324.544395 1.612955h-2.621984c-.122211-.596572-.388854-1.005335-.822148-1.204193-.433294-.209905-.933248-.309334-1.488753-.309334-.177762 0-.388854.011048-.633276.04419-.244422.033144-.466624.088382-.688826.165715-.211092.077334-.388854.198858-.544395.353525-.144432.154667-.222203.353525-.222203.60762 0 .309335.111101.552383.322193.740193.211092.18781.488845.342477.833258.475048.344413.121524.733267.232 1.177671.320382.444404.088381.899918.18781 1.366542.287239.455515.099429.899919.232 1.344323.37562.444404.14362.833257.342477 1.17767.596573.344414.254095.622166.56343.833258.93905.211092.37562.322193.850668.322193 1.40305 0 .673906-.155541 1.237336-.466624 1.712385-.311083.464001-.711047.850669-1.199891 1.137907-.488845.28724-1.04435.508192-1.644295.640764-.599946.132572-1.199891.198857-1.788727.198857-.722156 0-1.388762-.077333-1.999818-.243048-.611056-.165714-1.14434-.408763-1.588745-.729144-.444404-.33143-.799927-.740192-1.05546-1.226289-.255532-.486096-.388853-1.071621-.411073-1.745528h2.533103v-.022095zm8.288135-7.700208h1.899828v-3.402675h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155542.486096.07777.132572.199981.232.366633.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.13332-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222zm8.454788 0h2.377562V16.9253h.04444c.355523-.662858.844368-1.12686 1.477644-1.414098.633276-.287239 1.310992-.430858 2.055369-.430858.899918 0 1.677625.154667 2.344231.475048.666606.309335 1.222111.740193 1.666515 1.292575.444405.552382.766597 1.193145.9888 1.92229.222202.729145.333303 1.513527.333303 2.3421 0 .762288-.099991 1.50248-.299973 2.20953-.199982.718096-.499955 1.347812-.899918 1.900194-.399964.552383-.911029.98324-1.533194 1.31467-.622166.33143-1.344323.497144-2.18869.497144-.366634 0-.733267-.033143-1.0999-.099429-.366634-.066286-.722157-.176762-1.05546-.320381-.333303-.14362-.655496-.33143-.933249-.56343-.288863-.232-.522175-.497144-.722157-.79543h-.04444v5.656393h-2.510883V15.38968zm8.77698 5.67849c0-.508193-.06666-1.005337-.199981-1.491433-.133321-.486096-.333303-.905907-.599946-1.281527-.266642-.37562-.599945-.673906-.988799-.894859-.399963-.220953-.855478-.342477-1.366542-.342477-1.05546 0-1.855387.364572-2.388672 1.093717-.533285.729144-.799928 1.701337-.799928 2.916578 0 .574478.066661 1.104764.211092 1.59086.144432.486097.344414.905908.633276 1.259432.277753.353525.611056.629716.99991.828574.388853.209905.844367.309334 1.355432.309334.577725 0 1.05546-.121524 1.455423-.353525.399964-.232.722157-.541335.97769-.905907.255531-.37562.444403-.79543.555504-1.270479.099991-.475049.155542-.961145.155542-1.458289zm4.432931-9.99812h2.510883v2.364197h-2.510883V11.07005zm0 4.31963h2.510883v11.334883h-2.510883V15.389679zm4.755124-4.31963h2.510883v15.654513h-2.510883V11.07005zm10.210184 15.963847c-.911029 0-1.722066-.154667-2.433113-.452953-.711046-.298287-1.310992-.718097-1.810946-1.237337-.488845-.530287-.866588-1.160002-1.12212-1.889147-.255533-.729144-.388854-1.535622-.388854-2.408386 0-.861716.133321-1.657147.388853-2.386291.255533-.729145.633276-1.35886 1.12212-1.889148.488845-.530287 1.0999-.93905 1.810947-1.237336.711047-.298286 1.522084-.452953 2.433113-.452953.911028 0 1.722066.154667 2.433112.452953.711047.298287 1.310992.718097 1.810947 1.237336.488844.530287.866588 1.160003 1.12212 1.889148.255532.729144.388854 1.524575.388854 2.38629 0 .872765-.133322 1.679243-.388854 2.408387-.255532.729145-.633276 1.35886-1.12212 1.889147-.488845.530287-1.0999.93905-1.810947 1.237337-.711046.298286-1.522084.452953-2.433112.452953zm0-1.977528c.555505 0 1.04435-.121524 1.455423-.353525.411074-.232.744377-.541335 1.01102-.916954.266642-.37562.455513-.806478.588835-1.281527.12221-.475049.188872-.961145.188872-1.45829 0-.486096-.066661-.961144-.188872-1.44724-.122211-.486097-.322193-.905907-.588836-1.281527-.266642-.37562-.599945-.673907-1.011019-.905907-.411074-.232-.899918-.353525-1.455423-.353525-.555505 0-1.04435.121524-1.455424.353525-.411073.232-.744376.541334-1.011019.905907-.266642.37562-.455514.79543-.588835 1.281526-.122211.486097-.188872.961145-.188872 1.447242 0 .497144.06666.98324.188872 1.458289.12221.475049.322193.905907.588835 1.281527.266643.37562.599946.684954 1.01102.916954.411073.243048.899918.353525 1.455423.353525zm6.4883-9.66669h1.899827v-3.402674h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155541.486096.077771.132572.199982.232.366634.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.133321-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222z" fill="#191919"/>\n      <path class="tp-logo__star" fill="#00B67A" d="M30.141707 11.07005H18.63164L15.076408.177071l-3.566342 10.892977L0 11.059002l9.321376 6.739063-3.566343 10.88193 9.321375-6.728016 9.310266 6.728016-3.555233-10.88193 9.310266-6.728016z"/>\n      <path class="tp-logo__star-notch" fill="#005128" d="M21.631369 20.26169l-.799928-2.463625-5.755033 4.153914z"/>\n    </svg>\n  ';
    };
    
    var _arrowSlider = function _arrowSlider(dimensions) {
      return '\n  <svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n      <circle class="arrow-slider-circle" cx="12" cy="12" r="11.5" fill="none" stroke="#8C8C8C"/>\n      <path class="arrow-slider-shape" fill="#8C8C8C" d="M10.5088835 12l3.3080582-3.02451041c.2440777-.22315674.2440777-.5849653 0-.80812204-.2440776-.22315673-.6398058-.22315673-.8838834 0L9.18305826 11.595939c-.24407768.2231567-.24407768.5849653 0 .808122l3.75000004 3.4285714c.2440776.2231568.6398058.2231568.8838834 0 .2440777-.2231567.2440777-.5849653 0-.808122L10.5088835 12z"/>\n  </svg>\n';
    };
    
    var _replyArrow = function _replyArrow(dimensions, _ref4) {
      var elementColor = _ref4.elementColor;
      return '\n<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns=\u201Chttp://www.w3.org/2000/svg\u201C ' + svgStarStyle + '>\n  <path d="M5.24040526 8.60770645c0 .40275007-.25576387.51300008-.57003092.24825004L.2361338 4.98520583C.0871841 4.86986375 0 4.69208677 0 4.50370575s.0871841-.366158.2361338-.48150008L4.67037434.14470501c.31501709-.26625004.57003092-.15450003.57003092.24825004V2.9992055h.75004069c2.86515541 0 5.31553833 2.3745004 5.91257072 4.93950083a4.3385348 4.3385348 0 0 1 .09375508.5782501c.02250123.20025004-.07500406.24450004-.21826184.10350002 0 0-.0405022-.036-.07500406-.07500001C10.18673699 7.00766398 8.14655579 6.09727666 5.98894586 5.995456h-.75004068l.00150008 2.61225045z" fill="' + (elementColor || '#00B67A') + '" fill-rule="evenodd"/>\n</svg>\n';
    };
    
    var _verifiedReview = function _verifiedReview(dimensions) {
      return '<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" fill="none" xmlns="http://www.w3.org/2000/svg ' + svgStarStyle + '">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.09217 7.81401L9.20311 4.7031C9.44874 4.45757 9.84688 4.45757 10.0923 4.7031C10.338 4.94864 10.338 5.34673 10.0923 5.59226L6.62009 9.06448C6.59573 9.10283 6.56682 9.13912 6.53333 9.17256C6.28787 9.41821 5.88965 9.41821 5.64402 9.17256L3.7059 7.11031C3.46046 6.86464 3.46046 6.46669 3.7059 6.22102C3.95154 5.97548 4.34968 5.97548 4.59512 6.22102L6.09217 7.81401Z" fill="currentColor"/>\n</svg>\n';
    };
    
    var _invitedReview = function _invitedReview(dimensions) {
      return '<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" fill="none" xmlns="http://www.w3.org/2000/svg ' + svgStarStyle + '">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.09217 7.81401L9.20311 4.7031C9.44874 4.45757 9.84688 4.45757 10.0923 4.7031C10.338 4.94864 10.338 5.34673 10.0923 5.59226L6.62009 9.06448C6.59573 9.10283 6.56682 9.13912 6.53333 9.17256C6.28787 9.41821 5.88965 9.41821 5.64402 9.17256L3.7059 7.11031C3.46046 6.86464 3.46046 6.46669 3.7059 6.22102C3.95154 5.97548 4.34968 5.97548 4.59512 6.22102L6.09217 7.81401Z" fill="currentColor"/>\n</svg>\n';
    };
    
    var _redirectedReview = function _redirectedReview(dimensions) {
      return '<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" fill="none" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7056 4.07227L10.6915 1.04706C10.2986 0.65216 9.66093 0.651152 9.26704 1.04303C8.87214 1.43591 8.87113 2.0746 9.26402 2.46749L10.5656 3.77509L3.42415 3.76602H3.41407C1.96242 3.76602 1.15751 4.40169 0.738429 4.93561C0.255887 5.55012 0.0010157 6.38827 8.3031e-06 7.36041C-0.00301388 8.91482 0.819021 11.8151 2.40265 11.8161H2.40365C2.95974 11.8161 3.41105 11.3668 3.41206 10.8107C3.41206 10.3645 3.12293 9.98467 2.72098 9.85069C2.35429 9.40038 1.72568 7.60218 2.15281 6.48901C2.2868 6.14045 2.54268 5.78081 3.41407 5.78081H3.42012L10.5585 5.78988L9.25495 7.0874C8.86005 7.48029 8.85905 8.11898 9.25193 8.51186C9.44837 8.70931 9.70727 8.80904 9.96617 8.80904C10.2231 8.80904 10.4799 8.71032 10.6764 8.51589L13.7046 5.49874H13.7056C14.1116 5.08369 14.0844 4.45206 13.7056 4.07227Z" fill="currentColor"/>\n</svg>\n';
    };
    /* eslint-enable max-len */
    
    // Define a series of objects containing width and height values. These are
    // used in setting the styling of the SVG, and creating the div wrapper for
    // IE11 support.
    var starsDimensions = { width: 251, height: 46 };
    var logoDimensions = { width: 126, height: 31 };
    var arrowSliderDimensions = { width: 24, height: 24 };
    var replyArrowDimensions = { width: 12, height: 9 };
    var verifiedReviewDimensions = { width: 14, height: 14 };
    var invitedReviewDimensions = { width: 14, height: 14 };
    var redirectedReviewDimensions = { width: 14, height: 12 };
    
    var svgMap = {
      scale: function scale(props) {
        return wrapSvg(SCALE_SVG_PROPS[props.dimensionId].dimensions, _scale, props);
      },
      stars: function stars(props) {
        return wrapSvg(starsDimensions, _stars, props);
      },
      logo: function logo() {
        return wrapSvg(logoDimensions, _logo);
      },
      arrowSlider: function arrowSlider() {
        return wrapSvg(arrowSliderDimensions, _arrowSlider);
      },
      replyArrow: function replyArrow(props) {
        return wrapSvg(replyArrowDimensions, _replyArrow, props);
      },
      verifiedReview: function verifiedReview(props) {
        return wrapSvg(verifiedReviewDimensions, _verifiedReview, props);
      },
      invitedReview: function invitedReview(props) {
        return wrapSvg(invitedReviewDimensions, _invitedReview, props);
      },
      redirectedReview: function redirectedReview(props) {
        return wrapSvg(redirectedReviewDimensions, _redirectedReview, props);
      }
    };
    
    exports.svgMap = svgMap;
    /* common-shake removed: exports.SCALE_DIMENSIONS_80x15 = */ void SCALE_DIMENSIONS_80x15;
    /* common-shake removed: exports.SCALE_DIMENSIONS_90x16 = */ void SCALE_DIMENSIONS_90x16;
    /* common-shake removed: exports.SCALE_DIMENSIONS_105x19 = */ void SCALE_DIMENSIONS_105x19;
    
    },{"../utils":23}],15:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var styleAlignmentPositions = exports.styleAlignmentPositions = ['left', 'right'];
    
    },{}],22:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* common-shake removed: exports.customElement = */ exports.mkElemWithSvgLookup = /* common-shake removed: exports.span = */ /* common-shake removed: exports.input = */ /* common-shake removed: exports.label = */ /* common-shake removed: exports.img = */ exports.div = exports.a = undefined;
    
    var _svg = require('./assets/svg');
    
    var _utils = require('./utils');
    
    var flatten = function flatten(arrs) {
      return [].concat.apply([], arrs);
    };
    
    var mkProps = function mkProps(props) {
      return Object.keys(props).map(function (key) {
        var sanitizedProp = (0, _utils.sanitizeHtmlProp)(props[key]);
        return key + '="' + sanitizedProp + '"';
      }).join(' ');
    };
    
    var mkElem = function mkElem(tag) {
      return function (props) {
        for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          children[_key - 1] = arguments[_key];
        }
    
        return '<' + tag + ' ' + mkProps(props) + '>' + flatten(children).join('\n') + '</' + tag + '>';
      };
    };
    
    var mkNonClosingElem = function mkNonClosingElem(tag) {
      return function (props) {
        return '<' + tag + ' ' + mkProps(props) + '>';
      };
    };
    
    var a = mkElem('a');
    var div = mkElem('div');
    var img = mkElem('img');
    var label = mkElem('label');
    var span = mkElem('span');
    var input = mkNonClosingElem('input');
    var customElement = mkElem;
    
    var mkElemWithSvgLookup = function mkElemWithSvgLookup(svgKey) {
      var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var props = arguments[2];
      return div({ class: className }, _svg.svgMap[svgKey](props));
    };
    
    exports.a = a;
    exports.div = div;
    /* common-shake removed: exports.img = */ void img;
    /* common-shake removed: exports.label = */ void label;
    /* common-shake removed: exports.input = */ void input;
    /* common-shake removed: exports.span = */ void span;
    exports.mkElemWithSvgLookup = mkElemWithSvgLookup;
    /* common-shake removed: exports.customElement = */ void customElement;
    
    },{"./assets/svg":9,"./utils":23}]},{},[1])
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2RvbS5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2ltcHJlc3Npb24uanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9xdWVyeVN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdGVtcGxhdGVzL2xvZ28uanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9pbml0LmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdGVtcGxhdGVzL3N0YXJzLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvYXBpL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvYXBpL2NhbGwuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy94aHIuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9yb290VXJpLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvYXBpL2ZldGNoRGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2NvbW11bmljYXRpb24uanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9mbi5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RlbXBsYXRlcy9lcnJvckZhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdGVtcGxhdGVzL2xvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2FwaS9wcm9kdWN0UmV2aWV3cy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2FwaS9yZXZpZXdGZXRjaGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvYXBpL3Jldmlld0ZldGNoZXIvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2FwaS9yZXZpZXdGZXRjaGVyL3Jlc3BvbnNlUHJvY2Vzc29yLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvYXNzZXRzL3N2Zy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL21vZGVscy9zdHlsZUFsaWdubWVudFBvc2l0aW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RlbXBsYXRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFBLENBQUE7O0FBRUEsSUFBQSxXQUFBLEdBQUEsT0FBQSxDQUFBLDJEQUFBLENBQUEsQ0FBQTs7OztBQUNBLElBQUEsSUFBQSxHQUFBLE9BQUEsQ0FBQSxvREFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxNQUFBLEdBQUEsT0FBQSxDQUFBLHNEQUFBLENBQUEsQ0FBQTs7QUFTQSxJQUFBLFlBQUEsR0FBQSxPQUFBLENBQUEsNERBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxnRUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLCtEQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsb0RBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxxREFBQSxDQUFBLENBQUE7Ozs7OztBQUVBLFlBQUEsQ0FBQSxPQUFBLENBQVMsdUJBQVQsRUFBQSxDQUFBOztBQUVBLElBQU0sTUFBQSxHQUFTLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxZQUFBLEVBQWEsTUFBYixDQUFmLENBQUE7O3NCQVVJLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxXQUFBO0lBUEYseUJBQUE7SUFDZ0IsaUNBQWhCOzRDQUNBO0lBQUEsOENBQVE7SUFDUiwyQkFBQTtJQUNBLDZCQUFBO0lBQ0EsNkJBQUE7SUFDQSw0QkFBQTs7QUFHRixJQUFNLGlCQUFBLEdBQW9CLFNBQXBCLGlCQUFvQixDQUFBLElBQUEsRUFPcEI7RUFBQSxJQUFBLGFBQUEsR0FBQSxJQUFBLENBTkosUUFNSTtNQUowQixvQkFJMUIsR0FBQSxhQUFBLENBTEYsY0FLRSxDQUpBLGVBSUEsQ0FKbUIsS0FJbkI7TUFGRixLQUVFLEdBQUEsYUFBQSxDQUZGLEtBRUUsQ0FBQTs7RUFDSixJQUFNLElBQUEsR0FBTyxRQUFBLENBQVMsY0FBVCxDQUF3QixjQUF4QixDQUFiLENBQUE7RUFDQSxJQUFNLE9BQUEsR0FBVSxvQkFBQSxHQUF1QixLQUFBLENBQU0sVUFBN0IsR0FBMEMsS0FBQSxDQUFNLFdBQWhFLENBQUE7RUFDQSxJQUFBLENBQUssSUFBTCxHQUFZLE1BQUEsQ0FBTyxPQUFQLENBQVosQ0FBQTtDQVZGLENBQUE7O0FBYUEsSUFBTSx1QkFBQSxHQUEwQixTQUExQix1QkFBMEIsQ0FBQSxLQUFBLEVBUzFCO0VBQUEsSUFSSixNQVFJLEdBQUEsS0FBQSxDQVJKLE1BUUk7TUFBQSxjQUFBLEdBQUEsS0FBQSxDQVBKLFFBT0k7TUFBQSxxQkFBQSxHQUFBLGNBQUEsQ0FORixjQU1FO01BTDBCLGVBSzFCLEdBQUEscUJBQUEsQ0FMQSxlQUtBLENBTG1CLEtBS25CO01BSkEsVUFJQSxHQUFBLHFCQUFBLENBSkEsVUFJQTtNQUZGLFlBRUUsR0FBQSxjQUFBLENBRkYsWUFFRSxDQUFBOztFQUNKLElBQU0sb0JBQUEsR0FBdUIsUUFBQSxDQUFTLGNBQVQsQ0FBd0Isc0JBQXhCLENBQTdCLENBQUE7RUFDQSxJQUFNLHFCQUFBLEdBQXdCLGVBQUEsR0FDMUIsc0NBRDBCLEdBRTFCLGlCQUZKLENBQUE7RUFHQSxJQUFNLG1CQUFBLEdBQXNCLFFBQUEsQ0FBUyxjQUFULENBQXdCLHFCQUF4QixDQUE1QixDQUFBO0VBQ0EsSUFBTSxTQUFBLEdBQVksUUFBQSxDQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEIsQ0FBQTtFQUNBLElBQU0saUJBQUEsR0FBb0IsZUFBQSxHQUN0QixDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEscUJBQUEsRUFBc0IsZUFBdEIsRUFBdUMsTUFBdkMsQ0FEc0IsR0FFdEIsWUFBQSxDQUFhLFNBRmpCLENBQUE7RUFHQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxFQUFlLG1CQUFmLEVBQW9DLGlCQUFwQyxDQUFBLENBQUE7RUFDQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxFQUFlLFNBQWYsRUFBMEIsVUFBQSxDQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBMUIsQ0FBQSxDQUFBO0VBQ0EsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsRUFBZSxvQkFBZixFQUFxQyxZQUFBLENBQWEsT0FBbEQsQ0FBQSxDQUFBO0NBckJGLENBQUE7O0FBd0JBLElBQU0sV0FBQSxHQUFjLFNBQWQsV0FBYyxHQUFNO0VBQ3hCLElBQU0sT0FBQSxHQUFVLFFBQUEsQ0FBUyxjQUFULENBQXdCLG1CQUF4QixDQUFoQixDQUFBO0VBQ0EsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFdBQUEsRUFBWSxPQUFaLEVBQXFCLGdDQUFyQixDQUFBLENBQUE7Q0FGRixDQUFBOztBQUtBLElBQU0sa0JBQUEsR0FBcUIsU0FBckIsa0JBQXFCLEdBQU07RUFDL0IsSUFBSSxVQUFKLEVBQWdCO0lBQ2QsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLE9BQUEsRUFBUSxVQUFSLENBQUEsQ0FBQTtHQUNEO0VBQ0QsSUFBSSxTQUFKLEVBQWU7SUFDYixDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsWUFBQSxFQUFhLFNBQWIsQ0FBQSxDQUFBO0dBQ0Q7Q0FOSCxDQUFBOztBQVNBLElBQU0saUJBQUEsR0FBb0IsU0FBcEIsaUJBQW9CLENBQUEsS0FBQSxFQUEwQjtFQUFBLElBQXZCLFFBQXVCLEdBQUEsS0FBQSxDQUF2QixRQUF1QjtNQUFiLE1BQWEsR0FBQSxLQUFBLENBQWIsTUFBYSxDQUFBOztFQUNsRCxXQUFBLEVBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxlQUFBLEVBQWdCLE1BQWhCLENBQUEsQ0FBQTtFQUNBLHVCQUFBLENBQXdCLEVBQUUsUUFBQSxFQUFBLFFBQUYsRUFBWSxNQUFBLEVBQUEsTUFBWixFQUF4QixDQUFBLENBQUE7RUFDQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsYUFBQSxFQUFjLFFBQWQsRUFBd0IsaUJBQXhCLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FBQSxZQUFBLEdBQUEsQ0FBQTtFQUNBLGlCQUFBLENBQWtCLEVBQUUsUUFBQSxFQUFBLFFBQUYsRUFBbEIsQ0FBQSxDQUFBO0VBQ0EsSUFBSSxRQUFBLENBQVMsUUFBVCxDQUFrQixtQkFBdEIsRUFBMkM7SUFDekMsa0JBQUEsRUFBQSxDQUFBO0dBQ0Q7Q0FUSCxDQUFBOztBQVlBLElBQU0sV0FBQSxHQUFjO0VBQ2xCLGNBQUEsRUFBQSxjQURrQjtFQUVsQixNQUFBLEVBQUEsTUFGa0I7RUFHbEIsS0FBQSxFQUFBLEtBSGtCO0VBSWxCLFFBQUEsRUFBQSxRQUFBO0NBSkYsQ0FBQTs7QUFPQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsT0FBQSxFQUFLLFlBQUE7RUFBQSxPQUFNLENBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQSxzQkFBQSxFQUF1QixVQUF2QixDQUFBLENBQW1DLFdBQW5DLEVBQWdELGlCQUFoRCxDQUFOLENBQUE7Q0FBTCxDQUFBLENBQUE7Ozs7Ozs7Ozs7QUN2R0EsSUFBQSxNQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOzs7O0FBRUEsSUFBTSxRQUFBLEdBQVcsU0FBWCxRQUFXLENBQUMsSUFBRCxFQUFPLFNBQVAsRUFBcUI7RUFDcEMsSUFBSSxJQUFKLEVBQVU7SUFDUixJQUFNLGFBQUEsR0FBZ0IsSUFBQSxDQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBdEIsQ0FBQTtJQUNBLElBQU0sVUFBQSxHQUFhLGFBQUEsR0FBZ0IsYUFBQSxDQUFjLEtBQWQsQ0FBb0IsR0FBcEIsQ0FBaEIsR0FBMkMsRUFBOUQsQ0FBQTtJQUNBLE9BQU8sVUFBQSxDQUFXLE9BQVgsQ0FBbUIsU0FBbkIsQ0FBQSxLQUFrQyxDQUFDLENBQTFDLENBQUE7R0FDRDtFQUNELE9BQU8sS0FBUCxDQUFBO0NBTkYsQ0FBQTs7QUFTQSxJQUFNLFFBQUEsR0FBVyxTQUFYLFFBQVcsQ0FBQyxJQUFELEVBQU8sV0FBUCxFQUF1QjtFQUN0QyxJQUFJLElBQUosRUFBVTtJQUNSLElBQU0sYUFBQSxHQUFnQixJQUFBLENBQUssWUFBTCxDQUFrQixPQUFsQixDQUF0QixDQUFBO0lBQ0EsSUFBTSxVQUFBLEdBQWEsYUFBQSxHQUFnQixhQUFBLENBQWMsS0FBZCxDQUFvQixHQUFwQixDQUFoQixHQUEyQyxFQUE5RCxDQUFBOztJQUVBLElBQUksQ0FBQyxRQUFBLENBQVMsSUFBVCxFQUFlLFdBQWYsQ0FBTCxFQUFrQztNQUNoQyxJQUFNLFVBQUEsR0FBYSxFQUFBLENBQUEsTUFBQSxDQUFBLGtCQUFBLENBQUksVUFBSixDQUFBLEVBQUEsQ0FBZ0IsV0FBaEIsQ0FBQSxDQUFBLENBQTZCLElBQTdCLENBQWtDLEdBQWxDLENBQW5CLENBQUE7TUFDQSxJQUFBLENBQUssWUFBTCxDQUFrQixPQUFsQixFQUEyQixVQUEzQixDQUFBLENBQUE7S0FDRDtHQUNGO0NBVEgsQ0FBQTs7QUFZQSxJQUFNLFdBQUEsR0FBYyxTQUFkLFdBQWMsQ0FBQyxJQUFELEVBQU8sVUFBUCxFQUFzQjtFQUN4QyxJQUFJLElBQUosRUFBVTtJQUNSLElBQU0sVUFBQSxHQUFhLElBQUEsQ0FBSyxTQUFMLENBQWUsS0FBZixDQUFxQixHQUFyQixDQUFuQixDQUFBO0lBQ0EsSUFBQSxDQUFLLFNBQUwsR0FBaUIsVUFBQSxDQUFXLE1BQVgsQ0FBa0IsVUFBQyxJQUFELEVBQUE7TUFBQSxPQUFVLElBQUEsS0FBUyxVQUFuQixDQUFBO0tBQWxCLENBQUEsQ0FBaUQsSUFBakQsQ0FBc0QsR0FBdEQsQ0FBakIsQ0FBQTtHQUNEO0NBSkgsQ0FBQTs7Ozs7Ozs7O0FBY0EsSUFBTSxnQkFBQSxHQUFtQixTQUFuQixnQkFBbUIsQ0FBQyxRQUFELEVBQWM7RUFDckMsUUFBQSxDQUFTLE9BQVQsQ0FBaUIsVUFBQSxJQUFBLEVBQTZDO0lBQUEsSUFBMUMsT0FBMEMsR0FBQSxJQUFBLENBQTFDLE9BQTBDO1FBQWpDLE1BQWlDLEdBQUEsSUFBQSxDQUFqQyxNQUFpQztRQUFBLGtCQUFBLEdBQUEsSUFBQSxDQUF6QixhQUF5QjtRQUF6QixhQUF5QixHQUFBLGtCQUFBLEtBQUEsU0FBQSxHQUFULEVBQVMsR0FBQSxrQkFBQSxDQUFBOztJQUM1RCxJQUFJLE1BQUosRUFBWTtNQUNWLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLEVBQWUsT0FBZixFQUF3QixDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsZ0JBQUEsRUFBaUIsYUFBakIsRUFBZ0MsTUFBaEMsQ0FBeEIsRUFBaUUsS0FBakUsQ0FBQSxDQUFBO0tBREYsTUFFTztNQUNMLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxhQUFBLEVBQWMsT0FBZCxDQUFBLENBQUE7S0FDRDtHQUxILENBQUEsQ0FBQTtDQURGLENBQUE7O1FBVVMsV0FBQTtRQUFVLGNBQUE7b0RBQWE7UUFBVSxtQkFBQTs7Ozs7Ozs7Ozs7QUMvQzFDOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsU0FBUyxTQUFULENBQW1CLEtBQW5CLEVBQTBCLE1BQTFCLEVBQWtDLE9BQWxDLEVBQTJDO0FBQ3pDLE1BQU0sT0FBTyxRQUFiO0FBQ0EsTUFBTSxxQkFBbUIsT0FBTyxRQUFQLENBQWdCLFFBQWhCLENBQXlCLE9BQXpCLENBQWlDLHFCQUFqQyxFQUF3RCxJQUF4RCxDQUF6QjtBQUNBLE1BQU0sMEJBQU47QUFDQSxNQUFNLGlCQUFOO0FBQ0EsV0FBUyxNQUFULEdBQWtCLENBQUksS0FBSixTQUFhLE1BQWIsRUFBdUIsSUFBdkIsRUFBNkIsT0FBN0IsRUFBc0MsTUFBdEMsRUFBOEMsUUFBOUMsRUFBd0QsTUFBeEQsRUFBZ0UsSUFBaEUsQ0FBcUUsSUFBckUsQ0FBbEI7QUFDQSxXQUFTLE1BQVQsR0FBa0IsQ0FBSSxLQUFKLGdCQUFvQixNQUFwQixFQUE4QixJQUE5QixFQUFvQyxPQUFwQyxFQUE2QyxNQUE3QyxFQUFxRCxJQUFyRCxDQUEwRCxJQUExRCxDQUFsQjtBQUNEOztBQUVELFNBQVMsZUFBVCxDQUF5QixTQUF6QixFQUFvQyxjQUFwQyxFQUFvRDtBQUNsRDtBQUNBO0FBRmtELE1BRzdCLE1BSDZCLEdBR3FCLGNBSHJCLENBRzFDLFdBSDBDO0FBQUEsTUFHTixDQUhNLEdBR3FCLGNBSHJCLENBR3JCLGFBSHFCO0FBQUEsTUFHQSxnQkFIQSw0QkFHcUIsY0FIckI7O0FBQUEscUJBSWtDLGdDQUpsQztBQUFBLE1BSTFCLGNBSjBCLGdCQUkxQyxjQUowQztBQUFBLE1BSUUsUUFKRixnQkFJVixVQUpVO0FBQUEsTUFJZSxjQUpmOztBQU1sRCxNQUFNLHlCQUNELGNBREMsRUFFRCxnQkFGQyxFQUdBLGVBQWUsS0FBZixJQUF3QixNQUF4QixHQUFpQyxFQUFFLGNBQUYsRUFBakMsR0FBOEMsRUFBRSxZQUFZLENBQWQsRUFIOUM7QUFJSixrQ0FKSTtBQUtKO0FBTEksSUFBTjtBQU9BLE1BQU0sa0JBQWtCLE9BQU8sSUFBUCxDQUFZLFNBQVosRUFDckIsR0FEcUIsQ0FDakIsVUFBQyxRQUFEO0FBQUEsV0FBaUIsUUFBakIsU0FBNkIsbUJBQW1CLFVBQVUsUUFBVixDQUFuQixDQUE3QjtBQUFBLEdBRGlCLEVBRXJCLElBRnFCLENBRWhCLEdBRmdCLENBQXhCO0FBR0EsU0FBVSx3QkFBVixlQUFzQyxTQUF0QyxTQUFtRCxlQUFuRDtBQUNEOztBQUVELFNBQVMsa0JBQVQsQ0FBNEIsU0FBNUIsUUFBMkU7QUFBQSxNQUFsQyxPQUFrQyxRQUFsQyxPQUFrQztBQUFBLE1BQXpCLE1BQXlCLFFBQXpCLE1BQXlCO0FBQUEsTUFBakIsYUFBaUIsUUFBakIsYUFBaUI7O0FBQUEsc0JBQ3ZCLGdDQUR1QjtBQUFBLE1BQ2pFLEtBRGlFLGlCQUNqRSxLQURpRTtBQUFBLE1BQzFDLGNBRDBDLGlCQUMxRCxjQUQwRDs7QUFFekUsTUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNWO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDLE1BQUQsSUFBVyxDQUFDLE9BQWhCLEVBQXlCO0FBQ3ZCO0FBQ0EsWUFBUSxJQUFSLENBQWEsNEVBQWI7QUFDRDs7QUFFRCxNQUFJLGFBQUosRUFBbUI7QUFDakIsUUFBTSxXQUFXLEVBQUUsWUFBRixFQUFTLGdCQUFULEVBQWtCLGNBQWxCLEVBQWpCO0FBQ0EscUNBQ3VCLGNBRHZCLEVBRUUsbUJBQW1CLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBbkIsQ0FGRixFQUdFLGFBSEY7QUFLRDtBQUNGOztBQUVELFNBQVMsaUJBQVQsQ0FBMkIsU0FBM0IsRUFBc0MsY0FBdEMsRUFBc0Q7QUFDcEQscUJBQW1CLFNBQW5CLEVBQThCLGNBQTlCO0FBQ0EsTUFBTSxNQUFNLGdCQUFnQixTQUFoQixFQUEyQixjQUEzQixDQUFaO0FBQ0EsTUFBSTtBQUNGLHVCQUFJLEVBQUUsUUFBRixFQUFKO0FBQ0QsR0FGRCxDQUVFLE9BQU8sQ0FBUCxFQUFVO0FBQ1Y7QUFDRDtBQUNGOztBQUVELElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQVUsSUFBVixFQUFnQjtBQUN0QyxvQkFBa0Isb0JBQWxCLEVBQXdDLElBQXhDO0FBQ0QsQ0FGRDs7QUFJQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQVUsSUFBVixFQUFnQjtBQUNoQyxvQkFBa0IsY0FBbEIsRUFBa0MsSUFBbEM7QUFDRCxDQUZEOztBQUlBLElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQVUsSUFBVixFQUFnQjtBQUN0QyxvQkFBa0Isb0JBQWxCLEVBQXdDLElBQXhDO0FBQ0QsQ0FGRDs7QUFJQSxJQUFJLEtBQUssSUFBVDs7QUFFQSxJQUFNLDBCQUEwQixTQUExQix1QkFBMEIsR0FBWTtBQUMxQywrQkFBaUIsTUFBakIsRUFBeUIsU0FBekIsRUFBb0MsVUFBVSxLQUFWLEVBQWlCO0FBQ25ELFFBQUksT0FBTyxNQUFNLElBQWIsS0FBc0IsUUFBMUIsRUFBb0M7QUFDbEM7QUFDRDs7QUFFRCxRQUFJLFVBQUo7QUFDQSxRQUFJO0FBQ0YsVUFBSSxFQUFFLE1BQU0sS0FBSyxLQUFMLENBQVcsTUFBTSxJQUFqQixDQUFSLEVBQUo7QUFDRCxLQUZELENBRUUsT0FBTyxDQUFQLEVBQVU7QUFDVjtBQUNBO0FBQ0Q7O0FBRUQsUUFBSSxFQUFFLElBQUYsQ0FBTyxPQUFQLEtBQW1CLE9BQXZCLEVBQWdDO0FBQzlCLFdBQUssRUFBRSxJQUFGLENBQU8sUUFBWjtBQUNBLGFBQU8sTUFBUCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxTQUFMLENBQWUsRUFBRSxTQUFTLFlBQVgsRUFBeUIsVUFBVSxFQUFuQyxFQUFmLENBQTFCLEVBQW1GLEdBQW5GO0FBQ0E7QUFDRDs7QUFFRCxRQUFJLEVBQUUsSUFBRixDQUFPLE9BQVAsS0FBbUIscUJBQXZCLEVBQThDO0FBQzVDLGFBQU8sRUFBRSxJQUFGLENBQU8sT0FBZDtBQUNBLHNCQUFnQixFQUFFLElBQWxCO0FBQ0Q7O0FBRUQsUUFBSSxFQUFFLElBQUYsQ0FBTyxPQUFQLEtBQW1CLHNCQUF2QixFQUErQztBQUM3QyxhQUFPLEVBQUUsSUFBRixDQUFPLE9BQWQ7QUFDQSxnQkFBVSxFQUFFLElBQVo7QUFDRDtBQUNGLEdBNUJEO0FBNkJELENBOUJEOztBQWdDQSxJQUFNLFdBQVc7QUFDZixjQUFZLGVBREc7QUFFZjtBQUZlLENBQWpCOztrQkFLZSxROzs7Ozs7Ozs7Ozs7OztBQ25IZixJQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7Ozs7O0FBS0EsU0FBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDO0VBQ25DLElBQU0sTUFBQSxHQUFTLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBZixDQUFBO0VBQ0EsSUFBTSxnQkFBQSxHQUFtQixTQUFuQixnQkFBbUIsQ0FBQyxHQUFELEVBQUE7SUFBQSxPQUFVLE1BQUEsQ0FBTyxPQUFQLENBQWUsR0FBQSxDQUFJLENBQUosQ0FBZixDQUFBLEtBQTJCLENBQUMsQ0FBNUIsR0FBZ0MsR0FBQSxDQUFJLFNBQUosQ0FBYyxDQUFkLENBQWhDLEdBQW1ELEdBQTdELENBQUE7R0FBekIsQ0FBQTtFQUNBLElBQU0sT0FBQSxHQUFVLFNBQVYsT0FBVSxDQUFDLEdBQUQsRUFBQTtJQUFBLE9BQ2QsR0FBQSxDQUNHLEtBREgsQ0FDUyxHQURULENBQUEsQ0FFRyxNQUZILENBRVUsT0FGVixDQUFBLENBR0csR0FISCxDQUdPLFVBQUMsVUFBRCxFQUFnQjtNQUFBLElBQUEsaUJBQUEsR0FDRSxVQUFBLENBQVcsS0FBWCxDQUFpQixHQUFqQixDQURGO1VBQUEsa0JBQUEsR0FBQSxjQUFBLENBQUEsaUJBQUEsRUFBQSxDQUFBLENBQUE7VUFDWixHQURZLEdBQUEsa0JBQUEsQ0FBQSxDQUFBLENBQUE7VUFDUCxLQURPLEdBQUEsa0JBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTs7TUFFbkIsSUFBSTtRQUNGLElBQU0sSUFBQSxHQUFPLGtCQUFBLENBQW1CLEdBQW5CLENBQWIsQ0FBQTtRQUNBLElBQU0sTUFBQSxHQUFTLGtCQUFBLENBQW1CLEtBQW5CLENBQWYsQ0FBQTtRQUNBLE9BQU8sQ0FBQyxJQUFELEVBQU8sTUFBUCxDQUFQLENBQUE7T0FIRixDQUlFLE9BQU8sQ0FBUCxFQUFVLEVBQUU7S0FUbEIsQ0FBQSxDQVdHLE1BWEgsQ0FXVSxPQVhWLENBRGMsQ0FBQTtHQUFoQixDQUFBO0VBYUEsSUFBTSxRQUFBLEdBQVcsQ0FBQSxDQUFBLEVBQUEsR0FBQSxDQUFBLE9BQUEsRUFBUSxHQUFBLENBQUEsYUFBUixFQUF1QixPQUF2QixFQUFnQyxnQkFBaEMsQ0FBakIsQ0FBQTtFQUNBLE9BQU8sUUFBQSxDQUFTLFdBQVQsQ0FBUCxDQUFBO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7OztBQWVELFNBQVMsY0FBVCxHQUFvRDtFQUFBLElBQTVCLFFBQTRCLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQWpCLE1BQUEsQ0FBTyxRQUFVLENBQUE7O0VBQ2xELElBQU0sV0FBQSxHQUFjLGNBQUEsQ0FBZSxRQUFBLENBQVMsTUFBeEIsQ0FBcEIsQ0FBQTtFQUNBLElBQU0sVUFBQSxHQUFhLGNBQUEsQ0FBZSxRQUFBLENBQVMsSUFBeEIsQ0FBbkIsQ0FBQTtFQUNBLE9BQUEsUUFBQSxDQUFBLEVBQUEsRUFBWSxXQUFaLEVBQTRCLFVBQTVCLENBQUEsQ0FBQTtDQUNEOzswREFHQztRQUNrQixjQUFsQjs7Ozs7Ozs7Ozs7OztBQzdDRixJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSx3QkFBQSxHQUFBLE9BQUEsQ0FBQSxrQ0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOzs7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsSUFBbkMsRUFBeUMsUUFBekMsRUFBbUQ7RUFDakQsSUFBSSxPQUFKLEVBQWE7SUFDWCxJQUFJLE9BQUEsQ0FBUSxnQkFBWixFQUE4QjtNQUM1QixPQUFBLENBQVEsZ0JBQVIsQ0FBeUIsSUFBekIsRUFBK0IsUUFBL0IsQ0FBQSxDQUFBO0tBREYsTUFFTztNQUNMLE9BQUEsQ0FBUSxXQUFSLENBQUEsSUFBQSxHQUF5QixJQUF6QixFQUFpQyxVQUFVLENBQVYsRUFBYTtRQUM1QyxDQUFBLEdBQUksQ0FBQSxJQUFLLE1BQUEsQ0FBTyxLQUFoQixDQUFBO1FBQ0EsQ0FBQSxDQUFFLGNBQUYsR0FDRSxDQUFBLENBQUUsY0FBRixJQUNBLFlBQVk7VUFDVixDQUFBLENBQUUsV0FBRixHQUFnQixLQUFoQixDQUFBO1NBSEosQ0FBQTtRQUtBLENBQUEsQ0FBRSxlQUFGLEdBQ0UsQ0FBQSxDQUFFLGVBQUYsSUFDQSxZQUFZO1VBQ1YsQ0FBQSxDQUFFLFlBQUYsR0FBaUIsSUFBakIsQ0FBQTtTQUhKLENBQUE7UUFLQSxRQUFBLENBQVMsSUFBVCxDQUFjLE9BQWQsRUFBdUIsQ0FBdkIsQ0FBQSxDQUFBO09BWkYsQ0FBQSxDQUFBO0tBY0Q7R0FDRjtDQUNGOztBQUVELFNBQVMsY0FBVCxHQUEwQjtFQUN4QixPQUFPLElBQUksT0FBSixDQUFZLFVBQVUsT0FBVixFQUFtQjtJQUNwQyxJQUFNLGtCQUFBLEdBQXFCLFNBQXJCLGtCQUFxQixHQUFZO01BQ3JDLFVBQUEsQ0FBVyxZQUFZO1FBQ3JCLE9BQUEsRUFBQSxDQUFBO09BREYsRUFFRyxDQUZILENBQUEsQ0FBQTtLQURGLENBQUE7SUFLQSxJQUFJLFFBQUEsQ0FBUyxVQUFULEtBQXdCLFVBQTVCLEVBQXdDO01BQ3RDLGtCQUFBLEVBQUEsQ0FBQTtLQURGLE1BRU87TUFDTCxnQkFBQSxDQUFpQixNQUFqQixFQUF5QixNQUF6QixFQUFpQyxZQUFZO1FBQzNDLGtCQUFBLEVBQUEsQ0FBQTtPQURGLENBQUEsQ0FBQTtLQUdEO0dBWkksQ0FBUCxDQUFBO0NBY0Q7O0FBRUQsU0FBUyxxQkFBVCxDQUErQixLQUEvQixFQUFzQyxNQUF0QyxFQUE4QztFQUM1QyxJQUFJO0lBQ0YsS0FBQSxDQUFNLGNBQU4sRUFBQSxDQUFBO0dBREYsQ0FFRSxPQUFPLENBQVAsRUFBVTtJQUNWLE9BQU8sS0FBUCxDQUFBO0dBQ0Q7RUFDRCxPQUFPLEtBQUEsQ0FBTSxjQUFOLENBQXFCLE1BQUEsSUFBVSxPQUEvQixDQUFQLENBQUE7Q0FDRDs7QUFFRCxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsT0FBakMsRUFBMEM7RUFDeEMsSUFBSSxDQUFDLE9BQUwsRUFBYztJQUNaLE9BQUEsQ0FBUSxHQUFSLENBQVksOENBQVosQ0FBQSxDQUFBO0dBREYsTUFFTyxJQUFJLFdBQUEsSUFBZSxPQUFuQixFQUE0Qjs7SUFFakMsT0FBQSxDQUFRLFNBQVIsR0FBb0IsT0FBcEIsQ0FBQTtHQUZLLE1BR0E7SUFDTCxPQUFBLENBQVEsV0FBUixHQUFzQixPQUF0QixDQUFBO0dBQ0Q7Q0FDRjs7QUFFRCxJQUFNLGdCQUFBLEdBQW1CLFNBQW5CLGdCQUFtQixDQUFDLE1BQUQsRUFBWTtFQUNuQyxJQUFJLE9BQU8sTUFBUCxLQUFrQixRQUF0QixFQUFnQztJQUM5QixNQUFBLEdBQVMsTUFBQSxDQUFPLFVBQVAsQ0FBa0IsR0FBbEIsRUFBdUIsRUFBdkIsQ0FBVCxDQUFBO0lBQ0EsTUFBQSxHQUFTLE1BQUEsQ0FBTyxVQUFQLENBQWtCLEdBQWxCLEVBQXVCLEVBQXZCLENBQVQsQ0FBQTtJQUNBLE1BQUEsR0FBUyxNQUFBLENBQU8sVUFBUCxDQUFrQixHQUFsQixFQUF1QixFQUF2QixDQUFULENBQUE7R0FDRDtFQUNELE9BQU8sTUFBUCxDQUFBO0NBTkYsQ0FBQTs7QUFTQSxJQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsQ0FBQyxNQUFELEVBQVk7RUFDL0IsSUFBSSxPQUFPLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7SUFDOUIsT0FBTyxNQUFQLENBQUE7R0FDRDs7Ozs7Ozs7O0VBU0QsT0FBTyxNQUFBLENBQU8sT0FBUCxDQUFlLHNEQUFmLEVBQXVFLElBQXZFLENBQVAsQ0FBQTtDQVpGLENBQUE7Ozs7Ozs7Ozs7QUF1QkEsU0FBUyxjQUFULENBQXdCLE9BQXhCLEVBQWlDLE9BQWpDLEVBQTJEO0VBQUEsSUFBakIsUUFBaUIsR0FBQSxTQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBTixJQUFNLENBQUE7O0VBQ3pELElBQUksQ0FBQyxPQUFMLEVBQWM7SUFDWixPQUFBLENBQVEsSUFBUixDQUFhLG1EQUFiLENBQUEsQ0FBQTtHQURGLE1BRU87SUFDTCxPQUFBLENBQVEsU0FBUixHQUFvQixRQUFBLEdBQVcsWUFBQSxDQUFhLE9BQWIsQ0FBWCxHQUFtQyxPQUF2RCxDQUFBO0dBQ0Q7Q0FDRjs7Ozs7Ozs7QUFRRCxJQUFNLGdCQUFBLEdBQW1CLFNBQW5CLGdCQUFtQixDQUFDLFNBQUQsRUFBZTtFQUN0QyxPQUFPLHdCQUFBLENBQUEsdUJBQUEsQ0FBd0IsUUFBeEIsQ0FBaUMsU0FBakMsQ0FBUCxDQUFBO0NBREYsQ0FBQTs7Ozs7Ozs7QUFVQSxJQUFNLGtCQUFBLEdBQXFCLFNBQXJCLGtCQUFxQixDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQTBCO0VBQ25ELElBQUksQ0FBQyxTQUFMLEVBQWdCO0lBQ2QsT0FBQSxDQUFRLElBQVIsQ0FBYSx3RUFBYixDQUFBLENBQUE7SUFDQSxPQUFBO0dBQ0Q7O0VBRUQsSUFBSSxDQUFDLFNBQUwsRUFBZ0I7SUFDZCxPQUFBLENBQVEsSUFBUixDQUFhLG9FQUFiLENBQUEsQ0FBQTtJQUNBLE9BQUE7R0FDRDs7RUFFRCxJQUFNLGdCQUFBLEdBQW1CLGdCQUFBLENBQWlCLFNBQWpCLENBQXpCLENBQUE7RUFDQSxPQUFBLENBQVEsR0FBUixDQUFZLG9CQUFaLEVBQWtDLGdCQUFsQyxDQUFBLENBQUE7O0VBRUEsSUFBSSxDQUFDLGdCQUFMLEVBQXVCO0lBQ3JCLE9BQUEsQ0FBUSxJQUFSLENBQUEsY0FBQSxHQUNpQixTQURqQixHQUFBLGlFQUFBLENBQUEsQ0FBQTtJQUdBLE9BQUE7R0FDRDs7RUFFRCxJQUFNLGFBQUEsR0FBZ0IsUUFBQSxDQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBdEIsQ0FBQTs7RUFFQSxJQUFJLENBQUMsYUFBTCxFQUFvQjtJQUNsQixPQUFBLENBQVEsS0FBUixDQUFjLDhFQUFkLENBQUEsQ0FBQTtJQUNBLE9BQUE7R0FDRDs7O0VBR0QsYUFBQSxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBK0IsU0FBL0IsR0FBQSxJQUFBLEdBQTZDLFNBQTdDLENBQUEsQ0FBQTtDQTdCRixDQUFBOzs7Ozs7OztBQXNDQSxJQUFNLGlCQUFBLEdBQW9CLFNBQXBCLGlCQUFvQixDQUFDLFNBQUQsRUFBZTtFQUN2QyxJQUFJLENBQUMsU0FBTCxFQUFnQjtJQUNkLE9BQUEsQ0FBUSxJQUFSLENBQWEsb0VBQWIsQ0FBQSxDQUFBO0lBQ0EsT0FBQTtHQUNEOztFQUVELElBQU0sZ0JBQUEsR0FBbUIsZ0JBQUEsQ0FBaUIsU0FBakIsQ0FBekIsQ0FBQTs7RUFFQSxJQUFJLENBQUMsZ0JBQUwsRUFBdUI7SUFDckIsT0FBQSxDQUFRLElBQVIsQ0FBQSxjQUFBLEdBQ2lCLFNBRGpCLEdBQUEsb0VBQUEsQ0FBQSxDQUFBO0lBR0EsT0FBQTtHQUNEOzs7RUFHRCxJQUFNLHlCQUFBLEdBQTRCLFFBQUEsQ0FBUyxjQUFULENBQXdCLG1CQUF4QixDQUFsQyxDQUFBO0VBQ0EsSUFBSSxDQUFDLHlCQUFMLEVBQWdDO0lBQzlCLE9BQUEsQ0FBUSxLQUFSLENBQWMsZ0VBQWQsQ0FBQSxDQUFBO0lBQ0EsT0FBQTtHQUNEOztFQUVELElBQU0sbUJBQUEsR0FBQSxxQkFBQSxHQUE0QyxTQUFsRCxDQUFBO0VBQ0EseUJBQUEsQ0FBMEIsU0FBMUIsQ0FBb0MsR0FBcEMsQ0FBd0MsbUJBQXhDLENBQUEsQ0FBQTtDQXZCRixDQUFBOztBQTBCQSxTQUFTLGdCQUFULENBQTBCLFlBQTFCLEVBQXdDLE1BQXhDLEVBQWdEO0VBQzlDLElBQUksQ0FBQyxNQUFMLEVBQWE7SUFDWCxPQUFBLENBQVEsR0FBUixDQUFZLDRCQUFaLENBQUEsQ0FBQTtJQUNBLE9BQU8sRUFBUCxDQUFBO0dBQ0Q7RUFDRCxPQUFPLE1BQUEsQ0FBTyxJQUFQLENBQVksWUFBWixDQUFBLENBQTBCLE1BQTFCLENBQ0wsVUFBQyxNQUFELEVBQVMsR0FBVCxFQUFBO0lBQUEsT0FBaUIsTUFBQSxDQUFPLEtBQVAsQ0FBYSxHQUFiLENBQUEsQ0FBa0IsSUFBbEIsQ0FBdUIsWUFBQSxDQUFhLEdBQWIsQ0FBdkIsQ0FBakIsQ0FBQTtHQURLLEVBRUwsTUFGSyxDQUFQLENBQUE7Q0FJRDs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0M7RUFDOUIsSUFBSSxDQUFDLE9BQUQsSUFBWSxDQUFDLE9BQUEsQ0FBUSxVQUF6QixFQUFxQztJQUNuQyxPQUFBLENBQVEsR0FBUixDQUFZLDZDQUFaLENBQUEsQ0FBQTtJQUNBLE9BQUE7R0FDRDtFQUNELE9BQU8sT0FBQSxDQUFRLFVBQVIsQ0FBbUIsV0FBbkIsQ0FBK0IsT0FBL0IsQ0FBUCxDQUFBO0NBQ0Q7O0FBRUQsSUFBTSxZQUFBLEdBQWUsU0FBZixZQUFlLENBQUMsS0FBRCxFQUFRLFVBQVIsRUFBdUI7RUFDMUMsSUFBTSxJQUFBLEdBQU8sUUFBQSxDQUFTLG9CQUFULENBQThCLE1BQTlCLENBQUEsQ0FBc0MsQ0FBdEMsQ0FBYixDQUFBO0VBQ0EsSUFBTSxPQUFBLEdBQVUsUUFBQSxDQUFTLGNBQVQsQ0FBd0IsbUJBQXhCLENBQWhCLENBQUE7O0VBRUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFFBQUEsRUFBUyxJQUFULEVBQWUsS0FBZixDQUFBLENBQUE7RUFDQSxDQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsUUFBQSxFQUFTLE9BQVQsRUFBa0IsU0FBbEIsQ0FBQSxDQUFBOztFQUVBLElBQUksQ0FBQyxVQUFMLEVBQWlCO0lBQ2YsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFFBQUEsRUFBUyxJQUFULEVBQWUsZ0JBQWYsQ0FBQSxDQUFBO0dBQ0Q7Q0FUSCxDQUFBOzs7QUFhQSxJQUFNLHlCQUFBLEdBQTRCLFNBQTVCLHlCQUE0QixDQUFDLEdBQUQsRUFBQTtFQUFBLE9BQUEsRUFBQSxHQUFZLEdBQVosSUFBa0IsR0FBQSxDQUFJLE9BQUosQ0FBWSxHQUFaLENBQUEsS0FBcUIsQ0FBQyxDQUF0QixHQUEwQixHQUExQixHQUFnQyxHQUFsRCxDQUFBLENBQUE7Q0FBbEMsQ0FBQTs7QUFFQSxJQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsQ0FBQyxZQUFELEVBQUE7RUFBQSxPQUFrQixVQUFDLEdBQUQsRUFBQTtJQUFBLE9BQ2xDLHlCQUFBLENBQTBCLEdBQTFCLENBRGtDLEdBQUEsaUNBQUEsR0FDOEIsWUFEOUIsQ0FBQTtHQUFsQixDQUFBO0NBQXJCLENBQUE7O0FBR0EsSUFBTSx5QkFBQSxHQUE0QixTQUE1Qix5QkFBNEIsQ0FBQyxRQUFELEVBQUE7RUFBQSxPQUFjLFVBQUMsT0FBRCxFQUFhO0lBQzNELElBQUksUUFBQSxJQUFZLE9BQWhCLEVBQXlCO01BQ3ZCLE9BQUEsQ0FBUSxHQUFSLEdBQWMsVUFBZCxDQUFBO0tBQ0Q7R0FIK0IsQ0FBQTtDQUFsQyxDQUFBOztBQU1BLElBQU0saUJBQUEsR0FBb0IsU0FBcEIsaUJBQW9CLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBeUQ7RUFBQSxJQUEvQixVQUErQixHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFsQixhQUFrQixDQUFBO0VBQUEsSUFHbkQsZUFIbUQsR0FNN0UsUUFONkUsQ0FFL0UsY0FGK0UsQ0FHN0UsZUFINkUsQ0FHMUQsS0FIMEQ7TUFLL0UsS0FMK0UsR0FNN0UsUUFONkUsQ0FLL0UsS0FMK0UsQ0FBQTs7RUFPakYsSUFBTSxLQUFBLEdBQVEsRUFBQSxDQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsUUFBQSxDQUFTLHNCQUFULENBQWdDLFVBQWhDLENBQWQsQ0FBZCxDQUFBO0VBQ0EsSUFBTSxPQUFBLEdBQVUsZUFBQSxHQUFrQixLQUFBLENBQU0sVUFBeEIsR0FBcUMsS0FBQSxDQUFNLFdBQTNELENBQUE7RUFDQSxLQUFLLElBQUksQ0FBQSxHQUFJLENBQWIsRUFBZ0IsQ0FBQSxHQUFJLEtBQUEsQ0FBTSxNQUExQixFQUFrQyxDQUFBLEVBQWxDLEVBQXVDO0lBQ3JDLEtBQUEsQ0FBTSxDQUFOLENBQUEsQ0FBUyxJQUFULEdBQWdCLFlBQUEsQ0FBYSxhQUFiLENBQUEsQ0FBNEIsT0FBNUIsQ0FBaEIsQ0FBQTtHQUNEO0NBWEgsQ0FBQTs7OztBQWdCQSxJQUFNLEtBQUEsR0FBUSxTQUFSLEtBQVEsQ0FBQyxHQUFELEVBQVM7RUFDckIsSUFBTSxNQUFBLEdBQVMsRUFBZixDQUFBO0VBQ0EsT0FBTyxHQUFBLEdBQU0sQ0FBYixFQUFnQjtJQUNkLE1BQUEsQ0FBTyxJQUFQLENBQVksTUFBQSxDQUFPLE1BQW5CLENBQUEsQ0FBQTtJQUNBLEdBQUEsRUFBQSxDQUFBO0dBQ0Q7RUFDRCxPQUFPLE1BQVAsQ0FBQTtDQU5GLENBQUE7Ozs7QUFXQSxJQUFNLFVBQUEsR0FBYSxTQUFiLFVBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFjO0VBQy9CLElBQU0sY0FBQSxHQUFpQixTQUFqQixjQUFpQixDQUFDLENBQUQsRUFBQTtJQUFBLE9BQVEsQ0FBQSxHQUFJLEdBQUosR0FBVSxHQUFWLEdBQWdCLENBQUEsR0FBSSxDQUFKLEdBQVEsQ0FBUixHQUFZLENBQXBDLENBQUE7R0FBdkIsQ0FBQTtFQUNBLElBQUksUUFBQSxHQUFXLEtBQWYsQ0FBQTs7RUFFQSxJQUFJLEdBQUEsQ0FBSSxDQUFKLENBQUEsS0FBVyxHQUFmLEVBQW9CO0lBQ2xCLEdBQUEsR0FBTSxHQUFBLENBQUksS0FBSixDQUFVLENBQVYsQ0FBTixDQUFBO0lBQ0EsUUFBQSxHQUFXLElBQVgsQ0FBQTtHQUNEOztFQUVELElBQU0sR0FBQSxHQUFNLFFBQUEsQ0FBUyxHQUFULEVBQWMsRUFBZCxDQUFaLENBQUE7RUFDQSxJQUFJLENBQUMsR0FBTCxFQUFVO0lBQ1IsT0FBTyxHQUFQLENBQUE7R0FDRDs7RUFFRCxJQUFJLENBQUEsR0FBSSxDQUFDLEdBQUEsSUFBTyxFQUFSLElBQWMsR0FBdEIsQ0FBQTtFQUNBLENBQUEsR0FBSSxjQUFBLENBQWUsQ0FBZixDQUFKLENBQUE7O0VBRUEsSUFBSSxDQUFBLEdBQUksQ0FBRSxHQUFBLElBQU8sQ0FBUixHQUFhLE1BQWQsSUFBd0IsR0FBaEMsQ0FBQTtFQUNBLENBQUEsR0FBSSxjQUFBLENBQWUsQ0FBZixDQUFKLENBQUE7O0VBRUEsSUFBSSxDQUFBLEdBQUksQ0FBQyxHQUFBLEdBQU0sUUFBUCxJQUFtQixHQUEzQixDQUFBO0VBQ0EsQ0FBQSxHQUFJLGNBQUEsQ0FBZSxDQUFmLENBQUosQ0FBQTs7RUFyQitCLElBQUEsSUFBQSxHQXVCbkIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBQSxDQUFVLEdBQVYsQ0FBYyxVQUFDLEtBQUQsRUFBQTtJQUFBLE9BQ3hCLEtBQUEsSUFBUyxFQUFULEdBQUEsR0FBQSxHQUFrQixLQUFBLENBQU0sUUFBTixDQUFlLEVBQWYsQ0FBbEIsR0FBeUMsS0FBQSxDQUFNLFFBQU4sQ0FBZSxFQUFmLENBRGpCLENBQUE7R0FBZCxDQXZCbUIsQ0FBQTs7RUFBQSxJQUFBLEtBQUEsR0FBQSxjQUFBLENBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBOztFQXVCOUIsQ0F2QjhCLEdBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0VBdUIzQixDQXZCMkIsR0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7RUF1QnhCLENBdkJ3QixHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTs7RUEwQi9CLE9BQU8sQ0FBQyxRQUFBLEdBQVcsR0FBWCxHQUFpQixFQUFsQixJQUF3QixDQUF4QixHQUE0QixDQUE1QixHQUFnQyxDQUF2QyxDQUFBO0NBMUJGLENBQUE7O0FBNkJBLElBQU0sU0FBQSxHQUFZLFNBQVosU0FBWSxDQUFDLEdBQUQsRUFBb0I7RUFBQSxJQUFkLEtBQWMsR0FBQSxTQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBTixDQUFNLENBQUE7O0VBQ3BDLElBQU0sR0FBQSxHQUFNLEdBQUEsQ0FBSSxDQUFKLENBQUEsS0FBVyxHQUFYLEdBQWlCLFFBQUEsQ0FBUyxHQUFBLENBQUksS0FBSixDQUFVLENBQVYsQ0FBVCxFQUF1QixFQUF2QixDQUFqQixHQUE4QyxRQUFBLENBQVMsR0FBVCxFQUFjLEVBQWQsQ0FBMUQsQ0FBQTtFQUNBLElBQU0sR0FBQSxHQUFNLEdBQUEsSUFBTyxFQUFuQixDQUFBO0VBQ0EsSUFBTSxLQUFBLEdBQVMsR0FBQSxJQUFPLENBQVIsR0FBYSxNQUEzQixDQUFBO0VBQ0EsSUFBTSxJQUFBLEdBQU8sR0FBQSxHQUFNLFFBQW5CLENBQUE7RUFDQSxPQUFBLE9BQUEsR0FBZSxHQUFmLEdBQUEsR0FBQSxHQUFzQixLQUF0QixHQUFBLEdBQUEsR0FBK0IsSUFBL0IsR0FBQSxHQUFBLEdBQXVDLEtBQXZDLEdBQUEsR0FBQSxDQUFBO0NBTEYsQ0FBQTs7QUFRQSxJQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsQ0FBQyxTQUFELEVBQWU7RUFDbEMsSUFBTSxjQUFBLEdBQWlCLFFBQUEsQ0FBUyxhQUFULENBQXVCLE9BQXZCLENBQXZCLENBQUE7RUFDQSxjQUFBLENBQWUsV0FBZixDQUNFLFFBQUEsQ0FBUyxjQUFULENBQUEseUZBQUEsR0FLYSxTQUxiLEdBQUEsK0VBQUEsR0FRMkIsU0FSM0IsR0FBQSw4RUFBQSxHQVdvQixVQUFBLENBQVcsU0FBWCxFQUFzQixDQUFDLEVBQXZCLENBWHBCLEdBQUEsaUVBQUEsR0FjYSxTQUFBLENBQVUsU0FBVixFQUFxQixHQUFyQixDQWRiLEdBQUEsOEVBQUEsR0FpQm9CLFNBQUEsQ0FBVSxTQUFWLEVBQXFCLEdBQXJCLENBakJwQixHQUFBLGdHQUFBLEdBb0JhLFNBcEJiLEdBQUEsNkJBQUEsQ0FERixDQUFBLENBQUE7RUF5QkEsUUFBQSxDQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLGNBQTFCLENBQUEsQ0FBQTtDQTNCRixDQUFBOztBQThCQSxJQUFNLGNBQUEsR0FBaUIsU0FBakIsY0FBaUIsQ0FBQyxXQUFELEVBQWlCO0VBQ3RDLElBQU0sZ0JBQUEsR0FBbUIsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBekIsQ0FBQTtFQUNBLGdCQUFBLENBQWlCLFdBQWpCLENBQ0UsUUFBQSxDQUFTLGNBQVQsQ0FBQSxvQ0FBQSxHQUVvQixXQUZwQixHQUFBLDZCQUFBLENBREYsQ0FBQSxDQUFBO0VBT0EsUUFBQSxDQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLGdCQUExQixDQUFBLENBQUE7Q0FURixDQUFBOztBQVlBLElBQU0sT0FBQSxHQUFVLFNBQVYsT0FBVSxDQUFDLFVBQUQsRUFBZ0I7RUFDOUIsSUFBTSxhQUFBLEdBQWdCLENBQUEsQ0FBQSxFQUFBLFNBQUEsQ0FBQSxPQUFBLEdBQXRCLENBQUE7RUFDQSxJQUFNLDBCQUFBLEdBQTZCLFVBQUEsQ0FBVyxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEdBQTFCLENBQUEsQ0FBK0IsV0FBL0IsRUFBbkMsQ0FBQTtFQUNBLElBQU0sUUFBQSxHQUFXLFFBQUEsQ0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWpCLENBQUE7RUFDQSxRQUFBLENBQVMsR0FBVCxHQUFlLFlBQWYsQ0FBQTs7O0VBR0EsUUFBQSxDQUFTLElBQVQsR0FBbUIsYUFBbkIsR0FBQSxTQUFBLEdBQTBDLDBCQUExQyxHQUFBLE1BQUEsQ0FBQTtFQUNBLFFBQUEsQ0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixRQUExQixDQUFBLENBQUE7O0VBRUEsSUFBTSxhQUFBLEdBQWdCLFVBQUEsQ0FBVyxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEdBQTFCLENBQXRCLENBQUE7RUFDQSxJQUFNLFNBQUEsR0FBWSxRQUFBLENBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFsQixDQUFBO0VBQ0EsU0FBQSxDQUFVLFdBQVYsQ0FDRSxRQUFBLENBQVMsY0FBVCxDQUFBLDRGQUFBLEdBS2tCLGFBTGxCLEdBQUEsd0NBQUEsQ0FERixDQUFBLENBQUE7RUFVQSxRQUFBLENBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsU0FBMUIsQ0FBQSxDQUFBO0NBdEJGLENBQUE7O0FBeUJBLElBQU0sZUFBQSxHQUFrQixTQUFsQixlQUFrQixDQUFDLFFBQUQsRUFBYztFQUNwQyxRQUFBLENBQVMsZUFBVCxDQUF5QixZQUF6QixDQUFzQyxNQUF0QyxFQUE4QyxRQUE5QyxDQUFBLENBQUE7Q0FERixDQUFBOztBQUlBLElBQU0sYUFBQSxHQUFnQixTQUFoQixhQUFnQixDQUFDLEtBQUQsRUFBVztFQUMvQixJQUFNLFNBQUEsR0FBWSwyQkFBbEIsQ0FBQTtFQUNBLE9BQU8sT0FBTyxLQUFQLEtBQWlCLFFBQWpCLElBQTZCLFNBQUEsQ0FBVSxJQUFWLENBQWUsS0FBZixDQUE3QixHQUFxRCxLQUFyRCxHQUE2RCxJQUFwRSxDQUFBO0NBRkYsQ0FBQTs7QUFLQSxJQUFNLHFCQUFBLEdBQXdCLFNBQXhCLHFCQUF3QixDQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLFNBQWpCLEVBQTRCLFVBQTVCLEVBQTJDO0VBQ3ZFLElBQU0sV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixFQUFwQixDQUFBO0VBQ0EsSUFBTSxhQUFBLEdBQWdCLFNBQUEsQ0FBVSxxQkFBVixFQUF0QixDQUFBO0VBQ0EsSUFBTSxTQUFBLEdBQVksS0FBQSxDQUFNLHFCQUFOLEVBQWxCLENBQUE7O0VBRUEsSUFBSSxXQUFBLENBQVksSUFBWixHQUFtQixhQUFBLENBQWMsSUFBckMsRUFBMkM7Ozs7SUFJekMsT0FBQSxDQUFRLEtBQVIsQ0FBYyxJQUFkLEdBQXdCLGFBQUEsQ0FBYyxJQUFkLEdBQXFCLFNBQUEsQ0FBVSxJQUF2RCxHQUFBLElBQUEsQ0FBQTtJQUNBLE9BQUEsQ0FBUSxLQUFSLENBQWMsS0FBZCxHQUFzQixNQUF0QixDQUFBOztJQUVBLElBQU0sWUFBQSxHQUFlLE9BQUEsQ0FBUSxxQkFBUixFQUFyQixDQUFBO0lBQ0EsSUFBTSxnQkFBQSxHQUFtQixnQkFBQSxDQUFpQixVQUFqQixDQUFBLENBQTZCLElBQXRELENBQUE7SUFDQSxVQUFBLENBQVcsS0FBWCxDQUFpQixJQUFqQixHQUFBLE9BQUEsR0FBZ0MsZ0JBQWhDLEdBQUEsS0FBQSxHQUFzRCxJQUFBLENBQUssS0FBTCxDQUNwRCxXQUFBLENBQVksSUFBWixHQUFtQixZQUFBLENBQWEsSUFEb0IsQ0FBdEQsR0FBQSxLQUFBLENBQUE7R0FURixNQVlPLElBQUksV0FBQSxDQUFZLEtBQVosR0FBb0IsYUFBQSxDQUFjLEtBQXRDLEVBQTZDOzs7O0lBSWxELE9BQUEsQ0FBUSxLQUFSLENBQWMsS0FBZCxHQUF5QixTQUFBLENBQVUsS0FBVixHQUFrQixhQUFBLENBQWMsS0FBekQsR0FBQSxJQUFBLENBQUE7SUFDQSxPQUFBLENBQVEsS0FBUixDQUFjLElBQWQsR0FBcUIsTUFBckIsQ0FBQTs7SUFFQSxJQUFNLGFBQUEsR0FBZSxPQUFBLENBQVEscUJBQVIsRUFBckIsQ0FBQTtJQUNBLElBQU0saUJBQUEsR0FBbUIsZ0JBQUEsQ0FBaUIsVUFBakIsQ0FBQSxDQUE2QixJQUF0RCxDQUFBO0lBQ0EsVUFBQSxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsR0FBQSxPQUFBLEdBQWdDLGlCQUFoQyxHQUFBLEtBQUEsR0FBc0QsSUFBQSxDQUFLLEtBQUwsQ0FDcEQsV0FBQSxDQUFZLEtBQVosR0FBb0IsYUFBQSxDQUFhLEtBRG1CLENBQXRELEdBQUEsS0FBQSxDQUFBO0dBR0Q7Q0E3QkgsQ0FBQTs7QUFnQ0EsSUFBTSxvQkFBQSxHQUF1QixTQUF2QixvQkFBdUIsQ0FBQyxxQkFBRCxFQUEyQjtFQUN0RCxJQUFNLFVBQUEsR0FBYSxTQUFiLFVBQWEsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFBO0lBQUEsT0FBVSxDQUFBLENBQUUsSUFBRixDQUFPLGFBQVAsQ0FBcUIsQ0FBQSxDQUFFLElBQXZCLENBQVYsQ0FBQTtHQUFuQixDQUFBOztFQUVBLElBQU0sY0FBQSxHQUFpQixxQkFBQSxDQUNwQixNQURvQixDQUNiLFVBQUMsQ0FBRCxFQUFBO0lBQUEsT0FBTyxDQUFBLENBQUUsSUFBRixLQUFXLFlBQWxCLENBQUE7R0FEYSxDQUFBLENBRXBCLElBRm9CLENBRWYsVUFGZSxDQUF2QixDQUFBO0VBR0EsSUFBTSxlQUFBLEdBQWtCLHFCQUFBLENBQXNCLE1BQXRCLENBQTZCLFVBQUMsQ0FBRCxFQUFBO0lBQUEsT0FBTyxDQUFBLENBQUUsSUFBRixLQUFXLE9BQWxCLENBQUE7R0FBN0IsQ0FBQSxDQUF3RCxJQUF4RCxDQUE2RCxVQUE3RCxDQUF4QixDQUFBOztFQUVBLE9BQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxrQkFBQSxDQUFXLGNBQVgsQ0FBQSxFQUFBLGtCQUFBLENBQThCLGVBQTlCLENBQUEsQ0FBQSxDQUFBO0NBUkYsQ0FBQTs7QUFXQSxJQUFNLDJCQUFBLEdBQThCLFNBQTlCLDJCQUE4QixHQUFNOztFQUV4QyxJQUFNLElBQUEsR0FBTyw2QkFBYixDQUFBO0VBQ0EsT0FBTyxJQUFBLENBQUssT0FBTCxDQUFhLEdBQWIsQ0FBQSxLQUFzQixDQUF0QixHQUEwQiwwQkFBMUIsR0FBdUQsSUFBOUQsQ0FBQTtDQUhGLENBQUE7O1FBT0UsbUJBQUE7UUFDQSxlQUFBO1FBQ0EsaUJBQUE7dUVBQ0E7NkRBQ0E7UUFDQSx3QkFBQTtpRUFDQTtRQUNBLG1CQUFBO2lEQUNBO3FFQUNBO1FBQ0EsZ0JBQUE7UUFDQSxnQkFBQTt3REFDQTtRQUNBLG1CQUFBOzBEQUNBO1FBQ0EsaUJBQUE7UUFDQSxrQkFBQTtRQUNBLFVBQUE7NkRBQ0E7UUFDQSxlQUFBO1FBQ0EsaUJBQUE7OERBQ0E7UUFDQSxlQUFBO2dFQUNBOzs7Ozs7Ozs7O0FDemJGLElBQUEsV0FBQSxHQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUE7O0FBRUEsSUFBTSxRQUFBLEdBQVcsU0FBWCxRQUFXLEdBQUE7RUFBQSxPQUFNLENBQUEsQ0FBQSxFQUFBLFdBQUEsQ0FBQSxtQkFBQSxFQUFvQixNQUFwQixDQUFOLENBQUE7Q0FBakIsQ0FBQTs7QUFFQSxJQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsR0FBc0M7RUFBQSxJQUFyQyxhQUFxQyxHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFyQixnQkFBcUIsQ0FBQTs7RUFDekQsSUFBTSxTQUFBLEdBQ0osT0FBTyxhQUFQLEtBQXlCLFFBQXpCLEdBQW9DLFFBQUEsQ0FBUyxjQUFULENBQXdCLGFBQXhCLENBQXBDLEdBQTZFLGFBRC9FLENBQUE7O0VBR0EsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLGdCQUFBLEVBQWlCLENBQ2Y7SUFDRSxPQUFBLEVBQVMsU0FEWDtJQUVFLE1BQUEsRUFBUSxRQUFBLEVBQUE7R0FISyxDQUFqQixDQUFBLENBQUE7Q0FKRixDQUFBOztvREFZUztRQUFVLGVBQUE7Ozs7Ozs7OztBQ2pCbkI7O0FBQ0E7O0FBRUEsSUFBTSxpQkFBaUIsR0FBdkI7O0FBRUE7Ozs7Ozs7QUFPQSxJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsTUFBRCxFQUFZO0FBQ3ZCLE1BQUksY0FBYyxLQUFsQjtBQUNBLDZCQUFPLFlBQU07QUFDWCxrQkFBYyxJQUFkO0FBQ0EsUUFBSSxPQUFPLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDaEM7QUFDRCxLQUZELE1BRU87QUFDTCxjQUFRLElBQVIsQ0FBYSx1QkFBYjtBQUNEO0FBQ0YsR0FQRDs7QUFTQTs7QUFFQTtBQUNBO0FBQ0EsYUFBVyxZQUFNO0FBQ2YsUUFBSSxDQUFDLFdBQUwsRUFBa0I7QUFDaEI7QUFDRDtBQUNGLEdBSkQsRUFJRyxjQUpIO0FBS0QsQ0FwQkQ7O2tCQXNCZSxJOzs7Ozs7Ozs7O0FDbENmLElBQUEsV0FBQSxHQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxNQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBOztBQUVBLElBQU0sU0FBQSxHQUFZLFNBQVosU0FBWSxDQUFBLElBQUEsRUFBMEQ7RUFBQSxJQUF2RCxHQUF1RCxHQUFBLElBQUEsQ0FBdkQsR0FBdUQ7TUFBQSxlQUFBLEdBQUEsSUFBQSxDQUFsRCxVQUFrRDtNQUFsRCxVQUFrRCxHQUFBLGVBQUEsS0FBQSxTQUFBLEdBQXJDLElBQXFDLEdBQUEsZUFBQTtNQUFBLGlCQUFBLEdBQUEsSUFBQSxDQUEvQixZQUErQjtNQUEvQixZQUErQixHQUFBLGlCQUFBLEtBQUEsU0FBQSxHQUFoQixFQUFnQixHQUFBLGlCQUFBO01BQVosS0FBWSxHQUFBLElBQUEsQ0FBWixLQUFZLENBQUE7O0VBQzFFLElBQU0sUUFBQSxHQUFXLElBQUEsQ0FBSyxLQUFMLENBQVcsR0FBWCxDQUFqQixDQUFBO0VBQ0EsSUFBTSxRQUFBLEdBQVcsR0FBQSxLQUFRLFFBQVIsR0FBbUIsRUFBbkIsR0FBQSxhQUFBLEdBQXNDLFFBQXRDLEdBQUEsUUFBakIsQ0FBQTtFQUNBLElBQU0sY0FBQSxHQUFpQixDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsYUFBQSxFQUFjLEtBQWQsQ0FBdkIsQ0FBQTtFQUNBLE9BQU8sQ0FBQSxDQUFBLEVBQUEsV0FBQSxDQUFBLEdBQUEsRUFDTCxFQUFFLEtBQUEsRUFBTyxZQUFULEVBREs7O0VBR0wsQ0FBQSxDQUFBLEVBQUEsV0FBQSxDQUFBLG1CQUFBLEVBQ0UsT0FERixFQUFBLEVBQUEsSUFHSSxjQUFBLEdBQ0ksdUJBREosR0FBQSxxQkFBQSxHQUUwQixRQUYxQixHQUVxQyxRQUx6QyxDQUFBLEVBT0UsRUFBRSxNQUFBLEVBQVEsR0FBVixFQUFlLFVBQUEsRUFBWSxVQUFBLElBQWMsR0FBekMsRUFBOEMsS0FBQSxFQUFPLGNBQXJELEVBUEYsQ0FISyxDQUFQLENBQUE7Q0FKRixDQUFBOztBQW1CQSxJQUFNLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQSxLQUFBLEVBVWpCO0VBQUEsSUFBQSxvQkFBQSxHQUFBLEtBQUEsQ0FSRCxjQVFDO01BUEMsS0FPRCxHQUFBLG9CQUFBLENBUEMsS0FPRDtNQU5DLFVBTUQsR0FBQSxvQkFBQSxDQU5DLFVBTUQ7TUFMb0IsS0FLcEIsR0FBQSxvQkFBQSxDQUxDLGVBS0QsQ0FMb0IsS0FLcEIsQ0FBQTtFQUFBLElBRkgsY0FFRyxHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUZjLGlCQUVkLENBQUE7RUFBQSxJQURILFVBQ0csR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7O0VBQ0gsSUFBTSxjQUFBLEdBQWlCLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxhQUFBLEVBQWMsVUFBZCxDQUF2QixDQUFBO0VBQ0EsSUFBTSxTQUFBLEdBQ0osT0FBTyxjQUFQLEtBQTBCLFFBQTFCLEdBQXFDLFFBQUEsQ0FBUyxjQUFULENBQXdCLGNBQXhCLENBQXJDLEdBQStFLGNBRGpGLENBQUE7Ozs7RUFLQSxJQUFNLGNBQUEsR0FBaUIsS0FBQSxHQUFRLEtBQVIsR0FBZ0IsQ0FBdkMsQ0FBQTs7RUFFQSxDQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsZ0JBQUEsRUFBaUIsQ0FDZjtJQUNFLE9BQUEsRUFBUyxTQURYO0lBRUUsTUFBQSxFQUFRLFNBQUEsQ0FBVSxFQUFFLEdBQUEsRUFBSyxjQUFQLEVBQXVCLFVBQUEsRUFBQSxVQUF2QixFQUFtQyxLQUFBLEVBQU8sY0FBMUMsRUFBVixDQUFBO0dBSEssQ0FBakIsQ0FBQSxDQUFBO0NBbkJGLENBQUE7O3FEQTJCUztRQUFXLGdCQUFBOzs7Ozs7Ozs7O0FDbERwQixJQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBLENBQUE7O0FBT0EsSUFBQSxlQUFBLEdBQUEsT0FBQSxDQUFBLGtCQUFBLENBQUEsQ0FBQTs7QUFLQSxJQUFNLHNCQUFBLEdBQXlCLFNBQXpCLHNCQUF5QixDQUFDLFVBQUQsRUFBQTtFQUFBLE9BQWdCLFVBQUMsV0FBRCxFQUFjLGlCQUFkLEVBQWlDLFdBQWpDLEVBQWlEO0lBQzlGLENBQUEsQ0FBQSxFQUFBLFVBQUEsQ0FBQSxTQUFBLEVBQUEsaUJBQUEsR0FBNEIsVUFBNUIsQ0FBQSxDQUNFLFdBREYsRUFFRSxpQkFGRixFQUdFLFdBSEYsRUFJRSxVQUFBLENBQUEsaUJBSkYsQ0FBQSxDQUFBO0dBRDZCLENBQUE7Q0FBL0IsQ0FBQTs7QUFTQSxJQUFNLDZCQUFBLEdBQWdDLFNBQWhDLDZCQUFnQyxDQUFDLFVBQUQsRUFBQTtFQUFBLE9BQWdCLFVBQ3BELFdBRG9ELEVBRXBELGlCQUZvRCxFQUdwRCxXQUhvRCxFQUlqRDtJQUNILENBQUEsQ0FBQSxFQUFBLFVBQUEsQ0FBQSxjQUFBLEVBQUEsaUJBQUEsR0FBaUMsVUFBakMsQ0FBQSxDQUNFLFdBREYsRUFFRSxpQkFGRixFQUdFLFdBSEYsRUFJRSxVQUFBLENBQUEsMkJBSkYsQ0FBQSxDQUFBO0dBTG9DLENBQUE7Q0FBdEMsQ0FBQTs7NERBY0UsZUFBQSxDQUFBOzhEQUNBLGVBQUEsQ0FBQTt3RUFDQSxVQUFBLENBQUE7UUFDQSx5QkFBQTt5RUFDQTs7Ozs7Ozs7OztBQ3ZDRixJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFlBQUEsR0FBQSxPQUFBLENBQUEsZ0JBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQTs7Ozs7OztBQUdBLElBQU0sTUFBQSxHQUFTLFNBQVQsTUFBUyxDQUFDLFVBQUQsRUFBZ0I7RUFDN0IsSUFBSSxJQUFBLEdBQU8sRUFBWCxDQUFBO0VBQ0EsSUFBTSxRQUFBLEdBQVcsZ0VBQWpCLENBQUE7RUFDQSxLQUFLLElBQUksQ0FBQSxHQUFJLENBQWIsRUFBZ0IsQ0FBQSxHQUFJLFVBQXBCLEVBQWdDLENBQUEsRUFBaEMsRUFBcUM7SUFDbkMsSUFBQSxJQUFRLFFBQUEsQ0FBUyxNQUFULENBQWdCLElBQUEsQ0FBSyxLQUFMLENBQVcsSUFBQSxDQUFLLE1BQUwsRUFBQSxHQUFnQixRQUFBLENBQVMsTUFBcEMsQ0FBaEIsQ0FBUixDQUFBO0dBQ0Q7RUFDRCxPQUFPLElBQVAsQ0FBQTtDQU5GLENBQUE7OztBQVVBLElBQU0sT0FBQSxHQUFVLFNBQVYsT0FBVSxDQUFDLEdBQUQsRUFBTSxNQUFOLEVBQUE7RUFBQSxPQUNkLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLElBQVYsRUFBbUI7SUFDN0IsSUFBSSxNQUFBLEdBQUEsS0FBQSxDQUFKLENBQUE7SUFDQSxJQUFJLEdBQUEsR0FBQSxLQUFBLENBQUosQ0FBQTs7SUFFQSxJQUFJLEdBQUEsQ0FBSSxPQUFKLENBQVksR0FBWixDQUFBLEtBQXFCLENBQXpCLEVBQTRCO01BQzFCLE1BQUEsR0FBUyxNQUFBLElBQVUsRUFBbkIsQ0FBQTs7TUFEMEIsSUFBQSxxQkFBQSxHQUVSLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxXQUFBLEdBRlE7VUFFbEIsS0FGa0IsR0FBQSxxQkFBQSxDQUVsQixLQUZrQixDQUFBOztNQUcxQixJQUFJLEtBQUosRUFBVztRQUNULE1BQUEsQ0FBTyxNQUFQLEdBQWdCLE1BQUEsQ0FBTyxFQUFQLENBQWhCLENBQUE7T0FDRDtLQUNGOztJQUVELElBQUksR0FBQSxDQUFJLE9BQUosQ0FBWSxNQUFaLENBQUEsS0FBd0IsQ0FBNUIsRUFBK0I7O01BRTdCLEdBQUEsR0FBTSxHQUFBLENBQUksT0FBSixDQUFZLFVBQVosRUFBd0IsUUFBeEIsQ0FBTixDQUFBO0tBRkYsTUFHTyxJQUFJLEdBQUEsQ0FBSSxPQUFKLENBQVksR0FBWixDQUFBLEtBQXFCLENBQXpCLEVBQTRCOztNQUVqQyxHQUFBLEdBQU0sQ0FBQSxDQUFBLEVBQUEsU0FBQSxDQUFBLE9BQUEsR0FBQSxHQUFxQixHQUEzQixDQUFBO0tBRkssTUFHQTs7TUFFTCxPQUFPLElBQUEsRUFBUCxDQUFBO0tBQ0Q7O0lBRUQsT0FBTyxDQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsT0FBQSxFQUFJO01BQ1QsR0FBQSxFQUFBLEdBRFM7TUFFVCxJQUFBLEVBQU0sTUFGRztNQUdULE9BQUEsRUFBUyxPQUhBO01BSVQsS0FBQSxFQUFPLElBQUE7S0FKRixDQUFQLENBQUE7R0F2QkYsQ0FEYyxDQUFBO0NBQWhCLENBQUE7O1FBZ0NTLFVBQUE7Ozs7Ozs7OztBQy9DVDs7QUFFQSxTQUFTLElBQVQsR0FBZ0I7QUFDZCxNQUFNLFFBQVEsVUFBVSxTQUFWLENBQW9CLFdBQXBCLEVBQWQ7QUFDQSxTQUFPLE1BQU0sT0FBTixDQUFjLE1BQWQsTUFBMEIsQ0FBQyxDQUEzQixHQUErQixTQUFTLE1BQU0sS0FBTixDQUFZLE1BQVosRUFBb0IsQ0FBcEIsQ0FBVCxDQUEvQixHQUFrRSxLQUF6RTtBQUNEOztBQUVEOztBQUVBLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0I7QUFDbEIsTUFBSTtBQUNGLFdBQU8sS0FBSyxLQUFMLENBQVcsSUFBSSxZQUFmLENBQVA7QUFDRCxHQUZELENBRUUsT0FBTyxDQUFQLEVBQVU7QUFDVixXQUFPLElBQUksWUFBWDtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsRUFBNEI7QUFDMUIsTUFBTSxNQUFNLEVBQVo7QUFDQSxPQUFLLElBQU0sQ0FBWCxJQUFnQixHQUFoQixFQUFxQjtBQUNuQixRQUFJLElBQUksY0FBSixDQUFtQixDQUFuQixDQUFKLEVBQTJCO0FBQ3pCLFVBQUksSUFBSixDQUFZLG1CQUFtQixDQUFuQixDQUFaLFNBQXFDLG1CQUFtQixJQUFJLENBQUosQ0FBbkIsQ0FBckM7QUFDRDtBQUNGO0FBQ0QsU0FBTyxJQUFJLElBQUosQ0FBUyxHQUFULENBQVA7QUFDRDs7QUFFRCxTQUFTLElBQVQsR0FBZ0IsQ0FBRTs7QUFFbEIsU0FBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCO0FBQzNCLE1BQU0saUJBQWlCLE9BQU8sY0FBUCxJQUF5QixhQUFoRDtBQUNBLE1BQU0sVUFBVSxJQUFJLGNBQUosQ0FBbUIsb0JBQW5CLENBQWhCO0FBQ0EsVUFBUSxJQUFSLENBQWEsT0FBTyxJQUFwQixFQUEwQixPQUFPLEdBQWpDLEVBQXNDLElBQXRDO0FBQ0EsVUFBUSxnQkFBUixDQUF5QixjQUF6QixFQUF5QyxtQ0FBekM7QUFDQSxVQUFRLGtCQUFSLEdBQTZCLFlBQVk7QUFDdkMsUUFBSSxRQUFRLFVBQVIsS0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsVUFBSSxRQUFRLE1BQVIsSUFBa0IsR0FBbEIsSUFBeUIsUUFBUSxNQUFSLEdBQWlCLEdBQTlDLEVBQW1EO0FBQ2pELGVBQU8sT0FBUCxDQUFlLE1BQU0sT0FBTixDQUFmO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxLQUFQLENBQWEsTUFBTSxPQUFOLENBQWI7QUFDRDtBQUNGO0FBQ0YsR0FSRDs7QUFVQSxVQUFRLElBQVIsQ0FBYSxPQUFPLElBQXBCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCO0FBQzdCLE1BQU0sVUFBVSxJQUFJLE9BQU8sY0FBWCxFQUFoQjtBQUNBLE1BQU0sV0FBVyxPQUFPLFFBQVAsQ0FBZ0IsUUFBakM7QUFDQSxTQUFPLEdBQVAsR0FBYSxPQUFPLEdBQVAsQ0FBVyxPQUFYLENBQW1CLFNBQW5CLEVBQThCLFFBQTlCLENBQWI7QUFDQSxVQUFRLElBQVIsQ0FBYSxPQUFPLElBQXBCLEVBQTBCLE9BQU8sR0FBakM7QUFDQSxVQUFRLE1BQVIsR0FBaUIsWUFBWTtBQUMzQixXQUFPLE9BQVAsQ0FBZSxNQUFNLE9BQU4sQ0FBZjtBQUNELEdBRkQ7QUFHQSxVQUFRLE9BQVIsR0FBa0IsWUFBWTtBQUM1QixXQUFPLEtBQVAsQ0FBYSxNQUFNLE9BQU4sQ0FBYjtBQUNELEdBRkQ7O0FBSUEsYUFBVyxZQUFZO0FBQ3JCLFlBQVEsSUFBUixDQUFhLE9BQU8sSUFBcEI7QUFDRCxHQUZELEVBRUcsQ0FGSDtBQUdEOztBQUVELFNBQVMsR0FBVCxDQUFhLE9BQWIsRUFBc0I7QUFDcEIsTUFBTSxTQUFTO0FBQ2IsVUFBTSxRQUFRLElBQVIsSUFBZ0IsS0FEVDtBQUViLFdBQU8sUUFBUSxLQUFSLElBQWlCLElBRlg7QUFHYixhQUFTLFFBQVEsT0FBUixJQUFtQixJQUhmO0FBSWIsVUFBTSxRQUFRLElBSkQ7QUFLYixTQUFLLFFBQVEsR0FBUixJQUFlO0FBTFAsR0FBZjs7QUFRQSxNQUFJLE9BQU8sSUFBUCxLQUFnQixLQUFoQixJQUF5QixPQUFPLElBQXBDLEVBQTBDO0FBQ3hDLFdBQU8sR0FBUCxHQUFnQixPQUFPLEdBQXZCLFNBQThCLGNBQWMsT0FBTyxJQUFyQixDQUE5QjtBQUNBLFdBQU8sT0FBTyxJQUFkO0FBQ0Q7O0FBRUQsTUFBSSxVQUFVLFVBQVUsQ0FBeEIsRUFBMkI7QUFDekIsa0JBQWMsTUFBZDtBQUNELEdBRkQsTUFFTztBQUNMLGdCQUFZLE1BQVo7QUFDRDtBQUNGOztrQkFFYyxHOzs7Ozs7Ozs7a0JDN0ZBLFlBQVk7QUFDekIsTUFBTSxPQUFPLG1CQUFiO0FBQ0EsU0FBTyxLQUFLLE9BQUwsQ0FBYSxHQUFiLE1BQXNCLENBQXRCLEdBQTBCLCtCQUExQixHQUE0RCxJQUFuRTtBQUNELEM7Ozs7Ozs7Ozs7Ozs7O0FDSkQsSUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEscUJBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsY0FBQSxHQUFBLE9BQUEsQ0FBQSw0QkFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxjQUFBLEdBQUEsT0FBQSxDQUFBLGtCQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7O0FBT0EsSUFBTSxvQkFBQSxHQUF1Qiw4QkFBN0IsQ0FBQTs7Ozs7OztBQU9BLElBQU0sbUJBQUEsR0FBc0IsU0FBdEIsbUJBQXNCLENBQUMsaUJBQUQsRUFBdUI7RUFDakQsSUFBTSxJQUFBLEdBQU8sTUFBQSxDQUFPLElBQVAsQ0FBWSxpQkFBWixDQUFiLENBQUE7RUFDQSxPQUFPLG9CQUFBLElBQXdCLGlCQUF4QixJQUE2QyxJQUFBLENBQUssTUFBTCxLQUFnQixDQUE3RCxHQUNILGlCQUFBLENBQWtCLG9CQUFsQixDQURHLEdBRUgsaUJBRkosQ0FBQTtDQUZGLENBQUE7Ozs7O0FBVUEsSUFBTSxpQkFBQSxHQUFvQixTQUFwQixpQkFBb0IsQ0FBQSxJQUFBLEVBQUE7RUFBQSxJQUVILEtBRkcsR0FBQSxJQUFBLENBQ3hCLGNBRHdCLENBRXRCLGVBRnNCLENBRUgsS0FGRyxDQUFBO0VBQUEsT0FJcEIsS0FBQSxHQUFRLENBSlksQ0FBQTtDQUExQixDQUFBOzs7Ozs7OztBQVlBLElBQU0sMkJBQUEsR0FBOEIsU0FBOUIsMkJBQThCLENBQUMsUUFBRCxFQUFjO0VBQ2hELElBQU0sSUFBQSxHQUFPLE1BQUEsQ0FBTyxJQUFQLENBQVksUUFBWixDQUFiLENBQUE7RUFDQSxPQUFPLElBQUEsQ0FBSyxJQUFMLENBQVUsVUFBQyxDQUFELEVBQUE7SUFBQSxPQUFPLGlCQUFBLENBQWtCLFFBQUEsQ0FBUyxDQUFULENBQWxCLENBQVAsQ0FBQTtHQUFWLENBQVAsQ0FBQTtDQUZGLENBQUE7Ozs7O0FBUUEsSUFBTSxpQkFBQSxHQUFvQixTQUFwQixpQkFBb0IsQ0FBQSxLQUFBLEVBQThEO0VBQUEsSUFBM0QscUJBQTJELEdBQUEsS0FBQSxDQUEzRCxxQkFBMkQ7TUFBcEMsNkJBQW9DLEdBQUEsS0FBQSxDQUFwQyw2QkFBb0MsQ0FBQTs7RUFDdEYsSUFBTSxtQkFBQSxHQUFzQixxQkFBQSxHQUN4QixxQkFBQSxDQUFzQixlQUF0QixDQUFzQyxLQURkLEdBRXhCLENBRkosQ0FBQTtFQUdBLElBQU0sMkJBQUEsR0FBOEIsNkJBQUEsR0FDaEMsNkJBQUEsQ0FBOEIsZUFBOUIsQ0FBOEMsS0FEZCxHQUVoQyxDQUZKLENBQUE7O0VBSUEsT0FBTyxtQkFBQSxHQUFzQiwyQkFBdEIsR0FBb0QsQ0FBM0QsQ0FBQTtDQVJGLENBQUE7OztBQVlBLElBQU0sWUFBQSxHQUFlLFNBQWYsWUFBZSxDQUFDLEdBQUQsRUFBQTtFQUFBLE9BQVMsVUFBQSxLQUFBLEVBQXlDO0lBQUEsSUFBdEMsY0FBc0MsR0FBQSxLQUFBLENBQXRDLGNBQXNDO1FBQXRCLE1BQXNCLEdBQUEsS0FBQSxDQUF0QixNQUFzQjtRQUFYLElBQVcsR0FBQSx3QkFBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLGdCQUFBLEVBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQTs7SUFDckUsSUFBTSxjQUFBLEdBQWlCLENBQUEsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxtQkFBQSxFQUFBLFFBQUEsQ0FBQTtNQUNyQixjQUFBLEVBQUEsY0FEcUI7TUFFckIsTUFBQSxFQUFBLE1BQUE7S0FGcUIsRUFHbEIsSUFIa0IsRUFBQTtNQUlyQixLQUFBLEVBQU8sSUFKYztLQUFBLENBQUEsQ0FBdkIsQ0FBQTtJQU1BLE9BQU8sQ0FBQSxDQUFBLEVBQUEsS0FBQSxDQUFBLE9BQUEsRUFBUSxHQUFSLEVBQWEsY0FBYixDQUFQLENBQUE7R0FQbUIsQ0FBQTtDQUFyQixDQUFBOzs7Ozs7QUFjQSxJQUFNLDRCQUFBLEdBQStCLFNBQS9CLDRCQUErQixDQUNuQyxpQkFEbUMsRUFBQTtFQUFBLElBRW5DLFdBRm1DLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRXJCLEtBRnFCLENBQUE7RUFBQSxJQUduQyxzQkFIbUMsR0FBQSxTQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FHVixpQkFIVSxDQUFBO0VBQUEsT0FJaEMsVUFBQSxLQUFBLEVBQWtFO0lBQUEsSUFBL0QsUUFBK0QsR0FBQSxLQUFBLENBQS9ELFFBQStEO1FBQXJELE1BQXFELEdBQUEsS0FBQSxDQUFyRCxNQUFxRDtRQUE3QyxLQUE2QyxHQUFBLEtBQUEsQ0FBN0MsS0FBNkM7UUFBdEMsY0FBc0MsR0FBQSxLQUFBLENBQXRDLGNBQXNDO1FBQXRCLGVBQXNCLEdBQUEsS0FBQSxDQUF0QixlQUFzQixDQUFBOztJQUNyRSxJQUFNLFVBQUEsR0FBYSxzQkFBQSxDQUF1QixRQUF2QixDQUFuQixDQUFBOztJQUVBLGlCQUFBLENBQWtCO01BQ2hCLFFBQUEsRUFBQSxRQURnQjtNQUVoQixNQUFBLEVBQUEsTUFGZ0I7TUFHaEIsY0FBQSxFQUFBLGNBSGdCO01BSWhCLGVBQUEsRUFBQSxlQUFBO0tBSkYsQ0FBQSxDQUFBOzs7SUFRQSxJQUFNLGVBQUEsR0FBa0IsU0FBbEIsZUFBa0IsQ0FBQSxLQUFBLEVBQXFCO01BQUEsSUFBWixLQUFZLEdBQUEsS0FBQSxDQUFsQixJQUFrQixDQUFBOztNQUMzQyxJQUFJLENBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxlQUFBLEVBQWdCLEtBQWhCLENBQUosRUFBNEI7UUFDMUIsQ0FBQSxDQUFBLEVBQUEsY0FBQSxDQUFBLGtCQUFBLEVBQW1CO1VBQ2pCLFFBQUEsRUFBQSxRQURpQjtVQUVqQixNQUFBLEVBQUEsTUFBQTtTQUZGLENBQUEsQ0FBQTtPQUlEO0tBTkgsQ0FBQTtJQVFBLElBQUksV0FBSixFQUFpQjtNQUNmLENBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxXQUFBLEVBQVksZUFBWixDQUFBLENBQUE7S0FDRDs7SUFFRCxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsWUFBQSxFQUFhLEtBQWIsRUFBb0IsVUFBcEIsQ0FBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBLEVBQUEsY0FBQSxDQUFBLG1CQUFBLEdBQUEsQ0FBQTtHQTVCbUMsQ0FBQTtDQUFyQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQThDQSxJQUFNLGNBQUEsR0FBaUIsU0FBakIsY0FBaUIsQ0FBQyxHQUFELEVBQUE7RUFBQSxPQUFTLFVBQzlCLGlCQUQ4QixFQUU5QixpQkFGOEIsRUFHOUIsV0FIOEIsRUFJOUIsc0JBSjhCLEVBSzNCO0lBQ0gsSUFBTSxnQkFBQSxHQUFtQixpQkFBQSxDQUFrQixNQUFBLENBQU8sSUFBUCxDQUFZLGlCQUFaLENBQUEsQ0FBK0IsQ0FBL0IsQ0FBbEIsQ0FBekIsQ0FBQTtJQURHLElBRUssTUFGTCxHQUVpQyxnQkFGakMsQ0FFSyxNQUZMO1FBQUEscUJBQUEsR0FFaUMsZ0JBRmpDLENBRWEsS0FGYjtRQUVhLEtBRmIsR0FBQSxxQkFBQSxLQUFBLFNBQUEsR0FFcUIsT0FGckIsR0FBQSxxQkFBQSxDQUFBOzs7SUFJSCxJQUFNLGdCQUFBLEdBQW1CLENBQUEsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxnQkFBQSxFQUFpQixDQUFBLENBQUEsRUFBQSxHQUFBLENBQUEsU0FBQSxFQUFVLFlBQUEsQ0FBYSxHQUFiLENBQVYsRUFBNkIsaUJBQTdCLENBQWpCLENBQXpCLENBQUE7SUFDQSxJQUFNLFlBQUEsR0FBZSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxHQUFyQixDQUFBOzs7SUFHQSxJQUFNLFlBQUEsR0FBZSxPQUFBLENBQVEsR0FBUixDQUFZLENBQUMsZ0JBQUQsRUFBbUIsWUFBbkIsQ0FBWixDQUFBLENBQ2xCLElBRGtCLENBQ2IsVUFBQSxLQUFBLEVBQXdCO01BQUEsSUFBQSxLQUFBLEdBQUEsY0FBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLENBQUE7VUFBdEIsZ0JBQXNCLEdBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBOztNQUM1QixJQUFNLFFBQUEsR0FBVyxtQkFBQSxDQUFvQixnQkFBcEIsQ0FBakIsQ0FBQTs7TUFFQSxPQUFPO1FBQ0wsUUFBQSxFQUFBLFFBREs7UUFFTCxNQUFBLEVBQUEsTUFGSztRQUdMLEtBQUEsRUFBQSxLQUFBO09BSEYsQ0FBQTtLQUppQixDQUFBLENBVWxCLElBVmtCLENBVWIsNEJBQUEsQ0FBNkIsaUJBQTdCLEVBQWdELFdBQWhELEVBQTZELHNCQUE3RCxDQVZhLENBQUEsQ0FXbEIsS0FYa0IsQ0FXWixVQUFDLENBQUQsRUFBTztNQUNaLElBQUksQ0FBQSxJQUFLLENBQUEsQ0FBRSxZQUFYLEVBQXlCOztRQUV2QixPQUFPLENBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxhQUFBLEdBQVAsQ0FBQTtPQUNEOztLQWZnQixDQUFyQixDQUFBOztJQW1CQSxDQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxFQUFXLFlBQVgsQ0FBQSxDQUFBO0dBaENxQixDQUFBO0NBQXZCLENBQUE7OztBQW9DQSxJQUFNLFNBQUEsR0FBWSxTQUFaLFNBQVksQ0FBQyxHQUFELEVBQUE7RUFBQSxPQUFTLFVBQ3pCLFdBRHlCLEVBRXpCLGlCQUZ5QixFQUd6QixXQUh5QixFQUl6QixzQkFKeUIsRUFLdEI7SUFDSCxJQUFNLGlCQUFBLEdBQUEsZUFBQSxDQUFBLEVBQUEsRUFBdUIsb0JBQXZCLEVBQThDLFdBQTlDLENBQU4sQ0FBQTtJQUNBLGNBQUEsQ0FBZSxHQUFmLENBQUEsQ0FBb0IsaUJBQXBCLEVBQXVDLGlCQUF2QyxFQUEwRCxXQUExRCxFQUF1RSxzQkFBdkUsQ0FBQSxDQUFBO0dBUGdCLENBQUE7Q0FBbEIsQ0FBQTs7UUFXRSxZQUFBO1FBQ0EsaUJBQUE7d0VBQ0E7UUFDQSxvQkFBQTtRQUNBLDhCQUFBO1FBQ0Esb0JBQUE7Ozs7Ozs7Ozs7OztBQzdLRixJQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsWUFBQSxDQUFBLENBQUE7O0FBRUEsSUFBTSxPQUFBLEdBQVUsTUFBQSxDQUFPLE1BQXZCLENBQUE7QUFDQSxJQUFNLFlBQUEsR0FBZSxFQUFyQixDQUFBO0FBQ0EsSUFBTSxjQUFBLEdBQWlCO0VBQ3JCLE9BQUEsRUFBUyxjQURZO0VBRXJCLFFBQUEsRUFBVSxZQUZXO0VBR3JCLElBQUEsRUFBTSxLQUhlO0VBSXJCLE1BQUEsRUFBUSxZQUphO0VBS3JCLFdBQUEsRUFBYSxFQUFBO0NBTGYsQ0FBQTtBQU9BLElBQU0sWUFBQSxHQUFlO0VBQ25CLElBQUEsRUFBTSxPQURhO0VBRW5CLEtBQUEsRUFBTyxLQUZZO0VBR25CLE1BQUEsRUFBUTtJQUNOLE1BQUEsRUFBUSxPQURGO0lBRU4sS0FBQSxFQUFPLEVBQUE7R0FGRDtDQUhWLENBQUE7QUFRQSxJQUFNLFlBQUEsR0FBZTtFQUNuQixJQUFBLEVBQU0sT0FEYTtFQUVuQixLQUFBLEVBQU8sSUFGWTtFQUduQixNQUFBLEVBQVE7SUFDTixLQUFBLEVBQU8sTUFERDtJQUVOLE1BQUEsRUFBUSxNQUZGO0lBR04sUUFBQSxFQUFVLE9BSEo7SUFJTixJQUFBLEVBQU0sR0FKQTtJQUtOLEtBQUEsRUFBTyxHQUxEO0lBTU4sR0FBQSxFQUFLLEdBTkM7SUFPTixNQUFBLEVBQVEsR0FQRjtJQVFOLE1BQUEsRUFBUSxRQVJGO0lBU04sTUFBQSxFQUFRLEVBQUE7R0FURjtDQUhWLENBQUE7O0FBZ0JBLElBQUksRUFBQSxHQUFLLElBQVQsQ0FBQTtBQUNBLElBQU0saUJBQUEsR0FBb0IsRUFBMUIsQ0FBQTs7QUFFQSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7RUFDNUIsSUFBSSxFQUFKLEVBQVE7SUFDTixPQUFBLENBQVEsUUFBUixHQUFtQixFQUFuQixDQUFBO0lBQ0EsT0FBQSxHQUFVLElBQUEsQ0FBSyxTQUFMLENBQWUsT0FBZixDQUFWLENBRk07SUFHTixPQUFBLENBQVEsV0FBUixDQUFvQixPQUFwQixFQUE2QixHQUE3QixDQUFBLENBQUE7R0FIRixNQUlPO0lBQ0wsWUFBQSxDQUFhLElBQWIsQ0FBa0IsT0FBbEIsQ0FBQSxDQUFBO0dBQ0Q7Q0FDRjs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0I7RUFDN0IsT0FBTyxVQUFDLE9BQUQsRUFBQTtJQUFBLElBQVUsT0FBVixHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFvQixFQUFwQixDQUFBO0lBQUEsT0FDTCxXQUFBLENBQUEsUUFBQSxDQUFBLEVBQUEsRUFDSyxPQURMLEVBQUE7TUFFRSxPQUFBLEVBQUEsT0FGRjtNQUdFLE9BQUEsRUFBUyxTQUhYO01BSUUsSUFBQSxFQUFNLE1BQUE7S0FKUixDQUFBLENBREssQ0FBQTtHQUFQLENBQUE7Q0FPRDs7QUFFRCxTQUFTLFNBQVQsR0FBcUI7RUFDbkIsT0FBTyxZQUFBLENBQWEsTUFBcEIsRUFBNEI7SUFDMUIsV0FBQSxDQUFZLFlBQUEsQ0FBYSxHQUFiLEVBQVosQ0FBQSxDQUFBO0dBQ0Q7Q0FDRjs7QUFFRCxTQUFTLGlCQUFULENBQTJCLE9BQTNCLEVBQW9DO0VBQ2xDLFdBQUEsQ0FBQSxRQUFBLENBQUEsRUFBQSxFQUNLLGNBREwsRUFFSyxZQUZMLEVBR0ssT0FITCxDQUFBLENBQUEsQ0FBQTtDQUtEOztBQUVELFNBQVMsaUJBQVQsQ0FBMkIsT0FBM0IsRUFBb0M7RUFDbEMsV0FBQSxDQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQ0ssY0FETCxFQUVLLFlBRkwsRUFHSyxPQUhMLENBQUEsQ0FBQSxDQUFBO0NBS0Q7O0FBRUQsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLGtCQUEzQixFQUErQztFQUM3QyxXQUFBLENBQVksRUFBRSxPQUFBLEVBQVMsVUFBWCxFQUF1QixJQUFBLEVBQU0sa0JBQTdCLEVBQWlELEtBQUEsRUFBTyxNQUF4RCxFQUFaLENBQUEsQ0FBQTtDQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixVQUFwQixFQUFnQztFQUM5QixXQUFBLENBQVksRUFBRSxPQUFBLEVBQVMsTUFBWCxFQUFtQixJQUFBLEVBQU0sVUFBekIsRUFBWixDQUFBLENBQUE7RUFDQSxhQUFBLENBQWMsTUFBZCxDQUFBLENBQXlCLFVBQXpCLEdBQUEsVUFBQSxFQUErQyxFQUFFLE9BQUEsRUFBUyxJQUFYLEVBQS9DLENBQUEsQ0FBQTtDQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixVQUFwQixFQUFnQztFQUM5QixXQUFBLENBQVksRUFBRSxPQUFBLEVBQVMsTUFBWCxFQUFtQixJQUFBLEVBQU0sVUFBekIsRUFBWixDQUFBLENBQUE7RUFDQSxhQUFBLENBQWMsTUFBZCxDQUFBLENBQXlCLFVBQXpCLEdBQUEsVUFBQSxFQUErQyxFQUFFLE9BQUEsRUFBUyxLQUFYLEVBQS9DLENBQUEsQ0FBQTtDQUNEOztBQUVELFNBQVMsV0FBVCxDQUFxQixVQUFyQixFQUFpQztFQUMvQixXQUFBLENBQVksRUFBRSxPQUFBLEVBQVMsT0FBWCxFQUFvQixJQUFBLEVBQU0sVUFBMUIsRUFBWixDQUFBLENBQUE7Q0FDRDs7QUFFRCxTQUFTLGlCQUFULEdBQTZCO0VBQzNCLFdBQUEsQ0FBWSxFQUFFLE9BQUEsRUFBUyxRQUFYLEVBQVosQ0FBQSxDQUFBO0NBQ0Q7O0FBRUQsU0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDO0VBQ2hDLE9BQU8sT0FBQSxLQUFZLFFBQW5CLENBQUE7Q0FDRDs7Ozs7QUFLRCxTQUFTLGtCQUFULENBQTRCLElBQTVCLEVBQWtDO0VBQ2hDLGFBQUEsQ0FBYyxPQUFkLENBQUEsQ0FBdUIsVUFBdkIsRUFBbUMsSUFBbkMsQ0FBQSxDQUFBO0NBQ0Q7Ozs7Ozs7QUFPRCxTQUFTLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLFlBQXRDLEVBQW9EO0VBQ2xELE9BQU8sQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixNQUF2QixDQUFBLENBQStCLEtBQS9CLENBQ0wsVUFBQyxHQUFELEVBQUE7SUFBQSxPQUFTLE9BQUEsQ0FBUSxHQUFSLENBQUEsSUFBZ0IsWUFBQSxDQUFhLEdBQWIsQ0FBaEIsSUFBcUMsT0FBQSxDQUFRLEdBQVIsQ0FBQSxLQUFpQixZQUFBLENBQWEsR0FBYixDQUEvRCxDQUFBO0dBREssQ0FBUCxDQUFBO0NBR0Q7O0FBRUQsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQztFQUNqQyxPQUFPLG1CQUFBLENBQW9CLE9BQXBCLEVBQTZCO0lBQ2xDLE9BQUEsRUFBUyxTQUR5QjtJQUVsQyxJQUFBLEVBQU0sT0FGNEI7SUFHbEMsT0FBQSxFQUFTLFVBQUE7R0FISixDQUFQLENBQUE7Q0FLRDs7QUFFRCxTQUFTLG9CQUFULENBQThCLE9BQTlCLEVBQXVDO0VBQ3JDLE9BQU8sbUJBQUEsQ0FBb0IsT0FBcEIsRUFBNkI7SUFDbEMsT0FBQSxFQUFTLFNBRHlCO0lBRWxDLElBQUEsRUFBTSxNQUY0QjtJQUdsQyxPQUFBLEVBQVMsZUFBQTtHQUhKLENBQVAsQ0FBQTtDQUtEOztBQUVELFNBQVMsbUJBQVQsQ0FBNkIsSUFBN0IsRUFBbUM7RUFDakMsaUJBQUEsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBQSxDQUFBO0NBQ0Q7O0FBRUQsU0FBUyxjQUFULEdBQTBCO0VBQ3hCLFVBQUEsQ0FBVyxNQUFYLENBQUEsQ0FBQTtDQUNEOztBQUVELFNBQVMsZUFBVCxHQUEyQjtFQUN6QixVQUFBLENBQVcsT0FBWCxDQUFBLENBQUE7Q0FDRDs7QUFFRCxTQUFTLGVBQVQsR0FBMkI7RUFDekIsVUFBQSxDQUFXLE9BQVgsQ0FBQSxDQUFBO0NBQ0Q7O0FBRUQsU0FBUyxnQkFBVCxHQUE0QjtFQUMxQixXQUFBLENBQVksT0FBWixDQUFBLENBQUE7Q0FDRDs7QUFFRCxTQUFTLGVBQVQsR0FBMkI7RUFDekIsVUFBQSxDQUFXLE9BQVgsQ0FBQSxDQUFBO0NBQ0Q7O0FBRUQsU0FBUyxlQUFULEdBQTJCO0VBQ3pCLFVBQUEsQ0FBVyxPQUFYLENBQUEsQ0FBQTtDQUNEOztBQUVELFNBQVMsZ0JBQVQsR0FBNEI7RUFDMUIsV0FBQSxDQUFZLE9BQVosQ0FBQSxDQUFBO0NBQ0Q7O0FBRUQsSUFBTSxRQUFBLEdBQVcsU0FBWCxRQUFXLEdBQUE7RUFBQSxPQUFNLFdBQUEsQ0FBWSxFQUFFLE9BQUEsRUFBUyxNQUFYLEVBQVosQ0FBTixDQUFBO0NBQWpCLENBQUE7O0FBRUEsSUFBTSxNQUFBLEdBQVMsU0FBVCxNQUFTLENBQUMsRUFBRCxFQUFRO0VBQ3JCLElBQU0sSUFBQSxHQUFPLFNBQVAsSUFBTyxDQUFDLEtBQUQsRUFBVztJQUN0QixJQUFJLEtBQUEsQ0FBTSxJQUFOLENBQVcsT0FBWCxLQUF1QixNQUEzQixFQUFtQzs7TUFFakMsRUFBQSxDQUFHLEtBQUgsQ0FBQSxDQUFBO0tBQ0Q7R0FKSCxDQUFBO0VBTUEsbUJBQUEsQ0FBb0IsSUFBcEIsQ0FBQSxDQUFBO0NBUEYsQ0FBQTs7QUFVQSxTQUFTLFlBQVQsQ0FBc0IsY0FBdEIsRUFBc0Msa0JBQXRDLEVBQTBEO0VBQ3hELElBQU0sSUFBQSxHQUFPLFFBQUEsQ0FBUyxvQkFBVCxDQUE4QixNQUE5QixDQUFBLENBQXNDLENBQXRDLENBQWIsQ0FBQTtFQUNBLFdBQUEsQ0FBWTtJQUNWLE9BQUEsRUFBUyxlQURDO0lBRVYsSUFBQSxFQUFNLGtCQUZJO0lBR1YsTUFBQSxFQUFRLGNBQUEsSUFBa0IsSUFBQSxDQUFLLFlBQUE7R0FIakMsQ0FBQSxDQUFBO0NBS0Q7O0FBRUQsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQztFQUNqQyxXQUFBLENBQVk7SUFDVixPQUFBLEVBQVMsVUFEQztJQUVWLE9BQUEsRUFBQSxPQUFBO0dBRkYsQ0FBQSxDQUFBO0NBSUQ7O0FBRUQsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLGdCQUFBLEVBQWlCLE1BQWpCLEVBQXlCLFNBQXpCLEVBQW9DLFVBQVUsS0FBVixFQUFpQjtFQUNuRCxJQUFJLE9BQU8sS0FBQSxDQUFNLElBQWIsS0FBc0IsUUFBMUIsRUFBb0M7SUFDbEMsT0FBQTtHQUNEOztFQUVELElBQUksQ0FBQSxHQUFBLEtBQUEsQ0FBSixDQUFBO0VBQ0EsSUFBSTtJQUNGLENBQUEsR0FBSSxFQUFFLElBQUEsRUFBTSxJQUFBLENBQUssS0FBTCxDQUFXLEtBQUEsQ0FBTSxJQUFqQixDQUFSLEVBQUosQ0FERTtHQUFKLENBRUUsT0FBTyxDQUFQLEVBQVU7SUFDVixPQURVO0dBRVg7O0VBRUQsSUFBSSxDQUFBLENBQUUsSUFBRixDQUFPLE9BQVAsS0FBbUIsT0FBdkIsRUFBZ0M7SUFDOUIsRUFBQSxHQUFLLENBQUEsQ0FBRSxJQUFGLENBQU8sUUFBWixDQUFBO0lBQ0EsU0FBQSxFQUFBLENBQUE7R0FGRixNQUdPO0lBQ0wsS0FBSyxJQUFJLENBQUEsR0FBSSxDQUFiLEVBQWdCLENBQUEsR0FBSSxpQkFBQSxDQUFrQixNQUF0QyxFQUE4QyxDQUFBLEVBQTlDLEVBQW1EO01BQ2pELElBQU0sUUFBQSxHQUFXLGlCQUFBLENBQWtCLENBQWxCLENBQWpCLENBQUE7O01BRUEsUUFBQSxDQUFTLENBQVQsQ0FBQSxDQUFBO0tBQ0Q7R0FDRjtDQXJCSCxDQUFBLENBQUE7O2dEQXlCRTt1REFDQTt1REFDQTt3REFDQTtxREFDQTtxREFDQTtzREFDQTtxREFDQTtxREFDQTtzREFDQTtrREFDQTtxREFDQTt3REFDQTtRQUN1QixjQUF2QjtRQUNBLGtCQUFBO1FBQ0EscUJBQUE7NERBQ0E7Z0VBQ0E7UUFDWSxPQUFaO1FBQ0EsU0FBQTs0REFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcFBGLElBQU0sTUFBQSxHQUFTLFNBQVQsTUFBUyxDQUFDLENBQUQsRUFBQTtFQUFBLE9BQU8sVUFBQyxJQUFELEVBQUE7SUFBQSxPQUFVLFVBQUMsRUFBRCxFQUFBO01BQUEsT0FBUSxFQUFBLENBQUcsTUFBSCxDQUFVLENBQVYsRUFBYSxJQUFiLENBQVIsQ0FBQTtLQUFWLENBQUE7R0FBUCxDQUFBO0NBQWYsQ0FBQTs7O0FBR0EsSUFBTSxNQUFBLEdBQVMsU0FBVCxNQUFTLENBQUMsQ0FBRCxFQUFBO0VBQUEsT0FBTyxVQUFDLEVBQUQsRUFBQTtJQUFBLE9BQVEsRUFBQSxDQUFHLE1BQUgsQ0FBVSxDQUFWLENBQVIsQ0FBQTtHQUFQLENBQUE7Q0FBZixDQUFBOzs7QUFHQSxJQUFNLEdBQUEsR0FBTSxTQUFOLEdBQU0sQ0FBQyxDQUFELEVBQUE7RUFBQSxPQUFPLFVBQUMsRUFBRCxFQUFBO0lBQUEsT0FBUSxFQUFBLENBQUcsR0FBSCxDQUFPLENBQVAsQ0FBUixDQUFBO0dBQVAsQ0FBQTtDQUFaLENBQUE7Ozs7QUFJQSxJQUFNLFNBQUEsR0FBWSxTQUFaLFNBQVksQ0FBQyxDQUFELEVBQUksR0FBSixFQUFBO0VBQUEsT0FBWSxNQUFBLENBQU8sSUFBUCxDQUFZLEdBQVosQ0FBQSxDQUFpQixNQUFqQixDQUF3QixVQUFDLEdBQUQsRUFBTSxDQUFOLEVBQUE7SUFBQSxPQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQWtCLEdBQWxCLEVBQUEsZUFBQSxDQUFBLEVBQUEsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBQSxDQUFFLEdBQUEsQ0FBSSxDQUFKLENBQUYsQ0FBNUIsQ0FBQSxDQUFBLENBQUE7R0FBeEIsRUFBa0UsRUFBbEUsQ0FBWixDQUFBO0NBQWxCLENBQUE7Ozs7O0FBS0EsSUFBTSxnQkFBQSxHQUFtQixTQUFuQixnQkFBbUIsQ0FBQyxHQUFELEVBQVM7RUFDaEMsSUFBTSxJQUFBLEdBQU8sTUFBQSxDQUFPLElBQVAsQ0FBWSxHQUFaLENBQWIsQ0FBQTtFQUNBLElBQU0sTUFBQSxHQUFTLElBQUEsQ0FBSyxHQUFMLENBQVMsVUFBQyxDQUFELEVBQUE7SUFBQSxPQUFPLEdBQUEsQ0FBSSxDQUFKLENBQVAsQ0FBQTtHQUFULENBQWYsQ0FBQTs7RUFFQSxPQUFPLE9BQUEsQ0FBUSxHQUFSLENBQVksTUFBWixDQUFBLENBQW9CLElBQXBCLENBQXlCLFVBQUMsUUFBRCxFQUFBO0lBQUEsT0FDOUIsUUFBQSxDQUFTLE1BQVQsQ0FBZ0IsVUFBQyxHQUFELEVBQU0sT0FBTixFQUFlLEdBQWYsRUFBQTtNQUFBLE9BQUEsUUFBQSxDQUFBLEVBQUEsRUFBNkIsR0FBN0IsRUFBQSxlQUFBLENBQUEsRUFBQSxFQUFtQyxJQUFBLENBQUssR0FBTCxDQUFuQyxFQUErQyxPQUEvQyxDQUFBLENBQUEsQ0FBQTtLQUFoQixFQUEyRSxFQUEzRSxDQUQ4QixDQUFBO0dBQXpCLENBQVAsQ0FBQTtDQUpGLENBQUE7Ozs7Ozs7QUFjQSxJQUFNLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxLQUFELEVBQUE7RUFBQSxPQUFXLEtBQUEsQ0FBTSxNQUFOLENBQWEsVUFBQyxHQUFELEVBQUEsSUFBQSxFQUFBO0lBQUEsSUFBQSxLQUFBLEdBQUEsY0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBLENBQUE7UUFBTyxDQUFQLEdBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtRQUFVLENBQVYsR0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7O0lBQUEsT0FBQSxRQUFBLENBQUEsRUFBQSxFQUF1QixHQUF2QixFQUFBLGVBQUEsQ0FBQSxFQUFBLEVBQTZCLENBQTdCLEVBQWlDLENBQWpDLENBQUEsQ0FBQSxDQUFBO0dBQWIsRUFBb0QsRUFBcEQsQ0FBWCxDQUFBO0NBQXRCLENBQUE7O0FBRUEsSUFBTSxTQUFBLEdBQVksU0FBWixTQUFZLENBQUMsS0FBRCxFQUFBO0VBQUEsT0FBVyxPQUFPLEtBQVAsS0FBaUIsV0FBakIsSUFBZ0MsS0FBQSxLQUFVLElBQXJELENBQUE7Q0FBbEIsQ0FBQTs7QUFFQSxJQUFNLGdCQUFBLEdBQW1CLFNBQW5CLGdCQUFtQixDQUFDLEtBQUQsRUFBQTtFQUFBLE9BQVcsU0FBQSxDQUFVLEtBQVYsQ0FBQSxJQUFvQixLQUFBLEtBQVUsS0FBekMsQ0FBQTtDQUF6QixDQUFBOzs7QUFHQSxJQUFNLG1CQUFBLEdBQXNCLFNBQXRCLG1CQUFzQixDQUFDLEdBQUQsRUFBUztFQUNuQyxPQUFPLE1BQUEsQ0FBTyxJQUFQLENBQVksR0FBWixDQUFBLENBQWlCLE1BQWpCLENBQ0wsVUFBQyxNQUFELEVBQVMsR0FBVCxFQUFBO0lBQUEsT0FBQSxRQUFBLENBQUEsRUFBQSxFQUNLLE1BREwsRUFFTSxTQUFBLENBQVUsR0FBQSxDQUFJLEdBQUosQ0FBVixDQUFBLEdBQXNCLEVBQXRCLEdBQUEsZUFBQSxDQUFBLEVBQUEsRUFBOEIsR0FBOUIsRUFBb0MsR0FBQSxDQUFJLEdBQUosQ0FBcEMsQ0FGTixDQUFBLENBQUE7R0FESyxFQUtMLEVBTEssQ0FBUCxDQUFBO0NBREYsQ0FBQTs7Ozs7Ozs7OztBQWtCQSxJQUFNLEtBQUEsR0FBUSxTQUFSLEtBQVEsQ0FBQyxTQUFELEVBQUE7RUFBQSxPQUNaLE1BQUEsQ0FBTyxVQUFDLE1BQUQsRUFBUyxHQUFULEVBQWMsR0FBZCxFQUFzQjtJQUMzQixJQUFNLFNBQUEsR0FBWSxNQUFBLENBQU8sTUFBQSxDQUFPLE1BQVAsR0FBZ0IsQ0FBdkIsQ0FBbEIsQ0FBQTtJQUNBLElBQU0sVUFBQSxHQUFhLEdBQUEsR0FBTSxTQUFOLEtBQW9CLENBQXZDLENBQUE7SUFDQSxJQUFNLFFBQUEsR0FBVyxVQUFBLEdBQWEsQ0FBQyxHQUFELENBQWIsR0FBQSxFQUFBLENBQUEsTUFBQSxDQUFBLGtCQUFBLENBQXlCLFNBQXpCLENBQUEsRUFBQSxDQUFvQyxHQUFwQyxDQUFBLENBQWpCLENBQUE7SUFDQSxPQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsa0JBQUEsQ0FBVyxNQUFBLENBQU8sS0FBUCxDQUFhLENBQWIsRUFBZ0IsTUFBQSxDQUFPLE1BQVAsSUFBaUIsVUFBQSxHQUFhLENBQWIsR0FBaUIsQ0FBbEMsQ0FBaEIsQ0FBWCxDQUFBLEVBQUEsQ0FBa0UsUUFBbEUsQ0FBQSxDQUFBLENBQUE7R0FKRixDQUFBLENBS0csRUFMSCxDQURZLENBQUE7Q0FBZCxDQUFBOzs7Ozs7Ozs7Ozs7QUFrQkEsSUFBTSxjQUFBLEdBQWlCLFNBQWpCLGNBQWlCLENBQUMsU0FBRCxFQUFBO0VBQUEsT0FDckIsTUFBQSxDQUFPLFVBQUMsTUFBRCxFQUFTLEdBQVQsRUFBYyxHQUFkLEVBQXNCO0lBQzNCLElBQU0sUUFBQSxHQUFXLEdBQUEsR0FBTSxTQUF2QixDQUFBO0lBQ0EsSUFBTSxRQUFBLEdBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxrQkFBQSxDQUFnQixNQUFBLENBQU8sUUFBUCxDQUFBLElBQW9CLEVBQXBDLENBQUEsRUFBQSxDQUF5QyxHQUF6QyxDQUFBLENBQU4sQ0FBQTtJQUNBLE9BQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxrQkFBQSxDQUFXLE1BQUEsQ0FBTyxLQUFQLENBQWEsQ0FBYixFQUFnQixRQUFoQixDQUFYLENBQUEsRUFBQSxDQUFzQyxRQUF0QyxDQUFBLEVBQUEsa0JBQUEsQ0FBbUQsTUFBQSxDQUFPLEtBQVAsQ0FBYSxRQUFBLEdBQVcsQ0FBeEIsQ0FBbkQsQ0FBQSxDQUFBLENBQUE7R0FIRixDQUFBLENBSUcsRUFKSCxDQURxQixDQUFBO0NBQXZCLENBQUE7Ozs7Ozs7Ozs7QUFlQSxJQUFNLE9BQUEsR0FDSixTQURJLE9BQ0osR0FBQTtFQUFBLEtBQUEsSUFBQSxJQUFBLEdBQUEsU0FBQSxDQUFBLE1BQUEsRUFBSSxFQUFKLEdBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxHQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQTtJQUFJLEVBQUosQ0FBQSxJQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7R0FBQTs7RUFBQSxPQUNBLFVBQUMsQ0FBRCxFQUFBO0lBQUEsT0FDRSxFQUFBLENBQUcsV0FBSCxDQUFlLFVBQUMsR0FBRCxFQUFNLENBQU4sRUFBQTtNQUFBLE9BQVksQ0FBQSxDQUFFLEdBQUYsQ0FBWixDQUFBO0tBQWYsRUFBbUMsQ0FBbkMsQ0FERixDQUFBO0dBREEsQ0FBQTtDQURGLENBQUE7Ozs7QUFPQSxJQUFNLFNBQUEsR0FDSixTQURJLFNBQ0osR0FBQTtFQUFBLEtBQUEsSUFBQSxLQUFBLEdBQUEsU0FBQSxDQUFBLE1BQUEsRUFBSSxFQUFKLEdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBLEtBQUEsR0FBQSxDQUFBLEVBQUEsS0FBQSxHQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQTtJQUFJLEVBQUosQ0FBQSxLQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsS0FBQSxDQUFBLENBQUE7R0FBQTs7RUFBQSxPQUNBLFVBQUMsQ0FBRCxFQUFBO0lBQUEsT0FDRSxFQUFBLENBQUcsTUFBSCxDQUFVLFVBQUMsR0FBRCxFQUFNLENBQU4sRUFBQTtNQUFBLE9BQWEsU0FBQSxDQUFVLEdBQVYsQ0FBQSxHQUFpQixHQUFqQixHQUF1QixDQUFBLENBQUUsR0FBRixDQUFwQyxDQUFBO0tBQVYsRUFBdUQsQ0FBdkQsQ0FERixDQUFBO0dBREEsQ0FBQTtDQURGLENBQUE7OztBQU1BLElBQU0sS0FBQSxHQUFRLFNBQVIsS0FBUSxDQUFBLEtBQUEsRUFBQTtFQUFBLElBQUEsS0FBQSxHQUFBLGNBQUEsQ0FBQSxLQUFBLEVBQUEsQ0FBQSxDQUFBO01BQUUsQ0FBRixHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTs7RUFBQSxPQUFTLENBQVQsQ0FBQTtDQUFkLENBQUE7OztBQUdBLElBQU0sSUFBQSxHQUFPLFNBQVAsSUFBTyxDQUFDLENBQUQsRUFBQTtFQUFBLE9BQU8sU0FBQSxDQUFVLE1BQUEsQ0FBTyxDQUFQLENBQVYsRUFBcUIsS0FBckIsQ0FBUCxDQUFBO0NBQWIsQ0FBQTs7O0FBR0EsSUFBTSxJQUFBLEdBQ0osU0FESSxJQUNKLENBQUMsQ0FBRCxFQUFBO0VBQUEsT0FDQSxZQUFBO0lBQUEsSUFBQyxHQUFELEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQU8sRUFBUCxDQUFBO0lBQUEsT0FDRSxHQUFBLENBQUksQ0FBSixDQURGLENBQUE7R0FEQSxDQUFBO0NBREYsQ0FBQTs7O0FBTUEsSUFBTSxTQUFBLEdBQ0osU0FESSxTQUNKLENBQUMsQ0FBRCxFQUFBO0VBQUEsT0FDQSxZQUFBO0lBQUEsSUFBQyxHQUFELEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQU8sRUFBUCxDQUFBO0lBQUEsT0FDRSxHQUFBLENBQUksQ0FBSixDQUFBLElBQVUsR0FEWixDQUFBO0dBREEsQ0FBQTtDQURGLENBQUE7Ozs7O0FBUUEsSUFBTSxLQUFBLEdBQVEsU0FBUixLQUFRLENBQUMsQ0FBRCxFQUFBO0VBQUEsT0FBTyxVQUFDLENBQUQsRUFBQTtJQUFBLE9BQU8sZ0JBQUEsQ0FBaUIsQ0FBakIsQ0FBQSxHQUFzQixJQUF0QixHQUE2QixDQUFwQyxDQUFBO0dBQVAsQ0FBQTtDQUFkLENBQUE7O2lEQUdFOzBEQUNBO1FBQ0EsVUFBQTtrREFDQTtRQUNBLE9BQUE7aURBQ0E7UUFDQSxRQUFBO1FBQ0EsTUFBQTtRQUNBLFlBQUE7UUFDQSxnQkFBQTtRQUNBLFlBQUE7UUFDQSxtQkFBQTtRQUNBLE9BQUE7UUFDQSxZQUFBO1FBQ0Esc0JBQUE7Ozs7Ozs7Ozs7QUMxSUYsSUFBQSxJQUFBLEdBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsV0FBQSxHQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBQUE7O0FBRUEsSUFBTSxhQUFBLEdBQWdCLFNBQWhCLGFBQWdCLEdBQTZDO0VBQUEsSUFBNUMsZ0JBQTRDLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQXpCLG9CQUF5QixDQUFBOztFQUNqRSxJQUFNLFNBQUEsR0FBWSxRQUFBLENBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBbEIsQ0FBQTs7RUFFQSxDQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsZ0JBQUEsRUFBaUIsQ0FDZjtJQUNFLE9BQUEsRUFBUyxTQURYO0lBRUUsTUFBQSxFQUFRLENBQUEsQ0FBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBLEVBQ047TUFDRSxJQUFBLEVBQU0sd0RBRFI7TUFFRSxNQUFBLEVBQVEsUUFGVjtNQUdFLEdBQUEsRUFBSyxxQkFBQTtLQUpELEVBTU4sQ0FBQSxDQUFBLEVBQUEsV0FBQSxDQUFBLG1CQUFBLEVBQW9CLE1BQXBCLEVBQTRCLGVBQTVCLENBTk0sQ0FBQTtHQUhLLENBQWpCLENBQUEsQ0FBQTtDQUhGLENBQUE7O0FBa0JBLElBQU0sbUJBQUEsR0FBc0IsU0FBdEIsbUJBQXNCLEdBQTZDO0VBQUEsSUFBNUMsZ0JBQTRDLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQXpCLG9CQUF5QixDQUFBOztFQUN2RSxJQUFNLFNBQUEsR0FBWSxRQUFBLENBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBbEIsQ0FBQTtFQUNBLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxhQUFBLEVBQWMsU0FBZCxDQUFBLENBQUE7Q0FGRixDQUFBOztRQUtTLGdCQUFBO1FBQWUsc0JBQUE7Ozs7Ozs7Ozs7QUMzQnhCLElBQUEsSUFBQSxHQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxXQUFBLEdBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBOztBQUVBLElBQU0sc0JBQUEsR0FBeUIsa0JBQS9CLENBQUE7O0FBRUEsSUFBTSxTQUFBLEdBQVksU0FBWixTQUFZLENBQUMsYUFBRCxFQUFtQjtFQUNuQyxJQUFNLE1BQUEsR0FBUyxRQUFBLENBQVMsY0FBVCxDQUF3QixhQUF4QixDQUFmLENBQUE7O0VBRUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLGdCQUFBLEVBQWlCLENBQ2Y7SUFDRSxPQUFBLEVBQVMsTUFEWDtJQUVFLE1BQUEsRUFBUSxDQUFBLENBQUEsRUFBQSxXQUFBLENBQUEsbUJBQUEsRUFBb0IsTUFBcEIsQ0FBQTtHQUhLLENBQWpCLENBQUEsQ0FBQTtDQUhGLENBQUE7O0FBV0EsSUFBTSxZQUFBLEdBQWUsU0FBZixZQUFlLENBQUMsYUFBRCxFQUFtQjtFQUN0QyxJQUFNLE1BQUEsR0FBUyxRQUFBLENBQVMsY0FBVCxDQUF3QixhQUF4QixDQUFmLENBQUE7RUFDQSxJQUFNLGlCQUFBLEdBQXVCLGFBQXZCLEdBQUEsVUFBTixDQUFBO0VBQ0EsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFFBQUEsRUFBUyxNQUFULEVBQWlCLGlCQUFqQixDQUFBLENBQUE7OztFQUdBLElBQUksTUFBSixFQUFZO0lBQ1YsTUFBQSxDQUFPLGdCQUFQLENBQXdCLGNBQXhCLEVBQXdDLFlBQUE7TUFBQSxPQUFNLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxhQUFBLEVBQWMsTUFBZCxDQUFOLENBQUE7S0FBeEMsQ0FBQSxDQUFBO0lBQ0EsTUFBQSxDQUFPLGdCQUFQLENBQXdCLG9CQUF4QixFQUE4QyxZQUFBO01BQUEsT0FBTSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsYUFBQSxFQUFjLE1BQWQsQ0FBTixDQUFBO0tBQTlDLENBQUEsQ0FBQTtJQUNBLE1BQUEsQ0FBTyxnQkFBUCxDQUF3QixlQUF4QixFQUF5QyxZQUFBO01BQUEsT0FBTSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsYUFBQSxFQUFjLE1BQWQsQ0FBTixDQUFBO0tBQXpDLENBQUEsQ0FBQTtHQUNEO0NBVkgsQ0FBQTs7Ozs7QUFnQkEsSUFBTSxVQUFBLEdBQWEsU0FBYixVQUFhLENBQUMsT0FBRCxFQUE0RTtFQUFBLElBQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFQLEVBQU87TUFBQSxrQkFBQSxHQUFBLElBQUEsQ0FBaEUsYUFBZ0U7TUFBaEUsYUFBZ0UsR0FBQSxrQkFBQSxLQUFBLFNBQUEsR0FBaEQsc0JBQWdELEdBQUEsa0JBQUE7TUFBQSxVQUFBLEdBQUEsSUFBQSxDQUF4QixLQUF3QjtNQUF4QixLQUF3QixHQUFBLFVBQUEsS0FBQSxTQUFBLEdBQWhCLElBQWdCLEdBQUEsVUFBQSxDQUFBOztFQUM3RixJQUFNLGVBQUEsR0FBa0IsVUFBQSxDQUFXLFlBQUE7SUFBQSxPQUFNLFNBQUEsQ0FBVSxhQUFWLENBQU4sQ0FBQTtHQUFYLEVBQTJDLEtBQTNDLENBQXhCLENBQUE7RUFDQSxPQUFPLE9BQUEsQ0FBUSxPQUFSLENBQWdCLFlBQU07SUFDM0IsWUFBQSxDQUFhLGVBQWIsQ0FBQSxDQUFBO0lBQ0EsWUFBQSxDQUFhLGFBQWIsQ0FBQSxDQUFBO0dBRkssQ0FBUCxDQUFBO0NBRkYsQ0FBQTs7UUFRUyxhQUFBOzs7Ozs7Ozs7Ozs7QUN6Q1QsSUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLGNBQUEsR0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7OztBQVFBLElBQU0sZ0JBQUEsR0FBbUIsU0FBbkIsZ0JBQW1CLENBQUMsVUFBRCxFQUFBO0VBQUEsT0FBZ0IsVUFDdkMsV0FEdUMsRUFFdkMsaUJBRnVDLEVBS3BDO0lBQUEsSUFGSCxXQUVHLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRlcsS0FFWCxDQUFBO0lBQUEsSUFESCxzQkFDRyxHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQURzQixLQUN0QixDQUFBOzs7SUFFSCxJQUFNLGdCQUFBLEdBQW1CLFNBQW5CLGdCQUFtQixDQUFBLElBQUEsRUFBbUM7TUFBQSxJQUFoQyxRQUFnQyxHQUFBLElBQUEsQ0FBaEMsUUFBZ0M7VUFBdEIsTUFBc0IsR0FBQSxJQUFBLENBQXRCLE1BQXNCO1VBQVgsSUFBVyxHQUFBLHdCQUFBLENBQUEsSUFBQSxFQUFBLENBQUEsVUFBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBLENBQUE7O01BQzFELElBQU0sT0FBQSxHQUFVLElBQUksZUFBQSxDQUFBLE9BQUosQ0FBQSxRQUFBLENBQUE7UUFDZCxRQUFBLEVBQUEsUUFEYztRQUVkLHNCQUFBLEVBQUEsc0JBRmM7UUFHZCxjQUFBLEVBQWdCLFFBQUEsQ0FBUyxXQUFBLENBQVksY0FBckIsQ0FIRjtRQUlkLE1BQUEsRUFBQSxNQUFBO09BSmMsRUFLWCxJQUxXLENBQUEsQ0FBaEIsQ0FBQTtNQU9BLE9BQU8sT0FBQSxDQUFRLGNBQVIsQ0FBdUIsaUJBQXZCLENBQUEsRUFBUCxDQUFBO0tBUkYsQ0FBQTs7SUFXQSxJQUFNLFNBQUEsR0FBWSxXQUFBLENBQVksY0FBWixHQUE2QixDQUE3QixHQUFpQyxnQkFBakMsR0FBb0QsaUJBQXRFLENBQUE7SUFDQSxDQUFBLENBQUEsRUFBQSxVQUFBLENBQUEsU0FBQSxFQUFBLGlCQUFBLEdBQTRCLFVBQTVCLENBQUEsQ0FBMEMsV0FBMUMsRUFBdUQsU0FBdkQsRUFBa0UsV0FBbEUsRUFBK0UsVUFBQSxDQUFBLGlCQUEvRSxDQUFBLENBQUE7R0FuQnVCLENBQUE7Q0FBekIsQ0FBQTs7Ozs7QUF5QkEsSUFBTSxrQkFBQSxHQUFxQixTQUFyQixrQkFBcUIsQ0FDekIsZUFEeUIsRUFFekIsTUFGeUIsRUFHekIsUUFIeUIsRUFJdEI7RUFDSCxDQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsT0FBQSxFQUFBLG1CQUFBLEdBQTRCLGVBQTVCLEVBQStDLEVBQUUsTUFBQSxFQUFBLE1BQUYsRUFBL0MsQ0FBQSxDQUEyRCxJQUEzRCxDQUFnRSxRQUFoRSxDQUFBLENBQUE7Q0FMRixDQUFBOzs0REFTRTs4REFDQTs7Ozs7Ozs7Ozs7OztBQzdDRjs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxtQkFBbUIsc0JBQXpCOztBQUVBOzs7Ozs7Ozs7O0lBU00sYTtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLCtCQUErRTtBQUFBLFFBQWpFLGNBQWlFLFFBQWpFLGNBQWlFO0FBQUEsUUFBakQsc0JBQWlELFFBQWpELHNCQUFpRDtBQUFBLFFBQXpCLFFBQXlCLFFBQXpCLFFBQXlCO0FBQUEsUUFBWixRQUFZOztBQUFBOztBQUM3RTtBQUNBLFFBQU0sMkJBQTJCLDRCQUFpQixVQUFDLFdBQUQ7QUFBQSxhQUNoRCxtQkFBVSxjQUFLLFdBQUwsQ0FBVixFQUE2QixjQUFLLE9BQUwsQ0FBN0IsRUFBNEMsY0FBSyxVQUFMLENBQTVDLENBRGdEO0FBQUEsS0FBakIsQ0FBakM7O0FBSUEsU0FBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsU0FBSyxzQkFBTCxHQUE4QixzQkFBOUI7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxTQUFLLFFBQUwsR0FBZ0IseUJBQXlCLFFBQXpCLEVBQW1DLHNCQUFuQyxDQUFoQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjs7QUFFQSxTQUFLLE9BQUwsR0FBZSxLQUFLLHNCQUFMLENBQTRCLFFBQTVCLEVBQXNDLFVBQXRDLEVBQWY7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7bUNBVWUsUSxFQUFVO0FBQUE7O0FBQ3ZCLGFBQU87QUFBQSxlQUNMLE1BQUssY0FBTCxHQUNHLElBREgsQ0FDUSxVQUFDLE9BQUQ7QUFBQSxpQkFDSixzQkFDSyxNQUFLLFFBRFY7QUFFRSxzQkFBVSxNQUFLLFFBRmpCO0FBR0UsNEJBSEY7QUFJRSw0QkFBZ0IsTUFBSyxjQUp2QjtBQUtFLDZCQUFpQixNQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekI7QUFMbkIsYUFESTtBQUFBLFNBRFIsRUFVRyxLQVZILENBVVMsVUFBQyxHQUFELEVBQVM7QUFDZCxjQUFJLFFBQVEsZ0JBQVosRUFBOEI7QUFDNUIsbUJBQU8sc0JBQ0YsTUFBSyxRQURIO0FBRUwsd0JBQVUsTUFBSyxRQUZWO0FBR0wsdUJBQVMsRUFISjtBQUlMLDhCQUFnQixLQUpYO0FBS0wsK0JBQWlCLE1BQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixLQUF6QjtBQUxaLGVBQVA7QUFPRCxXQVJELE1BUU87QUFDTDtBQUNBLGtCQUFNLEdBQU47QUFDRDtBQUNGLFNBdkJILENBREs7QUFBQSxPQUFQO0FBeUJEOztBQUVEOzs7Ozs7Ozs7O3FDQU9pQjtBQUFBOztBQUNmLFVBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsUUFBRCxFQUFjO0FBQUE7O0FBQ3BDLFlBQU0sb0JBQW9CLE9BQUssc0JBQUwsQ0FBNEIsUUFBNUIsQ0FBMUI7QUFDQSxlQUFLLFFBQUwsR0FBZ0Isa0JBQWtCLGdCQUFsQixFQUFoQjtBQUNBLDJCQUFLLE9BQUwsRUFBYSxJQUFiLG9DQUFxQixrQkFBa0IsVUFBbEIsRUFBckI7QUFDQSxlQUFPLE9BQUssWUFBTCxFQUFQO0FBQ0QsT0FMRDs7QUFPQSxVQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsS0FBd0IsQ0FBNUIsRUFBK0I7QUFDN0I7QUFDQSxlQUFPLFFBQVEsTUFBUixDQUFlLGdCQUFmLENBQVA7QUFDRDtBQUNELGFBQU8sS0FBSyxjQUFMLElBQXVCLEtBQUssT0FBTCxDQUFhLE1BQXBDLEdBQ0gsS0FBSyxhQUFMLEdBQXFCLElBQXJCLENBQTBCLGVBQTFCLENBREcsR0FFSDtBQUNBLGNBQVEsT0FBUixDQUFnQixLQUFLLFlBQUwsRUFBaEIsQ0FISjtBQUlEOztBQUVEOzs7Ozs7Ozs7OztBQVVBOztBQUVBOzs7O21DQUllO0FBQ2IsYUFBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLENBQXBCLEVBQXVCLEtBQUssY0FBNUIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7b0NBR2dCO0FBQ2QsYUFBTywwQkFBaUIsbUJBQVUsYUFBVixFQUFtQixLQUFLLFFBQXhCLENBQWpCLENBQVA7QUFDRDs7QUFFRDs7Ozs7OzJDQUd1QixRLEVBQVU7QUFDL0IsYUFBTyxJQUFJLDJCQUFKLENBQXNCLFFBQXRCLEVBQWdDO0FBQ3JDLGdDQUF3QixLQUFLLHNCQURRO0FBRXJDLHFCQUFhLEtBQUssUUFBTCxDQUFjLGNBQWQsQ0FBNkI7QUFGTCxPQUFoQyxDQUFQO0FBSUQ7Ozt3QkE3Qm9CO0FBQ25CLGFBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixDQUE3QjtBQUNEOzs7Ozs7a0JBOEJZLGE7Ozs7Ozs7Ozs7QUNySmYsSUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7O0FBVUEsSUFBTSxnQkFBQSxHQUFtQixTQUFuQixnQkFBbUIsQ0FBQyxNQUFELEVBQUE7RUFBQSxPQUFZLFVBQUMsUUFBRCxFQUE4QztJQUFBLElBQW5DLHNCQUFtQyxHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFWLEtBQVUsQ0FBQTs7SUFDakYsSUFBTSxjQUFBLEdBQWlCLE1BQUEsQ0FBTyxnQkFBUCxDQUFBLENBQXlCLFFBQXpCLENBQXZCLENBQUE7SUFDQSxJQUFNLHNCQUFBLEdBQXlCLENBQUEsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxTQUFBLEVBQzdCLENBQUEsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxLQUFBLEVBQU0sc0JBQU4sQ0FENkIsRUFFN0IsTUFBQSxDQUFPLHdCQUFQLENBRjZCLENBQUEsQ0FHN0IsUUFINkIsQ0FBL0IsQ0FBQTtJQUlBLE9BQU8sQ0FBQSxDQUFBLEVBQUEsR0FBQSxDQUFBLG1CQUFBLEVBQW9CO01BQ3pCLGNBQUEsRUFBQSxjQUR5QjtNQUV6QixzQkFBQSxFQUFBLHNCQUFBO0tBRkssQ0FBUCxDQUFBO0dBTnVCLENBQUE7Q0FBekIsQ0FBQTs7UUFZUyxtQkFBQTs7Ozs7Ozs7Ozs7OztBQ3RCVDs7QUFDQTs7Ozs7O0FBRUE7Ozs7SUFJTSx1QjtBQUNKOzs7Ozs7QUFNQSxtQ0FBWSxRQUFaLFFBQStEO0FBQUEsUUFBdkMsc0JBQXVDLFFBQXZDLHNCQUF1QztBQUFBLFFBQWYsV0FBZSxRQUFmLFdBQWU7O0FBQUE7O0FBQzdELFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFNBQUssc0JBQUwsR0FBOEIsc0JBQTlCO0FBQ0EsU0FBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7aUNBTWE7QUFBQTs7QUFBQSxzQkFDd0MsS0FBSyxRQUQ3QztBQUFBLFVBQ0gsY0FERyxhQUNILGNBREc7QUFBQSxVQUNhLHNCQURiLGFBQ2Esc0JBRGI7O0FBRVgsVUFBTSx1QkFBdUIsU0FBdkIsb0JBQXVCO0FBQUEsWUFBYyxFQUFkLFNBQUcsU0FBSDtBQUFBLFlBQWlDLEVBQWpDLFNBQXNCLFNBQXRCO0FBQUEsZUFDM0IsSUFBSSxJQUFKLENBQVMsRUFBVCxJQUFlLElBQUksSUFBSixDQUFTLEVBQVQsQ0FEWTtBQUFBLE9BQTdCO0FBRUEsVUFBTSxxQkFDSixtQkFBVSxtQkFBVSxnQkFBVixDQUFWLEVBQXVDLG1CQUFVLFNBQVYsQ0FBdkMsRUFBNkQsY0FBN0QsS0FBZ0YsRUFEbEY7O0FBR0EsVUFBTSxzQkFDSixtQkFDRSxlQUFNLEtBQUssc0JBQVgsQ0FERixFQUVFLG1CQUFVLHdCQUFWLENBRkYsRUFHRSxtQkFBVSxnQkFBVixDQUhGLEVBSUUsYUFBSSxVQUFDLE1BQUQ7QUFBQSw0QkFDQyxNQUREO0FBRUYsc0JBQVksT0FBTyxJQUFQLEtBQWdCLFVBQWhCLEdBQ1IsT0FBTyxNQUFQLEdBQ0UsT0FBTyxNQUFQLENBQWMsSUFEaEIsR0FFRSxNQUFLLFdBSEMsR0FJUixNQUFLO0FBTlA7QUFBQSxPQUFKLENBSkYsRUFZRSxzQkFaRixLQVk2QixFQWIvQjs7QUFlQSxhQUFPLDZCQUFJLGtCQUFKLHNCQUEyQixtQkFBM0IsR0FBZ0QsSUFBaEQsQ0FBcUQsb0JBQXJELENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozt1Q0FJbUI7QUFDakI7QUFDQSxVQUFNLGdDQUFnQyw0QkFBaUIsVUFBQyxXQUFEO0FBQUEsZUFDckQsbUJBQ0UsY0FBSyxXQUFMLENBREYsRUFFRSxjQUFLLE9BQUwsQ0FGRixFQUdFLGNBQUssVUFBQyxJQUFEO0FBQUEsaUJBQVUsS0FBSyxHQUFMLEtBQWEsV0FBdkI7QUFBQSxTQUFMLENBSEYsRUFJRSxjQUFLLE1BQUwsQ0FKRixDQURxRDtBQUFBLE9BQWpCLENBQXRDOztBQVNBLFVBQU0sZ0NBQWdDLDRCQUFpQixVQUFDLFdBQUQ7QUFBQSxlQUNyRCxtQkFBVSxjQUFLLFdBQUwsQ0FBVixFQUE2QixjQUFLLFdBQUwsQ0FBN0IsRUFBZ0QsY0FBSyxPQUFMLENBQWhELEVBQStELGNBQUssVUFBTCxDQUEvRCxDQURxRDtBQUFBLE9BQWpCLENBQXRDOztBQUlBLFVBQU0sV0FBVyw4QkFBOEIsS0FBSyxRQUFuQyxFQUE2QyxLQUFLLHNCQUFsRCxDQUFqQjtBQUNBLFVBQU0sV0FBVyw4QkFBOEIsS0FBSyxRQUFuQyxFQUE2QyxLQUFLLHNCQUFsRCxDQUFqQjs7QUFFQSwwQkFBWSxRQUFaLEVBQXlCLFFBQXpCO0FBQ0Q7Ozs7OztrQkFHWSx1Qjs7Ozs7Ozs7Ozs7O0FDckVmLElBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTs7Ozs7Ozs7OztBQUVBLElBQU0sWUFBQSxHQUFlLHlFQUFyQixDQUFBOztBQUVBLElBQU0sT0FBQSxHQUFVLFNBQVYsT0FBVSxDQUFDLFVBQUQsRUFBYSxLQUFiLEVBQW1DO0VBQUEsSUFBZixLQUFlLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQVAsRUFBTyxDQUFBOztFQUNqRCxJQUFNLGNBQUEsR0FBaUIsTUFBQSxDQUFPLElBQVAsQ0FBWSxLQUFaLENBQUEsQ0FBbUIsTUFBbkIsQ0FBMEIsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0lBQzdELEdBQUEsQ0FBSSxHQUFKLENBQUEsR0FBVyxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsZ0JBQUEsRUFBaUIsS0FBQSxDQUFNLEdBQU4sQ0FBakIsQ0FBWCxDQUFBO0lBQ0EsSUFBSSxHQUFBLEtBQVEsT0FBWixFQUFxQjtNQUNuQixHQUFBLENBQUksR0FBSixDQUFBLEdBQVcsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLGFBQUEsRUFBYyxHQUFBLENBQUksR0FBSixDQUFkLENBQVgsQ0FBQTtLQUNEO0lBQ0QsT0FBTyxHQUFQLENBQUE7R0FMcUIsRUFNcEIsRUFOb0IsQ0FBdkIsQ0FBQTtFQU9BLE9BQUEsNEZBQUEsR0FDeUYsVUFBQSxDQUFXLE1BQVgsR0FDckYsVUFBQSxDQUFXLEtBRHlFLEdBRXBGLEdBSEosR0FBQSxjQUFBLEdBSU0sS0FBQSxDQUFNLFVBQU4sRUFBa0IsY0FBbEIsQ0FKTixHQUFBLGtCQUFBLENBQUE7Q0FSRixDQUFBOztBQWlCQSxJQUFNLHNCQUFBLEdBQXlCLE9BQS9CLENBQUE7QUFDQSxJQUFNLHNCQUFBLEdBQXlCLE9BQS9CLENBQUE7QUFDQSxJQUFNLHVCQUFBLEdBQTBCLFFBQWhDLENBQUE7O0FBRUEsSUFBTSxlQUFBLElBQUEsZ0JBQUEsR0FBQSxFQUFBLEVBQUEsZUFBQSxDQUFBLGdCQUFBLEVBQ0gsc0JBREcsRUFDc0I7RUFDeEIsVUFBQSxFQUFZLEVBQUUsS0FBQSxFQUFPLEVBQVQsRUFBYSxNQUFBLEVBQVEsRUFBckIsRUFEWTtFQUV4QixLQUFBLEVBQU8sQ0FDTCxFQUFFLEVBQUEsRUFBSSxFQUFOLEVBQVUsRUFBQSxFQUFJLEdBQWQsRUFBbUIsRUFBQSxFQUFJLENBQXZCLEVBQTBCLEVBQUEsRUFBSSxHQUE5QixFQURLLEVBRUwsRUFBRSxFQUFBLEVBQUksR0FBTixFQUFXLEVBQUEsRUFBSSxHQUFmLEVBQW9CLEVBQUEsRUFBSSxHQUF4QixFQUE2QixFQUFBLEVBQUksSUFBakMsRUFGSyxFQUdMLEVBQUUsRUFBQSxFQUFJLElBQU4sRUFBWSxFQUFBLEVBQUksQ0FBaEIsRUFBbUIsRUFBQSxFQUFJLElBQXZCLEVBQTZCLEVBQUEsRUFBSSxDQUFqQyxFQUhLLEVBSUwsRUFBRSxFQUFBLEVBQUksSUFBTixFQUFZLEVBQUEsRUFBSSxDQUFoQixFQUFtQixFQUFBLEVBQUksSUFBdkIsRUFBNkIsRUFBQSxFQUFJLENBQWpDLEVBSkssRUFLTCxFQUFFLEVBQUEsRUFBSSxJQUFOLEVBQVksRUFBQSxFQUFJLENBQWhCLEVBQW1CLEVBQUEsRUFBSSxJQUF2QixFQUE2QixFQUFBLEVBQUksQ0FBakMsRUFMSyxFQU1MLEVBQUUsRUFBQSxFQUFJLEVBQU4sRUFBVSxFQUFBLEVBQUksR0FBZCxFQUFtQixFQUFBLEVBQUksRUFBdkIsRUFBMkIsRUFBQSxFQUFJLElBQS9CLEVBTkssQ0FGaUI7RUFVeEIsS0FBQSxFQUFPLENBQ0w7SUFDRSxDQUFBLEVBQUcsR0FETDtJQUVFLENBQUEsRUFBRyxFQUZMO0lBR0UsQ0FBQSxFQUFHLEVBSEw7SUFJRSxDQUFBLEVBQ0UsbVJBQUE7R0FOQyxFQVFMO0lBQ0UsQ0FBQSxFQUFHLElBREw7SUFFRSxDQUFBLEVBQUcsRUFGTDtJQUdFLENBQUEsRUFBRyxFQUhMO0lBSUUsQ0FBQSxFQUNFLHFSQUFBO0dBYkMsRUFlTDtJQUNFLENBQUEsRUFBRyxJQURMO0lBRUUsQ0FBQSxFQUFHLEVBRkw7SUFHRSxDQUFBLEVBQUcsRUFITDtJQUlFLENBQUEsRUFDRSxxUkFBQTtHQXBCQyxFQXNCTDtJQUNFLENBQUEsRUFBRyxJQURMO0lBRUUsQ0FBQSxFQUFHLEVBRkw7SUFHRSxDQUFBLEVBQUcsRUFITDtJQUlFLENBQUEsRUFDRSxxUkFBQTtHQTNCQyxFQTZCTDtJQUNFLENBQUEsRUFBRyxJQURMO0lBRUUsQ0FBQSxFQUFHLEVBRkw7SUFHRSxDQUFBLEVBQUcsRUFITDtJQUlFLENBQUEsRUFDRSxxUkFBQTtHQWxDQyxDQUFBO0NBWEwsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxnQkFBQSxFQWlESCxzQkFqREcsRUFpRHNCO0VBQ3hCLFVBQUEsRUFBWSxFQUFFLEtBQUEsRUFBTyxFQUFULEVBQWEsTUFBQSxFQUFRLEVBQXJCLEVBRFk7RUFFeEIsS0FBQSxFQUFPLENBQ0wsRUFBRSxFQUFBLEVBQUksRUFBTixFQUFVLEVBQUEsRUFBSSxHQUFkLEVBQW1CLEVBQUEsRUFBSSxDQUF2QixFQUEwQixFQUFBLEVBQUksR0FBOUIsRUFESyxFQUVMLEVBQUUsRUFBQSxFQUFJLEdBQU4sRUFBVyxFQUFBLEVBQUksQ0FBZixFQUFrQixFQUFBLEVBQUksR0FBdEIsRUFBMkIsRUFBQSxFQUFJLEVBQS9CLEVBRkssRUFHTCxFQUFFLEVBQUEsRUFBSSxPQUFOLEVBQWUsRUFBQSxFQUFJLENBQW5CLEVBQXNCLEVBQUEsRUFBSSxPQUExQixFQUFtQyxFQUFBLEVBQUksRUFBdkMsRUFISyxFQUlMLEVBQUUsRUFBQSxFQUFJLElBQU4sRUFBWSxFQUFBLEVBQUksQ0FBaEIsRUFBbUIsRUFBQSxFQUFJLElBQXZCLEVBQTZCLEVBQUEsRUFBSSxFQUFqQyxFQUpLLEVBS0wsRUFBRSxFQUFBLEVBQUksT0FBTixFQUFlLEVBQUEsRUFBSSxDQUFuQixFQUFzQixFQUFBLEVBQUksT0FBMUIsRUFBbUMsRUFBQSxFQUFJLEVBQXZDLEVBTEssRUFNTCxFQUFFLEVBQUEsRUFBSSxFQUFOLEVBQVUsRUFBQSxFQUFJLENBQWQsRUFBaUIsRUFBQSxFQUFJLEVBQXJCLEVBQXlCLEVBQUEsRUFBSSxFQUE3QixFQU5LLENBRmlCO0VBVXhCLEtBQUEsRUFBTyxDQUNMO0lBQ0UsQ0FBQSxFQUFHLEdBREw7SUFFRSxDQUFBLEVBQUcsRUFGTDtJQUdFLENBQUEsRUFBRyxFQUhMO0lBSUUsQ0FBQSxFQUNFLG1SQUFBO0dBTkMsRUFRTDtJQUNFLENBQUEsRUFBRyxJQURMO0lBRUUsQ0FBQSxFQUFHLEVBRkw7SUFHRSxDQUFBLEVBQUcsRUFITDtJQUlFLENBQUEsRUFDRSxvUkFBQTtHQWJDLEVBZUw7SUFDRSxDQUFBLEVBQUcsSUFETDtJQUVFLENBQUEsRUFBRyxFQUZMO0lBR0UsQ0FBQSxFQUFHLEVBSEw7SUFJRSxDQUFBLEVBQ0Usb1JBQUE7R0FwQkMsRUFzQkw7SUFDRSxDQUFBLEVBQUcsSUFETDtJQUVFLENBQUEsRUFBRyxFQUZMO0lBR0UsQ0FBQSxFQUFHLEVBSEw7SUFJRSxDQUFBLEVBQ0Usb1JBQUE7R0EzQkMsRUE2Qkw7SUFDRSxDQUFBLEVBQUcsSUFETDtJQUVFLENBQUEsRUFBRyxFQUZMO0lBR0UsQ0FBQSxFQUFHLEVBSEw7SUFJRSxDQUFBLEVBQ0UscVJBQUE7R0FsQ0MsQ0FBQTtDQTNETCxDQUFBLEVBQUEsZUFBQSxDQUFBLGdCQUFBLEVBaUdILHVCQWpHRyxFQWlHdUI7RUFDekIsVUFBQSxFQUFZLEVBQUUsS0FBQSxFQUFPLEdBQVQsRUFBYyxNQUFBLEVBQVEsRUFBdEIsRUFEYTtFQUV6QixLQUFBLEVBQU8sQ0FDTCxFQUFFLEVBQUEsRUFBSSxHQUFOLEVBQVcsRUFBQSxFQUFJLEVBQWYsRUFBbUIsRUFBQSxFQUFJLENBQXZCLEVBQTBCLEVBQUEsRUFBSSxFQUE5QixFQURLLEVBRUwsRUFBRSxFQUFBLEVBQUksR0FBTixFQUFXLEVBQUEsRUFBSSxDQUFmLEVBQWtCLEVBQUEsRUFBSSxHQUF0QixFQUEyQixFQUFBLEVBQUksT0FBL0IsRUFGSyxFQUdMLEVBQUUsRUFBQSxFQUFJLElBQU4sRUFBWSxFQUFBLEVBQUksQ0FBaEIsRUFBbUIsRUFBQSxFQUFJLElBQXZCLEVBQTZCLEVBQUEsRUFBSSxFQUFqQyxFQUhLLEVBSUwsRUFBRSxFQUFBLEVBQUksSUFBTixFQUFZLEVBQUEsRUFBSSxDQUFoQixFQUFtQixFQUFBLEVBQUksSUFBdkIsRUFBNkIsRUFBQSxFQUFJLEVBQWpDLEVBSkssRUFLTCxFQUFFLEVBQUEsRUFBSSxJQUFOLEVBQVksRUFBQSxFQUFJLENBQWhCLEVBQW1CLEVBQUEsRUFBSSxJQUF2QixFQUE2QixFQUFBLEVBQUksRUFBakMsRUFMSyxFQU1MLEVBQUUsRUFBQSxFQUFJLEdBQU4sRUFBVyxFQUFBLEVBQUksQ0FBZixFQUFrQixFQUFBLEVBQUksR0FBdEIsRUFBMkIsRUFBQSxFQUFJLE9BQS9CLEVBTkssQ0FGa0I7RUFVekIsS0FBQSxFQUFPLENBQ0w7SUFDRSxDQUFBLEVBQUcsR0FETDtJQUVFLENBQUEsRUFBRyxFQUZMO0lBR0UsQ0FBQSxFQUFHLEVBSEw7SUFJRSxDQUFBLEVBQ0Usb1JBQUE7R0FOQyxFQVFMO0lBQ0UsQ0FBQSxFQUFHLE9BREw7SUFFRSxDQUFBLEVBQUcsRUFGTDtJQUdFLENBQUEsRUFBRyxFQUhMO0lBSUUsQ0FBQSxFQUNFLDRRQUFBO0dBYkMsRUFlTDtJQUNFLENBQUEsRUFBRyxJQURMO0lBRUUsQ0FBQSxFQUFHLEVBRkw7SUFHRSxDQUFBLEVBQUcsRUFITDtJQUlFLENBQUEsRUFDRSw2UUFBQTtHQXBCQyxFQXNCTDtJQUNFLENBQUEsRUFBRyxPQURMO0lBRUUsQ0FBQSxFQUFHLEVBRkw7SUFHRSxDQUFBLEVBQUcsRUFITDtJQUlFLENBQUEsRUFDRSx5UUFBQTtHQTNCQyxFQTZCTDtJQUNFLENBQUEsRUFBRyxPQURMO0lBRUUsQ0FBQSxFQUFHLEVBRkw7SUFHRSxDQUFBLEVBQUcsRUFITDtJQUlFLENBQUEsRUFDRSwyUUFBQTtHQWxDQyxDQUFBO0NBM0dMLENBQUEsRUFBQSxnQkFBQSxDQUFOLENBQUE7O0FBbUpBLElBQU0sZ0JBQUEsR0FBbUIsU0FBbkIsZ0JBQW1CLENBQUMsV0FBRCxFQUFjLEtBQWQsRUFBd0I7RUFDL0MsT0FBTyxlQUFBLENBQWdCLFdBQWhCLENBQUEsQ0FBNkIsS0FBN0IsQ0FBbUMsTUFBbkMsQ0FDTCxVQUFDLEdBQUQsRUFBQSxJQUFBLEVBQUE7SUFBQSxJQUFRLEVBQVIsR0FBQSxJQUFBLENBQVEsRUFBUjtRQUFZLEVBQVosR0FBQSxJQUFBLENBQVksRUFBWjtRQUFnQixFQUFoQixHQUFBLElBQUEsQ0FBZ0IsRUFBaEI7UUFBb0IsRUFBcEIsR0FBQSxJQUFBLENBQW9CLEVBQXBCLENBQUE7SUFBQSxPQUNLLEdBREwsR0FBQSxZQUFBLEdBQ3FCLEVBRHJCLEdBQUEsUUFBQSxHQUNnQyxFQURoQyxHQUFBLFFBQUEsR0FDMkMsRUFEM0MsR0FBQSxRQUFBLEdBQ3NELEVBRHRELEdBQUEsWUFBQSxHQUNxRSxLQURyRSxHQUFBLEtBQUEsQ0FBQTtHQURLLEVBR0wsRUFISyxDQUFQLENBQUE7Q0FERixDQUFBOztBQVFBLElBQU0sZUFBQSxHQUFrQixTQUFsQixlQUFrQixDQUFDLFdBQUQsRUFBYyxNQUFkLEVBQXNCLEtBQXRCLEVBQWdDO0VBQ3RELElBQUksTUFBQSxLQUFXLENBQWYsRUFBa0I7SUFDaEIsT0FBTyxFQUFQLENBQUE7R0FDRDs7RUFIcUQsSUFBQSxxQkFBQSxHQUsvQixlQUFBLENBQWdCLFdBQWhCLENBQUEsQ0FBNkIsS0FBN0IsQ0FBbUMsTUFBQSxHQUFTLENBQTVDLENBTCtCO01BSzlDLENBTDhDLEdBQUEscUJBQUEsQ0FLOUMsQ0FMOEM7TUFLM0MsQ0FMMkMsR0FBQSxxQkFBQSxDQUszQyxDQUwyQztNQUt4QyxDQUx3QyxHQUFBLHFCQUFBLENBS3hDLENBTHdDO01BS3JDLENBTHFDLEdBQUEscUJBQUEsQ0FLckMsQ0FMcUMsQ0FBQTs7O0VBT3RELE9BQUEsaUJBQUEsR0FDYSxDQURiLEdBQUEsbUJBQUEsR0FDa0MsQ0FEbEMsR0FBQSxZQUFBLEdBQ2dELENBRGhELEdBQUEsVUFBQSxHQUM0RCxLQUQ1RCxHQUFBLFlBQUEsR0FDOEUsS0FEOUUsR0FBQSxXQUFBLEdBRUksQ0FGSixHQUFBLE1BQUEsQ0FBQTtDQVBGLENBQUE7O0FBYUEsSUFBTSxNQUFBLEdBQVEsU0FBUixNQUFRLENBQUMsVUFBRCxFQUFBLEtBQUEsRUFBQTtFQUFBLElBQWUsV0FBZixHQUFBLEtBQUEsQ0FBZSxXQUFmO01BQTRCLEtBQTVCLEdBQUEsS0FBQSxDQUE0QixLQUE1QjtNQUFtQyxNQUFuQyxHQUFBLEtBQUEsQ0FBbUMsTUFBbkMsQ0FBQTtFQUFBLE9BQUEsZ0hBQUEsR0FFVixVQUFBLENBQVcsS0FGRCxHQUFBLEdBQUEsR0FHUixVQUFBLENBQVcsTUFISCxHQUFBLDBDQUFBLEdBS0osZ0JBQUEsQ0FBaUIsV0FBakIsRUFBOEIsS0FBOUIsQ0FMSSxHQUFBLFlBQUEsR0FNSixlQUFBLENBQWdCLFdBQWhCLEVBQTZCLE1BQTdCLEVBQXFDLEtBQXJDLENBTkksR0FBQSx3QkFBQSxDQUFBO0NBQWQsQ0FBQTs7QUFVQSxJQUFNLGNBQUEsR0FBaUIsU0FBdkIsQ0FBQTtBQUNBLElBQU0sTUFBQSxHQUFRLFNBQVIsTUFBUSxDQUFDLFVBQUQsRUFBQSxLQUFBLEVBQStDO0VBQUEsSUFBaEMsTUFBZ0MsR0FBQSxLQUFBLENBQWhDLE1BQWdDO01BQXhCLFVBQXdCLEdBQUEsS0FBQSxDQUF4QixVQUF3QjtNQUFaLEtBQVksR0FBQSxLQUFBLENBQVosS0FBWSxDQUFBOztFQUMzRCxJQUFNLE9BQUEsR0FBQSxhQUFBLEdBQXdCLElBQUEsQ0FBSyxNQUFMLEVBQUEsQ0FBYyxRQUFkLENBQXVCLEVBQXZCLENBQUEsQ0FBMkIsU0FBM0IsQ0FBcUMsQ0FBckMsQ0FBOUIsQ0FBQTs7RUFFQSxPQUFBLHlDQUFBLEdBQ3FDLE9BRHJDLEdBQUEsaUJBQUEsR0FDOEQsVUFBQSxDQUFXLEtBRHpFLEdBQUEsR0FBQSxHQUVJLFVBQUEsQ0FBVyxNQUZmLEdBQUEsdUNBQUEsR0FHMEMsWUFIMUMsR0FBQSxzQkFBQSxHQUlpQixPQUpqQixHQUFBLGNBQUEsR0FJdUMsVUFKdkMsR0FBQSwySEFBQSxJQU9VLE1BQUEsSUFBVSxDQUFWLElBQWUsS0FBZixHQUF1QixLQUF2QixHQUErQixjQVB6QyxDQUFBLEdBQUEsdVlBQUEsSUFhVSxNQUFBLElBQVUsQ0FBVixJQUFlLEtBQWYsR0FBdUIsS0FBdkIsR0FBK0IsY0FiekMsQ0FBQSxHQUFBLDBHQUFBLElBZ0JVLE1BQUEsSUFBVSxHQUFWLElBQWlCLEtBQWpCLEdBQXlCLEtBQXpCLEdBQWlDLGNBaEIzQyxDQUFBLEdBQUEsNFdBQUEsSUFzQlUsTUFBQSxJQUFVLENBQVYsSUFBZSxLQUFmLEdBQXVCLEtBQXZCLEdBQStCLGNBdEJ6QyxDQUFBLEdBQUEsNkdBQUEsSUF5QlUsTUFBQSxJQUFVLEdBQVYsSUFBaUIsS0FBakIsR0FBeUIsS0FBekIsR0FBaUMsY0F6QjNDLENBQUEsR0FBQSwrWkFBQSxJQStCVSxNQUFBLElBQVUsQ0FBVixJQUFlLEtBQWYsR0FBdUIsS0FBdkIsR0FBK0IsY0EvQnpDLENBQUEsR0FBQSw2R0FBQSxJQWtDVSxNQUFBLElBQVUsR0FBVixJQUFpQixLQUFqQixHQUF5QixLQUF6QixHQUFpQyxjQWxDM0MsQ0FBQSxHQUFBLCtaQUFBLElBd0NVLE1BQUEsS0FBVyxDQUFYLElBQWdCLEtBQWhCLEdBQXdCLEtBQXhCLEdBQWdDLGNBeEMxQyxDQUFBLEdBQUEsNkdBQUEsSUEyQ1UsTUFBQSxJQUFVLEdBQVYsSUFBaUIsS0FBakIsR0FBeUIsS0FBekIsR0FBaUMsY0EzQzNDLENBQUEsR0FBQSxvV0FBQSxDQUFBO0NBSEYsQ0FBQTs7QUFzREEsSUFBTSxLQUFBLEdBQU8sU0FBUCxLQUFPLENBQUMsVUFBRCxFQUFnQjtFQUMzQixJQUFNLE9BQUEsR0FBQSxpQkFBQSxHQUE0QixJQUFBLENBQUssTUFBTCxFQUFBLENBQWMsUUFBZCxDQUF1QixFQUF2QixDQUFBLENBQTJCLFNBQTNCLENBQXFDLENBQXJDLENBQWxDLENBQUE7O0VBRUEsT0FBQSx5Q0FBQSxHQUNxQyxPQURyQyxHQUFBLGlCQUFBLEdBQzhELFVBQUEsQ0FBVyxLQUR6RSxHQUFBLEdBQUEsR0FDa0YsVUFBQSxDQUFXLE1BRDdGLEdBQUEsdUNBQUEsR0FDMkksWUFEM0ksR0FBQSxzQkFBQSxHQUVpQixPQUZqQixHQUFBLDYxUEFBQSxDQUFBO0NBSEYsQ0FBQTs7QUFhQSxJQUFNLFlBQUEsR0FBYyxTQUFkLFlBQWMsQ0FBQyxVQUFELEVBQUE7RUFBQSxPQUFBLHdCQUFBLEdBQ0UsVUFBQSxDQUFXLEtBRGIsR0FBQSxHQUFBLEdBQ3NCLFVBQUEsQ0FBVyxNQURqQyxHQUFBLHVDQUFBLEdBQytFLFlBRC9FLEdBQUEsb2ZBQUEsQ0FBQTtDQUFwQixDQUFBOztBQU9BLElBQU0sV0FBQSxHQUFhLFNBQWIsV0FBYSxDQUFDLFVBQUQsRUFBQSxLQUFBLEVBQUE7RUFBQSxJQUFlLFlBQWYsR0FBQSxLQUFBLENBQWUsWUFBZixDQUFBO0VBQUEsT0FBQSxzQkFBQSxHQUNDLFVBQUEsQ0FBVyxLQURaLEdBQUEsR0FBQSxHQUVqQixVQUFBLENBQVcsTUFGTSxHQUFBLGlEQUFBLEdBR3FCLFlBSHJCLEdBQUEsMmtCQUFBLElBSXFqQixZQUFBLElBQ3BrQixTQUxlLENBQUEsR0FBQSxtQ0FBQSxDQUFBO0NBQW5CLENBQUE7O0FBU0EsSUFBTSxlQUFBLEdBQWlCLFNBQWpCLGVBQWlCLENBQ3JCLFVBRHFCLEVBQUE7RUFBQSxPQUFBLG9CQUFBLEdBRUcsVUFBQSxDQUFXLEtBRmQsR0FBQSxHQUFBLEdBRXVCLFVBQUEsQ0FBVyxNQUZsQyxHQUFBLGtEQUFBLEdBRTJGLFlBRjNGLEdBQUEsMmlCQUFBLENBQUE7Q0FBdkIsQ0FBQTs7QUFPQSxJQUFNLGNBQUEsR0FBZ0IsU0FBaEIsY0FBZ0IsQ0FDcEIsVUFEb0IsRUFBQTtFQUFBLE9BQUEsb0JBQUEsR0FFSSxVQUFBLENBQVcsS0FGZixHQUFBLEdBQUEsR0FFd0IsVUFBQSxDQUFXLE1BRm5DLEdBQUEsa0RBQUEsR0FFNEYsWUFGNUYsR0FBQSwyaUJBQUEsQ0FBQTtDQUF0QixDQUFBOztBQU9BLElBQU0saUJBQUEsR0FBbUIsU0FBbkIsaUJBQW1CLENBQ3ZCLFVBRHVCLEVBQUE7RUFBQSxPQUFBLG9CQUFBLEdBRUMsVUFBQSxDQUFXLEtBRlosR0FBQSxHQUFBLEdBRXFCLFVBQUEsQ0FBVyxNQUZoQyxHQUFBLG1EQUFBLEdBRTBGLFlBRjFGLEdBQUEsazJCQUFBLENBQUE7Q0FBekIsQ0FBQTs7Ozs7O0FBV0EsSUFBTSxlQUFBLEdBQWtCLEVBQUUsS0FBQSxFQUFPLEdBQVQsRUFBYyxNQUFBLEVBQVEsRUFBdEIsRUFBeEIsQ0FBQTtBQUNBLElBQU0sY0FBQSxHQUFpQixFQUFFLEtBQUEsRUFBTyxHQUFULEVBQWMsTUFBQSxFQUFRLEVBQXRCLEVBQXZCLENBQUE7QUFDQSxJQUFNLHFCQUFBLEdBQXdCLEVBQUUsS0FBQSxFQUFPLEVBQVQsRUFBYSxNQUFBLEVBQVEsRUFBckIsRUFBOUIsQ0FBQTtBQUNBLElBQU0sb0JBQUEsR0FBdUIsRUFBRSxLQUFBLEVBQU8sRUFBVCxFQUFhLE1BQUEsRUFBUSxDQUFyQixFQUE3QixDQUFBO0FBQ0EsSUFBTSx3QkFBQSxHQUEyQixFQUFFLEtBQUEsRUFBTyxFQUFULEVBQWEsTUFBQSxFQUFRLEVBQXJCLEVBQWpDLENBQUE7QUFDQSxJQUFNLHVCQUFBLEdBQTBCLEVBQUUsS0FBQSxFQUFPLEVBQVQsRUFBYSxNQUFBLEVBQVEsRUFBckIsRUFBaEMsQ0FBQTtBQUNBLElBQU0sMEJBQUEsR0FBNkIsRUFBRSxLQUFBLEVBQU8sRUFBVCxFQUFhLE1BQUEsRUFBUSxFQUFyQixFQUFuQyxDQUFBOztBQUVBLElBQU0sTUFBQSxHQUFTO0VBQ2IsS0FBQSxFQUFPLFNBQUEsS0FBQSxDQUFDLEtBQUQsRUFBQTtJQUFBLE9BQVcsT0FBQSxDQUFRLGVBQUEsQ0FBZ0IsS0FBQSxDQUFNLFdBQXRCLENBQUEsQ0FBbUMsVUFBM0MsRUFBdUQsTUFBdkQsRUFBOEQsS0FBOUQsQ0FBWCxDQUFBO0dBRE07RUFFYixLQUFBLEVBQU8sU0FBQSxLQUFBLENBQUMsS0FBRCxFQUFBO0lBQUEsT0FBVyxPQUFBLENBQVEsZUFBUixFQUF5QixNQUF6QixFQUFnQyxLQUFoQyxDQUFYLENBQUE7R0FGTTtFQUdiLElBQUEsRUFBTSxTQUFBLElBQUEsR0FBQTtJQUFBLE9BQU0sT0FBQSxDQUFRLGNBQVIsRUFBd0IsS0FBeEIsQ0FBTixDQUFBO0dBSE87RUFJYixXQUFBLEVBQWEsU0FBQSxXQUFBLEdBQUE7SUFBQSxPQUFNLE9BQUEsQ0FBUSxxQkFBUixFQUErQixZQUEvQixDQUFOLENBQUE7R0FKQTtFQUtiLFVBQUEsRUFBWSxTQUFBLFVBQUEsQ0FBQyxLQUFELEVBQUE7SUFBQSxPQUFXLE9BQUEsQ0FBUSxvQkFBUixFQUE4QixXQUE5QixFQUEwQyxLQUExQyxDQUFYLENBQUE7R0FMQztFQU1iLGNBQUEsRUFBZ0IsU0FBQSxjQUFBLENBQUMsS0FBRCxFQUFBO0lBQUEsT0FBVyxPQUFBLENBQVEsd0JBQVIsRUFBa0MsZUFBbEMsRUFBa0QsS0FBbEQsQ0FBWCxDQUFBO0dBTkg7RUFPYixhQUFBLEVBQWUsU0FBQSxhQUFBLENBQUMsS0FBRCxFQUFBO0lBQUEsT0FBVyxPQUFBLENBQVEsdUJBQVIsRUFBaUMsY0FBakMsRUFBZ0QsS0FBaEQsQ0FBWCxDQUFBO0dBUEY7RUFRYixnQkFBQSxFQUFrQixTQUFBLGdCQUFBLENBQUMsS0FBRCxFQUFBO0lBQUEsT0FBVyxPQUFBLENBQVEsMEJBQVIsRUFBb0MsaUJBQXBDLEVBQXNELEtBQXRELENBQVgsQ0FBQTtHQUFBO0NBUnBCLENBQUE7O1FBV1MsU0FBQTtrRUFBUTtrRUFBd0I7bUVBQXdCOzs7Ozs7OztBQ25WMUQsSUFBTSx1QkFBQSxHQUFBLE9BQUEsQ0FBQSx1QkFBQSxHQUEwQixDQUFDLE1BQUQsRUFBUyxPQUFULENBQWhDLENBQUE7Ozs7Ozs7Ozs7QUNBUCxJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsY0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxNQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztBQUVBLElBQU0sT0FBQSxHQUFVLFNBQVYsT0FBVSxDQUFDLElBQUQsRUFBQTtFQUFBLE9BQVUsRUFBQSxDQUFHLE1BQUgsQ0FBVSxLQUFWLENBQWdCLEVBQWhCLEVBQW9CLElBQXBCLENBQVYsQ0FBQTtDQUFoQixDQUFBOztBQUVBLElBQU0sT0FBQSxHQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBQTtFQUFBLE9BQ2QsTUFBQSxDQUFPLElBQVAsQ0FBWSxLQUFaLENBQUEsQ0FDRyxHQURILENBQ08sVUFBQyxHQUFELEVBQVM7SUFDWixJQUFNLGFBQUEsR0FBZ0IsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLGdCQUFBLEVBQWlCLEtBQUEsQ0FBTSxHQUFOLENBQWpCLENBQXRCLENBQUE7SUFDQSxPQUFVLEdBQVYsR0FBQSxJQUFBLEdBQWtCLGFBQWxCLEdBQUEsR0FBQSxDQUFBO0dBSEosQ0FBQSxDQUtHLElBTEgsQ0FLUSxHQUxSLENBRGMsQ0FBQTtDQUFoQixDQUFBOztBQVFBLElBQU0sTUFBQSxHQUNKLFNBREksTUFDSixDQUFDLEdBQUQsRUFBQTtFQUFBLE9BQ0EsVUFBQyxLQUFELEVBQXdCO0lBQUEsS0FBQSxJQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsTUFBQSxFQUFiLFFBQWEsR0FBQSxLQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxHQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQTtNQUFiLFFBQWEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0tBQUE7O0lBQ3RCLE9BQUEsR0FBQSxHQUFXLEdBQVgsR0FBQSxHQUFBLEdBQWtCLE9BQUEsQ0FBUSxLQUFSLENBQWxCLEdBQUEsR0FBQSxHQUFvQyxPQUFBLENBQVEsUUFBUixDQUFBLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXBDLEdBQUEsSUFBQSxHQUFxRSxHQUFyRSxHQUFBLEdBQUEsQ0FBQTtHQUZGLENBQUE7Q0FERixDQUFBOztBQU1BLElBQU0sZ0JBQUEsR0FBbUIsU0FBbkIsZ0JBQW1CLENBQUMsR0FBRCxFQUFBO0VBQUEsT0FBUyxVQUFDLEtBQUQsRUFBQTtJQUFBLE9BQUEsR0FBQSxHQUFlLEdBQWYsR0FBQSxHQUFBLEdBQXNCLE9BQUEsQ0FBUSxLQUFSLENBQXRCLEdBQUEsR0FBQSxDQUFBO0dBQVQsQ0FBQTtDQUF6QixDQUFBOztBQUVBLElBQU0sQ0FBQSxHQUFJLE1BQUEsQ0FBTyxHQUFQLENBQVYsQ0FBQTtBQUNBLElBQU0sR0FBQSxHQUFNLE1BQUEsQ0FBTyxLQUFQLENBQVosQ0FBQTtBQUNBLElBQU0sR0FBQSxHQUFNLE1BQUEsQ0FBTyxLQUFQLENBQVosQ0FBQTtBQUNBLElBQU0sS0FBQSxHQUFRLE1BQUEsQ0FBTyxPQUFQLENBQWQsQ0FBQTtBQUNBLElBQU0sSUFBQSxHQUFPLE1BQUEsQ0FBTyxNQUFQLENBQWIsQ0FBQTtBQUNBLElBQU0sS0FBQSxHQUFRLGdCQUFBLENBQWlCLE9BQWpCLENBQWQsQ0FBQTtBQUNBLElBQU0sYUFBQSxHQUFnQixNQUF0QixDQUFBOztBQUVBLElBQU0sbUJBQUEsR0FBc0IsU0FBdEIsbUJBQXNCLENBQUMsTUFBRCxFQUFBO0VBQUEsSUFBUyxTQUFULEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQXFCLEVBQXJCLENBQUE7RUFBQSxJQUF5QixLQUF6QixHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLE9BQzFCLEdBQUEsQ0FBSSxFQUFFLEtBQUEsRUFBTyxTQUFULEVBQUosRUFBMEIsSUFBQSxDQUFBLE1BQUEsQ0FBTyxNQUFQLENBQUEsQ0FBZSxLQUFmLENBQTFCLENBRDBCLENBQUE7Q0FBNUIsQ0FBQTs7UUFHUyxJQUFBO1FBQUcsTUFBQTsrQ0FBSztpREFBSztpREFBTztnREFBTztRQUFNLHNCQUFBO3lEQUFxQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYWNraW5nIGZyb20gJ0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvaW1wcmVzc2lvbic7XG5pbXBvcnQgeyBmZXRjaFNlcnZpY2VSZXZpZXdEYXRhIH0gZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9hcGknO1xuaW1wb3J0IHtcbiAgaW5zZXJ0TnVtYmVyU2VwYXJhdG9yLFxuICBzZXRUZXh0Q29udGVudCxcbiAgc2V0SHRtbENvbnRlbnQsXG4gIGFkZFV0bVBhcmFtcyxcbiAgc2V0Rm9udCxcbiAgc2V0VGV4dENvbG9yLFxuICBzZXRIdG1sTGFuZ3VhZ2UsXG59IGZyb20gJ0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdXRpbHMnO1xuaW1wb3J0IHsgZ2V0QXNPYmplY3QgYXMgZ2V0UXVlcnlTdHJpbmcgfSBmcm9tICdAdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3F1ZXJ5U3RyaW5nJztcbmltcG9ydCB7IHBvcHVsYXRlU3RhcnMgfSBmcm9tICdAdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RlbXBsYXRlcy9zdGFycyc7XG5pbXBvcnQgeyBwb3B1bGF0ZUxvZ28gfSBmcm9tICdAdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RlbXBsYXRlcy9sb2dvJztcbmltcG9ydCB7IHJlbW92ZUNsYXNzIH0gZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9kb20nO1xuaW1wb3J0IGluaXQgZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9pbml0JztcblxudHJhY2tpbmcuYXR0YWNoSW1wcmVzc2lvbkhhbmRsZXIoKTtcblxuY29uc3QgYWRkVXRtID0gYWRkVXRtUGFyYW1zKCdNaW5pJyk7XG5cbmNvbnN0IHtcbiAgbG9jYWxlLFxuICBidXNpbmVzc3VuaXRJZDogYnVzaW5lc3NVbml0SWQsXG4gIHRoZW1lID0gJ2xpZ2h0JyxcbiAgbG9jYXRpb24sXG4gIHRlbXBsYXRlSWQsXG4gIGZvbnRGYW1pbHksXG4gIHRleHRDb2xvcixcbn0gPSBnZXRRdWVyeVN0cmluZygpO1xuXG5jb25zdCBpbmplY3RXaWRnZXRMaW5rcyA9ICh7XG4gIGJhc2VEYXRhOiB7XG4gICAgYnVzaW5lc3NFbnRpdHk6IHtcbiAgICAgIG51bWJlck9mUmV2aWV3czogeyB0b3RhbDogdG90YWxOdW1iZXJPZlJldmlld3MgfSxcbiAgICB9LFxuICAgIGxpbmtzLFxuICB9LFxufSkgPT4ge1xuICBjb25zdCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGUtbGluaycpO1xuICBjb25zdCBiYXNlVXJsID0gdG90YWxOdW1iZXJPZlJldmlld3MgPyBsaW5rcy5wcm9maWxlVXJsIDogbGlua3MuZXZhbHVhdGVVcmw7XG4gIGl0ZW0uaHJlZiA9IGFkZFV0bShiYXNlVXJsKTtcbn07XG5cbmNvbnN0IHBvcHVsYXRlTnVtYmVyT2ZSZXZpZXdzID0gKHtcbiAgbG9jYWxlLFxuICBiYXNlRGF0YToge1xuICAgIGJ1c2luZXNzRW50aXR5OiB7XG4gICAgICBudW1iZXJPZlJldmlld3M6IHsgdG90YWw6IG51bWJlck9mUmV2aWV3cyB9LFxuICAgICAgdHJ1c3RTY29yZSxcbiAgICB9LFxuICAgIHRyYW5zbGF0aW9ucyxcbiAgfSxcbn0pID0+IHtcbiAgY29uc3QgcmV2aWV3c1RleHRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbnNsYXRpb25zLXJldmlld3MnKTtcbiAgY29uc3QgdHJ1c3RzY29yZUNvbnRhaW5lcklkID0gbnVtYmVyT2ZSZXZpZXdzXG4gICAgPyAnYnVzaW5lc3NFbnRpdHktbnVtYmVyT2ZSZXZpZXdzLXRvdGFsJ1xuICAgIDogJ3Jldmlld3Mtc3VtbWFyeSc7XG4gIGNvbnN0IHRydXN0c2NvcmVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0cnVzdHNjb3JlQ29udGFpbmVySWQpO1xuICBjb25zdCBzY29yZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJ1c3Qtc2NvcmUnKTtcbiAgY29uc3QgdHJhbnNsYXRpb25TdHJpbmcgPSBudW1iZXJPZlJldmlld3NcbiAgICA/IGluc2VydE51bWJlclNlcGFyYXRvcihudW1iZXJPZlJldmlld3MsIGxvY2FsZSlcbiAgICA6IHRyYW5zbGF0aW9ucy5ub1Jldmlld3M7XG4gIHNldEh0bWxDb250ZW50KHRydXN0c2NvcmVDb250YWluZXIsIHRyYW5zbGF0aW9uU3RyaW5nKTtcbiAgc2V0VGV4dENvbnRlbnQoc2NvcmVFbGVtLCB0cnVzdFNjb3JlLnRvRml4ZWQoMSkpO1xuICBzZXRUZXh0Q29udGVudChyZXZpZXdzVGV4dENvbnRhaW5lciwgdHJhbnNsYXRpb25zLnJldmlld3MpO1xufTtcblxuY29uc3Qgc2hvd1dyYXBwZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHAtd2lkZ2V0LXdyYXBwZXInKTtcbiAgcmVtb3ZlQ2xhc3Mod3JhcHBlciwgJ3RwLXdpZGdldC13cmFwcGVyLS1wbGFjZWhvbGRlcicpO1xufTtcblxuY29uc3QgYXBwbHlDdXN0b21TdHlsaW5nID0gKCkgPT4ge1xuICBpZiAoZm9udEZhbWlseSkge1xuICAgIHNldEZvbnQoZm9udEZhbWlseSk7XG4gIH1cbiAgaWYgKHRleHRDb2xvcikge1xuICAgIHNldFRleHRDb2xvcih0ZXh0Q29sb3IpO1xuICB9XG59O1xuXG5jb25zdCBjb25zdHJ1Y3RUcnVzdEJveCA9ICh7IGJhc2VEYXRhLCBsb2NhbGUgfSkgPT4ge1xuICBzaG93V3JhcHBlcigpO1xuICBzZXRIdG1sTGFuZ3VhZ2UobG9jYWxlKTtcbiAgcG9wdWxhdGVOdW1iZXJPZlJldmlld3MoeyBiYXNlRGF0YSwgbG9jYWxlIH0pO1xuICBwb3B1bGF0ZVN0YXJzKGJhc2VEYXRhLCAndHAtd2lkZ2V0LXN0YXJzJyk7XG4gIHBvcHVsYXRlTG9nbygpO1xuICBpbmplY3RXaWRnZXRMaW5rcyh7IGJhc2VEYXRhIH0pO1xuICBpZiAoYmFzZURhdGEuc2V0dGluZ3MuY3VzdG9tU3R5bGVzQWxsb3dlZCkge1xuICAgIGFwcGx5Q3VzdG9tU3R5bGluZygpO1xuICB9XG59O1xuXG5jb25zdCBmZXRjaFBhcmFtcyA9IHtcbiAgYnVzaW5lc3NVbml0SWQsXG4gIGxvY2FsZSxcbiAgdGhlbWUsXG4gIGxvY2F0aW9uLFxufTtcblxuaW5pdCgoKSA9PiBmZXRjaFNlcnZpY2VSZXZpZXdEYXRhKHRlbXBsYXRlSWQpKGZldGNoUGFyYW1zLCBjb25zdHJ1Y3RUcnVzdEJveCkpO1xuIiwiaW1wb3J0IHsgc2V0SHRtbENvbnRlbnQsIG1ha2VUcmFuc2xhdGlvbnMsIHJlbW92ZUVsZW1lbnQgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgaGFzQ2xhc3MgPSAoZWxlbSwgY2xhc3NOYW1lKSA9PiB7XG4gIGlmIChlbGVtKSB7XG4gICAgY29uc3QgZWxlbUNsYXNzTGlzdCA9IGVsZW0uZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtQ2xhc3NMaXN0ID8gZWxlbUNsYXNzTGlzdC5zcGxpdCgnICcpIDogJyc7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMuaW5kZXhPZihjbGFzc05hbWUpICE9PSAtMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBhZGRDbGFzcyA9IChlbGVtLCBmb3JBZGRpdGlvbikgPT4ge1xuICBpZiAoZWxlbSkge1xuICAgIGNvbnN0IGVsZW1DbGFzc0xpc3QgPSBlbGVtLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICBjb25zdCBjbGFzc05hbWVzID0gZWxlbUNsYXNzTGlzdCA/IGVsZW1DbGFzc0xpc3Quc3BsaXQoJyAnKSA6IFtdO1xuXG4gICAgaWYgKCFoYXNDbGFzcyhlbGVtLCBmb3JBZGRpdGlvbikpIHtcbiAgICAgIGNvbnN0IG5ld0NsYXNzZXMgPSBbLi4uY2xhc3NOYW1lcywgZm9yQWRkaXRpb25dLmpvaW4oJyAnKTtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsIG5ld0NsYXNzZXMpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcmVtb3ZlQ2xhc3MgPSAoZWxlbSwgZm9yUmVtb3ZhbCkgPT4ge1xuICBpZiAoZWxlbSkge1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lcy5maWx0ZXIoKG5hbWUpID0+IG5hbWUgIT09IGZvclJlbW92YWwpLmpvaW4oJyAnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBQb3B1bGF0ZXMgYSBzZXJpZXMgb2YgZWxlbWVudHMgd2l0aCBIVE1MIGNvbnRlbnQuXG4gKlxuICogRm9yIGVhY2ggb2JqZWN0IGluIGEgbGlzdCwgZWl0aGVyIGEgZ2l2ZW4gc3RyaW5nIHZhbHVlIGlzIHVzZWQgdG8gcG9wdWxhdGVcbiAqIHRoZSBnaXZlbiBlbGVtZW50IChpbmNsdWRpbmcgb3B0aW9uYWwgc3Vic3RpdHV0aW9ucyk7IG9yLCB3aGVyZSBubyBzdHJpbmdcbiAqIHZhbHVlIGlzIHByb3ZpZGVkLCByZW1vdmUgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKi9cbmNvbnN0IHBvcHVsYXRlRWxlbWVudHMgPSAoZWxlbWVudHMpID0+IHtcbiAgZWxlbWVudHMuZm9yRWFjaCgoeyBlbGVtZW50LCBzdHJpbmcsIHN1YnN0aXR1dGlvbnMgPSB7fSB9KSA9PiB7XG4gICAgaWYgKHN0cmluZykge1xuICAgICAgc2V0SHRtbENvbnRlbnQoZWxlbWVudCwgbWFrZVRyYW5zbGF0aW9ucyhzdWJzdGl0dXRpb25zLCBzdHJpbmcpLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IGFkZENsYXNzLCByZW1vdmVDbGFzcywgaGFzQ2xhc3MsIHBvcHVsYXRlRWxlbWVudHMgfTtcbiIsImltcG9ydCB7IGdldEFzT2JqZWN0IGFzIHF1ZXJ5U3RyaW5nIH0gZnJvbSAnLi9xdWVyeVN0cmluZyc7XG5pbXBvcnQgeyBhZGRFdmVudExpc3RlbmVyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgZ2V0V2lkZ2V0Um9vdFVyaSBmcm9tICcuL3Jvb3RVcmknO1xuaW1wb3J0IHhociBmcm9tICcuL3hocic7XG5cbmZ1bmN0aW9uIHNldENvb2tpZShjbmFtZSwgY3ZhbHVlLCBleHBpcmVzKSB7XG4gIGNvbnN0IHBhdGggPSAncGF0aD0vJztcbiAgY29uc3QgZG9tYWluID0gYGRvbWFpbj0ke3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5yZXBsYWNlKC9eLipcXC4oW14uXStcXC5bXi5dKykvLCAnJDEnKX1gO1xuICBjb25zdCBzYW1lc2l0ZSA9IGBzYW1lc2l0ZT1ub25lYDtcbiAgY29uc3Qgc2VjdXJlID0gYHNlY3VyZWA7XG4gIGRvY3VtZW50LmNvb2tpZSA9IFtgJHtjbmFtZX09JHtjdmFsdWV9YCwgcGF0aCwgZXhwaXJlcywgZG9tYWluLCBzYW1lc2l0ZSwgc2VjdXJlXS5qb2luKCc7ICcpO1xuICBkb2N1bWVudC5jb29raWUgPSBbYCR7Y25hbWV9LWxlZ2FjeT0ke2N2YWx1ZX1gLCBwYXRoLCBleHBpcmVzLCBkb21haW5dLmpvaW4oJzsgJyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VUcmFja2luZ1VybChldmVudE5hbWUsIGltcHJlc3Npb25EYXRhKSB7XG4gIC8vIERlc3RydWN0dXJlIHRoZSBpbXByZXNzaW9uRGF0YSBhbmQgcXVlcnkgcGFyYW1zIHNvIHRoYXQgd2Ugb25seSBwYXNzIHRoZVxuICAvLyBkZXNpcmVkIHZhbHVlcyBmb3IgY29uc3RydWN0aW5nIHRoZSB0cmFja2luZyBVUkwuXG4gIGNvbnN0IHsgYW5vbnltb3VzSWQ6IHVzZXJJZCwgc2Vzc2lvbkV4cGlyeTogXywgLi4uaW1wcmVzc2lvblBhcmFtcyB9ID0gaW1wcmVzc2lvbkRhdGE7XG4gIGNvbnN0IHsgYnVzaW5lc3N1bml0SWQ6IGJ1c2luZXNzVW5pdElkLCB0ZW1wbGF0ZUlkOiB3aWRnZXRJZCwgLi4ud2lkZ2V0U2V0dGluZ3MgfSA9IHF1ZXJ5U3RyaW5nKCk7XG5cbiAgY29uc3QgdXJsUGFyYW1zID0ge1xuICAgIC4uLndpZGdldFNldHRpbmdzLFxuICAgIC4uLmltcHJlc3Npb25QYXJhbXMsXG4gICAgLi4uKHdpZGdldFNldHRpbmdzLmdyb3VwICYmIHVzZXJJZCA/IHsgdXNlcklkIH0gOiB7IG5vc2V0dGluZ3M6IDEgfSksXG4gICAgYnVzaW5lc3NVbml0SWQsXG4gICAgd2lkZ2V0SWQsXG4gIH07XG4gIGNvbnN0IHVybFBhcmFtc1N0cmluZyA9IE9iamVjdC5rZXlzKHVybFBhcmFtcylcbiAgICAubWFwKChwcm9wZXJ0eSkgPT4gYCR7cHJvcGVydHl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybFBhcmFtc1twcm9wZXJ0eV0pfWApXG4gICAgLmpvaW4oJyYnKTtcbiAgcmV0dXJuIGAke2dldFdpZGdldFJvb3RVcmkoKX0vc3RhdHMvJHtldmVudE5hbWV9PyR7dXJsUGFyYW1zU3RyaW5nfWA7XG59XG5cbmZ1bmN0aW9uIHNldFRyYWNraW5nQ29va2llcyhldmVudE5hbWUsIHsgc2Vzc2lvbiwgdGVzdElkLCBzZXNzaW9uRXhwaXJ5IH0pIHtcbiAgY29uc3QgeyBncm91cCwgYnVzaW5lc3N1bml0SWQ6IGJ1c2luZXNzVW5pdElkIH0gPSBxdWVyeVN0cmluZygpO1xuICBpZiAoIWdyb3VwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF0ZXN0SWQgfHwgIXNlc3Npb24pIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBjb25zb2xlLndhcm4oJ1RydXN0Qm94IE9wdGltaXplciB0ZXN0IGdyb3VwIGRldGVjdGVkIGJ1dCBubyBydW5uaW5nIHRlc3Qgc2V0dGluZ3MgZm91bmQhJyk7XG4gIH1cblxuICBpZiAoc2Vzc2lvbkV4cGlyeSkge1xuICAgIGNvbnN0IHNldHRpbmdzID0geyBncm91cCwgc2Vzc2lvbiwgdGVzdElkIH07XG4gICAgc2V0Q29va2llKFxuICAgICAgYFRydXN0Ym94U3BsaXRUZXN0XyR7YnVzaW5lc3NVbml0SWR9YCxcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzZXR0aW5ncykpLFxuICAgICAgc2Vzc2lvbkV4cGlyeVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJhY2tFdmVudFJlcXVlc3QoZXZlbnROYW1lLCBpbXByZXNzaW9uRGF0YSkge1xuICBzZXRUcmFja2luZ0Nvb2tpZXMoZXZlbnROYW1lLCBpbXByZXNzaW9uRGF0YSk7XG4gIGNvbnN0IHVybCA9IG1ha2VUcmFja2luZ1VybChldmVudE5hbWUsIGltcHJlc3Npb25EYXRhKTtcbiAgdHJ5IHtcbiAgICB4aHIoeyB1cmwgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cbn1cblxuY29uc3QgdHJhY2tJbXByZXNzaW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdHJhY2tFdmVudFJlcXVlc3QoJ1RydXN0Ym94SW1wcmVzc2lvbicsIGRhdGEpO1xufTtcblxuY29uc3QgdHJhY2tWaWV3ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdHJhY2tFdmVudFJlcXVlc3QoJ1RydXN0Ym94VmlldycsIGRhdGEpO1xufTtcblxuY29uc3QgdHJhY2tFbmdhZ2VtZW50ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdHJhY2tFdmVudFJlcXVlc3QoJ1RydXN0Ym94RW5nYWdlbWVudCcsIGRhdGEpO1xufTtcblxubGV0IGlkID0gbnVsbDtcblxuY29uc3QgYXR0YWNoSW1wcmVzc2lvbkhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGFkZEV2ZW50TGlzdGVuZXIod2luZG93LCAnbWVzc2FnZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICh0eXBlb2YgZXZlbnQuZGF0YSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZTtcbiAgICB0cnkge1xuICAgICAgZSA9IHsgZGF0YTogSlNPTi5wYXJzZShldmVudC5kYXRhKSB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHByb2JhYmx5IG5vdCBmb3IgdXNcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS5kYXRhLmNvbW1hbmQgPT09ICdzZXRJZCcpIHtcbiAgICAgIGlkID0gZS5kYXRhLndpZGdldElkO1xuICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7IGNvbW1hbmQ6ICdpbXByZXNzaW9uJywgd2lkZ2V0SWQ6IGlkIH0pLCAnKicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlLmRhdGEuY29tbWFuZCA9PT0gJ2ltcHJlc3Npb24tcmVjZWl2ZWQnKSB7XG4gICAgICBkZWxldGUgZS5kYXRhLmNvbW1hbmQ7XG4gICAgICB0cmFja0ltcHJlc3Npb24oZS5kYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoZS5kYXRhLmNvbW1hbmQgPT09ICd0cnVzdGJveC1pbi12aWV3cG9ydCcpIHtcbiAgICAgIGRlbGV0ZSBlLmRhdGEuY29tbWFuZDtcbiAgICAgIHRyYWNrVmlldyhlLmRhdGEpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCB0cmFja2luZyA9IHtcbiAgZW5nYWdlbWVudDogdHJhY2tFbmdhZ2VtZW50LFxuICBhdHRhY2hJbXByZXNzaW9uSGFuZGxlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRyYWNraW5nO1xuIiwiaW1wb3J0IHsgY29tcG9zZSwgcGFpcnNUb09iamVjdCB9IGZyb20gJy4vZm4nO1xuXG4vKipcbiAqIENvbnZlcnQgYSBwYXJhbWV0ZXIgc3RyaW5nIHRvIGFuIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gcGFyYW1zVG9PYmplY3QocGFyYW1TdHJpbmcpIHtcbiAgY29uc3QgdG9rZW5zID0gWyc/JywgJyMnXTtcbiAgY29uc3QgZHJvcEZpcnN0SWZUb2tlbiA9IChzdHIpID0+ICh0b2tlbnMuaW5kZXhPZihzdHJbMF0pICE9PSAtMSA/IHN0ci5zdWJzdHJpbmcoMSkgOiBzdHIpO1xuICBjb25zdCB0b1BhaXJzID0gKHN0cikgPT5cbiAgICBzdHJcbiAgICAgIC5zcGxpdCgnJicpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKChwYWlyU3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IHBhaXJTdHJpbmcuc3BsaXQoJz0nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkS2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG4gICAgICAgICAgY29uc3QgZFZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gW2RLZXksIGRWYWx1ZV07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgY29uc3QgbWtPYmplY3QgPSBjb21wb3NlKHBhaXJzVG9PYmplY3QsIHRvUGFpcnMsIGRyb3BGaXJzdElmVG9rZW4pO1xuICByZXR1cm4gbWtPYmplY3QocGFyYW1TdHJpbmcpO1xufVxuXG4vKipcbiAqIEdldCBhbGwgcGFyYW1zIGZyb20gdGhlIFRydXN0Qm94J3MgVVJMLlxuICpcbiAqIFRoZSBvbmx5IHF1ZXJ5IHBhcmFtZXRlcnMgcmVxdWlyZWQgdG8gcnVuIHRoZSBpbml0aWFsIGxvYWQgb2YgYSBUcnVzdEJveCBhcmVcbiAqIGJ1c2luZXNzVW5pdElkIGFuZCB0ZW1wbGF0ZUlkLiBUaGUgcmVzdCBhcmUgb25seSB1c2VkIHdpdGhpbiB0aGUgVHJ1c3RCb3ggdG9cbiAqIG1ha2UgdGhlIGRhdGEgY2FsbChzKSBhbmQgc2V0IG9wdGlvbnMuIFRoZXNlIGFyZSBwYXNzZWQgYXMgcGFydCBvZiB0aGUgaGFzaFxuICogdG8gZW5zdXJlIHRoYXQgd2UgY2FuIHByb3Blcmx5IHV0aWxpc2UgYnJvd3NlciBjYWNoaW5nLlxuICpcbiAqIE5vdGU6IHRoaXMgb25seSBjYXB0dXJlcyBzaW5nbGUgb2NjdXJlbmNlcyBvZiB2YWx1ZXMgaW4gdGhlIFVSTC5cbiAqXG4gKiBAcGFyYW0ge0xvY2F0aW9ufSBsb2NhdGlvbiAtIEEgbG9jYXRpb24gb2JqZWN0IGZvciB3aGljaCB0byBnZXQgcXVlcnkgcGFyYW1zLlxuICogQHJldHVybiB7T2JqZWN0fSAtIEFsbCBxdWVyeSBwYXJhbXMgZm9yIHRoZSBnaXZlbiBsb2NhdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbXMobG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24pIHtcbiAgY29uc3QgcXVlcnlQYXJhbXMgPSBwYXJhbXNUb09iamVjdChsb2NhdGlvbi5zZWFyY2gpO1xuICBjb25zdCBoYXNoUGFyYW1zID0gcGFyYW1zVG9PYmplY3QobG9jYXRpb24uaGFzaCk7XG4gIHJldHVybiB7IC4uLnF1ZXJ5UGFyYW1zLCAuLi5oYXNoUGFyYW1zIH07XG59XG5cbmV4cG9ydCB7XG4gIGdldFF1ZXJ5UGFyYW1zLFxuICBnZXRRdWVyeVBhcmFtcyBhcyBnZXRBc09iamVjdCwgLy8gRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggVEJzXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0IHsgYWRkQ2xhc3MgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBzdHlsZUFsaWdubWVudFBvc2l0aW9ucyB9IGZyb20gJy4vbW9kZWxzL3N0eWxlQWxpZ25tZW50UG9zaXRpb25zJztcbmltcG9ydCBnZXRXaWRnZXRSb290VXJpIGZyb20gJy4vcm9vdFVyaSc7XG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmF0dGFjaEV2ZW50KGBvbiR7dHlwZX1gLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQgPVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQgfHxcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgfTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24gPVxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uIHx8XG4gICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIGxpc3RlbmVyLmNhbGwoZWxlbWVudCwgZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0T25QYWdlUmVhZHkoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIGNvbnN0IHJlc29sdmVXaXRoVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCAwKTtcbiAgICB9O1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICByZXNvbHZlV2l0aFRpbWVvdXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNvbHZlV2l0aFRpbWVvdXQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluc2VydE51bWJlclNlcGFyYXRvcihpbnB1dCwgbG9jYWxlKSB7XG4gIHRyeSB7XG4gICAgaW5wdXQudG9Mb2NhbGVTdHJpbmcoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICByZXR1cm4gaW5wdXQudG9Mb2NhbGVTdHJpbmcobG9jYWxlIHx8ICdlbi1VUycpO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChlbGVtZW50LCBjb250ZW50KSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIGNvbnNvbGUubG9nKCdBdHRlbXB0aW5nIHRvIHNldCBjb250ZW50IG9uIG1pc3NpbmcgZWxlbWVudCcpO1xuICB9IGVsc2UgaWYgKCdpbm5lclRleHQnIGluIGVsZW1lbnQpIHtcbiAgICAvLyBJRThcbiAgICBlbGVtZW50LmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIH1cbn1cblxuY29uc3Qgc2FuaXRpemVIdG1sUHJvcCA9IChzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2VBbGwoJz4nLCAnJyk7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2VBbGwoJzwnLCAnJyk7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2VBbGwoJ1wiJywgJycpO1xuICB9XG4gIHJldHVybiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYW5pdGl6ZUh0bWwgPSAoc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgLy8gVE9ETzogR2V0IHJpZCBvZiA8YT4gdGFncyBpbiB0cmFuc2xhdGlvbnNcbiAgLy8gUmVtb3ZlIGh0bWwgdGFncywgZXhjZXB0IDxwPiA8Yj4gPGk+IDxsaT4gPHVsPiA8YT4gPHN0cm9uZz5cbiAgLy8gQnJlYWtkb3duOlxuICAvLyAgKDxcXC8/KD86cHxifGl8bGl8dWx8YXxzdHJvbmcpXFwvPz4pIOKAlCAxc3QgY2FwdHVyaW5nIGdyb3VwLCBzZWxlY3RzIGFsbG93ZWQgdGFncyAob3BlbmluZyBhbmQgY2xvc2luZylcbiAgLy8gICg/OjxcXC8/Lio/XFwvPz4pIOKAlCBub24tY2FwdHVyaW5nIGdyb3VwICg/OiksIG1hdGNoZXMgYWxsIGh0bWwgdGFnc1xuICAvLyAgJDEg4oCUIGtlZXAgbWF0Y2hlcyBmcm9tIDFzdCBjYXB0dXJpbmcgZ3JvdXAgYXMgaXMsIG1hdGNoZXMgZnJvbSBub24tY2FwdHVyaW5nIGdyb3VwIHdpbGwgYmUgb21pdHRlZFxuICAvLyAgL2dpIOKAlCBnbG9iYWwgKG1hdGNoZXMgYWxsIG9jY3VycmVuY2VzKSBhbmQgY2FzZS1pbnNlbnNpdGl2ZVxuICAvLyBUZXN0OiBodHRwczovL3JlZ2V4MTAxLmNvbS9yL2NEYThqci8xXG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKDxcXC8/KD86cHxifGl8bGl8dWx8YXxzdHJvbmcpXFwvPz4pfCg/OjxcXC8/Lio/XFwvPz4pL2dpLCAnJDEnKTtcbn07XG5cbi8qKlxuICogU2FmZWx5IHNldHMgaW5uZXJIVE1MIHRvIERPTSBlbGVtZW50LiBBbHdheXMgdXNlIGl0IGluc3RlYWQgb2Ygc2V0dGluZyAuaW5uZXJIVE1MIGRpcmVjdGx5IG9uIGVsZW1lbnQuXG4gKiBTYW5pdGl6ZXMgSFRNTCBieSBkZWZhdWx0LiBVc2Ugc2FuaXRpemUgZmxhZyB0byBjb250cm9sIHRoaXMgYmVoYXZpb3VyLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcGFyYW0gY29udGVudFxuICogQHBhcmFtIHNhbml0aXplXG4gKi9cbmZ1bmN0aW9uIHNldEh0bWxDb250ZW50KGVsZW1lbnQsIGNvbnRlbnQsIHNhbml0aXplID0gdHJ1ZSkge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oJ0F0dGVtcHRpbmcgdG8gc2V0IEhUTUwgY29udGVudCBvbiBtaXNzaW5nIGVsZW1lbnQnKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHNhbml0aXplID8gc2FuaXRpemVIdG1sKGNvbnRlbnQpIDogY29udGVudDtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2sgaWYgdGhlXG4gKiBAcGFyYW0gYWxpZ25tZW50XG4gKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHN1cHBsaWVkIHZhbHVlIGlzIGxlZnQgb3IgcmlnaHQsIGZhbHNlIG90aGVyd2lzZVxuICovXG5cbmNvbnN0IGlzVmFsaWRBbGlnbm1lbnQgPSAoYWxpZ25tZW50KSA9PiB7XG4gIHJldHVybiBzdHlsZUFsaWdubWVudFBvc2l0aW9ucy5pbmNsdWRlcyhhbGlnbm1lbnQpO1xufTtcblxuLyoqXG4gKiBTZXQgd2lkZ2V0IGFsaWdubWVudCwgYWxsb3dlZCB2YWx1ZXMgYXJlIGBsZWZ0YCBhbmQgYHJpZ2h0YFxuICpcbiAqIEBwYXJhbSBlbGVtZW50SWRcbiAqIEBwYXJhbSBhbGlnbm1lbnRcbiAqL1xuY29uc3Qgc2V0V2lkZ2V0QWxpZ25tZW50ID0gKGVsZW1lbnRJZCwgYWxpZ25tZW50KSA9PiB7XG4gIGlmICghZWxlbWVudElkKSB7XG4gICAgY29uc29sZS53YXJuKCdUcnVzdHBpbG90OiBjYW5ub3QgZmluZCBzdGFycyB3cmFwcGVyIGVsZW1lbnQsIHBsZWFzZSBjb250YWN0IHN1cHBvcnQhJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFhbGlnbm1lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oJ1RydXN0cGlsb3Q6IGNhbm5vdCBhcHBseSB3aWRnZXQgYWxpZ25tZW50LCBwbGVhc2UgY29udGFjdCBzdXBwb3J0IScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlzQWxpZ25tZW50VmFsaWQgPSBpc1ZhbGlkQWxpZ25tZW50KGFsaWdubWVudCk7XG4gIGNvbnNvbGUubG9nKCdpc0FsaWdubWVudFZhbGlkOiAnLCBpc0FsaWdubWVudFZhbGlkKTtcblxuICBpZiAoIWlzQWxpZ25tZW50VmFsaWQpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgVHJ1c3RwaWxvdDogJHthbGlnbm1lbnR9IGlzIG5vdCBhIHZhbGlkIHdpZGdldCBhbGlnbm1lbnQgdmFsdWUsIHBsZWFzZSBjb250YWN0IHN1cHBvcnQhYFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2FwcGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG5cbiAgaWYgKCF3YXBwZXJFbGVtZW50KSB7XG4gICAgY29uc29sZS5lcnJvcihcIlRydXN0cGlsb3Q6IGNvdWxkbid0IGZpbmQgdGhlIHN0YXJzIHdyYXBwZXIgZWxlbWVudCwgcGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gTm90ZTogRWxlbWVudCdzIElkIGFuZCBDbGFzcyBOYW1lIGFyZSB0aGUgc2FtZVxuICB3YXBwZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoYCR7ZWxlbWVudElkfS0tJHthbGlnbm1lbnR9YCk7XG59O1xuXG4vKipcbiAqIFNldCBwb3B1cCBhbGlnbm1lbnQsIGFsbG93ZWQgdmFsdWVzIGFyZSBsZWZ0IGFuZCByaWdodFxuICogQHBhcmFtIHtzdHJpbmd9IGFsaWdubWVudFxuICogQHJldHVybnMgc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9wdXAgb2YgdGhlIFByb2R1Y3QgTWluaSBhbmQgUHJvZHVjdCBNaW5pIEltcG9ydGVkIHdpZGdldHMgdG8gYGxlZnRgIG9yIGByaWdodGAsIGFzIHByb3ZpZGVkIGJ5IHRoZSBodG1sIGRhdGEtIGZpZWxkXG4gKi9cblxuY29uc3Qgc2V0UG9wdXBBbGlnbm1lbnQgPSAoYWxpZ25tZW50KSA9PiB7XG4gIGlmICghYWxpZ25tZW50KSB7XG4gICAgY29uc29sZS53YXJuKCdUcnVzdHBpbG90OiBjYW5ub3QgYXBwbHkgd2lkZ2V0IGFsaWdubWVudCwgcGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCEnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpc0FsaWdubWVudFZhbGlkID0gaXNWYWxpZEFsaWdubWVudChhbGlnbm1lbnQpO1xuXG4gIGlmICghaXNBbGlnbm1lbnRWYWxpZCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBUcnVzdHBpbG90OiAke2FsaWdubWVudH0gaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHN0eWxlIGFsaWdubWVudCwgcGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCFgXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBOb3RlOiBFbGVtZW50J3MgSWQgYW5kIGNsYXNzIG5hbWUgaGF2ZSB0aGUgc2FtZSB2YWx1ZVxuICBjb25zdCB3aWRnZXRQb3B1cFdyYXBwZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RwLXdpZGdldC13cmFwcGVyJyk7XG4gIGlmICghd2lkZ2V0UG9wdXBXcmFwcGVyRWxlbWVudCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1RydXN0cGlsb3Q6IHdpZGdldCBwb3B1cCBpcyBub3QgZm91bmQsIHBsZWFzZSBjb250YWN0IHN1cHBvcnQhJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcG9wdXBTdHlsZUFsaWdubWVudCA9IGB0cC13aWRnZXQtd3JhcHBlci0tJHthbGlnbm1lbnR9YDtcbiAgd2lkZ2V0UG9wdXBXcmFwcGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHBvcHVwU3R5bGVBbGlnbm1lbnQpO1xufTtcblxuZnVuY3Rpb24gbWFrZVRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnMsIHN0cmluZykge1xuICBpZiAoIXN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCdNaXNzaW5nIHRyYW5zbGF0aW9uIHN0cmluZycpO1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXModHJhbnNsYXRpb25zKS5yZWR1Y2UoXG4gICAgKHJlc3VsdCwga2V5KSA9PiByZXN1bHQuc3BsaXQoa2V5KS5qb2luKHRyYW5zbGF0aW9uc1trZXldKSxcbiAgICBzdHJpbmdcbiAgKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgY29uc29sZS5sb2coJ0F0dGVtcHRpbmcgdG8gcmVtb3ZlIGEgbm9uLWV4aXN0aW5nIGVsZW1lbnQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbn1cblxuY29uc3Qgc2hvd1RydXN0Qm94ID0gKHRoZW1lLCBoYXNSZXZpZXdzKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RwLXdpZGdldC13cmFwcGVyJyk7XG5cbiAgYWRkQ2xhc3MoYm9keSwgdGhlbWUpO1xuICBhZGRDbGFzcyh3cmFwcGVyLCAndmlzaWJsZScpO1xuXG4gIGlmICghaGFzUmV2aWV3cykge1xuICAgIGFkZENsYXNzKGJvZHksICdmaXJzdC1yZXZpZXdlcicpO1xuICB9XG59O1xuXG4vLyB1cmwgY2FuIGFscmVhZHkgaGF2ZSBxdWVyeSBwYXJhbXMgaW4gaXRcbmNvbnN0IHZlcmlmeVF1ZXJ5UGFyYW1TZXBhcmF0b3IgPSAodXJsKSA9PiBgJHt1cmx9JHt1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJ31gO1xuXG5jb25zdCBhZGRVdG1QYXJhbXMgPSAodHJ1c3RCb3hOYW1lKSA9PiAodXJsKSA9PlxuICBgJHt2ZXJpZnlRdWVyeVBhcmFtU2VwYXJhdG9yKHVybCl9dXRtX21lZGl1bT10cnVzdGJveCZ1dG1fc291cmNlPSR7dHJ1c3RCb3hOYW1lfWA7XG5cbmNvbnN0IHJlZ3VsYXRlRm9sbG93Rm9yTG9jYXRpb24gPSAobG9jYXRpb24pID0+IChlbGVtZW50KSA9PiB7XG4gIGlmIChsb2NhdGlvbiAmJiBlbGVtZW50KSB7XG4gICAgZWxlbWVudC5yZWwgPSAnbm9mb2xsb3cnO1xuICB9XG59O1xuXG5jb25zdCBpbmplY3RXaWRnZXRMaW5rcyA9IChiYXNlRGF0YSwgdXRtVHJ1c3RCb3hJZCwgbGlua3NDbGFzcyA9ICdwcm9maWxlLXVybCcpID0+IHtcbiAgY29uc3Qge1xuICAgIGJ1c2luZXNzRW50aXR5OiB7XG4gICAgICBudW1iZXJPZlJldmlld3M6IHsgdG90YWw6IG51bWJlck9mUmV2aWV3cyB9LFxuICAgIH0sXG4gICAgbGlua3MsXG4gIH0gPSBiYXNlRGF0YTtcbiAgY29uc3QgaXRlbXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGlua3NDbGFzcykpO1xuICBjb25zdCBiYXNlVXJsID0gbnVtYmVyT2ZSZXZpZXdzID8gbGlua3MucHJvZmlsZVVybCA6IGxpbmtzLmV2YWx1YXRlVXJsO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbXNbaV0uaHJlZiA9IGFkZFV0bVBhcmFtcyh1dG1UcnVzdEJveElkKShiYXNlVXJsKTtcbiAgfVxufTtcblxuLy8gQ3JlYXRlIGEgcmFuZ2Ugb2YgbnVtYmVycywgdXAgdG8gKGJ1dCBleGNsdWRpbmcpIHRoZSBhcmd1bWVudC5cbi8vIFdyaXR0ZW4gdG8gc3VwcG9ydCBJRTExLlxuY29uc3QgcmFuZ2UgPSAobnVtKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICB3aGlsZSAobnVtID4gMCkge1xuICAgIHJlc3VsdC5wdXNoKHJlc3VsdC5sZW5ndGgpO1xuICAgIG51bS0tO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyBTaGlmdHMgdGhlIGdpdmVuIGNvbG9yIHRvIGVpdGhlciBsaWdodGVyIG9yIGRhcmtlciBiYXNlZCBvbiB0aGUgYmFzZSB2YWx1ZSBnaXZlbi5cbi8vIFBvc2l0aXZlIHZhbHVlcyBnaXZlIHlvdSBsaWdodGVyIGNvbG9yLCBuZWdhdGl2ZSBkYXJrZXIuXG5jb25zdCBjb2xvclNoaWZ0ID0gKGNvbCwgYW10KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRlQm91bmRzID0gKHYpID0+ICh2ID4gMjU1ID8gMjU1IDogdiA8IDAgPyAwIDogdik7XG4gIGxldCB1c2VQb3VuZCA9IGZhbHNlO1xuXG4gIGlmIChjb2xbMF0gPT09ICcjJykge1xuICAgIGNvbCA9IGNvbC5zbGljZSgxKTtcbiAgICB1c2VQb3VuZCA9IHRydWU7XG4gIH1cblxuICBjb25zdCBudW0gPSBwYXJzZUludChjb2wsIDE2KTtcbiAgaWYgKCFudW0pIHtcbiAgICByZXR1cm4gY29sO1xuICB9XG5cbiAgbGV0IHIgPSAobnVtID4+IDE2KSArIGFtdDtcbiAgciA9IHZhbGlkYXRlQm91bmRzKHIpO1xuXG4gIGxldCBnID0gKChudW0gPj4gOCkgJiAweDAwZmYpICsgYW10O1xuICBnID0gdmFsaWRhdGVCb3VuZHMoZyk7XG5cbiAgbGV0IGIgPSAobnVtICYgMHgwMDAwZmYpICsgYW10O1xuICBiID0gdmFsaWRhdGVCb3VuZHMoYik7XG5cbiAgW3IsIGcsIGJdID0gW3IsIGcsIGJdLm1hcCgoY29sb3IpID0+XG4gICAgY29sb3IgPD0gMTUgPyBgMCR7Y29sb3IudG9TdHJpbmcoMTYpfWAgOiBjb2xvci50b1N0cmluZygxNilcbiAgKTtcbiAgcmV0dXJuICh1c2VQb3VuZCA/ICcjJyA6ICcnKSArIHIgKyBnICsgYjtcbn07XG5cbmNvbnN0IGhleFRvUkdCQSA9IChoZXgsIGFscGhhID0gMSkgPT4ge1xuICBjb25zdCBudW0gPSBoZXhbMF0gPT09ICcjJyA/IHBhcnNlSW50KGhleC5zbGljZSgxKSwgMTYpIDogcGFyc2VJbnQoaGV4LCAxNik7XG4gIGNvbnN0IHJlZCA9IG51bSA+PiAxNjtcbiAgY29uc3QgZ3JlZW4gPSAobnVtID4+IDgpICYgMHgwMGZmO1xuICBjb25zdCBibHVlID0gbnVtICYgMHgwMDAwZmY7XG4gIHJldHVybiBgcmdiYSgke3JlZH0sJHtncmVlbn0sJHtibHVlfSwke2FscGhhfSlgO1xufTtcblxuY29uc3Qgc2V0VGV4dENvbG9yID0gKHRleHRDb2xvcikgPT4ge1xuICBjb25zdCB0ZXh0Q29sb3JTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHRleHRDb2xvclN0eWxlLmFwcGVuZENoaWxkKFxuICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBcbiAgICAgICoge1xuICAgICAgICBjb2xvcjogaW5oZXJpdCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgYm9keSB7XG4gICAgICAgIGNvbG9yOiAke3RleHRDb2xvcn0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIC5ib2xkLXVuZGVybGluZSB7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICR7dGV4dENvbG9yfSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLmJvbGQtdW5kZXJsaW5lOmhvdmVyIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke2NvbG9yU2hpZnQodGV4dENvbG9yLCAtMzApfSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLnNlY29uZGFyeS10ZXh0IHtcbiAgICAgICAgY29sb3I6ICR7aGV4VG9SR0JBKHRleHRDb2xvciwgMC42KX0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIC5zZWNvbmRhcnktdGV4dC1hcnJvdyB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtoZXhUb1JHQkEodGV4dENvbG9yLCAwLjYpfSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLnJlYWQtbW9yZSB7XG4gICAgICAgIGNvbG9yOiAke3RleHRDb2xvcn0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICBgKVxuICApO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRleHRDb2xvclN0eWxlKTtcbn07XG5cbmNvbnN0IHNldEJvcmRlckNvbG9yID0gKGJvcmRlckNvbG9yKSA9PiB7XG4gIGNvbnN0IGJvcmRlckNvbG9yU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBib3JkZXJDb2xvclN0eWxlLmFwcGVuZENoaWxkKFxuICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBcbiAgICAgKiB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtib3JkZXJDb2xvcn0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICBgKVxuICApO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGJvcmRlckNvbG9yU3R5bGUpO1xufTtcblxuY29uc3Qgc2V0Rm9udCA9IChmb250RmFtaWx5KSA9PiB7XG4gIGNvbnN0IHdpZGdldFJvb3RVcmkgPSBnZXRXaWRnZXRSb290VXJpKCk7XG4gIGNvbnN0IGZvbnRGYW1pbHlOb3JtYWxpemVkRm9yVXJsID0gZm9udEZhbWlseS5yZXBsYWNlKC9cXHMvZywgJy0nKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBmb250TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgZm9udExpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAvLyB3ZSBhcmUgdXNpbmcgdGhlIGZvbGxvd2luZyB0aHJlZSB3ZWlnaHRzIGluIG1vc3Qgb2Ygb3VyIFRydXN0Qm94ZXNcbiAgLy8gaW4gZnV0dXJlIGl0ZXJhdGlvbnMsIHdlIGNhbiBvcHRpbWl6ZSB0aGUgYnl0ZXMgdHJhbnNmZXJyZWQgYnkgaGF2aW5nIGEgbGlzdCBvZiB3ZWlnaHRzIHBlciBUcnVzdEJveFxuICBmb250TGluay5ocmVmID0gYCR7d2lkZ2V0Um9vdFVyaX0vZm9udHMvJHtmb250RmFtaWx5Tm9ybWFsaXplZEZvclVybH0uY3NzYDtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChmb250TGluayk7XG5cbiAgY29uc3QgY2xlYW5Gb250TmFtZSA9IGZvbnRGYW1pbHkucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gIGNvbnN0IGZvbnRTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIGZvbnRTdHlsZS5hcHBlbmRDaGlsZChcbiAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgXG4gICAgKiB7XG4gICAgICBmb250LWZhbWlseTogaW5oZXJpdCAhaW1wb3J0YW50O1xuICAgIH1cbiAgICBib2R5IHtcbiAgICAgIGZvbnQtZmFtaWx5OiBcIiR7Y2xlYW5Gb250TmFtZX1cIiwgc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xuICAgIH1cbiAgICBgKVxuICApO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGZvbnRTdHlsZSk7XG59O1xuXG5jb25zdCBzZXRIdG1sTGFuZ3VhZ2UgPSAobGFuZ3VhZ2UpID0+IHtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnbGFuZycsIGxhbmd1YWdlKTtcbn07XG5cbmNvbnN0IHNhbml0aXplQ29sb3IgPSAoY29sb3IpID0+IHtcbiAgY29uc3QgaGV4UmVnRXhwID0gL14jKD86W1xcZGEtZkEtRl17M30pezEsMn0kLztcbiAgcmV0dXJuIHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycgJiYgaGV4UmVnRXhwLnRlc3QoY29sb3IpID8gY29sb3IgOiBudWxsO1xufTtcblxuY29uc3QgaGFuZGxlUG9wb3ZlclBvc2l0aW9uID0gKGxhYmVsLCBwb3BvdmVyLCBjb250YWluZXIsIHBvcFVwQXJyb3cpID0+IHtcbiAgY29uc3QgcG9wb3ZlclJlY3QgPSBwb3BvdmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBsYWJlbFJlY3QgPSBsYWJlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBpZiAocG9wb3ZlclJlY3QubGVmdCA8IGNvbnRhaW5lclJlY3QubGVmdCkge1xuICAgIC8vIFdlIG5lZWQgdG8gc3RpY2sgdGhlIHBvcG92ZXIgdG8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgY29udGFpbmVyXG4gICAgLy8gQmVjYXVzZSB0aGUgYGxlZnRgIGFuZCBgcmlnaHRgIHZhbHVlcyBhcmUgcmVsYXRpdmUgdG8gdGhlIHBhcmVudCxcbiAgICAvLyB3ZSBuZWVkIHRvIG1ha2UgdGhlIGZvbGxvd2luZyBjYWxjdWxhdGlvbiB0byBmaW5kIHdoZXJlIHRvIHN0aWNrIHRoZSBwb3BvdmVyXG4gICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gYCR7Y29udGFpbmVyUmVjdC5sZWZ0IC0gbGFiZWxSZWN0LmxlZnR9cHhgO1xuICAgIHBvcG92ZXIuc3R5bGUucmlnaHQgPSAnYXV0byc7XG4gICAgLy8gTW92aW5nIHRoZSBhcnJvdyBieSB0aGUgZGlzdGFuY2Ugb2YgdGhlIHBvcG92ZXIgc2hpZnQgb3ZlciBYIGF4aXNcbiAgICBjb25zdCBuZXdQb3B1cFJlY3QgPSBwb3BvdmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGN1cnJlbnRMZWZ0VmFsdWUgPSBnZXRDb21wdXRlZFN0eWxlKHBvcFVwQXJyb3cpLmxlZnQ7XG4gICAgcG9wVXBBcnJvdy5zdHlsZS5sZWZ0ID0gYGNhbGMoJHtjdXJyZW50TGVmdFZhbHVlfSArICR7TWF0aC5mbG9vcihcbiAgICAgIHBvcG92ZXJSZWN0LmxlZnQgLSBuZXdQb3B1cFJlY3QubGVmdFxuICAgICl9cHgpYDtcbiAgfSBlbHNlIGlmIChwb3BvdmVyUmVjdC5yaWdodCA+IGNvbnRhaW5lclJlY3QucmlnaHQpIHtcbiAgICAvLyBXZSBuZWVkIHRvIHN0aWNrIHRoZSBwb3BvdmVyIHRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBjb250YWluZXJcbiAgICAvLyBCZWNhdXNlIHRoZSBgbGVmdGAgYW5kIGByaWdodGAgdmFsdWVzIGFyZSByZWxhdGl2ZSB0byB0aGUgcGFyZW50LFxuICAgIC8vIHdlIG5lZWQgdG8gbWFrZSB0aGUgZm9sbG93aW5nIGNhbGN1bGF0aW9uIHRvIGZpbmQgd2hlcmUgdG8gc3RpY2sgdGhlIHBvcG92ZXJcbiAgICBwb3BvdmVyLnN0eWxlLnJpZ2h0ID0gYCR7bGFiZWxSZWN0LnJpZ2h0IC0gY29udGFpbmVyUmVjdC5yaWdodH1weGA7XG4gICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gJ2F1dG8nO1xuICAgIC8vIE1vdmluZyB0aGUgYXJyb3cgYnkgdGhlIGRpc3RhbmNlIG9mIHRoZSBwb3BvdmVyIHNoaWZ0IG92ZXIgWCBheGlzXG4gICAgY29uc3QgbmV3UG9wdXBSZWN0ID0gcG9wb3Zlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjdXJyZW50TGVmdFZhbHVlID0gZ2V0Q29tcHV0ZWRTdHlsZShwb3BVcEFycm93KS5sZWZ0O1xuICAgIHBvcFVwQXJyb3cuc3R5bGUubGVmdCA9IGBjYWxjKCR7Y3VycmVudExlZnRWYWx1ZX0gKyAke01hdGguZmxvb3IoXG4gICAgICBwb3BvdmVyUmVjdC5yaWdodCAtIG5ld1BvcHVwUmVjdC5yaWdodFxuICAgICl9cHgpYDtcbiAgfVxufTtcblxuY29uc3Qgc29ydEF0dHJpYnV0ZVJhdGluZ3MgPSAoYXR0cmlidXRlUmF0aW5nc0FycmF5KSA9PiB7XG4gIGNvbnN0IHNvcnRCeU5hbWUgPSAoYSwgYikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKTtcblxuICBjb25zdCBzdGFyQXR0cmlidXRlcyA9IGF0dHJpYnV0ZVJhdGluZ3NBcnJheVxuICAgIC5maWx0ZXIoKHgpID0+IHgudHlwZSA9PT0gJ3JhbmdlXzF0bzUnKVxuICAgIC5zb3J0KHNvcnRCeU5hbWUpO1xuICBjb25zdCBzY2FsZUF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVSYXRpbmdzQXJyYXkuZmlsdGVyKCh4KSA9PiB4LnR5cGUgPT09ICdzY2FsZScpLnNvcnQoc29ydEJ5TmFtZSk7XG5cbiAgcmV0dXJuIFsuLi5zdGFyQXR0cmlidXRlcywgLi4uc2NhbGVBdHRyaWJ1dGVzXTtcbn07XG5cbmNvbnN0IGdldFRydXN0cGlsb3RCdXNpbmVzc1VuaXRJZCA9ICgpID0+IHtcbiAgLy8gVGhpcyB3aWxsIGJlIHN1YnN0aXR1dGVkIHdpdGhpbiB0aGUgYnVpbGRzY3JpcHRzXG4gIGNvbnN0IGJ1aWQgPSAnI3tUcnVzdHBpbG90QnVzaW5lc3NVbml0SWR9JztcbiAgcmV0dXJuIGJ1aWQuaW5kZXhPZignIycpID09PSAwID8gJzQ2ZDZhODkwMDAwMDY0MDAwNTAwZTBjMycgOiBidWlkO1xufTtcblxuZXhwb3J0IHtcbiAgYWRkRXZlbnRMaXN0ZW5lcixcbiAgYWRkVXRtUGFyYW1zLFxuICBnZXRPblBhZ2VSZWFkeSxcbiAgZ2V0VHJ1c3RwaWxvdEJ1c2luZXNzVW5pdElkLFxuICBpbmplY3RXaWRnZXRMaW5rcyxcbiAgaW5zZXJ0TnVtYmVyU2VwYXJhdG9yLFxuICBoYW5kbGVQb3BvdmVyUG9zaXRpb24sXG4gIG1ha2VUcmFuc2xhdGlvbnMsXG4gIHJhbmdlLFxuICByZWd1bGF0ZUZvbGxvd0ZvckxvY2F0aW9uLFxuICByZW1vdmVFbGVtZW50LFxuICBzYW5pdGl6ZUNvbG9yLFxuICBzYW5pdGl6ZUh0bWwsXG4gIHNhbml0aXplSHRtbFByb3AsXG4gIHNldEJvcmRlckNvbG9yLFxuICBzZXRIdG1sQ29udGVudCxcbiAgc2V0SHRtbExhbmd1YWdlLFxuICBzZXRGb250LFxuICBzZXRQb3B1cEFsaWdubWVudCxcbiAgc2V0VGV4dENvbG9yLFxuICBzZXRUZXh0Q29udGVudCxcbiAgc2V0V2lkZ2V0QWxpZ25tZW50LFxuICBzaG93VHJ1c3RCb3gsXG4gIHNvcnRBdHRyaWJ1dGVSYXRpbmdzLFxufTtcbiIsImltcG9ydCB7IG1rRWxlbVdpdGhTdmdMb29rdXAgfSBmcm9tICcuLi90ZW1wbGF0aW5nJztcbmltcG9ydCB7IHBvcHVsYXRlRWxlbWVudHMgfSBmcm9tICcuLi9kb20nO1xuXG5jb25zdCBtYWtlTG9nbyA9ICgpID0+IG1rRWxlbVdpdGhTdmdMb29rdXAoJ2xvZ28nKTtcblxuY29uc3QgcG9wdWxhdGVMb2dvID0gKGxvZ29Db250YWluZXIgPSAndHAtd2lkZ2V0LWxvZ28nKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9XG4gICAgdHlwZW9mIGxvZ29Db250YWluZXIgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobG9nb0NvbnRhaW5lcikgOiBsb2dvQ29udGFpbmVyO1xuXG4gIHBvcHVsYXRlRWxlbWVudHMoW1xuICAgIHtcbiAgICAgIGVsZW1lbnQ6IGNvbnRhaW5lcixcbiAgICAgIHN0cmluZzogbWFrZUxvZ28oKSxcbiAgICB9LFxuICBdKTtcbn07XG5cbmV4cG9ydCB7IG1ha2VMb2dvLCBwb3B1bGF0ZUxvZ28gfTtcbiIsImltcG9ydCB7IHBpbmcsIG9uUG9uZyB9IGZyb20gJy4vY29tbXVuaWNhdGlvbic7XG5pbXBvcnQgeyBlcnJvckZhbGxiYWNrIH0gZnJvbSAnLi90ZW1wbGF0ZXMvZXJyb3JGYWxsYmFjayc7XG5cbmNvbnN0IEZBTExCQUNLX0RFTEFZID0gNTAwO1xuXG4vKipcbiAqIE1ha2VzIHN1cmUgdGhhdCB0aGUgd2lkZ2V0IGlzIGluaXRpYWxpemVkIG9ubHkgd2hlbiB0aGUgYm9vdHN0cmFwcGVyIGlzIHByZXNlbnQuXG4gKlxuICogU2VuZHMgYSBcInBpbmdcIiBtZXNzYWdlIHRvIHRoZSBib290c3RyYXBwZXIgYW5kIHdhaXRzIGZvciBhIFwicG9uZ1wiIHJlcGx5IGJlZm9yZSBpbml0aWFsaXppbmcgdGhlIHdpZGdldC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkluaXQgdGhlIGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGluaXQgaXMgZG9uZS5cbiAqL1xuY29uc3QgaW5pdCA9IChvbkluaXQpID0+IHtcbiAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gIG9uUG9uZygoKSA9PiB7XG4gICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIGlmICh0eXBlb2Ygb25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvbkluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdgb25Jbml0YCBub3Qgc3VwcGxpZWQnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHBpbmcoKTtcblxuICAvLyB3ZSB3YW50IHRvIGF2b2lkIHJlbmRlcmluZyB0aGUgZmFsbGJhY2sgcmlnaHQgYXdheSBpbiBjYXNlIHRoZSBcInBvbmdcIiBtZXNzYWdlIGZyb20gdGhlIGJvb3RzdHJhcHBlciBjb21lcyBiYWNrIGltbWVkaWF0ZWx5XG4gIC8vIHRoaXMgd2F5IHdlIHdpbGwgYXZvaWQgYSBmbGlja2VyIGZyb20gXCJlbXB0eSBzY3JlZW5cIiAtPiBcImZhbGxiYWNrXCIgLT4gXCJUcnVzdEJveFwiIGFuZCBoYXZlIFwiZW1wdHkgc2NyZWVuXCIgLT4gXCJUcnVzdEJveFwiXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICghaW5pdGlhbGl6ZWQpIHtcbiAgICAgIGVycm9yRmFsbGJhY2soKTtcbiAgICB9XG4gIH0sIEZBTExCQUNLX0RFTEFZKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG4iLCJpbXBvcnQgeyBkaXYsIG1rRWxlbVdpdGhTdmdMb29rdXAgfSBmcm9tICcuLi90ZW1wbGF0aW5nJztcbmltcG9ydCB7IHBvcHVsYXRlRWxlbWVudHMgfSBmcm9tICcuLi9kb20nO1xuaW1wb3J0IHsgc2FuaXRpemVDb2xvciB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgbWFrZVN0YXJzID0gKHsgbnVtLCB0cnVzdFNjb3JlID0gbnVsbCwgd3JhcHBlckNsYXNzID0gJycsIGNvbG9yIH0pID0+IHtcbiAgY29uc3QgZnVsbFBhcnQgPSBNYXRoLmZsb29yKG51bSk7XG4gIGNvbnN0IGhhbGZQYXJ0ID0gbnVtID09PSBmdWxsUGFydCA/ICcnIDogYCB0cC1zdGFycy0tJHtmdWxsUGFydH0tLWhhbGZgO1xuICBjb25zdCBzYW5pdGl6ZWRDb2xvciA9IHNhbml0aXplQ29sb3IoY29sb3IpO1xuICByZXR1cm4gZGl2KFxuICAgIHsgY2xhc3M6IHdyYXBwZXJDbGFzcyB9LFxuICAgIC8vIGFkZCBhIGRpZmZlcmVudCBjbGFzcyBzbyB0aGF0IHN0eWxlcyBmcm9tIHdpZGdldHMtc3R5bGVndWlkZSBkbyBub3QgYXBwbHlcbiAgICBta0VsZW1XaXRoU3ZnTG9va3VwKFxuICAgICAgJ3N0YXJzJyxcbiAgICAgIGAke1xuICAgICAgICBzYW5pdGl6ZWRDb2xvclxuICAgICAgICAgID8gJ3RwLXN0YXJzLWN1c3RvbS1jb2xvcidcbiAgICAgICAgICA6IGB0cC1zdGFycyB0cC1zdGFycy0tJHtmdWxsUGFydH0ke2hhbGZQYXJ0fWBcbiAgICAgIH1gLFxuICAgICAgeyByYXRpbmc6IG51bSwgdHJ1c3RTY29yZTogdHJ1c3RTY29yZSB8fCBudW0sIGNvbG9yOiBzYW5pdGl6ZWRDb2xvciB9XG4gICAgKVxuICApO1xufTtcblxuY29uc3QgcG9wdWxhdGVTdGFycyA9IChcbiAge1xuICAgIGJ1c2luZXNzRW50aXR5OiB7XG4gICAgICBzdGFycyxcbiAgICAgIHRydXN0U2NvcmUsXG4gICAgICBudW1iZXJPZlJldmlld3M6IHsgdG90YWwgfSxcbiAgICB9LFxuICB9LFxuICBzdGFyc0NvbnRhaW5lciA9ICd0cC13aWRnZXQtc3RhcnMnLFxuICBzdGFyc0NvbG9yXG4pID0+IHtcbiAgY29uc3Qgc2FuaXRpemVkQ29sb3IgPSBzYW5pdGl6ZUNvbG9yKHN0YXJzQ29sb3IpO1xuICBjb25zdCBjb250YWluZXIgPVxuICAgIHR5cGVvZiBzdGFyc0NvbnRhaW5lciA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdGFyc0NvbnRhaW5lcikgOiBzdGFyc0NvbnRhaW5lcjtcblxuICAvLyBFbnN1cmUgd2UgcHJvcGVybHkgaGFuZGxlIGVtcHR5IHJldmlldyBzdGF0ZSAtIHdlIHNvbWV0aW1lcyBnZXQgYSByYXRpbmdcbiAgLy8gYmFjayBmcm9tIHRoZSBBUEkgZXZlbiB3aGVyZSB3ZSBoYXZlIG5vIHJldmlld3MsIHNvIGV4cGxpY2l0bHkgY2hlY2suXG4gIGNvbnN0IGRpc3BsYXllZFN0YXJzID0gdG90YWwgPyBzdGFycyA6IDA7XG5cbiAgcG9wdWxhdGVFbGVtZW50cyhbXG4gICAge1xuICAgICAgZWxlbWVudDogY29udGFpbmVyLFxuICAgICAgc3RyaW5nOiBtYWtlU3RhcnMoeyBudW06IGRpc3BsYXllZFN0YXJzLCB0cnVzdFNjb3JlLCBjb2xvcjogc2FuaXRpemVkQ29sb3IgfSksXG4gICAgfSxcbiAgXSk7XG59O1xuXG5leHBvcnQgeyBtYWtlU3RhcnMsIHBvcHVsYXRlU3RhcnMgfTtcbiIsImltcG9ydCB7XG4gIGZldGNoRGF0YSxcbiAgbXVsdGlGZXRjaERhdGEsXG4gIGNvbnN0cnVjdFRydXN0Qm94QW5kQ29tcGxldGUsXG4gIGhhc1NlcnZpY2VSZXZpZXdzLFxuICBoYXNTZXJ2aWNlUmV2aWV3c011bHRpRmV0Y2gsXG59IGZyb20gJy4vZmV0Y2hEYXRhJztcbmltcG9ydCB7XG4gIGZldGNoUHJvZHVjdERhdGEsXG4gIGZldGNoUHJvZHVjdFJldmlld1xufSBmcm9tICcuL3Byb2R1Y3RSZXZpZXdzJztcblxuY29uc3QgZmV0Y2hTZXJ2aWNlUmV2aWV3RGF0YSA9ICh0ZW1wbGF0ZUlkKSA9PiAoZmV0Y2hQYXJhbXMsIGNvbnN0cnVjdFRydXN0Qm94LCBwYXNzVG9Qb3B1cCkgPT4ge1xuICBmZXRjaERhdGEoYC90cnVzdGJveC1kYXRhLyR7dGVtcGxhdGVJZH1gKShcbiAgICBmZXRjaFBhcmFtcyxcbiAgICBjb25zdHJ1Y3RUcnVzdEJveCxcbiAgICBwYXNzVG9Qb3B1cCxcbiAgICBoYXNTZXJ2aWNlUmV2aWV3c1xuICApO1xufTtcblxuY29uc3QgZmV0Y2hTZXJ2aWNlUmV2aWVNdWx0aXBsZURhdGEgPSAodGVtcGxhdGVJZCkgPT4gKFxuICBmZXRjaFBhcmFtcyxcbiAgY29uc3RydWN0VHJ1c3RCb3gsXG4gIHBhc3NUb1BvcHVwXG4pID0+IHtcbiAgbXVsdGlGZXRjaERhdGEoYC90cnVzdGJveC1kYXRhLyR7dGVtcGxhdGVJZH1gKShcbiAgICBmZXRjaFBhcmFtcyxcbiAgICBjb25zdHJ1Y3RUcnVzdEJveCxcbiAgICBwYXNzVG9Qb3B1cCxcbiAgICBoYXNTZXJ2aWNlUmV2aWV3c011bHRpRmV0Y2hcbiAgKTtcbn07XG5cbmV4cG9ydCB7XG4gIGZldGNoUHJvZHVjdERhdGEsXG4gIGZldGNoUHJvZHVjdFJldmlldyxcbiAgY29uc3RydWN0VHJ1c3RCb3hBbmRDb21wbGV0ZSxcbiAgZmV0Y2hTZXJ2aWNlUmV2aWV3RGF0YSxcbiAgZmV0Y2hTZXJ2aWNlUmV2aWVNdWx0aXBsZURhdGEsXG59O1xuIiwiaW1wb3J0IHhociBmcm9tICcuLi94aHInO1xuaW1wb3J0IHsgZ2V0QXNPYmplY3QgYXMgZ2V0UXVlcnlzdHJpbmdBc09iamVjdCB9IGZyb20gJy4uL3F1ZXJ5U3RyaW5nJztcbmltcG9ydCBnZXRXaWRnZXRSb290VXJpIGZyb20gJy4uL3Jvb3RVcmknO1xuXG4vLyBNYWtlIGEgcmFuZG9tIElEIHdoZXJlIGFuIGFwaUNhbGwgcmVxdWlyZXMgb25lLlxuY29uc3QgbWFrZUlkID0gKG51bU9mQ2hhcnMpID0+IHtcbiAgbGV0IHRleHQgPSAnJztcbiAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mQ2hhcnM7IGkrKykge1xuICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuICB9XG4gIHJldHVybiB0ZXh0O1xufTtcblxuLyogZXNsaW50LWRpc2FibGUgY29tcGF0L2NvbXBhdCAqL1xuY29uc3QgYXBpQ2FsbCA9ICh1cmksIHBhcmFtcykgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIGZhaWwpID0+IHtcbiAgICBsZXQgdmFsdWVzO1xuICAgIGxldCB1cmw7XG5cbiAgICBpZiAodXJpLmluZGV4T2YoJy8nKSA9PT0gMCkge1xuICAgICAgdmFsdWVzID0gcGFyYW1zIHx8IHt9O1xuICAgICAgY29uc3QgeyB0b2tlbiB9ID0gZ2V0UXVlcnlzdHJpbmdBc09iamVjdCgpO1xuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHZhbHVlcy5yYW5kb20gPSBtYWtlSWQoMjApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1cmkuaW5kZXhPZignaHR0cCcpID09PSAwKSB7XG4gICAgICAvLyBpcyBhIGZ1bGwgdXJsIGZyb20gYSBwYWdpbmcgbGluaywgZW5zdXJlIGh0dHBzXG4gICAgICB1cmwgPSB1cmkucmVwbGFjZSgvXmh0dHBzPzovLCAnaHR0cHM6Jyk7XG4gICAgfSBlbHNlIGlmICh1cmkuaW5kZXhPZignLycpID09PSAwKSB7XG4gICAgICAvLyBpcyBhIHJlZ3VsYXIgXCIvdjEvLi4uXCIgYWRkIGRvbWFpbiBmb3IgbG9jYWwgdGVzdGluZyAodmFsdWUgaXMgZW1wdHkgaW4gcHJvZClcbiAgICAgIHVybCA9IGdldFdpZGdldFJvb3RVcmkoKSArIHVyaTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2VpcmQvYnJva2VuIHVybFxuICAgICAgcmV0dXJuIGZhaWwoKTtcbiAgICB9XG5cbiAgICByZXR1cm4geGhyKHtcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IHZhbHVlcyxcbiAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXG4gICAgICBlcnJvcjogZmFpbCxcbiAgICB9KTtcbiAgfSk7XG5cbmV4cG9ydCB7IGFwaUNhbGwgfTtcbi8qIGVzbGludC1lbmFibGUgY29tcGF0L2NvbXBhdCAqL1xuIiwiLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgKi9cblxuZnVuY3Rpb24gaXNJRSgpIHtcbiAgY29uc3QgbXlOYXYgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBteU5hdi5pbmRleE9mKCdtc2llJykgIT09IC0xID8gcGFyc2VJbnQobXlOYXYuc3BsaXQoJ21zaWUnKVsxXSkgOiBmYWxzZTtcbn1cblxuLy8gYWRhcHRlZCAoc3RvbGVuKSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS90b2RkbW90dG8vYXRvbWljXG5cbmZ1bmN0aW9uIHBhcnNlKHJlcSkge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHJlcS5yZXNwb25zZVRleHQ7XG4gIH1cbn1cblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTcxNDg5OVxuZnVuY3Rpb24gdG9RdWVyeVN0cmluZyhvYmopIHtcbiAgY29uc3Qgc3RyID0gW107XG4gIGZvciAoY29uc3QgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICBzdHIucHVzaChgJHtlbmNvZGVVUklDb21wb25lbnQocCl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSl9YCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3QocGFyYW1zKSB7XG4gIGNvbnN0IFhNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0IHx8IEFjdGl2ZVhPYmplY3Q7XG4gIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoJ01TWE1MMi5YTUxIVFRQLjMuMCcpO1xuICByZXF1ZXN0Lm9wZW4ocGFyYW1zLnR5cGUsIHBhcmFtcy51cmwsIHRydWUpO1xuICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDMwMCkge1xuICAgICAgICBwYXJhbXMuc3VjY2VzcyhwYXJzZShyZXF1ZXN0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMuZXJyb3IocGFyc2UocmVxdWVzdCkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXF1ZXN0LnNlbmQocGFyYW1zLmRhdGEpO1xufVxuXG4vKiBJRTktY29tcGF0aWJsZSByZXF1ZXN0IGZ1bmN0aW9uLlxuXG5JRTkgZG9lcyBub3QgcGVybWl0IGNyb3NzLW9yaWdpbiBIVFRQIHJlcXVlc3RzIGluIHRoZSB1c3VhbCB3YXkuIEl0IGFsc28gZG9lc1xubm90IHBlcm1pdCBhIHJlcXVlc3QgdG8gYmUgbWFkZSB0byBhIFVSSSB3aXRoIGEgZGlmZmVyZW50IHByb3RvY29sIGZyb20gdGhhdFxub2YgdGhlIHBhZ2UsIGUuZy4gYW4gSFRUUFMgcmVxdWVzdCBmcm9tIGFuIEhUVFAgcGFnZS5cblxuVGhpcyBmdW5jdGlvbiBtYWtlcyByZXF1ZXN0cyBpbiBhIG1hbm5lciBjb21wYXRpYmxlIHdpdGggSUU5J3MgbGltaXRhdGlvbnMuXG4qL1xuZnVuY3Rpb24gbWFrZVJlcXVlc3RJRShwYXJhbXMpIHtcbiAgY29uc3QgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgY29uc3QgcHJvdG9jb2wgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2w7XG4gIHBhcmFtcy51cmwgPSBwYXJhbXMudXJsLnJlcGxhY2UoL2h0dHBzPzovLCBwcm90b2NvbCk7XG4gIHJlcXVlc3Qub3BlbihwYXJhbXMudHlwZSwgcGFyYW1zLnVybCk7XG4gIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIHBhcmFtcy5zdWNjZXNzKHBhcnNlKHJlcXVlc3QpKTtcbiAgfTtcbiAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgIHBhcmFtcy5lcnJvcihwYXJzZShyZXF1ZXN0KSk7XG4gIH07XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcmVxdWVzdC5zZW5kKHBhcmFtcy5kYXRhKTtcbiAgfSwgMCk7XG59XG5cbmZ1bmN0aW9uIHhocihvcHRpb25zKSB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICB0eXBlOiBvcHRpb25zLnR5cGUgfHwgJ0dFVCcsXG4gICAgZXJyb3I6IG9wdGlvbnMuZXJyb3IgfHwgbm9vcCxcbiAgICBzdWNjZXNzOiBvcHRpb25zLnN1Y2Nlc3MgfHwgbm9vcCxcbiAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgdXJsOiBvcHRpb25zLnVybCB8fCAnJyxcbiAgfTtcblxuICBpZiAocGFyYW1zLnR5cGUgPT09ICdHRVQnICYmIHBhcmFtcy5kYXRhKSB7XG4gICAgcGFyYW1zLnVybCA9IGAke3BhcmFtcy51cmx9PyR7dG9RdWVyeVN0cmluZyhwYXJhbXMuZGF0YSl9YDtcbiAgICBkZWxldGUgcGFyYW1zLmRhdGE7XG4gIH1cblxuICBpZiAoaXNJRSgpICYmIGlzSUUoKSA8PSA5KSB7XG4gICAgbWFrZVJlcXVlc3RJRShwYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIG1ha2VSZXF1ZXN0KHBhcmFtcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgeGhyO1xuIiwiLy8gVGhpcyB3aWxsIGJlIHN1YnN0aXR1dGVkIHdpdGhpbiB0aGUgYnVpbGRzY3JpcHRzLCBzbyBkb24ndCBjaGFuZ2UgdGhpcyFcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaG9zdCA9ICcje1dpZGdldEFwaS5Ib3N0fSc7XG4gIHJldHVybiBob3N0LmluZGV4T2YoJyMnKSA9PT0gMCA/ICdodHRwczovL3dpZGdldC50cC1zdGFnaW5nLmNvbScgOiBob3N0O1xufVxuIiwiaW1wb3J0IHsgYXBpQ2FsbCB9IGZyb20gJy4vY2FsbCc7XG5pbXBvcnQgeyBnZXRPblBhZ2VSZWFkeSwgc2hvd1RydXN0Qm94IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgd2l0aExvYWRlciB9IGZyb20gJy4uL3RlbXBsYXRlcy9sb2FkZXInO1xuaW1wb3J0IHsgZXJyb3JGYWxsYmFjaywgcmVtb3ZlRXJyb3JGYWxsYmFjayB9IGZyb20gJy4uL3RlbXBsYXRlcy9lcnJvckZhbGxiYWNrJztcbmltcG9ydCB7IHNldExpc3RlbmVyLCBpc0xvYWRlZE1lc3NhZ2UsIHNlbmRBUElEYXRhTWVzc2FnZSB9IGZyb20gJy4uL2NvbW11bmljYXRpb24nO1xuaW1wb3J0IHsgbWFwT2JqZWN0LCBwcm9taXNlQWxsT2JqZWN0LCByZWplY3ROdWxsYXJ5VmFsdWVzIH0gZnJvbSAnLi4vZm4nO1xuXG4vKipcbiAqIERlZmluZSBhIHVuaXF1ZSBzaW5nbGUgZmV0Y2ggb2JqZWN0IGtleSwgYWxsb3dpbmcgdXMgdG8gZmxhdHRlbiBiYWNrIHRvIGFcbiAqIHNpbmdsZSBzZXQgb2YgYmFzZSBkYXRhLiBUaGlzIGlzIGFyYml0cmFyeSwgYW5kIGhhcyBiZWVuIHNlbGVjdGVkIHRvIGVuc3VyZVxuICogaXQgd2lsbCBub3QgYmUgYWNjaWRlbnRhbGx5IHVzZWQgaW4gYSBmZXRjaFBhcmFtc09iamVjdC5cbiAqL1xuY29uc3Qgc2luZ2xlRmV0Y2hPYmplY3RLZXkgPSAnZGVmYXVsdF9zaW5nbGVGZXRjaF9mOThhYzc3Yic7XG5cbi8qKlxuICogRmxhdHRlbiBhIGZldGNoUGFyYW1zT2JqZWN0IHZhbHVlIHRvIG9uZSBzaW5nbGUgc2V0IG9mIGZldGNoUGFyYW1zLCB3aGVyZVxuICogdGhhdCBvYmplY3QgY29udGFpbnMgb25seSBvbmUgdmFsdWUsIGFuZCBpdCBpcyBpbmRleGVkIGJ5XG4gKiBzaW5nbGVGZXRjaE9iamVjdEtleS5cbiAqL1xuY29uc3QgZmxhdHRlblNpbmdsZVBhcmFtcyA9IChmZXRjaFBhcmFtc09iamVjdCkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZmV0Y2hQYXJhbXNPYmplY3QpO1xuICByZXR1cm4gc2luZ2xlRmV0Y2hPYmplY3RLZXkgaW4gZmV0Y2hQYXJhbXNPYmplY3QgJiYga2V5cy5sZW5ndGggPT09IDFcbiAgICA/IGZldGNoUGFyYW1zT2JqZWN0W3NpbmdsZUZldGNoT2JqZWN0S2V5XVxuICAgIDogZmV0Y2hQYXJhbXNPYmplY3Q7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGJ1c2luZXNzIGhhcyBzZXJ2aWNlIHJldmlld3NcbiAqL1xuY29uc3QgaGFzU2VydmljZVJldmlld3MgPSAoe1xuICBidXNpbmVzc0VudGl0eToge1xuICAgIG51bWJlck9mUmV2aWV3czogeyB0b3RhbCB9LFxuICB9LFxufSkgPT4gdG90YWwgPiAwO1xuXG4vKipcbiAqIENoZWNrIGlmIGEgYnVzaW5lc3MgaGFzIHNlcnZpY2UgcmV2aWV3cyB1c2luZyBtdWx0aS1mZXRjaC5cbiAqXG4gKiBUaGlzIGNoZWNrcyB0aGF0IGFueSBvZiB0aGUgYmFzZSBkYXRhIHNldHMgaGFzIHNlcnZpY2UgcmV2aWV3cyBwcmVzZW50XG4gKiB3aXRoaW4gaXQuXG4gKi9cbmNvbnN0IGhhc1NlcnZpY2VSZXZpZXdzTXVsdGlGZXRjaCA9IChiYXNlRGF0YSkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYmFzZURhdGEpO1xuICByZXR1cm4ga2V5cy5zb21lKChrKSA9PiBoYXNTZXJ2aWNlUmV2aWV3cyhiYXNlRGF0YVtrXSkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBidXNpbmVzcyBoYXMgaW1wb3J0ZWQgb3IgcmVndWxhciBwcm9kdWN0IHJldmlld3NcbiAqL1xuY29uc3QgaGFzUHJvZHVjdFJldmlld3MgPSAoeyBwcm9kdWN0UmV2aWV3c1N1bW1hcnksIGltcG9ydGVkUHJvZHVjdFJldmlld3NTdW1tYXJ5IH0pID0+IHtcbiAgY29uc3QgdG90YWxQcm9kdWN0UmV2aWV3cyA9IHByb2R1Y3RSZXZpZXdzU3VtbWFyeVxuICAgID8gcHJvZHVjdFJldmlld3NTdW1tYXJ5Lm51bWJlck9mUmV2aWV3cy50b3RhbFxuICAgIDogMDtcbiAgY29uc3QgdG90YWxJbXBvcnRlZFByb2R1Y3RSZXZpZXdzID0gaW1wb3J0ZWRQcm9kdWN0UmV2aWV3c1N1bW1hcnlcbiAgICA/IGltcG9ydGVkUHJvZHVjdFJldmlld3NTdW1tYXJ5Lm51bWJlck9mUmV2aWV3cy50b3RhbFxuICAgIDogMDtcblxuICByZXR1cm4gdG90YWxQcm9kdWN0UmV2aWV3cyArIHRvdGFsSW1wb3J0ZWRQcm9kdWN0UmV2aWV3cyA+IDA7XG59O1xuXG4vLyBDb25zdHJ1Y3QgYSBiYXNlIGRhdGEgY2FsbCBwcm9taXNlLlxuY29uc3QgYmFzZURhdGFDYWxsID0gKHVyaSkgPT4gKHsgYnVzaW5lc3NVbml0SWQsIGxvY2FsZSwgLi4ub3B0cyB9KSA9PiB7XG4gIGNvbnN0IGJhc2VEYXRhUGFyYW1zID0gcmVqZWN0TnVsbGFyeVZhbHVlcyh7XG4gICAgYnVzaW5lc3NVbml0SWQsXG4gICAgbG9jYWxlLFxuICAgIC4uLm9wdHMsXG4gICAgdGhlbWU6IG51bGwsIC8vIEZvcmNlIHJlamVjdGlvbiBvZiB0aGUgdGhlbWUgcGFyYW1cbiAgfSk7XG4gIHJldHVybiBhcGlDYWxsKHVyaSwgYmFzZURhdGFQYXJhbXMpO1xufTtcblxuLyoqXG4gKiBDYWxsIGEgY29uc3RydWN0VHJ1c3RCb3ggY2FsbGJhY2ssIGFuZCB0aGVuIGNvbXBsZXRlIHRoZSBsb2FkaW5nIHByb2Nlc3NcbiAqIGZvciB0aGUgVHJ1c3RCb3guXG4gKi9cbmNvbnN0IGNvbnN0cnVjdFRydXN0Qm94QW5kQ29tcGxldGUgPSAoXG4gIGNvbnN0cnVjdFRydXN0Qm94LFxuICBwYXNzVG9Qb3B1cCA9IGZhbHNlLFxuICBoYXNSZXZpZXdzRnJvbUJhc2VEYXRhID0gaGFzU2VydmljZVJldmlld3NcbikgPT4gKHsgYmFzZURhdGEsIGxvY2FsZSwgdGhlbWUsIGhhc01vcmVSZXZpZXdzLCBsb2FkTW9yZVJldmlld3MgfSkgPT4ge1xuICBjb25zdCBoYXNSZXZpZXdzID0gaGFzUmV2aWV3c0Zyb21CYXNlRGF0YShiYXNlRGF0YSk7XG5cbiAgY29uc3RydWN0VHJ1c3RCb3goe1xuICAgIGJhc2VEYXRhLFxuICAgIGxvY2FsZSxcbiAgICBoYXNNb3JlUmV2aWV3cyxcbiAgICBsb2FkTW9yZVJldmlld3MsXG4gIH0pO1xuXG4gIC8vIENvbmRpdGlvbmFsbHkgc2VuZCB0byBwb3B1cFxuICBjb25zdCBzZW5kT25Qb3B1cExvYWQgPSAoeyBkYXRhOiBldmVudCB9KSA9PiB7XG4gICAgaWYgKGlzTG9hZGVkTWVzc2FnZShldmVudCkpIHtcbiAgICAgIHNlbmRBUElEYXRhTWVzc2FnZSh7XG4gICAgICAgIGJhc2VEYXRhLFxuICAgICAgICBsb2NhbGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGlmIChwYXNzVG9Qb3B1cCkge1xuICAgIHNldExpc3RlbmVyKHNlbmRPblBvcHVwTG9hZCk7XG4gIH1cblxuICBzaG93VHJ1c3RCb3godGhlbWUsIGhhc1Jldmlld3MpO1xuICByZW1vdmVFcnJvckZhbGxiYWNrKCk7XG59O1xuXG4vKipcbiAqIEZldGNoIGRhdGEgZnJvbSB0aGUgZGF0YSBBUEksIG1ha2luZyB6ZXJvIG9yIG1vcmUgcmVxdWVzdHMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuIG9iamVjdCB3aXRoIGFyYml0cmFyeSBrZXlzLCBhbmQgdmFsdWVzIHdoaWNoIGFyZVxuICogZWFjaCBhbiBvYmplY3QgY29udGFpbmluZyBxdWVyeSBwYXJhbXMgZm9yIG9uZSByZXF1ZXN0LiBBIHJlcXVlc3QgaXMgbWFkZVxuICogZm9yIGVhY2ggcXVlcnkgcGFyYW0gb2JqZWN0LCBhbmQgdGhlIHJlc3VsdCBpcyB3cmFwcGVkIHdpdGhpbiBhbiBvYmplY3RcbiAqIGluZGV4ZWQgYnkgdGhlIGtleXMgb2YgdGhlIG9yaWdpbmFsIGFyZ3VtZW50IG9iamVjdC5cbiAqXG4gKiBUaGVzZSBkYXRhLCB0b2dldGhlciB3aXRoIGxvY2FsZSBkYXRhLCBhcmUgcGFzc2VkIHRvIHRoZVxuICogY29uc3RydWN0VHJ1c3RCb3ggY2FsbGJhY2suXG4gKlxuICogQW4gb3B0aW9uYWwgYXJndW1lbnQsIHBhc3NUb1BvcHVwLCBjYW4gYmUgcHJvdmlkZWQgdG8gdGhpcyBmdW5jdGlvbi4gSWYgc2V0XG4gKiB0byBhIHRydXRoeSB2YWx1ZSwgdGhpcyBmdW5jdGlvbiB3aWxsIGF0dGVtcHQgdG8gcGFzcyB0aGUgZGF0YSBvYnRhaW5lZCB0b1xuICogYW55IHBvcHVwIGlmcmFtZS5cbiAqL1xuY29uc3QgbXVsdGlGZXRjaERhdGEgPSAodXJpKSA9PiAoXG4gIGZldGNoUGFyYW1zT2JqZWN0LFxuICBjb25zdHJ1Y3RUcnVzdEJveCxcbiAgcGFzc1RvUG9wdXAsXG4gIGhhc1Jldmlld3NGcm9tQmFzZURhdGFcbikgPT4ge1xuICBjb25zdCBmaXJzdEZldGNoUGFyYW1zID0gZmV0Y2hQYXJhbXNPYmplY3RbT2JqZWN0LmtleXMoZmV0Y2hQYXJhbXNPYmplY3QpWzBdXTtcbiAgY29uc3QgeyBsb2NhbGUsIHRoZW1lID0gJ2xpZ2h0JyB9ID0gZmlyc3RGZXRjaFBhcmFtcztcblxuICBjb25zdCBiYXNlRGF0YVByb21pc2VzID0gcHJvbWlzZUFsbE9iamVjdChtYXBPYmplY3QoYmFzZURhdGFDYWxsKHVyaSksIGZldGNoUGFyYW1zT2JqZWN0KSk7XG4gIGNvbnN0IHJlYWR5UHJvbWlzZSA9IGdldE9uUGFnZVJlYWR5KCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBhdC9jb21wYXRcbiAgY29uc3QgZmV0Y2hQcm9taXNlID0gUHJvbWlzZS5hbGwoW2Jhc2VEYXRhUHJvbWlzZXMsIHJlYWR5UHJvbWlzZV0pXG4gICAgLnRoZW4oKFtvcmlnaW5hbEJhc2VEYXRhXSkgPT4ge1xuICAgICAgY29uc3QgYmFzZURhdGEgPSBmbGF0dGVuU2luZ2xlUGFyYW1zKG9yaWdpbmFsQmFzZURhdGEpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYXNlRGF0YSxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICB0aGVtZSxcbiAgICAgIH07XG4gICAgfSlcbiAgICAudGhlbihjb25zdHJ1Y3RUcnVzdEJveEFuZENvbXBsZXRlKGNvbnN0cnVjdFRydXN0Qm94LCBwYXNzVG9Qb3B1cCwgaGFzUmV2aWV3c0Zyb21CYXNlRGF0YSkpXG4gICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICBpZiAoZSAmJiBlLkZhbGxiYWNrTG9nbykge1xuICAgICAgICAvLyByZW5kZXIgZmFsbGJhY2sgb25seSBpZiBhbGxvd2VkLCBiYXNlZCBvbiB0aGUgcmVzcG9uc2VcbiAgICAgICAgcmV0dXJuIGVycm9yRmFsbGJhY2soKTtcbiAgICAgIH1cbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9KTtcblxuICB3aXRoTG9hZGVyKGZldGNoUHJvbWlzZSk7XG59O1xuXG4vLyBGZXRjaCBhbmQgc3RydWN0dXJlIEFQSSBkYXRhLlxuY29uc3QgZmV0Y2hEYXRhID0gKHVyaSkgPT4gKFxuICBmZXRjaFBhcmFtcyxcbiAgY29uc3RydWN0VHJ1c3RCb3gsXG4gIHBhc3NUb1BvcHVwLFxuICBoYXNSZXZpZXdzRnJvbUJhc2VEYXRhXG4pID0+IHtcbiAgY29uc3QgZmV0Y2hQYXJhbXNPYmplY3QgPSB7IFtzaW5nbGVGZXRjaE9iamVjdEtleV06IGZldGNoUGFyYW1zIH07XG4gIG11bHRpRmV0Y2hEYXRhKHVyaSkoZmV0Y2hQYXJhbXNPYmplY3QsIGNvbnN0cnVjdFRydXN0Qm94LCBwYXNzVG9Qb3B1cCwgaGFzUmV2aWV3c0Zyb21CYXNlRGF0YSk7XG59O1xuXG5leHBvcnQge1xuICBmZXRjaERhdGEsXG4gIG11bHRpRmV0Y2hEYXRhLFxuICBjb25zdHJ1Y3RUcnVzdEJveEFuZENvbXBsZXRlLFxuICBoYXNTZXJ2aWNlUmV2aWV3cyxcbiAgaGFzU2VydmljZVJldmlld3NNdWx0aUZldGNoLFxuICBoYXNQcm9kdWN0UmV2aWV3cyxcbn07XG4iLCJpbXBvcnQgeyBhZGRFdmVudExpc3RlbmVyIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IHdwYXJlbnQgPSB3aW5kb3cucGFyZW50O1xuY29uc3QgbWVzc2FnZVF1ZXVlID0gW107XG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgY29tbWFuZDogJ2NyZWF0ZUlGcmFtZScsXG4gIHBvc2l0aW9uOiAnY2VudGVyIHRvcCcsXG4gIHNob3c6IGZhbHNlLFxuICBzb3VyY2U6ICdwb3B1cC5odG1sJyxcbiAgcXVlcnlTdHJpbmc6ICcnLFxufTtcbmNvbnN0IHBvcHVwT3B0aW9ucyA9IHtcbiAgbmFtZTogJ3BvcHVwJyxcbiAgbW9kYWw6IGZhbHNlLFxuICBzdHlsZXM6IHtcbiAgICBoZWlnaHQ6ICczMDBweCcsXG4gICAgd2lkdGg6ICcnLFxuICB9LFxufTtcbmNvbnN0IG1vZGFsT3B0aW9ucyA9IHtcbiAgbmFtZTogJ21vZGFsJyxcbiAgbW9kYWw6IHRydWUsXG4gIHN0eWxlczoge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgbGVmdDogJzAnLFxuICAgIHJpZ2h0OiAnMCcsXG4gICAgdG9wOiAnMCcsXG4gICAgYm90dG9tOiAnMCcsXG4gICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICB6aW5kZXg6IDk5LFxuICB9LFxufTtcblxubGV0IGlkID0gbnVsbDtcbmNvbnN0IGxpc3RlbmVyQ2FsbGJhY2tzID0gW107XG5cbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgaWYgKGlkKSB7XG4gICAgbWVzc2FnZS53aWRnZXRJZCA9IGlkO1xuICAgIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTsgLy8gVGhpcyBpcyB0byBtYWtlIGl0IElFOCBjb21wYXRpYmxlXG4gICAgd3BhcmVudC5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VRdWV1ZS5wdXNoKG1lc3NhZ2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNlbmRNZXNzYWdlVG8odGFyZ2V0KSB7XG4gIHJldHVybiAobWVzc2FnZSwgcGF5bG9hZCA9IHt9KSA9PlxuICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgIC4uLnBheWxvYWQsXG4gICAgICBtZXNzYWdlLFxuICAgICAgY29tbWFuZDogJ21lc3NhZ2UnLFxuICAgICAgbmFtZTogdGFyZ2V0LFxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kUXVldWUoKSB7XG4gIHdoaWxlIChtZXNzYWdlUXVldWUubGVuZ3RoKSB7XG4gICAgc2VuZE1lc3NhZ2UobWVzc2FnZVF1ZXVlLnBvcCgpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQb3B1cElmcmFtZShvcHRpb25zKSB7XG4gIHNlbmRNZXNzYWdlKHtcbiAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAuLi5wb3B1cE9wdGlvbnMsXG4gICAgLi4ub3B0aW9ucyxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZGFsSWZyYW1lKG9wdGlvbnMpIHtcbiAgc2VuZE1lc3NhZ2Uoe1xuICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgIC4uLm1vZGFsT3B0aW9ucyxcbiAgICAuLi5vcHRpb25zLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGVzKHN0eWxlcywgb3B0aW9uYWxJZnJhbWVOYW1lKSB7XG4gIHNlbmRNZXNzYWdlKHsgY29tbWFuZDogJ3NldFN0eWxlJywgbmFtZTogb3B0aW9uYWxJZnJhbWVOYW1lLCBzdHlsZTogc3R5bGVzIH0pO1xufVxuXG5mdW5jdGlvbiBzaG93SWZyYW1lKGlmcmFtZU5hbWUpIHtcbiAgc2VuZE1lc3NhZ2UoeyBjb21tYW5kOiAnc2hvdycsIG5hbWU6IGlmcmFtZU5hbWUgfSk7XG4gIHNlbmRNZXNzYWdlVG8oJ21haW4nKShgJHtpZnJhbWVOYW1lfSB0b2dnbGVkYCwgeyB2aXNpYmxlOiB0cnVlIH0pO1xufVxuXG5mdW5jdGlvbiBoaWRlSWZyYW1lKGlmcmFtZU5hbWUpIHtcbiAgc2VuZE1lc3NhZ2UoeyBjb21tYW5kOiAnaGlkZScsIG5hbWU6IGlmcmFtZU5hbWUgfSk7XG4gIHNlbmRNZXNzYWdlVG8oJ21haW4nKShgJHtpZnJhbWVOYW1lfSB0b2dnbGVkYCwgeyB2aXNpYmxlOiBmYWxzZSB9KTtcbn1cblxuZnVuY3Rpb24gZm9jdXNJZnJhbWUoaWZyYW1lTmFtZSkge1xuICBzZW5kTWVzc2FnZSh7IGNvbW1hbmQ6ICdmb2N1cycsIG5hbWU6IGlmcmFtZU5hbWUgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbmRMb2FkZWRNZXNzYWdlKCkge1xuICBzZW5kTWVzc2FnZSh7IGNvbW1hbmQ6ICdsb2FkZWQnIH0pO1xufVxuXG5mdW5jdGlvbiBpc0xvYWRlZE1lc3NhZ2UobWVzc2FnZSkge1xuICByZXR1cm4gbWVzc2FnZSA9PT0gJ2xvYWRlZCc7XG59XG5cbi8qKlxuICogU2VuZCBkYXRhIG9idGFpbmVkIGZyb20gYW4gQVBJIGNhbGwgdG8gYSBwb3B1cCBpZnJhbWUuXG4gKi9cbmZ1bmN0aW9uIHNlbmRBUElEYXRhTWVzc2FnZShkYXRhKSB7XG4gIHNlbmRNZXNzYWdlVG8oJ3BvcHVwJykoJ0FQSSBkYXRhJywgZGF0YSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiB0d28gbWVzc2FnZXMgYXJlIG9mIHRoZSBzYW1lIHR5cGUuXG4gKlxuICogSWdub3JlcyBhbnkgYWRkaXRpb25hbCBkYXRhIGNvbnRhaW5lZCB3aXRoaW4gdGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGFyZU1hdGNoaW5nTWVzc2FnZXMobWVzc2FnZSwgb3RoZXJNZXNzYWdlKSB7XG4gIHJldHVybiBbJ21lc3NhZ2UnLCAnY29tbWFuZCcsICduYW1lJ10uZXZlcnkoXG4gICAgKGtleSkgPT4gbWVzc2FnZVtrZXldICYmIG90aGVyTWVzc2FnZVtrZXldICYmIG1lc3NhZ2Vba2V5XSA9PT0gb3RoZXJNZXNzYWdlW2tleV1cbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNBUElEYXRhTWVzc2FnZShtZXNzYWdlKSB7XG4gIHJldHVybiBhcmVNYXRjaGluZ01lc3NhZ2VzKG1lc3NhZ2UsIHtcbiAgICBjb21tYW5kOiAnbWVzc2FnZScsXG4gICAgbmFtZTogJ3BvcHVwJyxcbiAgICBtZXNzYWdlOiAnQVBJIGRhdGEnLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gaXNQb3B1cFRvZ2dsZU1lc3NhZ2UobWVzc2FnZSkge1xuICByZXR1cm4gYXJlTWF0Y2hpbmdNZXNzYWdlcyhtZXNzYWdlLCB7XG4gICAgY29tbWFuZDogJ21lc3NhZ2UnLFxuICAgIG5hbWU6ICdtYWluJyxcbiAgICBtZXNzYWdlOiAncG9wdXAgdG9nZ2xlZCcsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRDYWxsYmFja0Z1bmN0aW9uKGZ1bmMpIHtcbiAgbGlzdGVuZXJDYWxsYmFja3MucHVzaChmdW5jKTtcbn1cblxuZnVuY3Rpb24gaGlkZU1haW5JZnJhbWUoKSB7XG4gIGhpZGVJZnJhbWUoJ21haW4nKTtcbn1cblxuZnVuY3Rpb24gc2hvd1BvcHVwSWZyYW1lKCkge1xuICBzaG93SWZyYW1lKCdwb3B1cCcpO1xufVxuXG5mdW5jdGlvbiBoaWRlUG9wdXBJZnJhbWUoKSB7XG4gIGhpZGVJZnJhbWUoJ3BvcHVwJyk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzUG9wdXBJZnJhbWUoKSB7XG4gIGZvY3VzSWZyYW1lKCdwb3B1cCcpO1xufVxuXG5mdW5jdGlvbiBzaG93TW9kYWxJZnJhbWUoKSB7XG4gIHNob3dJZnJhbWUoJ21vZGFsJyk7XG59XG5cbmZ1bmN0aW9uIGhpZGVNb2RhbElmcmFtZSgpIHtcbiAgaGlkZUlmcmFtZSgnbW9kYWwnKTtcbn1cblxuZnVuY3Rpb24gZm9jdXNNb2RhbElmcmFtZSgpIHtcbiAgZm9jdXNJZnJhbWUoJ21vZGFsJyk7XG59XG5cbmNvbnN0IHNlbmRQaW5nID0gKCkgPT4gc2VuZE1lc3NhZ2UoeyBjb21tYW5kOiAncGluZycgfSk7XG5cbmNvbnN0IG9uUG9uZyA9IChjYikgPT4ge1xuICBjb25zdCBwb25nID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRhdGEuY29tbWFuZCA9PT0gJ3BvbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FsbGJhY2stcmV0dXJuXG4gICAgICBjYihldmVudCk7XG4gICAgfVxuICB9O1xuICBhZGRDYWxsYmFja0Z1bmN0aW9uKHBvbmcpO1xufTtcblxuZnVuY3Rpb24gcmVzaXplSGVpZ2h0KG9wdGlvbmFsSGVpZ2h0LCBvcHRpb25hbElmcmFtZU5hbWUpIHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gIHNlbmRNZXNzYWdlKHtcbiAgICBjb21tYW5kOiAncmVzaXplLWhlaWdodCcsXG4gICAgbmFtZTogb3B0aW9uYWxJZnJhbWVOYW1lLFxuICAgIGhlaWdodDogb3B0aW9uYWxIZWlnaHQgfHwgYm9keS5vZmZzZXRIZWlnaHQsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxUb1RydXN0Qm94KHRhcmdldHMpIHtcbiAgc2VuZE1lc3NhZ2Uoe1xuICAgIGNvbW1hbmQ6ICdzY3JvbGxUbycsXG4gICAgdGFyZ2V0cyxcbiAgfSk7XG59XG5cbmFkZEV2ZW50TGlzdGVuZXIod2luZG93LCAnbWVzc2FnZScsIGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAodHlwZW9mIGV2ZW50LmRhdGEgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGU7XG4gIHRyeSB7XG4gICAgZSA9IHsgZGF0YTogSlNPTi5wYXJzZShldmVudC5kYXRhKSB9OyAvLyBUaGlzIGlzIHRvIG1ha2UgaXQgSUU4IGNvbXBhdGlibGVcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybjsgLy8gcHJvYmFibHkgbm90IGZvciB1c1xuICB9XG5cbiAgaWYgKGUuZGF0YS5jb21tYW5kID09PSAnc2V0SWQnKSB7XG4gICAgaWQgPSBlLmRhdGEud2lkZ2V0SWQ7XG4gICAgc2VuZFF1ZXVlKCk7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lckNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBsaXN0ZW5lckNhbGxiYWNrc1tpXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYWxsYmFjay1yZXR1cm5cbiAgICAgIGNhbGxiYWNrKGUpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCB7XG4gIHNlbmRNZXNzYWdlIGFzIHNlbmQsXG4gIGNyZWF0ZVBvcHVwSWZyYW1lIGFzIGNyZWF0ZVBvcHVwLFxuICBjcmVhdGVNb2RhbElmcmFtZSBhcyBjcmVhdGVNb2RhbCxcbiAgaGlkZU1haW5JZnJhbWUgYXMgaGlkZVRydXN0Qm94LFxuICBzaG93UG9wdXBJZnJhbWUgYXMgc2hvd1BvcHVwLFxuICBoaWRlUG9wdXBJZnJhbWUgYXMgaGlkZVBvcHVwLFxuICBmb2N1c1BvcHVwSWZyYW1lIGFzIGZvY3VzUG9wdXAsXG4gIHNob3dNb2RhbElmcmFtZSBhcyBzaG93TW9kYWwsXG4gIGhpZGVNb2RhbElmcmFtZSBhcyBoaWRlTW9kYWwsXG4gIGZvY3VzTW9kYWxJZnJhbWUgYXMgZm9jdXNNb2RhbCxcbiAgc2VuZExvYWRlZE1lc3NhZ2UgYXMgbG9hZGVkLFxuICBzZXRTdHlsZXMsXG4gIHJlc2l6ZUhlaWdodCxcbiAgYWRkQ2FsbGJhY2tGdW5jdGlvbiBhcyBzZXRMaXN0ZW5lcixcbiAgaXNMb2FkZWRNZXNzYWdlLFxuICBzZW5kQVBJRGF0YU1lc3NhZ2UsXG4gIGlzQVBJRGF0YU1lc3NhZ2UsXG4gIGlzUG9wdXBUb2dnbGVNZXNzYWdlLFxuICBzZW5kUGluZyBhcyBwaW5nLFxuICBvblBvbmcsXG4gIHNjcm9sbFRvVHJ1c3RCb3gsXG59O1xuIiwiLy8gQ29udmVydCByZWR1Y2UgbWV0aG9kIGludG8gYSBmdW5jdGlvblxuY29uc3QgcmVkdWNlID0gKGYpID0+IChpbml0KSA9PiAoeHMpID0+IHhzLnJlZHVjZShmLCBpbml0KTtcblxuLy8gQ29udmVydCBmaWx0ZXIgbWV0aG9kIGludG8gYSBmdW5jdGlvblxuY29uc3QgZmlsdGVyID0gKHApID0+ICh4cykgPT4geHMuZmlsdGVyKHApO1xuXG4vLyBDb252ZXJ0IG1hcCBtZXRob2QgaW50byBhIGZ1bmN0aW9uXG5jb25zdCBtYXAgPSAoZikgPT4gKHhzKSA9PiB4cy5tYXAoZik7XG5cbi8vIEltcGxlbWVudGF0aW9uIG9mIG1hcCwgYnV0IGZvciBhbiBvYmplY3QuIFZhbHVlcyBhcmUgcmVwbGFjZWQgd2l0aCB0aGUgcmVzdWx0XG4vLyBvZiBjYWxsaW5nIHRoZSBwYXNzZWQgZnVuY3Rpb24gb2YgdGhlbTsga2V5cyByZW1haW4gdW5jaGFuZ2VkLlxuY29uc3QgbWFwT2JqZWN0ID0gKGYsIG9iaikgPT4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKGFsbCwgaykgPT4gKHsgLi4uYWxsLCBba106IGYob2JqW2tdKSB9KSwge30pO1xuXG4vLyBUcmFuc2Zvcm1zIGFuIG9iamVjdCBjb250YWluaW5nIGFyYml0cmFyeSBrZXlzLCBhbmQgcHJvbWlzZSB2YWx1ZXMsIGludG8gYVxuLy8gcHJvbWlzZS13cmFwcGVkIG9iamVjdCwgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB0aGUgcmVzdWx0IG9mIHJlc29sdmluZyBlYWNoXG4vLyBwcm9taXNlIGFzIHZhbHVlcy5cbmNvbnN0IHByb21pc2VBbGxPYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBjb25zdCB2YWx1ZXMgPSBrZXlzLm1hcCgoaykgPT4gb2JqW2tdKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBhdC9jb21wYXRcbiAgcmV0dXJuIFByb21pc2UuYWxsKHZhbHVlcykudGhlbigocHJvbWlzZXMpID0+XG4gICAgcHJvbWlzZXMucmVkdWNlKChhbGwsIHByb21pc2UsIGlkeCkgPT4gKHsgLi4uYWxsLCBba2V5c1tpZHhdXTogcHJvbWlzZSB9KSwge30pXG4gICk7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgY29udGFpbmluZyBwYWlycyBvZiB2YWx1ZXMgaW50byBhbiBvYmplY3QuXG4gKlxuICogICBbW2sxLCB2MV0sIFtrMiwgdjJdLCAuLi4gXSAtPiB7IFtrMV06IHYxLCBbazJdOiB2MiwgLi4uIH1cbiAqL1xuY29uc3QgcGFpcnNUb09iamVjdCA9IChwYWlycykgPT4gcGFpcnMucmVkdWNlKChvYmosIFtrLCB2XSkgPT4gKHsgLi4ub2JqLCBba106IHYgfSksIHt9KTtcblxuY29uc3QgaXNOdWxsYXJ5ID0gKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSBudWxsO1xuXG5jb25zdCBpc051bGxhcnlPckZhbHNlID0gKHZhbHVlKSA9PiBpc051bGxhcnkodmFsdWUpIHx8IHZhbHVlID09PSBmYWxzZTtcblxuLy8gRmlsdGVyIG91dCBhbGwgbnVsbCBvciB1bmRlZmluZWQgdmFsdWVzIGZyb20gYW4gb2JqZWN0LlxuY29uc3QgcmVqZWN0TnVsbGFyeVZhbHVlcyA9IChvYmopID0+IHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKFxuICAgIChuZXdPYmosIGtleSkgPT4gKHtcbiAgICAgIC4uLm5ld09iaixcbiAgICAgIC4uLihpc051bGxhcnkob2JqW2tleV0pID8ge30gOiB7IFtrZXldOiBvYmpba2V5XSB9KSxcbiAgICB9KSxcbiAgICB7fVxuICApO1xufTtcblxuLyoqXG4gKiBTcGxpdCBhbiBhcnJheSBvZiB2YWx1ZXMgaW50byBjaHVua3Mgb2YgYSBnaXZlbiBzaXplLlxuICpcbiAqIElmIHRoZSBudW1iZXIgb2YgdmFsdWVzIGRvZXMgbm90IGRpdmlkZSBldmVubHkgaW50byB0aGUgY2h1bmsgc2l6ZSwgdGhlXG4gKiBmaW5hbCBjaHVuayB3aWxsIGJlIHNtYWxsZXIgdGhhbiBjaHVua1NpemUuXG4gKlxuICogICBjaHVuayAyIFthLCBiLCBjLCBkLCBlLCBmLCBnXSAtPiBbW2EsIGJdLCBbYywgZF0sIFtlLCBmXSwgW2ddXVxuICovXG5jb25zdCBjaHVuayA9IChjaHVua1NpemUpID0+XG4gIHJlZHVjZSgoY2h1bmtzLCB2YWwsIGlkeCkgPT4ge1xuICAgIGNvbnN0IGxhc3RDaHVuayA9IGNodW5rc1tjaHVua3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgaXNOZXdDaHVuayA9IGlkeCAlIGNodW5rU2l6ZSA9PT0gMDtcbiAgICBjb25zdCBuZXdDaHVuayA9IGlzTmV3Q2h1bmsgPyBbdmFsXSA6IFsuLi5sYXN0Q2h1bmssIHZhbF07XG4gICAgcmV0dXJuIFsuLi5jaHVua3Muc2xpY2UoMCwgY2h1bmtzLmxlbmd0aCAtIChpc05ld0NodW5rID8gMCA6IDEpKSwgbmV3Q2h1bmtdO1xuICB9KShbXSk7XG5cbi8qKlxuICogU3BsaXQgYW4gYXJyYXkgb2YgdmFsdWVzIGludG8gY2h1bmtzIG9mIGEgZ2l2ZW4gc2l6ZSwgYW5kIHRoZW4gdHJhbnNwb3NlIHZhbHVlcy5cbiAqXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8ge0BsaW5rICdjaHVuayd9LCBidXQgd2l0aCB0aGUgdmFsdWVzIHRyYW5zcG9zZWQ6XG4gKlxuICogICBjaHVua1RyYW5zcG9zZSAyIFthLCBiLCBjLCBkLCBlLCBmLCBnXSAtPiBbW2EsIGMsIGUsIGddLCBbYiwgZCwgZl1dXG4gKlxuICogVGhlIHRyYW5zcG9zaXRpb24gaGFzIHRoZSBlZmZlY3Qgb2YgdHVybmluZyBhbiBhcnJheSBvZiB4IGNodW5rcyBvZiBzaXplIG4sXG4gKiBpbnRvIGFuIGFycmF5IG9mIG4gY2h1bmtzIG9mIHNpemUgeC5cbiAqL1xuY29uc3QgY2h1bmtUcmFuc3Bvc2UgPSAoY2h1bmtTaXplKSA9PlxuICByZWR1Y2UoKGNodW5rcywgdmFsLCBpZHgpID0+IHtcbiAgICBjb25zdCBjaHVua0lkeCA9IGlkeCAlIGNodW5rU2l6ZTtcbiAgICBjb25zdCBuZXdDaHVuayA9IFsuLi4oY2h1bmtzW2NodW5rSWR4XSB8fCBbXSksIHZhbF07XG4gICAgcmV0dXJuIFsuLi5jaHVua3Muc2xpY2UoMCwgY2h1bmtJZHgpLCBuZXdDaHVuaywgLi4uY2h1bmtzLnNsaWNlKGNodW5rSWR4ICsgMSldO1xuICB9KShbXSk7XG5cbi8qKlxuICogQ29tcG9zZSBhIHNlcmllcyBvZiBmdW5jdGlvbnMgdG9nZXRoZXIuXG4gKlxuICogRXF1aXZhbGVudCB0byBhcHBseWluZyBhbiBhcnJheSBvZiBmdW5jdGlvbnMgdG8gYSB2YWx1ZSwgcmlnaHQgdG8gbGVmdC5cbiAqXG4gKiAgIGNvbXBvc2UoZiwgZywgaCkoeCkgPT09IGYoZyhoKHgpKSlcbiAqXG4gKi9cbmNvbnN0IGNvbXBvc2UgPVxuICAoLi4uZnMpID0+XG4gICh4KSA9PlxuICAgIGZzLnJlZHVjZVJpZ2h0KCh2YWwsIGYpID0+IGYodmFsKSwgeCk7XG5cbi8vIFBpcGUgYSB2YWx1ZSB0aHJvdWdoIGEgc2VyaWVzIG9mIGZ1bmN0aW9ucyB3aGljaCB0ZXJtaW5hdGVzIGltbWVkaWF0ZWx5IG9uXG4vLyByZWNlaXZpbmcgYSBudWxsYXJ5IHZhbHVlLlxuY29uc3QgcGlwZU1heWJlID1cbiAgKC4uLmZzKSA9PlxuICAoeCkgPT5cbiAgICBmcy5yZWR1Y2UoKHZhbCwgZikgPT4gKGlzTnVsbGFyeSh2YWwpID8gdmFsIDogZih2YWwpKSwgeCk7XG5cbi8vIEdldCBmaXJzdCB2YWx1ZSBmcm9tIGFuIGFycmF5XG5jb25zdCBmaXJzdCA9IChbeF0pID0+IHg7XG5cbi8vIEZpcnN0IGZpcnN0IHZhbHVlIG1hdGNoaW5nIHByZWRpY2F0ZSBwIGluIGFuIGFycmF5IG9mIHZhbHVlcy5cbmNvbnN0IGZpbmQgPSAocCkgPT4gcGlwZU1heWJlKGZpbHRlcihwKSwgZmlyc3QpO1xuXG4vLyBHZXQgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdCBhdCBhIGdpdmVuIGtleS5cbmNvbnN0IHByb3AgPVxuICAoaykgPT5cbiAgKG9iaiA9IHt9KSA9PlxuICAgIG9ialtrXTtcblxuLy8gR2V0IGEgdmFsdWUgZnJvbSBhbiBvYmplY3QgYXQgYSBnaXZlbiBrZXkgaWYgaXQgZXhpc3RzLlxuY29uc3QgcHJvcE1heWJlID1cbiAgKGspID0+XG4gIChvYmogPSB7fSkgPT5cbiAgICBvYmpba10gfHwgb2JqO1xuXG4vLyBUZXN0IGlmIGEgdmFsdWUgaXMgZmFsc2Ugb3IgbnVsbGFyeSwgcmV0dXJuaW5nIG51bGwgaWYgdHJ1ZSwgb3IgYSBzZWNvbmQgdmFsdWUgaWYgZmFsc2UuXG4vLyBJbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBhIHBpcGVNYXliZSB3aGVyZSB5b3Ugd2FudCB0byB0ZXJtaW5hdGUgZXhlY3V0aW9uIHdoZXJlXG4vLyBhbiBhcmJpdHJhcnkgdmFsdWUgaXMgbnVsbC5cbmNvbnN0IGd1YXJkID0gKHApID0+ICh4KSA9PiBpc051bGxhcnlPckZhbHNlKHApID8gbnVsbCA6IHg7XG5cbmV4cG9ydCB7XG4gIGNodW5rLFxuICBjaHVua1RyYW5zcG9zZSxcbiAgY29tcG9zZSxcbiAgZmlsdGVyLFxuICBmaW5kLFxuICBmaXJzdCxcbiAgZ3VhcmQsXG4gIG1hcCxcbiAgbWFwT2JqZWN0LFxuICBwYWlyc1RvT2JqZWN0LFxuICBwaXBlTWF5YmUsXG4gIHByb21pc2VBbGxPYmplY3QsXG4gIHByb3AsXG4gIHByb3BNYXliZSxcbiAgcmVqZWN0TnVsbGFyeVZhbHVlcyxcbn07XG4iLCJpbXBvcnQgeyBwb3B1bGF0ZUVsZW1lbnRzIH0gZnJvbSAnLi4vZG9tJztcbmltcG9ydCB7IG1rRWxlbVdpdGhTdmdMb29rdXAsIGEgfSBmcm9tICcuLi90ZW1wbGF0aW5nJztcbmltcG9ydCB7IHJlbW92ZUVsZW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGVycm9yRmFsbGJhY2sgPSAoY29udGFpbmVyRWxlbWVudCA9ICd0cC13aWRnZXQtZmFsbGJhY2snKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gIHBvcHVsYXRlRWxlbWVudHMoW1xuICAgIHtcbiAgICAgIGVsZW1lbnQ6IGNvbnRhaW5lcixcbiAgICAgIHN0cmluZzogYShcbiAgICAgICAge1xuICAgICAgICAgIGhyZWY6ICdodHRwczovL3d3dy50cnVzdHBpbG90LmNvbT91dG1fbWVkaXVtPXRydXN0Ym94ZmFsbGJhY2snLFxuICAgICAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICAgICAgcmVsOiAnbm9vcGVuZXIgbm9yZWZlcnJlcicsXG4gICAgICAgIH0sXG4gICAgICAgIG1rRWxlbVdpdGhTdmdMb29rdXAoJ2xvZ28nLCAnZmFsbGJhY2stbG9nbycpXG4gICAgICApLFxuICAgIH0sXG4gIF0pO1xufTtcblxuY29uc3QgcmVtb3ZlRXJyb3JGYWxsYmFjayA9IChjb250YWluZXJFbGVtZW50ID0gJ3RwLXdpZGdldC1mYWxsYmFjaycpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyRWxlbWVudCk7XG4gIHJlbW92ZUVsZW1lbnQoY29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7IGVycm9yRmFsbGJhY2ssIHJlbW92ZUVycm9yRmFsbGJhY2sgfTtcbiIsImltcG9ydCB7IGFkZENsYXNzLCBwb3B1bGF0ZUVsZW1lbnRzIH0gZnJvbSAnLi4vZG9tJztcbmltcG9ydCB7IHJlbW92ZUVsZW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBta0VsZW1XaXRoU3ZnTG9va3VwIH0gZnJvbSAnLi4vdGVtcGxhdGluZyc7XG5cbmNvbnN0IGRlZmF1bHRMb2FkZXJDb250YWluZXIgPSAndHAtd2lkZ2V0LWxvYWRlcic7XG5cbmNvbnN0IGFkZExvYWRlciA9IChsb2FkZXJFbGVtZW50KSA9PiB7XG4gIGNvbnN0IGxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxvYWRlckVsZW1lbnQpO1xuXG4gIHBvcHVsYXRlRWxlbWVudHMoW1xuICAgIHtcbiAgICAgIGVsZW1lbnQ6IGxvYWRlcixcbiAgICAgIHN0cmluZzogbWtFbGVtV2l0aFN2Z0xvb2t1cCgnbG9nbycpLFxuICAgIH0sXG4gIF0pO1xufTtcblxuY29uc3QgcmVtb3ZlTG9hZGVyID0gKGxvYWRlckVsZW1lbnQpID0+IHtcbiAgY29uc3QgbG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobG9hZGVyRWxlbWVudCk7XG4gIGNvbnN0IGxvYWRlckxvYWRlZENsYXNzID0gYCR7bG9hZGVyRWxlbWVudH0tLWxvYWRlZGA7XG4gIGFkZENsYXNzKGxvYWRlciwgbG9hZGVyTG9hZGVkQ2xhc3MpO1xuXG4gIC8vIFJlbW92ZSBsb2FkZXIgYWZ0ZXIgY29tcGxldGlvbiBvZiBhbmltYXRpb24uXG4gIGlmIChsb2FkZXIpIHtcbiAgICBsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4gcmVtb3ZlRWxlbWVudChsb2FkZXIpKTtcbiAgICBsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0QW5pbWF0aW9uRW5kJywgKCkgPT4gcmVtb3ZlRWxlbWVudChsb2FkZXIpKTtcbiAgICBsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignb2FuaW1hdGlvbmVuZCcsICgpID0+IHJlbW92ZUVsZW1lbnQobG9hZGVyKSk7XG4gIH1cbn07XG5cbi8vIENyZWF0ZXMgYSBsb2FkZXIgZWxlbWVudCBpbiB0aGUgRE9NLCB0aGVuIHJlc29sdmVzIGEgcGFzc2VkIHByb21pc2UgYW5kIHJlbW92ZXNcbi8vIHRoZSBsb2FkZXIgb25jZSBjb21wbGV0ZS4gVGhlIGxvYWRlciBpcyBkaXNwbGF5ZWQgb25seSBhZnRlciB0aGUgcGFzc2VkIGRlbGF5XG4vLyBoYXMgZWxhcHNlZC5cbmNvbnN0IHdpdGhMb2FkZXIgPSAocHJvbWlzZSwgeyBsb2FkZXJFbGVtZW50ID0gZGVmYXVsdExvYWRlckNvbnRhaW5lciwgZGVsYXkgPSAxMDAwIH0gPSB7fSkgPT4ge1xuICBjb25zdCBsb2FkZXJUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IGFkZExvYWRlcihsb2FkZXJFbGVtZW50KSwgZGVsYXkpO1xuICByZXR1cm4gcHJvbWlzZS5maW5hbGx5KCgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQobG9hZGVyVGltZW91dElkKTtcbiAgICByZW1vdmVMb2FkZXIobG9hZGVyRWxlbWVudCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgd2l0aExvYWRlciB9O1xuIiwiaW1wb3J0IHsgZmV0Y2hEYXRhLCBoYXNQcm9kdWN0UmV2aWV3cyB9IGZyb20gJy4vZmV0Y2hEYXRhJztcbmltcG9ydCB7IGFwaUNhbGwgfSBmcm9tICcuL2NhbGwnO1xuaW1wb3J0IFJldmlld0ZldGNoZXIgZnJvbSAnLi9yZXZpZXdGZXRjaGVyJztcblxuLyoqXG4gKiBGZXRjaGVzIGRhdGEgZm9yIGEgcHJvZHVjdCBhdHRyaWJ1dGUgVHJ1c3RCb3guXG4gKlxuICogVGhpcyB1c2VzIGEgXCJuZXctc3R5bGVcIiBlbmRwb2ludCwgd2hpY2ggdGFrZXMgYSB0ZW1wbGF0ZUlkIGFuZCBzdXBwbGllcyBkYXRhXG4gKiBiYXNlZCBvbiB0aGF0LlxuICovXG5jb25zdCBmZXRjaFByb2R1Y3REYXRhID0gKHRlbXBsYXRlSWQpID0+IChcbiAgZmV0Y2hQYXJhbXMsXG4gIGNvbnN0cnVjdFRydXN0Qm94LFxuICBwYXNzVG9Qb3B1cCA9IGZhbHNlLFxuICBpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzID0gZmFsc2VcbikgPT4ge1xuICAvLyBBZGQgZXh0cmEgZGF0YSB0byB0aGUgY29uc3RydWN0VHJ1c3RCb3ggY2FsbGJhY2ssIHdoZXJlIHdlIGFyZSBmZXRjaGluZyByZXZpZXdzXG4gIGNvbnN0IHdyYXBwZWRDb25zdHJ1Y3QgPSAoeyBiYXNlRGF0YSwgbG9jYWxlLCAuLi5hcmdzIH0pID0+IHtcbiAgICBjb25zdCBmZXRjaGVyID0gbmV3IFJldmlld0ZldGNoZXIoe1xuICAgICAgYmFzZURhdGEsXG4gICAgICBpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzLFxuICAgICAgcmV2aWV3c1BlclBhZ2U6IHBhcnNlSW50KGZldGNoUGFyYW1zLnJldmlld3NQZXJQYWdlKSxcbiAgICAgIGxvY2FsZSxcbiAgICAgIC4uLmFyZ3MsXG4gICAgfSk7XG4gICAgcmV0dXJuIGZldGNoZXIuY29uc3VtZVJldmlld3MoY29uc3RydWN0VHJ1c3RCb3gpKCk7XG4gIH07XG5cbiAgY29uc3QgY29uc3RydWN0ID0gZmV0Y2hQYXJhbXMucmV2aWV3c1BlclBhZ2UgPiAwID8gd3JhcHBlZENvbnN0cnVjdCA6IGNvbnN0cnVjdFRydXN0Qm94O1xuICBmZXRjaERhdGEoYC90cnVzdGJveC1kYXRhLyR7dGVtcGxhdGVJZH1gKShmZXRjaFBhcmFtcywgY29uc3RydWN0LCBwYXNzVG9Qb3B1cCwgaGFzUHJvZHVjdFJldmlld3MpO1xufTtcblxuLyoqXG4gKiBGZXRjaGVzIHByb2R1Y3QgcmV2aWV3IGRhdGEgZ2l2ZW4gYW4gSUQgYW5kIGEgbG9jYWxlLlxuICovXG5jb25zdCBmZXRjaFByb2R1Y3RSZXZpZXcgPSAoXG4gIHByb2R1Y3RSZXZpZXdJZCxcbiAgbG9jYWxlLFxuICBjYWxsYmFja1xuKSA9PiB7XG4gIGFwaUNhbGwoYC9wcm9kdWN0LXJldmlld3MvJHtwcm9kdWN0UmV2aWV3SWR9YCwgeyBsb2NhbGUgfSkudGhlbihjYWxsYmFjayk7XG59XG5cbmV4cG9ydCB7XG4gIGZldGNoUHJvZHVjdERhdGEsXG4gIGZldGNoUHJvZHVjdFJldmlld1xufTtcbiIsImltcG9ydCB7IG1hcE9iamVjdCwgcGlwZU1heWJlLCBwcm9taXNlQWxsT2JqZWN0LCBwcm9wIH0gZnJvbSAnLi4vLi4vZm4nO1xuaW1wb3J0IHsgYXBpQ2FsbCB9IGZyb20gJy4uL2NhbGwnO1xuaW1wb3J0IHsgZ2V0TmV4dFBhZ2VMaW5rcyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgUmVzcG9uc2VQcm9jZXNzb3IgZnJvbSAnLi9yZXNwb25zZVByb2Nlc3Nvcic7XG5cbmNvbnN0IE5PX1JFVklFV1NfRVJST1IgPSAnTm8gcmV2aWV3cyBhdmFpbGFibGUnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgcmV2aWV3cyBvbiByZXF1ZXN0IG9mIGEgY29uc3VtZXIuIEl0IGNvbGxlY3RzIHJldmlld3NcbiAqIHRocm91Z2ggcGFnaW5hdGVkIEFQSSBjYWxscywgYW5kIHRoZW4gcHJvdmlkZXMgb25lIHBhZ2Ugb2YgcmV2aWV3cyBvbiByZXF1ZXN0XG4gKiBmcm9tIHRoZSBjb25zdW1lci5cbiAqXG4gKiBUaHJlZSBtZXRob2RzIGFyZSBleHBvc2VkIGFzIGludGVuZGVkIGZvciB1c2U6IHtAbGluayBSZXZpZXdGZXRjaGVyI2NvbnN1bWVSZXZpZXdzfSxcbiAqIHtAbGluayBSZXZpZXdGZXRjaGVyI3Byb2R1Y2VSZXZpZXdzfSwgYW5kIHtAbGluayBSZXZpZXdGZXRjaGVyI2hhc01vcmVSZXZpZXdzfS4gT3RoZXJcbiAqIG1ldGhvZHMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgcHJpdmF0ZS5cbiAqL1xuY2xhc3MgUmV2aWV3RmV0Y2hlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBSZXZpZXdGZXRjaGVyLlxuICAgKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdGFrZXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgb3B0aW9ucyBhbmQgZGF0YSByZXF1aXJlZCB0b1xuICAgKiBvYnRhaW4gYW5kIHByb2R1Y2UgcmV2aWV3cyBmb3IgY29uc3VtcHRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGFyZ3VtZW50cyBiZWxvdy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGFyZ3MucmV2aWV3c1BlclBhZ2UgLSBUaGUgbnVtYmVyIG9mIHJldmlld3MgdG8gcHJvdmlkZSBwZXJcbiAgICogcmVxdWVzdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBhcmdzLmluY2x1ZGVJbXBvcnRlZFJldmlld3MgLSBXaGV0aGVyIHRvIGluY2x1ZGUgaW1wb3J0ZWRcbiAgICogcmV2aWV3cyBpbiB0aGUgcmV2aWV3cyBwcm92aWRlZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGFyZ3MuYmFzZURhdGEgLSBUaGUgYmFzZURhdGEgcmVzcG9uc2UgcmVjZWl2ZWQgZnJvbSBhIGJhc2UtZGF0YVxuICAgKiBjYWxsLlxuICAgKiBAcGFyYW0gey4uLk9iamVjdH0gYXJncy53cmFwQXJncyAtIEFuIGFyYml0cmFyeSBzZXQgb2YgYXJndW1lbnRzIHRvIGFkZCB0b1xuICAgKiB0aGUgZGF0YSBwcm92aWRlZCB0byB0aGUgY2FsbGJhY2sgaW4ge0BsaW5rIFJldmlld0ZldGNoZXIjY29uc3VtZVJldmlld3N9LlxuICAgKi9cbiAgY29uc3RydWN0b3IoeyByZXZpZXdzUGVyUGFnZSwgaW5jbHVkZUltcG9ydGVkUmV2aWV3cywgYmFzZURhdGEsIC4uLndyYXBBcmdzIH0pIHtcbiAgICAvLyBHZXQgbmV4dCBwYWdlIGxpbmtzIGZyb20gYSBiYXNlIGRhdGEgcmVzcG9uc2UuXG4gICAgY29uc3QgZ2V0QmFzZURhdGFOZXh0UGFnZUxpbmtzID0gZ2V0TmV4dFBhZ2VMaW5rcygocmVzcG9uc2VLZXkpID0+XG4gICAgICBwaXBlTWF5YmUocHJvcChyZXNwb25zZUtleSksIHByb3AoJ2xpbmtzJyksIHByb3AoJ25leHRQYWdlJykpXG4gICAgKTtcblxuICAgIHRoaXMucmV2aWV3c1BlclBhZ2UgPSByZXZpZXdzUGVyUGFnZTtcbiAgICB0aGlzLmluY2x1ZGVJbXBvcnRlZFJldmlld3MgPSBpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzO1xuICAgIHRoaXMuYmFzZURhdGEgPSBiYXNlRGF0YTtcbiAgICB0aGlzLm5leHRQYWdlID0gZ2V0QmFzZURhdGFOZXh0UGFnZUxpbmtzKGJhc2VEYXRhLCBpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzKTtcbiAgICB0aGlzLndyYXBBcmdzID0gd3JhcEFyZ3M7XG5cbiAgICB0aGlzLnJldmlld3MgPSB0aGlzLl9tYWtlUmVzcG9uc2VQcm9jZXNzb3IoYmFzZURhdGEpLmdldFJldmlld3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdW1lIGEgbnVtYmVyIG9mIHJldmlld3MgdXNpbmcgYSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZ2V0cyBvbmUgcGFnZSBvZiByZXZpZXdzLCBhbmQgY29tYmluZXMgdGhpcyB3aXRoIHRoZSBkYXRhIGluXG4gICAqIHRoZSB3cmFwQXJncyBmaWVsZCBhbmQgcGFzc2VzIGl0IGFsbCB0byBhIGNhbGxiYWNrLiBUaGUgcmV0dXJuIHZhbHVlIGlzXG4gICAqIHdyYXBwZWQgaW4gYW4gYW5vbnltb3VzIGZ1bmN0aW9uIHRvIG1ha2UgaXQgc3VpdGFibGUgZm9yIHVzZSB3aXRoaW4gZXZlbnRcbiAgICogaGFuZGxlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gQSBmdW5jdGlvbiB0byBjYWxsIHdpdGggYSBzZXQgb2YgcmV2aWV3IGRhdGEuXG4gICAqL1xuICBjb25zdW1lUmV2aWV3cyhjYWxsYmFjaykge1xuICAgIHJldHVybiAoKSA9PlxuICAgICAgdGhpcy5wcm9kdWNlUmV2aWV3cygpXG4gICAgICAgIC50aGVuKChyZXZpZXdzKSA9PlxuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIC4uLnRoaXMud3JhcEFyZ3MsXG4gICAgICAgICAgICBiYXNlRGF0YTogdGhpcy5iYXNlRGF0YSxcbiAgICAgICAgICAgIHJldmlld3MsXG4gICAgICAgICAgICBoYXNNb3JlUmV2aWV3czogdGhpcy5oYXNNb3JlUmV2aWV3cyxcbiAgICAgICAgICAgIGxvYWRNb3JlUmV2aWV3czogdGhpcy5jb25zdW1lUmV2aWV3cy5iaW5kKHRoaXMpLFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyID09PSBOT19SRVZJRVdTX0VSUk9SKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soe1xuICAgICAgICAgICAgICAuLi50aGlzLndyYXBBcmdzLFxuICAgICAgICAgICAgICBiYXNlRGF0YTogdGhpcy5iYXNlRGF0YSxcbiAgICAgICAgICAgICAgcmV2aWV3czogW10sXG4gICAgICAgICAgICAgIGhhc01vcmVSZXZpZXdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbG9hZE1vcmVSZXZpZXdzOiB0aGlzLmNvbnN1bWVSZXZpZXdzLmJpbmQodGhpcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmV0aHJvdyBlcnJvciB3aGljaCBpcyB1bmV4cGVjdGVkXG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9kdWNlIGEgbnVtYmVyIG9mIHJldmlld3MuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHByb2R1Y2VzIG9uZSBwYWdlIG9mIHJldmlld3MuIEl0IG1heSByZXF1aXJlIHRvIGZldGNoIGFkZGl0aW9uYWxcbiAgICogcmV2aWV3cyBmcm9tIGFuIEFQSSBpZiB0aGVyZSBhcmUgaW5zdWZmaWNlbnQgcmV2aWV3cyBhdmFpbGFibGUgbG9jYWxseS4gVGhlXG4gICAqIHJldmlld3MgYXJlIHRodXMgcmV0dXJuZWQgd3JhcHBlZCBpbiBhIFByb21pc2UuXG4gICAqL1xuICBwcm9kdWNlUmV2aWV3cygpIHtcbiAgICBjb25zdCBwcm9jZXNzUmVzcG9uc2UgPSAocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlUHJvY2Vzc29yID0gdGhpcy5fbWFrZVJlc3BvbnNlUHJvY2Vzc29yKHJlc3BvbnNlKTtcbiAgICAgIHRoaXMubmV4dFBhZ2UgPSByZXNwb25zZVByb2Nlc3Nvci5nZXROZXh0UGFnZUxpbmtzKCk7XG4gICAgICB0aGlzLnJldmlld3MucHVzaCguLi5yZXNwb25zZVByb2Nlc3Nvci5nZXRSZXZpZXdzKCkpO1xuICAgICAgcmV0dXJuIHRoaXMuX3Rha2VSZXZpZXdzKCk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnJldmlld3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGF0L2NvbXBhdFxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KE5PX1JFVklFV1NfRVJST1IpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXZpZXdzUGVyUGFnZSA+PSB0aGlzLnJldmlld3MubGVuZ3RoXG4gICAgICA/IHRoaXMuX2ZldGNoUmV2aWV3cygpLnRoZW4ocHJvY2Vzc1Jlc3BvbnNlKVxuICAgICAgOiAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGF0L2NvbXBhdFxuICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5fdGFrZVJldmlld3MoKSk7XG4gIH1cblxuICAvKipcbiAgICogRmxhZyB3aGV0aGVyIG1vcmUgcmV2aWV3cyBhcmUgYXZhaWxhYmxlIGZvciBjb25zdW1wdGlvbi5cbiAgICpcbiAgICogV2hlcmUgdHJ1ZSwgdGhpcyBtZWFucyBpdCBpcyBwb3NzaWJsZSB0byBsb2FkIG1vcmUgcmV2aWV3cy4gSWYgZmFsc2UsIG5vXG4gICAqIG1vcmUgcmV2aWV3cyBhcmUgYXZhaWxhYmxlLlxuICAgKi9cbiAgZ2V0IGhhc01vcmVSZXZpZXdzKCkge1xuICAgIHJldHVybiB0aGlzLnJldmlld3MubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8vIFByaXZhdGUgTWV0aG9kcyAvL1xuXG4gIC8qKlxuICAgKiBUYWtlIGEgcGFnZSBvZiByZXZpZXdzIGZyb20gaW50ZXJuYWwgY2FjaGUgb2YgcmV2aWV3cywgcmVtb3ZpbmcgdGhlc2UgYW5kXG4gICAqIHJldHVybmluZyB0aGVtIGZyb20gdGhlIG1ldGhvZC5cbiAgICovXG4gIF90YWtlUmV2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXZpZXdzLnNwbGljZSgwLCB0aGlzLnJldmlld3NQZXJQYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBtb3JlIHJldmlld3MgZnJvbSB0aGUgQVBJLlxuICAgKi9cbiAgX2ZldGNoUmV2aWV3cygpIHtcbiAgICByZXR1cm4gcHJvbWlzZUFsbE9iamVjdChtYXBPYmplY3QoYXBpQ2FsbCwgdGhpcy5uZXh0UGFnZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIHtAbGluayBSZXNwb25zZVByb2Nlc3Nvcn0gaW5zdGFuY2UgdXNpbmcgcHJvcGVydGllcyBmcm9tIHRoaXMgaW5zdGFuY2UuXG4gICAqL1xuICBfbWFrZVJlc3BvbnNlUHJvY2Vzc29yKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZVByb2Nlc3NvcihyZXNwb25zZSwge1xuICAgICAgaW5jbHVkZUltcG9ydGVkUmV2aWV3czogdGhpcy5pbmNsdWRlSW1wb3J0ZWRSZXZpZXdzLFxuICAgICAgZGlzcGxheU5hbWU6IHRoaXMuYmFzZURhdGEuYnVzaW5lc3NFbnRpdHkuZGlzcGxheU5hbWUsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmV2aWV3RmV0Y2hlcjtcbiIsImltcG9ydCB7IGd1YXJkLCBwaXBlTWF5YmUsIHJlamVjdE51bGxhcnlWYWx1ZXMgfSBmcm9tICcuLi8uLi9mbic7XG5cbi8qKlxuICogR2V0IG5leHQgcGFnZSBsaW5rcyBmcm9tIGEgcmVzcG9uc2UuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGEgZ2V0dGVyIGZ1bmN0aW9uLCB1c2VkIHRvIGV4dHJhY3QgYSBwYXJ0aWN1bGFyIHR5cGUgb2YgbGluayxcbiAqIGVpdGhlciBmb3IgcHJvZHVjdFJldmlld3Mgb3IgaW1wb3J0ZWRQcm9kdWN0UmV2aWV3cy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoXG4gKiB0YWtlIGEgcmVzcG9uc2UgYW5kIGEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRvIGluY2x1ZGUgaW1wb3J0ZWQgcmV2aWV3cy4gVGhpc1xuICogY2FuIHRoZW4gYmUgY2FsbGVkIHRvIG9idGFpbiBhdmFpbGFibGUgbmV4dCBwYWdlIGxpbmtzLlxuICovXG5jb25zdCBnZXROZXh0UGFnZUxpbmtzID0gKGdldHRlcikgPT4gKHJlc3BvbnNlLCBpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzID0gZmFsc2UpID0+IHtcbiAgY29uc3QgcHJvZHVjdFJldmlld3MgPSBnZXR0ZXIoJ3Byb2R1Y3RSZXZpZXdzJykocmVzcG9uc2UpO1xuICBjb25zdCBpbXBvcnRlZFByb2R1Y3RSZXZpZXdzID0gcGlwZU1heWJlKFxuICAgIGd1YXJkKGluY2x1ZGVJbXBvcnRlZFJldmlld3MpLFxuICAgIGdldHRlcignaW1wb3J0ZWRQcm9kdWN0UmV2aWV3cycpXG4gICkocmVzcG9uc2UpO1xuICByZXR1cm4gcmVqZWN0TnVsbGFyeVZhbHVlcyh7XG4gICAgcHJvZHVjdFJldmlld3MsXG4gICAgaW1wb3J0ZWRQcm9kdWN0UmV2aWV3cyxcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBnZXROZXh0UGFnZUxpbmtzIH07XG4iLCJpbXBvcnQgeyBmaW5kLCBndWFyZCwgbWFwLCBwaXBlTWF5YmUsIHByb3AsIHByb3BNYXliZSB9IGZyb20gJy4uLy4uL2ZuJztcbmltcG9ydCB7IGdldE5leHRQYWdlTGlua3MgfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcHJvY2Vzc2VzIGFuIEFQSSByZXNwb25zZSBjb250YWluaW5nIHJldmlld3MgYW5kIHBhZ2luYXRpb25cbiAqIGRhdGEuXG4gKi9cbmNsYXNzIFJldmlld1Jlc3BvbnNlUHJvY2Vzc29yIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIFJldmlld1Jlc3BvbnNlUHJvY2Vzc29yIGluc3RhbmNlLlxuICAgKlxuICAgKiBUYWtlcyBhbiBBUEkgcmVzcG9uc2Ugb2JqZWN0IGZvciBwcm9jZXNzaW5nLCB0b2dldGhlciB3aXRoIGEgc2hvcnQgbGlzdFxuICAgKiBvZiBvcHRpb25zIGZvciBwcm9jZXNzaW5nIGFuZCBhbm5vdGF0aW5nIHJldmlld3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZSwgeyBpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzLCBkaXNwbGF5TmFtZSB9KSB7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuaW5jbHVkZUltcG9ydGVkUmV2aWV3cyA9IGluY2x1ZGVJbXBvcnRlZFJldmlld3M7XG4gICAgdGhpcy5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGNvbWJpbmVkIGxpc3Qgb2YgcmV2aWV3cyBmcm9tIHRoZSBBUEkgcmVzcG9uc2UuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4dHJhY3RzIGFsbCByZXZpZXdzIGZyb20gdGhlIHJlc3BvbnNlLCBpbmNsdWRpbmcgb3B0aW9uYWxseVxuICAgKiBpbXBvcnRlZCByZXZpZXdzLCBhbmQgdGhlbiBjb21iaW5lcyBhbmQgc29ydHMgdGhlc2UgYnkgZGF0ZSwgZGVzY2VuZGluZy5cbiAgICovXG4gIGdldFJldmlld3MoKSB7XG4gICAgY29uc3QgeyBwcm9kdWN0UmV2aWV3cywgaW1wb3J0ZWRQcm9kdWN0UmV2aWV3cyB9ID0gdGhpcy5yZXNwb25zZTtcbiAgICBjb25zdCBvcmRlckJ5Q3JlYXRlZEF0RGVzYyA9ICh7IGNyZWF0ZWRBdDogYzEgfSwgeyBjcmVhdGVkQXQ6IGMyIH0pID0+XG4gICAgICBuZXcgRGF0ZShjMikgLSBuZXcgRGF0ZShjMSk7XG4gICAgY29uc3QgcHJvZHVjdFJldmlld3NMaXN0ID1cbiAgICAgIHBpcGVNYXliZShwcm9wTWF5YmUoJ3Byb2R1Y3RSZXZpZXdzJyksIHByb3BNYXliZSgncmV2aWV3cycpKShwcm9kdWN0UmV2aWV3cykgfHwgW107XG5cbiAgICBjb25zdCBpbXBvcnRlZFJldmlld3NMaXN0ID1cbiAgICAgIHBpcGVNYXliZShcbiAgICAgICAgZ3VhcmQodGhpcy5pbmNsdWRlSW1wb3J0ZWRSZXZpZXdzKSxcbiAgICAgICAgcHJvcE1heWJlKCdpbXBvcnRlZFByb2R1Y3RSZXZpZXdzJyksXG4gICAgICAgIHByb3BNYXliZSgncHJvZHVjdFJldmlld3MnKSxcbiAgICAgICAgbWFwKChyZXZpZXcpID0+ICh7XG4gICAgICAgICAgLi4ucmV2aWV3LFxuICAgICAgICAgIHZlcmlmaWVkQnk6IHJldmlldy50eXBlID09PSAnRXh0ZXJuYWwnXG4gICAgICAgICAgICA/IHJldmlldy5zb3VyY2VcbiAgICAgICAgICAgICAgPyByZXZpZXcuc291cmNlLm5hbWVcbiAgICAgICAgICAgICAgOiB0aGlzLmRpc3BsYXlOYW1lXG4gICAgICAgICAgICA6IHRoaXMuZGlzcGxheU5hbWUsXG4gICAgICAgIH0pKSxcbiAgICAgICkoaW1wb3J0ZWRQcm9kdWN0UmV2aWV3cykgfHwgW107XG5cbiAgICByZXR1cm4gWy4uLnByb2R1Y3RSZXZpZXdzTGlzdCwgLi4uaW1wb3J0ZWRSZXZpZXdzTGlzdF0uc29ydChvcmRlckJ5Q3JlYXRlZEF0RGVzYyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIG9iamVjdCBjb250YWluaW5nIGxpbmtzIHRvIHRoZSBuZXh0IHBhZ2UgVVJJcyBjb250YWluZWQgd2l0aGluIHRoZVxuICAgKiBBUEkgcmVzcG9uc2UuXG4gICAqL1xuICBnZXROZXh0UGFnZUxpbmtzKCkge1xuICAgIC8vIEdldCBuZXh0IHBhZ2UgbGlua3MgZnJvbSBhIHBhZ2luYXRpb24gcmVzcG9uc2UuXG4gICAgY29uc3QgZ2V0T2xkUGFnaW5hdGlvbk5leHRQYWdlTGlua3MgPSBnZXROZXh0UGFnZUxpbmtzKChyZXNwb25zZUtleSkgPT5cbiAgICAgIHBpcGVNYXliZShcbiAgICAgICAgcHJvcChyZXNwb25zZUtleSksXG4gICAgICAgIHByb3AoJ2xpbmtzJyksXG4gICAgICAgIGZpbmQoKGxpbmspID0+IGxpbmsucmVsID09PSAnbmV4dC1wYWdlJyksXG4gICAgICAgIHByb3AoJ2hyZWYnKSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGNvbnN0IGdldE5ld1BhZ2luYXRpb25OZXh0UGFnZUxpbmtzID0gZ2V0TmV4dFBhZ2VMaW5rcygocmVzcG9uc2VLZXkpID0+XG4gICAgICBwaXBlTWF5YmUocHJvcChyZXNwb25zZUtleSksIHByb3AocmVzcG9uc2VLZXkpLCBwcm9wKCdsaW5rcycpLCBwcm9wKCduZXh0UGFnZScpKSxcbiAgICApO1xuXG4gICAgY29uc3QgbmV3TGlua3MgPSBnZXROZXdQYWdpbmF0aW9uTmV4dFBhZ2VMaW5rcyh0aGlzLnJlc3BvbnNlLCB0aGlzLmluY2x1ZGVJbXBvcnRlZFJldmlld3MpO1xuICAgIGNvbnN0IG9sZExpbmtzID0gZ2V0T2xkUGFnaW5hdGlvbk5leHRQYWdlTGlua3ModGhpcy5yZXNwb25zZSwgdGhpcy5pbmNsdWRlSW1wb3J0ZWRSZXZpZXdzKTtcblxuICAgIHJldHVybiB7IC4uLm9sZExpbmtzLCAuLi5uZXdMaW5rcyB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJldmlld1Jlc3BvbnNlUHJvY2Vzc29yO1xuIiwiLyogVGhpcyBtb2R1bGUgZGVmaW5lcyBhIG51bWJlciBvZiBTVkcgZWxlbWVudHMuXG4gKlxuICogSUUxMSBkb2VzIG5vdCBwcm9wZXJseSBkaXNwbGF5IFNWRyB0YWdzLCBleGNlcHQgdXNpbmcgb25lIG9mIHNldmVyYWwgaGFja3MuXG4gKiBTbywgd2UgdXNlIG9uZSBiZWxvdzogd2Ugd3JhcCBlYWNoIFNWRyBpbiBhIGRpdiBlbGVtZW50LCB3aXRoIHBhcnRpY3VsYXJcbiAqIHN0eWxpbmcgYXR0YWNoZWQuIFdlIGRvIHRoaXMgZm9sbG93aW5nIE9wdGlvbiA0IGluIHRoZSBhcnRpY2xlIGF0XG4gKiBodHRwczovL2Nzcy10cmlja3MuY29tL3NjYWxlLXN2Zy8uXG4gKi9cblxuaW1wb3J0IHsgc2FuaXRpemVIdG1sUHJvcCwgc2FuaXRpemVDb2xvciB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3Qgc3ZnU3RhclN0eWxlID0gJ3N0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBsZWZ0OiAwOyB0b3A6IDA7XCInO1xuXG5jb25zdCB3cmFwU3ZnID0gKGRpbWVuc2lvbnMsIGlubmVyLCBwcm9wcyA9IHt9KSA9PiB7XG4gIGNvbnN0IHNhbml0aXplZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcbiAgICBhY2NbY3VyXSA9IHNhbml0aXplSHRtbFByb3AocHJvcHNbY3VyXSk7XG4gICAgaWYgKGN1ciA9PT0gJ2NvbG9yJykge1xuICAgICAgYWNjW2N1cl0gPSBzYW5pdGl6ZUNvbG9yKGFjY1tjdXJdKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICByZXR1cm4gYFxuICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IGhlaWdodDogMDsgd2lkdGg6IDEwMCU7IHBhZGRpbmc6IDA7IHBhZGRpbmctYm90dG9tOiAkeyhkaW1lbnNpb25zLmhlaWdodCAvXG4gICAgICBkaW1lbnNpb25zLndpZHRoKSAqXG4gICAgICAxMDB9JTtcIj5cbiAgICAgICR7aW5uZXIoZGltZW5zaW9ucywgc2FuaXRpemVkUHJvcHMpfVxuICAgIDwvZGl2PlxuICBgO1xufTtcblxuY29uc3QgU0NBTEVfRElNRU5TSU9OU184MHgxNSA9ICc4MHgxNSc7XG5jb25zdCBTQ0FMRV9ESU1FTlNJT05TXzkweDE2ID0gJzkweDE2JztcbmNvbnN0IFNDQUxFX0RJTUVOU0lPTlNfMTA1eDE5ID0gJzEwNXgxOSc7XG5cbmNvbnN0IFNDQUxFX1NWR19QUk9QUyA9IHtcbiAgW1NDQUxFX0RJTUVOU0lPTlNfODB4MTVdOiB7XG4gICAgZGltZW5zaW9uczogeyB3aWR0aDogODAsIGhlaWdodDogMTUgfSxcbiAgICBsaW5lczogW1xuICAgICAgeyB4MTogODAsIHkxOiA3LjUsIHgyOiAwLCB5MjogNy41IH0sXG4gICAgICB7IHgxOiAwLjUsIHkxOiAzLjUsIHgyOiAwLjUsIHkyOiAxMS41IH0sXG4gICAgICB7IHgxOiAyMC41LCB5MTogNiwgeDI6IDIwLjUsIHkyOiA5IH0sXG4gICAgICB7IHgxOiA0MC41LCB5MTogNiwgeDI6IDQwLjUsIHkyOiA5IH0sXG4gICAgICB7IHgxOiA2MC41LCB5MTogNiwgeDI6IDYwLjUsIHkyOiA5IH0sXG4gICAgICB7IHgxOiA4MCwgeTE6IDMuNSwgeDI6IDgwLCB5MjogMTEuNSB9LFxuICAgIF0sXG4gICAgc3RhcnM6IFtcbiAgICAgIHtcbiAgICAgICAgeDogMS41LFxuICAgICAgICB3OiAxNCxcbiAgICAgICAgaDogMTQsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk05Ljc2MTMgNi4wMjU5NEgxMy43MjA1TDEwLjUzMTYgOC4yOTMxNkw4LjU1OTY4IDkuNjgzNzJMNS4zNTUzNSAxMS45NTA5TDYuNTcyMzggOC4yOTMxNkwzLjM2ODA0IDYuMDI1OTRINy4zMjcyNEw4LjU0NDI3IDIuMzY4MTZMOS43NjEzIDYuMDI1OTRaTTEwLjc5MzUgOS4xNDAxMUw4LjU0NDI5IDkuNjk5MzZMMTEuNzMzMiAxMS45ODE3TDEwLjc5MzUgOS4xNDAxMVpcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDEzLjUsXG4gICAgICAgIHc6IDE0LFxuICAgICAgICBoOiAxNCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIxLjc2MTUgNi4wMjYwNkgyNS43MjA4TDIyLjUzMTggOC4yOTMyOEwyMC41NTk5IDkuNjgzODRMMTcuMzU1NiAxMS45NTExTDE4LjU3MjYgOC4yOTMyOEwxNS4zNjgzIDYuMDI2MDZIMTkuMzI3NUwyMC41NDQ1IDIuMzY4MjlMMjEuNzYxNSA2LjAyNjA2Wk0yMi43OTM4IDkuMTQwMzRMMjAuNTQ0NiA5LjY5OTU5TDIzLjczMzUgMTEuOTgxOUwyMi43OTM4IDkuMTQwMzRaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAxMy41LFxuICAgICAgICB3OiAxNCxcbiAgICAgICAgaDogMTQsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yMS43NjE1IDYuMDI2MDZIMjUuNzIwOEwyMi41MzE4IDguMjkzMjhMMjAuNTU5OSA5LjY4Mzg0TDE3LjM1NTYgMTEuOTUxMUwxOC41NzI2IDguMjkzMjhMMTUuMzY4MyA2LjAyNjA2SDE5LjMyNzVMMjAuNTQ0NSAyLjM2ODI5TDIxLjc2MTUgNi4wMjYwNlpNMjIuNzkzOCA5LjE0MDM0TDIwLjU0NDYgOS42OTk1OUwyMy43MzM1IDExLjk4MTlMMjIuNzkzOCA5LjE0MDM0WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMzMuNSxcbiAgICAgICAgdzogMTQsXG4gICAgICAgIGg6IDE0LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNDEuNzYxNSA2LjAyNjA2SDQ1LjcyMDhMNDIuNTMxOCA4LjI5MzI4TDQwLjU1OTkgOS42ODM4NEwzNy4zNTU2IDExLjk1MTFMMzguNTcyNiA4LjI5MzI4TDM1LjM2ODMgNi4wMjYwNkgzOS4zMjc1TDQwLjU0NDUgMi4zNjgyOUw0MS43NjE1IDYuMDI2MDZaTTQyLjc5MzggOS4xNDAzNEw0MC41NDQ2IDkuNjk5NTlMNDMuNzMzNSAxMS45ODE5TDQyLjc5MzggOS4xNDAzNFpcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDY0LjUsXG4gICAgICAgIHc6IDE0LFxuICAgICAgICBoOiAxNCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcyLjc2MTUgNi4wMjYwNkg3Ni43MjA4TDczLjUzMTggOC4yOTMyOEw3MS41NTk5IDkuNjgzODRMNjguMzU1NiAxMS45NTExTDY5LjU3MjYgOC4yOTMyOEw2Ni4zNjgzIDYuMDI2MDZINzAuMzI3NUw3MS41NDQ1IDIuMzY4MjlMNzIuNzYxNSA2LjAyNjA2Wk03My43OTM1IDkuMTQwMjJMNzEuNTQ0MyA5LjY5OTQ3TDc0LjczMzIgMTEuOTgxOEw3My43OTM1IDkuMTQwMjJaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIFtTQ0FMRV9ESU1FTlNJT05TXzkweDE2XToge1xuICAgIGRpbWVuc2lvbnM6IHsgd2lkdGg6IDkwLCBoZWlnaHQ6IDE2IH0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgeDE6IDkwLCB5MTogOC41LCB4MjogMCwgeTI6IDguNSB9LFxuICAgICAgeyB4MTogMC41LCB5MTogNSwgeDI6IDAuNSwgeTI6IDEyIH0sXG4gICAgICB7IHgxOiAyMy4yMTg1LCB5MTogNywgeDI6IDIzLjIxODUsIHkyOiAxMCB9LFxuICAgICAgeyB4MTogNDUuNSwgeTE6IDcsIHgyOiA0NS41LCB5MjogMTAgfSxcbiAgICAgIHsgeDE6IDY3Ljc4MTUsIHkxOiA3LCB4MjogNjcuNzgxNSwgeTI6IDEwIH0sXG4gICAgICB7IHgxOiA5MCwgeTE6IDUsIHgyOiA5MCwgeTI6IDEyIH0sXG4gICAgXSxcbiAgICBzdGFyczogW1xuICAgICAge1xuICAgICAgICB4OiAxLjUsXG4gICAgICAgIHc6IDE1LFxuICAgICAgICBoOiAxNSxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEwLjM0NTQgNi40Mjc2OUgxNC41Njg1TDExLjE2NyA4Ljg0NjA2TDkuMDYzNjMgMTAuMzI5M0w1LjY0NTY3IDEyLjc0NzdMNi45NDM4NCA4Ljg0NjA2TDMuNTI1ODggNi40Mjc2OUg3Ljc0OTAzTDkuMDQ3MTkgMi41MjYwNkwxMC4zNDU0IDYuNDI3NjlaTTExLjQ0NjQgOS43NDk0OEw5LjA0NzI3IDEwLjM0NkwxMi40NDg4IDEyLjc4MDVMMTEuNDQ2NCA5Ljc0OTQ4WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMTUuNSxcbiAgICAgICAgdzogMTUsXG4gICAgICAgIGg6IDE1LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjQuMzQ1NiA2LjQyNzgxSDI4LjU2ODhMMjUuMTY3MiA4Ljg0NjE4TDIzLjA2MzkgMTAuMzI5NEwxOS42NDU5IDEyLjc0NzhMMjAuOTQ0MSA4Ljg0NjE4TDE3LjUyNjEgNi40Mjc4MUgyMS43NDkzTDIzLjA0NzQgMi41MjYxOEwyNC4zNDU2IDYuNDI3ODFaTTI1LjQ0NjYgOS43NDk2N0wyMy4wNDc1IDEwLjM0NjJMMjYuNDQ5IDEyLjc4MDdMMjUuNDQ2NiA5Ljc0OTY3WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMzcuNSxcbiAgICAgICAgdzogMTUsXG4gICAgICAgIGg6IDE1LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNDYuMzQ1NiA2LjQyNzgxSDUwLjU2ODhMNDcuMTY3MiA4Ljg0NjE4TDQ1LjA2MzkgMTAuMzI5NEw0MS42NDU5IDEyLjc0NzhMNDIuOTQ0MSA4Ljg0NjE4TDM5LjUyNjEgNi40Mjc4MUg0My43NDkzTDQ1LjA0NzQgMi41MjYxOEw0Ni4zNDU2IDYuNDI3ODFaTTQ3LjQ0NjYgOS43NDk2N0w0NS4wNDc1IDEwLjM0NjJMNDguNDQ5IDEyLjc4MDdMNDcuNDQ2NiA5Ljc0OTY3WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogNjAuNSxcbiAgICAgICAgdzogMTUsXG4gICAgICAgIGg6IDE1LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNjkuMzQ1NiA2LjQyNzgxSDczLjU2ODhMNzAuMTY3MiA4Ljg0NjE4TDY4LjA2MzkgMTAuMzI5NEw2NC42NDU5IDEyLjc0NzhMNjUuOTQ0MSA4Ljg0NjE4TDYyLjUyNjEgNi40Mjc4MUg2Ni43NDkzTDY4LjA0NzQgMi41MjYxOEw2OS4zNDU2IDYuNDI3ODFaTTcwLjQ0NjYgOS43NDk2N0w2OC4wNDc1IDEwLjM0NjJMNzEuNDQ5IDEyLjc4MDdMNzAuNDQ2NiA5Ljc0OTY3WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogNzMuNSxcbiAgICAgICAgdzogMTUsXG4gICAgICAgIGg6IDE1LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNODIuMzQ1NiA2LjQyNzgxSDg2LjU2ODhMODMuMTY3MiA4Ljg0NjE4TDgxLjA2MzkgMTAuMzI5NEw3Ny42NDU5IDEyLjc0NzhMNzguOTQ0MSA4Ljg0NjE4TDc1LjUyNjEgNi40Mjc4MUg3OS43NDkzTDgxLjA0NzQgMi41MjYxOEw4Mi4zNDU2IDYuNDI3ODFaTTgzLjQ0NjQgOS43NDk1N0w4MS4wNDczIDEwLjM0NjFMODQuNDQ4OCAxMi43ODA2TDgzLjQ0NjQgOS43NDk1N1pcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgW1NDQUxFX0RJTUVOU0lPTlNfMTA1eDE5XToge1xuICAgIGRpbWVuc2lvbnM6IHsgd2lkdGg6IDEwNSwgaGVpZ2h0OiAxOSB9LFxuICAgIGxpbmVzOiBbXG4gICAgICB7IHgxOiAxMDUsIHkxOiAxMCwgeDI6IDAsIHkyOiAxMCB9LFxuICAgICAgeyB4MTogMC41LCB5MTogNiwgeDI6IDAuNSwgeTI6IDE0LjMxMjUgfSxcbiAgICAgIHsgeDE6IDI2LjUsIHkxOiA4LCB4MjogMjYuNSwgeTI6IDEyIH0sXG4gICAgICB7IHgxOiA1Mi41LCB5MTogOCwgeDI6IDUyLjUsIHkyOiAxMiB9LFxuICAgICAgeyB4MTogNzguNSwgeTE6IDgsIHgyOiA3OC41LCB5MjogMTIgfSxcbiAgICAgIHsgeDE6IDEwNSwgeTE6IDYsIHgyOiAxMDUsIHkyOiAxNC4zMTI1IH0sXG4gICAgXSxcbiAgICBzdGFyczogW1xuICAgICAge1xuICAgICAgICB4OiAxLjUsXG4gICAgICAgIHc6IDE4LFxuICAgICAgICBoOiAxOSxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyLjA5NzYgNy42MzI4OEgxNy4xMTI2TDEzLjA3MzMgMTAuNTA0N0wxMC41NzU2IDEyLjI2NjFMNi41MTY3NiAxNS4xMzc5TDguMDU4MzQgMTAuNTA0N0wzLjk5OTUxIDcuNjMyODhIOS4wMTQ1TDEwLjU1NjEgMi45OTk2OUwxMi4wOTc2IDcuNjMyODhaTTEzLjQwNTEgMTEuNTc3NEwxMC41NTYxIDEyLjI4NThMMTQuNTk1NCAxNS4xNzY4TDEzLjQwNTEgMTEuNTc3NFpcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDE3LjU2ODIsXG4gICAgICAgIHc6IDE4LFxuICAgICAgICBoOiAxOCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTI4LjE2NjEgNy42MzNIMzMuMTgxMUwyOS4xNDE4IDEwLjUwNDhMMjYuNjQ0MSAxMi4yNjYyTDIyLjU4NTIgMTUuMTM4TDI0LjEyNjggMTAuNTA0OEwyMC4wNjggNy42MzNIMjUuMDgzTDI2LjYyNDYgMi45OTk4MkwyOC4xNjYxIDcuNjMzWk0yOS40NzM2IDExLjU3NzdMMjYuNjI0NiAxMi4yODYxTDMwLjY2MzkgMTUuMTc3MUwyOS40NzM2IDExLjU3NzdaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiA0My41LFxuICAgICAgICB3OiAxOCxcbiAgICAgICAgaDogMTgsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk01NC4wOTc5IDcuNjMzSDU5LjExMjlMNTUuMDczNiAxMC41MDQ4TDUyLjU3NTggMTIuMjY2Mkw0OC41MTcgMTUuMTM4TDUwLjA1ODYgMTAuNTA0OEw0NS45OTk4IDcuNjMzSDUxLjAxNDdMNTIuNTU2MyAyLjk5OTgyTDU0LjA5NzkgNy42MzNaTTU1LjQwNTQgMTEuNTc3N0w1Mi41NTY0IDEyLjI4NjFMNTYuNTk1NyAxNS4xNzcxTDU1LjQwNTQgMTEuNTc3N1pcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDY5LjcwNDYsXG4gICAgICAgIHc6IDE4LFxuICAgICAgICBoOiAxOCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTgwLjMwMjUgNy42MzNIODUuMzE3NUw4MS4yNzgyIDEwLjUwNDhMNzguNzgwNCAxMi4yNjYyTDc0LjcyMTYgMTUuMTM4TDc2LjI2MzIgMTAuNTA0OEw3Mi4yMDQzIDcuNjMzSDc3LjIxOTNMNzguNzYwOSAyLjk5OTgyTDgwLjMwMjUgNy42MzNaTTgxLjYxIDExLjU3NzdMNzguNzYxIDEyLjI4NjFMODIuODAwMyAxNS4xNzcxTDgxLjYxIDExLjU3NzdaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiA4NS43NzI3LFxuICAgICAgICB3OiAxOCxcbiAgICAgICAgaDogMTgsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk05Ni4zNzA2IDcuNjMzSDEwMS4zODZMOTcuMzQ2MyAxMC41MDQ4TDk0Ljg0ODUgMTIuMjY2Mkw5MC43ODk3IDE1LjEzOEw5Mi4zMzEzIDEwLjUwNDhMODguMjcyNSA3LjYzM0g5My4yODc0TDk0LjgyOSAyLjk5OTgyTDk2LjM3MDYgNy42MzNaTTk3LjY3NzggMTEuNTc3Nkw5NC44Mjg5IDEyLjI4Nkw5OC44NjgyIDE1LjE3N0w5Ny42Nzc4IDExLjU3NzZaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59O1xuXG5jb25zdCBjcmVhdGVTY2FsZUxpbmVzID0gKGRpbWVuc2lvbklkLCBjb2xvcikgPT4ge1xuICByZXR1cm4gU0NBTEVfU1ZHX1BST1BTW2RpbWVuc2lvbklkXS5saW5lcy5yZWR1Y2UoXG4gICAgKGFjYywgeyB4MSwgeTEsIHgyLCB5MiB9KSA9PlxuICAgICAgYCR7YWNjfTxsaW5lIHgxPVwiJHt4MX1cIiB5MT1cIiR7eTF9XCIgeDI9XCIke3gyfVwiIHkyPVwiJHt5Mn1cIiBzdHJva2U9XCIke2NvbG9yfVwiLz5gLFxuICAgICcnXG4gICk7XG59O1xuXG5jb25zdCBjcmVhdGVTY2FsZVN0YXIgPSAoZGltZW5zaW9uSWQsIHJhdGluZywgY29sb3IpID0+IHtcbiAgaWYgKHJhdGluZyA9PT0gMCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNvbnN0IHsgeCwgdywgaCwgcCB9ID0gU0NBTEVfU1ZHX1BST1BTW2RpbWVuc2lvbklkXS5zdGFyc1tyYXRpbmcgLSAxXTtcblxuICByZXR1cm4gYFxuICAgIDxyZWN0IHg9XCIke3h9XCIgeT1cIjAuNVwiIHdpZHRoPVwiJHt3fVwiIGhlaWdodD1cIiR7aH1cIiBmaWxsPVwiJHtjb2xvcn1cIiBzdHJva2U9XCIke2NvbG9yfVwiLz5cbiAgICAke3B9XG4gIGA7XG59O1xuXG5jb25zdCBzY2FsZSA9IChkaW1lbnNpb25zLCB7IGRpbWVuc2lvbklkLCBjb2xvciwgcmF0aW5nIH0pID0+IGBcbiAgPHN2ZyByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2NhbGVSYXRpbmdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwICR7XG4gICAgZGltZW5zaW9ucy53aWR0aFxuICB9ICR7ZGltZW5zaW9ucy5oZWlnaHR9XCI+XG4gICAgICA8ZyBjbGFzcz1cInRwLXN0YXJzXCI+XG4gICAgICAgICR7Y3JlYXRlU2NhbGVMaW5lcyhkaW1lbnNpb25JZCwgY29sb3IpfVxuICAgICAgICAke2NyZWF0ZVNjYWxlU3RhcihkaW1lbnNpb25JZCwgcmF0aW5nLCBjb2xvcil9XG4gICAgICA8L2c+XG4gIDwvc3ZnPmA7XG5cbmNvbnN0IGVtcHR5U3RhckNvbG9yID0gJyNkY2RjZTYnO1xuY29uc3Qgc3RhcnMgPSAoZGltZW5zaW9ucywgeyByYXRpbmcsIHRydXN0U2NvcmUsIGNvbG9yIH0pID0+IHtcbiAgY29uc3QgdGl0bGVJZCA9IGBzdGFyUmF0aW5nLSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpfWA7XG5cbiAgcmV0dXJuIGBcbiAgICA8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsbGVkYnk9XCIke3RpdGxlSWR9XCIgdmlld0JveD1cIjAgMCAke2RpbWVuc2lvbnMud2lkdGh9ICR7XG4gICAgICBkaW1lbnNpb25zLmhlaWdodFxuICAgIH1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgJHtzdmdTdGFyU3R5bGV9PlxuICAgICAgPHRpdGxlIGlkPVwiJHt0aXRsZUlkfVwiIGxhbmc9XCJlblwiPiR7dHJ1c3RTY29yZX0gb3V0IG9mIGZpdmUgc3RhciByYXRpbmcgb24gVHJ1c3RwaWxvdDwvdGl0bGU+XG4gICAgICA8ZyBjbGFzcz1cInRwLXN0YXJcIj5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cInRwLXN0YXJfX2NhbnZhc1wiIGZpbGw9XCIke1xuICAgICAgICAgICAgcmF0aW5nID49IDEgJiYgY29sb3IgPyBjb2xvciA6IGVtcHR5U3RhckNvbG9yXG4gICAgICAgICAgfVwiIGQ9XCJNMCA0Ni4zMzAwMDJoNDYuMzc1NTg2VjBIMHpcIi8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19zaGFwZVwiIGQ9XCJNMzkuNTMzOTM2IDE5LjcxMTQzM0wxMy4yMzAyMzkgMzguODAwNjVsMy44MzgyMTYtMTEuNzk3ODI3TDcuMDIxMTUgMTkuNzExNDMzaDEyLjQxODk3NWwzLjgzNzQxNy0xMS43OTg2MjQgMy44Mzc0MTggMTEuNzk4NjI0aDEyLjQxODk3NXpNMjMuMjc4NSAzMS41MTAwNzVsNy4xODM1OTUtMS41MDk1NzYgMi44NjIxMTQgOC44MDAxNTJMMjMuMjc4NSAzMS41MTAwNzV6XCIgZmlsbD1cIiNGRkZcIi8+XG4gICAgICA8L2c+XG4gICAgICA8ZyBjbGFzcz1cInRwLXN0YXJcIj5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cInRwLXN0YXJfX2NhbnZhc1wiIGZpbGw9XCIke1xuICAgICAgICAgICAgcmF0aW5nID49IDIgJiYgY29sb3IgPyBjb2xvciA6IGVtcHR5U3RhckNvbG9yXG4gICAgICAgICAgfVwiIGQ9XCJNNTEuMjQ4MTYgNDYuMzMwMDAyaDQ2LjM3NTU4N1YwSDUxLjI0ODE2MXpcIi8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXMtLWhhbGZcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA+PSAxLjUgJiYgY29sb3IgPyBjb2xvciA6IGVtcHR5U3RhckNvbG9yXG4gICAgICAgICAgfVwiIGQ9XCJNNTEuMjQ4MTYgNDYuMzMwMDAyaDIzLjE4Nzc5M1YwSDUxLjI0ODE2MXpcIi8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19zaGFwZVwiIGQ9XCJNNzQuOTkwOTc4IDMxLjMyOTkxTDgxLjE1MDkwOCAzMCA4NCAzOWwtOS42NjAyMDYtNy4yMDI3ODZMNjQuMzAyNzkgMzlsMy44OTU2MzYtMTEuODQwNjY2TDU4IDE5Ljg0MTQ2NmgxMi42MDU1NzdMNzQuNDk5NTk1IDhsMy44OTU2MzcgMTEuODQxNDY2SDkxTDc0Ljk5MDk3OCAzMS4zMjk5MDl6XCIgZmlsbD1cIiNGRkZcIi8+XG4gICAgICA8L2c+XG4gICAgICA8ZyBjbGFzcz1cInRwLXN0YXJcIj5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cInRwLXN0YXJfX2NhbnZhc1wiIGZpbGw9XCIke1xuICAgICAgICAgICAgcmF0aW5nID49IDMgJiYgY29sb3IgPyBjb2xvciA6IGVtcHR5U3RhckNvbG9yXG4gICAgICAgICAgfVwiIGQ9XCJNMTAyLjUzMjIwOSA0Ni4zMzAwMDJoNDYuMzc1NTg2VjBoLTQ2LjM3NTU4NnpcIi8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXMtLWhhbGZcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA+PSAyLjUgJiYgY29sb3IgPyBjb2xvciA6IGVtcHR5U3RhckNvbG9yXG4gICAgICAgICAgfVwiIGQ9XCJNMTAyLjUzMjIwOSA0Ni4zMzAwMDJoMjMuMTg3NzkzVjBoLTIzLjE4Nzc5M3pcIi8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19zaGFwZVwiIGQ9XCJNMTQyLjA2Njk5NCAxOS43MTE0MzNMMTE1Ljc2MzI5OCAzOC44MDA2NWwzLjgzODIxNS0xMS43OTc4MjctMTAuMDQ3MzA0LTcuMjkxMzkxaDEyLjQxODk3NWwzLjgzNzQxOC0xMS43OTg2MjQgMy44Mzc0MTcgMTEuNzk4NjI0aDEyLjQxODk3NXpNMTI1LjgxMTU2IDMxLjUxMDA3NWw3LjE4MzU5NS0xLjUwOTU3NiAyLjg2MjExMyA4LjgwMDE1Mi0xMC4wNDU3MDgtNy4yOTA1NzZ6XCIgZmlsbD1cIiNGRkZcIi8+XG4gICAgICA8L2c+XG4gICAgICA8ZyBjbGFzcz1cInRwLXN0YXJcIj5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cInRwLXN0YXJfX2NhbnZhc1wiIGZpbGw9XCIke1xuICAgICAgICAgICAgcmF0aW5nID49IDQgJiYgY29sb3IgPyBjb2xvciA6IGVtcHR5U3RhckNvbG9yXG4gICAgICAgICAgfVwiIGQ9XCJNMTUzLjgxNTQ1OCA0Ni4zMzAwMDJoNDYuMzc1NTg2VjBoLTQ2LjM3NTU4NnpcIi8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXMtLWhhbGZcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA+PSAzLjUgJiYgY29sb3IgPyBjb2xvciA6IGVtcHR5U3RhckNvbG9yXG4gICAgICAgICAgfVwiIGQ9XCJNMTUzLjgxNTQ1OCA0Ni4zMzAwMDJoMjMuMTg3NzkzVjBoLTIzLjE4Nzc5M3pcIi8+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19zaGFwZVwiIGQ9XCJNMTkzLjM0ODM1NSAxOS43MTE0MzNMMTY3LjA0NTQ1NyAzOC44MDA2NWwzLjgzNzQxNy0xMS43OTc4MjctMTAuMDQ3MzAzLTcuMjkxMzkxaDEyLjQxODk3NGwzLjgzNzQxOC0xMS43OTg2MjQgMy44Mzc0MTggMTEuNzk4NjI0aDEyLjQxODk3NHpNMTc3LjA5MjkyIDMxLjUxMDA3NWw3LjE4MzU5NS0xLjUwOTU3NiAyLjg2MjExNCA4LjgwMDE1Mi0xMC4wNDU3MDktNy4yOTA1NzZ6XCIgZmlsbD1cIiNGRkZcIi8+XG4gICAgICA8L2c+XG4gICAgICA8ZyBjbGFzcz1cInRwLXN0YXJcIj5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cInRwLXN0YXJfX2NhbnZhc1wiIGZpbGw9XCIke1xuICAgICAgICAgICAgcmF0aW5nID09PSA1ICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTIwNS4wNjQ0MTYgNDYuMzMwMDAyaDQ2LjM3NTU4N1YwaC00Ni4zNzU1ODd6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fY2FudmFzLS1oYWxmXCIgZmlsbD1cIiR7XG4gICAgICAgICAgICByYXRpbmcgPj0gNC41ICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTIwNS4wNjQ0MTYgNDYuMzMwMDAyaDIzLjE4Nzc5M1YwaC0yMy4xODc3OTN6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fc2hhcGVcIiBkPVwiTTI0NC41OTcwMjIgMTkuNzExNDMzbC0yNi4zMDI5IDE5LjA4OTIxOCAzLjgzNzQxOS0xMS43OTc4MjctMTAuMDQ3MzA0LTcuMjkxMzkxaDEyLjQxODk3NGwzLjgzNzQxOC0xMS43OTg2MjQgMy44Mzc0MTggMTEuNzk4NjI0aDEyLjQxODk3NXptLTE2LjI1NTQzNiAxMS43OTg2NDJsNy4xODM1OTUtMS41MDk1NzYgMi44NjIxMTQgOC44MDAxNTItMTAuMDQ1NzA5LTcuMjkwNTc2elwiIGZpbGw9XCIjRkZGXCIvPlxuICAgICAgPC9nPlxuICAgIDwvc3ZnPlxuICBgO1xufTtcblxuY29uc3QgbG9nbyA9IChkaW1lbnNpb25zKSA9PiB7XG4gIGNvbnN0IHRpdGxlSWQgPSBgdHJ1c3RwaWxvdExvZ28tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMil9YDtcblxuICByZXR1cm4gYFxuICAgIDxzdmcgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWxsZWRieT1cIiR7dGl0bGVJZH1cIiB2aWV3Qm94PVwiMCAwICR7ZGltZW5zaW9ucy53aWR0aH0gJHtkaW1lbnNpb25zLmhlaWdodH1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgJHtzdmdTdGFyU3R5bGV9PlxuICAgICAgPHRpdGxlIGlkPVwiJHt0aXRsZUlkfVwiPlRydXN0cGlsb3Q8L3RpdGxlPlxuICAgICAgPHBhdGggY2xhc3M9XCJ0cC1sb2dvX190ZXh0XCIgZD1cIk0zMy4wNzQ3NzQgMTEuMDcwMDVINDUuODE4MDZ2Mi4zNjQxOTZoLTUuMDEwNjU2djEzLjI5MDMxNmgtMi43NTUzMDZWMTMuNDM0MjQ2aC00Ljk4ODQzNVYxMS4wNzAwNWguMDExMTF6bTEyLjE5ODg5MiA0LjMxOTYyOWgyLjM1NTM0MXYyLjE4NzQzM2guMDQ0NDRjLjA3Nzc3MS0uMzA5MzM0LjIyMjIwMy0uNjA3NjIuNDMzMjk1LS44OTQ4NTkuMjExMDkyLS4yODcyMzkuNDY2NjI0LS41NjM0My43NjY1OTctLjc5NTQzLjI5OTk3Mi0uMjQzMDQ4LjYzMzI3Ni0uNDMwODU4Ljk5OTkwOS0uNTg1NTI1LjM2NjYzMy0uMTQzNjIuNzQ0Mzc3LS4yMjA5NTMgMS4xMjIxMi0uMjIwOTUzLjI4ODg2MyAwIC40OTk5NTUuMDExMDQ3LjYxMTA1Ni4wMjIwOTUuMTExMS4wMTEwNDguMjIyMjAyLjAzMzE0My4zNDQ0MTMuMDQ0MTl2Mi40MDgzODdjLS4xNzc3NjItLjAzMzE0My0uMzU1NTIzLS4wNTUyMzgtLjU0NDM5NS0uMDc3MzMzLS4xODg4NzItLjAyMjA5Ni0uMzY2NjMzLS4wMzMxNDMtLjU0NDM5NS0uMDMzMTQzLS40MjIxODQgMC0uODIyMTQ4LjA4ODM4LTEuMTk5ODkxLjI1NDA5Ni0uMzc3NzQ0LjE2NTcxNC0uNjk5OTM2LjQxOTgxLS45Nzc2ODkuNzQwMTkyLS4yNzc3NTMuMzMxNDI5LS40OTk5NTUuNzI5MTQ0LS42NjY2MDYgMS4yMTUyNC0uMTY2NjUyLjQ4NjA5Ny0uMjQ0NDIyIDEuMDM4NDgtLjI0NDQyMiAxLjY2ODE5NXY1LjM5MTI1aC0yLjUxMDg4M1YxNS4zODk2OGguMDExMTF6bTE4LjIyMDU2NyAxMS4zMzQ4ODNINjEuMDI3Nzl2LTEuNTc5ODEzaC0uMDQ0NDRjLS4zMTEwODMuNTc0NDc3LS43NjY1OTcgMS4wMjc0My0xLjM3NzY1MyAxLjM2OTkwOC0uNjExMDU1LjM0MjQ3Ny0xLjIzMzIyMS41MTkyNC0xLjg2NjQ5Ny41MTkyNC0xLjQ5OTg2NCAwLTIuNTg4NjU0LS4zNjQ1NzMtMy4yNTUyNi0xLjEwNDc2NS0uNjY2NjA2LS43NDAxOTMtLjk5OTkwOS0xLjg1NjAwNS0uOTk5OTA5LTMuMzQ3NDM3VjE1LjM4OTY4aDIuNTEwODgzdjYuOTQ4OTY4YzAgLjk5NDI4OC4xODg4NzIgMS43MDEzMzcuNTc3NzI1IDIuMTEwMS4zNzc3NDQuNDA4NzYzLjkyMjEzOS42MTg2NjggMS42MTA5NjUuNjE4NjY4LjUzMzI4NSAwIC45NjY1OC0uMDc3MzMzIDEuMzIyMTAyLS4yNDMwNDguMzU1NTI0LS4xNjU3MTQuNjQ0Mzg2LS4zNzU2Mi44NTU0NzgtLjY1MTgxLjIyMjIwMi0uMjY1MTQ0LjM3Nzc0NC0uNTk2NTc0LjQ3NzczNS0uOTcyMTk0LjA5OTk5LS4zNzU2Mi4xNDQ0MzEtLjc4NDM4Mi4xNDQ0MzEtMS4yMjYyODh2LTYuNTczMzQ5aDIuNTEwODgzdjExLjMyMzgzNnptNC4yNzczOS0zLjYzNDY3NWMuMDc3NzcuNzI5MTQ0LjM1NTUyMiAxLjIzNzMzNi44MzMyNTcgMS41MzU2MjMuNDg4ODQ0LjI4NzIzOCAxLjA2NjU3LjQ0MTkwNSAxLjc0NDI4Ni40NDE5MDUuMjMzMzEyIDAgLjQ5OTk1NC0uMDIyMDk1Ljc5OTkyNy0uMDU1MjM4LjI5OTk3My0uMDMzMTQzLjU4ODgzNi0uMTEwNDc2Ljg0NDM2OC0uMjA5OTA1LjI2NjY0Mi0uMDk5NDI5LjQ3NzczNC0uMjU0MDk2LjY1NTQ5Ni0uNDUyOTU0LjE2NjY1Mi0uMTk4ODU3LjI0NDQyMi0uNDUyOTUzLjIzMzMxMi0uNzczMzM1LS4wMTExMS0uMzIwMzgxLS4xMzMzMjEtLjU4NTUyNS0uMzU1NTIzLS43ODQzODItLjIyMjIwMi0uMjA5OTA2LS40OTk5NTUtLjM2NDU3My0uODQ0MzY4LS40OTcxNDQtLjM0NDQxMy0uMTIxNTI1LS43MzMyNjctLjIzMi0xLjE3NzY3LS4zMjAzODItLjQ0NDQwNS0uMDg4MzgxLS44ODg4MDktLjE4NzgxLTEuMzQ0MzIzLS4yODcyMzktLjQ2NjYyNC0uMDk5NDI5LS45MjIxMzgtLjIzMi0xLjM1NTQzMi0uMzc1NjItLjQzMzI5NC0uMTQzNjItLjgyMjE0OC0uMzQyNDc3LTEuMTY2NTYxLS41OTY1NzMtLjM0NDQxMy0uMjQzMDQ4LS42MjIxNjYtLjU2MzQzLS44MjIxNDgtLjk1MDA5Ny0uMjExMDkyLS4zODY2NjgtLjMxMTA4My0uODYxNzE2LS4zMTEwODMtMS40MzYxOTQgMC0uNjE4NjY4LjE1NTU0Mi0xLjEyNjg2LjQ1NTUxNS0xLjU0NjY3LjI5OTk3Mi0uNDE5ODEuNjg4ODI2LS43NTEyNCAxLjE0NDM0LTEuMDA1MzM2LjQ2NjYyNC0uMjU0MDk1Ljk3NzY5LS40MzA4NTggMS41NDQzMDQtLjU0MTMzNC41NjY2MTUtLjA5OTQyOSAxLjExMTAxLS4xNTQ2NjcgMS42MjIwNzUtLjE1NDY2Ny41ODg4MzYgMCAxLjE1NTQ1LjA2NjI4NiAxLjY4ODczNi4xODc4MS41MzMyODUuMTIxNTI0IDEuMDIyMTMuMzIwMzgxIDEuNDU1NDIzLjYwNzYyLjQzMzI5NC4yNzYxOTEuNzg4ODE3LjY0MDc2NCAxLjA3NzY4IDEuMDgyNjcuMjg4ODYzLjQ0MTkwNS40NjY2MjQuOTgzMjQuNTQ0Mzk1IDEuNjEyOTU1aC0yLjYyMTk4NGMtLjEyMjIxMS0uNTk2NTcyLS4zODg4NTQtMS4wMDUzMzUtLjgyMjE0OC0xLjIwNDE5My0uNDMzMjk0LS4yMDk5MDUtLjkzMzI0OC0uMzA5MzM0LTEuNDg4NzUzLS4zMDkzMzQtLjE3Nzc2MiAwLS4zODg4NTQuMDExMDQ4LS42MzMyNzYuMDQ0MTktLjI0NDQyMi4wMzMxNDQtLjQ2NjYyNC4wODgzODItLjY4ODgyNi4xNjU3MTUtLjIxMTA5Mi4wNzczMzQtLjM4ODg1NC4xOTg4NTgtLjU0NDM5NS4zNTM1MjUtLjE0NDQzMi4xNTQ2NjctLjIyMjIwMy4zNTM1MjUtLjIyMjIwMy42MDc2MiAwIC4zMDkzMzUuMTExMTAxLjU1MjM4My4zMjIxOTMuNzQwMTkzLjIxMTA5Mi4xODc4MS40ODg4NDUuMzQyNDc3LjgzMzI1OC40NzUwNDguMzQ0NDEzLjEyMTUyNC43MzMyNjcuMjMyIDEuMTc3NjcxLjMyMDM4Mi40NDQ0MDQuMDg4MzgxLjg5OTkxOC4xODc4MSAxLjM2NjU0Mi4yODcyMzkuNDU1NTE1LjA5OTQyOS44OTk5MTkuMjMyIDEuMzQ0MzIzLjM3NTYyLjQ0NDQwNC4xNDM2Mi44MzMyNTcuMzQyNDc3IDEuMTc3NjcuNTk2NTczLjM0NDQxNC4yNTQwOTUuNjIyMTY2LjU2MzQzLjgzMzI1OC45MzkwNS4yMTEwOTIuMzc1NjIuMzIyMTkzLjg1MDY2OC4zMjIxOTMgMS40MDMwNSAwIC42NzM5MDYtLjE1NTU0MSAxLjIzNzMzNi0uNDY2NjI0IDEuNzEyMzg1LS4zMTEwODMuNDY0MDAxLS43MTEwNDcuODUwNjY5LTEuMTk5ODkxIDEuMTM3OTA3LS40ODg4NDUuMjg3MjQtMS4wNDQzNS41MDgxOTItMS42NDQyOTUuNjQwNzY0LS41OTk5NDYuMTMyNTcyLTEuMTk5ODkxLjE5ODg1Ny0xLjc4ODcyNy4xOTg4NTctLjcyMjE1NiAwLTEuMzg4NzYyLS4wNzczMzMtMS45OTk4MTgtLjI0MzA0OC0uNjExMDU2LS4xNjU3MTQtMS4xNDQzNC0uNDA4NzYzLTEuNTg4NzQ1LS43MjkxNDQtLjQ0NDQwNC0uMzMxNDMtLjc5OTkyNy0uNzQwMTkyLTEuMDU1NDYtMS4yMjYyODktLjI1NTUzMi0uNDg2MDk2LS4zODg4NTMtMS4wNzE2MjEtLjQxMTA3My0xLjc0NTUyOGgyLjUzMzEwM3YtLjAyMjA5NXptOC4yODgxMzUtNy43MDAyMDhoMS44OTk4Mjh2LTMuNDAyNjc1aDIuNTEwODgzdjMuNDAyNjc1aDIuMjY2NDZ2MS44NjcwNTJoLTIuMjY2NDZ2Ni4wNTQxMDljMCAuMjY1MTQzLjAxMTExLjQ4NjA5Ni4wMzMzMy42ODQ5NTQuMDIyMjIuMTg3ODEuMDc3NzcuMzUzNTI0LjE1NTU0Mi40ODYwOTYuMDc3NzcuMTMyNTcyLjE5OTk4MS4yMzIuMzY2NjMzLjI5ODI4Ny4xNjY2NTEuMDY2Mjg1LjM3Nzc0My4wOTk0MjguNjY2NjA2LjA5OTQyOC4xNzc3NjIgMCAuMzU1NTIzIDAgLjUzMzI4NS0uMDExMDQ3LjE3Nzc2Mi0uMDExMDQ4LjM1NTUyMy0uMDMzMTQzLjUzMzI4NS0uMDc3MzM0djEuOTMzMzM4Yy0uMjc3NzUzLjAzMzE0My0uNTU1NTA1LjA1NTIzOC0uODExMDM4LjA4ODM4MS0uMjY2NjQyLjAzMzE0My0uNTMzMjg1LjA0NDE5LS44MTEwMzcuMDQ0MTktLjY2NjYwNiAwLTEuMTk5ODkxLS4wNjYyODUtMS41OTk4NTUtLjE4NzgxLS4zOTk5NjMtLjEyMTUyMy0uNzIyMTU2LS4zMDkzMzMtLjk0NDM1OC0uNTUyMzgxLS4yMzMzMTMtLjI0MzA0OS0uMzc3NzQ0LS41NDEzMzUtLjQ2NjYyNS0uOTA1OTA3LS4wNzc3Ny0uMzY0NTczLS4xMzMzMi0uNzg0MzgzLS4xNDQ0MzEtMS4yNDgzODR2LTYuNjgzODI1aC0xLjg5OTgyN3YtMS44ODkxNDdoLS4wMjIyMnptOC40NTQ3ODggMGgyLjM3NzU2MlYxNi45MjUzaC4wNDQ0NGMuMzU1NTIzLS42NjI4NTguODQ0MzY4LTEuMTI2ODYgMS40Nzc2NDQtMS40MTQwOTguNjMzMjc2LS4yODcyMzkgMS4zMTA5OTItLjQzMDg1OCAyLjA1NTM2OS0uNDMwODU4Ljg5OTkxOCAwIDEuNjc3NjI1LjE1NDY2NyAyLjM0NDIzMS40NzUwNDguNjY2NjA2LjMwOTMzNSAxLjIyMjExMS43NDAxOTMgMS42NjY1MTUgMS4yOTI1NzUuNDQ0NDA1LjU1MjM4Mi43NjY1OTcgMS4xOTMxNDUuOTg4OCAxLjkyMjI5LjIyMjIwMi43MjkxNDUuMzMzMzAzIDEuNTEzNTI3LjMzMzMwMyAyLjM0MjEgMCAuNzYyMjg4LS4wOTk5OTEgMS41MDI0OC0uMjk5OTczIDIuMjA5NTMtLjE5OTk4Mi43MTgwOTYtLjQ5OTk1NSAxLjM0NzgxMi0uODk5OTE4IDEuOTAwMTk0LS4zOTk5NjQuNTUyMzgzLS45MTEwMjkuOTgzMjQtMS41MzMxOTQgMS4zMTQ2Ny0uNjIyMTY2LjMzMTQzLTEuMzQ0MzIzLjQ5NzE0NC0yLjE4ODY5LjQ5NzE0NC0uMzY2NjM0IDAtLjczMzI2Ny0uMDMzMTQzLTEuMDk5OS0uMDk5NDI5LS4zNjY2MzQtLjA2NjI4Ni0uNzIyMTU3LS4xNzY3NjItMS4wNTU0Ni0uMzIwMzgxLS4zMzMzMDMtLjE0MzYyLS42NTU0OTYtLjMzMTQzLS45MzMyNDktLjU2MzQzLS4yODg4NjMtLjIzMi0uNTIyMTc1LS40OTcxNDQtLjcyMjE1Ny0uNzk1NDNoLS4wNDQ0NHY1LjY1NjM5M2gtMi41MTA4ODNWMTUuMzg5Njh6bTguNzc2OTggNS42Nzg0OWMwLS41MDgxOTMtLjA2NjY2LTEuMDA1MzM3LS4xOTk5ODEtMS40OTE0MzMtLjEzMzMyMS0uNDg2MDk2LS4zMzMzMDMtLjkwNTkwNy0uNTk5OTQ2LTEuMjgxNTI3LS4yNjY2NDItLjM3NTYyLS41OTk5NDUtLjY3MzkwNi0uOTg4Nzk5LS44OTQ4NTktLjM5OTk2My0uMjIwOTUzLS44NTU0NzgtLjM0MjQ3Ny0xLjM2NjU0Mi0uMzQyNDc3LTEuMDU1NDYgMC0xLjg1NTM4Ny4zNjQ1NzItMi4zODg2NzIgMS4wOTM3MTctLjUzMzI4NS43MjkxNDQtLjc5OTkyOCAxLjcwMTMzNy0uNzk5OTI4IDIuOTE2NTc4IDAgLjU3NDQ3OC4wNjY2NjEgMS4xMDQ3NjQuMjExMDkyIDEuNTkwODYuMTQ0NDMyLjQ4NjA5Ny4zNDQ0MTQuOTA1OTA4LjYzMzI3NiAxLjI1OTQzMi4yNzc3NTMuMzUzNTI1LjYxMTA1Ni42Mjk3MTYuOTk5OTEuODI4NTc0LjM4ODg1My4yMDk5MDUuODQ0MzY3LjMwOTMzNCAxLjM1NTQzMi4zMDkzMzQuNTc3NzI1IDAgMS4wNTU0Ni0uMTIxNTI0IDEuNDU1NDIzLS4zNTM1MjUuMzk5OTY0LS4yMzIuNzIyMTU3LS41NDEzMzUuOTc3NjktLjkwNTkwNy4yNTU1MzEtLjM3NTYyLjQ0NDQwMy0uNzk1NDMuNTU1NTA0LTEuMjcwNDc5LjA5OTk5MS0uNDc1MDQ5LjE1NTU0Mi0uOTYxMTQ1LjE1NTU0Mi0xLjQ1ODI4OXptNC40MzI5MzEtOS45OTgxMmgyLjUxMDg4M3YyLjM2NDE5N2gtMi41MTA4ODNWMTEuMDcwMDV6bTAgNC4zMTk2M2gyLjUxMDg4M3YxMS4zMzQ4ODNoLTIuNTEwODgzVjE1LjM4OTY3OXptNC43NTUxMjQtNC4zMTk2M2gyLjUxMDg4M3YxNS42NTQ1MTNoLTIuNTEwODgzVjExLjA3MDA1em0xMC4yMTAxODQgMTUuOTYzODQ3Yy0uOTExMDI5IDAtMS43MjIwNjYtLjE1NDY2Ny0yLjQzMzExMy0uNDUyOTUzLS43MTEwNDYtLjI5ODI4Ny0xLjMxMDk5Mi0uNzE4MDk3LTEuODEwOTQ2LTEuMjM3MzM3LS40ODg4NDUtLjUzMDI4Ny0uODY2NTg4LTEuMTYwMDAyLTEuMTIyMTItMS44ODkxNDctLjI1NTUzMy0uNzI5MTQ0LS4zODg4NTQtMS41MzU2MjItLjM4ODg1NC0yLjQwODM4NiAwLS44NjE3MTYuMTMzMzIxLTEuNjU3MTQ3LjM4ODg1My0yLjM4NjI5MS4yNTU1MzMtLjcyOTE0NS42MzMyNzYtMS4zNTg4NiAxLjEyMjEyLTEuODg5MTQ4LjQ4ODg0NS0uNTMwMjg3IDEuMDk5OS0uOTM5MDUgMS44MTA5NDctMS4yMzczMzYuNzExMDQ3LS4yOTgyODYgMS41MjIwODQtLjQ1Mjk1MyAyLjQzMzExMy0uNDUyOTUzLjkxMTAyOCAwIDEuNzIyMDY2LjE1NDY2NyAyLjQzMzExMi40NTI5NTMuNzExMDQ3LjI5ODI4NyAxLjMxMDk5Mi43MTgwOTcgMS44MTA5NDcgMS4yMzczMzYuNDg4ODQ0LjUzMDI4Ny44NjY1ODggMS4xNjAwMDMgMS4xMjIxMiAxLjg4OTE0OC4yNTU1MzIuNzI5MTQ0LjM4ODg1NCAxLjUyNDU3NS4zODg4NTQgMi4zODYyOSAwIC44NzI3NjUtLjEzMzMyMiAxLjY3OTI0My0uMzg4ODU0IDIuNDA4Mzg3LS4yNTU1MzIuNzI5MTQ1LS42MzMyNzYgMS4zNTg4Ni0xLjEyMjEyIDEuODg5MTQ3LS40ODg4NDUuNTMwMjg3LTEuMDk5OS45MzkwNS0xLjgxMDk0NyAxLjIzNzMzNy0uNzExMDQ2LjI5ODI4Ni0xLjUyMjA4NC40NTI5NTMtMi40MzMxMTIuNDUyOTUzem0wLTEuOTc3NTI4Yy41NTU1MDUgMCAxLjA0NDM1LS4xMjE1MjQgMS40NTU0MjMtLjM1MzUyNS40MTEwNzQtLjIzMi43NDQzNzctLjU0MTMzNSAxLjAxMTAyLS45MTY5NTQuMjY2NjQyLS4zNzU2Mi40NTU1MTMtLjgwNjQ3OC41ODg4MzUtMS4yODE1MjcuMTIyMjEtLjQ3NTA0OS4xODg4NzItLjk2MTE0NS4xODg4NzItMS40NTgyOSAwLS40ODYwOTYtLjA2NjY2MS0uOTYxMTQ0LS4xODg4NzItMS40NDcyNC0uMTIyMjExLS40ODYwOTctLjMyMjE5My0uOTA1OTA3LS41ODg4MzYtMS4yODE1MjctLjI2NjY0Mi0uMzc1NjItLjU5OTk0NS0uNjczOTA3LTEuMDExMDE5LS45MDU5MDctLjQxMTA3NC0uMjMyLS44OTk5MTgtLjM1MzUyNS0xLjQ1NTQyMy0uMzUzNTI1LS41NTU1MDUgMC0xLjA0NDM1LjEyMTUyNC0xLjQ1NTQyNC4zNTM1MjUtLjQxMTA3My4yMzItLjc0NDM3Ni41NDEzMzQtMS4wMTEwMTkuOTA1OTA3LS4yNjY2NDIuMzc1NjItLjQ1NTUxNC43OTU0My0uNTg4ODM1IDEuMjgxNTI2LS4xMjIyMTEuNDg2MDk3LS4xODg4NzIuOTYxMTQ1LS4xODg4NzIgMS40NDcyNDIgMCAuNDk3MTQ0LjA2NjY2Ljk4MzI0LjE4ODg3MiAxLjQ1ODI4OS4xMjIyMS40NzUwNDkuMzIyMTkzLjkwNTkwNy41ODg4MzUgMS4yODE1MjcuMjY2NjQzLjM3NTYyLjU5OTk0Ni42ODQ5NTQgMS4wMTEwMi45MTY5NTQuNDExMDczLjI0MzA0OC44OTk5MTguMzUzNTI1IDEuNDU1NDIzLjM1MzUyNXptNi40ODgzLTkuNjY2NjloMS44OTk4Mjd2LTMuNDAyNjc0aDIuNTEwODgzdjMuNDAyNjc1aDIuMjY2NDZ2MS44NjcwNTJoLTIuMjY2NDZ2Ni4wNTQxMDljMCAuMjY1MTQzLjAxMTExLjQ4NjA5Ni4wMzMzMy42ODQ5NTQuMDIyMjIuMTg3ODEuMDc3NzcuMzUzNTI0LjE1NTU0MS40ODYwOTYuMDc3NzcxLjEzMjU3Mi4xOTk5ODIuMjMyLjM2NjYzNC4yOTgyODcuMTY2NjUxLjA2NjI4NS4zNzc3NDMuMDk5NDI4LjY2NjYwNi4wOTk0MjguMTc3NzYyIDAgLjM1NTUyMyAwIC41MzMyODUtLjAxMTA0Ny4xNzc3NjItLjAxMTA0OC4zNTU1MjMtLjAzMzE0My41MzMyODUtLjA3NzMzNHYxLjkzMzMzOGMtLjI3Nzc1My4wMzMxNDMtLjU1NTUwNS4wNTUyMzgtLjgxMTAzOC4wODgzODEtLjI2NjY0Mi4wMzMxNDMtLjUzMzI4NS4wNDQxOS0uODExMDM3LjA0NDE5LS42NjY2MDYgMC0xLjE5OTg5MS0uMDY2Mjg1LTEuNTk5ODU1LS4xODc4MS0uMzk5OTYzLS4xMjE1MjMtLjcyMjE1Ni0uMzA5MzMzLS45NDQzNTgtLjU1MjM4MS0uMjMzMzEzLS4yNDMwNDktLjM3Nzc0NC0uNTQxMzM1LS40NjY2MjUtLjkwNTkwNy0uMDc3NzctLjM2NDU3My0uMTMzMzIxLS43ODQzODMtLjE0NDQzMS0xLjI0ODM4NHYtNi42ODM4MjVoLTEuODk5ODI3di0xLjg4OTE0N2gtLjAyMjIyelwiIGZpbGw9XCIjMTkxOTE5XCIvPlxuICAgICAgPHBhdGggY2xhc3M9XCJ0cC1sb2dvX19zdGFyXCIgZmlsbD1cIiMwMEI2N0FcIiBkPVwiTTMwLjE0MTcwNyAxMS4wNzAwNUgxOC42MzE2NEwxNS4wNzY0MDguMTc3MDcxbC0zLjU2NjM0MiAxMC44OTI5NzdMMCAxMS4wNTkwMDJsOS4zMjEzNzYgNi43MzkwNjMtMy41NjYzNDMgMTAuODgxOTMgOS4zMjEzNzUtNi43MjgwMTYgOS4zMTAyNjYgNi43MjgwMTYtMy41NTUyMzMtMTAuODgxOTMgOS4zMTAyNjYtNi43MjgwMTZ6XCIvPlxuICAgICAgPHBhdGggY2xhc3M9XCJ0cC1sb2dvX19zdGFyLW5vdGNoXCIgZmlsbD1cIiMwMDUxMjhcIiBkPVwiTTIxLjYzMTM2OSAyMC4yNjE2OWwtLjc5OTkyOC0yLjQ2MzYyNS01Ljc1NTAzMyA0LjE1MzkxNHpcIi8+XG4gICAgPC9zdmc+XG4gIGA7XG59O1xuXG5jb25zdCBhcnJvd1NsaWRlciA9IChkaW1lbnNpb25zKSA9PiBgXG4gIDxzdmcgdmlld0JveD1cIjAgMCAke2RpbWVuc2lvbnMud2lkdGh9ICR7ZGltZW5zaW9ucy5oZWlnaHR9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiICR7c3ZnU3RhclN0eWxlfT5cbiAgICAgIDxjaXJjbGUgY2xhc3M9XCJhcnJvdy1zbGlkZXItY2lyY2xlXCIgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTEuNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzhDOEM4Q1wiLz5cbiAgICAgIDxwYXRoIGNsYXNzPVwiYXJyb3ctc2xpZGVyLXNoYXBlXCIgZmlsbD1cIiM4QzhDOENcIiBkPVwiTTEwLjUwODg4MzUgMTJsMy4zMDgwNTgyLTMuMDI0NTEwNDFjLjI0NDA3NzctLjIyMzE1Njc0LjI0NDA3NzctLjU4NDk2NTMgMC0uODA4MTIyMDQtLjI0NDA3NzYtLjIyMzE1NjczLS42Mzk4MDU4LS4yMjMxNTY3My0uODgzODgzNCAwTDkuMTgzMDU4MjYgMTEuNTk1OTM5Yy0uMjQ0MDc3NjguMjIzMTU2Ny0uMjQ0MDc3NjguNTg0OTY1MyAwIC44MDgxMjJsMy43NTAwMDAwNCAzLjQyODU3MTRjLjI0NDA3NzYuMjIzMTU2OC42Mzk4MDU4LjIyMzE1NjguODgzODgzNCAwIC4yNDQwNzc3LS4yMjMxNTY3LjI0NDA3NzctLjU4NDk2NTMgMC0uODA4MTIyTDEwLjUwODg4MzUgMTJ6XCIvPlxuICA8L3N2Zz5cbmA7XG5cbmNvbnN0IHJlcGx5QXJyb3cgPSAoZGltZW5zaW9ucywgeyBlbGVtZW50Q29sb3IgfSkgPT4gYFxuPHN2ZyB2aWV3Qm94PVwiMCAwICR7ZGltZW5zaW9ucy53aWR0aH0gJHtcbiAgZGltZW5zaW9ucy5oZWlnaHRcbn1cIiB4bWxucz3igJxodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z+KAnCAke3N2Z1N0YXJTdHlsZX0+XG4gIDxwYXRoIGQ9XCJNNS4yNDA0MDUyNiA4LjYwNzcwNjQ1YzAgLjQwMjc1MDA3LS4yNTU3NjM4Ny41MTMwMDAwOC0uNTcwMDMwOTIuMjQ4MjUwMDRMLjIzNjEzMzggNC45ODUyMDU4M0MuMDg3MTg0MSA0Ljg2OTg2Mzc1IDAgNC42OTIwODY3NyAwIDQuNTAzNzA1NzVzLjA4NzE4NDEtLjM2NjE1OC4yMzYxMzM4LS40ODE1MDAwOEw0LjY3MDM3NDM0LjE0NDcwNTAxYy4zMTUwMTcwOS0uMjY2MjUwMDQuNTcwMDMwOTItLjE1NDUwMDAzLjU3MDAzMDkyLjI0ODI1MDA0VjIuOTk5MjA1NWguNzUwMDQwNjljMi44NjUxNTU0MSAwIDUuMzE1NTM4MzMgMi4zNzQ1MDA0IDUuOTEyNTcwNzIgNC45Mzk1MDA4M2E0LjMzODUzNDggNC4zMzg1MzQ4IDAgMCAxIC4wOTM3NTUwOC41NzgyNTAxYy4wMjI1MDEyMy4yMDAyNTAwNC0uMDc1MDA0MDYuMjQ0NTAwMDQtLjIxODI2MTg0LjEwMzUwMDAyIDAgMC0uMDQwNTAyMi0uMDM2LS4wNzUwMDQwNi0uMDc1MDAwMDFDMTAuMTg2NzM2OTkgNy4wMDc2NjM5OCA4LjE0NjU1NTc5IDYuMDk3Mjc2NjYgNS45ODg5NDU4NiA1Ljk5NTQ1NmgtLjc1MDA0MDY4bC4wMDE1MDAwOCAyLjYxMjI1MDQ1elwiIGZpbGw9XCIke2VsZW1lbnRDb2xvciB8fFxuICAgICcjMDBCNjdBJ31cIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIvPlxuPC9zdmc+XG5gO1xuXG5jb25zdCB2ZXJpZmllZFJldmlldyA9IChcbiAgZGltZW5zaW9uc1xuKSA9PiBgPHN2ZyB2aWV3Qm94PVwiMCAwICR7ZGltZW5zaW9ucy53aWR0aH0gJHtkaW1lbnNpb25zLmhlaWdodH1cIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcgJHtzdmdTdGFyU3R5bGV9XCI+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNyAxNEMxMC44NjYgMTQgMTQgMTAuODY2IDE0IDdDMTQgMy4xMzQwMSAxMC44NjYgMCA3IDBDMy4xMzQwMSAwIDAgMy4xMzQwMSAwIDdDMCAxMC44NjYgMy4xMzQwMSAxNCA3IDE0Wk02LjA5MjE3IDcuODE0MDFMOS4yMDMxMSA0LjcwMzFDOS40NDg3NCA0LjQ1NzU3IDkuODQ2ODggNC40NTc1NyAxMC4wOTIzIDQuNzAzMUMxMC4zMzggNC45NDg2NCAxMC4zMzggNS4zNDY3MyAxMC4wOTIzIDUuNTkyMjZMNi42MjAwOSA5LjA2NDQ4QzYuNTk1NzMgOS4xMDI4MyA2LjU2NjgyIDkuMTM5MTIgNi41MzMzMyA5LjE3MjU2QzYuMjg3ODcgOS40MTgyMSA1Ljg4OTY1IDkuNDE4MjEgNS42NDQwMiA5LjE3MjU2TDMuNzA1OSA3LjExMDMxQzMuNDYwNDYgNi44NjQ2NCAzLjQ2MDQ2IDYuNDY2NjkgMy43MDU5IDYuMjIxMDJDMy45NTE1NCA1Ljk3NTQ4IDQuMzQ5NjggNS45NzU0OCA0LjU5NTEyIDYuMjIxMDJMNi4wOTIxNyA3LjgxNDAxWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG48L3N2Zz5cbmA7XG5cbmNvbnN0IGludml0ZWRSZXZpZXcgPSAoXG4gIGRpbWVuc2lvbnNcbikgPT4gYDxzdmcgdmlld0JveD1cIjAgMCAke2RpbWVuc2lvbnMud2lkdGh9ICR7ZGltZW5zaW9ucy5oZWlnaHR9XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnICR7c3ZnU3RhclN0eWxlfVwiPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcgMTRDMTAuODY2IDE0IDE0IDEwLjg2NiAxNCA3QzE0IDMuMTM0MDEgMTAuODY2IDAgNyAwQzMuMTM0MDEgMCAwIDMuMTM0MDEgMCA3QzAgMTAuODY2IDMuMTM0MDEgMTQgNyAxNFpNNi4wOTIxNyA3LjgxNDAxTDkuMjAzMTEgNC43MDMxQzkuNDQ4NzQgNC40NTc1NyA5Ljg0Njg4IDQuNDU3NTcgMTAuMDkyMyA0LjcwMzFDMTAuMzM4IDQuOTQ4NjQgMTAuMzM4IDUuMzQ2NzMgMTAuMDkyMyA1LjU5MjI2TDYuNjIwMDkgOS4wNjQ0OEM2LjU5NTczIDkuMTAyODMgNi41NjY4MiA5LjEzOTEyIDYuNTMzMzMgOS4xNzI1NkM2LjI4Nzg3IDkuNDE4MjEgNS44ODk2NSA5LjQxODIxIDUuNjQ0MDIgOS4xNzI1NkwzLjcwNTkgNy4xMTAzMUMzLjQ2MDQ2IDYuODY0NjQgMy40NjA0NiA2LjQ2NjY5IDMuNzA1OSA2LjIyMTAyQzMuOTUxNTQgNS45NzU0OCA0LjM0OTY4IDUuOTc1NDggNC41OTUxMiA2LjIyMTAyTDYuMDkyMTcgNy44MTQwMVpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuPC9zdmc+XG5gO1xuXG5jb25zdCByZWRpcmVjdGVkUmV2aWV3ID0gKFxuICBkaW1lbnNpb25zXG4pID0+IGA8c3ZnIHZpZXdCb3g9XCIwIDAgJHtkaW1lbnNpb25zLndpZHRofSAke2RpbWVuc2lvbnMuaGVpZ2h0fVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiICR7c3ZnU3RhclN0eWxlfT5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMy43MDU2IDQuMDcyMjdMMTAuNjkxNSAxLjA0NzA2QzEwLjI5ODYgMC42NTIxNiA5LjY2MDkzIDAuNjUxMTUyIDkuMjY3MDQgMS4wNDMwM0M4Ljg3MjE0IDEuNDM1OTEgOC44NzExMyAyLjA3NDYgOS4yNjQwMiAyLjQ2NzQ5TDEwLjU2NTYgMy43NzUwOUwzLjQyNDE1IDMuNzY2MDJIMy40MTQwN0MxLjk2MjQyIDMuNzY2MDIgMS4xNTc1MSA0LjQwMTY5IDAuNzM4NDI5IDQuOTM1NjFDMC4yNTU4ODcgNS41NTAxMiAwLjAwMTAxNTcgNi4zODgyNyA4LjMwMzFlLTA2IDcuMzYwNDFDLTAuMDAzMDEzODggOC45MTQ4MiAwLjgxOTAyMSAxMS44MTUxIDIuNDAyNjUgMTEuODE2MUgyLjQwMzY1QzIuOTU5NzQgMTEuODE2MSAzLjQxMTA1IDExLjM2NjggMy40MTIwNiAxMC44MTA3QzMuNDEyMDYgMTAuMzY0NSAzLjEyMjkzIDkuOTg0NjcgMi43MjA5OCA5Ljg1MDY5QzIuMzU0MjkgOS40MDAzOCAxLjcyNTY4IDcuNjAyMTggMi4xNTI4MSA2LjQ4OTAxQzIuMjg2OCA2LjE0MDQ1IDIuNTQyNjggNS43ODA4MSAzLjQxNDA3IDUuNzgwODFIMy40MjAxMkwxMC41NTg1IDUuNzg5ODhMOS4yNTQ5NSA3LjA4NzRDOC44NjAwNSA3LjQ4MDI5IDguODU5MDUgOC4xMTg5OCA5LjI1MTkzIDguNTExODZDOS40NDgzNyA4LjcwOTMxIDkuNzA3MjcgOC44MDkwNCA5Ljk2NjE3IDguODA5MDRDMTAuMjIzMSA4LjgwOTA0IDEwLjQ3OTkgOC43MTAzMiAxMC42NzY0IDguNTE1ODlMMTMuNzA0NiA1LjQ5ODc0SDEzLjcwNTZDMTQuMTExNiA1LjA4MzY5IDE0LjA4NDQgNC40NTIwNiAxMy43MDU2IDQuMDcyMjdaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbjwvc3ZnPlxuYDtcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG4vLyBEZWZpbmUgYSBzZXJpZXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIHdpZHRoIGFuZCBoZWlnaHQgdmFsdWVzLiBUaGVzZSBhcmVcbi8vIHVzZWQgaW4gc2V0dGluZyB0aGUgc3R5bGluZyBvZiB0aGUgU1ZHLCBhbmQgY3JlYXRpbmcgdGhlIGRpdiB3cmFwcGVyIGZvclxuLy8gSUUxMSBzdXBwb3J0LlxuY29uc3Qgc3RhcnNEaW1lbnNpb25zID0geyB3aWR0aDogMjUxLCBoZWlnaHQ6IDQ2IH07XG5jb25zdCBsb2dvRGltZW5zaW9ucyA9IHsgd2lkdGg6IDEyNiwgaGVpZ2h0OiAzMSB9O1xuY29uc3QgYXJyb3dTbGlkZXJEaW1lbnNpb25zID0geyB3aWR0aDogMjQsIGhlaWdodDogMjQgfTtcbmNvbnN0IHJlcGx5QXJyb3dEaW1lbnNpb25zID0geyB3aWR0aDogMTIsIGhlaWdodDogOSB9O1xuY29uc3QgdmVyaWZpZWRSZXZpZXdEaW1lbnNpb25zID0geyB3aWR0aDogMTQsIGhlaWdodDogMTQgfTtcbmNvbnN0IGludml0ZWRSZXZpZXdEaW1lbnNpb25zID0geyB3aWR0aDogMTQsIGhlaWdodDogMTQgfTtcbmNvbnN0IHJlZGlyZWN0ZWRSZXZpZXdEaW1lbnNpb25zID0geyB3aWR0aDogMTQsIGhlaWdodDogMTIgfTtcblxuY29uc3Qgc3ZnTWFwID0ge1xuICBzY2FsZTogKHByb3BzKSA9PiB3cmFwU3ZnKFNDQUxFX1NWR19QUk9QU1twcm9wcy5kaW1lbnNpb25JZF0uZGltZW5zaW9ucywgc2NhbGUsIHByb3BzKSxcbiAgc3RhcnM6IChwcm9wcykgPT4gd3JhcFN2ZyhzdGFyc0RpbWVuc2lvbnMsIHN0YXJzLCBwcm9wcyksXG4gIGxvZ286ICgpID0+IHdyYXBTdmcobG9nb0RpbWVuc2lvbnMsIGxvZ28pLFxuICBhcnJvd1NsaWRlcjogKCkgPT4gd3JhcFN2ZyhhcnJvd1NsaWRlckRpbWVuc2lvbnMsIGFycm93U2xpZGVyKSxcbiAgcmVwbHlBcnJvdzogKHByb3BzKSA9PiB3cmFwU3ZnKHJlcGx5QXJyb3dEaW1lbnNpb25zLCByZXBseUFycm93LCBwcm9wcyksXG4gIHZlcmlmaWVkUmV2aWV3OiAocHJvcHMpID0+IHdyYXBTdmcodmVyaWZpZWRSZXZpZXdEaW1lbnNpb25zLCB2ZXJpZmllZFJldmlldywgcHJvcHMpLFxuICBpbnZpdGVkUmV2aWV3OiAocHJvcHMpID0+IHdyYXBTdmcoaW52aXRlZFJldmlld0RpbWVuc2lvbnMsIGludml0ZWRSZXZpZXcsIHByb3BzKSxcbiAgcmVkaXJlY3RlZFJldmlldzogKHByb3BzKSA9PiB3cmFwU3ZnKHJlZGlyZWN0ZWRSZXZpZXdEaW1lbnNpb25zLCByZWRpcmVjdGVkUmV2aWV3LCBwcm9wcyksXG59O1xuXG5leHBvcnQgeyBzdmdNYXAsIFNDQUxFX0RJTUVOU0lPTlNfODB4MTUsIFNDQUxFX0RJTUVOU0lPTlNfOTB4MTYsIFNDQUxFX0RJTUVOU0lPTlNfMTA1eDE5IH07XG4iLCJleHBvcnQgY29uc3Qgc3R5bGVBbGlnbm1lbnRQb3NpdGlvbnMgPSBbJ2xlZnQnLCAncmlnaHQnXTtcbiIsImltcG9ydCB7IHN2Z01hcCB9IGZyb20gJy4vYXNzZXRzL3N2Zyc7XG5pbXBvcnQgeyBzYW5pdGl6ZUh0bWxQcm9wIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IGZsYXR0ZW4gPSAoYXJycykgPT4gW10uY29uY2F0LmFwcGx5KFtdLCBhcnJzKTtcblxuY29uc3QgbWtQcm9wcyA9IChwcm9wcykgPT5cbiAgT2JqZWN0LmtleXMocHJvcHMpXG4gICAgLm1hcCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBzYW5pdGl6ZWRQcm9wID0gc2FuaXRpemVIdG1sUHJvcChwcm9wc1trZXldKTtcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHtzYW5pdGl6ZWRQcm9wfVwiYDtcbiAgICB9KVxuICAgIC5qb2luKCcgJyk7XG5cbmNvbnN0IG1rRWxlbSA9XG4gICh0YWcpID0+XG4gIChwcm9wcywgLi4uY2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gYDwke3RhZ30gJHtta1Byb3BzKHByb3BzKX0+JHtmbGF0dGVuKGNoaWxkcmVuKS5qb2luKCdcXG4nKX08LyR7dGFnfT5gO1xuICB9O1xuXG5jb25zdCBta05vbkNsb3NpbmdFbGVtID0gKHRhZykgPT4gKHByb3BzKSA9PiBgPCR7dGFnfSAke21rUHJvcHMocHJvcHMpfT5gO1xuXG5jb25zdCBhID0gbWtFbGVtKCdhJyk7XG5jb25zdCBkaXYgPSBta0VsZW0oJ2RpdicpO1xuY29uc3QgaW1nID0gbWtFbGVtKCdpbWcnKTtcbmNvbnN0IGxhYmVsID0gbWtFbGVtKCdsYWJlbCcpO1xuY29uc3Qgc3BhbiA9IG1rRWxlbSgnc3BhbicpO1xuY29uc3QgaW5wdXQgPSBta05vbkNsb3NpbmdFbGVtKCdpbnB1dCcpO1xuY29uc3QgY3VzdG9tRWxlbWVudCA9IG1rRWxlbTtcblxuY29uc3QgbWtFbGVtV2l0aFN2Z0xvb2t1cCA9IChzdmdLZXksIGNsYXNzTmFtZSA9ICcnLCBwcm9wcykgPT5cbiAgZGl2KHsgY2xhc3M6IGNsYXNzTmFtZSB9LCBzdmdNYXBbc3ZnS2V5XShwcm9wcykpO1xuXG5leHBvcnQgeyBhLCBkaXYsIGltZywgbGFiZWwsIGlucHV0LCBzcGFuLCBta0VsZW1XaXRoU3ZnTG9va3VwLCBjdXN0b21FbGVtZW50IH07XG4iXX0=
    