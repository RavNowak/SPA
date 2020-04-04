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
})({"../js/services/quationsService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quationsService = void 0;
var quationsService = {
  getQuations: function getQuations() {
    return fetch('https://itspa.herokuapp.com/quations').then(function (response) {
      return response.json();
    });
  }
};
exports.quationsService = quationsService;
},{}],"../js/common/QuotationBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuotationBuilder = void 0;

var _quationsService = require("../services/quationsService");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QuotationBuilder =
/*#__PURE__*/
function () {
  function QuotationBuilder() {
    _classCallCheck(this, QuotationBuilder);

    this.quationCounter = 0;
  }

  _createClass(QuotationBuilder, [{
    key: "build",
    value: function build(toogleTime, refreshTime) {
      var _this = this;

      _quationsService.quationsService.getQuations().then(function (quations) {
        var quotation = $("\n        <span class=\"quotation\">\n        <i class=\"fas fa-quote-left\"></i>\n        ".concat(quations[_this.quationCounter].text, "\n        <i class=\"fas fa-quote-right\"></i>\n        <br><br>\n        ~").concat(quations[_this.quationCounter].author, "\n        </span>"));
        quotation.hide();
        setInterval(function () {
          if (++_this.quationCounter >= quations.length) {
            _this.quationCounter = 0;
          }

          quotation.fadeIn(toogleTime);
          quotation.fadeOut(toogleTime, 'linear', function () {
            quotation.html("<i class=\"fas fa-quote-left\"></i>\n                          ".concat(quations[_this.quationCounter].text, "\n                          <i class=\"fas fa-quote-right\"></i>\n                          <br><br>\n                          ~").concat(quations[_this.quationCounter].author));
          });
        }, refreshTime);
        $('.homeContainer').ready(function () {
          $('.homeContainer').append(quotation);
        });
      });
    }
  }]);

  return QuotationBuilder;
}();

exports.QuotationBuilder = QuotationBuilder;
},{"../services/quationsService":"../js/services/quationsService.js"}],"../assets/video/intro.mp4":[function(require,module,exports) {
module.exports = "/intro.b86c9e35.mp4";
},{}],"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../js/components/HomeComponent/home.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../js/components/HomeComponent/home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = void 0;

var _QuotationBuilder = require("../../common/QuotationBuilder");

var _intro = _interopRequireDefault(require("../../../assets/video/intro.mp4"));

require("./home.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createVideo = function createVideo() {
  var video = $('<video/>', {
    class: 'homeIntro',
    src: _intro.default,
    type: 'video/mp4',
    controls: false,
    loop: true,
    autoplay: true,
    muted: true
  });
  return video;
};

var home = function home() {
  var fragment = $(new DocumentFragment());
  var html = "<div class=\"homeContainer\"></div>";
  fragment.append(createVideo()).append(html);
  var quatation = new _QuotationBuilder.QuotationBuilder();
  quatation.build(8000, 500);
  return fragment;
};

exports.home = home;
},{"../../common/QuotationBuilder":"../js/common/QuotationBuilder.js","../../../assets/video/intro.mp4":"../assets/video/intro.mp4","./home.scss":"../js/components/HomeComponent/home.scss"}],"../js/common/Offers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Offers = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Offers =
/*#__PURE__*/
function () {
  function Offers() {
    _classCallCheck(this, Offers);

    this.local = {};
    this.remote = [];
    this.matched = [];
    this.which = 0;
  }

  _createClass(Offers, [{
    key: "setLocal",
    value: function setLocal() {
      var _this = this;

      $('.quantityBox').ready(function () {
        _this.local.guests = parseInt($('.quantityBox').find('input').val());
      });
      $('#priceSlider').ready(function () {
        _this.local.price = parseInt($('#priceSlider').val());
      });
      $('.optionsBox').ready(function () {
        _this.local.children = $('#Children').prop("checked");
        _this.local.pets = $('#Pets').prop("checked");
        _this.local.balcony = $('#Balcony').prop("checked");
        _this.local.miniBar = $('#Mini-bar').prop("checked");
        _this.local.jacuzzi = $('#Jacuzzi').prop("checked");
        _this.local.pool = $('#Pool').prop("checked");
      });
    }
  }, {
    key: "setRemote",
    value: function setRemote(data) {
      this.remote = data;
    }
  }, {
    key: "getLocal",
    value: function getLocal() {
      return this.local;
    }
  }, {
    key: "getRemote",
    value: function getRemote() {
      return this.remote;
    }
  }, {
    key: "compareSettings",
    value: function compareSettings() {
      var offers = [];

      for (var i = 0; i < this.remote.length; i++) {
        if (this.remote[i].guests >= this.local.guests && this.remote[i].price <= this.local.price && this.remote[i].children === this.local.children && this.remote[i].pets === this.local.pets && this.remote[i].balcony === this.local.balcony && this.remote[i].miniBar === this.local.miniBar && this.remote[i].jacuzzi === this.local.jacuzzi && this.remote[i].pool === this.local.pool) {
          console.log("Added offer with id: " + this.remote[i].id);
          offers.push(this.remote[i]);
        }
      }

      this.matched = offers;
      return offers;
    }
  }, {
    key: "getMatched",
    value: function getMatched() {
      return this.matched;
    }
  }, {
    key: "next",
    value: function next() {
      this.which++;

      if (this.which == this.matched.length) {
        this.which = 0;
      }

      return this.which;
    }
  }, {
    key: "back",
    value: function back() {
      this.which--;

      if (this.which < 0) {
        this.which = this.matched.length - 1;
      }

      return this.which;
    }
  }, {
    key: "current",
    value: function current() {
      return this.which;
    }
  }]);

  return Offers;
}();

exports.Offers = Offers;
},{}],"../js/common/PopUpBox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YesNoBox = exports.InfoBox = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfoBox =
/*#__PURE__*/
function () {
  function InfoBox() {
    _classCallCheck(this, InfoBox);
  }

  _createClass(InfoBox, null, [{
    key: "create",
    value: function create(info) {
      if ($('.popUpBox').length) {
        $('.popUpBox').remove();
      }

      var html = "\n      <div class=\"popUpBox\">\n        <i class=\"fas fa-times cross\"></i>\n        ".concat(info, "\n      </div>");
      $('.mainPanel').ready(function () {
        $('.cross').ready(function () {
          $('.cross').click(function () {
            $('.popUpBox').remove();
          });
        });
        $('.mainPanel').append(html);
        $('.popUpBox').ready(function () {
          $('.popUpBox').hover(function () {
            $('.popUpBox').stop(true);
            $('.popUpBox').css({
              'opacity': '1.0'
            });
          });
          $('.popUpBox').fadeTo(10000, 0.0, function () {
            $('.popUpBox').remove();
          });
        });
      });
    }
  }]);

  return InfoBox;
}();

exports.InfoBox = InfoBox;

var YesNoBox =
/*#__PURE__*/
function () {
  function YesNoBox() {
    _classCallCheck(this, YesNoBox);
  }

  _createClass(YesNoBox, null, [{
    key: "create",
    value: function create(info, yesCallback) {
      if ($('.popUpBox').length) {
        $('.popUpBox').remove();
      }

      var html = "\n      <div class=\"popUpBox\">\n        <i class=\"fas fa-times cross\"></i>\n        ".concat(info, "\n        <div class=\"yesNoContainer\">\n          <button type=\"button\" class=\"yesNoButton\" id=\"yesButton\">Yes</button>\n          <button type=\"button\" class=\"yesNoButton\" id=\"noButton\">No</button>\n        </div>\n      </div>");
      $('.mainPanel').ready(function () {
        $('.cross').ready(function () {
          $('.cross').click(function () {
            $('.popUpBox').remove();
          });
        });
        $('#noButton').ready(function () {
          $('#noButton').click(function () {
            $('.popUpBox').remove();
          });
        });
        $('#yesButton').ready(function () {
          $('#yesButton').click(function () {
            yesCallback();
            $('.popUpBox').remove();
          });
        });
        $('.mainPanel').append(html);
      });
    }
  }]);

  return YesNoBox;
}();

