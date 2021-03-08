/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../b/book-epub2json/dist/html.js":
/*!*******************************************!*\
  !*** ../../b/book-epub2json/dist/html.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.htmlChunk = void 0;
var htmlChunk = "\n\n<H1 id=\"id_0\">_HEADER _ some header</p>\n<p id=\"id_1\">par some text</p>\n<p id=\"id_2\">par some other text </p>\n<p id=\"id_3\">par with alink <a id=\"aid_1\" href=\"xxx#fn_1\">[[z1]]</a></p>\n<p id=\"id_4\" class=\"ptext\">par p-text-par <a id=\"aid_2\" href=\"xxx#fn_2\">z2</a></p>\n<p id=\"id_4-1\" class=\"ptext\">par p-text-par <a id=\"aid_2\" href=\"xxx#linknote-11\">z2</a></p>\n<p id=\"id_4-2\" class=\"ptext\">par p-text-par <a id=\"aid_2\" href=\"xxx#linknote-12\">z2</a></p>\n<ul id=\"ulid_1\" class=\"list\">\n  <li id=\"liid_1\">line string 1</li>\n  <li id=\"liid_2\">line string 2</li>\n</ul>\n<p id=\"fn_1\"> footnote fn_1 text </p>\n<p id=\"fn_2\"> footnote fn_2 text </p>\n<p id=\"id_2\">par some other text </p>\n\n<p>in astronomy and physics generally.</p>\n<div class=\"fig c4\"><a id=\"illus03\"/> \u201CQUADRANS MURALIS SIVE TICHONICUS.\u201D\n<p class=\"caption\">\u201CQ<small>UADRANS</small> M<small>URALIS SIVE</small> T<small>ICHONICUS</small>.\u201D<br/>\nWith portrait of Tycho Brahe, instruments, etc., painted on the wall; showing assistants using the sight, watching the clock, and recording. (From the author\u2019s copy of the <i>Astronomi\xE6 Instaurat\xE6 Mechanica</i>.)</p>\n</div>\n<hr/>\n<p><b>FOOTNOTES:</b></p>\n<p class=\"footnote\"><a id=\"linknote-11\"/> <a href=\"chapters/item11/OEBPS/@public@vhost@g@gutenberg@html@files@8172@8172-h@8172-h-6.htm.html#linknoteref-11\" class=\"pginternal\">[1]</a> For definition see p. 22.</p>\n<p class=\"footnote\"><a id=\"linknote-12\"/> <a href=\"chapters/item11/OEBPS/@public@vhost@g@gutenberg@html@files@8172@8172-h@8172-h-6.htm.html#linknoteref-12\" class=\"pginternal\">[2]</a> <i>Ibid</i>.</p>\n\n"; // practical value.<a id="FNanchor_76_76"/><a href="chapters/item19/OEBPS/@public@vhost@g@gutenberg@html@files@39508@39508-h@39508-h-14.htm.html#Footnote_76_76" class="fnanchor pginternal">[76]</a></p>
// <p><a id="Footnote_76_76"></a><a href="chapters/item11/OEBPS/@public@vhost@g@gutenberg@html@files@39508@39508-h@39508-h-6.htm.html#FNanchor_76_76" class="pginternal"><span class="label">[76]</span></a> I am well aware
// <a - не первый child
// - а в footnote - первый
//
// file:///tmp/.private/michael/atril-751/The_Myth_of_Sisyphus.epubBHBGP0/OEBPS/Text/Endnote05.xhtml
// file:///tmp/.private/michael/atril-751/The_Myth_of_Sisyphus.epubBHBGP0/OEBPS/Text/Piece01.Chapter01.xhtml#endnote05
// <i class="calibre3">Jaiminiya Brahmana</i> (c. 600 BCE)<a href="doni_9781101028704_oeb_nts_r1_split_000.html#en388" id="Ref-en388"><sup class="calibre6">2</sup></a>

exports.htmlChunk = htmlChunk;

/***/ }),

/***/ "../../b/book-epub2json/dist/index.js":
/*!********************************************!*\
  !*** ../../b/book-epub2json/dist/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.epub2json = epub2json;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator"));

var _asyncIterator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncIterator */ "@babel/runtime/helpers/asyncIterator"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _epub = _interopRequireDefault(__webpack_require__(/*! epub */ "epub"));

var _html = __webpack_require__(/*! ./html */ "../../b/book-epub2json/dist/html.js");

var jsdom = __webpack_require__(/*! jsdom */ "jsdom");

var JSDOM = jsdom.JSDOM;

var iso6393 = __webpack_require__(/*! iso-639-3 */ "iso-639-3");

var log = console.log;

function epub2json(_x) {
  return _epub2json.apply(this, arguments);
}

function _epub2json() {
  _epub2json = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(bpath) {
    var epub, meta, lang, iso, descr, toc, chapters, docs, zerodoc;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getEpub(bpath);

          case 2:
            epub = _context3.sent;
            meta = epub.metadata;
            lang = meta.language; // log('____EPUB epub.metadata', epub.manifest)

            iso = _lodash["default"].find(iso6393, function (iso) {
              return iso.iso6391 == lang;
            });
            if (iso) lang = iso.iso6393;
            descr = {
              type: 'epub',
              author: meta.creator,
              title: meta.title,
              lang: lang
            }; // , description: meta

            toc = _lodash["default"].filter(epub.manifest, function (chapter) {
              return chapter.order;
            });
            chapters = toc.map(function (chapter) {
              return {
                id: chapter.id,
                title: chapter.title
              };
            }); // log('_chapters', chapters)

            _context3.prev = 10;
            _context3.next = 13;
            return getMDs(epub, chapters);

          case 13:
            docs = _context3.sent;
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](10);
            log('____EPUB IMPORT ERR', _context3.t0);
            docs = [];

          case 20:
            zerodoc = {
              level: 1,
              md: [descr.author, descr.title].join(', ')
            };
            docs.unshift(zerodoc); // log('_META-TOC', epub.toc)
            // log('_EPUB-docs', docs)

            return _context3.abrupt("return", {
              descr: descr,
              docs: docs,
              imgs: []
            });

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, null, [[10, 16]]);
  }));
  return _epub2json.apply(this, arguments);
}

function getEpub(bpath) {
  return new Promise(function (resolve, reject) {
    var epub = new _epub["default"](bpath, 'images', 'chapters');
    epub.on("end", function () {
      resolve(epub);
    });
    epub.on('error', reject);
    epub.parse();
  });
}

