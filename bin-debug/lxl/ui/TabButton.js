var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxl;
(function (lxl) {
    var ui;
    (function (ui) {
        var TabButton = (function (_super) {
            __extends(TabButton, _super);
            function TabButton() {
                var _this = _super.call(this) || this;
                _this.hasActivi = false;
                _this.hasDispos = false;
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                _this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, _this.dispose, _this);
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._clickHandler, _this);
                _this.funOnActivity = _this.onActivity;
                _this.funDispose = _this.dispose;
                return _this;
            }
            TabButton.prototype.onActivity = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    this.doAcivity(this.getChildAt(i));
                }
                this.hasActivi = true;
            };
            TabButton.prototype.doAcivity = function (com) {
                if (com.hasOwnProperty("funOnActivity") && com.hasActivi == false)
                    com["funOnActivity"]();
                if (com.numChildren == 0) {
                    return;
                }
                else {
                    for (var i = 0; i < com.numChildren; i++) {
                        this.doAcivity(com.getChildAt(i));
                    }
                }
            };
            TabButton.prototype._clickHandler = function (e) {
                var ee = lxl.Tool.copyObject(e);
                this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, ee));
            };
            TabButton.prototype.dispose = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    this.doDispos(this.getChildAt(i));
                }
                this.parent.removeChild(this);
                this.hasDispos = true;
            };
            TabButton.prototype.doDispos = function (com) {
                if (com.hasOwnProperty("funDispose") && com.hasDispos == false)
                    com["funDispose"]();
                if (com.numChildren == 0) {
                    return;
                }
                else {
                    for (var i = 0; i < com.numChildren; i++) {
                        this.doDispos(com.getChildAt(i));
                    }
                }
            };
            return TabButton;
        }(eui.Button));
        ui.TabButton = TabButton;
        __reflect(TabButton.prototype, "lxl.ui.TabButton");
    })(ui = lxl.ui || (lxl.ui = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=TabButton.js.map