exports.YesNoBox = YesNoBox;
},{}],"../js/services/roomService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roomService = void 0;
var roomService = {
  getRooms: function getRooms() {
    return fetch('https://itspa.herokuapp.com/rooms').then(function (response) {
      return response.json();
    });
  }
};
exports.roomService = roomService;
},{}],"../js/components/HotelComponent/hotel.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\assets\\img\\money.png":[["money.bbe8218b.png","../assets/img/money.png"],"../assets/img/money.png"],"./..\\..\\..\\assets\\img\\hotel.jpg":[["hotel.7ee2ff1a.jpg","../assets/img/hotel.jpg"],"../assets/img/hotel.jpg"],"./..\\..\\..\\assets\\img\\left-arrow.png":[["left-arrow.c9e24a45.png","../assets/img/left-arrow.png"],"../assets/img/left-arrow.png"],"./..\\..\\..\\assets\\img\\right-arrow.png":[["right-arrow.dcd43fcb.png","../assets/img/right-arrow.png"],"../assets/img/right-arrow.png"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../js/components/HotelComponent/hotel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotel = void 0;

var _Offers = require("../../common/Offers");

var _PopUpBox = require("../../common/PopUpBox");

var _roomService = require("../../services/roomService");

require("./hotel.scss");

var offers = new _Offers.Offers();

var createQuantityBox = function createQuantityBox(title) {
  var html = "\n    <div class=\"quantityBox\">\n      <span class=\"settingTitle\">".concat(title, "</span>\n      <input type=\"number\" min=\"1\" max=\"6\" step=\"1\" value=\"1\" style=\"font-size:16px;\">\n        <div class=\"quantity-nav\">\n          <div class=\"quantity-button-plus\"><i class=\"fas fa-plus-square fa-lg\"></i></div>\n          <div class=\"quantity-button-minus\"><i class=\"fas fa-minus-square fa-lg\"></i></div>\n        </div>\n    </div>");
  $('.quantityBox').ready(function () {
    var spinner = $('.quantityBox'),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-button-plus'),
        btnDown = spinner.find('.quantity-button-minus'),
        min = input.attr('min'),
        max = input.attr('max');
    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      var newValue = oldValue;

      if (oldValue < max) {
        newValue = oldValue + 1;
      }

      spinner.find("input").val(newValue);
      spinner.find("input").trigger("change");
      drawMatchedOffer(0);
    });
    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      var newValue = oldValue;

      if (oldValue > min) {
        newValue = oldValue - 1;
      }

      spinner.find("input").val(newValue);
      spinner.find("input").trigger("change");
      drawMatchedOffer(0);
    });
  });
  return html;
};

var createCheckBoxSetting = function createCheckBoxSetting(title) {
  var html = "\n    <div class=\"checkBoxSetting\" id=\"checkBoxSetting".concat(title, "\">\n      <span class=\"checkBoxTittle\" id=\"").concat(title, "Title\">").concat(title, "</span>\n      <div class=\"coolCheckBox\">  \n        <input type=\"checkbox\" value=\"None\" id=\"").concat(title, "\" name=\"").concat(title, "\" unchecked>\n        <label for=\"").concat(title, "\"></label>\n      </div>\n    </div>");
  $(document).on('click', "#checkBoxSetting".concat(title), function () {
    var checkBoxState = $("#".concat(title)).prop("checked");
    $("#".concat(title)).prop("checked", !checkBoxState);

    if ($("#".concat(title)).is(':checked')) {
      $("#".concat(title, "Title")).css({
        'color': 'white'
      });
      $("#checkBoxSetting".concat(title)).css({
        'background-color': 'rgba(30, 137, 199, 0.212)'
      });
    } else {
      $("#".concat(title, "Title")).css({
        'color': 'rgba(255, 255, 255, 0.589)'
      }, {
        'transition': 'color .10s ease-in-out'
      });
      $("#checkBoxSetting".concat(title)).css({
        'background-color': ''
      });
    }

    drawMatchedOffer(0);
  });
  return html;
};

var createSliderBox = function createSliderBox(title, minPrice, maxPrice, init) {
  var html = "\n    <span class=\"settingTitle\" id=\"sliderValue\" style=\"margin-bottom:5px\">".concat(title).concat(init, "$</span>\n    <div class=\"sliderContainer\">\n      <input type=\"range\" min=\"").concat(minPrice, "\" max=\"").concat(maxPrice, "\" value=\"").concat(init, "\" class=\"slider\" id=\"priceSlider\">\n    </div>");
  $(document).on('input', '#priceSlider', function () {
    $('#sliderValue').html(title + $('#priceSlider').val() + '$');
  });
  $(document).on('mouseenter ', '#priceSlider', function () {
    $('#sliderValue').css({
      'color': 'white'
    });
  });
  $(document).on('mouseleave ', '#priceSlider', function () {
    $('#sliderValue').css({
      'color': ''
    });
  });
  $(document).on('mouseup', '#priceSlider', function () {
    drawMatchedOffer(0);
  });
  return html;
};

var displaySingleMessageInfo = function displaySingleMessageInfo(info) {
  $('.roomsOffers').ready(function () {
    if ($('.roomsOffers').find('.offerItem').text() === info) {
      return;
    }

    var html = "<div class=\"offerItem\" style=\"font-size:16px\">".concat(info, "<div>");
    $('.roomsOffers').empty();
    $('#rightRoomArrow').hide();
    $('#leftRoomArrow').hide();
    $('.roomsOffers').append(html).hide().show('slow');
  });
};

var createDateBox = function createDateBox(text) {
  var html = "\n  <i class=\"far fa-calendar-plus calendarIcon\"></i>\n  <label class=\"dateInput\"></label>";
  $('#dateInput').ready(function () {
    $('.dateInput').text(text);
    $('.calendarIcon').daterangepicker({
      "autoApply": true
    }, function (start, end, label) {
      $('.dateInput').text(start.format('DD.MM.YYYY') + " - " + end.format('DD.MM.YYYY'));

      if (!(start.isAfter(moment()) || start.isSame(moment(), "day")) || !end.isAfter(moment()) || !end.isAfter(start)) {
        displaySingleMessageInfo('Selected date from the past<br><br>Please set proper date');
        $('.dateInput').text(text);
      } else if (moment.duration(end.diff(start)).asYears() > 1) {
        displaySingleMessageInfo("Duration of your visit can't be longer than one year<br><br>Please set proper date");
        $('.dateInput').text(text);
      } else {
        drawMatchedOffer(0);
      }
    });
  });
  return html;
};

var drawTickOrCross = function drawTickOrCross(status) {
  if (status) {
    return "<i class=\"fas fa-check\"></i>";
  }

  return "<i class=\"fas fa-times\"></i>";
};

var isDateSet = function isDateSet() {
  return $('.dateInput').text().includes('-');
};