function getMDs(epub, chapters) {
  var docs, fns, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _value, header;

  return _regenerator["default"].async(function getMDs$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          docs = [];
          fns = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _context2.prev = 4;

          _loop = /*#__PURE__*/function () {
            var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var flowchapter, chapter, titledoc, html, docid, dom, loop;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      loop = function _loop2(node) {
                        var nodes = node.childNodes; // let first = true

                        nodes.forEach(function (node) {
                          if (!node.textContent) return;
                          var md = node.textContent.trim();
                          md = cleanStr(md);
                          if (!md) return; // let doc = {_id: '', path: ''}

                          var doc = {}; // if (first && chIDs.includes(flowchapter.id)) {
                          //   doc.level = 3
                          //   first = false
                          // }

                          if (/H\d/.test(node.nodeName)) {
                            doc.level = node.nodeName.slice(1) * 1;
                            md = md.replace(/\.$/, '');
                          } else if (node.nodeName === 'DIV') {
                            return;
                          } else if (node.nodeName === 'P') {
                            // footnotes, endnotes:
                            var pid = node.id; // calibre v.2 <p id>

                            if (!pid) {
                              var firstel = node.firstChild; // gutenberg <p><a id>

                              if (firstel && firstel.nodeName === 'A') pid = firstel.id;
                            }

                            if (fns.includes(pid)) {
                              doc._id = ['ref', pid].join('-');
                              doc.footnote = true;
                            } else {
                              // let aels = node.querySelectorAll('a') // electron security violation
                              var aels = _lodash["default"].filter(node.childNodes, function (node) {
                                return node.nodeName == 'A';
                              });

                              _lodash["default"].each(aels, function (ael) {
                                var _getRefnote = getRefnote(ael),
                                    refnote = _getRefnote.refnote,
                                    notepath = _getRefnote.notepath;

                                if (!notepath) return;
                                if (!doc.refnote) doc.refnote = {}; // doc.refnote[refnote] = ['ref', notepath].join('-')

                                doc.refnote[refnote] = notepath;
                                fns.push(notepath);
                              });
                            }
                          } else if (node.nodeName == 'UL') {
                            var olines = node.children;

                            _lodash["default"].each(olines, function (el) {// LIST
                            });
                          } else {
                            return;
                          } // if nodeName


                          doc.md = md;
                          docs.push(doc);
                        }); // each node

                        for (var i = 0; i < nodes.length; i++) {
                          if (!nodes[i]) continue;

                          if (nodes[i].childNodes.length > 0) {
                            loop(nodes[i]);
                          }
                        }
                      };

                      flowchapter = _value;
                      chapter = chapters.find(function (chapter) {
                        return chapter.id == flowchapter.id;
                      });

                      if (chapter) {
                        titledoc = {
                          level: 2,
                          md: chapter.title
                        };
                        docs.push(titledoc);
                      }

                      _context.next = 6;
                      return getChapter(epub, flowchapter.id);

                    case 6:
                      html = _context.sent; // log('_HTML====================================\n', flowchapter.id, html.length)

                      html = html.replace(/\/>/g, '/></a>'); // jsdom xhtml feature

                      docid = 0;
                      dom = new JSDOM(html); // dom = new JSDOM(html, {contentType: "application/xhtml+xml"})
                      // dom = new JSDOM(html, {contentType: "text/html"})

                      loop(dom.window.document.body);
                    // loop

                    case 11:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function _loop() {
              return _ref.apply(this, arguments);
            };
          }();

          _iterator = (0, _asyncIterator2["default"])(epub.flow);

        case 7:
          _context2.next = 9;
          return _regenerator["default"].awrap(_iterator.next());

        case 9:
          _step = _context2.sent;
          _iteratorNormalCompletion = _step.done;
          _context2.next = 13;
          return _regenerator["default"].awrap(_step.value);

        case 13:
          _value = _context2.sent;

          if (_iteratorNormalCompletion) {
            _context2.next = 20;
            break;
          }

          _context2.next = 17;
          return _regenerator["default"].awrap(_loop());

        case 17:
          _iteratorNormalCompletion = true;
          _context2.next = 7;
          break;

        case 20:
          _context2.next = 26;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 26:
          _context2.prev = 26;
          _context2.prev = 27;

          if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
            _context2.next = 31;
            break;
          }

          _context2.next = 31;
          return _regenerator["default"].awrap(_iterator["return"]());

        case 31:
          _context2.prev = 31;

          if (!_didIteratorError) {
            _context2.next = 34;
            break;
          }

          throw _iteratorError;

        case 34:
          return _context2.finish(31);

        case 35:
          return _context2.finish(26);

        case 36:
          header = docs.find(function (doc) {
            return doc.level > -1;
          });
          if (!header) header = docs[0], header.level = 1;
          return _context2.abrupt("return", _lodash["default"].flatten(docs));

        case 39:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 22, 26, 36], [27,, 31, 35]], Promise);
}

function getRefnote(ael) {
  var notepath = ael.getAttribute('href');
  if (!notepath) return {
    refnote: null
  };
  notepath = notepath.split('#')[1];
  if (!notepath) return {
    refnote: null
  };
  notepath = notepath.replace(/ref-/g, '');
  var refnote = ael.textContent.replace(/\[/g, '').replace(/\]/g, '').replace(/ref-/g, '');
  if (refnote.length > 3) return {
    refnote: null
  }; // not footnotes

  return {
    refnote: refnote,
    notepath: notepath
  };
}

function q(html, selector) {
  var frag = JSDOM.fragment(html);
  return frag.querySelector(selector);
}

function getChapter(epub, id) {
  return new Promise(function (resolve, reject) {
    epub.getChapter(id, function (error, html) {
      resolve(html);
    });
  });
}

function zerofill(number, size) {
  number = number.toString();

  while (number.length < size) {
    number = "0" + number;
  }

  return number;
}

function cleanStr(str) {
  // return str.replace(/\n+/g, '\n').replace(/↵+/, '\n').replace(/  +/, ' ') // .replace(/\s+/, ' ')
  return str.replace(/\n+/g, ' ').replace(/↵+/, '\n').replace(/  +/, ' '); // .replace(/\s+/, ' ')
  // todo: проверить - см Camus, La Chute - короткие строки имеющие \n в конце каждой
}

/***/ }),

/***/ "../../b/book-fb2json/dist/index.js":
/*!******************************************!*\
  !*** ../../b/book-fb2json/dist/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fb2json = fb2json;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator"));

var _ = __webpack_require__(/*! lodash */ "lodash");

