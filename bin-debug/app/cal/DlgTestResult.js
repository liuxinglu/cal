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
    var DlgTestResult = (function (_super) {
        __extends(DlgTestResult, _super);
        function DlgTestResult() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgTestResultSkin.exml") || this;
        }
        DlgTestResult.prototype.onActivity = function () {
            var _this = this;
            _super.prototype.onActivity.call(this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.6);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this._sound = Res.getRes("jieguo_mp3");
            this._sound.play(0, 1);
            var _loop_1 = function (i) {
                var ritem = new app.ResultItem();
                ritem.data = Cal.needCheckKnowledges[i];
                ritem.once(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                    _this.group.addChild(ritem);
                }, this_1);
            };
            var this_1 = this;
            for (var i = Cal.needCheckKnowledges.length - 1; i >= 0; i--) {
                _loop_1(i);
            }
        };
        DlgTestResult.prototype._closeHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgTestResult.prototype.updateView = function () {
            for (var i = Cal.needCheckKnowledges.length - 1; i >= 0; i--) {
                this.group.getChildAt(i).data = Cal.needCheckKnowledges[i];
                this.group.getChildAt(i).updateData();
            }
        };
        DlgTestResult.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.group.removeChildren();
            this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
        };
        return DlgTestResult;
    }(lxl.CComponent));
    app.DlgTestResult = DlgTestResult;
    __reflect(DlgTestResult.prototype, "app.DlgTestResult");
})(app || (app = {}));
//# sourceMappingURL=DlgTestResult.js.map