var createMainOffersInfo = function createMainOffersInfo(which, matchedOffers) {
  var html = "\n      <div class=\"mainOffersInfo\">\n          <div class=\"offerItem\">Type of room: ".concat(matchedOffers[which].name, "</div>\n          <div class=\"offerItem\">Max number of guests: ").concat(matchedOffers[which].guests, "</div>\n          <div class=\"offerItem\">Beds: ").concat(matchedOffers[which].beds, "</div>\n          <div class=\"offerItem\">Price: ").concat(matchedOffers[which].price, "$</div>\n        </div>");
  return html;
};

var createAdditionalOffersInfo = function createAdditionalOffersInfo(which, matchedOffers) {
  var html = "\n      <div class=\"additionalOffersInfo\">\n          <div class=\"offerItem\">Children ".concat(drawTickOrCross(matchedOffers[which].children), "</div>\n          <div class=\"offerItem\">Pets ").concat(drawTickOrCross(matchedOffers[which].pets), "</div>\n          <div class=\"offerItem\">Balcony ").concat(drawTickOrCross(matchedOffers[which].balcony), "</div>\n          <div class=\"offerItem\">Jacuzzi ").concat(drawTickOrCross(matchedOffers[which].jacuzzi), "</div>\n          <div class=\"offerItem\">Pool ").concat(drawTickOrCross(matchedOffers[which].pool), "</div>\n        </div>");
  return html;
};

var createOfferButton = function createOfferButton() {
  var html = "<button type=\"button\" class=\"offerButton\">Want it !</button>";
  $('.offerButton').ready(function () {
    $('.offerButton').click(function () {
      if (!Cookies.get('hotel')) {
        Cookies.set('hotel', JSON.stringify(offers.getMatched()[offers.current()]));

        _PopUpBox.InfoBox.create('Choosen hotel room has been successfully added to your basket');
      } else {
        _PopUpBox.InfoBox.create('Your basket already contains hotel room');
      }
    });
  });
  return html;
};

var createOfferCounter = function createOfferCounter(which, matchedOffers) {
  var html = "<div class=\"offerItem\">".concat(which + 1, " / ").concat(matchedOffers.length, "</div>");
  return html;
};

var drawMatchedOffer = function drawMatchedOffer(which) {
  if (!isDateSet()) {
    displaySingleMessageInfo('Specify duration of your stay at our hotel');
    return;
  }

  offers.setLocal();

  _roomService.roomService.getRooms().then(function (data) {
    offers.setRemote(data);
    var matchedOffers = offers.compareSettings();
    $('.roomsOffers').empty();

    if (matchedOffers.length > 0) {
      $('.roomsOffers').ready(function () {
        $('#rightRoomArrow').show();
        $('#leftRoomArrow').show();
        $('.roomsOffers').hide().append(createMainOffersInfo(which, matchedOffers)).append(createAdditionalOffersInfo(which, matchedOffers)).append(createOfferButton()).append(createOfferCounter(which, matchedOffers)).slideDown('800');
      });
    } else {
      displaySingleMessageInfo('No offers found');
    }
  });
};

var createRoomOffer = function createRoomOffer() {
  var html = "\n  <div class=\"leftArrow roomArrow\" id=\"leftRoomArrow\"></div>\n  <div class=\"roomsOffers\"></div>\n  <div class=\"rightArrow roomArrow\" id=\"rightRoomArrow\"></div>";
  drawMatchedOffer(0);
  $(document).on('click', '#leftRoomArrow', function () {
    if (offers.getMatched().length > 1) {
      drawMatchedOffer(offers.back());
    }
  });
  $(document).on('click', '#rightRoomArrow', function () {
    if (offers.getMatched().length > 1) {
      drawMatchedOffer(offers.next());
    }
  });
  return html;
};

var hotel = function hotel() {
  var fragment = $(new DocumentFragment());
  var html = "\n  <div class=\"backgroundRooms\"></div>\n      <div class=\"hotelContainer\">\n        <div class=\"mainPanel\">\n          <div class=\"settingsPanel\">\n            <div class=\"guestsBox\">\n              ".concat(createQuantityBox('Guests'), "\n            </div>\n            <div class=\"priceBox\">\n              ").concat(createSliderBox('Max price: ', 1, 7000, 3500), "\n            </div>\n            <div class=\"dateBox\">\n            ").concat(createDateBox('Set date of visit'), "\n            </div>\n            <div class=\"optionsBox\">\n              ").concat(createCheckBoxSetting('Children'), "\n              ").concat(createCheckBoxSetting('Pets'), "\n              ").concat(createCheckBoxSetting('Balcony'), "\n              ").concat(createCheckBoxSetting('Mini-bar'), "\n              ").concat(createCheckBoxSetting('Jacuzzi'), "\n              ").concat(createCheckBoxSetting('Pool'), "\n            </div>  \n          </div>\n          <div class=\"roomPanel\">\n            ").concat(createRoomOffer(), "\n          </div>\n        </div>\n      </div>");
  fragment.append(html);
  return fragment;
};