var fse = __webpack_require__(/*! fs-extra */ "fs-extra");

var path = __webpack_require__(/*! path */ "path");

var log = console.log;

var util = __webpack_require__(/*! util */ "util");

var unzipper = __webpack_require__(/*! unzipper */ "unzipper");

var iconv = __webpack_require__(/*! iconv-lite */ "iconv-lite");

var iso6393 = __webpack_require__(/*! iso-639-3 */ "iso-639-3"); // let decoder = new util.TextDecoder('utf-8')


var insp = function insp(o) {
  return log(util.inspect(o, false, null));
};

var convert = __webpack_require__(/*! xml-js */ "xml-js");

function parseZip(_x) {
  return _parseZip.apply(this, arguments);
}

function _parseZip() {
  _parseZip = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fbpath) {
    var directory, file;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return unzipper.Open.file(fbpath);

          case 2:
            directory = _context.sent;
            file = directory.files[0];
            _context.next = 6;
            return file.buffer();

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseZip.apply(this, arguments);
}

function fb2json(_x2) {
  return _fb2json.apply(this, arguments);
}

function _fb2json() {
  _fb2json = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(fbpath) {
    var ext, buffer, errmess, fbobj, xml, fictionbook, fbels, description, descr, docs, imgs, headers, md, xtitle;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ext = path.extname(fbpath);
            _context2.prev = 1;

            if (!(ext == '.zip')) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return parseZip(fbpath);

          case 5:
            _context2.t0 = _context2.sent;
            _context2.next = 16;
            break;

          case 8:
            if (!(ext == '.fb2')) {
              _context2.next = 14;
              break;
            }

            _context2.next = 11;
            return fse.readFile(fbpath);

          case 11:
            _context2.t1 = _context2.sent;
            _context2.next = 15;
            break;

          case 14:
            _context2.t1 = null;

          case 15:
            _context2.t0 = _context2.t1;

          case 16:
            buffer = _context2.t0;
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t2 = _context2["catch"](1);
            errmess = 'not .fb2 file';
            return _context2.abrupt("return", {
              descr: errmess
            });

          case 23:
            _context2.prev = 23;
            xml = buffer.toString();

            if (/1251/.test(xml.split('\n')[0])) {
              buffer = iconv.decode(buffer, 'cp1251');
              xml = buffer.toString();
            }

            fbobj = convert.xml2js(xml, {
              compact: false,
              trim: true,
              ignoreDeclaration: true,
              ignoreComment: true,
              ignoreCdata: true
            });
            _context2.next = 33;
            break;

          case 29:
            _context2.prev = 29;
            _context2.t3 = _context2["catch"](23);
            errmess = 'can not read .fb2 file';
            return _context2.abrupt("return", {
              descr: errmess
            });

          case 33:
            fictionbook = _.find(fbobj.elements, function (el) {
              return el.name == 'FictionBook';
            });

            if (fictionbook) {
              _context2.next = 36;
              break;
            }

            return _context2.abrupt("return", {
              descr: 'empty .fb2 file'
            });

          case 36:
            fbels = fictionbook.elements;
            description = _.find(fbels, function (el) {
              return el.name == 'description';
            });
            if (fbels) descr = parseInfo(description);else descr = {
              author: 'no author',
              title: 'no title',
              lang: 'no lang'
            };
            docs = parseFB(fbels);
            imgs = [];
            headers = docs.filter(function (doc) {
              return doc.level;
            });

            if (!headers.length) {
              docs[0].level = 1;
            } else if (!headers.filter(function (doc) {
              return doc.level == 1;
            }).length) {
              md = [descr.author, descr.title].join('. ');
              xtitle = {
                md: md,
                level: 1
              };
              docs.unshift(xtitle);
            }

            return _context2.abrupt("return", {
              descr: descr,
              docs: docs,
              imgs: imgs
            });

          case 44:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 19], [23, 29]]);
  }));
  return _fb2json.apply(this, arguments);
}

function parseInfo(description) {
  var descr = {};
  var descrs = description.elements;

  var xtitleInfo = _.find(descrs, function (el) {
    return el.name == 'title-info';
  });

  var xdocInfo = _.find(descrs, function (el) {
    return el.name == 'document-info';
  });

  var xpubInfo = _.find(descrs, function (el) {
    return el.name == 'publish-info';
  });

  var titleInfo = stripElement(xtitleInfo);
  var annotation;
  var lang;
  if (titleInfo.author) descr.author = parseAuthor(titleInfo.author);
  if (titleInfo.annotation) annotation = parseParEls(titleInfo.annotation);
  if (titleInfo['book-title']) descr.title = getText(titleInfo['book-title']);
  if (titleInfo.lang) lang = getText(titleInfo.lang);

  if (lang) {
    var iso = _.find(iso6393, function (iso) {
      return iso.iso6391 == lang;
    });

    if (iso) lang = iso.iso6393;
    descr.lang = lang;
  }

  if (annotation) descr.annotation = annotation;
  return descr;
}

function parseFB(fb) {
  var docs = [];
  var rawbodies = fb.filter(function (el) {
    return el.name == 'body';
  });
  var body = rawbodies.find(function (el) {
    return el.name == 'body';
  });

  var notel = _.find(rawbodies, function (body) {
    return body.attributes && body.attributes.name == 'notes';
  }); // bodies.forEach(body=> {


  var bdocs = parseDocs(body);
  docs.push.apply(docs, (0, _toConsumableArray2["default"])(bdocs)); // })

  var notels = notel ? notel.elements : [];
  var noteid, refnote;
  notels.forEach(function (notel) {
    var note = {
      footnote: true
    };
    notel.elements.forEach(function (el) {
      if (el.name == 'title') refnote = el.elements[0].elements[0].text;else if (el.name == 'p') note.md = el.elements[0].text;
    });
    if (!refnote) return;
    noteid = refnote.replace('[', '').replace(']', '');
    note._id = ['ref', noteid].join('-');
    docs.push(note);
  });
  return docs;
}

function parseDocs(body) {
  var docs = []; // let els = body.elements

  var level = 1;
  body.elements.forEach(function (el) {
    if (el.name == 'title') {
      parseTitle(docs, el, level);
    } else if (el.name == 'section') {
      parseSection(docs, level, el);
    } else {// log('___ELSE', el)
    }
  });
  return docs;
}

