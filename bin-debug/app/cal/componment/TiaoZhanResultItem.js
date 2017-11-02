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
    var TiaoZhanResultItem = (function (_super) {
        __extends(TiaoZhanResultItem, _super);
        function TiaoZhanResultItem() {
            return _super.call(this, lxl.Config.SKIN_PATH + "TiaoZhanResultItemSkin.exml") || this;
        }
        TiaoZhanResultItem.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.lab_question.text = this.data.question;
        };
        TiaoZhanResultItem.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return TiaoZhanResultItem;
    }(lxl.CComponent));
    app.TiaoZhanResultItem = TiaoZhanResultItem;
    __reflect(TiaoZhanResultItem.prototype, "app.TiaoZhanResultItem");
})(app || (app = {}));
//# sourceMappingURL=TiaoZhanResultItem.js.map