exports.hotel = hotel;
},{"../../common/Offers":"../js/common/Offers.js","../../common/PopUpBox":"../js/common/PopUpBox.js","../../services/roomService":"../js/services/roomService.js","./hotel.scss":"../js/components/HotelComponent/hotel.scss"}],"../js/services/treatmentsService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.treatmentService = void 0;
var treatmentService = {
  getServices: function getServices() {
    return fetch('https://itspa.herokuapp.com/services').then(function (response) {
      return response.json();
    });
  }
};
exports.treatmentService = treatmentService;
},{}],"../js/components/ServicesComponent/services.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\assets\\img\\services.jpg":[["services.cc0e3a87.jpg","../assets/img/services.jpg"],"../assets/img/services.jpg"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../node_modules/TagCloud/dist/TagCloud.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
 * TagCloud.js v2.0.2
 * Copyright (c) 2016-2019 @ Cong Min
 * MIT License - https://github.com/mcc108/TagCloud
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.TagCloud = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * TagCloud.js (c) 2016-2019 @ Cong Min
   * MIT License - https://github.com/mcc108/TagCloud
   */
  var TagCloud =
  /*#__PURE__*/
  function () {
    /* 构造函数 */
    function TagCloud() {
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
      var texts = arguments.length > 1 ? arguments[1] : undefined;
      var options = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, TagCloud);

      var self = this;
      if (!container || container.nodeType !== 1) return new Error('Incorrect element type'); // 处理参数

      self.$container = container;
      self.texts = texts || [];
      self.config = _objectSpread2({}, TagCloud._defaultConfig, {}, options || {}); // 计算配置

      self.radius = self.config.radius; // 滚动半径

      self.depth = 2 * self.radius; // 滚动深度

      self.size = 1.5 * self.radius; // 随鼠标滚动变速作用区域

      self.maxSpeed = TagCloud._getMaxSpeed(self.config.maxSpeed); // 滚动最大速度倍数

      self.initSpeed = TagCloud._getInitSpeed(self.config.initSpeed); // 滚动初速度

      self.direction = self.config.direction; // 初始滚动方向

      self.keep = self.config.keep; // 鼠标移出后是否保持之前滚动
      // 创建元素

      self._createElment(); // 初始化


      self._init(); // 设置元素及实例


      TagCloud.list.push({
        el: self.$el,
        container: container,
        instance: self
      });
    }
    /* 静态属性方法 */
    // 所有 TagCloud 的个数


    _createClass(TagCloud, [{
      key: "_createElment",

      /* 实例属性方法 */
      // 创建元素
      value: function _createElment() {
        var self = this; // 创建容器元素

        var $el = document.createElement('div');
        $el.className = 'tagcloud';
        $el.style.position = 'relative';
        $el.style.width = "".concat(2 * self.radius, "px");
        $el.style.height = "".concat(2 * self.radius, "px"); // 创建文本元素

        self.items = [];
        self.texts.forEach(function (text, index) {
          var item = self._createTextItem(text, index);

          $el.appendChild(item.el);
          self.items.push(item);
        });
        self.$container.appendChild($el);
        self.$el = $el;
      } // 创建单个文本项

    }, {
      key: "_createTextItem",
      value: function _createTextItem(text) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var self = this;
        var itemEl = document.createElement('span');
        itemEl.className = 'tagcloud--item';
        itemEl.style.position = 'absolute';
        itemEl.style.top = '50%';
        itemEl.style.left = '50%';
        itemEl.style.zIndex = index + 1;
        itemEl.style.filter = 'alpha(opacity=0)';
        itemEl.style.opacity = 0;
        itemEl.style.willChange = 'transform, opacity, filter';
        var transformOrigin = '50% 50%';
        itemEl.style.WebkitTransformOrigin = transformOrigin;
        itemEl.style.MozTransformOrigin = transformOrigin;
        itemEl.style.OTransformOrigin = transformOrigin;
        itemEl.style.transformOrigin = transformOrigin;
        var transform = 'translateX(-50%) translateY(-50%) scale(1)';
        itemEl.style.WebkitTransform = transform;
        itemEl.style.MozTransform = transform;
        itemEl.style.OTransform = transform;
        itemEl.style.transform = transform;
        var transition = 'all .1s';
        itemEl.style.WebkitTransition = transition;
        itemEl.style.MozTransition = transition;
        itemEl.style.OTransition = transition;
        itemEl.style.transition = transition;
        itemEl.innerText = text;
        return _objectSpread2({
          el: itemEl
        }, self._computePosition(index));
      } // 计算位置

    }, {
      key: "_computePosition",
      value: function _computePosition(index) {
        var random = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var self = this;
        var textsLength = self.texts.length; // random 为 true, 则表示生成随机的合适位置, 位置将 index 无关

        if (random) index = Math.floor(Math.random() * (textsLength + 1));
        var phi = Math.acos(-1 + (2 * index + 1) / textsLength);
        var theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;
        return {
          x: self.size * Math.cos(theta) * Math.sin(phi) / 2,
          y: self.size * Math.sin(theta) * Math.sin(phi) / 2,
          z: self.size * Math.cos(phi) / 2
        };
      } // 初始化

    }, {
      key: "_init",
      value: function _init() {
        var self = this;
        self.active = false; // 是否为鼠标激活态

        self.mouseX0 = self.initSpeed * Math.sin(self.direction * (Math.PI / 180)); // 鼠标与滚动圆心x轴初始距离

        self.mouseY0 = -self.initSpeed * Math.cos(self.direction * (Math.PI / 180)); // 鼠标与滚动圆心y轴初始距离

        self.mouseX = self.mouseX0; // 鼠标与滚动圆心x轴距离

        self.mouseY = self.mouseY0; // 鼠标与滚动圆心y轴距离
        // 鼠标移入

        TagCloud._on(self.$el, 'mouseover', function () {
          self.active = true;
        }); // 鼠标移出


        TagCloud._on(self.$el, 'mouseout', function () {
          self.active = false;
        }); // 鼠标在内移动


        TagCloud._on(self.keep ? window : self.$el, 'mousemove', function (ev) {
          ev = ev || window.event;
          var rect = self.$el.getBoundingClientRect();
          self.mouseX = (ev.clientX - (rect.left + rect.width / 2)) / 5;
          self.mouseY = (ev.clientY - (rect.top + rect.height / 2)) / 5;
        }); // 定时更新状态


        self._next(); // 初始更新状态


        self.interval = setInterval(function () {
          self._next.call(self);
        }, 100);
      } // 运算下一个状态

    }, {
      key: "_next",
      value: function _next() {
        var self = this; // keep 为 false 时, 鼠标移出组件后暂停滚动

        if (!self.keep && !self.active) {
          self.mouseX = Math.abs(self.mouseX - self.mouseX0) < 1 ? self.mouseX0 : (self.mouseX + self.mouseX0) / 2; // 重置鼠标与滚动圆心x轴距离

          self.mouseY = Math.abs(self.mouseY - self.mouseY0) < 1 ? self.mouseY0 : (self.mouseY + self.mouseY0) / 2; // 重置鼠标与滚动圆心y轴距离
        }

        var a = -(Math.min(Math.max(-self.mouseY, -self.size), self.size) / self.radius) * self.maxSpeed;
        var b = Math.min(Math.max(-self.mouseX, -self.size), self.size) / self.radius * self.maxSpeed;
        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return; // 停止
        // 计算偏移量

        var l = Math.PI / 180;
        var sc = [Math.sin(a * l), Math.cos(a * l), Math.sin(b * l), Math.cos(b * l)];
        self.items.forEach(function (item) {
          var rx1 = item.x;
          var ry1 = item.y * sc[1] + item.z * -sc[0];
          var rz1 = item.y * sc[0] + item.z * sc[1];
          var rx2 = rx1 * sc[3] + rz1 * sc[2];
          var ry2 = ry1;
          var rz2 = rz1 * sc[3] - rx1 * sc[2];
          var per = 2 * self.depth / (2 * self.depth + rz2); // todo

          item.x = rx2;
          item.y = ry2;
          item.z = rz2;
          item.scale = per.toFixed(3);
          var alpha = per * per - 0.25;
          alpha = (alpha > 1 ? 1 : alpha).toFixed(3);
          var itemEl = item.el;
          var left = (item.x - itemEl.offsetWidth / 2).toFixed(2);
          var top = (item.y - itemEl.offsetHeight / 2).toFixed(2);
          var transform = "translateX(".concat(left, "px) translateY(").concat(top, "px) scale(").concat(item.scale, ")");
          itemEl.style.WebkitTransform = transform;
          itemEl.style.MozTransform = transform;
          itemEl.style.OTransform = transform;
          itemEl.style.transform = transform;
          itemEl.style.filter = "alpha(opacity=".concat(100 * alpha, ")");
          itemEl.style.opacity = alpha;
        });
      }
      /* 暴露的实例属性与方法 */
      // 更新

    }, {
      key: "update",
      value: function update(texts) {
        var self = this; // 处理参数

        self.texts = texts || []; // 根据 texts 判断并处理 items

        self.texts.forEach(function (text, index) {
          var item = self.items[index];

          if (!item) {
            // 如果没有，则创建
            item = self._createTextItem(text, index);

            _extends(item, self._computePosition(index, true)); // 随机位置


            self.$el.appendChild(item.el);
            self.items.push(item);
          } // 如果有，则替换文本


          item.el.innerText = text;
        }); // 删除多余的 self.items

        var textsLength = self.texts.length;
        var itemsLength = self.items.length;

        if (textsLength < itemsLength) {
          var removeList = self.items.splice(textsLength, itemsLength - textsLength);
          removeList.forEach(function (item) {
            self.$el.removeChild(item.el);
          });
        }
      } // 摧毁

    }, {
      key: "destroy",
      value: function destroy() {
        var self = this;
        self.interval = null; // 在 TagCloud.list 中清除

        var index = TagCloud.list.findIndex(function (e) {
          return e.el === self.$el;
        });
        if (index !== -1) TagCloud.list.splice(index, 1); // 清理元素

        if (self.$container && self.$el) {
          self.$container.removeChild(self.$el);
        }
      }
    }], [{
      key: "_on",
      // 事件监听
      value: function _on(el, ev, handler, cap) {
        if (el.addEventListener) {
          el.addEventListener(ev, handler, cap);
        } else if (el.attachEvent) {
          el.attachEvent("on".concat(ev), handler);
        } else {
          el["on".concat(ev)] = handler;
        }
      }
    }]);

    return TagCloud;
  }();

  TagCloud.list = [];
  TagCloud._defaultConfig = {
    radius: 100,
    // 滚动半径, 单位px
    maxSpeed: 'normal',
    // 滚动最大速度, 取值: slow, normal(默认), fast
    initSpeed: 'normal',
    // 滚动初速度, 取值: slow, normal(默认), fast
    direction: 135,
    // 初始滚动方向, 取值角度(顺时针deg): 0 对应 top, 90 对应 left, 135 对应 right-bottom(默认)...
    keep: true // 鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动

  };

  TagCloud._getMaxSpeed = function (name) {
    return {
      slow: 5,
      normal: 10,
      fast: 20
    }[name] || 10;
  };

  TagCloud._getInitSpeed = function (name) {
    return {
      slow: 20,
      normal: 40,
      fast: 80
    }[name] || 50;
  };

  var index = (function (els, texts, options) {
    if (typeof els === 'string') els = document.querySelectorAll(els);
    if (!els.forEach) els = [els];
    var instances = [];
    els.forEach(function (el) {
      if (el) {
        instances.push(new TagCloud(el, texts, options));
      }
    });
    return instances.length <= 1 ? instances[0] : instances;
  });

  return index;

}));

},{}],"../js/components/ServicesComponent/services.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.services = void 0;

