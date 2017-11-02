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
    var DlgSuccess = (function (_super) {
        __extends(DlgSuccess, _super);
        function DlgSuccess() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgSuccess.exml") || this;
        }
        DlgSuccess.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.6);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this.ani();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
            this._sound = Res.getRes("jieguo_mp3");
            this._sound.play(0, 1);
        };
        DlgSuccess.prototype._clickHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
        };
        DlgSuccess.prototype.ani = function () {
            var _this = this;
            egret.Tween.get(this.img_bg)
                .to({ rotation: 359 }, 2000)
                .call(function () {
                _this.img_bg.rotation = 0;
                _this.ani();
            }, this);
        };
        DlgSuccess.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
            egret.Tween.removeAllTweens();
        };
        return DlgSuccess;
    }(lxl.CComponent));
    app.DlgSuccess = DlgSuccess;
    __reflect(DlgSuccess.prototype, "app.DlgSuccess");
})(app || (app = {}));
//# sourceMappingURL=DlgSuccess.js.map