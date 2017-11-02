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
    var TabButtonBar = (function (_super) {
        __extends(TabButtonBar, _super);
        function TabButtonBar() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "TabButtonBar.exml") || this;
            _this.curActIndex = 0;
            return _this;
        }
        TabButtonBar.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_0.tabIndex = 0;
            this.btn_1.tabIndex = 1;
            this.btn_2.tabIndex = 2;
            this.btn_0.addEventListener(lxl.CEvent.CLICK, this._tabClickHandler, this);
            this.btn_1.addEventListener(lxl.CEvent.CLICK, this._tabClickHandler, this);
            this.btn_2.addEventListener(lxl.CEvent.CLICK, this._tabClickHandler, this);
        };
        TabButtonBar.prototype._tabClickHandler = function (e) {
            this.setActIndex(e.param.target.tabIndex);
        };
        TabButtonBar.prototype.setActIndex = function (index) {
            for (var i = 0; i < 3; i++) {
                this["btn_" + i].currentState = "normal";
            }
            this.curActIndex = index;
            this["btn_" + index].currentState = "sel";
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.TAB_ACTIVITY, index));
        };
        TabButtonBar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return TabButtonBar;
    }(lxl.CComponent));
    app.TabButtonBar = TabButtonBar;
    __reflect(TabButtonBar.prototype, "app.TabButtonBar");
})(app || (app = {}));
//# sourceMappingURL=TabButtonBar.js.map