var _Offers = require("../../common/Offers");

var _PopUpBox = require("../../common/PopUpBox");

var _treatmentsService = require("../../services/treatmentsService");

require("./services.scss");

var TagCloud = require('TagCloud');

var offers = new _Offers.Offers();

var createSphere = function createSphere() {
  var html = "<div class=\"sphere\"></div>";
  var tags = [];
  var settings = {
    radius: 210,
    maxSpeed: 'slow',
    initSpeed: 'slow',
    direction: 135,
    keep: true
  };

  _treatmentsService.treatmentService.getServices().then(function (services) {
    offers.setRemote(services);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = services[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var service = _step.value;
        tags.push(service.name);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    $('.sphere').ready(function () {
      TagCloud('.sphere', tags, settings);
      $('.tagcloud--item').click(function () {
        var service = getServiceObject($(this).text());
        $('.singleService').empty();
        $('.singleService').hide().append(createServiceName(service)).append(createServiceInfo(service)).append(createServiceDescription(service)).append(createServiceButton()).slideDown('500');
      });
    });
  });

  return html;
};

var getServiceObject = function getServiceObject(name) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = offers.getRemote()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var offer = _step2.value;

      if (offer.name === name) {
        return offer;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
};

var createServiceName = function createServiceName(service) {
  var html = "<div id=\"serviceName\">".concat(service.name, "</div>");
  $('#serviceName').ready(function () {
    $('#serviceName').css({
      "text-align": "center",
      "font-weight": "600"
    });
  });
  return html;
};

var createServiceInfo = function createServiceInfo(service) {
  var html = "\n  <div class =\"serviceInfo\">\n    <div style=\"margin-bottom:15px;\">Price: ".concat(service.price, "$</div>\n    <div style=\"margin-bottom:15px;\">Time: ").concat(service.time, " min</div>\n    <div style=\"margin-bottom:50px;\">Area: ").concat(service.area, "</div>\n    <span style=\"display:block; margin-bottom:10px;\">").concat(service.availability.first, "</span>\n    <span style=\"display:block;\">").concat(service.availability.second, "</span>\n  </div>");
  return html;
};

var createServiceDescription = function createServiceDescription(service) {
  var html = "<div id=\"serviceDescription\">\"".concat(service.description, "\"</div>");
  $('#serviceDescription').ready(function () {
    $('#serviceDescription').css({
      "text-align": "center",
      "font-style": "italic"
    });
  });
  return html;
};

var createSingleServiceInfo = function createSingleServiceInfo() {
  var html = "<div class=\"singleService\"></div>";
  $('.singleService').ready(function () {
    var info = "<div id=\"initMessage\">Choose the treatment you are interested in</div>";
    $('#initMessage').ready(function () {
      $('#initMessage').css({
        "text-align": "center"
      });
    });
    $('.singleService').append(info);
  });
  return html;
};

var createServiceButton = function createServiceButton() {
  var html = "<button type=\"button\" class=\"serviceButton\">Want it !</button>";
  $('.serviceButton').ready(function () {
    $('.serviceButton').click(function () {
      var currentServiceObject = getServiceObject($('#serviceName').html());

      if (!Cookies.get('service_' + currentServiceObject.id)) {
        Cookies.set('service_' + currentServiceObject.id, JSON.stringify(currentServiceObject));

        _PopUpBox.InfoBox.create('Choosen service has been successfully added to your basket');
      } else {
        _PopUpBox.InfoBox.create('Your basket already contains this service');
      }
    });
  });
  return html;
};

var services = function services() {
  var fragment = $(new DocumentFragment());
  var html = "\n  <div class=\"backgroundServices\"></div>\n  <div class=\"servicesContainer\">\n    <div class=\"mainPanel\">\n      ".concat(createSphere(), "\n      ").concat(createSingleServiceInfo(), "\n    </div>\n  </div>");
  fragment.append(html);
  return fragment;
};

exports.services = services;
},{"../../common/Offers":"../js/common/Offers.js","../../common/PopUpBox":"../js/common/PopUpBox.js","../../services/treatmentsService":"../js/services/treatmentsService.js","./services.scss":"../js/components/ServicesComponent/services.scss","TagCloud":"../../node_modules/TagCloud/dist/TagCloud.js"}],"../js/common/FormValidator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormValidator = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormValidator =
/*#__PURE__*/
function () {
  function FormValidator() {
    _classCallCheck(this, FormValidator);
  }

  _createClass(FormValidator, null, [{
    key: "isEmpty",
    value: function isEmpty(arr) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var str = _step.value;

          if (str.length === 0) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: "isFullFilled",
    value: function isFullFilled(form) {
      var status = true;
      form.each(function () {
        if ($(this).val() === '') {
          status = false;
        }
      });

      if (status === false) {
        return false;
      }

      return status;
    }
  }, {
    key: "isProper",
    value: function isProper(value, regexp) {
      if (value.match(regexp)) {
        FormValidator.corectness = true;
        return true;
      }

      FormValidator.corectness = false;
      return false;
    }
  }, {
    key: "getFormStatus",
    value: function getFormStatus() {
      return FormValidator.corectness;
    }
  }]);

  return FormValidator;
}();

exports.FormValidator = FormValidator;