function parseSection(docs, level, sec) {
  level += 1;
  if (!sec) return;
  sec.elements.forEach(function (el) {
    if (el.name == 'title') {
      parseTitle(docs, el, level);
    } else if (el.name == 'section') {
      parseSection(docs, level, el);
    } else if (el.name == 'cite') {
      var quotes = parseQuote(el.elements);
      docs.push.apply(docs, (0, _toConsumableArray2["default"])(quotes));
    } else if (el.name == 'poem') {
      var lines = parsePoem(el.elements);
      docs.push.apply(docs, (0, _toConsumableArray2["default"])(lines));
    } else if (el.name == 'p') {
      var doc = parseParEls(el.elements);
      docs.push(doc);
    } else {// log('___ELSE', el)
      // empty-line
      // image
    }
  });
}

function parseParEls(els) {
  var doc = {};
  var texts = [];
  els.forEach(function (el) {
    if (el.type == 'text') {
      var text = cleanText(el.text);
      texts.push(text);
    } else if (el.type == 'element' && el.name == 'p') {
      var par = parseParEls(el.elements);
      texts.push(par.md);
    } else if (el.type == 'element' && el.name == 'emphasis') {
      if (!el.elements) return;
      var emph = el.elements[0];

      var _text = cleanText(emph.text);

      var md = ['_', _text, '_'].join('');
      texts.push(md);
    } else if (el.type == 'element' && el.name == 'strong') {
      if (!el.elements) return;
      var _emph = el.elements[0];

      var _text2 = cleanText(_emph.text);

      var _md = ['*', _text2, '*'].join('');

      texts.push(_md);
    } else if (el.type == 'element' && el.name == 'sup') {
      if (!el.elements || el.elements.length) return;
      var sup = el.elements[0];
      var _text3 = sup.elements[0].text;
      var _md2 = _text3;
      texts.push(_md2);
    } else if (el.type == 'element' && el.name == 'a') {
      if (!el.elements[0].text) return;
      var ref = el.elements[0].text.replace('[', '').replace(']', '');
      var refnote = ['[', ref, ']'].join('');
      texts.push(refnote);
      if (!doc.refnote) doc.refnote = {};
      doc.refnote[ref] = ref;
    } else if (el.type == 'element' && el.name == 'stanza') {
      var _par = parseParEls(el.elements);

      texts.push(_par.md);
    } else if (el.type == 'element' && el.name == 'v') {
      var _text4 = cleanText(el.elements[0].text);

      log('_LIST', el);
      texts.push(_text4);
      doc.type = 'list';
    } else if (el.type == 'element' && el.name == 'style') {
      return;
    } else if (el.type == 'element' && el.name == 'empty-line') {
      return;
    } else if (el.type == 'element' && el.name == 'title') {
      return; // // could be used as note reference:
      // try {
      //   let ref = el.elements[0].elements[0].text.replace('[', '').replace(']', '')
      //   let footnote = ['[', ref, ']: '].join('')
      //   texts.push(footnote)
      //   throw new Error()
      // } catch(err) {
      //   log('FN ERR: some error')
      // }
    } else {
      // todo: ===================== finish stuff elements
      console.log('ERR: FB2 NOT EL:', el);
      throw new Error('NOT A PAR TEXT'); // todo: del
    }
  });
  doc.md = texts.join(' ').trim();
  if (doc.type == 'list') log('_DL', doc);
  return doc;
}

function parseAuthor(els) {
  var fname = _.find(els, function (el) {
    return el.name == 'first-name';
  });

  var mname = _.find(els, function (el) {
    return el.name == 'middle-name';
  });

  var lname = _.find(els, function (el) {
    return el.name == 'last-name';
  });

  var author = [getOnlyEl(fname), getOnlyEl(mname), getOnlyEl(lname)].join(' ');
  return author;
}

function stripElement(xdoc) {
  var doc = {};
  if (xdoc.type == 'element') doc = getEls(xdoc);else if (xdoc.type == 'text') doc.text = getText(xdoc);
  return doc;
}

function getEls(xdoc) {
  var doc = {};
  xdoc.elements.forEach(function (el) {
    doc[el.name] = el.elements;
  });
  return doc;
}

function getOnlyEl(xdoc) {
  if (!xdoc || !xdoc.elements || !xdoc.elements.length) return '';
  var el = xdoc.elements[0];
  var text = el.text ? el.text : '';
  return text;
}

function getText(xdoc) {
  var el = xdoc[0];
  var text = el.text ? cleanText(el.text) : '';
  return text;
}

function cleanText(str) {
  if (!str) return '';
  var clean = str.replace(/\s\s+/g, ' ');
  return clean;
}

function parseTitle(docs, xtitle, level) {
  if (!xtitle.elements) return;
  xtitle.elements.forEach(function (titlel) {
    var titledoc = parseParEls(titlel.elements);
    titledoc.level = level;
    if (titledoc.md) docs.push(titledoc);
  });
}

function parsePoem(els) {
  var poemdocs = [];
  els.forEach(function (stanza) {
    var vs = stanza.elements.filter(function (v) {
      return v.name == 'v';
    });
    vs.forEach(function (v, idx) {
      var vtexts = v.elements.filter(function (v) {
        return v.text;
      });
      vtexts.forEach(function (vel) {
        var doc = {
          md: vel.text,
          type: 'list'
        };
        if (!idx) doc.type = 'ulist';
        if (doc.md) poemdocs.push(doc);
      });
    });
  });
  return poemdocs;
}

function parseQuote(els) {
  var qdocs = [];
  els.forEach(function (quotel) {
    if (!quotel.elements) return;
    var doc = {
      md: quotel.elements[0].text,
      type: 'quote'
    }; // log('_QQ', quotel)

    if (doc.md) qdocs.push(doc);
  });
  return qdocs;
}

/***/ }),

/***/ "../../b/book-pdf2json/dist/index.js":
/*!*******************************************!*\
  !*** ../../b/book-pdf2json/dist/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pdf2json = pdf2json;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var path = __webpack_require__(/*! path */ "path");

var log = console.log;

var fse = __webpack_require__(/*! fs-extra */ "fs-extra");

var pdf = __webpack_require__(/*! pdf-extraction */ "pdf-extraction");

var options = {
  pagerender: render_page
};

function render_page(pageData) {
  var render_options = {
    normalizeWhitespace: true,
    disableCombineTextItems: false
  };
  return pageData.getTextContent(render_options).then(function (textContent) {
    var lastY,
        text = "PAGE_BREAK\n"; // log('_TC', textContent.items)

    var _iterator = _createForOfIteratorHelper(textContent.items),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if (lastY == item.transform[5] || !lastY) {
          text += item.str;
        } else {
          text += "\n" + item.str;
        }

        lastY = item.transform[5];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return text.trim();
  })["catch"](function (err) {
    log('_ERR-text', err);
  });
}

