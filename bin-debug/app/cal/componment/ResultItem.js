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
    var ResultItem = (function (_super) {
        __extends(ResultItem, _super);
        function ResultItem() {
            return _super.call(this, lxl.Config.SKIN_PATH + "ResultItemSkin.exml") || this;
        }
        ResultItem.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
            this.lab_knowledge.text = this.data.knowledge;
            this.img_pass.visible = this.data.pass == "true" ? true : false;
        };
        ResultItem.prototype.updateData = function () {
            this.lab_knowledge.text = this.data.knowledge;
            this.img_pass.visible = this.data.pass == "true" ? true : false;
        };
        ResultItem.prototype._clickHandler = function (e) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KNOWLEDGE_SELECT, this.data));
        };
        ResultItem.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
        };
        return ResultItem;
    }(lxl.CComponent));
    app.ResultItem = ResultItem;
    __reflect(ResultItem.prototype, "app.ResultItem");
})(app || (app = {}));
//# sourceMappingURL=ResultItem.js.map