_defineProperty(FormValidator, "corectness", false);
},{}],"../js/services/authService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authService = void 0;
var authService = {
  auth: function auth(email, password) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(email + ":" + password));
    return fetch('https://itspa.herokuapp.com/auth', {
      method: 'POST',
      headers: headers
    }).then(function (response) {
      return response.json();
    });
  }
};
exports.authService = authService;
},{}],"../js/services/accountService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountService = void 0;
var accountService = {
  create: function create(name, surname, email, tel, pass) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var user = {
      name: name,
      surname: surname,
      tel: tel,
      email: email,
      password: pass
    };
    return fetch('https://itspa.herokuapp.com/create', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user: user
      })
    }).then(function (response) {
      return response.json();
    });
  }
};
exports.accountService = accountService;
},{}],"../js/common/Errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Error = void 0;
var Error = {
  name: "This field can't be empty and must contain only letters",
  surname: "This field can't be empty and must contain only letters",
  email: 'Invalid email format. Example: janK@domain.com',
  tel: 'Invalid telefon format. Example: 123456789',
  pass: 'Your password must have minimum 6 signs and at least one letter and one number'
};
exports.Error = Error;
},{}],"../js/components/BasketComponent/basket.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\assets\\img\\basket.jpg":[["basket.2f1c9bf7.jpg","../assets/img/basket.jpg"],"../assets/img/basket.jpg"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../js/components/BasketComponent/basket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basket = void 0;

var _PopUpBox = require("../../common/PopUpBox");

var _FormValidator = require("../../common/FormValidator");

var _authService = require("../../services/authService");

var _accountService = require("../../services/accountService");

var _Errors = require("../../common/Errors");

require("./basket.scss");

var createHotelItem = function createHotelItem() {
  var hotelObject = null;

  if (Cookies.get('hotel')) {
    hotelObject = JSON.parse(Cookies.get('hotel'));
  } else {
    return '';
  }

  var html = "\n  <div class=\"singleInfo\" id=\"hotelInfo\">\n    <i class=\"fas fa-times cross\" id=\"hotelCross\"></i>\n    <span class=\"singleItem titleItem\">Information about hotel</span>\n    <span class=\"singleItem\">Type of room: ".concat(hotelObject.name, "</span>\n    <span class=\"singleItem\">Beds: ").concat(hotelObject.beds, "</span>\n    <span class=\"singleItem\">Guests: ").concat(hotelObject.guests, "</span>\n    <div class=\"hotelAdditionalInfo\">\n      <span class=\"singleItem\">Children: ").concat(drawTickOrCross(hotelObject.children), "</span>\n      <span class=\"singleItem\">Pets: ").concat(drawTickOrCross(hotelObject.pets), "</span>\n      <span class=\"singleItem\">Balcony: ").concat(drawTickOrCross(hotelObject.balcony), "</span>\n      <span class=\"singleItem\">Mini-Bar: ").concat(drawTickOrCross(hotelObject.miniBar), "</span>\n      <span class=\"singleItem\">Jacuzzi: ").concat(drawTickOrCross(hotelObject.jacuzzi), "</span>\n      <span class=\"singleItem\">Pool: ").concat(drawTickOrCross(hotelObject.pool), "</span>\n    </div>\n    <span class=\"singleItem priceItem\">Price: ").concat(hotelObject.price, "$</span>\n  </div>");
  $('#hotelInfo').ready(function () {
    handleCrossClick($('#hotelCross'), $('#hotelInfo'), 'hotel');
  });
  return html;
};

var handleCrossClick = function handleCrossClick(cross, item, cookieName, serviceName) {
  var clear = function clear() {
    item.remove();
    Cookies.remove(cookieName);

    if (isBasketEmpty()) {
      $('.basket').remove();
      $('.mainPanel').append(createEmptyBasket());
    }
  };

  cross.ready(function () {
    cross.click(function () {
      if (cookieName === 'hotel') {
        _PopUpBox.YesNoBox.create('Remove hotel room from your basket ?', clear);
      } else {
        _PopUpBox.YesNoBox.create("Remove \"".concat(serviceName, "\" from your basket ?"), clear);
      }
    });
  });
};

var drawTickOrCross = function drawTickOrCross(status) {
  if (status) {
    return "<i class=\"fas fa-check\"></i>";
  }

  return "<i class=\"fas fa-times\"></i>";
};

var createEmptyBasket = function createEmptyBasket() {
  var html = "\n  <div class=\"emptyBasket\">\n    <span style=\"margin:5px\">Your basket is empty</span>\n    <span style=\"margin:5px\">and</span>\n    <span style=\"margin:5px\">probably very sad ...</span>\n  </div>";
  return html;
};

var createAuthInputs = function createAuthInputs() {
  var html = "\n  <input type=\"text\" placeholder=\"E-mail\" class=\"inputText\" id=\"login\">\n  <input type=\"password\" placeholder=\"Password\" class=\"inputText\" id=\"password\"></input>\n  <span class=\"formError\" id=\"loginError\"></span>";
  return html;
};

var createLoginButton = function createLoginButton() {
  var html = "<button type=\"button\" class=\"basketButton\" id=\"loginButton\" style=\"width:70%\">Log In</button>";
  $('#loginButton').ready(function () {
    $('#loginButton').click(function () {
      if ($('#loginButton').text() === 'Log In') {
        $('#loginButton').before(createAuthInputs());
        $('#loginButton').text('Submit');
      } else {
        if (!_FormValidator.FormValidator.isFullFilled($('.endSection input[type=text],input[type=password]'))) {
          $('#loginError').text('Both fields must be filled');
        } else {
          _authService.authService.auth($('#login').val(), $('#password').val()).then(function (response) {
            if (response.OK) {
              $('.endSection').remove();
              $('.basket').append(createConfirmationButton());
              Cookies.set('isloggedin', 'true');
              location.reload();
            } else {
              $('#loginError').text('Invalid login or password');
            }
          });
        }
      }
    });
  });
  return html;
};

var createSignUpTextItem = function createSignUpTextItem(type, placeholder, id, config, error) {
  var html = "\n  <input type=\"".concat(type, "\" placeholder=\"").concat(placeholder, "\" class=\"inputText\" id=\"").concat(id, "\" style=\"width:90%;padding:10px\"></input>\n  <span class=\"formError\" id=\"").concat(id, "Error\"></span>");
  $("#".concat(id)).ready(function () {
    $("#".concat(id)).focusout(function () {
      if (!_FormValidator.FormValidator.isProper($("#".concat(id)).val(), config.regex)) {
        $("#".concat(id, "Error")).text(error);
      } else {
        $("#".concat(id, "Error")).text('');
      }
    });
    $("#".concat(id)).on('change keydown paste input', function () {
      $('#formError').html('');
    });
  });
  return html;
};

var createEyeHint = function createEyeHint() {
  var html = "<i class=\"fas fa-eye passHint\"></i>";
  $('.passHint').ready(function () {
    $('.passHint').hover(function () {
      $('#password').attr('type', 'text');
    });
    $('.passHint').mouseleave(function () {
      $('#password').attr('type', 'password');
    });
  });
  return html;
};

var createSignUpPasswordItem = function createSignUpPasswordItem(type, placeholder, id, config, error) {
  var html = "\n  <div class=\"passBox\">\n    <input type=\"password\" placeholder=\"Password\" class=\"inputText\" id=\"password\" style=\"width:100%;padding:10px;margin:10px 0\"></input>\n    ".concat(createEyeHint(), "\n  </div>\n  <meter max=\"4\" id=\"password-strength-meter\"></meter>\n  <p id=\"password-strength-text\" style=\"color:white;\"></p>");
  $("#password").ready(function () {
    $("#password").on('change keydown paste input', function () {
      $('#formError').html('');
      var result = zxcvbn($("#password").val());
      var strength = {
        0: "Worst",
        1: "Bad",
        2: "Weak",
        3: "Good",
        4: "Strong"
      };
      $('#password-strength-meter').val(result.score);

      if ($("#password").val() !== "") {
        $('#password-strength-text').html("Strength: " + strength[result.score]);
      } else {
        $('#password-strength-text').html('');
      }
    });
  });
  return html;
};

var createCancelButton = function createCancelButton() {
  var html = "<button type=\"button\" class=\"basketButton\" id=\"cancelButton\" style=\"width:80%\">Back to basket</button>";
  $('#cancelButton').ready(function () {
    $('#cancelButton').click(function () {
      $('.basket').empty().append(createHotelItem()).append(createServicesContent()).append(createBasketSummary());
    });
  });
  return html;
};

var clearForm = function clearForm() {
  $('#name').val('');
  $('#surname').val('');
  $('#email').val('');
  $('#tel').val('');
  $('#password').val('');
  $('#formError').html('');
  $('#password-strength-meter').val(0);
  $('#password-strength-text').html('');
};

var createSignUpButton = function createSignUpButton() {
  var html = "<button type=\"button\" class=\"basketButton\" id=\"signupButton\" style=\"width:80%\">Submit</button>";
  $('#signupButton').ready(function () {
    $('#signupButton').click(function () {
      if (_FormValidator.FormValidator.isFullFilled($('.basket input[type=text],input[type=password]')) && _FormValidator.FormValidator.getFormStatus()) {
        _accountService.accountService.create($('#name').val(), $('#surname').val(), $('#email').val(), $('#tel').val(), $('#password').val()).then(function (response) {
          if (response.OK) {
            _PopUpBox.InfoBox.create('User account created succesfully');

            clearForm();
          } else {
            $('#formError').html(response.message);
          }
        });
      } else {
        $('#formError').html('All fields must be filled correctly');
      }
    });
  });
  return html;
};

var createSignUpFormButtons = function createSignUpFormButtons() {
  var html = "\n  <div class=\"signUpButtons\">\n    ".concat(createSignUpButton(), "\n    ").concat(createCancelButton(), "\n  </div>");
  return html;
};

var createNewAccountButton = function createNewAccountButton() {
  var html = "<button type=\"button\" class=\"basketButton\" id=\"signupButton\" style=\"width:70%\">Create It</button>";
  $('#signupButton').ready(function () {
    $('#signupButton').click(function () {
      $('.basket').empty();
      var header = "\n      <h1 style=\"color:white;padding:10px;\">Sign Up</h1>\n      <p style=\"color:white;padding:10px;text-align:center\">Please fill in this form to create your free account.</p>";
      $('.basket').append(header).append(createSignUpTextItem('text', 'Name', 'name', {
        regex: /^[A-Za-z]+$/
      }, _Errors.Error.name)).append(createSignUpTextItem('text', 'Surname', 'surname', {
        regex: /^[A-Za-z]+$/
      }, _Errors.Error.surname)).append(createSignUpTextItem('text', 'Email', 'email', {
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }, _Errors.Error.email)).append(createSignUpTextItem('text', 'Telephone', 'tel', {
        regex: /^\d{9}$/
      }, _Errors.Error.tel)).append(createSignUpPasswordItem()).append("<span class=\"formError\" id=\"formError\" style=\"margin-bottom:5px\"></span>").append(createSignUpFormButtons());
    });
  });
  return html;
};

var createLoginSection = function createLoginSection() {
  var html = "\n  <div class=\"endSection\">\n    <span class=\"singleItem\" style=\"color:white\">Please log in to confirm the reservation</span>\n    ".concat(createLoginButton(), "\n    <span class=\"singleItem\" style=\"color:white\">Haven't account at our hotel ?</span>\n    ").concat(createNewAccountButton(), "\n  </div>");
  return html;
};

var removeBasketCookies = function removeBasketCookies() {
  var numOfBasketCookies = 8;

  for (var i = 1; i < numOfBasketCookies; i++) {
    Cookies.remove('service_' + i);
  }

  Cookies.remove('hotel');
};

var createConfirmationButton = function createConfirmationButton() {
  var html = "\n  <div class=\"endSection\">\n    <button type=\"button\" id=\"confirmationButton\" class=\"basketButton\" style=\"width:100%\">Confirm</button>\n  <div>";
  $('#confirmationButton').ready(function () {
    $('#confirmationButton').click(function () {
      $('.basket').slideUp('slow', function () {
        $('.mainPanel').append(createEmptyBasket());

        _PopUpBox.InfoBox.create('The order has been placed successfully');

        removeBasketCookies();
      });
    });
  });
  return html;
};

var createBasketSummary = function createBasketSummary() {
  if (Cookies.get('isloggedin') === 'false') {
    return createLoginSection();
  }

  return createConfirmationButton();
};

var isBasketEmpty = function isBasketEmpty() {
  var empty = true;

  if (Cookies.get('hotel')) {
    return false;
  }

  for (var i = 1; i < 8; i++) {
    if (Cookies.get('service_' + i)) {
      return false;
    }
  }

  return empty;
};

var createBasketContent = function createBasketContent() {
  var html = "";

  if (isBasketEmpty()) {
    html = createEmptyBasket();
  } else {
    html = "\n    <div class=\"basket\">\n      ".concat(createHotelItem(), "\n      ").concat(createServicesContent(), "\n      ").concat(createBasketSummary(), "\n    </div>");
  }

  return html;
};

var createServicesContent = function createServicesContent() {
  var services = [];

  for (var i = 1; i < 8; i++) {
    if (Cookies.get('service_' + i)) {
      services.push(JSON.parse(Cookies.get('service_' + i)));
    }
  }

  var html = "";

  if (services.length > 0) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var service = _step.value;
        html += "\n      <div class=\"singleInfo\" id=\"service_".concat(service.id, "\">\n        <i class=\"fas fa-times cross\" id=\"cross_").concat(service.id, "\"></i>\n        <span class=\"singleItem titleItem\">Information about service</span>\n        <span class=\"singleItem\">Name: ").concat(service.name, "</span>\n        <span class=\"singleItem\">Area: ").concat(service.area, "</span>\n        <span class=\"singleItem\">Time: ").concat(service.time, "min</span>\n        <span class=\"singleItem priceItem\">Price: ").concat(service.price, "$</span>\n      </div>");
        var serviceName = 'service_' + service.id;
        var crossName = 'cross_' + service.id;
        $("#".concat(serviceName)).ready(function () {
          handleCrossClick($("#".concat(crossName)), $("#".concat(serviceName)), serviceName, service.name);
        });
      };

      for (var _iterator = services[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return html;
};

var basket = function basket() {
  var fragment = $(new DocumentFragment());
  var html = "\n    <div class=\"backgroundBasket\"></div>\n    <div class=\"basketContainer\">\n      <div class=\"mainPanel\">\n        ".concat(createBasketContent(), "\n      </div>\n    </div>");
  fragment.append(html);
  return fragment;
};

exports.basket = basket;
},{"../../common/PopUpBox":"../js/common/PopUpBox.js","../../common/FormValidator":"../js/common/FormValidator.js","../../services/authService":"../js/services/authService.js","../../services/accountService":"../js/services/accountService.js","../../common/Errors":"../js/common/Errors.js","./basket.scss":"../js/components/BasketComponent/basket.scss"}],"../js/services/contactService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactService = void 0;
var contactService = {
  getRooms: function getRooms() {
    return fetch('https://randomuser.me/api/').then(function (response) {
      return response.json();
    });
  }
};
exports.contactService = contactService;
},{}],"../js/components/ContactComponent/contact.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\assets\\img\\contact.jpg":[["contact.5d9ea2d3.jpg","../assets/img/contact.jpg"],"../assets/img/contact.jpg"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../js/components/ContactComponent/contact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contact = void 0;

var _contactService = require("../../services/contactService");

require("./contact.scss");

var createQuestionText = function createQuestionText() {
  var html = "\n  <div class=\"questionSection\">\n    <span class=\"contactText\">Have any quastions ? Contact our staff.</span>\n  </div>";
  return html;
};

var createPictureContact = function createPictureContact(data) {
  var html = "\n  <div class=\"nameSection\">\n    <img src=\"".concat(data.picture.medium, "\" alt=\"stuff picture\">\n    <span class=\"name\">").concat(data.name.title, " ").concat(data.name.first, " ").concat(data.name.last, "</span>\n  </div>");
  return html;
};

var createPhonesContact = function createPhonesContact(data) {
  var html = "\n  <div class=\"telSection\">\n    <i class=\"fas fa-phone-alt fa-lg\"></i>\n    <span class=\"name\">".concat(data.phone, "</span>\n  </div>\n  <div class=\"telSection\">\n    <i class=\"fas fa-mobile-alt fa-lg\"></i>\n    <span class=\"name\">").concat(data.cell, "</span>\n  </div>");
  return html;
};

var createEmailContact = function createEmailContact(data) {
  var html = "\n  <div class=\"emailSection\">\n    <i class=\"far fa-envelope fa-lg\"></i>\n    <span class=\"name\">".concat(data.email, "</span>\n  </div>");
  return html;
};

var createContact = function createContact() {
  var html = "<div class=\"contact\"></div>";

  _contactService.contactService.getRooms().then(function (data) {
    $('.contact').ready(function () {
      $('.contact').append(createQuestionText()).append(createPictureContact(data.results[0])).append(createPhonesContact(data.results[0])).append(createEmailContact(data.results[0]));
    });
  });

  return html;
};

var contact = function contact() {
  var fragment = $(new DocumentFragment());
  var html = "\n  <div class=\"backgroundContact\"></div>\n  <div class=\"contactContainer\">\n      <div class=\"contactPanel\">\n        ".concat(createContact(), "\n      </div>\n  </div>");
  fragment.append(html);
  return fragment;
};

exports.contact = contact;
},{"../../services/contactService":"../js/services/contactService.js","./contact.scss":"../js/components/ContactComponent/contact.scss"}],"../js/router/routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _home = require("../components/HomeComponent/home");

