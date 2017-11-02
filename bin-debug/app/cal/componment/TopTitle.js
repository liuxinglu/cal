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
    var TopTitle = (function (_super) {
        __extends(TopTitle, _super);
        function TopTitle() {
            return _super.call(this, lxl.Config.SKIN_PATH + "TopTitle.exml") || this;
        }
        TopTitle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return TopTitle;
    }(lxl.CComponent));
    app.TopTitle = TopTitle;
    __reflect(TopTitle.prototype, "app.TopTitle");
})(app || (app = {}));
//# sourceMappingURL=TopTitle.js.map