function pdf2json(_x) {
  return _pdf2json.apply(this, arguments);
}
/*
  считаю к-во строк на стр, длинну строки
  убираю колонтитулы
  ставлю заголовки

*/


function _pdf2json() {
  _pdf2json = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(bpath) {
    var dataBuffer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataBuffer = fse.readFileSync(bpath);
            return _context.abrupt("return", pdf(dataBuffer, options).then(function (data) {
              var descr = {
                title: data.info.Title || 'title',
                author: data.info.Author || 'author'
              };
              var docs = parseText(data.text);
              var title = {
                md: descr.title,
                level: 1
              };
              docs.unshift(title);
              var res = {
                descr: descr,
                docs: docs,
                imgs: []
              };
              return res;
            })["catch"](function (err) {
              log('_ERR PDF', err);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _pdf2json.apply(this, arguments);
}

function removeSimpleColonTitle(pages) {
  return pages;
}

function removeColonTitle(pages) {
  return pages;
}

function parseText(str) {
  str = str.replace(/\n\n+/g, '\n');
  var pages = str.split('PAGE_BREAK');
  var pagerows = pages.map(function (page) {
    return page.split('\n').map(function (row) {
      return row.trim();
    }).filter(function (row) {
      return row;
    });
  }).filter(function (page) {
    return page.length;
  });
  var testpages = pagerows.slice(25, pages.length - 25);

  var pagesize = _lodash["default"].round(_lodash["default"].sum(testpages.map(function (testrows) {
    return testrows.length;
  })) / testpages.length);

  var rows = _lodash["default"].flatten(testpages.map(function (testrows) {
    return testrows;
  })).filter(function (row) {
    return row;
  });

  var rowsize = _lodash["default"].round(_lodash["default"].sum(rows.map(function (row) {
    return row.length;
  })) / rows.length);

  log('_PS', pagesize);
  log('_RS', rowsize);

  var parbr = _lodash["default"].round(rowsize * 0.75);

  log('_PBR', parbr);
  pages = removeSimpleColonTitle(pages);
  pages = removeColonTitle(pages);
  var docs = [];
  var parsigns = '.?:]!0123456789'.split('');
  var nonheaders = '–'.split('');
  var prev = '';
  var doc = {};
  var mds = [];
  pagerows.forEach(function (rows, idy) {
    // if (idy < 4) return
    // if (idy > 20) return
    // log('_PAGE-rows:', idy, rows, '______end-rows')
    rows.forEach(function (row, idx) {
      if (prev.length <= parbr) {
        doc.md = mds.join(' ');
        if (mds.length) docs.push(doc);
        doc = {};
        mds = [row]; // if (!idx) docs.push({pb__________________: idy})

        if (!idx && rows.length <= pagesize / 1.5 && row.length <= rowsize / 2) doc.level = 2;
      } else {
        mds.push(row);
      }

      prev = row;
    });
  }); // docs = docs.slice(50,60)

  var headers = docs.filter(function (doc) {
    return doc.level;
  }); // log('_BPS', docs)

  return docs;
}

function parseText_(str) {
  str = str.replace(/\n\n+/g, '\n'); // log('__str__', str)

  return [];
  str = cleanStr(str);
  var rebreak = new RegExp('\n\n+');
  str = str.replace(/ \n/g, '\n').replace(/\n+PAGE_BREAK/g, '\nPAGE_BREAK').trim();
  log('_____str', str.length); // PAGE_BREAK - before - . : ? " ] ! \d * ;
  // return []

  var rpages = str.split('PAGE_BREAK');
  var strsize = 0;
  var pages = [];

  var _iterator2 = _createForOfIteratorHelper(rpages),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var rpage = _step2.value;
      rpage = rpage.trim();
      if (!rpage) continue;
      var pars = rpage.trim().replace(/ \n/g, '\n').split(rebreak);
      pars = pars.filter(function (par) {
        return par;
      }); // remove digits-only colons:

      var test = pars[pars.length - 1];
      if (/^\d+$/.test(test)) pars = pars.slice(0, -1);
      test = pars[0];
      if (/^\d+$/.test(test)) pars = pars.slice(1);
      var rows = pars.map(function (par) {
        return par.trim().split('\n');
      });
      rows = rows.filter(function (row) {
        return row;
      });
      if (rows.length) pages.push(rows);
    } // remove possible colons:

  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var has_colon = false;
  var possibleheads = pages.map(function (page) {
    return page[0][0];
  });

  var uniq = _lodash["default"].uniq(possibleheads);

  if (possibleheads.length / uniq.length > 10) has_colon = true; // has_colon = true

  if (has_colon) {
    var freqs = [];

    var _iterator3 = _createForOfIteratorHelper(uniq),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _colon = _step3.value;
        freqs.push({
          colon: _colon,
          freq: countInArray(possibleheads, _colon)
        });
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var max = _lodash["default"].max(freqs, 'freq');

    var colon = max.colon;

    var _iterator4 = _createForOfIteratorHelper(pages),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var page = _step4.value;
        if (page[0][0] === colon) page[0] = page[0].slice(1);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  } // //compact pages
  // pages = pages.map(page=> {
  //   return page.filter(par=> par.length)
  // })


  pages = _lodash["default"].flatten(pages.filter(function (page) {
    return page.length;
  }));
  log('_____pages', pages);
  return [];
  pages.forEach(function (page) {
    page[0][0] = 'HEAD-' + page[0][0];
  });
  log('_____pages', pages);
  return [];
  var cpars = [],
      row;

  var _iterator5 = _createForOfIteratorHelper(pages),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _page = _step5.value;

      var _iterator6 = _createForOfIteratorHelper(_page),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _cpars;

          var par = _step6.value;
          row = par.join('\n');

          (_cpars = cpars).push.apply(_cpars, (0, _toConsumableArray2["default"])(breakRow(row)));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  cpars = _lodash["default"].flattenDeep(cpars);
  var text = cpars.join('BREAK'); // text = text.trim().replace(/\s\s+/g, ' ')

  text = text.replace(/BREAKHEAD-/, '');
  var mds = text.split('BREAK');
  var docs = mds.map(function (par) {
    var doc = {
      md: par
    };

    if (/HEAD-/.test(par)) {
      doc.md = par.slice(5);
      if (par.length < 50) doc.level = 2;
    }

    return doc;
  });
  return docs;
}

function cleanStr(str) {
  if (!str) return ''; // let clean = str.trim().replace(/\s\s+/g, ' ')

  var clean = str.replace(/“/g, '"').replace(/”/g, '"').replace(/»/g, '"').replace(/«/g, '"').replace(/\t/g, ' ').replace(/ +/g, ' ');
  return clean;
}

function countInArray(array, value) {
  return array.reduce(function (n, x) {
    return n + (x === value);
  }, 0);
}

function breakRow(row) {
  row = row.replace(/\nPAGE_BREAK/g, 'PAGE_BREAK');
  row = row.replace(/\"\n\"/g, '"BREAK"');
  row = row.replace(/([A-Z])\n([A-Z])/g, "$1BREAK$2");
  row = row.replace(/\.\n\"/g, '.BREAK"').replace(/\?\n\"/g, '?BREAK"');
  row = row.replace(/\"\n([A-Z])/g, "\"BREAK$1");
  row = row.replace(/\.\n([A-Z])/g, ".BREAK$1");
  row = row.replace(/\?\n([A-Z])/g, "?BREAK$1");
  row = row.replace(/\n/g, " ");
  var strs = row.split('BREAK');
  return strs;
}

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _b_book_fb2json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../b/book-fb2json */ "../../b/book-fb2json/dist/index.js");
/* harmony import */ var _b_book_epub2json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../b/book-epub2json */ "../../b/book-epub2json/dist/index.js");
/* harmony import */ var book_md2json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! book-md2json */ "book-md2json");
/* harmony import */ var book_md2json__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(book_md2json__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _b_book_pdf2json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../b/book-pdf2json */ "../../b/book-pdf2json/dist/index.js");
/* harmony import */ var _i18n_menu_factory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./i18n/menu-factory */ "./src/i18n/menu-factory.js");




 // import { fb2json } from 'book-fb2json'

 // import { epub2json } from 'book-epub2json' // ??? нету
// import { md2json } from '../../../b/book-md2json'


 // import { pdf2json } from 'book-pdf2json'

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const positionstore = new Store({
  name: 'bounds'
});
 // Special module holding environment variables which you declared
// in config/env_xxx.json file.
// import env from "env";

const createWindow = () => {
  const mainWindow = new electron__WEBPACK_IMPORTED_MODULE_2__.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegration: true
    }
  });
  let winBounds = positionstore.get('main') || mainWindow.getBounds();
  mainWindow.setBounds(winBounds);
  mainWindow.loadURL(url__WEBPACK_IMPORTED_MODULE_1___default().format({
    pathname: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "app.html"),
    protocol: "file:",
    slashes: true
  }));
  mainWindow.webContents.on('will-navigate', event => {
    event.preventDefault();
  });
  mainWindow.webContents.openDevTools();
  global.templates = {};
  global.dgl = {};
  mainWindow.on('close', () => {
    positionstore.set('main', mainWindow.getBounds());
  }); // mainWindow.on('resize', () => {
  //   positionstore.set('main', mainWindow.getBounds())
  // })

  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('importBook', async (event, data) => {
    let bpath = data.bpath;
    let ext = path__WEBPACK_IMPORTED_MODULE_0___default().extname(data.bpath);
    if (!ext) return false;
    let type = ext.replace(/^\./, '');
    if (type == 'zip') type = bpath.split('.').slice(-2).join('.');
    let action;
    if (type == 'epub') action = _b_book_epub2json__WEBPACK_IMPORTED_MODULE_5__.epub2json;else if (type == 'fb2') action = _b_book_fb2json__WEBPACK_IMPORTED_MODULE_4__.fb2json;else if (type == 'fb2.zip') action = _b_book_fb2json__WEBPACK_IMPORTED_MODULE_4__.fb2json;else if (type == 'pdf') action = _b_book_pdf2json__WEBPACK_IMPORTED_MODULE_7__.pdf2json; // else if (type == 'html') action = html2json
    else if (type == 'md') action = book_md2json__WEBPACK_IMPORTED_MODULE_6__.md2json;else return {
        descr: 'book extension should be .epub, .fb2, .fb2.zip, .md or .dgl'
      };
    let result = await action(bpath);
    result.type = type;
    result.bpath = bpath;
    if (data.orbid) result.orbid = data.orbid;
    mainWindow.webContents.send('importBookResult', result);
  });
};