var _hotel = require("../components/HotelComponent/hotel");

var _services = require("../components/ServicesComponent/services");

var _basket = require("../components/BasketComponent/basket");

var _contact = require("../components/ContactComponent/contact");

var routes = [{
  path: '/SPA/',
  data: {},
  component: _home.home
}, {
  path: '/SPA/home/',
  data: {},
  component: _home.home
}, {
  path: '/SPA/hotel/',
  data: {},
  component: _hotel.hotel
}, {
  path: '/SPA/services/',
  data: {},
  component: _services.services
}, {
  path: '/SPA/contact/',
  data: {},
  component: _contact.contact
}, {
  path: '/SPA/basket/',
  data: {},
  component: _basket.basket
}];
exports.routes = routes;
},{"../components/HomeComponent/home":"../js/components/HomeComponent/home.js","../components/HotelComponent/hotel":"../js/components/HotelComponent/hotel.js","../components/ServicesComponent/services":"../js/components/ServicesComponent/services.js","../components/BasketComponent/basket":"../js/components/BasketComponent/basket.js","../components/ContactComponent/contact":"../js/components/ContactComponent/contact.js"}],"../js/components/BadPathComponent/badPath.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\assets\\img\\404.png":[["404.2807f9e2.png","../assets/img/404.png"],"../assets/img/404.png"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../js/components/BadPathComponent/badPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badPath = void 0;

require("./badPath.scss");

var badPath = function badPath() {
  var fragment = $(new DocumentFragment());
  var html = "\n  <div class=\"badPathContainer\">\n    <div class=\"badPathImg\"></div>\n  </div>";
  fragment.append(html);
  return fragment;
};

exports.badPath = badPath;
},{"./badPath.scss":"../js/components/BadPathComponent/badPath.scss"}],"../js/navigation/nav.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../js/navigation/nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nav = void 0;

