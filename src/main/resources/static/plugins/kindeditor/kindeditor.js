(function (undefined) {
    if (window.KindEditor !== undefined) {
        return;
    }
    var KE = {};
    KE.version = "3.5.5";
    KE.scriptPath = (function () {
        var elements = document.getElementsByTagName("script");
        for (var i = 0, len = elements.length; i < len; i++) {
            var src = elements[i].src;
            if (src && src.match(/kindeditor[\w\-\.]*\.js/)) {
                return src.substring(0, src.lastIndexOf("/") + 1);
            }
        }
        return "";
    })();
    KE.browser = (function () {
        var ua = navigator.userAgent.toLowerCase();
        return {
            VERSION: ua.match(/(msie|firefox|webkit|opera)[\/:\s](\d+)/) ? RegExp.$2 : "0",
            IE: (ua.indexOf("msie") > -1 && ua.indexOf("opera") == -1),
            GECKO: (ua.indexOf("gecko") > -1 && ua.indexOf("khtml") == -1),
            WEBKIT: (ua.indexOf("applewebkit") > -1),
            OPERA: (ua.indexOf("opera") > -1)
        };
    })();
    KE.setting = {
        wyswygMode: true,
        loadStyleMode: true,
        resizeMode: 1,
        filterMode: true,
        autoSetDataMode: false,
        shadowMode: true,
        useContextmenu: true,
        pasteHtml: false,
        urlType: "",
        skinType: "default",
        syncType: "form",
        newlineTag: "br",
        dialogAlignType: "page",
        cssPath: "",
        skinsPath: KE.scriptPath + "skins/",
        pluginsPath: KE.scriptPath + "plugins/",
        minWidth: 200,
        minHeight: 100,
        minChangeSize: 5,
        toolbarLineHeight: 24,
        statusbarHeight: 11,
        items: ["fontname", "fontsize", "textcolor", "bgcolor", "bold", "italic", "underline", "strikethrough", "subscript", "superscript", "title", "justifyleft", "justifycenter", "justifyright", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "-", "link", "unlink", "emoticons", "image", "flash", "media", "table", "hr", "undo", "redo", "cut", "copy", "paste", "plainpaste", "selectall", "removeformat", "source",],
        colorTable: [["#FFFFFF", "#E5E4E4", "#D9D8D8", "#C0BDBD", "#A7A4A4", "#8E8A8B", "#827E7F", "#767173", "#5C585A", "#000000"], ["#FEFCDF", "#FEF4C4", "#FEED9B", "#FEE573", "#FFED43", "#F6CC0B", "#E0B800", "#C9A601", "#AD8E00", "#8C7301"], ["#FFDED3", "#FFC4B0", "#FF9D7D", "#FF7A4E", "#FF6600", "#E95D00", "#D15502", "#BA4B01", "#A44201", "#8D3901"], ["#FFD2D0", "#FFBAB7", "#FE9A95", "#FF7A73", "#FF483F", "#FE2419", "#F10B00", "#D40A00", "#940000", "#6D201B"], ["#FFDAED", "#FFB7DC", "#FFA1D1", "#FF84C3", "#FF57AC", "#FD1289", "#EC0078", "#D6006D", "#BB005F", "#9B014F"], ["#FCD6FE", "#FBBCFF", "#F9A1FE", "#F784FE", "#F564FE", "#F546FF", "#F328FF", "#D801E5", "#C001CB", "#8F0197"], ["#E2F0FE", "#C7E2FE", "#ADD5FE", "#92C7FE", "#6EB5FF", "#48A2FF", "#2690FE", "#0162F4", "#013ADD", "#0021B0"], ["#D3FDFF", "#ACFAFD", "#7CFAFF", "#4AF7FE", "#1DE6FE", "#01DEFF", "#00CDEC", "#01B6DE", "#00A0C2", "#0084A0"], ["#EDFFCF", "#DFFEAA", "#D1FD88", "#BEFA5A", "#A8F32A", "#8FD80A", "#79C101", "#3FA701", "#307F00", "#156200"], ["#D4C89F", "#DAAD88", "#C49578", "#C2877E", "#AC8295", "#C0A5C4", "#969AC2", "#92B7D7", "#80ADAF", "#9CA53B"]],
        noEndTags: ["br", "hr", "img", "area", "col", "embed", "input", "param"],
        inlineTags: ["b", "del", "em", "font", "i", "span", "strike", "strong", "sub", "sup", "u"],
        endlineTags: ["br", "hr", "table", "tbody", "td", "tr", "th", "div", "p", "ol", "ul", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "script", "style", "marquee"],
        htmlTags: {
            font: ["color", "size", "face", ".background-color"],
            span: ["style"],
            div: ["class", "align", "style"],
            table: ["class", "border", "cellspacing", "cellpadding", "width", "height", "align", "style"],
            "td,th": ["class", "align", "valign", "width", "height", "colspan", "rowspan", "bgcolor", "style"],
            a: ["class", "href", "target", "name", "style", "data-url"],
            embed: ["src", "width", "height", "type", "loop", "autostart", "flashvars", "quality", "style", "align", "allowscriptaccess", "/"],
            img: ["src", "width", "height", "border", "alt", "title", "align", "style", "/"],
            hr: ["class", "/"],
            br: ["/"],
            label: ["style"],
            audio: ["src", "controls", "controlsList"],
            video: ["src", "controls", "width", "height", "controlsList"],
            iframe: ["src", "width", "height", "video", "allowfullscreen", "frameborder"],
            "p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6": ["align", "style"],
            "tbody,tr,strong,b,sub,sup,em,i,u,strike": []
        },
        mediaTypes: {
            rm: "audio/x-pn-realaudio-plugin",
            flash: "application/x-shockwave-flash",
            media: "video/x-ms-asf-plugin"
        },
        UploadPathType: 1,
        DesignPage: 0,
        afterTab: function (id) {
            KE.util.setSelection(id);
            KE.util.insertHtml(id, "&nbsp;&nbsp;&nbsp;&nbsp;");
        }
    };
    KE.g = {};
    KE.plugin = {};
    KE.$ = function (id, doc) {
        var doc = doc || document;
        return doc.getElementById(id);
    };
    KE.$$ = function (name, doc) {
        var doc = doc || document;
        return doc.createElement(name);
    };
    KE.event = {
        add: function (el, type, fn, id) {
            if (el.addEventListener) {
                el.addEventListener(type, fn, false);
            } else {
                if (el.attachEvent) {
                    el.attachEvent("on" + type, fn);
                }
            }
            if (id !== undefined) {
                KE.g[id].eventStack.push({el: el, type: type, fn: fn});
            }
        }, remove: function (el, type, fn, id) {
            if (el.removeEventListener) {
                el.removeEventListener(type, fn, false);
            } else {
                if (el.detachEvent) {
                    el.detachEvent("on" + type, fn);
                }
            }
            if (id !== undefined) {
                var stack = KE.g[id].eventStack;
                for (var i = 0, len = stack.length; i < len; i++) {
                    var item = stack[i];
                    if (item && el === item.el && type === item.type && fn === item.fn) {
                        delete stack[i];
                    }
                }
            }
        }, stopPropagation: function (e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.cancelBubble !== undefined) {
                e.cancelBubble = true;
            }
        }, preventDefault: function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.returnValue !== undefined) {
                e.returnValue = false;
            }
        }, stop: function (e) {
            this.stopPropagation(e);
            this.preventDefault(e);
        }, bind: function (el, type, fn, id) {
            this.add(el, type, function (e) {
                fn(e);
                KE.event.stop(e);
                return false;
            }, id);
        }, input: function (el, func, id) {
            this.add(el, "keyup", function (e) {
                if (!e.ctrlKey && !e.altKey && (e.keyCode < 16 || e.keyCode > 18) && e.keyCode != 116) {
                    func(e);
                    KE.event.stop(e);
                    return false;
                }
            }, id);

            function handler(e) {
                window.setTimeout(function () {
                    func(e);
                }, 1);
            }

            var newElement = (el.nodeName == "#document") ? el.body : el;
            this.add(newElement, "paste", handler, id);
            this.add(newElement, "cut", handler, id);
        }, ctrl: function (el, key, func, id) {
            key = key.toString().match(/^\d{2,}$/) ? key : key.toUpperCase().charCodeAt(0);
            this.add(el, "keydown", function (e) {
                if (e.ctrlKey && e.keyCode == key && !e.shiftKey && !e.altKey) {
                    func(e);
                    KE.event.stop(e);
                    return false;
                }
            }, id);
        }, ready: function (func, win, doc, id) {
            var win = win || window;
            var doc = doc || document;
            var loaded = false;
            var readyFunc = function () {
                if (loaded) {
                    return;
                }
                loaded = true;
                func();
            };
            if (doc.addEventListener) {
                this.add(doc, "DOMContentLoaded", readyFunc, id);
            } else {
                if (doc.attachEvent) {
                    this.add(doc, "readystatechange", function () {
                        if (doc.readyState == "complete") {
                            readyFunc();
                        }
                    }, id);
                    if (doc.documentElement.doScroll && typeof win.frameElement === "undefined") {
                        var ieReadyFunc = function () {
                            if (loaded) {
                                return;
                            }
                            try {
                                doc.documentElement.doScroll("left");
                            } catch (e) {
                                window.setTimeout(ieReadyFunc, 0);
                                return;
                            }
                            readyFunc();
                        };
                        ieReadyFunc();
                    }
                }
            }
            this.add(win, "load", readyFunc, id);
        }
    };
    KE.each = function (obj, func) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                func(key, obj[key]);
            }
        }
    };
    KE.eachNode = function (node, func) {
        var walkNodes = function (parent) {
            if (KE.util.getNodeType(parent) != 1) {
                return true;
            }
            var n = parent.firstChild;
            while (n) {
                var next = n.nextSibling;
                if (!func(n)) {
                    return false;
                }
                if (!walkNodes(n)) {
                    return false;
                }
                n = next;
            }
            return true;
        };
        walkNodes(node);
    };
    KE.selection = function (doc) {
        this.sel = null;
        this.range = null;
        this.keRange = null;
        this.isControl = false;
        var win = doc.parentWindow || doc.defaultView;
        this.init = function () {
            var sel = null;
            if (doc.selection) {
                sel = doc.selection;
            } else {
                if (win) {
                    sel = win.getSelection();
                }
            }
            var range;
            try {
                if (sel.rangeCount > 0) {
                    range = sel.getRangeAt(0);
                } else {
                    range = sel.createRange();
                }
            } catch (e) {
            }
            if (!range) {
                range = KE.util.createRange(doc);
            }
            this.sel = sel;
            this.range = range;
            var startNode, startPos, endNode, endPos;
            if (KE.browser.IE) {
                if (range.item) {
                    this.isControl = true;
                    var el = range.item(0);
                    startNode = endNode = el;
                    startPos = endPos = 0;
                } else {
                    this.isControl = false;
                    var getStartEnd = function (isStart) {
                        var pointRange = range.duplicate();
                        pointRange.collapse(isStart);
                        var parentNode = pointRange.parentElement();
                        var nodes = parentNode.childNodes;
                        if (nodes.length == 0) {
                            return {node: parentNode, pos: 0};
                        }
                        var startNode;
                        var endElement;
                        var startPos = 0;
                        var isEnd = false;
                        var testRange = range.duplicate();
                        KE.util.moveToElementText(testRange, parentNode);
                        for (var i = 0, len = nodes.length; i < len; i++) {
                            var node = nodes[i];
                            var cmp = testRange.compareEndPoints("StartToStart", pointRange);
                            if (cmp > 0) {
                                isEnd = true;
                            } else {
                                if (cmp == 0) {
                                    if (node.nodeType == 1) {
                                        var keRange = new KE.range(doc);
                                        keRange.selectTextNode(node);
                                        return {node: keRange.startNode, pos: 0};
                                    } else {
                                        return {node: node, pos: 0};
                                    }
                                }
                            }
                            if (node.nodeType == 1) {
                                var nodeRange = range.duplicate();
                                KE.util.moveToElementText(nodeRange, node);
                                testRange.setEndPoint("StartToEnd", nodeRange);
                                if (isEnd) {
                                    startPos += nodeRange.text.replace(/\r\n|\n|\r/g, "").length;
                                } else {
                                    startPos = 0;
                                }
                            } else {
                                if (node.nodeType == 3) {
                                    if (typeof node.nodeValue === "string") {
                                        testRange.moveStart("character", node.nodeValue.length);
                                        startPos += node.nodeValue.length;
                                    }
                                }
                            }
                            if (!isEnd) {
                                startNode = node;
                            }
                        }
                        if (!isEnd && startNode.nodeType == 1) {
                            var startNode = parentNode.lastChild;
                            return {node: startNode, pos: startNode.nodeType == 1 ? 1 : startNode.nodeValue.length};
                        }
                        testRange = range.duplicate();
                        KE.util.moveToElementText(testRange, parentNode);
                        testRange.setEndPoint("StartToEnd", pointRange);
                        startPos -= testRange.text.replace(/\r\n|\n|\r/g, "").length;
                        return {node: startNode, pos: startPos};
                    };
                    var start = getStartEnd(true);
                    var end = getStartEnd(false);
                    startNode = start.node;
                    startPos = start.pos;
                    endNode = end.node;
                    endPos = end.pos;
                }
            } else {
                startNode = range.startContainer;
                startPos = range.startOffset;
                endNode = range.endContainer;
                endPos = range.endOffset;
                if (startNode.nodeType == 1 && typeof startNode.childNodes[startPos] != "undefined") {
                    startNode = startNode.childNodes[startPos];
                    startPos = 0;
                }
                if (endNode.nodeType == 1) {
                    endPos = endPos == 0 ? 1 : endPos;
                    if (typeof endNode.childNodes[endPos - 1] != "undefined") {
                        endNode = endNode.childNodes[endPos - 1];
                        endPos = (endNode.nodeType == 1) ? 0 : endNode.nodeValue.length;
                    }
                }
                this.isControl = (startNode.nodeType == 1 && startNode === endNode && range.startOffset + 1 == range.endOffset);
                if (startNode.nodeType == 1 && endNode.nodeType == 3 && endPos == 0 && endNode.previousSibling) {
                    var node = endNode.previousSibling;
                    while (node) {
                        if (node === startNode) {
                            endNode = startNode;
                            break;
                        }
                        if (node.childNodes.length != 1) {
                            break;
                        }
                        node = node.childNodes[0];
                    }
                }
                if (range.collapsed) {
                    var keRange = new KE.range(doc);
                    keRange.setTextStart(startNode, startPos);
                    endNode = keRange.startNode;
                    endPos = keRange.startPos;
                }
            }
            var keRange = new KE.range(doc);
            keRange.setTextStart(startNode, startPos);
            keRange.setTextEnd(endNode, endPos);
            this.keRange = keRange;
        };
        this.init();
        this.addRange = function (keRange) {
            if (KE.browser.GECKO && KE.browser.VERSION < 3) {
                return;
            }
            this.keRange = keRange;
            if (KE.browser.IE) {
                var getEndRange = function (isStart) {
                    var range = KE.util.createRange(doc);
                    var node = isStart ? keRange.startNode : keRange.endNode;
                    if (node.nodeType == 1) {
                        KE.util.moveToElementText(range, node);
                        range.collapse(isStart);
                    } else {
                        if (node.nodeType == 3) {
                            range = KE.util.getNodeStartRange(doc, node);
                            var pos = isStart ? keRange.startPos : keRange.endPos;
                            range.moveStart("character", pos);
                        }
                    }
                    return range;
                };
                if (!this.range.item) {
                    var node = keRange.startNode;
                    if (node == keRange.endNode && KE.util.getNodeType(node) == 1 && KE.util.getNodeTextLength(node) == 0) {
                        var temp = doc.createTextNode(" ");
                        node.appendChild(temp);
                        KE.util.moveToElementText(this.range, node);
                        this.range.collapse(false);
                        this.range.select();
                        node.removeChild(temp);
                    } else {
                        if (node.nodeType == 3 && keRange.collapsed()) {
                            this.range = getEndRange(true);
                            this.range.collapse(true);
                        } else {
                            this.range.setEndPoint("StartToStart", getEndRange(true));
                            this.range.setEndPoint("EndToStart", getEndRange(false));
                        }
                        this.range.select();
                    }
                }
            } else {
                var getNodePos = function (node) {
                    var pos = 0;
                    while (node) {
                        node = node.previousSibling;
                        pos++;
                    }
                    return --pos;
                };
                var range = new KE.range(doc);
                range.setTextStart(keRange.startNode, keRange.startPos);
                range.setTextEnd(keRange.endNode, keRange.endPos);
                var startNode = range.startNode;
                var endNode = range.endNode;
                if (KE.util.getNodeType(startNode) == 88) {
                    this.range.setStart(startNode.parentNode, getNodePos(range.startNode));
                } else {
                    this.range.setStart(startNode, range.startPos);
                }
                if (KE.util.getNodeType(endNode) == 88) {
                    this.range.setEnd(endNode.parentNode, getNodePos(range.endNode) + 1);
                } else {
                    this.range.setEnd(endNode, range.endPos);
                }
                this.sel.removeAllRanges();
                this.sel.addRange(this.range);
            }
        };
        this.focus = function () {
            if (KE.browser.IE && this.range != null) {
                this.range.select();
            }
        };
    };
    KE.range = function (doc) {
        this.startNode = null;
        this.startPos = null;
        this.endNode = null;
        this.endPos = null;
        this.getParentElement = function () {
            var scanParent = function (node, func) {
                while (node && (!node.tagName || node.tagName.toLowerCase() != "body")) {
                    node = node.parentNode;
                    if (func(node)) {
                        return;
                    }
                }
            };
            var nodeList = [];
            scanParent(this.startNode, function (node) {
                nodeList.push(node);
            });
            var parentNode;
            scanParent(this.endNode, function (node) {
                if (KE.util.inArray(node, nodeList)) {
                    parentNode = node;
                    return true;
                }
            });
            return parentNode ? parentNode : doc.body;
        };
        this.getNodeList = function () {
            var self = this;
            var parentNode = this.getParentElement();
            var nodeList = [];
            var isStarted = false;
            if (parentNode == self.startNode) {
                isStarted = true;
            }
            if (isStarted) {
                nodeList.push(parentNode);
            }
            KE.eachNode(parentNode, function (node) {
                if (node == self.startNode) {
                    isStarted = true;
                }
                var range = new KE.range(doc);
                range.selectTextNode(node);
                var cmp = range.comparePoints("START_TO_END", self);
                if (cmp > 0) {
                    return false;
                } else {
                    if (cmp == 0) {
                        if (range.startNode !== range.endNode || range.startPos !== range.endPos) {
                            return false;
                        }
                    }
                }
                if (isStarted) {
                    nodeList.push(node);
                }
                return true;
            });
            return nodeList;
        };
        this.comparePoints = function (how, range) {
            var compareNodes = function (nodeA, posA, nodeB, posB) {
                var cmp;
                if (KE.browser.IE) {
                    var getStartRange = function (node, pos, isStart) {
                        var range = KE.util.createRange(doc);
                        var type = KE.util.getNodeType(node);
                        if (type == 1) {
                            KE.util.moveToElementText(range, node);
                            range.collapse(isStart);
                        } else {
                            if (type == 3) {
                                range = KE.util.getNodeStartRange(doc, node);
                                range.moveStart("character", pos);
                                range.collapse(true);
                            }
                        }
                        return range;
                    };
                    var rangeA, rangeB;
                    if (how == "START_TO_START" || how == "START_TO_END") {
                        rangeA = getStartRange(nodeA, posA, true);
                    } else {
                        rangeA = getStartRange(nodeA, posA, false);
                    }
                    if (how == "START_TO_START" || how == "END_TO_START") {
                        rangeB = getStartRange(nodeB, posB, true);
                    } else {
                        rangeB = getStartRange(nodeB, posB, false);
                    }
                    return rangeA.compareEndPoints("StartToStart", rangeB);
                } else {
                    var rangeA = KE.util.createRange(doc);
                    rangeA.selectNode(nodeA);
                    if (how == "START_TO_START" || how == "START_TO_END") {
                        rangeA.collapse(true);
                    } else {
                        rangeA.collapse(false);
                    }
                    var rangeB = KE.util.createRange(doc);
                    rangeB.selectNode(nodeB);
                    if (how == "START_TO_START" || how == "END_TO_START") {
                        rangeB.collapse(true);
                    } else {
                        rangeB.collapse(false);
                    }
                    if (rangeA.compareBoundaryPoints(Range.START_TO_START, rangeB) > 0) {
                        cmp = 1;
                    } else {
                        if (rangeA.compareBoundaryPoints(Range.START_TO_START, rangeB) == 0) {
                            if (posA > posB) {
                                cmp = 1;
                            } else {
                                if (posA == posB) {
                                    cmp = 0;
                                } else {
                                    cmp = -1;
                                }
                            }
                        } else {
                            cmp = -1;
                        }
                    }
                }
                return cmp;
            };
            if (how == "START_TO_START") {
                return compareNodes(this.startNode, this.startPos, range.startNode, range.startPos);
            }
            if (how == "START_TO_END") {
                return compareNodes(this.startNode, this.startPos, range.endNode, range.endPos);
            }
            if (how == "END_TO_START") {
                return compareNodes(this.endNode, this.endPos, range.startNode, range.startPos);
            }
            if (how == "END_TO_END") {
                return compareNodes(this.endNode, this.endPos, range.endNode, range.endPos);
            }
        };
        this.collapsed = function () {
            return (this.startNode === this.endNode && this.startPos === this.endPos);
        };
        this.collapse = function (toStart) {
            if (toStart) {
                this.setEnd(this.startNode, this.startPos);
            } else {
                this.setStart(this.endNode, this.endPos);
            }
        };
        this.setTextStart = function (node, pos) {
            var textNode = node;
            KE.eachNode(node, function (n) {
                if (KE.util.getNodeType(n) == 3 && n.nodeValue.length > 0 || KE.util.getNodeType(n) == 88) {
                    textNode = n;
                    pos = 0;
                    return false;
                }
                return true;
            });
            this.setStart(textNode, pos);
        };
        this.setStart = function (node, pos) {
            this.startNode = node;
            this.startPos = pos;
            if (this.endNode === null) {
                this.endNode = node;
                this.endPos = pos;
            }
        };
        this.setTextEnd = function (node, pos) {
            var textNode = node;
            KE.eachNode(node, function (n) {
                if (KE.util.getNodeType(n) == 3 && n.nodeValue.length > 0 || KE.util.getNodeType(n) == 88) {
                    textNode = n;
                    pos = KE.util.getNodeType(n) == 3 ? n.nodeValue.length : 0;
                }
                return true;
            });
            this.setEnd(textNode, pos);
        };
        this.setEnd = function (node, pos) {
            this.endNode = node;
            this.endPos = pos;
            if (this.startNode === null) {
                this.startNode = node;
                this.startPos = pos;
            }
        };
        this.selectNode = function (node) {
            this.setStart(node, 0);
            this.setEnd(node, node.nodeType == 1 ? 0 : node.nodeValue.length);
        };
        this.selectTextNode = function (node) {
            this.setTextStart(node, 0);
            this.setTextEnd(node, node.nodeType == 1 ? 0 : node.nodeValue.length);
        };
        this.extractContents = function (isDelete) {
            isDelete = (isDelete === undefined) ? true : isDelete;
            var thisRange = this;
            var startNode = this.startNode;
            var startPos = this.startPos;
            var endNode = this.endNode;
            var endPos = this.endPos;
            var removedNodes = [];

            function extractTextNode(node, startPos, endPos) {
                var length = node.nodeValue.length;
                var cloneNode = node.cloneNode(true);
                var centerNode = cloneNode.splitText(startPos);
                centerNode.splitText(endPos - startPos);
                if (isDelete) {
                    var center = node;
                    if (startPos > 0) {
                        center = node.splitText(startPos);
                    }
                    if (endPos < length) {
                        center.splitText(endPos - startPos);
                    }
                    removedNodes.push(center);
                }
                return centerNode;
            }

            var noEndTagHash = KE.util.arrayToHash(KE.setting.noEndTags);
            var isStarted = false;
            var isEnd = false;

            function extractNodes(parent, frag) {
                if (KE.util.getNodeType(parent) != 1) {
                    return true;
                }
                var node = parent.firstChild;
                while (node) {
                    if (node == startNode) {
                        isStarted = true;
                    }
                    if (node == endNode) {
                        isEnd = true;
                    }
                    var nextNode = node.nextSibling;
                    var type = node.nodeType;
                    if (type == 1) {
                        var range = new KE.range(doc);
                        range.selectNode(node);
                        var cmp = range.comparePoints("END_TO_END", thisRange);
                        if (isStarted && (cmp < 0 || (cmp == 0 && noEndTagHash[node.nodeName.toLowerCase()] !== undefined))) {
                            var cloneNode = node.cloneNode(true);
                            frag.appendChild(cloneNode);
                            if (isDelete) {
                                node.parentNode.removeChild(node);
                            }
                        } else {
                            var childFlag = node.cloneNode(false);
                            if (noEndTagHash[childFlag.nodeName.toLowerCase()] === undefined) {
                                frag.appendChild(childFlag);
                                if (!extractNodes(node, childFlag)) {
                                    return false;
                                }
                            }
                        }
                    } else {
                        if (type == 3) {
                            if (isStarted) {
                                var textNode;
                                if (node == startNode && node == endNode) {
                                    textNode = extractTextNode(node, startPos, endPos);
                                    frag.appendChild(textNode);
                                    return false;
                                } else {
                                    if (node == startNode) {
                                        textNode = extractTextNode(node, startPos, node.nodeValue.length);
                                        frag.appendChild(textNode);
                                    } else {
                                        if (node == endNode) {
                                            textNode = extractTextNode(node, 0, endPos);
                                            frag.appendChild(textNode);
                                            return false;
                                        } else {
                                            textNode = extractTextNode(node, 0, node.nodeValue.length);
                                            frag.appendChild(textNode);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    node = nextNode;
                    if (isEnd) {
                        return false;
                    }
                }
                if (frag.innerHTML.replace(/<.*?>/g, "") === "" && frag.parentNode) {
                    frag.parentNode.removeChild(frag);
                }
                return true;
            }

            var parentNode = this.getParentElement();
            var docFrag = parentNode.cloneNode(false);
            extractNodes(parentNode, docFrag);
            KE.each(removedNodes, function (key, val) {
                if (val.nodeType != 3 || val.nodeValue.length > 0) {
                    val.parentNode.removeChild(val);
                }
            });
            return docFrag;
        };
        this.cloneContents = function () {
            return this.extractContents(false);
        };
        this.getText = function () {
            var html = this.cloneContents().innerHTML;
            return html.replace(/<.*?>/g, "");
        };
    };
    KE.cmd = function (id) {
        this.doc = KE.g[id].iframeDoc;
        this.keSel = KE.g[id].keSel;
        this.keRange = KE.g[id].keRange;
        this.mergeAttributes = function (el, attr) {
            for (var i = 0, len = attr.length; i < len; i++) {
                KE.each(attr[i], function (key, value) {
                    if (key.charAt(0) == ".") {
                        var jsKey = KE.util.getJsKey(key.substr(1));
                        el.style[jsKey] = value;
                    } else {
                        if (KE.browser.IE && KE.browser.VERSION < 8 && key == "class") {
                            key = "className";
                        }
                        el.setAttribute(key, value);
                    }
                });
            }
            return el;
        };
        this.wrapTextNode = function (node, startPos, endPos, element, attributes) {
            var length = node.nodeValue.length;
            var isFull = (startPos == 0 && endPos == length);
            var range = new KE.range(this.doc);
            range.selectTextNode(node.parentNode);
            if (isFull && node.parentNode.tagName == element.tagName && range.comparePoints("END_TO_END", this.keRange) <= 0 && range.comparePoints("START_TO_START", this.keRange) >= 0) {
                this.mergeAttributes(node.parentNode, attributes);
                return node;
            } else {
                var el = element.cloneNode(true);
                if (isFull) {
                    var cloneNode = node.cloneNode(true);
                    el.appendChild(cloneNode);
                    node.parentNode.replaceChild(el, node);
                    return cloneNode;
                } else {
                    var centerNode = node;
                    if (startPos < endPos) {
                        if (startPos > 0) {
                            centerNode = node.splitText(startPos);
                        }
                        if (endPos < length) {
                            centerNode.splitText(endPos - startPos);
                        }
                        var cloneNode = centerNode.cloneNode(true);
                        el.appendChild(cloneNode);
                        centerNode.parentNode.replaceChild(el, centerNode);
                        return cloneNode;
                    } else {
                        if (startPos < length) {
                            centerNode = node.splitText(startPos);
                            centerNode.parentNode.insertBefore(el, centerNode);
                        } else {
                            if (centerNode.nextSibling) {
                                centerNode.parentNode.insertBefore(el, centerNode.nextSibling);
                            } else {
                                centerNode.parentNode.appendChild(el);
                            }
                        }
                        return el;
                    }
                }
            }
        };
        this.wrap = function (tagName, attributes) {
            attributes = attributes || [];
            var self = this;
            this.keSel.focus();
            var element = KE.$$(tagName, this.doc);
            this.mergeAttributes(element, attributes);
            var keRange = this.keRange;
            var startNode = keRange.startNode;
            var startPos = keRange.startPos;
            var endNode = keRange.endNode;
            var endPos = keRange.endPos;
            var parentNode = keRange.getParentElement();
            if (KE.util.inMarquee(parentNode)) {
                return;
            }
            var isStarted = false;
            KE.eachNode(parentNode, function (node) {
                if (node == startNode) {
                    isStarted = true;
                }
                if (node.nodeType == 1) {
                    if (node == startNode && node == endNode) {
                        if (KE.util.inArray(node.tagName.toLowerCase(), KE.g[id].noEndTags)) {
                            if (startPos > 0) {
                                node.parentNode.appendChild(element);
                            } else {
                                node.parentNode.insertBefore(element, node);
                            }
                        } else {
                            node.appendChild(element);
                        }
                        keRange.selectNode(element);
                        return false;
                    } else {
                        if (node == startNode) {
                            keRange.setStart(node, 0);
                        } else {
                            if (node == endNode) {
                                keRange.setEnd(node, 0);
                                return false;
                            }
                        }
                    }
                } else {
                    if (node.nodeType == 3) {
                        if (isStarted) {
                            if (node == startNode && node == endNode) {
                                var rangeNode = self.wrapTextNode(node, startPos, endPos, element, attributes);
                                keRange.selectNode(rangeNode);
                                return false;
                            } else {
                                if (node == startNode) {
                                    var rangeNode = self.wrapTextNode(node, startPos, node.nodeValue.length, element, attributes);
                                    keRange.setStart(rangeNode, 0);
                                } else {
                                    if (node == endNode) {
                                        var rangeNode = self.wrapTextNode(node, 0, endPos, element, attributes);
                                        keRange.setEnd(rangeNode, rangeNode.nodeType == 1 ? 0 : rangeNode.nodeValue.length);
                                        return false;
                                    } else {
                                        self.wrapTextNode(node, 0, node.nodeValue.length, element, attributes);
                                    }
                                }
                            }
                        }
                    }
                }
                return true;
            });
            this.keSel.addRange(keRange);
        };
        this.getTopParent = function (tagNames, node) {
            var parent = null;
            while (node) {
                node = node.parentNode;
                if (KE.util.inArray(node.tagName.toLowerCase(), tagNames)) {
                    parent = node;
                } else {
                    break;
                }
            }
            return parent;
        };
        this.splitNodeParent = function (parent, node, pos) {
            var leftRange = new KE.range(this.doc);
            leftRange.selectNode(parent.firstChild);
            leftRange.setEnd(node, pos);
            var leftFrag = leftRange.extractContents();
            parent.parentNode.insertBefore(leftFrag, parent);
            return {left: leftFrag, right: parent};
        };
        this.remove = function (tags) {
            var self = this;
            var keRange = this.keRange;
            var startNode = keRange.startNode;
            var startPos = keRange.startPos;
            var endNode = keRange.endNode;
            var endPos = keRange.endPos;
            this.keSel.focus();
            if (KE.util.inMarquee(keRange.getParentElement())) {
                return;
            }
            var isCollapsed = (keRange.getText().replace(/\s+/g, "") === "");
            if (isCollapsed && !KE.browser.IE) {
                return;
            }
            var tagNames = [];
            KE.each(tags, function (key, val) {
                if (key != "*") {
                    tagNames.push(key);
                }
            });
            var startParent = this.getTopParent(tagNames, startNode);
            var endParent = this.getTopParent(tagNames, endNode);
            if (startParent) {
                var startFrags = this.splitNodeParent(startParent, startNode, startPos);
                keRange.setStart(startFrags.right, 0);
                if (startNode == endNode && KE.util.getNodeTextLength(startFrags.right) > 0) {
                    keRange.selectNode(startFrags.right);
                    var range = new KE.range(this.doc);
                    range.selectTextNode(startFrags.left);
                    if (startPos > 0) {
                        endPos -= range.endNode.nodeValue.length;
                    }
                    range.selectTextNode(startFrags.right);
                    endNode = range.startNode;
                }
            }
            if (isCollapsed) {
                var node = keRange.startNode;
                if (node.nodeType == 1) {
                    if (node.nodeName.toLowerCase() == "br") {
                        return;
                    }
                    keRange.selectNode(node);
                } else {
                    return;
                }
            } else {
                if (endParent) {
                    var endFrags = this.splitNodeParent(endParent, endNode, endPos);
                    keRange.setEnd(endFrags.left, 0);
                    if (startParent == endParent) {
                        keRange.setStart(endFrags.left, 0);
                    }
                }
            }
            var removeAttr = function (node, attr) {
                if (attr.charAt(0) == ".") {
                    var jsKey = KE.util.getJsKey(attr.substr(1));
                    node.style[jsKey] = "";
                } else {
                    if (KE.browser.IE && KE.browser.VERSION < 8 && attr == "class") {
                        attr = "className";
                    }
                    node.removeAttribute(attr);
                }
            };
            var nodeList = keRange.getNodeList();
            keRange.setTextStart(keRange.startNode, keRange.startPos);
            keRange.setTextEnd(keRange.endNode, keRange.endPos);
            for (var i = 0, length = nodeList.length; i < length; i++) {
                var node = nodeList[i];
                if (node.nodeType == 1) {
                    var tagName = node.tagName.toLowerCase();
                    if (tags[tagName]) {
                        var attr = tags[tagName];
                        for (var j = 0, len = attr.length; j < len; j++) {
                            if (attr[j] == "*") {
                                KE.util.removeParent(node);
                                break;
                            } else {
                                removeAttr(node, attr[j]);
                                var attrs = [];
                                if (node.outerHTML) {
                                    attrHash = KE.util.getAttrList(node.outerHTML);
                                    KE.each(attrHash, function (key, val) {
                                        attrs.push({name: key, value: val});
                                    });
                                } else {
                                    attrs = node.attributes;
                                }
                                if (attrs.length == 0) {
                                    KE.util.removeParent(node);
                                    break;
                                } else {
                                    if (attrs[0].name == "style" && attrs[0].value === "") {
                                        KE.util.removeParent(node);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (tags["*"]) {
                        var attr = tags["*"];
                        for (var j = 0, len = attr.length; j < len; j++) {
                            removeAttr(node, attr[j]);
                        }
                    }
                }
            }
            try {
                this.keSel.addRange(keRange);
            } catch (e) {
            }
        };
    };
    KE.format = {
        getUrl: function (url, mode, host, pathname) {
            if (!mode) {
                return url;
            }
            mode = mode.toLowerCase();
            if (!KE.util.inArray(mode, ["absolute", "relative", "domain"])) {
                return url;
            }
            host = host || location.protocol + "//" + location.host;
            if (pathname === undefined) {
                var m = location.pathname.match(/^(\/.*)\//);
                pathname = m ? m[1] : "";
            }
            var matches = url.match(/^(\w+:\/\/[^\/]*)/);
            if (matches) {
                if (matches[1] !== host) {
                    return url;
                }
            } else {
                if (url.match(/^\w+:/)) {
                    return url;
                }
            }
            var getRealPath = function (path) {
                var parts = path.split("/");
                paths = [];
                for (var i = 0, len = parts.length; i < len; i++) {
                    var part = parts[i];
                    if (part == "..") {
                        if (paths.length > 0) {
                            paths.pop();
                        }
                    } else {
                        if (part !== "" && part != ".") {
                            paths.push(part);
                        }
                    }
                }
                return "/" + paths.join("/");
            };
            if (url.match(/^\//)) {
                url = host + getRealPath(url.substr(1));
            } else {
                if (!url.match(/^\w+:\/\//)) {
                    url = host + getRealPath(pathname + "/" + url);
                }
            }
            if (mode == "relative") {
                var getRelativePath = function (path, depth) {
                    if (url.substr(0, path.length) === path) {
                        var arr = [];
                        for (var i = 0; i < depth; i++) {
                            arr.push("..");
                        }
                        var prefix = ".";
                        if (arr.length > 0) {
                            prefix += "/" + arr.join("/");
                        }
                        if (pathname == "/") {
                            prefix += "/";
                        }
                        return prefix + url.substr(path.length);
                    } else {
                        var m = path.match(/^(.*)\//);
                        if (m) {
                            return getRelativePath(m[1], ++depth);
                        }
                    }
                };
                url = getRelativePath(host + pathname, 0).substr(2);
            } else {
                if (mode == "absolute") {
                    if (url.substr(0, host.length) === host) {
                        url = url.substr(host.length);
                    }
                }
            }
            return url;
        }, getHtml: function (html, htmlTags, urlType) {
            var isFilter = htmlTags ? true : false;
            html = html.replace(/(<pre[^>]*>)([\s\S]*?)(<\/pre>)/ig, function ($0, $1, $2, $3) {
                return $1 + $2.replace(/<br[^>]*>/ig, "\n") + $3;
            });
            var htmlTagHash = {};
            var fontSizeHash = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
            if (isFilter) {
                KE.each(htmlTags, function (key, val) {
                    var arr = key.split(",");
                    for (var i = 0, len = arr.length; i < len; i++) {
                        htmlTagHash[arr[i]] = KE.util.arrayToHash(val);
                    }
                });
            }
            var skipFlag = false;
            var noEndTagHash = KE.util.arrayToHash(KE.setting.noEndTags);
            var inlineTagHash = KE.util.arrayToHash(KE.setting.inlineTags);
            var endlineTagHash = KE.util.arrayToHash(KE.setting.endlineTags);
            var re = /((?:\r\n|\n|\r)*)<(\/)?([\w\-:]+)((?:\s+|(?:\s+[\w\-:]+)|(?:\s+[\w\-:]+=[^\s"'<>]+)|(?:\s+[\w\-:]+="[^"]*")|(?:\s+[\w\-:]+='[^']*'))*)(\/)?>((?:\r\n|\n|\r)*)/g;
            html = html.replace(re, function ($0, $1, $2, $3, $4, $5, $6) {
                var startNewline = $1 || "";
                var startSlash = $2 || "";
                var tagName = $3.toLowerCase();
                var attr = $4 || "";
                var endSlash = $5 ? " " + $5 : "";
                var endNewline = $6 || "";
                if (tagName === "script" && startSlash !== "") {
                    skipFlag = false;
                }
                if (skipFlag) {
                    return $0;
                }
                if (tagName === "script" && startSlash === "") {
                    skipFlag = true;
                }
                if (isFilter && typeof htmlTagHash[tagName] == "undefined") {
                    return "";
                }
                if (endSlash === "" && typeof noEndTagHash[tagName] != "undefined") {
                    endSlash = " /";
                }
                if (tagName in endlineTagHash) {
                    if (startSlash || endSlash) {
                        endNewline = "\n";
                    }
                } else {
                    if (endNewline) {
                        endNewline = " ";
                    }
                }
                if (tagName !== "script" && tagName !== "style") {
                    startNewline = "";
                }
                if (tagName === "font") {
                    var style = {}, styleStr = "";
                    attr = attr.replace(/\s*([\w\-:]+)=([^\s"'<>]+|"[^"]*"|'[^']*')/g, function ($0, $1, $2) {
                        var key = $1.toLowerCase();
                        var val = $2 || "";
                        val = val.replace(/^["']|["']$/g, "");
                        if (key === "color") {
                            style.color = val;
                            return " ";
                        }
                        if (key === "size") {
                            style["font-size"] = fontSizeHash[parseInt(val) - 1] || "";
                            return " ";
                        }
                        if (key === "face") {
                            style["font-family"] = val;
                            return " ";
                        }
                        if (key === "style") {
                            styleStr = val;
                            return " ";
                        }
                        return $0;
                    });
                    if (styleStr && !/;$/.test(styleStr)) {
                        styleStr += ";";
                    }
                    KE.each(style, function (key, val) {
                        if (val !== "") {
                            if (/\s/.test(val)) {
                                val = "'" + val + "'";
                            }
                            styleStr += key + ":" + val + ";";
                        }
                    });
                    if (styleStr) {
                        attr += ' style="' + styleStr + '"';
                    }
                    tagName = "span";
                }
                if (attr !== "") {
                    attr = attr.replace(/\s*([\w\-:]+)=([^\s"'<>]+|"[^"]*"|'[^']*')/g, function ($0, $1, $2) {
                        var key = $1.toLowerCase();
                        var val = $2 || "";
                        if (isFilter) {
                            if (key.charAt(0) === "." || (key !== "style" && typeof htmlTagHash[tagName][key] == "undefined")) {
                                return " ";
                            }
                        }
                        if (val === "") {
                            val = '""';
                        } else {
                            if (key === "style") {
                                val = val.substr(1, val.length - 2);
                                val = val.replace(/\s*([^\s]+?)\s*:(.*?)(;|$)/g, function ($0, $1, $2) {
                                    var k = $1.toLowerCase();
                                    if (isFilter) {
                                        if (typeof htmlTagHash[tagName]["style"] == "undefined" && typeof htmlTagHash[tagName]["." + k] == "undefined") {
                                            return "";
                                        }
                                    }
                                    var v = KE.util.trim($2);
                                    v = KE.util.rgbToHex(v);
                                    return k + ":" + v + ";";
                                });
                                val = KE.util.trim(val);
                                if (val === "") {
                                    return "";
                                }
                                val = '"' + val + '"';
                            }
                            if (KE.util.inArray(key, ["src", "href"])) {
                                if (val.charAt(0) === '"') {
                                    val = val.substr(1, val.length - 2);
                                }
                                val = KE.format.getUrl(val, urlType);
                            }
                            if (val.charAt(0) !== '"') {
                                val = '"' + val + '"';
                            }
                        }
                        return " " + key + "=" + val + " ";
                    });
                    attr = attr.replace(/\s+(checked|selected|disabled|readonly)(\s+|$)/ig, function ($0, $1) {
                        var key = $1.toLowerCase();
                        if (isFilter) {
                            if (key.charAt(0) === "." || typeof htmlTagHash[tagName][key] == "undefined") {
                                return " ";
                            }
                        }
                        return " " + key + '="' + key + '" ';
                    });
                    attr = KE.util.trim(attr);
                    attr = attr.replace(/\s+/g, " ");
                    if (attr) {
                        attr = " " + attr;
                    }
                    return startNewline + "<" + startSlash + tagName + attr + endSlash + ">" + endNewline;
                } else {
                    return startNewline + "<" + startSlash + tagName + endSlash + ">" + endNewline;
                }
            });
            if (!KE.browser.IE) {
                html = html.replace(/<p><br\s+\/>\n<\/p>/ig, "<p>&nbsp;</p>");
                html = html.replace(/<br\s+\/>\n<\/p>/ig, "</p>");
            }
            html = html.replace(/\u200B/g, "");
            var reg = KE.setting.inlineTags.join("|");
            var trimHtml = function (inHtml) {
                var outHtml = inHtml.replace(new RegExp("<(" + reg + ")[^>]*><\\/(" + reg + ")>", "ig"), function ($0, $1, $2) {
                    if ($1 == $2) {
                        return "";
                    } else {
                        return $0;
                    }
                });
                if (inHtml !== outHtml) {
                    outHtml = trimHtml(outHtml);
                }
                return outHtml;
            };
            return KE.util.trim(trimHtml(html));
        }
    };
    KE.attr = function (el, key, val) {
        if (KE.browser.IE && KE.browser.VERSION < 8 && key.toLowerCase() == "class") {
            key = "className";
        }
        val = "" + val;
        el.setAttribute(key, val);
        if (val === "") {
            el.removeAttribute(key);
        }
    };
    KE.addClass = function (el, className) {
        if (typeof el == "object") {
            var cls = el.className;
            if (cls) {
                if ((" " + cls + " ").indexOf(" " + className + " ") < 0) {
                    el.className = cls + " " + className;
                }
            } else {
                el.className = className;
            }
        } else {
            if (typeof el == "string") {
                if (/\s+class\s*=/.test(el)) {
                    el = el.replace(/(\s+class=["']?)([^"']*)(["']?[\s>])/, function ($0, $1, $2, $3) {
                        if ((" " + $2 + " ").indexOf(" " + className + " ") < 0) {
                            return $2 === "" ? $1 + className + $3 : $1 + $2 + " " + className + $3;
                        } else {
                            return $0;
                        }
                    });
                } else {
                    el = el.substr(0, el.length - 1) + ' class="' + className + '">';
                }
            }
        }
        return el;
    };
    KE.removeClass = function (el, className) {
        var cls = el.className || "";
        cls = " " + cls + " ";
        className = " " + className + " ";
        if (cls.indexOf(className) >= 0) {
            cls = KE.util.trim(cls.replace(new RegExp(className, "ig"), ""));
            if (cls === "") {
                var key = el.getAttribute("class") ? "class" : "className";
                el.removeAttribute(key);
            } else {
                el.className = cls;
            }
        }
        return el;
    };
    KE.getComputedStyle = function (el, key) {
        var doc = el.ownerDocument, win = doc.parentWindow || doc.defaultView, jsKey = KE.util.getJsKey(key), val = "";
        if (win.getComputedStyle) {
            var style = win.getComputedStyle(el, null);
            val = style[jsKey] || style.getPropertyValue(key) || el.style[jsKey];
        } else {
            if (el.currentStyle) {
                val = el.currentStyle[jsKey] || el.style[jsKey];
            }
        }
        return val;
    };
    KE.getCommonAncestor = function (keSel, tagName) {
        var range = keSel.range, keRange = keSel.keRange, startNode = keRange.startNode, endNode = keRange.endNode;
        if (KE.util.inArray(tagName, ["table", "td", "tr"])) {
            if (KE.browser.IE) {
                if (range.item) {
                    if (range.item(0).nodeName.toLowerCase() === tagName) {
                        startNode = endNode = range.item(0);
                    }
                } else {
                    var rangeA = range.duplicate();
                    rangeA.collapse(true);
                    var rangeB = range.duplicate();
                    rangeB.collapse(false);
                    startNode = rangeA.parentElement();
                    endNode = rangeB.parentElement();
                }
            } else {
                var rangeA = range.cloneRange();
                rangeA.collapse(true);
                var rangeB = range.cloneRange();
                rangeB.collapse(false);
                startNode = rangeA.startContainer;
                endNode = rangeB.startContainer;
            }
        }

        function find(node) {
            while (node) {
                if (node.nodeType == 1) {
                    if (node.tagName.toLowerCase() === tagName) {
                        return node;
                    }
                }
                node = node.parentNode;
            }
            return null;
        }

        var start = find(startNode), end = find(endNode);
        if (start && end && start === end) {
            return start;
        }
        return null;
    };
    KE.queryCommandValue = function (doc, cmd) {
        cmd = cmd.toLowerCase();

        function commandValue() {
            var val = doc.queryCommandValue(cmd);
            if (typeof val !== "string") {
                val = "";
            }
            return val;
        }

        var val = "";
        if (cmd === "fontname") {
            val = commandValue();
            val = val.replace(/['"]/g, "");
        } else {
            if (cmd === "formatblock") {
                val = commandValue();
                if (val === "") {
                    var keSel = new KE.selection(doc);
                    var el = KE.getCommonAncestor(keSel, "h1");
                    if (!el) {
                        el = KE.getCommonAncestor(keSel, "h2");
                    }
                    if (!el) {
                        el = KE.getCommonAncestor(keSel, "h3");
                    }
                    if (!el) {
                        el = KE.getCommonAncestor(keSel, "h4");
                    }
                    if (!el) {
                        el = KE.getCommonAncestor(keSel, "p");
                    }
                    if (el) {
                        val = el.nodeName;
                    }
                }
                if (val === "Normal") {
                    val = "p";
                }
            } else {
                if (cmd === "fontsize") {
                    var keSel = new KE.selection(doc);
                    var el = KE.getCommonAncestor(keSel, "span");
                    if (el) {
                        val = KE.getComputedStyle(el, "font-size");
                    }
                } else {
                    if (cmd === "textcolor") {
                        var keSel = new KE.selection(doc);
                        var el = KE.getCommonAncestor(keSel, "span");
                        if (el) {
                            val = KE.getComputedStyle(el, "color");
                        }
                        val = KE.util.rgbToHex(val);
                        if (val === "") {
                            val = "default";
                        }
                    } else {
                        if (cmd === "bgcolor") {
                            var keSel = new KE.selection(doc);
                            var el = KE.getCommonAncestor(keSel, "span");
                            if (el) {
                                val = KE.getComputedStyle(el, "background-color");
                            }
                            val = KE.util.rgbToHex(val);
                            if (val === "") {
                                val = "default";
                            }
                        }
                    }
                }
            }
        }
        return val.toLowerCase();
    };
    KE.util = {
        getDocumentElement: function (doc) {
            doc = doc || document;
            return (doc.compatMode != "CSS1Compat") ? doc.body : doc.documentElement;
        }, getDocumentHeight: function (doc) {
            var el = this.getDocumentElement(doc);
            return Math.max(el.scrollHeight, el.clientHeight);
        }, getDocumentWidth: function (doc) {
            var el = this.getDocumentElement(doc);
            return Math.max(el.scrollWidth, el.clientWidth);
        }, createTable: function (doc) {
            var table = KE.$$("table", doc);
            table.cellPadding = 0;
            table.cellSpacing = 0;
            table.border = 0;
            return {table: table, cell: table.insertRow(0).insertCell(0)};
        }, loadStyle: function (path) {
            var link = KE.$$("link");
            link.setAttribute("type", "text/css");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("href", path);
            document.getElementsByTagName("head")[0].appendChild(link);
        }, getAttrList: function (tag) {
            var re = /\s+(?:([\w\-:]+)|(?:([\w\-:]+)=([\w\-:]+))|(?:([\w\-:]+)="([^"]*)")|(?:([\w\-:]+)='([^']*)'))(?=(?:\s|\/|>)+)/g;
            var arr, key, val, list = {};
            while ((arr = re.exec(tag))) {
                key = arr[1] || arr[2] || arr[4] || arr[6];
                val = arr[1] || (arr[2] ? arr[3] : (arr[4] ? arr[5] : arr[7]));
                list[key] = val;
            }
            return list;
        }, inArray: function (str, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (str == arr[i]) {
                    return true;
                }
            }
            return false;
        }, trim: function (str) {
            return str.replace(/^\s+|\s+$/g, "");
        }, getJsKey: function (key) {
            var arr = key.split("-");
            key = "";
            for (var i = 0, len = arr.length; i < len; i++) {
                key += (i > 0) ? arr[i].charAt(0).toUpperCase() + arr[i].substr(1) : arr[i];
            }
            return key;
        }, arrayToHash: function (arr) {
            var hash = {};
            for (var i = 0, len = arr.length; i < len; i++) {
                hash[arr[i]] = 1;
            }
            return hash;
        }, escape: function (str) {
            str = str.replace(/&/g, "&amp;");
            str = str.replace(/</g, "&lt;");
            str = str.replace(/>/g, "&gt;");
            str = str.replace(/"/g, "&quot;");
            return str;
        }, unescape: function (str) {
            str = str.replace(/&lt;/g, "<");
            str = str.replace(/&gt;/g, ">");
            str = str.replace(/&quot;/g, '"');
            str = str.replace(/&amp;/g, "&");
            return str;
        }, getScrollPos: function () {
            var x, y;
            if (KE.browser.IE || KE.browser.OPERA) {
                var el = this.getDocumentElement();
                x = el.scrollLeft;
                y = el.scrollTop;
            } else {
                x = window.scrollX;
                y = window.scrollY;
            }
            return {x: x, y: y};
        }, getElementPos: function (el) {
            var x = 0, y = 0;
            if (el.getBoundingClientRect) {
                var box = el.getBoundingClientRect();
                var pos = this.getScrollPos();
                x = box.left + pos.x;
                y = box.top + pos.y;
            } else {
                x = el.offsetLeft;
                y = el.offsetTop;
                var parent = el.offsetParent;
                while (parent) {
                    x += parent.offsetLeft;
                    y += parent.offsetTop;
                    parent = parent.offsetParent;
                }
            }
            return {x: x, y: y};
        }, getCoords: function (ev) {
            ev = ev || window.event;
            return {x: ev.clientX, y: ev.clientY};
        }, setOpacity: function (el, opacity) {
            if (typeof el.style.opacity == "undefined") {
                el.style.filter = (opacity == 100) ? "" : "alpha(opacity=" + opacity + ")";
            } else {
                el.style.opacity = (opacity == 100) ? "" : (opacity / 100);
            }
        }, getIframeDoc: function (iframe) {
            return iframe.contentDocument || iframe.contentWindow.document;
        }, rgbToHex: function (str) {
            function hex(s) {
                s = parseInt(s).toString(16);
                return s.length > 1 ? s : "0" + s;
            }

            return str.replace(/rgb\s*?\(\s*?(\d+)\s*?,\s*?(\d+)\s*?,\s*?(\d+)\s*?\)/ig, function ($0, $1, $2, $3) {
                return "#" + hex($1) + hex($2) + hex($3);
            });
        }, parseJson: function (text) {
            var match;
            if ((match = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(text))) {
                text = match[0];
            }
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                return eval("(" + text + ")");
            }
            throw"JSON parse error";
        }, getParam: function (url, name) {
            return url.match(new RegExp("[?&]" + name + "=([^?&]+)", "i")) ? unescape(RegExp.$1) : "";
        }, createRange: function (doc) {
            return doc.body.createTextRange ? doc.body.createTextRange() : doc.createRange();
        }, getNodeType: function (node) {
            return (node.nodeType == 1 && KE.util.inArray(node.tagName.toLowerCase(), KE.setting.noEndTags)) ? 88 : node.nodeType;
        }, inMarquee: function (node) {
            var n = node, nodeName;
            while (n) {
                nodeName = n.nodeName.toLowerCase();
                if (nodeName == "marquee" || nodeName == "select") {
                    return true;
                }
                n = n.parentNode;
            }
            return false;
        }, moveToElementText: function (range, el) {
            if (!this.inMarquee(el)) {
                range.moveToElementText(el);
            }
        }, getNodeTextLength: function (node) {
            var type = KE.util.getNodeType(node);
            if (type == 1) {
                var html = node.innerHTML;
                return html.replace(/<.*?>/ig, "").length;
            } else {
                if (type == 3) {
                    return node.nodeValue.length;
                }
            }
        }, getNodeStartRange: function (doc, node) {
            var range = KE.util.createRange(doc);
            var type = node.nodeType;
            if (type == 1) {
                KE.util.moveToElementText(range, node);
                return range;
            } else {
                if (type == 3) {
                    var offset = 0;
                    var sibling = node.previousSibling;
                    while (sibling) {
                        if (sibling.nodeType == 1) {
                            var nodeRange = KE.util.createRange(doc);
                            KE.util.moveToElementText(nodeRange, sibling);
                            range.setEndPoint("StartToEnd", nodeRange);
                            range.moveStart("character", offset);
                            return range;
                        } else {
                            if (sibling.nodeType == 3) {
                                offset += sibling.nodeValue.length;
                            }
                        }
                        sibling = sibling.previousSibling;
                    }
                    KE.util.moveToElementText(range, node.parentNode);
                    range.moveStart("character", offset);
                    return range;
                }
            }
        }, removeParent: function (parent) {
            if (parent.hasChildNodes) {
                var node = parent.firstChild;
                while (node) {
                    var nextNode = node.nextSibling;
                    parent.parentNode.insertBefore(node, parent);
                    node = nextNode;
                }
            }
            parent.parentNode.removeChild(parent);
        }, pluginLang: function (pluginName, doc) {
            KE.each(KE.lang.plugins[pluginName], function (key, val) {
                var span = KE.$("lang." + key, doc);
                if (span) {
                    span.parentNode.insertBefore(doc.createTextNode(val), span);
                    span.parentNode.removeChild(span);
                }
            });
        }, drag: function (id, mousedownObj, moveObj, func) {
            var g = KE.g[id];
            mousedownObj.onmousedown = function (e) {
                var self = this;
                e = e || window.event;
                var pos = KE.util.getCoords(e);
                var objTop = parseInt(moveObj.style.top);
                var objLeft = parseInt(moveObj.style.left);
                var objWidth = moveObj.style.width;
                var objHeight = moveObj.style.height;
                if (objWidth.match(/%$/)) {
                    objWidth = moveObj.offsetWidth + "px";
                }
                if (objHeight.match(/%$/)) {
                    objHeight = moveObj.offsetHeight + "px";
                }
                objWidth = parseInt(objWidth);
                objHeight = parseInt(objHeight);
                var mouseTop = pos.y;
                var mouseLeft = pos.x;
                var scrollPos = KE.util.getScrollPos();
                var scrollTop = scrollPos.y;
                var scrollLeft = scrollPos.x;
                var dragFlag = true;

                function moveListener(e) {
                    if (dragFlag) {
                        var pos = KE.util.getCoords(e);
                        var scrollPos = KE.util.getScrollPos();
                        var top = parseInt(pos.y - mouseTop - scrollTop + scrollPos.y);
                        var left = parseInt(pos.x - mouseLeft - scrollLeft + scrollPos.x);
                        func(objTop, objLeft, objWidth, objHeight, top, left);
                    }
                }

                var iframePos = KE.util.getElementPos(g.iframe);

                function iframeMoveListener(e) {
                    if (dragFlag) {
                        var pos = KE.util.getCoords(e, g.iframeDoc);
                        var top = parseInt(iframePos.y + pos.y - mouseTop - scrollTop);
                        var left = parseInt(iframePos.x + pos.x - mouseLeft - scrollLeft);
                        func(objTop, objLeft, objWidth, objHeight, top, left);
                    }
                }

                var selectListener = function () {
                    return false;
                };

                function upListener(e) {
                    dragFlag = false;
                    if (self.releaseCapture) {
                        self.releaseCapture();
                    }
                    KE.event.remove(document, "mousemove", moveListener);
                    KE.event.remove(document, "mouseup", upListener);
                    KE.event.remove(g.iframeDoc, "mousemove", iframeMoveListener);
                    KE.event.remove(g.iframeDoc, "mouseup", upListener);
                    KE.event.remove(document, "selectstart", selectListener);
                    KE.event.stop(e);
                    return false;
                }

                KE.event.add(document, "mousemove", moveListener);
                KE.event.add(document, "mouseup", upListener);
                KE.event.add(g.iframeDoc, "mousemove", iframeMoveListener);
                KE.event.add(g.iframeDoc, "mouseup", upListener);
                KE.event.add(document, "selectstart", selectListener);
                if (self.setCapture) {
                    self.setCapture();
                }
                KE.event.stop(e);
                return false;
            };
        }, resize: function (id, width, height, isCheck, isResizeWidth) {
            isResizeWidth = (typeof isResizeWidth == "undefined") ? true : isResizeWidth;
            var g = KE.g[id];
            if (!g.container) {
                return;
            }
            if (isCheck && (parseInt(width) <= g.minWidth || parseInt(height) <= g.minHeight)) {
                return;
            }
            if (isResizeWidth) {
                g.container.style.width = width;
            }
            if (KE.browser.IE) {
                var temp = g.toolbarTable && g.toolbarTable.offsetHeight;
            }
            g.container.style.height = height;
            var diff = parseInt(height) - g.toolbarHeight - g.statusbarHeight;
            if (diff >= 0) {
                g.iframe.style.height = diff + "px";
                g.newTextarea.style.height = (((KE.browser.IE && KE.browser.VERSION < 8 || document.compatMode != "CSS1Compat") && diff >= 2) ? diff - 2 : diff) + "px";
            }
        }, hideLoadingPage: function (id) {
            var stack = KE.g[id].dialogStack;
            var dialog = stack[stack.length - 1];
            dialog.loading.style.display = "none";
            dialog.iframe.style.display = "";
        }, showLoadingPage: function (id) {
            var stack = KE.g[id].dialogStack;
            var dialog = stack[stack.length - 1];
            dialog.loading.style.display = "";
            dialog.iframe.style.display = "none";
        }, setDefaultPlugin: function (id) {
            var items = ["selectall", "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "bold", "italic", "underline", "strikethrough"];
            var shortcuts = {bold: "B", italic: "I", underline: "U"};
            for (var i = 0; i < items.length; i++) {
                var item = items[i], plugin = {};
                if (item in shortcuts) {
                    plugin.init = (function (item) {
                        return function (id) {
                            KE.event.ctrl(KE.g[id].iframeDoc, shortcuts[item], function (e) {
                                KE.plugin[item].click(id);
                                KE.util.focus(id);
                            }, id);
                        };
                    })(item);
                }
                plugin.click = (function (item) {
                    return function (id) {
                        KE.util.execCommand(id, item, null);
                    };
                })(item);
                KE.plugin[item] = plugin;
            }
        }, getFullHtml: function (id) {
            var html = "<html>";
            html += "<head>";
            html += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
            html += "<title>KindEditor</title>";
            // html += '<link href="' + KE.g[id].skinsPath + "common/editor.css?ver=" + escape(KE.version) + '" rel="stylesheet" type="text/css" />';
            var cssPath = KE.g[id].cssPath;
            if (typeof cssPath == "string") {
                cssPath = [cssPath];
            }
            for (var i = 0, len = cssPath.length; i < len; i++) {
                if (cssPath[i] !== "") {
                    html += '<link href="' + cssPath[i] + '" rel="stylesheet" type="text/css" />';
                }
            }
            html += "</head>";
            html += '<body class="ke-content"></body>';
            html += "</html>";
            return html;
        }, getMediaType: function (src) {
            if (src.match(/\.(rm|rmvb)(\?|$)/i)) {
                return "rm";
            } else {
                if (src.match(/\.(swf|flv)(\?|$)/i)) {
                    return "flash";
                } else {
                    return "media";
                }
            }
        }, getMediaImage: function (id, type, attrs) {
            var width = attrs.width;
            var height = attrs.height;
            type = type || this.getMediaType(attrs.src);
            var srcTag = this.getMediaEmbed(attrs);
            var style = "";
            if (width > 0) {
                style += "width:" + width + "px;";
            }
            if (height > 0) {
                style += "height:" + height + "px;";
            }
            var className = "ke-" + type;
            var html = '<img class="' + className + '" src="' + KE.g[id].skinsPath + 'common/blank.gif" ';
            if (style !== "") {
                html += 'style="' + style + '" ';
            }
            html += 'kesrctag="' + escape(srcTag) + '" alt="" />';
            return html;
        }, getMediaEmbed: function (attrs) {
            var html = "<embed ";
            KE.each(attrs, function (key, val) {
                html += key + '="' + val + '" ';
            });
            html += "/>";
            return html;
        }, execGetHtmlHooks: function (id, html) {
            var hooks = KE.g[id].getHtmlHooks;
            for (var i = 0, len = hooks.length; i < len; i++) {
                html = hooks[i](html);
            }
            return html;
        }, execSetHtmlHooks: function (id, html) {
            var hooks = KE.g[id].setHtmlHooks;
            for (var i = 0, len = hooks.length; i < len; i++) {
                html = hooks[i](html);
            }
            return html;
        }, execOnchangeHandler: function (id) {
            var handlers = KE.g[id].onchangeHandlerStack;
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i]();
            }
        }, toData: function (id, srcData) {
            var g = KE.g[id];
            var html = this.execGetHtmlHooks(id, srcData);
            html = html.replace(/^\s*<br[^>]*>\s*$/ig, "");
            html = html.replace(/^\s*<p>\s*&nbsp;\s*<\/p>\s*$/ig, "");
            if (html == "&nbsp;" || html == "<br />") {
                html = "";
            }
            if (g.filterMode) {
                html = KE.format.getHtml(html, g.htmlTags, g.urlType);
            } else {
                html = KE.format.getHtml(html, null, g.urlType);
            }
            var valLen = html.length;
            var brData = "<br />";
            var brLen = brData.length;
            var start = valLen - brData.length;
            while (valLen >= brLen && html.lastIndexOf(brData, start) == start) {
                html = html.substring(0, start);
                valLen = html.length;
                start = valLen - brLen;
            }
            return html;
        }, getData: function (id, wyswygMode) {
            var g = KE.g[id];
            wyswygMode = (wyswygMode === undefined) ? g.wyswygMode : wyswygMode;
            if (!wyswygMode) {
                this.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, g.newTextarea.value));
            }
            return this.toData(id, g.iframeDoc.body.innerHTML);
        }, getSrcData: function (id) {
            var g = KE.g[id];
            if (!g.wyswygMode) {
                this.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, g.newTextarea.value));
            }
            return g.iframeDoc.body.innerHTML;
        }, getPureData: function (id) {
            return this.extractText(this.getData(id));
        }, extractText: function (str) {
            str = str.replace(/<(?!img|embed).*?>/ig, "");
            str = str.replace(/&nbsp;/ig, " ");
            return str;
        }, isEmpty: function (id) {
            return this.getPureData(id).replace(/\r\n|\n|\r/, "").replace(/^\s+|\s+$/, "") === "";
        }, setData: function (id) {
            var g = KE.g[id];
            if (g.srcTextarea) {
                var val = this.getData(id);
                if (g.srcTextarea.value != val && g.hasCreated) {
                    var valLen = val.length;
                    var needChange = false;
                    if (window.replace_specialChar) {
                        if (val.indexOf("§") > -1 || val.indexOf("¤") > -1 || val.indexOf("〒") > -1) {
                            needChange = true;
                        }
                        val = replace_specialChar(val);
                    }
                    var endP = "</p>";
                    var start = val.length - endP.length;
                    if (val.indexOf("<p") == 0 && val.indexOf(endP) == start) {
                        val = val.replace(/<\/?p.*?>/ig, "");
                        needChange = true;
                    }
                    if (/schemas-microsoft-com|worddocument|mso-\w+/i.test(val)) {
                        val = KE.removeWord(val);
                        needChange = true;
                    }
                    if (needChange) {
                        this.setFullHtml(id, val);
                    }
                    g.srcTextarea.value = val;
                    if (g.srcTextarea.onchange) {
                        g.srcTextarea.onchange();
                    }
                }
            }
        }, focus: function (id) {
            var g = KE.g[id];
            if (g.wyswygMode) {
                g.iframeWin.focus();
            } else {
                g.newTextarea.focus();
            }
        }, click: function (id, cmd) {
            this.focus(id);
            KE.hideMenu(id);
            KE.plugin[cmd].click(id);
        }, selection: function (id) {
            if (!KE.browser.IE || !KE.g[id].keRange) {
                this.setSelection(id);
            }
        }, setSelection: function (id) {
            var g = KE.g[id];
            var keSel = new KE.selection(g.iframeDoc);
            if (!KE.browser.IE || keSel.range.item || keSel.range.parentElement().ownerDocument === g.iframeDoc) {
                g.keSel = keSel;
                g.keRange = g.keSel.keRange;
                g.sel = g.keSel.sel;
                g.range = g.keSel.range;
            }
        }, select: function (id) {
            if (KE.browser.IE && KE.g[id].wyswygMode && KE.g[id].range) {
                KE.g[id].range.select();
            }
        }, execCommand: function (id, cmd, value) {
            KE.util.focus(id);
            KE.util.select(id);
            try {
                KE.g[id].iframeDoc.execCommand(cmd, false, value);
            } catch (e) {
            }
            KE.toolbar.updateState(id);
            KE.util.execOnchangeHandler(id);
            var val = this.getData(id);
            var endP = "</p>";
            var startP = "<p";
            var start = val.length - endP.length;
            if (val.indexOf("<p") == 0 && val.indexOf(endP) == start) {
                val = "<div" + val.substring(2, start) + "</div>";
                this.setFullHtml(id, val);
                KE.g[id].srcTextarea.value = val;
                if (KE.g[id].srcTextarea.onchange) {
                    KE.g[id].srcTextarea.onchange();
                }
            }
        }, innerHtml: function (el, html) {
            if (KE.browser.IE) {
                el.innerHTML = '<img id="__ke_temp_tag__" width="0" height="0" />' + html;
                var temp = KE.$("__ke_temp_tag__", el.ownerDocument);
                if (temp) {
                    temp.parentNode.removeChild(temp);
                }
            } else {
                el.innerHTML = html;
            }
        }, pasteHtml: function (id, html, isStart) {
            var g = KE.g[id];
            var imgStr = '<img id="__ke_temp_tag__" width="0" height="0" />';
            if (isStart) {
                html = imgStr + html;
            } else {
                html += imgStr;
            }
            if (KE.browser.IE) {
                if (g.range.item) {
                    g.range.item(0).outerHTML = html;
                } else {
                    g.range.pasteHTML(html);
                }
            } else {
                g.range.deleteContents();
                var frag = g.range.createContextualFragment(html);
                g.range.insertNode(frag);
            }
            var node = KE.$("__ke_temp_tag__", g.iframeDoc);
            var blank = g.iframeDoc.createTextNode("");
            node.parentNode.replaceChild(blank, node);
            g.keRange.selectNode(blank);
            g.keSel.addRange(g.keRange);
        }, insertHtml: function (id, html) {
            if (html === "") {
                return;
            }
            var g = KE.g[id];
            if (!g.wyswygMode) {
                return;
            }
            if (!g.range) {
                return;
            }
            html = this.execSetHtmlHooks(id, html);
            if (KE.browser.IE) {
                this.select(id);
                if (g.range.item) {
                    try {
                        g.range.item(0).outerHTML = html;
                    } catch (e) {
                        var el = g.range.item(0);
                        var parent = el.parentNode;
                        parent.removeChild(el);
                        if (parent.nodeName.toLowerCase() != "body") {
                            parent = parent.parentNode;
                        }
                        this.innerHtml(parent, html + parent.innerHTML);
                    }
                } else {
                    g.range.pasteHTML('<span id="__ke_temp_tag__">\u200B</span>' + html);
                    var node = KE.$("__ke_temp_tag__", g.iframeDoc);
                    node.parentNode.removeChild(node);
                }
            } else {
                if (KE.browser.GECKO) {
                    this.execCommand(id, "inserthtml", html);
                    return;
                } else {
                    this.pasteHtml(id, html);
                }
            }
            KE.util.execOnchangeHandler(id);
        }, setFullHtml: function (id, html) {
            var g = KE.g[id];
            if (!KE.browser.IE && html === "") {
                html = "<br />";
            }
            var html = KE.util.execSetHtmlHooks(id, html);
            this.innerHtml(g.iframeDoc.body, html);
            if (!g.wyswygMode) {
                g.newTextarea.value = KE.util.getData(id, true);
            }
            KE.util.execOnchangeHandler(id);
        }, selectImageWebkit: function (id, e, isSelection) {
            if (KE.browser.WEBKIT) {
                var target = e.srcElement || e.target;
                if (target.tagName.toLowerCase() == "img") {
                    if (isSelection) {
                        KE.util.selection(id);
                    }
                    var range = KE.g[id].keRange;
                    range.selectNode(target);
                    KE.g[id].keSel.addRange(range);
                }
            }
        }, addTabEvent: function (id) {
            var g = KE.g[id];
            KE.event.add(g.iframeDoc, "keydown", function (e) {
                if (e.keyCode == 9) {
                    if (g.afterTab) {
                        g.afterTab(id);
                    }
                    KE.event.stop(e);
                    return false;
                }
            }, id);
        }, addContextmenuEvent: function (id) {
            var g = KE.g[id];
            if (g.contextmenuItems.length == 0) {
                return;
            }
            if (!g.useContextmenu) {
                return;
            }
            KE.event.add(g.iframeDoc, "contextmenu", function (e) {
                KE.hideMenu(id);
                KE.util.setSelection(id);
                KE.util.selectImageWebkit(id, e, false);
                var maxWidth = 0;
                var items = [];
                for (var i = 0, len = g.contextmenuItems.length; i < len; i++) {
                    var item = g.contextmenuItems[i];
                    if (item === "-") {
                        items.push(item);
                    } else {
                        if (item.cond && item.cond(id)) {
                            items.push(item);
                            if (item.options) {
                                var width = parseInt(item.options.width) || 0;
                                if (width > maxWidth) {
                                    maxWidth = width;
                                }
                            }
                        }
                    }
                    prevItem = item;
                }
                while (items.length > 0 && items[0] === "-") {
                    items.shift();
                }
                while (items.length > 0 && items[items.length - 1] === "-") {
                    items.pop();
                }
                var prevItem = null;
                for (var i = 0, len = items.length; i < len; i++) {
                    if (items[i] === "-" && prevItem === "-") {
                        delete items[i];
                    }
                    prevItem = items[i] || null;
                }
                var menu = new KE.menu({id: id, event: e, type: "contextmenu", width: maxWidth});
                var showFlag = false;
                for (var i = 0, len = items.length; i < len; i++) {
                    var item = items[i];
                    if (!item) {
                        continue;
                    }
                    if (item === "-") {
                        if (i < len - 1) {
                            menu.addSeparator();
                        }
                    } else {
                        showFlag = true;
                        menu.add(item.text, (function (item) {
                            return function () {
                                item.click(id, menu);
                            };
                        })(item), item.options);
                    }
                }
                if (!showFlag) {
                    menu.add(KE.lang.copy, function () {
                        KE.util.select(id);
                        menu.hide();
                        KE.plugin.copy.click(id);
                    });
                    menu.add(KE.lang.paste, function () {
                        KE.util.select(id);
                        menu.hide();
                        KE.plugin.pastetextfromword.click(id);
                    });
                    menu.add(KE.lang.cut, function () {
                        KE.util.select(id);
                        menu.hide();
                        KE.plugin.cut.click(id);
                    });
                }
                menu.show();
                KE.event.stop(e);
                return false;
            }, id);
        }, addNewlineEvent: function (id) {
            var g = KE.g[id];
            if (KE.browser.IE && g.newlineTag.toLowerCase() != "br") {
                return;
            }
            if (KE.browser.GECKO && KE.browser.VERSION < 3 && g.newlineTag.toLowerCase() != "p") {
                return;
            }
            if (KE.browser.OPERA) {
                return;
            }
            KE.event.add(g.iframeDoc, "keydown", function (e) {
                if (e.keyCode != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
                    return true;
                }
                KE.util.setSelection(id);
                var parent = g.keRange.getParentElement();
                if (KE.util.inMarquee(parent)) {
                    return;
                }
                var tagName = parent.tagName.toLowerCase();
                if (g.newlineTag.toLowerCase() == "br") {
                    if (!KE.util.inArray(tagName, ["h1", "h2", "h3", "h4", "h5", "h6", "li"])) {
                        KE.util.pasteHtml(id, "<br />");
                        var nextNode = g.keRange.startNode.nextSibling;
                        if (KE.browser.IE) {
                            if (!nextNode) {
                                KE.util.pasteHtml(id, "<br />", true);
                            }
                        } else {
                            if (KE.browser.WEBKIT) {
                                if (!nextNode) {
                                    KE.util.pasteHtml(id, "<br />", true);
                                } else {
                                    var range = new KE.range(g.iframeDoc);
                                    range.selectNode(nextNode.parentNode);
                                    range.setStart(nextNode, 0);
                                    if (range.cloneContents().innerHTML.replace(/<(?!img|embed).*?>/ig, "") === "") {
                                        KE.util.pasteHtml(id, "<br />", true);
                                    }
                                }
                            }
                        }
                        KE.event.stop(e);
                        return false;
                    }
                } else {
                    if (!KE.util.inArray(tagName, ["p", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "div", "li"])) {
                        KE.util.execCommand(id, "formatblock", "<P>");
                    }
                }
                return true;
            }, id);
        }
    };
    KE.removeWord = function (str) {
        str = str.replace(/(<link(?:\s+[^>]*?)?)\s+href\s*=\s*(["']?)\s*file:\/\/.+?\s*\2((?:\s+[^>]*?)?\s*\/?>)/ig, "");
        str = str.replace(/<!--[\s\S]*?-->|<!(--)?\[[\s\S]+?\](--)?>|<style(\s+[^>]*?)?>[\s\S]*?<\/style>/ig, "");
        str = str.replace(/<\/?\w+:[^>]*>/ig, "");
        str = str.replace(/<\/?(span|a|img)(\s+[^>]*?)?>/ig, "");
        str = str.replace(/(<\w+(?:\s+[^>]*?)?)\s+class\s*=\s*(["']?)\s*mso.+?\s*\2((?:\s+[^>]*?)?\s*\/?>)/ig, "$1$3");
        str = str.replace(/(<\w+(?:\s+[^>]*?)?)\s+lang\s*=\s*(["']?)\s*.+?\s*\2((?:\s+[^>]*?)?\s*\/?>)/ig, "$1$3");
        str = str.replace(/(<\w+(?:\s+[^>]*?)?)\s+align\s*=\s*(["']?)\s*left\s*\2((?:\s+[^>]*?)?\s*\/?>)/ig, "$1$3");
        str = str.replace(/<\w+(?:\s+[^>]*?)?(\s+style\s*=\s*(["']?)\s*(.*?)\s*\2)(?:\s+[^>]*?)?\s*\/?>/ig, function (all, attr, p, styles) {
            styles = KE.util.trim(styles.replace(/\s*(mso-[^:]+:.+?|margin\s*:\s*0cm 0cm 0pt\s*|(text-align|font-variant|line-height)\s*:\s*.+?)(;|$)\s*/ig, ""));
            return all.replace(attr, true ? "" : styles ? ' style="' + styles + '"' : "");
        });
        return str;
    };
    KE.layout = {
        hide: function (id) {
            var g = KE.g[id];
            KE.hideMenu(id);
            var stack = g.dialogStack;
            while (stack.length > 0) {
                var dialog = stack[stack.length - 1];
                dialog.hide();
            }
            g.maskDiv.style.display = "none";
        }
    };
    KE.hideMenu = function (id) {
        var g = KE.g[id];
        g.hideDiv.innerHTML = "";
        g.hideDiv.style.display = "none";
    };
    KE.colorpicker = function (arg) {
        var wrapper;
        var x = arg.x || 0;
        var y = arg.y || 0;
        var z = arg.z || 0;
        var colors = arg.colors || KE.setting.colorTable;
        var doc = arg.doc || document;
        var onclick = arg.onclick;
        var selectedColor = (arg.selectedColor || "").toLowerCase();

        function init() {
            wrapper = KE.$$("div");
            wrapper.className = "ke-colorpicker";
            wrapper.style.top = y + "px";
            wrapper.style.left = x + "px";
            wrapper.style.zIndex = z;
        }

        init.call(this);
        this.remove = function () {
            doc.body.removeChild(wrapper);
        };
        this.getElement = function () {
            function addAttr(cell, color, cls) {
                if (selectedColor === color.toLowerCase()) {
                    cls += " ke-colorpicker-cell-selected";
                }
                cell.className = cls;
                cell.title = color || KE.lang.noColor;
                cell.onmouseover = function () {
                    this.className = cls + " ke-colorpicker-cell-on";
                };
                cell.onmouseout = function () {
                    this.className = cls;
                };
                cell.onclick = function () {
                    onclick(color);
                };
                if (color) {
                    var div = KE.$$("div");
                    div.className = "ke-colorpicker-cell-color";
                    div.style.backgroundColor = color;
                    cell.appendChild(div);
                } else {
                    cell.innerHTML = KE.lang.noColor;
                }
            }

            var table = KE.$$("table");
            table.className = "ke-colorpicker-table";
            table.cellPadding = 0;
            table.cellSpacing = 0;
            table.border = 0;
            var row = table.insertRow(0), cell = row.insertCell(0);
            cell.colSpan = colors[0].length;
            addAttr(cell, "", "ke-colorpicker-cell-top");
            for (var i = 0; i < colors.length; i++) {
                var row = table.insertRow(i + 1);
                for (var j = 0; j < colors[i].length; j++) {
                    var color = colors[i][j], cell = row.insertCell(j);
                    addAttr(cell, color, "ke-colorpicker-cell");
                }
            }
            return table;
        };
        this.create = function () {
            wrapper.appendChild(this.getElement());
            KE.event.bind(wrapper, "click", function (e) {
            });
            KE.event.bind(wrapper, "mousedown", function (e) {
            });
            doc.body.appendChild(wrapper);
        };
    };
    KE.menu = function (arg) {
        function getPos(width, height) {
            var id = arg.id;
            var x = 0;
            var y = 0;
            if (this.type == "menu") {
                var obj = KE.g[id].toolbarIcon[arg.cmd];
                var pos = KE.util.getElementPos(obj[0]);
                x = pos.x;
                y = pos.y + obj[0].offsetHeight;
            } else {
                var pos = KE.util.getCoords(arg.event);
                var iframePos = KE.util.getElementPos(KE.g[id].iframe);
                x = pos.x + iframePos.x;
                y = pos.y + iframePos.y + 5;
            }
            if (width > 0 || height > 0) {
                var scrollPos = KE.util.getScrollPos();
                var docEl = KE.util.getDocumentElement();
                var maxLeft = scrollPos.x + docEl.clientWidth - width - 2;
                if (x > maxLeft) {
                    x = maxLeft;
                }
            }
            return {x: x, y: y};
        }

        function init() {
            var width = arg.width;
            this.type = (arg.type && arg.type == "contextmenu") ? arg.type : "menu";
            var div = KE.$$("div");
            div.className = "ke-" + this.type;
            div.setAttribute("name", arg.cmd);
            var pos = getPos.call(this, 0, 0);
            div.style.top = pos.y + "px";
            div.style.left = pos.x + "px";
            if (arg.width) {
                div.style.width = (/^\d+$/.test(width)) ? width + "px" : width;
            }
            KE.event.bind(div, "click", function (e) {
            }, arg.id);
            KE.event.bind(div, "mousedown", function (e) {
            }, arg.id);
            this.div = div;
        }

        init.call(this);
        this.add = function (html, event, options) {
            var height, iconHtml, checked = false;
            if (options !== undefined) {
                height = options.height;
                iconHtml = options.iconHtml;
                checked = options.checked;
            }
            var self = this;
            var cDiv = KE.$$("div");
            cDiv.className = "ke-" + self.type + "-item";
            if (height) {
                cDiv.style.height = height;
            }
            var left = KE.$$("div");
            left.className = "ke-" + this.type + "-left";
            var center = KE.$$("div");
            center.className = "ke-" + self.type + "-center";
            if (height) {
                center.style.height = height;
            }
            var right = KE.$$("div");
            right.className = "ke-" + this.type + "-right";
            if (height) {
                right.style.lineHeight = height;
            }
            cDiv.onmouseover = function () {
                this.className = "ke-" + self.type + "-item ke-" + self.type + "-item-on";
                center.className = "ke-" + self.type + "-center ke-" + self.type + "-center-on";
            };
            cDiv.onmouseout = function () {
                this.className = "ke-" + self.type + "-item";
                center.className = "ke-" + self.type + "-center";
            };
            cDiv.onclick = event;
            cDiv.appendChild(left);
            cDiv.appendChild(center);
            cDiv.appendChild(right);
            if (checked) {
                KE.util.innerHtml(left, '<span class="ke-common-icon ke-common-icon-url ke-icon-checked"></span>');
            } else {
                if (iconHtml) {
                    KE.util.innerHtml(left, iconHtml);
                }
            }
            KE.util.innerHtml(right, html);
            this.append(cDiv);
        };
        this.addSeparator = function () {
            var div = KE.$$("div");
            div.className = "ke-" + this.type + "-separator";
            this.append(div);
        };
        this.append = function (el) {
            this.div.appendChild(el);
        };
        this.insert = function (html) {
            KE.util.innerHtml(this.div, html);
        };
        this.hide = function () {
            KE.hideMenu(arg.id);
        };
        this.show = function () {
            this.hide();
            var id = arg.id;
            KE.g[id].hideDiv.style.display = "";
            KE.g[id].hideDiv.appendChild(this.div);
            var pos = getPos.call(this, this.div.clientWidth, this.div.clientHeight);
            this.div.style.top = pos.y + "px";
            this.div.style.left = pos.x + "px";
        };
        this.picker = function (color) {
            var colorTable = KE.g[arg.id].colorTable;
            var picker = new KE.colorpicker({
                colors: colorTable, onclick: function (color) {
                    KE.plugin[arg.cmd].exec(arg.id, color);
                }, selectedColor: color
            });
            this.append(picker.getElement());
            this.show();
        };
    };
    KE.button = function (arg) {
        arg = arg || {};
        doc = arg.doc || document;
        var span = KE.$$("span", doc);
        span.className = "ke-button-common ke-button-outer " + (arg.className || "");
        span.title = arg.text;
        btn = KE.$$("input", doc);
        btn.className = "ke-button-common ke-button";
        btn.type = "button";
        btn.value = arg.text || "";
        if (arg.clickFn) {
            btn.onclick = arg.clickFn;
        }
        span.appendChild(btn);
        return {span: span, btn: btn};
    };
    KE.dialog = function (arg) {
        var self = this;
        this.widthMargin = 30;
        this.heightMargin = 100;
        this.zIndex = 19811214;
        this.width = arg.width;
        this.height = arg.height;
        var minTop, minLeft;

        function setLimitNumber() {
            var docEl = KE.util.getDocumentElement();
            var pos = KE.util.getScrollPos();
            minTop = pos.y;
            minLeft = pos.x;
        }

        function init() {
            this.beforeHide = arg.beforeHide;
            this.afterHide = arg.afterHide;
            this.beforeShow = arg.beforeShow;
            this.afterShow = arg.afterShow;
            this.ondrag = arg.ondrag;
        }

        init.call(this);

        function getPos() {
            var width = this.width + this.widthMargin;
            var height = this.height + this.heightMargin;
            var id = arg.id;
            var g = KE.g[id];
            var x = 0, y = 0;
            if (g.dialogAlignType == "page") {
                var el = KE.util.getDocumentElement();
                var scrollPos = KE.util.getScrollPos();
                x = Math.round(scrollPos.x + (el.clientWidth - width) / 2);
                y = Math.round(scrollPos.y + (el.clientHeight - height) / 2);
            } else {
                var pos = KE.util.getElementPos(KE.g[id].container);
                var el = g.container;
                var xDiff = Math.round(el.clientWidth / 2) - Math.round(width / 2);
                var yDiff = Math.round(el.clientHeight / 2) - Math.round(height / 2);
                x = xDiff < 0 ? pos.x : pos.x + xDiff;
                y = yDiff < 0 ? pos.y : pos.y + yDiff;
            }
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            return {x: x, y: y};
        }

        this.resize = function (width, height) {
            if (width) {
                this.width = width;
            }
            if (height) {
                this.height = height;
            }
            this.hide();
            this.show();
        };
        this.hide = function () {
            if (this.beforeHide) {
                this.beforeHide(id);
            }
            var id = arg.id;
            var stack = KE.g[id].dialogStack;
            if (stack[stack.length - 1] != this) {
                return;
            }
            var dialog = stack.pop();
            var iframe = dialog.iframe;
            iframe.src = "javascript:false";
            iframe.parentNode.removeChild(iframe);
            document.body.removeChild(this.div);
            if (stack.length < 1) {
                KE.g[id].maskDiv.style.display = "none";
            }
            KE.event.remove(window, "resize", setLimitNumber);
            KE.event.remove(window, "scroll", setLimitNumber);
            if (this.afterHide) {
                this.afterHide(id);
            }
            KE.util.focus(id);
        };
        this.show = function () {
            if (this.beforeShow) {
                this.beforeShow(id);
            }
            var self = this;
            var id = arg.id;
            var div = KE.$$("div");
            div.className = "ke-dialog";
            KE.event.bind(div, "click", function (e) {
            }, id);
            var stack = KE.g[id].dialogStack;
            if (stack.length > 0) {
                this.zIndex = stack[stack.length - 1].zIndex + 1;
            }
            div.style.zIndex = this.zIndex;
            var pos = getPos.call(this);
            div.style.top = pos.y + "px";
            div.style.left = pos.x + "px";
            if (KE.g[id].shadowMode) {
                KE.addClass(div, "ke-dialog-shadow");
            } else {
                KE.addClass(div, "ke-dialog-no-shadow");
            }
            var titleDiv = KE.$$("div");
            titleDiv.className = "ke-dialog-title";
            titleDiv.innerHTML = arg.title;
            var span = KE.$$("span");
            span.className = "ke-dialog-close";
            span.alt = KE.lang.close;
            span.title = KE.lang.close;
            span.onclick = function () {
                self.hide();
                KE.util.select(id);
            };
            titleDiv.appendChild(span);
            setLimitNumber();
            KE.event.add(window, "resize", setLimitNumber);
            KE.event.add(window, "scroll", setLimitNumber);
            KE.util.drag(id, titleDiv, div, function (objTop, objLeft, objWidth, objHeight, top, left) {
                if (self.ondrag) {
                    self.ondrag(id);
                }
                setLimitNumber();
                top = objTop + top;
                left = objLeft + left;
                if (top < minTop) {
                    top = minTop;
                }
                if (left < minLeft) {
                    left = minLeft;
                }
                div.style.top = top + "px";
                div.style.left = left + "px";
            });
            div.appendChild(titleDiv);
            var bodyDiv = KE.$$("div");
            bodyDiv.className = "ke-dialog-body";
            var loadingTable = KE.util.createTable();
            loadingTable.table.className = "ke-loading-table";
            loadingTable.table.style.width = this.width + "px";
            loadingTable.table.style.height = this.height + "px";
            var loadingImg = KE.$$("span");
            loadingImg.className = "ke-loading-img";
            loadingTable.cell.appendChild(loadingImg);
            var iframe = (KE.g[id].dialogStack.length == 0 && KE.g[id].dialog) ? KE.g[id].dialog : KE.$$("iframe");
            if (arg.useFrameCSS) {
                iframe.className = "ke-dialog-iframe ke-dialog-iframe-border";
            } else {
                iframe.className = "ke-dialog-iframe";
            }
            iframe.setAttribute("frameBorder", "0");
            iframe.style.width = this.width + "px";
            iframe.style.height = this.height + "px";
            iframe.style.display = "none";
            bodyDiv.appendChild(iframe);
            bodyDiv.appendChild(loadingTable.table);
            div.appendChild(bodyDiv);
            var bottomDiv = KE.$$("div");
            bottomDiv.className = "ke-dialog-bottom";
            var noButton = null;
            var yesButton = null;
            var previewButton = null;
            if (arg.previewButton) {
                var btn = KE.button({
                    className: "ke-dialog-preview", text: arg.previewButton, clickFn: function () {
                        var stack = KE.g[id].dialogStack;
                        if (stack[stack.length - 1] == self) {
                            if (arg.previewClickFn) {
                                arg.previewClickFn(id);
                            } else {
                                KE.plugin[arg.cmd].preview(id);
                            }
                        }
                    }
                });
                previewButton = btn.btn;
                bottomDiv.appendChild(btn.span);
            }
            if (arg.yesButton) {
                var btn = KE.button({
                    className: "ke-dialog-yes", text: arg.yesButton, clickFn: function () {
                        var stack = KE.g[id].dialogStack;
                        if (stack[stack.length - 1] == self) {
                            if (arg.yesClickFn) {
                                arg.yesClickFn(id);
                            } else {
                                KE.plugin[arg.cmd].exec(id);
                            }
                        }
                    }
                });
                yesButton = btn.btn;
                bottomDiv.appendChild(btn.span);
            }
            if (arg.noButton) {
                var btn = KE.button({
                    className: "ke-dialog-no", text: arg.noButton, clickFn: function () {
                        self.hide();
                        KE.util.select(id);
                    }
                });
                noButton = btn.btn;
                bottomDiv.appendChild(btn.span);
            }
            if (arg.yesButton || arg.noButton || arg.previewButton) {
                div.appendChild(bottomDiv);
            }
            document.body.appendChild(div);
            KE.event.bind(div, "mousedown", function (e) {
            }, id);
            window.focus();
            if (arg.html !== undefined) {
                var dialogDoc = KE.util.getIframeDoc(iframe);
                var html = KE.util.getFullHtml(id);
                dialogDoc.open();
                dialogDoc.write(html);
                dialogDoc.close();
                KE.util.innerHtml(dialogDoc.body, arg.html);
            } else {
                if (arg.url !== undefined) {
                    iframe.src = arg.url;
                } else {
                    var param = "id=" + escape(id) + "&ver=" + escape(KE.version);
                    if (arg.file === undefined) {
                        iframe.src = KE.g[id].pluginsPath + arg.cmd + ".html?" + param;
                    } else {
                        param = (/\?/.test(arg.file) ? "&" : "?") + param;
                        iframe.src = KE.g[id].pluginsPath + arg.file + param;
                    }
                }
            }
            KE.g[id].maskDiv.style.width = KE.util.getDocumentWidth() + "px";
            KE.g[id].maskDiv.style.height = KE.util.getDocumentHeight() + "px";
            KE.g[id].maskDiv.style.display = "block";
            this.iframe = iframe;
            this.loading = loadingTable.table;
            this.noButton = noButton;
            this.yesButton = yesButton;
            this.previewButton = previewButton;
            this.div = div;
            KE.g[id].dialogStack.push(this);
            KE.g[id].dialog = iframe;
            KE.g[id].yesButton = yesButton;
            KE.g[id].noButton = noButton;
            KE.g[id].previewButton = previewButton;
            if (!arg.loadingMode) {
                KE.util.hideLoadingPage(id);
            }
            if (this.afterShow) {
                this.afterShow(id);
            }
            if (KE.g[id].afterDialogCreate) {
                KE.g[id].afterDialogCreate(id);
            }
        };
    };
    KE.toolbar = {
        updateState: function (id) {
            var cmdList = ["justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "bold", "italic", "underline", "strikethrough"];
            for (var i = 0; i < cmdList.length; i++) {
                var cmd = cmdList[i];
                var state = false;
                try {
                    state = KE.g[id].iframeDoc.queryCommandState(cmd);
                } catch (e) {
                }
                if (state) {
                    KE.toolbar.select(id, cmd);
                } else {
                    KE.toolbar.unselect(id, cmd);
                }
            }
        }, isSelected: function (id, cmd) {
            if (KE.plugin[cmd] && KE.plugin[cmd].isSelected) {
                return true;
            } else {
                return false;
            }
        }, select: function (id, cmd) {
            if (KE.g[id].toolbarIcon[cmd]) {
                var a = KE.g[id].toolbarIcon[cmd][0];
                a.className = "ke-icon ke-icon-selected";
                a.onmouseover = null;
                a.onmouseout = null;
            }
        }, unselect: function (id, cmd) {
            if (KE.g[id].toolbarIcon[cmd]) {
                var a = KE.g[id].toolbarIcon[cmd][0];
                a.className = "ke-icon";
                a.onmouseover = function () {
                    this.className = "ke-icon ke-icon-on";
                };
                a.onmouseout = function () {
                    this.className = "ke-icon";
                };
            }
        }, _setAttr: function (id, a, cmd) {
            a.className = "ke-icon";
            a.href = "javascript:;";
            a.onclick = function (e) {
                e = e || window.event;
                var div = KE.g[id].hideDiv.firstChild;
                if (div && div.getAttribute("name") == cmd) {
                    KE.hideMenu(id);
                } else {
                    KE.util.click(id, cmd);
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.cancelBubble !== undefined) {
                    e.cancelBubble = true;
                }
                return false;
            };
            a.onmouseover = function () {
                this.className = "ke-icon ke-icon-on";
            };
            a.onmouseout = function () {
                this.className = "ke-icon";
            };
            a.hidefocus = true;
            a.title = KE.lang[cmd];
        }, able: function (id, arr) {
            var self = this;
            KE.each(KE.g[id].toolbarIcon, function (cmd, obj) {
                if (!KE.util.inArray(cmd, arr)) {
                    var a = obj[0];
                    var span = obj[1];
                    self._setAttr(id, a, cmd);
                    KE.util.setOpacity(span, 100);
                }
            });
        }, disable: function (id, arr) {
            KE.each(KE.g[id].toolbarIcon, function (cmd, obj) {
                if (!KE.util.inArray(cmd, arr)) {
                    var a = obj[0];
                    var span = obj[1];
                    a.className = "ke-icon ke-icon-disabled";
                    KE.util.setOpacity(span, 50);
                    a.onclick = null;
                    a.onmouseover = null;
                    a.onmouseout = null;
                }
            });
        }, create: function (id) {
            var self = this;
            var defaultItemHash = KE.util.arrayToHash(KE.setting.items);
            KE.g[id].toolbarIcon = [];
            var tableObj = KE.util.createTable();
            var toolbar = tableObj.table;
            toolbar.className = "ke-toolbar";
            toolbar.oncontextmenu = function () {
                return false;
            };
            toolbar.onmousedown = function () {
                return false;
            };
            toolbar.onmousemove = function () {
                return false;
            };
            var toolbarCell = tableObj.cell;
            var length = KE.g[id].items.length;
            var cellNum = 0;
            var row;
            KE.g[id].toolbarHeight = KE.g[id].toolbarLineHeight;
            for (var i = 0; i < length; i++) {
                var cmd = KE.g[id].items[i];
                if (i == 0 || cmd == "-") {
                    var table = KE.$$("table");
                    table.cellPadding = 0;
                    table.cellSpacing = 0;
                    table.border = 0;
                    table.className = "ke-toolbar-table";
                    row = table.insertRow(0);
                    cellNum = 0;
                    toolbarCell.appendChild(table);
                    if (cmd == "-") {
                        KE.g[id].toolbarHeight += KE.g[id].toolbarLineHeight;
                        continue;
                    }
                }
                var cell = row.insertCell(cellNum);
                cell.hideforcus = true;
                cellNum++;
                if (cmd == "|") {
                    var div = KE.$$("div");
                    div.className = "ke-toolbar-separator";
                    cell.appendChild(div);
                    continue;
                }
                var a = KE.$$("a");
                a.tabIndex = -1;
                self._setAttr(id, a, cmd);
                var span = KE.$$("span");
                if (typeof defaultItemHash[cmd] == "undefined") {
                    span.className = "ke-common-icon ke-icon-" + cmd;
                } else {
                    span.className = "ke-common-icon ke-common-icon-url ke-icon-" + cmd;
                }
                a.appendChild(span);
                cell.appendChild(a);
                KE.g[id].toolbarIcon[cmd] = [a, span];
                if (KE.toolbar.isSelected(id, cmd)) {
                    KE.toolbar.select(id, cmd);
                }
            }
            return toolbar;
        }
    };
    KE.history = {
        addStackData: function (stack, data) {
            var prev = "";
            if (stack.length > 0) {
                prev = stack[stack.length - 1];
            }
            if (stack.length == 0 || data !== prev) {
                stack.push(data);
            }
        }, add: function (id, minChangeSize) {
            var g = KE.g[id];
            var html = KE.util.getSrcData(id);
            if (g.undoStack.length > 0) {
                var prevHtml = g.undoStack[g.undoStack.length - 1];
                if (Math.abs(html.length - prevHtml.length) < minChangeSize) {
                    return;
                }
            }
            this.addStackData(g.undoStack, html);
        }, undo: function (id) {
            var g = KE.g[id];
            if (g.undoStack.length == 0) {
                return;
            }
            var html = KE.util.getSrcData(id);
            this.addStackData(g.redoStack, html);
            var prevHtml = g.undoStack.pop();
            if (html === prevHtml && g.undoStack.length > 0) {
                prevHtml = g.undoStack.pop();
            }
            prevHtml = KE.util.toData(id, prevHtml);
            if (g.wyswygMode) {
                KE.util.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, prevHtml));
            } else {
                g.newTextarea.value = prevHtml;
            }
        }, redo: function (id) {
            var g = KE.g[id];
            if (g.redoStack.length == 0) {
                return;
            }
            var html = KE.util.getSrcData(id);
            this.addStackData(g.undoStack, html);
            var nextHtml = g.redoStack.pop();
            nextHtml = KE.util.toData(id, nextHtml);
            if (g.wyswygMode) {
                KE.util.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, nextHtml));
            } else {
                g.newTextarea.value = nextHtml;
            }
        }
    };
    KE.readonly = function (id, isReadonly) {
        isReadonly = isReadonly == undefined ? true : isReadonly;
        var g = KE.g[id];
        if (KE.browser.IE) {
            g.iframeDoc.body.contentEditable = isReadonly ? "false" : "true";
        } else {
            g.iframeDoc.designMode = isReadonly ? "off" : "on";
        }
    };
    KE.focus = function (id, position) {
        position = (position || "").toLowerCase();
        if (!KE.g[id].container) {
            return;
        }
        KE.util.focus(id);
        if (position === "end") {
            KE.util.setSelection(id);
            if (!KE.g[id].sel) {
                return;
            }
            var sel = KE.g[id].keSel, range = KE.g[id].keRange, doc = KE.g[id].iframeDoc;
            range.selectTextNode(doc.body);
            range.collapse(false);
            sel.addRange(range);
        }
    };
    KE.blur = function (id) {
        var g = KE.g[id];
        if (!g.container) {
            return;
        }
        if (KE.browser.IE) {
            var input = KE.$$("input");
            input.type = "text";
            g.container.appendChild(input);
            input.focus();
            g.container.removeChild(input);
        } else {
            g.wyswygMode ? g.iframeWin.blur() : g.newTextarea.blur();
        }
    };
    KE.html = function (id, val) {
        if (val === undefined) {
            return KE.util.getData(id);
        } else {
            if (!KE.g[id].container) {
                return;
            }
            KE.util.setFullHtml(id, val);
            KE.focus(id);
        }
    };
    KE.text = function (id, val) {
        if (val === undefined) {
            val = KE.html(id);
            val = val.replace(/<.*?>/ig, "");
            val = val.replace(/&nbsp;/ig, " ");
            val = KE.util.trim(val);
            return val;
        } else {
            KE.html(id, KE.util.escape(val));
        }
    };
    KE.insertHtml = function (id, val) {
        if (!KE.g[id].container) {
            return;
        }
        var range = KE.g[id].range;
        if (!range) {
            KE.appendHtml(id, val);
        } else {
            KE.focus(id);
            KE.util.selection(id);
            KE.util.insertHtml(id, val);
        }
    };
    KE.appendHtml = function (id, val) {
        KE.html(id, KE.html(id) + val);
    };
    KE.isEmpty = function (id) {
        return KE.util.isEmpty(id);
    };
    KE.selectedHtml = function (id) {
        var range = KE.g[id].range;
        if (!range) {
            return "";
        }
        var html = "";
        if (KE.browser.IE) {
            if (range.item) {
                html = range.item(0).outerHTML;
            } else {
                html = range.htmlText;
            }
        } else {
            var temp = KE.$$("div", KE.g[id].iframeDoc);
            temp.appendChild(range.cloneContents());
            html = temp.innerHTML;
        }
        return KE.util.toData(id, html);
    };
    KE.count = function (id, mode) {
        mode = (mode || "html").toLowerCase();
        if (mode === "html") {
            return KE.html(id).length;
        } else {
            if (mode === "text") {
                var data = KE.util.getPureData(id);
                data = data.replace(/<(?:img|embed).*?>/ig, "K");
                data = data.replace(/\r\n|\n|\r/g, "");
                data = KE.util.trim(data);
                return data.length;
            }
        }
        return 0;
    };
    KE.sync = function (id) {
        return KE.util.setData(id);
    };
    KE.remove = function (id, mode) {
        var g = KE.g[id];
        if (!g.container) {
            return false;
        }
        mode = (typeof mode == "undefined") ? 0 : mode;
        KE.util.setData(id);
        var container = g.container;
        var eventStack = g.eventStack;
        for (var i = 0, len = eventStack.length; i < len; i++) {
            var item = eventStack[i];
            if (item) {
                KE.event.remove(item.el, item.type, item.fn, id);
            }
        }
        g.iframeDoc.src = "javascript:false";
        g.iframe.parentNode.removeChild(g.iframe);
        if (mode == 1) {
            document.body.removeChild(container);
        } else {
            var srcTextarea = g.srcTextarea;
            srcTextarea.parentNode.removeChild(container);
            if (mode == 0) {
                srcTextarea.style.display = "";
            }
        }
        document.body.removeChild(g.hideDiv);
        document.body.removeChild(g.maskDiv);
        g.container = null;
        g.dialogStack = [];
        g.contextmenuItems = [];
        g.getHtmlHooks = [];
        g.setHtmlHooks = [];
        g.onchangeHandlerStack = [];
        g.eventStack = [];
    };
    KE.create = function (id, mode) {
        if (KE.g[id].beforeCreate) {
            KE.g[id].beforeCreate(id);
        }
        if (KE.browser.IE && KE.browser.VERSION < 7) {
            try {
                document.execCommand("BackgroundImageCache", false, true);
            } catch (e) {
            }
        }
        var srcTextarea = KE.$(id) || document.getElementsByName(id)[0];
        mode = (typeof mode == "undefined") ? 0 : mode;
        if (mode == 0 && KE.g[id].container) {
            return;
        }
        var width = KE.g[id].width || srcTextarea.style.width || srcTextarea.offsetWidth + "px";
        var height = KE.g[id].height || srcTextarea.style.height || srcTextarea.offsetHeight + "px";
        var tableObj = KE.util.createTable();
        var container = tableObj.table;
        container.className = "ke-container";
        container.style.width = width;
        container.style.height = height;
        var toolbarOuter = tableObj.cell;
        toolbarOuter.className = "ke-toolbar-outer";
        var textareaOuter = container.insertRow(1).insertCell(0);
        textareaOuter.className = "ke-textarea-outer";
        tableObj = KE.util.createTable();
        var textareaTable = tableObj.table;
        textareaTable.className = "ke-textarea-table";
        var textareaCell = tableObj.cell;
        textareaOuter.appendChild(textareaTable);
        var bottomOuter = container.insertRow(2).insertCell(0);
        bottomOuter.className = "ke-bottom-outer";
        srcTextarea.style.display = "none";
        if (mode == 1) {
            document.body.appendChild(container);
        } else {
            srcTextarea.parentNode.insertBefore(container, srcTextarea);
        }
        var toolbarTable = KE.toolbar.create(id);
        toolbarTable.style.height = KE.g[id].toolbarHeight + "px";
        toolbarOuter.appendChild(toolbarTable);
        var iframe = KE.g[id].iframe || KE.$$("iframe");
        iframe.tabIndex = KE.g[id].tabIndex || srcTextarea.tabIndex;
        iframe.className = "ke-iframe";
        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        if (isIE6) {
            iframe.src = "/html/blank.html";
        }
        iframe.setAttribute("frameBorder", "0");
        var newTextarea = KE.$$("textarea");
        newTextarea.tabIndex = iframe.tabIndex;
        newTextarea.className = "ke-textarea";
        newTextarea.style.display = "none";
        KE.g[id].container = container;
        KE.g[id].iframe = iframe;
        KE.g[id].newTextarea = newTextarea;
        KE.util.resize(id, width, height);
        textareaCell.appendChild(iframe);
        textareaCell.appendChild(newTextarea);
        var bottom = KE.$$("table");
        bottom.className = "ke-bottom";
        bottom.cellPadding = 0;
        bottom.cellSpacing = 0;
        bottom.border = 0;
        bottom.style.height = KE.g[id].statusbarHeight + "px";
        var row = bottom.insertRow(0);
        var bottomLeft = row.insertCell(0);
        bottomLeft.className = "ke-bottom-left";
        var leftImg = KE.$$("span");
        leftImg.className = "ke-bottom-left-img";
        if (KE.g[id].config.resizeMode == 0 || mode == 1) {
            bottomLeft.style.cursor = "default";
            leftImg.style.visibility = "hidden";
        }
        bottomLeft.appendChild(leftImg);
        var bottomRight = row.insertCell(1);
        bottomRight.className = "ke-bottom-right";
        var rightImg = KE.$$("span");
        rightImg.className = "ke-bottom-right-img";
        if (KE.g[id].config.resizeMode == 0 || mode == 1) {
            bottomRight.style.cursor = "default";
            rightImg.style.visibility = "hidden";
        } else {
            if (KE.g[id].config.resizeMode == 1) {
                bottomRight.style.cursor = "s-resize";
                rightImg.style.visibility = "hidden";
            }
        }
        bottomRight.appendChild(rightImg);
        bottomOuter.appendChild(bottom);
        var hideDiv = KE.$$("div");
        hideDiv.className = "ke-reset";
        hideDiv.style.display = "none";
        var maskDiv = KE.$$("div");
        maskDiv.className = "ke-mask";
        KE.util.setOpacity(maskDiv, 50);
        KE.event.bind(maskDiv, "click", function (e) {
        }, id);
        KE.event.bind(maskDiv, "mousedown", function (e) {
        }, id);
        document.body.appendChild(hideDiv);
        document.body.appendChild(maskDiv);
        KE.util.setDefaultPlugin(id);
        var iframeWin = iframe.contentWindow;
        var iframeDoc = KE.util.getIframeDoc(iframe);
        if (!KE.browser.IE) {
            iframeDoc.designMode = "on";
        }
        var html = KE.util.getFullHtml(id);
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
        if (!KE.g[id].wyswygMode) {
            newTextarea.value = KE.util.execSetHtmlHooks(id, srcTextarea.value);
            newTextarea.style.display = "block";
            iframe.style.display = "none";
            KE.toolbar.disable(id, ["source", "fullscreen"]);
            KE.toolbar.select(id, "source");
        }
        if (KE.g[id].syncType == "form") {
            var el = srcTextarea;
            while ((el = el.parentNode)) {
                if (el.nodeName.toLowerCase() == "form") {
                    KE.event.add(el, "submit", function () {
                        KE.sync(id);
                    }, id);
                    break;
                }
            }
        }

        function hideMenu() {
            KE.hideMenu(id);
        }

        function updateToolbar() {
            KE.toolbar.updateState(id);
        }

        if (KE.browser.WEBKIT) {
            KE.event.add(iframeDoc, "click", function (e) {
                KE.util.selectImageWebkit(id, e, true);
            }, id);
        }
        if (KE.browser.IE) {
            KE.event.add(iframeDoc, "keydown", function (e) {
                if (e.keyCode == 8) {
                    var range = KE.g[id].range;
                    if (range.item) {
                        var item = range.item(0);
                        item.parentNode.removeChild(item);
                        KE.util.execOnchangeHandler(id);
                        KE.event.stop(id);
                        return false;
                    }
                }
            }, id);
        }

        function afterFocus() {
            if (KE.g[id].afterFocus) {
                KE.g[id].afterFocus(id);
            }
        }

        function afterBlur() {
            if (KE.g[id].afterBlur) {
                KE.g[id].afterBlur(id);
            }
        }

        KE.event.add(iframeDoc, "mousedown", hideMenu, id);
        KE.event.add(iframeDoc, "click", updateToolbar, id);
        KE.event.input(iframeDoc, updateToolbar, id);
        KE.event.bind(newTextarea, "click", hideMenu, id);
        KE.event.add(document, "click", hideMenu, id);
        KE.event.add(iframeWin, "focus", afterFocus);
        KE.event.add(newTextarea, "focus", afterFocus);
        KE.event.add(iframeWin, "blur", afterBlur);
        KE.event.add(newTextarea, "blur", afterBlur);
        KE.g[id].toolbarTable = toolbarTable;
        KE.g[id].textareaTable = textareaTable;
        KE.g[id].srcTextarea = srcTextarea;
        KE.g[id].bottom = bottom;
        KE.g[id].hideDiv = hideDiv;
        KE.g[id].maskDiv = maskDiv;
        KE.g[id].iframeWin = iframeWin;
        KE.g[id].iframeDoc = iframeDoc;
        KE.g[id].width = width;
        KE.g[id].height = height;
        KE.util.drag(id, bottomRight, container, function (objTop, objLeft, objWidth, objHeight, top, left) {
            if (KE.g[id].resizeMode == 2) {
                KE.util.resize(id, (objWidth + left) + "px", (objHeight + top) + "px", true);
            } else {
                if (KE.g[id].resizeMode == 1) {
                    KE.util.resize(id, objWidth + "px", (objHeight + top) + "px", true, false);
                }
            }
        });
        KE.util.drag(id, bottomLeft, container, function (objTop, objLeft, objWidth, objHeight, top, left) {
            if (KE.g[id].resizeMode > 0) {
                KE.util.resize(id, objWidth + "px", (objHeight + top) + "px", true, false);
            }
        });
        KE.each(KE.plugin, function (cmd, plugin) {
            if (plugin.init) {
                plugin.init(id);
            }
        });
        KE.g[id].getHtmlHooks.push(function (html) {
            html = html.replace(/(<[^>]*)kesrc="([^"]+)"([^>]*>)/ig, function (full, start, src, end) {
                full = full.replace(/(\s+(?:href|src)=")[^"]+(")/i, "$1" + src + "$2");
                full = full.replace(/\s+kesrc="[^"]+"/i, "");
                return full;
            });
            html = html.replace(/(<[^>]+\s)ke-(on\w+="[^"]+"[^>]*>)/ig, function (full, start, end) {
                return start + end;
            });
            return html;
        });
        KE.g[id].setHtmlHooks.push(function (html) {
            html = html.replace(/(<[^>]*)(href|src)="([^"]+)"([^>]*>)/ig, function (full, start, key, src, end) {
                if (full.match(/\skesrc="[^"]+"/i)) {
                    return full;
                }
                full = start + key + '="' + src + '" kesrc="' + src + '"' + end;
                return full;
            });
            html = html.replace(/(<[^>]+\s)(on\w+="[^"]+"[^>]*>)/ig, function (full, start, end) {
                return start + "ke-" + end;
            });
            return html;
        });
        KE.util.addContextmenuEvent(id);
        KE.util.addNewlineEvent(id);
        KE.util.addTabEvent(id);

        function setSelectionHandler() {
            KE.util.setSelection(id);
        }

        KE.event.input(iframeDoc, setSelectionHandler, id);
        KE.event.add(iframeDoc, "mouseup", setSelectionHandler, id);
        KE.event.add(document, "mousedown", setSelectionHandler, id);
        KE.onchange(id, function (id) {
            if (KE.g[id].autoSetDataMode || KE.g[id].syncType == "auto") {
                KE.util.setData(id);
                if (KE.g[id].afterSetData) {
                    KE.g[id].afterSetData(id);
                }
            }
            if (KE.g[id].afterChange) {
                KE.g[id].afterChange(id);
            }
            KE.history.add(id, KE.g[id].minChangeSize);
        });
        if (KE.browser.IE) {
            iframeDoc.body.disabled = true;
            KE.readonly(id, false);
            iframeDoc.body.removeAttribute("disabled");
        }
        KE.util.setFullHtml(id, srcTextarea.value);
        KE.history.add(id, 0);
        if (mode > 0) {
            KE.util.focus(id);
        }
        if (KE.g[id].afterCreate) {
            KE.g[id].afterCreate(id);
        }
        KE.g[id].hasCreated = true;
        if (!KE.g[id].pasteHtml) {
            KE.event.ctrl(KE.g[id].iframeDoc, "V", function (e) {
                if (KE.browser.IE && KE.browser.VERSION > 6) {
                    KE.plugin.plainpaste.click(id);
                } else {
                    KE.plugin.pastetextfromword.click(id);
                }
            });
        }
    };
    KE.onchange = function (id, func) {
        var g = KE.g[id];

        function handler() {
            func(id);
        }

        g.onchangeHandlerStack.push(handler);
        KE.event.input(g.iframeDoc, handler, id);
        KE.event.input(g.newTextarea, handler, id);
        KE.event.add(g.iframeDoc, "mouseup", function (e) {
            window.setTimeout(function () {
                func(id);
            }, 0);
        }, id);
    };
    var _needStyle = true;
    KE.init = function (args) {
        var g = KE.g[args.id] = args;
        g.config = {};
        g.undoStack = [];
        g.redoStack = [];
        g.dialogStack = [];
        g.contextmenuItems = [];
        g.getHtmlHooks = [];
        g.setHtmlHooks = [];
        g.onchangeHandlerStack = [];
        g.eventStack = [];
        KE.each(KE.setting, function (key, val) {
            g[key] = (typeof args[key] == "undefined") ? val : args[key];
            g.config[key] = g[key];
        });
        if (g.loadStyleMode && _needStyle) {
            KE.util.loadStyle(g.skinsPath + g.skinType + ".css?v=2");
            _needStyle = false;
        }
    };
    KE.show = function (args) {
        KE.init(args);
        KE.event.ready(function () {
            KE.create(args.id);
        });
    };
    if (window.KE === undefined) {
        window.KE = KE;
    }
    window.KindEditor = KE;
})();
(function (b, c) {
    b.langType = "zh_CN";
    b.lang = {
        source: "HTML代码",
        undo: "后退(Ctrl+Z)",
        redo: "前进(Ctrl+Y)",
        cut: "剪切(Ctrl+X)",
        copy: "复制(Ctrl+C)",
        paste: "粘贴(Ctrl+V)",
        plainpaste: "粘贴为无格式文本",
        wordpaste: "从Word粘贴",
        selectall: "全选",
        justifyleft: "左对齐",
        justifycenter: "居中",
        justifyright: "右对齐",
        justifyfull: "两端对齐",
        insertorderedlist: "编号",
        insertunorderedlist: "项目符号",
        indent: "增加缩进",
        outdent: "减少缩进",
        subscript: "下标",
        superscript: "上标",
        title: "标题",
        fontname: "字体",
        fontsize: "文字大小",
        textcolor: "文字颜色",
        bgcolor: "文字背景",
        bold: "粗体(Ctrl+B)",
        italic: "斜体(Ctrl+I)",
        underline: "下划线(Ctrl+U)",
        strikethrough: "删除线",
        removeformat: "删除格式",
        image: "图片",
        flash: "插入音频视频",
        media: "插入多媒体",
        table: "插入表格",
        hr: "插入横线",
        emoticons: "插入表情",
        link: "超级链接",
        unlink: "取消超级链接",
        fullscreen: "全屏显示",
        about: "关于",
        print: "打印",
        fileManager: "浏览服务器",
        advtable: "表格",
        tablecell: "单元格",
        yes: "确定",
        no: "取消",
        close: "关闭",
        editImage: "图片属性",
        deleteImage: "删除图片",
        editLink: "超级链接属性",
        deleteLink: "取消超级链接",
        tableprop: "表格属性",
        tablecellprop: "单元格属性",
        tableinsert: "插入表格",
        tabledelete: "删除表格",
        tablecolinsertleft: "左侧插入列",
        tablecolinsertright: "右侧插入列",
        tablerowinsertabove: "上方插入行",
        tablerowinsertbelow: "下方插入行",
        tablecoldelete: "删除列",
        tablerowdelete: "删除行",
        noColor: "无颜色",
        invalidImg: "请输入有效的URL地址。\n只允许jpg,gif,bmp,png格式。",
        invalidMedia: "请输入有效的URL地址。\n只允许swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb格式。",
        invalidWidth: "宽度必须为数字。",
        invalidHeight: "高度必须为数字。",
        invalidBorder: "边框必须为数字。",
        invalidUrl: "请输入有效的URL地址。",
        invalidRows: "行数为必选项，只允许输入大于0的数字。",
        invalidCols: "列数为必选项，只允许输入大于0的数字。",
        invalidPadding: "边距必须为数字。",
        invalidSpacing: "间距必须为数字。",
        invalidBorder: "边框必须为数字。",
        pleaseInput: "请输入内容。",
        invalidJson: "服务器发生故障。",
        cutError: "您的浏览器安全设置不允许使用剪切操作，请使用快捷键(Ctrl+X)来完成。",
        copyError: "您的浏览器安全设置不允许使用复制操作，请使用快捷键(Ctrl+C)来完成。",
        pasteError: "您的浏览器安全设置不允许使用粘贴操作，请使用快捷键(Ctrl+V)来完成。"
    };
    var a = b.lang.plugins = {};
    a.about = {version: b.version, title: "HTML可视化编辑器"};
    a.plainpaste = {comment: "请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。"};
    a.wordpaste = {comment: "请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。"};
    a.link = {url: "URL地址", linkType: "打开类型", newWindow: "新窗口", selfWindow: "当前窗口"};
    a.flash = {url: "音频视频通用地址(推荐插入腾讯视频的通用代码或七牛的音视频外链)", width: "宽度", height: "高度", autostart: "自动播放（限腾讯视频且在PC端有效）"};
    a.media = {url: "媒体文件地址", width: "宽度", height: "高度", autostart: "自动播放"};
    a.image = {
        remoteImage: "远程图片",
        localImage: "本地上传",
        remoteUrl: "图片地址",
        localUrl: "图片地址",
        size: "图片大小",
        width: "宽",
        height: "高",
        resetSize: "重置大小",
        align: "对齐方式",
        defaultAlign: "默认方式",
        leftAlign: "左对齐",
        rightAlign: "右对齐",
        imgTitle: "图片说明",
        viewServer: "浏览..."
    };
    a.file_manager = {
        emptyFolder: "空文件夹",
        moveup: "移到上一级文件夹",
        viewType: "显示方式：",
        viewImage: "缩略图",
        listImage: "详细信息",
        orderType: "排序方式：",
        fileName: "名称",
        fileSize: "大小",
        fileType: "类型"
    };
    a.advtable = {
        cells: "单元格数",
        rows: "行数",
        cols: "列数",
        size: "大小",
        width: "宽度",
        height: "高度",
        percent: "%",
        px: "px",
        space: "边距间距",
        padding: "边距",
        spacing: "间距",
        align: "对齐方式",
        textAlign: "水平对齐",
        verticalAlign: "垂直对齐",
        alignDefault: "默认",
        alignLeft: "左对齐",
        alignCenter: "居中",
        alignRight: "右对齐",
        alignTop: "顶部",
        alignMiddle: "中部",
        alignBottom: "底部",
        alignBaseline: "基线",
        border: "边框",
        borderWidth: "边框",
        borderColor: "颜色",
        backgroundColor: "背景颜色"
    };
    a.title = {h1: "标题 1", h2: "标题 2", h3: "标题 3", h4: "标题 4", p: "正 文"};
    a.fontname = {
        fontName: {
            SimSun: "宋体",
            NSimSun: "新宋体",
            FangSong_GB2312: "仿宋_GB2312",
            KaiTi_GB2312: "楷体_GB2312",
            SimHei: "黑体",
            "Microsoft YaHei": "微软雅黑",
            Arial: "Arial",
            "Arial Black": "Arial Black",
            "Times New Roman": "Times New Roman",
            "Courier New": "Courier New",
            Tahoma: "Tahoma",
            Verdana: "Verdana"
        }
    };
})(KindEditor);
(function (a, d) {
    a.plugin.about = {
        click: function (f) {
            a.util.selection(f);
            var e = new a.dialog({
                id: f,
                cmd: "about",
                file: "about.html",
                width: 300,
                height: 70,
                loadingMode: true,
                title: a.lang.about,
                noButton: a.lang.close
            });
            e.show();
        }
    };
    a.plugin.undo = {
        init: function (e) {
            a.event.ctrl(a.g[e].iframeDoc, "Z", function (f) {
                a.plugin.undo.click(e);
                a.util.focus(e);
            }, e);
            a.event.ctrl(a.g[e].newTextarea, "Z", function (f) {
                a.plugin.undo.click(e);
                a.util.focus(e);
            }, e);
        }, click: function (e) {
            a.history.undo(e);
            a.util.execOnchangeHandler(e);
        }
    };
    a.plugin.redo = {
        init: function (e) {
            a.event.ctrl(a.g[e].iframeDoc, "Y", function (f) {
                a.plugin.redo.click(e);
                a.util.focus(e);
            }, e);
            a.event.ctrl(a.g[e].newTextarea, "Y", function (f) {
                a.plugin.redo.click(e);
                a.util.focus(e);
            }, e);
        }, click: function (e) {
            a.history.redo(e);
            a.util.execOnchangeHandler(e);
        }
    };
    a.plugin.cut = {
        click: function (g) {
            try {
                if (!a.g[g].iframeDoc.queryCommandSupported("cut")) {
                    throw"e";
                }
            } catch (f) {
                alert(a.lang.cutError);
                return;
            }
            a.util.execCommand(g, "cut", null);
        }
    };
    a.plugin.copy = {
        click: function (g) {
            try {
                if (!a.g[g].iframeDoc.queryCommandSupported("copy")) {
                    throw"e";
                }
            } catch (f) {
                alert(a.lang.copyError);
                return;
            }
            a.util.execCommand(g, "copy", null);
        }
    };
    a.plugin.paste = {
        click: function (g) {
            try {
                if (!a.g[g].iframeDoc.queryCommandSupported("paste")) {
                    throw"e";
                }
            } catch (f) {
                alert(a.lang.pasteError);
                return;
            }
            a.util.execCommand(g, "paste", null);
        }
    };
    var b = false;
    a.plugin.pastetextfromword = {
        click: function (h) {
            a.util.selection(h);
            if (window.clipboardData) {
                var g = "";
                try {
                    g = clipboardData.getData("Text");
                    g = g.replace(/&/g, "&amp;");
                    g = g.replace(/</g, "&lt;");
                    g = g.replace(/>/g, "&gt;");
                    g = g.replace(/\r\n|\n|\r/g, "<br />");
                    g = a.removeWord(g);
                    a.util.insertHtml(h, g);
                } catch (f) {
                    a.plugin.plainpaste.click(h);
                }
            } else {
                a.plugin.plainpaste.click(h);
            }
        }
    };
    a.plugin.plainpaste = {
        click: function (e) {
            a.util.selection(e);
            this.dialog = new a.dialog({
                id: e,
                cmd: "plainpaste",
                file: "plainpaste.html",
                width: 450,
                height: 300,
                loadingMode: true,
                title: a.lang.plainpaste,
                yesButton: a.lang.yes,
                noButton: a.lang.no
            });
            this.dialog.show();
        }, exec: function (g) {
            var e = a.util.getIframeDoc(this.dialog.iframe);
            var f = a.$("textArea", e).value;
            f = a.util.escape(f);
            if (a.g[g].newlineTag == "p") {
                f = f.replace(/^/, "<p>").replace(/$/, "</p>").replace(/\r\n|\n|\r/g, "</p><p>");
            } else {
                f = f.replace(/\r\n|\n|\r/g, "<br />");
            }
            a.util.insertHtml(g, f);
            this.dialog.hide();
            a.util.focus(g);
        }
    };
    a.plugin.wordpaste = {
        click: function (e) {
            a.util.selection(e);
            this.dialog = new a.dialog({
                id: e,
                cmd: "wordpaste",
                file: "wordpaste.html",
                width: 450,
                height: 300,
                loadingMode: true,
                title: a.lang.wordpaste,
                yesButton: a.lang.yes,
                noButton: a.lang.no
            });
            this.dialog.show();
        }, exec: function (h) {
            var f = a.util.getIframeDoc(this.dialog.iframe);
            var e = a.$("wordIframe", f);
            var g = a.util.getIframeDoc(e).body.innerHTML;
            g = a.removeWord(g);
            g = a.util.execGetHtmlHooks(h, g);
            g = a.format.getHtml(g, a.g[h].htmlTags, a.g[h].urlType);
            a.util.insertHtml(h, g);
            this.dialog.hide();
            a.util.focus(h);
        }
    };
    a.plugin.fullscreen = {
        click: function (m) {
            var j = a.g[m];
            var f = this;
            var i = function () {
                var g = a.util.getDocumentElement();
                j.width = g.clientWidth + "px";
                j.height = g.clientHeight + "px";
            };
            var h = "";
            var e = function () {
                if (!f.isSelected) {
                    return;
                }
                var n = a.util.getDocumentElement();
                var g = [n.clientWidth, n.clientHeight].join("");
                if (h != g) {
                    h = g;
                    i();
                    a.util.resize(m, j.width, j.height);
                }
            };
            if (this.isSelected) {
                this.isSelected = false;
                a.util.setData(m);
                a.remove(m, 1);
                j.width = this.width;
                j.height = this.height;
                a.create(m, 2);
                document.body.parentNode.style.overflow = "auto";
                a.event.remove(window, "resize", e);
                j.resizeMode = j.config.resizeMode;
                a.toolbar.unselect(m, "fullscreen");
            } else {
                this.isSelected = true;
                this.width = j.container.style.width;
                this.height = j.container.style.height;
                a.util.setData(m);
                a.remove(m, 2);
                document.body.parentNode.style.overflow = "hidden";
                i();
                a.create(m, 1);
                var l = a.util.getScrollPos();
                var k = j.container;
                k.style.position = "absolute";
                k.style.left = l.x + "px";
                k.style.top = l.y + "px";
                k.style.zIndex = 19811211;
                a.event.add(window, "resize", e);
                j.resizeMode = 0;
                a.toolbar.select(m, "fullscreen");
            }
        }
    };
    a.plugin.bgcolor = {
        click: function (f) {
            a.util.selection(f);
            var e = a.queryCommandValue(a.g[f].iframeDoc, "bgcolor");
            this.menu = new a.menu({id: f, cmd: "bgcolor"});
            this.menu.picker(e);
        }, exec: function (g, f) {
            var e = new a.cmd(g);
            if (f == "") {
                e.remove({span: [".background-color"]});
            } else {
                e.wrap("span", [{".background-color": f}]);
            }
            a.util.execOnchangeHandler(g);
            this.menu.hide();
            a.util.focus(g);
        }
    };
    a.plugin.fontname = {
        click: function (i) {
            var f = a.lang.plugins.fontname.fontName;
            var g = "fontname";
            a.util.selection(i);
            var h = new a.menu({id: i, cmd: g, width: 150});
            var e = a.queryCommandValue(a.g[i].iframeDoc, g);
            a.each(f, function (k, l) {
                var j = '<span class="ke-reset" style="font-family: ' + k + ';">' + l + "</span>";
                h.add(j, function () {
                    a.plugin[g].exec(i, k);
                }, {checked: (e === k.toLowerCase() || e === l.toLowerCase())});
            });
            h.show();
            this.menu = h;
        }, exec: function (g, f) {
            var e = new a.cmd(g);
            e.wrap("span", [{".font-family": f}]);
            a.util.execOnchangeHandler(g);
            this.menu.hide();
            a.util.focus(g);
        }
    };
    a.plugin.fontsize = {
        click: function (e) {
            var m = ["9px", "10px", "12px", "14px", "16px", "18px", "24px", "32px"];
            var g = "fontsize";
            a.util.selection(e);
            var n = a.queryCommandValue(a.g[e].iframeDoc, "fontsize");
            var f = new a.menu({id: e, cmd: g, width: 120});
            for (var h = 0, k = m.length; h < k; h++) {
                var l = m[h];
                var j = '<span class="ke-reset" style="font-size: ' + l + ';">' + l + "</span>";
                f.add(j, (function (i) {
                    return function () {
                        a.plugin[g].exec(e, i);
                    };
                })(l), {height: (parseInt(l) + 12) + "px", checked: (n === l)});
            }
            f.show();
            this.menu = f;
        }, exec: function (g, f) {
            var e = new a.cmd(g);
            e.wrap("span", [{".font-size": f}]);
            a.util.execOnchangeHandler(g);
            this.menu.hide();
            a.util.focus(g);
        }
    };
    a.plugin.hr = {
        click: function (e) {
            a.util.selection(e);
            a.util.insertHtml(e, "<hr />");
            a.util.focus(e);
        }
    };
    a.plugin.print = {
        click: function (e) {
            a.util.selection(e);
            a.g[e].iframeWin.print();
        }
    };
    a.plugin.removeformat = {
        click: function (j) {
            a.util.selection(j);
            var h = new a.cmd(j);
            var f = {"*": ["class", "style"]};
            for (var g = 0, e = a.g[j].inlineTags.length; g < e; g++) {
                f[a.g[j].inlineTags[g]] = ["*"];
            }
            h.remove(f);
            a.util.execOnchangeHandler(j);
            a.toolbar.updateState(j);
            a.util.focus(j);
        }
    };
    a.plugin.source = {
        click: function (f) {
            var e = a.g[f];
            if (!e.wyswygMode) {
                a.util.setFullHtml(f, e.newTextarea.value);
                e.iframe.style.display = "block";
                e.newTextarea.style.display = "none";
                a.toolbar.able(f, ["source", "fullscreen"]);
                e.wyswygMode = true;
                this.isSelected = false;
                a.toolbar.unselect(f, "source");
            } else {
                a.hideMenu(f);
                e.newTextarea.value = a.util.getData(f);
                e.iframe.style.display = "none";
                e.newTextarea.style.display = "block";
                a.toolbar.disable(f, ["source", "fullscreen"]);
                e.wyswygMode = false;
                this.isSelected = true;
                a.toolbar.select(f, "source");
            }
            a.util.focus(f);
        }
    };
    a.plugin.textcolor = {
        click: function (f) {
            a.util.selection(f);
            var e = a.queryCommandValue(a.g[f].iframeDoc, "textcolor");
            this.menu = new a.menu({id: f, cmd: "textcolor"});
            this.menu.picker(e);
        }, exec: function (g, f) {
            var e = new a.cmd(g);
            if (f == "") {
                e.remove({span: [".color"], font: ["color"]});
            } else {
                e.wrap("span", [{".color": f}]);
            }
            a.util.execOnchangeHandler(g);
            this.menu.hide();
            a.util.focus(g);
        }
    };
    a.plugin.title = {
        click: function (k) {
            var j = a.lang.plugins.title;
            var i = {H1: j.h1, H2: j.h2, H3: j.h3, H4: j.h4, P: j.p};
            var f = {H1: 28, H2: 24, H3: 18, H4: 14, P: 12};
            var e = "title";
            a.util.selection(k);
            var h = a.queryCommandValue(a.g[k].iframeDoc, "formatblock");
            var g = new a.menu({id: k, cmd: e, width: (a.langType == "en" ? 200 : 150)});
            a.each(i, function (m, o) {
                var n = "font-size:" + f[m] + "px;";
                if (m !== "P") {
                    n += "font-weight:bold;";
                }
                var l = '<span class="ke-reset" style="' + n + '">' + o + "</span>";
                g.add(l, function () {
                    a.plugin[e].exec(k, "<" + m + ">");
                }, {height: (f[m] + 12) + "px", checked: (h === m.toLowerCase() || h === o.toLowerCase())});
            });
            g.show();
            this.menu = g;
        }, exec: function (f, e) {
            a.util.select(f);
            a.util.execCommand(f, "formatblock", e);
            this.menu.hide();
            a.util.focus(f);
        }
    };
    a.plugin.emoticons = {
        click: function (t) {
            var r = this, v = "emoticons", n = 5, o = 9, z = 135, h = 0, j = n * o, p = Math.ceil(z / j),
                y = Math.floor(o / 2), w = a.g[t], s = w.pluginsPath + "emoticons/",
                q = (w.allowPreviewEmoticons === d) ? true : w.allowPreviewEmoticons;
            a.util.selection(t);
            var i = a.$$("div");
            i.className = "ke-plugin-emoticons-wrapper";
            var u, k;
            if (q) {
                u = a.$$("div");
                u.className = "ke-plugin-emoticons-preview";
                u.style.right = 0;
                var k = a.$$("img");
                k.className = "ke-reset";
                k.src = s + "0.gif";
                k.border = 0;
                u.appendChild(k);
                i.appendChild(u);
            }

            function l(F) {
                var E = a.$$("table");
                if (u) {
                    E.onmouseover = function () {
                        u.style.display = "block";
                    };
                    E.onmouseout = function () {
                        u.style.display = "none";
                    };
                }
                E.className = "ke-plugin-emoticons-table";
                E.cellPadding = 0;
                E.cellSpacing = 0;
                E.border = 0;
                var B = (F - 1) * j + h;
                for (var C = 0; C < n; C++) {
                    var G = E.insertRow(C);
                    for (var A = 0; A < o; A++) {
                        var g = G.insertCell(A);
                        g.className = "ke-plugin-emoticons-cell";
                        if (u) {
                            g.onmouseover = (function (I, H) {
                                return function () {
                                    if (I > y) {
                                        u.style.left = 0;
                                        u.style.right = "";
                                    } else {
                                        u.style.left = "";
                                        u.style.right = 0;
                                    }
                                    k.src = s + H + ".gif";
                                    this.className = "ke-plugin-emoticons-cell ke-plugin-emoticons-cell-on";
                                };
                            })(A, B);
                        } else {
                            g.onmouseover = function () {
                                this.className = "ke-plugin-emoticons-cell ke-plugin-emoticons-cell-on";
                            };
                        }
                        g.onmouseout = function () {
                            this.className = "ke-plugin-emoticons-cell";
                        };
                        g.onclick = (function (H) {
                            return function () {
                                r.exec(t, H);
                                return false;
                            };
                        })(B);
                        var D = a.$$("span");
                        D.className = "ke-plugin-emoticons-img";
                        D.style.backgroundPosition = "-" + (24 * B) + "px 0px";
                        g.appendChild(D);
                        B++;
                    }
                }
                return E;
            }

            var x = l(1);
            i.appendChild(x);
            var f = a.$$("div");
            f.className = "ke-plugin-emoticons-page";
            i.appendChild(f);

            function m(A) {
                for (var B = 1; B <= p; B++) {
                    if (A !== B) {
                        var g = a.$$("a");
                        g.href = "javascript:;";
                        g.innerHTML = "[" + B + "]";
                        g.onclick = (function (C) {
                            return function () {
                                i.removeChild(x);
                                var D = l(C);
                                i.insertBefore(D, f);
                                x = D;
                                f.innerHTML = "";
                                m(C);
                                return false;
                            };
                        })(B);
                        f.appendChild(g);
                    } else {
                        f.appendChild(document.createTextNode("[" + B + "]"));
                    }
                    f.appendChild(document.createTextNode(" "));
                }
            }

            m(1);
            var e = new a.menu({id: t, cmd: v});
            e.append(i);
            e.show();
            this.menu = e;
        }, exec: function (h, e) {
            var g = a.g[h].pluginsPath + "emoticons/" + e + ".gif";
            var f = '<img src="' + g + '" kesrc="' + g + '" alt="" />';
            a.util.insertHtml(h, f);
            this.menu.hide();
            a.util.focus(h);
        }
    };
    a.plugin.flash = {
        init: function (f) {
            var e = this;
            a.g[f].getHtmlHooks.push(function (g) {
                return g.replace(/<img[^>]*class="?ke-flash"?[^>]*>/ig, function (k) {
                    var j = k.match(/style="[^"]*;?\s*width:\s*(\d+)/i) ? RegExp.$1 : 0;
                    var h = k.match(/style="[^"]*;?\s*height:\s*(\d+)/i) ? RegExp.$1 : 0;
                    j = j || (k.match(/width="([^"]+)"/i) ? RegExp.$1 : 0);
                    h = h || (k.match(/height="([^"]+)"/i) ? RegExp.$1 : 0);
                    if (k.match(/kesrctag="([^"]+)"/i)) {
                        var i = a.util.getAttrList(unescape(RegExp.$1));
                        i.width = j || i.width || 0;
                        i.height = h || i.height || 0;
                        i.kesrc = i.src;
                        return a.util.getMediaEmbed(i);
                    }
                });
            });
            a.g[f].setHtmlHooks.push(function (g) {
                return g.replace(/<embed[^>]*type="application\/x-shockwave-flash"[^>]*>(?:<\/embed>)?/ig, function (i) {
                    var l = i.match(/\s+src="([^"]+)"/i) ? RegExp.$1 : "";
                    if (i.match(/\s+kesrc="([^"]+)"/i)) {
                        l = RegExp.$1;
                    }
                    var k = i.match(/\s+width="([^"]+)"/i) ? RegExp.$1 : 0;
                    var h = i.match(/\s+height="([^"]+)"/i) ? RegExp.$1 : 0;
                    var j = a.util.getAttrList(i);
                    j.src = l;
                    j.width = k;
                    j.height = h;
                    return a.util.getMediaImage(f, "flash", j);
                });
            });
        }, click: function (e) {
            a.util.selection(e);
            this.dialog = new a.dialog({
                id: e,
                cmd: "flash",
                file: "video.aspx",
                width: 500,
                height: 130,
                loadingMode: true,
                title: a.lang.flash,
                yesButton: a.lang.yes,
                noButton: a.lang.no
            });
            this.dialog.show();
        }, check: function (i, g, h, e) {
            var f = a.util.getIframeDoc(this.dialog.iframe);
            if (!g.match(/^.{3,}$/)) {
                alert(a.lang.invalidUrl);
                a.$("url", f).focus();
                return false;
            }
            return true;
        }, exec: function (h) {
            var k = a.util.getIframeDoc(this.dialog.iframe);
            var e = a.$("url", k).value;
            var n = e;
            if (e.indexOf("<iframe") == -1) {
                var q = e.indexOf(".clouddn.com/") > -1 || e.indexOf(".qnssl.com/") || e.indexOf(".paperol.cn/");
                if (!q) {
                    alert("请复制通用代码插入视频，如有疑问请按帮助进行操作！");
                    return false;
                } else {
                    var m = e.indexOf(".mp3") > -1 || e.indexOf(".wav") > -1;
                    var j = "";
                    if (m) {
                        j = '<audio src="' + e + '"  controls="controls" controlsList="nodownload"></audio>';
                    } else {
                        j = ' <video src="' + e + '"  width="320" height="240" controls="controls" controlsList="nodownload">Your browser does not support the video tag.</video>';
                    }
                    a.util.insertHtml(h, j);
                    this.dialog.hide();
                    a.util.focus(h);
                    return;
                }
            }
            var l = /(https?:\/\/[^\s\"\']+)/g;
            var i = e.match(l);
            if (!i) {
                i = e.match(/(\/\/[^\s\"\']+)/g);
            }
            e = i[0] || "";
            if (!e) {
                return false;
            }
            var g = 640;
            var o = 498;
            var p = a.$("autostart", k).checked;
            e = e.replace("&tiny=0", "&tiny=1");
            if (p) {
                if (e.indexOf(".tudou.com") > -1) {
                    e += "&autoplay=true";
                } else {
                    e = e.replace("&auto=0", "&auto=1");
                }
            }
            if (!this.check(h, e, g, o)) {
                return false;
            }
            e = e.replace("http://", "//").replace("https://", "//");
            var f = "1";
            var j = '<iframe frameborder="0" width="640" video="1" height="400" src="' + e + '" allowfullscreen></iframe>';
            if (e.indexOf("//music.163.com") == 0 || e.indexOf("audio.paperol.cn") > -1) {
                j = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="360" height="60" src="' + e.replace("www.wjx.cn", "wjx.cn") + '"></iframe>';
            } else {
                if (e.indexOf(".paperol.cn") > -1) {
                    j = n.replace("www.wjx.cn", "wjx.cn");
                }
            }
            a.util.insertHtml(h, j);
            this.dialog.hide();
            a.util.focus(h);
        }
    };

    function c(e) {
        if (e == d) {
            return;
        }
        format("InsertImage", e);
    }

    a.plugin.image = {
        getSelectedNode: function (i) {
            var h = a.g[i];
            var f = h.keRange.startNode;
            var e = h.keRange.endNode;
            if (!a.browser.WEBKIT && !h.keSel.isControl) {
                return;
            }
            if (f.nodeType != 1) {
                return;
            }
            if (f.tagName.toLowerCase() != "img") {
                return;
            }
            if (f != e) {
                return;
            }
            if (!f.className.match(/^ke-\w+/i)) {
                return f;
            }
        }, init: function (h) {
            var e = this;
            var f = a.g[h];
            f.contextmenuItems.push({
                text: a.lang.editImage,
                click: function (i, g) {
                    a.util.select(i);
                    g.hide();
                    e.click(i);
                },
                cond: function (g) {
                    return e.getSelectedNode(g);
                },
                options: {
                    width: "150px",
                    iconHtml: '<span class="ke-common-icon ke-common-icon-url ke-icon-image"></span>'
                }
            });
            f.contextmenuItems.push({
                text: a.lang.deleteImage, click: function (j, i) {
                    a.util.select(j);
                    i.hide();
                    var g = e.getSelectedNode(j);
                    g.parentNode.removeChild(g);
                    a.util.execOnchangeHandler(j);
                }, cond: function (g) {
                    return e.getSelectedNode(g);
                }, options: {width: "150px"}
            });
            f.contextmenuItems.push("-");
        }, click: function (f) {
            a.util.selection(f);
            var e = "";
            if (window.parActivityId) {
                e = "&activity=" + window.parActivityId;
            }
            this.dialog = new a.dialog({
                id: f,
                cmd: "image",
                file: "image/fckuploadimg.aspx?id=" + f + "&upt=" + a.g[f].config.UploadPathType + "&design=" + a.g[f].config.DesignPage + e + "&txtid=" + f,
                width: 620,
                height: 480,
                loadingMode: false,
                title: a.lang.image
            });
            this.dialog.show();
            if (this.dialog.div) {
                this.dialog.div.style.background = "white";
            }
        }, addEditorImage: function (e, f) {
            if (e == d) {
                return;
            }
            this.insert(f, e, "", 0, 0, 0, align);
        }, check: function (k) {
            var f = a.util.getIframeDoc(this.dialog.iframe);
            var i = a.$("type", f).value;
            var h = a.$("imgWidth", f).value;
            var e = a.$("imgHeight", f).value;
            var j = a.$("imgTitle", f).value;
            var g;
            if (i == 2) {
                g = a.$("imgFile", f);
            } else {
                g = a.$("url", f);
            }
            if (!g.value.match(/\.(jpg|jpeg|gif|bmp|png)(\s|\?|$)/i)) {
                alert(a.lang.invalidImg);
                g.focus();
                return false;
            }
            if (!h.match(/^\d*$/)) {
                alert(a.lang.invalidWidth);
                a.$("imgWidth", f).focus();
                return false;
            }
            if (!e.match(/^\d*$/)) {
                alert(a.lang.invalidHeight);
                a.$("imgHeight", f).focus();
                return false;
            }
            return true;
        }, exec: function (g) {
            var s = this;
            var k = a.util.getIframeDoc(this.dialog.iframe);
            var n = a.$("type", k).value;
            var h = a.$("imgWidth", k).value;
            var r = a.$("imgHeight", k).value;
            var p = a.$("imgTitle", k).value;
            var q = k.getElementsByName("align");
            var m = "";
            for (var j = 0, l = q.length; j < l; j++) {
                if (q[j].checked) {
                    m = q[j].value;
                    break;
                }
            }
            if (!this.check(g)) {
                return false;
            }
            if (n == 2) {
                a.$("editorId", k).value = g;
                var f = a.$("uploadIframe", k);
                a.util.showLoadingPage(g);
                var o = function () {
                    a.event.remove(f, "load", o);
                    a.util.hideLoadingPage(g);
                    var v = a.util.getIframeDoc(f);
                    var t = "";
                    try {
                        t = a.util.parseJson(v.body.innerHTML);
                    } catch (u) {
                        alert(a.lang.invalidJson);
                    }
                    if (typeof t === "object" && "error" in t) {
                        if (t.error === 0) {
                            var i = a.format.getUrl(t.url, "absolute");
                            s.insert(g, i, p, h, r, 0, m);
                        } else {
                            alert(t.message);
                            return false;
                        }
                    }
                };
                a.event.add(f, "load", o);
                k.uploadForm.submit();
                return;
            } else {
                var e = a.$("url", k).value;
                this.insert(g, e, p, h, r, 0, m);
            }
        }, insert: function (l, g, j, i, e, f, k) {
            var h = '<img src="' + g + '" kesrc="' + g + '" ';
            if (i > 0) {
                h += 'width="' + i + '" ';
            }
            if (e > 0) {
                h += 'height="' + e + '" ';
            }
            if (j) {
                h += 'title="' + j + '" ';
            }
            if (k) {
                h += 'align="' + k + '" ';
            }
            h += 'alt="' + j + '" ';
            if (f) {
                h += 'border="' + f + '" ';
            }
            h += "/>";
            a.util.insertHtml(l, h);
            this.dialog.hide();
            a.util.focus(l);
        }
    };
    a.plugin.link = {
        getSelectedNode: function (e) {
            return a.getCommonAncestor(a.g[e].keSel, "a");
        }, init: function (f) {
            var e = this;
            a.g[f].contextmenuItems.push({
                text: a.lang.editLink,
                click: function (h, g) {
                    a.util.select(h);
                    g.hide();
                    e.click(h);
                },
                cond: function (g) {
                    return e.getSelectedNode(g);
                },
                options: {
                    width: "150px",
                    iconHtml: '<span class="ke-common-icon ke-common-icon-url ke-icon-link"></span>'
                }
            });
        }, click: function (e) {
            a.util.selection(e);
            this.dialog = new a.dialog({
                id: e,
                cmd: "link",
                file: "link/link.html",
                width: 400,
                height: 90,
                loadingMode: true,
                title: a.lang.link,
                yesButton: a.lang.yes,
                noButton: a.lang.no
            });
            this.dialog.show();
        }, exec: function (p) {
            var w = a.g[p];
            a.util.select(p);
            var m = w.keRange;
            var z = m.startNode;
            var o = m.endNode;
            var k = w.iframeDoc;
            var r = a.util.getIframeDoc(this.dialog.iframe);
            var f = a.$("hyperLink", r).value;
            var A = a.$("linkType", r).value;
            if (!f.match(/.+/) || f.match(/^\w+:\/\/\/?$/)) {
                alert(a.lang.invalidUrl);
                a.$("hyperLink", r).focus();
                return false;
            }
            var s = m.getParentElement();
            while (s) {
                if (s.tagName.toLowerCase() == "a" || s.tagName.toLowerCase() == "body") {
                    break;
                }
                s = s.parentNode;
            }
            s = s.parentNode;
            var x;
            if (a.browser.IE) {
                x = !!w.range.item;
            } else {
                x = (z.nodeType == 1 && z === o && z.nodeName.toLowerCase() != "br");
            }
            var n = !x;
            if (!x) {
                n = a.browser.IE ? w.range.text === "" : w.range.toString() === "";
            }
            if (n || a.util.isEmpty(p)) {
                var u = window.activityID || "";
                var q = "https://r.wjx.com/redirect.aspx?url=" + encodeURIComponent(f) + "&activity=" + u;
                var j = '<a href="' + q + '" data-url="' + f + '"';
                if (A) {
                    j += ' target="' + A + '"';
                }
                j += ">" + f + "</a>";
                a.util.insertHtml(p, j);
            } else {
                k.execCommand("createlink", false, "__ke_temp_url__");
                var e = s.getElementsByTagName("a");
                for (var v = 0, t = e.length; v < t; v++) {
                    if (e[v].href.match(/\/?__ke_temp_url__$/)) {
                        var u = window.activityID || "";
                        var q = "https://r.wjx.com/redirect.aspx?url=" + encodeURIComponent(f) + "&activity=" + u;
                        e[v].href = q;
                        e[v].setAttribute("data-url", f);
                        if (A) {
                            e[v].target = A;
                        } else {
                            e[v].removeAttribute("target");
                        }
                    }
                }
                if (a.browser.WEBKIT && x && z.tagName.toLowerCase() == "img") {
                    var h = z.parentNode;
                    if (h.tagName.toLowerCase() != "a") {
                        var y = a.$$("a", k);
                        h.insertBefore(y, z);
                        y.appendChild(z);
                        h = y;
                    }
                    var u = window.activityID || "";
                    var q = "https://r.wjx.com/redirect.aspx?url=" + encodeURIComponent(f) + "&activity=" + u;
                    h.href = q;
                    h.setAttribute("data-url", f);
                    if (A) {
                        h.target = A;
                    } else {
                        h.removeAttribute("target");
                    }
                    w.keSel.addRange(m);
                }
            }
            a.util.execOnchangeHandler(p);
            this.dialog.hide();
            a.util.focus(p);
        }
    };
    a.plugin.unlink = {
        init: function (f) {
            var e = this;
            a.g[f].contextmenuItems.push({
                text: a.lang.deleteLink,
                click: function (h, g) {
                    a.util.select(h);
                    g.hide();
                    e.click(h);
                },
                cond: function (g) {
                    return a.plugin.link.getSelectedNode(g);
                },
                options: {
                    width: "150px",
                    iconHtml: '<span class="ke-common-icon ke-common-icon-url ke-icon-unlink"></span>'
                }
            });
            a.g[f].contextmenuItems.push("-");
        }, click: function (e) {
            var k = a.g[e];
            var n = k.iframeDoc;
            a.util.selection(e);
            var i = k.keRange;
            var f = i.startNode;
            var l = i.endNode;
            var j = (f.nodeType == 1 && f === l);
            var h = !j;
            if (!j) {
                h = a.browser.IE ? k.range.text === "" : k.range.toString() === "";
            }
            if (h) {
                var m = a.plugin.link.getSelectedNode(e);
                if (!m) {
                    return;
                }
                var i = k.keRange;
                i.selectTextNode(m);
                k.keSel.addRange(i);
                a.util.select(e);
                n.execCommand("unlink", false, null);
                if (a.browser.WEBKIT && f.tagName.toLowerCase() == "img") {
                    var o = f.parentNode;
                    if (o.tagName.toLowerCase() == "a") {
                        a.util.removeParent(o);
                        k.keSel.addRange(i);
                    }
                }
            } else {
                n.execCommand("unlink", false, null);
            }
            a.util.execOnchangeHandler(e);
            a.toolbar.updateState(e);
            a.util.focus(e);
        }
    };
    a.plugin.media = {
        init: function (g) {
            var e = this;
            var f = {};
            a.each(a.g[g].mediaTypes, function (h, i) {
                f[i] = h;
            });
            a.g[g].getHtmlHooks.push(function (h) {
                return h.replace(/<img[^>]*class="?ke-\w+"?[^>]*>/ig, function (j) {
                    var l = j.match(/style="[^"]*;?\s*width:\s*(\d+)/i) ? RegExp.$1 : 0;
                    var i = j.match(/style="[^"]*;?\s*height:\s*(\d+)/i) ? RegExp.$1 : 0;
                    l = l || (j.match(/width="([^"]+)"/i) ? RegExp.$1 : 0);
                    i = i || (j.match(/height="([^"]+)"/i) ? RegExp.$1 : 0);
                    if (j.match(/\s+kesrctag="([^"]+)"/i)) {
                        var k = a.util.getAttrList(unescape(RegExp.$1));
                        k.width = l || k.width || 0;
                        k.height = i || k.height || 0;
                        k.kesrc = k.src;
                        return a.util.getMediaEmbed(k);
                    }
                });
            });
            a.g[g].setHtmlHooks.push(function (h) {
                return h.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function (k, j) {
                    if (typeof f[j] == "undefined") {
                        return k;
                    }
                    var n = k.match(/\s+src="([^"]+)"/i) ? RegExp.$1 : "";
                    if (k.match(/\s+kesrc="([^"]+)"/i)) {
                        n = RegExp.$1;
                    }
                    var m = k.match(/\s+width="([^"]+)"/i) ? RegExp.$1 : 0;
                    var i = k.match(/\s+height="([^"]+)"/i) ? RegExp.$1 : 0;
                    var l = a.util.getAttrList(k);
                    l.src = n;
                    l.width = m;
                    l.height = i;
                    return a.util.getMediaImage(g, "", l);
                });
            });
        }, click: function (e) {
            a.util.selection(e);
            this.dialog = new a.dialog({
                id: e,
                cmd: "media",
                file: "media.html",
                width: 400,
                height: 170,
                loadingMode: true,
                title: a.lang.media,
                yesButton: a.lang.yes,
                noButton: a.lang.no
            });
            this.dialog.show();
        }, check: function (i, g, h, e) {
            var f = a.util.getIframeDoc(this.dialog.iframe);
            if (!g.match(/^.{3,}\.(swf|flv|mp3|wav|wma|wmv|mid|avi|mpg|mpeg|asf|rm|rmvb)(\?|$)/i)) {
                alert(a.lang.invalidMedia);
                a.$("url", f).focus();
                return false;
            }
            if (!h.match(/^\d*$/)) {
                alert(a.lang.invalidWidth);
                a.$("width", f).focus();
                return false;
            }
            if (!e.match(/^\d*$/)) {
                alert(a.lang.invalidHeight);
                a.$("height", f).focus();
                return false;
            }
            return true;
        }, exec: function (k) {
            var g = a.util.getIframeDoc(this.dialog.iframe);
            var f = a.$("url", g).value;
            var i = a.$("width", g).value;
            var e = a.$("height", g).value;
            if (!this.check(k, f, i, e)) {
                return false;
            }
            var j = a.$("autostart", g).checked ? "true" : "false";
            var h = a.util.getMediaImage(k, "", {
                src: f,
                type: a.g[k].mediaTypes[a.util.getMediaType(f)],
                width: i,
                height: e,
                autostart: j,
                loop: "true"
            });
            a.util.insertHtml(k, h);
            this.dialog.hide();
            a.util.focus(k);
        }
    };
    a.plugin.advtable = {
        getSelectedTable: function (e) {
            return a.getCommonAncestor(a.g[e].keSel, "table");
        }, getSelectedRow: function (e) {
            return a.getCommonAncestor(a.g[e].keSel, "tr");
        }, getSelectedCell: function (e) {
            return a.getCommonAncestor(a.g[e].keSel, "td");
        }, tableprop: function (e) {
            this.click(e);
        }, tablecellprop: function (g) {
            var e = this;
            a.util.selection(g);
            var f = new a.dialog({
                id: g,
                cmd: "advtable",
                file: "advtable/cell.html",
                width: 420,
                height: 150,
                loadingMode: true,
                title: a.lang.tablecell,
                yesButton: a.lang.yes,
                noButton: a.lang.no,
                yesClickFn: function (v) {
                    var w = a.util.getIframeDoc(f.iframe), m = a.$("width", w), B = a.$("height", w),
                        s = a.$("widthType", w), r = a.$("heightType", w), p = a.$("textAlign", w),
                        x = a.$("verticalAlign", w), q = a.$("border", w), u = a.$("borderColor", w),
                        A = a.$("backgroundColor", w), y = m.value, t = B.value, k = s.value, l = r.value, o = p.value,
                        h = x.value, z = q.value, i = u.innerHTML, n = A.innerHTML;
                    if (!y.match(/^\d*$/)) {
                        alert(a.lang.invalidWidth);
                        m.focus();
                        return false;
                    }
                    if (!t.match(/^\d*$/)) {
                        alert(a.lang.invalidHeight);
                        B.focus();
                        return false;
                    }
                    if (!z.match(/^\d*$/)) {
                        alert(a.lang.invalidBorder);
                        q.focus();
                        return false;
                    }
                    var j = e.getSelectedCell(v);
                    j.style.width = y !== "" ? (y + k) : "";
                    j.style.height = t !== "" ? (t + l) : "";
                    j.style.backgroundColor = n;
                    j.style.textAlign = o;
                    j.style.verticalAlign = h;
                    j.style.borderWidth = z;
                    j.style.borderStyle = z !== "" ? "solid" : "";
                    j.style.borderColor = i;
                    a.util.execOnchangeHandler(v);
                    f.hide();
                    a.util.focus(v);
                }
            });
            f.show();
        }, tableinsert: function (e) {
            this.click(e, "insert");
        }, tabledelete: function (f) {
            var e = this.getSelectedTable(f);
            e.parentNode.removeChild(e);
        }, tablecolinsert: function (m, l) {
            var j = this.getSelectedTable(m), f = this.getSelectedCell(m), g = f.cellIndex + l;
            for (var h = 0, e = j.rows.length; h < e; h++) {
                var k = j.rows[h].insertCell(g);
                k.innerHTML = "&nbsp;";
            }
        }, tablecolinsertleft: function (e) {
            this.tablecolinsert(e, 0);
        }, tablecolinsertright: function (e) {
            this.tablecolinsert(e, 1);
        }, tablerowinsert: function (m, l) {
            var j = this.getSelectedTable(m), k = this.getSelectedRow(m), g = j.insertRow(k.rowIndex + l);
            for (var h = 0, f = k.cells.length; h < f; h++) {
                var e = g.insertCell(h);
                e.innerHTML = "&nbsp;";
            }
        }, tablerowinsertabove: function (e) {
            this.tablerowinsert(e, 0);
        }, tablerowinsertbelow: function (e) {
            this.tablerowinsert(e, 1);
        }, tablecoldelete: function (k) {
            var j = this.getSelectedTable(k), f = this.getSelectedCell(k), g = f.cellIndex;
            for (var h = 0, e = j.rows.length; h < e; h++) {
                j.rows[h].deleteCell(g);
            }
        }, tablerowdelete: function (g) {
            var e = this.getSelectedTable(g);
            var f = this.getSelectedRow(g);
            e.deleteRow(f.rowIndex);
        }, init: function (l) {
            var f = this;
            var j = "ke-zeroborder";
            var k = "prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,coldelete,rowdelete,insert,delete".split(",");
            for (var h = 0, e = k.length; h < e; h++) {
                var g = "table" + k[h];
                a.g[l].contextmenuItems.push({
                    text: a.lang[g],
                    click: (function (i) {
                        return function (n, m) {
                            a.util.select(n);
                            m.hide();
                            if (f[i] !== d) {
                                f[i](n);
                            }
                            if (!/prop/.test(i)) {
                                a.util.execOnchangeHandler(n);
                            }
                        };
                    })(g),
                    cond: (function (i) {
                        if (a.util.inArray(i, ["tableprop", "tabledelete"])) {
                            return function (m) {
                                return f.getSelectedTable(m);
                            };
                        } else {
                            return function (m) {
                                return f.getSelectedCell(m);
                            };
                        }
                    })(g),
                    options: {
                        width: "170px",
                        iconHtml: '<span class="ke-common-icon ke-common-icon-url ke-icon-' + g + '"></span>'
                    }
                });
            }
            a.g[l].contextmenuItems.push("-");
            a.g[l].setHtmlHooks.push(function (i) {
                return i.replace(/<table([^>]*)>/ig, function (n, m) {
                    if (m.match(/\s+border=["']?(\d*)["']?/ig)) {
                        var o = RegExp.$1;
                        if (m.indexOf(j) < 0 && (o === "" || o === "0")) {
                            return a.addClass(n, j);
                        } else {
                            return n;
                        }
                    } else {
                        return a.addClass(n, j);
                    }
                });
            });
        }, click: function (g, f) {
            f = f || "default";
            var e = "advtable";
            a.util.selection(g);
            this.dialog = new a.dialog({
                id: g,
                cmd: e,
                file: "advtable/advtable.html?mode=" + f,
                width: 420,
                height: 220,
                loadingMode: true,
                title: a.lang.advtable,
                yesButton: a.lang.yes,
                noButton: a.lang.no
            });
            this.dialog.show();
        }, exec: function (A) {
            var t = "ke-zeroborder", B = a.util.getIframeDoc(this.dialog.iframe), x = a.$("mode", B),
                g = a.$("rows", B), o = a.$("cols", B), l = a.$("width", B), M = a.$("height", B),
                w = a.$("widthType", B), u = a.$("heightType", B), G = a.$("padding", B), I = a.$("spacing", B),
                e = a.$("align", B), q = a.$("border", B), z = a.$("borderColor", B), L = a.$("backgroundColor", B),
                p = g.value, s = o.value, C = l.value, y = M.value, h = w.value, k = u.value, v = G.value, n = I.value,
                F = e.value, D = q.value, f = z.innerHTML, m = L.innerHTML;
            if (p == "" || p == 0 || !p.match(/^\d*$/)) {
                alert(a.lang.invalidRows);
                g.focus();
                return false;
            }
            if (s == "" || s == 0 || !s.match(/^\d*$/)) {
                alert(a.lang.invalidCols);
                o.focus();
                return false;
            }
            if (!C.match(/^\d*$/)) {
                alert(a.lang.invalidWidth);
                l.focus();
                return false;
            }
            if (!y.match(/^\d*$/)) {
                alert(a.lang.invalidHeight);
                M.focus();
                return false;
            }
            if (!v.match(/^\d*$/)) {
                alert(a.lang.invalidPadding);
                G.focus();
                return false;
            }
            if (!n.match(/^\d*$/)) {
                alert(a.lang.invalidSpacing);
                I.focus();
                return false;
            }
            if (!D.match(/^\d*$/)) {
                alert(a.lang.invalidBorder);
                q.focus();
                return false;
            }
            if (x.value === "update") {
                var K = this.getSelectedTable(A);
                K.style.width = C !== "" ? (C + h) : "";
                K.style.height = y !== "" ? (y + k) : "";
                K.style.backgroundColor = m;
                a.attr(K, "width", "");
                a.attr(K, "height", "");
                a.attr(K, "bgColor", "");
                a.attr(K, "cellPadding", v);
                a.attr(K, "cellSpacing", n);
                a.attr(K, "align", F);
                if (D === "" || D === "0") {
                    a.addClass(K, t);
                } else {
                    a.removeClass(K, t);
                }
                a.attr(K, "border", D);
                a.attr(K, "borderColor", f);
                a.util.execOnchangeHandler(A);
            } else {
                var J = "";
                if (C !== "") {
                    J += "width:" + C + h + ";";
                }
                if (y !== "") {
                    J += "height:" + y + k + ";";
                }
                if (m !== "") {
                    J += "background-color:" + m + ";";
                }
                var r = "<table";
                if (J !== "") {
                    r += ' style="' + J + '"';
                }
                if (v !== "") {
                    r += ' cellpadding="' + v + '"';
                }
                if (n !== "") {
                    r += ' cellspacing="' + n + '"';
                }
                if (F !== "") {
                    r += ' align="' + F + '"';
                }
                if (D === "" || D === "0") {
                    r += ' class="' + t + '"';
                }
                if (D !== "") {
                    r += ' border="' + D + '"';
                }
                if (f !== "") {
                    r += ' bordercolor="' + f + '"';
                }
                r += ">";
                for (var H = 0; H < p; H++) {
                    r += "<tr>";
                    for (var E = 0; E < s; E++) {
                        r += "<td>&nbsp;</td>";
                    }
                    r += "</tr>";
                }
                r += "</table>";
                a.util.insertHtml(A, r);
            }
            this.dialog.hide();
            a.util.focus(A);
        }
    };
})(KindEditor);