const createPopup = () => {
  const popupWindow = new electron__WEBPACK_IMPORTED_MODULE_2__.BrowserWindow({
    width: 200,
    height: 300,
    frame: false,
    hasShadow: true,
    show: false,
    webPreferences: {
      // enableRemoteModule: true,
      nodeIntegration: true
    }
  });
  let popupBounds = positionstore.get('popup') || popupWindow.getBounds();
  popupWindow.setBounds(popupBounds); // and load the index.html of the app.

  popupWindow.loadURL(url__WEBPACK_IMPORTED_MODULE_1___default().format({
    pathname: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "popup.html"),
    protocol: "file:",
    slashes: true
  })); // Open the DevTools.
  // popupWindow.webContents.openDevTools();

  popupWindow.webContents.on('will-navigate', event => {
    event.preventDefault();
  });
  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('show-popup-window', (event, data) => {
    popupWindow.show();
    popupWindow.webContents.send('data', data);
  });
  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('hide-popup-window', event => {
    popupWindow.hide();
  });
  popupWindow.on('close', () => {
    positionstore.set('popup', popupWindow.getBounds());
  }); // popupWindow.on('resize', () => {
  //   positionstore.set('popup', popupWindow.getBounds())
  // })
};

electron__WEBPACK_IMPORTED_MODULE_2__.app.on("window-all-closed", () => {
  electron__WEBPACK_IMPORTED_MODULE_2__.app.quit();
});
electron__WEBPACK_IMPORTED_MODULE_2__.app.on("ready", () => {
  let lang = _config__WEBPACK_IMPORTED_MODULE_3__.config.deflang;
  (0,_i18n_menu_factory__WEBPACK_IMPORTED_MODULE_8__.MenuFactory)(lang);
});
electron__WEBPACK_IMPORTED_MODULE_2__.app.on('ready', createPopup);
electron__WEBPACK_IMPORTED_MODULE_2__.app.on('ready', createWindow);
electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('lang', (event, lang) => {
  console.log('_LANG', lang);
  (0,_i18n_menu_factory__WEBPACK_IMPORTED_MODULE_8__.MenuFactory)(lang);
});

