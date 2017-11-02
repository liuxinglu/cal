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
        var CItemRenderer = (function (_super) {
            __extends(CItemRenderer, _super);
            function CItemRenderer(skinName) {
                var _this = _super.call(this) || this;
                _this.hasActivi = false;
                _this.hasDispos = false;
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
                _this.skinName = lxl.Tool.callJS("getURL") + skinName;
                _this.funOnActivity = _this.onActivity;
                _this.funDispose = _this.dispose;
                return _this;
            }
            CItemRenderer.prototype.loadComplete = function () {
                var _this = this;
                egret.Tween.get(this).wait(0.1).call(function () {
                    _this.dispatchEvent(new egret.Event(lxl.CEvent.LOAD_SKIN_COMPLETE, _this.param));
                    _this.addEventListener(eui.UIEvent.REMOVED, _this.dispose, _this);
                }, this);
            };
            CItemRenderer.prototype.onActivity = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    this.doAcivity(this.getChildAt(i));
                }
                this.hasActivi = true;
            };
            CItemRenderer.prototype.doAcivity = function (com) {
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
            CItemRenderer.prototype.dispose = function (ani) {
                var _this = this;
                if (ani === void 0) { ani = false; }
                this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
                this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
                for (var i = 0; i < this.numChildren; i++) {
                    this.doDispos(this.getChildAt(i));
                }
                if (ani == true) {
                    egret.Tween.get(this)
                        .to({ y: 0 - this.stage.stageHeight / 2, alpha: 0 }, 100)
                        .call(function () {
                        if (_this.parent)
                            _this.parent.removeChild(_this);
                    }, this);
                }
                this.hasDispos = true;
            };
            CItemRenderer.prototype.doDispos = function (com) {
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
            CItemRenderer.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
            };
            CItemRenderer.prototype.removeChildByName = function (name) {
                this.removeChild(this.getChildByName(name));
            };
            return CItemRenderer;
        }(eui.ItemRenderer));
        ui.CItemRenderer = CItemRenderer;
        __reflect(CItemRenderer.prototype, "lxl.ui.CItemRenderer");
    })(ui = lxl.ui || (lxl.ui = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=CItemRenderer.js.map