require("./nav.scss");

var toogleMobileAndTabletIcon = function toogleMobileAndTabletIcon() {
  $(function () {
    $(".toggle").on("click", function () {
      if ($(".item").hasClass("active")) {
        $(".item").removeClass("active");
        $(this).find("a").html("<i class='fas fa-bars'></i>");
      } else {
        $(".item").addClass("active");
        $(this).find("a").html("<i class='fas fa-times'></i>");
      }
    });
  });
};

var createLogOutButton = function createLogOutButton() {
  var html = "<li class=\"item power\" id=\"logOutButton\"><a><i class=\"fas fa-power-off\"></i></a></li>";
  var isLoggedIn = Cookies.get('isloggedin');
  $('#logOutButton').ready(function () {
    $('#logOutButton').click(function () {
      Cookies.set('isloggedin', 'false');
      location.reload();
    });
  });

  if (isLoggedIn === 'true') {
    return html;
  }

  return '';
};

var nav = function nav() {
  var fragment = $(new DocumentFragment());
  var html = "\n  <nav>\n    <ul class=\"menu\">\n      <li class=\"logo\"><a href=\"home\">IT SPA </a>\n        <i class=\"far fa-star star\"></i>\n        <i class=\"far fa-star star\"></i>\n        <i class=\"far fa-star star\"></i>\n        <i class=\"far fa-star star\"></i>\n        <i class=\"far fa-star star\"></i>\n      </li>\n      <li class=\"item\"><a href=\"/SPA/home/\">Home</a></li>\n      <li class=\"item\"><a href=\"/SPA/hotel/\">Hotel</a></li>\n      <li class=\"item\"><a href=\"/SPA/services/\">Services</a></li>\n      <li class=\"item\"><a href=\"/SPA/contact/\">Contact</a></li>\n      <li class=\"item button\"><a href=\"/SPA/basket/\"><i class=\"fas fa-shopping-basket\"></i></a></li>\n      ".concat(createLogOutButton(), "\n      <li class=\"toggle\"><a href=\"#\"><i class=\"fas fa-bars\"></i></a></li>\n    </ul>\n  </nav>");
  fragment.append(html);
  toogleMobileAndTabletIcon();
  return fragment;
};

exports.nav = nav;
},{"./nav.scss":"../js/navigation/nav.scss"}],"../js/router/router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _routes = require("./routes");

var _badPath = require("../components/BadPathComponent/badPath");

var _nav = require("../navigation/nav");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Router =
/*#__PURE__*/
function () {
  function Router() {
    _classCallCheck(this, Router);

    this.body = $(document.body);
    this.outlet = $('main');
    this.routes = _routes.routes;
  }

  _createClass(Router, [{
    key: "mount",
    value: function mount(outlet) {
      this.outlet = outlet;
    }
  }, {
    key: "init",
    value: function init() {
      this.navigate(location.pathname);
    }
  }, {
    key: "get",
    value: function get(path) {
      return this.routes.find(function (route) {
        return route.path === path;
      });
    }
  }, {
    key: "has",
    value: function has(path) {
      return this.get(path) !== undefined;
    }
  }, {
    key: "navigate",
    value: function navigate(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      console.log(path);

      if (this.has(path)) {
        var _this$get = this.get(path),
            component = _this$get.component;

        this.outlet.append((0, _nav.nav)()).append(component());
      } else {
        this.outlet.empty().append((0, _badPath.badPath)());
      }

      history.pushState(data, '', path);
    }
  }]);

  return Router;
}();

exports.Router = Router;
},{"./routes":"../js/router/routes.js","../components/BadPathComponent/badPath":"../js/components/BadPathComponent/badPath.js","../navigation/nav":"../js/navigation/nav.js"}],"../js/app.js":[function(require,module,exports) {
"use strict";

var _router = require("./router/router");

var router = new _router.Router();
router.mount($('main'));
router.init();
},{"./router/router":"../js/router/router.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53829" + '/');

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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/app.js"], null)
//# sourceMappingURL=/app.5a203f7e.js.map