const handleError = (title, error) => {
  console.log('_B HE title', title);
  console.log('_B HE ERR', error);
};

console.log('_TYPE ', process.type);

if (process.type === 'renderer') {
  const errorHandler = _.debounce(error => {
    handleError('Unhandled Error', error);
  }, 200);

  window.addEventListener('error', event => {
    event.preventDefault();
    errorHandler(event.error || event);
  });

  const rejectionHandler = _.debounce(reason => {
    handleError('Unhandled Promise Rejection', reason);
  }, 200);

  window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
    rejectionHandler(event.reason);
  });
} else {
  process.on('uncaughtException', error => {
    handleError('Unhandled Error', error);
  });
  process.on('unhandledRejection', error => {
    handleError('Unhandled Promise Rejection', error);
  });
}

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => /* binding */ config
/* harmony export */ });
//
const config = {
  host: 'http://diglossa.org',
  port: '5984',
  version: 'https://github.com/mbykov/diglossa.js/releases/latest',
  defstate: 'library',
  batch_size: 1000,
  pageSize: 25,
  splitSizes: [100, 0],
  langs: ['eng', 'deu', 'rus'],
  ldname: 'local',
  deflang: 'eng',
  extpath: './diglossa.export.fts'
};

/***/ }),

/***/ "./src/i18n/about_menu_template.js":
/*!*****************************************!*\
  !*** ./src/i18n/about_menu_template.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aboutMenuTemplate": () => /* binding */ aboutMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function aboutMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('about'),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('essence '),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'essence');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('about'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'about');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('acknowledgements'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'acknowledgements');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('code'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'code');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('contacts'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'contacts');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('license'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'license');
      }
    }]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/book_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/book_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookMenuTemplate": () => /* binding */ bookMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function bookMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("book"),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("library"),
      accelerator: "CmdOrCtrl+L",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'library');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("bookmarks"),
      // accelerator: "CmdOrCtrl+B",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'bookmarks');
      }
    }, {
      type: "separator"
    }, {
      label: "Import book",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('importBook');
      }
    }, {
      label: "Add parallel book",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('addParallelBook');
      }
    }, {
      label: "Generate FTS",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('generateFTS');
      }
    }, {
      type: "separator"
    }, // { label: "Book package preferences", click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'prefs') } },
    {
      label: "Export to .dgl package",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'preference');
      }
    }, // { type: "separator" },
    {
      label: "Compress package",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('compress');
      }
    }, {
      label: "Uncompress package",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('uncompress');
      }
    } // { label: "Publish", click: () => { BrowserWindow.getFocusedWindow().webContents.send('publishDGL') } },
    ]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/dict_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/dict_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dictMenuTemplate": () => /* binding */ dictMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function dictMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("dictionary"),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("dictionary list"),
      // accelerator: "CmdOrCtrl+D", ======= ли то, либо это
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'dictionary');
      }
    }, {
      type: "separator"
    }, {
      label: "Import StarDict .ifo",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('importDict');
      }
    }, {
      label: "Import DSL .ifo",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('importDict');
      }
    }, {
      type: "separator"
    }, {
      label: "Export  .dgl-dict",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('exportDGL-dict');
      }
    }]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/file_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/file_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileMenuTemplate": () => /* binding */ fileMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function fileMenuTemplate() {
  let menu = {
    label: "File",
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("home"),
      accelerator: "CmdOrCtrl+H",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'home');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("sign in"),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'signin');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("sign up"),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'signup');
      }
    }, {
      type: "separator"
    }, {
      type: "separator"
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Preferences"),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'prefsapp');
      }
    }, {
      type: "separator"
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Quit"),
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
      }
    }]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/help_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/help_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helpMenuTemplate": () => /* binding */ helpMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");



const os = __webpack_require__(/*! os */ "os");

let href;
function helpMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Help"),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Website"),
      click: () => {
        href = 'http://diglossa.org/diglossa.js';
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal(href);
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Source Code"),
      click: () => {
        href = 'https://github.com/mbykov/diglossa.js/';
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal(href);
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Report an Issue…"),
      click: () => {
        href = 'https://github.com/mbykov/diglossa.js/issues/new/';
        console.log('INFO', debugInfo());
        let body = debugInfo();
        href = [href, body].join('?body=');
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal(href);
      }
    }, {
      label: 'Show App Data',

      click() {
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openItem(electron__WEBPACK_IMPORTED_MODULE_0__.app.getPath('userData'));
      }

    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("hot keys"),
      accelerator: "CmdOrCtrl+H",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'help');
      }
    }, {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    }, {
      label: "Re-Read",
      accelerator: "Shift+CmdOrCtrl+R",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('action', 're-read-file');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Toggle devTools"),
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }]
  };
  return menu;
}

function debugInfo() {
  let debugInfo = `${electron__WEBPACK_IMPORTED_MODULE_0__.app.getName()} ${electron__WEBPACK_IMPORTED_MODULE_0__.app.getVersion()}
            ${process.platform} ${os.release()}
            Locale: ${electron__WEBPACK_IMPORTED_MODULE_0__.app.getLocale()}
            `.trim();
  return debugInfo;
}

/***/ }),

/***/ "./src/i18n/i18n.js":
/*!**************************!*\
  !*** ./src/i18n/i18n.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i18n": () => /* binding */ i18n
/* harmony export */ });


const path = __webpack_require__(/*! path */ "path");

const electron = __webpack_require__(/*! electron */ "electron");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const config = __webpack_require__(/*! ../config */ "./src/config.js");

const {
  ipcMain
} = __webpack_require__(/*! electron */ "electron");

const log = console.log;
let app = electron.app ? electron.app : electron.remote.app;
let apath = app.getAppPath();
let content = {};
let lang = config.deflang;
ipcMain.on('lang', (event, newlang) => {
  lang = newlang;
});
let loadedLanguage;
function i18n(phrase) {
  if (!content[lang]) {
    let langFile = lang + '.js';
    let localePath = path.resolve(apath, 'src/i18n', langFile);

    if (fse.pathExistsSync(localePath)) {
      loadedLanguage = fse.readJsonSync(localePath);
    } else {
      let enPath = path.resolve(apath, 'src/i18n/eng.js');
      loadedLanguage = fse.readJsonSync(enPath);
    }

    content[lang] = loadedLanguage;
  }

  let dcased = uncap(phrase);
  let caped = capitalize(content[lang][dcased]) || capitalize(phrase);
  return caped;
}

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const uncap = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toLowerCase() + s.slice(1);
};

