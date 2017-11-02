var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var DlgDraw = (function (_super) {
        __extends(DlgDraw, _super);
        function DlgDraw() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "DlgDrawSkin.exml") || this;
            _this._isErase = false;
            return _this;
        }
        DlgDraw.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_earse.addEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
            this.btn_save.addEventListener(lxl.CEvent.CLICK, this._saveHandler, this);
            this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.8);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this._shape = new egret.Shape();
            this.addChild(this._shape);
            this._shape.graphics.lineStyle(2, 0x999999);
            lxl.Tool.callJS("getLocat", this.getLoc, this);
        };
        DlgDraw.prototype.getLoc = function (arr) {
            console.log(arr.toString());
        };
        DlgDraw.prototype._clearHandler = function (e) {
            this._shape.graphics.clear();
            this._shape.graphics.lineStyle(2, 0x999999);
        };
        DlgDraw.prototype._saveHandler = function (e) {
            var rt = new egret.RenderTexture();
            rt.drawToTexture(this._shape, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
            rt.saveToFile("image/png", "screen_snap.png", new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
        };
        DlgDraw.prototype._closeHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgDraw.prototype._touchBegin = function (e) {
            this._shape.graphics.moveTo(e.stageX, e.stageY);
            this._shape.graphics.lineTo(e.stageX, e.stageY);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);
        };
        DlgDraw.prototype._touchMove = function (e) {
            this._shape.graphics.lineTo(e.stageX, e.stageY);
        };
        DlgDraw.prototype._touchEnd = function (e) {
            this._shape.graphics.lineTo(e.stageX, e.stageY);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
        };
        DlgDraw.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_earse.removeEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
            this.btn_save.removeEventListener(lxl.CEvent.CLICK, this._saveHandler, this);
            this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
        };
        return DlgDraw;
    }(lxl.CComponent));
    app.DlgDraw = DlgDraw;
    __reflect(DlgDraw.prototype, "app.DlgDraw");
})(app || (app = {}));
//# sourceMappingURL=DlgDraw.js.map