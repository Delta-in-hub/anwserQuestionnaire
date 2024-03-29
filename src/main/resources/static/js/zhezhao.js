/**
 * Created by Amy on 2018/7/31.
 */
function $get(a) {
    return document.getElementById(a);
}
function getElementTop(b) {
    if (!b) {
        return;
    }
    var a = b.offsetLeft;
    var c = b.offsetTop;
    while (b = b.offsetParent) {
        a += b.offsetLeft;
        c += b.offsetTop;
    }
    return {x: a, y: c};
}
function closeConfirm() {
    var a = document.getElementById("confirm_box");
    a.style.display = "none";
    if (a.callback) {
        a.callback();
    }
}
window.confirmnew = function (c, d) {
    var b = document.getElementById("confirm_box");
    if (b) {
        document.getElementById("pop_box_msg2").innerHTML = c;
    } else {
        b = document.createElement("div");
        b.id = "confirm_box";
        var a = "<div style='position:fixed;*position: absolute;width: 100%;height: 100%;opacity: 0.5;filter: alpha(opacity=50);background-color: black;z-index: 99998;top: 0px;left: 0px;'></div><div style='min-height: 180px;width:400px;margin-left: -200px;margin-top: -90px;position: fixed;z-index: 99999;top: 50%;left: 50%;background-color: white;border-radius: 8px;'><div style='font-size:18px;color:#000;font-weight:600;padding:26px 20px 10px;width:100%;text-align:center;border-radius:8px 8px 0 0;vertical-align: middle;z-index: 1;'><div>系统提示</div></div><div style='width: 100%;border-radius: 0 0 8px 8px; z-index: 1;'><div style='min-height:66px;padding:6px 20px 10px;font-size: 15px;line-height: 22px;text-align: center;' id='pop_box_msg2'>" + c + "</div><div style='width:100%;height:50px;text-align:center;border-top:1px solid #D2D3D5;'><button style='background:none;display:inline-block;width: 50%;height:50px;font-size:18px;line-height:50px;color:#313233;text-align: center;text-decoration: none;border: none;outline:none;cursor:pointer;' onclick='document.getElementById(\"confirm_box\").style.display=\"none\";'>取消</button><button style='display:inline-block;width: 50%;font-size:18px;height:50px;box-sizing:border-box;line-height:50px;color:#3296FA;text-align: center;text-decoration: none;border: none;border-left:1px solid #D2D3D5;background: none;outline:none;cursor:pointer;' onclick='closeConfirm();'>确定</button></div></div></div>";
        b.innerHTML = a;
        document.body.appendChild(b);
    }
    b.style.display = "";
    b.callback = d || "";
    return b;
};
var zheZhaoCallBack = null;
var zheZhaodivId = "";
function PDF_launch(ob, zzw, zzh, callback, titlestr) {
    var d = document;
    zzw = zzw ? parseInt(zzw) : 600;
    zzh = zzh ? parseInt(zzh) : 600;
    var _docW = (d.width != undefined) ? d.width : d.body.offsetWidth;
    var _docH = Math.max(d.documentElement.clientHeight, d.documentElement.scrollHeight);
    zheZhaoCallBack = callback;
    if (window.innerHeight > _docH) {
        _docH = window.innerHeight;
    }
    _docH = Math.max(_docH, d.body.scrollHeight);
    if (d.documentElement.clientHeight > 0) {
        _docW = d.documentElement.scrollWidth;
    } else {
        _docW = d.body.scrollWidth;
    }
    var _docS = (d.all ? Math.max(d.body.scrollTop, d.documentElement.scrollTop) : window.pageYOffset);
    var _docPH = (d.all ? Math.max(d.body.clientHeight, d.documentElement.clientHeight) : window.innerHeight);
    if (d.all) {
        if (d.documentElement.clientHeight > 0) {
            _docPH = d.documentElement.clientHeight;
        }
    }
    if (window.opera) {
        _docPH = window.innerHeight;
    }
    var PDF_bg = $get("PDF_bg_chezchenz");
    if (!PDF_bg) {
        var PDF_bg = d.createElement("div");
        PDF_bg.style.display = "none";
        PDF_bg.id = "PDF_bg_chezchenz";
        d.body.appendChild(PDF_bg);
    }
    with (PDF_bg.style) {
        position = "absolute";
        backgroundColor = "#000";
        left = "0px";
        top = "0px";
        zIndex = 10001;
        filter = "alpha(opacity=60)";
        opacity = 0.6;
        width = _docW + "px";
        height = _docH + "px";
        display = "block";
    }
    var PDF_c = $get("PDF_c_chezchenz");
    if (!PDF_c) {
        PDF_c = d.createElement("div");
        PDF_c.style.display = "none";
        PDF_c.id = "PDF_c_chezchenz";
        d.body.appendChild(PDF_c);
    }
    var siteStr = "问卷星";
    if (window.location.host.toLowerCase().indexOf("sojiang.com") > -1) {
        siteStr = "收奖网";
    }
    var needDefine = false;
    if (titlestr == "付费下载数据") {
        needDefine = true;
    }
    var titleHeight = 0;
    if (!titlestr) {
        PDF_c.innerHTML = "<a style='background:url(/images/bt_closed.gif) no-repeat;width:30px;height:30px;margin:-10px -18px 0 0;display:inline;position:relative;float:right;cursor:pointer;' onclick='PDF_close();return false;'></a>";
    } else {
        if (titlestr == "no" || titlestr == "full") {
            PDF_c.innerHTML = "";
        } else {
            var bkcolor = "#fafafa";
            var color = "#222";
            var bg = "background:url(/images/icon_popup_close.png) no-repeat;width:27px; height:27px;margin-top:5px;";
            if (needDefine) {
                bkcolor = "#0073d9";
                color = "#ebf5ff";
                bg = "background:url(/images/icon_popup_closenew.png) no-repeat;width:17px; height:17px;margin-top:10px;";
            }
            PDF_c.innerHTML = '<div style="background:' + bkcolor + ';padding:0 20px;height:38px;line-height:38px;border-radius:10px 10px 0 0;" class="navbox"><span style="color:' + color + ';float:left;font-size:16px;">' + titlestr + '</span><a href="javascript:void(0);" onclick="PDF_close();return false;" style="' + bg + 'float:right;overflow:hidden;" class="pdfclosebtn" title="关闭"></a></div>';
            titleHeight = 14;
        }
    }
    var bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var isdesignGuid = ob.indexOf("designnewguid.aspx") > -1;
    with (PDF_c.style) {
        width = zzw + 8 + "px";
        if (bodyHeight < zzh) {
            zzh = bodyHeight - 20;
        }
        position = "absolute";
        var ttt = _docPH > zzh ? bodyHeight - zzh : 20;
        top = (ttt / 2 + _docS + 10) + "px";
        var cheight = 28;
        if (needDefine) {
            cheight = 23;
        }
        height = (zzh + cheight + titleHeight) + "px";
        if (titlestr == "full") {
            top = 0;
            height = bodyHeight;
        }
        var cwidth = 0;
        if (needDefine) {
            cwidth = 8;
        }
        left = (bodyWidth - zzw + cwidth) / 2 + "px";
        if (isdesignGuid) {
            backgroundColor = "#757677";
        } else {
            backgroundColor = "#fff";
        }
        zIndex = 10003;
        if (titlestr != "full") {
            borderRadius = "10px";
        }
    }
    var newTop = 0;
    if (window.ZheZhaoControl) {
        var zzcon = window.ZheZhaoControl;
        newTop = getElementTop(zzcon).y;
        var sheight = d.documentElement.scrollHeight;
        if (sheight > 0 && newTop + zzh > sheight) {
            newTop = sheight - zzh - 30;
        }
        PDF_c.style.top = newTop + "px";
    }
    PDF_c.style.display = "";
    var PDF_i = $get(ob);
    zheZhaodivId = "";
    var obChanged = false;
    var isIE = !!window.ActiveXObject;
    var isIE6 = isIE && !window.XMLHttpRequest;
    if (PDF_i) {
        PDF_i.style.display = "none";
        zheZhaodivId = ob;
    } else {
        PDF_i = $get("PDF_i_chezchenz");
        var osrc = "";
        if (!PDF_i) {
            PDF_i = d.createElement("iframe");
            PDF_i.id = "PDF_i_chezchenz";
            PDF_i.setAttribute("frameBorder", "0");
            PDF_i.src = ob;
            d.body.appendChild(PDF_i);
            if (isIE6) {
                PDF_i.src = ob;
            }
        } else {
            osrc = PDF_i.src;
            PDF_i.src = ob;
        }
        if (document.all) {
            PDF_i.scrolling = "yes";
        }
        if (osrc && osrc.indexOf(ob) == -1) {
            obChanged = true;
        }
    }
    with (PDF_i.style) {
        position = "absolute";
        width = zzw + "px";
        margin = "0px";
        padding = "0px";
        border = "0px";
        if (bodyHeight < zzh) {
            zzh = bodyHeight - 20;
        }
        height = zzh + "px";
        top = ((_docPH - zzh) / 2 + _docS + 34 + titleHeight) + "px";
        if (titlestr == "full") {
            top = 0;
            height = bodyHeight + "px";
        }
        left = ((bodyWidth - zzw) / 2 + 4) + "px";
        zIndex = 10005;
        if (isdesignGuid) {
            backgroundColor = "#757677";
        } else {
            background = "#fff";
        }
    }
    if (obChanged) {
        setTimeout(function () {
            if (PDF_c && PDF_c.style.display != "none") {
                PDF_i.style.display = "block";
            }
        }, 1000);
    } else {
        PDF_i.style.display = "block";
    }
    if (newTop) {
        PDF_i.style.top = newTop + 24 + "px";
    }
    if (isIE6) {
        var iframeObj = null;
        if (!$get("PDF_IframeObj")) {
            iframeObj = d.createElement("iframe");
            iframeObj.id = "PDF_IframeObj";
            iframeObj.style.position = "absolute";
            iframeObj.src = "/html/blank.html";
            iframeObj.style.zIndex = 9000;
            d.body.appendChild(iframeObj);
        } else {
            iframeObj = $get("PDF_IframeObj");
        }
        if (iframeObj != null) {
            iframeObj.style.left = PDF_c.style.left;
            iframeObj.style.top = PDF_c.style.top;
            iframeObj.style.display = "";
            iframeObj.style.width = PDF_c.offsetWidth + "px";
            iframeObj.style.height = PDF_c.offsetHeight + "px";
            iframeObj.style.border = "0";
        }
    }
    var jqContent = $get("jqContent");
    if (jqContent) {
        jqContent.style.opacity = "1";
        jqContent.style.filter = "alpha(opacity=100)";
    }
}
function PDF_close(b) {
    var a = $get("divFlash");
    if (a) {
        a.style.display = "";
    }
    var d = document.getElementById(zheZhaodivId);
    if (d) {
        d.style.display = "none";
    }
    if ($get("PDF_i_chezchenz")) {
        $get("PDF_i_chezchenz").style.display = "none";
    }
    if ($get("PDF_bg_chezchenz")) {
        $get("PDF_bg_chezchenz").style.display = "none";
    }
    if ($get("PDF_c_chezchenz")) {
        $get("PDF_c_chezchenz").style.display = "none";
    }
    var c = !!window.ActiveXObject;
    var e = c && !window.XMLHttpRequest;
    if (e && $get("PDF_IframeObj")) {
        $get("PDF_IframeObj").style.display = "none";
    }
    window.ZheZhaoControl = null;
    if (zheZhaoCallBack) {
        zheZhaoCallBack(b);
    }
}