/***/ }),

/***/ "./src/i18n/lang_deu_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_deu_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deuMenuTemplate": () => /* binding */ deuMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const deuMenuTemplate = {
  label: "DEU",
  submenu: [{
    label: "ENG",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng');
    }
  }, {
    label: "RUS",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus');
    }
  } // {
  //   label: "TIB",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
  //   }
  // },
  // {
  //   label: "ZHO",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
  //   }
  // }
  ]
};

/***/ }),

/***/ "./src/i18n/lang_eng_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_eng_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "engMenuTemplate": () => /* binding */ engMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const engMenuTemplate = {
  label: "ENG",
  submenu: [{
    label: "DEU",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu');
    }
  }, {
    label: "RUS",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus');
    }
  } // {
  //   label: "TIB",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
  //   }
  // },
  // {
  //   label: "ZHO",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
  //   }
  // }
  ]
};

/***/ }),

/***/ "./src/i18n/lang_rus_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_rus_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rusMenuTemplate": () => /* binding */ rusMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const rusMenuTemplate = {
  label: "RUS",
  submenu: [{
    label: "DEU",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu');
    }
  }, {
    label: "ENG",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng');
    }
  } // {
  //   label: "TIB",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
  //   }
  // },
  // {
  //   label: "ZHO",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
  //   }
  // }
  ]
};

/***/ }),

/***/ "./src/i18n/lang_zho_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_zho_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zhoMenuTemplate": () => /* binding */ zhoMenuTemplate
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const zhoMenuTemplate = {
  label: "ZHO",
  submenu: [{
    label: "ENG",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng');
    }
  }, {
    label: "DEU",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu');
    }
  }, {
    label: "RUS",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus');
    }
  }, {
    label: "TIB",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib');
    }
  }]
};

/***/ }),

/***/ "./src/i18n/menu-factory.js":
/*!**********************************!*\
  !*** ./src/i18n/menu-factory.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuFactory": () => /* binding */ MenuFactory
/* harmony export */ });
/* harmony import */ var _file_menu_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file_menu_template */ "./src/i18n/file_menu_template.js");
/* harmony import */ var _book_menu_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./book_menu_template */ "./src/i18n/book_menu_template.js");
/* harmony import */ var _dict_menu_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dict_menu_template */ "./src/i18n/dict_menu_template.js");
/* harmony import */ var _about_menu_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about_menu_template */ "./src/i18n/about_menu_template.js");
/* harmony import */ var _help_menu_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./help_menu_template */ "./src/i18n/help_menu_template.js");
/* harmony import */ var _lang_deu_menu_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lang_deu_menu_template */ "./src/i18n/lang_deu_menu_template.js");
/* harmony import */ var _lang_eng_menu_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lang_eng_menu_template */ "./src/i18n/lang_eng_menu_template.js");
/* harmony import */ var _lang_rus_menu_template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lang_rus_menu_template */ "./src/i18n/lang_rus_menu_template.js");
/* harmony import */ var _lang_zho_menu_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lang_zho_menu_template */ "./src/i18n/lang_zho_menu_template.js");
const Menu = __webpack_require__(/*! electron */ "electron").Menu; // import env from "env";


const log = console.log;



 // import { editMenuTemplate } from "./edit_menu_template";





 // const menu = null;
// const platform = process.platform;

function MenuFactory(lang) {
  const menus = [(0,_file_menu_template__WEBPACK_IMPORTED_MODULE_0__.fileMenuTemplate)(), (0,_book_menu_template__WEBPACK_IMPORTED_MODULE_1__.bookMenuTemplate)(), (0,_dict_menu_template__WEBPACK_IMPORTED_MODULE_2__.dictMenuTemplate)(), (0,_about_menu_template__WEBPACK_IMPORTED_MODULE_3__.aboutMenuTemplate)(), (0,_help_menu_template__WEBPACK_IMPORTED_MODULE_4__.helpMenuTemplate)()]; // if (env.name !== "production") {
  //   menus.push(devMenuTemplate);
  // }
  // menus.push(langMenuTemplate);

  switch (lang) {
    case 'eng':
      menus.push(_lang_eng_menu_template__WEBPACK_IMPORTED_MODULE_6__.engMenuTemplate);
      break;

    case 'deu':
      menus.push(_lang_deu_menu_template__WEBPACK_IMPORTED_MODULE_5__.deuMenuTemplate);
      break;

    case 'rus':
      menus.push(_lang_rus_menu_template__WEBPACK_IMPORTED_MODULE_7__.rusMenuTemplate);
      break;

    case 'zho':
      menus.push(_lang_zho_menu_template__WEBPACK_IMPORTED_MODULE_8__.zhoMenuTemplate);
      break;

    default:
      menus.push(_lang_eng_menu_template__WEBPACK_IMPORTED_MODULE_6__.engMenuTemplate);
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}

/***/ }),

/***/ "@babel/runtime/helpers/asyncIterator":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/asyncIterator" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/asyncIterator");;

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");;

/***/ }),

/***/ "@babel/runtime/helpers/interopRequireDefault":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/interopRequireDefault" ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");;

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/toConsumableArray");;

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/regenerator");;

/***/ }),

/***/ "book-md2json":
/*!*******************************!*\
  !*** external "book-md2json" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("book-md2json");;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");;

/***/ }),

/***/ "electron-store":
/*!*********************************!*\
  !*** external "electron-store" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("electron-store");;

/***/ }),

/***/ "epub":
/*!***********************!*\
  !*** external "epub" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("epub");;

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("fs-extra");;

/***/ }),

/***/ "iconv-lite":
/*!*****************************!*\
  !*** external "iconv-lite" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("iconv-lite");;

/***/ }),

/***/ "iso-639-3":
/*!****************************!*\
  !*** external "iso-639-3" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("iso-639-3");;

/***/ }),

/***/ "jsdom":
/*!************************!*\
  !*** external "jsdom" ***!
  \************************/
/***/ ((module) => {

module.exports = require("jsdom");;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");;

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "pdf-extraction":
/*!*********************************!*\
  !*** external "pdf-extraction" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("pdf-extraction");;

/***/ }),

/***/ "unzipper":
/*!***************************!*\
  !*** external "unzipper" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("unzipper");;

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");;

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");;

/***/ }),

/***/ "xml-js":
/*!*************************!*\
  !*** external "xml-js" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("xml-js");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/background.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=background.js.map